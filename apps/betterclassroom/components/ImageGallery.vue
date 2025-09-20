<template>
  <section class="w-full py-20 md:py-32 relative overflow-hidden">
    <!-- Background gradient -->
    <div class="absolute inset-0 gradient-bg opacity-50" />

    <div class="container mx-auto px-4 relative z-10">
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-6xl font-bold mb-6">
          <span class="gradient-text">So funktioniert's</span>
        </h2>
        <p class="text-xl text-muted-foreground max-w-2xl mx-auto">
          Entdecken Sie Schritt für Schritt, wie BetterClassroom Ihr Klassenzimmer revolutioniert
        </p>
      </div>

      <div class="relative max-w-7xl mx-auto">
        <!-- Navigation Buttons -->
        <button
          class="absolute -left-6 md:-left-12 top-1/2 -translate-y-1/2 z-20 glass-card p-4 rounded-2xl hover:scale-125 transition-all duration-300 pulse-glow group shadow-2xl"
          @click="prevSlide"
        >
          <svg
            class="h-8 w-8 text-primary group-hover:text-primary/80"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2.5"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <Transition
          :enter-active-class="`transition-all duration-500 ease-out`"
          :enter-from-class="direction > 0 ? 'opacity-0 translate-x-8' : 'opacity-0 -translate-x-8'"
          :enter-to-class="'opacity-100 translate-x-0'"
          :leave-active-class="`transition-all duration-300 ease-in`"
          :leave-from-class="'opacity-100 translate-x-0'"
          :leave-to-class="direction > 0 ? 'opacity-0 -translate-x-8' : 'opacity-0 translate-x-8'"
          mode="out-in"
        >
          <div
            :key="currentIndex"
            class="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center justify-center"
          >
            <!-- Professor View -->
            <div class="w-full lg:w-1/2 max-w-2xl">
              <div class="glass-card rounded-3xl overflow-hidden">
                <div class="p-6 pb-4">
                  <div class="flex items-center justify-center space-x-3 mb-6">
                    <div class="gradient-border rounded-2xl p-3">
                      <svg
                        class="h-8 w-8 text-primary relative z-10"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                    </div>
                    <h3 class="text-2xl font-bold gradient-text">Lehrenden-Perspektive</h3>
                  </div>
                </div>
                <div class="relative mx-6 mb-6">
                  <div class="overflow-hidden rounded-2xl border border-border/20 bg-muted/20">
                    <img
                      :src="images[currentIndex].professor"
                      :alt="`Lehrenden-Ansicht ${currentIndex + 1}`"
                      class="w-full h-80 lg:h-96 object-contain bg-white"
                    />
                  </div>
                  <!-- Separate text overlay for better readability -->
                  <div class="mt-4 glass-card p-4 rounded-xl">
                    <p class="text-sm text-foreground leading-relaxed font-medium">
                      {{ images[currentIndex].profDescription }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Student View -->
            <div class="w-full lg:w-1/2 max-w-2xl">
              <div class="glass-card rounded-3xl overflow-hidden">
                <div class="p-6 pb-4">
                  <div class="flex items-center justify-center space-x-3 mb-6">
                    <div class="gradient-border rounded-2xl p-3">
                      <svg
                        class="h-8 w-8 text-primary relative z-10"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                        />
                      </svg>
                    </div>
                    <h3 class="text-2xl font-bold gradient-text">Lernenden-Perspektive</h3>
                  </div>
                </div>
                <div class="relative mx-6 mb-6">
                  <div class="overflow-hidden rounded-2xl border border-border/20 bg-muted/20">
                    <img
                      :src="images[currentIndex].student"
                      :alt="`Lernenden-Ansicht ${currentIndex + 1}`"
                      class="w-full h-80 lg:h-96 object-contain bg-white"
                    />
                  </div>
                  <!-- Separate text overlay for better readability -->
                  <div class="mt-4 glass-card p-4 rounded-xl">
                    <p class="text-sm text-foreground leading-relaxed font-medium">
                      {{ images[currentIndex].studentDescription }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Transition>

        <button
          class="absolute -right-6 md:-right-12 top-1/2 -translate-y-1/2 z-20 glass-card p-4 rounded-2xl hover:scale-125 transition-all duration-300 pulse-glow group shadow-2xl"
          @click="nextSlide"
        >
          <svg
            class="h-8 w-8 text-primary group-hover:text-primary/80"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2.5"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      <!-- Progress Indicator -->
      <div class="flex flex-col items-center mt-12 space-y-6">
        <div class="flex space-x-3">
          <button
            v-for="(image, index) in images"
            :key="index"
            class="w-3 h-3 rounded-full transition-all duration-300"
            :class="
              index === currentIndex
                ? 'bg-primary shadow-lg scale-125'
                : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
            "
            @click="currentIndex = index"
          />
        </div>
        <div class="glass-card px-6 py-3 rounded-2xl">
          <p class="text-lg font-semibold text-foreground">
            Schritt {{ currentIndex + 1 }} von {{ images.length }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const currentIndex = ref(0)
const direction = ref(0)
let intervalId = null

const images = [
  {
    professor: '/assets/kurs.png',
    student: '/assets/studentSitz.png',
    profDescription: 'Anlegen von einem Kurs/Fach und Aufgaben für die Lernenden erstellen',
    studentDescription: 'Sitzplatz im digitalen Klassenzimmer wählen',
  },
  {
    professor: '/assets/fortschritt.png',
    student: '/assets/studentAufgabe.png',
    profDescription:
      'Das Dashboard zeigt die belegten Sitzplätze und den Fortschritt der Lernenden',
    studentDescription: 'Sieht seine Aufgaben',
  },
  {
    professor: '/assets/fortschrittFrageName.png',
    student: '/assets/studentAufgabeFrage.png',
    profDescription: 'Das Dashboard zeigt eine Übersicht der offenen Fragen',
    studentDescription: 'Der Lernende hat die Möglichkeit, die Hand digital zu heben',
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
  }, 8000)
})

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})
</script>
