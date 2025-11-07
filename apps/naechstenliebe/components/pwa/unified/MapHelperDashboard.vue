<template>
  <div class="map-helper-dashboard">
    <!-- Map Background Container -->
    <div class="map-container">
      <MapContainer 
        ref="mapContainer"
        :show-requests-sheet="false"
        :is-mobile="isMobile"
        :sidebar-width="0"
        @location-status-updated="locationStatus = $event"
        @user-location-updated="userLocation = $event"
      />
    </div>

    <!-- Helper Requests Overlay Card -->
    <div v-if="showHelperRequests" class="helper-requests-overlay">
      <div class="overlay-header">
        <div class="header-content">
          <div class="header-left">
            <svg class="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m-6 3l6-3"/>
            </svg>
            <div class="header-text">
              <h3 class="overlay-title">Verfügbare Aufträge</h3>
              <p class="overlay-subtitle">{{ filteredRequests.length }} passende Aufträge gefunden</p>
            </div>
          </div>
          <button class="close-btn" @click="showHelperRequests = false">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <!-- Search Section -->
        <div class="search-section">
          <!-- City Search -->
          <div class="city-search">
            <input 
              type="text"
              v-model="searchCity"
              placeholder="Stadt oder Ort eingeben..."
              class="city-input"
              @input="handleCityChange"
            />
          </div>
          
          <!-- Radius Slider -->
          <div class="radius-section">
            <div class="radius-header">
              <span class="radius-label">Suchradius</span>
              <span class="radius-value">{{ searchRadius }} km</span>
            </div>
            <input 
              type="range"
              v-model="searchRadius"
              min="1"
              max="50"
              step="1"
              @input="handleRadiusChange"
              class="radius-slider"
            />
            <div class="radius-markers">
              <span class="marker-text">1 km</span>
              <span class="marker-text">50 km</span>
            </div>
          </div>
        </div>

        <!-- Filter Options -->
        <div class="filter-section">
          <div class="filter-scroll">
            <button 
              v-for="filter in filters"
              :key="filter.value"
              @click="selectedFilter = filter.value"
              class="filter-btn"
              :class="{ active: selectedFilter === filter.value }"
            >
              {{ filter.label }}
            </button>
          </div>
        </div>
      </div>

      <!-- Requests List -->
      <div class="requests-content">
        <div v-if="filteredRequests.length > 0" class="requests-list">
          <div 
            v-for="request in filteredRequests"
            :key="request.id"
            class="request-item"
            @click="focusRequest(request)"
          >
            <div class="request-header">
              <div class="request-icon" :class="request.type">
                <svg v-if="request.type === 'shopping'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6 0a2 2 0 100-4 2 2 0 000 4zm-8-2a2 2 0 100-4 2 2 0 000 4z"/>
                </svg>
                <svg v-else-if="request.type === 'gardening'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945c0 .055-.045.055-.055.055H9a2 2 0 01-2-2v-1a2 2 0 00-2-2 2 2 0 01-2-2V11z"/>
                </svg>
                <svg v-else fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
              </div>
              <div class="request-priority" :class="request.priority">
                <div class="priority-dot"></div>
              </div>
            </div>

            <div class="request-content">
              <h5 class="request-title">{{ request.title }}</h5>
              <div class="request-details">
                <span class="request-client">{{ request.client }}</span>
                <span class="request-area">{{ request.area }}</span>
              </div>
              <div class="request-footer">
                <span class="request-payment">{{ request.payment }}</span>
                <span class="request-distance">{{ request.distance }}</span>
              </div>
            </div>

            <div class="request-actions">
              <button 
                class="contact-btn"
                @click.stop="contactHelper(request)"
              >
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                </svg>
              </button>
              <button 
                class="accept-btn"
                @click.stop="acceptRequest(request)"
              >
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="empty-state">
          <div class="empty-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
            </svg>
          </div>
          <h5 class="empty-title">Keine Aufträge gefunden</h5>
          <p class="empty-text">Versuche einen anderen Filter oder Suchradius.</p>
        </div>
      </div>
    </div>

    <!-- Floating Action Button -->
    <button 
      v-if="!showHelperRequests" 
      class="floating-requests-btn" 
      @click="showHelperRequests = true"
      :class="{ 'has-requests': filteredRequests.length > 0 }"
    >
      <div class="fab-content">
        <svg class="fab-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m-6 3l6-3"/>
        </svg>
        <span v-if="filteredRequests.length > 0" class="fab-badge">{{ filteredRequests.length }}</span>
      </div>
      <span class="fab-label">Aufträge anzeigen</span>
    </button>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import MapContainer from '~/components/pwa/helper/dashboardPage/MapContainer.vue'
