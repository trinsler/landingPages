<template>
  <section id="portfolio" class="relative py-16 lg:py-24" style="background: #243463">
    <div class="relative container-custom">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold text-white mb-6" style="font-family: 'Inter', system-ui, -apple-system, sans-serif">
          Projects That
          <span style="color: #ffffff">Empower</span>
          Communities
        </h2>
        <p class="text-lg text-white/90 max-w-3xl mx-auto" style="font-family: 'Inter', system-ui, -apple-system, sans-serif">
          Our social impact projects strengthen human connections and create meaningful change in communities worldwide.
        </p>
      </div>

      <!-- Projects Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-16">
        <div
          v-for="(project, index) in projects"
          :key="project.title"
          class="group animate-slide-up-stagger"
          :style="`animation-delay: ${index * 0.2}s`"
        >
          <!-- Compact Project Card -->
          <div class="bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
            <!-- Project Image -->
            <div class="relative h-48 overflow-hidden">
              <img
                :src="project.image"
                :alt="project.title"
                class="w-full h-full object-cover"
                onerror="this.style.display='none'"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              
              <!-- Project Status Badge -->
              <div class="absolute top-4 left-4">
                <span class="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-black text-xs font-medium">
                  {{ project.status }}
                </span>
              </div>
              
              <!-- Project Title -->
              <div class="absolute bottom-4 left-4 right-4">
                <h3 class="text-xl font-bold text-white mb-1">{{ project.title }}</h3>
                <div class="text-sm text-white">{{ project.stats }} {{ project.statsLabel }}</div>
              </div>
            </div>

            <!-- Project Details -->
            <div class="p-6">
              <p class="text-gray-700 text-sm leading-relaxed mb-4">{{ project.description }}</p>
              
              <!-- Testimonial -->
              <div class="mb-4">
                <div class="text-gray-900 text-sm mb-2">"{{ project.testimonial.quote }}"</div>
                <div class="flex items-center gap-2">
                  <img :src="project.testimonial.avatar" :alt="project.testimonial.name" class="w-8 h-8 rounded-full object-cover">
                  <div>
                    <div class="text-black font-medium text-xs">{{ project.testimonial.name }}</div>
                    <div class="text-gray-600 text-xs">{{ project.testimonial.role }}</div>
                  </div>
                </div>
              </div>
              
              <!-- Call to Actions -->
              <div class="flex flex-col gap-3">
                <a
                  v-if="project.title === 'BetterClassroom'"
                  href="https://betterclassroom.trinsler.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn-primary w-full text-center text-sm inline-block"
                >
                  Visit BetterClassroom
                </a>
                <button
                  v-else
                  @click="showDevelopmentPopup(project.title)"
                  class="btn-primary w-full text-center text-sm"
                >
                  More Information
                </button>
                <button
                  @click="showDevelopmentPopup(project.title)"
                  class="w-full text-center text-sm py-3 px-4 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                  style="background: #243463; color: white; border: 2px solid #243463;"
                >
                  Become Business Partner
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Section CTA -->
      <div class="text-center">
        <div class="bg-white rounded-2xl p-8 max-w-3xl mx-auto">
          <h3 class="text-2xl font-bold text-black mb-4" style="font-family: 'Inter', system-ui, -apple-system, sans-serif">
            Ready to Create
            <span style="color: #243463">Social Impact?</span>
          </h3>
          <p class="text-gray-700 leading-relaxed mb-6" style="font-family: 'Inter', system-ui, -apple-system, sans-serif">
            Transform your social impact vision into reality with our professional development team.
          </p>
          <NuxtLink
            to="/contact"
            class="btn-primary"
          >
            Start Your Impact Project
          </NuxtLink>
        </div>
      </div>
    </div>
    
    <!-- Development Popup -->
    <div 
      v-if="showPopup" 
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      @click="showPopup = false"
    >
      <div 
        class="bg-white rounded-2xl p-8 max-w-md w-full mx-4"
        @click.stop
      >
        <h3 class="text-2xl font-bold text-black mb-4" style="font-family: 'Inter', system-ui, -apple-system, sans-serif">
          {{ popupTitle }}
        </h3>
        <p class="text-gray-700 leading-relaxed mb-6" style="font-family: 'Inter', system-ui, -apple-system, sans-serif">
          Still in development. Please come back later to learn more about this exciting project.
        </p>
        <button 
          @click="showPopup = false"
          class="btn-primary w-full"
        >
          Got it
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
// Portfolio Section Component

