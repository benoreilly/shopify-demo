<template>
  <dialog ref="dialog" class="product-dialog">
    <div v-if="product" class="product-dialog__container">
      <header class="product-dialog__header">
        <button type="button" class="product-dialog__close-btn" aria-label="Close" @click="close">
          &larr;
        </button>
        <h2 class="product-dialog__title">{{ product.title }}</h2>
      </header>

      <div class="product-dialog__body">
        <div class="product-dialog__col-left">
          <img
            v-if="product.images?.edges?.length"
            :src="product.images.edges[0].node.src"
            :alt="product.title"
            class="product-dialog__image"
          />
          <span class="product-dialog__id">Item #: {{ rawId }}</span>
          <p class="product-dialog__price">${{ product.variants.edges[0].node.price.amount }}</p>
        </div>
        <div class="product-dialog__col-right">
          <div class="product-dialog__description" v-html="product.descriptionHtml"></div>
        </div>
      </div>
    </div>
  </dialog>
</template>

<script setup>
import { ref, defineExpose, defineProps, computed } from 'vue';

const props = defineProps({
  product: {
    type: Object,
    default: null,
  },
});

const rawId = computed(() => {
  const id = props.product?.id;
  return id ? id.match(/\d+$/)?.[0] ?? null : null;
});

const dialog = ref(null);

function open() {
  if (dialog.value && !dialog.value.open) {
    dialog.value.showModal();
    document.body.style.overflow = 'hidden';
  }
}

function close() {
  if (dialog.value && dialog.value.open) {
    dialog.value.close();
    document.body.style.overflow = '';
  }
}

defineExpose({ open, close });
</script>
