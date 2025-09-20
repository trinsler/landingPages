<template>
  <div class="space-y-16 max-w-6xl mx-auto">
    <CaseStudyCard
      v-for="caseStudy in caseStudies"
      :key="caseStudy.caseId"
      :case-study="caseStudy"
    />

    <!-- Future Cases Preview -->
    <div class="text-center">
      <TerminalWindow title="~/pipeline/future-cases.log">
        <div class="text-accent-neon text-sm mb-6">
          <span class="text-accent-cyan">Status:</span> 3 neue Partnerschaften in der Pipeline
        </div>

        <h3 class="text-2xl font-bold text-white mb-4">
          <span class="text-accent-neon">Kommende</span>
          <span class="gradient-text-neon">Erfolgsgeschichten</span>
        </h3>

        <p class="text-white/80 mb-6 max-w-2xl mx-auto">
          3 weitere Partnerschaften laufen gerade an. Results kommen in Q2 2025.
        </p>

        <div class="flex justify-center gap-6">
          <div class="text-center">
            <div class="text-xl font-bold text-accent-cyan mb-1">3</div>
            <div class="text-sm text-white/70">Neue Partnerschaften</div>
          </div>
          <div class="text-center">
            <div class="text-xl font-bold text-accent-purple mb-1">Q2 2025</div>
            <div class="text-sm text-white/70">Erste Ergebnisse</div>
          </div>
        </div>
      </TerminalWindow>
    </div>
  </div>
</template>

<script setup lang="ts">
import CaseStudyCard from './CaseStudyCard.vue'

import { TerminalWindow } from './index'

interface CaseStudyMetric {
  value: string
  label: string
  change: string
  valueClass?: string
}

interface CaseStudyTag {
  text: string
  class: string
}

interface LegacyCaseStudy {
  caseId: string
  titleColor: string
  status: string
  duration: string
  company: string
  description: string
  tags: CaseStudyTag[]
  challenge: string
  primaryMetrics: CaseStudyMetric[]
  secondaryMetrics: CaseStudyMetric[]
  solutions: string[]
  summary: string
}

interface Props {
  caseStudies: LegacyCaseStudy[]
}

defineProps<Props>()
</script>
