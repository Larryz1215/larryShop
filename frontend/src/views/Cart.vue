<template>
  <div class="max-w-4xl mx-auto p-4">
    <h2 class="text-2xl font-semibold text-center mb-6">購物車</h2>
    <div class="border border-gray-300 rounded-lg shadow-lg p-6 bg-white">
      <ul class="space-y-4">
        <li v-for="item in cart.items" :key="item.id" class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <span class="font-medium text-lg">{{ item.name }}</span>
            <span class="text-gray-500">x {{ item.qty }}</span>
          </div>
          <div class="flex items-center space-x-2">
            <span class="text-gray-600 text-lg">${{ item.price * item.qty }}</span>
            <button @click="cart.removeFromCart(item.id)" class="bg-red-500 text-white py-1 px-4 rounded-lg hover:bg-red-600 transition duration-200">移除</button>
          </div>
        </li>
      </ul>
      <div class="mt-6 flex justify-between items-center text-lg font-semibold">
        <span>總金額：</span>
        <span>${{ cart.totalPrice }}</span>
      </div>
      <div class="mt-4 flex space-x-4">
        <button @click="submitOrder" :disabled="cart.items.length === 0" class="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 transition duration-200">
          {{ loading ? '提交中...' : '送出訂單' }}
        </button>
        <button @click="cart.clearCart" class="bg-gray-500 text-white py-2 px-6 rounded-lg hover:bg-gray-600 transition duration-200">清空購物車</button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useCartStore } from '../stores/cart';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { ElMessage } from 'element-plus';

const cart = useCartStore();
const loading = ref(false);
const router = useRouter();

// 送出訂單
const submitOrder = async () => {
  loading.value = true;
  try {
    // 先檢查每個商品是否庫存足夠
    const res = await fetch('http://localhost:3000/api/products/stock-check', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: cart.items })
    });

    const result = await res.json();

    if (!result.success) {
      ElMessage.error(`❌ ${result.message}`);
      loading.value = false;
      return;
    }

    // 提交訂單
    const orderRes = await fetch('http://localhost:3000/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: cart.items,
        total: cart.totalPrice
      })
    });

    const orderData = await orderRes.json();

    if (orderData.success) {
      ElMessage.success('✅ 訂單已建立');
      cart.clearCart();
      router.push(`/`);
    } else {
      ElMessage.error('❌ 訂單建立失敗');
    }
  } catch (error) {
    ElMessage.error('❌ 發生錯誤，請稍後再試');
  } finally {
    loading.value = false;
  }
};
</script>
