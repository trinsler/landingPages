<template>
  <div class="modern-dashboard">
    <!-- Glass Morphism Background -->
    <div class="dashboard-background">
      <div class="background-gradient"></div>
      <div class="background-pattern"></div>
    </div>

    
    

    <!-- Main Content Grid -->
    <div class="main-content">
      <!-- Interactive Map Section -->
      <div class="map-section">
        <div class="section-card">
          <div class="section-header">
            <h2 class="section-title">Helfer in deiner Nähe</h2>
            <div class="location-info">
              <svg class="location-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              <span class="location-text">{{ currentLocation }}</span>
            </div>
          </div>
          
          <div class="map-container">
            <MapContainer 
              :show-requests-sheet="false"
              :is-mobile="isMobile"
              :sidebar-width="0"
              class="modern-map"
              @location-status-updated="handleLocationUpdate"
              @user-location-updated="handleUserLocationUpdate"
            />
            
            <!-- Map Controls Overlay -->
            <div class="map-controls">
              <div class="control-group">
                <button 
                  @click="refreshMap"
                  class="control-btn"
                  :disabled="isRefreshing"
                >
                  <svg v-if="!isRefreshing" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                  </svg>
                  <div v-else class="loading-spinner"></div>
                </button>
                
                <button @click="centerMapOnUser" class="control-btn">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                </button>
              </div>
              
              <div class="radius-indicator">
                <span class="radius-text">Radius: {{ searchRadius }}km</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Side Panel -->
      <div class="side-panel">
        <!-- Quick Actions -->
        <div class="quick-actions-section">
          <div class="section-card">
            <h3 class="section-title">Schnell Aktionen</h3>
            <div class="action-grid">
              <button 
                @click="$emit('navigate', 'helper-tasks')"
                class="action-btn secondary"
              >
                <div class="action-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </div>
                <span class="action-text">Aufträge finden</span>
              </button>
              
              <button 
                @click="$emit('navigate', 'chat')"
                class="action-btn secondary"
              >
                <div class="action-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.955 8.955 0 01-2.707-.408l-3.005.606C6.581 20.365 6 19.7 6 19c0-.28.115-.532.308-.742l.813-3.262A8.002 8.002 0 013 12a8 8 0 018-8 8 8 0 018 8z"/>
                  </svg>
                </div>
                <span class="action-text">Chat</span>
              </button>
              
              <button 
                @click="$emit('navigate', 'seeker-favorites')"
                class="action-btn secondary"
              >
                <div class="action-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                  </svg>
                </div>
                <span class="action-text">Favoriten</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Recent Activity -->
       
      </div>
    </div>

    <!-- Floating Action Buttons -->
    <div class="floating-actions">
      <button 
        @click="toggleSearchPanel"
        class="fab"
        :class="{ active: showSearchPanel }"
      >
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
      </button>
      
      <button 
        @click="$emit('navigate', 'seeker-create')"
        class="fab primary"
      >
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
        </svg>
      </button>
    </div>

    <!-- Search Panel (Slide-up) -->
    <div v-if="showSearchPanel" class="search-panel" @click.self="showSearchPanel = false">
      <div class="search-content" @click.stop>
        <div class="search-header">
          <h3 class="search-title">Helfer suchen</h3>
          <button @click="showSearchPanel = false" class="search-close">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        
        <div class="search-form">
          <div class="form-group">
            <label class="form-label">Suchbegriff</label>
            <input 
              v-model="searchQuery"
              type="text" 
              class="form-input"
              placeholder="z.B. Einkaufen, Gartenarbeit..."
            />
          </div>
          
          <div class="form-group">
            <label class="form-label">Umkreis</label>
            <div class="radius-selector">
              <input 
                v-model="searchRadius"
                type="range" 
                min="1" 
                max="50" 
                class="range-slider"
              />
              <div class="radius-display">{{ searchRadius }} km</div>
            </div>
          </div>
          
          <button @click="performSearch" class="search-btn">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            Suchen
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import MapContainer from '~/components/pwa/helper/dashboardPage/MapContainer.vue'

const emit = defineEmits(['navigate', 'contact-helper', 'accept-request'])

// Props
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

