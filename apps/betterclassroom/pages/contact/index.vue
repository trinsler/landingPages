<template>
  <div class="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white overflow-x-hidden">
    <!-- Modern Navigation Header -->
    <header class="fixed top-0 w-full nav-modern z-50">
      <nav class="container-modern">
        <div class="flex items-center justify-between h-20">
          <!-- Modern Logo -->
          <div class="flex items-center space-x-3">
            <div class="relative group">
              <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-custom-primary to-custom-secondary flex items-center justify-center transform group-hover:scale-110 transition-all duration-300">
                <span class="text-white font-bold text-sm">BC</span>
              </div>
              <div class="absolute inset-0 bg-gradient-to-br from-custom-primary to-custom-secondary rounded-xl opacity-20 blur-lg group-hover:opacity-40 transition-opacity duration-300"></div>
            </div>
            <span class="text-lg font-medium text-gray-900">BetterClassroom</span>
          </div>
          
          <!-- Modern Navigation -->
          <div class="hidden lg:flex items-center space-x-12">
            <NuxtLink to="/home" class="text-gray-600 hover:text-custom-primary transition-colors duration-200 font-medium relative group">
              Start
              <div class="absolute -bottom-1 left-0 w-0 h-0.5 bg-custom-primary transition-all duration-300 group-hover:w-full"></div>
            </NuxtLink>
            <NuxtLink to="/features" class="text-gray-600 hover:text-custom-primary transition-colors duration-200 font-medium relative group">
              Funktionen
              <div class="absolute -bottom-1 left-0 w-0 h-0.5 bg-custom-primary transition-all duration-300 group-hover:w-full"></div>
            </NuxtLink>
            <NuxtLink to="/about" class="text-gray-600 hover:text-custom-primary transition-colors duration-200 font-medium relative group">
              Über uns
              <div class="absolute -bottom-1 left-0 w-0 h-0.5 bg-custom-primary transition-all duration-300 group-hover:w-full"></div>
            </NuxtLink>
            <NuxtLink to="/contact" class="btn-premium text-sm">
              Kontakt
            </NuxtLink>
          </div>
          
          <!-- Mobile Menu Button -->
          <button @click="mobileMenuOpen = !mobileMenuOpen" class="lg:hidden text-gray-600 p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="mobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'"/>
            </svg>
          </button>
        </div>
        
        <!-- Mobile Menu -->
        <div v-if="mobileMenuOpen" class="lg:hidden py-6 border-t border-gray-200">
          <div class="flex flex-col space-y-4">
            <NuxtLink to="/home" class="text-gray-600 hover:text-custom-primary transition-colors duration-200 font-medium py-2">Start</NuxtLink>
            <NuxtLink to="/features" class="text-gray-600 hover:text-custom-primary transition-colors duration-200 font-medium py-2">Funktionen</NuxtLink>
            <NuxtLink to="/about" class="text-gray-600 hover:text-custom-primary transition-colors duration-200 font-medium py-2">Über uns</NuxtLink>
            <NuxtLink to="/contact" class="btn-premium text-sm text-center">Kontakt</NuxtLink>
          </div>
        </div>
      </nav>
    </header>
    
    <!-- Hero Section -->
    <HeroSection />

    <!-- Contact Form Section -->
    <section id="contact-form" class="py-24 lg:py-32 bg-gradient-to-b from-custom-white via-custom-secondary/5 to-custom-primary/5 relative">
      <!-- Creative Background -->
      <div class="absolute inset-0">
        <div class="absolute top-20 right-10 w-64 h-64 bg-custom-primary/5 rounded-full blur-3xl"></div>
        <div class="absolute bottom-20 left-10 w-96 h-96 bg-custom-secondary/10 rounded-full blur-3xl"></div>
      </div>
      
      <div class="container mx-auto px-6 lg:px-8 relative">
        <div class="grid lg:grid-cols-12 gap-16 items-start">
          <!-- Contact Form - Asymmetric positioning -->
          <div class="lg:col-span-6 lg:col-start-1">
            <ContactForm />
          </div>

          <!-- Contact Information - Asymmetric positioning -->
          <div class="lg:col-span-5 lg:col-start-8">
            <ContactInfo />
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <FAQSection />
  </div>
</template>

<script setup>
// Import section components
import HeroSection from './sections/HeroSection.vue'
import ContactForm from './sections/ContactForm.vue'
import ContactInfo from './sections/ContactInfo.vue'
import FAQSection from './sections/FAQSection.vue'

// Reactive state for mobile menu
const mobileMenuOpen = ref(false)

// SEO Meta
useHead({
  title: 'Kontakt & Demo - BetterClassroom | Kostenloses Beratungsgespräch | HTWG Konstanz Referenz',
  meta: [
    {
      name: 'description',
      content: 'Fordern Sie eine kostenlose Demo von BetterClassroom an. Erfahren Sie, wie wir an der HTWG Konstanz das Klassenzimmer-Management revolutioniert haben. Antwort innerhalb von 24 Stunden garantiert.',
    },
    {
      name: 'keywords',
      content: 'betterclassroom demo, kontakt betterclassroom, bildungstechnologie beratung, HTWG konstanz referenz, klassenzimmer management demo, kostenlose demonstration'
    }
  ]
})
</script>

<style scoped>
.container-custom {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

@media (max-width: 768px) {
  .container-custom {
    padding: 0 1rem;
  }
}
</style>