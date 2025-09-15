<template>
  <div class="py-16">
    <div class="container-custom">
      <div class="text-center max-w-3xl mx-auto mb-16">
        <h1 class="text-4xl font-bold text-gray-900 sm:text-5xl mb-6">
          Unsere Dienstleistungen
        </h1>
        <p class="text-xl text-gray-600">
          Umfassende Digital Marketing Lösungen für lokale Unternehmen
        </p>
      </div>

      <div class="grid lg:grid-cols-2 gap-12 mb-16">
        <div v-for="service in services" :key="service.title" class="bg-white p-8 rounded-2xl shadow-lg">
          <div class="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mb-6">
            <div class="w-8 h-8 bg-green-600 rounded"></div>
          </div>
          <h2 class="text-2xl font-bold text-gray-900 mb-4">{{ service.title }}</h2>
          <p class="text-gray-600 mb-6">{{ service.description }}</p>
          <ul class="space-y-2">
            <li v-for="feature in service.features" :key="feature" class="flex items-center text-gray-600">
              <div class="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              {{ feature }}
            </li>
          </ul>
        </div>
      </div>

      <div class="text-center">
        <NuxtLink
          to="/contact"
          class="btn-primary"
        >
          Beratungstermin vereinbaren
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'Dienstleistungen - Trinsler Digital Marketing'
})

const services = [
  {
    title: 'Social Media Marketing',
    description: 'Strategische Präsenz auf allen relevanten Plattformen mit messbaren Ergebnissen und authentischem Engagement.',
    features: [
      'Content-Strategie & Planung',
      'Community Management',
      'Influencer Marketing',
      'Performance Tracking'
    ]
  },
  {
    title: 'SEO & Content Marketing',
    description: 'Organisches Wachstum durch suchmaschinenoptimierte Inhalte und nachhaltige SEO-Strategien.',
    features: [
      'Keyword-Recherche & Analyse',
      'Content-Erstellung',
      'Technisches SEO',
      'Link-Building'
    ]
  },
  {
    title: 'Paid Advertising',
    description: 'Zielgerichtete Werbekampagnen auf Google, Facebook, Instagram und anderen Plattformen.',
    features: [
      'Google Ads Management',
      'Social Media Ads',
      'Retargeting Kampagnen',
      'Conversion Optimierung'
    ]
  },
  {
    title: 'Analytics & Reporting',
    description: 'Transparente Erfolgsmessung mit detaillierten Performance-Reports und Handlungsempfehlungen.',
    features: [
      'Performance Monitoring',
      'Custom Dashboards',
      'ROI-Tracking',
      'Monatliche Reports'
    ]
  }
]
</script>