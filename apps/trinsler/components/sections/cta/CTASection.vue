<template>
  <section id="cta" class="relative py-16 lg:py-24" style="background: #243463">
    <div class="relative container-custom">
      <!-- Section Header with Background -->
      <div class="relative mb-16">
        <div class="relative h-64 rounded-2xl overflow-hidden">
          <img 
            src="/images/freundeHuckepack.jpg" 
            alt="People celebrating successful project launch"
            class="w-full h-full object-cover opacity-40"
            onerror="this.style.display='none'"
          />
          <div class="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
          
          <!-- Section Content -->
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="text-center max-w-3xl">
              <h2 class="text-4xl md:text-5xl font-bold text-white mb-4" style="font-family: 'Inter', system-ui, -apple-system, sans-serif">
                Together We Build
                <span style="color: #ffffff">Technology That Changes Lives</span>
              </h2>
              <p class="text-lg text-white/90" style="font-family: 'Inter', system-ui, -apple-system, sans-serif">
                Your social vision deserves expert technical partnership. 
                Let's create something meaningful together.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Merged the two white containers into one unified container -->
      <div class="bg-white rounded-2xl p-8 max-w-4xl mx-auto shadow-lg border border-gray-100">
        <!-- Main CTA Content -->
        <div class="text-center">
          <h3 class="text-3xl font-bold text-black mb-6" style="font-family: 'Inter', system-ui, -apple-system, sans-serif">
            Your Vision + Our Expertise
            <span style="color: #243463">= Real Impact</span>
          </h3>

          <p class="text-lg text-gray-700 leading-relaxed mb-8" style="font-family: 'Inter', system-ui, -apple-system, sans-serif">
            We're social entrepreneurs who understand that technology should serve people, not the other way around.
            Whether you have a detailed plan or just a spark of an idea, we're here to help you build something that creates real, lasting change in communities.
          </p>

          <div class="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
            <NuxtLink
              to="/contact"
              class="btn-primary rounded-lg"
            >
              Let's Chat About Your Vision
            </NuxtLink>
            <NuxtLink 
              to="/portfolio" 
              class="px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 border-2 hover:shadow-lg"
              style="color: #243463; border-color: #243463; background: transparent;"
              @mouseenter="(e) => { e.currentTarget.style.background = '#243463'; e.currentTarget.style.color = 'white' }"
              @mouseleave="(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#243463' }"
            >
              Meet Our Communities
            </NuxtLink>
          </div>
        </div>

        <!-- Added divider to separate the two sections -->
        <div class="border-t border-gray-200 my-8"></div>

        <!-- Contact Info Section -->
        <div>
          <h4 class="text-xl font-bold text-center mb-8" style="color: #243463; font-family: 'Inter', system-ui, -apple-system, sans-serif">
            Ready to Start Your Project?
          </h4>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div class="flex flex-col items-center">
                <div class="w-12 h-12 rounded-full flex items-center justify-center mb-3" style="background: #243463">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <div style="color: #243463" class="text-sm font-bold mb-2 uppercase tracking-wider">CONTACT</div>
                <div class="text-black font-medium text-lg">hello@trinsler.com</div>
                <div class="text-gray-600 text-sm mt-1">We'd love to hear from you</div>
              </div>
            </div>
            
            <div>
              <div class="flex flex-col items-center">
                <div class="w-12 h-12 rounded-full flex items-center justify-center mb-3" style="background: #243463">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </div>
                <div style="color: #243463" class="text-sm font-bold mb-2 uppercase tracking-wider">LOCATION</div>
                <div class="text-black font-medium text-lg">Konstanz, Germany</div>
                <div class="text-gray-600 text-sm mt-1">Heart of Europe</div>
              </div>
            </div>
            
            <div>
              <div class="flex flex-col items-center">
                <div class="w-12 h-12 rounded-full flex items-center justify-center mb-3" style="background: #243463">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div style="color: #243463" class="text-sm font-bold mb-2 uppercase tracking-wider">RESPONSE TIME</div>
                <div class="text-black font-medium text-lg">Within 24 hours</div>
                <div class="text-gray-600 text-sm mt-1">Usually much faster</div>
              </div>
            </div>
          </div>
          
          <!-- Additional Contact Methods -->
          <div class="mt-8 pt-6 border-t border-gray-200">
            <div class="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-gray-600">
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                </svg>
                <span>Prefer a call? We'll schedule one</span>
              </div>
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>Free initial consultation</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// CTA Section Component with TypeScript
</script>

<style scoped>
/* CTA specific styles will inherit from global color system */
</style>
