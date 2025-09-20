<template>
  <div class="group relative" :style="`animation-delay: ${index * 0.2}s`">
    <!-- Trend Terminal -->
    <div
      class="cyber-card rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02]"
    >
      <!-- Terminal Header -->
      <div class="bg-surface-1 px-4 py-3 border-b border-accent-neon/30">
        <div class="flex items-center gap-2">
          <div class="w-2 h-2 rounded-full bg-accent-neon" />
          <div class="code-font text-accent-cyan text-xs">{{ trend.filename }}</div>
          <div class="ml-auto text-xs" :class="trend.priorityColor">{{ trend.priority }}</div>
        </div>
      </div>

      <!-- Trend Visual -->
      <div class="relative h-48 bg-gradient-to-br from-surface-2 to-surface-1 overflow-hidden">
        <!-- Matrix Background -->
        <div class="absolute inset-0 cyber-grid opacity-20" />

        <!-- Floating Trend Data -->
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="text-center">
            <div
              :class="trend.iconBg"
              class="w-16 h-16 rounded-xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform"
            >
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <div class="code-font text-accent-cyan text-xs">{{ trend.category }}</div>
          </div>
        </div>

        <!-- Code Fragments -->
        <div class="absolute top-4 left-4 code-font text-xs text-accent-neon opacity-60">
          {{ trend.codeSnippet }}
        </div>

        <!-- Impact Badge -->
        <div
          class="absolute top-4 right-4 neon-card px-2 py-1 text-xs code-font"
          :class="trend.impactColor"
        >
          {{ trend.impactLevel }}
        </div>
      </div>

      <!-- Trend Content -->
      <div class="p-6 code-pattern">
        <!-- Trend Command -->
        <div class="text-accent-neon text-sm mb-3">Trend: {{ trend.filename }}</div>

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
            <div v-for="(point, idx) in trend.keyPoints" :key="point" class="text-white/80 text-xs">
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
</template>

<script setup lang="ts">
interface LegacyTrendItem {
  title: string
  description: string
  keyPoints: string[]
  filename: string
  category: string
  priority: string
  priorityColor: string
  impactLevel: string
  impactColor: string
  codeSnippet: string
  iconBg: string
  timeframe: string
  urgency: string
}

interface Props {
  trend: LegacyTrendItem
  index?: number
}

withDefaults(defineProps<Props>(), {
  index: 0,
})
</script>
