<template>
  <div style="min-height: 100vh; background: #f5f5f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;">
    <!-- Header Component -->
    <AppHeader 
      title="Organisation Dashboard" 
      current-role="organization"
      :request-count="orgRequests.length"
      @open-requests="handleRequestsClick"
      @open-profile="handleProfileClick"
      @open-news="handleNewsClick"
      @toggle-role="handleRoleToggle"
    />

    <!-- Organization Management Container Component -->
    <div :style="'position: relative; height: calc(100vh - 80px);'">
      <OrganizationContainer 
        ref="orgContainer"
        :show-requests-sheet="showRequestsSheet"
        :is-mobile="isMobile"
        :sidebar-width="sidebarWidth"
        :is-managing="isManaging"
        @member-status-updated="memberStatus = $event"
        @organization-updated="organizationData = $event"
      />
      
      <!-- Organization Status Buttons Component -->
      <OrganizationStatusButtons 
        :is-managing="isManaging"
        :organization-status="organizationStatus"
        @toggle-management="toggleManagement"
      />
    
      <!-- Requests Side Panel Component -->
      <OrganizationRequestsPanel 
        :show-requests-sheet="showRequestsSheet"
        :is-mobile="isMobile"
        :sidebar-width="sidebarWidth"
        :selected-filter="selectedFilter"
        :filtered-requests="filteredRequests"
        :org-requests="orgRequests"
        :visible-requests="visibleRequests"
        :total-requests="orgRequests.length"
        @toggle-sheet="toggleRequestsSheet"
        @start-resize="startResize"
        @filter-change="selectedFilter = $event"
        @radius-change="handleRadiusChange"
        @city-change="handleCityChange"
        @focus-request="focusOnRequest"
        @manage-member="manageMember"
        @decline-request="declineOrgRequest"
      />
    </div>

    <!-- Organization Role Switch Buttons -->
    <div style="position: fixed; bottom: 7rem; right: 1rem; z-index: 30; display: flex; flex-direction: column; gap: 0.5rem;">
      <button 
        @click="handleRoleChange('organization')"
        :style="'background: ' + (currentRole === 'organization' ? '#5F6F55' : '#8F8B82') + '; color: white; border: none; width: 3rem; height: 3rem; border-radius: 50%; cursor: pointer; box-shadow: 0 4px 12px rgba(0,0,0,0.2); transition: all 0.2s; display: flex; align-items: center; justify-content: center;'"
        onmouseover="this.style.transform='scale(1.1)'"
        onmouseout="this.style.transform='scale(1)'"
      >
        <svg style="width: 1.5rem; height: 1.5rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
        </svg>
      </button>
      
      <button 
        @click="handleRoleChange('seeker')"
        :style="'background: ' + (currentRole === 'seeker' ? '#8FA66E' : '#8F8B82') + '; color: white; border: none; width: 3rem; height: 3rem; border-radius: 50%; cursor: pointer; box-shadow: 0 4px 12px rgba(0,0,0,0.2); transition: all 0.2s; display: flex; align-items: center; justify-content: center;'"
        onmouseover="this.style.transform='scale(1.1)'"
        onmouseout="this.style.transform='scale(1)'"
      >
        <svg style="width: 1.5rem; height: 1.5rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
      </button>
      
      <button 
        @click="handleRoleChange('helper')"
        :style="'background: ' + (currentRole === 'helper' ? '#BECDA3' : '#8F8B82') + '; color: white; border: none; width: 3rem; height: 3rem; border-radius: 50%; cursor: pointer; box-shadow: 0 4px 12px rgba(0,0,0,0.2); transition: all 0.2s; display: flex; align-items: center; justify-content: center;'"
        onmouseover="this.style.transform='scale(1.1)'"
        onmouseout="this.style.transform='scale(1)'"
      >
        <svg style="width: 1.5rem; height: 1.5rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
        </svg>
      </button>
    </div>

    <!-- Footer Component -->
    <AppFooter 
      active-tab="dashboard"
      current-role="organization"
      @navigate="handleFooterNavigation"
    />

    <!-- Padding for bottom nav -->
    <div style="height: 5rem;"></div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted, nextTick } from 'vue'
import AppHeader from '~/components/AppHeader.vue'
import AppFooter from '~/components/AppFooter.vue'
import OrganizationContainer from '~/components/pwa/organization/dashboardPage/OrganizationContainer.vue'
import OrganizationStatusButtons from '~/components/pwa/organization/dashboardPage/OrganizationStatusButtons.vue'
import OrganizationRequestsPanel from '~/components/pwa/organization/OrganizationRequestsPanel.vue'
import NewsModal from '~/components/pwa/helper/NewsModal.vue'

// Import data and utilities
import { checkMobileSize } from '~/components/pwa/helper/dashboard/DashboardUtils.js'

definePageMeta({
  layout: false
})

const activeTab = ref('dashboard')
const isManaging = ref(true)
const unreadMessages = ref(5)
const orgContainer = ref(null)
const memberStatus = ref('active')
const organizationStatus = ref('active')
const showRequestsSheet = ref(false)
const selectedFilter = ref('all')
const isMobile = ref(false)
const sidebarWidth = ref(400)
const isDragging = ref(false)
const showNewsModal = ref(false)

// Organization and filter states
const currentZoom = ref(12)
const searchCity = ref('Winnweiler')
const searchRadius = ref(10) // in km

// User roles for this organization
const userRoles = ref(['organization', 'seeker', 'helper'])
const currentRole = ref('organization')

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

