<template>
  <div class="min-h-screen matrix-bg relative overflow-hidden">
    <!-- Advanced Cyber Grid Matrix ---->
    <div class="absolute inset-0 cyber-grid opacity-40"></div>
    
    <!-- Complex Data Streams ---->
    <div class="absolute inset-0">
      <div class="animate-data-stream absolute left-8 w-1 h-64 bg-gradient-to-b from-transparent via-accent-neon to-transparent" style="animation-delay: 0s;"></div>
      <div class="animate-data-stream absolute left-20 w-1 h-48 bg-gradient-to-b from-transparent via-accent-cyan to-transparent" style="animation-delay: 0.5s;"></div>
      <div class="animate-data-stream absolute left-32 w-1 h-56 bg-gradient-to-b from-transparent via-accent-purple to-transparent" style="animation-delay: 1s;"></div>
      <div class="animate-data-stream absolute left-44 w-1 h-40 bg-gradient-to-b from-transparent via-accent-orange to-transparent" style="animation-delay: 1.5s;"></div>
      <div class="animate-data-stream absolute right-44 w-1 h-52 bg-gradient-to-b from-transparent via-accent-pink to-transparent" style="animation-delay: 2s;"></div>
      <div class="animate-data-stream absolute right-32 w-1 h-44 bg-gradient-to-b from-transparent via-accent-neon to-transparent" style="animation-delay: 2.5s;"></div>
      <div class="animate-data-stream absolute right-20 w-1 h-38 bg-gradient-to-b from-transparent via-accent-cyan to-transparent" style="animation-delay: 3s;"></div>
      <div class="animate-data-stream absolute right-8 w-1 h-46 bg-gradient-to-b from-transparent via-accent-purple to-transparent" style="animation-delay: 3.5s;"></div>
    </div>

    <!-- Floating Code Matrix ---->
    <div class="absolute inset-0 data-points">
      <div class="floating-element absolute top-24 left-28 code-font text-accent-neon text-xs opacity-70">insights.decrypt()</div>
      <div class="floating-element absolute top-36 right-36 code-font text-accent-cyan text-xs opacity-70" style="animation-delay: 1s;">knowledge.matrix()</div>
      <div class="floating-element absolute bottom-44 left-1/4 code-font text-accent-purple text-xs opacity-70" style="animation-delay: 2s;">growth.algorithms</div>
      <div class="floating-element absolute top-3/4 right-1/4 code-font text-accent-orange text-xs opacity-70" style="animation-delay: 3s;">startup.evolution()</div>
      <div class="floating-element absolute top-1/3 left-3/4 code-font text-accent-pink text-xs opacity-70" style="animation-delay: 4s;">[INTEL_CLASSIFIED]</div>
      <div class="floating-element absolute top-1/2 left-1/6 code-font text-accent-neon text-xs opacity-70" style="animation-delay: 5s;">equity.insights++</div>
    </div>

    <div class="relative container-custom py-20">
      <!-- Intelligence Terminal Header ---->
      <div class="cyber-card rounded-3xl overflow-hidden max-w-6xl mx-auto mb-20 animate-glow-pulse">
        <!-- Terminal Header ---->
        <div class="bg-surface-1 px-6 py-4 border-b border-accent-neon/30">
          <div class="flex items-center gap-3">
            <div class="w-4 h-4 rounded-full bg-red-500"></div>
            <div class="w-4 h-4 rounded-full bg-yellow-500"></div>
            <div class="w-4 h-4 rounded-full bg-accent-neon "></div>
            <div class="ml-4 code-font text-accent-cyan text-lg">~/intelligence/growth-matrix.sh</div>
          </div>
        </div>

        <!-- Terminal Content ---->
        <div class="p-8 lg:p-12 code-pattern">
          <!-- System Boot ---->
          <div class="mb-8">
            <div class="code-font text-accent-neon text-sm mb-4 animate-slide-up-stagger">
              <span class="text-accent-cyan">intelligence@trinsler:~$</span> decrypt --growth-insights --classified
            </div>
            <div class="neon-card rounded-xl px-6 py-3 inline-block animate-neon-flicker">
              <span class="code-font text-accent-neon">[INTELLIGENCE_MATRIX_ACTIVE]</span>
              <span class="text-white ml-2">GROWTH_INTEL.EXE</span>
            </div>
          </div>

          <!-- ASCII Header ---->
          <div class="mb-12 text-center">
            <h1 class="text-4xl sm:text-6xl lg:text-7xl font-black text-white mb-6 animate-glitch">
              <span class="code-font text-accent-neon">></span> GROWTH
              <br />
              <span class="gradient-text-neon">INTELLIGENCE</span>
              <br />
              <span class="text-accent-cyan code-font">_CLASSIFIED</span>
            </h1>
          </div>

          <!-- Intelligence Brief ---->
          <div class="cyber-card rounded-xl p-6 max-w-4xl mx-auto">
            <div class="code-font text-accent-purple text-sm mb-3">/* CLASSIFIED_INTEL.md */</div>
            <p class="text-xl text-white/90 leading-relaxed">
              <span class="text-accent-cyan">ZUGANG_GEWÄHRT:</span> Exklusive Growth-Strategien und 
              <span class="font-bold text-glow-green">Startup-Intelligence</span> aus unseren erfolgreichen 
              Equity-Partnerships. <span class="text-accent-neon">Classified information</span> für Elite-Founder.
            </p>
            <div class="code-font text-accent-orange text-sm mt-4">
              if (founder.readyLevel > 9000) { insights.unlock(); }
            </div>
          </div>
        </div>
      </div>

      <!-- Intelligence Articles Grid ---->
      <div class="grid lg:grid-cols-3 gap-8 mb-16">
        <div v-for="(article, index) in articles" :key="article.title" 
             class="group relative animate-slide-up-stagger"
             :style="`animation-delay: ${index * 0.2}s`">
          
          <!-- Intel File Terminal ---->
          <div class="cyber-card rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02] animate-glow-pulse">
            <!-- Terminal Header ---->
            <div class="bg-surface-1 px-4 py-3 border-b border-accent-neon/30">
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 rounded-full bg-accent-neon "></div>
                <div class="code-font text-accent-cyan text-xs">{{ article.filename }}</div>
                <div class="ml-auto text-xs" :class="article.classificationColor">{{ article.classification }}</div>
              </div>
            </div>
            
            <!-- Article Visual ---->
            <div class="relative h-48 bg-gradient-to-br from-surface-2 to-surface-1 overflow-hidden">
              <!-- Matrix Background ---->
              <div class="absolute inset-0 cyber-grid opacity-20"></div>
              
              <!-- Floating Intel Data ---->
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="text-center">
                  <div :class="article.iconBg" class="w-16 h-16 rounded-xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform animate-neon-flicker">
                    <svg v-if="article.icon === 'rocket'" class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    <svg v-else-if="article.icon === 'bolt'" class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <svg v-else-if="article.icon === 'chart'" class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <svg v-else-if="article.icon === 'cog'" class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <svg v-else-if="article.icon === 'lightbulb'" class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    <svg v-else class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div class="code-font text-accent-cyan text-xs">{{ article.category }}</div>
                </div>
              </div>
              
              <!-- Code Fragments ---->
              <div class="absolute top-4 left-4 code-font text-xs text-accent-neon opacity-60">
                {{ article.codeSnippet }}
              </div>
              
              <!-- Classification Badge ---->
              <div class="absolute top-4 right-4 neon-card px-2 py-1 text-xs code-font" :class="article.badgeColor">
                {{ article.securityLevel }}
              </div>
            </div>
            
            <!-- Intel Content ---->
            <div class="p-6 code-pattern">
              <!-- Intel Command ---->
              <div class="code-font text-accent-neon text-sm mb-3">
                <span class="text-accent-cyan">intel@matrix:~$</span> cat {{ article.filename }}
              </div>
              
              <!-- Article Title ---->
              <h3 class="text-xl font-bold text-white mb-3 code-font">
                <span class="text-accent-neon">></span> {{ article.title.toUpperCase() }}
              </h3>
              
              <!-- Article Preview ---->
              <div class="mb-4">
                <div class="code-font text-accent-purple text-xs mb-2">/* INTEL_PREVIEW */</div>
                <p class="text-white/90 text-sm leading-relaxed">{{ article.preview }}</p>
              </div>
              
              <!-- Insights Array ---->
              <div class="mb-4">
                <div class="code-font text-accent-cyan text-xs mb-2">KEY_INSIGHTS = [</div>
                <div class="ml-4 space-y-1">
                  <div v-for="(insight, idx) in article.insights" :key="insight" 
                       class="text-white/80 text-xs code-font">
                    "{{ insight }}"{{ idx < article.insights.length - 1 ? ',' : '' }}
                  </div>
                </div>
                <div class="code-font text-accent-cyan text-xs">]</div>
              </div>
              
              <!-- Intelligence Level ---->
              <div class="neon-card rounded-xl p-3 mb-4">
                <div class="code-font text-accent-orange text-xs mb-1">INTEL_LEVEL:</div>
                <div class="text-center">
                  <div class="text-lg font-bold text-glow-green">{{ article.readTime }}</div>
                  <div class="code-font text-white/60 text-xs">// Decryption time required</div>
                </div>
              </div>
              
              <!-- Access Button ---->
              <button class="w-full btn-secondary group code-font text-sm hover:scale-105 transition-all duration-300">
                <span class="flex items-center justify-center">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  > DECRYPT_INTEL()
                  <svg class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </button>
              
              <!-- Status ---->
              <div class="mt-4 pt-4 border-t border-accent-neon/20">
                <div class="flex items-center justify-between code-font text-xs">
                  <span class="text-white/60">Access Level:</span>
                  <span class="text-accent-neon ">● {{ article.accessLevel }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Newsletter Intelligence Terminal ---->
      <div class="cyber-card rounded-3xl overflow-hidden max-w-4xl mx-auto animate-glow-pulse">
        <!-- Terminal Header ---->
        <div class="bg-surface-1 px-6 py-4 border-b border-accent-neon/30">
          <div class="flex items-center gap-3">
            <div class="w-4 h-4 rounded-full bg-red-500"></div>
            <div class="w-4 h-4 rounded-full bg-yellow-500"></div>
            <div class="w-4 h-4 rounded-full bg-accent-neon "></div>
            <div class="ml-4 code-font text-accent-cyan text-lg">~/subscribe/intelligence-feed.sh</div>
          </div>
        </div>
        
        <!-- Terminal Content ---->
        <div class="p-8 lg:p-12 text-center code-pattern">
          <!-- Subscribe Prompt ---->
          <div class="code-font text-accent-neon text-sm mb-6">
            <span class="text-accent-cyan">intelligence@trinsler:~$</span> subscribe --growth-intel --exclusive
          </div>
          
          <!-- ASCII Banner ---->
          <div class="code-font text-accent-neon text-xs mb-8">
            <pre class="text-center animate-slide-up-stagger">
  ╔═══════════════════════════════════════════════╗
  ║        INTELLIGENCE FEED                      ║
  ║          SUBSCRIPTION                         ║
  ║           ACTIVATED                           ║
  ╚═══════════════════════════════════════════════╝
            </pre>
          </div>
          
          <!-- Intelligence Offer ---->
          <div class="mb-8">
            <h3 class="text-3xl lg:text-4xl font-bold text-white mb-6 animate-glitch">
              <span class="code-font text-accent-neon">></span> EXKLUSIVE 
              <span class="gradient-text-neon">GROWTH_INTEL</span>
            </h3>
            
            <div class="cyber-card rounded-xl p-6 max-w-3xl mx-auto mb-8">
              <div class="code-font text-accent-purple text-sm mb-3">/* INTEL_FEED_DESCRIPTION */</div>
              <p class="text-lg text-white/90 leading-relaxed mb-4">
                <span class="text-accent-cyan">CLASSIFIED:</span> Wöchentliche Growth-Insights und 
                <span class="font-bold text-glow-green">Startup-Intelligence</span> direkt aus unseren 
                erfolgreichen Equity-Partnerships.
              </p>
              <div class="code-font text-accent-orange text-sm">
                if (founder.subscribe()) { intelligence.level++; }
              </div>
            </div>
          </div>
          
          <!-- Subscribe Form ---->
          <div class="cyber-card rounded-xl p-6 max-w-md mx-auto mb-8">
            <div class="code-font text-accent-cyan text-sm mb-4">
              SUBSCRIBE_PROTOCOL.init()
            </div>
            <form @submit.prevent="subscribeIntel" class="space-y-4">
              <div class="relative">
                <input
                  v-model="emailIntel"
                  type="email"
                  required
                  placeholder="founder@startup.com"
                  class="w-full bg-surface-2 border border-accent-neon/30 rounded-xl px-4 py-3 text-white code-font focus:border-accent-neon focus:ring-2 focus:ring-accent-neon/20 transition-all"
                >
              </div>
              <button
                type="submit"
                class="btn-primary w-full code-font animate-glow-pulse hover:scale-105 transition-all duration-300"
              >
                > SUBSCRIBE_TO_INTEL()
              </button>
            </form>
          </div>
          
          <!-- Intelligence Stats ---->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 code-font text-sm">
            <div class="text-center">
              <div class="text-accent-cyan mb-1">INTEL_SUBSCRIBERS:</div>
              <div class="text-accent-neon ">● 1,247</div>
            </div>
            <div class="text-center">
              <div class="text-accent-purple mb-1">AVG_GROWTH_BOOST:</div>
              <div class="text-glow-green font-bold">+340%</div>
            </div>
            <div class="text-center">
              <div class="text-accent-orange mb-1">CLASSIFICATION:</div>
              <div class="text-white font-bold">TOP_SECRET</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

useHead({
  title: 'GROWTH INTELLIGENCE CLASSIFIED - Trinsler Matrix'
})

const emailIntel = ref('')

const subscribeIntel = () => {
  console.log('> INTEL_SUBSCRIPTION_ACTIVATED:', emailIntel.value)
  emailIntel.value = ''
  // Add subscription logic here
}

const articles = [
  {
    title: 'Equity-for-Growth Algorithmus',
    preview: 'Der geheime Algorithmus hinter unserem Equity-for-Growth Modell. Wie wir Startups mit mathematischer Präzision skalieren.',
    insights: [
      'Equity-Berechnung nach Wachstumspotential',
      'ROI-Optimierung durch intelligente Ressourcenallokation',
      'Predictive Growth Analytics'
    ],
    filename: 'equity_algorithm.md',
    category: 'GROWTH_HACKING',
    classification: 'COSMIC',
    classificationColor: 'text-accent-neon',
    securityLevel: 'ULTRA',
    badgeColor: 'text-accent-neon',
    codeSnippet: 'equity.calculate()',
    icon: 'rocket',
    iconBg: 'bg-gradient-to-r from-accent-neon to-accent-cyan',
    readTime: '8 MIN',
    accessLevel: 'FOUNDER+'
  },
  {
    title: 'Viral Growth Engineering',
    preview: 'Classified strategies for engineering viral growth loops. How we create exponential user acquisition for our portfolio startups.',
    insights: [
      'Viral Coefficient Optimization',
      'Network Effect Engineering',
      'Growth Loop Architecture'
    ],
    filename: 'viral_engineering.py',
    category: 'VIRAL_GROWTH',
    classification: 'SECRET',
    classificationColor: 'text-accent-cyan',
    securityLevel: 'HIGH',
    badgeColor: 'text-accent-cyan',
    codeSnippet: 'viral.spread(infinite)',
    icon: 'bolt',
    iconBg: 'bg-gradient-to-r from-accent-cyan to-accent-purple',
    readTime: '12 MIN',
    accessLevel: 'ELITE'
  },
  {
    title: 'Revenue Optimization Matrix',
    preview: 'Advanced revenue optimization strategies used in our most successful partnerships. Mathematical approach to growth.',
    insights: [
      'Revenue Funnel Mathematics',
      'LTV:CAC Optimization Algorithms',
      'Pricing Strategy Intelligence'
    ],
    filename: 'revenue_matrix.js',
    category: 'REVENUE_OPS',
    classification: 'CONFIDENTIAL',
    classificationColor: 'text-accent-purple',
    securityLevel: 'MED',
    badgeColor: 'text-accent-purple',
    codeSnippet: 'revenue.optimize()',
    icon: 'chart',
    iconBg: 'bg-gradient-to-r from-accent-purple to-accent-pink',
    readTime: '15 MIN',
    accessLevel: 'PREMIUM'
  },
  {
    title: 'AI-Powered Growth Automation',
    preview: 'How we use artificial intelligence to automate growth processes and scale startups without human intervention.',
    insights: [
      'Machine Learning Growth Models',
      'Automated A/B Testing Systems',
      'Predictive Analytics Implementation'
    ],
    filename: 'ai_growth.exe',
    category: 'AI_AUTOMATION',
    classification: 'RESTRICTED',
    classificationColor: 'text-accent-orange',
    securityLevel: 'LOW',
    badgeColor: 'text-accent-orange',
    codeSnippet: 'ai.automate(growth)',
    icon: 'cog',
    iconBg: 'bg-gradient-to-r from-accent-orange to-accent-neon',
    readTime: '10 MIN',
    accessLevel: 'STANDARD'
  },
  {
    title: 'Startup Psychology Hacks',
    preview: 'Psychological triggers and behavioral patterns we exploit to drive user engagement and retention in startup products.',
    insights: [
      'User Psychology Manipulation',
      'Behavioral Trigger Engineering',
      'Addiction Loop Creation'
    ],
    filename: 'psych_hacks.sh',
    category: 'PSYCHOLOGY',
    classification: 'CLASSIFIED',
    classificationColor: 'text-accent-pink',
    securityLevel: 'TOP',
    badgeColor: 'text-accent-pink',
    codeSnippet: 'psychology.hack()',
    icon: 'lightbulb',
    iconBg: 'bg-gradient-to-r from-accent-pink to-accent-neon',
    readTime: '6 MIN',
    accessLevel: 'EXPERT'
  },
  {
    title: 'Community Building Warfare',
    preview: 'Military-grade community building strategies. How to create fanatical user communities that drive exponential growth.',
    insights: [
      'Community Psychology Warfare',
      'Influencer Network Infiltration',
      'Viral Community Engineering'
    ],
    filename: 'community_warfare.md',
    category: 'COMMUNITY_OPS',
    classification: 'TOP_SECRET',
    classificationColor: 'text-green-400',
    securityLevel: 'MAX',
    badgeColor: 'text-green-400',
    codeSnippet: 'community.dominate()',
    icon: 'users',
    iconBg: 'bg-gradient-to-r from-green-500 to-emerald-500',
    readTime: '20 MIN',
    accessLevel: 'LEGENDARY'
  }
]
</script>