import { useAuthStore } from '~/store/auth';

export default defineNuxtRouteMiddleware(() => {
  if (process.server) return;

  const authStore = useAuthStore();

  if (!authStore.token || !authStore.admin) {
    return navigateTo('/login');
  }
});
