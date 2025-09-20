<template>
  <div class="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
    <TrendCard
      v-for="(trend, index) in trends"
      :key="trend.title"
      :trend="trend"
      :index="index"
    />
  </div>
</template>

<script setup lang="ts">
import TrendCard from './TrendCard.vue'

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
  trends: LegacyTrendItem[]
}

defineProps<Props>()
</script>