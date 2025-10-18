<template>
  <div class="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
    <h2 class="text-2xl font-bold text-gray-900 mb-6">Kontaktformular</h2>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Name Field -->
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
          Name *
        </label>
        <input
          id="name"
          v-model="form.name"
          type="text"
          required
          :disabled="isSubmitting"
          @input="clearError('name')"
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          placeholder="Ihr Name"
        />
        <p v-if="errors.name" class="mt-1 text-sm text-red-600">{{ errors.name }}</p>
      </div>

      <!-- Email Field -->
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
          E-Mail *
        </label>
        <input
          id="email"
          v-model="form.email"
          type="email"
          required
          :disabled="isSubmitting"
          @input="clearError('email')"
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          placeholder="ihre.email@example.com"
        />
        <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
      </div>

      <!-- Subject Field -->
      <div>
        <label for="subject" class="block text-sm font-medium text-gray-700 mb-2">
          Betreff *
        </label>
        <input
          id="subject"
          v-model="form.subject"
          type="text"
          required
          :disabled="isSubmitting"
          @input="clearError('subject')"
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          placeholder="Ihr Anliegen"
        />
        <p v-if="errors.subject" class="mt-1 text-sm text-red-600">{{ errors.subject }}</p>
      </div>

      <!-- Message Field -->
      <div>
        <label for="message" class="block text-sm font-medium text-gray-700 mb-2">
          Nachricht *
        </label>
        <textarea
          id="message"
          v-model="form.message"
          rows="5"
          required
          :disabled="isSubmitting"
          @input="clearError('message')"
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100 disabled:cursor-not-allowed resize-none"
          placeholder="Beschreiben Sie Ihr Anliegen..."
        ></textarea>
        <p v-if="errors.message" class="mt-1 text-sm text-red-600">{{ errors.message }}</p>
        <p class="mt-1 text-sm text-gray-500">{{ form.message.length }}/500 Zeichen</p>
      </div>

      <!-- Submit Button -->
      <div class="flex items-center justify-between">
        <p class="text-sm text-gray-500">
          Alle mit * markierten Felder sind Pflichtfelder.
        </p>
        <button
          type="submit"
          :disabled="isSubmitting || !isFormValid"
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          <svg
            v-if="isSubmitting"
            class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          {{ isSubmitting ? 'Wird gesendet...' : 'Nachricht senden' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { useToast } from '@monorepo/ui'

interface ContactForm {
  name: string
  email: string
  subject: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

// Props
interface Props {
  userEmail?: string
  userName?: string
}

const props = withDefaults(defineProps<Props>(), {
  userEmail: '',
  userName: ''
})

// Composables
const supabase = useSupabaseClient()
const authStore = useAuthStore()
const { success, error: showError } = useToast()

// Reactive data
const isSubmitting = ref(false)
const form = ref<ContactForm>({
  name: props.userName || '',
  email: props.userEmail || '',
  subject: '',
  message: ''
})
const errors = ref<FormErrors>({})

// Computed
const isFormValid = computed(() => {
  return (
    form.value.name.trim() !== '' &&
    form.value.email.trim() !== '' &&
    form.value.subject.trim() !== '' &&
    form.value.message.trim() !== '' &&
    form.value.message.length <= 500 &&
    isValidEmail(form.value.email) &&
    Object.keys(errors.value).length === 0
  )
})

// Methods
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const clearError = (field: keyof FormErrors) => {
  if (errors.value[field]) {
    delete errors.value[field]
  }
}

const validateForm = (): boolean => {
  errors.value = {}

  // Name validation
  if (!form.value.name.trim()) {
    errors.value.name = 'Name ist erforderlich'
  } else if (form.value.name.trim().length < 2) {
    errors.value.name = 'Name muss mindestens 2 Zeichen lang sein'
  }

  // Email validation
  if (!form.value.email.trim()) {
    errors.value.email = 'E-Mail ist erforderlich'
  } else if (!isValidEmail(form.value.email)) {
    errors.value.email = 'Bitte geben Sie eine gültige E-Mail-Adresse ein'
  }

  // Subject validation
  if (!form.value.subject.trim()) {
    errors.value.subject = 'Betreff ist erforderlich'
  } else if (form.value.subject.trim().length < 3) {
    errors.value.subject = 'Betreff muss mindestens 3 Zeichen lang sein'
  }

  // Message validation
  if (!form.value.message.trim()) {
    errors.value.message = 'Nachricht ist erforderlich'
  } else if (form.value.message.trim().length < 10) {
    errors.value.message = 'Nachricht muss mindestens 10 Zeichen lang sein'
  } else if (form.value.message.length > 500) {
    errors.value.message = 'Nachricht darf maximal 500 Zeichen lang sein'
  }

  return Object.keys(errors.value).length === 0
}

const handleSubmit = async () => {
  if (!validateForm()) {
    return
  }

  isSubmitting.value = true

  try {
    // Get auth token if user is logged in
    const authToken = authStore.user?.id ? await authStore.getAuthToken() : null

    // Call the edge function
    const { data, error } = await supabase.functions.invoke('send-email', {
      body: {
        name: form.value.name.trim(),
        email: form.value.email.trim(),
        subject: form.value.subject.trim(),
        message: form.value.message.trim(),
        userId: authStore.user?.id || null
      },
      headers: authToken ? {
        Authorization: `Bearer ${authToken}`
      } : {}
    })

    if (error) {
      throw new Error(error.message || 'Fehler beim Senden der Nachricht')
    }

    // Show success message
    success('Ihre Nachricht wurde erfolgreich gesendet!')

    // Reset form
    form.value = {
      name: props.userName || '',
      email: props.userEmail || '',
      subject: '',
      message: ''
    }
    errors.value = {}

    // Emit success event
    emit('success', data)

  } catch (error: any) {
    console.error('Error submitting contact form:', error)
    showError(error.message || 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.')
  } finally {
    isSubmitting.value = false
  }
}

// Auto-fill user data if authenticated
if (authStore.user && !props.userEmail && !props.userName) {
  form.value.email = authStore.user.email || ''
  form.value.name = authStore.user.full_name || ''
}

// Define emits
const emit = defineEmits<{
  success: [data: any]
}>()
</script>