<template>
  <div class="exam-screen">
    <!-- Header -->
    <div class="exam-header">
      <div class="exam-progress-bar">
        <div 
          class="progress-fill" 
          :style="{ width: progressPercentage + '%' }"
        ></div>
      </div>
      
      <div class="exam-info">
        <div class="exam-title">{{ examTitle }}</div>
        <div class="question-counter">
          Question {{ currentQuestionIndex + 1 }} of {{ totalQuestions }}
        </div>
        <div class="time-remaining" v-if="timeRemaining">
          {{ formatTime(timeRemaining) }}
        </div>
      </div>
      
      <button @click="exitExam" class="exit-button">
        Exit
      </button>
    </div>

    <!-- Main Content -->
    <div class="exam-content">
      <div class="question-section">
        <!-- Question Display -->
        <div class="question-card">
          <div class="question-number">Q{{ currentQuestionIndex + 1 }}</div>
          
          <div v-if="currentQuestion?.image" class="question-image">
            <img :src="currentQuestion.image" :alt="`Question ${currentQuestionIndex + 1} image`" />
          </div>
          
          <div class="question-text">
            {{ currentQuestion?.text || currentQuestion?.question }}
          </div>
          
          <!-- Multiple Choice Options -->
          <div v-if="currentQuestion?.type === 'multiple-choice'" class="multiple-choice">
            <div 
              v-for="(option, index) in currentQuestion.options"
              :key="index"
              class="choice-option"
              :class="{ selected: selectedChoice === index }"
              @click="selectChoice(index)"
            >
              <div class="choice-letter">{{ String.fromCharCode(65 + index) }}</div>
              <div class="choice-text">{{ option }}</div>
            </div>
          </div>
          
          <!-- Text Answer -->
          <div v-else class="answer-section">
            <!-- Answer Mode Toggle -->
            <div class="answer-mode-toggle">
              <button 
                @click="setAnswerMode('written')"
                class="mode-button"
                :class="{ active: answerMode === 'written' }"
              >
                Written
              </button>
              <button 
                @click="setAnswerMode('oral')"
                class="mode-button"
                :class="{ active: answerMode === 'oral' }"
              >
                Spoken
              </button>
            </div>
            
            <!-- Written Answer -->
            <div v-if="answerMode === 'written'" class="written-answer">
              <textarea 
                v-model="currentAnswer"
                placeholder="Type your answer here..."
                class="answer-textarea"
                rows="6"
              ></textarea>
            </div>
            
            <!-- Oral Answer -->
            <div v-else class="oral-answer">
              <div class="recording-controls">
                <button 
                  @click="toggleRecording"
                  class="record-button"
                  :class="{ recording: isRecording }"
                >
                  {{ isRecording ? 'Stop Recording' : 'Start Recording' }}
                </button>
              </div>
              
              <div v-if="transcript || isRecording" class="transcript-display">
                <div class="transcript-label">
                  {{ isRecording ? 'Recording...' : 'Your Response:' }}
                </div>
                <div class="transcript-text">{{ transcript || currentAnswer }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation -->
        <div class="exam-navigation">
          <button 
            @click="previousQuestion"
            :disabled="currentQuestionIndex === 0"
            class="nav-button prev"
          >
            Previous
          </button>
          
          <div class="nav-center">
            <button 
              v-if="!isAnswered && hasAnswer"
              @click="submitCurrentAnswer"
              class="submit-button"
            >
              Submit Answer
            </button>
            
            <div v-if="isAnswered" class="answer-feedback">
              <div class="feedback-status" :class="{ correct: currentAnalysis?.passed }">
                {{ currentAnalysis?.passed ? 'Correct!' : 'Incorrect' }}
                <span class="score">{{ currentAnalysis?.score || 0 }}/10</span>
              </div>
              
              <div v-if="currentAnalysis?.feedback" class="feedback-text">
                {{ currentAnalysis.feedback }}
              </div>
            </div>
          </div>
          
          <button 
            v-if="currentQuestionIndex < totalQuestions - 1"
            @click="nextQuestion"
            :disabled="!isAnswered"
            class="nav-button next"
          >
            Next
          </button>
          
          <button 
            v-else-if="isAnswered"
            @click="finishExam"
            class="finish-button"
          >
            Finish Exam
          </button>
        </div>
      </div>
    </div>

    <!-- Exit Confirmation Modal -->
    <div v-if="showExitConfirm" class="modal-overlay">
      <div class="modal-content">
        <div class="modal-header">
          <h3>Verlassen bestätigen</h3>
        </div>
        
        <div class="modal-body">
          <p class="warning-text">
            Wenn Sie diese Seite verlassen, wird Ihr Fortschritt gelöscht!
          </p>
          <p class="info-text">
            Ihre bisherigen Antworten gehen verloren und können nicht wiederhergestellt werden.
          </p>
        </div>
        
        <div class="modal-actions">
          <button @click="cancelExit" class="cancel-button">
            Auf Seite bleiben
          </button>
          <button @click="confirmExit" class="confirm-button">
            Trotzdem verlassen
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useExamStore } from '~/composables/useExamStore'

