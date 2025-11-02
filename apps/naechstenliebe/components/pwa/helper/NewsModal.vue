<template>
  <div v-if="show" 
    style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); z-index: 9999; display: flex; align-items: center; justify-content: center; padding: 1rem;"
    @click="$emit('close')"
  >
    <div style="background: white; border-radius: 16px; max-width: 1200px; width: 95%; height: 90vh; display: flex; position: relative; overflow: hidden;" @click.stop>
      <!-- Left Panel - News List -->
      <div :style="selectedNews ? 'width: 45%; border-right: 1px solid #e5e7eb;' : 'width: 100%;'" style="display: flex; flex-direction: column; height: 100%;">
        
        <!-- Header -->
        <div style="display: flex; align-items: center; justify-content: space-between; padding: 1.5rem; border-bottom: 1px solid #e5e7eb; background: #f9fafb; flex-shrink: 0;">
          <h2 style="margin: 0; font-size: 1.25rem; font-weight: 600; color: #474747;">News & Updates</h2>
          <button 
            @click="$emit('close')"
            style="background: none; border: none; color: #8F8B82; cursor: pointer; padding: 0.5rem;"
            onmouseover="this.style.color='#5F6F55'"
            onmouseout="this.style.color='#8F8B82'"
          >
            <svg style="width: 1.5rem; height: 1.5rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <!-- Featured Update -->
        <div v-if="featuredUpdate && !selectedNews" style="background: linear-gradient(135deg, #5F6F55, #4a5c44); padding: 2rem; color: white; flex-shrink: 0;">
          <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem;">
            <div style="padding: 0.25rem 0.75rem; background: rgba(255,255,255,0.2); border-radius: 12px; font-size: 0.75rem; font-weight: 600; backdrop-filter: blur(10px);">
              {{ featuredUpdate.category }}
            </div>
            <div style="padding: 0.25rem 0.75rem; background: #ef4444; border-radius: 12px; font-size: 0.75rem; font-weight: 600;">
              NEU
            </div>
          </div>
          <h3 style="margin: 0 0 1rem 0; font-size: 1.25rem; font-weight: 700;">{{ featuredUpdate.title }}</h3>
          <p style="margin: 0 0 1.5rem 0; opacity: 0.9; line-height: 1.5;">{{ featuredUpdate.summary }}</p>
          <button 
            @click="openNewsDetail(featuredUpdate)"
            style="background: white; color: #5F6F55; padding: 0.75rem 1.5rem; border: none; cursor: pointer; font-size: 1rem; font-weight: 600; border-radius: 8px; transition: all 0.2s;"
            onmouseover="this.style.transform='translateY(-1px)';"
            onmouseout="this.style.transform='translateY(0)';"
          >
            Mehr erfahren
          </button>
        </div>

        <!-- Category Filter -->
        <div v-if="!selectedNews" style="padding: 1.5rem; border-bottom: 1px solid #e5e7eb; flex-shrink: 0;">
          <h3 style="font-size: 1rem; font-weight: 600; color: #474747; margin: 0 0 1rem 0;">Kategorien</h3>
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
            <button 
              v-for="category in categories"
              :key="category.id"
              @click="selectedCategory = category.id"
              :style="{
                background: selectedCategory === category.id ? '#5F6F55' : '#f9fafb',
                color: selectedCategory === category.id ? 'white' : '#474747',
                border: selectedCategory === category.id ? '1px solid #5F6F55' : '1px solid #e5e7eb',
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                fontSize: '0.875rem',
                fontWeight: '500',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s',
                minWidth: '80px'
              }"
            >
              {{ category.label }} ({{ category.count }})
            </button>
          </div>
        </div>

        <!-- News List -->
        <div v-if="!selectedNews" style="padding: 1.5rem; overflow-y: auto; flex: 1;">
          <div v-if="filteredNews.length === 0" style="text-align: center; padding: 2rem;">
            <div style="width: 3rem; height: 3rem; background: #f3f4f6; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem auto;">
              <svg style="width: 1.5rem; height: 1.5rem; color: #8F8B82;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2z"/>
              </svg>
            </div>
            <p style="color: #8F8B82; margin: 0;">Keine News für diese Kategorie</p>
          </div>

          <div v-else style="display: flex; flex-direction: column; gap: 1rem;">
            <div 
              v-for="news in filteredNews" 
              :key="news.id"
              @click="openNewsDetail(news)"
              style="background: #f9fafb; border-radius: 12px; padding: 1rem; border: 1px solid #e5e7eb; transition: all 0.2s; cursor: pointer;"
              onmouseover="this.style.borderColor='#BECDA3'; this.style.background='white';"
              onmouseout="this.style.borderColor='#e5e7eb'; this.style.background='#f9fafb';"
            >
              <div style="flex: 1;">
                <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem;">
                  <div 
                    :style="{
                      padding: '0.25rem 0.75rem',
                      borderRadius: '12px',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      background: getNewsCategoryColor(news.category),
                      color: 'white'
                    }"
                  >
                    {{ getNewsCategoryText(news.category) }}
                  </div>
                  <div v-if="news.isNew" style="padding: 0.25rem 0.75rem; background: #ef4444; border-radius: 12px; font-size: 0.75rem; font-weight: 600; color: white;">
                    NEU
                  </div>
                </div>
                <h4 style="margin: 0 0 0.5rem 0; font-size: 1rem; font-weight: 600; color: #474747;">{{ news.title }}</h4>
                <p style="margin: 0 0 0.5rem 0; font-size: 0.875rem; color: #8F8B82; line-height: 1.4;">{{ news.summary }}</p>
                <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.75rem; color: #8F8B82;">
                  <span>{{ formatDate(news.date) }}</span>
                  <div style="display: flex; align-items: center; gap: 0.5rem; color: #5F6F55; font-weight: 500;">
                    <span>Lesen</span>
                    <svg style="width: 0.75rem; height: 0.75rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Back button when article is selected -->
        <div v-if="selectedNews" style="padding: 1rem; border-bottom: 1px solid #e5e7eb; background: #f9fafb; flex-shrink: 0;">
          <button 
            @click="selectedNews = null"
            style="display: flex; align-items: center; gap: 0.5rem; background: none; border: none; color: #5F6F55; cursor: pointer; padding: 0.5rem; font-weight: 500;"
            onmouseover="this.style.background='#f0fdf4'; this.style.borderRadius='8px';"
            onmouseout="this.style.background='none';"
          >
            <svg style="width: 1rem; height: 1rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
            Zurück zur Übersicht
          </button>
        </div>
      </div>

      <!-- Right Panel - Article Detail -->
      <div v-if="selectedNews" style="width: 55%; display: flex; flex-direction: column; height: 100%; background: white;">
        
        <!-- Article Header -->
        <div style="padding: 2rem; border-bottom: 1px solid #e5e7eb; background: #fafafa;">
          <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem;">
            <div 
              :style="{
                padding: '0.5rem 1rem',
                borderRadius: '12px',
                fontSize: '0.875rem',
                fontWeight: '600',
                background: getNewsCategoryColor(selectedNews.category),
                color: 'white'
              }"
            >
              {{ getNewsCategoryText(selectedNews.category) }}
            </div>
            <div v-if="selectedNews.isNew" style="padding: 0.5rem 1rem; background: #ef4444; border-radius: 12px; font-size: 0.875rem; font-weight: 600; color: white;">
              NEU
            </div>
          </div>
          <h1 style="margin: 0 0 1rem 0; font-size: 1.5rem; font-weight: 700; color: #474747; line-height: 1.3;">{{ selectedNews.title }}</h1>
          <div style="display: flex; align-items: center; gap: 1rem; font-size: 0.875rem; color: #8F8B82;">
            <span>{{ formatDate(selectedNews.date) }}</span>
            <span>•</span>
            <span>{{ selectedNews.readTime || 3 }} Min. Lesezeit</span>
          </div>
        </div>

        <!-- Article Content -->
        <div style="padding: 2rem; overflow-y: auto; flex: 1;">
          <div style="font-size: 1rem; color: #474747; line-height: 1.7; white-space: pre-wrap;">{{ selectedNews.fullContent || selectedNews.summary }}</div>
        </div>

        <!-- Article Actions -->
        <div style="padding: 1.5rem 2rem; border-top: 1px solid #e5e7eb; background: #fafafa; flex-shrink: 0;">
          <div style="display: flex; gap: 1rem;">
            <button 
              style="flex: 1; background: #5F6F55; color: white; padding: 0.75rem 1.5rem; border: none; cursor: pointer; font-size: 1rem; font-weight: 600; border-radius: 8px; transition: all 0.2s; display: flex; align-items: center; justify-content: center; gap: 0.5rem;"
              onmouseover="this.style.transform='translateY(-1px)'; this.style.boxShadow='0 4px 12px rgba(95, 111, 85, 0.3)';"
              onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none';"
            >
              <svg style="width: 1rem; height: 1rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              Als gelesen markieren
            </button>
            <button 
              style="flex: 1; background: white; color: #5F6F55; padding: 0.75rem 1.5rem; border: 2px solid #5F6F55; cursor: pointer; font-size: 1rem; font-weight: 600; border-radius: 8px; transition: all 0.2s; display: flex; align-items: center; justify-content: center; gap: 0.5rem;"
              onmouseover="this.style.background='#5F6F55'; this.style.color='white';"
              onmouseout="this.style.background='white'; this.style.color='#5F6F55';"
            >
              <svg style="width: 1rem; height: 1rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"/>
              </svg>
              Teilen
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  show: Boolean
})

