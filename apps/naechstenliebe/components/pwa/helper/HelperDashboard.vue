<template>
  <!-- Map Container Component -->
  <div :style="'position: relative; height: calc(100vh - 80px);'">
    <MapContainer 
      ref="mapContainer"
      :show-requests-sheet="showRequestsSheet"
      :is-mobile="isMobile"
      :sidebar-width="sidebarWidth"
      @location-status-updated="$emit('location-status-updated', $event)"
      @user-location-updated="$emit('user-location-updated', $event)"
    />
    
    <!-- Status Buttons Component -->
    <StatusButtons 
      :is-available="isAvailable"
      :location-status="locationStatus"
      @toggle-availability="$emit('toggle-availability')"
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
      @toggle-sheet="$emit('toggle-sheet')"
      @start-resize="$emit('start-resize', $event)"
      @filter-change="$emit('filter-change', $event)"
      @radius-change="$emit('radius-change', $event)"
      @city-change="$emit('city-change', $event)"
      @focus-request="$emit('focus-request', $event)"
      @contact-helper="$emit('contact-helper', $event)"
      @decline-request="$emit('decline-request', $event)"
    />
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted } from 'vue'
import MapContainer from './dashboardPage/MapContainer.vue'
import StatusButtons from './dashboardPage/StatusButtons.vue'
import RequestsSidePanel from './RequestsSidePanel.vue'

defineProps({
  showRequestsSheet: Boolean,
  isMobile: Boolean,
  sidebarWidth: Number,
  isAvailable: Boolean,
  locationStatus: String,
  selectedFilter: String,
  filteredRequests: Array,
  mapRequests: Array,
  visibleRequests: Array
})

defineEmits([
  'toggle-availability',
  'toggle-sheet', 
  'start-resize',
  'filter-change',
  'radius-change',
  'city-change',
  'focus-request',
  'contact-helper',
  'decline-request',
  'location-status-updated',
  'user-location-updated'
])

const mapContainer = ref(null)

onMounted(() => {
  // Initialize map markers after map is ready
  nextTick(() => {
    if (mapContainer.value) {
      mapContainer.value.addDummyRequestMarkers()
    }
  })
})
</script>