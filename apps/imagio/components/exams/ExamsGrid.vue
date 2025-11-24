<template>
  <div class="exams-section">
    <h2 class="section-title">{{ t('availableExams', globalTranslations) }}</h2>
    
    <div v-if="availableExams.length === 0" class="no-exams">
      <p>No exams available at your current level.</p>
    </div>
    
    <div v-else class="exams-grid">
      <div 
        v-for="exam in availableExams" 
        :key="exam.id"
        class="exam-card"
        :class="{ 
          locked: !isLevelUnlocked(exam.level),
          completed: completedLevels.includes(exam.level)
        }"
      >
        <div class="exam-header">
          <h3 class="exam-title">{{ exam.title }}</h3>
          <div class="exam-level">Level {{ exam.level }}</div>
        </div>
        
        <div class="exam-content">
          <p class="exam-description">{{ exam.description }}</p>
          
          <div class="exam-meta">
            <div class="exam-questions">
              {{ exam.questions.filter(q => q.selected).length }} {{ t('questions', globalTranslations) }}
            </div>
            <div v-if="exam.duration" class="exam-duration">
              {{ exam.duration }} minutes
            </div>
          </div>
        </div>
        
        <div class="exam-actions">
          <button 
            v-if="isLevelUnlocked(exam.level) && !completedLevels.includes(exam.level)"
            @click="$emit('startExam', exam)"
            class="exam-button start"
          >
            {{ t('takeExam', globalTranslations) }}
          </button>
          
          <button 
            v-else-if="completedLevels.includes(exam.level)"
            @click="$emit('viewResults', exam)"
            class="exam-button completed"
          >
            {{ t('examResults', globalTranslations) }}
          </button>
          
          <button 
            v-else
            class="exam-button locked"
            disabled
          >
            {{ t('levelLocked', globalTranslations) }}
          </button>
        </div>
        
        <!-- Lock Overlay -->
        <div v-if="!isLevelUnlocked(exam.level)" class="lock-overlay">
          <div class="lock-icon">🔒</div>
          <p>Complete Level {{ exam.level - 1 }} to unlock</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLanguage, globalTranslations } from '~/composables/useLanguage'

const { t } = useLanguage()

defineEmits(['startExam', 'viewResults'])

defineProps<{
  availableExams: Array<any>
  completedLevels: Array<number>
  isLevelUnlocked: (level: number) => boolean
}>()
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

.no-exams {
  text-align: center;
  padding: 3rem;
  color: #6b7280;
  background: #ffffff;
  border-radius: 8px;
}

.exams-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
}

.exam-card {
  background: #ffffff;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 2px solid #e5e7eb;
  transition: all 0.2s;
  position: relative;
}

.exam-card:hover:not(.locked) {
  border-color: #0097b2;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 151, 178, 0.1);
}

.exam-card.locked {
  opacity: 0.6;
}

.exam-card.completed {
  border-color: #10b981;
  background: #f0fdf4;
}

.exam-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.exam-title {
  color: #1f2937;
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0;
  flex: 1;
}

.exam-level {
  background: #0097b2;
  color: #ffffff;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
}

.exam-description {
  color: #6b7280;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.exam-meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  font-size: 0.875rem;
  color: #374151;
}

.exam-actions {
  display: flex;
  justify-content: center;
}

.exam-button {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  width: 100%;
}

.exam-button.start {
  background: #0097b2;
  color: #ffffff;
}

.exam-button.start:hover {
  background: #007a8e;
}

.exam-button.completed {
  background: #10b981;
  color: #ffffff;
}

.exam-button.locked {
  background: #9ca3af;
  color: #ffffff;
  cursor: not-allowed;
}

.lock-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
}

.lock-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

@media (max-width: 768px) {
  .exams-grid {
    grid-template-columns: 1fr;
  }
}
</style>