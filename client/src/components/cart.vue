<template>
  <div>
    <h2>Your Shopping Bag</h2>
    <div v-if="cartStore.cart.length === 0">Your bag is empty.</div>
    <div v-else>
      <div v-for="item in cartStore.cart" :key="item.id" class="cart-item-card">

        <img :src="item.image" :alt="item.name" class="cart-item-card__image" />

        <div class="cart-item-card__details">
          <h3>{{ item.name }}</h3>
          <p>Size: {{ item.size }}</p>
          <div class="cart-item-card__actions">
            <button @click="cartStore.removeFromCart(item)" class="trash-button">
              <img src="/assets/trash-bin.svg" alt="Trash Bin" class="trash-icon" />
            </button>
            <button @click="cartStore.updateQuantity(item, -1)" :disabled="item.quantity <= 1" class="quantity-button">-</button>
            <span>{{ item.quantity }}</span>
            <button @click="cartStore.updateQuantity(item, 1)" class="quantity-button">+</button>
          </div>
        </div>
        
        <p class="cart-item-card__price">${{ (item.price * item.quantity).toFixed(2) }}</p>
      </div>

      <div class="cart-summary">
        <span>Subtotal ({{ cartStore.totalItems }} item{{ cartStore.totalItems > 1 ? 's' : '' }}):</span>
        <span class="subtotal-price">${{ cartStore.totalPrice.toFixed(2) }}</span>
      </div>

      <div class="checkout-container">
        <button @click="proceedToCheckout" class="checkout-button">Proceed to Checkout</button>
      </div>
    </div>
  </div>
</template>

<script>
import { useCartStore } from '../stores/cart.js';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const cartStore = useCartStore();
    const router = useRouter();

    const proceedToCheckout = () => {
      router.push({ name: 'Checkout' });
    };

    return { cartStore, proceedToCheckout };
  }
};
</script>

<style scoped lang="scss">
.cart-item-card {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding: 20px;
  border-radius: 12px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  margin-bottom: 20px;
}

.cart-item-card__image {
  width: 100px;
  height: 100px;
  border-radius: 8px;
  object-fit: cover;
}

.cart-item-card__details {
  flex-grow: 1;
}

.cart-item-card__actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.trash-button {
  background-color: transparent;
  border: none;
  cursor: pointer;
}

.trash-icon {
  width: 20px;
  height: 20px;
}

.quantity-button {
  padding: 8px 12px;
  border: none;
  background-color: transparent;
  color: black; 
  cursor: pointer;
  font-size: 16px;
}

.quantity-button:disabled {
  cursor: not-allowed;
}

.cart-item-card__price {
  font-weight: bold;
  font-size: 18px;
  align-self: start;
}

.cart-summary {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  font-weight: bold;
  margin-top: 20px;
}

.subtotal-price {
  font-size: 18px;
  font-weight: bold;
}

.checkout-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}

.checkout-button {
  padding: 8px 40px;
  background-color: #836953;
  color: white;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  transition: background-color 0.3s;
}

.checkout-button:hover {
  background-color: #D6CCC2;
}

.checkout-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
