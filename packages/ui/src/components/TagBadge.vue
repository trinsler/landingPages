<template>
  <span
    :class="[
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
      'transition-colors duration-200',
      variantClass
    ]"
  >
    {{ tag }}
  </span>
</template>

<script setup lang="ts">
interface Props {
  tag: string
  variant?: 'default' | 'accent' | 'muted'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default'
})

const variantClass = computed(() => {
  const variants = {
    default: 'ui-bg-secondary ui-text-secondary border border-ui-border',
    accent: 'ui-bg-accent/10 ui-text-accent border border-ui-accent/20',
    muted: 'ui-bg-muted ui-text-muted border border-ui-border'
  }
  return variants[props.variant]
})
</script>