<template>
  <div class="min-h-screen matrix-bg relative overflow-hidden pt-20">
    <!-- Advanced Cyber Grid Matrix -->
    <div class="absolute inset-0 cyber-grid opacity-40" />

    <!-- Complex Data Streams -->
    <div class="absolute inset-0">
      <div
        class="animate-data-stream absolute left-12 w-1 h-60 bg-gradient-to-b from-transparent via-accent-neon to-transparent"
        style="animation-delay: 0s"
      />
      <div
        class="animate-data-stream absolute left-24 w-1 h-44 bg-gradient-to-b from-transparent via-accent-cyan to-transparent"
        style="animation-delay: 0.6s"
      />
      <div
        class="animate-data-stream absolute left-36 w-1 h-52 bg-gradient-to-b from-transparent via-accent-purple to-transparent"
        style="animation-delay: 1.2s"
      />
      <div
        class="animate-data-stream absolute right-36 w-1 h-48 bg-gradient-to-b from-transparent via-accent-orange to-transparent"
        style="animation-delay: 1.8s"
      />
      <div
        class="animate-data-stream absolute right-24 w-1 h-56 bg-gradient-to-b from-transparent via-accent-pink to-transparent"
        style="animation-delay: 2.4s"
      />
      <div
        class="animate-data-stream absolute right-12 w-1 h-40 bg-gradient-to-b from-transparent via-accent-neon to-transparent"
        style="animation-delay: 3s"
      />
    </div>

    <!-- Floating Code Matrix -->
    <div class="absolute inset-0 data-points">
      <div class="floating-element absolute top-20 left-28 text-accent-neon text-xs opacity-70">
        Services verfügbar
      </div>
      <div
        class="floating-element absolute top-40 right-32 text-accent-cyan text-xs opacity-70"
        style="animation-delay: 1s"
      >
        Skalierung
      </div>
      <div
        class="floating-element absolute bottom-40 left-1/3 text-accent-purple text-xs opacity-70"
        style="animation-delay: 2s"
      >
        Equity-Kalkulation
      </div>
      <div
        class="floating-element absolute top-2/3 right-1/4 text-accent-orange text-xs opacity-70"
        style="animation-delay: 3s"
      >
        Umsatz + Partnerschaft
      </div>
      <div
        class="floating-element absolute top-1/4 left-2/3 text-accent-pink text-xs opacity-70"
        style="animation-delay: 4s"
      >
        Mission erfolgreich
      </div>
    </div>

    <div class="relative container-custom py-20">
      <!-- Services Terminal Header -->
      <div class="cyber-card rounded-3xl overflow-hidden max-w-6xl mx-auto mb-20">
        <!-- Terminal Header -->
        <div class="bg-surface-1 px-6 py-4 border-b border-accent-neon/30">
          <div class="flex items-center gap-3">
            <div class="w-4 h-4 rounded-full bg-red-500" />
            <div class="w-4 h-4 rounded-full bg-yellow-500" />
            <div class="w-4 h-4 rounded-full bg-accent-neon" />
            <div class="ml-4 text-accent-cyan text-lg">Services - Web Development</div>
          </div>
        </div>

        <!-- Terminal Content -->
        <div class="p-8 lg:p-12 code-pattern">
          <!-- System Boot -->
          <div class="mb-8">
            <div class="text-accent-neon text-sm mb-4">
              <span class="text-accent-cyan">Status:</span> Web Services verfügbar
            </div>
            <div class="neon-card rounded-xl px-6 py-3 inline-block">
              <span class="text-accent-neon">Web Development Online</span>
              <span class="text-white ml-2">Vue.js & Nuxt</span>
            </div>
          </div>

          <!-- ASCII Header -->
          <div class="mb-12 text-center">
            <h1 class="text-4xl sm:text-6xl lg:text-7xl font-black text-white mb-6">
              <span class="text-white">WEB</span>
              <br />
              <span class="gradient-text-neon">DEVELOPMENT</span>
              <br />
              <span class="text-accent-cyan">SERVICES</span>
            </h1>
          </div>

          <!-- Services Brief -->
          <div class="cyber-card rounded-xl p-6 max-w-4xl mx-auto">
            <div class="text-accent-purple text-sm mb-3">Web-Entwicklung & Landing Pages</div>
            <p class="text-xl text-white/90 leading-relaxed">
              <span class="text-accent-cyan">Spezialisierung:</span> Wir entwickeln moderne
              <span class="font-bold text-glow-green"
                >Web-Applikationen, Landing Pages und Websites</span
              >. Einfach, praktisch und zu fairen Preisen.
              <span class="text-accent-neon">Festpreis-Garantie</span> und transparente Prozesse.
            </p>
            <div class="text-accent-orange text-sm mt-4">
              Von einfachen Landing Pages bis zu komplexen Web-Apps
            </div>
          </div>
        </div>
      </div>

      <!-- Services Grid -->
      <div class="grid lg:grid-cols-2 gap-8 mb-16">
        <div
          v-for="(service, index) in services"
          :key="service.title"
          class="group relative"
          :style="`animation-delay: ${index * 0.2}s`"
        >
          <!-- Service Terminal -->
          <div
            class="cyber-card rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02]"
          >
            <!-- Terminal Header -->
            <div class="bg-surface-1 px-4 py-3 border-b border-accent-neon/30">
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 rounded-full bg-accent-neon" />
                <div class="text-accent-cyan text-xs">{{ service.filename }}</div>
                <div class="ml-auto text-xs" :class="service.statusColor">{{ service.status }}</div>
              </div>
            </div>

            <!-- Service Visual -->
            <div
              class="relative h-48 bg-gradient-to-br from-surface-2 to-surface-1 overflow-hidden"
            >
              <!-- Matrix Background -->
              <div class="absolute inset-0 cyber-grid opacity-20" />

              <!-- Floating Service Data -->
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="text-center">
                  <div
                    :class="service.iconBg"
                    class="w-16 h-16 rounded-xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform"
                  >
                    <div class="text-white text-2xl font-bold" />
                  </div>
                  <div class="text-accent-cyan text-xs">{{ service.module }}</div>
                </div>
              </div>

              <!-- Service Info -->
              <div class="absolute top-4 left-4 text-xs text-accent-neon opacity-60">
                {{ service.command }}
              </div>

              <!-- Equity Badge -->
              <div class="absolute top-4 right-4 neon-card px-2 py-1 text-xs text-accent-orange">
                {{ service.equityRange }}
              </div>
            </div>

            <!-- Service Content -->
            <div class="p-6 code-pattern">
              <!-- Service Command -->
              <div class="text-accent-neon text-sm mb-3">Service: {{ service.filename }}</div>

              <!-- Service Title -->
              <h3 class="text-xl font-bold text-white mb-3">
                {{ service.title }}
              </h3>

              <!-- Service Description -->
              <div class="mb-4">
                <div class="text-accent-purple text-xs mb-2">Beschreibung</div>
                <p class="text-white/90 text-sm leading-relaxed">{{ service.description }}</p>
              </div>

              <!-- Features -->
              <div class="mb-4">
                <div class="text-accent-cyan text-xs mb-2">Leistungen:</div>
                <div class="ml-4 space-y-1">
                  <div
                    v-for="feature in service.features"
                    :key="feature"
                    class="text-white/80 text-xs"
                  >
                    {{ feature }}
                  </div>
                </div>
              </div>

              <!-- Pricing Info -->
              <div class="neon-card rounded-xl p-4">
                <div class="text-accent-orange text-xs mb-2">Konditionen:</div>
                <div class="flex justify-between items-center">
                  <div>
                    <div class="text-glow-green font-bold">{{ service.equityRange }}</div>
                    <div class="text-white/60 text-xs">Investment: {{ service.monthlyFee }}</div>
                  </div>
                  <div class="text-right">
                    <div class="text-accent-neon text-xs">Status:</div>
                    <div class="text-white font-bold text-xs">{{ service.processStatus }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA Terminal -->
      <div class="cyber-card rounded-3xl overflow-hidden max-w-4xl mx-auto">
        <!-- Terminal Header -->
        <div class="bg-surface-1 px-6 py-4 border-b border-accent-neon/30">
          <div class="flex items-center gap-3">
            <div class="w-4 h-4 rounded-full bg-red-500" />
            <div class="w-4 h-4 rounded-full bg-yellow-500" />
            <div class="w-4 h-4 rounded-full bg-accent-neon" />
            <div class="ml-4 text-accent-cyan text-lg">Partnerschaft starten</div>
          </div>
        </div>

        <!-- Terminal Content -->
        <div class="p-8 lg:p-12 text-center code-pattern">
          <!-- Call to Action -->
          <div class="text-accent-neon text-sm mb-6">
            <span class="text-accent-cyan">Bereit für:</span> Web Development
          </div>

          <!-- CTA Message -->
          <div class="mb-8">
            <h3 class="text-3xl lg:text-4xl font-bold text-white mb-6">
              Bereit für Ihr
              <span class="gradient-text-neon">Web-Projekt?</span>
            </h3>

            <div class="cyber-card rounded-xl p-6 max-w-3xl mx-auto mb-8">
              <div class="text-accent-purple text-sm mb-3">Ihre nächsten Schritte</div>
              <p class="text-lg text-white/90 leading-relaxed">
                <span class="text-accent-cyan">Mission:</span> Starten Sie Ihr Web-Projekt mit einem
                <span class="font-bold text-glow-green">kostenlosen Beratungsgespräch</span>.
                Erfahren Sie, wie wir Ihre digitale Vision umsetzen.
              </p>
              <div class="text-accent-orange text-sm mt-4">
                Bereit für den nächsten Schritt? Lassen Sie uns Ihr Projekt besprechen!
              </div>
            </div>
          </div>

          <!-- Execute Button -->
          <NuxtLink
            to="/contact"
            class="btn-primary group text-xl transform hover:scale-110 transition-all duration-300"
          >
            <span class="flex items-center"> Strategy Call buchen </span>
          </NuxtLink>

          <!-- Stats -->
          <div class="mt-8 pt-6 border-t border-accent-neon/20">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div class="text-center">
                <div class="text-accent-cyan mb-1">Projekte 2024:</div>
                <div class="text-accent-neon">● 25</div>
              </div>
              <div class="text-center">
                <div class="text-accent-purple mb-1">Ø Entwicklungszeit:</div>
                <div class="text-glow-green font-bold">4 Wochen</div>
              </div>
              <div class="text-center">
                <div class="text-accent-orange mb-1">Client Zufriedenheit:</div>
                <div class="text-white font-bold">100%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// No icons or emojis needed

useHead({
  title: 'Services - Trinsler Web-Development & Landing Pages',
})

const services = [
  {
    title: 'Landing Pages & Websites',
    description:
      'Professionelle Landing Pages und Unternehmenswebsites. Conversion-optimiert und SEO-freundlich für maximale Reichweite.',
    features: [
      'Hochkonvertierende Landing Pages',
      'Corporate Websites & Portfolios',
      'Responsive Design für alle Geräte',
      'SEO & Performance Optimierung',
      'Content Management System',
      'Analytics & Tracking Setup',
    ],
    filename: 'landing_pages.sh',
    command: 'create_landing_page',
    module: 'WEB',
    iconBg: 'bg-gradient-to-r from-accent-neon to-accent-cyan',
    status: 'VERFÜGBAR',
    statusColor: 'text-accent-neon',
    equityRange: '2-6 Wochen',
    monthlyFee: 'Custom Quote',
    processStatus: 'READY',
  },
  {
    title: 'Web-Applikationen',
    description:
      'Moderne Web-Apps für Unternehmen und Startups. Von einfachen Dashboards bis hin zu komplexen SaaS-Plattformen.',
    features: [
      'Vue.js / Nuxt.js Entwicklung',
      'User Authentication & Security',
      'Datenbank & Backend Integration',
      'Real-time Features & APIs',
      'Admin Dashboards & CMS',
      'Performance & Skalierung',
    ],
    filename: 'web_applications.py',
    command: 'build_web_app',
    module: 'APP',
    iconBg: 'bg-gradient-to-r from-accent-purple to-accent-pink',
    status: 'PREMIUM',
    statusColor: 'text-accent-purple',
    equityRange: '4-12 Wochen',
    monthlyFee: 'Enterprise Pricing',
    processStatus: 'DEVELOPMENT',
  },
  {
    title: 'E-Commerce Solutions',
    description:
      'Online-Shops und E-Commerce Plattformen. Payment-Integration, Produktkataloge und Bestellsysteme.',
    features: [
      'Online-Shop Entwicklung',
      'Payment Gateway Integration',
      'Produktkatalog & Inventar',
      'Bestellverwaltung & CRM',
      'SEO & Marketing Integration',
      'Mobile-optimierte Shops',
    ],
    filename: 'ecommerce_solutions.js',
    command: 'deploy_shop_platform',
    module: 'SHOP',
    iconBg: 'bg-gradient-to-r from-accent-cyan to-accent-orange',
    status: 'AKTIV',
    statusColor: 'text-accent-cyan',
    equityRange: '6-16 Wochen',
    monthlyFee: 'Premium Investment',
    processStatus: 'COMMERCE',
  },
  {
    title: 'Technical Consulting & Strategy',
    description:
      'Strategische Beratung für Web-Technologie-Entscheidungen. Architecture Reviews, Team Training und Technical Roadmaps.',
    features: [
      'Web Architecture Review',
      'Technology Stack Consulting',
      'Team Training & Workshops',
      'Performance Optimization',
      'Security & Compliance Audit',
      'Long-term Technical Strategy',
    ],
    filename: 'tech_consulting.exe',
    command: 'provide_strategic_guidance',
    module: 'CON',
    iconBg: 'bg-gradient-to-r from-accent-orange to-accent-neon',
    status: 'BERATUNG',
    statusColor: 'text-accent-orange',
    equityRange: '2-8 Wochen',
    monthlyFee: 'Consulting Rates',
    processStatus: 'ADVISORY',
  },
]
</script>
