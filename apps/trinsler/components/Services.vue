<template>
  <section class="relative py-24 lg:py-40 overflow-hidden matrix-bg pt-24">
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
      <!-- Cyber Section Header -->
      <div class="text-center max-w-4xl mx-auto mb-24">
        <div
          class="inline-flex items-center neon-card rounded-full px-6 py-3 text-sm font-semibold mb-6 animate-neon-flicker"
        >
          <span class="text-blue-400">Projects</span>
          <span class="text-white ml-2">Active</span>
        </div>

        <h2 class="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6">
          From Concept to
          <span class="gradient-text-neon animate-glitch">Community</span>
          <br />
          <span class="text-blue-400">Our Current Projects</span>
        </h2>

        <div class="cyber-card rounded-xl p-8 max-w-3xl mx-auto">
          <div class="text-blue-400 text-sm mb-3">We don't just talk about change; we build it</div>
          <p class="text-lg text-white/90 leading-relaxed">
            <span class="text-blue-500">How we work:</span> We develop technology solutions that create real social impact. From hyper-local community platforms to global social-tech innovations, we build
            <span class="font-bold text-blue-400">technology that puts people first</span> – sustainable, scalable, and meaningful.
          </p>
        </div>
      </div>

      <!-- Terminal Service Cards -->
      <div class="grid lg:grid-cols-2 xl:grid-cols-3 gap-10 mb-24">
        <div
          v-for="(service, index) in mainServices"
          :key="service.title"
          class="group relative animate-slide-up-stagger"
          :style="`animation-delay: ${index * 0.2}s`"
        >
          <!-- Terminal Window -->
          <div
            class="cyber-card rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02] animate-glow-pulse"
          >
            <!-- Terminal Header -->
            <div class="bg-surface-1 px-4 py-3 border-b border-accent-neon/30">
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 rounded-full bg-red-500" />
                <div class="w-3 h-3 rounded-full bg-yellow-500" />
                <div class="w-3 h-3 rounded-full bg-accent-neon" />
                <div class="ml-4 text-accent-cyan text-sm">Services/{{ service.title }}</div>
              </div>
            </div>

            <!-- Terminal Content -->
            <div class="p-6 lg:p-8 code-pattern">
              <!-- Service Status -->
              <div class="text-accent-neon text-sm mb-4">
                <span class="text-accent-cyan">Status:</span> {{ service.status }}
              </div>

              <!-- Service Status -->
              <div class="mb-6">
                <div class="text-blue-400 text-sm font-semibold">
                  {{ service.status }}
                </div>
              </div>

              <!-- Service Title -->
              <div class="mb-4">
                <div class="text-accent-cyan text-sm mb-1">Service:</div>
                <h3 class="text-2xl font-bold text-white mb-2">
                  {{ service.title }}
                </h3>
              </div>

              <!-- Description -->
              <div class="mb-6">
                <div class="text-accent-purple text-sm mb-2">Beschreibung</div>
                <p class="text-white/90 leading-relaxed">
                  {{ service.description }}
                </p>
              </div>

              <!-- Features -->
              <div class="mb-6">
                <div class="text-accent-cyan text-sm mb-3">Leistungen</div>
                <ul class="space-y-2 ml-4">
                  <li
                    v-for="(feature, idx) in service.features"
                    :key="feature"
                    class="flex items-center text-white/90 text-sm"
                  >
                    <span class="text-accent-neon mr-3">{{ idx + 1 }}.</span>
                    <span>{{ feature }}</span>
                  </li>
                </ul>
              </div>

              <!-- Pricing -->
              <div class="neon-card rounded-xl p-4">
                <div class="text-accent-orange text-sm mb-2">Investment</div>
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <div class="text-xs text-accent-cyan mb-1">Timeline:</div>
                    <div class="font-bold text-glow-green text-lg">{{ service.equityRange }}</div>
                  </div>
                  <div>
                    <div class="text-xs text-accent-purple mb-1">Pricing:</div>
                    <div class="font-bold text-glow-cyan text-lg">{{ service.monthlyFee }}</div>
                  </div>
                </div>
              </div>

              <!-- Service Status -->
              <div class="mt-4 flex items-center justify-between text-xs">
                <span class="text-white/60">Service Status:</span>
                <span class="text-accent-neon">● Verfügbar</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Terminal Why Equity Section -->
      <div class="relative">
        <!-- System Query -->
        <div class="text-center mb-16">
          <div class="cyber-card rounded-2xl p-6 max-w-4xl mx-auto">
            <div class="text-accent-cyan text-sm mb-4">Why partner with Trinsler for social-tech?</div>
            <h3 class="text-3xl lg:text-4xl font-bold text-white mb-4">
              Why
              <span class="gradient-text-neon">Trinsler</span>
              <span class="text-accent-cyan">for Impact?</span>
            </h3>
            <div class="text-accent-cyan text-sm">Our approach to social innovation ✓</div>
          </div>
        </div>

        <!-- Benefits as Code Modules -->
        <div class="grid md:grid-cols-3 gap-8">
          <div
            v-for="(benefit, index) in benefits"
            :key="benefit.title"
            class="group animate-slide-up-stagger"
            :style="`animation-delay: ${index * 0.3}s`"
          >
            <!-- Module Window -->
            <div
              class="neon-card rounded-2xl overflow-hidden transition-all duration-500 hover:scale-105"
            >
              <!-- Module Header -->
              <div class="bg-surface-1 px-4 py-3 border-b border-accent-neon/30">
                <div class="flex items-center gap-2">
                  <div class="w-2 h-2 rounded-full bg-accent-neon" />
                  <div class="text-accent-cyan text-xs">Vorteil {{ index + 1 }}</div>
                </div>
              </div>

              <!-- Module Content -->
              <div class="p-8 text-center">
                <!-- Benefit Content -->
                <h4 class="text-xl font-bold text-white mb-6">{{ benefit.title }}</h4>
                <p class="text-white/80 leading-relaxed mb-6">{{ benefit.description }}</p>

                <!-- Status -->
                <div class="mt-4 pt-4 border-t border-accent-neon/20">
                  <div class="flex items-center justify-center gap-2 text-xs">
                    <span class="text-accent-neon">●</span>
                    <span class="text-white/60">Status: Erfolgreich</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Terminal CTA Section -->
      <div class="text-center mt-20">
        <div class="cyber-card rounded-2xl overflow-hidden max-w-5xl mx-auto animate-glow-pulse">
          <!-- Terminal Header -->
          <div class="bg-surface-1 px-6 py-4 border-b border-accent-neon/30">
            <div class="flex items-center gap-3">
              <div class="w-3 h-3 rounded-full bg-red-500" />
              <div class="w-3 h-3 rounded-full bg-yellow-500" />
              <div class="w-3 h-3 rounded-full bg-accent-neon" />
              <div class="ml-4 text-accent-cyan">Digitale Transformation starten</div>
            </div>
          </div>

          <!-- Terminal Content -->
          <div class="p-8 lg:p-12 code-pattern">
            <!-- Call to Action -->
            <div class="text-accent-neon text-sm mb-6">
              <span class="text-accent-cyan">Bereit für:</span> Digitale Transformation
            </div>

            <!-- ASCII Art Banner -->
            <div class="code-font text-accent-neon text-xs mb-8 overflow-hidden">
              <pre class="text-center animate-slide-up-stagger">
  ╔═══════════════════════════════════════╗
  ║     DIGITAL TRANSFORMATION           ║
  ║           INITIALIZED                 ║
  ╚═══════════════════════════════════════╝
              </pre>
            </div>

            <!-- Main Message -->
            <div class="mb-8">
              <h3 class="text-3xl lg:text-4xl font-bold text-white mb-6 animate-glitch">
                Ready to Create
                <span class="gradient-text-neon">Social Impact?</span>
              </h3>

              <!-- Code Block Description -->
              <div class="cyber-card rounded-xl p-6 max-w-3xl mx-auto mb-8">
                <div class="text-accent-purple text-sm mb-3">Impact Formula</div>
                <p class="text-lg text-white/90 leading-relaxed mb-4">
                  <span class="text-accent-cyan">Success:</span> Your Vision + Trinsler Tech Expertise
                  = Meaningful Social Change
                </p>
                <div class="text-accent-orange text-sm">
                  Let's co-create technology that strengthens communities and transforms lives!
                </div>
              </div>
            </div>

            <!-- Command Buttons -->
            <div class="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
              <NuxtLink to="/contact" class="btn-primary group animate-glow-pulse">
                <span>Start Your Impact Project</span>
              </NuxtLink>
              <NuxtLink to="/portfolio" class="btn-secondary"> View Our Impact Stories </NuxtLink>
            </div>

            <!-- Status -->
            <div class="border-t border-accent-neon/20 pt-6">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                <div class="text-center">
                  <div class="text-accent-cyan mb-1">Status:</div>
                  <div class="text-accent-neon">● Open for Social Projects</div>
                </div>
                <div class="text-center">
                  <div class="text-accent-purple mb-1">Impact Level:</div>
                  <div class="text-white font-bold">Community First</div>
                </div>
                <div class="text-center">
                  <div class="text-accent-orange mb-1">Success Rate:</div>
                  <div class="text-glow-green font-bold">100% Community Impact</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// No icons or emojis needed

