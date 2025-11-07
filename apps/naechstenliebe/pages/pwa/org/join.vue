<template>
  <div class="join-org-container">
    <!-- Header -->
    <AppHeader 
      title="Organisation beitreten" 
      current-role="unified"
      :request-count="0"
      :show-back="true"
      @back="() => navigateTo('/pwa/shared/profile')"
      @open-profile="() => navigateTo('/pwa/shared/profile')"
    />

    <div class="content-container">
      
      <!-- Search Section -->
      <div class="search-section">
        <div class="section-header">
          <h2 class="section-title">Suche deine Organisation</h2>
          <p class="section-subtitle">Finde und tritt deiner Organisation bei</p>
        </div>

        <div class="search-container">
          <div class="search-input-container">
            <svg class="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            <input 
              v-model="searchQuery"
              type="text"
              placeholder="Name der Organisation eingeben..."
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

        <!-- Search Results -->
        <div v-if="isSearching" class="search-loading">
          <div class="loading-spinner"></div>
          <p>Suche Organisationen...</p>
        </div>

        <div v-else-if="searchResults.length > 0" class="search-results">
          <h3 class="results-title">Suchergebnisse</h3>
          <div class="results-list">
            <div 
              v-for="org in searchResults" 
              :key="org.id"
              class="organization-card"
              @click="selectOrganization(org)"
            >
              <div class="org-logo">
                <img v-if="org.logo_url" :src="org.logo_url" alt="Logo">
                <div v-else class="org-logo-placeholder">
                  {{ org.name.charAt(0) }}
                </div>
              </div>
              <div class="org-info">
                <h4 class="org-name">{{ org.name }}</h4>
                <div class="org-type">{{ getTypeLabel(org.type) }}</div>
                <div class="org-meta">
                  <span class="org-members">{{ org.total_members }} Mitglieder</span>
                  <span class="org-verified" v-if="org.is_verified">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    Verifiziert
                  </span>
                </div>
              </div>
              <div class="org-arrow">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div v-else-if="searchQuery && !isSearching" class="no-results">
          <div class="no-results-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </div>
          <h3>Keine Organisationen gefunden</h3>
          <p>Für "{{ searchQuery }}" wurden keine Organisationen gefunden.</p>
        </div>

        <!-- Default State -->
        <div v-if="!searchQuery" class="search-placeholder">
          <div class="placeholder-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
            </svg>
          </div>
          <h3>Finde deine Organisation</h3>
          <p>Beginnen Sie mit der Eingabe des Organisationsnamens.</p>
        </div>
      </div>

      <!-- Popular Organizations -->
      <div v-if="!searchQuery && popularOrganizations.length > 0" class="popular-section">
        <h3 class="popular-title">Beliebte Organisationen</h3>
        <div class="popular-list">
          <div 
            v-for="org in popularOrganizations" 
            :key="org.id"
            class="organization-card"
            @click="selectOrganization(org)"
          >
            <div class="org-logo">
              <img v-if="org.logo_url" :src="org.logo_url" alt="Logo">
              <div v-else class="org-logo-placeholder">
                {{ org.name.charAt(0) }}
              </div>
            </div>
            <div class="org-info">
              <h4 class="org-name">{{ org.name }}</h4>
              <div class="org-type">{{ getTypeLabel(org.type) }}</div>
              <div class="org-meta">
                <span class="org-members">{{ org.total_members }} Mitglieder</span>
                <span class="org-verified" v-if="org.is_verified">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  Verifiziert
                </span>
              </div>
            </div>
            <div class="org-arrow">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- Organization Detail Modal -->
    <div v-if="showOrgDetail" class="modal-overlay" @click.self="closeOrgDetail">
      <div class="modal-content org-detail-modal">
        <div class="modal-header">
          <h3 class="modal-title">Organisationsdetails</h3>
          <button @click="closeOrgDetail" class="close-btn">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        
        <div v-if="selectedOrganization" class="org-detail-content">
          <!-- Organization Header -->
          <div class="org-detail-header">
            <div class="org-detail-logo">
              <img v-if="selectedOrganization.logo_url" :src="selectedOrganization.logo_url" alt="Logo">
              <div v-else class="org-detail-logo-placeholder">
                {{ selectedOrganization.name.charAt(0) }}
              </div>
            </div>
            <div class="org-detail-info">
              <h4 class="org-detail-name">{{ selectedOrganization.name }}</h4>
              <div class="org-detail-type">{{ getTypeLabel(selectedOrganization.type) }}</div>
              <div class="org-detail-status">
                <span v-if="selectedOrganization.is_verified" class="verified-badge">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  Verifiziert
                </span>
                <span v-else class="pending-badge">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  Verifizierung läuft
                </span>
              </div>
            </div>
          </div>

          <!-- Organization Description -->
          <div v-if="selectedOrganization.description" class="org-description">
            <h5>Über die Organisation</h5>
            <p>{{ selectedOrganization.description }}</p>
          </div>

          <!-- Organization Stats -->
          <div class="org-stats">
            <div class="stat">
              <div class="stat-number">{{ selectedOrganization.total_members }}</div>
              <div class="stat-label">Mitglieder</div>
            </div>
            <div class="stat">
              <div class="stat-number">{{ selectedOrganization.total_jobs_posted }}</div>
              <div class="stat-label">Jobs gepostet</div>
            </div>
          </div>

          <!-- Website Link -->
          <div v-if="selectedOrganization.website" class="org-website">
            <a :href="selectedOrganization.website" target="_blank" class="website-link">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
              Website besuchen
            </a>
          </div>
        </div>
        
        <div class="modal-footer">
          <button @click="closeOrgDetail" class="btn-cancel">Abbrechen</button>
          <button @click="requestMembership" :disabled="isRequesting" class="btn-join">
            <span v-if="isRequesting">Anfrage wird gesendet...</span>
            <span v-else>Beitritt anfragen</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Success Message -->
    <div v-if="showMessage" class="message" :class="messageType">
      <div class="message-content">
        <svg v-if="messageType === 'success'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
        </svg>
        <svg v-else fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"/>
        </svg>
        <span>{{ message }}</span>
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
import { ref, onMounted } from 'vue'
import AppHeader from '~/components/AppHeader.vue'
import UnifiedFooter from '~/components/pwa/unified/UnifiedFooter.vue'
import { useOrganizations } from '~/composables/useOrganizations.js'

