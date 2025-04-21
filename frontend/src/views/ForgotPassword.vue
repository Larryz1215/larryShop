<template>
  <div class="max-w-md mx-auto mt-20 p-6 bg-white shadow rounded">
    <h2 class="text-xl font-bold mb-4">忘記密碼</h2>
    <el-input v-model="email" placeholder="請輸入註冊 Email" />
    <el-button type="primary" class="mt-4 w-full" @click="submit">寄送重設連結</el-button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';

const email = ref('');

const submit = async () => {
  const res = await fetch('/api/auth/forgot-password', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email.value })
  });

  const result = await res.json();
  if (result.success) {
    ElMessage.success('已寄送密碼重設連結');
  } else {
    ElMessage.error(result.message);
  }
};
</script>
