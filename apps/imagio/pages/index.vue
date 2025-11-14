<template>
  <div class="landing-page">
    <div class="content">
      <img src="/assets/imagio_logo.png" alt="IMAGIO" class="logo" />
      <h1>{{ t('title') }}</h1>
      <p>{{ t('subtitle') }}</p>
      
      <div class="login-section">
        <div class="input-container">
          <input
            v-model="scenarioCode"
            type="text"
            :placeholder="t('enterCode')"
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
          :disabled="!isValidCode"
        >
          {{ t('start') }}
        </button>
      </div>
      
      </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Reactive state
const scenarioCode = ref('')
const currentLanguage = ref('en')

// Translations
const t = (key: string) => {
  const translations: Record<string, Record<string, string>> = {
    en: {
      title: 'Welcome to IMAGIO',
      subtitle: 'Enter your scenario code to begin',
      enterCode: 'Enter scenario code',
      start: 'Start Learning'
    },
    de: {
      title: 'Willkommen bei IMAGIO',
      subtitle: 'Geben Sie Ihren Szenario-Code ein',
      enterCode: 'Szenario-Code eingeben',
      start: 'Starten'
    },
    fr: {
      title: 'Bienvenue sur IMAGIO',
      subtitle: 'Entrez votre code de scénario',
      enterCode: 'Entrez le code de scénario',
      start: 'Commencer'
    }
  }
  return translations[currentLanguage.value][key] || key
}

// Computed properties
const isValidCode = computed(() => {
  return scenarioCode.value.trim().length >= 3
})

const validationError = computed(() => {
  if (scenarioCode.value.trim().length > 0 && scenarioCode.value.trim().length < 3) {
    return currentLanguage.value === 'de' ? 'Code muss mindestens 3 Zeichen lang sein' : 
           currentLanguage.value === 'fr' ? 'Le code doit contenir au moins 3 caractères' : 
           'Code must be at least 3 characters'
  }
  return ''
})

// Methods
const handleDirectLogin = () => {
  if (isValidCode.value) {
    // Store the scenario code and redirect to the introduction page
    localStorage.setItem('currentScenarioCode', scenarioCode.value)
    router.push('/introduction')
  }
}
</script>

<style scoped>
.landing-page {
  min-height: calc(100vh - 64px);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.content {
  text-align: center;
  max-width: 450px;
  padding: 2rem;
}

.logo {
  width: 200px;
  height: auto;
  margin-bottom: 2rem;
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
