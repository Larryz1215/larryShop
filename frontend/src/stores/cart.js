import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useCartStore = defineStore(
  'cart',
  () => {
    const items = ref([]);

    const addToCart = (product) => {
      const existing = items.value.find((item) => item.id === product.id);
      if (existing) {
        existing.qty++;
      } else {
        items.value.push({ ...product, qty: 1 });
      }
      console.log('Cart:', items.value);
    };

    const removeFromCart = (productId) => {
      items.value = items.value.filter((item) => item.id !== productId);
    };

    const clearCart = () => {
      items.value = [];
    };

    const chekout = () => {
      // Implement checkout logic here
      console.log('Checkout:', items.value);
      // Clear the cart after checkout
      clearCart();
    }

    const totalPrice = computed(() => items.value.reduce((total, item) => total + item.price * item.qty, 0));

    return {
      items,
      addToCart,
      removeFromCart,
      clearCart,
      totalPrice
    };
  },
  {
    persist: true
  }
);
