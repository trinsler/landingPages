<template>
  <div>
    <slot v-if="!hasError" />
    <div v-else class="min-h-screen flex items-center justify-center bg-gray-50">
      <div class="max-w-md w-full space-y-8 text-center">
        <div class="space-y-4">
          <div class="mx-auto h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
            <svg
              class="h-6 w-6 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              />
            </svg>
          </div>
          <h2 class="text-xl font-semibold text-gray-900">Something went wrong</h2>
          <p class="text-gray-600">{{ errorMessage }}</p>
          <div class="space-y-2">
            <button
              class="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              @click="handleRetry"
            >
              Try again
            </button>
            <NuxtLink
              to="/"
              class="block w-full bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md text-sm font-medium text-center"
            >
              Go home
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  fallback?: string
}

const props = withDefaults(defineProps<Props>(), {
  fallback: 'An unexpected error occurred. Please try again.',
})

const hasError = ref(false)
const errorMessage = ref(props.fallback)

const handleRetry = () => {
  hasError.value = false
  errorMessage.value = props.fallback
  // Optionally reload the page
  window.location.reload()
}

// Error handling for async operations
const handleError = (error: Error | unknown) => {
  console.error('Error caught by ErrorBoundary:', error)
  hasError.value = true
  errorMessage.value = error instanceof Error ? error.message : props.fallback
}

// Expose error handler to parent components
defineExpose({
  handleError,
})

// Global error handler
onErrorCaptured(error => {
  handleError(error)
  return false // Prevent error from propagating
})
</script>
