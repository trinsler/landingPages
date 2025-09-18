<template>
  <div class="min-h-screen matrix-bg relative overflow-hidden">
    <!-- Advanced Matrix Effects -->
    <div class="absolute inset-0 cyber-grid opacity-30"></div>
    
    <!-- Multiple Data Streams -->
    <div class="absolute inset-0">
      <div class="animate-data-stream absolute left-12 w-1 h-56 bg-gradient-to-b from-transparent via-accent-primary to-transparent" style="animation-delay: 0s;"></div>
      <div class="animate-data-stream absolute left-28 w-1 h-40 bg-gradient-to-b from-transparent via-accent-cyan to-transparent" style="animation-delay: 1s;"></div>
      <div class="animate-data-stream absolute right-28 w-1 h-48 bg-gradient-to-b from-transparent via-accent-purple to-transparent" style="animation-delay: 2s;"></div>
      <div class="animate-data-stream absolute right-12 w-1 h-36 bg-gradient-to-b from-transparent via-accent-orange to-transparent" style="animation-delay: 3s;"></div>
    </div>

    <!-- Floating Code -->
    <div class="absolute inset-0 data-points">
      <div class="floating-element absolute top-20 left-20 code-font text-accent-primary text-xs opacity-60">connect.establish()</div>
      <div class="floating-element absolute top-40 right-24 code-font text-accent-cyan text-xs opacity-60" style="animation-delay: 1s;">message.send()</div>
      <div class="floating-element absolute bottom-32 left-1/4 code-font text-accent-purple text-xs opacity-60" style="animation-delay: 2s;">partnership.init()</div>
    </div>

    <div class="relative container-custom py-20">
      <!-- Giant Terminal Interface -->
      <div class="cyber-card rounded-3xl overflow-hidden max-w-7xl mx-auto animate-glow-pulse">
        <!-- Terminal Header -->
        <div class="bg-surface-1 px-6 py-4 border-b border-accent-primary/30">
          <div class="flex items-center gap-3">
            <div class="w-4 h-4 rounded-full bg-red-500"></div>
            <div class="w-4 h-4 rounded-full bg-yellow-500"></div>
            <div class="w-4 h-4 rounded-full bg-accent-primary"></div>
            <div class="ml-4 text-accent-cyan text-lg">Kontakt - Growth Partnership</div>
          </div>
        </div>

        <!-- Terminal Content -->
        <div class="p-8 lg:p-12 code-pattern">
          <!-- System Initialization -->
          <div class="mb-8">
            <div class="inline-flex items-center neon-card rounded-full px-6 py-3 text-sm font-semibold">
              <div class="w-2 h-2 bg-accent-primary rounded-full mr-3"></div>
              <span class="text-accent-cyan">Kontakt</span>
              <span class="text-white ml-2">Growth Partnership</span>
            </div>
          </div>

          <!-- ASCII Header -->
          <div class="mb-12 text-center">
            <h1 class="text-4xl sm:text-6xl lg:text-7xl font-black text-white mb-6">
              <span class="text-accent-primary">Bereit für</span>
              <br />
              <span class="gradient-text-neon">Wachstum?</span>
            </h1>
          </div>

          <div class="grid lg:grid-cols-2 gap-12">
            <!-- Contact Form -->
            <div>
              <!-- Terminal Form Header -->
              <div class="cyber-card rounded-2xl overflow-hidden mb-6">
                <div class="bg-surface-1 px-4 py-3 border-b border-accent-primary/30">
                  <div class="flex items-center gap-2">
                    <div class="w-2 h-2 rounded-full bg-accent-primary"></div>
                    <div class="text-accent-cyan text-sm">Kontaktformular</div>
                  </div>
                </div>
                
                <div class="p-6 code-pattern">
                  <form @submit.prevent="submitForm" class="space-y-6">
                    <!-- Name Input -->
                    <div>
                      <label class="text-accent-cyan text-sm mb-2 block">Ihr Name</label>
                      <div class="relative">
                        <input
                          id="name"
                          v-model="form.name"
                          type="text"
                          required
                          placeholder="Max Mustermann"
                          class="w-full bg-surface-2 border border-accent-primary/30 rounded-xl px-4 py-3 text-white focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/20 transition-all"
                          @focus="activeField = 'name'"
                          @blur="activeField = ''"
                        >
                        <div v-if="activeField === 'name'" class="absolute -right-2 top-1/2 transform -translate-y-1/2 text-accent-primary">●</div>
                      </div>
                    </div>

                    <!-- Email Input -->
                    <div>
                      <label class="text-accent-purple text-sm mb-2 block">E-Mail</label>
                      <div class="relative">
                        <input
                          id="email"
                          v-model="form.email"
                          type="email"
                          required
                          placeholder="founder@startup.com"
                          class="w-full bg-surface-2 border border-accent-purple/30 rounded-xl px-4 py-3 text-white focus:border-accent-purple focus:ring-2 focus:ring-accent-purple/20 transition-all"
                          @focus="activeField = 'email'"
                          @blur="activeField = ''"
                        >
                        <div v-if="activeField === 'email'" class="absolute -right-2 top-1/2 transform -translate-y-1/2 text-accent-purple">●</div>
                      </div>
                    </div>

                    <!-- Company Input -->
                    <div>
                      <label class="text-accent-orange text-sm mb-2 block">Unternehmen</label>
                      <div class="relative">
                        <input
                          id="company"
                          v-model="form.company"
                          type="text"
                          placeholder="YourStartup GmbH"
                          class="w-full bg-surface-2 border border-accent-orange/30 rounded-xl px-4 py-3 text-white focus:border-accent-orange focus:ring-2 focus:ring-accent-orange/20 transition-all"
                          @focus="activeField = 'company'"
                          @blur="activeField = ''"
                        >
                        <div v-if="activeField === 'company'" class="absolute -right-2 top-1/2 transform -translate-y-1/2 text-accent-orange">●</div>
                      </div>
                    </div>

                    <!-- Message Input -->
                    <div>
                      <label class="text-accent-cyan text-sm mb-2 block">Ihre Nachricht</label>
                      <div class="relative">
                        <textarea
                          id="message"
                          v-model="form.message"
                          rows="5"
                          required
                          placeholder="Beschreiben Sie Ihr Startup und Ihre Wachstums-Herausforderungen..."
                          class="w-full bg-surface-2 border border-accent-cyan/30 rounded-xl px-4 py-3 text-white focus:border-accent-cyan focus:ring-2 focus:ring-accent-cyan/20 transition-all resize-none"
                          @focus="activeField = 'message'"
                          @blur="activeField = ''"
                        ></textarea>
                        <div v-if="activeField === 'message'" class="absolute -right-2 top-4 text-accent-cyan">●</div>
                      </div>
                    </div>

                    <!-- Submit Button -->
                    <button
                      type="submit"
                      class="btn-primary w-full text-lg hover:scale-105 transition-all duration-300"
                    >
                      <span>Nachricht senden</span>
                    </button>
                  </form>
                </div>
              </div>
            </div>

            <!-- System Info Terminal -->
            <div>
              <!-- Contact Info Terminal -->
              <div class="cyber-card rounded-2xl overflow-hidden">
                <div class="bg-surface-1 px-4 py-3 border-b border-accent-primary/30">
                  <div class="flex items-center gap-2">
                    <div class="w-2 h-2 rounded-full bg-accent-cyan"></div>
                    <div class="text-accent-cyan text-sm">Kontaktinformationen</div>
                  </div>
                </div>
                
                <div class="p-6 code-pattern">
                  <div class="space-y-6">
                    <!-- Email -->
                    <div class="neon-card rounded-xl p-4">
                      <div class="text-accent-cyan text-sm mb-2">E-Mail</div>
                      <div class="text-white font-bold text-lg mb-1">hello@trinsler.de</div>
                      <div class="text-white/60 text-xs">Direkte Startup-Kommunikation</div>
                    </div>

                    <!-- Response Time -->
                    <div class="cyber-card rounded-xl p-4">
                      <div class="text-accent-purple text-sm mb-2">Antwortzeit</div>
                      <div class="text-white font-bold text-lg mb-1">< 24 Stunden</div>
                      <div class="text-white/60 text-xs">Garantierte erste Antwort</div>
                    </div>

                    <!-- Availability -->
                    <div class="glass-card rounded-xl p-4">
                      <div class="text-accent-orange text-sm mb-2">Verfügbarkeit</div>
                      <div class="text-white font-bold text-lg mb-1">24/7 Growth Support</div>
                      <div class="text-white/60 text-xs">Kontinuierliche Partnerschaft</div>
                    </div>

                    <!-- Location -->
                    <div class="neon-card rounded-xl p-4">
                      <div class="text-accent-primary text-sm mb-2">Standort</div>
                      <div class="text-white font-bold mb-1">
                        Berlin, Deutschland<br>
                        EU Startup Hub
                      </div>
                      <div class="text-white/60 text-xs">Zentrale europäische Operationen</div>
                    </div>
                  </div>

                  <!-- Live Status -->
                  <div class="mt-8 pt-6 border-t border-accent-primary/20">
                    <div class="grid grid-cols-2 gap-4 text-sm">
                      <div class="text-center">
                        <div class="text-accent-cyan mb-1">Status</div>
                        <div class="text-accent-primary">● Online</div>
                      </div>
                      <div class="text-center">
                        <div class="text-accent-purple mb-1">Partnerschaften</div>
                        <div class="text-white font-bold">Verfügbar</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Success Message Terminal -->
          <div v-if="submitted" class="mt-8 cyber-card rounded-2xl p-6 animate-slide-up-stagger">
            <div class="neon-card rounded-xl p-4 text-center">
              <div class="text-2xl text-glow-blue mb-2">✓ Nachricht gesendet</div>
              <div class="text-white mb-2">Growth Partnership Anfrage erhalten!</div>
              <div class="text-accent-cyan text-sm">Wir melden uns binnen 24 Stunden...</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'Kontakt - Trinsler Growth Protocol'
})

const form = ref({
  name: '',
  email: '',
  company: '',
  message: ''
})

const activeField = ref('')
const submitted = ref(false)

const submitForm = () => {
  // Simulate form submission
  console.log('Partnership request:', form.value)
  submitted.value = true
  
  // Reset form after successful submission
  setTimeout(() => {
    form.value = {
      name: '',
      email: '',
      company: '',
      message: ''
    }
    submitted.value = false
  }, 5000)
}
</script>