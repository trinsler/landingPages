<template>
  <component
    :is="tag"
    :class="[
      'mx-auto transition-all duration-300',
      maxWidthClass,
      paddingClass,
      centerClass
    ]"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  // HTML element
  tag?: 'div' | 'section' | 'main' | 'article' | 'aside' | 'header' | 'footer'

  // Max width
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | 'full' | 'screen'

  // Padding
  padding?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  paddingX?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  paddingY?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

  // Responsive padding
  responsive?: boolean

  // Center content
  center?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  tag: 'div',
  maxWidth: '7xl',
  padding: 'md',
  responsive: true,
  center: false
})

// Max width classes
const maxWidthClass = computed(() => {
  const classes = {
    xs: 'max-w-xs',
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl',
    '6xl': 'max-w-6xl',
    '7xl': 'max-w-7xl',
    full: 'max-w-full',
    screen: 'max-w-(--breakpoint-xl)'
  }
  return classes[props.maxWidth]
})

// Padding classes
const paddingClass = computed(() => {
  const classes = []

  // Base padding classes
  const padClasses = {
    none: '',
    xs: '2',
    sm: '4',
    md: '6',
    lg: '8',
    xl: '12',
    '2xl': '16'
  }

  // Specific X and Y padding override general padding
  if (props.paddingX || props.paddingY) {
    if (props.paddingX && props.paddingX !== 'none') {
      const xClass = props.responsive
        ? `px-${padClasses[props.paddingX]} md:px-${padClasses[props.paddingX === 'xs' ? 'sm' : props.paddingX]}`
        : `px-${padClasses[props.paddingX]}`
      classes.push(xClass)
    }

    if (props.paddingY && props.paddingY !== 'none') {
      const yClass = props.responsive
        ? `py-${padClasses[props.paddingY]} md:py-${padClasses[props.paddingY === 'xs' ? 'sm' : props.paddingY]}`
        : `py-${padClasses[props.paddingY]}`
      classes.push(yClass)
    }
  } else if (props.padding !== 'none') {
    // General padding
    const baseClass = `p-${padClasses[props.padding]}`

    if (props.responsive) {
      // Responsive padding: smaller on mobile, larger on desktop
      const responsivePadding = {
        xs: 'p-2 md:p-3',
        sm: 'p-3 md:p-4',
        md: 'p-4 md:p-6',
        lg: 'p-6 md:p-8',
        xl: 'p-8 md:p-12',
        '2xl': 'p-12 md:p-16'
      }
      classes.push(responsivePadding[props.padding] || baseClass)
    } else {
      classes.push(baseClass)
    }
  }

  return classes.join(' ')
})

// Center content
const centerClass = computed(() => {
  return props.center ? 'text-center flex flex-col items-center' : ''
})
</script>

<style scoped>
/* Container should be responsive by default */
@media (max-width: 640px) {
  /* Ensure padding doesn't cause horizontal overflow on small screens */
  .container-responsive {
    padding-left: max(1rem, env(safe-area-inset-left));
    padding-right: max(1rem, env(safe-area-inset-right));
  }
}
</style>