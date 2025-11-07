<template>
  <div class="faq-container">
    <!-- Header -->
    <AppHeader 
      title="Hilfe & FAQ" 
      current-role="unified"
      :request-count="0"
      :show-back="true"
      @back="() => navigateTo('/pwa/settings')"
      @open-profile="() => navigateTo('/pwa/shared/profile')"
    />

    <div class="content-container">
      
      <!-- Search Section -->
      <div class="search-section">
        <h2>Wie können wir dir helfen?</h2>
        <div class="search-container">
          <div class="search-input-container">
            <svg class="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            <input 
              v-model="searchQuery"
              type="text"
              placeholder="Suche nach Frage oder Stichwort..."
              class="search-input"
              @input="handleSearch"
            >
            <button v-if="searchQuery" @click="clearSearch" class="clear-search">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Categories -->
      <div v-if="!searchQuery" class="categories-section">
        <h3>Kategorien</h3>
        <div class="categories-grid">
          <button 
            v-for="category in faqCategories" 
            :key="category.id"
            @click="selectCategory(category.id)"
            class="category-card"
            :class="{ active: selectedCategory === category.id }"
          >
            <div class="category-icon" :class="category.id">
              <component :is="category.icon" />
            </div>
            <div class="category-content">
              <h4>{{ category.name }}</h4>
              <p>{{ category.questions.length }} Fragen</p>
            </div>
          </button>
        </div>
      </div>

      <!-- Search Results -->
      <div v-if="searchQuery && searchResults.length > 0" class="search-results">
        <h3>Suchergebnisse für "{{ searchQuery }}"</h3>
        <div class="faq-list">
          <div 
            v-for="faq in searchResults" 
            :key="faq.id"
            class="faq-item"
            :class="{ expanded: expandedFaqs.includes(faq.id) }"
          >
            <button @click="toggleFaq(faq.id)" class="faq-question">
              <span class="question-text">{{ faq.question }}</span>
              <svg class="expand-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>
            <div v-if="expandedFaqs.includes(faq.id)" class="faq-answer">
              <div v-html="faq.answer"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- No Search Results -->
      <div v-if="searchQuery && searchResults.length === 0" class="no-results">
        <div class="no-results-icon">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
        </div>
        <h3>Keine Ergebnisse gefunden</h3>
        <p>Für "{{ searchQuery }}" wurden keine Fragen gefunden.</p>
        <button @click="navigateTo('/pwa/support/contact')" class="btn-contact-support">
          Support kontaktieren
        </button>
      </div>

      <!-- Category Questions -->
      <div v-if="!searchQuery && selectedCategory" class="category-questions">
        <div class="category-header">
          <button @click="selectedCategory = null" class="back-to-categories">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
            Zurück zu Kategorien
          </button>
          <h3>{{ getCurrentCategory()?.name }}</h3>
        </div>
        
        <div class="faq-list">
          <div 
            v-for="faq in getCurrentCategory()?.questions || []" 
            :key="faq.id"
            class="faq-item"
            :class="{ expanded: expandedFaqs.includes(faq.id) }"
          >
            <button @click="toggleFaq(faq.id)" class="faq-question">
              <span class="question-text">{{ faq.question }}</span>
              <svg class="expand-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>
            <div v-if="expandedFaqs.includes(faq.id)" class="faq-answer">
              <div v-html="faq.answer"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Contact Support Section -->
      <div class="contact-support-section">
        <h3>Hilft dir das nicht weiter?</h3>
        <p>Unser Support-Team hilft dir gerne bei weiteren Fragen.</p>
        <button @click="navigateTo('/pwa/support/contact')" class="btn-contact-support">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
          </svg>
          Support kontaktieren
        </button>
      </div>

    </div>

    <!-- Footer -->
    <UnifiedFooter 
      active-tab="profile"
      current-role="unified"
      @navigate="handleFooterNavigation"
    />

    <!-- Padding for footer -->
    <div style="height: 6rem;"></div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import AppHeader from '~/components/AppHeader.vue'
