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
import TheHeader from '../components/landing/TheHeader.vue'
import HeroSection from '../components/landing/HeroSection.vue'
import FeaturesSection from '../components/landing/FeaturesSection.vue'
import ServicesSection from '../components/landing/ServicesSection.vue'
import HelpSeekersSection from '../components/landing/HelpSeekersSection.vue'
import HelpersSection from '../components/landing/HelpersSection.vue'
import SystemOverviewSection from '../components/landing/SystemOverviewSection.vue'
import FAQSection from '../components/landing/FAQSection.vue'
import CTASection from '../components/landing/CTASection.vue'
import TheFooter from '../components/landing/TheFooter.vue'
</script>