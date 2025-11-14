<template>
  <div class="game-screen">
    <div class="game-container">
      <!-- Left Side: Media Player -->
      <div class="media-side">
        <div class="media-container">
          <div class="media-player">
            <!-- Video/Image Display -->
            <div v-if="currentMedia.type === 'video'" class="video-container">
              <video
                ref="videoPlayer"
                :src="currentMedia.url"
                @error="handleMediaError"
                @loadeddata="handleMediaLoaded"
                controls
                class="video-player"
              />
            </div>
            <div v-else-if="currentMedia.type === 'image'" class="image-container">
              <img
                :src="currentMedia.url"
                @error="handleMediaError"
                @load="handleMediaLoaded"
                :alt="'Question image'"
                class="image-player"
              />
            </div>
            <!-- Error Fallback -->
            <div v-else-if="mediaError" class="media-error">
              <div class="error-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M12 9v2m0 4h.01M3 12a9 9 0 1 1 18 0 9 9 0 0 1-18 0Z"/>
                </svg>
              </div>
              <p>Media not available</p>
            </div>
            <!-- Loading State -->
            <div v-else class="media-loading">
              <div class="loading-spinner"></div>
              <p>Loading media...</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Side: Game Area -->
      <div class="game-side">
        <div class="game-container-right">
          <!-- Progress Indicator -->
          <div class="progress-container">
            <div class="progress-bar">
              <div 
                class="progress-fill" 
                :style="{ width: `${progressPercentage}%` }"
              ></div>
            </div>
            <span class="progress-text">{{ currentQuestion }}/{{ totalQuestions }}</span>
          </div>

          <!-- Question Text -->
          <div class="question-container">
            <h2 class="question-text">{{ currentQuestionData.text }}</h2>
          </div>

          <!-- Timer and Recording Area -->
          <div class="interaction-area">
            <!-- Countdown Timer -->
            <div v-if="showTimer && timeRemaining > 0" class="timer-container">
              <div class="timer-circle">
                <svg class="timer-svg" viewBox="0 0 120 120">
                  <circle
                    class="timer-background"
                    cx="60"
                    cy="60"
                    r="54"
                    fill="none"
                    stroke="#e5e7eb"
                    stroke-width="8"
                  />
                  <circle
                    class="timer-progress"
                    cx="60"
                    cy="60"
                    r="54"
                    fill="none"
                    stroke="#0097b2"
                    stroke-width="8"
                    :stroke-dasharray="timerDashArray"
                    :stroke-dashoffset="timerDashOffset"
                    transform="rotate(-90 60 60)"
                  />
                </svg>
                <div class="timer-text">{{ timeRemaining }}s</div>
              </div>
            </div>

            <!-- Recording Indicator -->
            <div v-if="isRecording" class="recording-indicator">
              <div class="pulse-circle"></div>
              <span class="recording-text">Recording...</span>
            </div>

            <!-- TTS Button -->
            <button 
              @click="playQuestionAudio"
              :class="['tts-button', { playing: isPlayingAudio }]"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
              </svg>
              {{ isPlayingAudio ? 'Stop Audio' : 'Play Question' }}
            </button>
          </div>

          <!-- Action Buttons -->
          <div class="action-buttons">
            <button 
              @click="startRecording"
              :disabled="isRecording"
              class="record-button"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="12" r="10"/>
              </svg>
              {{ isRecording ? 'Recording...' : 'Start Answer' }}
            </button>

            <button 
              @click="nextQuestion"
              :disabled="!canProceed"
              class="next-button"
            >
              Next Question
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

// Reactive state
const currentQuestion = ref(1)
const totalQuestions = ref(10)
const isRecording = ref(false)
const isPlayingAudio = ref(false)
const audioUtterance = ref<SpeechSynthesisUtterance | null>(null)
const showTimer = ref(false)
const timeRemaining = ref(45)
const mediaError = ref(false)
const currentMedia = ref({ type: 'image', url: '' })
const hasAnswered = ref(false)

