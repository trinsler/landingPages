<template>
  <div class="helper-requests-view">
    <!-- Search Section -->
    <div class="search-section">
      <div class="search-header">
        <svg class="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
        <span class="search-title">Standort & Suchradius</span>
      </div>
      
      <!-- City Search -->
      <div class="city-search">
        <input 
          type="text"
          v-model="searchCity"
          placeholder="Stadt oder Ort eingeben..."
          class="city-input"
          @input="$emit('city-change', searchCity)"
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
          @input="$emit('radius-change', Number(searchRadius))"
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
          @click="$emit('filter-change', filter.value)"
          class="filter-btn"
          :class="{ active: selectedFilter === filter.value }"
        >
          {{ filter.label }}
        </button>
      </div>
    </div>

    <!-- Requests List -->
    <div class="requests-section">
      <div class="section-header">
        <h4 class="section-title">Verfügbare Aufträge</h4>
        <span class="request-count">{{ filteredRequests.length }}</span>
      </div>

      <div v-if="filteredRequests.length > 0" class="requests-list">
        <div 
          v-for="request in filteredRequests"
          :key="request.id"
          class="request-item"
          @click="$emit('focus-request', request)"
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
              @click.stop="$emit('contact-helper', request)"
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
              </svg>
            </button>
            <button 
              class="decline-btn"
              @click.stop="$emit('decline-request', request)"
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
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
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  selectedFilter: String,
  filteredRequests: Array,
  mapRequests: Array,
  visibleRequests: Array
})

defineEmits([
  'filter-change',
  'radius-change', 
  'city-change',
  'focus-request',
  'contact-helper',
  'decline-request'
])

const searchCity = ref('Winnweiler')
const searchRadius = ref(10)

const filters = [
  { value: 'all', label: 'Alle' },
  { value: 'shopping', label: 'Einkaufen' },
  { value: 'gardening', label: 'Garten' },
  { value: 'cleaning', label: 'Reinigung' },
  { value: 'transport', label: 'Transport' }
]
</script>

<style scoped>
/* Helper Requests View */
.helper-requests-view {
  display: flex;
  flex-direction: column;
  height: 100%;
}

/* Search Section */
.search-section {
  padding: 1rem;
  background: #f8fafc;
  border-bottom: 1px solid #e5e7eb;
}

.search-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.search-icon {
  width: 1rem;
  height: 1rem;
  color: #5F6F55;
}

.search-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #474747;
}

.city-search {
  margin-bottom: 0.75rem;
}

.city-input {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.875rem;
  outline: none;
  transition: border-color 0.2s;
}

.city-input:focus {
  border-color: #5F6F55;
}

.radius-section {
  display: flex;
  flex-direction: column;
}

.radius-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.radius-label {
  font-size: 0.75rem;
  color: #6b7280;
}

.radius-value {
  font-size: 0.875rem;
  font-weight: 600;
  color: #5F6F55;
}

.radius-slider {
  width: 100%;
  height: 6px;
  background: #e5e7eb;
  border-radius: 3px;
  outline: none;
  -webkit-appearance: none;
}

.radius-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 16px;
  height: 16px;
  background: #5F6F55;
  border-radius: 50%;
  cursor: pointer;
}

.radius-markers {
  display: flex;
  justify-content: space-between;
  margin-top: 0.25rem;
}

.marker-text {
  font-size: 0.625rem;
  color: #9ca3af;
}

/* Filter Section */
.filter-section {
  padding: 1rem;
  border-bottom: 1px solid #f3f4f6;
}

.filter-scroll {
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
}

.filter-btn {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
  border: 1px solid #e5e7eb;
  background: #f9fafb;
  color: #474747;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  flex-shrink: 0;
}

.filter-btn:hover {
  border-color: #5F6F55;
  background: rgba(95, 111, 85, 0.1);
}

.filter-btn.active {
  background: #5F6F55;
  color: white;
  border-color: #5F6F55;
}

/* Requests Section */
.requests-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid #f3f4f6;
}

.section-title {
  font-size: 1rem;
  font-weight: 600;
  color: #374151;
  margin: 0;
}

.request-count {
  background: #5F6F55;
  color: white;
  border-radius: 50%;
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 600;
}

/* Requests List */
.requests-list {
  flex: 1;
  overflow-y: auto;
  padding: 0.5rem;
}

.request-item {
  display: flex;
  gap: 0.75rem;
  padding: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  margin-bottom: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
  background: white;
}

.request-item:hover {
  border-color: #5F6F55;
  box-shadow: 0 2px 8px rgba(95, 111, 85, 0.1);
  transform: translateY(-1px);
}

.request-header {
  position: relative;
  flex-shrink: 0;
}

.request-icon {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
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
  width: 1.25rem;
  height: 1.25rem;
}

.request-priority {
  position: absolute;
  top: -2px;
  right: -2px;
}

.priority-dot {
  width: 8px;
  height: 8px;
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
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  margin: 0 0 0.25rem 0;
  line-height: 1.2;
}

.request-details {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
  margin-bottom: 0.5rem;
}

.request-client {
  color: #5F6F55;
  font-weight: 500;
  font-size: 0.75rem;
}

.request-area {
  color: #6b7280;
  font-size: 0.75rem;
}

.request-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.request-payment {
  font-weight: 600;
  color: #22c55e;
  font-size: 0.875rem;
}

.request-distance {
  color: #6b7280;
  font-size: 0.75rem;
}

.request-actions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex-shrink: 0;
}

.contact-btn,
.decline-btn {
  width: 2rem;
  height: 2rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.contact-btn {
  background: #5F6F55;
  color: white;
}

.contact-btn:hover {
  background: #4a5544;
  transform: translateY(-1px);
}

.decline-btn {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}

.decline-btn:hover {
  background: #ef4444;
  color: white;
  transform: translateY(-1px);
}

.contact-btn svg,
.decline-btn svg {
  width: 1rem;
  height: 1rem;
}

/* Empty State */
.empty-state {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
}

.empty-icon {
  width: 3rem;
  height: 3rem;
  color: #9ca3af;
  margin-bottom: 1rem;
}

.empty-icon svg {
  width: 100%;
  height: 100%;
}

.empty-title {
  font-size: 1rem;
  font-weight: 600;
  color: #374151;
  margin: 0 0 0.5rem 0;
}

.empty-text {
  color: #6b7280;
  font-size: 0.875rem;
  margin: 0;
  line-height: 1.5;
}

/* Scrollbar styling */
.requests-list::-webkit-scrollbar {
  width: 6px;
}

.requests-list::-webkit-scrollbar-track {
  background: rgba(0,0,0,0.1);
  border-radius: 3px;
}

.requests-list::-webkit-scrollbar-thumb {
  background: rgba(0,0,0,0.2);
  border-radius: 3px;
}

.requests-list::-webkit-scrollbar-thumb:hover {
  background: rgba(0,0,0,0.3);
}
</style>