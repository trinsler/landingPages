<template>
  <div class="tab-navigation">
    <button 
      @click="$emit('update:activeTab', 'scenarios')"
      class="tab-button"
      :class="{ active: activeTab === 'scenarios' }"
    >
      {{ t('scenarioManagement', globalTranslations) }}
    </button>
    <button 
      @click="$emit('update:activeTab', 'users')"
      class="tab-button"
      :class="{ active: activeTab === 'users' }"
    >
      {{ t('userManagement', globalTranslations) }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { useLanguage, globalTranslations } from '~/composables/useLanguage'

const { t } = useLanguage()

defineEmits(['update:activeTab'])
defineProps<{
  activeTab: string
}>()
</script>

<style scoped>
.tab-navigation {
  display: flex;
  gap: 0.25rem;
  margin-bottom: 2rem;
  border-bottom: 2px solid #e5e7eb;
}

.tab-button {
  padding: 0.75rem 1.5rem;
  background: none;
  border: none;
  color: #6b7280;
  font-weight: 500;
  cursor: pointer;
  border-bottom: 3px solid transparent;
  transition: all 0.2s;
}

.tab-button:hover {
  color: #374151;
  background-color: #f9fafb;
}

.tab-button.active {
  color: #0097b2;
  border-bottom-color: #0097b2;
  background-color: #ffffff;
}
</style>