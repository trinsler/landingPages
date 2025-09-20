<template>
  <div :class="['neon-card px-2 py-1 text-xs code-font flex items-center gap-1', difficultyClass]">
    <div :class="['w-2 h-2 rounded-full', dotClass]" />
    {{ label }}
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  level: 'beginner' | 'intermediate' | 'advanced'
}

const props = defineProps<Props>()

const difficultyClass = computed(() => {
  const styles = {
    beginner: 'text-accent-neon',
    intermediate: 'text-accent-orange',
    advanced: 'text-accent-pink',
  }
  return styles[props.level]
})

const dotClass = computed(() => {
  const styles = {
    beginner: 'bg-accent-neon',
    intermediate: 'bg-accent-orange',
    advanced: 'bg-accent-pink',
  }
  return styles[props.level]
})

const label = computed(() => {
  const labels = {
    beginner: 'BASIC',
    intermediate: 'PRO',
    advanced: 'EXPERT',
  }
  return labels[props.level]
})
</script>
