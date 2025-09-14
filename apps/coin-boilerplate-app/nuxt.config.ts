export default defineNuxtConfig({
  devtools: { enabled: true },
  // Static site generation for GitHub Pages
  ssr: false,
  nitro: {
    preset: 'github_pages',
    prerender: {
      routes: ['/payment/success', '/payment/cancelled']
    }
  },
  app: {
    baseURL: process.env.NODE_ENV === 'production' ? '/landingPages/' : '/'
  },
  typescript: {
    strict: true,
    typeCheck: true
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/supabase',
    '@pinia/nuxt'
  ],
  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_ANON_KEY,
    redirectOptions: {
      login: '/',
      callback: '/auth/callback',
      exclude: ['/']
    }
  },
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: {
      stripePublicKey: process.env.STRIPE_PUBLIC_KEY,
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
      googleClientId: process.env.GOOGLE_CLIENT_ID,
      siteUrl: process.env.NODE_ENV === 'production'
        ? 'https://nielshen.github.io/landingPages'
        : 'http://localhost:3000'
    }
  },
  compatibilityDate: '2025-09-13'
})