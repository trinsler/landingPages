<template>
  <div class="min-h-screen matrix-bg relative overflow-hidden">
    <!-- Background Effects -->
    <DataStreamBackground theme="matrix" />
    <FloatingCodeElements theme="matrix" />

    <div class="relative container-custom py-20">
      <!-- Intelligence Terminal Header -->
      <TerminalWindow title="~/intelligence/growth-matrix.sh" class="mb-20">
        <!-- System Boot -->
        <div class="mb-8">
          <div class="code-font text-accent-neon text-sm mb-4 animate-slide-up-stagger">
            <span class="text-accent-cyan">intelligence@trinsler:~$</span> decrypt --growth-insights
            --classified
          </div>
          <div class="neon-card rounded-xl px-6 py-3 inline-block animate-neon-flicker">
            <span class="code-font text-accent-neon">[INTELLIGENCE_MATRIX_ACTIVE]</span>
            <span class="text-white ml-2">GROWTH_INTEL.EXE</span>
          </div>
        </div>

        <!-- ASCII Header -->
        <div class="mb-12 text-center">
          <h1 class="text-4xl sm:text-6xl lg:text-7xl font-black text-white mb-6 animate-glitch">
            <span class="code-font text-accent-neon">></span> GROWTH
            <br />
            <span class="gradient-text-neon">INTELLIGENCE</span>
            <br />
            <span class="text-accent-cyan code-font">_CLASSIFIED</span>
          </h1>
        </div>

        <!-- Intelligence Brief -->
        <CyberCard>
          <div class="code-font text-accent-purple text-sm mb-3">/* CLASSIFIED_INTEL.md */</div>
          <p class="text-xl text-white/90 leading-relaxed">
            <span class="text-accent-cyan">ZUGANG_GEWÄHRT:</span> Exklusive Growth-Strategien und
            <span class="font-bold text-glow-green">Startup-Intelligence</span> aus unseren
            erfolgreichen Equity-Partnerships.
            <span class="text-accent-neon">Classified information</span> für Elite-Founder.
          </p>
          <div class="code-font text-accent-orange text-sm mt-4">
            if (founder.readyLevel > 9000) { insights.unlock(); }
          </div>
        </CyberCard>
      </TerminalWindow>

      <!-- Intelligence Articles Grid -->
      <div class="grid lg:grid-cols-3 gap-8 mb-16">
        <IntelligenceArticle
          v-for="(article, index) in articles"
          :key="article.title"
          :article="article"
          :index="index"
        />
      </div>

      <!-- Newsletter Intelligence Terminal -->
      <TerminalWindow title="~/subscribe/intelligence-feed.sh">
        <!-- Subscribe Content -->
        <div class="text-center">
          <div class="code-font text-accent-neon text-sm mb-6">
            <span class="text-accent-cyan">intelligence@trinsler:~$</span> subscribe --growth-intel
            --exclusive
          </div>

          <NewsletterSubscription />
        </div>
      </TerminalWindow>
    </div>
  </div>
</template>

<script setup>
import { TerminalWindow, CyberCard, DataStreamBackground, FloatingCodeElements } from '@monorepo/ui'

// Child Components (to be created)
import IntelligenceArticle from '~/components/IntelligenceArticle.vue'
import NewsletterSubscription from '~/components/NewsletterSubscription.vue'

useHead({
  title: 'GROWTH INTELLIGENCE CLASSIFIED - Trinsler Matrix',
})

const articles = [
  {
    title: 'Equity-for-Growth Algorithmus',
    preview:
      'Der geheime Algorithmus hinter unserem Equity-for-Growth Modell. Wie wir Startups mit mathematischer Präzision skalieren.',
    insights: [
      'Equity-Berechnung nach Wachstumspotential',
      'ROI-Optimierung durch intelligente Ressourcenallokation',
      'Predictive Growth Analytics',
    ],
    filename: 'equity_algorithm.md',
    category: 'GROWTH_HACKING',
    classification: 'COSMIC',
    securityLevel: 'ULTRA',
    icon: 'rocket',
    readTime: '8 MIN',
    accessLevel: 'FOUNDER+',
  },
  // ... andere Artikel
]
</script>
