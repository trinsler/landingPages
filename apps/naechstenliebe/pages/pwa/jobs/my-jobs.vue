<template>
  <div class="dashboard-container">
    <!-- Glass Morphism Background -->
    <div class="dashboard-background">
      <div class="background-gradient"></div>
      <div class="background-pattern"></div>
    </div>

    <!-- Header Component -->
    <AppHeader 
      title="Meine Jobs"
      current-role="unified"
      :request-count="0"
      @open-requests="() => navigateTo('/pwa')"
      @open-profile="() => navigateTo('/pwa/shared/profile')"
      @open-news="() => navigateTo('/pwa/shared/news')"
      @toggle-role="() => navigateTo('/pwa')"
    />
    
    <div class="mobile-container">
      
      <!-- Header with Create Button -->
      <div class="section-card page-header-card">
        <div class="page-header">
          <h2 class="section-title">Meine Jobs</h2>
          <button @click="createNewJob" class="create-job-header-btn">
            <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
            </svg>
            Neuen Job erstellen
          </button>
        </div>
      </div>

      <!-- Status Tabs -->
      <div class="section-card status-tabs-card">
        <div class="status-tabs">
          <button 
            v-for="tab in statusTabs" 
            :key="tab.id"
            @click="activeTab = tab.id"
            class="status-tab"
            :class="{ 'status-tab-active': activeTab === tab.id }"
          >
            <span class="tab-label">{{ tab.label }}</span>
            <span v-if="getJobCountForStatus(tab.statuses) > 0" class="tab-count">{{ getJobCountForStatus(tab.statuses) }}</span>
          </button>
        </div>
      </div>

      <!-- Jobs List -->
      <div class="jobs-list">
        <div v-if="filteredJobs.length === 0" class="section-card empty-state">
          <div class="empty-icon-container">
            <svg class="empty-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
            </svg>
          </div>
          <h3 class="empty-title">{{ getEmptyStateTitle() }}</h3>
          <p class="empty-subtitle">{{ getEmptyStateSubtitle() }}</p>
          <button v-if="activeTab === 'open'" @click="createNewJob" class="empty-action-btn">
            <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
            </svg>
            Ersten Job erstellen
          </button>
        </div>

        <div v-for="job in filteredJobs" :key="job.id" class="section-card job-card" @click="openJobDetail(job)">
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
              
              <!-- Cooking Icon -->
              <svg v-else-if="job.category === 'cooking'" class="category-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 2v1m6-1v1"/>
              </svg>
              
              <!-- Cleaning Icon -->
              <svg v-else-if="job.category === 'cleaning'" class="category-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
              </svg>
              
              <!-- Companionship Icon -->
              <svg v-else-if="job.category === 'companionship'" class="category-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4"/>
              </svg>
              
              <!-- Childcare Icon -->
              <svg v-else-if="job.category === 'childcare'" class="category-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 16s1.5-2 4-2 4 2 4 2"/>
              </svg>
              
              <!-- Transportation Icon -->
              <svg v-else-if="job.category === 'transportation'" class="category-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM21 17a2 2 0 11-4 0 2 2 0 014 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17h10M7 17H3m4 0v-5a1 1 0 011-1h9a1 1 0 011 1v5m0 0h4m-4 0H7m14 0v2a1 1 0 01-1 1h-1a1 1 0 01-1-1v-2M7 17v2a1 1 0 01-1 1H5a1 1 0 01-1-1v-2"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 6l6 6-6 6"/>
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
          
          <h3 class="job-title">{{ job.title }}</h3>
          
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

          <!-- Applications count for open jobs -->
          <div v-if="job.status === 'applications_received' && job.applicationsCount > 0" class="applications-info">
            <svg class="applications-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
            </svg>
            <span class="applications-text">{{ job.applicationsCount }} Bewerber</span>
          </div>

          <!-- Partner info for active/completed jobs (per user story requirements) -->
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

          <!-- Details button (per user story requirement) -->
          <div class="job-actions">
            <button @click.stop="openJobDetail(job)" class="details-btn">
              <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
              </svg>
              Details ansehen
            </button>
          </div>

          <!-- Completion info for completed jobs -->
          <div v-if="job.status === 'completed'" class="completion-info">
            <svg class="completion-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span class="completion-text">Abgeschlossen am {{ formatDate(job.completedAt) }}</span>
          </div>
        </div>
      </div>

    </div>

    <!-- Footer Component -->
    <MinimalFooter 
      active-tab="seeker-history"
      current-role="unified"
      @navigate="handleFooterNavigation"
    />

    <!-- Padding for bottom nav -->
    <div style="height: 5rem;"></div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import AppHeader from '~/components/AppHeader.vue'
