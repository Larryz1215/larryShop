<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md p-8 bg-white rounded shadow">
      <h2 class="text-2xl font-bold mb-6 text-center">會員登入</h2>
      <el-form :model="form" ref="formRef" class="space-y-4">
        <el-form-item label="帳號">
          <el-input v-model="form.email" placeholder="請輸入 Email" />
        </el-form-item>
        <el-form-item label="密碼">
          <el-input v-model="form.password" placeholder="請輸入密碼" type="password" show-password />
        </el-form-item>
        <el-button type="primary" class="w-full" @click="login">登入</el-button>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import { useAuthStore } from '@/stores/auth';

const form = ref({
  email: '',
  password: ''
});
const formRef = ref(null);
const auth = useAuthStore();

const login = async () => {
  try {
    const response = await $fetch('/api/login', {
      method: 'POST',
      body: form.value
    });

    if (response.token) {
      auth.setToken(response.token);
      auth.setUser(response.user);
      ElMessage.success('登入成功');
      navigateTo('/'); // 登入後導向首頁或其他頁面
    } else {
      throw new Error('登入回傳資料異常');
    }
  } catch (error) {
    console.error('登入失敗:', error);
    ElMessage.error('帳號或密碼錯誤');
  }
};
</script>
