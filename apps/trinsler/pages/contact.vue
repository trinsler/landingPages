<template>
  <div>
    <!-- Hero Section with Image -->
    <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
      <!-- Hero Background Image -->
      <div class="absolute inset-0">
        <img 
          src="/images/wohnzimmer.jpg" 
          alt="Collaboration and partnership building" 
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80"></div>
      </div>

      <div class="relative container-custom z-10 text-center">
        <div class="max-w-4xl mx-auto">
          <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.2]" style="font-family: 'Inter', system-ui, -apple-system, sans-serif">
            Ready to Start Your
            <br />
            <span style="color: #ffffff">Impact Project?</span>
          </h1>
          <p class="text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-12" style="font-family: 'Inter', system-ui, -apple-system, sans-serif">
            Whether you have a detailed plan or just a spark of an idea, we're here to help you build something that creates real, lasting change.
          </p>
          <div class="flex flex-col sm:flex-row items-center justify-center gap-6">
            <NuxtLink to="#contact-form" class="btn-primary">
              Start the Conversation
            </NuxtLink>
            <NuxtLink to="/portfolio" class="btn-secondary">
              See Our Work
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Visual Partnership Section -->
    <section class="py-16 lg:py-24" style="background: #243463">
      <div class="container-custom">
        <div class="text-center mb-16">
          <h2 class="text-3xl lg:text-4xl font-bold text-white mb-4" style="font-family: 'Inter', system-ui, -apple-system, sans-serif">
            Partnership
            <span style="color: #ffffff">in Action</span>
          </h2>
          <p class="text-lg text-white/90 max-w-2xl mx-auto" style="font-family: 'Inter', system-ui, -apple-system, sans-serif">
            We believe in building long-term partnerships that create lasting social impact together.
          </p>
        </div>

        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div class="animate-slide-up-stagger order-2 lg:order-1">
            <div class="space-y-6">
              <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <h3 class="text-xl font-bold text-white mb-4" style="font-family: 'Inter', system-ui, -apple-system, sans-serif">
                  Our Partnership Approach
                </h3>
                <ul class="space-y-4">
                  <li class="flex items-start">
                    <div class="w-2 h-2 rounded-full bg-white mt-2 mr-4 flex-shrink-0"></div>
                    <div>
                      <div class="font-semibold text-white mb-1">Flexible Investment Models</div>
                      <div class="text-white/80 text-sm">Equity options and reduced upfront costs</div>
                    </div>
                  </li>
                  <li class="flex items-start">
                    <div class="w-2 h-2 rounded-full bg-white mt-2 mr-4 flex-shrink-0"></div>
                    <div>
                      <div class="font-semibold text-white mb-1">Long-term Commitment</div>
                      <div class="text-white/80 text-sm">We're partners for the entire journey</div>
                    </div>
                  </li>
                  <li class="flex items-start">
                    <div class="w-2 h-2 rounded-full bg-white mt-2 mr-4 flex-shrink-0"></div>
                    <div>
                      <div class="font-semibold text-white mb-1">Community-Centered Development</div>
                      <div class="text-white/80 text-sm">Building with and for the communities</div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="animate-slide-up-stagger order-1 lg:order-2">
            <div class="relative">
              <img 
                src="/images/wohnzimmerlachen.jpg" 
                alt="Successful partnership and collaboration" 
                class="rounded-3xl w-full h-80 object-cover shadow-xl hover:scale-[1.02] transition-all duration-500"
              />
              <div class="absolute inset-0 rounded-3xl bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Form Section -->
    <section id="contact-form" class="py-16 lg:py-24 bg-white">
      <div class="container-custom">
        <div class="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <!-- Contact Form -->
          <div>
            <div class="animate-slide-up-stagger">
              <h2 class="text-3xl lg:text-4xl font-bold text-black mb-6" style="font-family: 'Inter', system-ui, -apple-system, sans-serif">
                Let's
                <span style="color: #243463">Connect</span>
              </h2>
              <p class="text-lg text-gray-700 mb-8" style="font-family: 'Inter', system-ui, -apple-system, sans-serif">
                Share your vision with us and let's explore how we can bring it to life together.
              </p>
              
              <form ref="contactForm" class="space-y-6" @submit.prevent="submitForm">
                <!-- Name Input -->
                <div>
                  <label for="name" class="block text-sm font-semibold text-black mb-2" style="font-family: 'Inter', system-ui, -apple-system, sans-serif">
                    Your Name
                  </label>
                  <input
                    id="name"
                    v-model="form.name"
                    type="text"
                    required
                    placeholder="John Doe"
                    class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-gray-500/20 transition-all text-black placeholder-gray-500"
                    style="font-family: 'Inter', system-ui, -apple-system, sans-serif"
                  />
                </div>

                <!-- Email Input -->
                <div>
                  <label for="email" class="block text-sm font-semibold text-black mb-2" style="font-family: 'Inter', system-ui, -apple-system, sans-serif">
                    Email
                  </label>
                  <input
                    id="email"
                    v-model="form.email"
                    type="email"
                    required
                    placeholder="founder@socialtech.com"
                    class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-gray-500/20 transition-all text-black placeholder-gray-500"
                    style="font-family: 'Inter', system-ui, -apple-system, sans-serif"
                  />
                </div>

                <!-- Organization Input -->
                <div>
                  <label for="company" class="block text-sm font-semibold text-black mb-2" style="font-family: 'Inter', system-ui, -apple-system, sans-serif">
                    Organization (Optional)
                  </label>
                  <input
                    id="company"
                    v-model="form.company"
                    type="text"
                    placeholder="Your Social Impact Organization"
                    class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-gray-500/20 transition-all text-black placeholder-gray-500"
                    style="font-family: 'Inter', system-ui, -apple-system, sans-serif"
                  />
                </div>

                <!-- Message Input -->
                <div>
                  <label for="message" class="block text-sm font-semibold text-black mb-2" style="font-family: 'Inter', system-ui, -apple-system, sans-serif">
                    Your Project Idea
                  </label>
                  <textarea
                    id="message"
                    v-model="form.message"
                    rows="5"
                    required
                    placeholder="Describe your social-tech project and how you want to create impact..."
                    class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-gray-500/20 transition-all resize-none text-black placeholder-gray-500"
                    style="font-family: 'Inter', system-ui, -apple-system, sans-serif"
                  ></textarea>
                </div>

                <!-- Submit Button -->
                <button
                  type="submit"
                  :disabled="isSubmitting"
                  class="btn-primary w-full text-lg transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span v-if="!isSubmitting">Share Your Impact Idea</span>
                  <span v-else>Sending...</span>
                </button>
              </form>

              <!-- Success Message -->
              <div v-if="submitted" class="mt-6 bg-gray-100 rounded-2xl p-6 text-center animate-slide-up-stagger">
                <div class="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style="background: #243463">
                  <div class="text-2xl font-bold text-white">✓</div>
                </div>
                <h3 class="text-xl font-bold text-black mb-2" style="font-family: 'Inter', system-ui, -apple-system, sans-serif">
                  Thank You!
                </h3>
                <p class="text-gray-700" style="font-family: 'Inter', system-ui, -apple-system, sans-serif">
                  We've received your project idea and will respond within 24 hours.
                </p>
              </div>
            </div>
          </div>

          <!-- Contact Information -->
          <div>
            <div class="animate-slide-up-stagger" style="animation-delay: 0.2s">
              <h2 class="text-3xl lg:text-4xl font-bold text-black mb-6" style="font-family: 'Inter', system-ui, -apple-system, sans-serif">
                Get in
                <span style="color: #243463">Touch</span>
              </h2>
              
              <div class="space-y-6">
                <!-- Email -->
                <div class="bg-gray-100 rounded-2xl p-6">
                  <div style="color: #243463" class="text-sm font-semibold mb-2 uppercase tracking-wider">Email</div>
                  <div class="text-xl font-bold text-black mb-2" style="font-family: 'Inter', system-ui, -apple-system, sans-serif">
                    info.trinsler@gmail.com
                  </div>
                  <p class="text-gray-700 text-sm">
                    Direct project communication with our team
                  </p>
                </div>

                <!-- Response Time -->
                <div class="bg-gray-100 rounded-2xl p-6">
                  <div style="color: #243463" class="text-sm font-semibold mb-2 uppercase tracking-wider">Response Time</div>
                  <div class="text-xl font-bold text-black mb-2" style="font-family: 'Inter', system-ui, -apple-system, sans-serif">
                    Within 24 Hours
                  </div>
                  <p class="text-gray-700 text-sm">
                    Guaranteed first response to every inquiry
                  </p>
                </div>

                <!-- Location -->
                <div class="bg-gray-100 rounded-2xl p-6">
                  <div style="color: #243463" class="text-sm font-semibold mb-2 uppercase tracking-wider">Location</div>
                  <div class="text-xl font-bold text-black mb-2" style="font-family: 'Inter', system-ui, -apple-system, sans-serif">
                    Konstanz, Germany
                  </div>
                  <p class="text-gray-700 text-sm">
                    Serving social impact projects across Europe
                  </p>
                </div>

                <!-- Partnership Info -->
                <div class="bg-gray-100 rounded-2xl p-6">
                  <div style="color: #243463" class="text-sm font-semibold mb-2 uppercase tracking-wider">Partnership Model</div>
                  <div class="text-xl font-bold text-black mb-2" style="font-family: 'Inter', system-ui, -apple-system, sans-serif">
                    Flexible & Fair
                  </div>
                  <p class="text-gray-700 text-sm">
                    We offer flexible partnership models with equity options to make social entrepreneurship accessible.
                  </p>
                </div>
              </div>
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
            What Happens
            <span style="color: #ffffff">Next?</span>
          </h2>
          <p class="text-lg text-white/90 max-w-2xl mx-auto" style="font-family: 'Inter', system-ui, -apple-system, sans-serif">
            Our process ensures your vision gets the attention and expertise it deserves.
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <div class="animate-slide-up-stagger">
            <div class="bg-white rounded-2xl p-8 text-center hover:scale-[1.02] transition-all duration-300 hover:shadow-lg">
              <div class="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" style="background: #243463">
                <span class="text-2xl font-bold text-white">1</span>
              </div>
              <h3 class="text-xl font-bold text-black mb-4" style="font-family: 'Inter', system-ui, -apple-system, sans-serif">
                Initial Response
              </h3>
              <p class="text-gray-700 text-sm leading-relaxed">
                We'll respond within 24 hours to acknowledge your project and schedule an initial discovery call.
              </p>
            </div>
          </div>

          <div class="animate-slide-up-stagger" style="animation-delay: 0.2s">
            <div class="bg-white rounded-2xl p-8 text-center hover:scale-[1.02] transition-all duration-300 hover:shadow-lg">
              <div class="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" style="background: #243463">
                <span class="text-2xl font-bold text-white">2</span>
              </div>
              <h3 class="text-xl font-bold text-black mb-4" style="font-family: 'Inter', system-ui, -apple-system, sans-serif">
                Discovery Call
              </h3>
              <p class="text-gray-700 text-sm leading-relaxed">
                A deep dive into your vision, community needs, and technical requirements to ensure we're the right fit.
              </p>
            </div>
          </div>

          <div class="animate-slide-up-stagger" style="animation-delay: 0.4s">
            <div class="bg-white rounded-2xl p-8 text-center hover:scale-[1.02] transition-all duration-300 hover:shadow-lg">
              <div class="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" style="background: #243463">
                <span class="text-2xl font-bold text-white">3</span>
              </div>
              <h3 class="text-xl font-bold text-black mb-4" style="font-family: 'Inter', system-ui, -apple-system, sans-serif">
                Partnership Proposal
              </h3>
              <p class="text-gray-700 text-sm leading-relaxed">
                We'll present a detailed proposal including timeline, investment structure, and partnership terms.
              </p>
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
  title: 'Contact - Trinsler | Start Your Social Impact Project',
  meta: [
    {
      name: 'description',
      content: 'Ready to build technology that creates real social impact? Contact Trinsler to discuss your project idea. We respond within 24 hours and offer flexible partnership models.',
    },
    {
      name: 'keywords',
      content: 'contact trinsler, social impact project, technology partnership, submit project idea, social entrepreneurship, collaboration'
    }
  ]
})

const form = ref({
  name: '',
  email: '',
  company: '',
  message: '',
})

const submitted = ref(false)
const isSubmitting = ref(false)

// Use our Supabase composable
const { submitContactForm } = useContactForm()

const submitForm = async () => {
  isSubmitting.value = true

  try {
    // Submit form via Supabase
    await submitContactForm({
      name: form.value.name,
      email: form.value.email,
      company: form.value.company,
      message: form.value.message,
    })

    // Show success message
    submitted.value = true

    // Reset form
    form.value = {
      name: '',
      email: '',
      company: '',
      message: '',
    }

    // Hide success message after 5 seconds
    setTimeout(() => {
      submitted.value = false
    }, 5000)
  } catch (error) {
    console.error('Error:', error)
    alert('Error sending message. Please try again later.')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
/* Contact page specific styles will inherit from global color system */
</style>