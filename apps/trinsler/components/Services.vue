<template>
  <section class="relative py-20 lg:py-32 overflow-hidden matrix-bg pt-20">
    <!-- Cyber Grid -->
    <div class="absolute inset-0 cyber-grid opacity-20" />

    <!-- Data Stream Effects -->
    <div class="absolute inset-0">
      <div
        class="animate-data-stream absolute left-1/4 w-1 h-32 bg-gradient-to-b from-transparent via-accent-cyan to-transparent"
        style="animation-delay: 0s"
      />
      <div
        class="animate-data-stream absolute right-1/3 w-1 h-28 bg-gradient-to-b from-transparent via-accent-purple to-transparent"
        style="animation-delay: 1.5s"
      />
    </div>

    <div class="relative container-custom">
      <!-- Cyber Section Header -->
      <div class="text-center max-w-4xl mx-auto mb-20">
        <Badge variant="secondary" class="inline-flex items-center bg-card/80 backdrop-blur-sm border-primary/20 text-foreground rounded-full px-6 py-3 text-sm font-semibold mb-6 animate-neon-flicker hover:border-primary/40 transition-colors">
          <div class="w-2 h-2 bg-primary rounded-full mr-3" />
          <span class="text-cyan-400">Services</span>
          <span class="text-foreground ml-2">Verfügbar</span>
        </Badge>

        <h2 class="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6">
          Warum
          <span class="gradient-text-neon animate-glitch">Web-Development</span>
          <br />
          <span class="text-accent-cyan">mit Trinsler</span>
        </h2>

        <Card class="bg-card/80 backdrop-blur-sm border-primary/20 hover:border-primary/30 transition-colors max-w-3xl mx-auto">
          <CardContent class="p-6">
            <Badge variant="secondary" class="text-cyan-400 bg-card/50 text-sm mb-3">Unser Ansatz</Badge>
            <p class="text-lg text-foreground/90 leading-relaxed">
              <span class="text-primary">Spezialisierung:</span> Moderne Web-Applikationen,
              Landing Pages und Websites. Wir entwickeln
              <span class="font-bold text-glow-green">professionelle Web-Lösungen</span> – einfach,
              praktisch und zu fairen Festpreisen.
            </p>
          </CardContent>
        </Card>
      </div>

      <!-- Terminal Service Cards -->
      <div class="grid lg:grid-cols-2 gap-8 mb-20">
        <div
          v-for="(service, index) in mainServices"
          :key="service.title"
          class="group relative animate-slide-up-stagger"
          :style="`animation-delay: ${index * 0.2}s`"
        >
          <!-- Terminal Window -->
          <div
            class="cyber-card rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02] animate-glow-pulse"
          >
            <!-- Terminal Header -->
            <div class="bg-surface-1 px-4 py-3 border-b border-accent-neon/30">
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 rounded-full bg-red-500" />
                <div class="w-3 h-3 rounded-full bg-yellow-500" />
                <div class="w-3 h-3 rounded-full bg-accent-neon" />
                <div class="ml-4 text-accent-cyan text-sm">Services/{{ service.title }}</div>
              </div>
            </div>

            <!-- Terminal Content -->
            <div class="p-6 lg:p-8 code-pattern">
              <!-- Service Status -->
              <div class="text-accent-neon text-sm mb-4">
                <span class="text-accent-cyan">Status:</span> {{ service.status }}
              </div>

              <!-- Service Visual -->
              <div class="relative mb-6">
                <div
                  :class="service.iconBg"
                  class="w-16 h-16 rounded-xl neon-card flex items-center justify-center group-hover:scale-110 transition-transform duration-300 animate-neon-flicker"
                >
                  <div class="text-white text-2xl font-bold" />
                </div>
                <div
                  class="absolute -top-2 -right-2 text-xs text-accent-cyan bg-surface-2 px-2 py-1 rounded"
                >
                  {{ service.status }}
                </div>
              </div>

              <!-- Service Title -->
              <div class="mb-4">
                <div class="text-accent-cyan text-sm mb-1">Service:</div>
                <h3 class="text-2xl font-bold text-white mb-2">
                  {{ service.title }}
                </h3>
              </div>

              <!-- Description -->
              <div class="mb-6">
                <div class="text-accent-purple text-sm mb-2">Beschreibung</div>
                <p class="text-white/90 leading-relaxed">
                  {{ service.description }}
                </p>
              </div>

              <!-- Features -->
              <div class="mb-6">
                <div class="text-accent-cyan text-sm mb-3">Leistungen</div>
                <ul class="space-y-2 ml-4">
                  <li
                    v-for="(feature, idx) in service.features"
                    :key="feature"
                    class="flex items-center text-white/90 text-sm"
                  >
                    <span class="text-accent-neon mr-3">{{ idx + 1 }}.</span>
                    <span>{{ feature }}</span>
                  </li>
                </ul>
              </div>

              <!-- Pricing -->
              <div class="neon-card rounded-xl p-4">
                <div class="text-accent-orange text-sm mb-2">Investment</div>
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <div class="text-xs text-accent-cyan mb-1">Timeline:</div>
                    <div class="font-bold text-glow-green text-lg">{{ service.equityRange }}</div>
                  </div>
                  <div>
                    <div class="text-xs text-accent-purple mb-1">Pricing:</div>
                    <div class="font-bold text-glow-cyan text-lg">{{ service.monthlyFee }}</div>
                  </div>
                </div>
              </div>

              <!-- Service Status -->
              <div class="mt-4 flex items-center justify-between text-xs">
                <span class="text-white/60">Service Status:</span>
                <span class="text-accent-neon">● Verfügbar</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Terminal Why Equity Section -->
      <div class="relative">
        <!-- System Query -->
        <div class="text-center mb-16">
          <div class="cyber-card rounded-2xl p-6 max-w-4xl mx-auto">
            <div class="text-accent-cyan text-sm mb-4">Warum Web-Development mit Trinsler?</div>
            <h3 class="text-3xl lg:text-4xl font-bold text-white mb-4">
              Warum
              <span class="gradient-text-neon">Trinsler</span>
              <span class="text-accent-cyan">wählen?</span>
            </h3>
            <div class="text-accent-cyan text-sm">Die Vorteile auf einen Blick ✓</div>
          </div>
        </div>

        <!-- Benefits as Code Modules -->
        <div class="grid md:grid-cols-3 gap-8">
          <div
            v-for="(benefit, index) in benefits"
            :key="benefit.title"
            class="group animate-slide-up-stagger"
            :style="`animation-delay: ${index * 0.3}s`"
          >
            <!-- Module Window -->
            <div
              class="neon-card rounded-2xl overflow-hidden transition-all duration-500 hover:scale-105"
            >
              <!-- Module Header -->
              <div class="bg-surface-1 px-4 py-3 border-b border-accent-neon/30">
                <div class="flex items-center gap-2">
                  <div class="w-2 h-2 rounded-full bg-accent-neon" />
                  <div class="text-accent-cyan text-xs">Vorteil {{ index + 1 }}</div>
                </div>
              </div>

              <!-- Module Content -->
              <div class="p-6 text-center">
                <!-- Visual Element -->
                <div class="relative mb-6">
                  <div
                    :class="benefit.iconBg"
                    class="w-16 h-16 rounded-xl mx-auto flex items-center justify-center group-hover:scale-110 transition-transform duration-300 animate-neon-flicker"
                  >
                    <div class="text-white text-2xl font-bold" />
                  </div>
                  <div class="absolute -top-1 -right-1 w-3 h-3 bg-accent-neon rounded-full" />
                </div>

                <!-- Benefit Content -->
                <div class="text-accent-cyan text-sm mb-2">{{ benefit.title }}</div>
                <h4 class="text-lg font-bold text-white mb-4">{{ benefit.title }}</h4>
                <p class="text-white/80 text-sm leading-relaxed mb-4">{{ benefit.description }}</p>

                <!-- Status -->
                <div class="mt-4 pt-4 border-t border-accent-neon/20">
                  <div class="flex items-center justify-center gap-2 text-xs">
                    <span class="text-accent-neon">●</span>
                    <span class="text-white/60">Status: Erfolgreich</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Terminal CTA Section -->
      <div class="text-center mt-20">
        <div class="cyber-card rounded-2xl overflow-hidden max-w-5xl mx-auto animate-glow-pulse">
          <!-- Terminal Header -->
          <div class="bg-surface-1 px-6 py-4 border-b border-accent-neon/30">
            <div class="flex items-center gap-3">
              <div class="w-3 h-3 rounded-full bg-red-500" />
              <div class="w-3 h-3 rounded-full bg-yellow-500" />
              <div class="w-3 h-3 rounded-full bg-accent-neon" />
              <div class="ml-4 text-accent-cyan">Wachstums-Initiative starten</div>
            </div>
          </div>

          <!-- Terminal Content -->
          <div class="p-8 lg:p-12 code-pattern">
            <!-- Call to Action -->
            <div class="text-accent-neon text-sm mb-6">
              <span class="text-accent-cyan">Bereit für:</span> Wachstums-Revolution
            </div>

            <!-- ASCII Art Banner -->
            <div class="code-font text-accent-neon text-xs mb-8 overflow-hidden">
              <pre class="text-center animate-slide-up-stagger">
  ╔═══════════════════════════════════════╗
  ║         GROWTH REVOLUTION             ║
  ║           INITIALIZED                 ║
  ╚═══════════════════════════════════════╝
              </pre>
            </div>

            <!-- Main Message -->
            <div class="mb-8">
              <h3 class="text-3xl lg:text-4xl font-bold text-white mb-6 animate-glitch">
                Bereit für die
                <span class="gradient-text-neon">Revolution?</span>
              </h3>

              <!-- Code Block Description -->
              <div class="cyber-card rounded-xl p-6 max-w-3xl mx-auto mb-8">
                <div class="text-accent-purple text-sm mb-3">Mission</div>
                <p class="text-lg text-white/90 leading-relaxed mb-4">
                  <span class="text-accent-cyan">Formel:</span> Ihre Idee + Trinsler Web-Development
                  = Digitaler Erfolg
                </p>
                <div class="text-accent-orange text-sm">
                  Bereit für Ihr Web-Projekt? Lassen Sie uns starten!
                </div>
              </div>
            </div>

            <!-- Command Buttons -->
            <div class="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
              <NuxtLink to="/contact" class="btn-primary group animate-glow-pulse">
                <span>Strategy Call buchen</span>
              </NuxtLink>
              <NuxtLink to="/portfolio" class="btn-secondary"> Web-Projekt Portfolio </NuxtLink>
            </div>

            <!-- Status -->
            <div class="border-t border-accent-neon/20 pt-6">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                <div class="text-center">
                  <div class="text-accent-cyan mb-1">Status:</div>
                  <div class="text-accent-neon">● Verfügbar</div>
                </div>
                <div class="text-center">
                  <div class="text-accent-purple mb-1">Web-Projekte:</div>
                  <div class="text-white font-bold">50+</div>
                </div>
                <div class="text-center">
                  <div class="text-accent-orange mb-1">Client Zufriedenheit:</div>
                  <div class="text-glow-green font-bold">98%</div>
                </div>
              </div>
            </div>
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
import Badge from '~/components/ui/Badge.vue'

