<template>
  <div class="profile-container">
    <!-- Glass Morphism Background -->
    <div class="profile-background">
      <div class="background-gradient"></div>
      <div class="background-pattern"></div>
    </div>

    <!-- Header Component -->
    <AppHeader 
      title="Mein Profil"
      current-role="unified"
      :request-count="0"
      @open-requests="() => navigateTo('/pwa')"
      @open-profile="() => {}"
      @open-news="() => navigateTo('/pwa/shared/news')"
      @toggle-role="() => navigateTo('/pwa')"
    />
    
    <div class="mobile-container">
      

      <!-- Profile Header Component -->
      <ProfileHeader 
        :user-profile="userProfile"
        @edit-profile="editProfile"
        @retry-verification="retryVerification"
        @go-to-earnings="() => navigateTo('/pwa/helper/earnings')"
      />


      <!-- Meine Jobs Section -->
      <div class="section-card jobs-section">
        <!-- Header with Create Button -->
        <div class="jobs-header">
          <h3 class="section-title">Meine Jobs</h3>
          <button @click="createNewJob" class="create-job-btn">
            <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
            </svg>
            Neuen Job erstellen
          </button>
        </div>

        <!-- Status Tabs -->
        <div class="status-tabs">
          <button 
            v-for="tab in statusTabs" 
            :key="tab.id"
            @click="activeJobTab = tab.id"
            class="status-tab"
            :class="{ 'status-tab-active': activeJobTab === tab.id }"
          >
            <span class="tab-label">{{ tab.label }}</span>
            <span v-if="getJobCountForStatus(tab.statuses) > 0" class="tab-count">{{ getJobCountForStatus(tab.statuses) }}</span>
          </button>
        </div>

        <!-- Jobs List -->
        <div class="jobs-list">
          <div v-if="filteredJobs.length === 0" class="empty-state">
            <div class="empty-icon-container">
              <svg class="empty-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
              </svg>
            </div>
            <h4 class="empty-title">{{ getEmptyStateTitle() }}</h4>
            <p class="empty-subtitle">{{ getEmptyStateSubtitle() }}</p>
            <button v-if="activeJobTab === 'open'" @click="createNewJob" class="empty-action-btn">
              <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
              </svg>
              Ersten Job erstellen
            </button>
          </div>

          <div v-for="job in filteredJobs" :key="job.id" class="job-card" @click="openJobDetail(job)">
            <div class="job-header">
              <div class="job-category">
                <!-- Shopping Icon -->
                <svg v-if="job.category === 'shopping'" class="category-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5L17 18"/>
                  <circle cx="9" cy="20" r="1"/>
                  <circle cx="20" cy="20" r="1"/>
                </svg>
                
                <!-- Gardening Icon -->
                <svg v-else-if="job.category === 'gardening'" class="category-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.5 9a2.5 2.5 0 005 0"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11.5v3"/>
                </svg>
                
                <!-- Other/Default Icon -->
                <svg v-else class="category-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div class="job-status-badge" :class="job.status">
                {{ getStatusText(job.status) }}
              </div>
            </div>
            
            <h4 class="job-title">{{ job.title }}</h4>
            
            <div class="job-meta">
              <div class="job-meta-item">
                <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
                <span class="meta-text">{{ formatJobDate(job) }}</span>
              </div>
              
              <div class="job-meta-item">
                <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
                </svg>
                <span class="meta-text">{{ job.price }}€</span>
              </div>
            </div>

            <!-- Partner info for active/completed jobs -->
            <div v-if="job.partnerName" class="partner-info">
              <div class="partner-avatar">
                <svg class="partner-avatar-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
              </div>
              <div class="partner-details">
                <div class="partner-header">
                  <span class="partner-name">{{ job.partnerName }}</span>
                  <span class="partner-type">{{ job.partnerType === 'seeker' ? 'Hilfesuchender' : 'Helfer' }}</span>
                </div>
                <div v-if="job.partnerRating" class="partner-rating">
                  <span class="rating-stars">★★★★★</span>
                  <span class="rating-value">{{ job.partnerRating }}</span>
                </div>
              </div>
            </div>

            <!-- Details button -->
            <div class="job-actions">
              <button @click.stop="openJobDetail(job)" class="details-btn">
                <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                </svg>
                Details ansehen
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- Footer Component -->
    <MinimalFooter 
      active-tab="profile"
      current-role="unified"
      @navigate="handleFooterNavigation"
    />

    <!-- Padding for bottom nav -->
    <div style="height: 5rem;"></div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import AppHeader from '~/components/AppHeader.vue'
