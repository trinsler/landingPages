<template>
  <div>
    <!-- ASCII Banner -->
    <div class="code-font text-accent-neon text-xs mb-8">
      <pre class="text-center animate-slide-up-stagger">
╔═══════════════════════════════════════════════╗
║        INTELLIGENCE FEED                      ║
║          SUBSCRIPTION                         ║
║           ACTIVATED                           ║
╚═══════════════════════════════════════════════╝
      </pre>
    </div>

    <!-- Intelligence Offer -->
    <div class="mb-8">
      <h3 class="text-3xl lg:text-4xl font-bold text-white mb-6 animate-glitch">
        <span class="code-font text-accent-neon">></span> EXKLUSIVE
        <span class="gradient-text-neon">GROWTH_INTEL</span>
      </h3>

      <Card class="max-w-3xl mx-auto mb-8 border border-accent-neon/20 bg-card/95 backdrop-blur-sm">
        <CardContent>
          <div class="code-font text-accent-purple text-sm mb-3">/* INTEL_FEED_DESCRIPTION */</div>
          <p class="text-lg text-white/90 leading-relaxed mb-4">
            <span class="text-accent-cyan">CLASSIFIED:</span> Wöchentliche Growth-Insights und
            <span class="font-bold text-glow-green">Startup-Intelligence</span> direkt aus unseren
            erfolgreichen Equity-Partnerships.
          </p>
          <div class="code-font text-accent-orange text-sm">
            if (founder.subscribe()) { intelligence.level++; }
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Subscribe Form -->
    <Card class="max-w-md mx-auto mb-8 border border-accent-neon/20 bg-card/95 backdrop-blur-sm">
      <CardContent class="p-6">
        <div class="code-font text-accent-cyan text-sm mb-4">SUBSCRIBE_PROTOCOL.init()</div>
        <form class="space-y-4" @submit.prevent="subscribeIntel">
          <div class="relative">
            <input
              v-model="emailIntel"
              type="email"
              required
              placeholder="founder@startup.com"
              class="w-full bg-surface-2 border border-accent-neon/30 rounded-xl px-4 py-3 text-white code-font focus:border-accent-neon focus:ring-2 focus:ring-accent-neon/20 transition-all"
            />
          </div>
          <button
            type="submit"
            class="btn-primary w-full code-font animate-glow-pulse hover:scale-105 transition-all duration-300"
          >
            > SUBSCRIBE_TO_INTEL()
          </button>
        </form>
      </CardContent>
    </Card>

    <!-- Intelligence Stats -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 code-font text-sm">
      <div class="text-center">
        <div class="text-accent-cyan mb-1">INTEL_SUBSCRIBERS:</div>
        <div class="text-accent-neon">● 1,247</div>
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
</template>

<script setup>
import { Card, CardContent } from '~/components/ui' 

const emailIntel = ref('')

const subscribeIntel = () => {
  console.warn('> INTEL_SUBSCRIPTION_ACTIVATED:', emailIntel.value)
  emailIntel.value = ''
  // Add subscription logic here
}
</script>
