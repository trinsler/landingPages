<!--test theme system http://localhost:3000/theme-test -->
<template>
  <div class="min-h-screen ui-bg-primary p-8">
    <Container max-width="4xl">
      <Section title="Theme System Test" subtitle="Testing universal theme components">
        <!-- Theme Switcher -->
        <div class="mb-8 flex flex-wrap gap-4 justify-center">
          <BaseButton
            v-for="themeOption in availableThemes"
            :key="themeOption.name"
            :variant="currentTheme === themeOption.name ? 'primary' : 'outline'"
            @click="setTheme(themeOption.name)"
          >
            {{ themeOption.displayName }}
          </BaseButton>
        </div>

        <!-- Test Grid -->
        <Grid responsive="features" gap="lg">
          <!-- BaseCard Test -->
          <BaseCard variant="default" :hover="true">
            <h3 class="text-lg font-bold ui-text-primary mb-2">BaseCard Default</h3>
            <p class="ui-text-secondary">This card adapts to the current theme automatically.</p>
          </BaseCard>

          <!-- BaseCard Glass -->
          <BaseCard variant="glass" :hover="true">
            <h3 class="text-lg font-bold ui-text-primary mb-2">BaseCard Glass</h3>
            <p class="ui-text-secondary">Glass morphism variant with backdrop blur.</p>
          </BaseCard>

          <!-- BaseCard Elevated -->
          <BaseCard variant="elevated" :hover="true">
            <h3 class="text-lg font-bold ui-text-primary mb-2">BaseCard Elevated</h3>
            <p class="ui-text-secondary">Elevated variant with enhanced shadow.</p>
          </BaseCard>
        </Grid>

        <!-- Terminal Window Test -->
        <div class="mt-12">
          <TerminalWindow title="theme-test.sh" :glow="currentTheme === 'cyber'">
            <h2 class="text-2xl font-bold ui-text-primary mb-4">Terminal Window</h2>
            <p class="ui-text-secondary mb-4">
              Current theme: <strong class="ui-text-accent">{{ currentTheme }}</strong>
            </p>
            <div class="space-y-2">
              <div class="text-sm ui-text-muted">Theme properties:</div>
              <ul class="space-y-1 text-sm ui-text-secondary">
                <li>• Theme: {{ theme.displayName }}</li>
                <li>• Primary Color: {{ theme.primaryColor }}</li>
                <li>• Dark Mode: {{ isDark ? 'Yes' : 'No' }}</li>
              </ul>
            </div>
          </TerminalWindow>
        </div>

        <!-- Theme Info -->
        <div class="mt-8 text-center">
          <p class="ui-text-muted text-sm">
            Switch themes above to see real-time changes. This works in all apps!
          </p>
        </div>
      </Section>
    </Container>
  </div>
</template>

<script setup lang="ts">
import {
  Container,
  Section,
  Grid,
  BaseCard,
  BaseButton,
  TerminalWindow,
  useTheme,
} from '@monorepo/ui'

useHead({
  title: 'Theme System Test - Trinsler',
})

const { currentTheme, theme, isDark, availableThemes, setTheme } = useTheme()
</script>
