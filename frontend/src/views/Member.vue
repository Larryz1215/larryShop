<template lang="">
  <div v-loading="loading" element-loading-text="載入中..." class="relative">
    <div class="p-6">
      <el-card class="w-full mt-10">
        <h2 class="text-xl font-semibold mb-4">個人資料</h2>
        <el-form :model="user" label-width="100px">
          <el-form-item label="會員編號">
            <span>{{ user.user.id }}</span>
          </el-form-item>
          <el-form-item label="使用者名稱">
            <span>{{ user.user.name }}</span>
          </el-form-item>
          <el-form-item label="Email">
            <span>{{ user.user.email }}</span>
          </el-form-item>
        </el-form>
      </el-card>

      <h2 class="text-xl font-semibold mt-6 mb-2">訂單紀錄</h2>

      <!-- v-loading 指令需套在 block element 上，例如 div -->

      <div v-if="orders.length === 0 && !loading" class="text-center text-gray-500">
        <p>目前沒有訂單紀錄</p>
      </div>

      <div v-else>
        <el-collapse accordion>
          <el-collapse-item v-for="order in orders" :key="order.id" :name="String(order.id)">
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
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { useUserStore } from '../stores/user';
const { user } = useUserStore();
const orders = ref([]);
const loading = ref(true);

onMounted(async () => {
  try {
    const res = await fetch(`/api/users/${user.user.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`
      }
    });
    if (res.ok) {
      const result = await res.json();
      orders.value = result.user.orders;
    }
  } catch (error) {
    console.error('載入商品錯誤', error);
  } finally {
    loading.value = false;
  }
});
const formatDate = (dateStr) => new Date(dateStr).toLocaleString();
</script>
<style lang=""></style>
