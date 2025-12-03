// https://nuxt.com/docs/api/configuration/nuxt-config
import { writeFileSync } from 'fs'
import { resolve } from 'path'

export default defineNuxtConfig({
  compatibilityDate: '2025-12-02',
  devtools: { enabled: false },
  ssr: false,

  // TypeScript Konfiguration
  typescript: {
    typeCheck: false,
    strict: false,
    includeWorkspace: false,
    tsConfig: {
      exclude: ['../node_modules', '../.nuxt', '../.output']
    }
  },

  // CSS configuration
  css: [
    '~/assets/css/main.css'
  ],

  // Module
  modules: [
    '@nuxt/image'
  ],

  // Vite Konfiguration
  vite: {
    clearScreen: false,
    logLevel: 'warn',
    server: {
      hmr: {
        overlay: false // Disable error overlay
      }
    },
    vue: {
      script: {
        defineModel: true
      },
      template: {
        compilerOptions: {
          isCustomElement: (tag) => false
        }
      }
    }
  },

  // Hook to create ALL missing tsconfig files that @vitejs/plugin-vue@6 expects
  hooks: {
    'build:before': () => {
      const nuxtDir = resolve('.nuxt')
      const tsconfigBase = {
        extends: resolve(nuxtDir, 'tsconfig.json'),
        compilerOptions: {
          composite: true,
          types: ['node']
        }
      }

      const files = ['tsconfig.app.json', 'tsconfig.shared.json', 'tsconfig.node.json']

      try {
        files.forEach(file => {
          const filePath = resolve(nuxtDir, file)
          writeFileSync(filePath, JSON.stringify(tsconfigBase, null, 2))
        })
        console.log('✅ Created missing tsconfig files for @vitejs/plugin-vue@6')
      } catch (err) {
        console.error('❌ Failed to create tsconfig files:', err)
      }
    }
  }
})
