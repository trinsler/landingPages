<template>
  <div class="bg-gray-50 min-h-screen py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p class="mt-2 text-gray-600">Welcome back, {{ authStore.user?.full_name }}!</p>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <!-- Coin Balance -->
        <Card>
          <CardContent class="p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  <svg class="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2L3 7v11h14V7l-7-5z" />
                  </svg>
                </div>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-muted-foreground truncate">Current Balance</dt>
                  <dd class="text-2xl font-semibold">
                    {{ authStore.coinBalance }} Coins
                  </dd>
                </dl>
              </div>
            </div>
          </CardContent>
        </Card>

        <!-- Total Spent -->
        <Card>
          <CardContent class="p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <svg
                    class="w-5 h-5 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                    />
                  </svg>
                </div>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-muted-foreground truncate">Total Spent</dt>
                  <dd class="text-2xl font-semibold">€{{ totalSpent.toFixed(2) }}</dd>
                </dl>
              </div>
            </div>
          </CardContent>
        </Card>

        <!-- Total Purchases -->
        <Card>
          <CardContent class="p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg
                    class="w-5 h-5 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                    />
                  </svg>
                </div>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-muted-foreground truncate">Total Purchases</dt>
                  <dd class="text-2xl font-semibold">
                    {{ completedPurchases.length }}
                  </dd>
                </dl>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <!-- Quick Actions -->
      <Card class="mb-8">
        <CardHeader>
          <CardTitle class="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Button variant="outline" as-child class="p-4 h-auto justify-start">
              <NuxtLink to="/shop" class="flex items-center">
                <div class="flex-shrink-0">
                  <svg
                    class="w-6 h-6 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                    />
                  </svg>
                </div>
                <div class="ml-4">
                  <h3 class="text-sm font-medium">Buy More Coins</h3>
                  <p class="text-sm text-muted-foreground">Browse coin packages</p>
                </div>
              </NuxtLink>
            </Button>

            <Button
              :disabled="loading"
              variant="outline"
              class="p-4 h-auto justify-start"
              @click="refreshBalance"
            >
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <svg
                    class="w-6 h-6 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                    />
                  </svg>
                </div>
                <div class="ml-4">
                  <h3 class="text-sm font-medium">Refresh Balance</h3>
                  <p class="text-sm text-muted-foreground">Update coin count</p>
                </div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      <!-- Transaction History -->
      <Card>
        <CardHeader>
          <CardTitle class="text-lg">Transaction History</CardTitle>
        </CardHeader>

        <CardContent v-if="loading" class="text-center">
          <div
            class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"
          />
          <p class="mt-2 text-sm text-muted-foreground">Loading transactions...</p>
        </CardContent>

        <CardContent v-else-if="shopStore.transactions.length === 0" class="text-center">
          <svg
            class="mx-auto h-12 w-12 text-muted-foreground"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H6.911a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661z"
            />
          </svg>
          <h3 class="mt-2 text-sm font-medium">No transactions yet</h3>
          <p class="mt-1 text-sm text-muted-foreground">Start by purchasing your first coin package!</p>
          <div class="mt-6">
            <Button as-child>
              <NuxtLink to="/shop">
                Browse Packages
              </NuxtLink>
            </Button>
          </div>
        </CardContent>

        <div v-else class="overflow-hidden">
          <table class="min-w-full divide-y divide-border">
            <thead class="bg-muted/50">
              <tr>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
                >
                  Date
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
                >
                  Type
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
                >
                  Amount
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
                >
                  Coins
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
                >
                  Status
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-border">
              <tr v-for="transaction in shopStore.transactions" :key="transaction.id">
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                  {{ new Date(transaction.created_at).toLocaleDateString() }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground capitalize">
                  {{ transaction.type }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  €{{ transaction.amount.toFixed(2) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {{ transaction.coins }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                    :class="{
                      'bg-green-100 text-green-800': transaction.status === 'completed',
                      'bg-yellow-100 text-yellow-800': transaction.status === 'pending',
                      'bg-red-100 text-red-800': transaction.status === 'failed',
                    }"
                  >
                    {{ transaction.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Button, Card, CardHeader, CardTitle, CardContent } from '~/components/ui'
import type { Transaction } from '~/types'

definePageMeta({
  layout: 'default',
  middleware: 'auth',
})

const authStore = useAuthStore()
const shopStore = useShopStore()

const loading = ref(false)

const totalSpent = computed(() => {
  return shopStore.transactions
    .filter((t: Transaction) => t.type === 'purchase' && t.status === 'completed')
    .reduce((sum: number, t: Transaction) => sum + t.amount, 0)
})

const completedPurchases = computed(() => {
  return shopStore.transactions.filter(
    (t: Transaction) => t.type === 'purchase' && t.status === 'completed'
  )
})

const refreshBalance = async () => {
  if (!authStore.user) return

  loading.value = true
  try {
    await authStore.fetchUserProfile(authStore.user.id)
  } catch (error) {
    console.error('Error refreshing balance:', error)
  } finally {
    loading.value = false
  }
}

// Fetch data on mount
onMounted(async () => {
  loading.value = true
  try {
    await shopStore.fetchTransactions()
  } finally {
    loading.value = false
  }
})
</script>
