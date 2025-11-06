<template>
  <div style="min-height: 100vh; background: #f5f5f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;">
    <!-- Enhanced Header with Role Switcher -->
    <EnhancedAppHeader 
      :title="getPageTitle()"
      :current-role="currentRole"
      :available-roles="userRoles"
      :request-count="requestCount"
      @role-change="handleRoleChange"
      @open-requests="handleRequestsClick"
      @open-profile="handleProfileClick"
      @open-news="handleNewsClick"
    />

    <!-- Role-based Dashboard Content -->
    <div v-if="currentRole === 'seeker'" key="seeker">
      <SeekerDashboard 
        :active-tasks="activeTasks"
        :favorite-helpers="favoriteHelpers"
        :completed-tasks="completedTasks"
        @create-task="handleCreateTask"
        @view-task="handleViewTask"
        @open-favorites="handleOpenFavorites"
        @open-history="handleOpenHistory"
        @become-helper="handleBecomeHelper"
      />
    </div>

    <div v-else-if="currentRole === 'helper'" key="helper">
      <HelperDashboard 
        :show-requests-sheet="showRequestsSheet"
        :is-mobile="isMobile"
        :sidebar-width="sidebarWidth"
        :is-available="isAvailable"
        :location-status="locationStatus"
        :selected-filter="selectedFilter"
        :filtered-requests="filteredRequests"
        :map-requests="mapRequests"
        :visible-requests="visibleRequests"
        @toggle-availability="toggleAvailability"
        @toggle-sheet="toggleRequestsSheet"
        @start-resize="startResize"
        @filter-change="selectedFilter = $event"
        @radius-change="handleRadiusChange"
        @city-change="handleCityChange"
        @focus-request="focusOnRequest"
        @contact-helper="contactHelper"
        @decline-request="declineDirectRequest"
        @location-status-updated="locationStatus = $event"
        @user-location-updated="userLocation = $event"
      />
    </div>

    <div v-else-if="currentRole === 'organization'" key="organization">
      <OrganizationDashboard 
        :organization-data="organizationData"
        :team-members="teamMembers"
        :organization-services="organizationServices"
        :analytics-data="analyticsData"
        @manage-team="handleManageTeam"
        @manage-services="handleManageServices"
        @view-analytics="handleViewAnalytics"
        @bulk-operations="handleBulkOperations"
      />
    </div>

    <!-- Universal Footer -->
    <UniversalFooter 
      :active-tab="getActiveTab()"
      :current-role="currentRole"
      :available-roles="userRoles"
      @navigate="handleFooterNavigation"
    />

    <!-- Padding for bottom nav -->
    <div style="height: 5rem;"></div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import EnhancedAppHeader from '~/components/pwa/shared/EnhancedAppHeader.vue'
import SeekerDashboard from '~/components/pwa/seeker/SeekerDashboard.vue'
import HelperDashboard from '~/components/pwa/helper/HelperDashboard.vue'
import OrganizationDashboard from '~/components/pwa/organization/OrganizationDashboard.vue'
import UniversalFooter from '~/components/pwa/shared/UniversalFooter.vue'

// Import utilities
import { calculateVisibleRadius, calculateDistance, checkMobileSize } from '~/components/pwa/helper/dashboard/DashboardUtils.js'
import { mapRequests as initialMapRequests } from '~/components/pwa/helper/dashboard/DashboardData.js'

definePageMeta({
  layout: false
})

// User roles and current role management
const userRoles = ref(['seeker']) // Will be fetched from auth
const currentRole = ref('seeker') // Default to seeker

// Get current role from URL query or default
const route = useRoute()
if (route.query.role && userRoles.value.includes(route.query.role)) {
  currentRole.value = route.query.role
}

// Universal states
const requestCount = computed(() => {
  if (currentRole.value === 'seeker') return activeTasks.value.length
  if (currentRole.value === 'helper') return mapRequests.value.length
  if (currentRole.value === 'organization') return organizationData.value.pendingRequests
  return 0
})

