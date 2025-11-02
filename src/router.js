import { createRouter, createWebHistory } from 'vue-router';
import Home from './pages/Home.vue';
import Cart from './pages/Cart.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/cart', name: 'Cart', component: Cart },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
