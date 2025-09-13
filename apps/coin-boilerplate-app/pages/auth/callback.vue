<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="max-w-md w-full space-y-8">
      <div class="text-center">
        <div v-if="loading" class="space-y-4">
          <div class="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
          <h2 class="text-xl font-semibold text-gray-900">Completing sign in...</h2>
          <p class="text-gray-600">Please wait while we set up your account.</p>
        </div>

        <div v-else-if="error" class="space-y-4">
          <div class="mx-auto h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
            <svg class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
          </div>
          <h2 class="text-xl font-semibold text-gray-900">Authentication failed</h2>
          <p class="text-gray-600">{{ error }}</p>
          <button
            @click="handleRetry"
            class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium"
          >
            Try again
          </button>
        </div>

        <div v-else class="space-y-4">
          <div class="mx-auto h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
            <svg class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <h2 class="text-xl font-semibold text-gray-900">Welcome!</h2>
          <p class="text-gray-600">You have been successfully signed in.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default'
})

const authStore = useAuthStore()
const user = useSupabaseUser()

const loading = ref(true)
const error = ref<string | null>(null)

const handleAuthCallback = async () => {
  try {
    // Wait for auth state to be determined
    await nextTick()
    
    if (user.value) {
      // Fetch user profile to update store
      await authStore.fetchUserProfile(user.value.id)
      
      // Redirect to dashboard or intended page
      await navigateTo('/dashboard')
    } else {
      // If no user after callback, there was an error
      error.value = 'Authentication failed. Please try again.'
    }
  } catch (err) {
    console.error('Auth callback error:', err)
    error.value = err instanceof Error ? err.message : 'An unexpected error occurred'
  } finally {
    loading.value = false
  }
}

const handleRetry = () => {
  navigateTo('/')
}

// Handle auth callback on mount
onMounted(async () => {
  // Give some time for auth state to settle
  setTimeout(handleAuthCallback, 1000)
})

// Watch for user changes
watch(user, (newUser) => {
  if (newUser && !loading.value) {
    navigateTo('/dashboard')
  }
}, { immediate: true })
</script>