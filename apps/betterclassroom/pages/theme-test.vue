<template>
  <div class="min-h-screen ui-bg-primary p-8">
    <div class="max-w-4xl mx-auto">
      <section title="BetterClassroom Theme Test" subtitle="Glass theme demonstration">
        <!-- Theme Info -->
        <div class="mb-8 text-center">
          <Card variant="glass" class="inline-block">
            <h3 class="text-lg font-bold ui-text-primary mb-2">Glass Theme Active</h3>
            <p class="ui-text-secondary">Perfect for educational platforms</p>
          </Card>
        </div>

        <!-- Component Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card variant="default" :hover="true">
            <h4 class="font-semibold ui-text-primary mb-2">Clean Design</h4>
            <p class="text-sm ui-text-secondary">Optimal for learning environments</p>
          </Card>

          <Card variant="glass" :hover="true">
            <h4 class="font-semibold ui-text-primary mb-2">Glass Effect</h4>
            <p class="text-sm ui-text-secondary">Modern glassmorphism styling</p>
          </Card>

          <Card variant="elevated" :hover="true">
            <h4 class="font-semibold ui-text-primary mb-2">Professional</h4>
            <p class="text-sm ui-text-secondary">Enterprise-ready appearance</p>
          </Card>
        </div>

        <!-- Terminal Demo -->
        <div class="mt-8">
          <Card title="betterclassroom.sh" theme="glass">
            <h3 class="text-xl font-bold ui-text-primary mb-3">🏠 BetterClassroom Terminal</h3>
            <p class="ui-text-secondary">
              This terminal automatically uses the glass theme with clean, educational styling.
            </p>
          </Card>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui' 

useHead({
  title: 'Theme Test - BetterClassroom'
})
</script>