const mainServices = [
  {
    title: 'Nächstenliebe',
    description:
      'A hyper-local, community-driven platform that redefines neighborhood support. Connects students and young people with seniors who need assistance with grocery shopping.',
    iconBg: 'bg-blue-600',
    filename: 'nachstenliebe.py',
    command: 'build_community_bridge',
    status: 'ACTIVE',
    equityRange: 'Pilot Phase',
    monthlyFee: 'Social Impact',
    features: [
      'Hyper-local proximity matching',
      'Simple, age-friendly interface',
      'Trust-based community system',
      'Modest honorarium for helpers',
      'Combats senior loneliness',
      'Strengthens village communities',
    ],
  },
  {
    title: 'TheraConnect',
    description:
      'Revolutionizing mental health support by making therapy more accessible and transparent. Helps patients find the right therapist based on verified reviews.',
    iconBg: 'bg-blue-700',
    filename: 'theraconnect.js',
    command: 'deploy_therapy_network',
    status: 'DEVELOPMENT',
    equityRange: 'Beta Testing',
    monthlyFee: 'Healthcare Focus',
    features: [
      'Verified therapist reviews',
      'Specialized needs matching',
      'Streamlined communication tools',
      'Secure client management',
      'Enhanced accessibility features',
      'Transparent therapy process',
    ],
  },
  {
    title: 'Visit.Ghana',
    description:
      'More than a travel app - a cultural exchange platform connecting tourists directly with local hosts for authentic, everyday experiences and cultural immersion.',
    iconBg: 'bg-blue-800',
    filename: 'visit_ghana.dart',
    command: 'launch_cultural_exchange',
    status: 'PLANNING',
    equityRange: 'Concept Phase',
    monthlyFee: 'Tourism Innovation',
    features: [
      'Direct tourist-host connections',
      'Authentic local experiences',
      'Cooking classes & workshops',
      'Artisan marketplace integration',
      'Fair revenue distribution',
      'Cultural respect education',
    ],
  },
]

const benefits = [
  {
    title: 'Social Impact First',
    description:
      'We prioritize community benefit over profit. Every project is measured by its positive social impact and ability to strengthen human connections.',
    iconBg: 'bg-gradient-to-r from-blue-600 to-indigo-600',
  },
  {
    title: 'Community-Driven',
    description:
      'Our solutions are built with and for the communities they serve. We listen, adapt, and co-create technology that addresses real human needs.',
    iconBg: 'bg-gradient-to-r from-red-600 to-pink-600',
  },
  {
    title: 'Sustainable Innovation',
    description:
      'We build technology that lasts, scales responsibly, and continues to create value long after launch. Social progress through sustainable tech.',
    iconBg: 'bg-gradient-to-r from-green-500 to-emerald-500',
  },
]
</script>