import MinimalFooter from '~/components/pwa/unified/MinimalFooter.vue'
import ProfileHeader from '~/components/pwa/shared/profile/ProfileHeader.vue'
import ProfileStats from '~/components/pwa/shared/profile/ProfileStats.vue'
import ProfileSettings from '~/components/pwa/shared/profile/ProfileSettings.vue'
import RoleSwitch from '~/components/pwa/shared/profile/RoleSwitch.vue'
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
  
  // Demo mode for testing different verification states
  const route = useRoute()
  if (route.query.demo) {
    switch(route.query.demo) {
      case 'pending':
        userProfile.value.verificationStatus = 'pending'
        userProfile.value.verificationDetails.estimatedWaitTime = '2-6 Stunden'
        break
      case 'rejected':
        userProfile.value.verificationStatus = 'rejected'
        userProfile.value.verificationDetails.rejectionReason = 'Das übermittelte Dokument war nicht deutlich lesbar. Bitte laden Sie ein schärferes Foto hoch.'
        break
      case 'verified':
        userProfile.value.verificationStatus = 'verified'
        break
    }
  }
})

// Erweiterte User-Profil Daten für US-2.1
// Realistische User-Profil Daten je nach aktuellem currentRole
const userProfile = ref({
  // Basis-Informationen
  name: currentRole.value === 'helper' ? 'Max Mustermann' : 'Margarete Schmidt',
  age: currentRole.value === 'helper' ? 16 : 72,
  city: 'Winnweiler',
  memberSince: currentRole.value === 'helper' ? 'September 2024' : 'Januar 2024',
  
  // Profilbild
  profilePicture: null,
  
  // Bio (rollenspezifisch)
  bio: currentRole.value === 'helper' 
    ? 'Hallo! Ich bin Max und helfe gerne beim Einkaufen und im Garten. Bin zuverlässig und von der Kirchengemeinde bestätigt.'
    : 'Hallo! Ich bin Margarete und freue mich über Hilfe im Alltag. Besonders beim Einkaufen und bei kleineren Hausarbeiten.',
  
  // Verifizierung - Enhanced for US-2.4
  isVerified: true,
  verificationStatus: 'verified', // 'pending', 'verified', 'rejected'
  verificationDetails: {
    estimatedWaitTime: '2-6 Stunden', // for pending status
    rejectionReason: null, // for rejected status
    verifiedDate: '15. September 2024' // for verified status
  },
  
  // Bewertungen (rollenspezifisch)
  rating: currentRole.value === 'helper' ? 4.8 : 4.9,
  totalRatings: currentRole.value === 'helper' ? 23 : 31,
  totalJobsCompleted: currentRole.value === 'helper' ? 23 : 47,
  
  // Badges
  helperLevel: currentRole.value === 'helper' ? 'Bronze' : null,
  organization: 'Kirchengemeinde St. Martin',
  
  // Helfer-spezifisch
  helperCategories: currentRole.value === 'helper' ? ['shopping', 'gardening', 'companionship'] : null,
  helperRadius: currentRole.value === 'helper' ? 8 : null,
  
  // Statistiken nach Rolle
  helperData: {
    totalEarned: 465,
    favoriteClients: 7,
    averageRating: 4.8
  },
  seekerData: {
    totalSpent: 1180,
    favoriteHelpers: 8,
    averageRating: 4.9
  }
})

// Jobs data and state
const activeJobTab = ref('active')

// Status tabs configuration
const statusTabs = ref([
  { 
    id: 'active', 
    label: 'Laufend', 
    statuses: ['accepted', 'in_progress'] 
  },
  { 
    id: 'completed', 
    label: 'Abgeschlossen', 
    statuses: ['completed'] 
  },
  { 
    id: 'cancelled', 
    label: 'Abgebrochen', 
    statuses: ['cancelled_by_seeker', 'cancelled_by_helper'] 
  },
  { 
    id: 'open', 
    label: 'Offen', 
    statuses: ['open', 'applications_received'] 
  }
])

