<template>
  <div class="relative isolate px-6 pt-14 lg:px-8">
    <!-- Background gradient -->
    <div class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
      <div
        class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
      />
    </div>

    <div class="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
      <div class="hidden sm:mb-8 sm:flex sm:justify-center">
        <div
          class="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20"
        >
          Secure digital coin platform with OAuth and Stripe integration.
          <NuxtLink to="/shop" class="font-semibold text-indigo-600">
            <span class="absolute inset-0" aria-hidden="true" />
            Start shopping <span aria-hidden="true">&rarr;</span>
          </NuxtLink>
        </div>
      </div>

      <div class="text-center">
        <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Buy Digital Coins with
          <span class="text-indigo-600">Confidence</span>
        </h1>

        <p class="mt-6 text-lg leading-8 text-gray-600">
          A modern, secure platform for purchasing digital coins. Built with Nuxt 3, Supabase, and
          Stripe for the best user experience and security standards.
        </p>

        <div class="mt-10 flex items-center justify-center gap-x-6">
          <template v-if="authStore.isAuthenticated">
            <NuxtLink
              to="/shop"
              class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Browse Coin Packages
            </NuxtLink>

            <NuxtLink to="/dashboard" class="text-sm font-semibold leading-6 text-gray-900">
              View Dashboard <span aria-hidden="true">→</span>
            </NuxtLink>
          </template>

          <template v-else>
            <button
              :disabled="authStore.loading"
              class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
              @click="openAuthModal"
            >
              <span v-if="authStore.loading">Signing in...</span>
              <span v-else>Jetzt starten</span>
            </button>

            <a href="#features" class="text-sm font-semibold leading-6 text-gray-900">
              Learn more <span aria-hidden="true">→</span>
            </a>
          </template>
        </div>
      </div>
    </div>

    <!-- Newsletter Section -->
    <div class="mx-auto max-w-2xl px-6 lg:px-8 pb-16">
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div class="text-center">
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Bleiben Sie auf dem Laufenden!</h3>
          <p class="text-gray-600 mb-6">
            Informationen über neue Features, Coin-Pakete und exklusive Angebote.
          </p>

          <template v-if="authStore.isAuthenticated">
            <div class="flex flex-col items-center gap-4">
              <p class="text-sm text-gray-600">
                Newsletter-Status:
                <span
                  :class="
                    authStore.user?.newsletter_subscribed
                      ? 'text-green-600 font-medium'
                      : 'text-gray-500'
                  "
                >
                  {{ authStore.user?.newsletter_subscribed ? 'Abonniert' : 'Nicht abonniert' }}
                </span>
              </p>
              <button
                :disabled="newsletterLoading"
                class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                @click="toggleNewsletter"
              >
                {{
                  authStore.user?.newsletter_subscribed
                    ? 'Newsletter abbestellen'
                    : 'Newsletter abonnieren'
                }}
              </button>
            </div>
          </template>

          <template v-else>
            <div class="text-sm text-gray-500">
              <p>Newsletter-Abonnement ist Teil der Registrierung.</p>
              <p class="mt-2">Melden Sie sich mit Google an, um den Newsletter zu abonnieren.</p>
            </div>
          </template>
        </div>
      </div>
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

    <!-- Auth Modal -->
    <AuthModal
      :is-open="showAuthModal"
      mode="login"
      @close="closeAuthModal"
      @success="handleAuthSuccess"
    />
  </div>
</template>

<script setup lang="ts">
import { useToast } from '@monorepo/ui'

definePageMeta({
  layout: 'default',
})

const authStore = useAuthStore()
const { success: showSuccess, error: showError, success } = useToast()
const newsletterLoading = ref(false)

// Auth Modal state
const showAuthModal = ref(false)

const openAuthModal = () => {
  showAuthModal.value = true
}

const closeAuthModal = () => {
  showAuthModal.value = false
}

const handleAuthSuccess = () => {
  success('Erfolgreich angemeldet!')
}

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
