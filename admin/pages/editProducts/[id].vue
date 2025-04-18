<template lang="">
  <div class="max-w-xl mx-auto">
    <h2 class="text-2xl font-bold mb-4">✏️ 編輯商品</h2>
    <el-form :model="product" label-width="100px">
      <el-form-item label="名稱">
        <el-input v-model="product.name" />
      </el-form-item>
      <el-form-item label="價格">
        <el-input v-model.number="product.price" />
      </el-form-item>
      <el-form-item label="庫存">
        <el-input v-model.number="product.stock" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="updateProduct">更新</el-button>
        <el-button @click="router.back()">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';

definePageMeta({
  layout: 'admin'
});

const route = useRoute();
const router = useRouter();
const productId = route.params.id as string;

const product = ref({
  name: '',
  price: 0,
  stock: 0,
});

// 取得商品資料
const { data, error } = await useFetch(`/api/products/${productId}`);

if (data.value) {
  product.value = data.value;
} else {
  ElMessage.error('找不到商品');
  router.push('/products');
}

// 提交更新
const updateProduct = async () => {
  const res = await $fetch(`/api/products/${productId}`, {
    method: 'PUT',
    body: product.value
  });

  if (res && res.success) {
    ElMessage.success('商品更新成功！');
    router.push('/products');
  } else {
    ElMessage.error('更新失敗');
  }
};
</script>
<style lang=""></style>
