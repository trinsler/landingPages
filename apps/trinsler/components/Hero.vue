<template>
  <section class="relative min-h-screen overflow-hidden matrix-bg pt-20">
    <!-- Cyber Grid Background -->
    <div class="absolute inset-0 cyber-grid opacity-30" />

    <!-- Data Stream Particles -->
    <div class="absolute inset-0">
      <div
        class="animate-data-stream absolute left-10 w-1 h-20 bg-gradient-to-b from-transparent via-accent-neon to-transparent"
        style="animation-delay: 0s"
      />
      <div
        class="animate-data-stream absolute left-32 w-1 h-16 bg-gradient-to-b from-transparent via-accent-cyan to-transparent"
        style="animation-delay: 1s"
      />
      <div
        class="animate-data-stream absolute right-20 w-1 h-24 bg-gradient-to-b from-transparent via-accent-purple to-transparent"
        style="animation-delay: 2s"
      />
      <div
        class="animate-data-stream absolute right-40 w-1 h-12 bg-gradient-to-b from-transparent via-accent-neon to-transparent"
        style="animation-delay: 3s"
      />
    </div>


    <div class="relative container-custom py-24 lg:py-40">
      <div class="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
        <!-- Left Content -->
        <div class="max-w-2xl">

          <!-- Main Headline -->
          <h1
            class="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-none mb-8 animate-slide-up-stagger"
            style="animation-delay: 0.2s"
          >
            <span class="text-white">TECHNOLOGY FOR</span>
            <br />
            <span
              class="gradient-text-neon font-extrabold"
              style="font-family: 'Space Grotesk', sans-serif"
            >
              SOCIAL IMPACT
            </span>
            <br />
            <span class="text-blue-400">COMMUNITY. COMPASS.</span>
          </h1>

          <!-- Value Proposition -->
          <div class="mb-10 animate-slide-up-stagger" style="animation-delay: 0.4s">
            <div class="cyber-card rounded-xl p-6">
              <div class="text-accent-primary text-sm mb-3">Social-Tech Pioneers</div>
              <p class="text-lg leading-relaxed text-white/90 mb-4">
                We build <span class="font-bold text-blue-400">technology that connects people and strengthens communities</span>. 
                From <span class="font-bold text-blue-400">"Nächstenliebe"</span> – the platform connecting students with seniors in their village – to global social-tech innovations.
              </p>
              <p class="text-white/80">
                <span class="text-blue-300">Our Mission:</span> Technology for social progress<br />
                <span class="text-blue-400">Focus:</span> Community-based solutions with real impact<br />
                <span class="text-blue-500">Philosophy:</span> Technology should build bridges, not walls
              </p>
            </div>
          </div>

          <!-- Cyber CTAs -->
          <div
            class="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-12 animate-slide-up-stagger"
            style="animation-delay: 0.6s"
          >
            <NuxtLink to="/contact" class="btn-primary group animate-glow-pulse">
              <span>Start Your Social-Tech Project</span>
            </NuxtLink>
            <NuxtLink to="/portfolio" class="btn-secondary magnetic-hover">
              View Impact Stories
            </NuxtLink>
          </div>

          <!-- Key Benefits -->
          <div
            class="grid grid-cols-3 gap-8 animate-slide-up-stagger"
            style="animation-delay: 0.8s"
          >
            <div class="neon-card rounded-xl p-4 text-center magnetic-hover">
              <div class="text-xs text-accent-cyan mb-1">Impact</div>
              <div class="text-3xl font-black text-glow-blue mb-1">100%</div>
              <div class="text-xs text-white/60">Social Focus</div>
            </div>
            <div class="cyber-card rounded-xl p-4 text-center magnetic-hover">
              <div class="text-xs text-accent-purple mb-1">Communities</div>
              <div class="text-3xl font-black text-glow-cyan mb-1">12+</div>
              <div class="text-xs text-white/60">Projects Active</div>
            </div>
            <div class="glass-card rounded-xl p-4 text-center magnetic-hover">
              <div class="text-xs text-accent-primary mb-1">Founded</div>
              <div class="text-3xl font-black text-white mb-1 animate-glitch">2025</div>
              <div class="text-xs text-white/60">Innovation & Growth</div>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- Bottom Gradient Fade -->
    <div
      class="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-base-bg to-transparent"
    />
  </section>
</template>

<script setup>
// No icons needed
</script>
