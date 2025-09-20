<template>
  <div
    :class="[
      'ui-terminal overflow-hidden transition-all duration-300',
      roundedClass,
      maxWidthClass,
      glowClass
    ]"
  >
    <!-- Terminal Header -->
    <div class="ui-terminal-header px-6 py-4 flex items-center gap-3">
      <!-- Terminal Buttons -->
      <div class="flex items-center gap-2">
        <div
          :class="[
            'w-3 h-3 rounded-full transition-all',
            theme === 'minimal' ? 'bg-gray-400' : 'bg-red-500'
          ]"
        ></div>
        <div
          :class="[
            'w-3 h-3 rounded-full transition-all',
            theme === 'minimal' ? 'bg-gray-400' : 'bg-yellow-500'
          ]"
        ></div>
        <div
          :class="[
            'w-3 h-3 rounded-full transition-all',
            theme === 'minimal' ? 'bg-gray-400' : themeAccentClass
          ]"
        ></div>
      </div>

      <!-- Terminal Title -->
      <div
        :class="[
          'ml-2 font-mono text-lg transition-colors',
          titleColorClass
        ]"
      >
        {{ displayTitle }}
      </div>

      <!-- Optional Actions Slot -->
      <div v-if="$slots.actions" class="ml-auto">
        <slot name="actions" />
      </div>
    </div>

    <!-- Terminal Content -->
    <div
      :class="[
        'transition-all',
        paddingClass,
        contentBgClass
      ]"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTheme, type ThemeName } from '../composables/useTheme'

interface Props {
  title?: string
  theme?: ThemeName | 'auto'
  size?: 'sm' | 'md' | 'lg' | 'full'
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
  glow?: boolean
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl' | '6xl' | 'full' | 'none'
}

const props = withDefaults(defineProps<Props>(), {
  title: '~/terminal.sh',
  theme: 'auto',
  size: 'md',
  rounded: '2xl',
  glow: false,
  maxWidth: '6xl'
})

const { currentTheme } = useTheme()

// Use current theme if 'auto', otherwise use specified theme
const theme = computed(() =>
  props.theme === 'auto' ? currentTheme.value : props.theme as ThemeName
)

// Dynamic classes based on theme and props
const titleColorClass = computed(() => {
  const classes = {
    cyber: 'ui-text-accent',
    glass: 'ui-text-accent',
    minimal: 'ui-text-primary',
    dark: 'ui-text-accent'
  }
  return classes[theme.value]
})

const themeAccentClass = computed(() => {
  const classes = {
    cyber: 'bg-green-400',
    glass: 'bg-indigo-500',
    minimal: 'bg-gray-600',
    dark: 'bg-amber-400'
  }
  return classes[theme.value]
})

const roundedClass = computed(() => {
  const classes = {
    none: '',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    '3xl': 'rounded-3xl'
  }
  return classes[props.rounded]
})

const paddingClass = computed(() => {
  const classes = {
    sm: 'p-4 lg:p-6',
    md: 'p-6 lg:p-8',
    lg: 'p-8 lg:p-12',
    full: 'p-6 lg:p-8'
  }
  return classes[props.size]
})

const maxWidthClass = computed(() => {
  if (props.maxWidth === 'none') return ''

  const classes = {
    sm: 'max-w-sm mx-auto',
    md: 'max-w-md mx-auto',
    lg: 'max-w-lg mx-auto',
    xl: 'max-w-xl mx-auto',
    '2xl': 'max-w-2xl mx-auto',
    '4xl': 'max-w-4xl mx-auto',
    '6xl': 'max-w-6xl mx-auto',
    full: 'w-full'
  }
  return classes[props.maxWidth]
})

const glowClass = computed(() => {
  if (!props.glow) return ''

  const classes = {
    cyber: 'animate-pulse shadow-[0_0_30px_rgba(0,255,159,0.3)]',
    glass: 'shadow-lg',
    minimal: '',
    dark: 'shadow-[0_0_20px_rgba(251,191,36,0.2)]'
  }
  return classes[theme.value]
})

const contentBgClass = computed(() => {
  const classes = {
    cyber: 'bg-gradient-to-br from-gray-900/50 to-gray-800/50',
    glass: 'bg-white/5 backdrop-blur-sm',
    minimal: 'bg-gray-50',
    dark: 'bg-gray-800/50'
  }
  return classes[theme.value]
})

// Display title with theme-specific prefix
const displayTitle = computed(() => {
  const prefixes = {
    cyber: '~/cyber/',
    glass: '🏠 ',
    minimal: '',
    dark: '$ '
  }

  const prefix = prefixes[theme.value]
  return `${prefix}${props.title}`
})
</script>