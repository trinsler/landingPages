<template>
  <div class="exams-screen">
    <!-- Access Denied -->
    <AccessControl v-if="!hasValidAccess" @returnHome="router.push('/')" />
    
    <div v-else class="exams-content">
      <!-- Header Component -->
      <ExamsHeader
        :directExamMode="directExamMode"
        :directExam="directExam"
        :scenarioCode="scenarioCode"
        :currentExam="currentExam"
      />
      
      <!-- Regular Dashboard Mode -->
      <div v-if="!directExamMode">
        <!-- Progress Overview -->
        <ProgressOverview :statistics="statistics" />

        <!-- Available Exams -->
        <ExamsGrid
          :availableExams="availableExams"
          :completedLevels="completedLevels"
          :isLevelUnlocked="isLevelUnlocked"
          @startExam="startExam"
          @viewResults="viewResults"
        />

        <!-- Completed Exams -->
        <CompletedExams
          v-if="completedExams.length > 0"
          :completedExams="completedExams"
          @viewResults="viewResults"
        />
      </div>
    </div>

    <!-- Exam Modal -->
    <ExamModal
      v-if="currentExam"
      :exam="currentExam"
      :questions="selectedQuestions"
      :currentQuestionIndex="currentQuestionIndex"
      :answerMode="answerMode"
      :currentAnswer="currentAnswer"
      :isRecording="isRecording"
      :transcript="transcript"
      :currentQuestionAnalysis="currentQuestionAnalysis"
      @close="closeExam"
      @switchMode="switchMode"
      @updateAnswer="currentAnswer = $event"
      @toggleRecording="toggleRecording"
      @submitAnswer="submitCurrentAnswer"
      @nextQuestion="nextQuestion"
      @previousQuestion="previousQuestion"
      @finishExam="finishExam"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useExamStore, type Exam } from '~/composables/useExamStore'
import { useClaudeAI } from '~/composables/useClaudeAI'

// Components
import AccessControl from '~/components/exams/AccessControl.vue'
import ExamsHeader from '~/components/exams/ExamsHeader.vue'
import ProgressOverview from '~/components/exams/ProgressOverview.vue'
import ExamsGrid from '~/components/exams/ExamsGrid.vue'
import CompletedExams from '~/components/exams/CompletedExams.vue'
import ExamModal from '~/components/exams/ExamModal.vue'

const router = useRouter()
const examStore = useExamStore()
const claudeAI = useClaudeAI()

// State
const currentExam = ref<Exam | null>(null)
const currentQuestionIndex = ref(0)
const selectedQuestions = ref<any[]>([])
const currentAnswer = ref('')
const currentQuestionAnalysis = ref<any>(null)
const answerMode = ref<'written' | 'oral'>('written')

// Speech recognition state
const isRecording = ref(false)
const transcript = ref('')

// Access control
const scenarioCode = ref('')
const hasValidAccess = ref(false)
const directExamMode = ref(false)
const directExam = ref<Exam | null>(null)

// Computed properties
const availableExams = computed(() => examStore.availableExams.value)
const completedExams = computed(() => examStore.completedExams.value)
const completedLevels = computed(() => examStore.userProgress.value.completedLevels)
const statistics = computed(() => examStore.getExamStatistics())

// Methods
const isLevelUnlocked = (level: number) => examStore.isLevelUnlocked(level)

const startExam = (exam: Exam) => {
  localStorage.setItem('currentExamData', JSON.stringify({
    id: exam.id,
    title: exam.title,
    questions: exam.questions.filter(q => q.selected),
    timeLimit: exam.timeLimit || 1800
  }))
  router.push('/exam-taking')
}

const closeExam = () => {
  if (isRecording.value) {
    stopRecording()
  }
  
  currentExam.value = null
  currentQuestionIndex.value = 0
  selectedQuestions.value = []
  currentAnswer.value = ''
  currentQuestionAnalysis.value = null
  transcript.value = ''
}

const switchMode = (mode: 'written' | 'oral') => {
  if (mode === 'oral') {
    initializeSpeechRecognition()
  } else {
    stopRecording()
  }
  answerMode.value = mode
  currentAnswer.value = ''
  transcript.value = ''
}

const submitCurrentAnswer = async () => {
  if (!currentAnswer.value.trim() || !selectedQuestions.value[currentQuestionIndex.value]) {
    return
  }
  
  const question = selectedQuestions.value[currentQuestionIndex.value]
  
  try {
    const analysis = await claudeAI.analyzeAnswer(currentAnswer.value, question.keywords)
    currentQuestionAnalysis.value = analysis
  } catch (error) {
    console.error('Error analyzing answer:', error)
  }
}

const nextQuestion = () => {
  if (currentQuestionIndex.value < selectedQuestions.value.length - 1) {
    currentQuestionIndex.value++
    currentAnswer.value = ''
    currentQuestionAnalysis.value = null
    transcript.value = ''
    
    if (answerMode.value === 'oral') {
      initializeSpeechRecognition()
    }
  }
}

const previousQuestion = () => {
  if (currentQuestionIndex.value > 0) {
    currentQuestionIndex.value--
    currentAnswer.value = ''
    currentQuestionAnalysis.value = null
    transcript.value = ''
    
    if (answerMode.value === 'oral') {
      initializeSpeechRecognition()
    }
  }
}

const finishExam = () => {
  // Simple exam finish - redirect to results
  closeExam()
  router.push('/exam-results')
}

const viewResults = (exam: Exam) => {
  router.push(`/exam-results/${exam.id}`)
}

const toggleRecording = () => {
  if (isRecording.value) {
    stopRecording()
  } else {
    startRecording()
  }
}

// Speech Recognition (simplified)
const initializeSpeechRecognition = () => {
  // Initialize speech recognition
  console.log('Speech recognition initialized')
}

const startRecording = () => {
  isRecording.value = true
  console.log('Recording started')
}

const stopRecording = () => {
  isRecording.value = false
  console.log('Recording stopped')
}

const checkAccess = () => {
  if (typeof window !== 'undefined') {
    const storedCode = localStorage.getItem('currentScenarioCode')
    
    if (storedCode && storedCode.trim().length >= 3) {
      scenarioCode.value = storedCode
      hasValidAccess.value = true
    } else {
      router.push('/')
    }
  }
}

// Lifecycle
onMounted(() => {
  checkAccess()
  initializeSpeechRecognition()
})

onUnmounted(() => {
  if (isRecording.value) {
    stopRecording()
  }
})
</script>

<style scoped>
.exams-screen {
  min-height: calc(100vh - 64px);
  padding: 2rem;
  background-color: #f8fafc;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.exams-content {
  max-width: 1200px;
  margin: 0 auto;
}
</style>