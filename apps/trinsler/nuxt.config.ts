export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],
  
  app: {
    head: {
      title: 'Trinsler - Equity-for-Growth Revolution',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Wir demokratisieren Startup-Wachstum durch Equity-for-Growth. Operative Skills statt nur Kapital - für nachhaltiges Wachstum.' },
        { name: 'keywords', content: 'Startup Growth, Equity Marketing, Growth-as-a-Service, Digital Marketing, Startup Investment' },
        { property: 'og:title', content: 'Trinsler - Growth Revolution für Startups' },
        { property: 'og:description', content: 'Equity-for-Growth statt teure Agentur-Fees. Wir investieren unsere Skills und wachsen mit Ihrem Startup.' },
        { name: 'twitter:card', content: 'summary_large_image' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@300;400;500;600;700&display=swap' }
      ]
    }
  },

  nitro: {
    prerender: {
      failOnError: false,
      crawlLinks: true
    },
    compressPublicAssets: true
  },

  experimental: {
    payloadExtraction: false
  },

  build: {
    transpile: ['@headlessui/vue', '@heroicons/vue']
  }
})