const emit = defineEmits(['close', 'open-news-detail'])

const selectedCategory = ref('all')
const selectedNews = ref(null)

const featuredUpdate = ref({
  id: 1,
  title: 'Neue App-Funktionen verfügbar',
  summary: 'Wir haben unsere App mit wichtigen neuen Funktionen aktualisiert, die dir die Arbeit als Helfer noch einfacher machen. Erfahre mehr über die Updates in der App.',
  category: 'App Update',
  date: '2024-11-01',
  isNew: true,
  fullContent: 'Lorem ipsum dolor sit amet, consetetur adipiscing elit...'
})

const categories = ref([
  { id: 'all', label: 'Alle', count: 12 },
  { id: 'system', label: 'System', count: 4 },
  { id: 'community', label: 'Community', count: 3 },
  { id: 'tips', label: 'Tipps', count: 3 },
  { id: 'security', label: 'Sicherheit', count: 2 }
])

const newsItems = ref([
  {
    id: 1,
    title: 'Neue App-Funktionen verfügbar',
    summary: 'Wir haben unsere App mit wichtigen neuen Funktionen aktualisiert.',
    category: 'system',
    date: '2024-11-01',
    isNew: true,
    readTime: 3,
    fullContent: `Liebe Helfer-Gemeinschaft,

wir freuen uns, Ihnen heute einige wichtige Neuerungen vorzustellen, die Ihre Arbeit auf unserer Plattform erheblich verbessern werden:

🔒 **Erweiterte Verifizierung**
- Jetzt können Sie Ihre Skills und Qualifikationen direkt in der App verifizieren lassen
- Kunden sehen verifizierte Profile mit einem speziellen Badge
- Mehr Vertrauen und höhere Auftragschancen für verifizierte Helfer

🚨 **Notfall-Knopf** 
- Neue Notfall-Funktion direkt in der Auftragsansicht
- Sofortige Verbindung zu unserem 24/7 Support-Team
- Automatische Benachrichtigung an Vertrauenspersonen

💬 **Verbesserte Kommunikation**
- Alle Nachrichten jetzt vollständig über die Plattform
- Automatische Übersetzungsfunktion für internationale Kunden
- Nachrichtenarchiv für bessere Dokumentation

Diese Updates wurden auf Basis Ihres Feedbacks entwickelt und sollen Ihnen eine noch sicherere und angenehmere Erfahrung auf unserer Plattform bieten.`
  },
  {
    id: 2,
    title: 'Community-Update: Neue Erfolgsstory',
    summary: 'Lesen Sie die inspirierende Geschichte von unserem Top-Helfer.',
    category: 'community',
    date: '2024-10-28',
    isNew: false,
    readTime: 4,
    fullContent: `**Begegnen Sie Maria Schmidt - Unsere Top-Helferin des Monats!**

Maria, 45 Jahre alt aus München, hat in den letzten 6 Monaten beeindruckende 150 Aufträge mit einer durchschnittlichen Bewertung von 4.9 Sternen abgeschlossen.

Was macht Maria so besonders?

🌟 **Konsistenz:** Maria hat eine beeindruckende Serie von 45 aufeinanderfolgenden 5-Sterne-Bewertungen
💝 **Empathie:** Kunden loben immer wieder ihre außergewöhnliche Freundlichkeit und Geduld
⚡ **Effizienz:** Durch ihre gute Planung schafft Maria 20% mehr Aufträge als der Durchschnitt

„Die Arbeit als Helfer hat mein Leben verändert", erzählt Maria. „Ich kann nicht nur meinem Einkommen aufbessern, sondern auch wirklich helfen. Jeder Auftrag ist eine neue Geschichte und eine neue Chance, etwas Gutes zu tun."

Maria's Tipps für andere Helfer:
1. Immer pünktlich sein
2. Freundlichkeit geht über alles
3. Genau hinhören, was der Kunde wirklich braucht
4. Kleinigkeiten im Voraus erledigen
5. Bei Problemen proaktiv kommunizieren`

  },
  {
    id: 3,
    title: '5 Tipps für bessere Bewertungen',
    summary: 'Wie Sie mit 5 einfachen Tipps bessere Bewertungen von Kunden erhalten.',
    category: 'tips',
    date: '2024-10-25',
    isNew: false,
    readTime: 3,
    fullContent: `**5 Profi-Tipps für 5-Sterne-Bewertungen**

Haben Sie sich schon immer gefragt, wie einige Helfer konstant Top-Bewertungen bekommen? Hier sind ihre Geheimnisse:

**1. Die ersten 5 Minuten sind entscheidend**
- Stellen Sie sich vor und erklären Sie kurz, was Sie tun werden
- Fragen Sie nach letzten Wünschen oder besonderen Vorlieben
- Zeigen Sie, dass Sie aufmerksam und zuverlässig sind

**2. Kommunikation während des Auftrags**
- Geben Sie kurze Updates bei längeren Aufträgen
- Fragen Sie nach, ob alles wie gewünscht verläuft
- Seien Sie ansprechbar und freundlich

**3. Das kleine Extra**
- Bieten Sie an, noch eine kleine zusätzliche Aufgabe zu erledigen
- Machen Sie ein freundliches Kompliment
- Hinterlassen Sie den Arbeitsplatz sauberer als Sie ihn vorgefunden haben

**4. Der Abschluss zählt**
- Zeigen Sie das Ergebnis und fragen Sie nach Zufriedenheit
- Bieten Sie an, bei Fragen noch kurz da zu bleiben
- Verabschieden Sie sich freundlich

**5. Die Nachbereitung**
- Senden Sie eine kurze Dankesnachricht über die App
- Markieren Sie den Auftrag zeitnah als abgeschlossen
- Reagieren Sie auf Kundenfeedback schnell und positiv`

  },
  {
    id: 4,
    title: 'Sicherheits-Update: Datenschutz verbessert',
    summary: 'Wir haben unsere Datenschutzmaßnahmen weiter verbessert.',
    category: 'security',
    date: '2024-10-20',
    isNew: false,
    readTime: 2,
    fullContent: `**Ihre Sicherheit hat Priorität - Neue Datenschutzfunktionen**

Wir haben unsere Plattform mit zusätzlichen Sicherheitsmaßnahmen ausgestattet:

🔐 **Ende-zu-Ende-Verschlüsselung**
- Alle Nachrichten und Daten sind jetzt vollständig verschlüsselt
- Niemand außer Ihnen und dem Gesprächspartner kann Inhalte lesen

🛡️ **Verbesserte Zugriffskontrolle**
- Zwei-Faktor-Authentifizierung jetzt für alle verfügbar
- automatische Abmeldung nach 24 Stunden Inaktivität
- Login-Benachrichtigungen bei neuen Geräten

📍 **Schutz Ihrer Standortdaten**
- Standortfreigabe nur während aktiver Aufträge
- Präzise Standortdaten werden nach Auftragsende gelöscht
- Volle Kontrolle über Standorteinstellungen

Ihr Vertrauen ist unser wertvollstes Gut. Diese Maßnahmen stellen sicher, dass Ihre persönlichen Daten immer sicher geschützt sind.`
  }
])

