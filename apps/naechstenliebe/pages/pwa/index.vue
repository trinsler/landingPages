<template>
  <div style="min-height: 100vh; background: #f5f5f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;">
    <!-- Unified Header Component - Helper & Seeker combined -->
    <AppHeader 
      title="Nachbarschaftshilfe" 
      current-role="unified"
      :request-count="totalRequestCount"
      :is-available="isAvailable"
      :location-status="locationStatus"
      @open-requests="handleRequestsClick"
      @open-profile="handleProfileClick"
      @open-news="handleNewsClick"
      @toggle-role="handleRoleToggle"
      @toggle-availability="toggleAvailability"
    />

    <!-- Main Layout Container -->
    <div class="main-layout">
      <!-- Left Sidebar - Map Context Actions Only -->
      <div class="minimal-sidebar">
        <!-- Map Context Shortcuts -->
        <div class="nav-shortcuts">
          <!-- Helper: View Requests on Map -->
          <button 
            class="shortcut-btn helper-btn" 
            :class="{ active: activeSidebarView === 'helper-requests' && showRequestsSheet }"
            @click="setActiveView('helper-requests')"
            title="Aufträge auf Karte anzeigen"
            :aria-label="`${totalRequestCount} neue Aufträge auf der Karte verfügbar. Klicken zum ${showRequestsSheet ? 'Schließen' : 'Öffnen'} der Karten-Übersicht.`"
          >
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m-6 3l6-3"/>
            </svg>
            <span v-if="totalRequestCount > 0" class="shortcut-count">{{ totalRequestCount }}</span>
          </button>
          
          <div class="sidebar-divider"></div>
          
          <!-- Quick Create Task (from map location) -->
          <button 
            class="shortcut-btn map-action-btn"
            @click="createTaskAtLocation"
            title="Hilfe an diesem Ort anfragen"
            aria-label="Hilfsanfrage für den aktuellen Kartenbereich erstellen"
          >
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
          </button>
          
          <!-- Map Center/Reset -->
          <button 
            class="shortcut-btn map-action-btn"
            @click="centerMapToUser"
            title="Karte auf meinen Standort zentrieren"
            aria-label="Karte auf meinen aktuellen Standort zurücksetzen"
          >
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100-4m0 4v2m0-6V4"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Compact Helper Requests Panel -->
      <div v-if="activeSidebarView === 'helper-requests' && showRequestsSheet" class="requests-panel">
        <div class="panel-content">
          <!-- Quick Stats -->
          <div class="quick-stats">
            <div class="stat-item">
              <span class="stat-number">{{ filteredRequests.length }}</span>
              <span class="stat-label">Aufträge</span>
            </div>
          </div>
          
          <!-- Compact Request List -->
          <div class="compact-requests">
            <div 
              v-for="request in filteredRequests.slice(0, 3)" 
              :key="request.id"
              class="compact-request"
              @click="contactHelper(request)"
            >
              <div class="request-info">
                <h4 class="request-title">{{ request.title }}</h4>
                <p class="request-details">{{ request.client }} • {{ request.distance }}</p>
                <span class="request-payment">{{ request.payment }}</span>
              </div>
              <button class="quick-accept" @click.stop="acceptDirectRequest(request)">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
              </button>
            </div>
          </div>
          
          <!-- View All Button -->
          <button class="view-all-btn" @click="navigateTo('/pwa/helper/tasks')">
            Alle Aufträge ansehen
          </button>
        </div>
        
        <button class="close-panel" @click="showRequestsSheet = false">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
        </button>
      </div>

      <!-- Map Container -->
      <div class="map-container" :style="{ marginLeft: getMapMargin() }">
        <MapContainer 
          ref="mapContainer"
          :show-requests-sheet="false"
          :is-mobile="isMobile"
          :sidebar-width="0"
          @location-status-updated="locationStatus = $event"
          @user-location-updated="userLocation = $event"
        />
      </div>
    </div>

    <!-- Unified Footer Component - Helper & Seeker navigation -->
    <UnifiedFooter 
      active-tab="dashboard"
      current-role="unified"
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
import UnifiedFooter from '~/components/pwa/unified/UnifiedFooter.vue'
import MapContainer from '~/components/pwa/helper/dashboardPage/MapContainer.vue'
import NewsModal from '~/components/pwa/helper/NewsModal.vue'

// Import data and utilities
import { mapRequests as initialMapRequests, winnweilerCenter } from '~/components/pwa/helper/dashboard/DashboardData.js'
import { calculateVisibleRadius, calculateDistance, checkMobileSize } from '~/components/pwa/helper/dashboard/DashboardUtils.js'

definePageMeta({
  layout: false
})

// Helper functionality (existing)
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

// Seeker functionality (integrated)
const seekerTasks = ref([
  {
    id: 1,
    title: 'Einkaufen',
    type: 'shopping',
    helper: 'Maria H.',
    distance: '0.3km entfernt',
    status: 'In Bearbeitung'
  }
])

const seekerFavorites = ref([
  { id: 1, name: 'Maria H.' },
  { id: 2, name: 'Klaus B.' }
])

