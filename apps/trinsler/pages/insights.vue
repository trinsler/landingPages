<template>
  <div class="py-16">
    <div class="container-custom">
      <div class="text-center max-w-3xl mx-auto mb-16">
        <h1 class="text-4xl font-bold text-gray-900 sm:text-5xl mb-6">Insights</h1>
        <p class="text-xl text-gray-600">
          Tipps, Trends und Strategien für erfolgreiches Digital Marketing
        </p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <NuxtLink
          v-for="article in articles"
          :key="article.id"
          :to="`/insights/${article.id}`"
          class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
        >
          <div class="h-48 bg-gray-300" />
          <div class="p-6">
            <div class="text-sm text-green-600 font-medium mb-2">{{ article.category }}</div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">{{ article.title }}</h3>
            <p class="text-gray-600 mb-4">{{ article.excerpt }}</p>
            <div class="text-sm text-gray-500">{{ article.date }}</div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'Insights - Trinsler Digital Marketing',
})

const articles = [
  {
    id: 'social-media-trends-2024',
    title: 'Social Media Trends 2024: Was lokale Unternehmen wissen müssen',
    excerpt:
      'Die wichtigsten Social Media Trends für das Jahr 2024 und wie Sie diese für Ihr Unternehmen nutzen können.',
    category: 'Social Media',
    date: '15. März 2024',
  },
  {
    id: 'local-seo-guide',
    title: 'Local SEO: Der ultimative Guide für lokale Unternehmen',
    excerpt:
      'Schritt-für-Schritt Anleitung zur Optimierung Ihrer lokalen Suchmaschinenplatzierung.',
    category: 'SEO',
    date: '10. März 2024',
  },
  {
    id: 'content-marketing-strategy',
    title: 'Content Marketing Strategien, die wirklich funktionieren',
    excerpt: 'Bewährte Content Marketing Strategien, die Engagement und Conversions steigern.',
    category: 'Content Marketing',
    date: '5. März 2024',
  },
  {
    id: 'google-ads-tipps',
    title: '10 Google Ads Tipps für bessere Performance',
    excerpt: 'Praktische Tipps zur Optimierung Ihrer Google Ads Kampagnen und Steigerung des ROI.',
    category: 'Paid Advertising',
    date: '1. März 2024',
  },
  {
    id: 'instagram-marketing',
    title: 'Instagram Marketing für lokale Unternehmen',
    excerpt:
      'Wie Sie Instagram effektiv für Ihr lokales Unternehmen nutzen und mehr Kunden gewinnen.',
    category: 'Social Media',
    date: '25. Februar 2024',
  },
  {
    id: 'email-marketing-basics',
    title: 'E-Mail Marketing Grundlagen: Von der Strategie bis zur Umsetzung',
    excerpt: 'Alles was Sie über erfolgreiches E-Mail Marketing wissen müssen.',
    category: 'E-Mail Marketing',
    date: '20. Februar 2024',
  },
]
</script>