import { mapRequests as initialMapRequests } from '~/components/pwa/helper/dashboard/DashboardData.js'
import { calculateDistance } from '~/components/pwa/helper/dashboard/DashboardUtils.js'

const props = defineProps({
  isMobile: {
    type: Boolean,
    default: false
  },
  userLocation: {
    type: Object,
    default: null
  }
})

const emit = defineEmits([
  'contact-helper',
  'accept-request',
  'focus-request',
  'location-updated'
])

// Component state
const showHelperRequests = ref(false)
const searchCity = ref('Winnweiler')
const searchRadius = ref(10)
const selectedFilter = ref('all')
const locationStatus = ref('loading')
const userLocation = ref(props.userLocation)
const mapContainer = ref(null)

// Mock data - in real app this would come from API
const mapRequests = ref([...initialMapRequests])

const filters = [
  { value: 'all', label: 'Alle' },
  { value: 'shopping', label: 'Einkaufen' },
  { value: 'gardening', label: 'Garten' },
  { value: 'cleaning', label: 'Reinigung' },
  { value: 'transport', label: 'Transport' }
]

// Computed properties
const filteredRequests = computed(() => {
  let requests = mapRequests.value
  
  // Filter by type
  if (selectedFilter.value !== 'all') {
    requests = requests.filter(request => request.type === selectedFilter.value)
  }
  
  // Filter by distance if user location is available
  if (userLocation.value && searchRadius.value) {
    requests = requests.filter(request => {
      const distance = calculateDistance(
        userLocation.value.lat, 
        userLocation.value.lng,
        request.lat, 
        request.lng
      )
      return distance <= searchRadius.value
    })
  }
  
  return requests
})

// Event handlers
const handleCityChange = () => {
  console.log('City changed to:', searchCity.value)
  // In real app, this would geocode the city and update map center
}

const handleRadiusChange = () => {
  console.log('Radius changed to:', searchRadius.value)
  // Filter requests based on new radius
}

const contactHelper = (request) => {
  emit('contact-helper', request)
}

const acceptRequest = (request) => {
  emit('accept-request', request)
}

const focusRequest = (request) => {
  emit('focus-request', request)
  
  // Focus map on request location
  if (mapContainer.value) {
    mapContainer.value.focusOnRequest(request)
  }
}

// Location tracking
onMounted(() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        userLocation.value = location
        emit('location-updated', location)
        locationStatus.value = 'active'
      },
      (error) => {
        console.error('Location error:', error)
        locationStatus.value = 'error'
      }
    )
  }
})
</script>