import UnifiedFooter from '~/components/pwa/unified/UnifiedFooter.vue'

definePageMeta({
  layout: false
})

// Component state
const searchQuery = ref('')
const selectedCategory = ref(null)
const expandedFaqs = ref([])
const searchResults = ref([])

// FAQ Categories and Questions
const faqCategories = ref([
  {
    id: 'getting-started',
    name: 'Erste Schritte',
    icon: 'PlayIcon',
    questions: [
      {
        id: 'faq_1',
        question: 'Wie erstelle ich mein Profil?',
        answer: '<p>Um dein Profil zu erstellen:</p><ol><li>Gehe zu "Profil" in der Navigation</li><li>Klicke auf "Profil bearbeiten"</li><li>Fülle alle Pflichtfelder aus</li><li>Lade ein Profilbild hoch (optional)</li><li>Speichere deine Änderungen</li></ol><p>Ein vollständiges Profil erhöht deine Chancen auf Jobs!</p>'
      },
      {
        id: 'faq_2',
        question: 'Wie verifiziere ich mein Konto?',
        answer: '<p>Die Verifizierung erfolgt in zwei Schritten:</p><ol><li><strong>E-Mail verifizieren:</strong> Klicke den Link in der Bestätigungs-E-Mail</li><li><strong>Identität verifizieren:</strong> Lade deinen Ausweis in den Einstellungen hoch</li></ol><p>Verifizierte Nutzer erhalten mehr Vertrauen und bessere Jobs.</p>'
      },
      {
        id: 'faq_3',
        question: 'Wie finde ich meinen ersten Job?',
        answer: '<p>So findest du schnell Jobs:</p><ol><li>Aktiviere Benachrichtigungen für neue Jobs</li><li>Stelle deinen Umkreis in den Helfer-Einstellungen ein</li><li>Wähle deine bevorzugten Kategorien aus</li><li>Bewirb dich schnell - der Erste gewinnt oft!</li></ol><p><strong>Tipp:</strong> Komplette Profile werden bevorzugt.</p>'
      }
    ]
  },
  {
    id: 'jobs',
    name: 'Jobs erstellen',
    icon: 'BriefcaseIcon',
    questions: [
      {
        id: 'faq_4',
        question: 'Wie erstelle ich einen Job?',
        answer: '<p>Einen Job zu erstellen ist einfach:</p><ol><li>Klicke auf "Job erstellen" im Dashboard</li><li>Fülle alle Details aus (Titel, Beschreibung, Bezahlung)</li><li>Wähle Datum und Uhrzeit</li><li>Gib den genauen Ort an</li><li>Veröffentliche den Job</li></ol><p>Detaillierte Beschreibungen führen zu besseren Bewerbungen!</p>'
      },
      {
        id: 'faq_5',
        question: 'Wie viel sollte ich bezahlen?',
        answer: '<p>Die Bezahlung hängt von verschiedenen Faktoren ab:</p><ul><li><strong>Einfache Aufgaben:</strong> 15-25€ (Einkaufen, Transport)</li><li><strong>Handwerk:</strong> 25-40€ (Reparaturen, Gartenarbeit)</li><li><strong>Betreuung:</strong> 20-35€ (Kinderbetreuung, Seniorenhilfe)</li></ul><p><strong>Tipp:</strong> Faire Bezahlung führt zu mehr und besseren Bewerbungen.</p>'
      },
      {
        id: 'faq_6',
        question: 'Kann ich einen Job stornieren?',
        answer: '<p>Ja, du kannst Jobs bis zu einem bestimmten Punkt stornieren:</p><ul><li><strong>Vor Bewerbungen:</strong> Jederzeit kostenlos</li><li><strong>Nach Bewerbungen:</strong> Bis 24h vor Job-Termin</li><li><strong>Weniger als 24h:</strong> Nur in Notfällen (Gebühr möglich)</li></ul><p>Bei Stornierung werden alle Bewerber automatisch benachrichtigt.</p>'
      }
    ]
  },
  {
    id: 'applications',
    name: 'Bewerben & Jobs bekommen',
    icon: 'UserPlusIcon',
    questions: [
      {
        id: 'faq_7',
        question: 'Wie bewerbe ich mich auf Jobs?',
        answer: '<p>Die Bewerbung ist ganz einfach:</p><ol><li>Öffne den Job, der dich interessiert</li><li>Lies die Beschreibung sorgfältig</li><li>Klicke auf "Bewerben"</li><li>Schreibe eine kurze, persönliche Nachricht</li><li>Sende deine Bewerbung ab</li></ol><p><strong>Tipp:</strong> Schnelligkeit zählt! Frühe Bewerbungen haben bessere Chancen.</p>'
      },
      {
        id: 'faq_8',
        question: 'Wann erfahre ich, ob ich den Job bekommen habe?',
        answer: '<p>Du erhältst eine Benachrichtigung, sobald der Auftraggeber eine Entscheidung getroffen hat:</p><ul><li><strong>Angenommen:</strong> Du bekommst die Kontaktdaten</li><li><strong>Abgelehnt:</strong> Du kannst dich weiter auf andere Jobs bewerben</li><li><strong>Wartezeit:</strong> Meist 2-24 Stunden</li></ul><p>Bei dringenden Jobs geht es oft schneller!</p>'
      },
      {
        id: 'faq_9',
        question: 'Was passiert nach der Job-Zusage?',
        answer: '<p>Nach der Zusage läuft alles automatisch:</p><ol><li>Du bekommst die Kontaktdaten des Auftraggebers</li><li>Die Zahlung wird vorautoriert</li><li>Du erhältst eine Bestätigung mit allen Details</li><li>Bei Fragen kannst du direkt mit dem Auftraggeber chatten</li></ol><p>Vergiss nicht, pünktlich zu erscheinen!</p>'
      }
    ]
  },
  {
    id: 'payments',
    name: 'Zahlungen',
    icon: 'CreditCardIcon',
    questions: [
      {
        id: 'faq_10',
        question: 'Wann werde ich bezahlt?',
        answer: '<p>Die Bezahlung erfolgt automatisch nach Job-Abschluss:</p><ol><li>Nach dem Job bestätigen beide Seiten den Abschluss</li><li>Die Zahlung wird automatisch freigegeben</li><li>Das Geld ist innerhalb von 1-3 Werktagen auf deinem Konto</li></ol><p><strong>Wichtig:</strong> Beide Seiten müssen den Job als "abgeschlossen" markieren.</p>'
      },
      {
        id: 'faq_11',
        question: 'Welche Zahlungsmethoden werden akzeptiert?',
        answer: '<p>Wir unterstützen verschiedene Zahlungsmethoden:</p><ul><li><strong>Kreditkarte:</strong> Visa, Mastercard, American Express</li><li><strong>PayPal:</strong> Direkter Transfer</li><li><strong>Apple Pay:</strong> Für iOS-Nutzer</li><li><strong>SEPA-Lastschrift:</strong> Für EU-Kunden</li></ul><p>Alle Zahlungen sind SSL-verschlüsselt und sicher.</p>'
      },
      {
        id: 'faq_12',
        question: 'Was passiert bei Problemen mit der Zahlung?',
        answer: '<p>Bei Zahlungsproblemen helfen wir sofort:</p><ol><li>Kontaktiere unseren Support über die App</li><li>Wir prüfen den Fall innerhalb von 24h</li><li>Bei berechtigten Beschwerden erstatten wir sofort</li><li>Der Betrag wird zurück auf deine ursprüngliche Zahlungsmethode überwiesen</li></ol><p>Deine Sicherheit steht an erster Stelle!</p>'
      }
    ]
  },
  {
    id: 'reviews',
    name: 'Bewertungen',
    icon: 'StarIcon',
    questions: [
      {
        id: 'faq_13',
        question: 'Wie funktioniert das Bewertungssystem?',
        answer: '<p>Nach jedem Job könnt ihr euch gegenseitig bewerten:</p><ul><li><strong>Sterne:</strong> 1-5 Sterne für die Gesamtleistung</li><li><strong>Kommentar:</strong> Optional, aber empfohlen</li><li><strong>Kategorien:</strong> Pünktlichkeit, Freundlichkeit, Qualität</li></ul><p>Bewertungen sind öffentlich und helfen anderen bei der Entscheidung.</p>'
      },
      {
        id: 'faq_14',
        question: 'Kann ich Bewertungen löschen oder ändern?',
        answer: '<p>Bewertungen sind grundsätzlich permanent:</p><ul><li><strong>Löschen:</strong> Nur bei Missbrauch oder falschen Angaben</li><li><strong>Ändern:</strong> Nicht möglich nach Absendung</li><li><strong>Antworten:</strong> Du kannst öffentlich auf Bewertungen antworten</li></ul><p>Bei Problemen wende dich an unseren Support.</p>'
      },
      {
        id: 'faq_15',
        question: 'Wie wichtig sind Bewertungen?',
        answer: '<p>Bewertungen sind sehr wichtig für deinen Erfolg:</p><ul><li><strong>Vertrauen:</strong> Gute Bewertungen schaffen Vertrauen</li><li><strong>Ranking:</strong> Besser bewertete Nutzer werden bevorzugt gezeigt</li><li><strong>Mehr Jobs:</strong> Hohe Bewertungen führen zu mehr Aufträgen</li></ul><p><strong>Tipp:</strong> Sei immer professionell und zuverlässig!</p>'
      }
    ]
  },
  {
    id: 'problems',
    name: 'Probleme melden',
    icon: 'ExclamationTriangleIcon',
    questions: [
      {
        id: 'faq_16',
        question: 'Wie melde ich ein Problem?',
        answer: '<p>Du kannst Probleme ganz einfach melden:</p><ol><li>Gehe zu "Einstellungen" → "Support kontaktieren"</li><li>Wähle die Kategorie des Problems</li><li>Beschreibe das Problem detailliert</li><li>Füge Screenshots hinzu (optional)</li><li>Sende die Meldung ab</li></ol><p>Wir antworten innerhalb von 24 Stunden!</p>'
      },
      {
        id: 'faq_17',
        question: 'Was passiert bei unangemessenem Verhalten?',
        answer: '<p>Wir tolerieren kein unangemessenes Verhalten:</p><ul><li><strong>Warnung:</strong> Erste Verwarnung bei leichten Verstößen</li><li><strong>Sperrung:</strong> Temporäre Sperrung bei wiederholten Verstößen</li><li><strong>Ausschluss:</strong> Permanenter Ausschluss bei schweren Verstößen</li></ul><p>Melde uns jeden Vorfall - wir nehmen alles ernst!</p>'
      },
      {
        id: 'faq_18',
        question: 'Kann ich einen Job-Streit schlichten lassen?',
        answer: '<p>Ja, wir bieten eine kostenlose Streitschlichtung:</p><ol><li>Versucht zunächst, das Problem direkt zu lösen</li><li>Falls das nicht klappt, meldet das Problem über die App</li><li>Unser Team prüft beide Seiten</li><li>Wir treffen eine faire Entscheidung innerhalb von 48h</li></ol><p>Die Entscheidung ist für beide Seiten bindend.</p>'
      }
    ]
  },
  {
    id: 'account',
    name: 'Account & Sicherheit',
    icon: 'ShieldCheckIcon',
    questions: [
      {
        id: 'faq_19',
        question: 'Wie ändere ich mein Passwort?',
        answer: '<p>Dein Passwort änderst du in den Sicherheitseinstellungen:</p><ol><li>Gehe zu "Einstellungen" → "Sicherheit"</li><li>Klicke auf "Passwort ändern"</li><li>Gib dein aktuelles Passwort ein</li><li>Wähle ein neues, sicheres Passwort</li><li>Bestätige die Änderung</li></ol><p><strong>Tipp:</strong> Verwende mindestens 8 Zeichen mit Buchstaben, Zahlen und Symbolen.</p>'
      },
      {
        id: 'faq_20',
        question: 'Wie sicher sind meine Daten?',
        answer: '<p>Deine Daten sind bei uns maximal geschützt:</p><ul><li><strong>Verschlüsselung:</strong> Alle Daten sind SSL-verschlüsselt</li><li><strong>DSGVO-konform:</strong> Wir halten alle EU-Datenschutzgesetze ein</li><li><strong>Minimale Daten:</strong> Wir speichern nur notwendige Informationen</li><li><strong>Sichere Server:</strong> Hosting in deutschen Rechenzentren</li></ul><p>Du hast jederzeit das Recht auf Auskunft und Löschung deiner Daten.</p>'
      },
      {
        id: 'faq_21',
        question: 'Wie lösche ich meinen Account?',
        answer: '<p>Du kannst deinen Account jederzeit löschen:</p><ol><li>Schließe alle laufenden Jobs ab</li><li>Gehe zu "Einstellungen" → "Account löschen"</li><li>Bestätige die Löschung mit deinem Passwort</li><li>Wähle, ob lokale Daten gelöscht werden sollen</li></ol><p><strong>Wichtig:</strong> Diese Aktion kann nicht rückgängig gemacht werden!</p>'
      }
    ]
  }
])

