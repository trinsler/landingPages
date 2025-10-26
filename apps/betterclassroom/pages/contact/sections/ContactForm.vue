<template>
  <div class="space-y-8">
    <!-- Creative Header -->
    <div class="space-y-6">
      <div class="inline-flex items-center space-x-3 bg-gradient-to-r from-custom-primary/10 to-custom-secondary/10 rounded-full px-6 py-3 border border-custom-secondary/20">
        <svg class="w-5 h-5 text-custom-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
        </svg>
        <span class="text-custom-primary font-semibold">Kontakt aufnehmen</span>
      </div>
      
      <h2 class="text-4xl lg:text-6xl font-bold text-custom-primary leading-tight">
        Demo
        <br>
        <span class="text-3xl lg:text-5xl font-light bg-gradient-to-r from-custom-primary to-custom-secondary bg-clip-text text-transparent">anfordern</span>
      </h2>
      
      <p class="text-lg lg:text-xl text-custom-primary/70 leading-relaxed font-light max-w-md">
        Füllen Sie das Formular aus und wir melden uns innerhalb von 24 Stunden bei Ihnen, um eine persönliche Demo zu vereinbaren.
      </p>
    </div>
    
    <form ref="contactForm" class="space-y-6" @submit.prevent="submitForm">
      <!-- Institution Name -->
      <div>
        <label for="institution" class="block text-sm font-bold text-custom-primary mb-2">
          Institution / Bildungseinrichtung *
        </label>
        <input
          id="institution"
          v-model="form.institution"
          type="text"
          required
          placeholder="z.B. Universität Konstanz, FH Münster"
          class="w-full px-4 py-4 rounded-2xl border-2 border-custom-secondary/20 focus:border-custom-primary focus:ring-2 focus:ring-custom-primary/20 transition-all text-custom-primary placeholder-custom-primary/40 bg-custom-white hover:shadow-lg"
        />
      </div>

      <!-- Contact Person -->
      <div class="grid md:grid-cols-2 gap-4">
        <div>
          <label for="name" class="block text-sm font-bold text-custom-primary mb-2">
            Ihr Name *
          </label>
          <input
            id="name"
            v-model="form.name"
            type="text"
            required
            placeholder="Dr. Maria Müller"
            class="w-full px-4 py-4 rounded-2xl border-2 border-custom-secondary/20 focus:border-custom-primary focus:ring-2 focus:ring-custom-primary/20 transition-all text-custom-primary placeholder-custom-primary/40 bg-custom-white hover:shadow-lg"
          />
        </div>
        <div>
          <label for="position" class="block text-sm font-bold text-custom-primary mb-2">
            Position / Funktion
          </label>
          <input
            id="position"
            v-model="form.position"
            type="text"
            placeholder="Dekan, IT-Leiter, Professor"
            class="w-full px-4 py-4 rounded-2xl border-2 border-custom-secondary/20 focus:border-custom-primary focus:ring-2 focus:ring-custom-primary/20 transition-all text-custom-primary placeholder-custom-primary/40 bg-custom-white hover:shadow-lg"
          />
        </div>
      </div>

      <!-- Contact Information -->
      <div class="grid md:grid-cols-2 gap-4">
        <div>
          <label for="email" class="block text-sm font-bold text-custom-primary mb-2">
            E-Mail-Adresse *
          </label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            required
            placeholder="maria.mueller@uni-konstanz.de"
            class="w-full px-4 py-4 rounded-2xl border-2 border-custom-secondary/20 focus:border-custom-primary focus:ring-2 focus:ring-custom-primary/20 transition-all text-custom-primary placeholder-custom-primary/40 bg-custom-white hover:shadow-lg"
          />
        </div>
        <div>
          <label for="phone" class="block text-sm font-bold text-custom-primary mb-2">
            Telefon (Optional)
          </label>
          <input
            id="phone"
            v-model="form.phone"
            type="tel"
            placeholder="+49 7531 88-1234"
            class="w-full px-4 py-4 rounded-2xl border-2 border-custom-secondary/20 focus:border-custom-primary focus:ring-2 focus:ring-custom-primary/20 transition-all text-custom-primary placeholder-custom-primary/40 bg-custom-white hover:shadow-lg"
          />
        </div>
      </div>

      <!-- Institution Details -->
      <div class="grid md:grid-cols-2 gap-4">
        <div>
          <label for="type" class="block text-sm font-bold text-custom-primary mb-2">
            Art der Einrichtung
          </label>
          <select
            id="type"
            v-model="form.type"
            class="w-full px-4 py-4 rounded-2xl border-2 border-custom-secondary/20 focus:border-custom-primary focus:ring-2 focus:ring-custom-primary/20 transition-all text-custom-primary bg-custom-white hover:shadow-lg"
          >
            <option value="">Bitte auswählen</option>
            <option value="university">Universität</option>
            <option value="fachhochschule">Fachhochschule</option>
            <option value="berufsschule">Berufsschule</option>
            <option value="gymnasium">Gymnasium</option>
            <option value="realschule">Realschule</option>
            <option value="grundschule">Grundschule</option>
            <option value="weiterbildung">Weiterbildungseinrichtung</option>
            <option value="other">Andere</option>
          </select>
        </div>
        <div>
          <label for="students" class="block text-sm font-bold text-custom-primary mb-2">
            Anzahl Studierende/Schüler
          </label>
          <select
            id="students"
            v-model="form.students"
            class="w-full px-4 py-4 rounded-2xl border-2 border-custom-secondary/20 focus:border-custom-primary focus:ring-2 focus:ring-custom-primary/20 transition-all text-custom-primary bg-custom-white hover:shadow-lg"
          >
            <option value="">Bitte auswählen</option>
            <option value="under500">Unter 500</option>
            <option value="500-1000">500 - 1.000</option>
            <option value="1000-5000">1.000 - 5.000</option>
            <option value="5000-10000">5.000 - 10.000</option>
            <option value="10000+">Über 10.000</option>
          </select>
        </div>
      </div>

      <!-- Interest Areas -->
      <div>
        <label class="block text-sm font-bold text-custom-primary mb-3">
          Interessensgebiete (Mehrfachauswahl möglich)
        </label>
        <div class="grid md:grid-cols-2 gap-3">
          <label class="flex items-center p-3 rounded-xl border border-custom-secondary/20 hover:bg-custom-secondary/5 transition-all cursor-pointer">
            <input
              v-model="form.interests"
              type="checkbox"
              value="digital_notifications"
              class="mr-3 rounded border-custom-secondary/40 text-custom-primary focus:ring-custom-primary"
            >
            <span class="text-custom-primary font-medium">Digitale Wortmeldungen</span>
          </label>
          <label class="flex items-center p-3 rounded-xl border border-custom-secondary/20 hover:bg-custom-secondary/5 transition-all cursor-pointer">
            <input
              v-model="form.interests"
              type="checkbox"
              value="real_time_dashboard"
              class="mr-3 rounded border-custom-secondary/40 text-custom-primary focus:ring-custom-primary"
            >
            <span class="text-custom-primary font-medium">Echtzeit-Dashboard</span>
          </label>
          <label class="flex items-center p-3 rounded-xl border border-custom-secondary/20 hover:bg-custom-secondary/5 transition-all cursor-pointer">
            <input
              v-model="form.interests"
              type="checkbox"
              value="seating_plan"
              class="mr-3 rounded border-custom-secondary/40 text-custom-primary focus:ring-custom-primary"
            >
            <span class="text-custom-primary font-medium">Intelligenter Sitzplan</span>
          </label>
          <label class="flex items-center p-3 rounded-xl border border-custom-secondary/20 hover:bg-custom-secondary/5 transition-all cursor-pointer">
            <input
              v-model="form.interests"
              type="checkbox"
              value="analytics"
              class="mr-3 rounded border-custom-secondary/40 text-custom-primary focus:ring-custom-primary"
            >
            <span class="text-custom-primary font-medium">Analytics & Reporting</span>
          </label>
          <label class="flex items-center p-3 rounded-xl border border-custom-secondary/20 hover:bg-custom-secondary/5 transition-all cursor-pointer">
            <input
              v-model="form.interests"
              type="checkbox"
              value="integration"
              class="mr-3 rounded border-custom-secondary/40 text-custom-primary focus:ring-custom-primary"
            >
            <span class="text-custom-primary font-medium">System-Integration</span>
          </label>
          <label class="flex items-center p-3 rounded-xl border border-custom-secondary/20 hover:bg-custom-secondary/5 transition-all cursor-pointer">
            <input
              v-model="form.interests"
              type="checkbox"
              value="training"
              class="mr-3 rounded border-custom-secondary/40 text-custom-primary focus:ring-custom-primary"
            >
            <span class="text-custom-primary font-medium">Schulungen & Support</span>
          </label>
        </div>
      </div>

      <!-- Message -->
      <div>
        <label for="message" class="block text-sm font-bold text-custom-primary mb-2">
          Nachricht / Spezielle Anforderungen
        </label>
        <textarea
          id="message"
          v-model="form.message"
          rows="5"
          placeholder="Beschreiben Sie Ihre aktuellen Herausforderungen im Klassenzimmer-Management und was Sie sich von BetterClassroom erhoffen..."
          class="w-full px-4 py-4 rounded-2xl border-2 border-custom-secondary/20 focus:border-custom-primary focus:ring-2 focus:ring-custom-primary/20 transition-all resize-none text-custom-primary placeholder-custom-primary/40 bg-custom-white hover:shadow-lg"
        ></textarea>
      </div>

      <!-- Privacy -->
      <div class="flex items-start p-4 rounded-xl bg-custom-secondary/5 border border-custom-secondary/20">
        <input
          id="privacy"
          v-model="form.privacy"
          type="checkbox"
          required
          class="mt-1 mr-3 rounded border-custom-secondary/40 text-custom-primary focus:ring-custom-primary"
        >
        <label for="privacy" class="text-sm text-custom-primary/80 leading-relaxed">
          Ich stimme der Verarbeitung meiner Daten gemäß der 
          <NuxtLink to="/legal/datenschutz" class="text-custom-primary hover:text-custom-secondary transition-colors underline font-medium">Datenschutzerklärung</NuxtLink> 
          zu und bin damit einverstanden, dass mich BetterClassroom für Demo-Zwecke kontaktiert. *
        </label>
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        :disabled="isSubmitting"
        class="group w-full py-4 px-8 text-lg font-light tracking-wide bg-gradient-to-r from-custom-primary to-custom-secondary text-custom-white rounded-full hover:shadow-2xl transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden relative"
      >
        <span class="relative z-10 flex items-center justify-center space-x-3">
          <span v-if="!isSubmitting">Demo anfordern</span>
          <span v-else>Wird gesendet...</span>
          <svg v-if="!isSubmitting" class="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
          </svg>
        </span>
        <div class="absolute inset-0 bg-gradient-to-r from-custom-secondary to-custom-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </button>
    </form>

    <!-- Success Message -->
    <div v-if="submitted" class="mt-8 bg-green-50 border border-green-200 rounded-2xl p-6 text-center">
      <div class="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-green-100">
        <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
        </svg>
      </div>
      <h3 class="text-xl font-bold text-green-800 mb-2">Vielen Dank!</h3>
      <p class="text-green-700">
        Ihre Demo-Anfrage wurde erfolgreich gesendet. Wir melden uns innerhalb von 24 Stunden bei Ihnen.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  institution: '',
  name: '',
  position: '',
  email: '',
  phone: '',
  type: '',
  students: '',
  interests: [],
  message: '',
  privacy: false
})

const submitted = ref(false)
const isSubmitting = ref(false)

const submitForm = async () => {
  isSubmitting.value = true

  try {
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Here you would normally send the data to your backend
    console.log('Form submitted:', form.value)
    
    // Show success message
    submitted.value = true
    
    // Reset form
    form.value = {
      institution: '',
      name: '',
      position: '',
      email: '',
      phone: '',
      type: '',
      students: '',
      interests: [],
      message: '',
      privacy: false
    }
    
    // Hide success message after 10 seconds
    setTimeout(() => {
      submitted.value = false
    }, 10000)
    
  } catch (error) {
    console.error('Error submitting form:', error)
    alert('Fehler beim Senden der Nachricht. Bitte versuchen Sie es später erneut oder kontaktieren Sie uns direkt.')
  } finally {
    isSubmitting.value = false
  }
}
</script>