const router = useRouter()
const route = useRoute()
const examStore = useExamStore()

// Reactive state
const examTitle = ref('Demo Exam')
const currentQuestionIndex = ref(0)
const totalQuestions = ref(3)
const showExitConfirm = ref(false)
// Questions will be loaded from the EXACT course created by admin
const questions = ref<any[]>([])

const currentAnswer = ref('')
const selectedChoice = ref<number | null>(null)
const answerMode = ref<'written' | 'oral'>('written')
const isRecording = ref(false)
const transcript = ref('')
const recognition = ref<any>(null)

// Exam state
const examStartTime = ref(Date.now())
const timeLimit = ref(1800) // Default 30 minutes in seconds, will be overridden
const timeRemaining = ref(timeLimit.value)
const timer = ref<any>(null)

const userAnswers = ref<string[]>([])
const questionAnalyses = ref<any[]>([])

// Computed properties
const currentQuestion = computed(() => questions.value[currentQuestionIndex.value])
const progressPercentage = computed(() => ((currentQuestionIndex.value + 1) / totalQuestions.value) * 100)

const hasAnswer = computed(() => {
  if (currentQuestion.value?.type === 'multiple-choice') {
    return selectedChoice.value !== null
  }
  return currentAnswer.value.trim().length > 0 || transcript.value.trim().length > 0
})

const isAnswered = computed(() => {
  return questionAnalyses.value[currentQuestionIndex.value] !== undefined
})

const currentAnalysis = computed(() => {
  return questionAnalyses.value[currentQuestionIndex.value]
})

// Lifecycle
onMounted(async () => {
  await loadExamData() // Wait for course data to load before starting timer
  startTimer()
  initializeSpeechRecognition()
  
  // Add beforeunload event listener to warn about leaving
  window.addEventListener('beforeunload', handleBeforeUnload)
})

onUnmounted(() => {
  stopTimer()
  if (recognition.value) {
    recognition.value.stop()
  }
  
  // Remove beforeunload event listener
  window.removeEventListener('beforeunload', handleBeforeUnload)
})

