<template>
  <!-- Floating Navigation Bar -->
  <nav 
    ref="navbar"
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out',
      scrolled ? 'py-2' : 'py-6',
      hidden ? '-translate-y-full' : 'translate-y-0'
    ]"
    style="backdrop-filter: blur(20px)"
    :style="navbarStyle"
  >
    <!-- Progress Bar -->
    <div 
      class="absolute top-0 left-0 h-1 transition-all duration-300 ease-out"
      style="background: #ffffff"
      :style="{ width: scrollProgress + '%' }"
    ></div>

    <div class="container-custom">
      <div class="flex items-center justify-between">
        <!-- Text Logo Only -->
        <NuxtLink 
          to="/" 
          class="flex items-center transition-all duration-300"
          :class="scrolled ? 'scale-95' : 'scale-100'"
        >
          <h1 
            class="font-bold transition-all duration-300"
            :class="scrolled ? 'text-lg' : 'text-xl'"
            style="color: #ffffff; font-family: 'Inter', system-ui, -apple-system, sans-serif"
          >
            Trinsler
          </h1>
        </NuxtLink>

        <!-- Desktop Navigation -->
        <div class="hidden lg:flex items-center space-x-1">
          <NuxtLink
            v-for="item in navigation"
            :key="item.name"
            :to="item.href"
            class="relative px-4 py-2 rounded-xl transition-all duration-300 group"
            :class="[
              scrolled ? 'text-white/80 hover:text-white' : 'text-white/90 hover:text-white',
              $route.path === item.href ? 'bg-white/20' : 'hover:bg-white/10'
            ]"
            style="font-family: 'Inter', system-ui, -apple-system, sans-serif"
          >
            {{ item.name }}
            <span 
              class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"
            ></span>
          </NuxtLink>
        </div>

        <!-- CTA Button -->
        <div class="hidden lg:block">
          <NuxtLink
            to="/contact"
            class="px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            :class="scrolled ? 'text-sm' : 'text-base'"
            style="background: #ffffff; color: #243463; font-family: 'Inter', system-ui, -apple-system, sans-serif"
          >
            Let's Connect
          </NuxtLink>
        </div>

        <!-- Mobile Menu Button -->
        <button
          @click="mobileMenuOpen = !mobileMenuOpen"
          class="lg:hidden relative w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-300"
          style="background: rgba(255, 255, 255, 0.1)"
        >
          <div class="w-6 h-5 relative flex flex-col justify-center">
            <span 
              v-for="i in 3"
              :key="i"
              class="absolute h-0.5 w-6 bg-white transition-all duration-300"
              :class="[
                i === 1 ? 'top-0' : i === 2 ? 'top-2' : 'top-4',
                mobileMenuOpen ? (i === 1 ? 'rotate-45 top-2' : i === 2 ? 'opacity-0' : '-rotate-45 top-2') : ''
              ]"
              style="transform-origin: center"
            ></span>
          </div>
        </button>
      </div>
    </div>

    <!-- Mobile Menu Overlay -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div 
        v-if="mobileMenuOpen"
        class="lg:hidden absolute top-full left-0 right-0 backdrop-blur-xl"
        style="background: rgba(36, 52, 99, 0.95); border-bottom: 1px solid rgba(255, 255, 255, 0.1)"
      >
        <div class="container-custom py-6">
          <div class="space-y-2">
            <NuxtLink
              v-for="item in navigation"
              :key="item.name"
              :to="item.href"
              @click="mobileMenuOpen = false"
              class="block px-4 py-3 rounded-xl transition-all duration-300 text-white/90 hover:text-white hover:bg-white/10"
              style="font-family: 'Inter', system-ui, -apple-system, sans-serif"
            >
              {{ item.name }}
            </NuxtLink>
          </div>
          <div class="mt-6 pt-6 border-t border-white/20">
            <NuxtLink
              to="/contact"
              @click="mobileMenuOpen = false"
              class="w-full px-6 py-3 rounded-xl font-semibold text-center transition-all duration-300 transform hover:scale-105"
              style="background: #ffffff; color: #243463; font-family: 'Inter', system-ui, -apple-system, sans-serif"
            >
              Let's Connect
            </NuxtLink>
          </div>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script setup>
// State management
const mobileMenuOpen = ref(false)
const scrolled = ref(false)
const hidden = ref(false)
const scrollProgress = ref(0)
const lastScrollY = ref(0)
const navbar = ref(null)

// Navigation items
const navigation = [
  { name: 'Services', href: '/services' },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

// Computed styles for navbar
const navbarStyle = computed(() => {
  const baseStyle = {
    background: scrolled.value 
      ? 'rgba(36, 52, 99, 0.85)' 
      : 'rgba(36, 52, 99, 0.6)',
    borderBottom: scrolled.value 
      ? '1px solid rgba(255, 255, 255, 0.1)' 
      : 'none',
    boxShadow: scrolled.value 
      ? '0 10px 30px rgba(0, 0, 0, 0.1)' 
      : 'none'
  }
  
  return baseStyle
})

// Scroll handling
const handleScroll = () => {
  const currentScrollY = window.scrollY
  
  // Calculate scroll progress
  const winScroll = document.documentElement.scrollTop || document.body.scrollTop
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
  scrollProgress.value = (winScroll / height) * 100
  
  // Determine if scrolled
  scrolled.value = currentScrollY > 50
  
  // Hide/show navbar based on scroll direction
  if (currentScrollY > lastScrollY.value && currentScrollY > 100) {
    // Scrolling down
    hidden.value = true
  } else {
    // Scrolling up
    hidden.value = false
  }
  
  lastScrollY.value = currentScrollY
}

// Lifecycle
onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll() // Initial call
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

// Close mobile menu when route changes
watch(() => useRoute().path, () => {
  mobileMenuOpen.value = false
})
</script>

<style scoped>
/* Custom animations */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-2px); }
}

.group:hover .group-hover\\:animate-float {
  animation: float 3s ease-in-out infinite;
}

/* Smooth transitions for all interactive elements */
* {
  transition-property: transform, color, background-color, border-color, opacity, box-shadow;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style>