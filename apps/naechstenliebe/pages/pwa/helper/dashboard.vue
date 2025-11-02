<template>
  <div style="min-height: 100vh; background: #f5f5f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;">
    <!-- Header Component -->
    <AppHeader 
      title="Helfer Dashboard" 
      current-role="helper"
      :request-count="mapRequests.length"
      @open-requests="handleRequestsClick"
      @open-profile="handleProfileClick"
      @open-news="handleNewsClick"
      @toggle-role="handleRoleToggle"
    />

    <!-- Map Container Component -->
    <div :style="'position: relative; height: calc(100vh - 80px);'">
      <MapContainer 
        ref="mapContainer"
        :show-requests-sheet="showRequestsSheet"
        :is-mobile="isMobile"
        :sidebar-width="sidebarWidth"
        @location-status-updated="locationStatus = $event"
        @user-location-updated="userLocation = $event"
      />
      
      <!-- Status Buttons Component -->
      <StatusButtons 
        :is-available="isAvailable"
        :location-status="locationStatus"
        @toggle-availability="toggleAvailability"
      />
    
      <!-- Requests Side Panel Component -->
      <RequestsSidePanel 
        :show-requests-sheet="showRequestsSheet"
        :is-mobile="isMobile"
        :sidebar-width="sidebarWidth"
        :selected-filter="selectedFilter"
        :filtered-requests="filteredRequests"
        :map-requests="mapRequests"
        :visible-requests="visibleRequests"
        :total-requests="mapRequests.length"
        @toggle-sheet="toggleRequestsSheet"
        @start-resize="startResize"
        @filter-change="selectedFilter = $event"
        @radius-change="handleRadiusChange"
        @city-change="handleCityChange"
        @focus-request="focusOnRequest"
        @contact-helper="contactHelper"
        @decline-request="declineDirectRequest"
      />
    </div>

    <!-- Footer Component -->
    <AppFooter 
      active-tab="dashboard"
      current-role="helper"
      @navigate="handleFooterNavigation"
    />

    <!-- Padding for bottom nav -->
    <div style="height: 5rem;"></div>

    <!-- News Modal -->
    <NewsModal 
      :show="showNewsModal"
      @close="showNewsModal = false"
      @open-news-detail="openNewsDetail"
    />
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted, nextTick } from 'vue'
import AppHeader from '~/components/AppHeader.vue'
import AppFooter from '~/components/AppFooter.vue'
import MapContainer from '~/components/pwa/helper/dashboardPage/MapContainer.vue'
import StatusButtons from '~/components/pwa/helper/dashboardPage/StatusButtons.vue'
import RequestsSidePanel from '~/components/pwa/helper/RequestsSidePanel.vue'
import NewsModal from '~/components/pwa/helper/NewsModal.vue'

// Import data and utilities
import { mapRequests as initialMapRequests, winnweilerCenter } from '~/components/pwa/helper/dashboard/DashboardData.js'
import { calculateVisibleRadius, calculateDistance, checkMobileSize } from '~/components/pwa/helper/dashboard/DashboardUtils.js'

definePageMeta({
  layout: false
})

const activeTab = ref('dashboard')
const isAvailable = ref(true)
const unreadMessages = ref(3)
const mapContainer = ref(null)
const userLocation = ref(null)
const locationStatus = ref('loading')
const showRequestsSheet = ref(false)
const selectedFilter = ref('all')
const isMobile = ref(false)
const sidebarWidth = ref(400)
const isDragging = ref(false)
const showNewsModal = ref(false)

// Map and filter states
const currentZoom = ref(12)
const visibleRadius = ref(15) // in km
const searchCity = ref('Winnweiler')
const searchRadius = ref(10) // in km
const mapBounds = ref(null)

// Map requests from imported data
const mapRequests = ref([...initialMapRequests])

// Check if mobile on mount and resize
onMounted(() => {
  isMobile.value = checkMobileSize()
  window.addEventListener('resize', () => {
    isMobile.value = checkMobileSize()
  })
  
  // Add global mouse event listeners for resize
  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', stopResize)
  
  // Initialize map markers after map is ready
  nextTick(() => {
    if (mapContainer.value) {
      // Call the dummy marker method that we created in MapContainer
      mapContainer.value.addDummyRequestMarkers()
    }
  })
})