// Methods
const loadExamData = async () => {
  const savedCode = localStorage.getItem('currentScenarioCode')
  if (!savedCode) {
    console.error('No course code found')
    router.push('/')
    return
  }
  
  console.log(`Loading EXACT exam for course code: ${savedCode}`)
  
  try {
    // Load course from backend API to get correct timing
    const response = await $fetch('/api/courses', {
      method: 'GET'
    })
    
    // Find the course by code
    const course = response.courses.find((c: any) => c.code === savedCode)
    
    if (!course) {
      console.error('Course not found:', savedCode)
      router.push('/')
      return
    }
    
    examTitle.value = course.title
    // Set correct time limit from course settings (convert minutes to seconds)
    timeLimit.value = course.totalTime * 60
    timeRemaining.value = timeLimit.value
    console.log(`Setting exam timer to ${course.totalTime} minutes (${timeLimit.value} seconds)`)
    
    // NOW LOAD THE EXACT QUESTIONS that admin created
    try {
      const examResponse = await $fetch(`/api/exam/${savedCode}`, {
        method: 'GET'
      })
      
      console.log('Loaded EXACT exam questions:', examResponse)
      
      if (examResponse && examResponse.data && examResponse.data.questions && examResponse.data.questions.length > 0) {
        // Use the EXACT questions from admin
        questions.value = examResponse.data.questions.map((q: any) => ({
          type: 'text', // Admin questions are always text-based
          text: q.text,
          answer: q.answer, // Store expected answer for keyword checking
          keywords: Array.isArray(q.keywords) ? q.keywords : JSON.parse(q.keywords || '[]'),
          difficulty: q.difficulty,
          image: null // Admin can't add images yet
        }))
        
        totalQuestions.value = questions.value.length
        console.log(`Loaded ${questions.value.length} EXACT questions from admin:`, questions.value)
      } else {
        // No questions found - this shouldn't happen
        console.error('No questions found for course:', savedCode)
        alert('Fehler: Keine Fragen für diesen Kurs gefunden. Bitte wenden Sie sich an den Administrator.')
        router.push('/')
        return
      }
    } catch (examError) {
      console.error('Error loading exam questions:', examError)
      alert('Fehler beim Laden der Prüfungsfragen. Bitte versuchen Sie es erneut.')
      router.push('/')
      return
    }
  } catch (error) {
    console.error('Error loading course data:', error)
    router.push('/')
    return
  }
  
  // Initialize arrays with correct length
  userAnswers.value = new Array(totalQuestions.value).fill('')
  questionAnalyses.value = new Array(totalQuestions.value).fill(undefined)
}

const startTimer = () => {
  timer.value = setInterval(() => {
    timeRemaining.value--
    if (timeRemaining.value <= 0) {
      finishExam()
    }
  }, 1000)
}

const stopTimer = () => {
  if (timer.value) {
    clearInterval(timer.value)
    timer.value = null
  }
}

const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}

const setAnswerMode = (mode: 'written' | 'oral') => {
  answerMode.value = mode
  if (mode === 'oral') {
    initializeSpeechRecognition()
  } else {
    stopRecording()
  }
}

const initializeSpeechRecognition = () => {
  if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    recognition.value = new SpeechRecognition()
    
    recognition.value.continuous = true
    recognition.value.interimResults = true
    recognition.value.lang = 'en-US'
    
    recognition.value.onresult = (event: any) => {
      let finalTranscript = ''
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript
        }
      }
      if (finalTranscript) {
        transcript.value += finalTranscript
      }
    }
  }
}

const toggleRecording = () => {
  if (isRecording.value) {
    stopRecording()
  } else {
    startRecording()
  }
}

const startRecording = () => {
  if (recognition.value) {
    recognition.value.start()
    isRecording.value = true
  }
}

const stopRecording = () => {
  if (recognition.value && isRecording.value) {
    recognition.value.stop()
    isRecording.value = false
    currentAnswer.value = transcript.value
  }
}

const selectChoice = (index: number) => {
  selectedChoice.value = index
}

const submitCurrentAnswer = async () => {
  let answer = ''
  
  if (currentQuestion.value?.type === 'multiple-choice') {
    answer = currentQuestion.value.options[selectedChoice.value!]
  } else {
    answer = answerMode.value === 'oral' ? transcript.value : currentAnswer.value
  }
  
  // Store answer
  userAnswers.value[currentQuestionIndex.value] = answer
  
  // Simulate analysis (replace with actual AI analysis)
  const analysis = await analyzeAnswer(answer)
  questionAnalyses.value[currentQuestionIndex.value] = analysis
}

