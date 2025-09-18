<template>
  <section class="relative min-h-screen overflow-hidden matrix-bg pt-20">
    <!-- Cyber Grid Background -->
    <div class="absolute inset-0 cyber-grid opacity-30"></div>
    
    <!-- Data Stream Particles -->
    <div class="absolute inset-0">
      <div class="animate-data-stream absolute left-10 w-1 h-20 bg-gradient-to-b from-transparent via-accent-neon to-transparent" style="animation-delay: 0s;"></div>
      <div class="animate-data-stream absolute left-32 w-1 h-16 bg-gradient-to-b from-transparent via-accent-cyan to-transparent" style="animation-delay: 1s;"></div>
      <div class="animate-data-stream absolute right-20 w-1 h-24 bg-gradient-to-b from-transparent via-accent-purple to-transparent" style="animation-delay: 2s;"></div>
      <div class="animate-data-stream absolute right-40 w-1 h-12 bg-gradient-to-b from-transparent via-accent-neon to-transparent" style="animation-delay: 3s;"></div>
    </div>

    <!-- Floating Code Elements -->
    <div class="absolute inset-0 data-points">
      <div class="floating-element absolute top-20 left-16 text-accent-primary text-xs opacity-60">Wachstum</div>
      <div class="floating-element absolute top-40 right-24 text-accent-cyan text-xs opacity-60" style="animation-delay: 1s;">Skalierung</div>
      <div class="floating-element absolute bottom-32 left-1/4 text-accent-purple text-xs opacity-60" style="animation-delay: 2s;">Equity+</div>
      <div class="floating-element absolute top-1/3 right-1/3 text-accent-primary text-xs opacity-60" style="animation-delay: 3s;">Investment</div>
    </div>

    <div class="relative container-custom py-20 lg:py-32">
      <div class="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
        <!-- Left Content -->
        <div class="max-w-2xl">
          <!-- Status Badge -->
          <div class="mb-8 animate-slide-up-stagger">
            <div class="inline-flex items-center neon-card rounded-full px-6 py-3 text-sm font-semibold animate-neon-flicker">
              <div class="w-2 h-2 bg-accent-primary rounded-full  mr-3"></div>
              <span class="text-glow-blue">Aktiv</span>
              <span class="text-accent-cyan ml-2">Equity-for-Growth</span>
              <ChevronRightIcon class="ml-2 h-4 w-4 text-accent-neon" />
            </div>
          </div>

          <!-- Main Headline -->
          <h1 class="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-none mb-8 animate-slide-up-stagger" style="animation-delay: 0.2s;">
            <span class="text-white">STARTUP</span>
            <br />
            <span class="gradient-text-neon font-extrabold" style="font-family: 'Space Grotesk', sans-serif;">
              WACHSTUM
            </span>
            <br />
            <span class="text-accent-cyan">NEU GEDACHT</span>
          </h1>

          <!-- Value Proposition -->
          <div class="mb-10 animate-slide-up-stagger" style="animation-delay: 0.4s;">
            <div class="cyber-card rounded-xl p-6">
              <div class="text-accent-primary text-sm mb-3">Unser Versprechen</div>
              <p class="text-lg leading-relaxed text-white/90 mb-4">
                Wir sind keine klassische Marketing-Agentur. Statt monatlich 5.000€+ zu zahlen, 
                <span class="font-bold text-glow-blue">arbeiten wir für Unternehmensanteile plus eine kleine Grundgebühr</span>. 
              </p>
              <p class="text-white/80">
                <span class="text-accent-cyan">Was wir leisten:</span> Komplettes Marketing und Wachstums-Management<br />
                <span class="text-accent-purple">Ihr Vorteil:</span> 80% weniger Kosten als herkömmliche Agenturen<br />
                <span class="text-accent-primary">Unsere Vergütung:</span> 5-20% Firmenanteile plus 100-500€ monatlich
              </p>
            </div>
          </div>

          <!-- Cyber CTAs -->
          <div class="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-12 animate-slide-up-stagger" style="animation-delay: 0.6s;">
            <NuxtLink
              to="/contact"
              class="btn-primary group animate-glow-pulse"
            >
              <span>Kostenloses Wachstums-Audit</span>
              <ArrowRightIcon class="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </NuxtLink>
            <NuxtLink
              to="/portfolio"
              class="btn-secondary magnetic-hover"
            >
              <PlayIcon class="mr-2 h-5 w-5" />
              Erfolgsgeschichten ansehen
            </NuxtLink>
          </div>

          <!-- Key Benefits -->
          <div class="grid grid-cols-3 gap-8 animate-slide-up-stagger" style="animation-delay: 0.8s;">
            <div class="neon-card rounded-xl p-4 text-center magnetic-hover">
              <div class="text-xs text-accent-cyan mb-1">Kostenersparnis</div>
              <div class="text-3xl font-black text-glow-blue mb-1">80%</div>
              <div class="text-xs text-white/60">gegenüber Agenturen</div>
            </div>
            <div class="cyber-card rounded-xl p-4 text-center magnetic-hover">
              <div class="text-xs text-accent-purple mb-1">Firmenanteile</div>
              <div class="text-3xl font-black text-glow-cyan mb-1">5-20%</div>
              <div class="text-xs text-white/60">je nach Projektumfang</div>
            </div>
            <div class="glass-card rounded-xl p-4 text-center magnetic-hover">
              <div class="text-xs text-accent-primary mb-1">Gründung</div>
              <div class="text-3xl font-black text-white mb-1 animate-glitch">2025</div>
              <div class="text-xs text-white/60">erste Partnerschaften</div>
            </div>
          </div>
        </div>

        <!-- Right Visual: Cyber Dashboard -->
        <div class="mt-16 lg:mt-0 relative">
          <!-- Main Terminal Dashboard -->
          <div class="relative">
            <!-- Terminal Window -->
            <div class="cyber-card rounded-2xl overflow-hidden animate-glow-pulse">
              <!-- Terminal Header -->
              <div class="bg-surface-1 px-6 py-3 border-b border-accent-neon/30">
                <div class="flex items-center gap-2">
                  <div class="w-3 h-3 rounded-full bg-red-500"></div>
                  <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div class="w-3 h-3 rounded-full bg-accent-neon"></div>
                  <div class="ml-4 text-accent-cyan text-sm">Wachstums-Dashboard</div>
                </div>
              </div>
              
              <!-- Terminal Content -->
              <div class="p-6 code-pattern">
                <div class="text-accent-primary text-sm mb-4">
                  Portfolio Übersicht
                </div>
                
                <!-- JSON Output -->
                <div class="grid grid-cols-2 gap-4 mb-6 text-sm">
                  <div class="neon-card rounded-xl p-4">
                    <div class="text-accent-cyan mb-2">Portfolio Wert:</div>
                    <div class="text-2xl font-bold text-glow-blue mb-1">€2.4M</div>
                    <div class="text-accent-primary text-xs">+127% jährlich</div>
                  </div>
                  <div class="cyber-card rounded-xl p-4">
                    <div class="text-accent-purple mb-2">Aktive Startups:</div>
                    <div class="text-2xl font-bold text-glow-cyan mb-1">12</div>
                    <div class="text-accent-cyan text-xs">+300% Wachstum</div>
                  </div>
                  <div class="glass-card rounded-xl p-4">
                    <div class="text-accent-primary mb-2">Erfolgsrate:</div>
                    <div class="text-2xl font-bold text-white mb-1 animate-glitch">89%</div>
                    <div class="text-accent-purple text-xs">Branchenführend</div>
                  </div>
                  <div class="neon-card rounded-xl p-4">
                    <div class="text-accent-orange mb-2">Ø Bewertung:</div>
                    <div class="text-2xl font-bold text-glow-blue mb-1">€500K</div>
                    <div class="text-accent-primary text-xs">+400% Exit</div>
                  </div>
                </div>
                
                <!-- Live Terminal Log -->
                <div class="border-t border-accent-neon/20 pt-4">
                  <div class="text-accent-cyan text-sm mb-3">
                    <span class="">●</span> Live Aktivitäten
                  </div>
                  <div class="space-y-2 text-xs">
                    <div class="flex justify-between">
                      <span class="text-white/70">Startup X</span>
                      <span class="text-accent-primary">Umsatz +12%</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-white/70">SaaS Scale</span>
                      <span class="text-accent-cyan">Nutzer +2.1K</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-white/70">Growth Rocket</span>
                      <span class="text-accent-purple">Einnahmen +45%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Floating Metrics -->
            <div class="absolute -top-6 -left-6 neon-card rounded-xl p-4 floating-element animate-neon-flicker">
              <div class="text-center">
                <div class="text-xs text-accent-cyan mb-1">Wachstumsrate</div>
                <div class="text-xl font-bold text-glow-blue">5.2x</div>
              </div>
            </div>

            <div class="absolute -bottom-6 -right-6 cyber-card rounded-xl p-4 floating-element" style="animation-delay: 1s;">
              <div class="text-center">
                <div class="text-xs text-accent-purple mb-1">Exits gesamt</div>
                <div class="text-xl font-bold text-glow-cyan">€50M+</div>
              </div>
            </div>

            <div class="absolute top-1/2 -right-4 glass-card rounded-xl p-3 floating-element" style="animation-delay: 2s;">
              <div class="text-center">
                <div class="text-xs text-accent-primary mb-1">Verfügbarkeit</div>
                <div class="text-lg font-bold text-white">24/7</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Gradient Fade -->
    <div class="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-base-bg to-transparent"></div>
  </section>
</template>

<script setup>
import { ChevronRightIcon, ArrowRightIcon, PlayIcon } from '@heroicons/vue/24/outline'
</script>