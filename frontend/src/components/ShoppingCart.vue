<template>
  <el-badge :value="cartTotal" class="cursor-pointer" type="primary">
    <el-icon size="30" @click="$router.push('/cart')">
      <ShoppingCart />
    </el-icon>
  </el-badge>
</template>

<script setup>
import { ElBadge, ElIcon } from 'element-plus';
import { ShoppingCart } from '@element-plus/icons-vue';
import { useCartStore } from '../stores/cart';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const goCart = () => {
  router.push('/cart');
};
const cart = useCartStore();

// 總商品數量（可改為總件數或不同邏輯）
const cartTotal = computed(() => cart.items.length);
</script>

<style scoped>
.el-badge {
  vertical-align: middle;
}
</style>
