<template>
  <div class="min-h-screen ui-bg-primary p-8">
    <Container max-width="4xl">
      <Section title="BetterClassroom Theme Test" subtitle="Glass theme demonstration">
        <!-- Theme Info -->
        <div class="mb-8 text-center">
          <BaseCard variant="glass" class="inline-block">
            <h3 class="text-lg font-bold ui-text-primary mb-2">Glass Theme Active</h3>
            <p class="ui-text-secondary">Perfect for educational platforms</p>
          </BaseCard>
        </div>

        <!-- Component Grid -->
        <Grid responsive="cards" gap="md">
          <BaseCard variant="default" :hover="true">
            <h4 class="font-semibold ui-text-primary mb-2">Clean Design</h4>
            <p class="text-sm ui-text-secondary">Optimal for learning environments</p>
          </BaseCard>

          <BaseCard variant="glass" :hover="true">
            <h4 class="font-semibold ui-text-primary mb-2">Glass Effect</h4>
            <p class="text-sm ui-text-secondary">Modern glassmorphism styling</p>
          </BaseCard>

          <BaseCard variant="elevated" :hover="true">
            <h4 class="font-semibold ui-text-primary mb-2">Professional</h4>
            <p class="text-sm ui-text-secondary">Enterprise-ready appearance</p>
          </BaseCard>
        </Grid>

        <!-- Terminal Demo -->
        <div class="mt-8">
          <TerminalWindow title="betterclassroom.sh" theme="glass">
            <h3 class="text-xl font-bold ui-text-primary mb-3">🏠 BetterClassroom Terminal</h3>
            <p class="ui-text-secondary">
              This terminal automatically uses the glass theme with clean, educational styling.
            </p>
          </TerminalWindow>
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
  TerminalWindow
} from '@monorepo/ui'

useHead({
  title: 'Theme Test - BetterClassroom'
})
</script>