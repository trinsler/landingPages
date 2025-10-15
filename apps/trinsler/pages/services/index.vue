<template>
  <div>
    <!-- Hero Section with Image -->
    <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
      <!-- Hero Background Image -->
      <div class="absolute inset-0">
        <img 
          src="/images/lagerfeuer.jpg" 
          alt="Team collaboration and community building" 
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80"></div>
      </div>

      <div class="relative container-custom z-10 text-center">
        <div class="max-w-4xl mx-auto">
          <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.2]" style="font-family: 'Inter', system-ui, -apple-system, sans-serif">
            Expertise That
            <br />
            <span style="color: #ffffff">Serves Communities</span>
          </h1>
          <p class="text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-12" style="font-family: 'Inter', system-ui, -apple-system, sans-serif">
            We combine technical excellence with deep social impact understanding. Our services are designed to empower communities and create lasting positive change.
          </p>
          <div class="flex flex-col sm:flex-row items-center justify-center gap-6">
            <NuxtLink to="/portfolio" class="btn-primary">
              See Our Work
            </NuxtLink>
            <NuxtLink to="/contact" class="btn-secondary">
              Start Your Project
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Section (same as homepage) -->
    <ServicesSection />

    <!-- Visual Impact Section -->
    <section class="py-16 lg:py-24 bg-white">
      <div class="container-custom">
        <div class="text-center mb-16">
          <h2 class="text-3xl lg:text-4xl font-bold text-black mb-4" style="font-family: 'Inter', system-ui, -apple-system, sans-serif">
            Technology
            <span style="color: #243463">in Action</span>
          </h2>
          <p class="text-lg text-gray-700 max-w-2xl mx-auto" style="font-family: 'Inter', system-ui, -apple-system, sans-serif">
            See how our work creates real impact in communities through thoughtful technology solutions.
          </p>
        </div>

        <div class="grid lg:grid-cols-3 gap-8">
          <div class="animate-slide-up-stagger">
            <div class="relative overflow-hidden rounded-3xl shadow-xl hover:scale-[1.02] transition-all duration-500">
              <img 
                src="/images/wohnzimmer.jpg" 
                alt="Community gathering and social connections" 
                class="w-full h-64 object-cover"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div class="absolute bottom-0 left-0 right-0 p-6">
                <h3 class="text-xl font-bold text-white mb-2" style="font-family: 'Inter', system-ui, -apple-system, sans-serif">
                  Community Building
                </h3>
                <p class="text-white/80 text-sm">
                  Creating spaces where technology brings people together rather than apart.
                </p>
              </div>
            </div>
          </div>

          <div class="animate-slide-up-stagger" style="animation-delay: 0.2s">
            <div class="relative overflow-hidden rounded-3xl shadow-xl hover:scale-[1.02] transition-all duration-500">
              <img 
                src="/images/kleineKinder.jpg" 
                alt="Next generation benefiting from thoughtful technology" 
                class="w-full h-64 object-cover"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div class="absolute bottom-0 left-0 right-0 p-6">
                <h3 class="text-xl font-bold text-white mb-2" style="font-family: 'Inter', system-ui, -apple-system, sans-serif">
                  Future Impact
                </h3>
                <p class="text-white/80 text-sm">
                  Building technology that serves the next generation and creates lasting change.
                </p>
              </div>
            </div>
          </div>

          <div class="animate-slide-up-stagger" style="animation-delay: 0.4s">
            <div class="relative overflow-hidden rounded-3xl shadow-xl hover:scale-[1.02] transition-all duration-500">
              <img 
                src="/images/stadtpark.jpg" 
                alt="Urban community spaces enhanced by technology" 
                class="w-full h-64 object-cover"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div class="absolute bottom-0 left-0 right-0 p-6">
                <h3 class="text-xl font-bold text-white mb-2" style="font-family: 'Inter', system-ui, -apple-system, sans-serif">
                  Urban Innovation
                </h3>
                <p class="text-white/80 text-sm">
                  Transforming urban spaces through thoughtful digital integration.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Process Section -->
    <section class="py-16 lg:py-24 bg-white">
      <div class="container-custom">
        <div class="text-center mb-16">
          <h2 class="text-3xl lg:text-4xl font-bold text-black mb-4" style="font-family: 'Inter', system-ui, -apple-system, sans-serif">
            How We
            <span style="color: #243463">Work Together</span>
          </h2>
          <p class="text-lg text-gray-700 max-w-2xl mx-auto" style="font-family: 'Inter', system-ui, -apple-system, sans-serif">
            Our process is designed to ensure your vision becomes reality with maximum impact and minimal stress.
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div class="animate-slide-up-stagger">
            <div class="bg-gray-100 rounded-2xl p-6 text-center h-full hover:scale-[1.02] transition-all duration-300 hover:shadow-lg">
              <div class="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" style="background: #243463">
                <span class="text-2xl font-bold text-white">1</span>
              </div>
              <h3 class="text-xl font-bold text-black mb-3" style="font-family: 'Inter', system-ui, -apple-system, sans-serif">
                Discovery
              </h3>
              <p class="text-gray-700 text-sm leading-relaxed">
                We listen to your vision and understand the community you want to serve.
              </p>
            </div>
          </div>

          <div class="animate-slide-up-stagger" style="animation-delay: 0.2s">
            <div class="bg-gray-100 rounded-2xl p-6 text-center h-full hover:scale-[1.02] transition-all duration-300 hover:shadow-lg">
              <div class="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" style="background: #243463">
                <span class="text-2xl font-bold text-white">2</span>
              </div>
              <h3 class="text-xl font-bold text-black mb-3" style="font-family: 'Inter', system-ui, -apple-system, sans-serif">
                Strategy
              </h3>
              <p class="text-gray-700 text-sm leading-relaxed">
                We co-create a strategic plan with community input and technical requirements.
              </p>
            </div>
          </div>

          <div class="animate-slide-up-stagger" style="animation-delay: 0.4s">
            <div class="bg-gray-100 rounded-2xl p-6 text-center h-full hover:scale-[1.02] transition-all duration-300 hover:shadow-lg">
              <div class="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" style="background: #243463">
                <span class="text-2xl font-bold text-white">3</span>
              </div>
              <h3 class="text-xl font-bold text-black mb-3" style="font-family: 'Inter', system-ui, -apple-system, sans-serif">
                Development
              </h3>
              <p class="text-gray-700 text-sm leading-relaxed">
                We build your solution with iterative feedback loops and community testing.
              </p>
            </div>
          </div>

          <div class="animate-slide-up-stagger" style="animation-delay: 0.6s">
            <div class="bg-gray-100 rounded-2xl p-6 text-center h-full hover:scale-[1.02] transition-all duration-300 hover:shadow-lg">
              <div class="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" style="background: #243463">
                <span class="text-2xl font-bold text-white">4</span>
              </div>
              <h3 class="text-xl font-bold text-black mb-3" style="font-family: 'Inter', system-ui, -apple-system, sans-serif">
                Impact
              </h3>
              <p class="text-gray-700 text-sm leading-relaxed">
                We launch, support, and scale your solution for lasting community impact.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Partnership Benefits -->
    <section class="py-16 lg:py-24" style="background: #243463">
      <div class="container-custom">
        <div class="text-center mb-16">
          <h2 class="text-3xl lg:text-4xl font-bold text-white mb-4" style="font-family: 'Inter', system-ui, -apple-system, sans-serif">
            Why Choose
            <span style="color: #ffffff">Trinsler</span>
          </h2>
          <p class="text-lg text-white/90 max-w-2xl mx-auto" style="font-family: 'Inter', system-ui, -apple-system, sans-serif">
            Our approach combines technical excellence with genuine care for social impact.
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <div class="animate-slide-up-stagger">
            <div class="bg-white rounded-2xl p-8 text-center h-full hover:scale-[1.02] transition-all duration-300 hover:shadow-lg">
              <div class="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center" style="background: #243463">
                <div class="text-3xl font-bold text-white">1</div>
              </div>
              <h3 class="text-xl font-bold text-black mb-4" style="font-family: 'Inter', system-ui, -apple-system, sans-serif">
                People First, Always
              </h3>
              <p class="text-gray-700 leading-relaxed">
                We prioritize human impact over technical complexity. Every feature serves to strengthen communities and improve lives.
              </p>
            </div>
          </div>

          <div class="animate-slide-up-stagger" style="animation-delay: 0.2s">
            <div class="bg-white rounded-2xl p-8 text-center h-full hover:scale-[1.02] transition-all duration-300 hover:shadow-lg">
              <div class="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center" style="background: #243463">
                <div class="text-3xl font-bold text-white">2</div>
              </div>
              <h3 class="text-xl font-bold text-black mb-4" style="font-family: 'Inter', system-ui, -apple-system, sans-serif">
                Community Co-Creation
              </h3>
              <p class="text-gray-700 leading-relaxed">
                We don't build for communities - we build with them. Our process includes community members at every step.
              </p>
            </div>
          </div>

          <div class="animate-slide-up-stagger" style="animation-delay: 0.4s">
            <div class="bg-white rounded-2xl p-8 text-center h-full hover:scale-[1.02] transition-all duration-300 hover:shadow-lg">
              <div class="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center" style="background: #243463">
                <div class="text-3xl font-bold text-white">3</div>
              </div>
              <h3 class="text-xl font-bold text-black mb-4" style="font-family: 'Inter', system-ui, -apple-system, sans-serif">
                Heart & Technology
              </h3>
              <p class="text-gray-700 leading-relaxed">
                Technical excellence meets human compassion. We bring both expertise and deep understanding of social impact.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 lg:py-24 bg-white">
      <div class="container-custom">
        <div class="bg-white rounded-2xl p-8 max-w-4xl mx-auto shadow-lg">
          <div class="text-center">
            <h2 class="text-3xl lg:text-4xl font-bold text-black mb-4" style="font-family: 'Inter', system-ui, -apple-system, sans-serif">
              Ready to Create
              <span style="color: #243463">Social Impact?</span>
            </h2>
            <p class="text-lg text-gray-700 leading-relaxed mb-8" style="font-family: 'Inter', system-ui, -apple-system, sans-serif">
              Whether you have a detailed plan or just a spark of an idea, we're here to help you build something that creates real, lasting change.
            </p>
            <div class="flex flex-col sm:flex-row items-center justify-center gap-6">
              <NuxtLink to="/contact" class="btn-primary">
                Let's Discuss Your Vision
              </NuxtLink>
              <NuxtLink to="/portfolio" class="btn-secondary">
                See Our Work
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer Component -->
    <AppFooter />
  </div>
</template>

<script setup>
// SEO Meta
useHead({
  title: 'Services - Trinsler | People First Technology Services',
  meta: [
    {
      name: 'description',
      content: 'Trinsler offers comprehensive technology services including MVP development, UX/UI design, and scalable solutions. People-first approach to social impact technology.',
    },
    {
      name: 'keywords',
      content: 'technology services, MVP development, UX design, social impact technology, web development, app development'
    }
  ]
})
</script>

<style scoped>
/* Services page specific styles will inherit from global color system */
</style>