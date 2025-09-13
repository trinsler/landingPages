<template>
  <div>
    <ErrorBoundary>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </ErrorBoundary>
    <ToastContainer :toasts="toasts" @dismiss="dismiss" />
  </div>
</template>

<script setup lang="ts">
import { ToastContainer, useToast } from '@monorepo/ui'

const { toasts, dismiss } = useToast()

// Global app configuration
useHead({
  title: 'CoinApp - Secure Digital Coin Platform',
  meta: [
    { name: 'description', content: 'Buy digital coins securely with Google OAuth and Stripe payments. Modern Nuxt 3 application with real-time updates.' },
    { name: 'keywords', content: 'digital coins, stripe payments, oauth, nuxt, vue, typescript' },
    { name: 'author', content: 'CoinApp' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { property: 'og:title', content: 'CoinApp - Secure Digital Coin Platform' },
    { property: 'og:description', content: 'Buy digital coins securely with Google OAuth and Stripe payments.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'CoinApp - Secure Digital Coin Platform' },
    { name: 'twitter:description', content: 'Buy digital coins securely with Google OAuth and Stripe payments.' }
  ],
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }
  ]
})

// Initialize app-wide state
onMounted(() => {
  const authStore = useAuthStore()
  authStore.initialize()
})
</script>