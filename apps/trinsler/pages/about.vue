<template>
  <div>
    <!-- Hero Section with Image -->
    <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
      <!-- Hero Background Image -->
      <div class="absolute inset-0">
        <img 
          src="/images/freundeHuckepack.jpg" 
          alt="Community building and human connections" 
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-gradient-to-b from-black/50 via-black/70 to-black/90"></div>
      </div>

      <div class="relative container-custom z-10 text-center">
        <div class="max-w-4xl mx-auto">
          <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.2]" style="font-family: 'Inter', system-ui, -apple-system, sans-serif">
            People First.
            <br />
            <span style="color: #ffffff">Technology Second.</span>
          </h1>
          <p class="text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-12" style="font-family: 'Inter', system-ui, -apple-system, sans-serif">
            We are a social-first tech studio dedicated to building technology that strengthens communities and creates meaningful change.
          </p>
          <div class="flex flex-col sm:flex-row items-center justify-center gap-6">
            <NuxtLink to="/portfolio" class="btn-primary">
              See Our Impact
            </NuxtLink>
            <NuxtLink to="/contact" class="btn-secondary">
              Share Your Vision
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Mission & Values with Images -->
    <section class="py-16 lg:py-24 bg-white">
      <div class="container-custom">
        <!-- Mission with Image -->
        <div class="mb-20">
          <div class="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div class="animate-slide-up-stagger order-2 lg:order-1">
              <h2 class="text-3xl lg:text-4xl font-bold text-black mb-6" style="font-family: 'Inter', system-ui, -apple-system, sans-serif">
                Our
                <span style="color: #243463">Mission</span>
              </h2>
              <p class="text-lg text-gray-700 leading-relaxed mb-8" style="font-family: 'Inter', system-ui, -apple-system, sans-serif">
                We believe technology should serve humanity, not the other way around. Every project we undertake is measured by its potential to create positive social impact, strengthen communities, and improve lives.
              </p>
              <div class="bg-gray-100 rounded-2xl p-6">
                <div style="color: #243463" class="text-sm font-semibold mb-2 uppercase tracking-wider">Core Philosophy</div>
                <p class="text-gray-700 italic">
                  "Technology that builds bridges, not walls. Innovation that empowers communities, not isolates them."
                </p>
              </div>
            </div>
            <div class="animate-slide-up-stagger order-1 lg:order-2">
              <div class="relative">
                <img 
                  src="/images/senioren.jpg" 
                  alt="Community connection and technology impact" 
                  class="rounded-3xl w-full h-80 object-cover shadow-xl hover:scale-[1.02] transition-all duration-500"
                />
                <div class="absolute inset-0 rounded-3xl bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Vision with Image -->
        <div class="max-w-6xl mx-auto">
          <div class="grid lg:grid-cols-2 gap-12 items-center">
            <div class="animate-slide-up-stagger">
              <div class="relative">
                <img 
                  src="/images/gartenfest.jpg" 
                  alt="Community celebration and innovation" 
                  class="rounded-3xl w-full h-80 object-cover shadow-xl hover:scale-[1.02] transition-all duration-500"
                />
                <div class="absolute inset-0 rounded-3xl bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </div>
            <div class="animate-slide-up-stagger" style="animation-delay: 0.2s">
              <h2 class="text-3xl lg:text-4xl font-bold text-black mb-6" style="font-family: 'Inter', system-ui, -apple-system, sans-serif">
                Our
                <span style="color: #243463">Vision</span>
              </h2>
              <p class="text-lg text-gray-700 leading-relaxed mb-8" style="font-family: 'Inter', system-ui, -apple-system, sans-serif">
                We envision a world where access to technology is equitable, and where digital solutions are co-created with the communities they serve. Our goal is to democratize innovation and make social entrepreneurship accessible to everyone.
              </p>
              <div class="bg-gray-100 rounded-2xl p-6">
                <div style="color: #243463" class="text-sm font-semibold mb-2 uppercase tracking-wider">Long-term Goal</div>
                <p class="text-gray-700">
                  To create a global network of social-tech solutions that address humanity's most pressing challenges.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Core Values -->
    <section class="py-16 lg:py-24" style="background: #243463">
      <div class="container-custom">
        <div class="text-center mb-16">
          <h2 class="text-3xl lg:text-4xl font-bold text-white mb-4" style="font-family: 'Inter', system-ui, -apple-system, sans-serif">
            Our Core
            <span style="color: #ffffff">Values</span>
          </h2>
          <p class="text-lg text-white/90 max-w-2xl mx-auto" style="font-family: 'Inter', system-ui, -apple-system, sans-serif">
            The principles that guide every decision we make and every project we build.
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <div class="animate-slide-up-stagger">
            <div class="bg-white rounded-2xl p-8 text-center h-full hover:scale-[1.02] transition-all duration-300 hover:shadow-lg">
              <div class="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" style="background: #243463">
                <div class="text-2xl font-bold text-white">1</div>
              </div>
              <h3 class="text-xl font-bold text-black mb-4" style="font-family: 'Inter', system-ui, -apple-system, sans-serif">
                Social Impact First
              </h3>
              <p class="text-gray-700 leading-relaxed">
                Every project is evaluated based on its potential to create positive change. We prioritize community benefit over commercial profit.
              </p>
            </div>
          </div>

          <div class="animate-slide-up-stagger" style="animation-delay: 0.2s">
            <div class="bg-white rounded-2xl p-8 text-center h-full hover:scale-[1.02] transition-all duration-300 hover:shadow-lg">
              <div class="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" style="background: #243463">
                <div class="text-2xl font-bold text-white">2</div>
              </div>
              <h3 class="text-xl font-bold text-black mb-4" style="font-family: 'Inter', system-ui, -apple-system, sans-serif">
                Community-Driven
              </h3>
              <p class="text-gray-700 leading-relaxed">
                We build technology with and for communities. Our solutions are co-created with the people they serve to ensure relevance and adoption.
              </p>
            </div>
          </div>

          <div class="animate-slide-up-stagger" style="animation-delay: 0.4s">
            <div class="bg-white rounded-2xl p-8 text-center h-full hover:scale-[1.02] transition-all duration-300 hover:shadow-lg">
              <div class="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" style="background: #243463">
                <div class="text-2xl font-bold text-white">3</div>
              </div>
              <h3 class="text-xl font-bold text-black mb-4" style="font-family: 'Inter', system-ui, -apple-system, sans-serif">
                Sustainable Innovation
              </h3>
              <p class="text-gray-700 leading-relaxed">
                We build technology that lasts, scales responsibly, and continues to create value long after launch.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Partnership Model -->
    <section class="py-16 lg:py-24 bg-white">
      <div class="container-custom">
        <div class="max-w-4xl mx-auto">
          <div class="text-center mb-12">
            <h2 class="text-3xl lg:text-4xl font-bold text-black mb-4" style="font-family: 'Inter', system-ui, -apple-system, sans-serif">
              Making Social Entrepreneurship
              <span style="color: #243463">Accessible</span>
            </h2>
            <p class="text-lg text-gray-700 leading-relaxed" style="font-family: 'Inter', system-ui, -apple-system, sans-serif">
              We understand that great ideas often come with limited resources. That's why we've developed a flexible partnership model that combines reduced upfront costs with equity options.
            </p>
          </div>

          <div class="grid md:grid-cols-2 gap-8">
            <div class="bg-gray-100 rounded-2xl p-8">
              <h3 class="text-xl font-bold text-black mb-4" style="font-family: 'Inter', system-ui, -apple-system, sans-serif">
                For Social Entrepreneurs
              </h3>
              <ul class="text-gray-700 space-y-3">
                <li class="flex items-start">
                  <div class="w-2 h-2 rounded-full mt-2 mr-3" style="background: #243463"></div>
                  <span>Reduced initial project costs</span>
                </li>
                <li class="flex items-start">
                  <div class="w-2 h-2 rounded-full mt-2 mr-3" style="background: #243463"></div>
                  <span>Equity partnership options</span>
                </li>
                <li class="flex items-start">
                  <div class="w-2 h-2 rounded-full mt-2 mr-3" style="background: #243463"></div>
                  <span>Technical expertise & mentorship</span>
                </li>
                <li class="flex items-start">
                  <div class="w-2 h-2 rounded-full mt-2 mr-3" style="background: #243463"></div>
                  <span>Long-term commitment to success</span>
                </li>
              </ul>
            </div>

            <div class="bg-gray-100 rounded-2xl p-8">
              <h3 class="text-xl font-bold text-black mb-4" style="font-family: 'Inter', system-ui, -apple-system, sans-serif">
                For Communities
              </h3>
              <ul class="text-gray-700 space-y-3">
                <li class="flex items-start">
                  <div class="w-2 h-2 rounded-full mt-2 mr-3" style="background: #243463"></div>
                  <span>Solutions built with community input</span>
                </li>
                <li class="flex items-start">
                  <div class="w-2 h-2 rounded-full mt-2 mr-3" style="background: #243463"></div>
                  <span>Sustainable, long-term impact</span>
                </li>
                <li class="flex items-start">
                  <div class="w-2 h-2 rounded-full mt-2 mr-3" style="background: #243463"></div>
                  <span>Local capacity building</span>
                </li>
                <li class="flex items-start">
                  <div class="w-2 h-2 rounded-full mt-2 mr-3" style="background: #243463"></div>
                  <span>Technology that serves real needs</span>
                </li>
              </ul>
            </div>
          </div>

          <div class="text-center mt-12">
            <NuxtLink to="/contact" class="btn-primary">
              Let's Discuss Your Project
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Section -->
    <section class="py-16 lg:py-24 bg-white">
      <div class="container-custom">
        <div class="text-center mb-16">
          <h2 class="text-3xl lg:text-4xl font-bold text-black mb-4" style="font-family: 'Inter', system-ui, -apple-system, sans-serif">
            Meet Our
            <span style="color: #243463">Founders</span>
          </h2>
          <p class="text-lg text-gray-700 max-w-2xl mx-auto" style="font-family: 'Inter', system-ui, -apple-system, sans-serif">
            Two passionate founders combining technical excellence with social impact expertise.
          </p>
        </div>

        <div class="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <!-- Niels Hensler -->
          <div class="animate-slide-up-stagger">
            <div class="bg-gray-100 rounded-2xl p-8 hover:scale-[1.02] transition-all duration-300 hover:shadow-lg">
              <div class="flex items-start gap-6">
                <div class="flex-shrink-0">
                  <img
                    src="/assets/pictures/nielsHensler.jpeg"
                    alt="Niels Hensler"
                    class="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                  />
                </div>
                <div class="flex-1">
                  <h3 class="text-2xl font-bold text-black mb-2" style="font-family: 'Inter', system-ui, -apple-system, sans-serif">
                    Niels Hensler
                  </h3>
                  <div class="text-gray-600 mb-4" style="font-family: 'Inter', system-ui, -apple-system, sans-serif">
                    Full Stack Engineer & Cloud Computing Expert
                  </div>
                  <div class="space-y-3">
                    <p class="text-gray-700 text-sm leading-relaxed">
                      Innovative Software Engineer with expertise in cloud computing, AI/ML, and full-stack development. Passionate about building scalable cloud solutions and implementing cutting-edge technologies.
                    </p>
                    <div class="space-y-2">
                      <div class="text-sm font-semibold text-black">Experience:</div>
                      <div class="text-sm text-gray-700">
                        • Full Stack Engineer at Siemens<br>
                        • Cloud & DevOps: Kubernetes, Docker, AWS<br>
                        • AI/ML: PyTorch, TensorFlow, LangChain<br>
                        • Frontend: React, Vue.js, Flutter<br>
                        • Backend: Python, Rust, Java
                      </div>
                    </div>
                    <div class="space-y-2">
                      <div class="text-sm font-semibold text-black">Education:</div>
                      <div class="text-sm text-gray-700">
                        B.Sc. Computer Science at HTWG Konstanz
                      </div>
                    </div>
                    <div class="pt-4">
                      <a href="https://www.linkedin.com/in/niels-hensler" target="_blank" class="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700">
                        View LinkedIn Profile
                        <svg class="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path>
                          <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Miréio Trinley -->
          <div class="animate-slide-up-stagger" style="animation-delay: 0.2s">
            <div class="bg-gray-100 rounded-2xl p-8 hover:scale-[1.02] transition-all duration-300 hover:shadow-lg">
              <div class="flex items-start gap-6">
                <div class="flex-shrink-0">
                  <img
                    src="/assets/pictures/MireioTrinley.jpeg"
                    alt="Miréio Trinley"
                    class="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                  />
                </div>
                <div class="flex-1">
                  <h3 class="text-2xl font-bold text-black mb-2" style="font-family: 'Inter', system-ui, -apple-system, sans-serif">
                    Miréio Trinley
                  </h3>
                  <div class="text-gray-600 mb-4" style="font-family: 'Inter', system-ui, -apple-system, sans-serif">
                    UX Lecturer & Front-End Developer
                  </div>
                  <div class="space-y-3">
                    <p class="text-gray-700 text-sm leading-relaxed">
                      Front-End Developer and UX Lecturer combining technology, design, and strategy to drive social impact. Passionate about empowering people through technology education and human-centered design.
                    </p>
                    <div class="space-y-2">
                      <div class="text-sm font-semibold text-black">Experience:</div>
                      <div class="text-sm text-gray-700">
                        • UX Lecturer at IT FOR YOUTH GHANA<br>
                        • IT Administrator & Frontend Developer<br>
                        • Frontend: Vue.js, TypeScript, JavaScript<br>
                        • UX Design & Design Thinking<br>
                        • Social Impact Education & Training
                      </div>
                    </div>
                    <div class="space-y-2">
                      <div class="text-sm font-semibold text-black">Education:</div>
                      <div class="text-sm text-gray-700">
                        Applied Computer Science at HTWG Konstanz<br>
                        Impact Investment Finance (Duke University)
                      </div>
                    </div>
                    <div class="pt-4">
                      <a href="https://www.linkedin.com/in/mireio-trinley" target="_blank" class="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700">
                        View LinkedIn Profile
                        <svg class="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path>
                          <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
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
  title: 'About - Trinsler | People First Technology',
  meta: [
    {
      name: 'description',
      content: 'Learn about Trinsler\'s mission to build people-first technology. Our values: social impact, community-driven development, and sustainable innovation.',
    },
    {
      name: 'keywords',
      content: 'about trinsler, social tech studio, mission, values, social impact, community technology, people first technology'
    }
  ]
})
</script>

<style scoped>
/* About page specific styles will inherit from global color system */
</style>