// Seeker-specific data
const activeTasks = ref([
  {
    id: 1,
    title: 'Einkaufen',
    type: 'shopping',
    helper: 'Maria H.',
    distance: '0.3km entfernt',
    status: 'In Bearbeitung'
  }
])

const favoriteHelpers = ref([
  { id: 1, name: 'Maria H.' },
  { id: 2, name: 'Klaus B.' }
])

const completedTasks = ref(47)

// Helper-specific data (from helper dashboard)
const isAvailable = ref(true)
const locationStatus = ref('loading')
const showRequestsSheet = ref(false)
const selectedFilter = ref('all')
const isMobile = ref(false)
const sidebarWidth = ref(400)
const isDragging = ref(false)
const userLocation = ref(null)
const currentZoom = ref(12)
const visibleRadius = ref(15)
const searchCity = ref('Winnweiler')
const searchRadius = ref(10)
const mapBounds = ref(null)
const mapRequests = ref([...initialMapRequests])

// Organization-specific data
const organizationData = ref({
  name: 'Nachbarschaftshilfe Winnweiler e.V.',
  type: 'Non-Profit',
  memberCount: 156,
  activeServices: 12,
  pendingRequests: 8,
  monthlyImpact: {
    helpedPeople: 89,
    completedTasks: 156,
    volunteerHours: 423
  }
})

const teamMembers = ref([
  { id: 1, name: 'Anna Mueller', role: 'Coordinator', status: 'active' },
  { id: 2, name: 'Peter Schmidt', role: 'Volunteer', status: 'active' },
  { id: 3, name: 'Lisa Weber', role: 'Volunteer', status: 'inactive' }
])

const organizationServices = ref([
  { id: 1, title: 'Einkaufshilfe', activeProviders: 5, requestsToday: 3 },
  { id: 2, title: 'Fahrdienst', activeProviders: 3, requestsToday: 1 },
  { id: 3, title: 'Gartenarbeit', activeProviders: 8, requestsToday: 2 }
])

const analyticsData = ref({
  weeklyStats: [12, 19, 8, 15, 22, 18, 25],
  topServices: ['Einkaufshilfe', 'Fahrdienst', 'Reinigung'],
  userSatisfaction: 4.8
})

// Computed properties
const visibleRequests = computed(() => {
  return mapRequests.value
})

const filteredRequests = computed(() => {
  const requests = visibleRequests.value
  if (selectedFilter.value === 'all') {
    return requests
  }
  return requests.filter(request => request.type === selectedFilter.value)
})

// Lifecycle
onMounted(() => {
  // Initialize role-specific data
  initializeUserRoles()
  
  // Mobile detection for provider dashboard
  if (currentRole.value === 'provider') {
    isMobile.value = checkMobileSize()
    window.addEventListener('resize', () => {
      isMobile.value = checkMobileSize()
    })
    
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', stopResize)
  }
})

onUnmounted(() => {
  if (currentRole.value === 'provider') {
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', stopResize)
  }
})

// Role management
const initializeUserRoles = () => {
  // In real app, fetch from authentication/user profile
  // For demo: simulate user with consumer role, can become provider
  userRoles.value = ['consumer']
  
  // Simulate user who already has provider role
  // userRoles.value = ['consumer', 'provider']
  
  // Simulate organization user
  // userRoles.value = ['organization', 'consumer', 'provider']
}

const handleRoleChange = (newRole) => {
  if (userRoles.value.includes(newRole)) {
    currentRole.value = newRole
    // Update URL without page reload
    navigateTo(`/pwa/dashboard?role=${newRole}`, { replace: true })
  }
}

const handleBecomeHelper = () => {
  // Logic to upgrade user to helper role
  if (!userRoles.value.includes('helper')) {
    userRoles.value.push('helper')
  }
  currentRole.value = 'helper'
  navigateTo('/pwa/dashboard?role=helper')
}

