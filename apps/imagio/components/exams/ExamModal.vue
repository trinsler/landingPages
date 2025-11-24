<template>
  <div class="modal-overlay">
    <div class="exam-modal" @click.stop>
      <div class="exam-modal-header">
        <h3>{{ exam.title }}</h3>
        <div class="exam-progress">
          Question {{ currentQuestionIndex + 1 }} of {{ questions.length }}
        </div>
        <button @click="$emit('close')" class="modal-close">×</button>
      </div>
      
      <div class="exam-modal-content">
        <div v-if="questions[currentQuestionIndex]" class="question-container">
          <div class="question-text">
            {{ questions[currentQuestionIndex].text }}
          </div>
          
          <!-- Answer Mode Selection -->
          <div class="answer-mode-selector">
            <label class="mode-option">
              <input 
                type="radio" 
                :value="'written'" 
                :checked="answerMode === 'written'"
                @change="$emit('switchMode', 'written')"
              />
              <span>{{ t('writtenMode', globalTranslations) }}</span>
            </label>
            <label class="mode-option">
              <input 
                type="radio" 
                :value="'oral'"
                :checked="answerMode === 'oral'"
                @change="$emit('switchMode', 'oral')"
              />
              <span>{{ t('oralMode', globalTranslations) }}</span>
            </label>
          </div>
          
          <!-- Answer Input Component -->
          <AnswerInput
            :mode="answerMode"
            :currentAnswer="currentAnswer"
            :isRecording="isRecording"
            :transcript="transcript"
            @updateAnswer="$emit('updateAnswer', $event)"
            @toggleRecording="$emit('toggleRecording')"
          />
          
          <!-- Answer Analysis Results -->
          <div v-if="currentQuestionAnalysis" class="answer-analysis">
            <div class="analysis-header">
              <h4>Answer Analysis</h4>
              <div class="score-indicator" :class="{ passed: currentQuestionAnalysis.passed }">
                {{ currentQuestionAnalysis.score }}/10 {{ t('keywords', globalTranslations) }}
                <span class="status">{{ currentQuestionAnalysis.passed ? t('passed', globalTranslations) : t('failed', globalTranslations) }}</span>
              </div>
            </div>
            
            <div class="keywords-breakdown">
              <div class="keywords-grid">
                <div 
                  v-for="detail in currentQuestionAnalysis.details"
                  :key="detail.keyword"
                  class="keyword-item"
                  :class="{ found: detail.found }"
                >
                  <span class="keyword-text">{{ detail.keyword }}</span>
                  <span class="keyword-status">{{ detail.found ? '✓' : '✗' }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="exam-modal-footer">
        <div class="navigation-buttons">
          <button 
            @click="$emit('previousQuestion')"
            :disabled="currentQuestionIndex === 0"
            class="nav-button prev"
          >
            {{ t('previousQuestion', globalTranslations) }}
          </button>
          
          <button 
            v-if="!currentQuestionAnalysis"
            @click="$emit('submitAnswer')"
            :disabled="!currentAnswer.trim()"
            class="submit-button"
          >
            {{ t('submitAnswer', globalTranslations) }}
          </button>
          
          <button 
            v-if="currentQuestionIndex < questions.length - 1"
            @click="$emit('nextQuestion')"
            class="nav-button next"
            :disabled="!currentQuestionAnalysis"
          >
            {{ t('nextQuestion', globalTranslations) }}
          </button>
          
          <button 
            v-if="currentQuestionIndex === questions.length - 1 && currentQuestionAnalysis"
            @click="$emit('finishExam')"
            class="finish-button"
          >
            Finish Exam
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLanguage, globalTranslations } from '~/composables/useLanguage'
import AnswerInput from './AnswerInput.vue'

const { t } = useLanguage()

defineEmits([
  'close',
  'switchMode', 
  'updateAnswer',
  'toggleRecording',
  'submitAnswer',
  'nextQuestion',
  'previousQuestion',
  'finishExam'
])

defineProps<{
  exam: any
  questions: Array<any>
  currentQuestionIndex: number
  answerMode: string
  currentAnswer: string
  isRecording: boolean
  transcript: string
  currentQuestionAnalysis: any
}>()
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #ffffff;
  display: flex;
  align-items: stretch;
  justify-content: center;
  z-index: 9999;
  padding: 0;
}

.exam-modal {
  background: #ffffff;
  border-radius: 0;
  width: 100%;
  max-width: none;
  height: 100%;
  overflow-y: auto;
  box-shadow: none;
  display: flex;
  flex-direction: column;
}

.exam-modal-header {
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.exam-modal-header h3 {
  margin: 0;
  color: #1f2937;
  font-weight: 600;
}

.exam-progress {
  color: #6b7280;
  font-size: 0.875rem;
}

.modal-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #6b7280;
  cursor: pointer;
  padding: 0.25rem;
}

.exam-modal-content {
  padding: 2rem;
  flex: 1;
  overflow-y: auto;
}

.question-text {
  background: #f8fafc;
  padding: 1.5rem;
  border-radius: 8px;
  border-left: 4px solid #0097b2;
  margin-bottom: 2rem;
  font-weight: 500;
  color: #1f2937;
  line-height: 1.6;
}

.answer-mode-selector {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  justify-content: center;
}

.mode-option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: #f8fafc;
  border: 2px solid #e5e7eb;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.mode-option:hover {
  border-color: #0097b2;
}

.mode-option input[type="radio"]:checked + span {
  color: #0097b2;
  font-weight: 600;
}

.answer-analysis {
  background: #f8fafc;
  padding: 1.5rem;
  border-radius: 8px;
  border: 2px solid #e5e7eb;
  margin-top: 1.5rem;
}

.analysis-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.analysis-header h4 {
  margin: 0;
  color: #374151;
}

.score-indicator {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: #fee2e2;
  color: #991b1b;
  border-radius: 6px;
  font-weight: 600;
}

.score-indicator.passed {
  background: #dcfce7;
  color: #166534;
}

.keywords-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 0.5rem;
}

.keyword-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  font-size: 0.875rem;
}

.keyword-item.found {
  border-color: #10b981;
  background: #f0fdf4;
  color: #166534;
}

.keyword-status {
  font-weight: 600;
}

.exam-modal-footer {
  padding: 1.5rem;
  border-top: 1px solid #e5e7eb;
  background: #f8fafc;
  flex-shrink: 0;
}

.navigation-buttons {
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  align-items: center;
}

.nav-button, .submit-button, .finish-button {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.nav-button {
  background: #6b7280;
  color: #ffffff;
}

.nav-button:hover:not(:disabled) {
  background: #4b5563;
}

.nav-button:disabled {
  background: #d1d5db;
  cursor: not-allowed;
}

.submit-button {
  background: #0097b2;
  color: #ffffff;
}

.submit-button:hover:not(:disabled) {
  background: #007a8e;
}

.finish-button {
  background: #10b981;
  color: #ffffff;
}

.finish-button:hover {
  background: #059669;
}

@media (max-width: 768px) {
  .exam-modal {
    margin: 0;
    max-height: 100vh;
    border-radius: 0;
  }
  
  .navigation-buttons {
    flex-direction: column;
  }
  
  .mode-option {
    padding: 0.5rem 1rem;
  }
}
</style>