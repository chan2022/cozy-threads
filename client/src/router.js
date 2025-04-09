import { createRouter, createWebHistory } from 'vue-router';
import Clothing from './components/products/clothing.vue';
import Accessories from './components/products/accessories.vue';
import Cart from './components/cart.vue';
import Checkout from './components/checkout.vue';
import OrderPlaced from './components/order-placed.vue';

const routes = [
  {
    path: '/clothing',
    name: 'Clothing',
    component: Clothing,
  },
  {
    path: '/accessories',
    name: 'Accessories',
    component: Accessories,
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
  },
  {
    path: '/checkout',
    name: 'Checkout', 
    component: Checkout,
  },
  {
    path: '/order-placed',
    name: 'OrderPlaced',
    component: OrderPlaced,
  },
  {
    path: '/',
    redirect: '/clothing',
  },
];

const router = createRouter({
  history: createWebHistory('/'),
  routes,
});

export default router;