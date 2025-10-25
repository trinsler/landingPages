<template>
  <footer class="w-full py-6 px-4 md:px-6 border-t">
    <div class="container mx-auto flex flex-col sm:flex-row justify-between items-center">
      <p class="text-xs text-gray-500 dark:text-gray-400">2024 BetterClassroom</p>
      <nav class="flex gap-4 sm:gap-6 mt-4 sm:mt-0">
        <NuxtLink class="text-xs hover:text-primary transition-colors" to="/datenschutz">
          Datenschutz
        </NuxtLink>
        <NuxtLink class="text-xs hover:text-primary transition-colors" to="/agb">
          Nutzungsbedingungen
        </NuxtLink>
        <NuxtLink class="text-xs hover:text-primary transition-colors" to="/impressum">
          Impressum
        </NuxtLink>
      </nav>
      <div class="text-xs text-gray-500 dark:text-gray-400 mt-4 sm:mt-0">
        Powered by <a href="https:trinsler.com" class="hover:text-primary transition-colors">trinsler</a>
      </div>
    </div>
  </footer>
</template>