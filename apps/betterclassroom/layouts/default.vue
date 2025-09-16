<template>
  <div class="flex flex-col min-h-screen">
    <AppHeader />
    <main class="flex-1 pt-16">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
useHead({
  title: 'BetterClassroom - Digitale Meldungen im Klassenzimmer',
  meta: [
    { name: 'description', content: 'Revolutionieren Sie die Interaktion in Ihrem Klassenzimmer mit BetterClassroom' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
  ]
})
</script>