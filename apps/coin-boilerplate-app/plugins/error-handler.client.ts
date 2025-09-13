import { useToast } from '@monorepo/ui'

export default defineNuxtPlugin(() => {
  const { error: showErrorToast } = useToast()

  // Global error handler for unhandled promises
  window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason)
    showErrorToast(
      'An unexpected error occurred. Please try again.',
      'Error',
      { persistent: false }
    )
    
    // Prevent the default browser error handling
    event.preventDefault()
  })

  // Global error handler for JavaScript errors
  window.addEventListener('error', (event) => {
    console.error('Global error:', event.error)
    showErrorToast(
      'A technical error occurred. Please refresh the page.',
      'Error',
      { persistent: false }
    )
  })

  // Handle network errors specifically
  const handleNetworkError = (error: any) => {
    if (error?.cause?.code === 'NETWORK_ERROR' || error?.message?.includes('fetch')) {
      showErrorToast(
        'Network connection issue. Please check your internet connection.',
        'Connection Error',
        { duration: 7000 }
      )
    } else if (error?.status === 401) {
      showErrorToast(
        'Your session has expired. Please sign in again.',
        'Authentication Required',
        { duration: 7000 }
      )
    } else if (error?.status >= 500) {
      showErrorToast(
        'Server error. Please try again later.',
        'Server Error',
        { duration: 7000 }
      )
    } else {
      showErrorToast(
        error?.message || 'An unexpected error occurred.',
        'Error',
        { duration: 5000 }
      )
    }
  }

  // Provide global error handler
  return {
    provide: {
      handleError: handleNetworkError
    }
  }
})