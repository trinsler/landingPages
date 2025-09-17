<template>
  <footer class="relative matrix-bg overflow-hidden">
    <!-- Cyber Grid Background -->
    <div class="absolute inset-0 cyber-grid opacity-20"></div>
    
    <!-- Data Streams -->
    <div class="absolute inset-0">
      <div class="animate-data-stream absolute left-1/4 w-1 h-32 bg-gradient-to-b from-transparent via-accent-neon to-transparent" style="animation-delay: 0s;"></div>
      <div class="animate-data-stream absolute right-1/3 w-1 h-28 bg-gradient-to-b from-transparent via-accent-cyan to-transparent" style="animation-delay: 2s;"></div>
    </div>

    <div class="relative container-custom py-16">
      <div class="xl:grid xl:grid-cols-3 xl:gap-8">
        <div class="space-y-8 xl:col-span-1">
          <!-- Cyber Logo -->
          <div class="flex items-center space-x-3">
            <div class="relative">
              <div class="w-12 h-12 rounded-xl neon-card flex items-center justify-center animate-neon-flicker">
                <img 
                  src="/logo.png" 
                  alt="Trinsler Logo" 
                  class="w-8 h-8 object-contain"
                />
              </div>
              <div class="absolute inset-0 rounded-xl bg-accent-neon  opacity-20"></div>
            </div>
            <div>
              <span class="text-2xl font-black text-white" style="font-family: 'Space Grotesk', sans-serif;">
                <span class="text-accent-neon">TRINS</span><span class="text-accent-cyan">LER</span>
              </span>
              <div class="text-xs font-medium code-font text-accent-cyan">
                GROWTH_REVOLUTION.EXE
              </div>
            </div>
          </div>
          
          <!-- Mission Statement -->
          <div class="cyber-card rounded-xl p-4 max-w-md">
            <div class="code-font text-accent-purple text-xs mb-2">/* FOOTER_MISSION.md */</div>
            <p class="text-white/80 text-sm leading-6">
              Wir revolutionieren Startup-Wachstum durch 
              <span class="text-accent-neon">Equity-for-Growth</span> statt teurer Agentur-Honorare.
            </p>
          </div>
          <div class="flex space-x-6">
            <NuxtLink
              v-for="item in navigation.social"
              :key="item.name"
              :to="item.href"
              class="text-gray-400 hover:text-green-400 transition-colors"
            >
              <span class="sr-only">{{ item.name }}</span>
              <div class="h-6 w-6">
                <div class="h-6 w-6 bg-gray-400 rounded"></div>
              </div>
            </NuxtLink>
          </div>
        </div>

        <div class="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
          <div class="md:grid md:grid-cols-2 md:gap-8">
            <div>
              <h3 class="text-sm font-semibold leading-6 text-white code-font"><span class="text-accent-cyan">></span> NAVIGATION</h3>
              <ul class="mt-6 space-y-4">
                <li v-for="item in navigation.main" :key="item.name">
                  <NuxtLink
                    :to="item.href"
                    class="text-sm leading-6 text-white/70 hover:text-accent-neon transition-colors code-font"
                  >
                    {{ item.name }}
                  </NuxtLink>
                </li>
              </ul>
            </div>

            <div class="mt-10 md:mt-0">
              <h3 class="text-sm font-semibold leading-6 text-white code-font"><span class="text-accent-cyan">></span> SERVICES</h3>
              <ul class="mt-6 space-y-4">
                <li v-for="item in navigation.services" :key="item.name">
                  <NuxtLink
                    :to="item.href"
                    class="text-sm leading-6 text-white/70 hover:text-accent-neon transition-colors code-font"
                  >
                    {{ item.name }}
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </div>

          <div class="md:grid md:grid-cols-1">
            <div>
              <h3 class="text-sm font-semibold leading-6 text-white code-font"><span class="text-accent-cyan">></span> SYSTEM</h3>
              <ul class="mt-6 space-y-4">
                <li v-for="item in navigation.legal" :key="item.name">
                  <NuxtLink
                    :to="item.href"
                    class="text-sm leading-6 text-white/70 hover:text-accent-neon transition-colors code-font"
                  >
                    {{ item.name }}
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Terminal Footer Bar -->
      <div class="mt-16 pt-8 sm:mt-20 lg:mt-24">
        <div class="cyber-card rounded-xl p-6">
          <div class="code-font text-accent-cyan text-sm mb-4">
            <span class="text-accent-neon">system@trinsler:~$</span> status --footer
          </div>
          <div class="md:flex md:items-center md:justify-between">
            <p class="text-xs leading-5 text-white/60 code-font">
              &copy; 2025 Trinsler GmbH (in Gründung). Equity-for-Growth Revolution.
            </p>
            <div class="mt-4 md:mt-0 flex items-center gap-4">
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 bg-accent-neon rounded-full "></div>
                <span class="text-xs text-white/60 code-font">SYSTEM_ONLINE</span>
              </div>
              <p class="text-xs leading-5 text-accent-cyan code-font">
                Ihr Erfolg = unser Erfolg
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const navigation = {
  main: [
    { name: 'Services', href: '/services' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Insights', href: '/insights' },
    { name: 'Trends 2025', href: '/trends-2025' },
    { name: 'Kontakt', href: '/contact' },
  ],
  services: [
    { name: 'Growth-as-a-Service', href: '/services#growth' },
    { name: 'Digital Marketing', href: '/services#marketing' },
    { name: 'Product Growth', href: '/services#product' },
    { name: 'Revenue Operations', href: '/services#revenue' },
  ],
  legal: [
    { name: 'Impressum', href: '/impressum' },
    { name: 'Datenschutz', href: '/datenschutz' },
    { name: 'AGB', href: '/agb' },
  ],
  social: [
    { name: 'Instagram', href: '#', icon: 'instagram' },
    { name: 'LinkedIn', href: '#', icon: 'linkedin' },
    { name: 'Facebook', href: '#', icon: 'facebook' },
  ],
}
</script>