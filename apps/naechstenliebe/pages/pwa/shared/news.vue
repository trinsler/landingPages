<template>
  <div style="min-height: 100vh; background: #f5f5f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;">
    <!-- Header Component -->
    <AppHeader 
      :title="getRoleBasedTitle('news')"
      :current-role="currentRole"
      :request-count="0"
      @open-requests="getRequestButtonAction()"
      @open-profile="() => navigateTo('/pwa/shared/profile')"
      @open-news="() => {}"
      @toggle-role="toggleRole"
    />

    <div style="padding: 1rem; padding-bottom: 6rem;">
      
      <!-- Header Info -->
      <div style="background: white; border-radius: 16px; padding: 2rem; margin-bottom: 1.5rem; box-shadow: 0 4px 12px rgba(0,0,0,0.1); text-align: center;">
        <div style="margin-bottom: 0.5rem;">
          <div style="width: 4rem; height: 4rem; background: #BECDA3; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem auto;">
            <svg style="width: 2rem; height: 2rem; color: #474747;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6M4 10h6"/>
            </svg>
          </div>
        </div>
        <h2 style="color: #474747; font-size: 1.5rem; font-weight: 600; margin: 0 0 0.5rem 0;">Neuigkeiten & Updates</h2>
        <p style="color: #8F8B82; margin: 0; font-size: 1rem;">Bleiben Sie über wichtige Entwicklungen informiert</p>
      </div>

      <!-- Publisher Access (only for helpers) -->
      <div v-if="currentRole === 'helper'" style="background: white; border-radius: 16px; padding: 1.5rem; margin-bottom: 1.5rem; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <div>
            <h3 style="color: #474747; font-size: 1.25rem; font-weight: 600; margin: 0 0 0.5rem 0;">Als Publisher aktiv werden</h3>
            <p style="color: #8F8B82; margin: 0; font-size: 0.875rem;">Teilen Sie wichtige Informationen mit der Community</p>
          </div>
          <button @click="navigateToPublisher" 
                  style="background: #5F6F55; color: white; padding: 0.75rem 1.5rem; border-radius: 12px; border: none; font-weight: 600; cursor: pointer; font-size: 0.875rem; transition: all 0.2s;"
                  onmouseover="this.style.background='#4a5c44'"
                  onmouseout="this.style.background='#5F6F55'">
            Publisher
          </button>
        </div>
      </div>

      <!-- News Categories -->
      <div style="background: white; border-radius: 16px; padding: 1.5rem; margin-bottom: 1.5rem; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
        <h3 style="color: #474747; font-size: 1.25rem; font-weight: 600; margin: 0 0 1rem 0;">Kategorien</h3>
        
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <button 
            v-for="category in categories" 
            :key="category.id"
            @click="selectedCategory = category.id"
            :style="`background: ${selectedCategory === category.id ? '#5F6F55' : 'white'}; 
                     color: ${selectedCategory === category.id ? 'white' : '#474747'}; 
                     padding: 0.75rem 1rem; border: ${selectedCategory === category.id ? 'none' : '2px solid #e5e7eb'}; 
                     cursor: pointer; border-radius: 12px; transition: all 0.2s; font-weight: 600; font-size: 0.875rem;`"
            onmouseover="if(this.style.background === 'white') { this.style.borderColor='#BECDA3'; }"
            onmouseout="if(this.style.background === 'white') { this.style.borderColor='#e5e7eb'; }"
          >
            {{ category.name }}
          </button>
        </div>
      </div>

      <!-- News List -->
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <div 
          v-for="article in filteredNews" 
          :key="article.id"
          style="background: white; border-radius: 16px; padding: 1.5rem; box-shadow: 0 4px 12px rgba(0,0,0,0.1); transition: all 0.2s; cursor: pointer;"
          onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 20px rgba(0,0,0,0.15)';"
          onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.1)';"
          @click="openArticle(article)"
        >
          <!-- Article Header -->
          <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
            <div :style="`width: 3rem; height: 3rem; background: ${getCategoryColor(article.category)}; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;`">
              <svg style="width: 1.5rem; height: 1.5rem; color: white;" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div style="flex: 1; min-width: 0;">
              <h4 style="color: #474747; font-size: 1.125rem; font-weight: 600; margin: 0 0 0.25rem 0;">{{ article.title }}</h4>
              <div style="display: flex; align-items: center; gap: 1rem; font-size: 0.875rem; color: #8F8B82;">
                <span>{{ formatDate(article.date) }}</span>
                <span>•</span>
                <span>{{ article.author }}</span>
                <span>•</span>
                <span :style="`color: ${getCategoryColor(article.category)}`">{{ getCategoryName(article.category) }}</span>
              </div>
            </div>
          </div>

          <!-- Article Content -->
          <p style="color: #8F8B82; margin: 0 0 1rem 0; font-size: 0.875rem; line-height: 1.5;">{{ article.excerpt }}</p>

          <!-- Article Actions -->
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div style="display: flex; align-items: center; gap: 1rem;">
              <button style="background: none; border: none; color: #8F8B82; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; font-size: 0.875rem; transition: all 0.2s;"
                      onmouseover="this.style.color='#474747'"
                      onmouseout="this.style.color='#8F8B82'">
                <svg style="width: 1rem; height: 1rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                </svg>
                {{ article.likes }}
              </button>
              <button @click.stop="shareArticle(article)" 
                      style="background: none; border: none; color: #8F8B82; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; font-size: 0.875rem; transition: all 0.2s;"
                      onmouseover="this.style.color='#474747'"
                      onmouseout="this.style.color='#8F8B82'">
                <svg style="width: 1rem; height: 1rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"/>
                </svg>
                Teilen
              </button>
            </div>
            
            <button style="background: white; color: #474747; padding: 0.5rem 1rem; border-radius: 12px; border: 2px solid #e5e7eb; cursor: pointer; font-size: 0.875rem; transition: all 0.2s;"
                    onmouseover="this.style.borderColor='#BECDA3'"
                    onmouseout="this.style.borderColor='#e5e7eb'">
              Lesen →
            </button>
          </div>
        </div>
      </div>

    </div>

    <!-- Footer Component -->
    <AppFooter 
      :active-tab="currentRole === 'helper' ? 'news' : 'dashboard'"
      :current-role="currentRole"
      @navigate="handleNavigation"
    />

    <!-- Padding for bottom nav -->
    <div style="height: 5rem;"></div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import AppHeader from '~/components/AppHeader.vue'
import AppFooter from '~/components/AppFooter.vue'
import { useRole } from '~/composables/useRole.js'

definePageMeta({
  layout: false
})

// Use role management
const { 
  currentRole, 
  toggleRole, 
  getRoleBasedTitle, 
  getRoleBasedNavigation, 
  getRequestButtonAction, 
  getNewsAction,
  detectRoleFromPath
} = useRole()

// Detect role from current URL on page load
onMounted(() => {
  detectRoleFromPath(window.location.pathname)
})

const selectedCategory = ref('all')

const categories = ref([
  { id: 'all', name: 'Alle' },
  { id: 'system', name: 'System' },
  { id: 'community', name: 'Community' },
  { id: 'updates', name: 'Updates' },
  { id: 'safety', name: 'Sicherheit' }
])

const newsArticles = ref([
  {
    id: 1,
    title: 'Neue Sicherheitsfeatures für alle Nutzer',
    excerpt: 'Wir haben zusätzliche Sicherheitsmaßnahmen implementiert, um Ihre Daten und Transaktionen noch besser zu schützen...',
    content: 'Vollständiger Artikel-Inhalt hier...',
    author: 'Sicherheitsteam',
    date: '2024-01-15',
    category: 'safety',
    likes: 42,
    readTime: '3 min'
  },
  {
    id: 2,
    title: 'Community-Event: Nachbarschaftshilfe Winnweiler',
    excerpt: 'Am kommenden Samstag findet unser erstes Community-Event in Winnweiler statt. Lernen Sie andere Helfer und Hilfesuchende kennen...',
    content: 'Event-Details und Anmeldung...',
    author: 'Community Team',
    date: '2024-01-12',
    category: 'community',
    likes: 28,
    readTime: '2 min'
  },
  {
    id: 3,
    title: 'App-Update 2.1: Verbesserte Benutzerführung',
    excerpt: 'Das neueste Update bringt eine überarbeitete Benutzeroberfläche und neue Features für eine noch bessere Nutzererfahrung...',
    content: 'Update-Details und neue Features...',
    author: 'Entwicklungsteam',
    date: '2024-01-10',
    category: 'updates',
    likes: 35,
    readTime: '4 min'
  }
])

const filteredNews = computed(() => {
  if (selectedCategory.value === 'all') {
    return newsArticles.value
  }
  return newsArticles.value.filter(article => article.category === selectedCategory.value)
})

const navigateToPublisher = () => {
  const publisherPath = currentRole.value === 'helper' ? '/pwa/helper/news-publisher' : '/pwa/shared/news'
  navigateTo(publisherPath)
}

const getCategoryColor = (category) => {
  const colors = {
    system: '#e74c3c',
    community: '#f39c12',
    updates: '#3498db',
    safety: '#27ae60',
    general: '#95a5a6'
  }
  return colors[category] || colors.general
}

const getCategoryName = (category) => {
  const names = {
    system: 'System',
    community: 'Community',
    updates: 'Updates',
    safety: 'Sicherheit',
    general: 'Allgemein'
  }
  return names[category] || names.general
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('de-DE', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}

const openArticle = (article) => {
  // In a real app, this would navigate to a detailed article view
  console.log('Opening article:', article.title)
}

const shareArticle = (article) => {
  // In a real app, this would open share options
  console.log('Sharing article:', article.title)
}

const handleNavigation = (tab) => {
  const path = getRoleBasedNavigation(tab)
  if (path) {
    navigateTo(path)
  }
}
</script>