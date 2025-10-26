<template>
  <div class="min-h-screen" style="background: white; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
    <!-- Header Navigation -->
    <TheHeader />
    
    <!-- Hero Section -->
    <HeroSection />
    
    <!-- Features Section -->
    <FeaturesSection />
    
    <!-- Services Section -->
    <ServicesSection />
    
    <!-- Help Seekers Section -->
    <HelpSeekersSection />
    
    <!-- Helpers Section -->
    <HelpersSection />
    
    <!-- System Overview Section -->
    <SystemOverviewSection />
    
    <!-- FAQ Section -->
    <FAQSection />
    
    <!-- CTA Section -->
    <CTASection />
    
    <!-- Footer -->
    <TheFooter />
  </div>
</template>

<script setup>
import TheHeader from '../components/TheHeader.vue'
import HeroSection from '../components/HeroSection.vue'
import FeaturesSection from '../components/FeaturesSection.vue'
import ServicesSection from '../components/ServicesSection.vue'
import HelpSeekersSection from '../components/HelpSeekersSection.vue'
import HelpersSection from '../components/HelpersSection.vue'
import SystemOverviewSection from '../components/SystemOverviewSection.vue'
import FAQSection from '../components/FAQSection.vue'
import CTASection from '../components/CTASection.vue'
import TheFooter from '../components/TheFooter.vue'
</script>