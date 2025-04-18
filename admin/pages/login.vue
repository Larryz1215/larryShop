<template>
  <div class="flex h-screen items-center justify-center bg-gray-100">
    <div class="p-6 bg-white rounded shadow w-96">
      <h2 class="text-xl font-bold mb-4">管理員登入</h2>
      <form @submit.prevent="login">
        <input v-model="username" placeholder="帳號" class="input mb-2" />
        <input type="password" v-model="password" placeholder="密碼" class="input mb-4" />
        <button class="btn w-full bg-blue-500 text-white">登入</button>   
      </form>
    </div>
  </div>
</template>

<script setup>
const username = ref('');
const password = ref('');
const login = () => {
  // 這邊未來接 API
  alert(`登入帳號：${username.value}`);
};
</script>

<style scoped>
.input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 6px;
}
</style>
