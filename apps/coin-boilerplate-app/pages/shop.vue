<template>
  <div class="bg-gray-50 py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center">
        <h1 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Coin Packages
        </h1>
        <p class="mt-4 text-lg text-gray-600">
          Choose the perfect coin package for your needs
        </p>
      </div>

      <!-- Current Balance (if authenticated) -->
      <div v-if="authStore.isAuthenticated" class="mt-8 text-center">
        <div class="inline-flex items-center space-x-2 bg-white rounded-full px-6 py-3 shadow-sm">
          <svg class="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2L3 7v11h14V7l-7-5z"/>
          </svg>
          <span class="text-lg font-semibold text-gray-700">Current Balance:</span>
          <span class="text-xl font-bold text-indigo-600">{{ authStore.coinBalance }} Coins</span>
        </div>
      </div>

      <!-- Packages Grid -->
      <div class="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="pkg in shopStore.packages"
          :key="pkg.id"
          class="relative bg-white rounded-2xl shadow-sm border border-gray-200 p-8 hover:shadow-lg transition-shadow duration-200"
          :class="{ 'ring-2 ring-indigo-600 ring-opacity-50': pkg.popular }"
        >
          <!-- Popular Badge -->
          <div v-if="pkg.popular" class="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <span class="bg-indigo-600 text-white px-3 py-1 text-sm font-medium rounded-full">
              Most Popular
            </span>
          </div>

          <div class="text-center">
            <!-- Coin Icon -->
            <div class="w-16 h-16 mx-auto bg-yellow-100 rounded-full flex items-center justify-center mb-4">
              <svg class="w-8 h-8 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2L3 7v11h14V7l-7-5z"/>
              </svg>
            </div>

            <!-- Package Info -->
            <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ pkg.name }}</h3>
            <p class="text-gray-600 text-sm mb-4">{{ pkg.description }}</p>
            
            <!-- Price -->
            <div class="mb-6">
              <span class="text-3xl font-bold text-gray-900">€{{ pkg.price.toFixed(2) }}</span>
              <div class="text-sm text-gray-500 mt-1">
                {{ pkg.coins.toLocaleString() }} coins
              </div>
              <div class="text-xs text-gray-400 mt-1">
                €{{ (pkg.price / pkg.coins * 1000).toFixed(2) }} per 1000 coins
              </div>
            </div>

            <!-- Buy Button -->
            <button
              @click="handlePurchase(pkg.id)"
              :disabled="shopStore.processingPayment || !authStore.isAuthenticated"
              class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              :class="{ 'bg-indigo-700': pkg.popular }"
            >
              <span v-if="shopStore.processingPayment">Processing...</span>
              <span v-else-if="!authStore.isAuthenticated">Sign in to purchase</span>
              <span v-else>Buy {{ pkg.name }}</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Sign In Prompt -->
      <div v-if="!authStore.isAuthenticated" class="mt-12 text-center bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div class="max-w-md mx-auto">
          <h3 class="text-lg font-semibold text-gray-900 mb-2">
            Sign in to start purchasing
          </h3>
          <p class="text-gray-600 mb-6">
            Create an account with Google to securely purchase coin packages and track your balance.
          </p>
          <button
            @click="handleSignIn"
            :disabled="authStore.loading"
            class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="authStore.loading">Signing in...</span>
            <span v-else>Sign in with Google</span>
          </button>
        </div>
      </div>

      <!-- Recent Transactions -->
      <div v-if="authStore.isAuthenticated && shopStore.recentTransactions.length > 0" class="mt-16">
        <h2 class="text-xl font-semibold text-gray-900 mb-6">Recent Purchases</h2>
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div class="divide-y divide-gray-200">
            <div
              v-for="transaction in shopStore.recentTransactions"
              :key="transaction.id"
              class="p-4 flex items-center justify-between"
            >
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <svg class="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2L3 7v11h14V7l-7-5z"/>
                  </svg>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-900">
                    {{ transaction.coins }} coins purchased
                  </p>
                  <p class="text-xs text-gray-500">
                    {{ new Date(transaction.created_at).toLocaleDateString() }}
                  </p>
                </div>
              </div>
              <div class="text-right">
                <p class="text-sm font-medium text-gray-900">€{{ transaction.amount.toFixed(2) }}</p>
                <p class="text-xs text-gray-500 capitalize">{{ transaction.status }}</p>
              </div>
            </div>
          </div>
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
const shopStore = useShopStore()

const handleSignIn = async () => {
  try {
    await authStore.signInWithGoogle()
  } catch (error) {
    console.error('Sign in failed:', error)
  }
}

const handlePurchase = async (packageId: string) => {
  if (!authStore.isAuthenticated) {
    await handleSignIn()
    return
  }

  try {
    await shopStore.createPaymentSession(packageId, 'stripe')
  } catch (error) {
    console.error('Purchase failed:', error)
    // Show error toast
  }
}

// Fetch transactions on mount if authenticated
onMounted(async () => {
  if (authStore.isAuthenticated) {
    await shopStore.fetchTransactions()
  }
})

// Watch for authentication changes
watch(() => authStore.isAuthenticated, async (isAuthenticated) => {
  if (isAuthenticated) {
    await shopStore.fetchTransactions()
  }
})
</script>