<template>
  <div class="p-6">
    <div v-if="loading">載入中...</div>
    <div v-else-if="product" class="border p-4 rounded-lg shadow">
      <h2 class="text-lg font-semibold">{{ product.name }}</h2>
      <p class="text-sm text-gray-600 mb-1">NT$ {{ product.price }}</p>
      <p class="text-sm text-gray-500 mb-3">{{ product.description }}</p>
      <el-button @click="addToCart(product)" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">加入購物車</el-button>
    </div>
    <div v-else>
      <p class="text-red-500">找不到商品資料。</p>
    </div>
  </div>

</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useCartStore } from '../stores/cart';

const route = useRoute();
const cart = useCartStore();

const product = ref(null);
const loading = ref(true);

onMounted(async () => {
  try {
    const res = await fetch(`/api/products/${route.params.id}`);
    if (res.ok) {
      product.value = await res.json();
    }
  } catch (error) {
    console.error('載入商品錯誤', error);
  } finally {
    loading.value = false;
  }
});

function addToCart(product) {
  cart.addToCart(product);
}
</script>
