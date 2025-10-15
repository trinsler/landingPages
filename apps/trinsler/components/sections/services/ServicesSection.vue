<template>
  <section id="services" class="relative py-16 lg:py-24" style="background: #243463">
    <div class="relative container-custom">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold text-white mb-6" style="font-family: 'Inter', system-ui, -apple-system, sans-serif">
          Expertise That Serves
          <span style="color: #ffffff">People & Communities</span>
        </h2>
        <p class="text-lg text-white/90 max-w-3xl mx-auto" style="font-family: 'Inter', system-ui, -apple-system, sans-serif">
          We combine technical excellence with deep social impact understanding. 
          Our services are designed to empower communities and create lasting positive change.
        </p>
      </div>

      <!-- Services Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <div
          v-for="(service, index) in services"
          :key="service.title"
          class="group animate-slide-up-stagger"
          :style="`animation-delay: ${index * 0.2}s`"
        >
          <!-- Compact Service Card -->
          <div class="bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-lg h-full flex flex-col">
            <!-- Service Image -->
            <div class="relative h-40 overflow-hidden">
              <img
                :src="service.image"
                :alt="service.title"
                class="w-full h-full object-cover"
                onerror="this.style.display='none'"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              
              <!-- Service Status Badge -->
              <div class="absolute top-4 left-4">
                <span class="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-black text-xs font-medium">
                  {{ service.status }}
                </span>
              </div>
              
              <!-- Service Title -->
              <div class="absolute bottom-4 left-4 right-4">
                <h3 class="text-lg font-bold text-white mb-1">{{ service.title }}</h3>
              </div>
            </div>

            <!-- Service Details -->
            <div class="p-6 flex-1 flex flex-col">
              <p class="text-gray-700 text-sm leading-relaxed mb-4">{{ service.description }}</p>
              
              <!-- Partnership Model -->
              <div class="bg-gray-100 rounded-lg p-4 mb-4">
                <div style="color: #243463" class="text-xs font-semibold mb-1">PARTNERSHIP MODEL</div>
                <div class="text-black text-sm font-medium">{{ service.model }}</div>
              </div>
              
              <!-- Call to Action -->
              <div class="mt-auto">
                <NuxtLink 
                  to="/contact" 
                  class="btn-primary w-full text-center text-sm"
                >
                  Let's Connect
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Why Choose Section -->
      <div class="text-center">
        <div class="bg-white rounded-2xl p-8 max-w-3xl mx-auto">
          <h3 class="text-2xl font-bold text-black mb-4" style="font-family: 'Inter', system-ui, -apple-system, sans-serif">
            Why Choose
            <span style="color: #243463">Trinsler</span>
            for Impact?
          </h3>
          <p class="text-gray-700 leading-relaxed" style="font-family: 'Inter', system-ui, -apple-system, sans-serif">
            Our approach combines technical excellence with genuine care for social impact. 
            We prioritize human connections over technical complexity.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Services Section Component

const services = [
  {
    title: 'Idea to MVP Development',
    description: 'We transform your social impact vision into a functional Minimum Viable Product that serves real community needs. Your idea deserves the best technical foundation with human-centered design at its core.',
    category: 'SOCIAL TECH DEVELOPMENT',
    status: 'AVAILABLE',
    model: 'Flexible Partnership',
    image: '/images/wanderung.jpg',
    communityImage: '/images/freundeHuckepack.jpg',
    impactStory: 'We helped launch Nächstenliebe from concept to 250+ active community connections in just 3 months, demonstrating how rapid MVP development can create immediate social impact.',
    partnershipInfo: 'Reduced initial costs + equity stake for long-term partnership',
    features: [
      'Community needs assessment & validation',
      'Social impact MVP development',
      'User testing with real communities',
      'Scalable architecture for growth',
      'Performance optimization for impact',
      'Launch strategy & community onboarding',
    ],
  },
  {
    title: 'UX/UI Design & Strategy',
    description: 'Human-centered design that puts people first. We create intuitive, accessible, and impactful user experiences that truly serve your community\'s needs and strengthen human connections.',
    category: 'HUMAN-CENTERED DESIGN',
    status: 'AVAILABLE',
    model: 'Community Focus',
    image: '/images/kleineKinder.jpg',
    communityImage: '/images/senioren.jpg',
    impactStory: 'Our UX work with TheraConnect focused on making mental health support more accessible, resulting in a platform that serves 15+ therapists with 95% user satisfaction.',
    partnershipInfo: 'Community-driven design process',
    features: [
      'Community research & user personas',
      'Inclusive wireframing & prototyping',
      'Accessibility-first design system',
      'Multi-language support planning',
      'Mobile-first for community access',
      'Community co-design workshops',
    ],
  },
  {
    title: 'Scalable Tech & Cloud Solutions',
    description: 'We build robust, scalable cloud architectures that ensure your social impact solution can grow and serve more communities without losing performance or reliability.',
    category: 'CLOUD INFRASTRUCTURE',
    status: 'AVAILABLE',
    model: 'Enterprise Ready',
    image: '/images/lagerfeuer.jpg',
    communityImage: '/images/gartenfest.jpg',
    impactStory: 'Designed cloud infrastructure for Visit.Ghana that supports 50+ local hosts while ensuring 99.9% uptime during peak tourist seasons.',
    partnershipInfo: 'Enterprise-grade infrastructure for social good',
    features: [
      'Cloud infrastructure for community scale',
      'Secure data management & privacy',
      'API development for community integration',
      'Security & compliance for sensitive data',
      'Real-time monitoring & impact analytics',
      'Disaster recovery & data protection',
    ],
  },
]

</script>

<style scoped>
/* Services specific styles will inherit from global color system */
</style>