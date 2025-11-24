<template>
  <div>
    <!-- Written Mode -->
    <div v-if="mode === 'written'" class="written-answer">
      <textarea
        :value="currentAnswer"
        @input="$emit('updateAnswer', ($event.target as HTMLTextAreaElement).value)"
        placeholder="Write your answer here..."
        class="answer-textarea"
        rows="6"
      ></textarea>
    </div>
    
    <!-- Oral Mode -->
    <div v-else class="oral-answer">
      <div class="recording-controls">
        <button 
          @click="$emit('toggleRecording')"
          class="recording-button"
          :class="{ recording: isRecording }"
        >
          <div v-if="isRecording" class="recording-indicator">
            <div class="pulse-dot"></div>
            <span>Recording</span>
          </div>
          <div v-else>
            <span>{{ t('startRecording', globalTranslations) }}</span>
          </div>
        </button>
      </div>
      
      <div v-if="transcript || isRecording" class="transcript-area">
        <h4>Transcript:</h4>
        <div class="transcript-text">{{ transcript || 'Listening...' }}</div>
        <textarea
          :value="currentAnswer"
          @input="$emit('updateAnswer', ($event.target as HTMLTextAreaElement).value)"
          placeholder="Edit transcript if needed..."
          class="transcript-editor"
          rows="4"
        ></textarea>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLanguage, globalTranslations } from '~/composables/useLanguage'

const { t } = useLanguage()

defineEmits(['updateAnswer', 'toggleRecording'])

defineProps<{
  mode: string
  currentAnswer: string
  isRecording: boolean
  transcript: string
}>()
</script>

<style scoped>
.written-answer {
  margin-bottom: 2rem;
}

.answer-textarea {
  width: 100%;
  padding: 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  line-height: 1.6;
  resize: vertical;
  font-family: inherit;
}

.answer-textarea:focus {
  outline: none;
  border-color: #0097b2;
  box-shadow: 0 0 0 3px rgba(0, 151, 178, 0.1);
}

.oral-answer {
  margin-bottom: 2rem;
}

.recording-controls {
  text-align: center;
  margin-bottom: 1.5rem;
}

.recording-button {
  padding: 1rem 2rem;
  background: #0097b2;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
}

.recording-button:hover {
  background: #007a8e;
}

.recording-button.recording {
  background: #ef4444;
}

.recording-button.recording:hover {
  background: #dc2626;
}

.recording-indicator {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.pulse-dot {
  width: 8px;
  height: 8px;
  background: #ffffff;
  border-radius: 50%;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.transcript-area {
  background: #f8fafc;
  padding: 1.5rem;
  border-radius: 8px;
  border: 2px solid #e5e7eb;
}

.transcript-area h4 {
  margin: 0 0 1rem 0;
  color: #374151;
  font-size: 1rem;
}

.transcript-text {
  background: #ffffff;
  padding: 1rem;
  border-radius: 4px;
  border: 1px solid #d1d5db;
  margin-bottom: 1rem;
  min-height: 3rem;
  color: #6b7280;
  font-style: italic;
}

.transcript-editor {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 0.875rem;
  line-height: 1.5;
  resize: vertical;
  font-family: inherit;
}

.transcript-editor:focus {
  outline: none;
  border-color: #0097b2;
  box-shadow: 0 0 0 2px rgba(0, 151, 178, 0.1);
}
</style>