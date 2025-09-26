<template>
  <div class="relative isolate px-6 pt-14 lg:px-8 min-h-screen bg-gradient-to-b from-background to-accent/20">
    <!-- Background gradient -->
    <div class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
      <div
        class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary/20 to-accent/30 opacity-60 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
      />
    </div>

    <div class="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
      <div class="hidden sm:mb-8 sm:flex sm:justify-center">
        <Badge variant="outline" class="px-4 py-2 text-sm bg-card/50 backdrop-blur-sm border-primary/20">
          <span class="mr-2">🔒</span>
          Secure digital coin platform with OAuth and Stripe integration.
          <NuxtLink to="/shop" class="ml-2 font-semibold text-primary hover:text-primary/80">
            Start shopping <span aria-hidden="true">→</span>
          </NuxtLink>
        </Badge>
      </div>

      <div class="text-center">
        <h1 class="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
          Buy Digital Coins with
          <span class="text-primary bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">Confidence</span>
        </h1>

        <p class="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
          A modern, secure platform for purchasing digital coins. Built with Nuxt 3, Supabase, and
          Stripe for the best user experience and security standards.
        </p>

        <div class="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <template v-if="authStore.isAuthenticated">
            <Button as-child size="lg" class="w-full sm:w-auto">
              <NuxtLink to="/shop" class="inline-flex items-center">
                <span class="mr-2">🛍️</span>
                Browse Coin Packages
              </NuxtLink>
            </Button>

            <Button variant="outline" size="lg" as-child class="w-full sm:w-auto">
              <NuxtLink to="/dashboard" class="inline-flex items-center">
                <span class="mr-2">📊</span>
                View Dashboard
                <span class="ml-2" aria-hidden="true">→</span>
              </NuxtLink>
            </Button>
          </template>

          <template v-else>
            <Button
              :disabled="authStore.loading"
              size="lg"
              class="w-full sm:w-auto"
              @click="handleSignIn"
            >
              <span v-if="authStore.loading" class="inline-flex items-center">
                <span class="animate-spin mr-2">⏳</span>
                Signing in...
              </span>
              <span v-else class="inline-flex items-center">
                <span class="mr-2">🚀</span>
                Sign in with Google
              </span>
            </Button>

            <Button variant="ghost" size="lg" as-child class="w-full sm:w-auto">
              <a href="#features" class="inline-flex items-center">
                Learn more
                <span class="ml-2" aria-hidden="true">→</span>
              </a>
            </Button>
          </template>
        </div>
      </div>
    </div>

    <!-- Newsletter Section -->
    <div class="mx-auto max-w-2xl px-6 lg:px-8 pb-16">
      <Card class="backdrop-blur-sm bg-card/80 shadow-xl border-primary/10">
        <CardHeader class="text-center">
          <CardTitle class="text-xl flex items-center justify-center gap-2">
            <span>📧</span>
            Bleiben Sie auf dem Laufenden!
          </CardTitle>
          <CardDescription>
            Informationen über neue Features, Coin-Pakete und exklusive Angebote.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <template v-if="authStore.isAuthenticated">
            <div class="flex flex-col items-center gap-6">
              <div class="flex items-center gap-2">
                <Badge
                  :variant="authStore.user?.newsletter_subscribed ? 'success' : 'outline'"
                  class="px-3 py-1"
                >
                  <span class="mr-1">
                    {{ authStore.user?.newsletter_subscribed ? '✅' : '📝' }}
                  </span>
                  {{ authStore.user?.newsletter_subscribed ? 'Abonniert' : 'Nicht abonniert' }}
                </Badge>
              </div>
              <Button
                :disabled="newsletterLoading"
                :variant="authStore.user?.newsletter_subscribed ? 'outline' : 'default'"
                size="lg"
                @click="toggleNewsletter"
              >
                <span v-if="newsletterLoading" class="mr-2 animate-spin">⏳</span>
                <span v-else class="mr-2">
                  {{ authStore.user?.newsletter_subscribed ? '📧' : '✉️' }}
                </span>
                {{
                  authStore.user?.newsletter_subscribed
                    ? 'Newsletter abbestellen'
                    : 'Newsletter abonnieren'
                }}
              </Button>
            </div>
          </template>

          <template v-else>
            <div class="text-center space-y-4">
              <div class="p-4 bg-accent/50 rounded-lg border border-primary/10">
                <p class="text-sm text-muted-foreground">
                  <span class="mr-2">ℹ️</span>
                  Newsletter-Abonnement ist Teil der Registrierung.
                </p>
                <p class="text-sm text-muted-foreground mt-2">
                  Melden Sie sich mit Google an, um den Newsletter zu abonnieren.
                </p>
              </div>
            </div>
          </template>
        </CardContent>
      </Card>
    </div>

    <!-- Features Section -->
    <div id="features" class="mx-auto max-w-7xl px-6 lg:px-8 pb-24">
      <div class="mx-auto max-w-2xl lg:text-center">
        <h2 class="text-base font-semibold leading-7 text-indigo-600">Everything you need</h2>
        <p class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Secure and Modern Platform
        </p>
        <p class="mt-6 text-lg leading-8 text-gray-600">
          Built with the latest technologies and best practices for security, performance, and user
          experience.
        </p>
      </div>

      <div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
        <dl
          class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16"
        >
          <div class="relative pl-16">
            <dt class="text-base font-semibold leading-7 text-gray-900">
              <div
                class="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600"
              >
                <svg
                  class="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              Google OAuth Authentication
            </dt>
            <dd class="mt-2 text-base leading-7 text-gray-600">
              Secure login with your Google account. No passwords to remember, maximum security.
            </dd>
          </div>

          <div class="relative pl-16">
            <dt class="text-base font-semibold leading-7 text-gray-900">
              <div
                class="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600"
              >
                <svg
                  class="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                  />
                </svg>
              </div>
              Stripe Payment Processing
            </dt>
            <dd class="mt-2 text-base leading-7 text-gray-600">
              Industry-leading payment security with support for credit cards, Apple Pay, and Google
              Pay.
            </dd>
          </div>

          <div class="relative pl-16">
            <dt class="text-base font-semibold leading-7 text-gray-900">
              <div
                class="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600"
              >
                <svg
                  class="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                  />
                </svg>
              </div>
              Real-time Updates
            </dt>
            <dd class="mt-2 text-base leading-7 text-gray-600">
              Instant coin balance updates across all devices with Supabase real-time subscriptions.
            </dd>
          </div>

          <div class="relative pl-16">
            <dt class="text-base font-semibold leading-7 text-gray-900">
              <div
                class="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600"
              >
                <svg
                  class="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.623 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                  />
                </svg>
              </div>
              Enterprise Security
            </dt>
            <dd class="mt-2 text-base leading-7 text-gray-600">
              Row-level security, webhook verification, and comprehensive audit logging for maximum
              protection.
            </dd>
          </div>
        </dl>
      </div>
    </div>

    <!-- Background gradient bottom -->
    <div
      class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
    >
      <div
        class="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent, Badge } from '~/components/ui'

definePageMeta({
  layout: 'default',
})

const authStore = useAuthStore()
const { success: showSuccess, error: showError } = useToast()
const newsletterLoading = ref(false)

const handleSignIn = async () => {
  try {
    await authStore.signInWithGoogle()
  } catch (error) {
    console.error('Sign in failed:', error)
  }
}

const toggleNewsletter = async () => {
  if (!authStore.user) return

  newsletterLoading.value = true
  try {
    const newState = !authStore.user.newsletter_subscribed
    await authStore.updateNewsletterSubscription(newState)

    showSuccess(
      newState
        ? 'Sie haben den Newsletter erfolgreich abonniert!'
        : 'Sie haben den Newsletter erfolgreich abbestellt!',
      'Newsletter'
    )
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Ein Fehler ist aufgetreten'
    showError(errorMessage, 'Fehler')
  } finally {
    newsletterLoading.value = false
  }
}

onMounted(() => {
  authStore.initialize()
})
</script>
