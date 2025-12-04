<template>
  <div class="results-screen">
    <div class="results-content">
      <h1 class="results-title">{{ t('resultsPortal', globalTranslations) }}</h1>
      
      <!-- Code Input Section - only show if no direct exam results -->
      <div v-if="!selectedResult && !hasDirectExamAccess" class="code-input-section">
        <CodeInput
          :gameCode="gameCode"
          :loadingError="loadingError"
          @loadResults="loadResults"
          @updateCode="gameCode = $event"
        />
      </div>
      
      <!-- Results Display Section -->
      <div v-else class="results-display">
        <!-- Header with back button -->
        <ResultsHeader
          v-if="selectedResult"
          :selectedResult="selectedResult"
          @goBack="goBack"
        />
        
        <!-- Results Content -->
        <div class="results-content-area">
          <!-- Exam Results Section -->
          <ExamResults
            v-if="selectedResult.answers && selectedResult.answers.length > 0"
            :results="selectedResult"
          />
          
          <!-- Audio Recordings Section (legacy) -->
          <AudioRecordings
            v-else
            :recordings="selectedResult.recordings"
            :currentPlaying="currentPlaying"
            :getProgressPercent="getProgressPercent"
            :getCurrentTime="getCurrentTime"
            @togglePlayback="togglePlayback"
            @toggleTranscriptEdit="toggleTranscriptEdit"
            @updateTranscript="updateTranscript"
            @setRating="setRating"
          />
          
          <!-- Export Section -->
          <ExportSection
            @exportToPDF="exportToPDF"
            @exportToCSV="exportToCSV"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useLanguage, globalTranslations } from '~/composables/useLanguage'

// Components
import CodeInput from '~/components/results/CodeInput.vue'
import ResultsHeader from '~/components/results/ResultsHeader.vue'
import ExamResults from '~/components/results/ExamResults.vue'
import AudioRecordings from '~/components/results/AudioRecordings.vue'
import ExportSection from '~/components/results/ExportSection.vue'

const { t } = useLanguage()

// State
const gameCode = ref('')
const selectedResult = ref<any>(null)
const loadingError = ref('')
const currentPlaying = ref(-1)
const hasDirectExamAccess = ref(false)

// Check if we're coming directly from an exam completion
onMounted(() => {
  if (typeof window !== 'undefined') {
    const scenarioCode = localStorage.getItem('currentScenarioCode')
    if (scenarioCode) {
      hasDirectExamAccess.value = true
      loadDirectExamResults(scenarioCode)
    }
  }
})


// Methods
const loadDirectExamResults = (scenarioCode: string) => {
  // Mock exam results loading
  selectedResult.value = {
    code: scenarioCode,
    scenario: 'Mock Exam Results',
    examTitle: 'Mock Exam',
    overallScore: 85,
    totalQuestions: 3,
    passed: true,
    answers: []
  }
}

const loadResults = () => {
  loadingError.value = ''
  // In real implementation, this would load results from an API
  selectedResult.value = { code: gameCode.value, scenario: 'Mock Results' }
}

const goBack = () => {
  selectedResult.value = null
  gameCode.value = ''
  loadingError.value = ''
  stopAllAudio()
}

// Audio methods (simplified)
const togglePlayback = (index: number) => {
  currentPlaying.value = currentPlaying.value === index ? -1 : index
}

const stopAllAudio = () => {
  currentPlaying.value = -1
}


const toggleTranscriptEdit = (index: number) => {
  console.log('Toggle transcript edit:', index)
}
const updateTranscript = (index: number, value: string) => {
  console.log('Update transcript:', index, value)
}
const setRating = (index: number, rating: number) => {
  console.log('Set rating:', index, rating)
}

const getProgressPercent = (index: number) => {
  return 0 // Mock implementation
}

const getCurrentTime = (index: number) => {
  return 0 // Mock implementation
}

// Export methods
const exportToPDF = () => {
  console.log('PDF export functionality would be implemented here')
}

const exportToCSV = () => {
  console.log('CSV export functionality would be implemented here')
}

// Cleanup
onUnmounted(() => {
  stopAllAudio()
})
</script>

<style scoped>
.results-screen {
  min-height: calc(100vh - 64px);
  padding: 2rem;
  background-color: #f8fafc;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.results-content {
  max-width: 1200px;
  margin: 0 auto;
}

.results-title {
  color: #1f2937;
  font-size: 2rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 3rem;
}

.results-display {
  background: #ffffff;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.results-content-area {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.code-input-section {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
}

@media (max-width: 768px) {
  .results-screen {
    padding: 1rem;
  }
  
  .results-title {
    font-size: 1.5rem;
  }
  
  .results-display {
    padding: 1rem;
  }
}
</style>