<template>
  <div class="absolute inset-0">
    <!-- Cyber Grid -->
    <div class="absolute inset-0 cyber-grid" :class="gridOpacity" />

    <!-- Data Streams -->
    <div class="absolute inset-0">
      <div
        v-for="(stream, index) in streams"
        :key="index"
        :class="[
          'animate-data-stream absolute w-1 bg-gradient-to-b from-transparent to-transparent',
          stream.height,
          stream.position,
          stream.color,
        ]"
        :style="`animation-delay: ${stream.delay}s;`"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  streamCount?: number
  gridOpacity?: string
}

const props = withDefaults(defineProps<Props>(), {
  streamCount: 6,
  gridOpacity: 'opacity-40',
})

// Generate random data streams
const streams = computed(() => {
  const colors = [
    'via-accent-neon',
    'via-accent-cyan',
    'via-accent-purple',
    'via-accent-orange',
    'via-accent-pink',
  ]

  const heights = ['h-32', 'h-40', 'h-48', 'h-56', 'h-64']
  const positions = [
    'left-8',
    'left-16',
    'left-24',
    'left-32',
    'right-32',
    'right-24',
    'right-16',
    'right-8',
  ]

  return Array.from({ length: props.streamCount }, (_, i) => ({
    height: heights[Math.floor(Math.random() * heights.length)],
    position: positions[i % positions.length],
    color: colors[Math.floor(Math.random() * colors.length)],
    delay: i * 0.5,
  }))
})
</script>
