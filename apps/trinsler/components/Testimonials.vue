<template>
  <section class="bg-white py-16 lg:py-24">
    <div class="container-custom">
      <div class="text-center max-w-2xl mx-auto mb-16">
        <h2 class="text-3xl font-bold text-gray-900 sm:text-4xl">
          Was unsere Kunden sagen
        </h2>
        <p class="mt-4 text-lg text-gray-600">
          Erfahrungen und Erfolgsgeschichten unserer Partner
        </p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="testimonial in testimonials" :key="testimonial.name" class="bg-gray-50 p-6 rounded-xl">
          <div class="mb-4">
            <div class="flex text-yellow-400">
              <span v-for="n in 5" :key="n">★</span>
            </div>
          </div>
          <p class="text-gray-600 mb-4">"{{ testimonial.quote }}"</p>
          <div class="flex items-center">
            <div class="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
            <div>
              <div class="font-semibold text-gray-900">{{ testimonial.name }}</div>
              <div class="text-sm text-gray-500">{{ testimonial.company }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const testimonials = [
  {
    name: 'Michael Weber',
    company: 'Weber & Co',
    quote: 'Trinsler hat unsere Online-Präsenz komplett transformiert. Die Ergebnisse sprechen für sich.'
  },
  {
    name: 'Sarah Müller',
    company: 'Müller GmbH',
    quote: 'Professionell, zuverlässig und erfolgreich. Wir sind sehr zufrieden mit der Zusammenarbeit.'
  },
  {
    name: 'Thomas Schneider',
    company: 'Schneider Consulting',
    quote: 'Dank Trinsler konnten wir unseren Umsatz um 40% steigern. Absolute Empfehlung!'
  }
]
</script>