<template>
  <div class="exam-results-screen">
    <div class="results-container">
      <!-- Header Section -->
      <div class="results-header">
        <div class="completion-badge">
          <div class="badge-icon">✓</div>
          <h1>Exam Completed!</h1>
          <p class="completion-message">Congratulations! You have successfully completed the scenario.</p>
        </div>
        
        <!-- Overall Score -->
        <div class="overall-score">
          <div class="score-circle" :class="{ passed: overallPassed }">
            <div class="score-percentage">{{ Math.round(overallScore) }}%</div>
            <div class="score-label">Overall Score</div>
          </div>
          <div class="score-details">
            <div class="score-stat">
              <span class="stat-value">{{ correctAnswers }}</span>
              <span class="stat-label">Correct</span>
            </div>
            <div class="score-stat">
              <span class="stat-value">{{ totalQuestions }}</span>
              <span class="stat-label">Total</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Scenario Info -->
      <div class="scenario-summary">
        <h2>{{ scenarioTitle }}</h2>
        <div class="scenario-meta">
          <span class="meta-item">
            <strong>Duration:</strong> {{ formatDuration(totalDuration) }}
          </span>
          <span class="meta-item">
            <strong>Completed:</strong> {{ formatDate(completedAt) }}
          </span>
        </div>
      </div>

      <!-- Questions Review -->
      <div class="questions-review">
        <h3>Answer Review</h3>
        <div class="questions-list">
          <div 
            v-for="(result, index) in questionResults" 
            :key="index"
            class="question-item"
            :class="{ correct: result.correct, incorrect: !result.correct }"
          >
            <div class="question-header">
              <div class="question-number">Q{{ index + 1 }}</div>
              <div class="question-status">
                <span class="status-text">{{ result.correct ? 'Correct' : 'Incorrect' }}</span>
              </div>
            </div>
            
            <div class="question-content">
              <div class="question-text">{{ result.question }}</div>
              
              <div class="answer-section">
                <div class="user-answer">
                  <strong>Your Answer:</strong>
                  <p>{{ result.userAnswer }}</p>
                </div>
                
                <div v-if="!result.correct && result.correctAnswer" class="correct-answer">
                  <strong>Correct Answer:</strong>
                  <p>{{ result.correctAnswer }}</p>
                </div>
                
                <div v-if="result.feedback" class="answer-feedback">
                  <strong>Feedback:</strong>
                  <p>{{ result.feedback }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="action-buttons">
        <button @click="goHome" class="action-button primary">
          Return to Home
        </button>
        <button @click="retakeExam" class="action-button secondary">
          Retake Exam
        </button>
        <button @click="downloadResults" class="action-button secondary">
          Download Results
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Reactive data
const scenarioTitle = ref('')
const totalQuestions = ref(0)
const correctAnswers = ref(0)
const totalDuration = ref(0)
const completedAt = ref(new Date())
const questionResults = ref<any[]>([])

// Computed properties
const overallScore = computed(() => {
  if (totalQuestions.value === 0) return 0
  return (correctAnswers.value / totalQuestions.value) * 100
})

const overallPassed = computed(() => {
  return overallScore.value >= 60 // 60% passing threshold
})

onMounted(() => {
  // Load exam results from localStorage or route params
  loadExamResults()
})

const loadExamResults = () => {
  // Try to load from localStorage first
  const savedResults = localStorage.getItem('currentExamResults')
  
  if (savedResults) {
    const results = JSON.parse(savedResults)
    scenarioTitle.value = results.scenarioTitle || 'Unknown Scenario'
    totalQuestions.value = results.totalQuestions || 0
    correctAnswers.value = results.correctAnswers || 0
    totalDuration.value = results.totalDuration || 0
    completedAt.value = new Date(results.completedAt || Date.now())
    questionResults.value = results.questionResults || []
  } else {
    // Fallback to demo data if no results found
    setupDemoResults()
  }
}

const setupDemoResults = () => {
  scenarioTitle.value = 'Demo Scenario'
  totalQuestions.value = 3
  correctAnswers.value = 2
  totalDuration.value = 180 // 3 minutes
  completedAt.value = new Date()
  
  questionResults.value = [
    {
      question: 'What is the primary purpose of effective communication?',
      userAnswer: 'To share information clearly and efficiently between people.',
      correctAnswer: 'To share information clearly and efficiently between people.',
      correct: true,
      feedback: 'Excellent! You understand the core purpose of communication.'
    },
    {
      question: 'Which of the following is NOT a barrier to effective communication?',
      userAnswer: 'Using simple language',
      correctAnswer: 'Using simple language',
      correct: true,
      feedback: 'Correct! Simple language actually helps communication.'
    },
    {
      question: 'What percentage of communication is non-verbal?',
      userAnswer: '50%',
      correctAnswer: 'Approximately 55-65%',
      correct: false,
      feedback: 'Not quite. Research suggests that 55-65% of communication is non-verbal, including body language and tone.'
    }
  ]
}

const formatDuration = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}m ${remainingSeconds}s`
}

const formatDate = (date: Date): string => {
  return date.toLocaleString()
}

const goHome = () => {
  // Clear exam data
  localStorage.removeItem('currentExamResults')
  localStorage.removeItem('currentScenarioCode')
  localStorage.removeItem('currentExamId')
  
  router.push('/')
}

const retakeExam = () => {
  // Keep scenario code but clear results
  localStorage.removeItem('currentExamResults')
  
  router.push('/introduction')
}

const downloadResults = () => {
  // Create and download a simple text file with results
  const resultsText = `
