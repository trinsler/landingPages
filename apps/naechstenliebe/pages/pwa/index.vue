<template>
  <div class="dashboard-container">
    <!-- Unified Header Component - Helper & Seeker combined -->
    <AppHeader 
      title="Nachbarschaftshilfe" 
      current-role="unified"
      :request-count="totalRequestCount"
      :is-available="isAvailable"
      :location-status="locationStatus"
      @open-requests="handleRequestsClick"
      @open-profile="handleProfileClick"
      @toggle-role="handleRoleToggle"
      @toggle-availability="toggleAvailability"
    />

    <!-- Modern Dashboard with integrated navigation -->
    <ModernDashboard 
      :is-mobile="isMobile"
      :user-location="userLocation"
      @navigate="handleFooterNavigation"
      @contact-helper="contactHelper"
      @accept-request="acceptDirectRequest"
      @focus-request="focusOnRequest"
      @location-updated="userLocation = $event"
    />

    <!-- New Minimal Footer Component -->
    <MinimalFooter 
      active-tab="dashboard"
      current-role="unified"
      @navigate="handleFooterNavigation"
    />

    <!-- Padding for bottom nav -->
    <div style="height: 5rem;"></div>

  </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted, nextTick } from 'vue'
import AppHeader from '~/components/AppHeader.vue'
import MinimalFooter from '~/components/pwa/unified/MinimalFooter.vue'
import ModernDashboard from '~/components/pwa/unified/ModernDashboard.vue'

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

// Map and filter states
const currentZoom = ref(12)
const visibleRadius = ref(15)
const searchCity = ref('Winnweiler') 
const searchRadius = ref(10)
const mapBounds = ref(null)

// Map requests from imported data
const mapRequests = ref([...initialMapRequests])

// Business Logic: Helper Status Management
const helperStatus = ref({
  isActive: true,
  isAvailable: true,
  currentLocation: null,
  maxDistance: 5, // km
  averageResponseTime: 12, // minutes
  completedTasks: 0,
  rating: 0,
  reliability: 100 // percentage
})

// Business Logic: Geo-Matching Algorithm
const geoMatchRequests = computed(() => {
  if (!userLocation.value || !helperStatus.value.isAvailable) {
    return []
  }
  
  return mapRequests.value
    .map(request => ({
      ...request,
      distance: calculateDistance(
        userLocation.value.lat, 
        userLocation.value.lng,
        request.lat, 
        request.lng
      ),
      matchScore: calculateMatchScore(request, helperStatus.value)
    }))
    .filter(request => request.distance <= helperStatus.value.maxDistance)
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 10) // Top 10 matches
})

// Business Logic: Smart Match Score Calculation
const calculateMatchScore = (request, helper) => {
  let score = 100
  
  // Distance factor (closer = higher score)
  const distanceFactor = Math.max(0, 100 - (request.distance * 10))
  
  // Payment factor (higher payment = higher score)
  const paymentAmount = parseFloat(request.payment.replace('€', ''))
  const paymentFactor = Math.min(100, paymentAmount * 2)
  
  // Urgency factor
  const urgencyFactor = request.urgent ? 50 : 0
  
  // Helper reliability factor
  const reliabilityFactor = helper.reliability
  
  // Category expertise (if helper has done similar tasks)
  const expertiseFactor = helper.completedTasks > 0 ? 20 : 0
  
  score = (distanceFactor * 0.3) + 
          (paymentFactor * 0.25) + 
          (urgencyFactor * 0.2) + 
          (reliabilityFactor * 0.15) + 
          (expertiseFactor * 0.1)
  
  return Math.round(score)
}

// Unified request count with geo-matching
const totalRequestCount = computed(() => {
  return geoMatchRequests.value.length + seekerTasks.value.length
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
  
  // Business Logic: Initialize location tracking
  initializeLocationTracking()
  
  // Business Logic: Initialize helper status from localStorage
  const savedStatus = localStorage.getItem('helperStatus')
  if (savedStatus) {
    helperStatus.value = { ...helperStatus.value, ...JSON.parse(savedStatus) }
  }
  
  // Initialize map markers after map is ready
  nextTick(() => {
    if (mapContainer.value) {
      mapContainer.value.addDummyRequestMarkers()
    }
  })
})

// Business Logic: Location tracking initialization
const initializeLocationTracking = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        userLocation.value = location
        helperStatus.value.currentLocation = location
        updateHelperStatus({ currentLocation: location })
        locationStatus.value = 'active'
      },
      (error) => {
        console.error('Location error:', error)
        locationStatus.value = 'error'
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 }
    )
    
    // Watch position for real-time updates
    navigator.geolocation.watchPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        userLocation.value = location
        helperStatus.value.currentLocation = location
      },
      null,
      { enableHighAccuracy: false, timeout: 30000, maximumAge: 600000 }
    )
  }
}

onUnmounted(() => {
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseup', stopResize)
})


