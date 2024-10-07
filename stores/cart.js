import { defineStore } from "pinia";
import { useAuthStore } from "./auth"; // Import the auth store

export const useCartStore = defineStore("cart", {
  state: () => ({
    cartItems: [], // Make sure the same variable is used in getters and actions
    cartUpdated: false,
    cartAdd: false,
  }),

  getters: {
    cartTotal: (state) => {
      return state.cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      ); // Use cartItems here
    },
    itemCount: (state) => {
      return state.cartItems.reduce((count, item) => count + item.quantity, 0); // Use cartItems here
    },
  },

  actions: {
    async addToCart(cartItem) {
      this.cartAdd = true;

      const config = useRuntimeConfig(); // Get runtime config
      const baseURL = config.public.baseURL; // Access baseURL

      const authStore = useAuthStore(); // Access the auth store
      const token = authStore.token; // Get the token from the auth store

      try {
        const response = await $fetch(`${baseURL}/cart/add-item`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`, // Include the Authorization header
            "Content-Type": "application/json", // Set content type to application/json
          },
          body: cartItem, // Make sure cartItem is an object that matches the expected structure
        });

        // Handle response data
        if (response.success) {
          // Assuming response.cart is the object containing items like { "2_5": {...}, "3_6": {...} }
          Object.entries(response.cart).forEach(([key, item]) => {
            const existingItem = this.cartItems.find(
              (cartItem) => cartItem.variant_id === item.variant_id // Check if the item already exists in the cart based on variant_id
            );

            if (existingItem) {
              // If it exists, update its quantity
              existingItem.quantity += item.quantity; // Adjust quantity based on the response
            } else {
              // If it doesn't exist, add the new item to the cart
              this.cartItems.push({
                variant_id: item.variant_id, // Ensure to include the variant_id
                quantity: item.quantity, // Set the quantity from the response
                price: item.price, // Include the price
                is_digital: item.is_digital, // Include whether it is digital
                product: item.product,
              });
            }
          });

          console.log("ITEM COUNT", this.itemCount); // Use the getter to log item count
          console.log("ITEMS IN CART", this.cartItems);
          this.cartAdd = false;
          this.cartUpdated = true;
        } else {
          // Handle errors here if needed
          console.error("Error adding to cart", response.message);
        }
      } catch (error) {
        console.error("API Error:", error);
      }
    },

    removeItem(productId) {
      this.cartItems = this.cartItems.filter(
        (item) => item.productId !== productId
      ); // Use cartItems here
    },

    clearCart() {
      this.cartItems = []; // Use cartItems here
    },

    getAllCartItems() {
      return this.cartItems; // Return the cartItems array
    },
  },
});