// Organization requests from imported data
const orgRequests = ref([
  {
    id: 1,
    title: 'Einkaufshilfe für Familie Weber',
    type: 'shopping',
    client: 'Familie Weber',
    area: 'Winnweiler Zentrum',
    payment: '15€',
    distance: '0.5km',
    description: 'Wöchentlicher Einkauf für älteres Ehepaar',
    address: 'Hauptstraße 15, Winnweiler',
    priority: 'medium',
    assignedTo: 'Anna Mueller',
    status: 'In Bearbeitung'
  },
  {
    id: 2,
    title: 'Gartenarbeit bei Familie Schmidt',
    type: 'gardening',
    client: 'Familie Schmidt',
    area: 'Winnweiler Süd',
    payment: '25€',
    distance: '1.2km',
    description: 'Rasen mähen und Hecke schneiden',
    address: 'Gartenstraße 8, Winnweiler',
    priority: 'low',
    assignedTo: null,
    status: 'Offen'
  }
])

// Check if mobile on mount and resize
onMounted(() => {
  isMobile.value = checkMobileSize()
  window.addEventListener('resize', () => {
    isMobile.value = checkMobileSize()
  })
  
  // Add global mouse event listeners for resize
  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', stopResize)
  
  // Initialize organization dashboard after component is ready
  nextTick(() => {
    if (orgContainer.value) {
      // Initialize organization dashboard
      orgContainer.value.initializeOrganizationView()
    }
  })
})

onUnmounted(() => {
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseup', stopResize)
})

const toggleRequestsSheet = () => {
  showRequestsSheet.value = !showRequestsSheet.value
  console.log('Organization requests sheet toggled:', showRequestsSheet.value)
}

const toggleManagement = () => {
  isManaging.value = !isManaging.value
  console.log('Management mode toggled:', isManaging.value)
  
  // Update organization status
  if (orgContainer.value) {
    orgContainer.value.updateManagementStatus(isManaging.value)
  }
}

const openProfile = () => {
  navigateTo('/pwa/org/profile')
}

const manageMember = (request) => {
  console.log('Managing member for request:', request)
  navigateTo({
    path: '/pwa/org/member-assign',
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

const declineOrgRequest = (request) => {
  console.log('Organization request declined:', request)
  // Remove from available requests
  orgRequests.value = orgRequests.value.filter(r => r.id !== request.id)
  // Update organization view
  if (orgContainer.value) {
    orgContainer.value.updateRequestsList(orgRequests.value)
  }
}

const focusOnRequest = (request) => {
  console.log('Focusing on organization request:', request)
  if (orgContainer.value) {
    orgContainer.value.focusOnRequest(request)
  }
}

// Role switching
const handleRoleChange = (newRole) => {
  if (userRoles.value.includes(newRole)) {
    currentRole.value = newRole
    navigateTo(`/pwa/dashboard?role=${newRole}`)
  }
}

// Header event handlers
const handleRequestsClick = () => {
  navigateTo('/pwa/org/requests')
}

const handleProfileClick = () => {
  navigateTo('/pwa/shared/profile')
}

const handleNewsClick = () => {
  navigateTo('/pwa/shared/news')
}

const handleRoleToggle = () => {
  navigateTo('/pwa/seeker/dashboard')
}

const startResize = (e) => {
  if (isMobile.value) return
  isDragging.value = true
  e.preventDefault()
  console.log('Started resizing organization sidebar')
}

const handleMouseMove = (e) => {
  if (!isDragging.value || isMobile.value) return
  
  const windowWidth = window.innerWidth
  const newWidth = windowWidth - e.clientX
  
  // Mindestbreite 300px, Maximum 80% des Bildschirms
  if (newWidth >= 300 && newWidth <= windowWidth * 0.8) {
    sidebarWidth.value = newWidth
    console.log('Resizing organization sidebar to:', newWidth, 'px')
  }
}

const stopResize = () => {
  if (isDragging.value) {
    console.log('Stopped resizing organization sidebar at:', sidebarWidth.value, 'px')
  }
  isDragging.value = false
}

// All requests are always visible (like Munich example)
const visibleRequests = computed(() => {
  return orgRequests.value
})

// Computed property for filtered requests (based on all visible requests)
const filteredRequests = computed(() => {
  const requests = visibleRequests.value
  if (selectedFilter.value === 'all') {
    return requests
  }
  return requests.filter(request => request.type === selectedFilter.value)
})

// Handle radius change from sidebar
const handleRadiusChange = (newRadius) => {
  searchRadius.value = newRadius
  console.log('Organization search radius changed to:', newRadius, 'km')
}

// Handle city search
const handleCityChange = (city) => {
  searchCity.value = city
  console.log('Organization search city changed to:', city)
  // In a real app, this would geocode the city and center the view
}

const openNewsDetail = (news) => {
  console.log('Opening news detail:', news)
  // In a real app, this could open a detailed view or navigate to full article
  // For now, just log the selection
}

// Footer navigation for organization
const handleFooterNavigation = (tab) => {
  switch(tab) {
    case 'dashboard':
      // Already on dashboard
      break
    case 'analytics':
      navigateTo('/pwa/org/stats')
      break
    case 'services':
      navigateTo('/pwa/org/services')
      break
    case 'team':
      navigateTo('/pwa/org/team')
      break
    case 'profile':
      navigateTo('/pwa/shared/profile')
      break
    default:
      console.log('Unknown navigation tab:', tab)
      break
  }
}

const setActiveTab = (tab) => {
  activeTab.value = tab
  handleFooterNavigation(tab)
}
</script>