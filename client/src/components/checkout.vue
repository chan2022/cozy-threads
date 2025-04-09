<template>
  <div>
    <h1>Checkout Page</h1>

    <div class="cards-container">
      <!-- Delivery section -->
      <div class="card">
        <h2 class="card__header">Delivery Location</h2>

        <div v-if="addressSaved">
          <p><strong>Delivery to:</strong> {{ deliveryLocation.name }}</p>
          <p>{{ deliveryLocation.addressLine1 }} {{ deliveryLocation.addressLine2 }}, {{ deliveryLocation.city }}, {{ deliveryLocation.state }} {{ deliveryLocation.zip }}</p>
          <div style="display: flex; justify-content: flex-end;">
            <button class="card__form-action-button" @click="editAddress">Edit Address</button>
          </div>
        </div>

        <form v-else @submit.prevent="submitDeliveryLocation" class="card__form">
          <div class="card__form-group">
            <label for="name" class="card__form-label">Full Name:</label>
            <input type="text" id="name" v-model="deliveryLocation.name" required class="card__form-input" />
          </div>
          <div class="card__form-group">
            <label for="phone" class="card__form-label">Phone Number:</label>
            <input type="text" id="phone" v-model="deliveryLocation.phone" required class="card__form-input" />
          </div>
          <div class="card__form-group">
            <label for="addressLine1" class="card__form-label">Address Line 1:</label>
            <input type="text" id="addressLine1" v-model="deliveryLocation.addressLine1" required class="card__form-input" />
          </div>
          <div class="card__form-group">
            <label for="addressLine2" class="card__form-label">Address Line 2:</label>
            <input type="text" id="addressLine2" v-model="deliveryLocation.addressLine2" class="card__form-input" />
          </div>

          <div class="card__form-group card__row">
            <div class="card__half-width">
              <label for="city" class="card__form-label">City: </label>
              <input type="text" id="city" v-model="deliveryLocation.city" required class="card__form-input" style="width: 60%;" />
            </div>
            <div class="card__half-width">
              <label for="state" class="card__form-label">State: </label>
              <input type="text" id="state" v-model="deliveryLocation.state" required class="card__form-input" style="width: 60%;" />
            </div>
            <div class="card__half-width">
              <label for="zip" class="card__form-label">Zip Code: </label>
              <input type="text" id="zip" v-model="deliveryLocation.zip" required class="card__form-input" style="width: 50%;" />
            </div>
          </div>

          <div class="card__form-action">
            <button type="submit" class="card__form-action-button">Save Location</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Order Summary -->
    <div class="card">
      <div class="order-summary-header">
        <h2 class="order-summary__header card__header">Order Summary</h2>
        <p class="estimated-delivery-date"><strong>Estimated Delivery Date:</strong> {{ estimatedDeliveryDate }}</p>
      </div>
      <div v-for="item in itemsInCart" :key="item.id" class="order-summary__item">
        <img :src="item.image" alt="Product Image" class="order-summary__image" />
        <div class="order-summary__details">
          <h3>{{ item.name }}</h3>
          <p>Size: {{ item.size }} | Quantity: {{ item.quantity }} | Price: ${{ (item.price * item.quantity).toFixed(2) }}</p>
        </div>
      </div>
    </div>

    <!-- Place Order -->
    <div class="card">
      <h2 class="card__header">Payment Details</h2>
      <div id="payment-element"></div>
      <div style="display: flex; justify-content: flex-end; margin-top: 20px;">
        <button @click="handleSubmit" :disabled="!isOrderReady" class="place-order-button">Place Your Order</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useCartStore } from '../stores/cart.js';

