import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    }),
    tailwindcss()
  ],
  server: {
    port: 5173 // 或你自己想要的 port
    // proxy: {
    //   '/api': 'http://localhost:3000' // 讓 frontend 透過 proxy 呼叫後台 API
    // }
  }
});
