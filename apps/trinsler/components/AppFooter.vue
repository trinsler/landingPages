<template>
  <footer class="bg-gray-900 text-white">
    <div class="container-custom py-16">
      <div class="xl:grid xl:grid-cols-3 xl:gap-8">
        <div class="space-y-8 xl:col-span-1">
          <AppLogo class="h-8 w-auto [&_svg_path]:fill-white [&_svg_polygon]:fill-green-400 [&_span]:text-white" />
          <p class="text-gray-300 text-sm leading-6 max-w-md">
            Wir verwandeln lokale Unternehmen in digitale Erfolgsgeschichten durch datenbasierte Marketing-Strategien.
          </p>
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
              <h3 class="text-sm font-semibold leading-6 text-white">Navigation</h3>
              <ul class="mt-6 space-y-4">
                <li v-for="item in navigation.main" :key="item.name">
                  <NuxtLink
                    :to="item.href"
                    class="text-sm leading-6 text-gray-300 hover:text-white transition-colors"
                  >
                    {{ item.name }}
                  </NuxtLink>
                </li>
              </ul>
            </div>

            <div class="mt-10 md:mt-0">
              <h3 class="text-sm font-semibold leading-6 text-white">Services</h3>
              <ul class="mt-6 space-y-4">
                <li v-for="item in navigation.services" :key="item.name">
                  <NuxtLink
                    :to="item.href"
                    class="text-sm leading-6 text-gray-300 hover:text-white transition-colors"
                  >
                    {{ item.name }}
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </div>

          <div class="md:grid md:grid-cols-1">
            <div>
              <h3 class="text-sm font-semibold leading-6 text-white">Rechtliches</h3>
              <ul class="mt-6 space-y-4">
                <li v-for="item in navigation.legal" :key="item.name">
                  <NuxtLink
                    :to="item.href"
                    class="text-sm leading-6 text-gray-300 hover:text-white transition-colors"
                  >
                    {{ item.name }}
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24">
        <div class="md:flex md:items-center md:justify-between">
          <p class="text-xs leading-5 text-gray-400">
            &copy; 2024 Trinsler. Alle Rechte vorbehalten.
          </p>
          <p class="mt-4 text-xs leading-5 text-gray-400 md:mt-0">
            Ihre Marke. Unsere Strategie. Echte Ergebnisse.
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const navigation = {
  main: [
    { name: 'Dienstleistungen', href: '/services' },
    { name: 'Referenzen', href: '/portfolio' },
    { name: 'Insights', href: '/insights' },
    { name: 'Kontakt', href: '/contact' },
  ],
  services: [
    { name: 'Social Media Marketing', href: '/services#social-media' },
    { name: 'SEO & Content', href: '/services#seo' },
    { name: 'Kampagnenmanagement', href: '/services#campaigns' },
    { name: 'Analytics & Reporting', href: '/services#analytics' },
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