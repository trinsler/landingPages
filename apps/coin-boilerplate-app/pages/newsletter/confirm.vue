<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <div class="text-center">
          <!-- Loading State -->
          <div v-if="loading" class="space-y-4">
            <LoadingSpinner class="mx-auto" />
            <h2 class="text-xl font-semibold text-gray-900">
              E-Mail wird bestätigt...
            </h2>
          </div>

          <!-- Success State -->
          <div v-else-if="success" class="space-y-4">
            <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <svg class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <div>
              <h2 class="text-xl font-semibold text-gray-900">
                Bestätigung erfolgreich!
              </h2>
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

          <!-- Error State -->
          <div v-else class="space-y-4">
            <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
              <svg class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
            </div>
            <div>
              <h2 class="text-xl font-semibold text-gray-900">
                Bestätigung fehlgeschlagen
              </h2>
              <p class="mt-2 text-gray-600">
                {{ message }}
              </p>
            </div>
            <div class="mt-6 space-y-3">
              <NuxtLink
                to="/"
                class="block w-full text-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Zur Startseite
              </NuxtLink>
              <button
                @click="retry"
                class="block w-full text-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Erneut versuchen
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import LoadingSpinner from '@monorepo/ui/dist/components/LoadingSpinner.vue'

const route = useRoute()
const loading = ref(true)
const success = ref(false)
const message = ref('')

const confirmSubscription = async () => {
  try {
    const token = route.query.token as string

    if (!token) {
      throw new Error('Bestätigungstoken fehlt')
    }

    const { data } = await $fetch('/functions/v1/email-confirm', {
      method: 'GET',
      query: { token }
    }) as { success: boolean; message?: string; error?: string }

    if (data.success) {
      success.value = true
      message.value = data.message || 'Ihre E-Mail-Adresse wurde erfolgreich bestätigt.'
    } else {
      throw new Error(data.error || 'Bestätigung fehlgeschlagen')
    }
  } catch (error) {
    success.value = false
    message.value = error instanceof Error ? error.message : 'Ein unbekannter Fehler ist aufgetreten'
  } finally {
    loading.value = false
  }
}

const retry = () => {
  loading.value = true
  success.value = false
  confirmSubscription()
}

onMounted(() => {
  confirmSubscription()
})

// SEO
useHead({
  title: 'E-Mail bestätigen - Newsletter',
  meta: [
    { name: 'description', content: 'Bestätigen Sie Ihre E-Mail-Adresse für den Newsletter' },
    { name: 'robots', content: 'noindex, nofollow' }
  ]
})
</script>