import MinimalFooter from '~/components/pwa/unified/MinimalFooter.vue'

definePageMeta({
  layout: false
})

// Active tab state
const activeTab = ref('active') // Start with 'active' tab per user story

// Status tabs configuration (per user story order)
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

// Notification permission state
const hasNotificationPermission = ref(false)
const reminderIntervals = ref([])

// Request notification permission
const requestNotificationPermission = async () => {
  if ('Notification' in window) {
    const permission = await Notification.requestPermission()
    hasNotificationPermission.value = permission === 'granted'
    return hasNotificationPermission.value
  }
  return false
}

// Show push notification
const showPushNotification = (title, body, onClick) => {
  if ('Notification' in window && hasNotificationPermission.value) {
    const notification = new Notification(title, {
      body: body,
      icon: '/icons/app-icon.png',
      badge: '/icons/notification-badge.png',
      tag: `job-reminder-${Date.now()}`
    })
    
    notification.onclick = () => {
      if (onClick) onClick()
      notification.close()
    }
    
    // Auto-close after 5 seconds
    setTimeout(() => notification.close(), 5000)
  }
}

// Setup job reminders
const setupJobReminders = () => {
  // Clear existing intervals
  reminderIntervals.value.forEach(interval => clearInterval(interval))
  reminderIntervals.value = []
  
  // Check all jobs for reminders
  jobs.value.forEach(job => {
    if (job.status === 'accepted' && !job.isImmediate && job.scheduledDate && job.scheduledTime) {
      const scheduledDateTime = new Date(job.scheduledDate + 'T' + job.scheduledTime)
      const now = new Date()
      const timeUntilJob = scheduledDateTime.getTime() - now.getTime()
      
      // 24h reminder (24 * 60 * 60 * 1000 = 86400000ms)
      const time24hBefore = timeUntilJob - 86400000
      if (time24hBefore > 0) {
        setTimeout(() => {
          showPushNotification(
            `Erinnerung: Morgen um ${job.scheduledTime} '${job.title}' mit ${job.partnerName}`,
            'Job-Details anzeigen',
            () => openJobDetail(job)
          )
        }, time24hBefore)
      }
      
      // 1h reminder (60 * 60 * 1000 = 3600000ms)
      const time1hBefore = timeUntilJob - 3600000
      if (time1hBefore > 0) {
        setTimeout(() => {
          showPushNotification(
            `Erinnerung: In 1 Stunde '${job.title}' mit ${job.partnerName}`,
            'Job-Details mit Adresse und Chat',
            () => openJobDetail(job)
          )
        }, time1hBefore)
      }
    }
  })
}

