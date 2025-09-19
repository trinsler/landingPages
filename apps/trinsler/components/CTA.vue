<template>
  <section class="relative py-20 lg:py-32 overflow-hidden matrix-bg">
    <!-- Advanced Cyber Grid -->
    <div class="absolute inset-0 cyber-grid opacity-40"></div>
    
    <!-- Multiple Data Streams -->
    <div class="absolute inset-0">
      <div class="animate-data-stream absolute left-10 w-1 h-40 bg-gradient-to-b from-transparent via-accent-neon to-transparent" style="animation-delay: 0s;"></div>
      <div class="animate-data-stream absolute left-1/4 w-1 h-32 bg-gradient-to-b from-transparent via-accent-cyan to-transparent" style="animation-delay: 1s;"></div>
      <div class="animate-data-stream absolute right-1/4 w-1 h-36 bg-gradient-to-b from-transparent via-accent-purple to-transparent" style="animation-delay: 2s;"></div>
      <div class="animate-data-stream absolute right-10 w-1 h-28 bg-gradient-to-b from-transparent via-accent-orange to-transparent" style="animation-delay: 3s;"></div>
    </div>

    <!-- Floating Code Fragments -->
    <div class="absolute inset-0">
      <div class="floating-element absolute top-20 left-16 code-font text-accent-neon text-xs opacity-60">growth.scale(5x)</div>
      <div class="floating-element absolute top-40 right-24 code-font text-accent-cyan text-xs opacity-60" style="animation-delay: 1s;">equity.invest()</div>
      <div class="floating-element absolute bottom-32 left-1/4 code-font text-accent-purple text-xs opacity-60" style="animation-delay: 2s;">startup++</div>
      <div class="floating-element absolute top-1/3 right-1/3 code-font text-accent-orange text-xs opacity-60" style="animation-delay: 3s;">[SUCCESS]</div>
    </div>

    <div class="relative container-custom">
      <!-- Giant Terminal Window -->
      <div class="cyber-card rounded-3xl overflow-hidden max-w-6xl mx-auto animate-glow-pulse">
        <!-- Terminal Header -->
        <div class="bg-surface-1 px-6 py-4 border-b border-accent-neon/30">
          <div class="flex items-center gap-3">
            <div class="w-4 h-4 rounded-full bg-red-500"></div>
            <div class="w-4 h-4 rounded-full bg-yellow-500"></div>
            <div class="w-4 h-4 rounded-full bg-accent-neon "></div>
            <div class="ml-4 code-font text-accent-cyan text-lg">~/final-mission/execute_growth.sh</div>
          </div>
        </div>
        
        <!-- Terminal Content -->
        <div class="p-8 lg:p-16 text-center code-pattern">
          <!-- System Boot -->
          <div class="mb-8">
            <div class="code-font text-accent-neon text-sm mb-4 animate-slide-up-stagger">
              <span class="text-accent-cyan">root@trinsler-hq:~$</span> initialize --final-mission
            </div>
            <div class="neon-card rounded-xl px-6 py-3 inline-block animate-neon-flicker">
              <span class="code-font text-accent-neon text-lg">[SYSTEM_READY]</span>
              <span class="text-white ml-2">GROWTH_REVOLUTION.EXE</span>
            </div>
          </div>

          <!-- ASCII Art Terminal Banner -->
          <div class="code-font text-accent-neon text-sm mb-12 overflow-hidden">
            <pre class="animate-slide-up-stagger" style="animation-delay: 0.2s;">
  ╔══════════════════════════════════════════════╗
  ║                                              ║
  ║      ██████  ██████   ██████  ██     ██      ║
  ║     ██       ██   ██ ██    ██ ██     ██      ║
  ║     ██   ███ ██████  ██    ██ ██  █  ██      ║
  ║     ██    ██ ██   ██ ██    ██ ██ ███ ██      ║
  ║      ██████  ██   ██  ██████   ███ ███       ║
  ║                                              ║
  ║         R E V O L U T I O N . E X E          ║
  ║                                              ║
  ╚══════════════════════════════════════════════╝
            </pre>
          </div>

          <!-- Dynamic Headline -->
          <div class="mb-12 animate-slide-up-stagger" style="animation-delay: 0.4s;">
            <h2 class="text-4xl sm:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
              <span class="text-white">BEREIT FÜR</span>
              <br />
              <span class="gradient-text-neon" style="font-family: 'Space Grotesk', sans-serif;">
                NACHHALTIGES
              </span>
              <br />
              <span class="text-accent-cyan">WACHSTUM?</span>
            </h2>
          </div>

          <!-- Mission Brief -->
          <div class="mb-12 animate-slide-up-stagger" style="animation-delay: 0.6s;">
            <div class="cyber-card rounded-2xl p-8 max-w-4xl mx-auto">
              <div class="text-accent-purple text-sm mb-4">Warum Trinsler anders ist</div>
              <p class="text-xl lg:text-2xl text-white/90 leading-relaxed mb-6">
                <span class="text-accent-cyan">Unser Ansatz:</span> Anstatt monatlich 5.000€+ für Marketing zu zahlen, 
                <span class="font-bold text-glow-green">arbeiten wir für Unternehmensanteile plus eine kleine Grundgebühr</span>. 
                So sind wir direkt am Erfolg Ihres Startups beteiligt.
              </p>
              <div class="text-accent-orange text-lg">
                Interessiert? Vereinbaren Sie ein kostenloses Erstgespräch
              </div>
            </div>
          </div>

          <!-- System Modules -->
          <div class="grid md:grid-cols-3 gap-6 mb-16 animate-slide-up-stagger" style="animation-delay: 0.8s;">
            <div v-for="(benefit, index) in benefits" :key="benefit.title" 
                 class="neon-card rounded-2xl p-6 group magnetic-hover"
                 :style="`animation-delay: ${index * 0.3}s`">
              <div class="flex items-center gap-3 mb-4">
                <div :class="benefit.iconBg" class="w-10 h-10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform animate-neon-flicker">
                  <component :is="benefit.icon" class="w-5 h-5 text-white" />
                </div>
                <div class="text-accent-cyan text-xs">Vorteil {{ index + 1 }}</div>
              </div>
              <h3 class="text-white font-bold text-lg mb-2">{{ benefit.title }}</h3>
              <p class="text-white/80 text-sm mb-4">{{ benefit.description }}</p>
              <div class="text-accent-neon text-xs">
                <span class="">✓</span> Verfügbar
              </div>
            </div>
          </div>

          <!-- Execute Buttons -->
          <div class="flex flex-col lg:flex-row items-center justify-center gap-8 mb-12 animate-slide-up-stagger" style="animation-delay: 1s;">
            <NuxtLink
              to="/contact"
              class="btn-primary group relative overflow-hidden code-font text-xl animate-glow-pulse transform hover:scale-110 transition-all duration-300"
            >
              <span class="relative z-10 flex items-center">
                Kostenloses Wachstums-Audit
                <svg class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
              </span>
            </NuxtLink>

            <NuxtLink
              to="/portfolio"
              class="btn-secondary group code-font text-lg hover:scale-105 transition-all duration-300"
            >
              Erfolgsgeschichten ansehen
            </NuxtLink>
          </div>

          <!-- System Status Dashboard -->
          <div class="cyber-card rounded-2xl p-8 animate-slide-up-stagger" style="animation-delay: 1.2s;">
            <div class="code-font text-accent-cyan text-sm mb-4">SYSTEM_STATUS.json</div>
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div class="text-center">
                <div class="flex items-center justify-center gap-2 mb-2">
                  <div class="w-3 h-3 bg-accent-neon rounded-full "></div>
                  <span class="code-font text-accent-cyan text-sm">ACTIVE_PARTNERSHIPS</span>
                </div>
                <div class="text-2xl font-bold text-glow-green">12</div>
              </div>
              <div class="text-center">
                <div class="flex items-center justify-center gap-2 mb-2">
                  <!-- Icon removed -->
                  <span class="code-font text-accent-purple text-sm">AUDIT_AVAILABLE</span>
                </div>
                <div class="text-lg font-bold text-white">FREE</div>
              </div>
              <div class="text-center">
                <div class="flex items-center justify-center gap-2 mb-2">
                  <!-- Icon removed -->
                  <span class="code-font text-accent-orange text-sm">GROWTH_RATE</span>
                </div>
                <div class="text-2xl font-bold text-glow-cyan">5.2x</div>
              </div>
            </div>
          </div>

          <!-- Final System Message -->
          <div class="mt-8 animate-slide-up-stagger" style="animation-delay: 1.4s;">
            <div class="code-font text-accent-neon text-sm">
              <span class="text-accent-cyan">system@trinsler:~$</span> echo "100% risikofrei - Wir arbeiten bis zum Erfolg"
            </div>
            <p class="text-white/80 text-sm mt-2">
              💡 <span class="font-semibold text-glow-green">GARANTIE:</span> Continuous operation until growth.success === true
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>

const benefits = [
  {
    title: 'Niedrige Kosten',
    description: '80% weniger als klassische Agenturen',
    iconBg: 'bg-gradient-to-r from-green-500 to-emerald-600'
  },
  {
    title: 'Aligned Interests',
    description: 'Wir verdienen nur, wenn Sie wachsen',
    iconBg: 'bg-gradient-to-r from-red-500 to-pink-600'
  },
  {
    title: 'Operative Excellence',
    description: 'Echte Skills, keine Beratung',
    iconBg: 'bg-gradient-to-r from-blue-500 to-purple-600'
  }
]
</script>