// Mock jobs data 
const jobs = ref([
  {
    id: 1,
    title: 'Einkaufen bei REWE',
    category: 'shopping',
    status: 'accepted',
    price: 25,
    isImmediate: false,
    scheduledDate: '2024-11-16',
    scheduledTime: '21:49',
    createdAt: new Date().toISOString(),
    partnerName: 'Anna',
    partnerRating: 4.8,
    partnerType: 'seeker',
    acceptedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString()
  },
  {
    id: 2,
    title: 'Garten gießen',
    category: 'gardening',
    status: 'in_progress',
    price: 15,
    isImmediate: false,
    scheduledDate: '2024-11-07',
    scheduledTime: '14:00',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    partnerName: 'Klaus',
    partnerRating: 4.7,
    partnerType: 'helper',
    acceptedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 3,
    title: 'Mittagessen kochen',
    category: 'cooking',
    status: 'completed',
    price: 30,
    isImmediate: true,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    partnerName: 'Maria',
    partnerRating: 4.9,
    partnerType: 'helper',
    completedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 4,
    title: 'Wohnung putzen',
    category: 'cleaning',
    status: 'cancelled_by_seeker',
    price: 40,
    isImmediate: false,
    scheduledDate: '2024-11-05',
    scheduledTime: '10:00',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    cancelledAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    partnerName: 'Thomas',
    partnerRating: 4.6,
    partnerType: 'helper'
  }
])

// Legacy jobs (kept for backward compatibility)
const userJobs = ref([
  {
    id: 1,
    title: 'Einkaufen für Margarete',
    description: 'Wöchentlicher Einkauf vom Supermarkt',
    date: '15. November 2024',
    amount: '€15',
    status: 'completed',
    color: '#22c55e',
    iconPath: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z'
  },
  {
    id: 2,
    title: 'Gartenarbeit helfen',
    description: 'Unkraut jäten und Hecken schneiden',
    date: '18. November 2024',
    amount: '€25',
    status: 'active',
    color: '#5F6F55',
    iconPath: 'M20 21l-8-8m8 8V9m0 12l-8-8m8 8H9m11-12a8 8 0 11-16 0 8 8 0 0116 0z'
  },
  {
    id: 3,
    title: 'Begleitung zum Arzt',
    description: 'Hilfe bei Arzttermin in Winnweiler',
    date: '20. November 2024',
    amount: '€20',
    status: 'pending',
    color: '#f59e0b',
    iconPath: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
  },
  {
    id: 4,
    title: 'Kleine Reparatur',
    description: 'Tür reparieren und Bild aufhängen',
    date: '22. November 2024',
    amount: '€30',
    status: 'pending',
    color: '#3b82f6',
    iconPath: 'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4'
  }
])

// Computed properties - Jobs Section
const filteredJobs = computed(() => {
  const currentTab = statusTabs.value.find(tab => tab.id === activeJobTab.value)
  return jobs.value.filter(job => currentTab.statuses.includes(job.status))
})

// Legacy computed properties
const activeJobs = computed(() => userJobs.value.filter(job => job.status === 'active'))
const completedJobs = computed(() => userJobs.value.filter(job => job.status === 'completed'))
const pendingJobs = computed(() => userJobs.value.filter(job => job.status === 'pending'))

// New methods
const openSettings = () => {
  navigateTo('/pwa/shared/profile/edit')
}

// Neue Funktionen für US-2.1
const editProfile = () => {
  // Navigation zur Profil-Bearbeitung
  console.log('Navigiere zu Profil bearbeiten')
  navigateTo('/pwa/shared/profile/edit')
}

// US-2.4: Verification Status Methods
const retryVerification = () => {
  // In real app: Navigate to verification upload page
  console.log('Retry verification clicked')
  alert('Sie werden zur Verifizierung weitergeleitet...')
  navigateTo('/pwa/shared/verification')
}

const switchRole = () => {
  toggleRole()
}

// Jobs Section Methods
const getJobCountForStatus = (statuses) => {
  return jobs.value.filter(job => statuses.includes(job.status)).length
}

const getStatusText = (status) => {
  const statusTexts = {
    'open': 'Offen',
    'applications_received': 'Bewerbungen erhalten',
    'accepted': 'Angenommen',
    'in_progress': 'In Arbeit',
    'completed': 'Abgeschlossen',
    'cancelled_by_seeker': 'Von mir abgebrochen',
    'cancelled_by_helper': 'Vom Helfer abgebrochen'
  }
  return statusTexts[status] || status
}

