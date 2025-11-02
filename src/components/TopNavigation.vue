<template>
  <nav class="top-nav">
    <div class="nav-inner">
      <div class="nav-left">
        <div class="top-nav__fixture" @click="goHome">
          <img src="../assets/snowflake.svg" alt="Shopify Demo Logo" class="nav-logo" />
          <h1 class="nav-title">Shopify Demo</h1>
        </div>
      </div>

      <div class="nav-right">
        <button type="button" aria-label="Open cart" class="nav-btn top-nav__cart" @click="$emit('cart')">
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M4 4H5.6L6.4 6.4M8 13H17.2L20 6.4H6.4M8 13L6.4 6.4M9 20C9.55228 20 10 19.5523 10 19C10 18.4477 9.55228 18 9 18C8.44772 18 8 18.4477 8 19C8 19.5523 8.44772 20 9 20ZM17 20C17.5523 20 18 19.5523 18 19C18 18.4477 17.5523 18 17 18C16.4477 18 16 18.4477 16 19C16 19.5523 16.4477 20 17 20Z"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <span v-if="cartCount > 0" class="top-nav__cart-count">{{ cartCount }}</span>
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { cartStore } from '../utils/cartStore';

const router = useRouter();
const emit = defineEmits(['cart', 'goHome']);

function goHome() {
  router.push('/');
}

const cartCount = computed(() => cartStore.totalQuantity);
</script>
