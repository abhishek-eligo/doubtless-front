import { defineStore } from 'pinia'
import { useAuthStore } from './auth' // Import the auth store

export const useCartStore = defineStore('cart', {
  state: () => ({
    cartItems: [],
    cartUpdated: false,
    cartAdd: false,
  }),

  getters: {
    cartTotal: (state) => {
      return state.items.reduce((total, item) => total + item.price * item.quantity, 0)
    },
    itemCount: (state) => {
      return state.items.reduce((count, item) => count + item.quantity, 0)
    },
  },

  actions: {
    async addToCart(cartItem) {
      this.cartAdd = true;

      const config = useRuntimeConfig(); // Get runtime config
      const baseURL = config.public.baseURL; // Access baseURL

      const authStore = useAuthStore(); // Access the auth store
      const token = authStore.token; // Get the token from the auth store
      console.log("RADHA",token);
      try {
        const response = await $fetch(`${baseURL}/cart/add-item`, {
          method: 'POST',
          headers: {
              'Authorization': `Bearer ${token}`, // Include the Authorization header
              'Content-Type': 'application/json', // Set content type to application/json
          },
          body: cartItem, // Make sure cartItem is an object that matches the expected structure
      });

        // Handle response data
        if (response.success) {
          this.cartItems.push(cartItem); // Update state
          this.cartAdd = false;
          this.cartUpdated = true;
        } else {
          // Handle errors here if needed
          console.error('Error adding to cart', response.message);
        }
      } catch (error) {
        console.error('API Error:', error);
      }
    },
    
    removeItem(productId) {
      this.items = this.items.filter((item) => item.productId !== productId)
    },

    clearCart() {
      this.items = []
    },
  },
})
