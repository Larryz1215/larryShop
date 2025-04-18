<template lang="">
  <el-header class="flex items-center justify-between px-6 bg-gray-100 shadow z-10">
    <!-- Logo -->
    <div @click="goIndex()" class="text-xl font-bold cursor-pointer">MyShop</div>
    <div class="flex items-center gap-4">
      <ShoppingCart />
      <!-- User Dropdown -->
      <el-dropdown trigger="click">
        <span class="cursor-pointer flex items-center gap-2">
          <el-icon :size="25"><User /></el-icon>
          <el-icon><ArrowDown /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>個人資料</el-dropdown-item>
            <el-dropdown-item @click="goLogin()"> {{ isLogin ? '登出' : '登入' }}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>
<script setup>
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/user';

const userStore = useUserStore();
const user = userStore.user;
const isLogin = userStore.isLogin;
const router = useRouter();
const goIndex = () => {
  router.push('/');
};
const goLogin = () => {
  router.push('/login');
};
</script>
<style lang=""></style>
