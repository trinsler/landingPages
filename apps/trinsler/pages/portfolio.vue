<template>
  <div>
    <!-- Hero Section with Image -->
    <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
      <!-- Hero Background Image -->
      <div class="absolute inset-0">
        <img 
          src="/images/wald.jpg" 
          alt="Community projects and technology impact" 
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80"></div>
      </div>

      <div class="relative container-custom z-10 text-center">
        <div class="max-w-4xl mx-auto">
          <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.2]" style="font-family: 'Inter', system-ui, -apple-system, sans-serif">
            Projects That
            <br />
            <span style="color: #ffffff">Empower Communities</span>
          </h1>
          <p class="text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-12" style="font-family: 'Inter', system-ui, -apple-system, sans-serif">
            Our social impact projects strengthen human connections and create meaningful change in communities worldwide.
          </p>
          <div class="flex flex-col sm:flex-row items-center justify-center gap-6">
            <NuxtLink to="/contact" class="btn-primary">
              Share Your Idea
            </NuxtLink>
            <NuxtLink to="/services" class="btn-secondary">
              Learn How We Work
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Portfolio Section (same as homepage) -->
    <PortfolioSection />

    <!-- Project Stories Section -->
    <section class="py-16 lg:py-24 bg-white">
      <div class="container-custom">
        <div class="text-center mb-16">
          <h2 class="text-3xl lg:text-4xl font-bold text-black mb-4" style="font-family: 'Inter', system-ui, -apple-system, sans-serif">
            Project
            <span style="color: #243463">Stories</span>
          </h2>
          <p class="text-lg text-gray-700 max-w-2xl mx-auto" style="font-family: 'Inter', system-ui, -apple-system, sans-serif">
            Behind every project are real communities and lives being transformed through thoughtful technology.
          </p>
        </div>

        <div class="grid lg:grid-cols-2 gap-12">
          <!-- Story 1 -->
          <div class="animate-slide-up-stagger">
            <div class="relative overflow-hidden rounded-3xl shadow-xl hover:scale-[1.02] transition-all duration-500">
              <img 
                src="/images/wohnzimmerlachen.jpg" 
                alt="Community joy and connection through technology" 
                class="w-full h-80 object-cover"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div class="absolute bottom-0 left-0 right-0 p-8">
                <div class="flex items-center gap-3 mb-4">
                  <div class="w-3 h-3 rounded-full bg-white"></div>
                  <span class="text-white/80 text-sm uppercase tracking-wider">Impact Story</span>
                </div>
                <h3 class="text-2xl font-bold text-white mb-3" style="font-family: 'Inter', system-ui, -apple-system, sans-serif">
                  Building Bridges Between Generations
                </h3>
                <p class="text-white/90 leading-relaxed">
                  Through Nächstenliebe, we've created meaningful connections that reduce isolation and build stronger, more supportive communities.
                </p>
              </div>
            </div>
          </div>

          <!-- Story 2 -->
          <div class="animate-slide-up-stagger" style="animation-delay: 0.2s">
            <div class="relative overflow-hidden rounded-3xl shadow-xl hover:scale-[1.02] transition-all duration-500">
              <img 
                src="/images/wanderung.jpg" 
                alt="Community journey and progress through technology" 
                class="w-full h-80 object-cover"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div class="absolute bottom-0 left-0 right-0 p-8">
                <div class="flex items-center gap-3 mb-4">
                  <div class="w-3 h-3 rounded-full bg-white"></div>
                  <span class="text-white/80 text-sm uppercase tracking-wider">Development Journey</span>
                </div>
                <h3 class="text-2xl font-bold text-white mb-3" style="font-family: 'Inter', system-ui, -apple-system, sans-serif">
                  From Idea to Impact
                </h3>
                <p class="text-white/90 leading-relaxed">
                  Our iterative development process ensures every feature serves real community needs and creates lasting positive change.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Stats with Images -->
        <div class="grid md:grid-cols-3 gap-8 mt-16">
          <div class="animate-slide-up-stagger">
            <div class="relative overflow-hidden rounded-2xl">
              <img 
                src="/images/freundeHuckepack.jpg" 
                alt="Community connections" 
                class="w-full h-48 object-cover"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div class="absolute bottom-4 left-4 right-4 text-center">
                <div class="text-3xl font-bold text-white mb-1">250+</div>
                <div class="text-white/90 text-sm">Community Connections</div>
              </div>
            </div>
          </div>

          <div class="animate-slide-up-stagger" style="animation-delay: 0.2s">
            <div class="relative overflow-hidden rounded-2xl">
              <img 
                src="/images/senioren.jpg" 
                alt="Senior care and support" 
                class="w-full h-48 object-cover"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div class="absolute bottom-4 left-4 right-4 text-center">
                <div class="text-3xl font-bold text-white mb-1">15+</div>
                <div class="text-white/90 text-sm">Therapy Professionals</div>
              </div>
            </div>
          </div>

          <div class="animate-slide-up-stagger" style="animation-delay: 0.4s">
            <div class="relative overflow-hidden rounded-2xl">
              <img 
                src="/images/kleineKinder.jpg" 
                alt="Youth and future impact" 
                class="w-full h-48 object-cover"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div class="absolute bottom-4 left-4 right-4 text-center">
                <div class="text-3xl font-bold text-white mb-1">50+</div>
                <div class="text-white/90 text-sm">Local Hosts</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Impact Section -->
    <section class="py-16 lg:py-24 bg-white">
      <div class="container-custom">
        <div class="text-center mb-16">
          <h2 class="text-3xl lg:text-4xl font-bold text-black mb-4" style="font-family: 'Inter', system-ui, -apple-system, sans-serif">
            Real Impact,
            <span style="color: #243463">Real Stories</span>
          </h2>
          <p class="text-lg text-gray-700 max-w-2xl mx-auto" style="font-family: 'Inter', system-ui, -apple-system, sans-serif">
            Behind every project are real people whose lives are being transformed through technology that serves humanity.
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <div class="animate-slide-up-stagger">
            <div class="bg-gray-100 rounded-2xl p-8 text-center hover:scale-[1.02] transition-all duration-300 hover:shadow-lg">
              <div class="text-4xl font-bold mb-4" style="color: #243463">250+</div>
              <h3 class="text-xl font-bold text-black mb-3" style="font-family: 'Inter', system-ui, -apple-system, sans-serif">
                Community Connections
              </h3>
              <p class="text-gray-700 text-sm leading-relaxed">
                Through Nächstenliebe, we've created meaningful intergenerational connections that reduce isolation and build stronger communities.
              </p>
            </div>
          </div>

          <div class="animate-slide-up-stagger" style="animation-delay: 0.2s">
            <div class="bg-gray-100 rounded-2xl p-8 text-center hover:scale-[1.02] transition-all duration-300 hover:shadow-lg">
              <div class="text-4xl font-bold mb-4" style="color: #243463">15+</div>
              <h3 class="text-xl font-bold text-black mb-3" style="font-family: 'Inter', system-ui, -apple-system, sans-serif">
                Mental Health Professionals
              </h3>
              <p class="text-gray-700 text-sm leading-relaxed">
                TheraConnect is making therapy more accessible by connecting patients with the right mental health professionals for their specific needs.
              </p>
            </div>
          </div>

          <div class="animate-slide-up-stagger" style="animation-delay: 0.4s">
            <div class="bg-gray-100 rounded-2xl p-8 text-center hover:scale-[1.02] transition-all duration-300 hover:shadow-lg">
              <div class="text-4xl font-bold mb-4" style="color: #243463">50+</div>
              <h3 class="text-xl font-bold text-black mb-3" style="font-family: 'Inter', system-ui, -apple-system, sans-serif">
                Local Hosts
              </h3>
              <p class="text-gray-700 text-sm leading-relaxed">
                Visit.Ghana will support local hosts by providing authentic cultural experiences that ensure tourism revenue flows directly into communities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Process Section -->
    <section class="py-16 lg:py-24" style="background: #243463">
      <div class="container-custom">
        <div class="text-center mb-16">
          <h2 class="text-3xl lg:text-4xl font-bold text-white mb-4" style="font-family: 'Inter', system-ui, -apple-system, sans-serif">
            How We Select
            <span style="color: #ffffff">Our Projects</span>
          </h2>
          <p class="text-lg text-white/90 max-w-2xl mx-auto" style="font-family: 'Inter', system-ui, -apple-system, sans-serif">
            Every project we partner with must meet our criteria for creating meaningful social impact.
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div class="animate-slide-up-stagger">
            <div class="bg-white rounded-2xl p-6 text-center h-full hover:scale-[1.02] transition-all duration-300 hover:shadow-lg">
              <div class="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" style="background: #243463">
                <div class="text-2xl font-bold text-white">1</div>
              </div>
              <h3 class="text-xl font-bold text-black mb-3" style="font-family: 'Inter', system-ui, -apple-system, sans-serif">
                Social Need
              </h3>
              <p class="text-gray-700 text-sm leading-relaxed">
                Addresses a genuine community need with potential for meaningful impact.
              </p>
            </div>
          </div>

          <div class="animate-slide-up-stagger" style="animation-delay: 0.2s">
            <div class="bg-white rounded-2xl p-6 text-center h-full hover:scale-[1.02] transition-all duration-300 hover:shadow-lg">
              <div class="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" style="background: #243463">
                <div class="text-2xl font-bold text-white">2</div>
              </div>
              <h3 class="text-xl font-bold text-black mb-3" style="font-family: 'Inter', system-ui, -apple-system, sans-serif">
                Community Input
              </h3>
              <p class="text-gray-700 text-sm leading-relaxed">
                Developed with and for the communities it serves to ensure relevance.
              </p>
            </div>
          </div>

          <div class="animate-slide-up-stagger" style="animation-delay: 0.4s">
            <div class="bg-white rounded-2xl p-6 text-center h-full hover:scale-[1.02] transition-all duration-300 hover:shadow-lg">
              <div class="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" style="background: #243463">
                <div class="text-2xl font-bold text-white">3</div>
              </div>
              <h3 class="text-xl font-bold text-black mb-3" style="font-family: 'Inter', system-ui, -apple-system, sans-serif">
                Scalable Solution
              </h3>
              <p class="text-gray-700 text-sm leading-relaxed">
                Has potential to grow and serve more communities over time.
              </p>
            </div>
          </div>

          <div class="animate-slide-up-stagger" style="animation-delay: 0.6s">
            <div class="bg-white rounded-2xl p-6 text-center h-full hover:scale-[1.02] transition-all duration-300 hover:shadow-lg">
              <div class="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" style="background: #243463">
                <div class="text-2xl font-bold text-white">4</div>
              </div>
              <h3 class="text-xl font-bold text-black mb-3" style="font-family: 'Inter', system-ui, -apple-system, sans-serif">
                Strong Partnership
              </h3>
              <p class="text-gray-700 text-sm leading-relaxed">
                Led by passionate founders committed to long-term social impact.
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
              Have a Project That
              <span style="color: #243463">Creates Impact?</span>
            </h2>
            <p class="text-lg text-gray-700 leading-relaxed mb-8" style="font-family: 'Inter', system-ui, -apple-system, sans-serif">
              If you have an idea for technology that can strengthen communities and create meaningful change, we want to hear from you.
            </p>
            <div class="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
            <NuxtLink
              to="/contact"
              class="btn-primary rounded-lg"
            >
            Share Your Impact Idea
          </NuxtLink>
            <NuxtLink 
              to="/portfolio" 
              class="px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 border-2 hover:shadow-lg"
              style="color: #243463; border-color: #243463; background: transparent;"
              @mouseenter="(e) => { e.currentTarget.style.background = '#243463'; e.currentTarget.style.color = 'white' }"
              @mouseleave="(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#243463' }"
            >
            Learn About Our Services
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
  title: 'Portfolio - Trinsler | Social Impact Projects',
  meta: [
    {
      name: 'description',
      content: 'Our social impact projects: Nächstenliebe connecting generations, TheraConnect making mental health accessible, Visit.Ghana enabling cultural exchange.',
    },
    {
      name: 'keywords',
      content: 'social impact projects, community technology, Nächstenliebe, TheraConnect, Visit.Ghana, social entrepreneurship, tech for good'
    }
  ]
})
</script>

<style scoped>
/* Portfolio page specific styles will inherit from global color system */
</style>