export default {
  name: 'Checkout',
  setup() {
    const stripe = ref(null);
    const elements = ref(null);
    const paymentElement = ref(null);

    onMounted(async () => {
      stripe.value = Stripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
      
      try {
        const response = await fetch('http://localhost:3000/create-payment-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            items: useCartStore().cart
          }),
        });

        const { clientSecret } = await response.json();

        elements.value = stripe.value.elements({
          clientSecret
        });

        paymentElement.value = elements.value.create('payment');
        paymentElement.value.mount('#payment-element');
      } catch (error) {
        console.error('Error initializing payment:', error);
      }
    });

    const handleSubmit = async () => {
      if (!stripe.value || !elements.value) {
        return;
      }

      const { error } = await stripe.value.confirmPayment({
        elements: elements.value,
        confirmParams: {
          return_url: `${window.location.origin}/order-placed`,
        },
      });

      if (error) {
        console.error('Payment error:', error.message);
      }
    };

    return {
      handleSubmit,
      stripe,
      elements,
      paymentElement,
    };
  },
  data() {
    return {
      deliveryLocation: {
        name: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        zip: '',
        phone: '',
      },
      itemsInCart: [],
      totalAmount: 0,
      estimatedDeliveryDate: '',
      addressSaved: false
    };
  },
  computed: {
    isOrderReady() {
      return this.addressSaved;
    },
  },
  created() {
    const cartStore = useCartStore();
    this.itemsInCart = cartStore.cart;

    if (this.itemsInCart.length > 0) {
      this.totalAmount = this.itemsInCart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    } else {
      this.totalAmount = 0;
    }

    const daysToAdd = Math.floor(Math.random() * 3) + 5;
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + daysToAdd);
    this.estimatedDeliveryDate = deliveryDate.toDateString();
  },
  methods: {
    submitDeliveryLocation() {
      if (this.deliveryLocation.name && this.deliveryLocation.addressLine1 && this.deliveryLocation.city && this.deliveryLocation.state && this.deliveryLocation.zip && this.deliveryLocation.phone) {
        this.addressSaved = true;
        console.log("Address saved:", this.deliveryLocation);
      } else {
        alert('Please fill in all the fields!');
      }
    },
    editAddress() {
      this.addressSaved = false;
    }
  }
};
</script>

<style scoped lang="scss">
.cards-container {
  display: flex;
  gap: 20px;
  justify-content: space-between;
  margin-bottom: 20px;

  .card {
    padding: 20px;
    margin-bottom: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    flex: 1;
    max-width: 100%;

    @media (max-width: 768px) {
      max-width: 100%;
    }

    &__header {
      font-size: 1.5rem;
      margin-bottom: 15px;
    }

    &__form {
      display: flex;
      flex-direction: column;
      
      &-group {
        display: flex;
        justify-content: space-between;
        margin-bottom: 15px;
      }
      
      &-label {
        width: 30%;
        font-weight: bold;
      }
      
      &-input {
        width: 65%;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        gap: 10px;
      }
      
      &-action {
        display: flex;
        justify-content: flex-end;

        &-button {
          padding: 8px 16px;
          background-color: #836953;
          color: white;
          border: none;
          border-radius: 50px;
          cursor: pointer;
          margin-top: 10px;
          width: 20%;
          
          &:hover {
            background-color: #D6CCC2;
          }
        }
      }
      
      &-empty-line {
        height: 20px;
      }
      
      &__row {
        display: flex;
        gap: 10px;
      }
      
      &__half-width {
        width: 30%;
      }
    }
  }
}
.card {
  padding: 20px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  flex: 1;
  max-width: 100%;

  @media (max-width: 768px) {
    max-width: 100%;
  }

  &__header {
    font-size: 1.5rem;
    margin-bottom: 15px;
  }

  .order-summary-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    font-size: 1.5rem;
  }

  .estimated-delivery-date {
    margin-left: 20px;
    font-size: 1.2rem; 
    color: #666;
  }

  .order-summary__item {
    display: flex;
    margin-bottom: 15px;
    align-items: center;
  }

  .order-summary__image {
    width: 80px;
    height: auto;
    margin-right: 15px;
  }

  .order-summary__details {
    flex: 1;
  }

  .order-summary__details h3 {
    margin: 0;
  }

  .order-summary__details p {
    margin: 0;
    color: #666;
  }
}

.place-order-button {
  padding: 12px 24px;
  background-color: #836953;
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  width: 200px;
  
  &:hover {
    background-color: #D6CCC2;
  }
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
}
</style>