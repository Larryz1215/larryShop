<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">所有商品</h1>

    <div v-if="pending">載入中...</div>

    <div v-else class="grid md:grid-cols-3 gap-4">
      <div v-for="prod in product" :key="prod.id" class="border p-4 rounded shadow cursor-pointer" @click="editProduct(prod.id)">
        <!-- <img :src="prod?.image" alt="商品圖片" class="w-full h-48 object-cover rounded mb-3" /> -->
        <h2 class="text-lg font-semibold">{{ prod.name }}</h2>
        <p class="text-gray-600">NT$ {{ prod.price }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
const editProduct = (id: number) => {
  router.push(`/editProducts/${id}`);
};
definePageMeta({
  layout: 'admin'
});
// 用 useFetch 呼叫 API
const { data: product, pending, error } = await useFetch('/api/products');
</script>
