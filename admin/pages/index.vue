<template>
  <ClientOnly></ClientOnly>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';
import { useAuthStore } from '@/store/auth';

const router = useRouter();
const authStore = useAuthStore();
const admin = authStore.admin;
const token = authStore.token;

onMounted(() => {
  if (!admin || !token) {
    router.push('/login');
  }
});

definePageMeta({
  layout: 'admin',
  middleware: ['auth']
});
</script>

<style scoped>
.el-header {
  height: 60px;
  line-height: 60px;
}
.el-dropdown-menu {
  z-index: 9999 !important;
}
</style>
