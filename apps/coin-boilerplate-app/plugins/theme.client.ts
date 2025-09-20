import { useTheme } from '@monorepo/ui'

export default defineNuxtPlugin(() => {
  // Initialize minimal theme for Coin-Boilerplate app
  const { setTheme } = useTheme()

  // Set minimal theme as default for Coin-Boilerplate
  setTheme('minimal')
})