onUnmounted(() => {
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseup', stopResize)
})

const toggleRequestsSheet = () => {
  showRequestsSheet.value = !showRequestsSheet.value
  console.log('Requests sheet toggled:', showRequestsSheet.value)
}

const toggleAvailability = () => {
  isAvailable.value = !isAvailable.value
  console.log('Availability toggled:', isAvailable.value)
  
  // Update user marker popup with new availability status
  if (mapContainer.value) {
    mapContainer.value.updateUserMarkerPopup(isAvailable.value)
  }
}

const openProfile = () => {
  navigateTo('/pwa/helper/profile')
}

const contactHelper = (request) => {
  console.log('Contacting helper for request:', request)
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

const acceptDirectRequest = (request) => {
  console.log('Direct request accepted:', request)
  // Remove from available requests
  mapRequests.value = mapRequests.value.filter(r => r.id !== request.id)
  // Update map markers
  if (mapContainer.value) {
    mapContainer.value.addRequestMarkers(mapRequests.value, isAvailable.value)
  }
  // Close sheet and navigate
  showRequestsSheet.value = false
  navigateTo('/pwa/helper/task-active')
}

const declineDirectRequest = (request) => {
  console.log('Direct request declined:', request)
  // Remove from available requests
  mapRequests.value = mapRequests.value.filter(r => r.id !== request.id)
  // Update map markers
  if (mapContainer.value) {
    mapContainer.value.addRequestMarkers(mapRequests.value, isAvailable.value)
  }
}

const focusOnRequest = (request) => {
  console.log('Focusing on request:', request)
  if (mapContainer.value) {
    mapContainer.value.focusOnRequest(request)
  }
}

// Header event handlers
const handleRequestsClick = () => {
  toggleRequestsSheet()
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

// Footer navigation handler
const handleFooterNavigation = (tab) => {
  switch(tab) {
    case 'dashboard':
      // Already on dashboard
      break
    case 'tasks':
      navigateTo('/pwa/helper/tasks')
      break
    case 'loyalty':
      navigateTo('/pwa/helper/loyalty')
      break
    case 'earnings':
      navigateTo('/pwa/helper/earnings')
      break
    case 'profile':
      navigateTo('/pwa/shared/profile')
      break
  }
}

const setActiveTab = (tab) => {
  activeTab.value = tab
  handleFooterNavigation(tab)
}

const startResize = (e) => {
  if (isMobile.value) return
  isDragging.value = true
  e.preventDefault()
  console.log('Started resizing sidebar')
}

const handleMouseMove = (e) => {
  if (!isDragging.value || isMobile.value) return
  
  const windowWidth = window.innerWidth
  const newWidth = windowWidth - e.clientX
  
  // Mindestbreite 300px, Maximum 80% des Bildschirms
  if (newWidth >= 300 && newWidth <= windowWidth * 0.8) {
    sidebarWidth.value = newWidth
    console.log('Resizing sidebar to:', newWidth, 'px')
  }
}

const stopResize = () => {
  if (isDragging.value) {
    console.log('Stopped resizing sidebar at:', sidebarWidth.value, 'px')
  }
  isDragging.value = false
}

// Update visible radius when zoom changes
const updateVisibleRadius = (zoom) => {
  currentZoom.value = zoom
  visibleRadius.value = calculateVisibleRadius(zoom)
}

// All requests are always visible on map (like Munich example)
const visibleRequests = computed(() => {
  return mapRequests.value
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
  console.log('Search radius changed to:', newRadius, 'km')
}

// Handle city search
const handleCityChange = (city) => {
  searchCity.value = city
  console.log('Search city changed to:', city)
  // In a real app, this would geocode the city and center the map
}

const openNewsDetail = (news) => {
  console.log('Opening news detail:', news)
  // In a real app, this could open a detailed view or navigate to full article
  // For now, just log the selection
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