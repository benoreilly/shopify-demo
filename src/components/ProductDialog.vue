<!-- src/components/ProductDialog.vue -->
<template>
  <dialog ref="dialog" class="product-dialog">
    <article v-if="product">
      <header class="dialog-header">
        <h2>{{ product.title }}</h2>
        <button class="close-btn" @click="closeDialog">✕</button>
      </header>

      <div class="dialog-body">
        <img
          v-if="product.images?.edges?.length"
          :src="product.images.edges[0].node.src"
          :alt="product.title"
          class="dialog-image"
        />
        <p class="dialog-description">{{ product.description }}</p>
        <p class="dialog-price">Price: ${{ product.variants.edges[0].node.price.amount }}</p>
      </div>
    </article>
  </dialog>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  product: Object,
  open: Boolean,
});

const emit = defineEmits(['close']);

const dialog = ref(null);

watch(
  () => props.open,
  (isOpen) => {
    if (isOpen) dialog.value?.showModal();
    else dialog.value?.close();
  }
);

function closeDialog() {
  dialog.value?.close();
  emit('close');
}
</script>

<style scoped>
.product-dialog {
  border: none;
  border-radius: 10px;
  padding: 0;
  max-width: 600px;
  width: 90%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em;
  background: #009688;
  color: white;
}

.dialog-body {
  padding: 1em;
  background: #fff;
}

.dialog-image {
  width: 100%;
  border-radius: 6px;
  margin-bottom: 1em;
}

.close-btn {
  background: transparent;
  border: none;
  font-size: 1.2em;
  color: white;
  cursor: pointer;
}
</style>
