<template>
  <div class="min-h-screen matrix-bg relative overflow-hidden">
    <!-- Advanced Cyber Grid Matrix -->
    <div class="absolute inset-0 cyber-grid opacity-40"></div>
    
    <!-- Complex Data Streams -->
    <div class="absolute inset-0">
      <div class="animate-data-stream absolute left-16 w-1 h-64 bg-gradient-to-b from-transparent via-accent-neon to-transparent" style="animation-delay: 0s;"></div>
      <div class="animate-data-stream absolute left-32 w-1 h-48 bg-gradient-to-b from-transparent via-accent-cyan to-transparent" style="animation-delay: 0.7s;"></div>
      <div class="animate-data-stream absolute left-48 w-1 h-56 bg-gradient-to-b from-transparent via-accent-purple to-transparent" style="animation-delay: 1.4s;"></div>
      <div class="animate-data-stream absolute right-48 w-1 h-44 bg-gradient-to-b from-transparent via-accent-orange to-transparent" style="animation-delay: 2.1s;"></div>
      <div class="animate-data-stream absolute right-32 w-1 h-52 bg-gradient-to-b from-transparent via-accent-pink to-transparent" style="animation-delay: 2.8s;"></div>
      <div class="animate-data-stream absolute right-16 w-1 h-40 bg-gradient-to-b from-transparent via-accent-neon to-transparent" style="animation-delay: 3.5s;"></div>
    </div>

    <!-- Floating Code Matrix -->
    <div class="absolute inset-0 data-points">
      <div class="floating-element absolute top-24 left-24 code-font text-accent-neon text-xs opacity-70">trends.analyze(2025)</div>
      <div class="floating-element absolute top-40 right-28 code-font text-accent-cyan text-xs opacity-70" style="animation-delay: 1s;">ai.marketing.future()</div>
      <div class="floating-element absolute bottom-48 left-1/4 code-font text-accent-purple text-xs opacity-70" style="animation-delay: 2s;">privacy.first.strategy</div>
      <div class="floating-element absolute top-3/4 right-1/3 code-font text-accent-orange text-xs opacity-70" style="animation-delay: 3s;">personalization++</div>
      <div class="floating-element absolute top-1/3 left-3/4 code-font text-accent-pink text-xs opacity-70" style="animation-delay: 4s;">[FUTURE_READY]</div>
    </div>

    <div class="relative container-custom py-20">
      <!-- Trends Terminal Header -->
      <div class="cyber-card rounded-3xl overflow-hidden max-w-6xl mx-auto mb-20">
        <!-- Terminal Header -->
        <div class="bg-surface-1 px-6 py-4 border-b border-accent-neon/30">
          <div class="flex items-center gap-3">
            <div class="w-4 h-4 rounded-full bg-red-500"></div>
            <div class="w-4 h-4 rounded-full bg-yellow-500"></div>
            <div class="w-4 h-4 rounded-full bg-accent-neon"></div>
            <div class="ml-4 code-font text-accent-cyan text-lg">~/trends/digital-marketing-2025.sh</div>
          </div>
        </div>

        <!-- Terminal Content -->
        <div class="p-8 lg:p-12 code-pattern">
          <!-- System Boot -->
          <div class="mb-8">
            <div class="code-font text-accent-neon text-sm mb-4">
              <span class="text-accent-cyan">trends@trinsler:~$</span> scan --digital-marketing --year=2025 --active
            </div>
            <div class="neon-card rounded-xl px-6 py-3 inline-block">
              <span class="code-font text-accent-neon">[TREND_ANALYSIS_ACTIVE]</span>
              <span class="text-white ml-2">FUTURE_MARKETING.EXE</span>
            </div>
          </div>

          <!-- ASCII Header -->
          <div class="mb-12 text-center">
            <h1 class="text-4xl sm:text-6xl lg:text-7xl font-black text-white mb-6">
              <span class="text-white">DIGITAL</span>
              <br />
              <span class="gradient-text-neon">MARKETING</span>
              <br />
              <span class="text-accent-cyan">TRENDS 2025</span>
            </h1>
          </div>

          <!-- Trends Brief -->
          <div class="cyber-card rounded-xl p-6 max-w-4xl mx-auto">
            <div class="text-accent-purple text-sm mb-3">Zukunft des Digital Marketing</div>
            <p class="text-xl text-white/90 leading-relaxed">
              <span class="text-accent-cyan">Revolutionäre Trends:</span> Die wichtigsten 
              <span class="font-bold text-glow-green">Digital Marketing Entwicklungen für 2025</span>. 
              Bleiben Sie der Konkurrenz voraus mit <span class="text-accent-neon">zukunftsweisenden Strategien</span>.
            </p>
            <div class="text-accent-orange text-sm mt-4">
              Alle Trends basieren auf aktueller Marktanalyse und Expertenbewertungen
            </div>
          </div>
        </div>
      </div>

      <!-- Trends Grid -->
      <div class="grid lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
        <div v-for="(trend, index) in trends" :key="trend.title" 
             class="group relative"
             :style="`animation-delay: ${index * 0.2}s`">
          
          <!-- Trend Terminal -->
          <div class="cyber-card rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02]">
            <!-- Terminal Header -->
            <div class="bg-surface-1 px-4 py-3 border-b border-accent-neon/30">
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 rounded-full bg-accent-neon"></div>
                <div class="code-font text-accent-cyan text-xs">{{ trend.filename }}</div>
                <div class="ml-auto text-xs" :class="trend.priorityColor">{{ trend.priority }}</div>
              </div>
            </div>
            
            <!-- Trend Visual -->
            <div class="relative h-48 bg-gradient-to-br from-surface-2 to-surface-1 overflow-hidden">
              <!-- Matrix Background -->
              <div class="absolute inset-0 cyber-grid opacity-20"></div>
              
              <!-- Floating Trend Data -->
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="text-center">
                  <div :class="trend.iconBg" class="w-16 h-16 rounded-xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <component :is="trend.icon" class="w-8 h-8 text-white" />
                  </div>
                  <div class="code-font text-accent-cyan text-xs">{{ trend.category }}</div>
                </div>
              </div>
              
              <!-- Code Fragments -->
              <div class="absolute top-4 left-4 code-font text-xs text-accent-neon opacity-60">
                {{ trend.codeSnippet }}
              </div>
              
              <!-- Impact Badge -->
              <div class="absolute top-4 right-4 neon-card px-2 py-1 text-xs code-font" :class="trend.impactColor">
                {{ trend.impactLevel }}
              </div>
            </div>
            
            <!-- Trend Content -->
            <div class="p-6 code-pattern">
              <!-- Trend Command -->
              <div class="text-accent-neon text-sm mb-3">
                Trend: {{ trend.filename }}
              </div>
              
              <!-- Trend Title -->
              <h3 class="text-xl font-bold text-white mb-3">
                {{ trend.title }}
              </h3>
              
              <!-- Trend Description -->
              <div class="mb-4">
                <div class="text-accent-purple text-xs mb-2">Beschreibung</div>
                <p class="text-white/90 text-sm leading-relaxed">{{ trend.description }}</p>
              </div>
              
              <!-- Key Points -->
              <div class="mb-4">
                <div class="text-accent-cyan text-xs mb-2">KEY_POINTS = [</div>
                <div class="ml-4 space-y-1">
                  <div v-for="(point, idx) in trend.keyPoints" :key="point" 
                       class="text-white/80 text-xs">
                    "{{ point }}"{{ idx < trend.keyPoints.length - 1 ? ',' : '' }}
                  </div>
                </div>
                <div class="text-accent-cyan text-xs">]</div>
              </div>
              
              <!-- Implementation Info -->
              <div class="neon-card rounded-xl p-4">
                <div class="text-accent-orange text-xs mb-2">UMSETZUNG_STATUS:</div>
                <div class="flex justify-between items-center">
                  <div>
                    <div class="text-glow-green font-bold">{{ trend.timeframe }}</div>
                    <div class="text-white/60 text-xs">Umsetzungszeitraum</div>
                  </div>
                  <div class="text-right">
                    <div class="text-accent-neon text-xs">PRIORITÄT:</div>
                    <div class="text-white font-bold text-xs">{{ trend.urgency }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Action Terminal -->
      <div class="cyber-card rounded-3xl overflow-hidden max-w-4xl mx-auto">
        <!-- Terminal Header -->
        <div class="bg-surface-1 px-6 py-4 border-b border-accent-neon/30">
          <div class="flex items-center gap-3">
            <div class="w-4 h-4 rounded-full bg-red-500"></div>
            <div class="w-4 h-4 rounded-full bg-yellow-500"></div>
            <div class="w-4 h-4 rounded-full bg-accent-neon"></div>
            <div class="ml-4 code-font text-accent-cyan text-lg">~/implementation/future-ready.sh</div>
          </div>
        </div>
        
        <!-- Terminal Content -->
        <div class="p-8 lg:p-12 text-center code-pattern">
          <!-- Action Prompt -->
          <div class="code-font text-accent-neon text-sm mb-6">
            <span class="text-accent-cyan">future@trinsler:~$</span> implement --marketing-trends --startup-ready
          </div>
          
          <!-- Action Message -->
          <div class="mb-8">
            <h3 class="text-3xl lg:text-4xl font-bold text-white mb-6">
              <span class="code-font text-accent-neon">></span> BEREIT FÜR DIE 
              <span class="gradient-text-neon">MARKETING_ZUKUNFT?</span>
            </h3>
            
            <div class="cyber-card rounded-xl p-6 max-w-3xl mx-auto mb-8">
              <div class="code-font text-accent-purple text-sm mb-3">/* FUTURE_IMPLEMENTATION */</div>
              <p class="text-lg text-white/90 leading-relaxed">
                <span class="text-accent-cyan">MISSION:</span> Implementieren Sie diese 
                <span class="font-bold text-glow-green">zukunftsweisenden Marketing-Trends</span> 
                in Ihrem Startup. Unsere Experten helfen bei der strategischen Umsetzung.
              </p>
              <div class="code-font text-accent-orange text-sm mt-4">
                if (startup.ready) { future.marketing.implement(); }
              </div>
            </div>
          </div>
          
          <!-- Execute Button -->
          <NuxtLink
            to="/contact"
            class="btn-primary group code-font text-xl transform hover:scale-110 transition-all duration-300"
          >
            <span class="flex items-center">
              <RocketLaunchIcon class="w-6 h-6 mr-3" />
              Zukunfts-Marketing umsetzen
              <ArrowRightIcon class="w-5 h-5 ml-3 group-hover:translate-x-2 transition-transform" />
            </span>
          </NuxtLink>
          
          <!-- Future Stats -->
          <div class="mt-8 pt-6 border-t border-accent-neon/20">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 code-font text-sm">
              <div class="text-center">
                <div class="text-accent-cyan mb-1">TRENDS_TRACKED:</div>
                <div class="text-accent-neon">● 8</div>
              </div>
              <div class="text-center">
                <div class="text-accent-purple mb-1">SUCCESS_RATE:</div>
                <div class="text-glow-green font-bold">94%</div>
              </div>
              <div class="text-center">
                <div class="text-accent-orange mb-1">FORECAST:</div>
                <div class="text-white font-bold">2025_READY</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { 
  RocketLaunchIcon,
  ArrowRightIcon,
  CpuChipIcon,
  ShieldCheckIcon,
  VideoCameraIcon,
  ChatBubbleBottomCenterTextIcon,
  DevicePhoneMobileIcon,
  UserGroupIcon,
  MegaphoneIcon,
  ChartBarIcon
} from '@heroicons/vue/24/outline'

useHead({
  title: 'DIGITAL MARKETING TRENDS 2025 - Trinsler Future Matrix'
})

const trends = [
  {
    title: 'KI-gesteuerte Personalisierung',
    description: 'Künstliche Intelligenz revolutioniert die Personalisierung von Marketing-Inhalten. Hyper-personalisierte Erlebnisse für jeden einzelnen Kunden in Echtzeit.',
    keyPoints: [
      'Echtzeit-Personalisierung durch Machine Learning',
      'Dynamische Content-Anpassung',
      'Predictive Customer Journey Mapping'
    ],
    filename: 'ai_personalization.py',
    category: 'AI_MARKETING',
    priority: 'KRITISCH',
    priorityColor: 'text-accent-neon',
    impactLevel: 'HOCH',
    impactColor: 'text-accent-neon',
    codeSnippet: 'ai.personalize(user)',
    icon: CpuChipIcon,
    iconBg: 'bg-gradient-to-r from-accent-neon to-accent-cyan',
    timeframe: 'Q1-Q2 2025',
    urgency: 'SOFORT'
  },
  {
    title: 'Privacy-First Marketing',
    description: 'Mit dem Ende der Third-Party Cookies steht datenschutzfreundliches Marketing im Vordergrund. Zero-Party Data und Consent-Management werden entscheidend.',
    keyPoints: [
      'Zero-Party Data Strategien',
      'Cookieless Tracking Solutions',
      'Transparente Datennutzung'
    ],
    filename: 'privacy_first.js',
    category: 'DATA_PRIVACY',
    priority: 'HOCH',
    priorityColor: 'text-accent-cyan',
    impactLevel: 'KRITISCH',
    impactColor: 'text-red-400',
    codeSnippet: 'privacy.comply(gdpr)',
    icon: ShieldCheckIcon,
    iconBg: 'bg-gradient-to-r from-accent-cyan to-accent-purple',
    timeframe: 'Q1 2025',
    urgency: 'KRITISCH'
  },
  {
    title: 'Short-Form Video Dominanz',
    description: 'Kurze, fesselnde Videos dominieren alle Plattformen. TikTok, Instagram Reels und YouTube Shorts werden zum Hauptkanal für Markeninteraktion.',
    keyPoints: [
      'Vertikal-optimierte Inhalte',
      'Interactive Video Features',
      'Creator Economy Integration'
    ],
    filename: 'video_marketing.mp4',
    category: 'VIDEO_CONTENT',
    priority: 'MITTEL',
    priorityColor: 'text-accent-purple',
    impactLevel: 'HOCH',
    impactColor: 'text-accent-neon',
    codeSnippet: 'video.create(short)',
    icon: VideoCameraIcon,
    iconBg: 'bg-gradient-to-r from-accent-purple to-accent-pink',
    timeframe: 'Q2 2025',
    urgency: 'MITTEL'
  },
  {
    title: 'Conversational AI Marketing',
    description: 'Chatbots und Sprachassistenten werden zu intelligenten Marketing-Partnern. Natürliche Gespräche ersetzen traditionelle Werbeformen.',
    keyPoints: [
      'Advanced Chatbot Integration',
      'Voice Search Optimization',
      'Conversational Commerce'
    ],
    filename: 'conversational_ai.bot',
    category: 'AI_CONVERSATION',
    priority: 'HOCH',
    priorityColor: 'text-accent-orange',
    impactLevel: 'MITTEL',
    impactColor: 'text-accent-orange',
    codeSnippet: 'chatbot.engage(user)',
    icon: ChatBubbleBottomCenterTextIcon,
    iconBg: 'bg-gradient-to-r from-accent-orange to-accent-neon',
    timeframe: 'Q2-Q3 2025',
    urgency: 'HOCH'
  },
  {
    title: 'Mobile-First Commerce',
    description: 'Smartphones werden zur primären Einkaufsplattform. Social Commerce und In-App Purchases revolutionieren den Verkaufsprozess.',
    keyPoints: [
      'Progressive Web Apps (PWA)',
      'Social Commerce Integration',
      'One-Click Mobile Checkout'
    ],
    filename: 'mobile_commerce.app',
    category: 'MOBILE_STRATEGY',
    priority: 'MITTEL',
    priorityColor: 'text-accent-pink',
    impactLevel: 'HOCH',
    impactColor: 'text-accent-cyan',
    codeSnippet: 'mobile.optimize(ux)',
    icon: DevicePhoneMobileIcon,
    iconBg: 'bg-gradient-to-r from-accent-pink to-accent-cyan',
    timeframe: 'Q1-Q4 2025',
    urgency: 'MITTEL'
  },
  {
    title: 'Community-Driven Marketing',
    description: 'Starke Online-Communities werden zur wertvollsten Marketing-Ressource. Authentische Beziehungen ersetzen traditionelle Werbung.',
    keyPoints: [
      'Community Building Strategies',
      'User-Generated Content Campaigns',
      'Brand Ambassador Programs'
    ],
    filename: 'community_marketing.social',
    category: 'COMMUNITY_BUILD',
    priority: 'MITTEL',
    priorityColor: 'text-green-400',
    impactLevel: 'MITTEL',
    impactColor: 'text-accent-purple',
    codeSnippet: 'community.engage()',
    icon: UserGroupIcon,
    iconBg: 'bg-gradient-to-r from-green-500 to-emerald-500',
    timeframe: 'Q2-Q4 2025',
    urgency: 'NIEDRIG'
  },
  {
    title: 'Omnichannel Erlebnisse',
    description: 'Nahtlose Kundenreisen über alle Kanäle hinweg. Online und Offline verschmelzen zu einer einheitlichen Markenerfahrung.',
    keyPoints: [
      'Unified Customer Profiles',
      'Cross-Channel Attribution',
      'Seamless Experience Design'
    ],
    filename: 'omnichannel.exp',
    category: 'EXPERIENCE_DESIGN',
    priority: 'HOCH',
    priorityColor: 'text-accent-neon',
    impactLevel: 'KRITISCH',
    impactColor: 'text-red-400',
    codeSnippet: 'channels.unify()',
    icon: MegaphoneIcon,
    iconBg: 'bg-gradient-to-r from-blue-500 to-indigo-500',
    timeframe: 'Q1-Q3 2025',
    urgency: 'HOCH'
  },
  {
    title: 'Datengesteuerte Kreativität',
    description: 'Analytics und Kreativität verschmelzen. Datenbasierte Insights steuern kreative Entscheidungen für maximale Wirkung.',
    keyPoints: [
      'Creative Performance Analytics',
      'Dynamic Creative Optimization',
      'Real-time A/B Testing'
    ],
    filename: 'data_creativity.algo',
    category: 'CREATIVE_ANALYTICS',
    priority: 'MITTEL',
    priorityColor: 'text-accent-cyan',
    impactLevel: 'MITTEL',
    impactColor: 'text-accent-orange',
    codeSnippet: 'creativity.optimize()',
    icon: ChartBarIcon,
    iconBg: 'bg-gradient-to-r from-purple-500 to-pink-500',
    timeframe: 'Q3-Q4 2025',
    urgency: 'MITTEL'
  }
]
</script>