definePageMeta({
  layout: false
})

// Use organizations composable
const { searchOrganizations, requestToJoinOrganization } = useOrganizations()

// Search state
const searchQuery = ref('')
const searchResults = ref([])
const isSearching = ref(false)
const searchTimeout = ref(null)

// Popular organizations
const popularOrganizations = ref([])

// Modal state
const showOrgDetail = ref(false)
const selectedOrganization = ref(null)
const isRequesting = ref(false)

// Messages
const showMessage = ref(false)
const message = ref('')
const messageType = ref('success')

// Load popular organizations on mount
onMounted(async () => {
  // Mock popular organizations
  popularOrganizations.value = [
    {
      id: 'org_1',
      name: 'Kirchengemeinde St. Maria',
      type: 'church',
      description: 'Wir sind eine lebendige Gemeinde, die sich um das Wohl aller Mitglieder kümmert.',
      logo_url: null,
      website: 'https://st-maria.de',
      is_verified: true,
      total_members: 127,
      total_jobs_posted: 450
    },
    {
      id: 'org_2',
      name: 'Nachbarschaftshilfe Winnweiler',
      type: 'neighborhood',
      description: 'Gemeinschaftsinitiative für nachbarschaftliche Hilfe in Winnweiler und Umgebung.',
      logo_url: null,
      website: null,
      is_verified: true,
      total_members: 89,
      total_jobs_posted: 234
    },
    {
      id: 'org_3',
      name: 'Seniorenzentrum Sonnenhof',
      type: 'senior_center',
      description: 'Betreuung und Pflege für Senioren mit Herz und Kompetenz.',
      logo_url: null,
      website: 'https://sonnenhof.de',
      is_verified: false,
      total_members: 45,
      total_jobs_posted: 156
    }
  ]
})

