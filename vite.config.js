/** @format */

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import viteCompression from 'vite-plugin-compression'
import purgecss from 'vite-plugin-purgecss'

export default defineConfig({
  plugins: [
    vue(),
    purgecss({
      content: ['./src/**/*.vue', './src/**/*.js', './index.html'],
      safelist: [
        'modal',
        'fade',
        'show',
        'collapse',
        'navbar-collapse',
        'navbar-toggler',
        'btn',
        'form-control',
        'form-select',
        'form-check',
        'form-switch',
        'card',
        'spinner-border',
        'text-center',
        'text-success',
        'text-primary',
        'd-flex',
        'flex-column',
        'justify-content-center',
        'align-items-center',
        'w-100',
        'mt-3',
        'mb-3',
        'p-4',
        'shadow-sm',
        'fw-semibold',
        'ms-auto',
        'px-4',
        'bg-primary',
        'visually-hidden',
        'navbar',
        'navbar-brand',
        'navbar-nav',
        'navbar-text',
        'network-card',
        'square-modal',
        'modal-center',
        'select-switch-lg'
      ]
    }),
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
