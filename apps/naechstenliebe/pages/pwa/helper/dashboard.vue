<template>
  <div style="min-height: 100vh; background: #f5f5f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;">
    <!-- Leaflet CSS -->
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin="" />
    
    <!-- Header Component -->
    <AppHeader 
      title="Helfer Dashboard" 
      :request-count="mapRequests.length"
      @open-requests="toggleRequestsSheet"
      @open-profile="openProfile"
    />

    <!-- Map Container -->
    <div :style="'position: relative; height: calc(100vh - 80px); margin-right: ' + (showRequestsSheet && !isMobile ? sidebarWidth + 'px' : '0') + ';'">
      <!-- Leaflet Map -->
      <div id="map" style="width: 100%; height: 100%; z-index: 1;"></div>
      
          
      <!-- Status Buttons direkt unter dem Header -->
      <div style="position: absolute; top: 3.8rem; left: 4rem; right: 1rem; z-index: 10; max-width: calc(100% - 5rem);">
        <div style="display: flex; gap: 0.5rem;">
          <!-- Standort Status Button (kleiner) -->
          <div style="background: rgba(255,255,255,0.98); padding: 0.5rem 0.75rem; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.12); backdrop-filter: blur(10px); max-width: 140px;">
            <div style="display: flex; align-items: center; gap: 0.4rem;">
              <div :style="'width: 0.4rem; height: 0.4rem; border-radius: 50%; background: ' + (locationStatus === 'active' ? '#10b981' : '#f59e0b') + ';'"></div>
              <span style="font-size: 0.7rem; color: #474747; font-weight: 500; white-space: nowrap;">
                {{ locationStatus === 'active' ? 'Standort aktiv' : 'Ermittelt...' }}
              </span>
            </div>
          </div>
          
          <!-- Verfügbarkeit Button (kleiner) -->
          <button 
            @click="toggleAvailability"
            :style="'background: ' + (isAvailable ? '#5F6F55' : '#8F8B82') + '; color: white; padding: 0.5rem 0.75rem; border-radius: 10px; border: none; cursor: pointer; font-weight: 600; font-size: 0.7rem; transition: all 0.2s; box-shadow: 0 2px 8px rgba(0,0,0,0.12); white-space: nowrap;'"
            onmouseover="this.style.transform='translateY(-1px)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.15)';"
            onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.12)';"
          >
            {{ isAvailable ? '✓ Verfügbar' : '✗ Nicht verfügbar' }}
          </button>
        </div>
      </div>
    
      <!-- Requests Side Panel (Responsive) -->
      <div v-if="showRequestsSheet" :style="'position: fixed; top: 5rem; ' + (isMobile ? 'bottom: 0; left: 0; right: 0;' : 'bottom: 0; right: 0; width: ' + sidebarWidth + 'px;') + '; z-index: 40; background: white; ' + (isMobile ? 'border-radius: 20px 20px 0 0;' : 'box-shadow: -4px 0 20px rgba(0,0,0,0.15);') + '; overflow: hidden; display: flex; flex-direction: column;'">
        
        <!-- Resize Handle (Desktop only) -->
        <div 
          v-if="!isMobile"
          @mousedown="startResize"
          style="position: absolute; left: -2px; top: 0; bottom: 0; width: 8px; background: transparent; cursor: col-resize; z-index: 41;"
          @mouseover="$event.target.style.background='rgba(190, 205, 163, 0.3)'"
          @mouseout="$event.target.style.background='transparent'"
        ></div>
        <!-- Handle Bar (Mobile only) -->
        <div v-if="isMobile" @click="toggleRequestsSheet" style="display: flex; justify-content: center; padding: 1rem 1rem 0.5rem 1rem; cursor: pointer;">
          <div style="width: 40px; height: 4px; background: #d1d5db; border-radius: 2px;"></div>
        </div>
        
        <!-- Sheet Header -->
        <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.5rem 1.5rem 1rem 1.5rem; border-bottom: 1px solid #f3f4f6; flex-shrink: 0;">
          <h3 style="font-size: 1.125rem; font-weight: 600; color: #474747; margin: 0;">Verfügbare Aufträge</h3>
          <button @click="toggleRequestsSheet" style="background: none; border: none; color: #8F8B82; cursor: pointer; padding: 0.25rem;">
            <svg style="width: 1.5rem; height: 1.5rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <!-- Filter Options (Fixed width to prevent jumping) -->
        <div style="padding: 1rem 1.5rem; border-bottom: 1px solid #f3f4f6;">
          <div style="display: flex; gap: 0.5rem; overflow-x: auto; padding-bottom: 0.5rem;">
            <div style="display: flex; gap: 0.5rem; min-width: max-content;">
              <button 
                @click="selectedFilter = 'all'"
                :style="'background: ' + (selectedFilter === 'all' ? '#5F6F55' : '#f3f4f6') + '; color: ' + (selectedFilter === 'all' ? 'white' : '#474747') + '; border: none; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.875rem; font-weight: 500; cursor: pointer; white-space: nowrap; transition: all 0.2s; min-width: 80px;'"
              >
                Alle ({{ mapRequests.length }})
              </button>
              <button 
                @click="selectedFilter = 'shopping'"
                :style="'background: ' + (selectedFilter === 'shopping' ? '#5F6F55' : '#f3f4f6') + '; color: ' + (selectedFilter === 'shopping' ? 'white' : '#474747') + '; border: none; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.875rem; font-weight: 500; cursor: pointer; white-space: nowrap; transition: all 0.2s; min-width: 80px;'"
              >
                Einkaufen
              </button>
              <button 
                @click="selectedFilter = 'cooking'"
                :style="'background: ' + (selectedFilter === 'cooking' ? '#5F6F55' : '#f3f4f6') + '; color: ' + (selectedFilter === 'cooking' ? 'white' : '#474747') + '; border: none; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.875rem; font-weight: 500; cursor: pointer; white-space: nowrap; transition: all 0.2s; min-width: 80px;'"
              >
                Kochen
              </button>
              <button 
                @click="selectedFilter = 'gardening'"
                :style="'background: ' + (selectedFilter === 'gardening' ? '#5F6F55' : '#f3f4f6') + '; color: ' + (selectedFilter === 'gardening' ? 'white' : '#474747') + '; border: none; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.875rem; font-weight: 500; cursor: pointer; white-space: nowrap; transition: all 0.2s; min-width: 80px;'"
              >
                Gartenarbeit
              </button>
              <button 
                @click="selectedFilter = 'tech_help'"
                :style="'background: ' + (selectedFilter === 'tech_help' ? '#5F6F55' : '#f3f4f6') + '; color: ' + (selectedFilter === 'tech_help' ? 'white' : '#474747') + '; border: none; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.875rem; font-weight: 500; cursor: pointer; white-space: nowrap; transition: all 0.2s; min-width: 80px;'"
              >
                Technik
              </button>
            </div>
          </div>
        </div>

        <!-- Requests List -->
        <div style="padding: 1rem 1.5rem; max-height: 60vh; overflow-y: auto;">
          <div v-if="filteredRequests.length === 0" style="text-align: center; padding: 3rem 1rem;">
            <div style="width: 4rem; height: 4rem; background: #f3f4f6; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem auto;">
              <svg style="width: 2rem; height: 2rem; color: #8F8B82;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
              </svg>
            </div>
            <h4 style="font-weight: 600; color: #474747; margin: 0 0 0.5rem 0;">Keine Aufträge verfügbar</h4>
            <p style="color: #8F8B82; margin: 0;">Aktuell gibt es keine Aufträge für diese Filter</p>
          </div>

          <div v-else style="display: flex; flex-direction: column; gap: 1rem;">
            <div 
              v-for="request in filteredRequests" 
              :key="request.id"
              style="background: #f9fafb; border-radius: 12px; padding: 1rem; border: 1px solid #e5e7eb; transition: all 0.2s;"
              onmouseover="this.style.borderColor='#BECDA3'; this.style.background='white';"
              onmouseout="this.style.borderColor='#e5e7eb'; this.style.background='#f9fafb';"
            >
              <div style="display: flex; align-items: start; gap: 1rem;">
                <div style="width: 3rem; height: 3rem; background: #BECDA3; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                  <img :src="getTaskIcon(request.type)" :alt="request.type" style="width: 1.5rem; height: 1.5rem;">
                </div>
                <div style="flex: 1; min-width: 0;">
                  <div style="display: flex; align-items: start; justify-content: space-between; margin-bottom: 0.75rem;">
                    <div>
                      <h4 style="font-weight: 600; color: #474747; margin: 0 0 0.25rem 0; font-size: 1rem;">{{ request.title }}</h4>
                      <p style="font-size: 0.875rem; color: #8F8B82; margin: 0;">{{ request.area }} • {{ request.payment }}€ • {{ request.distance }}</p>
                    </div>
                    <button 
                      @click="focusOnRequest(request)"
                      style="background: none; border: 1px solid #BECDA3; color: #5F6F55; padding: 0.5rem; border-radius: 8px; cursor: pointer; font-size: 0.75rem; font-weight: 500; transition: all 0.2s;"
                      onmouseover="this.style.background='#5F6F55'; this.style.color='white';"
                      onmouseout="this.style.background='none'; this.style.color='#5F6F55';"
                    >
                      Auf Karte
                    </button>
                  </div>
                  <div style="display: flex; gap: 0.75rem;">
                    <button 
                      @click="contactHelper(request)"
                      style="flex: 1; background: #5F6F55; color: white; padding: 0.75rem; border: none; cursor: pointer; font-size: 0.875rem; font-weight: 600; border-radius: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.1); transition: all 0.2s;"
                      onmouseover="this.style.transform='translateY(-1px)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.15)';"
                      onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 6px rgba(0,0,0,0.1)';"
                    >
                      Kontaktieren
                    </button>
                    <button 
                      @click="declineDirectRequest(request)"
                      style="flex: 1; background: #f3f4f6; color: #474747; padding: 0.75rem; border: 1px solid #e5e7eb; cursor: pointer; font-size: 0.875rem; font-weight: 600; border-radius: 8px; transition: all 0.2s;"
                      onmouseover="this.style.background='#e74c3c'; this.style.color='white'; this.style.borderColor='#e74c3c';"
                      onmouseout="this.style.background='#f3f4f6'; this.style.color='#474747'; this.style.borderColor='#e5e7eb';"
                    >
                      Überspringen
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
import { computed } from 'vue'
import AppHeader from '~/components/AppHeader.vue'
import AppFooter from '~/components/AppFooter.vue'

