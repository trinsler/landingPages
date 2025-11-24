<template>
  <div class="code-input-section">
    <div class="input-container">
      <h2 class="section-title">{{ t('enterGameCode', globalTranslations) }}</h2>
      <p class="section-description">{{ t('enterGameCodeDescription', globalTranslations) }}</p>
      
      <form @submit.prevent="$emit('loadResults')" class="code-form">
        <div class="form-group">
          <label class="form-label">{{ t('gameCode', globalTranslations) }}</label>
          <input 
            :value="gameCode"
            @input="$emit('updateCode', ($event.target as HTMLInputElement).value)"
            type="text"
            class="code-input"
            :placeholder="t('gameCodePlaceholder', globalTranslations)"
            required
            minlength="3"
          >
        </div>
        <button type="submit" class="load-button" :disabled="gameCode.length < 3">
          {{ t('loadResults', globalTranslations) }}
        </button>
      </form>
      
      <div v-if="loadingError" class="error-message">
        {{ loadingError }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLanguage, globalTranslations } from '~/composables/useLanguage'

const { t } = useLanguage()

defineEmits(['loadResults', 'updateCode'])

defineProps<{
  gameCode: string
  loadingError: string
}>()
</script>

<style scoped>
.code-input-section {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
}

.input-container {
  background-color: #ffffff;
  padding: 3rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  text-align: center;
  max-width: 500px;
  width: 100%;
}

.section-title {
  color: #1f2937;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.section-description {
  color: #6b7280;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.code-form {
  text-align: left;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  color: #374151;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.code-input {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.code-input:focus {
  outline: none;
  border-color: #0097b2;
  box-shadow: 0 0 0 3px rgba(0, 151, 178, 0.1);
}

.load-button {
  width: 100%;
  padding: 0.875rem;
  background-color: #0097b2;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.load-button:hover:not(:disabled) {
  background-color: #007a8e;
  transform: translateY(-1px);
}

.load-button:disabled {
  background-color: #9ca3af;
  cursor: not-allowed;
  transform: none;
}

.error-message {
  color: #ef4444;
  background-color: #fef2f2;
  padding: 0.75rem;
  border-radius: 6px;
  margin-top: 1rem;
  border: 1px solid #fecaca;
}

@media (max-width: 768px) {
  .input-container {
    padding: 2rem;
  }
}
</style>