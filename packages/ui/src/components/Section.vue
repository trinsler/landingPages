<template>
  <component
    :is="tag"
    :id="id"
    :class="[
      'transition-all duration-300',
      spacingClass,
      backgroundClass,
      textAlignClass
    ]"
    :style="customStyles"
  >
    <!-- Background Effects Slot -->
    <div v-if="$slots.background" class="absolute inset-0 overflow-hidden pointer-events-none">
      <slot name="background" />
    </div>

    <!-- Section Content -->
    <div class="relative z-10">
      <!-- Header Area -->
      <div v-if="$slots.header || title || subtitle" :class="headerClass">
        <slot name="header">
          <Container v-if="title || subtitle" :max-width="containerWidth" center>
            <div class="space-y-4">
              <h2 v-if="title" :class="titleClass">
                {{ title }}
              </h2>
              <p v-if="subtitle" :class="subtitleClass">
                {{ subtitle }}
              </p>
            </div>
          </Container>
        </slot>
      </div>

      <!-- Main Content -->
      <div :class="contentClass">
        <Container v-if="containerized" :max-width="containerWidth">
          <slot />
        </Container>
        <slot v-else />
      </div>

      <!-- Footer Area -->
      <div v-if="$slots.footer" :class="footerClass">
        <Container v-if="containerized" :max-width="containerWidth">
          <slot name="footer" />
        </Container>
        <slot v-else name="footer" />
      </div>
    </div>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTheme, type ThemeName } from '../composables/useTheme'
import Container from './Container.vue'

interface Props {
  // Content
  title?: string
  subtitle?: string
  id?: string

  // Layout
  tag?: 'section' | 'div' | 'main' | 'article' | 'aside' | 'header' | 'footer'
  containerized?: boolean
  containerWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl'

  // Spacing
  paddingY?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
  paddingX?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  marginY?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'

  // Styling
  theme?: ThemeName | 'auto'
  background?: 'none' | 'primary' | 'secondary' | 'accent' | 'gradient'
  textAlign?: 'left' | 'center' | 'right'

  // Custom styling
  customBg?: string
  fullHeight?: boolean
  minHeight?: string

  // Header/Footer spacing
  headerSpacing?: 'sm' | 'md' | 'lg'
  footerSpacing?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  tag: 'section',
  containerized: true,
  containerWidth: '7xl',
  paddingY: 'lg',
  background: 'none',
  textAlign: 'left',
  theme: 'auto',
  headerSpacing: 'md',
  footerSpacing: 'md'
})

const { currentTheme } = useTheme()

// Use current theme if 'auto', otherwise use specified theme
const theme = computed(() =>
  props.theme === 'auto' ? currentTheme.value : props.theme as ThemeName
)

// Spacing classes
const spacingClass = computed(() => {
  const classes = []

  // Padding Y
  if (props.paddingY !== 'none') {
    const pyClasses = {
      xs: 'py-8',
      sm: 'py-12',
      md: 'py-16',
      lg: 'py-20 md:py-24',
      xl: 'py-24 md:py-32',
      '2xl': 'py-32 md:py-40',
      '3xl': 'py-40 md:py-48'
    }
    classes.push(pyClasses[props.paddingY])
  }

  // Padding X
  if (props.paddingX && props.paddingX !== 'none') {
    const pxClasses = {
      xs: 'px-4',
      sm: 'px-6',
      md: 'px-8',
      lg: 'px-12',
      xl: 'px-16',
      '2xl': 'px-20'
    }
    const className = pxClasses[props.paddingX as keyof typeof pxClasses]
    if (className) {
      classes.push(className)
    }
  }

  // Margin Y
  if (props.marginY && props.marginY !== 'none') {
    const myClasses = {
      xs: 'my-8',
      sm: 'my-12',
      md: 'my-16',
      lg: 'my-20',
      xl: 'my-24',
      '2xl': 'my-32',
      '3xl': 'my-40'
    }
    const className = myClasses[props.marginY as keyof typeof myClasses]
    if (className) {
      classes.push(className)
    }
  }

  // Full height
  if (props.fullHeight) {
    classes.push('min-h-screen')
  }

  return classes.join(' ')
})

// Background classes
const backgroundClass = computed(() => {
  if (props.customBg || props.background === 'none') return ''

  const themeBackgrounds = {
    cyber: {
      primary: 'bg-gray-900',
      secondary: 'bg-gray-800',
      accent: 'bg-gradient-to-r from-green-900 to-blue-900',
      gradient: 'bg-gradient-to-br from-gray-900 via-gray-800 to-green-900'
    },
    glass: {
      primary: 'bg-white',
      secondary: 'bg-gray-50',
      accent: 'bg-gradient-to-r from-indigo-50 to-purple-50',
      gradient: 'bg-gradient-to-br from-white via-indigo-50 to-purple-100'
    },
    minimal: {
      primary: 'bg-white',
      secondary: 'bg-gray-50',
      accent: 'bg-gray-100',
      gradient: 'bg-gradient-to-br from-white to-gray-100'
    },
    dark: {
      primary: 'bg-gray-900',
      secondary: 'bg-gray-800',
      accent: 'bg-gradient-to-r from-amber-900 to-orange-900',
      gradient: 'bg-gradient-to-br from-gray-900 via-gray-800 to-amber-900'
    }
  }

  return themeBackgrounds[theme.value][props.background]
})

// Text alignment
const textAlignClass = computed(() => {
  const classes = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  }
  return classes[props.textAlign]
})

// Header styling
const headerClass = computed(() => {
  const spacing = {
    sm: 'mb-8',
    md: 'mb-12',
    lg: 'mb-16'
  }
  return spacing[props.headerSpacing]
})

// Content spacing
const contentClass = computed(() => {
  return 'relative'
})

// Footer styling
const footerClass = computed(() => {
  const spacing = {
    sm: 'mt-8',
    md: 'mt-12',
    lg: 'mt-16'
  }
  return spacing[props.footerSpacing]
})

// Title styling
const titleClass = computed(() => {
  return 'text-3xl md:text-4xl lg:text-5xl font-bold ui-text-primary'
})

// Subtitle styling
const subtitleClass = computed(() => {
  return 'text-lg md:text-xl ui-text-secondary max-w-3xl mx-auto'
})

// Custom styles
const customStyles = computed(() => {
  const styles: Record<string, string> = {}

  if (props.customBg) {
    styles.background = props.customBg
  }

  if (props.minHeight) {
    styles.minHeight = props.minHeight
  }

  return styles
})
</script>