<template>
  <div class="questions-pane">
    <!-- Question content without duplicate header -->
    
    <!-- Exam Management View -->
    <div v-if="selectedExam" class="exam-management-view">
      <div class="exam-placeholder">
        <h3>Exam functionality temporarily unavailable</h3>
        <p>Please select a scenario instead.</p>
      </div>
    </div>
    
    <!-- Enhanced Questions View -->
    <div v-else-if="selectedScenario" class="questions-list">
      <!-- Add Question Button -->
      <div class="add-question-section">
        <button @click="addNewQuestion" class="add-question-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          {{ t('addQuestion', globalTranslations) }}
        </button>
      </div>

      <div class="questions-container">
        <div 
          v-for="(question, index) in selectedScenario.questions"
          :key="question.id"
          class="question-item"
          :class="{ expanded: question.expanded, editing: question.editing }"
        >
          <!-- Question Header -->
          <div class="question-header" @click="!question.editing && toggleQuestion(question)">
            <div class="question-number">{{ index + 1 }}</div>
            <div class="question-title">
              <div v-if="!question.editing" class="question-display-text">
                {{ question.text || `${t('question', globalTranslations)} ${index + 1}` }}
              </div>
              <div v-if="!question.editing && question.perfectAnswer" class="perfect-answer-display">
                <span class="answer-label">{{ t('perfectAnswer', globalTranslations) }}:</span>
                <span class="answer-text">{{ question.perfectAnswer }}</span>
              </div>
              <input 
                v-else
                v-model="question.text"
                @click.stop
                @blur="stopEditing(question)"
                @keyup.enter.stop="stopEditing(question)"
                @keyup.esc.stop="question.editing = false"
                class="question-edit-input"
                ref="questionEditInput"
                :placeholder="t('enterQuestionText', globalTranslations)"
              />
              <textarea 
                v-if="question.editing"
                v-model="question.perfectAnswer"
                @click.stop
                @blur="stopEditing(question)"
                class="perfect-answer-input"
                :placeholder="t('enterPerfectAnswer', globalTranslations)"
                rows="3"
              ></textarea>
            </div>
            <div class="question-header-actions">
              <button @click.stop="toggleEdit(question)" class="action-btn edit-btn">
                {{ question.editing ? t('save', globalTranslations) : t('edit', globalTranslations) }}
              </button>
              <button @click.stop="deleteQuestion(question.id)" class="action-btn delete-btn">
                {{ t('delete', globalTranslations) }}
              </button>
              <svg 
                class="expand-icon" 
                :class="{ expanded: question.expanded }"
                width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
          </div>

          <!-- Expanded Content -->
          <div v-if="question.expanded" class="question-expanded-content">
            <div class="keywords-section">
              <div class="keywords-header">
                <h4>{{ t('keywords', globalTranslations) }}</h4>
                <button 
                  @click="generateKeywordsForQuestion(question)"
                  :disabled="question.generatingKeywords"
                  class="generate-keywords-btn"
                >
                  {{ question.generatingKeywords ? t('generating', globalTranslations) : t('generateKeywords', globalTranslations) }}
                </button>
              </div>
              
              <div v-if="question.generatedKeywords && question.generatedKeywords.length > 0" class="generated-keywords">
                <p class="keywords-label">{{ t('generatedKeywords', globalTranslations) }} ({{ question.generatedKeywords.length }}):</p>
                <div class="keywords-grid">
                  <label 
                    v-for="(keyword, keywordIndex) in question.generatedKeywords" 
                    :key="keywordIndex"
                    class="keyword-checkbox"
                  >
                    <input 
                      type="checkbox"
                      :checked="question.selectedKeywords && question.selectedKeywords.includes(keyword)"
                      @change="toggleKeywordSelection(question, keyword)"
                    />
                    <span class="keyword-text">{{ keyword }}</span>
                  </label>
                </div>
                <div class="keywords-actions">
                  <button 
                    @click="saveSelectedKeywords(question)"
                    :disabled="!question.selectedKeywords || question.selectedKeywords.length === 0"
                    class="save-keywords-btn"
                  >
                    {{ t('saveKeywords', globalTranslations) }} ({{ question.selectedKeywords ? question.selectedKeywords.length : 0 }})
                  </button>
                </div>
              </div>

              <div v-if="question.keywords && question.keywords.length > 0" class="saved-keywords">
                <p class="keywords-label">{{ t('savedKeywords', globalTranslations) }}:</p>
                <div class="keywords-list">
                  <span 
                    v-for="(keyword, keywordIndex) in question.keywords" 
                    :key="keywordIndex"
                    class="keyword-tag"
                  >
                    {{ keyword }}
                    <button @click="removeKeyword(question, keywordIndex)" class="remove-keyword">×</button>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div v-else class="no-scenario-selected">
      <p>{{ t('selectScenarioToManage', globalTranslations) }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, watch } from 'vue'
