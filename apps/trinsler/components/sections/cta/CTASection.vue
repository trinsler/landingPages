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

      <!-- Main CTA Content -->
      <div class="bg-white rounded-2xl p-8 max-w-4xl mx-auto">
        <div class="text-center">
          <h3 class="text-3xl font-bold text-black mb-6" style="font-family: 'Inter', system-ui, -apple-system, sans-serif">
            Your Vision + Our Expertise
            <span style="color: #243463">= Real Impact</span>
          </h3>

          <p class="text-lg text-gray-700 leading-relaxed mb-8" style="font-family: 'Inter', system-ui, -apple-system, sans-serif">
            We're social entrepreneurs who understand that technology should serve people, not the other way around.
            Whether you have a detailed plan or just a spark of an idea, we're here to help you build something that creates real, lasting change in communities.
          </p>

          <div class="flex flex-col sm:flex-row items-center justify-center gap-6">
            <NuxtLink
              to="/contact"
              class="btn-primary"
            >
              Let's Chat About Your Vision
            </NuxtLink>
            <NuxtLink to="/portfolio" class="btn-secondary">
              Meet Our Communities
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Contact Info -->
      <div class="text-center mt-12">
        <div class="bg-white rounded-xl p-6 max-w-2xl mx-auto">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div>
              <div style="color: #243463" class="text-xs font-semibold mb-1">CONTACT</div>
              <div class="text-black">hello@trinsler.com</div>
            </div>
            <div>
              <div style="color: #243463" class="text-xs font-semibold mb-1">LOCATION</div>
              <div class="text-black">Konstanz, Germany</div>
            </div>
            <div>
              <div style="color: #243463" class="text-xs font-semibold mb-1">RESPONSE TIME</div>
              <div class="text-black">Within 24 hours</div>
            </div>
          </div>
        </div>
      </div>

      </div>
  </section>
</template>

<script setup>
// CTA Section Component
</script>

<style scoped>
/* CTA specific styles will inherit from global color system */
</style>