<template>
  <div>
    <div class="product-grid">
      <div v-for="product in products" :key="product.id" class="product-card">
        <div class="product-card__container" @mouseenter="showOptions(product.id)" @mouseleave="hideOptions(product.id)">
          <img :src="product.image" :alt="product.name" class="product-card__image" :class="{'product-card__image--hover': product.showOptions}" />
          <div v-if="product.showOptions" class="product-card__options">
            <select v-model="product.selectedSize" class="product-card__dropdown">
              <option disabled value="">Select Size</option>
              <option v-for="size in sizes" :key="size" :value="size">{{ size }}</option>
            </select>
            <button @click="addToBag(product)" class="product-card__button">Add to Bag</button>
          </div>
        </div>
        <h3 class="product-card__name">{{ product.name }}</h3>
        <p class="product-card__description">{{ product.description }}</p>
        <p class="product-card__price">${{ product.price.toFixed(2) }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import products from '../../enums/apparel-data.json';
import { useCartStore } from '../../stores/cart.js';

export default {
  name: 'Clothing',
  setup() {
    const cartStore = useCartStore();
    return { cartStore };
  },
  data() {
    return {
      products: products.map(product => ({
        ...product,
        showOptions: false,
        selectedSize: ''
      })),
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
    };
  },
  methods: {
    showOptions(id) {
      const product = this.products.find(p => p.id === id);
      if (product) product.showOptions = true;
    },
    hideOptions(id) {
      const product = this.products.find(p => p.id === id);
      if (product) product.showOptions = false;
    },
    addToBag(product) {
      if (!product.selectedSize) {
        alert('Please select a size.');
        return;
      }
      this.cartStore.addToCart({ ...product, size: product.selectedSize });
      product.selectedSize = '';
    }
  }
};
</script>

<style scoped lang="scss">
.product-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.product-card {
  border: none;
  padding: 20px;
  border-radius: 8px;
  text-align: left;
  background-color: #fff;

  &__container {
    position: relative;
  }

  &__image {
    width: 100%;
    max-width: 400px;
    height: auto;
    border-radius: 8px;
    transition: filter 0.3s;
  }

  &__image--hover {
    filter: grayscale(20%) brightness(80%);
  }

  &__options {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    padding: 10px;
    border-radius: 8px;
  }

  &__dropdown {
    margin-bottom: 8px;
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ccc;
  }

  &__button {
    background-color: white;
    color: black;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
  }

  &__button:hover {
    background-color: gray;
  }

  &__name, &__description, &__price {
    margin-bottom: 5px;
  }
}
</style>