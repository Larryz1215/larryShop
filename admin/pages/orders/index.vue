<template>
  <div class="container mx-auto p-6">
    <h2 class="text-2xl font-semibold mb-6 text-center">訂單管理</h2>

    <!-- 載入中或錯誤提示 -->
    <div v-if="pending" class="flex justify-center items-center">
      <!-- <el-spin></el-spin> -->
    </div>

    <div v-else-if="error" class="text-red-500 text-center">發生錯誤：{{ error.message }}</div>

    <!-- 訂單列表 -->
    <div v-else>
      <el-table :data="data.orders" stripe :default-sort="{ prop: 'id' }" class="w-full">
        <el-table-column label="訂單編號" prop="id" />
        <el-table-column label="總金額" prop="total">
          <template #default="{ row }">
            <span class="font-semibold">${{ row.total }}</span>
          </template>
        </el-table-column>
        <el-table-column label="創建時間" prop="createdAt">
          <template #default="{ row }">
            <span>{{ new Date(row.createdAt).toLocaleString() }}</span>
          </template>
        </el-table-column>
        <el-table-column label="商品數量">
          <template #default="{ row }">
            <span>{{ row.items.length }} 項</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button type="primary" size="small" @click="goToDetail(row.id)"> 查看 </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin'
});

const { data, pending, error, refresh } = await useFetch('/api/orders');
const router = useRouter();
const goToDetail = (id) => {
  router.push(`/orders/${id}`);
};
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
}

.el-table {
  background-color: #fff;
  border-radius: 8px;
}

.el-button {
  font-size: 14px;
}
</style>
