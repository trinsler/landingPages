<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="max-w-md w-full space-y-8">
      <div class="text-center">
        <div v-if="loading" class="space-y-4">
          <div class="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
          <h2 class="text-xl font-semibold text-gray-900">Processing payment...</h2>
          <p class="text-gray-600">Please wait while we verify your transaction.</p>
        </div>

        <div v-else-if="error" class="space-y-4">
          <div class="mx-auto h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
            <svg class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
          </div>
          <h2 class="text-xl font-semibold text-gray-900">Payment verification failed</h2>
          <p class="text-gray-600">{{ error }}</p>
          <div class="space-y-2">
            <button
              @click="handleRetry"
              class="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              Try again
            </button>
            <NuxtLink
              to="/shop"
              class="block w-full bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md text-sm font-medium text-center"
            >
              Back to shop
            </NuxtLink>
          </div>
        </div>

        <div v-else-if="success" class="space-y-6">
          <!-- Success Animation -->
          <div class="relative">
            <div class="mx-auto h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
              <svg class="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <!-- Confetti effect placeholder -->
            <div class="absolute inset-0 pointer-events-none">
              <div class="confetti-animation"></div>
            </div>
          </div>

          <div class="space-y-2">
            <h2 class="text-2xl font-bold text-gray-900">Payment Successful! 🎉</h2>
            <p class="text-gray-600">Your coins have been added to your account.</p>
          </div>

          <!-- Coin Balance Update -->
          <div v-if="coinsAdded" class="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
            <div class="flex items-center justify-center space-x-2">
              <svg class="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2L3 7v11h14V7l-7-5z"/>
              </svg>
              <span class="text-lg font-semibold text-yellow-800">+{{ coinsAdded }} Coins Added!</span>
            </div>
            <p class="text-sm text-yellow-700 text-center mt-2">
              New balance: {{ authStore.coinBalance }} coins
            </p>
          </div>

          <!-- Action Buttons -->
          <div class="space-y-3">
            <NuxtLink
              to="/dashboard"
              class="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium text-center block"
            >
              View Dashboard
            </NuxtLink>
            
            <NuxtLink
              to="/shop"
              class="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-medium text-center block"
            >
              Buy More Coins
            </NuxtLink>
          </div>

          <!-- Transaction Details -->
          <div v-if="transactionId" class="text-xs text-gray-500 text-center">
            Transaction ID: {{ transactionId }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default',
  middleware: 'auth'
})

const route = useRoute()
const authStore = useAuthStore()
const shopStore = useShopStore()

const loading = ref(true)
const error = ref<string | null>(null)
const success = ref(false)
const coinsAdded = ref(0)
const transactionId = ref<string | null>(null)

const handlePaymentSuccess = async () => {
  const sessionId = route.query.session_id as string
  
  if (!sessionId) {
    error.value = 'No session ID provided'
    loading.value = false
    return
  }

  try {
    const result = await shopStore.handlePaymentSuccess(sessionId)
    
    if (result.success) {
      success.value = true
      coinsAdded.value = result.coins
      transactionId.value = (result as any)?.transactionId || null
      
      // Refresh user profile to get updated coin balance
      if (authStore.user) {
        await authStore.fetchUserProfile(authStore.user.id)
      }
    } else {
      error.value = result.message || 'Payment verification failed'
    }
  } catch (err) {
    console.error('Payment verification error:', err)
    error.value = err instanceof Error ? err.message : 'An unexpected error occurred'
  } finally {
    loading.value = false
  }
}

const handleRetry = () => {
  loading.value = true
  error.value = null
  handlePaymentSuccess()
}

// Process payment on mount
onMounted(() => {
  handlePaymentSuccess()
})
</script>

<style scoped>
.confetti-animation {
  position: absolute;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, transparent 20%, rgba(255, 215, 0, 0.3) 40%, transparent 60%);
  animation: confetti 2s ease-out;
}

@keyframes confetti {
  0% {
    transform: scale(0) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: scale(2) rotate(360deg);
    opacity: 0;
  }
}
</style>