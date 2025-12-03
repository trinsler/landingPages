<template>
  <header class="app-header">
    <div class="header-container">
      <div class="header-left">
        <div class="logo-section">
          <img src="/assets/imagio_logo.png" alt="IMAGIO" class="header-logo" />
        </div>
      </div>
      
      <nav class="header-nav">
        <template v-for="item in menuItems" :key="item.path">
          <NuxtLink
            v-if="!item.action"
            :to="item.path"
            class="nav-link"
            :class="{ active: isActiveRoute(item.path) }"
          >
            {{ item.label }}
          </NuxtLink>
          <button
            v-else
            @click="handleMenuClick(item)"
            class="nav-link nav-button"
            :class="{ special: item.special }"
          >
            {{ item.label }}
          </button>
        </template>
      </nav>
      
      <div class="header-right">
        <div class="language-selector">
          <button 
            @click="toggleLanguage" 
            class="language-toggle"
            :title="currentLanguage === 'en' ? 'Switch to Deutsch' : 'Switch to English'"
          >
            {{ currentLanguage === 'en' ? 'DE' : 'EN' }}
          </button>
        </div>
        <div class="sumo-logo-container">
          <img src="/assets/sumo_logo_400.png" alt="SUMO" class="sumo-logo" />
        </div>
      </div>
    </div>
    
    <!-- Microphone Test Modal - inline implementation -->
    <div v-if="showMicrophoneModal" class="modal-overlay" @click="closeMicrophoneModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3 class="modal-title">
            {{ t('microphoneTest', globalTranslations) }}
          </h3>
          <button @click="closeMicrophoneModal" class="modal-close">×</button>
        </div>
        <div class="modal-body">
          <p>{{ t('testMicrophone', globalTranslations) }}</p>
          <div class="microphone-test">
            <div v-if="isRecording" class="recording-indicator">
              <div class="pulsing-circle"></div>
              <span class="recording-text">Recording...</span>
            </div>
            <button 
              @click="toggleRecording"
              class="test-button"
              :class="{ recording: isRecording }"
            >
              {{ isRecording ? 'Stop Recording' : t('startTest', globalTranslations) }}
            </button>
            <div v-if="recordingStatus" class="recording-status" :class="recordingStatus.type">
              {{ recordingStatus.message }}
            </div>
            
            <!-- Playback Options -->
            <div v-if="showPlaybackOptions" class="playback-options">
              <div class="playback-mode-selector">
                <label class="mode-option">
                  <input type="radio" v-model="playbackMode" value="audio" />
                  <span class="mode-label">Audio Playback</span>
                </label>
                <label class="mode-option">
                  <input type="radio" v-model="playbackMode" value="text" />
                  <span class="mode-label">Text View</span>
                </label>
              </div>
              
              <!-- Audio Playback -->
              <div v-if="playbackMode === 'audio' && recordedAudioBlob" class="audio-playback">
                <button @click="playRecordedAudio" class="playback-button">
                   Play Recording
                </button>
              </div>
              
              <!-- Text Display -->
              <div v-if="playbackMode === 'text' && (displayTranscription || transcription)" class="transcription-display">
                <h4>{{ t('transcription', globalTranslations) || 'Transcription:' }}</h4>
                <div class="transcription-text">{{ displayTranscription || transcription }}</div>
              </div>
            </div>
            
            <!-- Live transcription during recording -->
            <div v-if="isRecording && displayTranscription" class="live-transcription">
              <h4>Live Transcription:</h4>
              <div class="live-transcription-text">{{ displayTranscription }}</div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button @click="closeMicrophoneModal" class="cancel-button">
            {{ t('close', globalTranslations) }}
          </button>
        </div>
      </div>
    </div>
    
    <!-- Admin Login Modal -->
    <div v-if="showAdminModal" class="modal-overlay" @click="closeAdminModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3 class="modal-title">{{ t('admin', globalTranslations) }}</h3>
          <button @click="closeAdminModal" class="modal-close">×</button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="() => handleAdminLogin({ username: adminUsername, password: adminPassword })">
            <div class="form-group">
              <label>{{ t('username', globalTranslations) }}</label>
              <input v-model="adminUsername" type="text" class="form-input" required>
            </div>
            <div class="form-group">
              <label>{{ t('password', globalTranslations) }}</label>
              <input v-model="adminPassword" type="password" class="form-input" required>
            </div>
            <div v-if="loginError" class="error-message">{{ loginError }}</div>
            <div class="form-actions">
              <button type="submit" class="login-button">
                {{ t('login', globalTranslations) }}
              </button>
              <button type="button" @click="closeAdminModal" class="cancel-button">
                {{ t('cancel', globalTranslations) }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useLanguage, globalTranslations } from '~/composables/useLanguage'