// Reactive state
const isRefreshing = ref(false)
const showSearchPanel = ref(false)
const searchQuery = ref('')
const searchRadius = ref(10)
const currentLocation = ref('Winnweiler')
const totalHelpers = ref(12)
const activeJobs = ref(3)

// Mock data
const recentActivities = ref([
  {
    id: 1,
    type: 'job_created',
    text: 'Job "Einkaufen" erstellt',
    time: 'vor 2 Stunden'
  },
  {
    id: 2,
    type: 'helper_found',
    text: 'Helfer für Gartenarbeit gefunden',
    time: 'vor 5 Stunden'
  },
  {
    id: 3,
    type: 'job_completed',
    text: 'Job "Begleitung" abgeschlossen',
    time: 'vor 1 Tag'
  }
])

const popularCategories = ref([
  {
    id: 'shopping',
    name: 'Einkaufen',
    icon: '/icons/einkaufen.svg',
    color: '#5F6F55',
    count: 8
  },
  {
    id: 'gardening',
    name: 'Gartenarbeit',
    icon: '/icons/gartenarbeit.svg',
    color: '#22c55e',
    count: 5
  },
  {
    id: 'cooking',
    name: 'Kochen',
    icon: '/icons/kochen.svg',
    color: '#f59e0b',
    count: 3
  },
  {
    id: 'cleaning',
    name: 'Putzen',
    icon: '/icons/putzen.svg',
    color: '#3b82f6',
    count: 4
  }
])

// Methods
const refreshMap = async () => {
  isRefreshing.value = true
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    // Refresh logic here
  } finally {
    isRefreshing.value = false
  }
}

const centerMapOnUser = () => {
  // Center map on user location
  console.log('Centering map on user location')
}

const toggleSearchPanel = () => {
  showSearchPanel.value = !showSearchPanel.value
}

const performSearch = () => {
  console.log('Searching for:', searchQuery.value, 'within', searchRadius.value, 'km')
  showSearchPanel.value = false
  // Navigate to helper tasks with search params
  emit('navigate', 'helper-tasks')
}

const navigateToCategory = (categoryId) => {
  // Navigate to category-specific jobs
  console.log('Navigate to category:', categoryId)
}

const handleLocationUpdate = (status) => {
  console.log('Location status updated:', status)
}

const handleUserLocationUpdate = (location) => {
  console.log('User location updated:', location)
}

onMounted(() => {
  // Initialize dashboard
  console.log('Modern dashboard mounted')
})
</script>

<style scoped>
/* Modern Dashboard Styles */
.modern-dashboard {
  min-height: 100vh;
  width: 100%;
  max-width: 100vw;
  position: relative;
  overflow-x: hidden;
  box-sizing: border-box;
}

/* Background */
.dashboard-background {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
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
    #94a3b8 100%
  );
}

.background-pattern {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    radial-gradient(circle at 20% 20%, rgba(95, 111, 85, 0.05) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(190, 205, 163, 0.05) 0%, transparent 50%),
    radial-gradient(circle at 40% 60%, rgba(143, 139, 130, 0.03) 0%, transparent 50%);
}

/* Header */
.dashboard-header {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding: 2rem 1.5rem;
  position: sticky;
  top: 0;
  z-index: 40;
  width: 100%;
  max-width: 100vw;
  box-sizing: border-box;
  overflow-x: hidden;
}

.header-content {
  width: 100%;
  max-width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  box-sizing: border-box;
}

.welcome-section h1 {
  color: #1e293b;
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
}

.welcome-section p {
  color: #64748b;
  font-size: 1.125rem;
  margin: 0;
}

.quick-stats {
  display: flex;
  gap: 1.5rem;
}

