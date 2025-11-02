import { reactive } from 'vue';
import { fetchProducts } from '../api/fetchProducts';

export const productStore = reactive({
  items: [],
  isLoading: false,
  async init() {
    if (this.items.length > 0 || this.isLoading) return;

    this.isLoading = true;
    try {
      const data = await fetchProducts();
      this.items = data;
    } catch (err) {
      console.error(err);
    } finally {
      this.isLoading = false;
    }
  },
});