// Sidebar view management  
const activeSidebarView = ref('helper-requests')

// Map and filter states
const currentZoom = ref(12)
const visibleRadius = ref(15)
const searchCity = ref('Winnweiler') 
const searchRadius = ref(10)
const mapBounds = ref(null)

// Map requests from imported data
const mapRequests = ref([...initialMapRequests])

// Unified request count
const totalRequestCount = computed(() => {
  return mapRequests.value.length + seekerTasks.value.length
})

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
  if (isMobile.value) {
    // On mobile, toggle the requests panel or navigate to tasks page
    if (showRequestsSheet.value) {
      showRequestsSheet.value = false
    } else {
      activeSidebarView.value = 'helper-requests'
      showRequestsSheet.value = true
    }
  } else {
    // On desktop, toggle the compact panel
    setActiveView('helper-requests')
  }
}

const handleProfileClick = () => {
  navigateTo('/pwa/shared/profile')
}

const handleNewsClick = () => {
  navigateTo('/pwa/shared/news')
}

const handleRoleToggle = () => {
  // No more role switching - toggle sidebar view instead
  if (activeSidebarView.value === 'helper-requests') {
    activeSidebarView.value = 'seeker-tasks'
  } else {
    activeSidebarView.value = 'helper-requests'
  }
  showRequestsSheet.value = true
}

