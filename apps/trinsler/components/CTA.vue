<template>
  <section class="relative py-20 lg:py-32 overflow-hidden matrix-bg">
    <!-- Advanced Cyber Grid -->
    <div class="absolute inset-0 cyber-grid opacity-40" />

    <!-- Multiple Data Streams -->
    <div class="absolute inset-0">
      <div
        class="animate-data-stream absolute left-10 w-1 h-40 bg-gradient-to-b from-transparent via-accent-neon to-transparent"
        style="animation-delay: 0s"
      />
      <div
        class="animate-data-stream absolute left-1/4 w-1 h-32 bg-gradient-to-b from-transparent via-accent-cyan to-transparent"
        style="animation-delay: 1s"
      />
      <div
        class="animate-data-stream absolute right-1/4 w-1 h-36 bg-gradient-to-b from-transparent via-accent-purple to-transparent"
        style="animation-delay: 2s"
      />
      <div
        class="animate-data-stream absolute right-10 w-1 h-28 bg-gradient-to-b from-transparent via-accent-orange to-transparent"
        style="animation-delay: 3s"
      />
    </div>

    <!-- Floating Code Fragments -->
    <div class="absolute inset-0">
      <div
        class="floating-element absolute top-20 left-16 code-font text-accent-neon text-xs opacity-60"
      >
        growth.scale(5x)
      </div>
      <div
        class="floating-element absolute top-40 right-24 code-font text-accent-cyan text-xs opacity-60"
        style="animation-delay: 1s"
      >
        equity.invest()
      </div>
      <div
        class="floating-element absolute bottom-32 left-1/4 code-font text-accent-purple text-xs opacity-60"
        style="animation-delay: 2s"
      >
        startup++
      </div>
      <div
        class="floating-element absolute top-1/3 right-1/3 code-font text-accent-orange text-xs opacity-60"
        style="animation-delay: 3s"
      >
        [SUCCESS]
      </div>
    </div>

    <div class="relative container-custom">
      <!-- Giant Terminal Window -->
      <div class="cyber-card rounded-3xl overflow-hidden max-w-6xl mx-auto animate-glow-pulse">
        <!-- Terminal Header -->
        <div class="bg-surface-1 px-6 py-4 border-b border-accent-neon/30">
          <div class="flex items-center gap-3">
            <div class="w-4 h-4 rounded-full bg-red-500" />
            <div class="w-4 h-4 rounded-full bg-yellow-500" />
            <div class="w-4 h-4 rounded-full bg-accent-neon" />
            <div class="ml-4 code-font text-accent-cyan text-lg">
              ~/final-mission/execute_growth.sh
            </div>
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
            <pre class="animate-slide-up-stagger" style="animation-delay: 0.2s">
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
          <div class="mb-12 animate-slide-up-stagger" style="animation-delay: 0.4s">
            <h2 class="text-4xl sm:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
              <span class="text-white">BEREIT FÜR</span>
              <br />
              <span class="gradient-text-neon" style="font-family: 'Space Grotesk', sans-serif">
                NACHHALTIGES
              </span>
              <br />
              <span class="text-accent-cyan">WACHSTUM?</span>
            </h2>
          </div>

          <!-- Mission Brief -->
          <div class="mb-12 animate-slide-up-stagger" style="animation-delay: 0.6s">
            <Card class="bg-card/80 backdrop-blur-sm border-primary/20 hover:border-primary/30 transition-colors max-w-4xl mx-auto">
              <CardContent class="p-8">
                <Badge variant="secondary" class="text-purple-400 bg-card/50 text-sm mb-4">Warum Trinsler anders ist</Badge>
                <p class="text-xl lg:text-2xl text-foreground/90 leading-relaxed mb-6">
                  <span class="text-cyan-400">Unser Ansatz:</span> Anstatt monatlich 5.000€+ für
                  Marketing zu zahlen,
                  <span class="font-bold text-glow-green"
                    >arbeiten wir für Unternehmensanteile plus eine kleine Grundgebühr</span
                  >. So sind wir direkt am Erfolg Ihres Startups beteiligt.
                </p>
                <div class="text-orange-400 text-lg">
                  Interessiert? Vereinbaren Sie ein kostenloses Erstgespräch
                </div>
              </CardContent>
            </Card>
          </div>

          <!-- System Modules -->
          <div
            class="grid md:grid-cols-3 gap-6 mb-16 animate-slide-up-stagger"
            style="animation-delay: 0.8s"
          >
            <Card
              v-for="(benefit, index) in benefits"
              :key="benefit.title"
              class="bg-card/80 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-colors group magnetic-hover"
              :style="`animation-delay: ${index * 0.3}s`"
            >
              <CardContent class="p-6">
                <div class="flex items-center gap-3 mb-4">
                  <div
                    :class="benefit.iconBg"
                    class="w-10 h-10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform animate-neon-flicker"
                  >
                    <div class="w-5 h-5 text-white" />
                  </div>
                  <Badge variant="secondary" class="text-cyan-400 text-xs bg-card/50">Vorteil {{ index + 1 }}</Badge>
                </div>
                <CardTitle class="text-foreground font-bold text-lg mb-2">{{ benefit.title }}</CardTitle>
                <p class="text-muted-foreground text-sm mb-4">{{ benefit.description }}</p>
                <div class="text-primary text-xs flex items-center gap-1">
                  <span class="text-green-400">✓</span> Verfügbar
                </div>
              </CardContent>
            </Card>
          </div>

          <!-- Execute Buttons -->
          <div
            class="flex flex-col lg:flex-row items-center justify-center gap-8 mb-12 animate-slide-up-stagger"
            style="animation-delay: 1s"
          >
            <Button asChild size="lg" class="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-4 text-xl rounded-xl border border-primary/20 code-font animate-glow-pulse transform hover:scale-110" style="box-shadow: 0 4px 14px var(--glow-blue);">
              <NuxtLink to="/contact" class="group relative overflow-hidden flex items-center">
                <span class="relative z-10">
                  Kostenloses Wachstums-Audit
                </span>
                <svg
                  class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </NuxtLink>
            </Button>

            <Button asChild variant="secondary" size="lg" class="bg-secondary hover:bg-accent text-secondary-foreground border border-border hover:border-primary/50 px-8 py-4 text-lg rounded-xl code-font hover:scale-105 transition-all duration-300">
              <NuxtLink to="/portfolio" class="group">
                Erfolgsgeschichten ansehen
              </NuxtLink>
            </Button>
          </div>

          <!-- System Status Dashboard -->
          <Card
            class="bg-card/80 backdrop-blur-sm border-primary/20 hover:border-primary/30 transition-colors animate-slide-up-stagger"
            style="animation-delay: 1.2s"
          >
            <CardHeader class="pb-4">
              <div class="code-font text-cyan-400 text-sm">SYSTEM_STATUS.json</div>
            </CardHeader>
            <CardContent class="pt-0">
              <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div class="text-center">
                  <div class="flex items-center justify-center gap-2 mb-2">
                    <div class="w-3 h-3 bg-primary rounded-full" />
                    <span class="code-font text-cyan-400 text-sm">ACTIVE_PARTNERSHIPS</span>
                  </div>
                  <div class="text-2xl font-bold text-glow-green">12</div>
                </div>
                <div class="text-center">
                  <div class="flex items-center justify-center gap-2 mb-2">
                    <span class="code-font text-purple-400 text-sm">AUDIT_AVAILABLE</span>
                  </div>
                  <div class="text-lg font-bold text-foreground">FREE</div>
                </div>
                <div class="text-center">
                  <div class="flex items-center justify-center gap-2 mb-2">
                    <span class="code-font text-orange-400 text-sm">GROWTH_RATE</span>
                  </div>
                  <div class="text-2xl font-bold text-glow-cyan">5.2x</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <!-- Final System Message -->
          <div class="mt-8 animate-slide-up-stagger" style="animation-delay: 1.4s">
            <div class="code-font text-accent-neon text-sm">
              <span class="text-accent-cyan">system@trinsler:~$</span> echo "100% risikofrei - Wir
              arbeiten bis zum Erfolg"
            </div>
            <p class="text-white/80 text-sm mt-2">
              💡 <span class="font-semibold text-glow-green">GARANTIE:</span> Continuous operation
              until growth.success === true
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import Button from '~/components/ui/Button.vue'
import Card from '~/components/ui/Card.vue'
import CardContent from '~/components/ui/CardContent.vue'
import CardHeader from '~/components/ui/CardHeader.vue'
import CardTitle from '~/components/ui/CardTitle.vue'
import Badge from '~/components/ui/Badge.vue'

const benefits = [
  {
    title: 'Niedrige Kosten',
    description: '80% weniger als klassische Agenturen',
    iconBg: 'bg-gradient-to-r from-green-500 to-emerald-600',
  },
  {
    title: 'Aligned Interests',
    description: 'Wir verdienen nur, wenn Sie wachsen',
    iconBg: 'bg-gradient-to-r from-red-500 to-pink-600',
  },
  {
    title: 'Operative Excellence',
    description: 'Echte Skills, keine Beratung',
    iconBg: 'bg-gradient-to-r from-blue-500 to-purple-600',
  },
]
</script>
