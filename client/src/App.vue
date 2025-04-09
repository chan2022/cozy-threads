<template>
  <div class="container">
    <div class="header">
      <router-link to="/clothing" class="header__brand-name-link">
        <h1 class="header__brand-name">COZY THREADS</h1>
      </router-link>
      <router-link to="/cart" class="header__cart-icon">
        <img src="/assets/shopping-cart-icon.svg" alt="Shopping Cart">
        <!-- Cart Item Count -->
        <span v-if="cartStore.totalItems > 0" class="cart-item-count">{{ cartStore.totalItems }}</span>
      </router-link>
    </div>

    <nav class="nav">
      <router-link to="/clothing" class="nav__link">Clothing</router-link>
      <router-link to="/accessories" class="nav__link">Accessories</router-link>
    </nav>
    
    <main class="main">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import { useCartStore } from './stores/cart.js';

export default {
  setup() {
    const cartStore = useCartStore();
    return { cartStore };
  },
};
</script>

<style scoped lang="scss">
.container {
  padding: 30px 35px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__brand-name-link {
    text-decoration: none;
    color: inherit;
  }

  &__brand-name {
    font-size: 4rem;
    font-weight: bold;
    font-family: 'Lora', serif;
    margin: 0;
    cursor: pointer;
  }

  &__cart-icon {
    position: relative;
  }

  &__cart-icon img {
    width: 80px;
    height: 80px;
    cursor: pointer;
  }

  .cart-item-count {
    position: absolute;
    top: 0px;
    right: 0px;
    background-color: #836953;
    color: white;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
  }
}

.nav {
  display: flex;
  gap: 20px;
  margin-bottom: 50px;

  .nav__link {
    text-decoration: none;
    color: inherit;
    font-size: 1.2rem;
    font-family: 'Lora', serif;
  }

  .nav__link:hover {
    text-decoration: underline;
  }
}

.router-link-active, .router-link-exact-active {
  color: inherit;
}
</style>
