<template>
  <div class="absolute inset-0 data-points">
    <div
      v-for="(element, index) in elements"
      :key="index"
      :class="[
        'floating-element absolute code-font text-xs opacity-70',
        element.position,
        element.color
      ]"
      :style="`animation-delay: ${element.delay}s;`"
    >
      {{ element.text }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface FloatingElement {
  text: string
  position: string
  color: string
  delay: number
}

interface Props {
  elements?: FloatingElement[]
  theme?: 'tech' | 'growth' | 'matrix' | 'cyber'
}

const props = withDefaults(defineProps<Props>(), {
  theme: 'tech'
})

const defaultElements = computed(() => {
  const themes = {
    tech: [
      'console.log("success")',
      'system.optimize()',
      'ai.enhance()',
      'data.process()',
      '[SYSTEM_READY]',
      'performance++'
    ],
    growth: [
      'growth.scale(5x)',
      'equity.invest()',
      'startup++',
      'revenue.optimize()',
      '[SUCCESS]',
      'portfolio.value++'
    ],
    matrix: [
      'insights.decrypt()',
      'knowledge.matrix()',
      'growth.algorithms',
      'startup.evolution()',
      '[INTEL_CLASSIFIED]',
      'equity.insights++'
    ],
    cyber: [
      'cyber.defense()',
      'security.breach()',
      'hack.protocol()',
      'firewall.activate()',
      '[CYBER_ALERT]',
      'threat.detected()'
    ]
  }

  const positions = [
    'top-24 left-28',
    'top-36 right-36',
    'bottom-44 left-1/4',
    'top-3/4 right-1/4',
    'top-1/3 left-3/4',
    'top-1/2 left-1/6'
  ]

  const colors = [
    'text-accent-neon',
    'text-accent-cyan',
    'text-accent-purple',
    'text-accent-orange',
    'text-accent-pink',
    'text-accent-neon'
  ]

  return themes[props.theme].map((text, index) => ({
    text,
    position: positions[index % positions.length],
    color: colors[index % colors.length],
    delay: index
  }))
})

const elements = computed(() => props.elements || defaultElements.value)
</script>