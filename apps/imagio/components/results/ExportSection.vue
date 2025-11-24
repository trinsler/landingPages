<template>
  <div class="export-section">
    <h3 class="section-subtitle">{{ t('exportResults', globalTranslations) }}</h3>
    <div class="export-options">
      <button @click="$emit('exportToPDF')" class="export-button pdf">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14,2 14,8 20,8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10,9 9,9 8,9"></polyline>
        </svg>
        {{ t('exportPDF', globalTranslations) }}
      </button>
      <button @click="$emit('exportToCSV')" class="export-button csv">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14,2 14,8 20,8"></polyline>
        </svg>
        {{ t('exportCSV', globalTranslations) }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLanguage, globalTranslations } from '~/composables/useLanguage'

const { t } = useLanguage()

defineEmits(['exportToPDF', 'exportToCSV'])
</script>

<style scoped>
.export-section {
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.section-subtitle {
  color: #1f2937;
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.export-options {
  display: flex;
  gap: 1rem;
}

.export-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.export-button.pdf {
  background-color: #ef4444;
  color: #ffffff;
}

.export-button.pdf:hover {
  background-color: #dc2626;
  transform: translateY(-1px);
}

.export-button.csv {
  background-color: #10b981;
  color: #ffffff;
}

.export-button.csv:hover {
  background-color: #059669;
  transform: translateY(-1px);
}

@media (max-width: 768px) {
  .export-options {
    flex-direction: column;
  }
  
  .export-button {
    justify-content: center;
  }
}
</style>