// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-12-02',
  devtools: { enabled: false },
  ssr: false,
  
  // TypeScript Konfiguration
  typescript: {
    typeCheck: false,
    strict: false,
    includeWorkspace: false
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
      }
    }
  }
})