const formatJobDate = (job) => {
  if (job.isImmediate) {
    return 'Sofort'
  } else {
    const date = new Date(job.scheduledDate + 'T' + job.scheduledTime)
    return date.toLocaleDateString('de-DE', { 
      day: '2-digit', 
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  }
}

const getEmptyStateTitle = () => {
  const titles = {
    'open': 'Keine offenen Jobs',
    'active': 'Keine laufenden Jobs',
    'completed': 'Keine abgeschlossenen Jobs',
    'cancelled': 'Keine abgebrochenen Jobs'
  }
  return titles[activeJobTab.value] || 'Keine Jobs'
}

const getEmptyStateSubtitle = () => {
  const subtitles = {
    'open': 'Erstellen Sie Ihren ersten Job, um Hilfe zu erhalten',
    'active': 'Hier erscheinen Jobs, die gerade bearbeitet werden',
    'completed': 'Hier sehen Sie alle erfolgreich abgeschlossenen Jobs',
    'cancelled': 'Hier erscheinen abgebrochene Jobs'
  }
  return subtitles[activeJobTab.value] || ''
}

const createNewJob = () => {
  navigateTo('/pwa/jobs/create/category')
}

const openJobDetail = (job) => {
  navigateTo(`/pwa/jobs/detail/${job.id}`)
}

const handleFooterNavigation = (tab) => {
  switch(tab) {
    case 'dashboard':
      navigateTo('/pwa')
      break
    case 'helper-tasks':
      navigateTo('/pwa/helper/tasks')
      break
    case 'chat':
      navigateTo('/pwa/shared/chat')
      break
    case 'seeker-create':
      navigateTo('/pwa/jobs/create/category')
      break
    case 'seeker-favorites':
      navigateTo('/pwa/seeker/favorites')
      break
    case 'profile':
      // Already on profile page
      break
  }
}
</script>

<style scoped>
/* Modern Profile Design with Dashboard Style */
.profile-container {
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  position: relative;
  overflow: hidden;
}

/* Glass Morphism Background */
.profile-background {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
}

.background-gradient {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, 
    #f8fafc 0%, 
    #f1f5f9 25%, 
    #e2e8f0 50%, 
    #cbd5e1 75%, 
    #94a3b8 100%);
}

.background-pattern {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    radial-gradient(circle at 20% 20%, rgba(95, 111, 85, 0.05) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(190, 205, 163, 0.05) 0%, transparent 50%),
    radial-gradient(circle at 40% 60%, rgba(143, 139, 130, 0.03) 0%, transparent 50%);
  pointer-events: none;
}

.mobile-container {
  padding: 2rem 1.5rem 6rem;
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 100vw;
  box-sizing: border-box;
  overflow-x: hidden;
}

/* Jobs Section Styles */
.jobs-section {
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.4);
}

.jobs-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(95, 111, 85, 0.1);
}

