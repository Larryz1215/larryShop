import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useUserStore = defineStore(
  'user',
  () => {
    const isLogin = ref(false);
    const user = ref({});
    const token = ref('');
    const login = (userData) => {
      isLogin.value = true;
      user.value = userData;
      token.value = userData.token;
    };
    const logout = () => {
      isLogin.value = false;
      user.value = {};
      token.value = '';
    };

    return {
      isLogin,
      user,
      token,
      login,
      logout
    };
  },
  {
    persist: true
  }
);