const toggleAvailability = () => {
  const newAvailability = !isAvailable.value
  isAvailable.value = newAvailability
  
  // Business Logic: Update helper status with availability change
  updateHelperStatus({ 
    isAvailable: newAvailability,
    lastAvailabilityChange: new Date().toISOString()
  })
  
  // Save to localStorage
  localStorage.setItem('helperStatus', JSON.stringify(helperStatus.value))
  
  console.log('Availability toggled:', newAvailability)
  
  // Update user marker popup with new availability status
  if (mapContainer.value) {
    mapContainer.value.updateUserMarkerPopup(newAvailability)
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
  
  // Business Logic: Smart acceptance with validation
  if (!validateTaskAcceptance(request)) {
    alert('Sie haben bereits zu viele aktive Aufträge oder befinden sich zu weit entfernt.')
    return
  }
  
  // Business Logic: Update helper statistics
  updateHelperStatus({
    activeTasks: (helperStatus.value.activeTasks || 0) + 1,
    totalAccepted: (helperStatus.value.totalAccepted || 0) + 1,
    lastTaskAccepted: new Date().toISOString()
  })
  
  // Business Logic: Track acceptance metrics
  const acceptanceTime = Date.now()
  const responseTime = acceptanceTime - (request.createdAt || Date.now())
  
  // Remove from available requests
  mapRequests.value = mapRequests.value.filter(r => r.id !== request.id)
  
  // Update map markers
  if (mapContainer.value) {
    mapContainer.value.addRequestMarkers(mapRequests.value, isAvailable.value)
  }
  
  // Business Logic: Save acceptance to localStorage for analytics
  const acceptedTasks = JSON.parse(localStorage.getItem('acceptedTasks') || '[]')
  acceptedTasks.push({
    ...request,
    acceptedAt: new Date().toISOString(),
    responseTime: responseTime,
    helperLocation: helperStatus.value.currentLocation
  })
  localStorage.setItem('acceptedTasks', JSON.stringify(acceptedTasks))
  
  // Close sheet and navigate
  showRequestsSheet.value = false
  navigateTo('/pwa/helper/task-active')
}

// Business Logic: Task acceptance validation
const validateTaskAcceptance = (request) => {
  // Check if helper has too many active tasks
  if ((helperStatus.value.activeTasks || 0) >= 3) {
    return false
  }
  
  // Check if request is within acceptable distance
  if (request.distance > helperStatus.value.maxDistance) {
    return false
  }
  
  // Check if helper is available
  if (!helperStatus.value.isAvailable) {
    return false
  }
  
  // Check helper reliability threshold
  if (helperStatus.value.reliability < 60) {
    return false
  }
  
  return true
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
  // Navigate to dedicated helper tasks page
  navigateTo('/pwa')
}

const handleProfileClick = () => {
  navigateTo('/pwa/shared/profile')
}


const handleRoleToggle = () => {
  // Simple role toggle - no longer used with unified dashboard
  console.log('Role toggle clicked')
}

// Unified footer navigation handler
const handleFooterNavigation = (tab) => {
  switch(tab) {
    case 'dashboard':
      // Already on dashboard
      break
    case 'helper-tasks':
      navigateTo('/pwa')
      break
    case 'seeker-create':
      navigateTo('/pwa/jobs/create/category')
      break
    case 'chat':
      navigateTo('/pwa/shared/chat')
      break
    case 'seeker-favorites':
      navigateTo('/pwa/seeker/favorites')
      break
    case 'profile-reviews':
      navigateTo('/pwa/profile/my-reviews')
      break
    case 'profile-badges':
      navigateTo('/pwa/profile/badges')
      break
    case 'settings-payments':
      navigateTo('/pwa/shared/payment-methods')
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

// Business Logic: Visible requests using geo-matching
const visibleRequests = computed(() => {
  return geoMatchRequests.value
})

// Business Logic: Advanced filtering with user preferences
const filteredRequests = computed(() => {
  const requests = visibleRequests.value
  if (selectedFilter.value === 'all') {
    return requests
  }
  return requests.filter(request => request.type === selectedFilter.value)
})

// Business Logic: Status Management System
const updateHelperStatus = (newStatus) => {
  helperStatus.value = { ...helperStatus.value, ...newStatus }
  
  // Business Rule: Update availability based on current workload
  if (helperStatus.value.activeTasks >= 3) {
    helperStatus.value.isAvailable = false
  }
  
  // Business Rule: Adjust max distance based on reliability
  if (helperStatus.value.reliability < 80) {
    helperStatus.value.maxDistance = Math.max(2, helperStatus.value.maxDistance - 1)
  } else if (helperStatus.value.reliability > 95) {
    helperStatus.value.maxDistance = Math.min(10, helperStatus.value.maxDistance + 1)
  }
  
  // Update location status for header
  if (helperStatus.value.currentLocation) {
    locationStatus.value = 'active'
  }
}

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


// Seeker functionality handlers
const createSeekerTask = () => {
  navigateTo('/pwa/seeker/task-create')
}

const viewSeekerTask = (taskId) => {
  navigateTo(`/pwa/seeker/task-active?id=${taskId}`)
}

const openSeekerFavorites = () => {
  navigateTo('/pwa/seeker/favorites')
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


// Map positioning no longer needs dynamic margins - uses fixed overlay layout

</script>

<style scoped>
/* Dashboard Container with Notion-style Background */
.dashboard-container {
  min-height: 100vh;
  width: 100%;
  max-width: none;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  position: relative;
}

.dashboard-container::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 80%, rgba(95, 111, 85, 0.03) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(190, 205, 163, 0.04) 0%, transparent 50%),
    radial-gradient(circle at 40% 40%, rgba(143, 139, 130, 0.02) 0%, transparent 50%);
  pointer-events: none;
  z-index: 0;
}

/* Modern Dashboard Layout - No need for extra layout wrapper */

/* Remove obsolete media queries for old layout */

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