.create-job-btn {
  background: linear-gradient(135deg, #5F6F55, #4a5c44);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  white-space: nowrap;
  box-shadow: 0 2px 8px rgba(95, 111, 85, 0.2);
}

.create-job-btn:hover {
  background: linear-gradient(135deg, #4a5c44, #3d4d38);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(95, 111, 85, 0.3);
}

/* Status Tabs */
.status-tabs {
  display: flex;
  background: rgba(243, 244, 246, 0.8);
  border-radius: 12px;
  padding: 0.375rem;
  margin-bottom: 1.5rem;
  gap: 0.25rem;
  overflow-x: auto;
}

.status-tab {
  flex: 1;
  min-width: 0;
  background: transparent;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
}

.status-tab:hover {
  background: rgba(95, 111, 85, 0.1);
}

.status-tab.status-tab-active {
  background: linear-gradient(135deg, #5F6F55, #4a5c44);
  color: white;
  box-shadow: 0 2px 8px rgba(95, 111, 85, 0.2);
}

.tab-label {
  font-weight: 600;
  white-space: nowrap;
}

.tab-count {
  background: rgba(255, 255, 255, 0.2);
  color: inherit;
  border-radius: 8px;
  padding: 0.125rem 0.375rem;
  font-size: 0.625rem;
  font-weight: 600;
  min-width: 1.25rem;
  text-align: center;
}

.status-tab:not(.status-tab-active) .tab-count {
  background: rgba(95, 111, 85, 0.2);
  color: #5F6F55;
}

/* Jobs List */
.jobs-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 2rem 1rem;
}

.empty-icon-container {
  width: 4rem;
  height: 4rem;
  background: linear-gradient(135deg, rgba(95, 111, 85, 0.1), rgba(190, 205, 163, 0.2));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem auto;
}

.empty-icon {
  width: 2rem;
  height: 2rem;
  color: #5F6F55;
}

.empty-title {
  color: #1e293b;
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
}

.empty-subtitle {
  color: #64748b;
  margin: 0 0 1.5rem 0;
  line-height: 1.5;
}

.empty-action-btn {
  background: linear-gradient(135deg, #5F6F55, #4a5c44);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 0.875rem 1.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 2px 8px rgba(95, 111, 85, 0.2);
}

.empty-action-btn:hover {
  background: linear-gradient(135deg, #4a5c44, #3d4d38);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(95, 111, 85, 0.3);
}

/* Job Cards */
.job-card {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 16px;
  padding: 1.25rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
}

.job-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.95);
}

.job-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.875rem;
}

.job-category {
  width: 2.5rem;
  height: 2.5rem;
  background: linear-gradient(135deg, #BECDA3, #a8bb8f);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(95, 111, 85, 0.15);
}

.category-icon {
  width: 1.25rem;
  height: 1.25rem;
  color: #5F6F55;
}

.job-status-badge {
  padding: 0.375rem 0.625rem;
  border-radius: 8px;
  font-size: 0.625rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.job-status-badge.accepted,
.job-status-badge.in_progress {
  background: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
}

.job-status-badge.completed {
  background: rgba(34, 197, 94, 0.1);
  color: #22c55e;
}

.job-status-badge.cancelled_by_seeker,
.job-status-badge.cancelled_by_helper {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}

.job-title {
  color: #1e293b;
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.75rem 0;
  line-height: 1.3;
}

.job-meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 0.875rem;
}

.job-meta-item {
  display: flex;
  align-items: center;
  gap: 0.375rem;
}

.meta-icon {
  width: 0.875rem;
  height: 0.875rem;
  color: #6b7280;
}

.meta-text {
  color: #6b7280;
  font-size: 0.75rem;
  font-weight: 500;
}

/* Partner Info */
.partner-info {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.625rem;
  background: rgba(95, 111, 85, 0.05);
  border-radius: 8px;
  border: 1px solid rgba(95, 111, 85, 0.1);
  margin-bottom: 0.875rem;
}

.partner-avatar {
  width: 2rem;
  height: 2rem;
  background: #BECDA3;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.partner-avatar-icon {
  width: 1rem;
  height: 1rem;
  color: #5F6F55;
}

.partner-details {
  flex: 1;
  min-width: 0;
}

.partner-header {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  margin-bottom: 0.125rem;
}

.partner-name {
  color: #1e293b;
  font-size: 0.75rem;
  font-weight: 600;
}

.partner-type {
  color: #6b7280;
  font-size: 0.625rem;
  font-weight: 500;
  background: rgba(107, 114, 128, 0.1);
  padding: 0.125rem 0.375rem;
  border-radius: 6px;
}

.partner-rating {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.rating-stars {
  color: #fbbf24;
  font-size: 0.625rem;
}

.rating-value {
  color: #6b7280;
  font-size: 0.625rem;
  font-weight: 500;
}

/* Job Actions */
.job-actions {
  padding-top: 0.875rem;
  border-top: 1px solid rgba(229, 231, 235, 0.3);
}

.details-btn {
  background: #5F6F55;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.625rem 0.875rem;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.375rem;
  width: 100%;
  box-shadow: 0 1px 4px rgba(95, 111, 85, 0.2);
}

.details-btn:hover {
  background: #4a5c44;
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(95, 111, 85, 0.3);
}

.btn-icon {
  width: 0.875rem;
  height: 0.875rem;
  flex-shrink: 0;
}

/* Responsive Design */
@media (min-width: 1400px) {
  .mobile-container {
    padding: 3rem 2rem 6rem;
    max-width: 1400px;
    margin: 0 auto;
  }
  
  .section-card {
    padding: 2.5rem;
  }
}

@media (max-width: 1399px) and (min-width: 1024px) {
  .mobile-container {
    padding: 2rem;
    max-width: 1024px;
    margin: 0 auto;
  }
  
  .section-card {
    padding: 2.5rem;
  }
}

@media (max-width: 1023px) and (min-width: 768px) {
  .mobile-container {
    padding: 1.5rem;
    max-width: 768px;
    margin: 0 auto;
  }
  
  .section-card {
    padding: 1.75rem;
  }
  
  .action-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 767px) and (min-width: 480px) {
  .mobile-container {
    padding: 1.25rem 1rem 6rem;
  }
  
  .section-card {
    padding: 1.75rem;
    border-radius: 20px;
  }
  
  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  
  .job-item {
    padding: 1.25rem;
    gap: 1rem;
  }
  
  .job-icon-inner {
    width: 2.5rem;
    height: 2.5rem;
  }
  
  .job-icon-inner svg {
    width: 1rem;
    height: 1rem;
  }
  
  .job-title {
    font-size: 0.9375rem;
  }
  
  .job-description {
    font-size: 0.8125rem;
  }
  
  .amount {
    font-size: 1rem;
  }
}

@media (max-width: 479px) {
  .mobile-container {
    padding: 1rem 0.75rem 6rem;
  }
  
  .section-card {
    padding: 1.5rem;
    border-radius: 20px;
  }
  
  

}
</style>