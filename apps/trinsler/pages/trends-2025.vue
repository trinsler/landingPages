<template>
  <div class="min-h-screen matrix-bg relative overflow-hidden">
    <!-- Background Effects -->
    <DataStreamBackground />
    <FloatingCodeElements
      :elements="[
        { text: 'trends.analyze(2025)', class: 'top-24 left-24', color: 'accent-neon', delay: 0 },
        { text: 'ai.marketing.future()', class: 'top-40 right-28', color: 'accent-cyan', delay: 1 },
        {
          text: 'privacy.first.strategy',
          class: 'bottom-48 left-1/4',
          color: 'accent-purple',
          delay: 2,
        },
        { text: 'personalization++', class: 'top-3/4 right-1/3', color: 'accent-orange', delay: 3 },
        { text: '[FUTURE_READY]', class: 'top-1/3 left-3/4', color: 'accent-pink', delay: 4 },
      ]"
    />

    <div class="relative container-custom py-20">
      <!-- Trends Terminal Header -->
      <TerminalWindow title="~/trends/digital-marketing-2025.sh" class="mb-20">
        <!-- System Boot -->
        <div class="mb-8">
          <div class="code-font text-accent-neon text-sm mb-4">
            <span class="text-accent-cyan">trends@trinsler:~$</span> scan --digital-marketing
            --year=2025 --active
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
            Bleiben Sie der Konkurrenz voraus mit
            <span class="text-accent-neon">zukunftsweisenden Strategien</span>.
          </p>
          <div class="text-accent-orange text-sm mt-4">
            Alle Trends basieren auf aktueller Marktanalyse und Expertenbewertungen
          </div>
        </div>
      </TerminalWindow>

      <!-- Trends Grid -->
      <TrendGrid :trends="trends" class="mb-16" />

      <!-- Action Terminal -->
      <TerminalWindow title="~/implementation/future-ready.sh">
        <div class="text-center">
          <!-- Action Prompt -->
          <div class="code-font text-accent-neon text-sm mb-6">
            <span class="text-accent-cyan">future@trinsler:~$</span> implement --marketing-trends
            --startup-ready
          </div>

          <!-- Action Message -->
          <div class="mb-8">
            <h3 class="text-3xl lg:text-4xl font-bold text-white mb-6">
              <span class="code-font text-accent-neon">></span> BEREIT FÜR DIE
              <span class="gradient-text-neon">MARKETING_ZUKUNFT?</span>
            </h3>

            <div class="cyber-card rounded-xl p-6 max-w-3xl mx-auto mb-8">
              <div class="code-font text-accent-purple text-sm mb-3">
                /* FUTURE_IMPLEMENTATION */
              </div>
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
              <svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
              Zukunfts-Marketing umsetzen
              <ArrowRightIcon size="md" :animated="true" class="ml-3" />
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
      </TerminalWindow>
    </div>
  </div>
</template>

<script setup>
import {
  TerminalWindow,
  DataStreamBackground,
  FloatingCodeElements,
  TrendGrid,
  ArrowRightIcon,
} from '@monorepo/ui'

useHead({
  title: 'DIGITAL MARKETING TRENDS 2025 - Trinsler Future Matrix',
})

const trends = [
  {
    title: 'KI-gesteuerte Personalisierung',
    description:
      'Künstliche Intelligenz revolutioniert die Personalisierung von Marketing-Inhalten. Hyper-personalisierte Erlebnisse für jeden einzelnen Kunden in Echtzeit.',
    keyPoints: [
      'Echtzeit-Personalisierung durch Machine Learning',
      'Dynamische Content-Anpassung',
      'Predictive Customer Journey Mapping',
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
    urgency: 'SOFORT',
  },
  {
    title: 'Privacy-First Marketing',
    description:
      'Mit dem Ende der Third-Party Cookies steht datenschutzfreundliches Marketing im Vordergrund. Zero-Party Data und Consent-Management werden entscheidend.',
    keyPoints: [
      'Zero-Party Data Strategien',
      'Cookieless Tracking Solutions',
      'Transparente Datennutzung',
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
    urgency: 'KRITISCH',
  },
  {
    title: 'Short-Form Video Dominanz',
    description:
      'Kurze, fesselnde Videos dominieren alle Plattformen. TikTok, Instagram Reels und YouTube Shorts werden zum Hauptkanal für Markeninteraktion.',
    keyPoints: [
      'Vertikal-optimierte Inhalte',
      'Interactive Video Features',
      'Creator Economy Integration',
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
    urgency: 'MITTEL',
  },
  {
    title: 'Conversational AI Marketing',
    description:
      'Chatbots und Sprachassistenten werden zu intelligenten Marketing-Partnern. Natürliche Gespräche ersetzen traditionelle Werbeformen.',
    keyPoints: [
      'Advanced Chatbot Integration',
      'Voice Search Optimization',
      'Conversational Commerce',
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
    urgency: 'HOCH',
  },
  {
    title: 'Mobile-First Commerce',
    description:
      'Smartphones werden zur primären Einkaufsplattform. Social Commerce und In-App Purchases revolutionieren den Verkaufsprozess.',
    keyPoints: [
      'Progressive Web Apps (PWA)',
      'Social Commerce Integration',
      'One-Click Mobile Checkout',
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
    urgency: 'MITTEL',
  },
  {
    title: 'Community-Driven Marketing',
    description:
      'Starke Online-Communities werden zur wertvollsten Marketing-Ressource. Authentische Beziehungen ersetzen traditionelle Werbung.',
    keyPoints: [
      'Community Building Strategies',
      'User-Generated Content Campaigns',
      'Brand Ambassador Programs',
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
    urgency: 'NIEDRIG',
  },
  {
    title: 'Omnichannel Erlebnisse',
    description:
      'Nahtlose Kundenreisen über alle Kanäle hinweg. Online und Offline verschmelzen zu einer einheitlichen Markenerfahrung.',
    keyPoints: [
      'Unified Customer Profiles',
      'Cross-Channel Attribution',
      'Seamless Experience Design',
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
    urgency: 'HOCH',
  },
  {
    title: 'Datengesteuerte Kreativität',
    description:
      'Analytics und Kreativität verschmelzen. Datenbasierte Insights steuern kreative Entscheidungen für maximale Wirkung.',
    keyPoints: [
      'Creative Performance Analytics',
      'Dynamic Creative Optimization',
      'Real-time A/B Testing',
    ],
    filename: 'data_creativity.algo',
    category: 'CREATIVE_ANALYTICS',
    priority: 'MITTEL',
    priorityColor: 'text-accent-cyan',
    impactLevel: 'MITTEL',
    impactColor: 'text-accent-orange',
    codeSnippet: 'creativity.optimize()',
    icon: 'chart',
    iconBg: 'bg-gradient-to-r from-purple-500 to-pink-500',
    timeframe: 'Q3-Q4 2025',
    urgency: 'MITTEL',
  },
]
</script>
