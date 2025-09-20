<template>
  <component
    :is="tag"
    :class="[
      'ui-card transition-all duration-300',
      roundedClass,
      paddingClass,
      hoverClass,
      shadowClass,
      borderClass
    ]"
    :style="customStyles"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTheme, type ThemeName } from '../composables/useTheme'

interface Props {
  // Theme & Variant
  theme?: ThemeName | 'auto'
  variant?: 'default' | 'elevated' | 'outlined' | 'glass' | 'minimal'

  // Layout
  tag?: 'div' | 'article' | 'section' | 'aside'
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'

  // Interactions
  hover?: boolean
  clickable?: boolean

  // Effects
  glow?: boolean
  blur?: boolean

  // Custom styling
  customBg?: string
  customBorder?: string
  customShadow?: string
}

const props = withDefaults(defineProps<Props>(), {
  theme: 'auto',
  variant: 'default',
  tag: 'div',
  rounded: 'lg',
  padding: 'md',
  hover: false,
  clickable: false,
  glow: false,
  blur: false
})

const { currentTheme } = useTheme()

// Use current theme if 'auto', otherwise use specified theme
const theme = computed(() =>
  props.theme === 'auto' ? currentTheme.value : props.theme as ThemeName
)

// Rounded corners
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

// Padding
const paddingClass = computed(() => {
  if (props.padding === 'none') return ''

  const classes = {
    sm: 'p-3',
    md: 'p-4 lg:p-6',
    lg: 'p-6 lg:p-8',
    xl: 'p-8 lg:p-10'
  }
  return classes[props.padding]
})

// Hover effects
const hoverClass = computed(() => {
  if (!props.hover && !props.clickable) return ''

  const baseHover = 'transform transition-transform duration-200'

  if (props.clickable) {
    return `${baseHover} cursor-pointer hover:scale-[1.02] active:scale-[0.98]`
  }

  return `${baseHover} hover:scale-[1.01]`
})

// Shadow effects based on theme and variant
const shadowClass = computed(() => {
  if (props.customShadow) return ''

  const themeGlows = {
    cyber: props.glow ? 'shadow-[0_0_30px_rgba(0,255,159,0.3)]' : 'shadow-lg shadow-green-500/10',
    glass: 'shadow-lg shadow-indigo-500/10',
    minimal: 'shadow-sm',
    dark: props.glow ? 'shadow-[0_0_20px_rgba(251,191,36,0.2)]' : 'shadow-lg shadow-amber-500/10'
  }

  const variantShadows = {
    default: themeGlows[theme.value],
    elevated: 'shadow-xl',
    outlined: 'shadow-none',
    glass: 'shadow-lg',
    minimal: 'shadow-sm'
  }

  return variantShadows[props.variant]
})

// Border styles
const borderClass = computed(() => {
  if (props.customBorder) return ''

  const themeBorders = {
    cyber: 'border border-green-500/20',
    glass: 'border border-white/20',
    minimal: 'border border-gray-200',
    dark: 'border border-amber-500/20'
  }

  const variantBorders = {
    default: themeBorders[theme.value],
    elevated: 'border-0',
    outlined: `border-2 ${themeBorders[theme.value]}`,
    glass: 'border border-white/10',
    minimal: 'border border-gray-100'
  }

  return variantBorders[props.variant]
})

// Custom styles for advanced theming
const customStyles = computed(() => {
  const styles: Record<string, string> = {}

  // Background
  if (props.customBg) {
    styles.background = props.customBg
  } else {
    const themeBackgrounds = {
      cyber: 'linear-gradient(145deg, #111111, #1a1a1a)',
      glass: 'rgba(255, 255, 255, 0.1)',
      minimal: '#ffffff',
      dark: 'linear-gradient(145deg, #1f1f1f, #2a2a2a)'
    }

    const variantBackgrounds = {
      default: themeBackgrounds[theme.value],
      elevated: themeBackgrounds[theme.value],
      outlined: 'transparent',
      glass: 'rgba(255, 255, 255, 0.05)',
      minimal: '#fafafa'
    }

    styles.background = variantBackgrounds[props.variant]
  }

  // Border
  if (props.customBorder) {
    styles.border = props.customBorder
  }

  // Shadow
  if (props.customShadow) {
    styles.boxShadow = props.customShadow
  }

  // Backdrop filter for glass effect
  if (props.blur || props.variant === 'glass') {
    styles.backdropFilter = 'blur(10px)'
  }

  return styles
})
</script>

<style scoped>
/* Additional theme-specific styles can go here if needed */
.ui-card {
  /* Ensure smooth transitions for all properties */
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Glass morphism specific styles */
.ui-card[style*="backdrop-filter"] {
  -webkit-backdrop-filter: blur(10px);
}
</style>