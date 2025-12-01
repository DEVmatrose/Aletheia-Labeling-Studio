import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

// Demo-specific configuration (standalone app, not library)
export default defineConfig({
  plugins: [vue()],
  root: resolve(__dirname, 'demo'),
  base: './',
  build: {
    outDir: resolve(__dirname, 'docs'),
    emptyOutDir: false, // Don't delete .nojekyll and images/
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@demo': resolve(__dirname, 'demo'),
    },
  },
  server: {
    port: 5175,
  },
});
