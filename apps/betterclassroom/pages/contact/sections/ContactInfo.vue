<template>
  <div class="space-y-8">
    <!-- Creative Header -->
    <div class="space-y-6">
      <div class="inline-flex items-center space-x-3 bg-gradient-to-r from-custom-secondary/20 to-custom-primary/10 rounded-full px-6 py-3 border border-custom-secondary/20">
        <svg class="w-5 h-5 text-custom-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
        </svg>
        <span class="text-custom-primary font-semibold">Direkter Draht</span>
      </div>
      
      <h2 class="text-4xl lg:text-6xl font-bold text-custom-primary leading-tight">
        Persönlicher
        <br>
        <span class="text-3xl lg:text-5xl font-light bg-gradient-to-r from-custom-primary to-custom-secondary bg-clip-text text-transparent">Kontakt</span>
      </h2>
    </div>
    
    <div class="space-y-6">
      <!-- Email -->
      <div class="bg-custom-white rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 border border-custom-secondary/20 group">
        <div class="flex items-center mb-4">
          <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-custom-primary to-custom-secondary flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
            <svg class="w-6 h-6 text-custom-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
          </div>
          <div>
            <div class="font-bold text-custom-primary">E-Mail</div>
            <div class="text-custom-primary/60 text-sm font-light">Direkte Kommunikation</div>
          </div>
        </div>
        <div class="text-xl font-bold mb-2 text-custom-primary">
          <a href="mailto:hello@trinsler.com" class="hover:text-custom-secondary transition-colors duration-300">hello@trinsler.com</a>
        </div>
        <p class="text-custom-primary/70 text-sm font-light">
          Schreiben Sie uns direkt für individuelle Fragen oder spezielle Anforderungen.
        </p>
      </div>

      <!-- Response Time -->
      <div class="bg-custom-white rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 border border-custom-secondary/20 group">
        <div class="flex items-center mb-4">
          <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-custom-primary to-custom-secondary flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
            <svg class="w-6 h-6 text-custom-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <div>
            <div class="font-bold text-custom-primary">Antwortzeit</div>
            <div class="text-custom-primary/60 text-sm font-light">Garantierte Bearbeitung</div>
          </div>
        </div>
        <div class="text-xl font-bold mb-2 text-custom-primary">
          Innerhalb von 24 Stunden
        </div>
        <p class="text-custom-primary/70 text-sm font-light">
          Wir antworten auf alle Anfragen schnell und kompetent - auch am Wochenende.
        </p>
      </div>

      <!-- Location -->
      <div class="bg-custom-white rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 border border-custom-secondary/20 group">
        <div class="flex items-center mb-4">
          <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-custom-primary to-custom-secondary flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
            <svg class="w-6 h-6 text-custom-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
          </div>
          <div>
            <div class="font-bold text-custom-primary">Standort</div>
            <div class="text-custom-primary/60 text-sm font-light">Entwicklung & Support</div>
          </div>
        </div>
        <div class="text-xl font-bold mb-2 text-custom-primary">
          Konstanz, Deutschland
        </div>
        <p class="text-custom-primary/70 text-sm font-light">
          Lokale Präsenz für persönlichen Support und schnelle Reaktionszeiten.
        </p>
      </div>

      <!-- Demo Information -->
      <div class="bg-gradient-to-r from-custom-secondary/10 to-custom-primary/5 rounded-3xl p-6 border border-custom-secondary/20 shadow-xl hover:shadow-2xl transition-all duration-500">
        <h3 class="text-xl font-bold mb-4 text-custom-primary">Was Sie in der Demo erwartet</h3>
        <ul class="space-y-3 text-sm">
          <li class="flex items-start">
            <svg class="w-5 h-5 mt-0.5 mr-3 flex-shrink-0 text-custom-primary" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
            </svg>
            <span class="text-custom-primary font-medium">Live-Demonstration aller Kernfunktionen</span>
          </li>
          <li class="flex items-start">
            <svg class="w-5 h-5 mt-0.5 mr-3 flex-shrink-0 text-custom-primary" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
            </svg>
            <span class="text-custom-primary font-medium">Anpassung an Ihre spezifischen Anforderungen</span>
          </li>
          <li class="flex items-start">
            <svg class="w-5 h-5 mt-0.5 mr-3 flex-shrink-0 text-custom-primary" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
            </svg>
            <span class="text-custom-primary font-medium">Erfahrungsberichte von der HTWG Konstanz</span>
          </li>
          <li class="flex items-start">
            <svg class="w-5 h-5 mt-0.5 mr-3 flex-shrink-0 text-custom-primary" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
            </svg>
            <span class="text-custom-primary font-medium">Detaillierte Implementierungsplanung</span>
          </li>
          <li class="flex items-start">
            <svg class="w-5 h-5 mt-0.5 mr-3 flex-shrink-0 text-custom-primary" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
            </svg>
            <span class="text-custom-primary font-medium">Q&A Session mit unseren Experten</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>