<template>
  <div>
    <!-- Hero Section -->
    <section class="w-full min-h-screen flex items-center justify-center relative overflow-hidden gradient-bg">
      <div class="container mx-auto px-4 md:px-6">
        <!-- Floating background elements -->
        <div class="absolute inset-0 overflow-hidden pointer-events-none">
          <div class="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-blue-400/20 to-purple-600/20 rounded-full blur-3xl floating-animation"></div>
          <div class="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-purple-400/20 to-pink-600/20 rounded-full blur-3xl floating-animation" style="animation-delay: -3s;"></div>
          <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-300/10 to-indigo-500/10 rounded-full blur-3xl floating-animation" style="animation-delay: -1.5s;"></div>
        </div>

        <div class="relative z-10 flex flex-col items-center space-y-8 text-center" :class="{ 'opacity-100 translate-y-0': isVisible, 'opacity-0 translate-y-10': !isVisible }" style="transition: all 1s ease-out;">
          <div class="space-y-6">
            <h1 class="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight">
              <span class="gradient-text">Digitale Meldungen</span>
              <br>
              <span class="text-foreground">im Klassenzimmer</span>
            </h1>
            <p class="mx-auto max-w-[800px] text-xl md:text-2xl text-muted-foreground leading-relaxed">
              Revolutionieren Sie die Interaktion in Ihrem Klassenzimmer. Ermöglichen Sie Schülern, sich digital zu melden, und behalten Sie den Überblick mit unserem innovativen Dashboard.
            </p>
          </div>
          <div class="flex flex-col sm:flex-row gap-4 items-center">
            <button
              class="glass-card px-10 py-4 text-lg font-semibold text-foreground hover:scale-105 active:scale-95 transition-all duration-300 pulse-glow rounded-2xl"
              @click="scrollToSection('contact')"
            >
              <span class="gradient-text">Demo anfordern</span>
              <svg class="ml-3 h-5 w-5 inline text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </button>
            <button
              class="px-8 py-4 text-lg font-medium text-muted-foreground hover:text-foreground transition-colors rounded-2xl border border-border/50 hover:border-border backdrop-blur-sm"
              @click="scrollToSection('features')"
            >
              Mehr erfahren
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="w-full py-20 md:py-32 relative">
      <div class="container mx-auto px-4 md:px-6">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-6xl font-bold mb-6">
            <span class="gradient-text">Unsere Funktionen</span>
          </h2>
          <p class="text-xl text-muted-foreground max-w-2xl mx-auto">
            Entdecken Sie die innovativen Features, die Ihr Klassenzimmer revolutionieren werden
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div class="group glass-card p-8 rounded-3xl hover:scale-[1.02] transition-all duration-500">
            <div class="gradient-border rounded-2xl p-5 mb-6 w-fit mx-auto">
              <svg class="h-12 w-12 text-primary relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3.5M18 15h-2.5A2.5 2.5 0 0113 12.5V10"/>
              </svg>
            </div>
            <h3 class="text-2xl font-bold mb-4 text-center group-hover:gradient-text transition-all duration-300">Digitale Meldungen</h3>
            <p class="text-muted-foreground leading-relaxed text-center">Schüler können sich mit einem Klick melden, ohne den Unterricht zu stören.</p>
          </div>

          <div class="group glass-card p-8 rounded-3xl hover:scale-[1.02] transition-all duration-500">
            <div class="gradient-border rounded-2xl p-5 mb-6 w-fit mx-auto">
              <svg class="h-12 w-12 text-primary relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"/>
              </svg>
            </div>
            <h3 class="text-2xl font-bold mb-4 text-center group-hover:gradient-text transition-all duration-300">Lehrer-Dashboard</h3>
            <p class="text-muted-foreground leading-relaxed text-center">Übersichtliches Dashboard zeigt alle aktiven Meldungen in Echtzeit.</p>
          </div>

          <div class="group glass-card p-8 rounded-3xl hover:scale-[1.02] transition-all duration-500 md:col-span-2 lg:col-span-1">
            <div class="gradient-border rounded-2xl p-5 mb-6 w-fit mx-auto">
              <svg class="h-12 w-12 text-primary relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
              </svg>
            </div>
            <h3 class="text-2xl font-bold mb-4 text-center group-hover:gradient-text transition-all duration-300">Sitzplan-Integration</h3>
            <p class="text-muted-foreground leading-relaxed text-center">Visualisieren Sie die Meldungen auf einem digitalen Sitzplan des Klassenzimmers.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Image Gallery Component -->
    <ImageGallery />

    <!-- Contact Section -->
    <section id="contact" class="w-full py-12 md:py-24 lg:py-32 bg-secondary/30">
      <div class="container mx-auto px-4 md:px-6">
        <div class="max-w-3xl mx-auto text-center">
          <h2 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6 text-foreground">
            Bereit für die digitale Klassenzimmer Revolution?
          </h2>
          <p class="text-xl mb-10 text-muted-foreground leading-relaxed">
            Erleben Sie BetterClassroom in Aktion. Fordern Sie jetzt Ihre persönliche Demo an!
          </p>
          <div class="flex flex-col items-center justify-center space-y-6">
            <a
              href="mailto:info@betterclassroom.de"
              class="inline-flex items-center justify-center px-10 py-4 border border-transparent text-lg font-semibold rounded-xl text-primary-foreground bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 active:scale-95"
            >
              Demo anfordern
            </a>
            <div class="bg-card border border-border rounded-2xl p-6 shadow-sm">
              <p class="text-muted-foreground mb-2">Direkter Kontakt:</p>
              <a href="mailto:info@betterclassroom.de" class="text-primary hover:underline text-lg font-medium">info@betterclassroom.de</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isVisible = ref(false)

const scrollToSection = (id) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, 500)
})
</script>