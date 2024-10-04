import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
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
    addItem(productId, price, quantity = 1) {
      const item = this.items.find((item) => item.productId === productId)
      if (item) {
        item.quantity += quantity
      } else {
        this.items.push({ productId, quantity, price })
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
