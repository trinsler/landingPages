<template>
  <section class="relative overflow-hidden bg-gradient-to-br from-blue-50 to-green-50">
    <!-- Background pattern -->
    <div class="absolute inset-0 opacity-5">
      <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-900 to-green-900"></div>
    </div>

    <div class="container-custom py-16 lg:py-20">
      <div class="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
        <div class="max-w-2xl">
          <div class="mb-6">
            <div class="inline-flex items-center rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700 ring-1 ring-inset ring-green-200">
              <span>67% mehr Reichweite in 90 Tagen</span>
              <ChevronRightIcon class="ml-2 h-4 w-4" />
            </div>
          </div>

          <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl leading-tight">
            Ihre Marke.
            <span class="bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">Unsere Strategie.</span>
            Echte Ergebnisse.
          </h1>

          <p class="mt-4 text-lg leading-7 text-gray-600 max-w-xl">
            Wir verwandeln lokale Unternehmen in digitale Erfolgsgeschichten.
            Durch datenbasierte Social Media Strategien, die Kunden gewinnen und Umsätze steigern.
          </p>

          <div class="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <NuxtLink
              to="/contact"
              class="btn-primary"
            >
              Kostenloses Strategiegespräch
            </NuxtLink>
            <NuxtLink
              to="/portfolio"
              class="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              Erfolgsgeschichten ansehen
            </NuxtLink>
          </div>

          <div class="mt-12 grid grid-cols-3 gap-6 border-t border-gray-200 pt-6">
            <div>
              <div class="text-2xl font-bold text-gray-900">150+</div>
              <div class="text-sm text-gray-600">Zufriedene Kunden</div>
            </div>
            <div>
              <div class="text-2xl font-bold text-gray-900">67%</div>
              <div class="text-sm text-gray-600">Ø Reichweiten-Steigerung</div>
            </div>
            <div>
              <div class="text-2xl font-bold text-gray-900">3x</div>
              <div class="text-sm text-gray-600">ROI Durchschnitt</div>
            </div>
          </div>
        </div>

        <div class="mt-12 lg:mt-0">
          <div class="relative">
            <!-- Main hero image -->
            <div class="relative rounded-3xl h-80 lg:h-[500px] overflow-hidden aspect-[4/3]">
              <img
                src="/images/georgia-de-lotz-hdQGAz1pQ_M-unsplash.jpg"
                alt="Professional Digital Marketing Team"
                class="object-cover w-full h-full"
                loading="eager"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-gray-900/40 via-transparent to-transparent"></div>

              <!-- Overlay content -->
              <div class="absolute bottom-8 left-8 right-8">
                <div class="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
                  <div class="flex items-center gap-4 mb-4">
                    <div class="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span class="text-gray-900 font-semibold text-sm">Live Dashboard</span>
                  </div>
                  <div class="text-gray-900 text-lg font-bold mb-2">
                    Echte Performance-Daten
                  </div>
                  <div class="text-gray-600 text-sm">
                    Transparente Ergebnisse in Echtzeit
                  </div>
                </div>
              </div>
            </div>

            <!-- Floating performance cards -->
            <div class="absolute -top-6 -left-6 bg-white rounded-2xl shadow-xl p-6 border border-gray-100 animate-float">
              <div class="flex items-center gap-3 mb-2">
                <div class="w-2 h-2 bg-green-400 rounded-full"></div>
                <div class="text-sm font-semibold text-gray-900">Engagement Rate</div>
              </div>
              <div class="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">+127%</div>
              <div class="text-xs text-gray-500 mt-1">vs. Vormonat</div>
            </div>

            <div class="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-6 border border-gray-100 animate-float" style="animation-delay: 0.5s;">
              <div class="flex items-center gap-3 mb-2">
                <div class="w-2 h-2 bg-green-400 rounded-full"></div>
                <div class="text-sm font-semibold text-gray-900">Neue Follower</div>
              </div>
              <div class="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">+2.4k</div>
              <div class="text-xs text-gray-500 mt-1">letzte 30 Tage</div>
            </div>

            <div class="absolute top-1/2 -right-4 bg-white rounded-2xl shadow-xl p-4 border border-gray-100 animate-float" style="animation-delay: 1s;">
              <div class="flex items-center gap-2 mb-1">
                <div class="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                <div class="text-xs font-medium text-gray-900">ROI</div>
              </div>
              <div class="text-xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">3.2x</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ChevronRightIcon } from '@heroicons/vue/24/outline'
</script>

<style scoped>
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}
</style>