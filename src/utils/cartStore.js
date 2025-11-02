import { reactive } from 'vue';
import { createCart, addToCart, getCart, removeCartItem } from '../api/cart';

export const cartStore = reactive({
  cartId: null,
  totalQuantity: 0,
  items: [],
  async init() {
    const existing = localStorage.getItem('shopify_cart_id');
    if (existing) {
      this.cartId = existing;
      const cart = await getCart(existing);
      this.totalQuantity = cart.totalQuantity;
      this.items = cart.lines.edges;
    } else {
      const newCart = await createCart();
      this.cartId = newCart.id;
      localStorage.setItem('shopify_cart_id', newCart.id);
      localStorage.setItem('shopify_checkout_url', newCart.checkoutUrl);
    }
  },

  async add(variantId, qty = 1) {
    this.totalQuantity = this.totalQuantity + 1;
    try {
      const updatedCart = await addToCart(this.cartId, variantId, qty);
      this.totalQuantity = updatedCart.totalQuantity;
      this.items = updatedCart.lines?.edges || this.items;
    } catch (err) {}
  },

  async remove(lineId) {
    this.items = this.items.filter((edge) => edge.node.id !== lineId);
    this.totalQuantity = Math.max(0, this.totalQuantity - 1);

    try {
      const updatedCart = await removeCartItem(this.cartId, lineId);
      this.totalQuantity = updatedCart.totalQuantity;
      this.items = updatedCart.lines?.edges || [];
    } catch (err) {
      console.error('Remove failed:', err);
    }
  },
});