definePageMeta({
  layout: false
})

const activeTab = ref('dashboard')
const isAvailable = ref(true)
const unreadMessages = ref(3)
const map = ref(null)
const userLocation = ref(null)
const locationStatus = ref('loading')
const userMarker = ref(null)
const requestMarkers = ref([])
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

// New push notification request
const newRequest = ref(null)

// Check if mobile on mount and resize
onMounted(async () => {
  checkMobileSize()
  window.addEventListener('resize', checkMobileSize)
  
  await loadLeaflet()
  await initializeMap()
  await getUserLocation()
  addRequestMarkers()
  simulateNewRequest()
  startRealtimeUpdates()
  
  // Add global mouse event listeners for resize
  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', stopResize)
})

onUnmounted(() => {
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseup', stopResize)
})

const checkMobileSize = () => {
  isMobile.value = window.innerWidth < 768
}

const loadLeaflet = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script')
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
    script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo='
    script.crossOrigin = ''
    script.onload = resolve
    document.head.appendChild(script)
  })
}

const initializeMap = () => {
  return new Promise((resolve) => {
    // Initialize map centered on Munich
    map.value = L.map('map').setView([48.1351, 11.5820], 13)
    
    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19
    }).addTo(map.value)
    
    // Add zoom controls to top left
    map.value.zoomControl.setPosition('topleft')
    
    // Ensure zoom controls are above other elements
    const zoomControl = document.querySelector('.leaflet-control-zoom')
    if (zoomControl) {
      zoomControl.style.zIndex = '1000'
    }
    
    resolve()
  })
}

