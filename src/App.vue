<template>
  <div class="app-container">
    <TopNavigation @cart="goToCart" />
    <RouterView />
  </div>
</template>

<script setup>
import TopNavigation from './components/TopNavigation.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
function goToCart() {
  router.push('/cart');
}
</script>
