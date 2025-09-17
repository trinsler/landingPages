<template>
  <section class="relative py-20 lg:py-32 overflow-hidden matrix-bg">
    <!-- Cyber Grid -->
    <div class="absolute inset-0 cyber-grid opacity-20"></div>
    
    <!-- Data Stream Effects -->
    <div class="absolute inset-0">
      <div class="animate-data-stream absolute left-1/4 w-1 h-32 bg-gradient-to-b from-transparent via-accent-cyan to-transparent" style="animation-delay: 0s;"></div>
      <div class="animate-data-stream absolute right-1/3 w-1 h-28 bg-gradient-to-b from-transparent via-accent-purple to-transparent" style="animation-delay: 1.5s;"></div>
    </div>

    <div class="relative container-custom">
      <!-- Cyber Section Header -->
      <div class="text-center max-w-4xl mx-auto mb-20">
        <div class="inline-flex items-center neon-card rounded-full px-6 py-3 text-sm font-semibold mb-6 animate-neon-flicker">
          <div class="w-2 h-2 bg-accent-neon rounded-full animate-pulse mr-3"></div>
          <span class="code-font text-accent-cyan">[SERVICES_MODULE]</span>
          <span class="text-white ml-2">LOADING...</span>
        </div>
        
        <h2 class="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6">
          <span class="code-font text-accent-neon">></span> WARUM 
          <span class="gradient-text-neon animate-glitch">EQUITY-FOR-GROWTH</span>
          <br />
          <span class="text-accent-cyan code-font">_DIE_ZUKUNFT_IST</span>
        </h2>
        
        <div class="cyber-card rounded-xl p-6 max-w-3xl mx-auto">
          <div class="code-font text-accent-cyan text-sm mb-3">README.md</div>
          <p class="text-lg text-white/90 leading-relaxed">
            <span class="text-accent-neon">ALGORITHMUS:</span> Vergessen Sie teure Agenturen. 
            Wir investieren <span class="font-bold text-glow-green">operative Skills gegen Equity</span>. 
            So sind wir am Erfolg Ihres Startups beteiligt – nicht nur am Budget.
          </p>
        </div>
      </div>

      <!-- Terminal Service Cards -->
      <div class="grid lg:grid-cols-2 gap-8 mb-20">
        <div v-for="(service, index) in mainServices" :key="service.title" 
             class="group relative animate-slide-up-stagger" 
             :style="`animation-delay: ${index * 0.2}s`">
          
          <!-- Terminal Window -->
          <div class="cyber-card rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02] animate-glow-pulse">
            <!-- Terminal Header -->
            <div class="bg-surface-1 px-4 py-3 border-b border-accent-neon/30">
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 rounded-full bg-red-500"></div>
                <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div class="w-3 h-3 rounded-full bg-accent-neon"></div>
                <div class="ml-4 code-font text-accent-cyan text-sm">~/services/{{ service.filename }}</div>
              </div>
            </div>
            
            <!-- Terminal Content -->
            <div class="p-6 lg:p-8 code-pattern">
              <!-- Command Prompt -->
              <div class="code-font text-accent-neon text-sm mb-4">
                <span class="text-accent-cyan">root@trinsler:~$</span> ./{{ service.command }}
              </div>
              
              <!-- Service Icon as ASCII -->
              <div class="relative mb-6">
                <div :class="service.iconBg" class="w-16 h-16 rounded-xl neon-card flex items-center justify-center group-hover:scale-110 transition-transform duration-300 animate-neon-flicker">
                  <component :is="service.icon" class="w-8 h-8 text-white" />
                </div>
                <div class="absolute -top-2 -right-2 code-font text-xs text-accent-cyan bg-surface-2 px-2 py-1 rounded">{{ service.status }}</div>
              </div>

              <!-- Service Title as Output -->
              <div class="mb-4">
                <div class="code-font text-accent-cyan text-sm mb-1">OUTPUT:</div>
                <h3 class="text-2xl font-bold text-white mb-2 font-mono">
                  <span class="text-accent-neon">></span> {{ service.title.toUpperCase() }}
                </h3>
              </div>
              
              <!-- Description as Code Comment -->
              <div class="mb-6">
                <div class="code-font text-accent-purple text-sm mb-2">/* DESCRIPTION */</div>
                <p class="text-white/90 leading-relaxed">
                  {{ service.description }}
                </p>
              </div>

              <!-- Features as Code Array -->
              <div class="mb-6">
                <div class="code-font text-accent-cyan text-sm mb-3">FEATURES = [</div>
                <ul class="space-y-2 ml-4">
                  <li v-for="(feature, idx) in service.features" :key="feature" class="flex items-center text-white/90 code-font text-sm">
                    <span class="text-accent-neon mr-3">"{{ idx + 1 }}":</span>
                    <span>"{{ feature }}"{{ idx < service.features.length - 1 ? ',' : '' }}</span>
                  </li>
                </ul>
                <div class="code-font text-accent-cyan text-sm mt-2">]</div>
              </div>

              <!-- Pricing as JSON -->
              <div class="neon-card rounded-xl p-4">
                <div class="code-font text-accent-orange text-sm mb-2">PRICING_CONFIG.json</div>
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <div class="code-font text-xs text-accent-cyan mb-1">"equity_range":</div>
                    <div class="font-bold text-glow-green text-lg">{{ service.equityRange }}</div>
                  </div>
                  <div>
                    <div class="code-font text-xs text-accent-purple mb-1">"monthly_fee":</div>
                    <div class="font-bold text-glow-cyan text-lg">{{ service.monthlyFee }}</div>
                  </div>
                </div>
              </div>

              <!-- Process Status -->
              <div class="mt-4 flex items-center justify-between code-font text-xs">
                <span class="text-white/60">Process Status:</span>
                <span class="text-accent-neon animate-pulse">● ACTIVE</span>
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
            <div class="code-font text-accent-cyan text-sm mb-4">
              <span class="text-accent-neon">user@startup:~$</span> query --why equity_over_fees
            </div>
            <h3 class="text-3xl lg:text-4xl font-bold text-white mb-4">
              <span class="code-font text-accent-neon">></span> WARUM 
              <span class="gradient-text-neon">EQUITY</span> 
              <span class="code-font text-accent-cyan">STATT_FEES?</span>
            </h3>
            <div class="code-font text-accent-cyan text-sm">Executing algorithm... ✓</div>
          </div>
        </div>

        <!-- Benefits as Code Modules -->
        <div class="grid md:grid-cols-3 gap-8">
          <div v-for="(benefit, index) in benefits" :key="benefit.title" 
               class="group animate-slide-up-stagger" 
               :style="`animation-delay: ${index * 0.3}s`">
            
            <!-- Module Window -->
            <div class="neon-card rounded-2xl overflow-hidden transition-all duration-500 hover:scale-105">
              <!-- Module Header -->
              <div class="bg-surface-1 px-4 py-3 border-b border-accent-neon/30">
                <div class="flex items-center gap-2">
                  <div class="w-2 h-2 rounded-full bg-accent-neon animate-pulse"></div>
                  <div class="code-font text-accent-cyan text-xs">MODULE_{{ index + 1 }}.js</div>
                </div>
              </div>
              
              <!-- Module Content -->
              <div class="p-6 text-center">
                <!-- Icon as Process -->
                <div class="relative mb-6">
                  <div :class="benefit.iconBg" class="w-16 h-16 rounded-xl mx-auto flex items-center justify-center group-hover:scale-110 transition-transform duration-300 animate-neon-flicker">
                    <component :is="benefit.icon" class="w-8 h-8 text-white" />
                  </div>
                  <div class="absolute -top-1 -right-1 w-3 h-3 bg-accent-neon rounded-full animate-pulse"></div>
                </div>
                
                <!-- Function Definition -->
                <div class="code-font text-accent-cyan text-sm mb-2">function {{ benefit.title.toLowerCase().replace(/\s+/g, '_') }}() {</div>
                <h4 class="text-lg font-bold text-white mb-4">{{ benefit.title.toUpperCase() }}</h4>
                <p class="text-white/80 text-sm leading-relaxed mb-4">{{ benefit.description }}</p>
                <div class="code-font text-accent-cyan text-sm">return success;</div>
                <div class="code-font text-accent-cyan text-sm">}</div>
                
                <!-- Status -->
                <div class="mt-4 pt-4 border-t border-accent-neon/20">
                  <div class="flex items-center justify-center gap-2 code-font text-xs">
                    <span class="text-accent-neon animate-pulse">●</span>
                    <span class="text-white/60">STATUS: OPTIMIZED</span>
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
              <div class="w-3 h-3 rounded-full bg-red-500"></div>
              <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div class="w-3 h-3 rounded-full bg-accent-neon"></div>
              <div class="ml-4 code-font text-accent-cyan">~/growth-revolution/initialize.sh</div>
            </div>
          </div>
          
          <!-- Terminal Content -->
          <div class="p-8 lg:p-12 code-pattern">
            <!-- System Query -->
            <div class="code-font text-accent-neon text-sm mb-6">
              <span class="text-accent-cyan">admin@trinsler:~$</span> ./start_revolution --mode=growth
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
                <span class="code-font text-accent-neon">></span> BEREIT FÜR DIE 
                <span class="gradient-text-neon">REVOLUTION?</span>
              </h3>
              
              <!-- Code Block Description -->
              <div class="cyber-card rounded-xl p-6 max-w-3xl mx-auto mb-8">
                <div class="code-font text-accent-purple text-sm mb-3">/* MISSION_BRIEFING */</div>
                <p class="text-lg text-white/90 leading-relaxed mb-4">
                  <span class="text-accent-cyan">ALGORITHMUS:</span> Equity + operative Skills = nachhaltiges Wachstum
                </p>
                <div class="code-font text-accent-orange text-sm">
                  if (startup.ready) { initializeGrowth(); }
                </div>
              </div>
            </div>
            
            <!-- Command Buttons -->
            <div class="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
              <NuxtLink to="/contact" class="btn-primary group code-font animate-glow-pulse">
                <span>> EXECUTE_GROWTH_AUDIT()</span>
                <ArrowRightIcon class="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </NuxtLink>
              <NuxtLink to="/portfolio" class="btn-secondary code-font">
                <PlayIcon class="mr-2 h-5 w-5" />
                LOAD_SUCCESS_STORIES.JSON
              </NuxtLink>
            </div>
            
            <!-- System Status -->
            <div class="border-t border-accent-neon/20 pt-6">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6 code-font text-sm">
                <div class="text-center">
                  <div class="text-accent-cyan mb-1">SYSTEM_STATUS:</div>
                  <div class="text-accent-neon animate-pulse">● ONLINE</div>
                </div>
                <div class="text-center">
                  <div class="text-accent-purple mb-1">ACTIVE_PARTNERSHIPS:</div>
                  <div class="text-white font-bold">12</div>
                </div>
                <div class="text-center">
                  <div class="text-accent-orange mb-1">SUCCESS_RATE:</div>
                  <div class="text-glow-green font-bold">89%</div>
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
import { 
  CheckIcon, 
  ArrowRightIcon, 
  PlayIcon,
  RocketLaunchIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  HeartIcon,
  ShieldCheckIcon,
  LightBulbIcon
} from '@heroicons/vue/24/outline'

