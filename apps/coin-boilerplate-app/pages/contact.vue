<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-extrabold text-gray-900 sm:text-5xl">
          Kontaktieren Sie uns
        </h1>
        <p class="mt-4 text-xl text-gray-600">
          Haben Sie Fragen oder Feedback? Wir freuen uns von Ihnen zu hören.
        </p>
      </div>

      <!-- Contact Information -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div class="bg-white p-6 rounded-lg shadow-md">
          <div class="flex items-center mb-4">
            <svg class="h-6 w-6 text-indigo-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <h3 class="text-lg font-semibold text-gray-900">E-Mail</h3>
          </div>
          <p class="text-gray-600">Niels.hensler@gmail.com</p>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-md">
          <div class="flex items-center mb-4">
            <svg class="h-6 w-6 text-indigo-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 class="text-lg font-semibold text-gray-900">Antwortzeit</h3>
          </div>
          <p class="text-gray-600">Normalerweise innerhalb von 24 Stunden</p>
        </div>
      </div>

      <!-- Contact Form -->
      <ContactForm
        :user-email="authStore.user?.email"
        :user-name="authStore.user?.full_name"
        @success="handleFormSuccess"
      />

      <!-- Additional Information -->
      <div class="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 class="text-lg font-semibold text-blue-900 mb-2">Wichtige Informationen</h3>
        <ul class="space-y-2 text-blue-800">
          <li class="flex items-start">
            <svg class="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
            <span>Alle Felder mit * sind Pflichtfelder</span>
          </li>
          <li class="flex items-start">
            <svg class="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
            <span>Ihre Daten werden sicher und vertraulich behandelt</span>
          </li>
          <li class="flex items-start">
            <svg class="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
            <span>Wir verwenden Ihre E-Mail-Adresse nur zur Beantwortung Ihrer Anfrage</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
import { useToast } from '@monorepo/ui'
import ContactForm from '~/components/forms/ContactForm.vue'

// SEO
useHead({
  title: 'Kontakt - Coin App',
  meta: [
    { name: 'description', content: 'Kontaktieren Sie uns bei Fragen oder Feedback zur Coin App.' }
  ]
})

// Composables
const authStore = useAuthStore()
const { success } = useToast()
const router = useRouter()

// Methods
const handleFormSuccess = (data: any) => {
  // Show additional success message with option to redirect
  setTimeout(() => {
    success('Vielen Dank für Ihre Nachricht! Wir werden uns so schnell wie möglich bei Ihnen melden.')
    // Optional: Redirect to home page after successful submission
    setTimeout(() => {
      router.push('/')
    }, 2000)
  }, 1000)
}
</script>