const getUserLocation = () => {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      locationStatus.value = 'error'
      // Fallback to Munich center and add marker anyway
      userLocation.value = { lat: 48.1351, lng: 11.5820 }
      addUserMarker()
      resolve()
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        userLocation.value = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        locationStatus.value = 'active'
        
        // Add user marker
        addUserMarker()
        
        // Center map on user location
        map.value.setView([userLocation.value.lat, userLocation.value.lng], 14)
        
        resolve()
      },
      (error) => {
        console.error('Geolocation error:', error)
        // Even on error, set active and use Munich center as fallback
        locationStatus.value = 'active'
        userLocation.value = { lat: 48.1351, lng: 11.5820 }
        addUserMarker()
        map.value.setView([userLocation.value.lat, userLocation.value.lng], 14)
        resolve()
      },
      {
        enableHighAccuracy: false, // Changed to false for faster response
        timeout: 10000, // Increased timeout
        maximumAge: 60000 // Allow cached location
      }
    )
  })
}

const addUserMarker = () => {
  if (userMarker.value) {
    map.value.removeLayer(userMarker.value)
  }

  // Create custom user marker
  const userIcon = L.divIcon({
    html: `<div style="background: #474747; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.3);"></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
    className: 'user-marker'
  })

  userMarker.value = L.marker([userLocation.value.lat, userLocation.value.lng], {
    icon: userIcon
  }).addTo(map.value)
  
  userMarker.value.bindPopup(`
    <div style="font-size: 14px; font-weight: 600; margin-bottom: 8px;">
      Dein Standort
    </div>
    <div style="font-size: 12px; color: #666;">
      Status: <span style="color: ${isAvailable.value ? '#10b981' : '#f59e0b'}; font-weight: 600;">
        ${isAvailable.value ? 'Verfügbar' : 'Nicht verfügbar'}
      </span>
    </div>
  `)
}

const addRequestMarkers = () => {
  // Clear existing markers
  requestMarkers.value.forEach(marker => {
    if (marker.circle) map.value.removeLayer(marker.circle)
    if (marker.marker) map.value.removeLayer(marker.marker)
  })
  requestMarkers.value = []

  mapRequests.value.forEach(request => {
    // Add privacy circle (1-2km radius)
    const circle = L.circle([request.position.lat, request.position.lng], {
      color: '#5F6F55',
      fillColor: '#8FA66E',
      fillOpacity: 0.2,
      radius: 1500, // 1.5km radius
      weight: 2
    }).addTo(map.value)

    // Add approximate marker (center of circle)
    const requestIcon = L.divIcon({
      html: `<div style="background: #BECDA3; width: 16px; height: 16px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.2); display: flex; align-items: center; justify-content: center;">
        <img src="${getTaskIcon(request.type)}" style="width: 8px; height: 8px;">
      </div>`,
      iconSize: [16, 16],
      iconAnchor: [8, 8],
      className: 'request-marker'
    })

    const marker = L.marker([request.position.lat, request.position.lng], {
      icon: requestIcon
    }).addTo(map.value)

    marker.bindPopup(`
      <div style="min-width: 200px;">
        <h4 style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600;">${request.title}</h4>
        <p style="margin: 0 0 8px 0; font-size: 12px; color: #666;">${request.area} • ${request.payment}€</p>
        <p style="margin: 0; font-size: 11px; color: #999;">Genauer Standort wird erst nach Annahme geteilt</p>
      </div>
    `)

    requestMarkers.value.push({ circle, marker, id: request.id })
  })
}

const simulateNewRequest = () => {
  // No more popup messages - all requests go through the bottom sheet
}

const startRealtimeUpdates = () => {
  // Simulate real-time updates every 30 seconds
  setInterval(() => {
    // Random position update for demonstration
    if (mapRequests.value.length > 0) {
      const randomRequest = mapRequests.value[Math.floor(Math.random() * mapRequests.value.length)]
      console.log('Real-time update for request:', randomRequest.id)
    }
  }, 30000)
}

const toggleRequestsSheet = () => {
  showRequestsSheet.value = !showRequestsSheet.value
  console.log('Requests sheet toggled:', showRequestsSheet.value)
}

const toggleAvailability = () => {
  isAvailable.value = !isAvailable.value
  console.log('Availability toggled:', isAvailable.value)
  
  // Update user marker popup with new availability status
  if (userMarker.value) {
    userMarker.value.setPopupContent(`
      <div style="font-size: 14px; font-weight: 600; margin-bottom: 8px;">
        Dein Standort
      </div>
      <div style="font-size: 12px; color: #666;">
        Status: <span style="color: ${isAvailable.value ? '#10b981' : '#f59e0b'}; font-weight: 600;">
          ${isAvailable.value ? 'Verfügbar' : 'Nicht verfügbar'}
        </span>
      </div>
    `)
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
  // Remove from map
  const markerData = requestMarkers.value.find(m => m.id === request.id)
  if (markerData) {
    if (markerData.circle) map.value.removeLayer(markerData.circle)
    if (markerData.marker) map.value.removeLayer(markerData.marker)
    requestMarkers.value = requestMarkers.value.filter(m => m.id !== request.id)
  }
  // Close sheet and navigate
  showRequestsSheet.value = false
  navigateTo('/pwa/helper/task-active')
}

const declineDirectRequest = (request) => {
  console.log('Direct request declined:', request)
  // Remove from available requests
  mapRequests.value = mapRequests.value.filter(r => r.id !== request.id)
  // Remove from map
  const markerData = requestMarkers.value.find(m => m.id === request.id)
  if (markerData) {
    if (markerData.circle) map.value.removeLayer(markerData.circle)
    if (markerData.marker) map.value.removeLayer(markerData.marker)
    requestMarkers.value = requestMarkers.value.filter(m => m.id !== request.id)
  }
}

const focusOnRequest = (request) => {
  console.log('Focusing on request:', request)
  // Center map on request location
  map.value.setView([request.position.lat, request.position.lng], 15)
  
  // Open popup
  const markerData = requestMarkers.value.find(m => m.id === request.id)
  if (markerData?.marker) {
    markerData.marker.openPopup()
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

const getTaskIcon = (type) => {
  const icons = {
    shopping: '/icons/einkaufenMadl.svg',
    cooking: '/icons/kochen.svg',
    cleaning: '/icons/staubsaugen.svg',
    gardening: '/icons/gießenBub.svg',
    tech_help: '/icons/technikBanalcieren.svg'
  }
  return icons[type] || '/icons/verschiedeneMenschen.svg'
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
.leaflet-container {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}

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

/* Ensure zoom controls are visible and above other elements */
:global(.leaflet-control-zoom) {
  z-index: 1000 !important;
  background: white !important;
  border-radius: 8px !important;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2) !important;
}

:global(.leaflet-control-zoom a) {
  background: white !important;
  color: #474747 !important;
  border: none !important;
  font-weight: 600 !important;
  font-size: 16px !important;
  width: 36px !important;
  height: 36px !important;
  line-height: 34px !important;
}

:global(.leaflet-control-zoom a:hover) {
  background: #f3f4f6 !important;
  color: #5F6F55 !important;
}
</style>