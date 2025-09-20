import { ref, computed, onMounted } from 'vue'

export type ThemeName = 'cyber' | 'glass' | 'minimal' | 'dark'

export interface ThemeConfig {
  name: ThemeName
  displayName: string
  description: string
  primaryColor: string
  isDark: boolean
}

const themes: Record<ThemeName, ThemeConfig> = {
  cyber: {
    name: 'cyber',
    displayName: 'Cyber',
    description: 'Futuristic neon-themed design (Trinsler)',
    primaryColor: '#3b82f6',
    isDark: true,
  },
  glass: {
    name: 'glass',
    displayName: 'Glass',
    description: 'Clean glassmorphism design (BetterClassroom)',
    primaryColor: '#6366f1',
    isDark: false,
  },
  minimal: {
    name: 'minimal',
    displayName: 'Minimal',
    description: 'Clean and simple design system',
    primaryColor: '#111827',
    isDark: false,
  },
  dark: {
    name: 'dark',
    displayName: 'Dark',
    description: 'Professional dark theme',
    primaryColor: '#fbbf24',
    isDark: true,
  },
}

// Global theme state
const currentTheme = ref<ThemeName>('cyber')

export function useTheme() {
  // Get current theme config
  const theme = computed(() => themes[currentTheme.value])

  // Check if current theme is dark
  const isDark = computed(() => theme.value.isDark)

  // Get all available themes
  const availableThemes = computed(() => Object.values(themes))

  // Set theme programmatically
  const setTheme = (themeName: ThemeName) => {
    if (themes[themeName]) {
      currentTheme.value = themeName
      updateDOMTheme(themeName)

      // Store in localStorage if available
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('ui-theme', themeName)
      }
    }
  }

  // Toggle between light and dark themes
  const toggleTheme = () => {
    if (isDark.value) {
      // Switch to glass (light theme)
      setTheme('glass')
    } else {
      // Switch to dark theme
      setTheme('dark')
    }
  }

  // Cycle through all themes
  const cycleTheme = () => {
    const themeNames = Object.keys(themes) as ThemeName[]
    const currentIndex = themeNames.indexOf(currentTheme.value)
    const nextIndex = (currentIndex + 1) % themeNames.length
    const nextTheme = themeNames[nextIndex]
    if (nextTheme) {
      setTheme(nextTheme)
    }
  }

  // Update DOM with theme
  const updateDOMTheme = (themeName: ThemeName) => {
    if (typeof document !== 'undefined') {
      // Remove all theme classes
      Object.keys(themes).forEach(_theme => {
        document.documentElement.removeAttribute(`data-theme`)
      })

      // Add current theme
      document.documentElement.setAttribute('data-theme', themeName)

      // Update meta theme-color for mobile browsers
      const metaThemeColor = document.querySelector('meta[name="theme-color"]')
      if (metaThemeColor) {
        metaThemeColor.setAttribute('content', themes[themeName].primaryColor)
      }
    }
  }

  // Initialize theme from localStorage or system preference
  const initializeTheme = () => {
    if (typeof window === 'undefined') return

    // Check localStorage first
    const storedTheme = localStorage.getItem('ui-theme') as ThemeName
    if (storedTheme && themes[storedTheme]) {
      setTheme(storedTheme)
      return
    }

    // Check system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setTheme(prefersDark ? 'dark' : 'glass')
  }

  // Auto-initialize on mount
  onMounted(() => {
    initializeTheme()
  })

  // Watch for system theme changes
  if (typeof window !== 'undefined') {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.addEventListener('change', e => {
      // Only auto-switch if no theme is stored in localStorage
      if (!localStorage.getItem('ui-theme')) {
        setTheme(e.matches ? 'dark' : 'glass')
      }
    })
  }

  return {
    // State
    currentTheme: computed(() => currentTheme.value),
    theme,
    isDark,
    availableThemes,

    // Actions
    setTheme,
    toggleTheme,
    cycleTheme,
    initializeTheme,

    // Utils
    isTheme: (themeName: ThemeName) => currentTheme.value === themeName,
    getThemeConfig: (themeName: ThemeName) => themes[themeName],
  }
}

// Theme-specific utility functions
export function getThemeValue(property: string): string {
  if (typeof window === 'undefined') return ''

  return getComputedStyle(document.documentElement).getPropertyValue(property).trim()
}

export function setThemeValue(property: string, value: string): void {
  if (typeof document === 'undefined') return

  document.documentElement.style.setProperty(property, value)
}

// CSS-in-JS helper for theme-aware styling
export function createThemeStyles(styles: Record<ThemeName, Record<string, string>>) {
  return (themeName: ThemeName = 'cyber') => {
    return styles[themeName] || styles.cyber
  }
}

// Export theme configurations for external use
export { themes }