// No icons or emojis needed

const mainServices = [
  {
    title: 'Web-Applikationen',
    description:
      'Professionelle Web-Apps für Unternehmen und Startups. Von einfachen Dashboards bis hin zu komplexen SaaS-Plattformen.',
    iconBg: 'bg-gradient-to-r from-accent-neon to-accent-cyan',
    filename: 'web_app_dev.sh',
    command: 'create_web_app',
    status: 'ONLINE',
    equityRange: '4-12 Wochen',
    monthlyFee: 'Custom Quote',
    features: [
      'Vue.js / Nuxt.js Entwicklung',
      'Responsive Design für alle Geräte',
      'Datenbank & Backend Integration',
      'User Authentication & Security',
      'Performance-Optimierung',
    ],
  },
  {
    title: 'Landing Pages & Websites',
    description:
      'Hochkonvertierende Landing Pages und professionelle Unternehmenswebsites. Optimiert für SEO und Conversions.',
    iconBg: 'bg-gradient-to-r from-accent-purple to-accent-pink',
    filename: 'landing_pages.py',
    command: 'build_landing_page',
    status: 'RUNNING',
    equityRange: '2-6 Wochen',
    monthlyFee: 'Premium Pricing',
    features: [
      'Conversion-optimierte Landing Pages',
      'Corporate Websites & Portfolios',
      'SEO & Performance Optimierung',
      'Content Management System',
      'Analytics & Tracking Setup',
    ],
  },
]

const benefits = [
  {
    title: 'Einfach & Praktisch',
    description:
      'Wir entwickeln Web-Lösungen, die funktionieren. Keine überkomplizierten Features, sondern solide Ergebnisse.',
    iconBg: 'bg-gradient-to-r from-red-500 to-pink-500',
  },
  {
    title: 'Schnelle Lieferung',
    description:
      '2-12 Wochen je nach Projekt. Effiziente Entwicklungsprozesse für zügige Umsetzung.',
    iconBg: 'bg-gradient-to-r from-green-500 to-emerald-500',
  },
  {
    title: 'Premium Quality',
    description:
      'Hochwertige Web-Lösungen mit custom pricing basierend auf Ihren spezifischen Anforderungen.',
    iconBg: 'bg-gradient-to-r from-blue-500 to-indigo-500',
  },
]
</script>
