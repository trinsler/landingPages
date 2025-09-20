<template>
  <!-- Backward compatibility wrapper for CyberCard -->
  <BaseCard
    theme="cyber"
    variant="default"
    :rounded="rounded"
    :padding="paddingSize"
    :hover="hover"
    :glow="glow"
  >
    <slot />
  </BaseCard>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import BaseCard from './BaseCard.vue'

interface Props {
  hover?: boolean
  glow?: boolean
  size?: 'sm' | 'md' | 'lg'
  rounded?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
}

const props = withDefaults(defineProps<Props>(), {
  hover: false,
  glow: false,
  size: 'md',
  rounded: '2xl',
})

// Convert size prop to padding for BaseCard
const paddingSize = computed(() => {
  const mapping = {
    sm: 'sm' as const,
    md: 'md' as const,
    lg: 'lg' as const,
  }
  return mapping[props.size]
})
</script>
