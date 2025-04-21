import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore(
  'auth',
  () => {
    const token = ref(null);
    const user = ref(null);

    function setToken(val) {
      token.value = val;
    }

    function setUser(val) {
      user.value = val;
    }

    function logout() {
      token.value = null;
      user.value = null;
    }

    return {
      token,
      user,
      setToken,
      setUser,
      logout
    };
  },
  {
    persist: true
  }
);
