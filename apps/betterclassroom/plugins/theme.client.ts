import { useTheme } from '@monorepo/ui'

export default defineNuxtPlugin(() => {
  // Initialize glass theme for BetterClassroom app
  const { setTheme } = useTheme()

  // Set glass theme as default for BetterClassroom
  setTheme('glass')
})