const filteredNews = computed(() => {
  if (selectedCategory.value === 'all') {
    return newsItems.value
  }
  return newsItems.value.filter(news => news.category === selectedCategory.value)
})

const openNewsDetail = (news) => {
  selectedNews.value = news
  emit('open-news-detail', news)
}

const getNewsCategoryColor = (category) => {
  const colors = {
    system: '#3b82f6',
    community: '#8b5cf6',
    tips: '#f59e0b',
    security: '#ef4444'
  }
  return colors[category] || '#5F6F55'
}

const getNewsCategoryText = (category) => {
  const texts = {
    system: 'System',
    community: 'Community',
    tips: 'Tipps',
    security: 'Sicherheit'
  }
  return texts[category] || 'News'
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  const today = new Date()
  const diffTime = today - date
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays === 0) return 'Heute'
  if (diffDays === 1) return 'Gestern'
  if (diffDays < 7) return `Vor ${diffDays} Tagen`
  if (diffDays < 30) return `Vor ${Math.floor(diffDays / 7)} Wochen`
  return `Vor ${Math.floor(diffDays / 30)} Monaten`
}
</script>

<style scoped>
/* Custom scrollbar */
div::-webkit-scrollbar {
  width: 6px;
}

div::-webkit-scrollbar-track {
  background: rgba(0,0,0,0.1);
  border-radius: 3px;
}

div::-webkit-scrollbar-thumb {
  background: rgba(0,0,0,0.2);
  border-radius: 3px;
}

div::-webkit-scrollbar-thumb:hover {
  background: rgba(0,0,0,0.3);
}
</style>