IMAGIO Exam Results
===================

Scenario: ${scenarioTitle.value}
Overall Score: ${Math.round(overallScore.value)}%
Questions Correct: ${correctAnswers.value}/${totalQuestions.value}
Duration: ${formatDuration(totalDuration.value)}
Completed: ${formatDate(completedAt.value)}

Question Details:
${questionResults.value.map((result, index) => `
Q${index + 1}: ${result.question}
Your Answer: ${result.userAnswer}
${result.correct ? 'CORRECT' : 'INCORRECT'}
${!result.correct && result.correctAnswer ? `Correct Answer: ${result.correctAnswer}` : ''}
${result.feedback ? `Feedback: ${result.feedback}` : ''}
`).join('\n')}
  `.trim()

  const blob = new Blob([resultsText], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `imagio-results-${Date.now()}.txt`
  a.click()
  URL.revokeObjectURL(url)
}
</script>

<style scoped>
.exam-results-screen {
  min-height: calc(100vh - 64px);
  width: 100vw;
  background-color: #ffffff;
  padding: 2rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  overflow-x: hidden;
}

.results-container {
  max-width: 900px;
  margin: 0 auto;
}

.results-header {
  background: #ffffff;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  text-align: center;
}

.completion-badge {
  margin-bottom: 2rem;
}

.badge-icon {
  width: 80px;
  height: 80px;
  background: #0097b2;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: white;
  margin: 0 auto 1rem auto;
  font-weight: bold;
}

.completion-badge h1 {
  color: #1f2937;
  margin-bottom: 0.5rem;
  font-size: 2rem;
}

.completion-message {
  color: #6b7280;
  font-size: 1.125rem;
  margin: 0;
}

.overall-score {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
}

.score-circle {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: #ef4444;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
}

.score-circle.passed {
  background: #0097b2;
}

.score-percentage {
  font-size: 1.75rem;
  font-weight: bold;
  line-height: 1;
}

.score-label {
  font-size: 0.875rem;
  opacity: 0.9;
}

.score-details {
  display: flex;
  gap: 1.5rem;
}

.score-stat {
  text-align: center;
}

.stat-value {
  display: block;
  font-size: 1.5rem;
  font-weight: bold;
  color: #1f2937;
}

.stat-label {
  display: block;
  font-size: 0.875rem;
  color: #6b7280;
  margin-top: 0.25rem;
}

.scenario-summary {
  background: #ffffff;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;
}

.scenario-summary h2 {
  color: #1f2937;
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.scenario-meta {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
}

.meta-item {
  color: #6b7280;
  font-size: 0.875rem;
}

.questions-review {
  background: #ffffff;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;
}

.questions-review h3 {
  color: #1f2937;
  margin-bottom: 1.5rem;
  font-size: 1.25rem;
}

.question-item {
  border: 2px solid #f3f4f6;
  border-radius: 8px;
  margin-bottom: 1rem;
  overflow: hidden;
}

.question-item.correct {
  border-color: #0097b2;
  background: #f0f9ff;
}

.question-item.incorrect {
  border-color: #ef4444;
  background: #fef2f2;
}

.question-header {
  padding: 1rem;
  background: #f8fafc;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e5e7eb;
}

.question-item.correct .question-header {
  background: #f0f9ff;
}

.question-item.incorrect .question-header {
  background: #fef2f2;
}

.question-number {
  font-weight: bold;
  color: #1f2937;
}

.question-status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.status-icon {
  font-weight: bold;
}

.question-item.correct .status-icon {
  color: #0097b2;
}

.question-item.incorrect .status-icon {
  color: #ef4444;
}

.status-text {
  font-weight: 500;
}

.question-item.correct .status-text {
  color: #0369a1;
}

.question-item.incorrect .status-text {
  color: #991b1b;
}

.question-content {
  padding: 1rem;
}

.question-text {
  font-weight: 500;
  color: #1f2937;
  margin-bottom: 1rem;
}

.answer-section > div {
  margin-bottom: 0.75rem;
}

.answer-section > div:last-child {
  margin-bottom: 0;
}

.user-answer, .correct-answer, .answer-feedback {
  padding: 0.75rem;
  border-radius: 6px;
  border-left: 4px solid;
}

.user-answer {
  background: #f8fafc;
  border-color: #6b7280;
}

.correct-answer {
  background: #f0f9ff;
  border-color: #0097b2;
}

.answer-feedback {
  background: #eff6ff;
  border-color: #3b82f6;
}

.user-answer p, .correct-answer p, .answer-feedback p {
  margin: 0.5rem 0 0 0;
  color: #374151;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.action-button {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.action-button.primary {
  background: #0097b2;
  color: white;
}

.action-button.primary:hover {
  background: #007a8e;
  transform: translateY(-1px);
}

.action-button.secondary {
  background: #f3f4f6;
  color: #374151;
  border: 1px solid #d1d5db;
}

.action-button.secondary:hover {
  background: #e5e7eb;
  transform: translateY(-1px);
}

@media (max-width: 768px) {
  .exam-results-screen {
    min-height: calc(100vh - 56px);
    padding: 1rem;
  }
  
  .overall-score {
    flex-direction: column;
    gap: 1rem;
  }
  
  .scenario-meta {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .question-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .action-buttons {
    flex-direction: column;
  }
}
</style>