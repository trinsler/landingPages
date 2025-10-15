<template>
  <section class="relative min-h-screen overflow-hidden" style="padding-top: 5rem">
    <!-- Hero Background with Single Image -->
    <div class="absolute inset-0">
      <img 
        src="/images/gartenfest.jpg" 
        alt="Community celebration and connection"
        class="w-full h-full object-cover"
        onerror="this.style.display='none'"
      />
      
      <!-- Modern Gradient Overlay -->
      <div class="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80"></div>
      
      <!-- Subtle Pattern Overlay -->
      <div class="absolute inset-0 opacity-30">
        <div class="absolute top-10 left-10 w-32 h-32 rounded-full bg-white/10 blur-3xl"></div>
        <div class="absolute bottom-20 right-20 w-48 h-48 rounded-full bg-white/10 blur-3xl"></div>
        <div class="absolute top-1/3 right-1/4 w-24 h-24 rounded-full bg-white/10 blur-2xl"></div>
      </div>
    </div>

    <div class="relative container-custom min-h-screen flex items-center justify-center">
      <!-- Enhanced Logo and Content Container -->
      <div class="text-center max-w-6xl mx-auto">
        <!-- Prominent Logo Integration -->
        <div class="mb-12 animate-slide-up-stagger">
          <div class="inline-flex items-center justify-center w-40 h-40 rounded-full bg-white/15 backdrop-blur-lg border border-white/30 p-8 hover:scale-105 transition-all duration-500 shadow-2xl">
            <div class="relative">
              <!-- Glow Effect -->
              <div class="absolute inset-0 rounded-full bg-white/10 blur-xl"></div>
              <!-- Logo with Rounded Corners -->
              <img src="/images/logo.png" alt="Trinsler Logo" class="w-full h-full object-contain relative z-10 filter brightness-110 drop-shadow-lg rounded-xl">
              <!-- Highlight Ring -->
              <div class="absolute -inset-2 rounded-full border-2 border-white/20"></div>
            </div>
          </div>
        </div>
        
        <!-- Enhanced Main Content -->
        <div class="animate-slide-up-stagger">
          <!-- Enhanced Main Headline -->
          <h1
            class="tracking-tight leading-[1.1] mb-10 text-white drop-shadow-2xl"
            style="animation-delay: 0.2s; font-family: 'Inter', system-ui, -apple-system, sans-serif"
          >
            <span class="block mb-3 text-5xl sm:text-6xl lg:text-8xl font-bold text-white">People First.</span>
            <span class="block text-4xl sm:text-5xl lg:text-6xl font-semibold text-white opacity-95">Building Apps That</span>
            <span class="block text-4xl sm:text-5xl lg:text-6xl font-semibold text-white opacity-95">Change Lives</span>
          </h1>
          <p class="text-xl lg:text-2xl text-white max-w-2xl leading-relaxed animate-slide-up-stagger" style="animation-delay: 0.4s; font-family: 'Inter', system-ui, -apple-system, sans-serif">
            We create social impact technology that strengthens communities and fosters meaningful human connections.
          </p>
        </div>
      </div>
    </div>

    </section>

  <!-- Value Proposition - Professional Section -->
  <section class="w-full py-12 bg-white">
    <div class="max-w-4xl mx-auto px-6">
      <div class="text-center">
        <div class="text-lg font-semibold mb-4" style="color: #243463">Social-Tech with Human Heart</div>
        <p class="text-xl leading-relaxed" style="color: #000000">
          We are not just developers. We are 
          <span class="font-semibold" style="color: #243463">social entrepreneurs</span> 
          who build technology that strengthens human connections. Every line of code serves a purpose: to create positive change in communities.
        </p>
      </div>
    </div>
  </section>

  <!-- Continue Hero Content -->
  <section class="relative" style="background: #243463">
    <div class="relative container-custom py-12">
      <div class="text-center max-w-2xl mx-auto">
        </div>
    </div>
  </section>
</template>

<script setup>
useHead({
  title: 'Trinsler - People First Technology | Social Impact App Development',
  meta: [
    {
      name: 'description',
      content:
        'We build technology that strengthens human connections. Trinsler creates social impact apps that change lives. From community platforms to healthcare solutions - technology with purpose.',
    },
    {
      name: 'keywords',
      content: 'social impact technology, community apps, social entrepreneurship, human-centered development, people first technology'
    }
  ],
})
</script>

<style scoped>
/* Hero specific animations and styles will inherit from global */
</style>