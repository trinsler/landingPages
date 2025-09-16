<template>
  <div class="py-16">
    <div class="container-custom">
      <div class="max-w-2xl mx-auto text-center mb-16">
        <h1 class="text-4xl font-bold text-gray-900 sm:text-5xl mb-6">
          Kontakt
        </h1>
        <p class="text-xl text-gray-600">
          Lassen Sie uns über Ihr digitales Marketing sprechen
        </p>
      </div>

      <div class="grid lg:grid-cols-2 gap-12">
        <div>
          <h2 class="text-2xl font-bold text-gray-900 mb-6">
            Schreiben Sie uns
          </h2>

          <form @submit.prevent="submitForm" class="space-y-6">
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
                Name *
              </label>
              <input
                id="name"
                v-model="form.name"
                type="text"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
            </div>

            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                E-Mail *
              </label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
            </div>

            <div>
              <label for="company" class="block text-sm font-medium text-gray-700 mb-2">
                Unternehmen
              </label>
              <input
                id="company"
                v-model="form.company"
                type="text"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
            </div>

            <div>
              <label for="message" class="block text-sm font-medium text-gray-700 mb-2">
                Nachricht *
              </label>
              <textarea
                id="message"
                v-model="form.message"
                rows="5"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              ></textarea>
            </div>

            <button
              type="submit"
              class="btn-primary w-full"
            >
              Nachricht senden
            </button>
          </form>
        </div>

        <div>
          <h2 class="text-2xl font-bold text-gray-900 mb-6">
            Kontaktinformationen
          </h2>

          <div class="space-y-6">
            <div>
              <h3 class="font-semibold text-gray-900 mb-2">E-Mail</h3>
              <p class="text-gray-600">hello@trinsler.de</p>
            </div>

            <div>
              <h3 class="font-semibold text-gray-900 mb-2">Telefon</h3>
              <p class="text-gray-600">+49 (0) 123 456 789</p>
            </div>

            <div>
              <h3 class="font-semibold text-gray-900 mb-2">Adresse</h3>
              <p class="text-gray-600">
                Musterstraße 123<br>
                12345 Musterstadt<br>
                Deutschland
              </p>
            </div>

            <div>
              <h3 class="font-semibold text-gray-900 mb-2">Öffnungszeiten</h3>
              <p class="text-gray-600">
                Montag - Freitag: 9:00 - 18:00<br>
                Samstag - Sonntag: Geschlossen
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'Kontakt - Trinsler Digital Marketing'
})

const form = ref({
  name: '',
  email: '',
  company: '',
  message: ''
})

const submitForm = () => {
  // Form submission logic would go here
  console.log('Form submitted:', form.value)
  alert('Vielen Dank für Ihre Nachricht! Wir melden uns bald bei Ihnen.')
}
</script>