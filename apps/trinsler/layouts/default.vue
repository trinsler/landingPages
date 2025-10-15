<template>
  <div class="min-h-screen">
    <AppNavbar />
    <main>
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import AppNavbar from '~/components/layout/navbar/AppNavbar.vue'
import AppFooter from '~/components/layout/footer/AppFooter.vue'

onMounted(() => {
  // Performance optimization code can go here
})
</script>

<style scoped>
html {
  scroll-behavior: smooth;
}
</style>