.stat-card {
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 16px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  min-width: 140px;
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.stat-icon {
  width: 3rem;
  height: 3rem;
  background: linear-gradient(135deg, #5F6F55, #BECDA3);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.stat-icon svg {
  width: 1.5rem;
  height: 1.5rem;
}

.stat-number {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  line-height: 1;
  margin-bottom: 0.25rem;
}

.stat-label {
  font-size: 0.875rem;
  color: #64748b;
  font-weight: 500;
}

/* Main Content */
.main-content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  width: 100%;
  max-width: 100vw;
  padding: 2rem 1.5rem 6rem;
  box-sizing: border-box;
  overflow-x: hidden;
}

/* Section Cards */
.section-card {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 24px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.section-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.section-title {
  color: #1e293b;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
}

.location-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #64748b;
  font-size: 0.875rem;
}

.location-icon {
  width: 1rem;
  height: 1rem;
}

/* Map Section */
.map-section {
  min-height: 600px;
}

.map-container {
  position: relative;
  height: 500px;
  border-radius: 16px;
  overflow: hidden;
  background: #f1f5f9;
}

.modern-map {
  width: 100%;
  height: 100%;
}

.map-controls {
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: flex-end;
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.control-btn {
  width: 3rem;
  height: 3rem;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #475569;
}

.control-btn:hover {
  background: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.control-btn svg {
  width: 1.25rem;
  height: 1.25rem;
}

.loading-spinner {
  width: 1.25rem;
  height: 1.25rem;
  border: 2px solid #e2e8f0;
  border-top: 2px solid #5F6F55;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.radius-indicator {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  padding: 0.5rem 1rem;
  font-size: 0.75rem;
  color: #475569;
  font-weight: 500;
}

/* Side Panel - Now part of single column layout */
.side-panel {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  box-sizing: border-box;
}

/* Quick Actions */
.action-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.action-btn {
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 16px;
  padding: 1.5rem 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  color: #475569;
}

.action-btn:hover {
  background: white;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.action-btn.primary {
  background: linear-gradient(135deg, #5F6F55, #4a5c44);
  color: white;
  grid-column: span 2;
}

.action-btn.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(95, 111, 85, 0.3);
}

.action-icon {
  width: 2.5rem;
  height: 2.5rem;
  background: rgba(95, 111, 85, 0.1);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.action-btn.primary .action-icon {
  background: rgba(255, 255, 255, 0.2);
}

.action-icon svg {
  width: 1.25rem;
  height: 1.25rem;
}

.action-text {
  font-weight: 600;
  font-size: 0.875rem;
}

/* Activity List */
.activity-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.activity-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.4);
  border-radius: 12px;
  transition: all 0.3s ease;
}

.activity-item:hover {
  background: rgba(255, 255, 255, 0.6);
}

.activity-icon {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.activity-icon.job_created {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
}

.activity-icon.helper_found {
  background: linear-gradient(135deg, #22c55e, #16a34a);
}

.activity-icon.job_completed {
  background: linear-gradient(135deg, #5F6F55, #4a5c44);
}

.activity-icon svg {
  width: 1.25rem;
  height: 1.25rem;
}

.activity-content {
  flex: 1;
}

.activity-text {
  color: #1e293b;
  font-weight: 500;
  margin: 0 0 0.25rem 0;
}

.activity-time {
  color: #64748b;
  font-size: 0.75rem;
}

/* Categories */
.category-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.category-item {
  background: rgba(255, 255, 255, 0.4);
  border-radius: 12px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  text-align: center;
}

.category-item:hover {
  background: rgba(255, 255, 255, 0.6);
  transform: translateY(-2px);
}

.category-icon {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.category-img {
  width: 1.5rem;
  height: 1.5rem;
  filter: brightness(0) invert(1);
}

.category-name {
  color: #1e293b;
  font-weight: 500;
  font-size: 0.875rem;
}

.category-count {
  color: #64748b;
  font-size: 0.75rem;
}

/* Floating Actions */
.floating-actions {
  position: fixed;
  bottom: 6rem;
  right: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  z-index: 30;
}

.fab {
  width: 4rem;
  height: 4rem;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.fab:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.fab.primary {
  background: linear-gradient(135deg, #5F6F55, #4a5c44);
  color: white;
}

.fab svg {
  width: 1.5rem;
  height: 1.5rem;
}

/* Search Panel */
.search-panel {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  z-index: 50;
  display: flex;
  align-items: flex-end;
}

.search-content {
  background: white;
  border-radius: 24px 24px 0 0;
  padding: 2rem;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
}

.search-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.search-title {
  color: #1e293b;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
}

.search-close {
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  color: #64748b;
}

.search-close svg {
  width: 1.5rem;
  height: 1.5rem;
}

.search-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  color: #374151;
  font-weight: 500;
  font-size: 0.875rem;
}

.form-input {
  padding: 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-input:focus {
  outline: none;
  border-color: #5F6F55;
  box-shadow: 0 0 0 3px rgba(95, 111, 85, 0.1);
}

.radius-selector {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.range-slider {
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: #e5e7eb;
  outline: none;
  -webkit-appearance: none;
}

.range-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #5F6F55;
  cursor: pointer;
}

.radius-display {
  text-align: center;
  color: #5F6F55;
  font-weight: 600;
}

.search-btn {
  background: linear-gradient(135deg, #5F6F55, #4a5c44);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 1rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.search-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(95, 111, 85, 0.3);
}

.search-btn svg {
  width: 1.25rem;
  height: 1.25rem;
}

/* Responsive Design - Enhanced */

/* Large Desktops (1400px+) */
@media (min-width: 1400px) {
  .dashboard-header {
    padding: 3rem 2rem;
  }
  
  .welcome-section h1 {
    font-size: 2.5rem;
  }
  
  .main-content {
    grid-template-columns: 2fr 1fr;
    gap: 2rem;
    padding: 2rem;
    max-width: 1400px;
    margin: 0 auto;
  }
  
  .section-card {
    padding: 2.5rem;
  }
}

/* Desktops (1024px - 1399px) */
@media (max-width: 1399px) and (min-width: 1024px) {
  .main-content {
    grid-template-columns: 2fr 1fr;
    gap: 1.5rem;
    padding: 2rem;
  }
  
  .side-panel {
    gap: 1.5rem;
  }
}

/* Tablets Landscape (768px - 1023px) */
@media (max-width: 1023px) and (min-width: 768px) {
  .main-content {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding: 1.5rem;
  }
  
  .side-panel {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
  
  .action-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  
  .header-content {
    gap: 1.5rem;
  }
  
  .dashboard-header {
    padding: 1.5rem;
  }
  
  .section-card {
    padding: 1.75rem;
  }
}

/* Tablets Portrait (480px - 767px) */
@media (max-width: 767px) and (min-width: 480px) {
  .header-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5rem;
  }
  
  .quick-stats {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
  
  .stat-card {
    min-width: 0;
    padding: 1.25rem;
  }
  
  .welcome-section h1 {
    font-size: 1.75rem;
  }
  
  .welcome-section p {
    font-size: 1.125rem;
  }
  
  .main-content {
    grid-template-columns: 1fr;
    gap: 1.25rem;
    padding: 1.25rem 1rem 6rem;
  }
  
  .side-panel {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }
  
  .action-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }
  
  .section-card {
    padding: 1.75rem;
  }
  
  .dashboard-header {
    padding: 1.5rem 1rem;
  }
  
  .floating-actions {
    bottom: 5.5rem;
    right: 1rem;
    gap: 0.75rem;
  }
  
  .fab {
    width: 3.75rem;
    height: 3.75rem;
  }
  
  .map-controls {
    top: 0.75rem;
    right: 0.75rem;
  }
  
  .control-btn {
    width: 2.75rem;
    height: 2.75rem;
  }
  
  .category-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .search-content {
    padding: 1.75rem;
  }
}

/* Mobile Phones (320px - 479px) */
@media (max-width: 479px) {
  .dashboard-header {
    padding: 1rem 0.75rem;
  }
  
  .header-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.25rem;
  }
  
  .welcome-section h1 {
    font-size: 1.5rem;
    line-height: 1.2;
  }
  
  .welcome-section p {
    font-size: 1rem;
  }
  
  .quick-stats {
    width: 100%;
    flex-direction: row;
    gap: 0.75rem;
  }
  
  .stat-card {
    flex: 1;
    padding: 1rem;
    min-width: 0;
  }
  
  .stat-icon {
    width: 2.5rem;
    height: 2.5rem;
  }
  
  .stat-icon svg {
    width: 1.25rem;
    height: 1.25rem;
  }
  
  .stat-number {
    font-size: 1.25rem;
  }
  
  .stat-label {
    font-size: 0.75rem;
  }
  
  .main-content {
    grid-template-columns: 1fr;
    gap: 1rem;
    padding: 1rem 0.75rem 6rem;
    max-width: 100vw;
    overflow-x: hidden;
  }
  
  .side-panel {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .section-card {
    padding: 1.5rem;
    border-radius: 20px;
  }
  
  .section-title {
    font-size: 1.25rem;
  }
  
  .map-section {
    min-height: 400px;
  }
  
  .map-container {
    height: 350px;
    border-radius: 16px;
  }
  
  .map-controls {
    top: 0.5rem;
    right: 0.5rem;
    gap: 0.5rem;
  }
  
  .control-btn {
    width: 2.5rem;
    height: 2.5rem;
  }
  
  .control-btn svg {
    width: 1rem;
    height: 1rem;
  }
  
  .radius-indicator {
    padding: 0.375rem 0.75rem;
    font-size: 0.625rem;
  }
  
  .action-grid {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
  
  .action-btn {
    padding: 1.25rem 1rem;
    flex-direction: row;
    justify-content: flex-start;
    text-align: left;
  }
  
  .action-btn.primary {
    grid-column: span 1;
    flex-direction: row;
    justify-content: center;
    text-align: center;
  }
  
  .action-icon {
    width: 2rem;
    height: 2rem;
  }
  
  .action-icon svg {
    width: 1rem;
    height: 1rem;
  }
  
  .action-text {
    font-size: 0.875rem;
  }
  
  .category-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }
  
  .category-item {
    padding: 0.875rem;
  }
  
  .category-icon {
    width: 2rem;
    height: 2rem;
  }
  
  .category-img {
    width: 1.25rem;
    height: 1.25rem;
  }
  
  .category-name {
    font-size: 0.8125rem;
  }
  
  .category-count {
    font-size: 0.6875rem;
  }
  
  .activity-item {
    padding: 0.875rem;
  }
  
  .activity-icon {
    width: 2rem;
    height: 2rem;
  }
  
  .activity-icon svg {
    width: 1rem;
    height: 1rem;
  }
  
  .activity-text {
    font-size: 0.875rem;
  }
  
  .activity-time {
    font-size: 0.6875rem;
  }
  
  .floating-actions {
    bottom: 5rem;
    right: 0.75rem;
    gap: 0.5rem;
  }
  
  .fab {
    width: 3.25rem;
    height: 3.25rem;
  }
  
  .fab svg {
    width: 1.125rem;
    height: 1.125rem;
  }
  
  .search-panel {
    padding-bottom: env(safe-area-inset-bottom);
  }
  
  .search-content {
    padding: 1.5rem;
    border-radius: 20px 20px 0 0;
    max-height: 85vh;
  }
  
  .search-title {
    font-size: 1.25rem;
  }
  
  .search-header {
    margin-bottom: 1.5rem;
  }
  
  .form-input {
    padding: 0.875rem;
    font-size: 1rem;
  }
  
  .search-btn {
    padding: 0.875rem;
    font-size: 1rem;
  }
}

/* Ultra Small Mobile (280px - 319px) */
@media (max-width: 319px) {
  .dashboard-header {
    padding: 0.75rem;
  }
  
  .welcome-section h1 {
    font-size: 1.375rem;
  }
  
  .quick-stats {
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .stat-card {
    padding: 0.875rem;
  }
  
  .stat-icon {
    width: 2.25rem;
    height: 2.25rem;
  }
  
  .main-content {
    padding: 0.75rem 0.5rem 6rem;
    gap: 0.875rem;
  }
  
  .section-card {
    padding: 1.25rem;
    border-radius: 16px;
  }
  
  .map-container {
    height: 300px;
  }
  
  .action-btn {
    padding: 1rem 0.75rem;
  }
  
  .category-grid {
    grid-template-columns: 1fr;
  }
  
  .floating-actions {
    bottom: 4.75rem;
    right: 0.5rem;
  }
  
  .fab {
    width: 3rem;
    height: 3rem;
  }
  
  .fab svg {
    width: 1rem;
    height: 1rem;
  }
}
</style>