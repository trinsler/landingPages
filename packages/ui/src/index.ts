// Export all components and composables
export * from './components'

// Export types
export type { ThemeName, ThemeConfig } from './composables/useTheme'

// Export theme styles for apps that need to include them
export const themeStylesPath = './styles/themes.css'