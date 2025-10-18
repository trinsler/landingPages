<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 overflow-y-auto"
        @click="closeOnBackdrop"
      >
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <!-- Backdrop -->
          <Transition
            enter-active-class="transition-opacity ease-out duration-300"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition-opacity ease-in duration-200"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <div class="fixed inset-0 bg-gray-900 bg-opacity-75" />
          </Transition>

          <!-- Modal Panel -->
          <Transition
            enter-active-class="transition-all ease-out duration-300"
            enter-from-class="opacity-0 transform scale-95"
            enter-to-class="opacity-100 transform scale-100"
            leave-active-class="transition-all ease-in duration-200"
            leave-from-class="opacity-100 transform scale-100"
            leave-to-class="opacity-0 transform scale-95"
          >
            <div
              class="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
              @click.stop
            >
              <!-- Header -->
              <div class="flex items-center justify-between mb-6">
                <h3 class="text-2xl font-bold text-gray-900">
                  {{ isSignUp ? 'Konto erstellen' : 'Anmelden' }}
                </h3>
                <button
                  type="button"
                  class="rounded-md p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  @click="closeModal"
                >
                  <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <!-- Tab Navigation -->
              <div class="flex mb-6 bg-gray-100 rounded-lg p-1">
                <button
                  class="flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors"
                  :class="activeTab === 'email' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'"
                  @click="activeTab = 'email'"
                >
                  E-Mail
                </button>
                <button
                  class="flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors"
                  :class="activeTab === 'social' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'"
                  @click="activeTab = 'social'"
                >
                  Social
                </button>
              </div>

              <!-- Error Message -->
              <div
                v-if="errorMessage"
                class="mb-4 p-3 bg-red-50 border border-red-200 rounded-md"
              >
                <p class="text-sm text-red-600">{{ errorMessage }}</p>
              </div>

              <!-- Success Message -->
              <div
                v-if="successMessage"
                class="mb-4 p-3 bg-green-50 border border-green-200 rounded-md"
              >
                <p class="text-sm text-green-600">{{ successMessage }}</p>
              </div>

              <!-- Email Tab -->
              <form v-if="activeTab === 'email'" @submit.prevent="handleSubmit" class="space-y-4">
                <!-- Full Name (Sign Up only) -->
                <div v-if="isSignUp">
                  <label for="fullName" class="block text-sm font-medium text-gray-700 mb-2">
                    Vollständiger Name *
                  </label>
                  <input
                    id="fullName"
                    v-model="form.fullName"
                    type="text"
                    required
                    :disabled="loading"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="Max Mustermann"
                  />
                </div>

                <!-- Email -->
                <div>
                  <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                    E-Mail *
                  </label>
                  <input
                    id="email"
                    v-model="form.email"
                    type="email"
                    required
                    :disabled="loading"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="deine.email@example.com"
                  />
                </div>

                <!-- Password -->
                <div>
                  <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
                    Passwort *
                  </label>
                  <div class="relative">
                    <input
                      id="password"
                      v-model="form.password"
                      :type="showPassword ? 'text' : 'password'"
                      required
                      :disabled="loading"
                      class="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                      :placeholder="isSignUp ? 'Mindestens 6 Zeichen' : 'Dein Passwort'"
                    />
                    <button
                      type="button"
                      class="absolute inset-y-0 right-0 pr-3 flex items-center"
                      @click="showPassword = !showPassword"
                    >
                      <svg
                        v-if="showPassword"
                        class="h-5 w-5 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <svg
                        v-else
                        class="h-5 w-5 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    </button>
                  </div>
                  <p v-if="isSignUp" class="mt-1 text-xs text-gray-500">
                    Mindestens 6 Zeichen empfohlen
                  </p>
                </div>

                <!-- Submit Button -->
                <button
                  type="submit"
                  :disabled="loading || !isFormValid"
                  class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  <svg
                    v-if="loading"
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
                  {{ loading ? 'Wird verarbeitet...' : (isSignUp ? 'Konto erstellen' : 'Anmelden') }}
                </button>

                <!-- Forgot Password (Login only) -->
                <div v-if="!isSignUp" class="text-center">
                  <button
                    type="button"
                    class="text-sm text-indigo-600 hover:text-indigo-500 font-medium"
                    @click="showForgotPassword = true"
                  >
                    Passwort vergessen?
                  </button>
                </div>
              </form>

              <!-- Social Tab -->
              <div v-else class="space-y-4">
                <!-- Google Button -->
                <button
                  type="button"
                  :disabled="loading"
                  class="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
                  @click="handleGoogleSignIn"
                >
                  <svg class="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Weiter mit Google
                </button>

                <div class="relative">
                  <div class="absolute inset-0 flex items-center">
                    <div class="w-full border-t border-gray-300" />
                  </div>
                  <div class="relative flex justify-center text-sm">
                    <span class="px-2 bg-white text-gray-500">oder</span>
                  </div>
                </div>

                <!-- Switch to Email -->
                <button
                  type="button"
                  class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                  @click="activeTab = 'email'"
                >
                  Mit E-Mail fortfahren
                </button>
              </div>

              <!-- Switch Mode -->
              <div class="mt-6 text-center">
                <p class="text-sm text-gray-600">
                  {{ isSignUp ? 'Bereits ein Konto?' : 'Noch kein Konto?' }}
                  <button
                    type="button"
                    class="font-medium text-indigo-600 hover:text-indigo-500"
                    @click="toggleMode"
                  >
                    {{ isSignUp ? 'Anmelden' : 'Registrieren' }}
                  </button>
                </p>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </Transition>
  </Teleport>

  <!-- Forgot Password Modal -->
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div
        v-if="showForgotPassword"
        class="fixed inset-0 z-50 overflow-y-auto"
        @click="showForgotPassword = false"
      >
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <div class="fixed inset-0 bg-gray-900 bg-opacity-75" />

          <div
            class="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            @click.stop
          >
            <h3 class="text-xl font-bold text-gray-900 mb-4">Passwort zurücksetzen</h3>
            <p class="text-sm text-gray-600 mb-6">
              Wir senden dir einen Link zum Zurücksetzen deines Passworts.
            </p>

            <form @submit.prevent="handlePasswordReset" class="space-y-4">
              <div>
                <label for="resetEmail" class="block text-sm font-medium text-gray-700 mb-2">
                  E-Mail-Adresse
                </label>
                <input
                  id="resetEmail"
                  v-model="resetEmail"
                  type="email"
                  required
                  :disabled="loading"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="deine.email@example.com"
                />
              </div>

              <div class="flex space-x-3">
                <button
                  type="button"
                  class="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  @click="showForgotPassword = false"
                >
                  Abbrechen
                </button>
                <button
                  type="submit"
                  :disabled="loading"
                  class="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400"
                >
                  Link senden
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { useToast } from '@monorepo/ui'

