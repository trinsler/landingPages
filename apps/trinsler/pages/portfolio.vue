<template>
  <div class="min-h-screen matrix-bg relative overflow-hidden pt-20">
    <!-- Cyber Grid Matrix -->
    <div class="absolute inset-0 cyber-grid opacity-40"></div>
    
    <!-- Multiple Data Streams -->
    <div class="absolute inset-0">
      <div class="animate-data-stream absolute left-16 w-1 h-52 bg-gradient-to-b from-transparent via-accent-neon to-transparent" style="animation-delay: 0s;"></div>
      <div class="animate-data-stream absolute left-32 w-1 h-44 bg-gradient-to-b from-transparent via-accent-cyan to-transparent" style="animation-delay: 0.8s;"></div>
      <div class="animate-data-stream absolute left-48 w-1 h-36 bg-gradient-to-b from-transparent via-accent-purple to-transparent" style="animation-delay: 1.6s;"></div>
      <div class="animate-data-stream absolute right-48 w-1 h-40 bg-gradient-to-b from-transparent via-accent-orange to-transparent" style="animation-delay: 2.4s;"></div>
      <div class="animate-data-stream absolute right-32 w-1 h-46 bg-gradient-to-b from-transparent via-accent-pink to-transparent" style="animation-delay: 3.2s;"></div>
      <div class="animate-data-stream absolute right-16 w-1 h-38 bg-gradient-to-b from-transparent via-accent-neon to-transparent" style="animation-delay: 4s;"></div>
    </div>

    <!-- Floating Code Matrix -->
    <div class="absolute inset-0 data-points">
      <div class="floating-element absolute top-20 left-24 text-accent-neon text-xs opacity-70">Wachstum: 300%</div>
      <div class="floating-element absolute top-32 right-28 text-accent-cyan text-xs opacity-70" style="animation-delay: 1s;">Skalierung</div>
      <div class="floating-element absolute bottom-40 left-1/3 text-accent-purple text-xs opacity-70" style="animation-delay: 2s;">Neuer Erfolg</div>
      <div class="floating-element absolute top-2/3 right-1/3 text-accent-orange text-xs opacity-70" style="animation-delay: 3s;">+500K Umsatz</div>
      <div class="floating-element absolute top-1/4 left-2/3 text-accent-pink text-xs opacity-70" style="animation-delay: 4s;">Mission Erfolgreich</div>
    </div>

    <div class="relative container-custom py-20">
      <!-- Hacker Terminal Header -->
      <div class="cyber-card rounded-3xl overflow-hidden max-w-5xl mx-auto mb-20 animate-glow-pulse">
        <!-- Terminal Header -->
        <div class="bg-surface-1 px-6 py-4 border-b border-accent-neon/30">
          <div class="flex items-center gap-3">
            <div class="w-4 h-4 rounded-full bg-red-500"></div>
            <div class="w-4 h-4 rounded-full bg-yellow-500"></div>
            <div class="w-4 h-4 rounded-full bg-accent-neon "></div>
            <div class="ml-4 text-accent-cyan text-lg">Portfolio & Erfolgsgeschichten</div>
          </div>
        </div>

        <!-- Terminal Content -->
        <div class="p-8 lg:p-12 code-pattern">
          <!-- System Boot -->
          <div class="mb-8">
            <div class="text-accent-neon text-sm mb-4 animate-slide-up-stagger">
              <span class="text-accent-cyan">Status:</span> Portfolio wird geladen
            </div>
            <div class="neon-card rounded-xl px-6 py-3 inline-block animate-neon-flicker">
              <span class="text-accent-neon">Portfolio Aktiv</span>
              <span class="text-white ml-2">Erfolgsgeschichten</span>
            </div>
          </div>

          <!-- ASCII Header -->
          <div class="mb-12 text-center">
            <h1 class="text-4xl sm:text-6xl lg:text-7xl font-black text-white mb-6">
              <span class="text-white">STARTUP</span>
              <br />
              <span class="gradient-text-neon">ERFOLGE</span>
              <br />
              <span class="text-accent-cyan">IM DETAIL</span>
            </h1>
          </div>

          <!-- Portfolio Brief -->
          <div class="cyber-card rounded-xl p-6 max-w-4xl mx-auto">
            <div class="text-accent-purple text-sm mb-3">Unsere Referenzen</div>
            <p class="text-xl text-white/90 leading-relaxed">
              <span class="text-accent-cyan">Erfolgsbeispiele:</span> Unsere erfolgreichsten 
              <span class="font-bold text-glow-green">Wachstums-Strategien und Startup-Partnerschaften</span>. 
              Jedes Projekt dokumentiert mit <span class="text-accent-neon">messbaren Ergebnissen</span>.
            </p>
            <div class="text-accent-orange text-sm mt-4">
              Alle Zahlen basieren auf realen Projektergebnissen unserer Partner
            </div>
          </div>
        </div>
      </div>

      <!-- Mission Files Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <div v-for="(project, index) in projects" :key="project.title" 
             class="group relative animate-slide-up-stagger"
             :style="`animation-delay: ${index * 0.2}s`">
          
          <!-- Mission Terminal -->
          <div class="cyber-card rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02] animate-glow-pulse">
            <!-- Terminal Header -->
            <div class="bg-surface-1 px-4 py-3 border-b border-accent-neon/30">
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 rounded-full bg-accent-neon "></div>
                <div class="text-accent-cyan text-xs">Projekt {{ String(index + 1).padStart(3, '0') }}</div>
                <div class="ml-auto text-xs" :class="project.statusColor">{{ project.status }}</div>
              </div>
            </div>
            
            <!-- Mission Visual -->
            <div class="relative h-48 bg-gradient-to-br from-surface-2 to-surface-1 overflow-hidden">
              <!-- Background Image with Matrix Overlay -->
              <img 
                :src="project.image" 
                :alt="project.title" 
                class="absolute inset-0 w-full h-full object-cover opacity-30"
              />
              <div class="absolute inset-0 bg-gradient-to-br from-surface-2/80 to-surface-1/80"></div>
              
              <!-- Matrix Code Rain -->
              <div class="absolute inset-0 cyber-grid opacity-20"></div>
              
              <!-- Floating Mission Data -->
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="text-center">
                  <div :class="project.iconBg" class="w-16 h-16 rounded-xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform animate-neon-flicker">
                    <div class="text-white text-2xl font-bold"></div>
                  </div>
                  <div class="text-accent-cyan text-xs">{{ project.classification }}</div>
                </div>
              </div>
              
              <!-- Project Info -->
              <div class="absolute top-4 left-4 text-xs text-accent-neon opacity-60">
                {{ project.code }}
              </div>
            </div>
            
            <!-- Mission Report -->
            <div class="p-6 code-pattern">
              <!-- Project ID -->
              <div class="text-accent-neon text-sm mb-3">
                Projektreferenz: {{ project.filename }}
              </div>
              
              <!-- Project Title -->
              <h3 class="text-xl font-bold text-white mb-3">
                {{ project.title }}
              </h3>
              
              <!-- Project Description -->
              <div class="mb-4">
                <div class="text-accent-purple text-xs mb-2">Projektbeschreibung</div>
                <p class="text-white/90 text-sm leading-relaxed">{{ project.description }}</p>
              </div>
              
              <!-- Services Used -->
              <div class="mb-4">
                <div class="text-accent-cyan text-xs mb-2">Eingesetzte Services:</div>
                <div class="flex flex-wrap gap-1 ml-4 mb-2">
                  <span v-for="(tag, idx) in project.tags" :key="tag" 
                        class="neon-card px-2 py-1 text-xs text-white/80">
                    {{ tag }}{{ idx < project.tags.length - 1 ? ', ' : '' }}
                  </span>
                </div>
              </div>
              
              <!-- Project Result -->
              <div class="neon-card rounded-xl p-4">
                <div class="text-accent-orange text-xs mb-2">Projektergebnis</div>
                <div class="text-center">
                  <div class="text-2xl font-bold text-glow-green mb-1">{{ project.result }}</div>
                  <div class="text-white/60 text-xs">Wachstum erreicht</div>
                </div>
              </div>
              
              <!-- Project Status -->
              <div class="mt-4 pt-4 border-t border-accent-neon/20">
                <div class="flex items-center justify-between text-xs">
                  <span class="text-white/60">Projektstatus:</span>
                  <span class="text-accent-neon ">✓ {{ project.completion }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Terminal CTA Section -->
      <div class="cyber-card rounded-3xl overflow-hidden max-w-4xl mx-auto animate-glow-pulse">
        <!-- Terminal Header -->
        <div class="bg-surface-1 px-6 py-4 border-b border-accent-neon/30">
          <div class="flex items-center gap-3">
            <div class="w-4 h-4 rounded-full bg-red-500"></div>
            <div class="w-4 h-4 rounded-full bg-yellow-500"></div>
            <div class="w-4 h-4 rounded-full bg-accent-neon "></div>
            <div class="ml-4 text-accent-cyan text-lg">Neue Partnerschaft starten</div>
          </div>
        </div>
        
        <!-- Terminal Content -->
        <div class="p-8 lg:p-12 text-center code-pattern">
          <!-- Call to Action -->
          <div class="text-accent-neon text-sm mb-6">
            <span class="text-accent-cyan">Bereit für:</span> Neue Partnerschaft
          </div>
          
          <!-- ASCII Banner -->
          <div class="code-font text-accent-neon text-xs mb-8">
            <pre class="text-center animate-slide-up-stagger">
  ╔══════════════════════════════════════╗
  ║       NEW MISSION AVAILABLE        ║
  ║     PARTNER RECRUITMENT ACTIVE     ║
  ╚══════════════════════════════════════╝
            </pre>
          </div>
          
          <!-- Mission Brief -->
          <div class="mb-8">
            <h3 class="text-3xl lg:text-4xl font-bold text-white mb-6 animate-glitch">
              Bereit für Ihre 
              <span class="gradient-text-neon">Erfolgsgeschichte?</span>
            </h3>
            
            <div class="cyber-card rounded-xl p-6 max-w-3xl mx-auto mb-8">
              <div class="text-accent-purple text-sm mb-3">Ihr nächster Schritt</div>
              <p class="text-lg text-white/90 leading-relaxed">
                <span class="text-accent-cyan">Ziel:</span> Werden Sie die nächste Erfolgsgeschichte. 
                <span class="font-bold text-glow-green">Equity-for-Growth</span> Revolution startet hier.
              </p>
              <div class="text-accent-orange text-sm mt-4">
                Wenn Sie bereit sind, starten wir die Mission!
              </div>
            </div>
          </div>
          
          <!-- Execute Button -->
          <NuxtLink
            to="/contact"
            class="btn-primary group text-xl animate-glow-pulse transform hover:scale-110 transition-all duration-300"
          >
            <span class="flex items-center">
              Jetzt Partnershaft starten
            </span>
          </NuxtLink>
          
          <!-- System Status -->
          <div class="mt-8 pt-6 border-t border-accent-neon/20">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div class="text-center">
                <div class="text-accent-cyan mb-1">Aktive Projekte:</div>
                <div class="text-accent-neon ">● 12</div>
              </div>
              <div class="text-center">
                <div class="text-accent-purple mb-1">Erfolgsrate:</div>
                <div class="text-glow-green font-bold">89%</div>
              </div>
              <div class="text-center">
                <div class="text-accent-orange mb-1">Neue Partner:</div>
                <div class="text-white font-bold">Gesucht</div>
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
  title: 'Portfolio - Trinsler Erfolgsgeschichten'
})

