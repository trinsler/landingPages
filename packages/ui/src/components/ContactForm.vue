<template>
  <form :class="['w-full space-y-6', containerClass]" @submit.prevent="handleSubmit">
    <!-- Titel und Beschreibung -->
    <div v-if="title || subtitle" class="text-center mb-8">
      <h2 v-if="title" class="text-2xl font-bold ui-text-primary mb-2">
        {{ title }}
      </h2>
      <p v-if="subtitle" class="ui-text-secondary">
        {{ subtitle }}
      </p>
    </div>

    <!-- Name -->
    <div class="space-y-2">
      <label for="name" class="block text-sm font-medium ui-text-primary"> Name * </label>
      <input
        id="name"
        v-model="formData.name"
        type="text"
        required
        :class="inputClass"
        :placeholder="placeholders.name"
      />
      <p v-if="errors.name" class="text-sm text-red-500">{{ errors.name }}</p>
    </div>

    <!-- Email -->
    <div class="space-y-2">
      <label for="email" class="block text-sm font-medium ui-text-primary"> E-Mail * </label>
      <input
        id="email"
        v-model="formData.email"
        type="email"
        required
        :class="inputClass"
        :placeholder="placeholders.email"
      />
      <p v-if="errors.email" class="text-sm text-red-500">{{ errors.email }}</p>
    </div>

    <!-- Firma (optional) -->
    <div v-if="showCompany" class="space-y-2">
      <label for="company" class="block text-sm font-medium ui-text-primary"> Firma </label>
      <input
        id="company"
        v-model="formData.company"
        type="text"
        :class="inputClass"
        :placeholder="placeholders.company"
      />
    </div>

    <!-- Budget (optional) -->
    <div v-if="showBudget" class="space-y-2">
      <label for="budget" class="block text-sm font-medium ui-text-primary"> Budget </label>
      <select id="budget" v-model="formData.budget" :class="inputClass">
        <option value="">Budget auswählen</option>
        <option value="5k-10k">5.000€ - 10.000€</option>
        <option value="10k-25k">10.000€ - 25.000€</option>
        <option value="25k-50k">25.000€ - 50.000€</option>
        <option value="50k+">50.000€+</option>
      </select>
    </div>

    <!-- Services (optional) -->
    <div v-if="showServices && services.length > 0" class="space-y-2">
      <label class="block text-sm font-medium ui-text-primary"> Interessante Services </label>
      <div class="grid grid-cols-2 gap-2">
        <label
          v-for="service in services"
          :key="service.value"
          class="flex items-center space-x-2 cursor-pointer"
        >
          <input
            v-model="formData.services"
            type="checkbox"
            :value="service.value"
            class="rounded border-ui-border ui-text-accent focus:ring-ui-accent"
          />
          <span class="text-sm ui-text-secondary">{{ service.label }}</span>
        </label>
      </div>
    </div>

    <!-- Timeline (optional) -->
    <div v-if="showTimeline" class="space-y-2">
      <label for="timeline" class="block text-sm font-medium ui-text-primary">
        Gewünschter Zeitrahmen
      </label>
      <select id="timeline" v-model="formData.timeline" :class="inputClass">
        <option value="">Zeitrahmen auswählen</option>
        <option value="asap">So schnell wie möglich</option>
        <option value="1-3-months">1-3 Monate</option>
        <option value="3-6-months">3-6 Monate</option>
        <option value="6+-months">6+ Monate</option>
      </select>
    </div>

    <!-- Message -->
    <div class="space-y-2">
      <label for="message" class="block text-sm font-medium ui-text-primary"> Nachricht * </label>
      <textarea
        id="message"
        v-model="formData.message"
        rows="5"
        required
        :class="inputClass"
        :placeholder="placeholders.message"
      />
      <p v-if="errors.message" class="text-sm text-red-500">{{ errors.message }}</p>
    </div>

    <!-- Newsletter -->
    <div v-if="showNewsletter" class="flex items-center space-x-2">
      <input
        id="newsletter"
        v-model="formData.newsletter"
        type="checkbox"
        class="rounded border-ui-border ui-text-accent focus:ring-ui-accent"
      />
      <label for="newsletter" class="text-sm ui-text-secondary cursor-pointer">
        Newsletter abonnieren
      </label>
    </div>

    <!-- Submit Button -->
    <BaseButton
      type="submit"
      :disabled="isSubmitting"
      :variant="buttonVariant"
      size="lg"
      :class="['w-full', buttonClass]"
    >
      <span v-if="!isSubmitting">{{ submitText }}</span>
      <span v-else class="flex items-center justify-center">
        <svg
          class="animate-spin -ml-1 mr-3 h-5 w-5"
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
          />
          <path
            class="opacity-75"
            fill="currentColor"
            d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
        {{ loadingText }}
      </span>
    </BaseButton>

    <!-- Success/Error Messages -->
    <div v-if="submitStatus" class="text-center">
      <p v-if="submitStatus === 'success'" class="text-green-500 font-medium">
        {{ successMessage }}
      </p>
      <p v-if="submitStatus === 'error'" class="text-red-500 font-medium">
        {{ errorMessage }}
      </p>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'