// Unified footer navigation handler
const handleFooterNavigation = (tab) => {
  switch(tab) {
    case 'dashboard':
      // Already on dashboard
      break
    case 'helper-tasks':
      navigateTo('/pwa/helper/tasks')
      break
    case 'helper-earnings':
      navigateTo('/pwa/helper/earnings')
      break
    case 'helper-loyalty':
      navigateTo('/pwa/helper/loyalty')
      break
    case 'seeker-history':
      navigateTo('/pwa/seeker/history')
      break
    case 'seeker-create':
      navigateTo('/pwa/seeker/task-create')
      break
    case 'seeker-favorites':
      navigateTo('/pwa/seeker/favorites')
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

// Seeker functionality handlers
const createSeekerTask = () => {
  navigateTo('/pwa/seeker/task-create')
}

const viewSeekerTask = (taskId) => {
  navigateTo(`/pwa/seeker/task-active?id=${taskId}`)
}

const openSeekerFavorites = () => {
  activeSidebarView.value = 'seeker-favorites'
  showRequestsSheet.value = true
}

const openSeekerHistory = () => {
  navigateTo('/pwa/seeker/history')
}

// New map context functions
const createTaskAtLocation = () => {
  // Get current map center or user location
  const currentLocation = userLocation.value || { lat: 49.5667, lng: 7.7833 } // Winnweiler fallback
  navigateTo({
    path: '/pwa/seeker/task-create',
    query: {
      lat: currentLocation.lat,
      lng: currentLocation.lng,
      preset: 'map-location'
    }
  })
}

const centerMapToUser = () => {
  if (mapContainer.value && userLocation.value) {
    mapContainer.value.centerOnUser()
  }
}

// New compact sidebar functions
const getSidebarTitle = () => {
  switch(activeSidebarView.value) {
    case 'helper-requests':
      return 'Neue Aufträge'
    case 'seeker-tasks':
      return 'Meine Anfragen'
    case 'seeker-favorites':
      return 'Favoriten'
    default:
      return 'Navigation'
  }
}

const setActiveView = (view) => {
  if (view === 'helper-requests') {
    activeSidebarView.value = view
    showRequestsSheet.value = !showRequestsSheet.value
  } else {
    activeSidebarView.value = view
    showRequestsSheet.value = true
  }
}

const getMapMargin = () => {
  if (isMobile.value) return '0'
  let margin = '60px' // Minimal sidebar
  if (activeSidebarView.value === 'helper-requests' && showRequestsSheet.value) {
    margin = '340px' // + compact requests panel
  }
  return margin
}

</script>

<style scoped>
/* Main Layout */
.main-layout {
  display: flex;
  height: calc(100vh - 80px);
  overflow: hidden;
}

/* Minimal Sidebar - Always visible */
.minimal-sidebar {
  width: 60px;
  background: transparent;
  display: flex;
  flex-direction: column;
  z-index: 10;
}

.nav-shortcuts {
  padding: 0.75rem 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background: transparent;
}

.shortcut-btn {
  width: 2.5rem;
  height: 2.5rem;
  border: none !important;
  background: transparent !important;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  color: #6b7280;
  box-shadow: none !important;
}

.shortcut-btn:hover {
  transform: translateY(-2px);
}

.shortcut-btn.helper-btn.active {
  background: rgba(95, 111, 85, 0.9) !important;
  color: white;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 16px rgba(95, 111, 85, 0.4) !important;
}

.shortcut-btn.helper-btn {
  color: #5F6F55;
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
}

.shortcut-btn.helper-btn:hover {
  background: rgba(95, 111, 85, 0.9) !important;
  color: white;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 16px rgba(95, 111, 85, 0.3) !important;
}

.shortcut-btn.map-action-btn {
  color: #6b7280;
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
}

.shortcut-btn.map-action-btn:hover {
  background: rgba(55, 65, 81, 0.9) !important;
  color: white;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 16px rgba(55, 65, 81, 0.3) !important;
}

.shortcut-btn svg {
  width: 1.125rem;
  height: 1.125rem;
}

.shortcut-count {
  position: absolute;
  top: -0.125rem;
  right: -0.125rem;
  background: #ef4444;
  color: white;
  font-size: 0.625rem;
  font-weight: 600;
  border-radius: 50%;
  min-width: 1rem;
  height: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0.25rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.2);
}

.shortcut-btn.helper-btn.active .shortcut-count {
  background: rgba(255, 255, 255, 0.9);
  color: #5F6F55;
}

.sidebar-divider {
  width: 80%;
  height: 1px;
  background: transparent;
  margin: 0.75rem auto;
  border-radius: 1px;
}


/* Compact Requests Panel */
.requests-panel {
  position: fixed;
  top: 80px;
  left: 60px;
  width: 280px;
  max-height: calc(100vh - 240px);
  background: white;
  border-radius: 0 12px 12px 0;
  box-shadow: 4px 0 24px rgba(0,0,0,0.12);
  z-index: 20;
  display: flex;
  animation: slideIn 0.3s ease;
  overflow: hidden;
}

@keyframes slideIn {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.panel-content {
  flex: 1;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.quick-stats {
  text-align: center;
  padding: 0.75rem;
  background: #f8fafc;
  border-radius: 8px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.stat-number {
  font-size: 1.5rem;
  font-weight: 700;
  color: #5F6F55;
}

.stat-label {
  font-size: 0.75rem;
  font-weight: 500;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.compact-requests {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.compact-request {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem;
  background: #f9fafb;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid transparent;
}

.compact-request:hover {
  background: rgba(95, 111, 85, 0.05);
  border-color: rgba(95, 111, 85, 0.2);
}

.request-info {
  flex: 1;
  min-width: 0;
}

.request-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  margin: 0 0 0.25rem 0;
}

.request-details {
  font-size: 0.75rem;
  color: #6b7280;
  margin: 0 0 0.25rem 0;
}

.request-payment {
  font-size: 0.75rem;
  font-weight: 600;
  color: #5F6F55;
  background: rgba(95, 111, 85, 0.1);
  padding: 0.125rem 0.375rem;
  border-radius: 4px;
}

.quick-accept {
  width: 2rem;
  height: 2rem;
  border: none;
  background: #5F6F55;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-left: 0.5rem;
}

.quick-accept:hover {
  background: #4a5c44;
  transform: scale(1.05);
}

.quick-accept svg {
  width: 0.875rem;
  height: 0.875rem;
}

.view-all-btn {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid rgba(95, 111, 85, 0.2);
  background: rgba(95, 111, 85, 0.05);
  color: #5F6F55;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;
  font-size: 0.875rem;
}

.view-all-btn:hover {
  background: #5F6F55;
  color: white;
}

.close-panel {
  width: 2.5rem;
  height: 100%;
  border: none;
  background: rgba(95, 111, 85, 0.1);
  color: #5F6F55;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0 12px 12px 0;
}

.close-panel:hover {
  background: #5F6F55;
  color: white;
}

.close-panel svg {
  width: 1rem;
  height: 1rem;
}

/* Map Container */
.map-container {
  flex: 1;
  position: relative;
  transition: margin-left 0.3s ease;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .main-layout {
    height: calc(100vh - 160px); /* Account for header + footer */
  }
  
  .minimal-sidebar {
    display: none; /* Hide on mobile - use footer navigation instead */
  }
  
  .requests-panel {
    top: 80px;
    left: 0;
    right: 0;
    width: 100%;
    max-height: calc(100vh - 280px); /* Account for header + footer + spacing */
    border-radius: 16px 16px 0 0;
    box-shadow: 0 -4px 24px rgba(0,0,0,0.15);
    transform: translateY(0);
  }
  
  .map-container {
    margin-left: 0 !important;
    margin-bottom: 80px; /* Space for footer */
  }
}

/* Tooltip Styles */
.shortcut-btn[title]:hover::after {
  content: attr(title);
  position: absolute;
  left: calc(100% + 0.5rem);
  top: 50%;
  transform: translateY(-50%);
  background: #374151;
  color: white;
  padding: 0.375rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  white-space: nowrap;
  z-index: 1000;
  opacity: 0;
  animation: fadeIn 0.2s ease forwards;
}

@keyframes fadeIn {
  to { opacity: 1; }
}

@media (max-width: 768px) {
  .shortcut-btn[title]:hover::after {
    display: none;
  }
}

/* Custom scrollbar */
.panel-content::-webkit-scrollbar {
  width: 4px;
}

.panel-content::-webkit-scrollbar-track {
  background: rgba(0,0,0,0.05);
  border-radius: 2px;
}

.panel-content::-webkit-scrollbar-thumb {
  background: rgba(0,0,0,0.1);
  border-radius: 2px;
}

.panel-content::-webkit-scrollbar-thumb:hover {
  background: rgba(0,0,0,0.2);
}
</style>