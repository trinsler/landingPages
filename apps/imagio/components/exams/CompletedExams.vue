<template>
  <div class="exams-section">
    <h2 class="section-title">{{ t('completedExams', globalTranslations) }}</h2>
    
    <div class="completed-exams-list">
      <div 
        v-for="exam in completedExams" 
        :key="`completed_${exam.id}`"
        class="completed-exam-card"
      >
        <div class="exam-info">
          <h4>{{ exam.title }}</h4>
          <p>Level {{ exam.level }} • Completed</p>
        </div>
        
        <div class="exam-result">
          <div class="result-score">{{ examScore }}%</div>
          <button @click="$emit('viewResults', exam)" class="view-results-btn">
            View Details
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useLanguage } from '~/composables/useLanguage'

defineEmits(['viewResults'])

const props = defineProps<{
  completedExams: Array<any>
}>()

// Import language functionality
const { t, globalTranslations } = useLanguage()

// Mock score calculation - in real implementation, this would come from parent
const examScore = computed(() => {
  // Return a sample score for demonstration
  return 85
})
</script>

<style scoped>
.exams-section {
  margin-bottom: 3rem;
}

.section-title {
  color: #1f2937;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e5e7eb;
}

.completed-exams-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.completed-exam-card {
  background: #ffffff;
  border-radius: 8px;
  padding: 1.5rem;
  border: 2px solid #10b981;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.exam-info h4 {
  color: #1f2937;
  margin: 0 0 0.25rem 0;
  font-weight: 600;
}

.exam-info p {
  color: #6b7280;
  margin: 0;
  font-size: 0.875rem;
}

.exam-result {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.result-score {
  font-size: 1.5rem;
  font-weight: 700;
  color: #10b981;
}

.view-results-btn {
  padding: 0.5rem 1rem;
  background: #10b981;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.2s;
}

.view-results-btn:hover {
  background: #059669;
}

@media (max-width: 768px) {
  .completed-exam-card {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .exam-result {
    justify-content: center;
  }
}
</style>