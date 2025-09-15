<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <div class="text-center">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">
            Newsletter abmelden
          </h2>

          <!-- Auto-unsubscribe via URL (GET request) -->
          <div v-if="autoUnsubscribing" class="space-y-4">
            <LoadingSpinner class="mx-auto" />
            <p class="text-gray-600">
              Ihre Abmeldung wird verarbeitet...
            </p>
          </div>

          <!-- Success State -->
          <div v-else-if="success" class="space-y-4">
            <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <svg class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <div>
              <h3 class="text-lg font-medium text-gray-900">
                Erfolgreich abgemeldet
              </h3>
              <p class="mt-2 text-gray-600">
                {{ message }}
              </p>
            </div>
            <div class="mt-6">
              <NuxtLink
                to="/"
                class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Zur Startseite
              </NuxtLink>
            </div>
          </div>

          <!-- Manual Unsubscribe Form -->
          <div v-else class="space-y-6">
            <div v-if="error" class="bg-red-50 border border-red-200 rounded-md p-4">
              <div class="flex">
                <div class="ml-3">
                  <h3 class="text-sm font-medium text-red-800">
                    Fehler
                  </h3>
                  <div class="mt-2 text-sm text-red-700">
                    {{ error }}
                  </div>
                </div>
              </div>
            </div>

            <div class="text-left">
              <p class="text-gray-600 mb-4">
                Es tut uns leid, dass Sie unseren Newsletter nicht mehr erhalten möchten.
                Geben Sie Ihre E-Mail-Adresse ein, um sich abzumelden.
              </p>

              <form @submit.prevent="handleUnsubscribe" class="space-y-4">
                <div>
                  <label for="email" class="block text-sm font-medium text-gray-700">
                    E-Mail-Adresse
                  </label>
                  <input
                    id="email"
                    v-model="email"
                    type="email"
                    required
                    :disabled="loading"
                    class="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm disabled:opacity-50"
                    placeholder="ihre@email.de"
                  />
                </div>

                <div>
                  <label for="reason" class="block text-sm font-medium text-gray-700">
                    Grund für die Abmeldung (optional)
                  </label>
                  <select
                    id="reason"
                    v-model="reason"
                    :disabled="loading"
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:opacity-50"
                  >
                    <option value="">Bitte wählen...</option>
                    <option value="too_many_emails">Zu viele E-Mails</option>
                    <option value="not_relevant">Nicht relevant für mich</option>
                    <option value="never_signed_up">Habe mich nie angemeldet</option>
                    <option value="temporary">Vorübergehend pausieren</option>
                    <option value="other">Anderer Grund</option>
                  </select>
                </div>

                <div class="flex items-center space-x-3">
                  <button
                    type="submit"
                    :disabled="!email || loading"
                    class="flex-1 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <LoadingSpinner v-if="loading" class="w-4 h-4 mr-2" />
                    {{ loading ? 'Wird verarbeitet...' : 'Abmelden' }}
                  </button>

                  <NuxtLink
                    to="/"
                    class="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Abbrechen
                  </NuxtLink>
                </div>
              </form>
            </div>

            <div class="border-t border-gray-200 pt-6">
              <div class="text-xs text-gray-500 space-y-2">
                <p>
                  Datenschutz: Ihre E-Mail-Adresse wird nur zur Verarbeitung Ihrer Abmeldung verwendet.
                </p>
                <p>
                  Sie können sich jederzeit wieder für unseren Newsletter anmelden.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { LoadingSpinner } from '@monorepo/ui'

const route = useRoute()
const email = ref('')
const reason = ref('')
const loading = ref(false)
const autoUnsubscribing = ref(false)
const success = ref(false)
const error = ref('')
const message = ref('')

// Handle auto-unsubscribe via URL parameters
const handleAutoUnsubscribe = async () => {
  const token = route.query.token as string
  const emailParam = route.query.email as string

  if (!token && !emailParam) return

  autoUnsubscribing.value = true

  try {
    const query = new URLSearchParams()
    if (token) query.set('token', token)
    if (emailParam) query.set('email', emailParam)

    const response = await $fetch(`/functions/v1/email-unsubscribe?${query}`) as {
      success: boolean
      message?: string
      error?: string
    }

    if (response.success) {
      success.value = true
      message.value = response.message || 'Sie wurden erfolgreich abgemeldet.'
    } else {
      throw new Error(response.error || 'Abmeldung fehlgeschlagen')
    }
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Ein Fehler ist aufgetreten'
  } finally {
    autoUnsubscribing.value = false
  }
}

// Handle manual unsubscribe via form
const handleUnsubscribe = async () => {
  if (!email.value || loading.value) return

  loading.value = true
  error.value = ''

  try {
    const response = await $fetch('/functions/v1/email-unsubscribe', {
      method: 'POST',
      body: {
        email: email.value,
        reason: reason.value || undefined
      }
    }) as {
      success: boolean
      message?: string
      error?: string
    }

    if (response.success) {
      success.value = true
      message.value = response.message || 'Sie wurden erfolgreich abgemeldet.'
    } else {
      throw new Error(response.error || 'Abmeldung fehlgeschlagen')
    }
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Ein Fehler ist aufgetreten'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  handleAutoUnsubscribe()
})

// SEO
useHead({
  title: 'Newsletter abmelden',
  meta: [
    { name: 'description', content: 'Vom Newsletter abmelden - einfach und schnell' },
    { name: 'robots', content: 'noindex, nofollow' }
  ]
})
</script>