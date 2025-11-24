import { ref } from 'vue'

export interface AppError {
  message: string
  code: string
  timestamp: Date
  stack?: string
  context?: Record<string, unknown>
}

interface ErrorConfig {
  showToast?: boolean
  logError?: boolean
  fallbackMessage?: string
}

// Global error state
const globalErrors = ref<AppError[]>([])
const isLoading = ref(false)

export const useErrorHandler = () => {
  const errors = ref<AppError[]>([])
  const currentError = ref<AppError | null>(null)

  const createError = (
    message: string, 
    code: string = 'UNKNOWN_ERROR', 
    context?: Record<string, unknown>
  ): AppError => {
    return {
      message,
      code,
      timestamp: new Date(),
      stack: new Error().stack,
      context
    }
  }

  const addError = (error: AppError, config: ErrorConfig = {}) => {
    const {
      showToast = true,
      logError = true,
      fallbackMessage = 'Ein unerwarteter Fehler ist aufgetreten'
    } = config

    // Add to local errors
    errors.value.push(error)
    currentError.value = error

    // Add to global errors
    globalErrors.value.push(error)

    // Log error for debugging
    if (logError) {
      console.error(`[${error.code}] ${error.message}`, {
        timestamp: error.timestamp,
        context: error.context,
        stack: error.stack
      })
    }

    // Show user-friendly toast (implement toast system later)
    if (showToast && typeof window !== 'undefined') {
      // For now, just log to console - replace with toast system later
      console.warn('User Error:', error.message)
    }

    return error
  }

  const handleError = (
    error: unknown, 
    context: string = 'Unknown',
    config: ErrorConfig = {}
  ): AppError => {
    let appError: AppError

    if (error instanceof Error) {
      appError = createError(
        error.message,
        error.name || 'JAVASCRIPT_ERROR',
        { context, originalError: error.message }
      )
    } else if (typeof error === 'string') {
      appError = createError(
        error,
        'STRING_ERROR',
        { context }
      )
    } else {
      appError = createError(
        'Ein unbekannter Fehler ist aufgetreten',
        'UNKNOWN_ERROR',
        { context, originalError: String(error) }
      )
    }

    return addError(appError, config)
  }

  const clearErrors = () => {
    errors.value = []
    currentError.value = null
  }

  const clearError = (error: AppError) => {
    const index = errors.value.findIndex(e => e.timestamp === error.timestamp)
    if (index > -1) {
      errors.value.splice(index, 1)
    }
    if (currentError.value?.timestamp === error.timestamp) {
      currentError.value = errors.value[errors.value.length - 1] || null
    }
  }

  const withErrorHandling = async <T>(
    operation: () => Promise<T>,
    context: string,
    config: ErrorConfig = {}
  ): Promise<T | null> => {
    try {
      isLoading.value = true
      const result = await operation()
      return result
    } catch (error) {
      handleError(error, context, config)
      return null
    } finally {
      isLoading.value = false
    }
  }

  const retryOperation = async <T>(
    operation: () => Promise<T>,
    maxRetries: number = 3,
    delay: number = 1000,
    context: string = 'Retry Operation'
  ): Promise<T | null> => {
    let lastError: unknown

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await operation()
      } catch (error) {
        lastError = error
        
        if (attempt === maxRetries) {
          handleError(error, `${context} (Final attempt ${attempt}/${maxRetries})`)
          break
        }

        // Wait before retry
        await new Promise(resolve => setTimeout(resolve, delay * attempt))
        
        console.warn(`${context} - Attempt ${attempt}/${maxRetries} failed, retrying...`, error)
      }
    }

    return null
  }

  return {
    // State
    errors: errors.value,
    currentError,
    isLoading,
    globalErrors,

    // Methods
    createError,
    addError,
    handleError,
    clearErrors,
    clearError,
    withErrorHandling,
    retryOperation
  }
}

// Error boundary for Vue components
export const createErrorBoundary = (componentName: string) => {
  const { handleError } = useErrorHandler()

  return {
    errorCaptured(error: Error, instance: any, info: string) {
      handleError(error, `Component: ${componentName}`, {
        showToast: true,
        logError: true
      })

      // Return false to stop the error from propagating
      return false
    }
  }
}