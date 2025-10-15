<template>
  <section id="team" class="relative min-h-screen matrix-bg overflow-hidden pt-20">
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
      <!-- Team Hero Section with People Focus -->
      <div class="mb-20">
        <!-- Hero Background -->
        <div class="relative h-96 rounded-3xl overflow-hidden">
          <img 
            src="/images/wohnzimmer.jpg" 
            alt="Team working together on social impact projects"
            class="w-full h-full object-cover opacity-40"
            onerror="this.style.display='none'"
          />
          <div class="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
          
          <!-- Hero Content -->
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="text-center max-w-4xl">
              <h1 class="text-5xl md:text-6xl font-black text-white mb-6">
                <span class="gradient-text-neon">People Who Build</span>
                <br />
                <span class="text-accent-cyan">Technology That Matters</span>
              </h1>
              <p class="text-xl text-white/90 mb-8">
                We're more than developers – we're passionate social entrepreneurs 
                combining technical expertise with a deep commitment to human-centered innovation.
              </p>
            </div>
          </div>
          
          <!-- Floating Team Photos -->
          <div class="absolute top-10 right-10 w-32 h-32 rounded-full overflow-hidden animate-float border-4 border-white/30">
            <img src="/images/freundeHuckepack.jpg" alt="Team meeting" class="w-full h-full object-cover">
          </div>
          <div class="absolute bottom-10 left-10 w-28 h-28 rounded-lg overflow-hidden animate-float" style="animation-delay: -3s;">
            <img src="/images/gartenfest.jpg" alt="Team workshop" class="w-full h-full object-cover">
          </div>
        </div>
      </div>

      <!-- Team Members Grid -->
      <div class="grid md:grid-cols-2 gap-16 max-w-6xl mx-auto">
        <!-- Founder 1: Miréio Trinley -->
        <div class="group animate-slide-up-stagger">
          <div
            class="bg-black/50 backdrop-blur-lg rounded-3xl overflow-hidden transition-all duration-700 hover:scale-[1.02] hover:shadow-2xl hover:shadow-accent-cyan/20"
          >
            <!-- Profile Header with Large Image -->
            <div class="relative h-64 overflow-hidden">
              <!-- Large Profile Image -->
              <img
                src="/assets/pictures/MireioTrinley.jpeg"
                alt="Miréio Trinley"
                class="w-full h-full object-cover"
                onerror="this.style.display='none'"
              />
              
              <!-- Overlay with Basic Info -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent">
                <div class="absolute bottom-6 left-6 right-6">
                  <div class="flex items-center gap-3 mb-3">
                    <div class="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                    <span class="text-white text-sm font-medium">Verified Developer</span>
                  </div>
                  <h3 class="text-2xl font-bold text-white mb-1">Miréio Trinley</h3>
                  <div class="text-accent-cyan text-sm">Front-End Developer | UX Lecturer</div>
                </div>
              </div>
              
              <!-- Floating Achievement Badges -->
              <div class="absolute top-6 right-6 w-16 h-16 bg-white/10 backdrop-blur-sm rounded-xl p-2 animate-float" style="animation-delay: -1s;">
                <div class="text-2xl text-center text-white">👩</div>
              </div>
            </div>

            <!-- Profile Details -->
            <div class="p-8">
              <!-- Professional Summary -->
              <div class="mb-6">
                <h4 class="text-white text-lg font-semibold mb-3">🌍 Social Impact & Technology</h4>
                <p class="text-white/80 leading-relaxed mb-4">
                  I leverage technology, design, and strategy to drive social impact and empower people. As a UX Lecturer for IT FOR YOUTH GHANA, I enable women in IT to gain skills, confidence, and new career opportunities.
                </p>
                <div class="bg-white/5 backdrop-blur-sm rounded-xl p-4 mb-4">
                  <div class="text-accent-cyan text-sm font-semibold mb-2">🎓 Key Achievement</div>
                  <p class="text-white/70 text-sm">Empowered women in Ghana through international UX design education, creating opportunities for economic advancement.</p>
                </div>
              </div>

              <!-- Skills & Expertise -->
              <div class="grid grid-cols-2 gap-4 mb-6">
                <div class="bg-white/5 backdrop-blur-sm rounded-xl p-4">
                  <div class="text-accent-cyan text-sm font-semibold mb-2">💻 Technical Skills</div>
                  <ul class="text-white/70 text-sm space-y-1">
                    <li>• Vue.js & Nuxt.js</li>
                    <li>• Responsive Design</li>
                    <li>• Frontend Architecture</li>
                    <li>• Project Management</li>
                  </ul>
                </div>
                <div class="bg-white/5 backdrop-blur-sm rounded-xl p-4">
                  <div class="text-accent-purple text-sm font-semibold mb-2">🎨 Design Skills</div>
                  <ul class="text-white/70 text-sm space-y-1">
                    <li>• UX/UI Design</li>
                    <li>• Design Systems</li>
                    <li>• User Research</li>
                    <li>• Prototyping</li>
                  </ul>
                </div>
              </div>

              <!-- Personal Quote -->
              <div class="bg-gradient-to-r from-accent-cyan/10 to-accent-purple/10 rounded-xl p-6 mb-6">
                <p class="text-white italic text-center">"I'm driven by curiosity and a strong commitment to helping others move forward. Let's grab a coffee and chat! ☕️"</p>
              </div>

              <!-- Social Links -->
              <div class="flex justify-center gap-4">
                <a
                  href="https://linkedin.com/in/mireio-trinley"
                  target="_blank"
                  class="btn-secondary w-full text-center"
                >
                  <span class="flex items-center gap-2">
                    <span>💼</span>
                    <span>LinkedIn</span>
                  </span>
                </a>
                <a
                  href="https://github.com/mireio"
                  target="_blank"
                  class="btn-secondary w-full text-center"
                >
                  <span class="flex items-center gap-2">
                    <span>💻</span>
                    <span>GitHub</span>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Founder 2: Niels Hensler -->
        <div class="group animate-slide-up-stagger" style="animation-delay: 0.2s">
          <div
            class="bg-black/50 backdrop-blur-lg rounded-3xl overflow-hidden transition-all duration-700 hover:scale-[1.02] hover:shadow-2xl hover:shadow-accent-purple/20"
          >
            <!-- Profile Header with Large Image -->
            <div class="relative h-64 overflow-hidden">
              <!-- Large Profile Image -->
              <img
                src="/assets/pictures/nielsHensler.jpeg"
                alt="Niels Hensler"
                class="w-full h-full object-cover"
                onerror="this.style.display='none'"
              />
              
              <!-- Overlay with Basic Info -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent">
                <div class="absolute bottom-6 left-6 right-6">
                  <div class="flex items-center gap-3 mb-3">
                    <div class="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                    <span class="text-white text-sm font-medium">Senior Developer</span>
                  </div>
                  <h3 class="text-2xl font-bold text-white mb-1">Niels Hensler</h3>
                  <div class="text-accent-purple text-sm">Software Engineer | Cloud & AI Specialist</div>
                </div>
              </div>
              
              <!-- Floating Achievement Badges -->
              <div class="absolute top-6 right-6 w-16 h-16 bg-white/10 backdrop-blur-sm rounded-xl p-2 animate-float" style="animation-delay: -2s;">
                <div class="text-2xl text-center text-white">🚀</div>
              </div>
            </div>

            <!-- Profile Details -->
            <div class="p-8">
              <!-- Professional Summary -->
              <div class="mb-6">
                <h4 class="text-white text-lg font-semibold mb-3">🔧 Innovation & Cloud Architecture</h4>
                <p class="text-white/80 leading-relaxed mb-4">
                  Passionate about cutting-edge technologies with a strong focus on cloud-native solutions and AI integration. My expertise spans Kubernetes, DevOps, and full-stack development, ensuring that applications are not only smart but also scalable, secure, and built for the future.
                </p>
                <div class="bg-white/5 backdrop-blur-sm rounded-xl p-4 mb-4">
                  <div class="text-accent-purple text-sm font-semibold mb-2">🏢 Key Achievement</div>
                  <p class="text-white/70 text-sm">Developed comprehensive MLOps platforms and AI-powered solutions that are transforming how organizations approach machine learning and cloud infrastructure.</p>
                </div>
              </div>

              <!-- Technical Expertise -->
              <div class="grid grid-cols-2 gap-4 mb-6">
                <div class="bg-white/5 backdrop-blur-sm rounded-xl p-4">
                  <div class="text-accent-cyan text-sm font-semibold mb-2">☁️ Cloud & DevOps</div>
                  <ul class="text-white/70 text-sm space-y-1">
                    <li>• Kubernetes</li>
                    <li>• Docker & Containerization</li>
                    <li>• CI/CD Pipelines</li>
                    <li>• Cloud Security</li>
                  </ul>
                </div>
                <div class="bg-white/5 backdrop-blur-sm rounded-xl p-4">
                  <div class="text-accent-purple text-sm font-semibold mb-2">🤖 AI/ML Integration</div>
                  <ul class="text-white/70 text-sm space-y-1">
                    <li>• PyTorch & TensorFlow</li>
                    <li>• LangChain</li>
                    <li>• MLflow</li>
                    <li>• Model Deployment</li>
                  </ul>
                </div>
              </div>

              <!-- Languages & Frameworks -->
              <div class="bg-white/5 backdrop-blur-sm rounded-xl p-4 mb-6">
                <div class="text-accent-orange text-sm font-semibold mb-3">💻 Programming</div>
                <div class="flex flex-wrap gap-2">
                  <span class="px-3 py-1 bg-white/10 rounded-lg text-accent-cyan text-xs">Python</span>
                  <span class="px-3 py-1 bg-white/10 rounded-lg text-accent-purple text-xs">Rust</span>
                  <span class="px-3 py-1 bg-white/10 rounded-lg text-accent-orange text-xs">JavaScript</span>
                  <span class="px-3 py-1 bg-white/10 rounded-lg text-white text-xs">TypeScript</span>
                </div>
              </div>

              <!-- Personal Quote -->
              <div class="bg-gradient-to-r from-accent-purple/10 to-accent-orange/10 rounded-xl p-6 mb-6">
                <p class="text-white italic text-center">"Let's shape the future of technology together! 💡🚀"</p>
              </div>

              <!-- Social Links -->
              <div class="flex justify-center gap-4">
                <a
                  href="https://linkedin.com/in/niels-hensler"
                  target="_blank"
                  class="btn-secondary w-full text-center"
                >
                  <span class="flex items-center gap-2">
                    <span>💼</span>
                    <span>LinkedIn</span>
                  </span>
                </a>
                <a
                  href="https://webwai.de"
                  target="_blank"
                  class="btn-secondary w-full text-center"
                >
                  <span class="flex items-center gap-2">
                    <span>🌐</span>
                    <span>Portfolio</span>
                  </span>
                </a>
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
  </section>
</template>

<script setup>
// Team Section Component

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

<style scoped>
/* Team specific styles will inherit from global color system */
</style>