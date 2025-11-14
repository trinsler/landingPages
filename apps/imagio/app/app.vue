<template>
  <div>
    <NuxtRouteAnnouncer />
    <AppHeader />
    <main class="main-content">
      <NuxtPage />
    </main>
  </div>
</template>



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
}

@media (max-width: 768px) {
  .main-content {
    min-height: calc(100vh - 60px);
  }
}
</style>