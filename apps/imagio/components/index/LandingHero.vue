<template>
  <div class="landing-hero">
    <img src="/assets/imagio_logo.png" alt="IMAGIO" class="logo" />
    <h1>{{ t('title') }}</h1>
    <p>{{ t('subtitle') }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  t: (key: string) => string
}>()
</script>

<style scoped>
.landing-hero {
  text-align: center;
  margin-bottom: 2rem;
}

.logo {
  width: 200px;
  height: auto;
  margin-bottom: 2rem;
  display: block;
  max-width: 100%;
}

h1 {
  color: #1f2937;
  margin-bottom: 0.75rem;
  font-size: 2rem;
  font-weight: 600;
}

p {
  color: #6b7280;
  margin-bottom: 2.5rem;
  font-size: 1.125rem;
}

@media (max-width: 768px) {
  .logo {
    width: 180px;
  }
  
  h1 {
    font-size: 1.75rem;
  }
}
</style>