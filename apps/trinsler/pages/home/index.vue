<template>
  <div>
    <!-- Loading Screen -->
    <div v-if="loading" class="loading-screen">
      <div class="loading-content">
        <!-- Logo Animation -->
        <div class="logo-container">
          <div class="logo-wrapper">
            <!-- Glow Effects -->
            <div class="glow-ring glow-ring-1"></div>
            <div class="glow-ring glow-ring-2"></div>
            <div class="glow-ring glow-ring-3"></div>
            
            <!-- Logo -->
            <img 
              src="/images/logo.png" 
              alt="Trinsler Logo" 
              class="logo-image"
            />
          </div>
        </div>
        
        <!-- Brand Name -->
        <h1 class="brand-name">Trinsler</h1>
        
        <!-- Loading Text -->
        <p class="loading-text">Building impact, one line at a time...</p>
        
        <!-- Progress Dots -->
        <div class="progress-dots">
          <div class="dot dot-1"></div>
          <div class="dot dot-2"></div>
          <div class="dot dot-3"></div>
        </div>
      </div>
    </div>

    <!-- Homepage Sections -->
    <HeroSection />
    <PortfolioSection />
    <ServicesSection />
    <CTASection />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Import all section components
import HeroSection from '~/components/sections/hero/HeroSection.vue'
import PortfolioSection from '~/components/sections/portfolio/PortfolioSection.vue'
import ServicesSection from '~/components/sections/services/ServicesSection.vue'
import CTASection from '~/components/sections/cta/CTASection.vue'

// Loading state
const loading = ref(true)

// Simulate loading
onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 1000)
})

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

<style scoped>
.loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #243463 0%, #1a2444 50%, #243463 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  transition: opacity 0.8s ease;
}

.loading-content {
  text-align: center;
  position: relative;
}

/* Logo Container */
.logo-container {
  margin-bottom: 2rem;
}

.logo-wrapper {
  position: relative;
  width: 120px;
  height: 120px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Logo Image */
.logo-image {
  width: 80px;
  height: 80px;
  object-fit: contain;
  position: relative;
  z-index: 10;
  filter: brightness(1.1) drop-shadow(0 0 20px rgba(255, 255, 255, 0.3));
  animation: logoFloat 3s ease-in-out infinite, logoPulse 2s ease-in-out infinite;
  border-radius: 12px;
}

/* Glow Rings Animation */
.glow-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  animation: glowExpand 3s ease-out infinite;
}

.glow-ring-1 {
  width: 100px;
  height: 100px;
  animation-delay: 0s;
}

.glow-ring-2 {
  width: 100px;
  height: 100px;
  animation-delay: 1s;
}

.glow-ring-3 {
  width: 100px;
  height: 100px;
  animation-delay: 2s;
}

/* Brand Name */
.brand-name {
  font-size: 2.5rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 1rem;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  animation: brandFadeIn 1s ease-out 0.5s both, brandGlow 3s ease-in-out infinite;
}

/* Loading Text */
.loading-text {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 2rem;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  animation: textFadeIn 1s ease-out 0.8s both;
}

/* Progress Dots */
.progress-dots {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 1rem;
}

.dot {
  width: 8px;
  height: 8px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  animation: dotPulse 1.5s ease-in-out infinite;
}

.dot-1 {
  animation-delay: 0s;
}

.dot-2 {
  animation-delay: 0.3s;
}

.dot-3 {
  animation-delay: 0.6s;
}

/* Animations */
@keyframes logoFloat {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes logoPulse {
  0%, 100% {
    filter: brightness(1.1) drop-shadow(0 0 20px rgba(255, 255, 255, 0.3));
  }
  50% {
    filter: brightness(1.3) drop-shadow(0 0 30px rgba(255, 255, 255, 0.5));
  }
}

@keyframes glowExpand {
  0% {
    width: 100px;
    height: 100px;
    opacity: 0.8;
    border-color: rgba(255, 255, 255, 0.3);
  }
  100% {
    width: 140px;
    height: 140px;
    opacity: 0;
    border-color: rgba(255, 255, 255, 0);
  }
}

@keyframes brandFadeIn {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes brandGlow {
  0%, 100% {
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  }
  50% {
    text-shadow: 0 2px 20px rgba(255, 255, 255, 0.2);
  }
}

@keyframes textFadeIn {
  0% {
    opacity: 0;
    transform: translateY(15px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes dotPulse {
  0%, 100% {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1);
  }
  50% {
    background: rgba(255, 255, 255, 0.8);
    transform: scale(1.2);
  }
}
</style>