const projects = [
  {
    title: 'BetterClassroom',
    description: 'An innovative learning platform that digitizes and simplifies communication between teachers and students. BetterClassroom enables students to digitally raise their hand, ask questions, and actively participate in class, while teachers maintain oversight and can respond to students in a targeted manner.',
    tags: ['Education', 'Digital Learning', 'Teacher-Student Communication', 'Classroom Management'],
    status: 'LIVE',
    stats: 'Available Now',
    statsLabel: 'BetterClassroom.com',
    image: '/images/seniorsstudents.jpg',
    story: 'BetterClassroom was developed to support digital transformation in the classroom. The platform simplifies daily communication and helps teachers make lessons more interactive and student-centered.',
    testimonial: {
      quote: 'BetterClassroom has revolutionized communication in our classes. Students can easily participate and we maintain better oversight.',
      name: 'HTWG Konstanz',
      role: 'University of Applied Sciences',
      avatar: '/images/studentWithIpad.jpg'
    }
  },
  {
    title: 'Nächstenliebe',
    description: 'A hyper-local, community-driven platform that redefines neighborhood support. Nächstenliebe connects students and young people with seniors in their village for grocery shopping assistance and companionship, creating meaningful intergenerational connections.',
    tags: ['Community', 'Social Impact', 'Local Support', 'Senior Care'],
    status: 'IN DEVELOPMENT',
    stats: 'Coming Soon',
    statsLabel: 'Launching Q1 2025',
    image: '/images/Nächstenliebe.jpg',
    story: 'Currently in development phase, Nächstenliebe aims to bridge generational gaps through technology-enabled community support. We are working with local communities to ensure the platform meets real needs.',
    testimonial: {
      quote: 'We believe technology should bring people together, not keep them apart. This platform will help our village thrive.',
      name: 'Local Community Leader',
      role: 'Development Partner',
      avatar: '/images/wohnzimmer.jpg'
    }
  },
  {
    title: 'TheraConnect',
    description: 'Revolutionizing mental health support by making therapy more accessible and transparent. TheraConnect helps patients find the right therapist based on verified reviews and specialized needs, while providing practitioners with tools for secure client communication.',
    tags: ['Healthcare', 'Mental Health', 'B2B', 'Digital Health'],
    status: 'IN DEVELOPMENT',
    stats: 'Beta Testing',
    statsLabel: 'Coming Q2 2025',
    image: '/images/theraconnect.jpg',
    story: 'TheraConnect addresses a critical gap in mental healthcare accessibility. We are currently developing the platform with input from mental health professionals and patients to ensure it serves real needs effectively.',
    testimonial: {
      quote: 'Mental health support should be accessible to everyone. We are building tools that will transform how people find the right therapist.',
      name: 'Healthcare Professional',
      role: 'Development Advisor',
      avatar: '/images/kleineKinder.jpg'
    }
  },
  {
    title: 'Visit.Ghana',
    description: 'More than a travel app, Visit.Ghana is a cultural exchange platform connecting tourists directly with local hosts for authentic, everyday experiences—from cooking classes to artisan workshops. This model ensures tourism revenue flows directly into local communities.',
    tags: ['Travel', 'Cultural Exchange', 'Economic Empowerment', 'Sustainable Tourism'],
    status: 'PLANNING',
    stats: 'Concept Phase',
    statsLabel: 'Coming 2025',
    image: '/images/ghanavisit.jpg',
    story: 'Visit.Ghana represents a new paradigm in sustainable tourism. We are currently in the concept phase, working with local communities in Ghana to ensure the platform will provide authentic cultural experiences while benefiting local economies.',
    testimonial: {
      quote: 'Cultural exchange should benefit everyone involved. We are designing a platform that respects both tourists and local communities.',
      name: 'Cultural Exchange Coordinator',
      role: 'Development Partner',
      avatar: '/images/freundeHuckepack.jpg'
    }
  },
]

// State for popup
const showPopup = ref(false)
const popupTitle = ref('')

// Function to show development popup
const showDevelopmentPopup = (projectName) => {
  popupTitle.value = projectName
  showPopup.value = true
}
</script>

<style scoped>
/* Portfolio specific styles will inherit from global color system */
</style>