// Page title based on current role
const getPageTitle = () => {
  switch (currentRole.value) {
    case 'seeker': return 'Nachbarschaftshilfe'
    case 'helper': return 'Helfer Dashboard'
    case 'organization': return 'Organisation Dashboard'
    default: return 'Dashboard'
  }
}

const getActiveTab = () => {
  return 'dashboard'
}

// Event handlers
const handleRequestsClick = () => {
  if (currentRole.value === 'helper') {
    toggleRequestsSheet()
  } else {
    navigateTo('/pwa/seeker/task-create')
  }
}

const handleProfileClick = () => {
  navigateTo('/pwa/shared/profile')
}

const handleNewsClick = () => {
  navigateTo('/pwa/shared/news')
}

const handleFooterNavigation = (tab) => {
  const rolePrefix = currentRole.value === 'organization' ? 'org' : currentRole.value
  
  switch(tab) {
    case 'dashboard':
      // Already on dashboard
      break
    case 'tasks':
      if (currentRole.value === 'seeker') {
        navigateTo('/pwa/seeker/history')
      } else if (currentRole.value === 'helper') {
        navigateTo('/pwa/helper/tasks')
      } else if (currentRole.value === 'organization') {
        navigateTo('/pwa/org/tasks')
      }
      break
    case 'favorites':
      navigateTo('/pwa/seeker/favorites')
      break
    case 'create':
      navigateTo('/pwa/seeker/task-create')
      break
    case 'earnings':
      navigateTo('/pwa/helper/earnings')
      break
    case 'loyalty':
      navigateTo('/pwa/helper/loyalty')
      break
    case 'analytics':
      navigateTo('/pwa/org/stats')
      break
    case 'team':
      navigateTo('/pwa/org/helper-manage')
      break
    case 'profile':
      navigateTo('/pwa/shared/profile')
      break
  }
}

// Seeker event handlers
const handleCreateTask = () => {
  navigateTo('/pwa/seeker/task-create')
}

const handleViewTask = (taskId) => {
  navigateTo(`/pwa/seeker/task-active?id=${taskId}`)
}

const handleOpenFavorites = () => {
  navigateTo('/pwa/seeker/favorites')
}

const handleOpenHistory = () => {
  navigateTo('/pwa/seeker/history')
}

// Helper event handlers (from helper dashboard)
const toggleRequestsSheet = () => {
  showRequestsSheet.value = !showRequestsSheet.value
}

const toggleAvailability = () => {
  isAvailable.value = !isAvailable.value
}

const contactHelper = (request) => {
  navigateTo({
    path: '/pwa/helper/task-incoming',
    query: {
      id: request.id,
      title: request.title,
      type: request.type,
      client: request.client,
      area: request.area,
      payment: request.payment,
      distance: request.distance,
      description: request.description,
      address: request.address
    }
  })
}

const declineDirectRequest = (request) => {
  mapRequests.value = mapRequests.value.filter(r => r.id !== request.id)
}

const focusOnRequest = (request) => {
  console.log('Focusing on request:', request)
}

const startResize = (e) => {
  if (isMobile.value) return
  isDragging.value = true
  e.preventDefault()
}

const handleMouseMove = (e) => {
  if (!isDragging.value || isMobile.value) return
  
  const windowWidth = window.innerWidth
  const newWidth = windowWidth - e.clientX
  
  if (newWidth >= 300 && newWidth <= windowWidth * 0.8) {
    sidebarWidth.value = newWidth
  }
}

const stopResize = () => {
  isDragging.value = false
}

const handleRadiusChange = (newRadius) => {
  searchRadius.value = newRadius
}

const handleCityChange = (city) => {
  searchCity.value = city
}

// Organization event handlers
const handleManageTeam = () => {
  navigateTo('/pwa/org/team')
}

const handleManageServices = () => {
  navigateTo('/pwa/org/services')
}

const handleViewAnalytics = () => {
  navigateTo('/pwa/org/analytics')
}

const handleBulkOperations = () => {
  navigateTo('/pwa/org/bulk-operations')
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