<style scoped>
/* Mobile First Design */
.map-helper-dashboard {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.map-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

/* Helper Requests Overlay - Mobile First */
.helper-requests-overlay {
  position: fixed;
  top: 80px;
  left: 0;
  right: 0;
  bottom: 80px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 20px 20px 0 0;
  box-shadow: 0 -4px 24px rgba(0,0,0,0.15);
  z-index: 20;
  display: flex;
  flex-direction: column;
  animation: slideUpMobile 0.3s ease;
  overflow: hidden;
}

@keyframes slideUpMobile {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Overlay Header */
.overlay-header {
  flex-shrink: 0;
  background: rgba(95, 111, 85, 0.02);
  border-bottom: 1px solid rgba(95, 111, 85, 0.1);
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.search-icon {
  width: 1.5rem;
  height: 1.5rem;
  color: #5F6F55;
  flex-shrink: 0;
}

.header-text {
  flex: 1;
}

.overlay-title {
  color: #474747;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 0.25rem 0;
  line-height: 1.3;
}

.overlay-subtitle {
  color: #8F8B82;
  font-size: 1rem;
  margin: 0;
  line-height: 1.4;
}

.close-btn {
  width: 2.5rem;
  height: 2.5rem;
  border: none;
  background: rgba(95, 111, 85, 0.1);
  color: #5F6F55;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  background: #5F6F55;
  color: white;
  transform: translateY(-1px);
}

.close-btn svg {
  width: 1.25rem;
  height: 1.25rem;
}

/* Search Section */
.search-section {
  padding: 1rem 1.25rem;
  border-bottom: 1px solid rgba(95, 111, 85, 0.1);
}

.city-search {
  margin-bottom: 1rem;
}

.city-input {
  width: 100%;
  padding: 0.875rem 1rem;
  border: 1px solid rgba(95, 111, 85, 0.2);
  border-radius: 12px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s;
  background: rgba(255, 255, 255, 0.8);
}

.city-input:focus {
  border-color: #5F6F55;
  background: white;
}

.radius-section {
  display: flex;
  flex-direction: column;
}

.radius-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.radius-label {
  font-size: 1rem;
  color: #6b7280;
  font-weight: 500;
}

.radius-value {
  font-size: 1rem;
  font-weight: 600;
  color: #5F6F55;
  background: rgba(95, 111, 85, 0.1);
  padding: 0.25rem 0.5rem;
  border-radius: 8px;
}

.radius-slider {
  width: 100%;
  height: 8px;
  background: rgba(95, 111, 85, 0.1);
  border-radius: 4px;
  outline: none;
  -webkit-appearance: none;
}

.radius-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 20px;
  height: 20px;
  background: #5F6F55;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0,0,0,0.2);
}

.radius-markers {
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
}

.marker-text {
  font-size: 0.875rem;
  color: #9ca3af;
}

/* Filter Section */
.filter-section {
  padding: 1rem 1.25rem;
  border-bottom: 1px solid rgba(95, 111, 85, 0.1);
}

.filter-scroll {
  display: flex;
  gap: 0.75rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
}

.filter-btn {
  padding: 0.75rem 1.25rem;
  border-radius: 20px;
  font-size: 1rem;
  font-weight: 500;
  border: 1px solid rgba(95, 111, 85, 0.2);
  background: rgba(95, 111, 85, 0.05);
  color: #5F6F55;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  flex-shrink: 0;
  min-height: 3rem;
}

.filter-btn:hover {
  border-color: #5F6F55;
  background: rgba(95, 111, 85, 0.1);
}

.filter-btn.active {
  background: #5F6F55;
  color: white;
  border-color: #5F6F55;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(95, 111, 85, 0.3);
}

/* Requests Content */
.requests-content {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
}

.requests-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.request-item {
  display: flex;
  gap: 1rem;
  padding: 1.25rem;
  border: 1px solid rgba(95, 111, 85, 0.1);
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
}

.request-item:hover {
  border-color: #5F6F55;
  box-shadow: 0 4px 16px rgba(95, 111, 85, 0.2);
  transform: translateY(-2px);
  background: white;
}

.request-header {
  position: relative;
  flex-shrink: 0;
}

.request-icon {
  width: 3rem;
  height: 3rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(95, 111, 85, 0.1);
  color: #5F6F55;
}

.request-icon.shopping {
  background: rgba(34, 197, 94, 0.1);
  color: #22c55e;
}

.request-icon.gardening {
  background: rgba(34, 197, 94, 0.1);
  color: #22c55e;
}

.request-icon svg {
  width: 1.5rem;
  height: 1.5rem;
}

.request-priority {
  position: absolute;
  top: -2px;
  right: -2px;
}

.priority-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 2px solid white;
}

.request-priority.high .priority-dot {
  background: #ef4444;
}

.request-priority.medium .priority-dot {
  background: #f59e0b;
}

.request-priority.low .priority-dot {
  background: #10b981;
}

.request-content {
  flex: 1;
  min-width: 0;
}

.request-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #374151;
  margin: 0 0 0.5rem 0;
  line-height: 1.3;
}

.request-details {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 0.75rem;
}

.request-client {
  color: #5F6F55;
  font-weight: 500;
  font-size: 1rem;
}

.request-area {
  color: #6b7280;
  font-size: 0.875rem;
}

.request-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.request-payment {
  font-weight: 600;
  color: #22c55e;
  font-size: 1rem;
  background: rgba(34, 197, 94, 0.1);
  padding: 0.25rem 0.5rem;
  border-radius: 8px;
}

.request-distance {
  color: #6b7280;
  font-size: 0.875rem;
}

.request-actions {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  flex-shrink: 0;
}

