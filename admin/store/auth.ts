// store/auth.ts
import { defineStore } from 'pinia';

export const useAuthStore = defineStore(
  'auth',
  () => {
    const admin = ref(null);
    const token = useCookie('token'); // Nuxt 3 universal cookie
    const isLoggedIn = computed(() => !!token.value && !!admin.value);

    const setAuth = (adminData: any, jwtToken: string) => {
      admin.value = adminData;
      token.value = jwtToken; // 這會寫入 cookie
    };

    const logout = () => {
      admin.value = null;
      token.value = null; // 清除 cookie
    };

    return {
      admin,
      token,
      isLoggedIn,
      setAuth,
      logout
    };
  },
  {
    persist: true // Pinia Persisted State
  }
);