import type { ContactForm } from '@monorepo/shared'

import { BaseButton } from './index'

interface ServiceOption {
  label: string
  value: string
}

interface Props {
  title?: string
  subtitle?: string
  showCompany?: boolean
  showBudget?: boolean
  showServices?: boolean
  showTimeline?: boolean
  showNewsletter?: boolean
  services?: ServiceOption[]
  variant?: 'default' | 'minimal' | 'card'
  buttonVariant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  submitText?: string
  loadingText?: string
  successMessage?: string
  errorMessage?: string
  placeholders?: {
    name?: string
    email?: string
    company?: string
    message?: string
  }
  onSubmit?: (data: ContactForm) => Promise<void>
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  subtitle: '',
  showCompany: false,
  showBudget: false,
  showServices: false,
  showTimeline: false,
  showNewsletter: true,
  services: () => [],
  variant: 'default',
  buttonVariant: 'primary',
  submitText: 'Nachricht senden',
  loadingText: 'Wird gesendet...',
  successMessage: 'Nachricht erfolgreich gesendet!',
  errorMessage: 'Fehler beim Senden. Bitte versuchen Sie es erneut.',
  placeholders: () => ({
    name: 'Ihr Name',
    email: 'ihre.email@beispiel.com',
    company: 'Ihr Unternehmen',
    message: 'Beschreiben Sie Ihr Projekt oder Ihre Anfrage...',
  }),
})

const emit = defineEmits<{
  submit: [data: ContactForm]
  success: [data: ContactForm]
  error: [error: Error]
}>()

// Form data
const formData = reactive({
  name: '',
  email: '',
  company: '',
  budget: '',
  timeline: '',
  services: [] as string[],
  message: '',
  newsletter: false,
})

// Form state
const isSubmitting = ref(false)
const submitStatus = ref<'success' | 'error' | null>(null)
const errors = reactive({
  name: '',
  email: '',
  message: '',
})

// Computed styles
const containerClass = computed(() => {
  const variants = {
    default: '',
    minimal: 'bg-transparent',
    card: 'ui-bg-secondary p-6 rounded-lg border border-ui-border',
  }
  return variants[props.variant]
})

const inputClass = computed(() => {
  return [
    'w-full px-4 py-3 rounded-lg border transition-colors duration-200',
    'ui-bg-secondary ui-text-primary border-ui-border',
    'focus:border-ui-accent focus:ring-2 focus:ring-ui-accent/20 focus:outline-none',
    'placeholder:ui-text-muted',
  ].join(' ')
})

const buttonClass = computed(() => {
  return 'shadow-lg hover:shadow-xl transition-all duration-300'
})

// Validation
const validateForm = () => {
  errors.name = ''
  errors.email = ''
  errors.message = ''

  let isValid = true

  if (!formData.name.trim()) {
    errors.name = 'Name ist erforderlich'
    isValid = false
  }

  if (!formData.email.trim()) {
    errors.email = 'E-Mail ist erforderlich'
    isValid = false
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = 'Bitte geben Sie eine gültige E-Mail-Adresse ein'
    isValid = false
  }

  if (!formData.message.trim()) {
    errors.message = 'Nachricht ist erforderlich'
    isValid = false
  }

  return isValid
}

// Submit handler
const handleSubmit = async () => {
  if (!validateForm()) return

  isSubmitting.value = true
  submitStatus.value = null

  try {
    // Emit submit event
    emit('submit', { ...formData })

    // Use custom onSubmit if provided
    if (props.onSubmit) {
      await props.onSubmit({ ...formData })
    }

    submitStatus.value = 'success'
    emit('success', { ...formData })

    // Reset form after successful submission
    formData.name = ''
    formData.email = ''
    formData.company = ''
    formData.budget = ''
    formData.timeline = ''
    formData.services = []
    formData.message = ''
    formData.newsletter = false
  } catch (error) {
    submitStatus.value = 'error'
    const errorObj = error instanceof Error ? error : new Error('Unknown error occurred')
    emit('error', errorObj)
  } finally {
    isSubmitting.value = false
  }
}

// Reset status after 5 seconds
watch(submitStatus, newStatus => {
  if (newStatus) {
    setTimeout(() => {
      submitStatus.value = null
    }, 5000)
  }
})
</script>
