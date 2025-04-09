import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    cart: []
  }),
  getters: {
    totalItems: (state) => state.cart.reduce((sum, item) => sum + item.quantity, 0),
    totalPrice: (state) => state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
  },
  actions: {
    addToCart(product) {
      const existingProduct = this.cart.find(
        (item) => item.id === product.id && item.size === product.size
      );

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        this.cart.push({ ...product, quantity: 1 });
      }
    },
    updateQuantity(product, amount) {
      const existingProduct = this.cart.find(
        (item) => item.id === product.id && item.size === product.size
      );
    
      if (existingProduct) {
        existingProduct.quantity += amount;
        if (existingProduct.quantity <= 0) {
          this.removeFromCart(existingProduct);
        }
      }
    },    
    removeFromCart(product) {
      this.cart = this.cart.filter(
        (item) => item.id !== product.id || item.size !== product.size
      );
    },
    clearCart() {
      this.cart = [];
    }
  }
});