const route = useRoute()
const router = useRouter()
const { currentLanguage, setLanguage, t } = useLanguage()

// Reactive state for modals
const showMicrophoneModal = ref(false)
const showAdminModal = ref(false)
const loginError = ref('')
const adminUsername = ref('')
const adminPassword = ref('')

// Microphone recording state
const isRecording = ref(false)
const mediaRecorder = ref<MediaRecorder | null>(null)
const recordingStatus = ref<{ message: string; type: 'success' | 'error' | 'info' } | null>(null)
const transcription = ref('')
const recognition = ref<any>(null)
const currentAudio = ref<HTMLAudioElement | null>(null)
const interimTranscript = ref('')
const recordedAudioBlob = ref<Blob | null>(null)
const showPlaybackOptions = ref(false)
const playbackMode = ref<'audio' | 'text'>('text')

// Computed property for display text
const displayTranscription = computed(() => {
  if (interimTranscript.value) {
    return transcription.value + (transcription.value ? ' ' : '') + interimTranscript.value
  }
  return transcription.value
})

// Menu items - with modal actions using global translations
const menuItems = computed(() => [
  { path: '/', label: t('home', globalTranslations) },
  { path: '#microphone', label: t('microphoneTest', globalTranslations), action: 'microphone' },
  { path: '/faq', label: t('faq', globalTranslations) },
  { path: '/about', label: t('about', globalTranslations) },
  { path: '#admin', label: t('admin', globalTranslations), action: 'admin', special: true }
])

// Methods
const isActiveRoute = (path: string) => {
  return route.path === path
}

const toggleLanguage = () => {
  const newLanguage = currentLanguage.value === 'en' ? 'de' : 'en'
  setLanguage(newLanguage as 'en' | 'de')
}

const handleMenuClick = (item: any) => {
  if (item.action === 'microphone') {
    showMicrophoneModal.value = true
  } else if (item.action === 'admin') {
    showAdminModal.value = true
    loginError.value = ''
  } else {
    router.push(item.path)
  }
}

const closeMicrophoneModal = () => {
  // Stop recording if active
  if (isRecording.value) {
    stopRecording()
  }
  
  // Stop speech recognition if active
  if (recognition.value) {
    recognition.value.stop()
    recognition.value = null
  }
  
  // Stop audio playback if active
  if (currentAudio.value) {
    currentAudio.value.pause()
    currentAudio.value.currentTime = 0
    currentAudio.value = null
  }
  
  // Clear interim transcript
  interimTranscript.value = ''
  
  // Reset modal state
  showPlaybackOptions.value = false
  recordedAudioBlob.value = null
  transcription.value = ''
  recordingStatus.value = null
  
  showMicrophoneModal.value = false
}

const closeAdminModal = () => {
  showAdminModal.value = false
  loginError.value = ''
  adminUsername.value = ''
  adminPassword.value = ''
}

const handleAdminLogin = async (credentials: { username: string; password: string }) => {
  if (credentials.username === 'admin' && credentials.password === '123') {
    try {
      await router.push('/admin')
      showAdminModal.value = false
      console.log('Successfully navigated to admin page')
    } catch (error) {
      console.error('Navigation error:', error)
      loginError.value = 'Admin login erfolgreich! Navigiere...'
      setTimeout(() => {
        window.location.href = '/admin'
      }, 1000)
    }
  } else {
    loginError.value = t('invalidCredentials', globalTranslations)
  }
}

// Microphone recording functions
const toggleRecording = async () => {
  if (isRecording.value) {
    stopRecording()
  } else {
    await startRecording()
  }
}

