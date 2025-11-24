<template>
  <div class="results-header">
    <button @click="$emit('goBack')" class="back-button">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M19 12H5M12 19l-7-7 7-7"/>
      </svg>
      {{ t('backToCodeInput', globalTranslations) }}
    </button>
    <h2 class="result-title">{{ selectedResult.scenario }} - {{ t('gameCode', globalTranslations) }}: {{ selectedResult.code }}</h2>
  </div>
</template>

<script setup lang="ts">
import { useLanguage, globalTranslations } from '~/composables/useLanguage'

const { t } = useLanguage()

defineEmits(['goBack'])

defineProps<{
  selectedResult: {
    scenario: string
    code: string
  }
}>()
</script>

<style scoped>
.results-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #e5e7eb;
}

.back-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: #6b7280;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.back-button:hover {
  background-color: #4b5563;
}

.result-title {
  color: #1f2937;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
}

@media (max-width: 768px) {
  .results-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
}
</style>