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
        <div class="flex justify-between">
          <el-form-item>
            <router-link to="/register" class="float-right text-sm">註冊帳號</router-link>
          </el-form-item>
          <el-form-item>
            <router-link to="/forgot-password" class="float-right text-sm">忘記密碼</router-link>
          </el-form-item>
        </div>
        <el-button type="primary" class="w-full" @click="login">登入</el-button>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import { useAuthStore } from '../stores/auth';
import { useUserStore } from '../stores/user';
import { useRouter } from 'vue-router';

const router = useRouter();

const form = ref({
  email: '',
  password: ''
});
const formRef = ref(null);
const auth = useAuthStore();
const user = useUserStore();
const login = async () => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value)
    });

    const result = await res.json(); // 🔹重點：解析 response 的 JSON 內容

    if (result.token) {
      // auth.setToken(result.token);
      // auth.setUser(result.user);
      user.login(result);
      ElMessage.success('登入成功');
      router.push('/');
    } else {
      throw new Error(result.message || '登入失敗');
    }
  } catch (error) {
    console.error('登入失敗:', error);
    ElMessage.error(error.message || '帳號或密碼錯誤');
  }
};
</script>
