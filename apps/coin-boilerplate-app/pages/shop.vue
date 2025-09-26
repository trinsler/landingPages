<template>
  <div class="min-h-screen bg-gradient-to-b from-background to-accent/10 py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">
          <span class="mr-3">🪙</span>Coin Packages
        </h1>
        <p class="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
          Choose the perfect coin package for your needs and start your digital journey today
        </p>
      </div>

      <!-- Current Balance (if authenticated) -->
      <div v-if="authStore.isAuthenticated" class="mb-12 text-center">
        <Card class="inline-block backdrop-blur-sm bg-card/90 shadow-lg border-primary/20">
          <CardContent class="px-8 py-4">
            <div class="flex items-center gap-3">
              <span class="text-2xl">💰</span>
              <div class="text-left">
                <p class="text-sm font-medium text-muted-foreground">Current Balance</p>
                <p class="text-2xl font-bold text-primary">{{ authStore.coinBalance }} Coins</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <!-- Packages Grid -->
      <div class="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <Card
          v-for="pkg in shopStore.packages"
          :key="pkg.id"
          :class="cn(
            'relative hover:shadow-2xl hover:scale-105 transition-all duration-300 backdrop-blur-sm bg-card/95',
            pkg.popular && 'ring-2 ring-primary shadow-xl border-primary/20'
          )"
        >
          <!-- Popular Badge -->
          <div v-if="pkg.popular" class="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
            <Badge variant="default" class="px-4 py-1 shadow-lg">
              <span class="mr-1">⭐</span>
              Most Popular
            </Badge>
          </div>

          <CardHeader class="text-center pb-2">
            <!-- Coin Icon -->
            <div
              class="w-20 h-20 mx-auto bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mb-6 shadow-lg"
            >
              <span class="text-3xl">🪙</span>
            </div>

            <CardTitle class="text-xl mb-2">{{ pkg.name }}</CardTitle>
            <CardDescription class="text-muted-foreground">{{ pkg.description }}</CardDescription>
          </CardHeader>

          <CardContent class="text-center pt-0">
            <!-- Price -->
            <div class="mb-8 p-4 bg-accent/30 rounded-lg border border-primary/10">
              <div class="text-4xl font-bold text-primary mb-2">€{{ pkg.price.toFixed(2) }}</div>
              <Badge variant="secondary" class="mb-2">
                <span class="mr-1">🪙</span>
                {{ pkg.coins.toLocaleString() }} coins
              </Badge>
              <div class="text-xs text-muted-foreground">
                €{{ ((pkg.price / pkg.coins) * 1000).toFixed(2) }} per 1000 coins
              </div>
            </div>

            <!-- Buy Button -->
            <Button
              :disabled="shopStore.processingPayment || !authStore.isAuthenticated"
              class="w-full"
              size="lg"
              :variant="pkg.popular ? 'default' : 'outline'"
              @click="handlePurchase(pkg.id)"
            >
              <span v-if="shopStore.processingPayment" class="inline-flex items-center">
                <span class="animate-spin mr-2">⏳</span>
                Processing...
              </span>
              <span v-else-if="!authStore.isAuthenticated" class="inline-flex items-center">
                <span class="mr-2">🔒</span>
                Sign in to purchase
              </span>
              <span v-else class="inline-flex items-center">
                <span class="mr-2">💳</span>
                Buy {{ pkg.name }}
              </span>
            </Button>
          </CardContent>
        </Card>
      </div>

      <!-- Sign In Prompt -->
      <div v-if="!authStore.isAuthenticated" class="mt-12">
        <Card class="max-w-md mx-auto text-center">
          <CardHeader>
            <CardTitle>Sign in to start purchasing</CardTitle>
            <CardDescription>
              Create an account with Google to securely purchase coin packages and track your balance.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              :disabled="authStore.loading"
              @click="handleSignIn"
            >
              <span v-if="authStore.loading">Signing in...</span>
              <span v-else>Sign in with Google</span>
            </Button>
          </CardContent>
        </Card>
      </div>

      <!-- Recent Transactions -->
      <div
        v-if="authStore.isAuthenticated && shopStore.recentTransactions.length > 0"
        class="mt-16"
      >
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
                    <path d="M10 2L3 7v11h14V7l-7-5z" />
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
                <p class="text-sm font-medium text-gray-900">
                  €{{ transaction.amount.toFixed(2) }}
                </p>
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
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent, Badge } from '~/components/ui'
import { cn } from '~/lib/utils'

definePageMeta({
  layout: 'default',
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
watch(
  () => authStore.isAuthenticated,
  async isAuthenticated => {
    if (isAuthenticated) {
      await shopStore.fetchTransactions()
    }
  }
)
</script>
