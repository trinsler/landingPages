<template>
  <div :class="['min-h-screen relative overflow-hidden', backgroundClass]">
    <!-- Background Effects -->
    <DataStreamBackground
      v-if="background?.theme"
      :stream-count="streamCount"
      :grid-opacity="gridOpacity"
    />
    <FloatingCodeElements
      v-if="background?.theme"
      :theme="background.theme"
    />

    <!-- Page Content -->
    <div class="relative container-custom py-20">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { BackgroundTheme, BackgroundThemeName } from '@monorepo/shared'
import { DataStreamBackground, FloatingCodeElements } from './index'

interface Props {
  background?: BackgroundTheme
  container?: 'narrow' | 'normal' | 'wide' | 'full'
}

const props = withDefaults(defineProps<Props>(), {
  container: 'normal'
})

const backgroundClass = computed(() => {
  const themes: Record<BackgroundThemeName, string> = {
    tech: 'tech-bg',
    growth: 'growth-bg',
    matrix: 'matrix-bg',
    cyber: 'cyber-bg'
  }

  return props.background?.theme ? themes[props.background.theme] : 'matrix-bg'
})

const streamCount = computed(() => {
  const intensity = props.background?.intensity || 'medium'
  const counts: Record<string, number> = {
    low: 4,
    medium: 6,
    high: 8
  }
  return counts[intensity]
})

const gridOpacity = computed(() => {
  const intensity = props.background?.intensity || 'medium'
  const opacities: Record<string, string> = {
    low: 'opacity-20',
    medium: 'opacity-40',
    high: 'opacity-60'
  }
  return opacities[intensity]
})
</script>