// Scenario data (would come from backend)
const currentQuestionData = ref({
  text: 'What do you see in this image? Describe your observations in detail.',
  mediaUrl: '/assets/game_images/1.jpg',
  mediaType: 'image',
  timeLimit: 45
})

// Computed properties
const progressPercentage = computed(() => {
  return (currentQuestion.value / totalQuestions.value) * 100
})

const timerDashArray = computed(() => 2 * Math.PI * 54)
const timerDashOffset = computed(() => {
  const percentage = timeRemaining.value / 45
  return timerDashArray.value * (1 - percentage)
})

const canProceed = computed(() => {
  return hasAnswered.value && !isRecording.value
})

// Timer
let timerInterval: NodeJS.Timeout | null = null

// Methods
const handleMediaError = () => {
  mediaError.value = true
  currentMedia.value = { type: 'none', url: '' }
}

const handleMediaLoaded = () => {
  mediaError.value = false
}

const playQuestionAudio = () => {
  if ('speechSynthesis' in window) {
    // Stop audio if currently playing
    if (isPlayingAudio.value && audioUtterance.value) {
      speechSynthesis.cancel()
      isPlayingAudio.value = false
      audioUtterance.value = null
      return
    }
    
    // Start audio if not playing
    isPlayingAudio.value = true
    const utterance = new SpeechSynthesisUtterance(currentQuestionData.value.text)
    utterance.lang = 'en-US'
    utterance.rate = 0.9
    
    utterance.onend = () => {
      isPlayingAudio.value = false
      audioUtterance.value = null
    }
    
    utterance.onerror = () => {
      isPlayingAudio.value = false
      audioUtterance.value = null
    }
    
    audioUtterance.value = utterance
    speechSynthesis.speak(utterance)
  }
}

const startRecording = async () => {
  if (!isRecording.value) {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      isRecording.value = true
      hasAnswered.value = true
      
      // Start timer
      showTimer.value = true
      timeRemaining.value = 45
      startTimer()
      
      // Simulate recording stop
      setTimeout(() => {
        stopRecording()
      }, 45000)
      
    } catch (error) {
      console.error('Recording error:', error)
      alert('Microphone access required')
    }
  }
}

const stopRecording = () => {
  isRecording.value = false
  showTimer.value = false
  stopTimer()
}

const startTimer = () => {
  timerInterval = setInterval(() => {
    timeRemaining.value--
    if (timeRemaining.value <= 0) {
      stopRecording()
    }
  }, 1000)
}

const stopTimer = () => {
  if (timerInterval) {
    clearInterval(timerInterval)
    timerInterval = null
  }
}

const nextQuestion = () => {
  if (canProceed.value) {
    currentQuestion.value++
    hasAnswered.value = false
    
    // Load next question data
    loadQuestionData()
  }
}

const loadQuestionData = () => {
  // Simulate loading different questions
  const questions = [
    { text: 'What emotions does this image evoke in you?', mediaUrl: '/assets/game_images/2.jpg', mediaType: 'image' },
    { text: 'Describe the relationship between the elements shown.', mediaUrl: '/assets/game_images/3.jpg', mediaType: 'image' },
    { text: 'What story do you think this image tells?', mediaUrl: '/assets/game_images/1.png', mediaType: 'image' }
  ]
  
  const questionIndex = (currentQuestion.value - 1) % questions.length
  const question = questions[questionIndex]
  
  currentQuestionData.value = {
    ...currentQuestionData.value,
    text: question.text,
    mediaUrl: question.mediaUrl,
    mediaType: question.mediaType
  }
  
  currentMedia.value = {
    type: question.mediaType,
    url: question.mediaUrl
  }
}

// Lifecycle
onMounted(() => {
  loadQuestionData()
})

onUnmounted(() => {
  stopTimer()
  if (speechSynthesis.speaking) {
    speechSynthesis.cancel()
  }
})
</script>

<style scoped>
.game-screen {
  height: calc(100vh - 64px);
  background-color: #ffffff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  overflow: hidden;
}

