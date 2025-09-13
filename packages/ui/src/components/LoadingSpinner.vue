<template>
  <div
    v-if="show"
    class="flex items-center justify-center"
    :class="containerClass"
  >
    <div
      class="animate-spin rounded-full border-2 border-current border-t-transparent"
      :class="spinnerClass"
    ></div>
    
    <span v-if="text" class="ml-3 text-sm text-gray-600">
      {{ text }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  color?: 'gray' | 'indigo' | 'green' | 'red' | 'yellow'
  text?: string
  show?: boolean
  fullscreen?: boolean
  overlay?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  color: 'indigo',
  show: true,
  fullscreen: false,
  overlay: false
})

const spinnerClass = computed(() => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16'
  }
  
  const colorClasses = {
    gray: 'text-gray-600',
    indigo: 'text-indigo-600',
    green: 'text-green-600',
    red: 'text-red-600',
    yellow: 'text-yellow-600'
  }
  
  return [
    sizeClasses[props.size],
    colorClasses[props.color]
  ].join(' ')
})

const containerClass = computed(() => {
  const baseClasses = []
  
  if (props.fullscreen) {
    baseClasses.push('fixed inset-0 z-50')
    if (props.overlay) {
      baseClasses.push('bg-white bg-opacity-75')
    }
  }
  
  return baseClasses.join(' ')
})
</script>