const startRecording = async () => {
  try {
    // Check if we're in a secure context
    if (!window.isSecureContext && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
      recordingStatus.value = {
        message: 'Microphone requires HTTPS or localhost. Current URL: ' + window.location.protocol,
        type: 'error'
      }
      return
    }

    // Check if MediaDevices API is available
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      recordingStatus.value = {
        message: 'Microphone API not available in this browser.',
        type: 'error'
      }
      return
    }

    recordingStatus.value = { message: 'Requesting microphone access...', type: 'info' }
    transcription.value = ''
    interimTranscript.value = ''

    // Start speech recognition for transcription (if available)
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      try {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
        recognition.value = new SpeechRecognition()

        recognition.value.continuous = true
        recognition.value.interimResults = true
        recognition.value.lang = currentLanguage.value === 'de' ? 'de-DE' : 'en-US'

        recognition.value.onresult = (event: any) => {
          let tempInterimTranscript = ''

          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript

            if (event.results[i].isFinal) {
              // Add finalized words to permanent transcription
              const trimmedTranscript = transcript.trim()
              if (trimmedTranscript) {
                transcription.value += (transcription.value ? ' ' : '') + trimmedTranscript
              }
            } else {
              // Store interim results for display
              tempInterimTranscript = transcript
            }
          }

          // Update interim transcript for display
          interimTranscript.value = tempInterimTranscript
        }

        recognition.value.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error)
          if (event.error === 'not-allowed') {
            recordingStatus.value = {
              message: 'Speech recognition permission denied.',
              type: 'error'
            }
          } else {
            recordingStatus.value = {
              message: 'Speech recognition error: ' + event.error,
              type: 'error'
            }
          }
        }

        recognition.value.start()
      } catch (speechError) {
        console.warn('Speech recognition failed to start:', speechError)
        recordingStatus.value = {
          message: 'Speech recognition unavailable, but audio recording will work.',
          type: 'info'
        }
      }
    } else {
      recordingStatus.value = {
        message: 'Speech recognition not supported. Audio recording will work.',
        type: 'info'
      }
    }

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    
    mediaRecorder.value = new MediaRecorder(stream)
    const chunks: Blob[] = []
    
    mediaRecorder.value.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunks.push(event.data)
      }
    }
    
    mediaRecorder.value.onstart = () => {
      isRecording.value = true
      recordingStatus.value = { message: 'Recording started. Speak clearly into your microphone.', type: 'success' }
    }
    
    mediaRecorder.value.onstop = () => {
      isRecording.value = false
      
      if (recognition.value) {
        recognition.value.stop()
      }
      
      const blob = new Blob(chunks, { type: 'audio/webm' })
      recordedAudioBlob.value = blob
      
      // Show playback options
      showPlaybackOptions.value = true
      recordingStatus.value = { 
        message: 'Recording completed! Choose playback or text view below.', 
        type: 'success' 
      }
      
      // Stop all tracks
      stream.getTracks().forEach(track => track.stop())
    }
    
    mediaRecorder.value.start()
    
  } catch (error) {
    recordingStatus.value = { 
      message: 'Microphone access denied. Please check your browser settings.', 
      type: 'error' 
    }
    console.error('Microphone error:', error)
  }
}

const stopRecording = () => {
  if (mediaRecorder.value && isRecording.value) {
    mediaRecorder.value.stop()
  }
  
  // Stop speech recognition if active
  if (recognition.value) {
    recognition.value.stop()
  }
  
  // Clear interim transcript
  interimTranscript.value = ''
}

// Playback functions
const playRecordedAudio = () => {
  if (recordedAudioBlob.value) {
    // Stop any currently playing audio
    if (currentAudio.value) {
      currentAudio.value.pause()
      currentAudio.value.currentTime = 0
    }
    
    const audioUrl = URL.createObjectURL(recordedAudioBlob.value)
    const audio = new Audio(audioUrl)
    currentAudio.value = audio
    
    audio.play().then(() => {
      recordingStatus.value = { message: 'Playing your recording...', type: 'info' }
    }).catch((error) => {
      recordingStatus.value = { message: 'Error playing audio: ' + error.message, type: 'error' }
    })
    
    audio.addEventListener('ended', () => {
      recordingStatus.value = { message: 'Playback finished.', type: 'success' }
      URL.revokeObjectURL(audioUrl)
      currentAudio.value = null
    })
  }
}

</script>

