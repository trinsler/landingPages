<template>
  <div class="audio-section">
    <h3 class="section-subtitle">{{ t('audioRecordings', globalTranslations) }}</h3>
    <div class="recordings-list">
      <div 
        v-for="(recording, index) in recordings" 
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
            @click="$emit('togglePlayback', index)"
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
              @click="$emit('toggleTranscriptEdit', index)"
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
            :value="recording.transcript"
            @input="$emit('updateTranscript', index, ($event.target as HTMLTextAreaElement).value)"
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
              @click="$emit('setRating', index, star)"
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
</template>

<script setup lang="ts">
import { useLanguage, globalTranslations } from '~/composables/useLanguage'

const { t } = useLanguage()

defineEmits(['togglePlayback', 'toggleTranscriptEdit', 'updateTranscript', 'setRating'])

defineProps<{
  recordings: Array<any>
  currentPlaying: number
  getProgressPercent: (index: number) => number
  getCurrentTime: (index: number) => number
}>()

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

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}
</script>

<style scoped>
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

@media (max-width: 768px) {
  .audio-player {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>