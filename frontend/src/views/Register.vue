<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <el-card class="w-full max-w-md">
      <h2 class="text-xl font-bold mb-4 text-center">會員註冊</h2>
      <el-form :model="form" :rules="rules" ref="formRef" label-position="top">
        <el-form-item label="使用者名稱" prop="name">
          <el-input v-model="form.name" placeholder="請輸入姓名" />
        </el-form-item>
        <el-form-item label="Email" prop="email">
          <el-input v-model="form.email" placeholder="請輸入電子郵件" />
        </el-form-item>
        <el-form-item label="密碼" prop="password">
          <el-input v-model="form.password" type="password" show-password placeholder="請輸入密碼" />
          <div class="mt-1 text-sm text-gray-500">
            密碼強度：<span :class="passwordStrength.color">{{ passwordStrength.label }}</span>
          </div>
        </el-form-item>
        <el-form-item label="確認密碼" prop="confirmPassword">
          <el-input v-model="form.confirmPassword" type="password" show-password placeholder="請再次輸入密碼" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="w-full" @click="submitForm">註冊</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';

const router = useRouter();
const formRef = ref();
const form = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
});

// 密碼強度提示
const passwordStrength = computed(() => {
  const pwd = form.value.password;
  if (pwd.length >= 12 && /[A-Z]/.test(pwd) && /\d/.test(pwd) && /\W/.test(pwd)) {
    return { label: '強', color: 'text-green-500' };
  } else if (pwd.length >= 8) {
    return { label: '中', color: 'text-yellow-500' };
  } else {
    return { label: '弱', color: 'text-red-500' };
  }
});

const validateConfirmPassword = (rule, value, callback) => {
  if (value !== form.value.password) {
    callback(new Error('兩次輸入密碼不一致'));
  } else {
    callback();
  }
};

const rules = {
  name: [{ required: true, message: '請輸入姓名', trigger: 'blur' }],
  email: [{ required: true, message: '請輸入 Email', trigger: 'blur' }],
  password: [{ required: true, message: '請輸入密碼', trigger: 'blur' }],
  confirmPassword: [{ required: true, validator: validateConfirmPassword, trigger: 'blur' }]
};

const submitForm = async () => {
  await formRef.value.validate(async (valid) => {
    if (!valid) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.value.name,
          email: form.value.email,
          password: form.value.password
        })
      });
      const result = await res.json();
      if (result.success) {
        ElMessage.success('註冊成功！');
        router.push('/login');
      } else {
        ElMessage.error(result.message || '註冊失敗');
      }
    } catch (err) {
      ElMessage.error('伺服器錯誤');
    }
  });
};
</script>