const mainServices = [
  {
    title: 'Growth-as-a-Service',
    description: 'Vollständige operative Growth-Unterstützung für Ihr Startup. Wir übernehmen Marketing, Sales, Product Growth und mehr.',
    icon: RocketLaunchIcon,
    iconBg: 'bg-gradient-to-r from-accent-neon to-accent-cyan',
    filename: 'growth_service.sh',
    command: 'start_growth_engine',
    status: 'ONLINE',
    equityRange: '5-15%',
    monthlyFee: '€200-500',
    features: [
      'Komplette Marketing-Strategie & Umsetzung',
      'Sales Funnel Optimierung & Automation', 
      'Product-Market-Fit Entwicklung',
      'KPI-Tracking & Growth Analytics',
      'Team-Scaling & Hiring Support'
    ]
  },
  {
    title: 'Equity-for-Marketing',
    description: 'Professionelles Digital Marketing gegen Equity-Beteiligung. Perfekt für Startups mit begrenztem Marketing-Budget.',
    icon: ChartBarIcon,
    iconBg: 'bg-gradient-to-r from-accent-purple to-accent-pink',
    filename: 'marketing_equity.py',
    command: 'execute_marketing_stack',
    status: 'RUNNING',
    equityRange: '3-10%',
    monthlyFee: '€100-300',
    features: [
      'Social Media Management & Content',
      'Paid Advertising (Google, Meta, LinkedIn)',
      'SEO & Content Marketing',
      'Email Marketing Automation',
      'Performance Tracking & Reporting'
    ]
  }
]

const benefits = [
  {
    title: 'Skin in the Game',
    description: 'Wir verdienen nur, wenn Ihr Startup erfolgreich ist. Unsere Interessen sind perfekt aligned.',
    icon: HeartIcon,
    iconBg: 'bg-gradient-to-r from-red-500 to-pink-500'
  },
  {
    title: 'Niedriger Cash-Burn',
    description: 'Sparen Sie 80% der üblichen Agentur-Kosten. Mehr Runway für Product Development und Team.',
    icon: CurrencyDollarIcon,
    iconBg: 'bg-gradient-to-r from-green-500 to-emerald-500'
  },
  {
    title: 'Langfristige Partnerschaft',
    description: 'Keine kurzfristigen Projekte. Wir wachsen mit Ihnen über Jahre hinweg.',
    icon: ShieldCheckIcon,
    iconBg: 'bg-gradient-to-r from-blue-500 to-indigo-500'
  }
]
</script>