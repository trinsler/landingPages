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
    baseURL: '/'
  },
  typescript: {
    strict: true,
    typeCheck: true
  },
  modules: [
    '@nuxtjs/supabase',
    '@pinia/nuxt'
  ],

  postcss: {
    plugins: {
      '@tailwindcss/postcss': {}
    }
  },
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
    // Private keys (only available on server-side)
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
    stripeSecretKey: process.env.STRIPE_SECRET_KEY,
    resendApiKey: process.env.RESEND_API_KEY,

    // Public keys (exposed to client-side)
    public: {
      stripePublicKey: process.env.STRIPE_PUBLIC_KEY,
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
      googleClientId: process.env.GOOGLE_CLIENT_ID,
      appEnv: process.env.NUXT_APP_ENV || 'local',
      siteUrl: process.env.NUXT_APP_ENV === 'develop'
        ? 'https://coin-develop.trinsler.com'
        : process.env.NODE_ENV === 'production'
        ? 'https://coin.trinsler.com'
        : 'http://localhost:3000'
    }
  },
  compatibilityDate: '2025-09-13'
})