<template>
  <div
    :class="[
      'grid transition-all duration-300',
      gridClass,
      gapClass,
      alignClass
    ]"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  // Grid Configuration
  cols?: 1 | 2 | 3 | 4 | 5 | 6 | 12 | 'auto' | 'none'
  colsMd?: 1 | 2 | 3 | 4 | 5 | 6 | 12 | 'auto'
  colsLg?: 1 | 2 | 3 | 4 | 5 | 6 | 12 | 'auto'
  colsXl?: 1 | 2 | 3 | 4 | 5 | 6 | 12 | 'auto'

  // Responsive Grid (common patterns)
  responsive?: 'cards' | 'features' | 'gallery' | 'articles' | 'auto'

  // Gap
  gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

  // Alignment
  align?: 'start' | 'center' | 'end' | 'stretch'
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
}

const props = withDefaults(defineProps<Props>(), {
  cols: 1,
  gap: 'md',
  align: 'stretch'
})

// Grid column classes
const gridClass = computed(() => {
  if (props.responsive) {
    const responsiveClasses = {
      cards: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
      features: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
      gallery: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5',
      articles: 'grid-cols-1 lg:grid-cols-2',
      auto: 'grid-cols-[repeat(auto-fit,minmax(250px,1fr))]'
    }
    return responsiveClasses[props.responsive]
  }

  const baseClass = props.cols === 'none' ? '' : props.cols === 'auto' ? 'grid-cols-[repeat(auto-fit,minmax(250px,1fr))]' : `grid-cols-${props.cols}`

  const classes = [baseClass]

  if (props.colsMd) {
    classes.push(props.colsMd === 'auto' ? 'md:grid-cols-[repeat(auto-fit,minmax(250px,1fr))]' : `md:grid-cols-${props.colsMd}`)
  }

  if (props.colsLg) {
    classes.push(props.colsLg === 'auto' ? 'lg:grid-cols-[repeat(auto-fit,minmax(250px,1fr))]' : `lg:grid-cols-${props.colsLg}`)
  }

  if (props.colsXl) {
    classes.push(props.colsXl === 'auto' ? 'xl:grid-cols-[repeat(auto-fit,minmax(250px,1fr))]' : `xl:grid-cols-${props.colsXl}`)
  }

  return classes.join(' ')
})

// Gap classes
const gapClass = computed(() => {
  const classes = {
    none: 'gap-0',
    xs: 'gap-2',
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
    xl: 'gap-10',
    '2xl': 'gap-12'
  }
  return classes[props.gap]
})

// Alignment classes
const alignClass = computed(() => {
  const classes = []

  if (props.align) {
    const alignClasses = {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch'
    }
    classes.push(alignClasses[props.align])
  }

  if (props.justify) {
    const justifyClasses = {
      start: 'justify-items-start',
      center: 'justify-items-center',
      end: 'justify-items-end',
      between: 'justify-between',
      around: 'justify-around',
      evenly: 'justify-evenly'
    }
    classes.push(justifyClasses[props.justify])
  }

  return classes.join(' ')
})
</script>