<template>
  <!-- Mobile Sheet -->
  <div 
    v-if="isMobile"
    :style="'position: fixed; bottom: 0; left: 0; right: 0; background: white; transform: translateY(' + (showRequestsSheet ? '0' : '70%') + '); transition: transform 0.3s ease; z-index: 30; border-top-left-radius: 20px; border-top-right-radius: 20px; box-shadow: 0 -4px 20px rgba(0,0,0,0.15);'"
  >
    <!-- Handle -->
    <div style="display: flex; justify-content: center; padding: 1rem 0 0.5rem 0;">
      <div 
        @click="$emit('toggle-sheet')"
        style="width: 40px; height: 4px; background: #ddd; border-radius: 2px; cursor: pointer;"
      ></div>
    </div>
    
    <!-- Content -->
    <div style="padding: 0 1.5rem 2rem 1.5rem; max-height: 70vh; overflow-y: auto;">
      <OrganizationRequestsContent 
        :selectedFilter="selectedFilter"
        :filteredRequests="filteredRequests"
        :orgRequests="orgRequests"
        :visibleRequests="visibleRequests"
        :totalRequests="totalRequests"
        @filter-change="$emit('filter-change', $event)"
        @radius-change="$emit('radius-change', $event)"
        @city-change="$emit('city-change', $event)"
        @focus-request="$emit('focus-request', $event)"
        @manage-member="$emit('manage-member', $event)"
        @decline-request="$emit('decline-request', $event)"
      />
    </div>
  </div>

  <!-- Desktop Sidebar -->
  <div 
    v-if="!isMobile && showRequestsSheet"
    :style="'position: fixed; top: 80px; right: 0; bottom: 0; width: ' + sidebarWidth + 'px; background: white; box-shadow: -4px 0 20px rgba(0,0,0,0.15); z-index: 30; display: flex; flex-direction: column;'"
  >
    <!-- Resize Handle -->
    <div 
      @mousedown="$emit('start-resize', $event)"
      style="position: absolute; left: 0; top: 0; bottom: 0; width: 4px; cursor: ew-resize; background: transparent; z-index: 31;"
      onmouseover="this.style.background='rgba(95, 111, 85, 0.3)'"
      onmouseout="this.style.background='transparent'"
    ></div>

    <!-- Header -->
    <div style="padding: 1.5rem; border-bottom: 1px solid #eee; background: #f8f9fa;">
      <div style="display: flex; justify-content: between; align-items: center;">
        <h3 style="margin: 0; color: #474747; font-family: 'Comic Sans MS', cursive, sans-serif;">Organisations-Anfragen</h3>
        <button 
          @click="$emit('toggle-sheet')"
          style="background: none; border: none; cursor: pointer; padding: 0.5rem; color: #8F8B82;"
        >
          <svg style="width: 1.5rem; height: 1.5rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Content -->
    <div style="flex: 1; overflow-y: auto; padding: 1.5rem;">
      <OrganizationRequestsContent 
        :selectedFilter="selectedFilter"
        :filteredRequests="filteredRequests"
        :orgRequests="orgRequests"
        :visibleRequests="visibleRequests"
        :totalRequests="totalRequests"
        @filter-change="$emit('filter-change', $event)"
        @radius-change="$emit('radius-change', $event)"
        @city-change="$emit('city-change', $event)"
        @focus-request="$emit('focus-request', $event)"
        @manage-member="$emit('manage-member', $event)"
        @decline-request="$emit('decline-request', $event)"
      />
    </div>
  </div>
</template>

<script setup>
import OrganizationRequestsContent from './OrganizationRequestsContent.vue'

defineProps({
  showRequestsSheet: Boolean,
  isMobile: Boolean,
  sidebarWidth: Number,
  selectedFilter: String,
  filteredRequests: Array,
  orgRequests: Array,
  visibleRequests: Array,
  totalRequests: Number
})

defineEmits([
  'toggle-sheet',
  'start-resize',
  'filter-change',
  'radius-change',
  'city-change',
  'focus-request',
  'manage-member',
  'decline-request'
])
</script>