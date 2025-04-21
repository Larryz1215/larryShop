<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">會員詳情頁面{{ order?.id }}</h1>

    <el-card>
      <p>會員編號:{{ user?.user.id }}</p>
      <p>建立時間：{{ formatDate(user?.user.createdAt) }}</p>
      <p>會員名稱：{{ user?.user.name }}</p>
      <p>信箱：{{ user?.user.email }}</p>
    </el-card>

    <h2 class="text-xl font-semibold mt-6 mb-2">訂單紀錄</h2>

    <div v-if="user.user.orders.length === 0" class="text-center text-gray-500">
      <p>目前沒有訂單紀錄</p>
    </div>

    <div v-else>
      <el-collapse v-model="activeNames" accordion>
        <el-collapse-item v-for="order in user?.user.orders" :key="order.id" :name="String(order.id)">
          <template #title>
            <div class="flex justify-between w-full pl-3">
              <span>訂單編號：{{ order.id }}</span>
              <span>建立時間：{{ formatDate(order.createdAt) }}</span>
              <span>總金額：NT$ {{ order.total }}</span>
            </div>
          </template>

          <el-table :data="order.items" style="width: 100%" border>
            <el-table-column prop="product.name" label="商品名稱" />
            <el-table-column prop="quantity" label="數量" />
            <el-table-column prop="price" label="價格" />
          </el-table>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

definePageMeta({
  layout: 'admin'
});
const activeNames = ref([]);
const route = useRoute();
const { data: user } = await useFetch(() => `/api/users/${route.params.id}`);

const formatDate = (dateStr) => new Date(dateStr).toLocaleString();

const toUsers = () => {
  const router = useRouter();
  router.push('/users');
};
</script>
