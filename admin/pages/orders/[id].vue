<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">訂單詳情 #{{ order?.id }}</h1>

    <el-card>
      <p>建立時間：{{ formatDate(order?.createdAt) }}</p>
      <p>
        總金額：<strong class="text-red-500">${{ order?.total }}</strong>
      </p>
    </el-card>

    <h2 class="text-xl font-semibold mt-6 mb-2">商品清單</h2>
    <el-table :data="order?.items || []" stripe class="w-full">
      <el-table-column prop="product.name" label="商品名稱" />
      <el-table-column prop="quantity" label="數量" />
      <el-table-column prop="price" label="價格" />
      <el-table-column label="小計">
        <template #default="{ row }"> ${{ row?.price * row?.quantity }} </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin'
});
const route = useRoute();
const { data: order } = await useFetch(() => `/api/orders/${route.params.id}`);

const formatDate = (dateStr) => new Date(dateStr).toLocaleString();
</script>
