<template>
  <div>
    <AppHeader />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import AppHeader from '~/components/global/AppHeader.vue'
</script>

<style>
/* Global styles */
* {
  box-sizing: border-box;
}

html, body {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  background-color: #ffffff;
  color: #000000;
  line-height: 1.6;
}

.main-content {
  min-height: calc(100vh - 70px);
  padding-top: 70px;
}

@media (max-width: 768px) {
  .main-content {
    min-height: calc(100vh - 60px);
    padding-top: 60px;
  }
}
</style>
