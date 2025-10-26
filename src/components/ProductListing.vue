<template>
  <div class="product-grid">
    <div v-for="product in snowboardProducts" :key="product.id" class="product-card">
      <div class="product-container">
        <div class="product-image-container">
          <img
            v-if="product.images.edges.length"
            :src="product.images.edges[0].node.src"
            :alt="product.title"
            class="product-image"
          />
        </div>

        <h2 class="product-title">{{ product.title }}</h2>
        <span class="product-price">${{ product.variants.edges[0].node.price.amount }}</span>

        <button class="product-details" @click="viewDetails(product)">View Details</button>
        <button @click="addToCart(product)">Add to Cart</button>
      </div>
    </div>

    <ProductDialog
      v-if="selectedProduct"
      :product="selectedProduct"
      :open="showDialog"
      @close="closeDialog"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { fetchProducts } from '../api/fetchProducts.js';
import ProductDialog from './ProductDialog.vue';

const products = ref([]);
const selectedProduct = ref(null);
const showDialog = ref(false);

function viewDetails(product) {
  selectedProduct.value = product;
  showDialog.value = true;
}

function closeDialog() {
  showDialog.value = false;
}

const snowboardProducts = computed(() =>
  products.value.filter((p) => p.productType === 'snowboard' && p.images.edges.length > 0)
);

const images = ref(
  products.value.map((product) => {
    if (product.images.edges.length) {
      return product.images.edges[0].node.src;
    }
    return null;
  })
);

const addToCart = (product) => {
  console.log('Adding to cart:', product.title);
  // Implement add to cart functionality here
};

onMounted(async () => {
  products.value = await fetchProducts();
  console.log('Fetched products:', products.value);
});
</script>

<style lang="css" scoped>
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
  color: #282828;
}

.product-card {
  display: grid;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  border-radius: 10px;
  padding: 15px;
}

.product-container {
  display: grid;
  align-items: center;
}

.product-title {
  font-size: 1.2em;
  margin-top: 10px;
  text-align: center;
  color: #333;
}

.product-image {
  width: 100%;
  height: auto;
  aspect-ratio: 16/9;
  object-fit: scale-down;
  border-radius: 8px;
}

button {
  background-color: transparent;
  color: #282828;
  font-size: 1em;
  border: 2px solid #282828;
  margin-top: 10px;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
}
</style>
