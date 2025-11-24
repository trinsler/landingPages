<template>
  <div>
    <div v-if="hasError" class="error-boundary">
      <div class="error-boundary-content">
        <div class="error-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        </div>
        
        <h2 class="error-title">
          {{ errorTitle }}
        </h2>
        
        <p class="error-message">
          {{ errorMessage }}
        </p>
        
        <div v-if="showDetails && errorDetails" class="error-details">
          <details>
            <summary>Technische Details</summary>
            <pre class="error-stack">{{ errorDetails }}</pre>
          </details>
        </div>
        
        <div class="error-actions">
          <button 
            @click="retry"
            class="retry-button"
            :disabled="isRetrying"
          >
            {{ isRetrying ? 'Wird wiederholt...' : 'Erneut versuchen' }}
          </button>
          
          <button 
            @click="reportError"
            class="report-button"
          >
            Fehler melden
          </button>
          
          <button 
            v-if="showReload"
            @click="reloadPage"
            class="reload-button"
          >
            Seite neu laden
          </button>
        </div>
        
        <div v-if="showFallback && fallbackContent" class="fallback-content">
          <h3>Alternative Ansicht</h3>
          <component :is="fallbackContent" v-bind="fallbackProps" />
        </div>
      </div>
    </div>
    
    <slot v-else />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onErrorCaptured, watch } from 'vue'
import { useErrorHandler } from '~/composables/useErrorHandler'
import { useAppState } from '~/composables/useAppState'

interface Props {
  fallbackComponent?: any
  fallbackProps?: Record<string, unknown>
  showDetails?: boolean
  showReload?: boolean
  showFallback?: boolean
  maxRetries?: number
  resetOnPropsChange?: boolean
  errorTitle?: string
  errorMessage?: string
}

const props = withDefaults(defineProps<Props>(), {
  fallbackComponent: undefined,
  fallbackProps: () => ({}),
  showDetails: false,
  showReload: true,
  showFallback: false,
  maxRetries: 3,
  resetOnPropsChange: true,
  errorTitle: 'Etwas ist schiefgelaufen',
  errorMessage: 'Es ist ein unerwarteter Fehler aufgetreten. Bitte versuchen Sie es erneut.'
})

const emit = defineEmits<{
  error: [error: Error, errorInfo: string]
  retry: [attempt: number]
  reset: []
}>()

const { handleError } = useErrorHandler()
const { showError } = useAppState()

// Error state
const hasError = ref(false)
const currentError = ref<Error | null>(null)
const errorInfo = ref<string>('')
const retryCount = ref(0)
const isRetrying = ref(false)
const errorId = ref<string>('')

// Computed properties
const errorDetails = computed(() => {
  if (!currentError.value) return ''
  
  return `${currentError.value.name}: ${currentError.value.message}\n\n${currentError.value.stack}`
})

const fallbackContent = computed(() => {
  return props.fallbackComponent || null
})

const canRetry = computed(() => {
  return retryCount.value < props.maxRetries
})

