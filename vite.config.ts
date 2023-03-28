import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import compression from 'vite-plugin-compression'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    compression({
      ext: '.gz', // Phần mở rộng của các tệp nén
      threshold: 1024, // Kích thước tệp tối thiểu được nén, tính bằng byte
      deleteOriginFile: false // Xóa tệp gốc sau khi nén
    })
  ],
  server: {
    port: 3000
  },
  css: {
    devSourcemap: true
  },
  build: {
    sourcemap: true
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src')
    }
  }
})