import { useLanguage, globalTranslations } from '~/composables/useLanguage'

const { t } = useLanguage()

defineEmits(['editExam', 'goBack', 'finalizeExam'])

const props = defineProps<{
  selectedScenario: any
  selectedExam: any
}>()

const questionEditInput = ref(null)

// Initialize questions with additional properties when selectedScenario changes
const initializeQuestions = (scenario: any) => {
  if (!scenario || !scenario.questions) return
  
  scenario.questions.forEach((question: any) => {
    if (!question.expanded) question.expanded = false
    if (!question.editing) question.editing = false
    if (!question.keywords) question.keywords = []
    if (!question.generatedKeywords) question.generatedKeywords = []
    if (!question.selectedKeywords) question.selectedKeywords = []
    if (!question.generatingKeywords) question.generatingKeywords = false
    if (!question.perfectAnswer) question.perfectAnswer = ''
  })
}

// Add new question and save to storage
const addNewQuestion = () => {
  if (!props.selectedScenario || !props.selectedScenario.questions) return
  
  const newQuestion = {
    id: Date.now().toString(),
    text: '',
    perfectAnswer: '',
    expanded: true,
    editing: true,
    keywords: [],
    generatedKeywords: [],
    selectedKeywords: [],
    generatingKeywords: false,
    duration: 60,
    type: 'text'
  }
  
  props.selectedScenario.questions.push(newQuestion)
  
  // Save to storage after adding new question
  saveQuestionsToStorage()
  
  // Focus on the input field
  nextTick(() => {
    const inputs = questionEditInput.value
    if (inputs && inputs[inputs.length - 1]) {
      inputs[inputs.length - 1].focus()
    }
  })
}

// Toggle question expansion (only one question can be expanded at a time)
const toggleQuestion = (question: any) => {
  if (!question.editing && props.selectedScenario && props.selectedScenario.questions) {
    // Close all other questions first
    props.selectedScenario.questions.forEach((q: any) => {
      if (q.id !== question.id) {
        q.expanded = false
      }
    })
    // Toggle current question
    question.expanded = !question.expanded
  }
}

// Toggle edit mode (instant editing)
const toggleEdit = (question: any) => {
  if (question.editing) {
    stopEditing(question)
  } else {
    // Close all other questions for better UX
    if (props.selectedScenario && props.selectedScenario.questions) {
      props.selectedScenario.questions.forEach((q: any) => {
        if (q.id !== question.id) {
          q.expanded = false
          q.editing = false
        }
      })
    }
    
    // Open and edit current question
    question.editing = true
    question.expanded = true
    
    // Focus on input field immediately
    nextTick(() => {
      const inputs = questionEditInput.value
      if (inputs && inputs.length > 0) {
        // Find the input for this specific question
        const inputIndex = Array.from(inputs).findIndex((input: any) => 
          input.closest('.question-item')?.querySelector('.question-display-text')?.textContent.includes(question.text.substring(0, 20))
        )
        if (inputIndex >= 0) {
          inputs[inputIndex].focus()
          inputs[inputIndex].select()
        } else {
          // Fallback: focus last input
          inputs[inputs.length - 1]?.focus()
        }
      }
    })
  }
}

// Stop editing and save to storage
const stopEditing = (question: any) => {
  question.editing = false
  if (!question.text.trim()) {
    question.text = `${t('question', globalTranslations)} ${props.selectedScenario.questions.indexOf(question) + 1}`
  }
  // Save to storage when editing stops
  saveQuestionsToStorage()
}

// Generate keywords for question (max 10) - from perfect answer
const generateKeywordsForQuestion = async (question: any) => {
  const textToAnalyze = question.perfectAnswer || question.text
  if (!textToAnalyze.trim()) return
  
  question.generatingKeywords = true
  
  try {
    // Mock keyword generation from perfect answer - replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Extract words from perfect answer (mock implementation)
    const words = textToAnalyze.toLowerCase()
      .replace(/[.,!?;:]/g, '')
      .split(/\s+/)
      .filter((word: string) => word.length > 3)
      .filter((word: string, index: number, self: string[]) => self.indexOf(word) === index)
    
    // Add some relevant educational keywords
    const educationalKeywords = [
      'wichtig', 'verstehen', 'lernen', 'anwenden', 'erkennen',
      'analysieren', 'bewerten', 'kreativ', 'problemlösen', 'kommunikation'
    ]
    
    const allKeywords = [...words.slice(0, 5), ...educationalKeywords.slice(0, 5)]
    
    // Select up to 10 keywords
    question.generatedKeywords = allKeywords
      .sort(() => Math.random() - 0.5)
      .slice(0, 10)
    
    // Reset selected keywords
    question.selectedKeywords = [...question.keywords]
    
  } catch (error) {
    console.error('Error generating keywords:', error)
  } finally {
    question.generatingKeywords = false
  }
}

