import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: {
    tsconfig: './tsconfig.json'
  },
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ['vue', '@headlessui/vue', '@heroicons/vue'],
  esbuildOptions(options) {
    options.loader = {
      ...options.loader,
      '.vue': 'text'
    }
  }
})