// Error boundary logic
onErrorCaptured((error: Error, instance: any, info: string) => {
  console.error('ErrorBoundary caught error:', error, info)
  
  // Set error state
  hasError.value = true
  currentError.value = error
  errorInfo.value = info
  errorId.value = `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  
  // Handle error through global error handler
  const appError = handleError(error, `ErrorBoundary: ${info}`, {
    showToast: false, // We'll show our own UI
    logError: true
  })
  
  // Emit error event
  emit('error', error, info)
  
  // Show toast for critical errors
  if (error.name === 'ChunkLoadError' || error.message.includes('Loading chunk')) {
    showError('Ein Teil der Anwendung konnte nicht geladen werden. Bitte laden Sie die Seite neu.', {
      persistent: true
    })
  }
  
  // Prevent error from propagating
  return false
})

// Reset error state when props change (if enabled)
watch(() => [props.fallbackComponent, props.fallbackProps], () => {
  if (props.resetOnPropsChange && hasError.value) {
    resetError()
  }
}, { deep: true })

// Methods
const retry = async () => {
  if (!canRetry.value || isRetrying.value) return
  
  isRetrying.value = true
  retryCount.value++
  
  emit('retry', retryCount.value)
  
  try {
    // Wait a bit before retrying
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Reset error state
    hasError.value = false
    currentError.value = null
    errorInfo.value = ''
    
    // Force re-render of child components
    await new Promise(resolve => setTimeout(resolve, 100))
    
  } catch (error) {
    console.error('Retry failed:', error)
  } finally {
    isRetrying.value = false
  }
}

const resetError = () => {
  hasError.value = false
  currentError.value = null
  errorInfo.value = ''
  retryCount.value = 0
  errorId.value = ''
  
  emit('reset')
}

const reportError = () => {
  if (!currentError.value) return
  
  // In production, send to error reporting service
  const errorReport = {
    error: {
      name: currentError.value.name,
      message: currentError.value.message,
      stack: currentError.value.stack
    },
    errorInfo: errorInfo.value,
    errorId: errorId.value,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    url: window.location.href,
    userId: 'anonymous', // Replace with actual user ID if available
    sessionId: sessionStorage.getItem('security-session-id') || 'unknown'
  }
  
  // Log for now - replace with actual error reporting service
  console.warn('Error Report:', errorReport)
  
  // Copy to clipboard for easy reporting
  if (navigator.clipboard) {
    navigator.clipboard.writeText(JSON.stringify(errorReport, null, 2))
      .then(() => {
        showError('Fehlerbericht in Zwischenablage kopiert. Bitte senden Sie diesen an den Support.', {
          duration: 5000
        })
      })
      .catch(() => {
        showError('Fehler konnte nicht kopiert werden. Bitte speichern Sie die Konsolen-Ausgabe.', {
          duration: 5000
        })
      })
  }
}

const reloadPage = () => {
  if (typeof window !== 'undefined') {
    window.location.reload()
  }
}

// Global error handlers for unhandled errors
if (typeof window !== 'undefined') {
  // Handle unhandled JavaScript errors
  window.addEventListener('error', (event) => {
    console.error('Unhandled error:', event.error)
    
    handleError(event.error || new Error(event.message), 'Global Error Handler', {
      showToast: true,
      logError: true
    })
  })
  
  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason)
    
    handleError(
      event.reason instanceof Error ? event.reason : new Error(String(event.reason)),
      'Unhandled Promise Rejection',
      {
        showToast: true,
        logError: true
      }
    )
    
    // Prevent default browser error handling
    event.preventDefault()
  })
  
  // Handle chunk loading errors (common in SPAs)
  window.addEventListener('error', (event) => {
    const target = event.target as HTMLElement
    
    if (target && (target.tagName === 'SCRIPT' || target.tagName === 'LINK')) {
      const resourceUrl = (target as any).src || (target as any).href
      
      if (resourceUrl) {
        console.error('Resource loading failed:', resourceUrl)
        
        handleError(
          new Error(`Failed to load resource: ${resourceUrl}`),
          'Resource Loading Error',
          {
            showToast: true,
            logError: true
          }
        )
      }
    }
  }, true) // Use capture phase to catch early
}

// Expose methods for parent components
defineExpose({
  resetError,
  retry,
  hasError,
  canRetry
})
</script>

<style scoped>
.error-boundary {
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background-color: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 8px;
  margin: 1rem 0;
}

.error-boundary-content {
  text-align: center;
  max-width: 500px;
  width: 100%;
}

.error-icon {
  color: #ef4444;
  margin-bottom: 1.5rem;
}

.error-icon svg {
  width: 48px;
  height: 48px;
  margin: 0 auto;
  display: block;
}

.error-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #991b1b;
  margin-bottom: 0.5rem;
}

.error-message {
  color: #7f1d1d;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.error-details {
  margin-bottom: 2rem;
  text-align: left;
}

.error-details summary {
  cursor: pointer;
  font-weight: 500;
  color: #991b1b;
  margin-bottom: 0.5rem;
}

.error-stack {
  background-color: #ffffff;
  border: 1px solid #fecaca;
  border-radius: 4px;
  padding: 1rem;
  font-size: 0.75rem;
  font-family: 'Monaco', 'Consolas', monospace;
  color: #7f1d1d;
  white-space: pre-wrap;
  word-break: break-all;
  max-height: 200px;
  overflow-y: auto;
}

.error-actions {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}

.retry-button, .report-button, .reload-button {
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
}

.retry-button {
  background-color: #ef4444;
  color: #ffffff;
}

.retry-button:hover:not(:disabled) {
  background-color: #dc2626;
}

.retry-button:disabled {
  background-color: #fca5a5;
  cursor: not-allowed;
}

.report-button {
  background-color: #6b7280;
  color: #ffffff;
}

.report-button:hover {
  background-color: #4b5563;
}

.reload-button {
  background-color: #0097b2;
  color: #ffffff;
}

.reload-button:hover {
  background-color: #007a8e;
}

.fallback-content {
  border-top: 1px solid #fecaca;
  padding-top: 2rem;
  text-align: left;
}

.fallback-content h3 {
  color: #991b1b;
  margin-bottom: 1rem;
  font-size: 1.125rem;
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .error-boundary {
    background-color: #450a0a;
    border-color: #991b1b;
  }
  
  .error-title {
    color: #fca5a5;
  }
  
  .error-message {
    color: #fecaca;
  }
  
  .error-details summary {
    color: #fca5a5;
  }
  
  .error-stack {
    background-color: #1f2937;
    border-color: #991b1b;
    color: #fecaca;
  }
  
  .fallback-content h3 {
    color: #fca5a5;
  }
}

/* Mobile optimizations */
@media (max-width: 640px) {
  .error-boundary {
    padding: 1rem;
    margin: 0.5rem 0;
  }
  
  .error-actions {
    flex-direction: column;
    align-items: stretch;
  }
  
  .retry-button, .report-button, .reload-button {
    width: 100%;
  }
  
  .error-stack {
    font-size: 0.7rem;
    max-height: 150px;
  }
}

/* Animation for retry button */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.retry-button:disabled {
  animation: pulse 1.5s infinite;
}
</style>