// Toggle keyword selection
const toggleKeywordSelection = (question: any, keyword: string) => {
  if (!question.selectedKeywords) {
    question.selectedKeywords = []
  }
  
  const index = question.selectedKeywords.indexOf(keyword)
  if (index > -1) {
    question.selectedKeywords.splice(index, 1)
  } else {
    question.selectedKeywords.push(keyword)
  }
}

// Save selected keywords with persistence
const saveSelectedKeywords = (question: any) => {
  if (question.selectedKeywords && question.selectedKeywords.length > 0) {
    question.keywords = [...question.selectedKeywords]
    question.generatedKeywords = []
    question.selectedKeywords = []
    
    // Persist to localStorage
    saveQuestionsToStorage()
  }
}

// Save questions to localStorage for persistence
const saveQuestionsToStorage = () => {
  if (typeof window !== 'undefined' && props.selectedScenario) {
    const dataToSave = {
      scenarioId: props.selectedScenario.id,
      questions: props.selectedScenario.questions
    }
    localStorage.setItem('questions_' + props.selectedScenario.id, JSON.stringify(dataToSave))
  }
}

// Load questions from localStorage
const loadQuestionsFromStorage = () => {
  if (typeof window !== 'undefined' && props.selectedScenario) {
    const saved = localStorage.getItem('questions_' + props.selectedScenario.id)
    if (saved) {
      try {
        const data = JSON.parse(saved)
        if (data.questions && Array.isArray(data.questions)) {
          // Restore the questions while preserving the scenario reference
          data.questions.forEach((savedQuestion: any, index: number) => {
            if (props.selectedScenario.questions[index]) {
              Object.assign(props.selectedScenario.questions[index], savedQuestion)
            }
          })
        }
      } catch (error) {
        console.error('Error loading questions from storage:', error)
      }
    }
  }
}

// Load from storage when scenario changes
watch(() => props.selectedScenario, (newScenario) => {
  if (newScenario) {
    // Initialize questions with missing properties
    if (newScenario.questions) {
      newScenario.questions.forEach((question: any) => {
        if (!question.expanded) question.expanded = false
        if (!question.editing) question.editing = false
        if (!question.keywords) question.keywords = []
        if (!question.generatedKeywords) question.generatedKeywords = []
        if (!question.selectedKeywords) question.selectedKeywords = []
        if (!question.generatingKeywords) question.generatingKeywords = false
        if (!question.perfectAnswer) question.perfectAnswer = ''
      })
      
      // Load from storage after initialization
      setTimeout(() => loadQuestionsFromStorage(), 100)
    }
  }
}, { immediate: true })

// Remove keyword
// Remove keyword and save to storage
const removeKeyword = (question: any, keywordIndex: number) => {
  if (question.keywords && question.keywords[keywordIndex]) {
    question.keywords.splice(keywordIndex, 1)
    // Save to storage after removal
    saveQuestionsToStorage()
  }
}

// Delete question and save to storage
const deleteQuestion = (id: string) => {
  if (props.selectedScenario && props.selectedScenario.questions) {
    const index = props.selectedScenario.questions.findIndex((q: any) => q.id === id)
    if (index > -1) {
      if (confirm('Möchten Sie diese Frage wirklich löschen?')) {
        props.selectedScenario.questions.splice(index, 1)
        // Save to storage after deletion
        saveQuestionsToStorage()
      }
    }
  }
}
</script>

<style scoped>
.questions-pane {
  flex: 1;
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
  padding: 1rem 2rem;
  background-color: #0097b2;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 1.125rem;
}

.create-button:hover {
  background-color: #007a8e;
  transform: translateY(-1px);
}

/* Add Question Section */
.add-question-section {
  margin-bottom: 1.5rem;
}

.add-question-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background-color: #0097b2;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 1.125rem;
}

.add-question-btn:hover {
  background-color: #007a8e;
  transform: translateY(-1px);
}

/* Questions Container */
.questions-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-height: 500px;
  overflow-y: auto;
}

/* Question Items */
.question-item {
  background: #ffffff;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.2s;
}

