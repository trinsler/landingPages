<template>
  <header class="bg-white shadow-sm sticky top-0 z-50">
    <nav class="container-custom flex items-center justify-between py-4 lg:py-6">
      <div class="flex lg:flex-1">
        <NuxtLink to="/" class="-m-1.5 p-1.5">
          <AppLogo class="h-8 w-auto" />
        </NuxtLink>
      </div>

      <div class="flex lg:hidden">
        <button
          type="button"
          class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          @click="mobileMenuOpen = true"
        >
          <Bars3Icon class="h-6 w-6" aria-hidden="true" />
        </button>
      </div>

      <div class="hidden lg:flex lg:gap-x-12">
        <NuxtLink
          v-for="item in navigation"
          :key="item.name"
          :to="item.href"
          class="text-sm font-semibold leading-6 text-gray-900 hover:text-blue-600 transition-colors duration-200"
        >
          {{ item.name }}
        </NuxtLink>
      </div>

      <div class="hidden lg:flex lg:flex-1 lg:justify-end">
        <NuxtLink
          to="/contact"
          class="btn-primary"
        >
          Beratungstermin
        </NuxtLink>
      </div>
    </nav>

    <!-- Mobile menu -->
    <div v-if="mobileMenuOpen" class="lg:hidden">
      <div class="fixed inset-0 z-50 bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
        <div class="flex items-center justify-between">
          <NuxtLink to="/" class="-m-1.5 p-1.5">
            <AppLogo class="h-8 w-auto" />
          </NuxtLink>
          <button
            type="button"
            class="-m-2.5 rounded-md p-2.5 text-gray-700"
            @click="mobileMenuOpen = false"
          >
            <XMarkIcon class="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div class="mt-6 flow-root">
          <div class="-my-6 divide-y divide-gray-500/10">
            <div class="space-y-2 py-6">
              <NuxtLink
                v-for="item in navigation"
                :key="item.name"
                :to="item.href"
                class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                @click="mobileMenuOpen = false"
              >
                {{ item.name }}
              </NuxtLink>
            </div>
            <div class="py-6">
              <NuxtLink
                to="/contact"
                class="btn-primary block text-center"
                @click="mobileMenuOpen = false"
              >
                Beratungstermin
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'

const mobileMenuOpen = ref(false)

const navigation = [
  { name: 'Startseite', href: '/' },
  { name: 'Dienstleistungen', href: '/services' },
  { name: 'Referenzen', href: '/portfolio' },
  { name: 'Insights', href: '/insights' },
  { name: 'Kontakt', href: '/contact' },
]
</script>