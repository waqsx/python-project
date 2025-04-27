import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
    proxy: {
      // Пример прокси если нужно
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  },
  preview: {
    port: 5173
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      }
    },
    outDir: 'dist'
  }
})