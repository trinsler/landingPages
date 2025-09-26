<template>
  <p :class="cn('text-sm text-muted-foreground', props.class)" v-bind="$attrs">
    <slot />
  </p>
</template>

<script setup lang="ts">
import { cn } from '~/lib/utils'

interface CardDescriptionProps {
  class?: string
}

const props = withDefaults(defineProps<CardDescriptionProps>(), {})
</script>