const analyzeAnswer = async (answer: string) => {
  const currentQuestion = questions.value[currentQuestionIndex.value]
  
  if (!currentQuestion || !currentQuestion.keywords || currentQuestion.keywords.length === 0) {
    console.error('No keywords defined for this question')
    return {
      passed: false,
      score: 0,
      feedback: 'Fehler: Keine Bewertungskriterien für diese Frage definiert.'
    }
  }
  
  console.log(`Analyzing answer for question ${currentQuestionIndex.value + 1}:`)
  console.log(`Answer: "${answer}"`)
  console.log(`Required Keywords:`, currentQuestion.keywords)
  
  // Check ONLY the admin-defined keywords
  const answerLowerCase = answer.toLowerCase()
  const keywordsFound = currentQuestion.keywords.filter((keyword: string) => 
    answerLowerCase.includes(keyword.toLowerCase())
  )
  
  console.log(`Keywords found in answer:`, keywordsFound)
  
  // Score based on keyword match percentage
  const keywordMatchPercentage = (keywordsFound.length / currentQuestion.keywords.length) * 100
  const minPassingScore = 50 // At least 50% of keywords must be present
  
  const passed = keywordMatchPercentage >= minPassingScore
  const score = Math.round((keywordMatchPercentage / 100) * 10) // Convert to 0-10 scale
  
  let feedback = ''
  if (passed) {
    feedback = `Gut! Gefunden: ${keywordsFound.join(', ')}. ${keywordMatchPercentage.toFixed(0)}% der erwarteten Konzepte abgedeckt.`
  } else {
    const missingKeywords = currentQuestion.keywords.filter((keyword: string) => 
      !answerLowerCase.includes(keyword.toLowerCase())
    )
    feedback = `Unvollständig. Gefunden: ${keywordsFound.join(', ') || 'keine'}. Fehlend: ${missingKeywords.join(', ')}. Nur ${keywordMatchPercentage.toFixed(0)}% abgedeckt.`
  }
  
  console.log(`Analysis result: ${passed ? 'PASSED' : 'FAILED'}, Score: ${score}, Feedback: ${feedback}`)
  
  return {
    passed,
    score,
    feedback
  }
}

const previousQuestion = () => {
  if (currentQuestionIndex.value > 0) {
    saveCurrentState()
    currentQuestionIndex.value--
    loadQuestionState()
  }
}

const nextQuestion = () => {
  if (currentQuestionIndex.value < totalQuestions.value - 1) {
    saveCurrentState()
    currentQuestionIndex.value++
    loadQuestionState()
  }
}

const saveCurrentState = () => {
  // Save current answer state if not submitted yet
  if (!isAnswered.value && hasAnswer.value) {
    if (currentQuestion.value?.type === 'multiple-choice') {
      userAnswers.value[currentQuestionIndex.value] = currentQuestion.value.options[selectedChoice.value!] || ''
    } else {
      userAnswers.value[currentQuestionIndex.value] = answerMode.value === 'oral' ? transcript.value : currentAnswer.value
    }
  }
}

const loadQuestionState = () => {
  // Load saved state for this question
  const savedAnswer = userAnswers.value[currentQuestionIndex.value]
  
  if (currentQuestion.value?.type === 'multiple-choice') {
    selectedChoice.value = currentQuestion.value.options.indexOf(savedAnswer)
    if (selectedChoice.value === -1) selectedChoice.value = null
  } else {
    currentAnswer.value = savedAnswer || ''
    transcript.value = savedAnswer || ''
  }
}

const finishExam = () => {
  stopTimer()
  
  // Prepare results data
  const examResults = {
    scenarioTitle: examTitle.value,
    scenarioCode: localStorage.getItem('currentScenarioCode') || '',
    totalQuestions: totalQuestions.value,
    correctAnswers: questionAnalyses.value.filter(a => a?.passed).length,
    totalDuration: Math.floor((Date.now() - examStartTime.value) / 1000),
    completedAt: new Date().toISOString(),
    questionResults: questions.value.map((question, index) => ({
      question: question.text,
      userAnswer: userAnswers.value[index] || 'No answer provided',
      correct: questionAnalyses.value[index]?.passed || false,
      feedback: questionAnalyses.value[index]?.feedback || '',
      score: questionAnalyses.value[index]?.score || 0
    }))
  }
  
  // Store and redirect
  localStorage.setItem('currentExamResults', JSON.stringify(examResults))
  router.push('/exam-results')
}

