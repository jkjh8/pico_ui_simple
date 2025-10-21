/** @format */

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import viteCompression from 'vite-plugin-compression'

export default defineConfig({
  plugins: [
    vue(),
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz'
    })
  ],
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      },
      format: {
        comments: false
      }
    },
    cssCodeSplit: true,
    assetsInlineLimit: 4096
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://10.20.0.198',
        changeOrigin: true
      }
    }
  }
})