.contact-btn,
.accept-btn {
  width: 2.5rem;
  height: 2.5rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.contact-btn {
  background: rgba(95, 111, 85, 0.1);
  color: #5F6F55;
}

.contact-btn:hover {
  background: #5F6F55;
  color: white;
  transform: translateY(-1px);
}

.accept-btn {
  background: rgba(34, 197, 94, 0.1);
  color: #22c55e;
}

.accept-btn:hover {
  background: #22c55e;
  color: white;
  transform: translateY(-1px);
}

.contact-btn svg,
.accept-btn svg {
  width: 1.25rem;
  height: 1.25rem;
}

/* Empty State */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 2rem;
  text-align: center;
}

.empty-icon {
  width: 4rem;
  height: 4rem;
  color: #9ca3af;
  margin-bottom: 1.5rem;
}

.empty-icon svg {
  width: 100%;
  height: 100%;
}

.empty-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #374151;
  margin: 0 0 0.75rem 0;
}

.empty-text {
  color: #6b7280;
  font-size: 1rem;
  margin: 0;
  line-height: 1.5;
}

/* Floating Action Button */
.floating-requests-btn {
  position: fixed;
  bottom: 100px;
  right: 1.5rem;
  background: linear-gradient(135deg, #5F6F55, #4a5c44);
  color: white;
  border: none;
  border-radius: 16px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px rgba(95, 111, 85, 0.4);
  z-index: 15;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  min-width: 80px;
}

.floating-requests-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(95, 111, 85, 0.5);
}

.floating-requests-btn.has-requests {
  background: linear-gradient(135deg, #22c55e, #16a34a);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.fab-content {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.fab-icon {
  width: 1.5rem;
  height: 1.5rem;
}

.fab-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background: #ef4444;
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 50%;
  min-width: 1.25rem;
  height: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid white;
}

.fab-label {
  font-size: 0.75rem;
  font-weight: 500;
  text-align: center;
  line-height: 1.2;
}

/* Tablet and Desktop */
@media (min-width: 768px) {
  .helper-requests-overlay {
    position: absolute;
    top: 1rem;
    right: 1rem;
    bottom: 1rem;
    left: auto;
    width: 400px;
    max-width: 30%;
    background: rgba(255, 255, 255, 0.95);
    border-radius: 20px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.15);
    animation: slideInRight 0.3s ease;
  }

  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  .overlay-title {
    font-size: 1.25rem;
  }
  
  .overlay-subtitle {
    font-size: 0.875rem;
  }
  
  .close-btn {
    width: 2rem;
    height: 2rem;
  }
  
  .close-btn svg {
    width: 1rem;
    height: 1rem;
  }
  
  .city-input {
    padding: 0.75rem;
    font-size: 0.875rem;
  }
  
  .filter-btn {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
    min-height: auto;
  }
  
  .request-item {
    padding: 1rem;
  }
  
  .request-icon {
    width: 2.5rem;
    height: 2.5rem;
  }
  
  .request-icon svg {
    width: 1.25rem;
    height: 1.25rem;
  }
  
  .request-title {
    font-size: 1rem;
  }
  
  .request-client {
    font-size: 0.875rem;
  }
  
  .request-payment {
    font-size: 0.875rem;
  }
  
  .contact-btn,
  .accept-btn {
    width: 2rem;
    height: 2rem;
  }
  
  .contact-btn svg,
  .accept-btn svg {
    width: 1rem;
    height: 1rem;
  }
  
  .floating-requests-btn {
    bottom: 2rem;
    right: 2rem;
    padding: 0.75rem;
    min-width: 60px;
  }
  
  .fab-icon {
    width: 1.25rem;
    height: 1.25rem;
  }
  
  .fab-badge {
    min-width: 1rem;
    height: 1rem;
    font-size: 0.625rem;
  }
  
  .fab-label {
    font-size: 0.625rem;
  }
}

/* Scrollbar styling */
.requests-content::-webkit-scrollbar {
  width: 6px;
}

.requests-content::-webkit-scrollbar-track {
  background: rgba(0,0,0,0.05);
  border-radius: 3px;
}

.requests-content::-webkit-scrollbar-thumb {
  background: rgba(0,0,0,0.1);
  border-radius: 3px;
}

.requests-content::-webkit-scrollbar-thumb:hover {
  background: rgba(0,0,0,0.2);
}
</style>