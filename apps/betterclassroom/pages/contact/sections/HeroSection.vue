<template>
  <!-- Creative Hero Section - Asymmetric & Contact-Focused -->
  <main class="relative pt-32 lg:pt-40 overflow-hidden bg-custom-white">
    <!-- Creative Background Elements -->
    <div class="absolute inset-0">
      <div class="absolute top-20 left-10 w-64 h-64 bg-custom-secondary/10 rounded-full blur-3xl"></div>
      <div class="absolute bottom-20 right-10 w-96 h-96 bg-custom-primary/5 rounded-full blur-3xl"></div>
    </div>
    
    <div class="container mx-auto px-6 lg:px-8 relative">
      <!-- Asymmetric Hero Layout -->
      <div class="grid lg:grid-cols-12 gap-8 items-center min-h-[80vh]">
        <!-- Left Content - Creative Positioning -->
        <div class="lg:col-span-6 lg:col-start-2 space-y-8">
          <!-- Creative Badge -->
          <div class="inline-flex items-center space-x-3 bg-gradient-to-r from-custom-secondary/20 to-custom-primary/10 backdrop-blur-sm rounded-full px-6 py-3 border border-custom-secondary/20">
            <div class="w-2 h-2 bg-gradient-to-r from-custom-primary to-custom-secondary rounded-full animate-pulse"></div>
            <span class="text-custom-primary font-medium text-sm tracking-wide">Kostenlose Demo verfügbar</span>
          </div>
          
          <!-- Creative Headline -->
          <div class="space-y-4">
            <h1 class="text-6xl lg:text-8xl font-bold text-custom-primary leading-none tracking-tight">
              Starten Sie Ihre
              <br>
              <span class="block text-5xl lg:text-7xl font-light bg-gradient-to-r from-custom-primary to-custom-secondary bg-clip-text text-transparent">Bildungsrevolution</span>
            </h1>
            <div class="space-y-2">
              <p class="text-2xl lg:text-3xl font-light text-custom-primary">
                Erleben Sie BetterClassroom in einer
              </p>
              <p class="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-custom-primary to-custom-secondary bg-clip-text text-transparent">
                persönlichen Demo
              </p>
            </div>
          </div>
          
          <!-- Creative Subtitle -->
          <p class="text-lg lg:text-xl text-custom-primary/70 leading-relaxed font-light max-w-md">
            Entdecken Sie, wie wir bereits an der HTWG Konstanz den Unterricht transformiert haben und wie Sie davon profitieren können.
          </p>
          
          <!-- Creative CTA -->
          <div class="space-y-6">
            <a href="#contact-form" class="group inline-flex items-center space-x-4 bg-gradient-to-r from-custom-primary to-custom-secondary text-custom-white px-10 py-4 rounded-full hover:shadow-2xl transition-all duration-500 font-light tracking-wide text-lg overflow-hidden">
              <span class="relative z-10">Demo jetzt anfordern</span>
              <svg class="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
              <div class="absolute inset-0 bg-gradient-to-r from-custom-secondary to-custom-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </a>
            
            <div class="flex items-center space-x-6 text-sm text-custom-primary/50 font-light">
              <span>⚡ 24h Antwortzeit</span>
              <span>🎯 45-60 Min Demo</span>
              <span>✨ 100% Kostenlos</span>
            </div>
          </div>
        </div>
        
        <!-- Right Content - Contact Stats -->
        <div class="lg:col-span-5 lg:col-start-8 relative">
          <!-- Main Stats Card - Tilted -->
          <div class="relative transform rotate-2 hover:rotate-0 transition-transform duration-700">
            <div class="relative rounded-3xl overflow-hidden shadow-2xl border border-custom-secondary/20 bg-gradient-to-br from-custom-white to-custom-secondary/5">
              <div class="p-8 space-y-6">
                <div class="text-center">
                  <h3 class="text-2xl font-bold text-custom-primary mb-2">Demo-Statistiken</h3>
                  <p class="text-custom-primary/60 text-sm">Aktuelle Zahlen</p>
                </div>
                
                <div class="grid grid-cols-2 gap-4">
                  <div class="text-center p-4 bg-custom-primary/5 rounded-xl">
                    <div class="text-3xl font-bold text-custom-primary">24h</div>
                    <div class="text-xs text-custom-primary/60">Antwortzeit</div>
                  </div>
                  <div class="text-center p-4 bg-custom-primary/5 rounded-xl">
                    <div class="text-3xl font-bold text-custom-primary">45-60</div>
                    <div class="text-xs text-custom-primary/60">Min Demo</div>
                  </div>
                  <div class="text-center p-4 bg-custom-primary/5 rounded-xl">
                    <div class="text-3xl font-bold text-custom-primary">98%</div>
                    <div class="text-xs text-custom-primary/60">Zufriedenheit</div>
                  </div>
                  <div class="text-center p-4 bg-custom-primary/5 rounded-xl">
                    <div class="text-3xl font-bold text-custom-primary">50+</div>
                    <div class="text-xs text-custom-primary/60">Säle HTWG</div>
                  </div>
                </div>
              </div>
              
              <!-- Floating Creative Elements -->
              <div class="absolute top-4 -left-6 bg-custom-white rounded-2xl shadow-xl p-4 border border-custom-secondary/20 transform -rotate-12 hover:rotate-0 transition-transform duration-500">
                <div class="text-center space-y-2">
                  <div class="text-2xl font-bold text-custom-primary">HTWG</div>
                  <div class="text-xs text-custom-primary/60 font-medium">Referenz</div>
                </div>
              </div>

              <div class="absolute bottom-4 -right-6 bg-gradient-to-br from-custom-primary to-custom-secondary text-custom-white rounded-2xl shadow-xl p-4 transform rotate-6 hover:rotate-0 transition-transform duration-500">
                <div class="text-center space-y-1">
                  <div class="text-lg font-bold">LIVE</div>
                  <div class="text-xs opacity-80">Demo</div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Floating Secondary Elements -->
          <div class="absolute -top-8 -right-8 w-24 h-24 rounded-2xl overflow-hidden shadow-xl border-4 border-custom-white transform rotate-12 hover:rotate-0 transition-transform duration-500 bg-gradient-to-br from-green-500 to-green-600">
            <div class="w-full h-full flex items-center justify-center text-custom-white">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
            </div>
          </div>

          <div class="absolute -bottom-12 left-4 w-28 h-28 rounded-2xl overflow-hidden shadow-xl border-4 border-custom-white transform -rotate-6 hover:rotate-0 transition-transform duration-500 bg-gradient-to-br from-blue-500 to-blue-600">
            <div class="w-full h-full flex items-center justify-center text-custom-white text-sm font-bold">
              100%<br>FREE
            </div>
          </div>
          
          <div class="absolute top-1/2 -left-4 w-20 h-20 rounded-xl overflow-hidden shadow-lg border-3 border-custom-white transform rotate-45 hover:rotate-0 transition-transform duration-500 bg-gradient-to-br from-custom-primary to-custom-secondary">
            <div class="w-full h-full flex items-center justify-center text-custom-white text-xs font-bold transform -rotate-45">
              24/7
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>