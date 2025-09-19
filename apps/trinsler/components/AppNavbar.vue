<template>
  <nav class="fixed top-0 left-0 right-0 z-50 transition-all duration-300" 
       :class="[
         scrolled ? 'cyber-card shadow-2xl' : 'bg-transparent',
         'backdrop-blur-xl'
       ]">
    <div class="container-custom">
      <div class="flex justify-between items-center py-4 lg:py-6">
        <!-- Cyber Logo -->
        <div class="flex items-center">
          <NuxtLink to="/" class="group flex items-center space-x-3">
            <div class="relative">
              <div class="w-10 h-10 lg:w-12 lg:h-12 rounded-xl neon-card flex items-center justify-center group-hover:scale-110 transition-transform duration-300 animate-neon-flicker overflow-hidden">
                <img 
                  src="/assets/pictures/trinslerLogo.png" 
                  alt="Trinsler Logo" 
                  class="w-8 h-8 lg:w-10 lg:h-10 object-contain"
                />
              </div>
              <div class="absolute inset-0 rounded-xl bg-accent-neon  opacity-20"></div>
            </div>
            <div class="hidden sm:block">
              <span class="text-xl lg:text-2xl font-black text-white" 
                    style="font-family: 'Space Grotesk', sans-serif;">
                <span class="text-accent-neon">TRINS</span><span class="text-accent-cyan">LER</span>
              </span>
              <div class="text-xs font-medium text-accent-cyan">
                Web Development
              </div>
            </div>
          </NuxtLink>
        </div>
        
        <!-- Cyber Navigation -->
        <div class="hidden lg:flex items-center space-x-8">
          <NuxtLink 
            v-for="item in navigation" 
            :key="item.name"
            :to="item.href" 
            class="relative group font-medium transition-all duration-300 hover:scale-105 text-white/90 hover:text-accent-primary"
          >
            {{ item.name }}
            <div class="absolute bottom-0 left-0 w-0 h-0.5 bg-accent-primary group-hover:w-full transition-all duration-300"></div>
          </NuxtLink>
        </div>

        <!-- CTA & Mobile Menu -->
        <div class="flex items-center space-x-4">
          <!-- Cyber CTA -->
          <div class="hidden lg:flex items-center space-x-4">
            <NuxtLink
              to="/contact"
              class="btn-primary group relative overflow-hidden"
            >
              <span class="relative z-10">Projekt starten</span>
            </NuxtLink>
          </div>

          <!-- Cyber Mobile Menu Button -->
          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="lg:hidden relative w-10 h-10 rounded-xl neon-card transition-all duration-300 group"
            :class="[
              mobileMenuOpen ? 'rotate-90' : ''
            ]"
          >
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="w-5 h-5 relative">
                <span 
                  class="absolute h-0.5 w-5 transform transition-all duration-300 rounded-full bg-accent-neon"
                  :class="[
                    mobileMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-1'
                  ]"
                ></span>
                <span 
                  class="absolute h-0.5 w-5 transform transition-all duration-300 rounded-full bg-accent-cyan"
                  :class="[
                    mobileMenuOpen ? 'opacity-0' : 'opacity-100'
                  ]"
                ></span>
                <span 
                  class="absolute h-0.5 w-5 transform transition-all duration-300 rounded-full bg-accent-neon"
                  :class="[
                    mobileMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-1'
                  ]"
                ></span>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 transform -translate-y-4"
      enter-to-class="opacity-100 transform translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 transform translate-y-0"
      leave-to-class="opacity-0 transform -translate-y-4"
    >
      <div v-show="mobileMenuOpen" class="lg:hidden">
        <div class="glass-card border-t border-white/20 backdrop-blur-xl">
          <div class="container-custom py-6">
            <div class="space-y-4 mb-6">
              <NuxtLink 
                v-for="item in navigation" 
                :key="item.name"
                :to="item.href" 
                @click="mobileMenuOpen = false"
                class="block text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-200 py-2"
              >
                {{ item.name }}
              </NuxtLink>
            </div>
            
            <div class="space-y-3">
              <NuxtLink 
                to="/contact" 
                @click="mobileMenuOpen = false"
                class="btn-primary w-full text-center"
              >
                Strategy Call buchen
              </NuxtLink>
              <NuxtLink 
                to="/portfolio" 
                @click="mobileMenuOpen = false"
                class="btn-secondary w-full text-center"
              >
                Web-Projekte ansehen
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
// No icons needed

const mobileMenuOpen = ref(false)
const scrolled = ref(false)

const navigation = [
  { name: 'Services', href: '/services' },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'Team', href: '/team' },
  { name: 'Kontakt', href: '/contact' }
]

const handleScroll = () => {
  scrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>