// Mock jobs data (enhanced for user story with SVG icons)
const jobs = ref([
  {
    id: 1,
    title: 'Einkaufen bei REWE',
    category: 'shopping',
    status: 'accepted', // ACTIVE JOB
    price: 25,
    isImmediate: false,
    scheduledDate: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString().split('T')[0], // 4h from now
    scheduledTime: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString().split('T')[1].substring(0, 5),
    createdAt: new Date().toISOString(),
    partnerName: 'Anna',
    partnerRating: 4.8,
    partnerType: 'seeker', // 'seeker' or 'helper'
    acceptedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString()
  },
  {
    id: 2,
    title: 'Garten gießen',
    category: 'gardening',
    status: 'in_progress', // ACTIVE JOB
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
    status: 'completed', // COMPLETED JOB
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
    status: 'cancelled_by_seeker', // CANCELLED JOB
    price: 40,
    isImmediate: false,
    scheduledDate: '2024-11-05',
    scheduledTime: '10:00',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    cancelledAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    partnerName: 'Thomas',
    partnerRating: 4.6,
    partnerType: 'helper'
  },
  {
    id: 5,
    title: 'Begleitung zum Arzt',
    category: 'companionship',
    status: 'completed', // ANOTHER COMPLETED JOB
    price: 35,
    isImmediate: false,
    scheduledDate: '2024-11-06',
    scheduledTime: '09:00',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    partnerName: 'Elisabeth',
    partnerRating: 5.0,
    partnerType: 'helper',
    completedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString() // 12h ago
  }
])

// Computed properties
const filteredJobs = computed(() => {
  const currentTab = statusTabs.value.find(tab => tab.id === activeTab.value)
  return jobs.value.filter(job => currentTab.statuses.includes(job.status))
})

// Methods
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

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('de-DE', { 
    day: '2-digit', 
    month: '2-digit',
    year: 'numeric'
  })
}

const getEmptyStateTitle = () => {
  const titles = {
    'open': 'Keine offenen Jobs',
    'active': 'Keine laufenden Jobs',
    'completed': 'Keine abgeschlossenen Jobs',
    'cancelled': 'Keine abgebrochenen Jobs'
  }
  return titles[activeTab.value] || 'Keine Jobs'
}

const getEmptyStateSubtitle = () => {
  const subtitles = {
    'open': 'Erstellen Sie Ihren ersten Job, um Hilfe zu erhalten',
    'active': 'Hier erscheinen Jobs, die gerade bearbeitet werden',
    'completed': 'Hier sehen Sie alle erfolgreich abgeschlossenen Jobs',
    'cancelled': 'Hier erscheinen abgebrochene Jobs'
  }
  return subtitles[activeTab.value] || ''
}

const createNewJob = () => {
  navigateTo('/pwa/jobs/create/category')
}

const openJobDetail = (job) => {
  navigateTo(`/pwa/jobs/detail/${job.id}`)
}


// Initialize notification setup
onMounted(async () => {
  // Request notification permission
  await requestNotificationPermission()
  
  // Setup job reminders
  setupJobReminders()
  
  // Check for reminders every minute
  const checkInterval = setInterval(() => {
    setupJobReminders()
  }, 60000) // Check every minute
  
  reminderIntervals.value.push(checkInterval)
})

// Cleanup intervals on unmount
onUnmounted(() => {
  reminderIntervals.value.forEach(interval => clearInterval(interval))
  reminderIntervals.value = []
})

// Footer navigation
const handleFooterNavigation = (tab) => {
  switch(tab) {
    case 'dashboard':
      navigateTo('/pwa')
      break
    case 'helper-tasks':
      navigateTo('/pwa/helper/tasks')
      break
    case 'helper-earnings':
      navigateTo('/pwa/helper/earnings')
      break
    case 'seeker-create':
      navigateTo('/pwa/jobs/create/category')
      break
    case 'seeker-history':
      // Already on my jobs page
      break
    case 'seeker-favorites':
      navigateTo('/pwa/seeker/favorites')
      break
    case 'profile':
      navigateTo('/pwa/shared/profile')
      break
  }
}
</script>

<style scoped>
/* Modern Dashboard Design for My Jobs */
.dashboard-container {
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  position: relative;
  overflow: hidden;
}

/* Glass Morphism Background */
.dashboard-background {
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
  background: 
    radial-gradient(circle at 20% 80%, rgba(95, 111, 85, 0.05) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(190, 205, 163, 0.08) 0%, transparent 50%),
    radial-gradient(circle at 40% 40%, rgba(143, 139, 130, 0.04) 0%, transparent 50%);
  pointer-events: none;
}

