<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div class="text-center">
        <!-- Cancelled Icon -->
        <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
          <X class="h-6 w-6 text-red-600" />
        </div>

        <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
          Payment Cancelled
        </h2>

        <p class="mt-2 text-sm text-gray-600">
          Your payment was cancelled. No charges were made to your account.
        </p>
      </div>

      <div class="mt-8 space-y-4">
        <div class="bg-yellow-50 border border-yellow-200 rounded-md p-4">
          <div class="flex">
            <div class="shrink-0">
              <TriangleAlert class="h-5 w-5 text-yellow-400" />
            </div>
            <div class="ml-3">
              <h3 class="text-sm font-medium text-yellow-800">
                Transaction Cancelled
              </h3>
              <div class="mt-2 text-sm text-yellow-700">
                <p>
                  You can try again anytime or choose a different payment method.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="space-y-3">
          <NuxtLink
            to="/shop"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Try Again
          </NuxtLink>

          <NuxtLink
            to="/"
            class="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Go Home
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { X, TriangleAlert } from 'lucide-vue-next'

// Set page title
useHead({
  title: 'Payment Cancelled'
})
</script>