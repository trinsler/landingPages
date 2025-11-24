<template>
  <div class="faq-screen">
    <div class="faq-content">
      <h1 class="faq-title">{{ t('faqTitle', globalTranslations) }}</h1>
      
      <div class="search-container">
        <input
          v-model="searchQuery"
          type="text"
          :placeholder="tLocal('searchPlaceholder')"
          class="search-input"
        />
      </div>
      
      <div class="faq-categories">
        <button
          v-for="category in categories"
          :key="category.id"
          @click="selectedCategory = category.id"
          class="category-button"
          :class="{ active: selectedCategory === category.id }"
        >
          {{ category.name }}
        </button>
      </div>
      
      <div class="faq-items">
        <div
          v-for="faq in filteredFAQs"
          :key="faq.id"
          class="faq-item"
          :class="{ expanded: expandedItems.includes(faq.id) }"
        >
          <button
            @click="toggleItem(faq.id)"
            class="faq-question"
          >
            <span>{{ faq.question }}</span>
            <div class="expand-icon">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </button>
          
          <div class="faq-answer">
            <div>{{ faq.answer }}</div>
          </div>
        </div>
      </div>
      
      <div v-if="filteredFAQs.length === 0" class="no-results">
        <p>{{ tLocal('noResults') }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useLanguage, globalTranslations } from '~/composables/useLanguage'
const { t, currentLanguage } = useLanguage()

// Reactive state
const searchQuery = ref('')
const selectedCategory = ref('all')
const expandedItems = ref<number[]>([])

// Multilingual FAQ data
const categories = computed(() => [
  { id: 'all', name: currentLanguage.value === 'de' ? 'Alle Fragen' : 'All Questions' },
  { id: 'general', name: currentLanguage.value === 'de' ? 'Allgemein' : 'General' },
  { id: 'technical', name: currentLanguage.value === 'de' ? 'Technisch' : 'Technical' },
  { id: 'scenarios', name: currentLanguage.value === 'de' ? 'Szenarien' : 'Scenarios' },
  { id: 'account', name: currentLanguage.value === 'de' ? 'Konto' : 'Account' }
])

const faqData = {
  en: [
    { id: 1, category: 'general', question: 'What is IMAGIO?', answer: 'IMAGIO is an interactive learning platform that provides scenario-based training for communication and problem-solving skills.' },
    { id: 2, category: 'general', question: 'How do I start a scenario?', answer: 'Enter your scenario code on the main page and click "Start Learning". You need at least 3 characters for a valid code.' },
    { id: 3, category: 'technical', question: 'What browsers are supported?', answer: 'IMAGIO works best with the latest versions of Chrome, Firefox, Safari, and Edge. We recommend Chrome for the best experience.' },
    { id: 4, category: 'technical', question: 'Why is my microphone not working?', answer: 'Make sure you have granted microphone permissions to your browser. Check browser settings and ensure no other application is using the microphone.' },
    { id: 5, category: 'scenarios', question: 'How long does each scenario take?', answer: 'Most scenarios take between 15 and 45 minutes to complete, depending on the complexity.' },
    { id: 6, category: 'scenarios', question: 'Can I pause and resume scenarios?', answer: 'Yes, your progress is automatically saved. You can return to complete the scenario at any time.' },
    { id: 7, category: 'account', question: 'Do I need an account to use IMAGIO?', answer: 'For basic scenarios, no account is required. Some advanced features may require registration.' },
    { id: 8, category: 'account', question: 'How do I access admin features?', answer: 'Click on "Admin" in the header menu. Contact your administrator for login credentials.' },
    { id: 9, category: 'technical', question: 'What should I do if the audio quality is poor?', answer: 'Use the microphone test in the menu to check your audio quality. Adjust your microphone settings or use a different microphone if needed.' },
    { id: 10, category: 'general', question: 'Where can I get help?', answer: 'You can contact support through the feedback option or check our FAQ section for common issues.' }
  ],
  de: [
    { id: 1, category: 'general', question: 'Was ist IMAGIO?', answer: 'IMAGIO ist eine interaktive Lernplattform, die szenariobasiertes Training für Kommunikations- und Problemlösungsfertigkeiten bietet.' },
    { id: 2, category: 'general', question: 'Wie starte ich ein Szenario?', answer: 'Geben Sie Ihren Szenario-Code auf der Hauptseite ein und klicken Sie auf "Starten". Sie benötigen mindestens 3 Zeichen für einen gültigen Code.' },
    { id: 3, category: 'technical', question: 'Welche Browser werden unterstützt?', answer: 'IMAGIO funktioniert am besten mit den neuesten Versionen von Chrome, Firefox, Safari und Edge. Wir empfehlen Chrome für die beste Erfahrung.' },
    { id: 4, category: 'technical', question: 'Warum funktioniert mein Mikrofon nicht?', answer: 'Stellen Sie sicher, dass Sie Ihrem Browser Mikrofonberechtigungen erteilt haben. Überprüfen Sie die Browser-Einstellungen und stellen Sie sicher, dass keine andere Anwendung das Mikrofon verwendet.' },
    { id: 5, category: 'scenarios', question: 'Wie lange dauert jedes Szenario?', answer: 'Die meisten Szenarien dauern je nach Komplexität zwischen 15 und 45 Minuten.' },
    { id: 6, category: 'scenarios', question: 'Kann ich Szenarien pausieren und fortsetzen?', answer: 'Ja, Ihr Fortschritt wird automatisch gespeichert. Sie können jederzeit zurückkehren, um das Szenario zu beenden.' },
    { id: 7, category: 'account', question: 'Benötige ich ein Konto, um IMAGIO zu verwenden?', answer: 'Für grundlegende Szenarien ist kein Konto erforderlich. Einige erweiterte Funktionen können eine Registrierung erfordern.' },
    { id: 8, category: 'account', question: 'Wie greife ich auf Admin-Funktionen zu?', answer: 'Klicken Sie auf "Admin" im Header-Menü. Wenden Sie sich an Ihren Administrator für Anmeldedaten.' },
    { id: 9, category: 'technical', question: 'Was soll ich tun, wenn die Audioqualität schlecht ist?', answer: 'Verwenden Sie den Mikrofontest im Menü, um Ihre Audioqualität zu überprüfen. Passen Sie Ihre Mikrofoneinstellungen an oder verwenden Sie ein anderes Mikrofon.' },
    { id: 10, category: 'general', question: 'Wo kann ich Hilfe bekommen?', answer: 'Sie können den Support über die Feedback-Option kontaktieren oder unsere FAQ-Sektion für häufige Probleme überprüfen.' }
  ]
}