// Methods
const handleSearch = () => {
  // Clear existing timeout
  if (searchTimeout.value) {
    clearTimeout(searchTimeout.value)
  }

  // Set new timeout for debouncing
  searchTimeout.value = setTimeout(async () => {
    if (searchQuery.value.trim().length < 2) {
      searchResults.value = []
      return
    }

    isSearching.value = true

    try {
      const results = await searchOrganizations(searchQuery.value)
      searchResults.value = [...results, ...popularOrganizations.value].filter((org, index, self) => 
        index === self.findIndex(o => o.id === org.id)
      ).filter(org => 
        org.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        org.type.toLowerCase().includes(searchQuery.value.toLowerCase())
      )
    } catch (error) {
      console.error('Search failed:', error)
      searchResults.value = []
    } finally {
      isSearching.value = false
    }
  }, 300)
}

const clearSearch = () => {
  searchQuery.value = ''
  searchResults.value = []
}

const selectOrganization = (organization) => {
  selectedOrganization.value = organization
  showOrgDetail.value = true
}

const closeOrgDetail = () => {
  showOrgDetail.value = false
  selectedOrganization.value = null
}

const requestMembership = async () => {
  if (!selectedOrganization.value) return

  isRequesting.value = true

  try {
    const result = await requestToJoinOrganization(selectedOrganization.value.id)

    if (result.success) {
      showSuccessMessage(result.message)
      closeOrgDetail()
      
      // Navigate to profile after short delay
      setTimeout(() => {
        navigateTo('/pwa/shared/profile')
      }, 2000)
    } else {
      showErrorMessage(result.error)
    }
  } catch (error) {
    showErrorMessage('Fehler beim Senden der Beitritts-Anfrage.')
  } finally {
    isRequesting.value = false
  }
}

const getTypeLabel = (type) => {
  const types = {
    charity: 'Wohltätigkeitsorganisation',
    church: 'Kirchengemeinde',
    senior_center: 'Seniorenzentrum',
    neighborhood: 'Nachbarschaftshilfe',
    other: 'Sonstiges'
  }
  return types[type] || type
}

const showSuccessMessage = (msg) => {
  message.value = msg
  messageType.value = 'success'
  showMessage.value = true
  setTimeout(() => {
    showMessage.value = false
  }, 3000)
}

