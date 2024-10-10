import { defineStore } from "pinia";
import { useCartStore } from "./cart"; // Import the auth store
import { useCookies } from "vue3-cookies";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null, // Store the logged-in user info
    token: null, // Store the JWT or auth token
    otpStatus: null,
    expirationTime: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token, // Check if the user is authenticated based on token
    getUser: (state) => state.user, // Return user data
  },

  actions: {
    restoreAuthFromCookies() {
      const authToken = useCookie('authToken'); // Access token from cookie
      const userData = useCookie('userData'); // Access user data from cookie

      if (authToken.value && userData.value) {
        this.token = authToken.value; // Set token in state
        this.user = userData.value; // Set user data in state
      } else {
        this.token = null;
        this.user = null;
      }
    },

    logout() {
      // Clear user and token from state
      this.user = null;
      this.token = null;
      const cartStore = useCartStore();
      cartStore.clearCart();
      // Clear cookie
      const authToken = useCookie('authToken');
      const userData = useCookie('userData');
      const cartCookie = useCookie('cart');
      authToken.value = null; // Remove the token cookie
      userData.value = null; // Remove the token cookie
      cartCookie.value = null;
    },

    async sendLoginOtp(payload) {
      const config = useRuntimeConfig(); // Get runtime config
      const baseURL = config.public.baseURL; // Access baseURL
      try {
        const response  = await $fetch(`${baseURL}/send-login-otp`, {
          method: "POST",
          body: payload,
        });
        // Check for success in the response data
        if (response.success) {
          this.otpStatus = "OTP_SENT";
          this.expirationTime = response.otp_expiration_time;
          console.log(response.message);
          return response.message;
        } else {
          // Handle the case where success is false
          console.error("OTP failed:", response.message);
          this.otpStatus = "OTP_FAILED";
          throw new Error(response.message); // This will go to the catch block
        }
      } catch (error) {
        console.error('Failed to send OTP:', error);
        console.error('Error response:', error.response); // Log the response if available
        this.otpStatus = 'OTP_FAILED';
        throw error;
      }
    },

    async sendSignUpOtp(payload) {
      const config = useRuntimeConfig(); // Get runtime config
      const baseURL = config.public.baseURL; // Access baseURL
      try {
        const response  = await $fetch(`${baseURL}/send-signup-otp`, {
          method: "POST",
          body: payload,
        });
        // Check for success in the response data
        if (response.success) {
          this.otpStatus = "OTP_SENT";
          this.expirationTime = response.otp_expiration_time;
          console.log(response.message);
          return response.message;
        } else {
          // Handle the case where success is false
          console.error("OTP failed:", response.message);
          this.otpStatus = "OTP_FAILED";
          throw new Error(response.message); // This will go to the catch block
        }
      } catch (error) {
        console.error('Failed to send OTP:', error);
        console.error('Error response:', error.response); // Log the response if available
        this.otpStatus = 'OTP_FAILED';
        throw error;
      }
    },

    async verifySignUpOtp(payload) {
      const config = useRuntimeConfig(); // Get runtime config
      const baseURL = config.public.baseURL; // Access baseURL

      try {
        this.otpStatus = null;
        const cartCookie = useCookie('cartItems');
        if (cartCookie.value) {
          payload.cart = cartCookie.value; // Add cart cookie value to payload
        }

        const response = await $fetch(`${baseURL}/verify-signup-otp`, {
          method: 'POST',
          body: payload,
        });
        // Check the response for success
        if (response.success) {
          this.token = response.token; // Store the token in state
          this.user = response.user; // Store user info in state

          // Set the auth token in the cookie
          const authCookie = useCookie('authToken');
          authCookie.value = response.token; // Set the token in the cookie

          // Store user data as a string
          const userCookie = useCookie('userData');
          userCookie.value = JSON.stringify(response.user);

          const cartStore = useCartStore();
          cartStore.saveCartToServer();
          //cartStore.loadCart();
          return response; // Return the success message
        } else {
          //console.error("OTP failed:", response.message);
          if(response.code == 'expired'){
            this.otpStatus = "OTP_EXPIRED";
          }
          if(response.code == 'invalid'){
            this.otpStatus = "OTP_INVALID";
          }
          return response;
          //throw new Error(response.message);
        }
      } catch (error) {
        console.error('Failed to verify OTP:', error);
        return false;
      }
    },

    async verifyLoginOtp(payload) {
      const config = useRuntimeConfig(); // Get runtime config
      const baseURL = config.public.baseURL; // Access baseURL

      try {
        this.otpStatus = null;

        const response = await $fetch(`${baseURL}/verify-login-otp`, {
          method: 'POST',
          body: payload,
        });
        // Check the response for success
        if (response.success) {
          this.token = response.token; // Store the token in state
          this.user = response.user; // Store user info in state

          // Set the auth token in the cookie
          const authCookie = useCookie('authToken');
          authCookie.value = response.token; // Set the token in the cookie

          // Store user data as a string
          const userCookie = useCookie('userData');
          userCookie.value = JSON.stringify(response.user);

          const cartStore = useCartStore();
          cartStore.saveCartToServer();
          //cartStore.loadCart();
          
          return response; // Return the success message
        } else {
          //console.error("OTP failed:", response.message);
          if(response.code == 'expired'){
            this.otpStatus = "OTP_EXPIRED";
          }
          if(response.code == 'invalid'){
            this.otpStatus = "OTP_INVALID";
          }
          return response;
          //throw new Error(response.message);
        }
      } catch (error) {
        console.error('Failed to verify OTP:', error);
        return false;
      }
    },
  },
});
