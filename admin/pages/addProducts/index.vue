<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold mb-4">商品管理</h1>

    <form @submit.prevent="createProduct" class="space-y-2">
      <input v-model="form.name" placeholder="商品名稱" class="input" />
      <input v-model.number="form.price" placeholder="價格" type="number" class="input" />
      <input v-model.number="form.stock" placeholder="庫存" type="number" class="input" />
      <button class="btn">新增商品</button>
    </form>

    <hr class="my-4" />
    <div v-if="pending">載入中...</div>
    <div v-else>
      <ul>
        <li v-for="product in products" :key="product.id">{{ product.name }} - ${{ product.price }} - 庫存: {{ product.stock }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin'
});
const form = reactive({
  name: '',
  price: 0,
  stock: 0
});

const { data: products, refresh, pending, error } = await useFetch('/api/products');

if (pending) {
  console.log('Loading...');
}

if (error) {
  console.error('Error fetching products:', error);
}

if (products) {
  console.log('Fetched products:', products);
}
async function createProduct() {
  await $fetch('/api/products', {
    method: 'POST',
    body: form
  });
}
</script>

<style scoped>
.input {
  @apply border px-3 py-1 rounded w-full;
}
.btn {
  @apply bg-blue-500 text-white px-4 py-2 rounded;
}
</style>
