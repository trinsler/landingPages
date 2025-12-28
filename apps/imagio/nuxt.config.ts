// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'
import { writeFileSync } from 'fs'
import { resolve } from 'path'

// Ensure DATABASE_URL is set
process.env.DATABASE_URL = process.env.DATABASE_URL || 'file:./dev.db'

export default defineNuxtConfig({
  compatibilityDate: '2025-12-02',
  devtools: { enabled: false },
  ssr: false,
  
  // Runtime Config für Environment Variables
  runtimeConfig: {
    // Server-only variables (DATABASE_URL ist sensibel)
    databaseUrl: process.env.DATABASE_URL || 'file:./dev.db'
  },

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
  
  // Nitro Config
  nitro: {
    // Disable dev warnings für cleaner Output
    devErrorHandler: false,
    // CORS configuration for frontend team
    cors: {
      origin: [
        'http://localhost:3000',
        'http://127.0.0.1:3000', 
        'http://localhost:3001',
        'http://127.0.0.1:3001',
        'http://localhost:4000',
        'http://127.0.0.1:4000'
      ],
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
    },
    // Ensure API routes are handled properly
    routeRules: {
      '/api/**': { 
        cors: true,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization, Origin, X-Requested-With, Accept'
        }
      }
    }
  },

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
        console.log('Created missing tsconfig files for @vitejs/plugin-vue@6')
      } catch (err) {
        console.error('Failed to create tsconfig files:', err)
      }
    }
  }
})
