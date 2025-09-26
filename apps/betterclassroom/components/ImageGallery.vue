<template>
  <section class="w-full py-20 md:py-32 relative overflow-hidden">
    <!-- Enhanced Background -->
    <div class="absolute inset-0 gradient-bg opacity-60" />
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(var(--education-blue)_/_0.05)_0%,transparent_50%)]" />

    <div class="relative z-10">
      <div class="text-center mb-16 space-y-4">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <span>So funktioniert's</span>
        </div>
        <h2 class="text-4xl md:text-6xl font-bold">
          <span class="gradient-text">Einfach. Effizient. Modern.</span>
        </h2>
        <p class="text-xl text-muted-foreground max-w-3xl mx-auto">
          Entdecken Sie Schritt für Schritt, wie BetterClassroom Ihr Klassenzimmer in eine interaktive Lernumgebung verwandelt
        </p>
      </div>

      <div class="relative max-w-7xl mx-auto">
        <!-- Enhanced Navigation Buttons -->
        <Button
          variant="outline"
          size="lg"
          class="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 z-30 hover-lift rounded-full w-14 h-14 p-0 glass-card border-2 hover:border-primary/30 transition-all duration-300"
          @click="prevSlide"
        >
          <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" />
          </svg>
        </Button>

        <Transition
          :enter-active-class="`transition-all duration-700 ease-out`"
          :enter-from-class="direction > 0 ? 'opacity-0 translate-x-12' : 'opacity-0 -translate-x-12'"
          :enter-to-class="'opacity-100 translate-x-0'"
          :leave-active-class="`transition-all duration-500 ease-in`"
          :leave-from-class="'opacity-100 translate-x-0'"
          :leave-to-class="direction > 0 ? 'opacity-0 -translate-x-12' : 'opacity-0 translate-x-12'"
          mode="out-in"
        >
          <div
            :key="currentIndex"
            class="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center justify-center"
          >
            <!-- Professor View -->
            <div class="w-full lg:w-1/2 max-w-2xl animate-fade-in">
              <Card class="overflow-hidden glass-card hover-lift border-0 shadow-2xl">
                <CardContent class="p-8 pb-6 bg-gradient-to-br from-primary/5 to-transparent">
                  <div class="flex items-center justify-center space-x-4 mb-8">
                    <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-education-blue to-education-indigo flex items-center justify-center">
                      <svg class="w-6 h-6 text-white" fill="none" stroke="white" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <div>
                      <h3 class="text-2xl font-bold gradient-text">Lehrenden-Perspektive</h3>
                      <p class="text-sm text-muted-foreground mt-1">Dashboard & Verwaltung</p>
                    </div>
                  </div>
                </CardContent>
                <div class="p-8">
                  <div class="relative overflow-hidden rounded-2xl bg-muted/5 border border-border/20">
                    <!-- Apple-style dots above image -->
                    <div class="absolute top-4 left-4 z-10 flex items-center gap-2">
                      <div class="w-3 h-3 rounded-full bg-red-500" />
                      <div class="w-3 h-3 rounded-full bg-yellow-500" />
                      <div class="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <img
                      :src="images[currentIndex].professor"
                      :alt="`Lehrenden-Ansicht ${currentIndex + 1}`"
                      class="w-full h-80 lg:h-96 object-contain bg-white shadow-inner"
                    />
                    <!-- Overlay Badge -->
                    <div class="absolute top-4 right-4 px-3 py-1 rounded-full bg-primary/90 text-primary-foreground text-xs font-medium">
                      Schritt {{ currentIndex + 1 }}
                    </div>
                  </div>
                  <!-- Enhanced Description Card -->
                  <CardContent class="mt-6 p-6 bg-gradient-to-r from-primary/5 to-education-blue/5 border border-primary/10">
                    <div class="flex items-start gap-3">
                      <div class="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <svg class="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                        </svg>
                      </div>
                      <p class="text-sm text-foreground leading-relaxed font-medium">
                        {{ images[currentIndex].profDescription }}
                      </p>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </div>

            <!-- Student View -->
            <div class="w-full lg:w-1/2 max-w-2xl animate-fade-in" style="animation-delay: 0.2s">
              <Card class="overflow-hidden glass-card hover-lift border-0 shadow-2xl">
                <CardContent class="p-8 pb-6 bg-gradient-to-br from-education-purple/5 to-transparent">
                  <div class="flex items-center justify-center space-x-4 mb-8">
                    <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-education-purple to-education-pink flex items-center justify-center">
                      <svg class="w-6 h-6 text-white" fill="none" stroke="white" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                      </svg>
                    </div>
                    <div>
                      <h3 class="text-2xl font-bold gradient-text">Lernenden-Perspektive</h3>
                      <p class="text-sm text-muted-foreground mt-1">Interaktion & Teilhabe</p>
                    </div>
                  </div>
                </CardContent>
                <div class="p-8">
                  <div class="relative overflow-hidden rounded-2xl bg-muted/5 border border-border/20">
                    <!-- Apple-style dots above image -->
                    <div class="absolute top-4 left-4 z-10 flex items-center gap-2">
                      <div class="w-3 h-3 rounded-full bg-red-500" />
                      <div class="w-3 h-3 rounded-full bg-yellow-500" />
                      <div class="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <img
                      :src="images[currentIndex].student"
                      :alt="`Lernenden-Ansicht ${currentIndex + 1}`"
                      class="w-full h-80 lg:h-96 object-contain bg-white shadow-inner"
                    />
                    <!-- Overlay Badge -->
                    <div class="absolute top-4 right-4 px-3 py-1 rounded-full bg-education-purple/90 text-white text-xs font-medium">
                      Schritt {{ currentIndex + 1 }}
                    </div>
                  </div>
                  <!-- Enhanced Description Card -->
                  <CardContent class="mt-6 p-6 bg-gradient-to-r from-education-purple/5 to-education-pink/5 border border-education-purple/10">
                    <div class="flex items-start gap-3">
                      <div class="w-8 h-8 rounded-lg bg-education-purple/10 flex items-center justify-center flex-shrink-0">
                        <svg class="w-4 h-4 text-education-purple" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                        </svg>
                      </div>
                      <p class="text-sm text-foreground leading-relaxed font-medium">
                        {{ images[currentIndex].studentDescription }}
                      </p>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </div>
          </div>
        </Transition>

        <Button
          variant="outline"
          size="lg"
          class="absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2 z-30 hover-lift rounded-full w-14 h-14 p-0 glass-card border-2 hover:border-primary/30 transition-all duration-300"
          @click="nextSlide"
        >
          <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
          </svg>
        </Button>
      </div>

      <!-- Enhanced Progress Indicator -->
      <div class="flex flex-col items-center mt-16 space-y-8">
        <div class="flex items-center justify-center space-x-4">
          <button
            v-for="(image, index) in images"
            :key="index"
            class="group relative transition-all duration-300"
            @click="currentIndex = index"
          >
            <div
              class="w-3 h-3 rounded-full transition-all duration-300"
              :class="
                index === currentIndex
                  ? 'bg-primary scale-125 shadow-lg'
                  : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
              "
            />
            <!-- Tooltip -->
            <div
              v-if="index === currentIndex"
              class="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 text-xs text-white bg-foreground rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity"
            >
              Schritt {{ index + 1 }}
            </div>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Button, Card, CardContent } from '~/components/ui' 

