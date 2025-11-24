<template>
  <div class="scenarios-pane">
    <div class="pane-header">
      <h3 class="pane-title">{{ t('scenarios', globalTranslations) }}</h3>
      <button @click="createScenario" class="create-button">
        {{ t('createScenario', globalTranslations) }}
      </button>
    </div>
    
    <div class="scenarios-list">
      <div 
        v-for="scenario in scenarios" 
        :key="scenario.id"
        @click="$emit('selectScenario', scenario)"
        class="scenario-item"
        :class="{ active: selectedScenario?.id === scenario.id }"
      >
        <div class="scenario-info">
          <h4 class="scenario-name">{{ scenario.name }}</h4>
          <p class="scenario-code">{{ t('code', globalTranslations) }}: {{ scenario.code }}</p>
          <p class="scenario-questions">{{ scenario.questions.length }} {{ t('questions', globalTranslations) }}</p>
        </div>
        <div class="scenario-actions">
          <button @click.stop="editScenario(scenario)" class="action-button edit">
            {{ t('edit', globalTranslations) }}
          </button>
          <button @click.stop="deleteScenario(scenario.id)" class="action-button delete">
            {{ t('delete', globalTranslations) }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLanguage, globalTranslations } from '~/composables/useLanguage'

const { t } = useLanguage()

defineEmits(['selectScenario'])

defineProps<{
  scenarios: Array<any>
  selectedScenario: any
}>()

const createScenario = () => {
  const name = prompt('Enter scenario name:')
  const code = prompt('Enter scenario code:')
  if (name && code) {
    const newScenario = {
      id: Date.now(),
      name,
      code: code.toUpperCase(),
      questions: []
    }
    // Emit new scenario creation
    // This would be handled by the parent component
  }
}

const editScenario = (scenario: any) => {
  // This would trigger the exam management view
  console.log('Edit scenario:', scenario)
}

const deleteScenario = (id: number) => {
  if (confirm('Are you sure you want to delete this scenario?')) {
    // This would be handled by the parent component
    console.log('Delete scenario:', id)
  }
}
</script>

<style scoped>
.scenarios-pane {
  flex: 0 0 40%;
  border-right: 2px solid #e5e7eb;
  padding-right: 2rem;
}

.pane-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e5e7eb;
}

.pane-title {
  color: #1f2937;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
}

.create-button {
  padding: 0.5rem 1rem;
  background-color: #0097b2;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.create-button:hover {
  background-color: #007a8e;
}

.scenarios-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.scenario-item {
  padding: 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.scenario-item:hover {
  border-color: #0097b2;
  transform: translateY(-1px);
}

.scenario-item.active {
  border-color: #0097b2;
  background-color: #f0f9ff;
}

.scenario-info h4 {
  color: #1f2937;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
}

.scenario-code {
  color: #6b7280;
  font-size: 0.875rem;
  margin: 0.25rem 0;
}

.scenario-questions {
  color: #374151;
  font-size: 0.875rem;
  margin: 0.25rem 0 1rem 0;
}

.scenario-actions {
  display: flex;
  gap: 0.5rem;
}

.action-button {
  padding: 0.375rem 0.75rem;
  border: none;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.action-button.edit {
  background-color: #f59e0b;
  color: #ffffff;
}

.action-button.edit:hover {
  background-color: #d97706;
}

.action-button.delete {
  background-color: #ef4444;
  color: #ffffff;
}

.action-button.delete:hover {
  background-color: #dc2626;
}

@media (max-width: 1024px) {
  .scenarios-pane {
    flex: none;
    border-right: none;
    border-bottom: 2px solid #e5e7eb;
    padding-right: 0;
    padding-bottom: 2rem;
  }
}
</style>