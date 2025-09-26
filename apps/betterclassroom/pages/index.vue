<template>
  <div>
    <!-- Enhanced Hero Section -->
    <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
      <!-- Animated Background -->
      <div class="absolute inset-0 gradient-bg-strong">
        <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,hsl(var(--background)_/_0.8)_40%,hsl(var(--background)_/_1)_100%)]" />
      </div>

      <!-- Floating Elements -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-education-blue/20 to-education-indigo/20 rounded-full blur-3xl floating-animation animate-pulse" />
        <div class="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-education-purple/20 to-education-pink/20 rounded-full blur-3xl floating-animation animate-pulse" style="animation-delay: -2s" />
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-education-indigo/15 to-education-purple/15 rounded-full blur-3xl floating-animation animate-pulse" style="animation-delay: -1s" />
      </div>

      <!-- Hero Content -->
      <div class="relative z-10">
        <div class="text-center space-y-8 max-w-6xl mx-auto">
          <!-- Badge -->
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-primary/20 animate-fade-in">
            <span class="w-2 h-2 bg-success rounded-full animate-pulse"></span>
            <span class="text-sm font-medium text-muted-foreground">Revolutionieren Sie Ihren Unterricht</span>
          </div>

          <!-- Main Headline -->
          <div class="space-y-6 animate-slide-up">
            <h1 class="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight">
              <span class="gradient-text">Digitale Meldungen</span>
              <br />
              <span class="text-foreground">im Klassenzimmer</span>
            </h1>
            <p class="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-4xl mx-auto">
              Revolutionieren Sie die Interaktion in Ihrem Klassenzimmer. Ermöglichen Sie Schüler:innen,
              sich digital zu melden, und behalten Sie den Überblick mit unserem innovativen
              Dashboard für moderne Bildung.
            </p>
          </div>

          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 items-center justify-center animate-scale-in" style="animation-delay: 0.3s">
            <Button
              size="lg"
              variant="default"
              class="btn-modern group px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl"
              @click="scrollToSection('contact')"
            >
              <span class="gradient">Demo anfordern</span>
              <ArrowRight class="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              class="btn-modern px-8 py-4 text-lg font-medium border-2 hover:border-primary/50"
              @click="scrollToSection('features')"
            >
              Funktionen entdecken
              <svg class="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </Button>
          </div>

          <!-- Trust Indicators -->
          <div class="flex flex-wrap items-center justify-center gap-8 pt-8 animate-fade-in" style="animation-delay: 0.6s">
            <div class="flex items-center gap-2 text-sm text-muted-foreground">
              <svg class="w-4 h-4 text-success" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              <span>Datenschutzkonform</span>
            </div>
            <div class="flex items-center gap-2 text-sm text-muted-foreground">
              <svg class="w-4 h-4 text-success" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              <span>Easy Setup</span>
            </div>
            <div class="flex items-center gap-2 text-sm text-muted-foreground">
              <svg class="w-4 h-4 text-success" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Scroll Indicator -->
      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <Button
          variant="ghost"
          size="sm"
          class="text-muted-foreground hover:text-foreground"
          @click="scrollToSection('features')"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </Button>
      </div>
    </section>

    <!-- Enhanced Features Section -->
    <section id="features" class="py-20 md:py-32 bg-gray-50">
      <div>
        <div class="text-center mb-16 space-y-4">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <span>Kernfunktionen</span>
          </div>
          <h2 class="text-4xl md:text-6xl font-bold">
            <span class="gradient-text">Alles was Sie brauchen</span>
          </h2>
          <p class="text-xl text-muted-foreground max-w-3xl mx-auto">
            Entdecken Sie die innovativen Features, die Ihr Klassenzimmer in eine moderne Lernumgebung verwandeln
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Feature 1 -->
          <Card class="group hover:shadow-lg transition-all duration-300">
            <CardContent class="p-8 text-center">
            <div class="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-education-blue to-education-indigo flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg class="w-8 h-8 text-white" fill="none" stroke="white" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <CardTitle class="text-2xl mb-4 group-hover:text-education-blue transition-colors">
              Digitale Meldungen
            </CardTitle>
            <p class="text-muted-foreground leading-relaxed">
              Schüler:innen können sich mit einem Klick melden, ohne den Unterricht zu stören. Echtzeit-Übermittlung direkt auf Ihr Dashboard.
            </p>
          </CardContent>
          </Card>

          <!-- Feature 2 -->
          <Card class="group hover:shadow-lg transition-all duration-300">
            <CardContent class="p-8 text-center">
            <div class="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-education-indigo to-education-purple flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg class="w-8 h-8 text-white" fill="none" stroke="white" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <CardTitle class="text-2xl mb-4 group-hover:text-education-indigo transition-colors">
              Lehrer-Dashboard
            </CardTitle>
            <p class="text-muted-foreground leading-relaxed">
              Übersichtliches Dashboard zeigt alle aktiven Meldungen in Echtzeit. Statistiken und Übersichten für optimale Unterrichtsführung.
            </p>
          </CardContent>
          </Card>

          <!-- Feature 3 -->
          <Card class="group hover:shadow-lg transition-all duration-300">
            <CardContent class="p-8 text-center">
            <div class="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-education-purple to-education-pink flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg class="w-8 h-8 text-white" fill="none" stroke="white" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <CardTitle class="text-2xl mb-4 group-hover:text-education-purple transition-colors">
              Sitzplan-Integration
            </CardTitle>
            <p class="text-muted-foreground leading-relaxed">
              Visualisieren Sie die Meldungen auf einem digitalen Sitzplan des Klassenzimmers. Behalten Sie den Überblick über jede:n Schüler:in.
            </p>
          </CardContent>
          </Card>
        </div>
      </div>
    </section>

    <!-- Enhanced Image Gallery Component -->
    <ImageGallery />

    <!-- Enhanced Contact Section -->
    <section id="contact" class="py-20 md:py-32 bg-gradient-to-br from-primary/5 to-transparent">
      <div>
        <div class="max-w-4xl mx-auto text-center space-y-8">
          <div class="space-y-4">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <span>Starten Sie durch</span>
            </div>
            <h2 class="text-4xl md:text-6xl font-bold">
              <span class="gradient-text">Bereit für die digitale Klassenzimmer Revolution?</span>
            </h2>
            <p class="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Erleben Sie BetterClassroom in Aktion. Fordern Sie jetzt Ihre persönliche Demo an und überzeugen Sie sich selbst von der Zukunft des Unterrichts.
            </p>
          </div>

          <div class="flex flex-col items-center justify-center space-y-6">
            <Button
              size="lg"
              variant="default"
              href="mailto:info@betterclassroom.de"
              class="btn-modern group px-12 py-6 text-xl font-semibold shadow-xl hover:shadow-2xl"
            >
              <svg class="w-6 h-6 mr-3 text-white" fill="none" stroke="white" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Demo anfordern
              <ArrowRight class="ml-2 h-6 w-6 text-white group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Button } from '~/components/ui'
import { ArrowRight } from 'lucide-vue-next' 
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui'

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