// Computed properties
const getCurrentCategory = () => {
  return faqCategories.value.find(cat => cat.id === selectedCategory.value)
}

// Methods
const handleSearch = () => {
  if (searchQuery.value.trim().length < 2) {
    searchResults.value = []
    return
  }

  const query = searchQuery.value.toLowerCase()
  const results = []

  faqCategories.value.forEach(category => {
    category.questions.forEach(question => {
      if (
        question.question.toLowerCase().includes(query) ||
        question.answer.toLowerCase().includes(query)
      ) {
        results.push(question)
      }
    })
  })

  searchResults.value = results
}

const clearSearch = () => {
  searchQuery.value = ''
  searchResults.value = []
}

const selectCategory = (categoryId) => {
  selectedCategory.value = categoryId
  expandedFaqs.value = [] // Close any expanded FAQs
}

const toggleFaq = (faqId) => {
  const index = expandedFaqs.value.indexOf(faqId)
  if (index > -1) {
    expandedFaqs.value.splice(index, 1)
  } else {
    expandedFaqs.value.push(faqId)
  }
}

const handleFooterNavigation = (tab) => {
  switch(tab) {
    case 'dashboard':
      navigateTo('/pwa')
      break
    case 'profile':
      navigateTo('/pwa/shared/profile')
      break
  }
}
</script>