.game-container {
  display: flex;
  gap: 2%;
  max-width: 1600px;
  margin: 0 auto;
  height: calc(100vh - 64px);
  padding: 1rem;
}

/* Left Side - Media Player */
.media-side {
  flex: 0 0 49%;
  display: flex;
  flex-direction: column;
}

.media-container {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.media-player {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f9fafb;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
}

.video-player {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.image-player {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.media-error {
  text-align: center;
  color: #6b7280;
  padding: 2rem;
}

.error-icon {
  color: #ef4444;
  margin-bottom: 1rem;
}

.media-loading {
  text-align: center;
  color: #6b7280;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #e5e7eb;
  border-top: 3px solid #0097b2;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Right Side - Game Area */
.game-side {
  flex: 0 0 49%;
  display: flex;
  flex-direction: column;
}

.game-container-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%;
}

/* Progress Indicator */
.progress-container {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-shrink: 0;
}

.progress-bar {
  flex: 1;
  height: 8px;
  background-color: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background-color: #0097b2;
  transition: width 0.3s ease;
}

.progress-text {
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  min-width: 3rem;
}

/* Question Container */
.question-container {
  flex: 1;
  min-height: 0;
  display: flex;
  align-items: center;
  padding: 1.5rem;
  background-color: #f8fafc;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  border-left: 4px solid #0097b2;
}

.question-text {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  line-height: 1.4;
  margin: 0;
  overflow-y: auto;
  max-height: 100%;
}

/* Interaction Area */
.interaction-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  flex-shrink: 0;
}

/* Timer */
.timer-container {
  display: flex;
  justify-content: center;
}

.timer-circle {
  position: relative;
  width: 80px;
  height: 80px;
}

.timer-svg {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.timer-background {
  stroke-dasharray: 339.292;
  stroke-dashoffset: 0;
}

.timer-progress {
  transition: stroke-dashoffset 1s linear;
}

.timer-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
}

/* Recording Indicator */
.recording-indicator {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  background-color: #fef2f2;
  border: 2px solid #fecaca;
  border-radius: 8px;
}

.pulse-circle {
  width: 16px;
  height: 16px;
  background-color: #ef4444;
  border-radius: 50%;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.3);
    opacity: 0.7;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.recording-text {
  font-size: 0.875rem;
  font-weight: 600;
  color: #dc2626;
}

/* TTS Button */
.tts-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background-color: #0097b2;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.tts-button:hover:not(:disabled) {
  background-color: #007a8e;
  transform: translateY(-1px);
}

.tts-button:disabled {
  background-color: #9ca3af;
  cursor: not-allowed;
  transform: none;
}

.tts-button.playing {
  background-color: #ef4444;
}

.tts-button.playing:hover {
  background-color: #dc2626;
}

/* Action Buttons */
.action-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-shrink: 0;
}

.record-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background-color: #ef4444;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.record-button:hover:not(:disabled) {
  background-color: #dc2626;
  transform: translateY(-1px);
}

.record-button:disabled {
  background-color: #9ca3af;
  cursor: not-allowed;
  transform: none;
}

.next-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background-color: #0097b2;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.next-button:hover:not(:disabled) {
  background-color: #007a8e;
  transform: translateY(-1px);
}

.next-button:disabled {
  background-color: #d1d5db;
  color: #9ca3af;
  cursor: not-allowed;
  transform: none;
}

/* Responsive Design */
@media (max-width: 1200px) {
  .game-container {
    flex-direction: column;
    height: auto;
    gap: 2rem;
  }
  
  .media-side,
  .game-side {
    flex: none;
    width: 100%;
  }
  
  .media-player {
    height: 400px;
  }
}

@media (max-width: 768px) {
  .game-screen {
    padding: 1rem;
  }
  
  .question-text {
    font-size: 1.25rem;
  }
  
  .action-buttons {
    flex-direction: column;
  }
  
  .media-player {
    height: 300px;
  }
}
</style>