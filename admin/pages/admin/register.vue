<template>
  <div class="max-w-xl mx-auto p-6 bg-white rounded shadow mt-10">
    <h2 class="text-2xl font-bold mb-4">新增管理員</h2>
    <el-form :model="form" ref="formRef" label-width="100px">
      <el-form-item label="帳號">
        <el-input v-model="form.name" placeholder="輸入帳號" />
      </el-form-item>
      <el-form-item label="密碼">
        <el-input v-model="form.password" placeholder="輸入密碼" type="password" show-password />
      </el-form-item>
      <el-form-item label="信箱">
        <el-input v-model="form.email" placeholder="輸入信箱" type="email" />
      </el-form-item>
      <el-form-item label="最高權限">
        <el-switch v-model="form.isSuperAdmin" active-text="是" inactive-text="否" />
      </el-form-item>
      <el-form-item label="啟用帳號">
        <el-switch v-model="form.isActive" active-text="啟用" inactive-text="停用" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="createAdmin">新增管理員</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';

const router = useRouter();

const form = ref({
  username: '',
  password: '',
  email: '',
  isSuperAdmin: false,
  isActive: true
});

const formRef = ref(null);

const createAdmin = async () => {
  try {
    const res = await fetch('/api/admin/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value)
    });

    const result = await res.json();
    if (result.success) {
      ElMessage.success('✅ 管理員新增成功');
      form.value = {
        name: '',
        password: '',
        isSuperAdmin: false,
        isActive: true
      };
      router.push('/admin');
    } else {
      ElMessage.error(`❌ 新增失敗：${result.message}`);
    }
  } catch (error) {
    console.error(error);
    ElMessage.error('❌ 發生錯誤，請稍後再試');
  }
};
</script>
