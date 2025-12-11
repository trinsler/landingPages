<template>
  <div class="landing-page">
    <div class="content">
      <img src="/assets/imagio_logo.png" alt="IMAGIO" class="logo" />
      <h1>{{ tLocal('title') }}</h1>
      <p>{{ tLocal('subtitle') }}</p>
      
      <div class="login-section">
        <div class="input-container">
          <input
            v-model="scenarioCode"
            type="text"
            :placeholder="tLocal('enterCode')"
            class="scenario-input"
            @keyup.enter="handleDirectLogin"
          />
          <div v-if="validationError" class="error-message">
            {{ validationError }}
          </div>
        </div>
        
        <button 
          @click="handleDirectLogin" 
          class="login-button"
        >
          {{ tLocal('start') }}
        </button>
      </div>
      
      </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useExamStore } from '~/composables/useExamStore'
import { useLanguage, globalTranslations } from '~/composables/useLanguage'

const router = useRouter()
const examStore = useExamStore()
const { currentLanguage, t } = useLanguage()

// Reactive state
const scenarioCode = ref('')
const validationError = ref('')
const availableCourses = ref<any[]>([])
const isLoadingCourses = ref(false)

// Create local translations that work with global system
const translations = {
  en: {
    title: 'Welcome to IMAGIO',
    subtitle: 'Enter your scenario code to begin',
    enterCode: 'Enter scenario code',
    start: 'Start Learning',
    codeRequired: 'Please enter a scenario code',
    codeTooShort: 'Code must be at least 3 characters',
    codeNotFound: 'Scenario code not found. Please check your code.',
    codeInvalid: 'Invalid scenario code format',
    availableCourses: 'Available Courses',
    loadingCourses: 'Loading available courses...',
    noCoursesAvailable: 'No courses available. Please contact your administrator.'
  },
  de: {
    title: 'Willkommen bei IMAGIO',
    subtitle: 'Geben Sie Ihren Szenario-Code ein',
    enterCode: 'Szenario-Code eingeben',
    start: 'Starten',
    codeRequired: 'Bitte geben Sie einen Szenario-Code ein',
    codeTooShort: 'Code muss mindestens 3 Zeichen lang sein',
    codeNotFound: 'Szenario-Code nicht gefunden. Bitte überprüfen Sie Ihren Code.',
    codeInvalid: 'Ungültiges Szenario-Code Format',
    availableCourses: 'Verfügbare Kurse',
    loadingCourses: 'Lade verfügbare Kurse...',
    noCoursesAvailable: 'Keine Kurse verfügbar. Bitte kontaktieren Sie Ihren Administrator.'
  }
}

const tLocal = (key: string) => t(key, translations)

// Computed properties
const isValidCode = computed(() => {
  return scenarioCode.value.trim().length >= 3
})

// Load available courses from backend
const loadCourses = async () => {
  isLoadingCourses.value = true
  try {
    const response = await $fetch('/api/courses', {
      method: 'GET'
    })
    console.log('Courses loaded:', response.data.courses.length, 'courses')
    availableCourses.value = response.data.courses
  } catch (error) {
    console.error('Error loading courses:', error)
  } finally {
    isLoadingCourses.value = false
  }
}

// Methods
const validateCode = (code: string): boolean => {
  // Clear previous error
  validationError.value = ''

  // Check if code is empty
  if (!code) {
    validationError.value = tLocal('codeRequired')
    return false
  }

  // Check minimum length
  if (code.length < 3) {
    validationError.value = tLocal('codeTooShort')
    return false
  }

  // Check if code exists in backend courses
  const courseExists = availableCourses.value.some(
    course => course.code.toLowerCase() === code.toLowerCase()
  )

  if (!courseExists) {
    validationError.value = tLocal('codeNotFound')
    return false
  }

  return true
}

const handleDirectLogin = () => {
  const code = scenarioCode.value.trim().toUpperCase()
  
  console.log('Login attempt with code:', code)
  console.log('Available courses:', availableCourses.value.map(c => c.code))

  if (validateCode(code)) {
    console.log('Code validation successful, redirecting...')
    // Code is valid, store and redirect
    localStorage.setItem('currentScenarioCode', code)
    router.push('/introduction')
  } else {
    console.log('Code validation failed:', validationError.value)
  }
}


// Load courses on mount
onMounted(() => {
  loadCourses()
})
</script>

<style scoped>
.landing-page {
  min-height: calc(100vh - 64px);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  padding: 2rem;
}

.content {
  text-align: center;
  max-width: 450px;
  width: 100%;
}

.logo {
  width: 200px;
  height: auto;
  margin: 0 auto 2rem auto;
  display: block;
}

h1 {
  color: #1f2937;
  margin-bottom: 0.75rem;
  font-size: 2rem;
  font-weight: 600;
}

p {
  color: #6b7280;
  margin-bottom: 2.5rem;
  font-size: 1.125rem;
}

.login-section {
  margin-bottom: 2rem;
}

.input-container {
  margin-bottom: 1.5rem;
  position: relative;
}

.scenario-input {
  width: 100%;
  padding: 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s;
  background-color: #ffffff;
  color: #000000;
}

.scenario-input:focus {
  outline: none;
  border-color: #0097b2;
  box-shadow: 0 0 0 3px rgba(0, 151, 178, 0.1);
}

.scenario-input::placeholder {
  color: #9ca3af;
}

.error-message {
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: 0.5rem;
  text-align: left;
}

.login-button {
  width: 100%;
  padding: 1rem 2rem;
  background-color: #0097b2;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 1.125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.login-button:hover:not(:disabled) {
  background-color: #007a8e;
  transform: translateY(-1px);
}

.login-button:disabled {
  background-color: #d1d5db;
  cursor: not-allowed;
  transform: none;
}


@media (max-width: 768px) {
  .landing-page {
    min-height: calc(100vh - 56px);
    padding: 1rem;
  }
  
  .content {
    padding: 1.5rem;
    max-width: 100%;
  }
  
  .logo {
    width: 180px;
  }
  
  h1 {
    font-size: 1.75rem;
  }
  
  .alternative-links {
    gap: 0.75rem;
  }
}
</style>
