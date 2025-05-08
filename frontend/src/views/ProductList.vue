<!-- frontend/src/views/ProductList.vue -->
<template>
  <div>
    <h1>商品列表</h1>
    <div class="grid md:grid-cols-3 gap-4">
      <div v-for="product in products" :key="product.id" class="border p-4 rounded-lg shadow">
        <h2 class="text-lg font-semibold">{{ product.name }}</h2>
        <p class="text-sm text-gray-600 mb-1">NT$ {{ product.price }}</p>
        <p class="text-sm text-gray-500 mb-3">{{ product.description }}</p>
        <p>庫存:{{ product.stock }}</p>
        <el-button @click="addToCart(product)" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">加入購物車</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useCartStore } from '../stores/cart';

const cart = useCartStore();
const products = ref([]);

onMounted(async () => {
  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/products`);
  products.value = await res.json();
});

const addToCart = (product) => {
  cart.addToCart(product);
};
</script>
