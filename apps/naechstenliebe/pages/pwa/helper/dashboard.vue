<template>
  <div style="min-height: 100vh; background: #f5f5f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;">
    <!-- Header Component -->
    <AppHeader 
      title="Helfer Dashboard" 
      :request-count="mapRequests.length"
      @open-requests="toggleRequestsSheet"
      @open-profile="openProfile"
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
        @toggle-sheet="toggleRequestsSheet"
        @start-resize="startResize"
        @filter-change="selectedFilter = $event"
        @focus-request="focusOnRequest"
        @contact-helper="contactHelper"
        @decline-request="declineDirectRequest"
      />
    </div>

    <!-- Footer Component -->
    <AppFooter 
      :active-tab="activeTab"
      @navigate="setActiveTab"
    />

    <!-- Padding for bottom nav -->
    <div style="height: 5rem;"></div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted, nextTick } from 'vue'
import AppHeader from '~/components/AppHeader.vue'
import AppFooter from '~/components/AppFooter.vue'
import MapContainer from '~/components/pwa/helper/dashboardPage/MapContainer.vue'
import StatusButtons from '~/components/pwa/helper/dashboardPage/StatusButtons.vue'
import RequestsSidePanel from '~/components/pwa/helper/dashboardPage/RequestsSidePanel.vue'

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

// Mock data for available requests on map
const mapRequests = ref([
  {
    id: 1,
    title: 'Einkaufen für Martha K.',
    type: 'shopping',
    area: 'Maxvorstadt',
    payment: 15,
    distance: '0.8km',
    position: { lat: 48.1486, lng: 11.5804 },
    circle: null,
    client: 'Martha K., 78 Jahre',
    description: 'Bitte Milch, Vollkornbrot und 6 Äpfel vom Supermarkt. Wichtig: Bio-Milch bevorzugt.',
    address: 'Musterstraße 45, 80797 München'
  },
  {
    id: 2,
    title: 'Gartenarbeit bei Thomas',
    type: 'gardening',
    area: 'Schwabing',
    payment: 25,
    distance: '1.2km',
    position: { lat: 48.1633, lng: 11.5879 },
    circle: null,
    client: 'Thomas M., 65 Jahre',
    description: 'Rasenmähen und Unkrautjäten im Vorgarten. Dauer ca. 2 Stunden.',
    address: 'Leopoldstraße 23, 80802 München'
  },
  {
    id: 3,
    title: 'Hilfe bei Technik',
    type: 'tech_help',
    area: 'Altstadt',
    payment: 20,
    distance: '2.1km',
    position: { lat: 48.1351, lng: 11.5820 },
    circle: null,
    client: 'Anna P., 82 Jahre',
    description: 'Hilfe beim Einrichten eines neuen Smartphones und E-Mail-Access.',
    address: 'Marienplatz 8, 80331 München'
  }
])

// Check if mobile on mount and resize
onMounted(() => {
  checkMobileSize()
  window.addEventListener('resize', checkMobileSize)
  
  // Add global mouse event listeners for resize
  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', stopResize)
  
  // Initialize map markers after map is ready
  nextTick(() => {
    if (mapContainer.value) {
      mapContainer.value.addRequestMarkers(mapRequests.value, isAvailable.value)
    }
  })
})

onUnmounted(() => {
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseup', stopResize)
})

const checkMobileSize = () => {
  isMobile.value = window.innerWidth < 768
}

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

const setActiveTab = (tab) => {
  activeTab.value = tab
  switch(tab) {
    case 'tasks':
      navigateTo('/pwa/helper/task-incoming')
      break
    case 'earnings':
      navigateTo('/pwa/helper/earnings')
      break
    case 'profile':
      navigateTo('/pwa/helper/profile')
      break
  }
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


// Computed property for filtered requests
const filteredRequests = computed(() => {
  if (selectedFilter.value === 'all') {
    return mapRequests.value
  }
  return mapRequests.value.filter(request => request.type === selectedFilter.value)
})

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