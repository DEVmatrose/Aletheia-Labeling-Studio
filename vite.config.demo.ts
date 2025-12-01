import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

// Demo-specific configuration (standalone app, not library)
export default defineConfig({
  plugins: [vue()],
  root: resolve(__dirname, 'demo'),
  base: '/Aletheia-Labeling-Studio/',
  build: {
    outDir: resolve(__dirname, 'docs'),
    emptyOutDir: true, // Clean build
    rollupOptions: {
      input: {
        demo: resolve(__dirname, 'demo/index.html'),
      },
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    }
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
