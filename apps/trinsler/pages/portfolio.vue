<template>
  <div class="py-16">
    <div class="container-custom">
      <div class="text-center max-w-3xl mx-auto mb-16">
        <h1 class="text-4xl font-bold text-gray-900 sm:text-5xl mb-6">
          Portfolio
        </h1>
        <p class="text-xl text-gray-600">
          Erfolgsgeschichten unserer Kunden
        </p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="project in projects" :key="project.title" class="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div class="h-48 bg-gray-300"></div>
          <div class="p-6">
            <h3 class="text-xl font-bold text-gray-900 mb-2">{{ project.title }}</h3>
            <p class="text-gray-600 mb-4">{{ project.description }}</p>
            <div class="flex flex-wrap gap-2 mb-4">
              <span v-for="tag in project.tags" :key="tag" class="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">
                {{ tag }}
              </span>
            </div>
            <div class="text-sm text-gray-500">
              <strong>Ergebnis:</strong> {{ project.result }}
            </div>
          </div>
        </div>
      </div>

      <div class="text-center mt-16">
        <NuxtLink
          to="/contact"
          class="btn-primary"
        >
          Ihr Projekt besprechen
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'Portfolio - Trinsler Digital Marketing'
})

const projects = [
  {
    title: 'Lokales Restaurant',
    description: 'Social Media Marketing und lokale SEO für ein familiengeführtes Restaurant.',
    tags: ['Social Media', 'SEO', 'Local Marketing'],
    result: '+150% Reservierungen'
  },
  {
    title: 'Handwerksbetrieb',
    description: 'Komplette Digitalisierung der Marketing-Aktivitäten eines Handwerksbetriebs.',
    tags: ['Google Ads', 'Website', 'Lead Generation'],
    result: '+200% Anfragen'
  },
  {
    title: 'E-Commerce Shop',
    description: 'Optimierung der Conversion-Rate und Aufbau einer starken Social Media Präsenz.',
    tags: ['E-Commerce', 'Conversion', 'Social Media'],
    result: '+85% Umsatz'
  },
  {
    title: 'Dienstleistungsunternehmen',
    description: 'Aufbau einer digitalen Marke und Implementierung von Lead-Generierung.',
    tags: ['Branding', 'Content Marketing', 'Lead Gen'],
    result: '+120% Leads'
  },
  {
    title: 'Einzelhandel',
    description: 'Omnichannel Marketing-Strategie für lokalen Einzelhandel.',
    tags: ['Omnichannel', 'Local SEO', 'Social Media'],
    result: '+90% Footfall'
  },
  {
    title: 'B2B Consulting',
    description: 'LinkedIn Marketing und Content-Strategie für B2B Beratungsunternehmen.',
    tags: ['LinkedIn', 'B2B', 'Content Strategy'],
    result: '+300% LinkedIn Leads'
  }
]
</script>