.question-item.expanded {
  border-color: #0097b2;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.question-item.editing {
  border-color: #0097b2;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* Question Header */
.question-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.5rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.question-header:hover {
  background-color: #f9fafb;
}

.question-number {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 2.5rem;
  height: 2.5rem;
  background-color: #0097b2;
  color: #ffffff;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.875rem;
  flex-shrink: 0;
}

.question-title {
  flex: 1;
  min-width: 0;
}

.question-display-text {
  color: #1f2937;
  font-weight: 500;
  font-size: 1rem;
  line-height: 1.5;
}

.question-edit-input {
  width: 100%;
  padding: 1rem;
  border: 2px solid #0097b2;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  outline: none;
  background: #ffffff;
  color: #000000;
  margin-bottom: 0.75rem;
}

.question-edit-input:focus {
  box-shadow: 0 0 0 3px rgba(0, 151, 178, 0.1);
}

.perfect-answer-input {
  width: 100%;
  padding: 1rem;
  border: 2px solid #0097b2;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  outline: none;
  background: #ffffff;
  color: #000000;
  resize: vertical;
  min-height: 80px;
}

.perfect-answer-input:focus {
  box-shadow: 0 0 0 3px rgba(0, 151, 178, 0.1);
}

.perfect-answer-display {
  margin-top: 0.5rem;
  padding: 0.5rem;
  background-color: #f8fafc;
  border-radius: 6px;
  font-size: 0.875rem;
}

.answer-label {
  color: #6b7280;
  font-weight: 600;
  margin-right: 0.5rem;
}

.answer-text {
  color: #374151;
  font-style: italic;
}

.question-header-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.action-btn {
  padding: 0.375rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  background: #ffffff;
}

.edit-btn {
  color: #0097b2;
  border-color: #0097b2;
}

.edit-btn:hover {
  background-color: #0097b2;
  color: #ffffff;
}

.delete-btn {
  color: #f59e0b;
  border-color: #f59e0b;
}

.delete-btn:hover {
  background-color: #f59e0b;
  color: #ffffff;
}

.expand-icon {
  color: #6b7280;
  transition: transform 0.3s ease;
}

.expand-icon.expanded {
  transform: rotate(180deg);
}

/* Expanded Content */
.question-expanded-content {
  border-top: 1px solid #e5e7eb;
  background-color: #f8fafc;
}

.keywords-section {
  padding: 1.5rem;
}

.keywords-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.keywords-header h4 {
  color: #1f2937;
  font-size: 0.875rem;
  font-weight: 600;
  margin: 0;
}

.generate-keywords-btn {
  padding: 1rem 2rem;
  background-color: #f59e0b;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 1.125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.generate-keywords-btn:hover:not(:disabled) {
  background-color: #d97706;
  transform: translateY(-1px);
}

.generate-keywords-btn:disabled {
  background-color: #9ca3af;
  cursor: not-allowed;
}

/* Generated Keywords */
.generated-keywords {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
}

.keywords-label {
  color: #374151;
  font-size: 0.875rem;
  font-weight: 500;
  margin: 0 0 0.75rem 0;
}

.keywords-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.keyword-checkbox {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.375rem 0.75rem;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.keyword-checkbox:hover {
  background-color: #f3f4f6;
  border-color: #d1d5db;
}

.keyword-checkbox input[type="checkbox"] {
  margin: 0;
}

.keyword-text {
  color: #374151;
  font-size: 0.75rem;
  font-weight: 500;
}

.keywords-actions {
  display: flex;
  justify-content: flex-end;
}

.save-keywords-btn {
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

.save-keywords-btn:hover:not(:disabled) {
  background-color: #007a8e;
  transform: translateY(-1px);
}

.save-keywords-btn:disabled {
  background-color: #d1d5db;
  cursor: not-allowed;
}

/* Saved Keywords */
.saved-keywords {
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 8px;
  padding: 1rem;
}

.keywords-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.keyword-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #dcfce7;
  color: #166534;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
  border: 1px solid #bbf7d0;
}

.remove-keyword {
  background: none;
  border: none;
  color: #dc2626;
  font-size: 0.875rem;
  cursor: pointer;
  padding: 0;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.2s;
}

.remove-keyword:hover {
  background: #fecaca;
}

.no-scenario-selected {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  color: #6b7280;
  font-style: italic;
}

.exam-management-view {
  height: 100%;
  overflow-y: auto;
  padding: 1rem;
}

.exam-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  color: #6b7280;
  text-align: center;
}

.exam-placeholder h3 {
  color: #374151;
  margin-bottom: 0.5rem;
  font-size: 1.125rem;
}

.exam-placeholder p {
  margin: 0;
  font-size: 0.875rem;
}
</style>