<template>
  <header class="px-6 lg:px-8 h-16 flex fixed w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50 shadow-sm">
    <div class="flex justify-between items-center h-full w-full">
      <div class="flex items-center">
        <NuxtLink class="flex items-center justify-center" to="/">
          <svg class="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"/>
          </svg>
          <span class="ml-2 text-lg font-bold gradient-text">BetterClassroom</span>
        </NuxtLink>
      </div>
      <div class="flex items-center gap-4">
        <nav class="hidden md:flex gap-4 sm:gap-6">
          <NuxtLink
            class="text-sm font-medium text-foreground hover:text-primary transition-colors"
            to="/"
            @click="scrollToSection('features')"
          >
            Funktionen
          </NuxtLink>
          <NuxtLink
            class="text-sm font-medium text-foreground hover:text-primary transition-colors"
            to="/"
            @click="scrollToSection('contact')"
          >
            Kontakt
          </NuxtLink>
        </nav>
        <BaseButton
          variant="ghost"
          size="sm"
          class="md:hidden"
          @click="isMenuOpen = !isMenuOpen"
        >
          <svg class="h-6 w-6 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </BaseButton>
      </div>
    </div>
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="isMenuOpen"
        class="absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-lg p-4 md:hidden"
      >
        <NuxtLink
          class="block py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
          to="/"
          @click="handleMobileMenuClick('features')"
        >
          Funktionen
        </NuxtLink>
        <NuxtLink
          class="block py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
          to="/"
          @click="handleMobileMenuClick('contact')"
        >
          Kontakt
        </NuxtLink>
      </div>
    </Transition>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { BaseButton } from '@monorepo/ui'

const isMenuOpen = ref(false)

const scrollToSection = (id) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

const handleMobileMenuClick = (sectionId) => {
  scrollToSection(sectionId)
  isMenuOpen.value = false
}
</script>