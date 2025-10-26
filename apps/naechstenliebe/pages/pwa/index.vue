<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script setup>
// Root page - redirects to landing
await navigateTo('/landing')
</script>