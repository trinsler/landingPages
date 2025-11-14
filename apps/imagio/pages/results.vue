<template>
  <div class="results-screen">
    <div class="results-content">
      <h1 class="results-title">{{ t('resultsPortal', globalTranslations) }}</h1>
      
      <!-- Code Input Section -->
      <div v-if="!selectedResult" class="code-input-section">
        <div class="input-container">
          <h2 class="section-title">{{ t('enterGameCode', globalTranslations) }}</h2>
          <p class="section-description">{{ t('enterGameCodeDescription', globalTranslations) }}</p>
          
          <form @submit.prevent="loadResults" class="code-form">
            <div class="form-group">
              <label class="form-label">{{ t('gameCode', globalTranslations) }}</label>
              <input 
                v-model="gameCode"
                type="text"
                class="code-input"
                :placeholder="t('gameCodePlaceholder', globalTranslations)"
                required
                minlength="3"
              >
            </div>
            <button type="submit" class="load-button" :disabled="gameCode.length < 3">
              {{ t('loadResults', globalTranslations) }}
            </button>
          </form>
          
          <div v-if="loadingError" class="error-message">
            {{ loadingError }}
          </div>
        </div>
      </div>
      
      <!-- Results Display Section -->
      <div v-else class="results-display">
        <!-- Header with back button -->
        <div class="results-header">
          <button @click="goBack" class="back-button">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            {{ t('backToCodeInput', globalTranslations) }}
          </button>
          <h2 class="result-title">{{ selectedResult.scenario }} - {{ t('gameCode', globalTranslations) }}: {{ selectedResult.code }}</h2>
        </div>
        
        <!-- Results Content -->
        <div class="results-content-area">
          <!-- Audio Recordings Section -->
          <div class="audio-section">
            <h3 class="section-subtitle">{{ t('audioRecordings', globalTranslations) }}</h3>
            <div class="recordings-list">
              <div 
                v-for="(recording, index) in selectedResult.recordings" 
                :key="index"
                class="recording-item"
              >
                <div class="recording-header">
                  <h4 class="question-title">
                    {{ t('question', globalTranslations) }} {{ index + 1 }}: {{ recording.question }}
                  </h4>
                  <div class="recording-meta">
                    {{ t('duration', globalTranslations) }}: {{ formatDuration(recording.duration) }} | 
                    {{ t('recorded', globalTranslations) }}: {{ formatDate(recording.timestamp) }}
                  </div>
                </div>
                
                <!-- Audio Player -->
                <div class="audio-player">
                  <button 
                    @click="togglePlayback(index)"
                    class="play-button"
                    :class="{ playing: currentPlaying === index }"
                  >
                    <svg v-if="currentPlaying !== index" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                    <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                    </svg>
                    {{ currentPlaying === index ? t('pause', globalTranslations) : t('play', globalTranslations) }}
                  </button>
                  <div class="audio-progress">
                    <div class="progress-bar">
                      <div 
                        class="progress-fill"
                        :style="{ width: getProgressPercent(index) + '%' }"
                      ></div>
                    </div>
                    <span class="time-display">
                      {{ formatTime(getCurrentTime(index)) }} / {{ formatTime(recording.duration) }}
                    </span>
                  </div>
                </div>
                
                <!-- Transcript Editing -->
                <div class="transcript-section">
                  <div class="transcript-header">
                    <h5 class="transcript-title">{{ t('transcript', globalTranslations) }}</h5>
                    <button 
                      @click="toggleTranscriptEdit(index)"
                      class="edit-toggle-button"
                    >
                      {{ recording.editingTranscript ? t('save', globalTranslations) : t('edit', globalTranslations) }}
                    </button>
                  </div>
                  
                  <div v-if="!recording.editingTranscript" class="transcript-display">
                    {{ recording.transcript }}
                  </div>
                  <textarea 
                    v-else
                    v-model="recording.transcript"
                    class="transcript-editor"
                    rows="4"
                  ></textarea>
                </div>
                
                <!-- Rating System -->
                <div class="rating-section">
                  <h5 class="rating-title">{{ t('rating', globalTranslations) }}</h5>
                  <div class="star-rating">
                    <button
                      v-for="star in 5"
                      :key="star"
                      @click="setRating(index, star)"
                      class="star-button"
                      :class="{ active: star <= recording.rating }"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    </button>
                  </div>
                  <div class="rating-labels">
                    <span class="rating-label">{{ t('poor', globalTranslations) }}</span>
                    <span class="rating-label">{{ t('excellent', globalTranslations) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Export Section -->
          <div class="export-section">
            <h3 class="section-subtitle">{{ t('exportResults', globalTranslations) }}</h3>
            <div class="export-options">
              <button @click="exportToPDF" class="export-button pdf">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14,2 14,8 20,8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10,9 9,9 8,9"></polyline>
                </svg>
                {{ t('exportPDF', globalTranslations) }}
              </button>
              <button @click="exportToCSV" class="export-button csv">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14,2 14,8 20,8"></polyline>
                </svg>
                {{ t('exportCSV', globalTranslations) }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useLanguage, globalTranslations } from '~/composables/useLanguage'

const { t } = useLanguage()

// State
const gameCode = ref('')
const selectedResult = ref(null)
const loadingError = ref('')
const currentPlaying = ref(-1)
const audioElements = ref({})
const progressUpdateInterval = ref(null)

// Mock data for demonstration
const mockResults = {
  '123': {
    code: '123',
    scenario: 'Communication Skills Assessment',
    recordings: [
      {
        question: 'Introduce yourself and explain your background',
        duration: 42,
        timestamp: new Date('2024-11-14T09:15:00'),
        transcript: 'Hello, my name is John Smith. I have been working in the education sector for over 8 years, specializing in curriculum development and student assessment methodologies.',
        rating: 4,
        editingTranscript: false,
        audioUrl: null,
        currentTime: 0
      },
      {
        question: 'How do you handle difficult conversations?',
        duration: 48,
        timestamp: new Date('2024-11-14T09:16:00'),
        transcript: 'When facing difficult conversations, I prepare thoroughly by understanding all perspectives. I listen actively, remain calm, and focus on finding common ground while being direct but respectful.',
        rating: 5,
        editingTranscript: false,
        audioUrl: null,
        currentTime: 0
      },
      {
        question: 'Describe a time when you had to explain a complex concept',
        duration: 55,
        timestamp: new Date('2024-11-14T09:17:00'),
        transcript: 'I once had to explain quantum computing principles to a group of high school students. I used analogies with everyday objects and interactive demonstrations to break down the complex concepts into understandable parts.',
        rating: 4,
        editingTranscript: false,
        audioUrl: null,
        currentTime: 0
      }
    ]
  },
  'ABC123': {
    code: 'ABC123',
    scenario: 'Customer Service Training',
    recordings: [
      {
        question: 'How would you handle an angry customer?',
        duration: 45,
        timestamp: new Date('2024-11-14T10:30:00'),
        transcript: 'I would first listen carefully to understand their concerns, then apologize for any inconvenience and work together to find a solution that meets their needs.',
        rating: 4,
        editingTranscript: false,
        audioUrl: null, // In real implementation, this would be the actual audio URL
        currentTime: 0
      },
      {
        question: 'Describe your problem-solving approach',
        duration: 52,
        timestamp: new Date('2024-11-14T10:31:00'),
        transcript: 'My approach involves breaking down complex problems into smaller parts, gathering all relevant information, considering multiple solutions, and implementing the most effective one while monitoring results.',
        rating: 5,
        editingTranscript: false,
        audioUrl: null,
        currentTime: 0
      }
    ]
  },
  'XYZ789': {
    code: 'XYZ789',
    scenario: 'Leadership Assessment',
    recordings: [
      {
        question: 'Describe your leadership style',
        duration: 38,
        timestamp: new Date('2024-11-14T11:15:00'),
        transcript: 'I believe in collaborative leadership where I guide and support my team while encouraging their input and ideas. I focus on clear communication and setting achievable goals.',
        rating: 3,
        editingTranscript: false,
        audioUrl: null,
        currentTime: 0
      }
    ]
  }
}

// Methods
const loadResults = () => {
  loadingError.value = ''
  
  if (mockResults[gameCode.value.toUpperCase()]) {
    selectedResult.value = mockResults[gameCode.value.toUpperCase()]
  } else {
    loadingError.value = t('gameCodeNotFound', globalTranslations) || 'Game code not found. Please check your code and try again.'
  }
}

const goBack = () => {
  selectedResult.value = null
  gameCode.value = ''
  loadingError.value = ''
  stopAllAudio()
}

const togglePlayback = (index: number) => {
  if (currentPlaying.value === index) {
    // Pause current audio
    stopAllAudio()
  } else {
    // Stop any other playing audio first
    stopAllAudio()
    // Start new audio (mock implementation)
    currentPlaying.value = index
    startProgressTracking(index)
  }
}

const stopAllAudio = () => {
  currentPlaying.value = -1
  if (progressUpdateInterval.value) {
    clearInterval(progressUpdateInterval.value)
    progressUpdateInterval.value = null
  }
}

const startProgressTracking = (index: number) => {
  // Mock audio progress tracking
  const recording = selectedResult.value.recordings[index]
  recording.currentTime = 0
  
  progressUpdateInterval.value = setInterval(() => {
    recording.currentTime += 0.5
    if (recording.currentTime >= recording.duration) {
      stopAllAudio()
    }
  }, 500)
}

const getProgressPercent = (index: number) => {
  const recording = selectedResult.value?.recordings[index]
  if (!recording) return 0
  return (recording.currentTime / recording.duration) * 100
}

const getCurrentTime = (index: number) => {
  return selectedResult.value?.recordings[index]?.currentTime || 0
}

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

const formatDuration = (seconds: number) => {
  return `${seconds}s`
}

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

const toggleTranscriptEdit = (index: number) => {
  const recording = selectedResult.value.recordings[index]
  recording.editingTranscript = !recording.editingTranscript
}

const setRating = (index: number, rating: number) => {
  selectedResult.value.recordings[index].rating = rating
}

const exportToPDF = () => {
  // Mock PDF export
  alert('PDF export functionality would be implemented here')
}

const exportToCSV = () => {
  // Mock CSV export
  const data = selectedResult.value.recordings.map((recording, index) => ({
    Question: recording.question,
    Transcript: recording.transcript,
    Rating: recording.rating,
    Duration: recording.duration,
    Date: formatDate(recording.timestamp)
  }))
  
  const csv = [
    Object.keys(data[0]).join(','),
    ...data.map(row => Object.values(row).map(val => `"${val}"`).join(','))
  ].join('\n')
  
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `results_${selectedResult.value.code}.csv`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
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

/* Code Input Section */
.code-input-section {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
}

.input-container {
  background-color: #ffffff;
  padding: 3rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  text-align: center;
  max-width: 500px;
  width: 100%;
}

.section-title {
  color: #1f2937;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.section-description {
  color: #6b7280;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.code-form {
  text-align: left;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  color: #374151;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.code-input {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.code-input:focus {
  outline: none;
  border-color: #0097b2;
  box-shadow: 0 0 0 3px rgba(0, 151, 178, 0.1);
}

.load-button {
  width: 100%;
  padding: 0.875rem;
  background-color: #0097b2;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.load-button:hover:not(:disabled) {
  background-color: #007a8e;
  transform: translateY(-1px);
}

.load-button:disabled {
  background-color: #9ca3af;
  cursor: not-allowed;
  transform: none;
}

.error-message {
  color: #ef4444;
  background-color: #fef2f2;
  padding: 0.75rem;
  border-radius: 6px;
  margin-top: 1rem;
  border: 1px solid #fecaca;
}

/* Results Display */
.results-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #e5e7eb;
}

.back-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: #6b7280;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.back-button:hover {
  background-color: #4b5563;
}

.result-title {
  color: #1f2937;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
}

.results-content-area {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

/* Audio Section */
.audio-section {
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.section-subtitle {
  color: #1f2937;
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.recordings-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.recording-item {
  padding: 1.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background-color: #f9fafb;
}

.recording-header {
  margin-bottom: 1rem;
}

.question-title {
  color: #1f2937;
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
}

.recording-meta {
  color: #6b7280;
  font-size: 0.875rem;
}

/* Audio Player */
.audio-player {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background-color: #ffffff;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
}

.play-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: #0097b2;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  flex-shrink: 0;
}

.play-button:hover {
  background-color: #007a8e;
}

.play-button.playing {
  background-color: #f59e0b;
}

.play-button.playing:hover {
  background-color: #d97706;
}

.audio-progress {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
}

.progress-bar {
  flex: 1;
  height: 6px;
  background-color: #e5e7eb;
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background-color: #0097b2;
  transition: width 0.1s ease;
}

.time-display {
  color: #6b7280;
  font-size: 0.75rem;
  font-weight: 500;
  min-width: 80px;
}

/* Transcript Section */
.transcript-section {
  margin-bottom: 1.5rem;
}

.transcript-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.transcript-title {
  color: #374151;
  font-size: 0.875rem;
  font-weight: 600;
  margin: 0;
}

.edit-toggle-button {
  padding: 0.375rem 0.75rem;
  background-color: #f59e0b;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.edit-toggle-button:hover {
  background-color: #d97706;
}

.transcript-display {
  padding: 0.75rem;
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  color: #374151;
  line-height: 1.6;
  font-size: 0.875rem;
}

.transcript-editor {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #0097b2;
  border-radius: 4px;
  font-size: 0.875rem;
  line-height: 1.6;
  resize: vertical;
  font-family: inherit;
}

.transcript-editor:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(0, 151, 178, 0.1);
}

/* Rating Section */
.rating-section {
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
}

.rating-title {
  color: #374151;
  font-size: 0.875rem;
  font-weight: 600;
  margin: 0 0 0.75rem 0;
}

.star-rating {
  display: flex;
  gap: 0.25rem;
  margin-bottom: 0.5rem;
}

.star-button {
  background: none;
  border: none;
  cursor: pointer;
  color: #d1d5db;
  transition: color 0.2s;
}

.star-button:hover {
  color: #f59e0b;
}

.star-button.active {
  color: #f59e0b;
}

.rating-labels {
  display: flex;
  justify-content: space-between;
  color: #6b7280;
  font-size: 0.75rem;
}

/* Export Section */
.export-section {
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.export-options {
  display: flex;
  gap: 1rem;
}

.export-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.export-button.pdf {
  background-color: #ef4444;
  color: #ffffff;
}

.export-button.pdf:hover {
  background-color: #dc2626;
  transform: translateY(-1px);
}

.export-button.csv {
  background-color: #10b981;
  color: #ffffff;
}

.export-button.csv:hover {
  background-color: #059669;
  transform: translateY(-1px);
}

/* Responsive Design */
@media (max-width: 768px) {
  .results-screen {
    padding: 1rem;
  }
  
  .results-title {
    font-size: 1.5rem;
  }
  
  .input-container {
    padding: 2rem;
  }
  
  .results-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .audio-player {
    flex-direction: column;
    align-items: stretch;
  }
  
  .export-options {
    flex-direction: column;
  }
  
  .export-button {
    justify-content: center;
  }
}
</style>