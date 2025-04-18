// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from 'path';
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  nitro: {
    // devProxy: {
    //   '/api': 'http://localhost:3000'
    // }
  },
  alias: {
    '~': resolve(__dirname, './'),
    '@': resolve(__dirname, './')
  },
  imports: {
    dirs: ['server/lib'] // 讓你可以自動使用 prisma
  },
  runtimeConfig: {
    // 用 dotenv 控制資料庫連線
    public: {}
  },
  plugins: ['@/plugins/element-plus-icons.ts'],
  modules: ['@nuxtjs/tailwindcss']
});
