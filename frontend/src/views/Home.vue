<template>
  <header></header>
  <div class="p-6">
    <div v-if="loading" class="text-gray-500">載入中...</div>

    <div class="grid md:grid-cols-3 gap-4" v-else>
      <div v-for="product in products" :key="product.id" class="border p-4 rounded-lg shadow" @click="toDetail(product.id)">
        <h2 class="text-lg font-semibold">{{ product.name }}</h2>
        <p class="text-sm text-gray-600 mb-1">NT$ {{ product.price }}</p>
        <p class="text-sm text-gray-500 mb-3">{{ product.description }}</p>
        <p>庫存:{{ product.stock }}</p>
        <el-button @click="addToCart(product)" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-2">加入購物車</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useCartStore } from '../stores/cart';
import { useRouter } from 'vue-router';

const router = useRouter();
const products = ref([]);
const loading = ref(true);
const cart = useCartStore();

const fetchProducts = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/products`);
  const data = await res.json();
  products.value = data;
  loading.value = false;
};

const addToCart = (product) => {
  cart.addToCart(product);
};

const toDetail = (id) => {
  router.push(`/products/${id}`);
};

onMounted(fetchProducts);
</script>
