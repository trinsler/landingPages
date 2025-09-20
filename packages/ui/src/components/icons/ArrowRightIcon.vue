<template>
  <svg
    :class="['transition-transform', size, animationClass]"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  size?: 'sm' | 'md' | 'lg'
  animated?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  animated: false
})

const size = computed(() => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  }
  return sizes[props.size]
})

const animationClass = computed(() => {
  return props.animated ? 'group-hover:translate-x-1' : ''
})
</script>