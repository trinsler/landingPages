<template>
  <section class="bg-gray-900 py-16 lg:py-24">
    <div class="container-custom">
      <div class="text-center mb-16">
        <h2 class="text-3xl font-bold text-white sm:text-4xl">
          Zahlen, die überzeugen
        </h2>
        <p class="mt-4 text-lg text-gray-300">
          Unsere Erfolge sprechen für sich
        </p>
      </div>

      <div class="grid grid-cols-2 lg:grid-cols-4 gap-8">
        <div v-for="stat in stats" :key="stat.label" class="text-center">
          <div class="text-4xl font-bold text-green-400 mb-2">{{ stat.value }}</div>
          <div class="text-gray-300">{{ stat.label }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const stats = [
  { value: '150+', label: 'Zufriedene Kunden' },
  { value: '67%', label: 'Ø Reichweiten-Steigerung' },
  { value: '3.2x', label: 'ROI Durchschnitt' },
  { value: '99%', label: 'Kundenzufriedenheit' }
]
</script>