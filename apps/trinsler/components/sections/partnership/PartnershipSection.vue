<template>
  <section id="partnership" class="relative py-24 lg:py-40 overflow-hidden matrix-bg">
    <!-- Cyber Grid -->
    <div class="absolute inset-0 cyber-grid opacity-20" />

    <!-- Data Stream Effects -->
    <div class="absolute inset-0">
      <div
        class="animate-data-stream absolute left-1/4 w-1 h-32 bg-gradient-to-b from-transparent via-accent-cyan to-transparent"
        style="animation-delay: 0s"
      />
      <div
        class="animate-data-stream absolute right-1/3 w-1 h-28 bg-gradient-to-b from-transparent via-accent-purple to-transparent"
        style="animation-delay: 1.5s"
      />
    </div>

    <div class="relative container-custom">
      <!-- Partnership Hero Section with People Focus -->
      <div class="mb-20">
        <!-- Hero Background -->
        <div class="relative h-96 rounded-3xl overflow-hidden">
          <img 
            src="/images/gartenfest.jpg" 
            alt="People collaborating on partnership"
            class="w-full h-full object-cover opacity-40"
            onerror="this.style.display='none'"
          />
          <div class="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
          
          <!-- Hero Content -->
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="text-center max-w-4xl">
              <h1 class="text-5xl md:text-6xl font-black text-white mb-6">
                <span class="gradient-text-neon">Have an Idea That Can</span>
                <br />
                <span class="text-accent-cyan">Change Communities?</span>
              </h1>
              <p class="text-xl text-white/90 mb-8">
                We believe in people-powered innovation. Your social vision deserves a partner 
                who understands that technology should serve humanity, not the other way around.
              </p>
              <NuxtLink to="/contact" class="btn-primary text-lg">
                <span class="flex items-center gap-2">
                  <span>🤝</span>
                  <span>Let's Partner Up</span>
                </span>
              </NuxtLink>
            </div>
          </div>
          
          <!-- Floating Partnership Images -->
          <div class="absolute top-10 right-10 w-32 h-32 rounded-full overflow-hidden animate-float border-4 border-white/30">
            <img src="/images/freundeHuckepack.jpg" alt="Partnership handshake" class="w-full h-full object-cover">
          </div>
          <div class="absolute bottom-10 left-10 w-28 h-28 rounded-lg overflow-hidden animate-float" style="animation-delay: -3s;">
            <img src="/images/stadtpark.jpg" alt="Brainstorming session" class="w-full h-full object-cover">
          </div>
        </div>
      </div>

      <!-- Partnership Journey with Images -->
      <div class="mb-20">
        <div class="text-center mb-12">
          <h2 class="text-4xl md:text-5xl font-black text-white mb-6">
            Our Partnership
            <span class="gradient-text-neon">Journey</span>
          </h2>
          <p class="text-xl text-white/80 max-w-3xl mx-auto">
            From idea to impact, we're with you every step of the way
          </p>
        </div>
        
        <div class="space-y-8">
          <div
            v-for="(step, index) in processSteps"
            :key="step.title"
            class="group relative animate-slide-up-stagger"
            :style="`animation-delay: ${index * 0.3}s`"
          >
            <!-- Large Step Card with Image -->
            <div
              class="bg-black/50 backdrop-blur-lg rounded-3xl overflow-hidden transition-all duration-700 hover:scale-[1.02] hover:shadow-2xl hover:shadow-accent-cyan/20"
            >
              <div class="grid md:grid-cols-2 gap-0">
                <!-- Image Side -->
                <div class="relative h-64 md:h-auto order-2 md:order-1">
                  <img
                    :src="step.image"
                    :alt="step.title"
                    class="w-full h-full object-cover"
                    onerror="this.style.display='none'"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:hidden"></div>
                  <div class="absolute bottom-4 left-4 md:hidden">
                    <div class="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <div class="text-white font-bold text-lg">{{ index + 1 }}</div>
                    </div>
                  </div>
                </div>
                
                <!-- Content Side -->
                <div class="p-8 flex flex-col justify-center order-1 md:order-2">
                  <div class="flex items-center gap-4 mb-4">
                    <div class="w-16 h-16 rounded-full bg-gradient-to-r from-logo-bright to-logo-light flex items-center justify-center text-white font-bold text-xl">
                      {{ index + 1 }}
                    </div>
                    <div>
                      <div class="text-accent-cyan text-sm font-medium">Step {{ index + 1 }}</div>
                      <h3 class="text-2xl font-bold text-white">{{ step.title }}</h3>
                    </div>
                  </div>
                  <p class="text-white/80 leading-relaxed text-lg">{{ step.description }}</p>
                  
                  <!-- Step Impact -->
                  <div class="mt-6 bg-white/5 backdrop-blur-sm rounded-xl p-4">
                    <div class="text-accent-cyan text-sm font-semibold mb-2">🎯 Impact Focus</div>
                    <p class="text-white/70 text-sm">{{ step.impact }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Partnership Benefits with Large Images -->
      <div class="space-y-16">
        <div class="text-center">
          <h2 class="text-4xl md:text-5xl font-black text-white mb-6">
            Why Choose
            <span class="gradient-text-neon">Trinsler</span>
            <span class="text-accent-cyan">as Your Partner?</span>
          </h2>
        </div>
        
        <div
          v-for="(benefit, index) in benefits"
          :key="benefit.title"
          class="group relative animate-slide-up-stagger"
          :style="`animation-delay: ${index * 0.3}s`"
        >
          <!-- Large Benefit Card with Image -->
          <div
            class="bg-black/50 backdrop-blur-lg rounded-3xl overflow-hidden transition-all duration-700 hover:scale-[1.02] hover:shadow-2xl hover:shadow-accent-cyan/20"
          >
            <!-- Hero Image Section -->
            <div class="relative h-64 md:h-80 overflow-hidden">
              <!-- Main Benefit Image -->
              <img
                :src="benefit.image"
                :alt="benefit.title"
                class="w-full h-full object-cover"
                onerror="this.style.display='none'"
              />
              
              <!-- Image Overlay with Title -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent">
                <div class="absolute bottom-0 left-0 right-0 p-8">
                  <div class="text-4xl mb-4">{{ benefit.icon }}</div>
                  <h3 class="text-3xl md:text-4xl font-bold text-white">{{ benefit.title }}</h3>
                </div>
              </div>
            </div>

            <!-- Benefit Details -->
            <div class="p-8">
              <div class="max-w-3xl mx-auto text-center">
                <p class="text-xl text-white/80 leading-relaxed mb-8">{{ benefit.description }}</p>
                
                <!-- Partnership Story -->
                <div class="bg-white/5 backdrop-blur-sm rounded-xl p-6 mb-8">
                  <div class="text-accent-cyan text-sm font-semibold mb-3">📖 Real Story</div>
                  <p class="text-white/70 text-sm leading-relaxed">{{ benefit.story }}</p>
                </div>
                
                <!-- Key Metrics -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div class="text-center">
                    <div class="text-2xl font-bold text-accent-cyan mb-1">{{ benefit.metric1 }}</div>
                    <div class="text-white/60 text-sm">{{ benefit.metric1Label }}</div>
                  </div>
                  <div class="text-center">
                    <div class="text-2xl font-bold text-accent-purple mb-1">{{ benefit.metric2 }}</div>
                    <div class="text-white/60 text-sm">{{ benefit.metric2Label }}</div>
                  </div>
                  <div class="text-center">
                    <div class="text-2xl font-bold text-accent-orange mb-1">{{ benefit.metric3 }}</div>
                    <div class="text-white/60 text-sm">{{ benefit.metric3Label }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Final CTA -->
        <div class="text-center">
          <div class="cyber-card rounded-3xl p-8 max-w-4xl mx-auto">
            <h3 class="text-3xl font-bold text-white mb-6">
              Ready to Create
              <span class="gradient-text-neon">Meaningful Impact</span>
              <span class="text-accent-cyan">Together?</span>
            </h3>
            <div class="flex flex-col sm:flex-row items-center justify-center gap-6">
              <NuxtLink to="/contact" class="btn-primary group animate-glow-pulse">
                <span class="flex items-center gap-2">
                  <span>🚀</span>
                  <span>Start Your Impact Project</span>
                </span>
              </NuxtLink>
              <NuxtLink to="/portfolio" class="btn-secondary">
                <span class="flex items-center gap-2">
                  <span>👥</span>
                  <span>View Our Impact Stories</span>
                </span>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Partnership Section Component

const processSteps = [
  {
    title: 'Share Your Vision',
    description: 'Tell us about your social impact idea and the community you want to serve. We listen deeply to understand the human needs behind your vision.',
    image: '/images/wohnzimmer.jpg',
    impact: 'We focus on understanding the real human problem you\'re solving'
  },
  {
    title: 'Initial Consultation',
    description: 'Free video call where we explore feasibility, social impact potential, and how we can best support your mission together.',
    image: '/images/wohnzimmerlachen.jpg',
    impact: 'No pressure, just honest conversation about creating change'
  },
  {
    title: 'Co-Creation & Strategy',
    description: 'Map out features and technical architecture together with community input, ensuring we\'re building what people actually need.',
    image: '/images/kleineKinder.jpg',
    impact: 'Community-driven design ensures real-world relevance'
  },
  {
    title: 'Agile Development',
    description: 'Build your social impact app with regular updates, community feedback loops, and transparent progress every step of the way.',
    image: '/images/wanderung.jpg',
    impact: 'Iterative development keeps community needs at the center'
  },
  {
    title: 'Launch & Grow',
    description: 'Deploy your solution with comprehensive community onboarding, impact tracking, and ongoing support for sustainable growth.',
    image: '/images/lagerfeuer.jpg',
    impact: 'Launch is just the beginning - we support long-term impact'
  }
]

const benefits = [
  {
    icon: '🌍',
    title: 'People First, Always',
    description: 'We prioritize human impact over technical complexity. Every feature, every decision serves to strengthen communities and improve lives. Your success is measured in lives changed, not lines of code.',
    image: '/images/senioren.jpg',
    story: 'When we built Nächstenliebe, we spent weeks in the village talking to seniors and students before writing a single line of code. That\'s why it now serves 250+ community connections.',
    metric1: '100%',
    metric1Label: 'Community Focused',
    metric2: '0',
    metric2Label: 'Compromise on People',
    metric3: '∞',
    metric3Label: 'Care for Impact'
  },
  {
    icon: '💰',
    title: 'Flexible Partnership Model',
    description: 'We combine reduced upfront costs with equity options, creating true partnership alignment. This lowers barriers for social entrepreneurs while ensuring we\'re fully invested in your long-term success.',
    image: '/images/wald.jpg',
    story: 'Our equity partnership with TheraConnect meant they could launch with 15+ therapists while maintaining financial sustainability for long-term impact.',
    metric1: '50%',
    metric1Label: 'Lower Initial Costs',
    metric2: '100%',
    metric2Label: 'Aligned Success',
    metric3: '5+',
    metric3Label: 'Years Partnership'
  },
  {
    icon: '🤝',
    title: 'True Human Partnership',
    description: 'We\'re not just vendors - we\'re your dedicated impact partners. We celebrate your wins, navigate challenges together, and remain committed long after launch because we genuinely care about your mission.',
    image: '/images/stadtpark.jpg',
    story: 'Two years after launching Visit.Ghana, we still meet regularly with the local hosts to ensure the technology continues to serve their evolving needs.',
    metric1: '24/7',
    metric1Label: 'Support Availability',
    metric2: '100%',
    metric2Label: 'Mission Aligned',
    metric3: '∞',
    metric3Label: 'Commitment to Impact'
  }
]
</script>

<style scoped>
/* Partnership specific styles will inherit from global color system */
</style>