const exitExam = () => {
  showExitConfirm.value = true
}

const confirmExit = () => {
  // Remove beforeunload listener before leaving
  window.removeEventListener('beforeunload', handleBeforeUnload)
  
  // Clear all exam data
  localStorage.removeItem('currentExamData')
  localStorage.removeItem('currentScenarioCode')
  localStorage.removeItem('currentExamId')
  
  showExitConfirm.value = false
  router.push('/')
}

const cancelExit = () => {
  showExitConfirm.value = false
}

const handleBeforeUnload = (event: BeforeUnloadEvent) => {
  // Show browser warning when trying to leave/refresh page
  event.preventDefault()
  event.returnValue = 'Wenn Sie diese Seite verlassen, wird Ihr Fortschritt gelöscht!'
  return 'Wenn Sie diese Seite verlassen, wird Ihr Fortschritt gelöscht!'
}
</script>

<style scoped>
.exam-screen {
  min-height: calc(100vh - 64px);
  width: 100vw;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  overflow-x: hidden;
}

/* Header */
.exam-header {
  background: #f8fafc;
  border-bottom: 1px solid #e5e7eb;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 100;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.exam-progress-bar {
  width: 200px;
  height: 6px;
  background: #e2e8f0;
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #0097b2;
  transition: width 0.3s ease;
  border-radius: 3px;
}

.exam-info {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.exam-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
}

.question-counter {
  color: #6b7280;
  font-size: 0.875rem;
  font-weight: 500;
}

.time-remaining {
  padding: 0.5rem 1rem;
  background: #0097b2;
  color: #ffffff;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.875rem;
}

.exit-button {
  padding: 0.5rem 1rem;
  background: #0097b2;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.exit-button:hover {
  background: #007a8e;
}