const projects = [
  {
    title: 'TechStart Revolution',
    description: 'Complete growth-hacking operation for B2B SaaS startup. Implemented equity-for-growth model with explosive results.',
    tags: ['Growth Hacking', 'SaaS', 'B2B'],
    result: '+500% MRR',
    filename: 'techstart_mission.log',
    code: 'revenue.scale(5x)',
    classification: 'TOP_SECRET',
    iconBg: 'bg-gradient-to-r from-accent-neon to-accent-cyan',
    status: 'CLASSIFIED',
    statusColor: 'text-accent-neon',
    completion: 'LEGENDARY',
    image: '/images/gabriel-benois-qnWPjzewewA-unsplash.jpg'
  },
  {
    title: 'E-Commerce Takeover',
    description: 'Strategic acquisition of market share through innovative digital marketing. Full-stack growth implementation.',
    tags: ['E-Commerce', 'Market Domination', 'Digital'],
    result: '+300% Revenue',
    filename: 'ecommerce_hack.py',
    code: 'conversion.optimize()',
    classification: 'CONFIDENTIAL',
    iconBg: 'bg-gradient-to-r from-accent-purple to-accent-pink',
    status: 'ACTIVE',
    statusColor: 'text-accent-purple',
    completion: 'ELITE',
    image: '/images/tim-mossholder-SZgVZPbQ7RE-unsplash.jpg'
  },
  {
    title: 'FinTech Disruption',
    description: 'Cryptocurrency and blockchain startup growth mission. Revolutionary marketing approach for next-gen finance.',
    tags: ['FinTech', 'Blockchain', 'Disruption'],
    result: '+800% Users',
    filename: 'fintech_revolution.js',
    code: 'blockchain.scale()',
    classification: 'ULTRA_SECRET',
    iconBg: 'bg-gradient-to-r from-accent-orange to-accent-neon',
    status: 'LEGENDARY',
    statusColor: 'text-accent-orange',
    completion: 'MYTHIC',
    image: '/images/szabo-viktor-7hqEx1al0Fk-unsplash.jpg'
  },
  {
    title: 'Social Platform Hack',
    description: 'Viral growth engineering for social media startup. Implemented network effects and growth loops.',
    tags: ['Social Media', 'Viral Growth', 'Network Effects'],
    result: '+1200% Users',
    filename: 'social_viral.sh',
    code: 'viral.spread(infinite)',
    classification: 'COSMIC',
    iconBg: 'bg-gradient-to-r from-accent-cyan to-accent-purple',
    status: 'VIRAL',
    statusColor: 'text-accent-cyan',
    completion: 'COSMIC',
    image: '/images/georgia-de-lotz-hdQGAz1pQ_M-unsplash.jpg'
  },
  {
    title: 'Local Business Empire',
    description: 'Multi-location local business expansion through advanced digital presence and automation systems.',
    tags: ['Local SEO', 'Automation', 'Multi-Location'],
    result: '+400% Locations',
    filename: 'local_empire.exe',
    code: 'empire.expand()',
    classification: 'RESTRICTED',
    iconBg: 'bg-gradient-to-r from-green-500 to-emerald-500',
    status: 'EXPANDING',
    statusColor: 'text-green-400',
    completion: 'IMPERIAL',
    image: '/images/nathana-reboucas-LIfRyiWWBZs-unsplash.jpg'
  },
  {
    title: 'Consulting Domination',
    description: 'B2B consulting firm transformed into industry leader. Thought leadership and premium positioning achieved.',
    tags: ['B2B', 'Thought Leadership', 'Premium'],
    result: '+600% Revenue',
    filename: 'consulting_elite.py',
    code: 'authority.establish()',
    classification: 'ELITE_ONLY',
    iconBg: 'bg-gradient-to-r from-blue-500 to-indigo-500',
    status: 'DOMINANT',
    statusColor: 'text-blue-400',
    completion: 'MASTER',
    image: '/images/carol-magalhaes-dSsXm15D9hg-unsplash.jpg'
  }
]
</script>