.mobile-container {
  padding: 1rem;
  padding-bottom: 6rem;
  position: relative;
  z-index: 1;
}

/* Section Cards */
.section-card {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 24px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.section-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

/* Page Header */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.section-title {
  color: #1e293b;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
  background: linear-gradient(135deg, #1e293b, #475569);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.create-job-header-btn {
  background: linear-gradient(135deg, #5F6F55, #4a5c44);
  color: white;
  border: none;
  border-radius: 16px;
  padding: 0.875rem 1.25rem;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  white-space: nowrap;
  box-shadow: 0 4px 12px rgba(95, 111, 85, 0.3);
}

.create-job-header-btn:hover {
  background: linear-gradient(135deg, #4a5c44, #3d4d38);
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(95, 111, 85, 0.4);
}

/* Status Tabs */
.status-tabs-card {
  background: rgba(255, 255, 255, 0.9);
}

.status-tabs {
  display: flex;
  background: rgba(243, 244, 246, 0.8);
  border-radius: 16px;
  padding: 0.5rem;
  overflow-x: auto;
  gap: 0.25rem;
}

.status-tab {
  flex: 1;
  min-width: 0;
  background: transparent;
  border: none;
  border-radius: 12px;
  padding: 0.875rem 0.75rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.status-tab:hover {
  background: rgba(95, 111, 85, 0.15);
  transform: translateY(-1px);
}

.status-tab.status-tab-active {
  background: linear-gradient(135deg, #5F6F55, #4a5c44);
  color: white;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(95, 111, 85, 0.3);
}

.tab-label {
  font-size: 0.875rem;
  font-weight: 600;
  white-space: nowrap;
}

.tab-count {
  background: rgba(255, 255, 255, 0.2);
  color: inherit;
  border-radius: 12px;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  min-width: 1.5rem;
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
  background: rgba(255, 255, 255, 0.9);
  padding: 3rem 2rem;
  text-align: center;
}

.empty-icon-container {
  width: 5rem;
  height: 5rem;
  background: linear-gradient(135deg, rgba(95, 111, 85, 0.1), rgba(190, 205, 163, 0.2));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem auto;
}

.empty-icon {
  width: 2.5rem;
  height: 2.5rem;
  color: #5F6F55;
}

.empty-title {
  color: #1e293b;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 0.75rem 0;
  background: linear-gradient(135deg, #1e293b, #475569);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.empty-subtitle {
  color: #64748b;
  margin: 0 0 2rem 0;
  line-height: 1.6;
  font-size: 1rem;
}

.empty-action-btn {
  background: linear-gradient(135deg, #5F6F55, #4a5c44);
  color: white;
  border: none;
  border-radius: 16px;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin: 0 auto;
  box-shadow: 0 4px 12px rgba(95, 111, 85, 0.3);
}

.empty-action-btn:hover {
  background: linear-gradient(135deg, #4a5c44, #3d4d38);
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(95, 111, 85, 0.4);
}

/* Job Cards */
.job-card {
  background: rgba(255, 255, 255, 0.95);
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.4);
  margin-bottom: 1rem;
}

.job-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.2);
  background: rgba(255, 255, 255, 0.98);
}

.job-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.job-category {
  width: 3rem;
  height: 3rem;
  background: linear-gradient(135deg, #BECDA3, #a8bb8f);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(95, 111, 85, 0.2);
}

.category-icon {
  width: 1.5rem;
  height: 1.5rem;
  color: #5F6F55;
}

.job-status-badge {
  padding: 0.5rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.job-status-badge.open {
  background: rgba(34, 197, 94, 0.1);
  color: #22c55e;
}

.job-status-badge.applications_received {
  background: rgba(249, 115, 22, 0.1);
  color: #f97316;
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
  color: #474747;
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
  line-height: 1.3;
}

.job-meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.job-meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.meta-icon {
  width: 1rem;
  height: 1rem;
  color: #6b7280;
}

.meta-text {
  color: #6b7280;
  font-size: 0.875rem;
  font-weight: 500;
}

/* Applications Info */
.applications-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background: rgba(249, 115, 22, 0.1);
  border-radius: 12px;
  border: 1px solid rgba(249, 115, 22, 0.2);
}

.applications-icon {
  width: 1.25rem;
  height: 1.25rem;
  color: #f97316;
}

.applications-text {
  color: #f97316;
  font-size: 0.875rem;
  font-weight: 600;
}

/* Partner Info (Enhanced for User Story) */
.partner-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: rgba(95, 111, 85, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(95, 111, 85, 0.1);
  margin-bottom: 1rem;
}

.partner-avatar {
  width: 2.5rem;
  height: 2.5rem;
  background: #BECDA3;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.partner-avatar-icon {
  width: 1.25rem;
  height: 1.25rem;
  color: #5F6F55;
}

.partner-details {
  flex: 1;
}

.partner-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
}

.partner-name {
  color: #474747;
  font-size: 0.875rem;
  font-weight: 600;
}

.partner-type {
  color: #6b7280;
  font-size: 0.75rem;
  font-weight: 500;
  background: rgba(107, 114, 128, 0.1);
  padding: 0.125rem 0.5rem;
  border-radius: 8px;
}

.partner-rating {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

/* Job Actions (Details Button) */
.job-actions {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(229, 231, 235, 0.3);
}

.details-btn {
  background: #5F6F55;
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
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
}

.details-btn:hover {
  background: #4a5c44;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(95, 111, 85, 0.3);
}

/* Legacy Helper Info (for backward compatibility) */
.helper-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: rgba(59, 130, 246, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(59, 130, 246, 0.1);
}

.helper-avatar {
  width: 2rem;
  height: 2rem;
  background: #BECDA3;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.helper-avatar-img {
  width: 1rem;
  height: 1rem;
}

.helper-details {
  flex: 1;
}

.helper-name {
  color: #474747;
  font-size: 0.875rem;
  font-weight: 600;
  display: block;
  margin-bottom: 0.25rem;
}

.helper-rating {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.rating-stars {
  color: #fbbf24;
  font-size: 0.75rem;
}

.rating-value {
  color: #6b7280;
  font-size: 0.75rem;
  font-weight: 500;
}

/* Completion Info */
.completion-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background: rgba(34, 197, 94, 0.1);
  border-radius: 12px;
  border: 1px solid rgba(34, 197, 94, 0.2);
}

.completion-icon {
  width: 1.25rem;
  height: 1.25rem;
  color: #22c55e;
}

.completion-text {
  color: #22c55e;
  font-size: 0.875rem;
  font-weight: 600;
}

.btn-icon {
  width: 1rem;
  height: 1rem;
}

/* Tablet Optimizations */
@media (min-width: 768px) {
  .mobile-container {
    padding: 2rem;
    max-width: 768px;
    margin: 0 auto;
  }
  
  .page-header {
    margin-bottom: 2rem;
  }
  
  .page-title {
    font-size: 1.25rem;
  }
  
  .create-job-header-btn {
    padding: 0.875rem 1.25rem;
    font-size: 0.875rem;
  }
  
  .status-tabs {
    gap: 0.5rem;
  }
  
  .status-tab {
    padding: 1rem;
  }
  
  .tab-label {
    font-size: 1rem;
  }
  
  .jobs-list {
    gap: 1.25rem;
  }
  
  .job-card {
    padding: 2rem;
  }
  
  .job-title {
    font-size: 1rem;
  }
}

/* Desktop Optimizations */
@media (min-width: 1024px) {
  .mobile-container {
    max-width: 1024px;
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .job-card:hover,
  .create-job-header-btn:hover,
  .empty-action-btn:hover {
    transform: none;
  }
}
</style>