<style scoped>
.app-header {
  background-color: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  height: 64px;
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-left {
  display: flex;
  align-items: center;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.header-logo {
  height: 32px;
  width: auto;
  transition: opacity 0.2s ease;
}

.header-logo:hover {
  opacity: 0.8;
}

.logo-text {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  letter-spacing: -0.025em;
}

.header-nav {
  display: flex;
  gap: 0.25rem;
  align-items: center;
}

.nav-link {
  padding: 0.625rem 1rem;
  text-decoration: none;
  color: #6b7280;
  font-weight: 500;
  font-size: 0.875rem;
  border-radius: 6px;
  transition: all 0.15s ease;
  border: 1px solid transparent;
  background: none;
}

.nav-link:hover {
  background-color: #f9fafb;
  color: #374151;
  border-color: #e5e7eb;
}

.nav-link.active {
  background-color: #0097b2;
  color: #ffffff;
  border-color: #0097b2;
  box-shadow: 0 1px 2px rgba(0, 151, 178, 0.1);
}

.nav-button {
  background: none;
  border: 1px solid transparent;
  cursor: pointer;
}

.nav-button.special {
  color: #f59e0b;
}

.nav-button.special:hover {
  background-color: #f59e0b;
  color: #ffffff;
  border-color: #f59e0b;
}

.header-right {
  display: flex;
  align-items: center;
}

.language-selector {
  position: relative;
}

.language-toggle {
  padding: 0.5rem 0.875rem;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background-color: #ffffff;
  color: #6b7280;
  font-size: 0.8125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.language-toggle:hover {
  background-color: #f9fafb;
  border-color: #0097b2;
  color: #0097b2;
  transform: translateY(-1px);
}

.language-toggle:focus {
  outline: none;
  border-color: #0097b2;
  box-shadow: 0 0 0 2px rgba(0, 151, 178, 0.1);
}

.sumo-logo-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 1rem;
}

.sumo-logo {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  transition: opacity 0.2s ease;
  border: 1px solid #e5e7eb;
}

.sumo-logo:hover {
  opacity: 0.8;
  border-color: #d1d5db;
}

/* Educational institution design - clean and professional */
@media (max-width: 1024px) {
  .header-container {
    padding: 0 1.5rem;
  }
  
  .header-nav {
    gap: 0.125rem;
  }
  
  .nav-link {
    padding: 0.625rem 0.875rem;
    font-size: 0.8125rem;
  }
}

@media (max-width: 768px) {
  .app-header {
    height: 56px;
  }
  
  .header-container {
    padding: 0 1rem;
  }
  
  .logo-text {
    font-size: 1.125rem;
  }
  
  .header-logo {
    height: 28px;
  }
  
  .header-nav {
    display: none;
  }
  
  .language-toggle {
    font-size: 0.75rem;
    padding: 0.4375rem 0.75rem;
    min-width: 40px;
  }
  
  .sumo-logo-container {
    margin-left: 0.5rem;
  }
  
  .sumo-logo {
    width: 24px;
    height: 24px;
  }
  
  .mobile-menu-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    background: none;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.15s ease;
  }
  
  .mobile-menu-toggle:hover {
    background-color: #f9fafb;
    border-color: #d1d5db;
  }
}

/* Add mobile menu toggle button to header-left on mobile */
@media (max-width: 768px) {
  .header-left {
    gap: 1rem;
  }
  
  .mobile-menu-icon {
    width: 1.25rem;
    height: 1.25rem;
    position: relative;
  }
  
  .mobile-menu-icon span {
    position: absolute;
    height: 2px;
    width: 100%;
    background-color: #374151;
    border-radius: 1px;
    transition: all 0.2s ease;
  }
  
  .mobile-menu-icon span:nth-child(1) {
    top: 0;
  }
  
  .mobile-menu-icon span:nth-child(2) {
    top: 50%;
    transform: translateY(-50%);
  }
  
  .mobile-menu-icon span:nth-child(3) {
    bottom: 0;
  }
}

/* For desktop - hide mobile toggle */
@media (min-width: 769px) {
  .mobile-menu-toggle {
    display: none;
  }
}

/* Smooth transitions for better UX */
* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Focus states for accessibility */
.nav-link:focus-visible,
.lang-select:focus-visible {
  outline: 2px solid #0097b2;
  outline-offset: 2px;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;
  padding: 1rem;
}

.modal-content {
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  padding: 1.5rem 1.5rem 0 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
}

.modal-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.modal-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #6b7280;
  cursor: pointer;
  padding: 0.25rem;
  line-height: 1;
}

.modal-close:hover {
  color: #374151;
}

.modal-body {
  padding: 0 1.5rem 1rem 1.5rem;
}

