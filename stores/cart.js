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
      const config = useRuntimeConfig(); // Get runtime config
      const baseURL = config.public.baseURL; // Access baseURL

      const authStore = useAuthStore(); // Access the auth store
      const token = authStore.token; // Get the token from the auth store

      if (token) {
        this.cartAdd = true;
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
            this.cartItems = response.cart;
            this.cartAdd = false;
            this.cartUpdated = true;
          } else {
            // Handle errors here if needed
            console.error("Error adding to cart", response.message);
            alert(response.message);
          }
        } catch (error) {
          console.error("API Error:", error);
        }
      } else {
        this.cartAdd = true;
        const { cookies } = useCookies();
        if (this.cartItems.length) {
          let itemExists = false;
          this.cartItems = this.cartItems.map((obj) => {
            if (
              obj.variant_id === cartItem.variant_id &&
              obj.product_id === cartItem.product_id
            ) {
              //obj.quantity += cartItem.quantity;
              itemExists = true;
            }
            return obj;
          });

          if (itemExists) {
            toast("Sorry, Product variant already exist in cart", {
              autoClose: 1000,
              canTimeout: true,
            });
            return;
          }
          // If the item doesn't exist, add it to the cart
          if (!itemExists) {
            this.cartItems.push(cartItem);
          }
        } else {
          this.cartItems.push(cartItem);
        }
        cookies.set("cart", JSON.stringify(this.cartItems), "7d"); // cookie expiry of 7 days
        this.cartAdd = false;
        this.cartUpdated = true;
        console.log(this.cartItems);
      }
    },

    async loadCart() {
      const authStore = useAuthStore(); // Access the auth store
      const token = authStore.token; // Get the token from the auth store
      if (!token) {
        // User is not logged in, load cart from cookies
        const { cookies } = useCookies();
        const cartFromCookies = cookies.get("cart");
        this.cartItems = cartFromCookies ? JSON.parse(cartFromCookies) : [];
      } else {
        // Handle loading the cart for logged-in users (e.g., by fetching it from a server)
        await this.loadCartFromServer();
      }
    },

    async loadCartFromServer() {
      try {
        const config = useRuntimeConfig(); // Get runtime config
        const baseURL = config.public.baseURL; // Access baseURL
        const authStore = useAuthStore(); // Access the auth store
        const token = authStore.token; // Get the token from the auth store

        const response = await $fetch(`${baseURL}/cart`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Include the Authorization header
            "Content-Type": "application/json", // Set content type to application/json
          },
        });

        console.log(response);
        if (response.success) {
          this.cartItems = response.cart;
          // Optionally, store the cart data in cookies for guest users
          const { cookies } = useCookies();
          cookies.set("cart", JSON.stringify(this.cartItems), "7d");
          console.log(response.message);
        } else {
          this.cartItems = [];
          console.log(response.message);
        }
      } catch (error) {
        console.error("Error while loading cart data from server:", error);
      }
    },

    async removeItem() {
      const config = useRuntimeConfig(); // Get runtime config
      const baseURL = config.public.baseURL; // Access baseURL

      const authStore = useAuthStore(); // Access the auth store
      const token = authStore.token; // Get the token from the auth store

      if (token) {
        // Logged-in user: handle item removal via API
        try {
          const cartItemId = `${productId}_${variantId ? variantId : "null"}`; // Combine productId and variantId as cartItemId

          const response = await $fetch(
            `${baseURL}/cart/remove-item/${cartItemId}`,
            {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${token}`, // Include Authorization header for logged-in users
                "Content-Type": "application/json",
              },
            }
          );

          if (response.success) {
            // Filter out the removed item from cartItems
            this.cartItems = this.cartItems.filter(
              (item) =>
                item.product.id !== productId || item.variant_id !== variantId
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
          const cookieCart = useCookie("cart"); // Access the cart from cookies
          const cart = cookieCart.value ? JSON.parse(cookieCart.value) : {};
          const productKey = productId + (variantId ? `_${variantId}` : "");

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

    async saveCartToServer() {
      const config = useRuntimeConfig(); // Get runtime config
      const baseURL = config.public.baseURL; // Access baseURL

      const authStore = useAuthStore(); // Access the auth store
      const token = authStore.token; // Get the token from the auth store
      const { cookies } = useCookies();

      try {
        let cartItemsToSave = [];
        if (this.cartItems) {
          cartItemsToSave = this.cartItems.map(obj => ({
            'product_id': obj.product_id,
            'variant_id': obj.variant_id,
            'price': obj.price,
            'quantity': obj.quantity,
            'is_digital': obj.is_digital,
          }));
        }

        if (cartItemsToSave.length === 0) {
          console.log("No items to save.");
          return;
        }
        console.log("cartItemsToSave",cartItemsToSave);
        // Send the cart data to the backend
        const response = await $fetch(`${baseURL}/cart/save`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`, // Include the Authorization header
            "Content-Type": "application/json", // Set content type to application/json
          },
          body: JSON.stringify({
            cartItems: cartItemsToSave, // Payload to be sent to the server
          }),
        });

        if(response.success){
          console.log("CART DATA SAVED");
          cookies.remove('cart');
        }

      } catch (error) {
        console.error("Error while saving cart to server:", error);
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
