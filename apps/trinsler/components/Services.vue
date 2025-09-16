<template>
  <section class="bg-white py-16 lg:py-24">
    <div class="container-custom">
      <div class="text-center max-w-2xl mx-auto mb-16">
        <h2 class="text-3xl font-bold text-gray-900 sm:text-4xl">
          Unsere Dienstleistungen
        </h2>
        <p class="mt-4 text-lg text-gray-600">
          Maßgeschneiderte Digital Marketing Lösungen für Ihren Erfolg
        </p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="service in services" :key="service.title" class="p-6 bg-gray-50 rounded-xl">
          <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
            <div class="w-6 h-6 bg-green-600 rounded"></div>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-3">{{ service.title }}</h3>
          <p class="text-gray-600">{{ service.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const services = [
  {
    title: 'Social Media Marketing',
    description: 'Strategische Präsenz auf allen relevanten Plattformen mit messbaren Ergebnissen.'
  },
  {
    title: 'SEO & Content Marketing',
    description: 'Organisches Wachstum durch suchmaschinenoptimierte Inhalte und Strategien.'
  },
  {
    title: 'Paid Advertising',
    description: 'Zielgerichtete Werbekampagnen mit optimaler ROI-Performance.'
  },
  {
    title: 'Analytics & Reporting',
    description: 'Transparente Erfolgsmessung mit detaillierten Performance-Reports.'
  },
  {
    title: 'Brand Management',
    description: 'Aufbau und Pflege Ihrer digitalen Markenidentität.'
  },
  {
    title: 'Conversion Optimierung',
    description: 'Maximierung Ihrer Conversion-Rate durch datenbasierte Optimierungen.'
  }
]
</script>