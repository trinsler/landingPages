<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navigation -->
    <nav class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <NuxtLink to="/" class="flex items-center space-x-2">
              <div class="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <span class="text-white font-bold text-lg">C</span>
              </div>
              <span class="text-xl font-bold text-gray-900">CoinApp</span>
            </NuxtLink>
          </div>

          <div class="flex items-center space-x-4">
            <template v-if="authStore.isAuthenticated && authStore.user">
              <!-- Coin Balance -->
              <div class="flex items-center space-x-2 bg-gray-100 rounded-full px-3 py-1">
                <svg class="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2L3 7v11h14V7l-7-5z" />
                </svg>
                <span class="font-semibold text-gray-700">{{ authStore.coinBalance }}</span>
                <span class="text-sm text-gray-500">Coins</span>
              </div>

              <!-- Navigation Links -->
              <NuxtLink
                to="/shop"
                class="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Shop
              </NuxtLink>

              <NuxtLink
                to="/contact"
                class="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Kontakt
              </NuxtLink>

              <!-- User Menu -->
              <div class="relative ml-3">
                <HeadlessMenu as="div" class="relative inline-block text-left">
                  <div>
                    <HeadlessMenuButton
                      class="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <img
                        class="h-8 w-8 rounded-full"
                        :src="authStore.user.avatar_url || '/default-avatar.png'"
                        :alt="authStore.user.full_name"
                      />
                    </HeadlessMenuButton>
                  </div>

                  <transition
                    enter-active-class="transition ease-out duration-100"
                    enter-from-class="transform opacity-0 scale-95"
                    enter-to-class="transform opacity-100 scale-100"
                    leave-active-class="transition ease-in duration-75"
                    leave-from-class="transform opacity-100 scale-100"
                    leave-to-class="transform opacity-0 scale-95"
                  >
                    <HeadlessMenuItems
                      class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    >
                      <HeadlessMenuItem>
                        <div class="px-4 py-2 text-sm text-gray-700 border-b">
                          <p class="font-medium">{{ authStore.user.full_name }}</p>
                          <p class="text-gray-500">{{ authStore.user.email }}</p>
                        </div>
                      </HeadlessMenuItem>

                      <HeadlessMenuItem>
                        <NuxtLink
                          to="/dashboard"
                          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Dashboard
                        </NuxtLink>
                      </HeadlessMenuItem>

                      <HeadlessMenuItem>
                        <button
                          class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          @click="handleSignOut"
                        >
                          Sign out
                        </button>
                      </HeadlessMenuItem>
                    </HeadlessMenuItems>
                  </transition>
                </HeadlessMenu>
              </div>
            </template>

            <template v-else>
              <button
                :disabled="authStore.loading"
                class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                @click="openAuthModal"
              >
                <span v-if="authStore.loading">Signing in...</span>
                <span v-else>Anmelden</span>
              </button>
            </template>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main>
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-white border-t border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <!-- Company Info -->
          <div class="md:col-span-1">
            <div class="flex items-center space-x-2 mb-4">
              <div class="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <span class="text-white font-bold text-lg">C</span>
              </div>
              <span class="text-xl font-bold text-gray-900">CoinApp</span>
            </div>
            <p class="text-gray-600 text-sm">
              Secure digital coin platform with OAuth and Stripe integration.
            </p>
          </div>

          <!-- Navigation -->
          <div>
            <h3 class="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Navigation
            </h3>
            <ul class="space-y-3">
              <li>
                <NuxtLink to="/" class="text-gray-600 hover:text-indigo-600 text-sm transition-colors">
                  Home
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/shop" class="text-gray-600 hover:text-indigo-600 text-sm transition-colors">
                  Shop
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/dashboard" class="text-gray-600 hover:text-indigo-600 text-sm transition-colors">
                  Dashboard
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/contact" class="text-gray-600 hover:text-indigo-600 text-sm transition-colors">
                  Kontakt
                </NuxtLink>
              </li>
            </ul>
          </div>

          <!-- Legal -->
          <div>
            <h3 class="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Legal
            </h3>
            <ul class="space-y-3">
              <li>
                <NuxtLink to="/impressum" class="text-gray-600 hover:text-indigo-600 text-sm transition-colors">
                  Impressum
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/datenschutz" class="text-gray-600 hover:text-indigo-600 text-sm transition-colors">
                  Datenschutz
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/agb" class="text-gray-600 hover:text-indigo-600 text-sm transition-colors">
                  AGB
                </NuxtLink>
              </li>
            </ul>
          </div>

          <!-- Contact -->
          <div>
            <h3 class="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Kontakt
            </h3>
            <div class="space-y-3">
              <p class="text-gray-600 text-sm">
                E-Mail: info.trinsler@gmail.com
              </p>
              <p class="text-gray-600 text-sm">
                Powered by <a href="https://trinsler.com" target="_blank" class="text-indigo-600 hover:text-indigo-500 transition-colors">Trinsler</a>
              </p>
            </div>
          </div>
        </div>

        <!-- Bottom Section -->
        <div class="mt-8 pt-8 border-t border-gray-200">
          <div class="flex flex-col md:flex-row justify-between items-center">
            <p class="text-gray-500 text-sm">
              &copy; 2025 CoinApp. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>

    <!-- Auth Modal -->
    <AuthModal
      :is-open="showAuthModal"
      mode="login"
      @close="closeAuthModal"
      @success="handleAuthSuccess"
    />

    <!-- Toast Notifications -->
    <div id="toast-container" class="fixed top-4 right-4 z-50 space-y-2">
      <!-- Toast notifications will be dynamically added here -->
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Menu as HeadlessMenu,
  MenuButton as HeadlessMenuButton,
  MenuItems as HeadlessMenuItems,
  MenuItem as HeadlessMenuItem,
} from '@headlessui/vue'
import { useToast } from '@monorepo/ui'

const authStore = useAuthStore()
const { success } = useToast()

// Auth Modal state
const showAuthModal = ref(false)

const openAuthModal = () => {
  showAuthModal.value = true
}

const closeAuthModal = () => {
  showAuthModal.value = false
}

const handleAuthSuccess = () => {
  success('Erfolgreich angemeldet!')
}

const handleSignIn = async () => {
  try {
    await authStore.signInWithGoogle()
  } catch (error) {
    console.error('Sign in failed:', error)
    // Show error toast
  }
}

const handleSignOut = async () => {
  try {
    await authStore.signOut()
  } catch (error) {
    console.error('Sign out failed:', error)
    // Show error toast
  }
}
</script>
