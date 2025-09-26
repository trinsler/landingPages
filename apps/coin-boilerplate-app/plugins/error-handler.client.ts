export default defineNuxtPlugin(() => {
  // Global error handler for unhandled promises
  window.addEventListener('unhandledrejection', event => {
    console.error('Unhandled promise rejection:', event.reason)
    // Prevent the default browser error handling
    event.preventDefault()
  })

  // Global error handler for JavaScript errors
  window.addEventListener('error', event => {
    console.error('Global error:', event.error)
  })

  // Handle network errors specifically
  const handleNetworkError = (error: Error & { cause?: { code?: string }; status?: number }) => {
    if (error?.cause?.code === 'NETWORK_ERROR' || error?.message?.includes('fetch')) {
      console.error('Network connection issue:', error)
    } else if (error?.status === 401) {
      console.error('Authentication error:', error)
    } else if (error?.status && error.status >= 500) {
      console.error('Server error:', error)
    } else {
      console.error('Unexpected error:', error)
    }
  }

  // Provide global error handler
  return {
    provide: {
      handleError: handleNetworkError,
    },
  }
})