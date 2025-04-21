<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold mb-4">新增商品</h1>

    <form @submit.prevent="createProduct" class="space-y-4">
      <div>
        <span class="block mb-1 text-gray-600">商品名稱</span>
        <input v-model="form.name" placeholder="請輸入商品名稱" class="input w-full border rounded px-3 py-2" />
      </div>

      <div>
        <span class="block mb-1 text-gray-600">商品描述</span>
        <input v-model="form.description" placeholder="請輸入商品描述" class="input w-full border rounded px-3 py-2" />
      </div>

      <div>
        <span class="block mb-1 text-gray-600">價格</span>
        <input v-model.number="form.price" type="number" placeholder="請輸入價格" class="input w-full border rounded px-3 py-2" />
      </div>

      <div>
        <span class="block mb-1 text-gray-600">庫存</span>
        <input v-model.number="form.stock" type="number" placeholder="請輸入庫存" class="input w-full border rounded px-3 py-2" />
      </div>

      <button class="btn bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">新增商品</button>
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
import { ElMessage } from 'element-plus';

definePageMeta({
  layout: 'admin'
});
const form = reactive({
  name: '',
  price: 0,
  stock: 0,
  description: ''
});

const {
  data: products,
  refresh,
  pending,
  error
} = await useFetch('/api/products', {
  immediate: true
});
// 這裡的 immediate: true 是為了在組件掛載時立即獲取資料

// 監聽取得商品的狀態
watchEffect(() => {
  if (pending.value) {
    console.log('Loading...');
  } else if (error.value) {
    console.error('Fetch error:', error.value);
  } else if (products.value) {
    console.log('Fetch success:', products.value);
  }
});

async function createProduct() {
  try {
    await $fetch('/api/products', {
      method: 'POST',
      body: form
    });
    ElMessage({
      message: '商品新增成功！',
      type: 'success',
      duration: 2000
    });
    // 清空表單（可選）
    form.name = '';
    form.description = '';
    form.price = 0;
    form.stock = 0;
  } catch (error) {
    console.error('新增商品失敗:', error);
    ElMessage({
      message: '商品新增失敗，請稍後再試。',
      type: 'error',
      duration: 2000
    });
  }
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