<style scoped>
.faq-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}

.content-container {
  padding: 1rem;
  padding-bottom: 6rem;
  max-width: 800px;
  margin: 0 auto;
}

/* Search Section */
.search-section {
  background: white;
  border-radius: 20px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.search-section h2 {
  color: #374151;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
}

.search-container {
  max-width: 500px;
  margin: 0 auto;
}

.search-input-container {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 1rem;
  width: 1.25rem;
  height: 1.25rem;
  color: #8F8B82;
  z-index: 1;
}

.search-input {
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 1rem;
  transition: border-color 0.2s ease;
}

.search-input:focus {
  outline: none;
  border-color: #5F6F55;
}

.clear-search {
  position: absolute;
  right: 1rem;
  background: #f3f4f6;
  border: none;
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s ease;
}

.clear-search:hover {
  background: #e5e7eb;
}

.clear-search svg {
  width: 1rem;
  height: 1rem;
  color: #6b7280;
}

/* Categories */
.categories-section {
  background: white;
  border-radius: 20px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.categories-section h3 {
  color: #374151;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.category-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f9fafb;
  border: 2px solid transparent;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
}

.category-card:hover,
.category-card.active {
  background: #f3f4f6;
  border-color: #BECDA3;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.category-icon {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.category-icon.getting-started {
  background: rgba(34, 197, 94, 0.1);
  color: #22c55e;
}

.category-icon.jobs {
  background: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
}

.category-icon.applications {
  background: rgba(168, 85, 247, 0.1);
  color: #a855f7;
}

.category-icon.payments {
  background: rgba(245, 158, 11, 0.1);
  color: #f59e0b;
}

.category-icon.reviews {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}

.category-icon.problems {
  background: rgba(249, 115, 22, 0.1);
  color: #f97316;
}

.category-icon.account {
  background: rgba(107, 114, 128, 0.1);
  color: #6b7280;
}

.category-content h4 {
  color: #374151;
  font-size: 0.875rem;
  font-weight: 600;
  margin: 0 0 0.25rem 0;
}

.category-content p {
  color: #6b7280;
  font-size: 0.75rem;
  margin: 0;
}

/* FAQ Lists */
.search-results,
.category-questions {
  background: white;
  border-radius: 20px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.search-results h3,
.category-questions h3 {
  color: #374151;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
}

.category-header {
  margin-bottom: 1rem;
}

.back-to-categories {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #5F6F55;
  background: none;
  border: none;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  margin-bottom: 1rem;
  transition: color 0.2s ease;
}

.back-to-categories:hover {
  color: #4a5c44;
}

.back-to-categories svg {
  width: 1rem;
  height: 1rem;
}

.faq-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.faq-item {
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.2s ease;
}

.faq-item.expanded {
  border-color: #BECDA3;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.faq-question {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background: #f9fafb;
  border: none;
  cursor: pointer;
  text-align: left;
  transition: background 0.2s ease;
}

.faq-question:hover {
  background: #f3f4f6;
}

.faq-item.expanded .faq-question {
  background: #fefffe;
}

.question-text {
  color: #374151;
  font-size: 0.875rem;
  font-weight: 600;
  flex: 1;
  line-height: 1.4;
}

.expand-icon {
  width: 1.25rem;
  height: 1.25rem;
  color: #6b7280;
  transition: transform 0.2s ease;
  flex-shrink: 0;
  margin-left: 1rem;
}

.faq-item.expanded .expand-icon {
  transform: rotate(180deg);
}

.faq-answer {
  padding: 1rem;
  background: white;
  border-top: 1px solid #e5e7eb;
  color: #6b7280;
  font-size: 0.875rem;
  line-height: 1.6;
}

.faq-answer :deep(p) {
  margin: 0 0 1rem 0;
}

.faq-answer :deep(p:last-child) {
  margin-bottom: 0;
}

.faq-answer :deep(ol),
.faq-answer :deep(ul) {
  margin: 0.5rem 0;
  padding-left: 1.5rem;
}

.faq-answer :deep(li) {
  margin-bottom: 0.25rem;
}

.faq-answer :deep(strong) {
  color: #374151;
  font-weight: 600;
}

/* No Results */
.no-results {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 3rem 1rem;
  text-align: center;
  background: white;
  border-radius: 20px;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.no-results-icon {
  width: 4rem;
  height: 4rem;
  color: #d1d5db;
}

.no-results h3 {
  color: #374151;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
}

.no-results p {
  color: #6b7280;
  margin: 0;
}

/* Contact Support Section */
.contact-support-section {
  background: white;
  border-radius: 20px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.contact-support-section h3 {
  color: #374151;
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
}

.contact-support-section p {
  color: #6b7280;
  margin: 0 0 1.5rem 0;
}

.btn-contact-support {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: #5F6F55;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease;
}

.btn-contact-support:hover {
  background: #4a5c44;
}

.btn-contact-support svg {
  width: 1rem;
  height: 1rem;
}

/* Responsive Design */
@media (min-width: 768px) {
  .content-container {
    padding: 2rem;
  }
  
  .categories-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
}

@media (max-width: 640px) {
  .categories-grid {
    grid-template-columns: 1fr;
  }
  
  .category-card {
    flex-direction: column;
    text-align: center;
    gap: 0.75rem;
  }
  
  .faq-question {
    padding: 0.75rem;
  }
  
  .question-text {
    font-size: 0.8125rem;
  }
}
</style>