const faqs = computed(() => faqData[currentLanguage.value as keyof typeof faqData])

const localTranslations = {
  en: {
    searchPlaceholder: 'Search questions...',
    noResults: 'No results found. Try different search terms.',
    backToMenu: 'Back to Menu'
  },
  de: {
    searchPlaceholder: 'Fragen durchsuchen...',
    noResults: 'Keine Ergebnisse gefunden. Versuchen Sie andere Suchbegriffe.',
    backToMenu: 'Zurück zum Menü'
  }
}

const tLocal = (key: string) => {
  return localTranslations[currentLanguage.value as keyof typeof localTranslations][key as keyof typeof localTranslations.en] || key
}

// Computed properties
const filteredFAQs = computed(() => {
  let filtered = faqs.value

  // Filter by category
  if (selectedCategory.value !== 'all') {
    filtered = filtered.filter(faq => faq.category === selectedCategory.value)
  }

  // Filter by search query
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(faq => 
      faq.question.toLowerCase().includes(query) ||
      faq.answer.toLowerCase().includes(query)
    )
  }

  return filtered
})

// Methods
const toggleItem = (id: number) => {
  const index = expandedItems.value.indexOf(id)
  if (index > -1) {
    expandedItems.value.splice(index, 1)
  } else {
    expandedItems.value.push(id)
  }
}

</script>

<style scoped>
.faq-screen {
  min-height: calc(100vh - 64px);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 2rem;
  background-color: #ffffff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.faq-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  max-width: 800px;
}

.faq-title {
  color: #1f2937;
  font-size: 2rem;
  font-weight: 600;
  text-align: center;
  margin: 1rem 0;
}

.search-container {
  width: 100%;
}

.search-input {
  width: 100%;
  padding: 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s;
  background-color: #ffffff;
  color: #000000;
}

.search-input:focus {
  outline: none;
  border-color: #0097b2;
  box-shadow: 0 0 0 3px rgba(0, 151, 178, 0.1);
}

.search-input::placeholder {
  color: #9ca3af;
}

.faq-categories {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: center;
}

.category-button {
  padding: 0.5rem 1rem;
  background-color: #f3f4f6;
  color: #6b7280;
  border: 2px solid #e5e7eb;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.category-button:hover {
  background-color: #e5e7eb;
  border-color: #d1d5db;
}

.category-button.active {
  background-color: #0097b2;
  color: #ffffff;
  border-color: #0097b2;
}

.faq-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.faq-item {
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.faq-item.expanded {
  border-color: #0097b2;
  box-shadow: 0 2px 8px rgba(0, 151, 178, 0.1);
}

.faq-question {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.25rem;
  background-color: #ffffff;
  border: none;
  text-align: left;
  font-size: 1rem;
  font-weight: 600;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s;
}

.faq-question:hover {
  background-color: #f9fafb;
}

.faq-item.expanded .faq-question {
  color: #0097b2;
}

.expand-icon {
  transition: transform 0.3s ease;
  color: #6b7280;
  flex-shrink: 0;
}

.faq-item.expanded .expand-icon {
  transform: rotate(180deg);
  color: #0097b2;
}

.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.faq-item.expanded .faq-answer {
  max-height: 500px;
}

.faq-answer div {
  padding: 0 1.25rem 1.25rem;
  color: #6b7280;
  line-height: 1.6;
}

.no-results {
  text-align: center;
  padding: 3rem 1rem;
  color: #6b7280;
  font-style: italic;
}

@media (max-width: 768px) {
  .faq-screen {
    min-height: calc(100vh - 56px);
    padding: 1rem;
  }
  
  .faq-content {
    gap: 1.5rem;
  }
  
  .faq-title {
    font-size: 1.75rem;
  }
  
  .faq-categories {
    justify-content: stretch;
  }
  
  .category-button {
    flex: 1;
    min-width: 120px;
  }
  
  .faq-question {
    padding: 0.875rem 1rem;
    font-size: 0.9rem;
  }
  
  .faq-answer div {
    padding: 0 1rem 1rem;
    font-size: 0.9rem;
  }
}
</style>