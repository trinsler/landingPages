<template>
  <Teleport to="body">
    <Transition
      name="loading-overlay"
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-300"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isVisible"
        class="loading-overlay"
        :class="{ 'loading-overlay--global': isGlobal }"
      >
        <div class="loading-content">
          <div class="loading-spinner">
            <div class="spinner-ring"></div>
            <div class="spinner-ring"></div>
            <div class="spinner-ring"></div>
          </div>
          
          <div v-if="currentMessage" class="loading-message">
            {{ currentMessage }}
          </div>
          
          <div
            v-if="hasProgress"
            class="loading-progress"
          >
            <div class="progress-bar">
              <div 
                class="progress-fill"
                :style="{ width: `${currentProgress}%` }"
              ></div>
            </div>
            <div class="progress-text">
              {{ Math.round(currentProgress) }}%
            </div>
          </div>
          
          <div v-if="showDuration" class="loading-duration">
            {{ formatDuration(elapsedTime) }}
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, ref, watch, onMounted, onUnmounted } from 'vue'
import { useAppState } from '~/composables/useAppState'

interface Props {
  show?: boolean
  message?: string
  progress?: number
  global?: boolean
  showDuration?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  show: false,
  message: '',
  progress: undefined,
  global: true,
  showDuration: false
})

const { loadingStates, isGlobalLoading } = useAppState()

const elapsedTime = ref(0)
let intervalId: number | null = null

// Computed properties
const isVisible = computed(() => {
  if (props.global) {
    return isGlobalLoading.value || props.show
  }
  return props.show
})

const isGlobal = computed(() => props.global)

const currentMessage = computed(() => {
  if (props.message) return props.message
  
  if (props.global && loadingStates.value.length > 0) {
    return loadingStates.value[loadingStates.value.length - 1].message
  }
  
  return 'Wird geladen...'
})

const currentProgress = computed(() => {
  if (props.progress !== undefined) return props.progress
  
  if (props.global && loadingStates.value.length > 0) {
    const latestState = loadingStates.value[loadingStates.value.length - 1]
    return latestState.progress || 0
  }
  
  return 0
})

const hasProgress = computed(() => {
  return currentProgress.value > 0 && currentProgress.value <= 100
})

// Duration tracking
const updateElapsedTime = () => {
  if (!isVisible.value) {
    elapsedTime.value = 0
    return
  }

  if (props.global && loadingStates.value.length > 0) {
    const latestState = loadingStates.value[loadingStates.value.length - 1]
    elapsedTime.value = Date.now() - latestState.startTime.getTime()
  } else if (props.show) {
    elapsedTime.value += 100
  }
}

const formatDuration = (ms: number): string => {
  const seconds = Math.floor(ms / 1000)
  if (seconds < 60) return `${seconds}s`
  
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}

// Lifecycle
watch(isVisible, (visible) => {
  if (visible && props.showDuration) {
    intervalId = window.setInterval(updateElapsedTime, 100)
  } else if (intervalId) {
    clearInterval(intervalId)
    intervalId = null
    elapsedTime.value = 0
  }
}, { immediate: true })

onMounted(() => {
  if (isVisible.value && props.showDuration) {
    intervalId = window.setInterval(updateElapsedTime, 100)
  }
})

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})
</script>

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(2px);
}

.loading-overlay--global {
  background-color: rgba(0, 0, 0, 0.5);
}

.loading-content {
  background: #ffffff;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  text-align: center;
  min-width: 200px;
  max-width: 400px;
}

.loading-spinner {
  position: relative;
  width: 60px;
  height: 60px;
  margin: 0 auto 1.5rem;
}

.spinner-ring {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 3px solid transparent;
  border-top: 3px solid #0097b2;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.spinner-ring:nth-child(2) {
  width: 80%;
  height: 80%;
  top: 10%;
  left: 10%;
  border-top-color: #00b4d8;
  animation-duration: 0.8s;
  animation-direction: reverse;
}

.spinner-ring:nth-child(3) {
  width: 60%;
  height: 60%;
  top: 20%;
  left: 20%;
  border-top-color: #0077be;
  animation-duration: 1.2s;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-message {
  color: #374151;
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 1rem;
  line-height: 1.5;
}

.loading-progress {
  margin-bottom: 1rem;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background-color: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #0097b2, #00b4d8);
  border-radius: 4px;
  transition: width 0.3s ease;
}

.progress-text {
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 500;
}

.loading-duration {
  font-size: 0.75rem;
  color: #9ca3af;
  font-family: 'Monaco', 'Consolas', monospace;
}

/* Animation classes for Transition */
.loading-overlay-enter-active,
.loading-overlay-leave-active {
  transition: opacity 0.3s ease;
}

.loading-overlay-enter-from,
.loading-overlay-leave-to {
  opacity: 0;
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .loading-content {
    background: #1f2937;
    color: #f9fafb;
  }

  .loading-message {
    color: #f9fafb;
  }

  .progress-bar {
    background-color: #374151;
  }
}

/* Mobile optimizations */
@media (max-width: 640px) {
  .loading-content {
    margin: 1rem;
    padding: 1.5rem;
    min-width: auto;
    max-width: calc(100% - 2rem);
  }

  .loading-spinner {
    width: 50px;
    height: 50px;
  }

  .loading-message {
    font-size: 0.9rem;
  }
}
</style>