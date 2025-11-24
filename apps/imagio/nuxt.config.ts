// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  pages: true,
  
  // TypeScript configuration
  typescript: {
    strict: true,
    typeCheck: false // Disable during dev to prevent .js file generation
  },
  
  // SSR and rendering
  ssr: true,
  
  // Performance optimizations
  experimental: {
    payloadExtraction: false,
    treeshakeClientOnly: true,
    emitRouteChunkError: 'automatic'
  },
  
  // Build optimizations
  build: {
    analyze: process.env.NODE_ENV === 'development',
    extractCSS: true,
    optimization: {
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            enforce: true
          }
        }
      }
    }
  },
  
  // Vite configuration for better performance
  vite: {
    build: {
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['vue', 'vue-router'],
            utils: ['./composables/useErrorHandler', './composables/useAppState'],
            validation: ['./composables/useInputValidation', './composables/useSecureStorage']
          }
        }
      }
    },
    optimizeDeps: {
      include: ['vue', 'vue-router']
    }
  },
  
  // Runtime config for performance monitoring
  runtimeConfig: {
    public: {
      appVersion: '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      enablePerformanceMonitoring: process.env.ENABLE_PERFORMANCE_MONITORING === 'true'
    }
  },
  
  // Head configuration for better loading
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'IMAGIO - Interactive Learning Platform',
      meta: [
        { name: 'description', content: 'IMAGIO is an innovative learning platform that uses interactive scenarios to enhance your learning experience.' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'theme-color', content: '#0097b2' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'dns-prefetch', href: 'https://fonts.gstatic.com' }
      ],
      script: [
        // Performance optimization script
        {
          innerHTML: `
            // Preload critical resources when available
            if ('requestIdleCallback' in window) {
              requestIdleCallback(() => {
                console.log('Application loaded and ready');
              });
            }
          `,
          type: 'text/javascript'
        }
      ]
    }
  },
  
  // CSS configuration
  css: [
    '~/assets/css/main.css'
  ],
  
  // Modules for optimization
  modules: [
    '@nuxt/image'
  ],
  
  // Image optimization
  image: {
    quality: 80,
    format: ['webp', 'jpg'],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536
    }
  },
  
  // Router configuration
  router: {
    options: {
      linkActiveClass: 'active-link',
      linkExactActiveClass: 'exact-active-link'
    }
  },
  
  // Nitro configuration for better performance
  nitro: {
    compressPublicAssets: true,
    minify: true,
    experimental: {
      wasm: true
    }
  }
})
