import { useTheme } from '@monorepo/ui'

export default defineNuxtPlugin(() => {
  // Initialize cyber theme for Trinsler app
  const { setTheme } = useTheme()

  // Set cyber theme as default for Trinsler
  setTheme('cyber')
})