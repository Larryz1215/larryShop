<template>
  <div class="max-w-md mx-auto mt-20 p-6 bg-white shadow rounded">
    <h2 class="text-xl font-bold mb-4">重設密碼</h2>
    <el-input v-model="newPassword" type="password" placeholder="輸入新密碼" />
    <el-button type="primary" class="mt-4 w-full" @click="submit">更新密碼</el-button>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { ref } from 'vue';
import { ElMessage } from 'element-plus';

const route = useRoute();
const router = useRouter();
const newPassword = ref('');
const token = route.query.token;

const submit = async () => {
  const res = await fetch('/api/auth/reset-password', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token, newPassword: newPassword.value })
  });

  const result = await res.json();
  if (result.success) {
    ElMessage.success('密碼更新成功');
    router.push('/login');
  } else {
    ElMessage.error(result.message);
  }
};
</script>
