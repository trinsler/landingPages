<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
    <div class="text-center">
      <h3 class="text-lg font-semibold text-gray-900 mb-2">
        {{ title }}
      </h3>
      <p class="text-gray-600 mb-6">
        {{ description }}
      </p>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div class="flex flex-col sm:flex-row gap-3">
          <div class="flex-1">
            <input
              v-model="email"
              type="email"
              placeholder="Ihre E-Mail-Adresse"
              required
              :disabled="loading || success"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
              :class="{
                'border-red-300 focus:ring-red-600 focus:border-red-600': error,
                'border-green-300 focus:ring-green-600 focus:border-green-600': success
              }"
            />
          </div>
          
          <BaseButton
            type="submit"
            :loading="loading"
            :disabled="!email || !isValidEmail || success"
            :variant="success ? 'secondary' : 'primary'"
            size="lg"
            class="sm:w-auto"
          >
            <template v-if="success" #icon-left>
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </template>
            {{ success ? 'Angemeldet!' : buttonText }}
          </BaseButton>
        </div>

        <!-- Error Message -->
        <div v-if="error" class="text-sm text-red-600 text-center">
          {{ error }}
        </div>

        <!-- Success Message -->
        <div v-if="success" class="text-sm text-green-600 text-center">
          {{ successMessage }}
        </div>
      </form>

      <!-- Privacy Note -->
      <p class="text-xs text-gray-500 mt-4">
        {{ privacyNote }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { validateEmail } from '@monorepo/shared'
import BaseButton from './BaseButton.vue'

interface Props {
  title?: string
  description?: string
  buttonText?: string
  successMessage?: string
  privacyNote?: string
  tags?: string[]
  apiEndpoint?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Newsletter abonnieren',
  description: 'Bleiben Sie auf dem Laufenden mit den neuesten Updates und Angeboten.',
  buttonText: 'Abonnieren',
  successMessage: 'Vielen Dank! Sie haben sich erfolgreich angemeldet.',
  privacyNote: 'Wir respektieren Ihre Privatsphäre. Keine Spam-Mails.',
  apiEndpoint: '/api/email/subscribe'
})

interface Emits {
  subscribe: [email: string, tags?: string[]]
  success: [email: string]
  error: [error: string]
}

const emit = defineEmits<Emits>()

const email = ref('')
const loading = ref(false)
const error = ref('')
const success = ref(false)

const isValidEmail = computed(() => {
  return email.value ? validateEmail(email.value) : false
})

const handleSubmit = async () => {
  if (!email.value || !isValidEmail.value || loading.value || success.value) {
    return
  }

  error.value = ''
  loading.value = true

  try {
    // Emit subscribe event for parent component to handle
    emit('subscribe', email.value, props.tags)

    // Always use default API call (parent can override via props.apiEndpoint)
    const response = await $fetch(props.apiEndpoint, {
      method: 'POST',
      body: {
        email: email.value,
        tags: props.tags
      }
    }) as { success: boolean; error?: string }

    if (!response.success) {
      throw new Error(response.error || 'Subscription failed')
    }

    success.value = true
    emit('success', email.value)
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Ein Fehler ist aufgetreten'
    error.value = errorMessage
    emit('error', errorMessage)
  } finally {
    loading.value = false
  }
}
</script>