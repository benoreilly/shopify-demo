<template>
  <div class="product-grid">
    <div v-for="product in snowboardProducts" :key="product.id" class="product-card">
      <div class="product-card__container">
        <div class="product-card__image-container">
          <img
            v-if="product.images.edges.length"
            :src="product.images.edges[0].node.src"
            :alt="product.title"
            class="product-card__image"
          />
        </div>
        <div class="product-card__content">
          <h2 class="product-card__title">{{ product.title }}</h2>
          <span class="product-card__price">${{ product.variants.edges[0].node.price.amount }}</span>
          <p class="product-card__desc">{{ generateIntro(product) }}</p>
        </div>

        <div class="product-card__actions">
          <button class="product-card__details-btn" @click="openDialog(product)">Quick View</button>
          <button class="product-card__add-to-cart" @click="addToCart(product)">Add to Cart</button>
        </div>
      </div>
    </div>

    <ProductDialog v-if="selectedProduct" ref="dialogRef" :product="selectedProduct" />
  </div>
</template>

<script setup>
import { ref, onMounted, computed, nextTick } from 'vue';
import { productStore } from '../utils/productStore';
import { cartStore } from '../utils/cartStore';
import { injectSlideoutStyles } from '../utils/slideoutStyleInjector.js';
import ProductDialog from './ProductDialog.vue';

const dialogRef = ref(null);
const selectedProduct = ref(null);

async function openDialog(product) {
  selectedProduct.value = product;
  await nextTick();
  dialogRef.value?.open();
}

const snowboardProducts = computed(() =>
  productStore.items.filter(
    (p) =>
      p.productType === 'snowboard' &&
      p.images?.edges?.length > 0 &&
      p.handle !== 'the-out-of-stock-snowboard'
  )
);

const generateIntro = (product) => {
  const productTitle = product.title;
  return product.description.replace(productTitle, '');
};

const addToCart = (product) => {
  const variantId = product.variants.edges[0].node.id;
  cartStore.add(variantId);
};

onMounted(async () => {
  injectSlideoutStyles();
  await cartStore.init();
  await productStore.init();
});
</script>
