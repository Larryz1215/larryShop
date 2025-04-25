<template>
  <div class="max-w-md mx-auto mt-20 p-6 bg-white shadow rounded">
    <h2 class="text-xl font-bold mb-4">後台管理員登入</h2>
    <el-input v-model="adminName" placeholder="帳號" class="mb-4" />
    <el-input v-model="password" type="password" placeholder="密碼" class="mb-4" />
    <el-button type="primary" class="w-full" @click="login">登入</el-button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { useAuthStore } from '@/store/auth';
const router = useRouter();

const adminName = ref('');
const password = ref('');

const login = async () => {
  const authStore = useAuthStore();
  const result = await $fetch('/api/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ adminName: adminName.value, password: password.value })
  });

  // const result = await res.json();

  if (result.success) {
    ElMessage.success('登入成功');
    authStore.setAuth(result.admin, result.token);
    router.push('/');
  } else {
    ElMessage.error(result.message);
  }
};
</script>
