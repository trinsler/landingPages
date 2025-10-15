<template>
  <div class="min-h-screen matrix-bg relative overflow-hidden pt-20">
    <!-- Cyber Grid Background -->
    <div class="absolute inset-0 cyber-grid opacity-30" />

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

    <div class="relative container-custom py-20">
      <!-- Terminal Header -->
      <div
        class="cyber-card rounded-3xl overflow-hidden max-w-5xl mx-auto mb-20 animate-glow-pulse"
      >
        <div class="bg-surface-1 px-6 py-4 border-b border-accent-neon/30">
          <div class="flex items-center gap-3">
            <div class="w-4 h-4 rounded-full bg-red-500" />
            <div class="w-4 h-4 rounded-full bg-yellow-500" />
            <div class="w-4 h-4 rounded-full bg-accent-neon" />
            <div class="ml-4 text-accent-cyan text-lg">Team</div>
          </div>
        </div>

        <div class="p-8 lg:p-12 code-pattern">
          <h1 class="text-4xl sm:text-6xl font-black text-white mb-6 text-center">
            The Minds Behind the
            <br />
            <span class="gradient-text-neon">Mission</span>
          </h1>

          <div class="cyber-card rounded-xl p-6 max-w-3xl mx-auto">
            <p class="text-lg text-white/90 leading-relaxed text-center">
              We are Miréio and Niels, a passionate team of developers and strategists from Konstanz, Germany.
              We combine deep technical expertise with a shared commitment to leveraging technology for social good.
            </p>
          </div>
        </div>
      </div>

      <!-- Team Members Grid -->
      <div class="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        <!-- Founder 1: Miréio Trinley -->
        <div class="group animate-slide-up-stagger">
          <div
            class="cyber-card rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02]"
          >
            <!-- Profile Header -->
            <div class="bg-surface-1 px-4 py-3 border-b border-accent-primary/30">
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 rounded-full bg-accent-primary" />
                <div class="text-accent-cyan text-sm">Co-Founder & Frontend Lead</div>
                <div class="ml-auto px-2 py-1 rounded bg-green-500/20 text-green-400 text-xs">
                  Verifiziert
                </div>
              </div>
            </div>

            <div class="p-8">
              <!-- Profile Image -->
              <div class="relative mb-6">
                <div class="w-32 h-32 rounded-2xl mx-auto neon-card overflow-hidden">
                  <img
                    src="/assets/pictures/MireioTrinley.jpeg"
                    alt="Miréio Trinley"
                    class="w-full h-full object-cover"
                    onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'"
                  />
                  <div
                    class="w-full h-full bg-gradient-to-br from-accent-primary/20 to-accent-cyan/20 flex items-center justify-center"
                    style="display: none"
                  >
                    <div class="w-16 h-16 text-white text-4xl flex items-center justify-center" />
                  </div>
                </div>
                <div class="absolute -top-2 -right-2 neon-card rounded-full p-2">
                  <div class="w-3 h-3 bg-accent-primary rounded-full" />
                </div>
              </div>

              <!-- Name & Role -->
              <div class="text-center mb-6">
                <h3 class="text-2xl font-bold text-white mb-2">Miréio Trinley</h3>
                <div class="text-accent-cyan text-sm mb-1">Front-End Developer | UX Lecturer | Social Impact Strategist</div>
                <div class="text-white/60 text-xs mb-3">
                  IT FOR YOUTH GHANA • HTWG Konstanz • Community Impact
                </div>

                <!-- Social Links -->
                <div class="flex justify-center gap-4">
                  <a
                    href="https://linkedin.com/in/mireio-trinley"
                    target="_blank"
                    class="w-10 h-10 rounded-xl neon-card flex items-center justify-center hover:scale-110 transition-transform"
                  >
                    <div class="w-5 h-5 bg-blue-500 rounded flex items-center justify-center">
                      <span class="text-white text-xs font-bold">in</span>
                    </div>
                  </a>
                </div>
              </div>

              <!-- Background -->
              <div class="neon-card rounded-xl p-4 mb-4">
                <div class="text-accent-purple text-sm mb-2">Social Impact Story</div>
                <p class="text-white/90 text-sm leading-relaxed">
                  I leverage technology, design, and strategy to drive social impact and empower people. As a UX Lecturer for IT FOR YOUTH GHANA, I enable women in IT to gain skills, confidence, and new career opportunities. Let's grab a coffee and chat! ☕️
                </p>
              </div>

              <!-- Expertise -->
              <div class="glass-card rounded-xl p-4">
                <div class="text-accent-orange text-sm mb-3">Core Expertise</div>
                <div class="flex flex-wrap gap-2">
                  <span
                    class="px-3 py-1 rounded-full bg-accent-primary/20 text-accent-primary text-xs"
                    >Front-End Development</span
                  >
                  <span class="px-3 py-1 rounded-full bg-accent-cyan/20 text-accent-cyan text-xs"
                    >UX Design & Teaching</span
                  >
                  <span
                    class="px-3 py-1 rounded-full bg-accent-purple/20 text-accent-purple text-xs"
                    >Social Impact Strategy</span
                  >
                  <span
                    class="px-3 py-1 rounded-full bg-accent-orange/20 text-accent-orange text-xs"
                    >Team Leadership</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Founder 2: Niels Hensler -->
        <div class="group animate-slide-up-stagger" style="animation-delay: 0.2s">
          <div
            class="cyber-card rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02]"
          >
            <div class="bg-surface-1 px-4 py-3 border-b border-accent-purple/30">
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 rounded-full bg-accent-purple" />
                <div class="text-accent-purple text-sm">Co-Founder & Backend Lead</div>
                <div class="ml-auto px-2 py-1 rounded bg-green-500/20 text-green-400 text-xs">
                  Verifiziert
                </div>
              </div>
            </div>

            <div class="p-8">
              <div class="relative mb-6">
                <div class="w-32 h-32 rounded-2xl mx-auto cyber-card overflow-hidden">
                  <img
                    src="/assets/pictures/nielsHensler.jpeg"
                    alt="Niels Hensler"
                    class="w-full h-full object-cover"
                    onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'"
                  />
                  <div
                    class="w-full h-full bg-gradient-to-br from-accent-purple/20 to-accent-orange/20 flex items-center justify-center"
                    style="display: none"
                  >
                    <div class="w-16 h-16 text-white text-4xl flex items-center justify-center" />
                  </div>
                </div>
                <div class="absolute -top-2 -right-2 cyber-card rounded-full p-2">
                  <div class="w-3 h-3 bg-accent-purple rounded-full" />
                </div>
              </div>

              <div class="text-center mb-6">
                <h3 class="text-2xl font-bold text-white mb-2">Niels Hensler</h3>
                <div class="text-accent-purple text-sm mb-1">Software Engineer | Cloud & AI Specialist</div>
                <div class="text-white/60 text-xs mb-3">
                  Siemens • HTWG Konstanz • Cloud Computing
                </div>

                <div class="flex justify-center gap-4">
                  <a
                    href="https://linkedin.com/in/niels-hensler"
                    target="_blank"
                    class="w-10 h-10 rounded-xl neon-card flex items-center justify-center hover:scale-110 transition-transform"
                  >
                    <div class="w-5 h-5 bg-blue-500 rounded flex items-center justify-center">
                      <span class="text-white text-xs font-bold">in</span>
                    </div>
                  </a>
                  <a
                    href="https://webwai.de"
                    target="_blank"
                    class="w-10 h-10 rounded-xl glass-card flex items-center justify-center hover:scale-110 transition-transform"
                  >
                    <div class="w-5 h-5 bg-accent-purple rounded flex items-center justify-center">
                      <span class="text-white text-xs font-bold">🌐</span>
                    </div>
                  </a>
                </div>
              </div>

              <div class="cyber-card rounded-xl p-4 mb-4">
                <div class="text-accent-cyan text-sm mb-2">Tech Innovation</div>
                <p class="text-white/90 text-sm leading-relaxed">
                  Passionate about cutting-edge technologies with a strong focus on cloud-native solutions and AI integration. Bringing comprehensive expertise in Kubernetes, DevOps, and full-stack development. Let's shape the future of technology together! 💡🚀
                </p>
              </div>

              <div class="glass-card rounded-xl p-4">
                <div class="text-accent-orange text-sm mb-3">Technical Stack</div>
                <div class="flex flex-wrap gap-2">
                  <span
                    class="px-3 py-1 rounded-full bg-accent-purple/20 text-accent-purple text-xs"
                    >Kubernetes & Docker</span
                  >
                  <span class="px-3 py-1 rounded-full bg-accent-cyan/20 text-accent-cyan text-xs"
                    >AI/ML Integration</span
                  >
                  <span
                    class="px-3 py-1 rounded-full bg-accent-orange/20 text-accent-orange text-xs"
                    >React & Vue.js</span
                  >
                  <span
                    class="px-3 py-1 rounded-full bg-accent-primary/20 text-accent-primary text-xs"
                    >Python & Rust</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Contact CTA -->
      <div class="text-center mt-20">
        <div class="cyber-card rounded-2xl max-w-4xl mx-auto p-8">
          <h3 class="text-3xl font-bold text-white mb-6">
            <span class="gradient-text-neon">Ready to Build</span>
            <span class="text-accent-cyan">Social Impact Together?</span>
          </h3>

          <p class="text-white/80 mb-8 max-w-2xl mx-auto">
            Have an idea that can create meaningful change? Let's connect and explore how we can transform your vision into powerful applications that drive real-world impact.
          </p>

          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <NuxtLink to="/contact" class="btn-primary">
              <span>Partner With Us</span>
            </NuxtLink>
            <a
              href="#contact"
              class="btn-secondary"
            >
              Submit Your Idea
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// No icons or emojis needed

useHead({
  title: 'Team - Trinsler Social Impact Developers | Miréio Trinley & Niels Hensler',
  meta: [
    {
      name: 'description',
      content:
        'Meet Miréio Trinley and Niels Hensler - passionate developers combining technical expertise with social impact. Frontend development, UX lecturing, cloud computing, and AI integration.',
    },
    {
      name: 'keywords',
      content: 'social impact developers, team, Miréio Trinley, Niels Hensler, UX lecturer, cloud computing, AI integration, social entrepreneurship'
    }
  ],
})
</script>
