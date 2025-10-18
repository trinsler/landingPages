<template>
  <div>
    <!-- Homepage Sections -->
    <HeroSection />
    <PortfolioSection />
    <ServicesSection />
    <CTASection />
  </div>
</template>

<script setup>
// Import all section components
import HeroSection from '~/components/sections/HeroSection.vue'
import PortfolioSection from '~/components/sections/PortfolioSection.vue'
import ServicesSection from '~/components/sections/ServicesSection.vue'
import CTASection from '~/components/sections/CTASection.vue'

// SEO Meta
useHead({
  title: 'Trinsler - Social-Tech Studio | Technology for Social Impact',
  meta: [
    {
      name: 'description',
      content: 'Trinsler is a social-first tech studio dedicated to transforming visionary ideas into powerful applications. From Nächstenliebe connecting students with seniors to global social-tech innovations. Partner with us to create meaningful change.'
    },
    {
      name: 'keywords',
      content: 'social tech, community technology, Nächstenliebe, digital inclusion, social impact projects, community platforms, technology for good, hyper-local solutions, sustainable tech, community building, social entrepreneurship'
    },
    {
      property: 'og:title',
      content: 'Trinsler - Technology for Social Impact'
    },
    {
      property: 'og:description', 
      content: 'We build apps with purpose. Transform your vision into powerful applications that drive real-world impact.'
    },
    {
      property: 'og:type',
      content: 'website'
    },
    {
      property: 'og:url',
      content: 'https://trinsler.com'
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image'
    },
    {
      name: 'twitter:title',
      content: 'Trinsler - Technology for Social Impact'
    },
    {
      name: 'twitter:description',
      content: 'We build apps with purpose. Transform your vision into powerful applications that drive real-world impact.'
    }
  ]
})
</script>
