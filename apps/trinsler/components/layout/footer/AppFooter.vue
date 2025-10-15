<template>
  <footer class="relative" style="background: #243463">
    <div class="relative container-custom py-16">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Company Info -->
        <div class="md:col-span-1">
          <div class="mb-6">
            <img src="/images/logo.png" alt="Trinsler Logo" class="w-12 h-12 object-contain mb-4" />
            <h3 class="text-xl font-bold text-white mb-2" style="font-family: 'Inter', system-ui, -apple-system, sans-serif">
              Trinsler
            </h3>
            <p class="text-white/80 text-sm leading-relaxed" style="font-family: 'Inter', system-ui, -apple-system, sans-serif">
              People First Technology. We build social impact apps that strengthen communities and create meaningful change.
            </p>
          </div>
          
          <!-- Social Links -->
          <div class="flex space-x-4">
            <a
              v-for="item in social"
              :key="item.name"
              :href="item.href"
              class="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300"
              :aria-label="item.name"
            >
              <div class="w-5 h-5 rounded" style="background: #243463"></div>
            </a>
          </div>
        </div>

        <!-- Navigation -->
        <div>
          <h4 class="text-sm font-semibold text-white mb-4 uppercase tracking-wider" style="font-family: 'Inter', system-ui, -apple-system, sans-serif">
            Navigation
          </h4>
          <ul class="space-y-3">
            <li v-for="item in navigation.main" :key="item.name">
              <NuxtLink
                :to="item.href"
                class="text-white/80 hover:text-white text-sm transition-colors duration-200"
                style="font-family: 'Inter', system-ui, -apple-system, sans-serif"
              >
                {{ item.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Services -->
        <div>
          <h4 class="text-sm font-semibold text-white mb-4 uppercase tracking-wider" style="font-family: 'Inter', system-ui, -apple-system, sans-serif">
            Services
          </h4>
          <ul class="space-y-3">
            <li v-for="item in navigation.services" :key="item.name">
              <NuxtLink
                :to="item.href"
                class="text-white/80 hover:text-white text-sm transition-colors duration-200"
                style="font-family: 'Inter', system-ui, -apple-system, sans-serif"
              >
                {{ item.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Legal -->
        <div>
          <h4 class="text-sm font-semibold text-white mb-4 uppercase tracking-wider" style="font-family: 'Inter', system-ui, -apple-system, sans-serif">
            Legal
          </h4>
          <ul class="space-y-3">
            <li v-for="item in navigation.legal" :key="item.name">
              <NuxtLink
                :to="item.href"
                class="text-white/80 hover:text-white text-sm transition-colors duration-200"
                style="font-family: 'Inter', system-ui, -apple-system, sans-serif"
              >
                {{ item.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Section -->
      <div class="mt-12 pt-8 border-t border-white/20">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <p class="text-white/60 text-sm mb-4 md:mb-0" style="font-family: 'Inter', system-ui, -apple-system, sans-serif">
            &copy; 2025 Trinsler GmbH. All rights reserved.
          </p>
          
          <!-- Contact Info -->
          <div class="flex items-center space-x-6 text-white/80 text-sm" style="font-family: 'Inter', system-ui, -apple-system, sans-serif">
            <div class="flex items-center space-x-2">
              <div class="w-2 h-2 bg-white rounded-full"></div>
              <span>Konstanz, Germany</span>
            </div>
            <div class="flex items-center space-x-2">
              <div class="w-2 h-2 bg-white rounded-full"></div>
              <span>hello@trinsler.com</span>
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
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ],
  services: [
    { name: 'Idea to MVP Development', href: '/services' },
    { name: 'UX/UI Design & Strategy', href: '/services' },
    { name: 'Scalable Tech Solutions', href: '/services' },
    { name: 'Social Impact Consulting', href: '/services' },
  ],
  legal: [
    { name: 'Impressum', href: '/legal/imprint' },
    { name: 'Datenschutz', href: '/legal/privacy' },
    { name: 'AGB', href: '/legal/terms' },
  ],
}

const social = [
  { name: 'LinkedIn', href: '#' },
  { name: 'Twitter', href: '#' },
  { name: 'GitHub', href: '#' },
]
</script>

<style scoped>
/* Footer specific styles will inherit from global color system */
</style>