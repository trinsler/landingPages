<template>
  <section class="relative min-h-screen overflow-hidden matrix-bg pt-20">
    <!-- Cyber Grid Background -->
    <div class="absolute inset-0 cyber-grid opacity-30" />

    <!-- Data Stream Particles -->
    <div class="absolute inset-0">
      <div
        class="animate-data-stream absolute left-10 w-1 h-20 bg-gradient-to-b from-transparent via-accent-neon to-transparent"
        style="animation-delay: 0s"
      />
      <div
        class="animate-data-stream absolute left-32 w-1 h-16 bg-gradient-to-b from-transparent via-accent-cyan to-transparent"
        style="animation-delay: 1s"
      />
      <div
        class="animate-data-stream absolute right-20 w-1 h-24 bg-gradient-to-b from-transparent via-accent-purple to-transparent"
        style="animation-delay: 2s"
      />
      <div
        class="animate-data-stream absolute right-40 w-1 h-12 bg-gradient-to-b from-transparent via-accent-neon to-transparent"
        style="animation-delay: 3s"
      />
    </div>

    <!-- Floating Code Elements -->
    <div class="absolute inset-0 data-points">
      <div class="floating-element absolute top-20 left-16 text-accent-primary text-xs opacity-60">
        Web Apps
      </div>
      <div
        class="floating-element absolute top-40 right-24 text-accent-cyan text-xs opacity-60"
        style="animation-delay: 1s"
      >
        Landing Pages
      </div>
      <div
        class="floating-element absolute bottom-32 left-1/4 text-accent-purple text-xs opacity-60"
        style="animation-delay: 2s"
      >
        Websites
      </div>
      <div
        class="floating-element absolute top-1/3 right-1/3 text-accent-primary text-xs opacity-60"
        style="animation-delay: 3s"
      >
        4-8 Wochen
      </div>
    </div>

    <div class="relative container-custom py-20 lg:py-32">
      <div class="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
        <!-- Left Content -->
        <div class="max-w-2xl">
          <!-- Status Badge -->
          <div class="mb-8 animate-slide-up-stagger">
            <Badge variant="secondary" class="inline-flex items-center bg-card/80 backdrop-blur-sm border-primary/20 text-foreground rounded-full px-6 py-3 text-sm font-semibold animate-neon-flicker hover:border-primary/40 transition-colors">
              <div class="w-2 h-2 bg-primary rounded-full mr-3" />
              <span class="text-glow-blue">Verfügbar</span>
              <span class="text-cyan-400 ml-2">Web Development</span>
            </Badge>
          </div>

          <!-- Main Headline -->
          <h1
            class="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-none mb-8 animate-slide-up-stagger"
            style="animation-delay: 0.2s"
          >
            <span class="text-white">WEB</span>
            <br />
            <span
              class="gradient-text-neon font-extrabold"
              style="font-family: 'Space Grotesk', sans-serif"
            >
              SOLUTIONS
            </span>
            <br />
            <span class="text-accent-cyan">EINFACH GUT</span>
          </h1>

          <!-- Value Proposition -->
          <div class="mb-10 animate-slide-up-stagger" style="animation-delay: 0.4s">
            <Card class="bg-card/80 backdrop-blur-sm border-primary/20 hover:border-primary/30 transition-colors">
              <CardContent class="p-6">
                <div class="text-primary text-sm mb-3">Unser Versprechen</div>
                <p class="text-lg leading-relaxed text-foreground/90 mb-4">
                  Wir entwickeln professionelle Web-Applikationen, Landing Pages und Websites.
                  <span class="font-bold text-glow-blue"
                    >Moderne Technologien, faire Preise, schnelle Lieferung</span
                  >.
                </p>
                <p class="text-muted-foreground">
                  <span class="text-cyan-400">Services:</span> Web Apps, Landing Pages, Websites<br />
                  <span class="text-purple-400">Timeline:</span> 2-8 Wochen je nach Projekt<br />
                  <span class="text-primary">Pricing:</span> Custom quotes based on
                  requirements
                </p>
              </CardContent>
            </Card>
          </div>

          <!-- Cyber CTAs -->
          <div
            class="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-12 animate-slide-up-stagger"
            style="animation-delay: 0.6s"
          >
            <Button asChild class="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 px-6 py-3 text-lg rounded-xl border border-primary/20" style="box-shadow: 0 4px 14px var(--glow-blue);">
              <NuxtLink to="/contact" class="group animate-glow-pulse">
                <span>Kostenloses Strategy-Gespräch</span>
              </NuxtLink>
            </Button>
            <Button asChild variant="secondary" class="bg-secondary hover:bg-accent text-secondary-foreground border border-border hover:border-primary/50 px-6 py-3 text-lg rounded-xl magnetic-hover transition-all duration-300">
              <NuxtLink to="/portfolio">
                Projekt-Portfolio ansehen
              </NuxtLink>
            </Button>
          </div>

          <!-- Key Benefits -->
          <div
            class="grid grid-cols-3 gap-8 animate-slide-up-stagger"
            style="animation-delay: 0.8s"
          >
            <Card class="bg-card/80 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-colors magnetic-hover">
              <CardContent class="p-4 text-center">
                <div class="text-xs text-cyan-400 mb-1">Entwicklungszeit</div>
                <div class="text-3xl font-black text-glow-blue mb-1">4-8</div>
                <div class="text-xs text-muted-foreground">Wochen Standard</div>
              </CardContent>
            </Card>
            <Card class="bg-card/80 backdrop-blur-sm border-purple-500/20 hover:border-purple-500/40 transition-colors magnetic-hover">
              <CardContent class="p-4 text-center">
                <div class="text-xs text-purple-400 mb-1">Ansatz</div>
                <div class="text-3xl font-black text-glow-cyan mb-1">Custom</div>
                <div class="text-xs text-muted-foreground">Requirements</div>
              </CardContent>
            </Card>
            <Card class="bg-card/60 backdrop-blur-lg border-primary/20 hover:border-primary/40 transition-colors magnetic-hover">
              <CardContent class="p-4 text-center">
                <div class="text-xs text-primary mb-1">Gründung</div>
                <div class="text-3xl font-black text-foreground mb-1 animate-glitch">2025</div>
                <div class="text-xs text-muted-foreground">erste Partnerschaften</div>
              </CardContent>
            </Card>
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
                  <div class="w-3 h-3 rounded-full bg-red-500" />
                  <div class="w-3 h-3 rounded-full bg-yellow-500" />
                  <div class="w-3 h-3 rounded-full bg-accent-neon" />
                  <div class="ml-4 text-accent-cyan text-sm">Wachstums-Dashboard</div>
                </div>
              </div>

              <!-- Terminal Content -->
              <div class="p-6 code-pattern">
                <div class="text-accent-primary text-sm mb-4">Web-Projekte Übersicht</div>

                <!-- JSON Output -->
                <div class="grid grid-cols-2 gap-4 mb-6 text-sm">
                  <div class="neon-card rounded-xl p-4">
                    <div class="text-accent-cyan mb-2">Projekte 2024:</div>
                    <div class="text-2xl font-bold text-glow-blue mb-1">15</div>
                    <div class="text-accent-primary text-xs">Web-Projekte</div>
                  </div>
                  <div class="cyber-card rounded-xl p-4">
                    <div class="text-accent-purple mb-2">Durchschnitt:</div>
                    <div class="text-2xl font-bold text-glow-cyan mb-1">4</div>
                    <div class="text-accent-cyan text-xs">Wochen bis Live</div>
                  </div>
                  <div class="glass-card rounded-xl p-4">
                    <div class="text-accent-primary mb-2">Kundenzufriedenheit:</div>
                    <div class="text-2xl font-bold text-white mb-1 animate-glitch">98%</div>
                    <div class="text-accent-purple text-xs">Client Rating</div>
                  </div>
                  <div class="neon-card rounded-xl p-4">
                    <div class="text-accent-orange mb-2">Technologie:</div>
                    <div class="text-2xl font-bold text-glow-blue mb-1">Vue</div>
                    <div class="text-accent-primary text-xs">Modern Stack</div>
                  </div>
                </div>

                <!-- Live Terminal Log -->
                <div class="border-t border-accent-neon/20 pt-4">
                  <div class="text-accent-cyan text-sm mb-3">
                    <span class="">●</span> Live Aktivitäten
                  </div>
                  <div class="space-y-2 text-xs">
                    <div class="flex justify-between">
                      <span class="text-white/70">E-Commerce Site</span>
                      <span class="text-accent-primary">Live & Running</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-white/70">SaaS Dashboard</span>
                      <span class="text-accent-cyan">Web App Live</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-white/70">Landing Page</span>
                      <span class="text-accent-purple">2 Wochen Done</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Floating Metrics -->
            <div
              class="absolute -top-6 -left-6 neon-card rounded-xl p-4 floating-element animate-neon-flicker"
            >
              <div class="text-center">
                <div class="text-xs text-accent-cyan mb-1">Avg. Time</div>
                <div class="text-xl font-bold text-glow-blue">4W</div>
              </div>
            </div>

            <div
              class="absolute -bottom-6 -right-6 cyber-card rounded-xl p-4 floating-element"
              style="animation-delay: 1s"
            >
              <div class="text-center">
                <div class="text-xs text-accent-purple mb-1">Web-Projekte</div>
                <div class="text-xl font-bold text-glow-cyan">50+</div>
              </div>
            </div>

            <div
              class="absolute top-1/2 -right-4 glass-card rounded-xl p-3 floating-element"
              style="animation-delay: 2s"
            >
              <div class="text-center">
                <div class="text-xs text-accent-primary mb-1">Framework</div>
                <div class="text-lg font-bold text-white">Vue</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Gradient Fade -->
    <div
      class="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-base-bg to-transparent"
    />
  </section>
</template>

<script setup>
import Button from '~/components/ui/Button.vue'
import Card from '~/components/ui/Card.vue'
import CardContent from '~/components/ui/CardContent.vue'
import Badge from '~/components/ui/Badge.vue'
</script>
