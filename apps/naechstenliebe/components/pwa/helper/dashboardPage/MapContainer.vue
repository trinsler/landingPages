<template>
  <!-- Leaflet CSS -->
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin="" />
  
  <!-- Map Container -->
  <div :style="'position: relative; height: calc(100vh - 80px); margin-right: ' + (showRequestsSheet && !isMobile ? sidebarWidth + 'px' : '0') + ';'">
    <!-- Leaflet Map -->
    <div id="map" style="width: 100%; height: 100%; z-index: 1;"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

defineProps({
  showRequestsSheet: Boolean,
  isMobile: Boolean,
  sidebarWidth: Number
})

const map = ref(null)
const userLocation = ref(null)
const locationStatus = ref('loading')
const userMarker = ref(null)
const requestMarkers = ref([])

const emit = defineEmits(['location-status-updated', 'user-location-updated'])

onMounted(async () => {
  await loadLeaflet()
  await initializeMap()
  await getUserLocation()
})

onUnmounted(() => {
  // Cleanup map if needed
})

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
    // Initialize map centered on Winnweiler
    map.value = L.map('map').setView([49.5467, 7.7778], 12)
    
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
    
    // Add dummy request markers for testing
    setTimeout(() => {
      addDummyRequestMarkers()
    }, 1000)
    
    resolve()
  })
}

const getUserLocation = () => {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      locationStatus.value = 'error'
      // Fallback to Winnweiler center and add marker anyway
      userLocation.value = { lat: 49.5467, lng: 7.7778 }
      addUserMarker()
      emit('location-status-updated', locationStatus.value)
      emit('user-location-updated', userLocation.value)
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
        
        emit('location-status-updated', locationStatus.value)
        emit('user-location-updated', userLocation.value)
        resolve()
      },
      (error) => {
        console.error('Geolocation error:', error)
        // Even on error, set active and use Munich center as fallback
        locationStatus.value = 'active'
        userLocation.value = { lat: 48.1351, lng: 11.5820 }
        addUserMarker()
        map.value.setView([userLocation.value.lat, userLocation.value.lng], 14)
        emit('location-status-updated', locationStatus.value)
        emit('user-location-updated', userLocation.value)
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
}

const addRequestMarkers = (mapRequests, isAvailable) => {
  // Clear existing markers
  requestMarkers.value.forEach(marker => {
    if (marker.circle) map.value.removeLayer(marker.circle)
    if (marker.marker) map.value.removeLayer(marker.marker)
  })
  requestMarkers.value = []

  mapRequests.forEach(request => {
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

const updateUserMarkerPopup = (isAvailable) => {
  if (userMarker.value) {
    userMarker.value.setPopupContent(`
      <div style="font-size: 14px; font-weight: 600; margin-bottom: 8px;">
        Dein Standort
      </div>
      <div style="font-size: 12px; color: #666;">
        Status: <span style="color: ${isAvailable ? '#5F6F55' : '#8F8B82'}; font-weight: 600;">
          ${isAvailable ? 'Verfügbar' : 'Nicht verfügbar'}
        </span>
      </div>
    `)
  }
}

const addDummyRequestMarkers = () => {
  // Dummy requests around Winnweiler
  const dummyRequests = [
    {
      id: 1,
      title: 'Einkaufen bei Familie Schmidt',
      type: 'shopping',
      area: 'Winnweiler',
      payment: 18,
      position: { lat: 49.5467, lng: 7.7778 }
    },
    {
      id: 2,
      title: 'Gartenpflege bei Herrn Weber',
      type: 'gardening',
      area: 'Rockenhausen',
      payment: 25,
      position: { lat: 49.5964, lng: 7.7213 }
    },
    {
      id: 3,
      title: 'Technik-Hilfe für Seniorin',
      type: 'tech_help',
      area: 'Imsweiler',
      payment: 22,
      position: { lat: 49.5689, lng: 7.8234 }
    },
    {
      id: 4,
      title: 'Haushaltshilfe gesucht',
      type: 'cleaning',
      area: 'Bischweiler',
      payment: 30,
      position: { lat: 49.5987, lng: 7.6987 }
    },
    {
      id: 5,
      title: 'Hund Gassi gehen',
      type: 'dog_walking',
      area: 'Falkenstein',
      payment: 12,
      position: { lat: 49.5123, lng: 7.8123 }
    },
    {
      id: 6,
      title: 'Kochen für Single-Haushalt',
      type: 'cooking',
      area: 'Münsterappel',
      payment: 35,
      position: { lat: 49.6234, lng: 7.6543 }
    },
    {
      id: 7,
      title: 'Fenster putzen',
      type: 'cleaning',
      area: 'Ransweiler',
      payment: 20,
      position: { lat: 49.5789, lng: 7.8345 }
    },
    {
      id: 8,
      title: 'Medikamentenabholung',
      type: 'shopping',
      area: 'Schönborn',
      payment: 15,
      position: { lat: 49.5890, lng: 7.7567 }
    }
  ]

  // Clear existing markers
  requestMarkers.value.forEach(marker => {
    if (marker.circle) map.value.removeLayer(marker.circle)
    if (marker.marker) map.value.removeLayer(marker.marker)
  })
  requestMarkers.value = []

  dummyRequests.forEach(request => {
    // Add 100m radius circle (100 meters)
    const circle = L.circle([request.position.lat, request.position.lng], {
      color: '#5F6F55',
      fillColor: '#BECDA3',
      fillOpacity: 0.1,
      radius: 100, // 100 meters
      weight: 1
    }).addTo(map.value)

    // Add request marker
    const requestIcon = L.divIcon({
      html: `<div style="background: #BECDA3; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.2);"></div>`,
      iconSize: [12, 12],
      iconAnchor: [6, 6],
      className: 'request-marker'
    })

    const marker = L.marker([request.position.lat, request.position.lng], {
      icon: requestIcon
    }).addTo(map.value)

    marker.bindPopup(`
      <div style="min-width: 200px;">
        <h4 style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600;">${request.title}</h4>
        <p style="margin: 0 0 8px 0; font-size: 12px; color: #666;">${request.area} • ${request.payment}€</p>
        <p style="margin: 0; font-size: 11px; color: #999;">Radius: 100m</p>
      </div>
    `)

    requestMarkers.value.push({ circle, marker, id: request.id })
  })
}

// Expose methods to parent
defineExpose({
  addRequestMarkers,
  addDummyRequestMarkers,
  focusOnRequest,
  updateUserMarkerPopup,
  map
})
</script>

<style scoped>
.leaflet-container {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
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