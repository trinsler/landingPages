<template>
  <div class="min-h-screen">
    <AppNavbar />
    <main class="min-h-screen">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  // Performance optimization code can go here
})
</script>

<style scoped>
html {
  scroll-behavior: smooth;
}
</style>