const showErrorMessage = (msg) => {
  message.value = msg
  messageType.value = 'error'
  showMessage.value = true
  setTimeout(() => {
    showMessage.value = false
  }, 4000)
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
.join-org-container {
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
.search-section,
.popular-section {
  background: white;
  border-radius: 20px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.section-header {
  text-align: center;
  margin-bottom: 1.5rem;
}

.section-title {
  color: #374151;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
}

.section-subtitle {
  color: #6b7280;
  font-size: 1rem;
  margin: 0;
}

/* Search Input */
.search-container {
  margin-bottom: 1.5rem;
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

/* Loading State */
.search-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
  color: #6b7280;
}

.loading-spinner {
  width: 2rem;
  height: 2rem;
  border: 3px solid #f3f4f6;
  border-top: 3px solid #5F6F55;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Search Placeholder */
.search-placeholder,
.no-results {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
  text-align: center;
  color: #6b7280;
}

.placeholder-icon,
.no-results-icon {
  width: 4rem;
  height: 4rem;
  color: #d1d5db;
}

.search-placeholder h3,
.no-results h3 {
  color: #374151;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
}

.search-placeholder p,
.no-results p {
  margin: 0;
}

/* Results */
.results-title,
.popular-title {
  color: #374151;
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
}

.results-list,
.popular-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

/* Organization Cards */
.organization-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f9fafb;
  border: 2px solid transparent;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.organization-card:hover {
  background: #f3f4f6;
  border-color: #BECDA3;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.org-logo {
  width: 3rem;
  height: 3rem;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
}

.org-logo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.org-logo-placeholder {
  width: 100%;
  height: 100%;
  background: #BECDA3;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #5F6F55;
  font-weight: 700;
  font-size: 1.25rem;
}

.org-info {
  flex: 1;
}

.org-name {
  color: #374151;
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.25rem 0;
  line-height: 1.3;
}

.org-type {
  color: #6b7280;
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
}

.org-meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.75rem;
}

.org-members {
  color: #6b7280;
}

.org-verified {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: #22c55e;
  font-weight: 500;
}

.org-verified svg {
  width: 0.875rem;
  height: 0.875rem;
}

.org-arrow {
  color: #8F8B82;
  flex-shrink: 0;
}

.org-arrow svg {
  width: 1.25rem;
  height: 1.25rem;
}

/* Organization Detail Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 20px;
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.modal-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #374151;
  margin: 0;
}

.close-btn {
  width: 2rem;
  height: 2rem;
  border: none;
  background: #f3f4f6;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease;
}

.close-btn:hover {
  background: #e5e7eb;
}

.close-btn svg {
  width: 1rem;
  height: 1rem;
  color: #6b7280;
}

/* Organization Detail Content */
.org-detail-content {
  padding: 1.5rem;
}

.org-detail-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.org-detail-logo {
  width: 4rem;
  height: 4rem;
  border-radius: 12px;
  overflow: hidden;
  flex-shrink: 0;
}

.org-detail-logo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.org-detail-logo-placeholder {
  width: 100%;
  height: 100%;
  background: #BECDA3;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #5F6F55;
  font-weight: 700;
  font-size: 1.5rem;
}

.org-detail-info {
  flex: 1;
}

.org-detail-name {
  color: #374151;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 0.25rem 0;
}

.org-detail-type {
  color: #6b7280;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
}

.verified-badge,
.pending-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
}

.verified-badge {
  background: rgba(34, 197, 94, 0.1);
  color: #22c55e;
}

.pending-badge {
  background: rgba(245, 158, 11, 0.1);
  color: #f59e0b;
}

.verified-badge svg,
.pending-badge svg {
  width: 0.875rem;
  height: 0.875rem;
}

.org-description {
  margin-bottom: 1.5rem;
}

.org-description h5 {
  color: #374151;
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.75rem 0;
}

.org-description p {
  color: #6b7280;
  line-height: 1.6;
  margin: 0;
}

.org-stats {
  display: flex;
  gap: 2rem;
  margin-bottom: 1.5rem;
}

.stat {
  text-align: center;
}

.stat-number {
  color: #5F6F55;
  font-size: 1.75rem;
  font-weight: 700;
  line-height: 1;
  margin-bottom: 0.25rem;
}

.stat-label {
  color: #6b7280;
  font-size: 0.875rem;
  font-weight: 500;
}

.org-website {
  margin-bottom: 1rem;
}

.website-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #5F6F55;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
}

.website-link:hover {
  color: #4a5c44;
}

.website-link svg {
  width: 1rem;
  height: 1rem;
}

.modal-footer {
  display: flex;
  gap: 1rem;
  padding: 1.5rem;
  border-top: 1px solid #e5e7eb;
  justify-content: flex-end;
}

.btn-cancel,
.btn-join {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  font-size: 0.875rem;
}

.btn-cancel {
  background: #f3f4f6;
  color: #6b7280;
}

.btn-cancel:hover {
  background: #e5e7eb;
}

.btn-join {
  background: #5F6F55;
  color: white;
}

.btn-join:hover:not(:disabled) {
  background: #4a5c44;
}

.btn-join:disabled {
  background: #d1d5db;
  color: #9ca3af;
  cursor: not-allowed;
}

/* Messages */
.message {
  position: fixed;
  top: 1rem;
  left: 1rem;
  right: 1rem;
  z-index: 2000;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  animation: slideIn 0.3s ease;
}

.message.success {
  background: #22c55e;
  color: white;
}

.message.error {
  background: #ef4444;
  color: white;
}

.message-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.message-content svg {
  width: 1.25rem;
  height: 1.25rem;
  flex-shrink: 0;
}

@keyframes slideIn {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Responsive Design */
@media (min-width: 768px) {
  .content-container {
    padding: 2rem;
  }
  
  .org-stats {
    gap: 3rem;
  }
  
  .modal-footer {
    justify-content: flex-end;
  }
}
</style>