/* Main Content */
.exam-content {
  flex: 1;
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.question-section {
  width: 100%;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.question-card {
  background: #ffffff;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border: 1px solid #e5e7eb;
}

.question-number {
  display: inline-block;
  padding: 0.5rem 1rem;
  background: #0097b2;
  color: #ffffff;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.875rem;
  margin-bottom: 1.5rem;
}

.question-image {
  margin-bottom: 1.5rem;
  text-align: center;
}

.question-image img {
  max-width: 100%;
  max-height: 300px;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.question-text {
  font-size: 1.25rem;
  line-height: 1.6;
  color: #1f2937;
  font-weight: 500;
  margin-bottom: 2rem;
}

/* Multiple Choice */
.multiple-choice {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.choice-option {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
  background: #f8fafc;
}

.choice-option:hover {
  border-color: #0097b2;
  background: #f0f9ff;
}

.choice-option.selected {
  border-color: #0097b2;
  background: #e0f2fe;
}

.choice-letter {
  width: 2rem;
  height: 2rem;
  background: #e5e7eb;
  color: #374151;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  flex-shrink: 0;
}

.choice-option.selected .choice-letter {
  background: #0097b2;
  color: #ffffff;
}

.choice-text {
  flex: 1;
  color: #374151;
  font-weight: 500;
}

/* Answer Section */
.answer-mode-toggle {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  padding: 0.25rem;
  background: #f1f5f9;
  border-radius: 8px;
}

.mode-button {
  flex: 1;
  padding: 0.75rem 1rem;
  background: transparent;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s;
}

.mode-button.active {
  background: #ffffff;
  color: #0097b2;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.answer-textarea {
  width: 100%;
  min-height: 120px;
  padding: 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  line-height: 1.5;
  resize: vertical;
  font-family: inherit;
  background: #ffffff;
}

.answer-textarea:focus {
  outline: none;
  border-color: #0097b2;
  box-shadow: 0 0 0 3px rgba(0, 151, 178, 0.1);
}

/* Recording Controls */
.recording-controls {
  text-align: center;
  margin-bottom: 1rem;
}

.record-button {
  padding: 1rem 2rem;
  background: #0097b2;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.record-button:hover {
  background: #007a8e;
}

.record-button.recording {
  background: #ef4444;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.transcript-display {
  padding: 1rem;
  background: #f8fafc;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  border-left: 4px solid #0097b2;
}

.transcript-label {
  font-weight: 600;
  color: #0097b2;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
}

.transcript-text {
  color: #374151;
  line-height: 1.5;
  min-height: 2rem;
}

/* Navigation */
.exam-navigation {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.nav-center {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.nav-button, .submit-button, .finish-button {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.nav-button {
  background: #f1f5f9;
  color: #475569;
}

.nav-button:hover:not(:disabled) {
  background: #e2e8f0;
  transform: translateY(-1px);
}

.nav-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.submit-button {
  background: #0097b2;
  color: #ffffff;
  font-size: 1.125rem;
  padding: 1rem 2rem;
}

.submit-button:hover {
  background: #007a8e;
  transform: translateY(-1px);
}

.finish-button {
  background: #0097b2;
  color: #ffffff;
  font-size: 1.125rem;
  padding: 1rem 2rem;
}

.finish-button:hover {
  background: #007a8e;
  transform: translateY(-1px);
}

/* Answer Feedback */
.answer-feedback {
  text-align: center;
  max-width: 500px;
}

.feedback-status {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  margin-bottom: 1rem;
  background: #fee2e2;
  color: #991b1b;
}

.feedback-status.correct {
  background: #dcfce7;
  color: #166534;
}

.feedback-text {
  color: #6b7280;
  font-size: 0.875rem;
  line-height: 1.5;
}

/* Responsive Design */
@media (max-width: 768px) {
  .exam-screen {
    min-height: calc(100vh - 56px);
  }
  
  .exam-header {
    padding: 1rem;
    flex-wrap: wrap;
    gap: 1rem;
  }
  
  .exam-info {
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-start;
  }
  
  .exam-progress-bar {
    width: 150px;
  }
  
  .exam-content {
    padding: 1rem;
  }
  
  .question-card {
    padding: 1.5rem;
  }
  
  .question-text {
    font-size: 1.125rem;
  }
  
  .answer-mode-toggle {
    flex-direction: column;
  }
  
  .exam-navigation {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }
  
  .nav-center {
    order: -1;
  }
}

@media (max-width: 480px) {
  .exam-header {
    padding: 0.75rem;
  }
  
  .question-card {
    padding: 1rem;
  }
  
  .question-text {
    font-size: 1rem;
  }
  
  .choice-option {
    padding: 0.75rem;
  }
  
  .answer-textarea {
    min-height: 100px;
  }
}

/* Exit Confirmation Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal-content {
  background: #ffffff;
  border-radius: 8px;
  max-width: 450px;
  width: 100%;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.modal-header {
  padding: 1.5rem 1.5rem 1rem 1.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.modal-header h3 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
}

.modal-body {
  padding: 1.5rem;
}

.warning-text {
  font-weight: 600;
  color: #ef4444;
  margin-bottom: 1rem;
  font-size: 1.125rem;
}

.info-text {
  color: #6b7280;
  line-height: 1.5;
  margin: 0;
}

.modal-actions {
  padding: 1rem 1.5rem 1.5rem 1.5rem;
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  border-top: 1px solid #e5e7eb;
}

.cancel-button {
  padding: 0.75rem 1.5rem;
  background: #f3f4f6;
  color: #374151;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.cancel-button:hover {
  background: #e5e7eb;
}

.confirm-button {
  padding: 0.75rem 1.5rem;
  background: #0097b2;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.confirm-button:hover {
  background: #007a8e;
}

@media (max-width: 768px) {
  .modal-actions {
    flex-direction: column;
  }
  
  .cancel-button, .confirm-button {
    width: 100%;
  }
}
</style>