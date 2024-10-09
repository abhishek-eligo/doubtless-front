import { defineStore } from "pinia";
import { useAuthStore } from "./auth"; // Import the auth store
import { useCookies } from "vue3-cookies";

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

      const cartCookie = useCookie('cartItems');
      if (cartCookie.value) {
        payload.cart = cartCookie.value; // Add cart cookie value to payload
      }

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
          console.log(response.cart);
          this.cartItems.push(response.cart);
          const cart = useCookie('cartItems');
          cart.value = this.cartItems; // Set the token in the cookie
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

    async removeItem(productId, variantId = null) {
      const config = useRuntimeConfig(); // Get runtime config
      const baseURL = config.public.baseURL; // Access baseURL

      const authStore = useAuthStore(); // Access the auth store
      const token = authStore.token; // Get the token from the auth store

      if (token) {
        // Logged-in user: handle item removal via API
        try {
          const cartItemId = `${productId}_${variantId ? variantId : 'null'}`; // Combine productId and variantId as cartItemId

          const response = await $fetch(`${baseURL}/cart/remove-item/${cartItemId}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`, // Include Authorization header for logged-in users
              "Content-Type": "application/json",
            },
          });

          if (response.success) {
            // Filter out the removed item from cartItems
            this.cartItems = this.cartItems.filter(
              (item) => item.product.id !== productId || item.variant_id !== variantId
            );

            console.log("Item removed from cart:", response.message);
            this.cartUpdated = true;
          } else {
            console.error("Error removing from cart:", response.message);
          }
        } catch (error) {
          console.error("API Error:", error);
        }
      } else {
        // Guest user: handle item removal using cookies
        try {
          const cookieCart = useCookie('cart'); // Access the cart from cookies
          const cart = cookieCart.value ? JSON.parse(cookieCart.value) : {};
          const productKey = productId + (variantId ? `_${variantId}` : '');

          if (cart[productKey]) {
            // Remove the item from the cart
            delete cart[productKey];

            // Update the cart cookie
            cookieCart.value = JSON.stringify(cart);

            // Update local cartItems state
            this.cartItems = Object.values(cart);

            console.log("Item removed from guest cart.");
            this.cartUpdated = true;
          } else {
            console.error("Item not found in guest cart.");
          }
        } catch (error) {
          console.error("Error handling guest cart:", error);
        }
      }
    },

    clearCart() {
      this.cartItems = []; // Use cartItems here
    },

    getAllCartItems() {
      return this.cartItems; // Return the cartItems array
    },
  },
});
