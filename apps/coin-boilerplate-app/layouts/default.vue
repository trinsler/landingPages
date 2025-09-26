<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navigation -->
    <nav class="h-16 flex fixed w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50 shadow-sm">
      <div class="flex justify-between items-center h-full w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center">
          <NuxtLink to="/" class="flex items-center space-x-2">
            <div class="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-lg">C</span>
            </div>
            <span class="text-lg font-bold gradient-text">CoinApp</span>
          </NuxtLink>
        </div>

        <div class="flex items-center space-x-4">
            <template v-if="authStore.isAuthenticated && authStore.user">
              <!-- Coin Balance -->
              <Badge variant="secondary" class="flex items-center space-x-2">
                <svg class="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2L3 7v11h14V7l-7-5z" />
                </svg>
                <span class="font-semibold">{{ authStore.coinBalance }}</span>
                <span class="text-xs">Coins</span>
              </Badge>

              <!-- Navigation Links -->
              <Button
                variant="ghost"
                size="sm"
                as-child
              >
                <NuxtLink to="/shop">
                  Shop
                </NuxtLink>
              </Button>

              <!-- User Menu -->
              <div class="relative ml-3">
                <DropdownMenuRoot>
                  <DropdownMenuTrigger as-child>
                    <Button
                      variant="ghost"
                      size="icon"
                      class="rounded-full"
                    >
                      <img
                        class="h-8 w-8 rounded-full"
                        :src="authStore.user.avatar_url || '/default-avatar.png'"
                        :alt="authStore.user.full_name"
                      />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                    align="end"
                    class="w-56 rounded-md border bg-popover p-1 text-popover-foreground shadow-md"
                  >
                    <div class="px-2 py-1.5 text-sm font-semibold">
                      {{ authStore.user.full_name }}
                    </div>
                    <div class="px-2 py-1.5 text-xs text-muted-foreground">
                      {{ authStore.user.email }}
                    </div>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem as-child>
                      <NuxtLink
                        to="/dashboard"
                        class="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                      >
                        Dashboard
                      </NuxtLink>
                    </DropdownMenuItem>

                    <DropdownMenuItem as-child>
                      <button
                        class="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 w-full"
                        @click="handleSignOut"
                      >
                        Sign out
                      </button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenuRoot>
              </div>
            </template>

            <template v-else>
              <Button
                variant="default"
                size="sm"
                :disabled="authStore.loading"
                @click="handleSignIn"
              >
                <span v-if="authStore.loading">Signing in...</span>
                <span v-else>Sign in with Google</span>
              </Button>
            </template>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="pt-16">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="w-full py-6 px-4 md:px-6 border-t">
      <div class="flex flex-col sm:flex-row justify-between items-center max-w-7xl mx-auto">
        <p class="text-xs text-muted-foreground">2024 CoinApp</p>
        <div class="flex gap-4 sm:gap-6 mt-4 sm:mt-0">
          <NuxtLink class="text-xs hover:text-primary transition-colors" to="/privacy">
            Privacy
          </NuxtLink>
          <NuxtLink class="text-xs hover:text-primary transition-colors" to="/terms">
            Terms
          </NuxtLink>
          <NuxtLink class="text-xs hover:text-primary transition-colors" to="/impressum">
            Impressum
          </NuxtLink>
        </div>
        <div class="text-xs text-muted-foreground mt-4 sm:mt-0">
          Powered by <a href="https://trinsler.com" class="hover:text-primary transition-colors">trinsler</a>
        </div>
      </div>
    </footer>

    <!-- Toast Notifications -->
    <div id="toast-container" class="fixed top-4 right-4 z-50 space-y-2">
      <!-- Toast notifications will be dynamically added here -->
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  DropdownMenuRoot,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from 'radix-vue'
import { Button, Badge } from '~/components/ui'

const authStore = useAuthStore()

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
