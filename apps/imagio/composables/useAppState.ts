import { ref, computed } from 'vue'

export interface LoadingState {
  id: string
  message: string
  progress?: number
  startTime: Date
}

export interface ToastMessage {
  id: string
  message: string
  type: 'success' | 'error' | 'warning' | 'info'
  duration?: number
  persistent?: boolean
  timestamp: Date
}

// Global app state
const loadingStates = ref<LoadingState[]>([])
const toasts = ref<ToastMessage[]>([])
const networkStatus = ref<'online' | 'offline'>('online')
const appVersion = ref('1.0.0')

export const useAppState = () => {
  // Loading state management
  const isGlobalLoading = computed(() => loadingStates.value.length > 0)
  
  const startLoading = (
    message: string = 'Wird geladen...', 
    id?: string,
    progress?: number
  ): string => {
    const loadingId = id || `loading_${Date.now()}_${Math.random()}`
    
    const loadingState: LoadingState = {
      id: loadingId,
      message,
      progress,
      startTime: new Date()
    }
    
    loadingStates.value.push(loadingState)
    return loadingId
  }

  const updateLoading = (id: string, message?: string, progress?: number) => {
    const state = loadingStates.value.find(s => s.id === id)
    if (state) {
      if (message) state.message = message
      if (progress !== undefined) state.progress = progress
    }
  }

  const stopLoading = (id: string) => {
    const index = loadingStates.value.findIndex(s => s.id === id)
    if (index > -1) {
      loadingStates.value.splice(index, 1)
    }
  }

  const clearAllLoading = () => {
    loadingStates.value = []
  }

  // Toast/notification management
  const showToast = (
    message: string,
    type: ToastMessage['type'] = 'info',
    options: Partial<Pick<ToastMessage, 'duration' | 'persistent' | 'id'>> = {}
  ): string => {
    const toastId = options.id || `toast_${Date.now()}_${Math.random()}`
    
    const toast: ToastMessage = {
      id: toastId,
      message,
      type,
      duration: options.duration || (type === 'error' ? 8000 : 5000),
      persistent: options.persistent || false,
      timestamp: new Date()
    }

    toasts.value.push(toast)

    // Auto-remove non-persistent toasts
    if (!toast.persistent && toast.duration) {
      setTimeout(() => {
        removeToast(toastId)
      }, toast.duration)
    }

    return toastId
  }

  const removeToast = (id: string) => {
    const index = toasts.value.findIndex(t => t.id === id)
    if (index > -1) {
      toasts.value.splice(index, 1)
    }
  }

  const clearAllToasts = () => {
    toasts.value = []
  }

  // Convenience methods for different toast types
  const showSuccess = (message: string, options?: Partial<Pick<ToastMessage, 'duration' | 'persistent' | 'id'>>) =>
    showToast(message, 'success', options)

  const showError = (message: string, options?: Partial<Pick<ToastMessage, 'duration' | 'persistent' | 'id'>>) =>
    showToast(message, 'error', { ...options, duration: options?.duration || 8000 })

  const showWarning = (message: string, options?: Partial<Pick<ToastMessage, 'duration' | 'persistent' | 'id'>>) =>
    showToast(message, 'warning', options)

  const showInfo = (message: string, options?: Partial<Pick<ToastMessage, 'duration' | 'persistent' | 'id'>>) =>
    showToast(message, 'info', options)

  // Network status management
  const setNetworkStatus = (status: 'online' | 'offline') => {
    networkStatus.value = status
    
    if (status === 'offline') {
      showWarning('Keine Internetverbindung verfügbar', { persistent: true, id: 'offline-warning' })
    } else {
      // Just remove the offline warning, don't show success message
      removeToast('offline-warning')
      // showSuccess('Internetverbindung wiederhergestellt', { duration: 3000 })
    }
  }

  // Initialize network status monitoring
  if (typeof window !== 'undefined') {
    const updateNetworkStatus = () => {
      setNetworkStatus(navigator.onLine ? 'online' : 'offline')
    }

    window.addEventListener('online', updateNetworkStatus)
    window.addEventListener('offline', updateNetworkStatus)
    
    // Initial check
    updateNetworkStatus()
  }

  // Performance monitoring
  const performanceMetrics = ref({
    loadTime: 0,
    memoryUsage: 0,
    lastUpdate: new Date()
  })

  const updatePerformanceMetrics = () => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      performanceMetrics.value = {
        loadTime: Math.round(performance.now()),
        memoryUsage: (performance as any).memory?.usedJSHeapSize || 0,
        lastUpdate: new Date()
      }
    }
  }

  // Session management
  const sessionData = ref({
    startTime: new Date(),
    activityCount: 0,
    lastActivity: new Date()
  })

  const trackActivity = () => {
    sessionData.value.activityCount++
    sessionData.value.lastActivity = new Date()
  }

  const getSessionDuration = () => {
    return Date.now() - sessionData.value.startTime.getTime()
  }

  // Async operation wrapper with UI feedback
  const withLoadingState = async <T>(
    operation: () => Promise<T>,
    loadingMessage: string = 'Wird geladen...',
    successMessage?: string,
    errorMessage?: string
  ): Promise<T | null> => {
    const loadingId = startLoading(loadingMessage)
    
    try {
      const result = await operation()
      
      if (successMessage) {
        showSuccess(successMessage)
      }
      
      return result
    } catch (error) {
      const message = errorMessage || 
        (error instanceof Error ? error.message : 'Ein Fehler ist aufgetreten')
      showError(message)
      throw error
    } finally {
      stopLoading(loadingId)
    }
  }

  return {
    // Loading state
    loadingStates: computed(() => loadingStates.value),
    isGlobalLoading,
    startLoading,
    updateLoading,
    stopLoading,
    clearAllLoading,

    // Toast management
    toasts: computed(() => toasts.value),
    showToast,
    removeToast,
    clearAllToasts,
    showSuccess,
    showError,
    showWarning,
    showInfo,

    // Network & system state
    networkStatus: computed(() => networkStatus.value),
    setNetworkStatus,
    performanceMetrics: computed(() => performanceMetrics.value),
    updatePerformanceMetrics,

    // Session management
    sessionData: computed(() => sessionData.value),
    trackActivity,
    getSessionDuration,

    // Utilities
    withLoadingState,
    appVersion: computed(() => appVersion.value)
  }
}