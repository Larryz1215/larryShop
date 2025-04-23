<template>
  <el-container class="h-screen">
    <!-- Header -->
    <el-header class="flex items-center justify-between px-6 bg-gray-100 shadow z-10">
      <!-- Logo -->
      <div @click="goIndex" class="text-xl font-bold">🛒 後台管理</div>

      <!-- User Dropdown -->
      <ClientOnly>
        <el-dropdown trigger="click">
          <span class="cursor-pointer flex items-center gap-2">
            <el-icon><User /></el-icon>
            <span>管理者</span>
            <el-icon><ArrowDown /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>個人資料</el-dropdown-item>
              <el-dropdown-item divided @click="logout">登出</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </ClientOnly>
    </el-header>

    <!-- Sidebar + Main Content -->
    <el-container>
      <!-- Sidebar -->
      <el-aside width="220px" class="bg-white shadow">
        <el-menu :default-active="activeMenu" class="el-menu-vertical-demo h-full" @select="handleMenuClick">
          <el-menu-item index="products">📦 商品列表</el-menu-item>
          <el-menu-item index="product-add">➕ 新增商品</el-menu-item>
          <el-menu-item index="orders">🧾 訂單</el-menu-item>
          <el-sub-menu index="system">
            <template #title
              ><el-icon><Setting /></el-icon> 系統管理</template
            >
            <el-menu-item index="users">👤 會員管理</el-menu-item>
            <el-menu-item index="admin">👑 管理員頁面</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-aside>

      <!-- Main Content -->
      <el-main class="bg-gray-50 p-6">
        <slot />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import { useAuthStore } from '~/store/auth';

const authStore = useAuthStore();
const activeMenu = ref('');
const router = useRouter();

const handleMenuClick = (index: string) => {
  activeMenu.value = index;
  // 模擬導頁
  switch (index) {
    case 'products':
      router.push('/products');
      break;
    case 'product-add':
      router.push('/addProducts');
      break;
    case 'orders':
      router.push('/orders');
      break;
    case 'users':
      router.push('/users');
      break;
    case 'admin':
      router.push('/admin');
      break;
  }
};

const goIndex = () => {
  router.push('/');
};
const logout = () => {
  // 登出邏輯
  authStore.logout();
  router.push('/login');
};
</script>

<style scoped>
/* 可視需要調整樣式 */
</style>