const currentIndex = ref(0)
const direction = ref(0)
let intervalId = null

const images = [
  {
    professor: '/assets/kurs.png',
    student: '/assets/studentSitz.png',
    profDescription: 'Erstellen Sie mühelos Kurse und Fächer. Weisen Sie Aufgaben zu und verwalten Sie Ihre Klassen digital mit intuitiven Tools.',
    studentDescription: 'Wählen Sie Ihren persönlichen Sitzplatz im digitalen Klassenzimmer und sehen Sie sofort Ihre zugewiesenen Aufgaben.',
  },
  {
    professor: '/assets/fortschritt.png',
    student: '/assets/studentAufgabe.png',
    profDescription: 'Behalten Sie den Überblick mit dem Echtzeit-Dashboard. Sehen Sie auf einen Blick belegte Plätze und den Lernfortschritt.',
    studentDescription: 'Alle Ihre Aufgaben an einem Ort. Markieren Sie erledigte Aufgaben und verfolgen Sie Ihren persönlichen Fortschritt.',
  },
  {
    professor: '/assets/fortschrittFrageName.png',
    student: '/assets/studentAufgabeFrage.png',
    profDescription: 'Erhalten Sie sofort Benachrichtigungen bei Fragen. Das Dashboard zeigt Ihnen alle offenen Meldungen klar übersichtlich an.',
    studentDescription: 'Stellen Sie Fragen mit einem Klick. Die digitale Handhebung sorgt für eine diskrete und effektive Kommunikation.',
  },
]

const nextSlide = () => {
  direction.value = 1
  currentIndex.value = (currentIndex.value + 1) % images.length
}

const prevSlide = () => {
  direction.value = -1
  currentIndex.value = (currentIndex.value - 1 + images.length) % images.length
}

onMounted(() => {
  intervalId = setInterval(() => {
    nextSlide()
  }, 6000) // Slightly faster for better engagement
})

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})
</script>