.modal-footer {
  padding: 1rem 1.5rem 1.5rem 1.5rem;
  border-top: 1px solid #e5e7eb;
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
}

/* Form Styles */
.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
}

.form-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.875rem;
  transition: border-color 0.15s ease;
}

.form-input:focus {
  outline: none;
  border-color: #0097b2;
  box-shadow: 0 0 0 2px rgba(0, 151, 178, 0.1);
}

.form-actions {
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
  margin-top: 1.5rem;
}

.login-button, .test-button {
  padding: 1rem 2rem;
  background-color: #0097b2;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 1.125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  width: 100%;
}

.login-button:hover, .test-button:hover {
  background-color: #007a8e;
  transform: translateY(-1px);
}

.test-button.recording {
  background-color: #f59e0b;
}

.test-button.recording:hover {
  background-color: #d97706;
}

.cancel-button {
  padding: 0.75rem 1.5rem;
  background-color: #ffffff;
  color: #374151;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s ease;
}

.cancel-button:hover {
  background-color: #f9fafb;
  border-color: #9ca3af;
}

.error-message {
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: 0.5rem;
}

.microphone-test {
  text-align: center;
  padding: 2rem 0;
}

.recording-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.pulsing-circle {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #f59e0b;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.7;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.recording-text {
  font-size: 1rem;
  font-weight: 500;
  color: #f59e0b;
  animation: fadeInOut 1.5s infinite;
}

@keyframes fadeInOut {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
}

.test-button.recording {
  background-color: #f59e0b;
  color: #ffffff;
  border-color: #f59e0b;
}

.test-button.recording:hover {
  background-color: #d97706;
  border-color: #d97706;
}

.recording-status {
  margin-top: 1rem;
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
}

.recording-status.success {
  background-color: #f0fdf4;
  color: #15803d;
  border: 1px solid #bbf7d0;
}

.recording-status.error {
  background-color: #fef2f2;
  color: #dc2626;
  border: 1px solid #fecaca;
}

.recording-status.info {
  background-color: #eff6ff;
  color: #1e40af;
  border: 1px solid #dbeafe;
}

.transcription-display {
  margin-top: 1.5rem;
  padding: 1rem;
  background-color: #f9fafb;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  border-left: 4px solid #0097b2;
}

.transcription-display h4 {
  margin: 0 0 0.75rem 0;
  color: #0097b2;
  font-size: 1rem;
  font-weight: 600;
}

.transcription-text {
  color: #374151;
  line-height: 1.6;
  font-size: 1rem;
  min-height: 3rem;
  padding: 0.75rem;
  background-color: #ffffff;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  white-space: pre-wrap;
}

/* Playback Options */
.playback-options {
  margin-top: 1.5rem;
  padding: 1rem;
  background-color: #f8fafc;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.playback-mode-selector {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  justify-content: center;
}

.mode-option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  background-color: #ffffff;
  border: 2px solid #e2e8f0;
  transition: all 0.2s;
}

.mode-option:hover {
  border-color: #0097b2;
}

.mode-option input[type="radio"] {
  accent-color: #0097b2;
}

.mode-option input[type="radio"]:checked + .mode-label {
  color: #0097b2;
  font-weight: 600;
}

.mode-label {
  color: #374151;
  font-size: 0.875rem;
  font-weight: 500;
}

.audio-playback {
  text-align: center;
}

.playback-button {
  padding: 0.75rem 1.5rem;
  background-color: #0097b2;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.playback-button:hover {
  background-color: #007a8e;
  transform: translateY(-1px);
}

/* Live Transcription */
.live-transcription {
  margin-top: 1rem;
  padding: 1rem;
  background-color: #eff6ff;
  border: 2px solid #0097b2;
  border-radius: 8px;
}

.live-transcription h4 {
  margin: 0 0 0.75rem 0;
  color: #0097b2;
  font-size: 1rem;
  font-weight: 600;
}

.live-transcription-text {
  color: #1e40af;
  line-height: 1.6;
  font-size: 1rem;
  min-height: 2rem;
  padding: 0.5rem;
  background-color: #ffffff;
  border: 1px solid #bfdbfe;
  border-radius: 4px;
  white-space: pre-wrap;
}


/* Add padding to main content when header is fixed */
:global(body) {
  padding-top: 64px;
}

@media (max-width: 768px) {
  :global(body) {
    padding-top: 56px;
  }
}
</style>