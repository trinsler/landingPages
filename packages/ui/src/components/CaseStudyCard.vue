<template>
  <div class="group animate-slide-up-stagger">
    <CyberCard rounded="2xl" class="overflow-hidden">
      <!-- Case Header -->
      <div class="bg-surface-1 px-6 py-4 border-b border-accent-neon/30">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-3 h-3 rounded-full bg-accent-neon"></div>
            <div :class="caseStudy.titleColor">{{ caseStudy.caseId }}</div>
          </div>
          <div class="flex items-center gap-2">
            <div class="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs">{{ caseStudy.status }}</div>
            <div class="px-3 py-1 rounded-full bg-accent-neon/20 text-accent-neon text-xs">{{ caseStudy.duration }}</div>
          </div>
        </div>
      </div>

      <div class="p-8 lg:p-10">
        <div class="grid lg:grid-cols-2 gap-8">
          <!-- Company Info -->
          <div>
            <div class="neon-card rounded-xl p-6 mb-6">
              <div class="text-accent-cyan text-sm mb-3">Unternehmensprofil:</div>
              <h3 class="text-2xl font-bold text-white mb-3">{{ caseStudy.company }}</h3>
              <p class="text-white/80 mb-4">{{ caseStudy.description }}</p>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tag in caseStudy.tags"
                  :key="tag.text"
                  :class="['px-3 py-1 rounded-full text-xs', tag.class]"
                >
                  {{ tag.text }}
                </span>
              </div>
            </div>

            <!-- Challenge -->
            <div class="cyber-card rounded-xl p-6">
              <div class="text-accent-purple text-sm mb-3">Herausforderung:</div>
              <p class="text-white/90 leading-relaxed">
                <strong>Problem:</strong> {{ caseStudy.challenge }}
              </p>
            </div>
          </div>

          <!-- Results -->
          <div>
            <!-- Metrics Dashboard -->
            <div class="glass-card rounded-xl p-6 mb-6">
              <div class="text-accent-neon text-sm mb-4">Ergebnisse:</div>

              <div class="grid grid-cols-2 gap-4 mb-6">
                <div
                  v-for="metric in caseStudy.primaryMetrics"
                  :key="metric.label"
                  class="text-center"
                >
                  <div :class="['text-3xl font-bold mb-1', metric.valueClass]">{{ metric.value }}</div>
                  <div class="text-sm text-accent-cyan">{{ metric.label }}</div>
                  <div class="text-xs text-accent-neon">{{ metric.change }}</div>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div
                  v-for="metric in caseStudy.secondaryMetrics"
                  :key="metric.label"
                  class="text-center"
                >
                  <div class="text-2xl font-bold text-white mb-1">{{ metric.value }}</div>
                  <div class="text-sm text-accent-orange">{{ metric.label }}</div>
                  <div class="text-xs text-accent-cyan">{{ metric.change }}</div>
                </div>
              </div>
            </div>

            <!-- What We Did -->
            <div class="neon-card rounded-xl p-6">
              <div class="text-accent-orange text-sm mb-3">Unsere Lösung:</div>
              <ul class="space-y-2 text-white/90 text-sm">
                <li
                  v-for="solution in caseStudy.solutions"
                  :key="solution"
                  class="flex items-start gap-2"
                >
                  <span class="text-accent-neon mt-0.5 flex-shrink-0">✓</span>
                  <span>{{ solution }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Results Summary -->
        <div class="mt-8 pt-6 border-t border-accent-neon/20">
          <div class="text-center">
            <div class="text-accent-purple text-sm mb-2">Zusammenfassung</div>
            <p class="text-white/80 max-w-2xl mx-auto">{{ caseStudy.summary }}</p>
          </div>
        </div>
      </div>
    </CyberCard>
  </div>
</template>

<script setup lang="ts">
import { CyberCard } from './index'

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
  caseStudy: LegacyCaseStudy
}

defineProps<Props>()
</script>