// Props
interface Props {
  isOpen: boolean
  mode?: 'login' | 'signup'
}

const props = withDefaults(defineProps<Props>(), {
  mode: 'login'
})

// Emits
const emit = defineEmits<{
  close: []
  success: []
}>()

// Composables
const authStore = useAuthStore()
const { success, error: showError } = useToast()

// Reactive data
const activeTab = ref<'email' | 'social'>('email')
const isSignUp = ref(props.mode === 'signup')
const showPassword = ref(false)
const showForgotPassword = ref(false)
const loading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')
const resetEmail = ref('')

const form = ref({
  fullName: '',
  email: '',
  password: ''
})

// Computed
const isFormValid = computed(() => {
  if (isSignUp.value) {
    return (
      form.value.fullName.trim().length >= 2 &&
      form.value.email.includes('@') &&
      form.value.password.length >= 6
    )
  } else {
    return (
      form.value.email.includes('@') &&
      form.value.password.length > 0
    )
  }
})

// Watch for mode changes
watch(() => props.mode, (newMode) => {
  isSignUp.value = newMode === 'signup'
})

// Watch for modal open/close
watch(() => props.isOpen, (isOpen) => {
  if (!isOpen) {
    resetForm()
  }
})

// Methods
const resetForm = () => {
  form.value = {
    fullName: '',
    email: '',
    password: ''
  }
  errorMessage.value = ''
  successMessage.value = ''
  resetEmail.value = ''
  activeTab.value = 'email'
  loading.value = false
}

const closeModal = () => {
  emit('close')
}

const closeOnBackdrop = (event: MouseEvent) => {
  if (event.target === event.currentTarget) {
    closeModal()
  }
}

const toggleMode = () => {
  isSignUp.value = !isSignUp.value
  resetForm()
}

const clearMessages = () => {
  errorMessage.value = ''
  successMessage.value = ''
}

const handleSubmit = async () => {
  if (!isFormValid.value) return

  clearMessages()
  loading.value = true

  try {
    if (isSignUp.value) {
      await authStore.signUpWithEmail(
        form.value.email,
        form.value.password,
        form.value.fullName
      )

      successMessage.value = 'Konto erstellt! Bitte überprüfe deine E-Mail für die Bestätigung.'
      setTimeout(() => {
        closeModal()
        emit('success')
      }, 2000)
    } else {
      await authStore.signInWithEmail(
        form.value.email,
        form.value.password
      )

      closeModal()
      emit('success')
    }
  } catch (err: any) {
    errorMessage.value = err.message || 'Ein Fehler ist aufgetreten. Bitte versuche es erneut.'
  } finally {
    loading.value = false
  }
}

const handleGoogleSignIn = async () => {
  clearMessages()
  loading.value = true

  try {
    await authStore.signInWithGoogle()
    closeModal()
    emit('success')
  } catch (err: any) {
    errorMessage.value = err.message || 'Ein Fehler ist aufgetreten. Bitte versuche es erneut.'
  } finally {
    loading.value = false
  }
}

const handlePasswordReset = async () => {
  if (!resetEmail.value) return

  loading.value = true

  try {
    await authStore.resetPassword(resetEmail.value)
    success('Passwort-Reset Link wurde gesendet!')
    showForgotPassword.value = false
    resetEmail.value = ''
  } catch (err: any) {
    showError(err.message || 'Fehler beim Senden des Passwort-Reset Links')
  } finally {
    loading.value = false
  }
}
</script>