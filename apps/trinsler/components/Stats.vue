<template>
  <section class="relative py-20 lg:py-32 overflow-hidden matrix-bg">
    <!-- Matrix Rain Effect -->
    <div class="absolute inset-0 cyber-grid opacity-30"></div>
    
    <!-- Complex Data Streams -->
    <div class="absolute inset-0">
      <div class="animate-data-stream absolute left-8 w-1 h-48 bg-linear-to-b from-transparent via-accent-neon to-transparent" style="animation-delay: 0s;"></div>
      <div class="animate-data-stream absolute left-24 w-1 h-36 bg-linear-to-b from-transparent via-accent-cyan to-transparent" style="animation-delay: 0.5s;"></div>
      <div class="animate-data-stream absolute left-40 w-1 h-42 bg-linear-to-b from-transparent via-accent-purple to-transparent" style="animation-delay: 1s;"></div>
      <div class="animate-data-stream absolute right-40 w-1 h-38 bg-linear-to-b from-transparent via-accent-orange to-transparent" style="animation-delay: 1.5s;"></div>
      <div class="animate-data-stream absolute right-24 w-1 h-44 bg-linear-to-b from-transparent via-accent-pink to-transparent" style="animation-delay: 2s;"></div>
      <div class="animate-data-stream absolute right-8 w-1 h-32 bg-linear-to-b from-transparent via-accent-neon to-transparent" style="animation-delay: 2.5s;"></div>
    </div>

    <!-- Floating Code Matrix -->
    <div class="absolute inset-0 data-points">
      <div class="floating-element absolute top-16 left-20 code-font text-accent-neon text-xs opacity-70">console.log("portfolio: €2.4M")</div>
      <div class="floating-element absolute top-32 right-32 code-font text-accent-cyan text-xs opacity-70" style="animation-delay: 1s;">growth.rate = 5.2x</div>
      <div class="floating-element absolute bottom-40 left-1/4 code-font text-accent-purple text-xs opacity-70" style="animation-delay: 2s;">success.percentage = 89%</div>
      <div class="floating-element absolute top-2/3 right-1/4 code-font text-accent-orange text-xs opacity-70" style="animation-delay: 3s;">startups.active = 12</div>
    </div>

    <div class="relative container-custom">
      <!-- Matrix Terminal Header -->
      <div class="text-center mb-20">
        <!-- Terminal System Status -->
        <div class="cyber-card rounded-2xl p-6 max-w-4xl mx-auto mb-8">
          <div class="code-font text-accent-neon text-sm mb-4">
            <span class="text-accent-cyan">analytics@trinsler:~$</span> run --portfolio-analysis --real-time
          </div>
          <div class="neon-card rounded-xl px-6 py-3 inline-block animate-neon-flicker">
            <span class="code-font text-accent-neon">[DATA_MATRIX_ACTIVE]</span>
            <span class="text-white ml-2">PERFORMANCE_SCAN.EXE</span>
          </div>
        </div>
        
        <!-- ASCII Numbers Display -->
        <div class="mb-8">
          <h2 class="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 animate-glitch">
            <span class="code-font text-accent-neon">></span> 
            <span class="gradient-text-neon">DATEN</span> SPRECHEN
            <br />
            <span class="text-accent-cyan code-font">_LAUTER_ALS_WORTE</span>
          </h2>
        </div>
        
        <!-- Mission Brief -->
        <div class="cyber-card rounded-xl p-6 max-w-4xl mx-auto">
          <div class="code-font text-accent-purple text-sm mb-3">/* ANALYTICS_REPORT.json */</div>
          <p class="text-xl text-white/90 leading-relaxed">
            <span class="text-accent-cyan">ERGEBNIS:</span> Unsere Equity-for-Growth-Strategie zeigt 
            <span class="font-bold text-glow-green">messbare Performance</span>. 
            Jeder Partner profitiert von unserem <span class="text-accent-neon">datenbasierten Algorithmus</span>.
          </p>
          <div class="code-font text-accent-orange text-sm mt-4">
            return portfolio.success_rate > 0.89;
          </div>
        </div>
      </div>

      <!-- Matrix Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        <div 
          v-for="(stat, index) in stats" 
          :key="stat.label" 
          class="group relative animate-slide-up-stagger"
          :style="`animation-delay: ${index * 0.2}s`"
        >
          <!-- Terminal Stat Window -->
          <div class="cyber-card rounded-2xl overflow-hidden transition-all duration-500 hover:scale-105 animate-glow-pulse">
            <!-- Terminal Header -->
            <div class="bg-surface-1 px-4 py-3 border-b border-accent-neon/30">
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 rounded-full bg-accent-neon "></div>
                <div class="code-font text-accent-cyan text-xs">METRIC_{{ index + 1 }}.exe</div>
              </div>
            </div>
            
            <!-- Terminal Content -->
            <div class="p-6 text-center code-pattern">
              <!-- Process Icon -->
              <div class="relative mb-6">
                <div :class="stat.iconBg" class="w-16 h-16 rounded-xl mx-auto flex items-center justify-center group-hover:scale-110 transition-transform duration-300 animate-neon-flicker">
                  <component :is="stat.icon" class="w-8 h-8 text-white" />
                </div>
                <div class="absolute -top-1 -right-1 w-3 h-3 bg-accent-neon rounded-full "></div>
              </div>

              <!-- Variable Declaration -->
              <div class="code-font text-accent-cyan text-xs mb-2">let {{ stat.variable }} =</div>
              
              <!-- Value Display -->
              <div class="mb-4">
                <div class="text-4xl lg:text-5xl font-black text-white mb-2 animate-glitch" :class="stat.glowClass">
                  {{ stat.value }}
                </div>
                <div class="code-font text-accent-purple text-sm mb-1">// {{ stat.label }}</div>
                <div class="text-white/70 text-xs">{{ stat.description }}</div>
              </div>

              <!-- Progress Bar as Code -->
              <div class="relative mt-4">
                <div class="code-font text-accent-cyan text-xs mb-2">progress: {{ stat.progress }}%</div>
                <div class="h-2 bg-surface-2 rounded-full overflow-hidden">
                  <div 
                    class="h-full rounded-full transition-all duration-2000 ease-out"
                    :class="stat.progressColor"
                    :style="`width: ${stat.progress}%; animation-delay: ${index * 0.3}s`"
                  ></div>
                </div>
              </div>
              
              <!-- Status -->
              <div class="mt-4 pt-4 border-t border-accent-neon/20">
                <div class="flex items-center justify-center gap-2 code-font text-xs">
                  <span class="text-accent-neon ">●</span>
                  <span class="text-white/60">{{ stat.status }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Portfolio Highlights -->
      <div class="glass-card rounded-3xl p-8 lg:p-12">
        <div class="text-center mb-12">
          <h3 class="text-3xl lg:text-4xl font-bold text-white mb-4">
            <span class="gradient-text">Live Portfolio</span> Highlights
          </h3>
          <p class="text-white/80 text-lg">Aktuelle Erfolge unserer Partner-Startups</p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <div v-for="(highlight, index) in portfolioHighlights" :key="highlight.company" 
               class="text-center group animate-slide-up-stagger"
               :style="`animation-delay: ${index * 0.4}s`">
            <div class="glass-card rounded-2xl p-6 group-hover:scale-105 transition-transform duration-300">
              <div class="mb-4">
                <div class="text-3xl font-bold text-white mb-1">{{ highlight.metric }}</div>
                <div class="text-white/70 text-sm">{{ highlight.company }}</div>
              </div>
              <div class="text-green-400 font-semibold text-sm">{{ highlight.growth }}</div>
              <div class="text-white/60 text-xs mt-1">{{ highlight.period }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA Section -->
      <div class="text-center mt-16">
        <div class="max-w-2xl mx-auto">
          <h4 class="text-2xl lg:text-3xl font-bold text-white mb-6">
            Werden Sie Teil der <span class="gradient-text">Success Stories</span>
          </h4>
          <p class="text-white/80 mb-8">
            Lassen Sie uns gemeinsam Ihr Startup zu diesen Zahlen hinzufügen.
          </p>
          <div class="flex flex-col sm:flex-row items-center justify-center gap-6">
            <NuxtLink to="/contact" class="btn-primary group">
              <span>Jetzt Partnership starten</span>
              <svg class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
            </NuxtLink>
            <NuxtLink to="/portfolio" class="btn-secondary">
              <!-- Icon removed -->
              Alle Case Studies
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>

const stats = [
  { 
    value: '€2.4M', 
    label: 'Portfolio Value',
    description: 'Aktuelle Bewertung',
    variable: 'portfolio_value',
    iconBg: 'bg-linear-to-r from-accent-neon to-accent-cyan',
    glowClass: 'text-glow-green',
    progressColor: 'bg-linear-to-r from-accent-neon to-accent-cyan',
    progress: 85,
    status: 'GROWING'
  },
  { 
    value: '12', 
    label: 'Active Startups',
    description: 'Partner-Unternehmen',
    variable: 'active_startups',
    iconBg: 'bg-linear-to-r from-accent-cyan to-accent-purple',
    glowClass: 'text-glow-cyan',
    progressColor: 'bg-linear-to-r from-accent-cyan to-accent-purple',
    progress: 75,
    status: 'SCALING'
  },
  { 
    value: '5.2x', 
    label: 'Avg. Growth',
    description: 'Durchschnittliche Steigerung',
    variable: 'growth_multiplier',
    iconBg: 'bg-linear-to-r from-accent-purple to-accent-pink',
    glowClass: 'text-white',
    progressColor: 'bg-linear-to-r from-accent-purple to-accent-pink',
    progress: 92,
    status: 'OPTIMIZED'
  },
  { 
    value: '89%', 
    label: 'Success Rate',
    description: 'Erfolgreiche Partnerships',
    variable: 'success_percentage',
    iconBg: 'bg-linear-to-r from-accent-orange to-accent-neon',
    glowClass: 'text-glow-green',
    progressColor: 'bg-linear-to-r from-accent-orange to-accent-neon',
    progress: 89,
    status: 'VERIFIED'
  }
]

const portfolioHighlights = [
  {
    company: 'TechStartup X',
    metric: '+300%',
    growth: 'MRR Growth',
    period: 'letzte 6 Monate'
  },
  {
    company: 'SaaS Scale Y',
    metric: '€50K',
    growth: 'Monthly Revenue',
    period: 'von €5K zu €50K'
  },
  {
    company: 'Growth Rocket Z',
    metric: '10K+',
    growth: 'New Users',
    period: 'in 3 Monaten'
  }
]
</script>