/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['./tests/setup.ts'],
  },
  resolve: {
    alias: {
      '~': resolve(__dirname, '.'),
      '@': resolve(__dirname, '.'),
    },
  },
  define: {
    __VUE_OPTIONS_API__: 'true',
    __VUE_PROD_DEVTOOLS__: 'false'
  }
})