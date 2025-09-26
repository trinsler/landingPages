<template>
  <div
    :class="cn(
      'shrink-0 bg-border',
      orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
      props.class
    )"
    v-bind="$attrs"
  />
</template>

<script setup lang="ts">
import { cn } from '~/lib/utils'

interface SeparatorProps {
  orientation?: 'horizontal' | 'vertical'
  class?: string
}

const props = withDefaults(defineProps<SeparatorProps>(), {
  orientation: 'horizontal'
})
</script>