<template>
  <main class="cart-page">
    <h1>Cart</h1>

    <div v-if="productData.length === 0">Your cart is empty.</div>

    <div v-else class="cart-page__list">
      <div v-for="item in productData" :key="item.id" class="cart-page__item-container">
        <div class="cart-page__img-container">
          <img :src="item.imageUrl" :alt="item.altText" class="cart-page__image" />
        </div>

        <div class="cart-item__details">
          <h2 class="cart-item__title">{{ item.title }}</h2>

          <div class="cart-item__meta">
            <span v-if="item.price?.amount" class="cart-item__price">
              {{ item.price.amount }} {{ item.price.currency }}
            </span>
            <div class="cart-item__quantity-container">
              <span class="cart-item__quantity">Quantity: {{ item.quantity }}</span>
            </div>
          </div>
        </div>
        <div class="cart-page__remove-item">
          <button class="remove-item" @click="cartStore.remove(item.id)">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-label="Close"
              role="img"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <a v-if="checkoutUrl && productData.length > 0" :href="checkoutUrl" class="checkout-btn" target="_blank"
      >Checkout</a
    >
  </main>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { cartStore } from '../utils/cartStore';

const productData = computed(() =>
  (cartStore.items || [])
    .map((line) => {
      if (!line?.node?.merchandise) return null;
      const variant = line.node.merchandise;
      const product = variant.product;
      return {
        id: line.node.id,
        title: product.title,
        price: variant.priceV2
          ? {
              amount: variant.priceV2.amount,
              currency: variant.priceV2.currencyCode,
            }
          : { amount: 0, currency: '' },
        quantity: line.node.quantity,
        imageUrl: variant.image?.url || product.featuredImage?.url || '',
        altText: variant.image?.altText || product.featuredImage?.altText || product.title,
      };
    })
    .filter(Boolean)
);

const checkoutUrl = computed(() => {
  const savedUrl = localStorage.getItem('shopify_checkout_url');
  return savedUrl || '';
});
</script>
