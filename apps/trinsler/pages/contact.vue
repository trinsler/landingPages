<template>
  <div class="min-h-screen matrix-bg relative overflow-hidden pt-20">
    <!-- Advanced Matrix Effects -->
    <div class="absolute inset-0 cyber-grid opacity-30" />

    <!-- Multiple Data Streams -->
    <div class="absolute inset-0">
      <div
        class="animate-data-stream absolute left-12 w-1 h-56 bg-gradient-to-b from-transparent via-accent-primary to-transparent"
        style="animation-delay: 0s"
      />
      <div
        class="animate-data-stream absolute left-28 w-1 h-40 bg-gradient-to-b from-transparent via-accent-cyan to-transparent"
        style="animation-delay: 1s"
      />
      <div
        class="animate-data-stream absolute right-28 w-1 h-48 bg-gradient-to-b from-transparent via-accent-purple to-transparent"
        style="animation-delay: 2s"
      />
      <div
        class="animate-data-stream absolute right-12 w-1 h-36 bg-gradient-to-b from-transparent via-accent-orange to-transparent"
        style="animation-delay: 3s"
      />
    </div>

    <!-- Floating Code -->
    <div class="absolute inset-0 data-points">
      <div class="floating-element absolute top-20 left-20 text-accent-primary text-xs opacity-60">
        Projekt starten
      </div>
      <div
        class="floating-element absolute top-40 right-24 text-accent-cyan text-xs opacity-60"
        style="animation-delay: 1s"
      >
        Anfrage senden
      </div>
      <div
        class="floating-element absolute bottom-32 left-1/4 text-accent-purple text-xs opacity-60"
        style="animation-delay: 2s"
      >
        Web-Development
      </div>
    </div>

    <div class="relative container-custom py-20">
      <!-- Giant Terminal Interface -->
      <div class="cyber-card rounded-3xl overflow-hidden max-w-7xl mx-auto animate-glow-pulse">
        <!-- Terminal Header -->
        <div class="bg-surface-1 px-6 py-4 border-b border-accent-primary/30">
          <div class="flex items-center gap-3">
            <div class="w-4 h-4 rounded-full bg-red-500" />
            <div class="w-4 h-4 rounded-full bg-yellow-500" />
            <div class="w-4 h-4 rounded-full bg-accent-primary" />
            <div class="ml-4 text-accent-cyan text-lg">Kontakt - Web-Development</div>
          </div>
        </div>

        <!-- Terminal Content -->
        <div class="p-8 lg:p-12 code-pattern">
          <!-- System Initialization -->
          <div class="mb-8">
            <div
              class="inline-flex items-center neon-card rounded-full px-6 py-3 text-sm font-semibold"
            >
              <div class="w-2 h-2 bg-accent-primary rounded-full mr-3" />
              <span class="text-accent-cyan">Kontakt</span>
              <span class="text-white ml-2">Web-Development</span>
            </div>
          </div>

          <!-- ASCII Header -->
          <div class="mb-12 text-center">
            <h1 class="text-4xl sm:text-6xl lg:text-7xl font-black text-white mb-6">
              <span class="text-accent-primary">Bereit für Ihr</span>
              <br />
              <span class="gradient-text-neon">Web-Projekt?</span>
            </h1>
          </div>

          <div class="grid lg:grid-cols-2 gap-12">
            <!-- Contact Form -->
            <div>
              <!-- Terminal Form Header -->
              <div class="cyber-card rounded-2xl overflow-hidden mb-6">
                <div class="bg-surface-1 px-4 py-3 border-b border-accent-primary/30">
                  <div class="flex items-center gap-2">
                    <div class="w-2 h-2 rounded-full bg-accent-primary" />
                    <div class="text-accent-cyan text-sm">Kontaktformular</div>
                  </div>
                </div>

                <div class="p-6 code-pattern">
                  <form ref="contactForm" class="space-y-6" @submit.prevent="submitForm">
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
                        />
                        <div
                          v-if="activeField === 'name'"
                          class="absolute -right-2 top-1/2 transform -translate-y-1/2 text-accent-primary"
                        >
                          ●
                        </div>
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
                        />
                        <div
                          v-if="activeField === 'email'"
                          class="absolute -right-2 top-1/2 transform -translate-y-1/2 text-accent-purple"
                        >
                          ●
                        </div>
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
                        />
                        <div
                          v-if="activeField === 'company'"
                          class="absolute -right-2 top-1/2 transform -translate-y-1/2 text-accent-orange"
                        >
                          ●
                        </div>
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
                          placeholder="Beschreiben Sie Ihr Web-Projekt und Ihre Anforderungen..."
                          class="w-full bg-surface-2 border border-accent-cyan/30 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-accent-cyan focus:ring-2 focus:ring-accent-cyan/20 transition-all resize-none"
                          @focus="activeField = 'message'"
                          @blur="activeField = ''"
                        />
                        <div
                          v-if="activeField === 'message'"
                          class="absolute -right-2 top-4 text-accent-cyan"
                        >
                          ●
                        </div>
                      </div>
                    </div>

                    <!-- Submit Button -->
                    <button
                      type="submit"
                      :disabled="isSubmitting"
                      class="btn-primary w-full text-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span v-if="!isSubmitting">Nachricht senden</span>
                      <span v-else>Wird gesendet...</span>
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
                    <div class="w-2 h-2 rounded-full bg-accent-cyan" />
                    <div class="text-accent-cyan text-sm">Kontaktinformationen</div>
                  </div>
                </div>

                <div class="p-6 code-pattern">
                  <div class="space-y-6">
                    <!-- Email -->
                    <div class="neon-card rounded-xl p-4">
                      <div class="text-accent-cyan text-sm mb-2">E-Mail</div>
                      <div class="text-white font-bold text-lg mb-1">hello@trinsler.de</div>
                      <div class="text-white/60 text-xs">Direkte Projekt-Kommunikation</div>
                    </div>

                    <!-- Response Time -->
                    <div class="cyber-card rounded-xl p-4">
                      <div class="text-accent-purple text-sm mb-2">Antwortzeit</div>
                      <div class="text-white font-bold text-lg mb-1">&lt; 24 Stunden</div>
                      <div class="text-white/60 text-xs">Garantierte erste Antwort</div>
                    </div>

                    <!-- Availability -->
                    <div class="glass-card rounded-xl p-4">
                      <div class="text-accent-orange text-sm mb-2">Verfügbarkeit</div>
                      <div class="text-white font-bold text-lg mb-1">Flexible Projektbetreuung</div>
                      <div class="text-white/60 text-xs">Kontinuierlicher Support</div>
                    </div>

                    <!-- Location -->
                    <div class="neon-card rounded-xl p-4">
                      <div class="text-accent-primary text-sm mb-2">Standort</div>
                      <div class="text-white font-bold mb-1">
                        Berlin, Deutschland<br />
                        EU Startup Hub
                      </div>
                      <div class="text-white/60 text-xs">Lokale Web-Development Expertise</div>
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
                        <div class="text-accent-purple mb-1">Neue Projekte</div>
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
              <div class="text-white mb-2">Web-Projekt Anfrage erhalten!</div>
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
  title: 'Kontakt - Trinsler Web-Development',
})

const form = ref({
  name: '',
  email: '',
  company: '',
  message: '',
})

const activeField = ref('')
const submitted = ref(false)
const isSubmitting = ref(false)

const submitForm = async () => {
  isSubmitting.value = true

  try {
    // Send email via Formspree
    const response = await fetch('https://formspree.io/f/xpwavvke', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: form.value.name,
        email: form.value.email,
        company: form.value.company,
        message: form.value.message,
        _replyto: form.value.email,
        _subject: `Web-Projekt Anfrage von ${form.value.name}`,
      }),
    })

    if (response.ok) {
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
    } else {
      throw new Error('Network response was not ok')
    }
  } catch (error) {
    console.error('Error:', error)
    alert('Fehler beim Senden der Nachricht. Bitte versuchen Sie es später erneut.')
  } finally {
    isSubmitting.value = false
  }
}
</script>
