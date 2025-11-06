<template>
  <div 
    class="unified-side-panel"
    :class="{ 
      'mobile': isMobile,
      'expanded': showRequestsSheet
    }"
    :style="{ width: sidebarWidth + 'px' }"
  >
    <!-- Unified Header with View Switcher -->
    <div class="panel-header">
      <div class="view-switcher">
        <button 
          class="view-tab"
          :class="{ active: activeView === 'helper-requests' }"
          @click="$emit('view-change', 'helper-requests')"
        >
          <svg class="tab-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
          </svg>
          <span class="tab-text">Helper</span>
          <span class="request-count">{{ totalRequests }}</span>
        </button>

        <button 
          class="view-tab"
          :class="{ active: activeView === 'seeker-tasks' }"
          @click="$emit('view-change', 'seeker-tasks')"
        >
          <svg class="tab-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
          </svg>
          <span class="tab-text">Meine Anfragen</span>
          <span class="request-count">{{ seekerTasks.length }}</span>
        </button>

        <button 
          class="view-tab"
          :class="{ active: activeView === 'seeker-favorites' }"
          @click="$emit('view-change', 'seeker-favorites')"
        >
          <svg class="tab-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
          </svg>
          <span class="tab-text">Favoriten</span>
          <span class="request-count">{{ seekerFavorites.length }}</span>
        </button>
      </div>

      <button 
        class="close-panel-btn"
        @click="$emit('toggle-sheet')"
      >
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>

    <!-- Helper Requests View -->
    <div v-if="activeView === 'helper-requests'" class="panel-content">
      <HelperRequestsView 
        :selected-filter="selectedFilter"
        :filtered-requests="filteredRequests"
        :map-requests="mapRequests"
        :visible-requests="visibleRequests"
        @filter-change="$emit('filter-change', $event)"
        @radius-change="$emit('radius-change', $event)"
        @city-change="$emit('city-change', $event)"
        @focus-request="$emit('focus-request', $event)"
        @contact-helper="$emit('contact-helper', $event)"
        @decline-request="$emit('decline-request', $event)"
      />
    </div>

    <!-- Seeker Tasks View -->
    <div v-else-if="activeView === 'seeker-tasks'" class="panel-content">
      <SeekerTasksView 
        :seeker-tasks="seekerTasks"
        @create-task="$emit('create-task')"
        @view-task="$emit('view-task', $event)"
      />
    </div>

    <!-- Seeker Favorites View -->
    <div v-else-if="activeView === 'seeker-favorites'" class="panel-content">
      <SeekerFavoritesView 
        :seeker-favorites="seekerFavorites"
        @open-favorites="$emit('open-favorites')"
        @open-history="$emit('open-history')"
      />
    </div>

    <!-- Resize Handle -->
    <div 
      v-if="!isMobile"
      class="resize-handle"
      @mousedown="$emit('start-resize', $event)"
    ></div>
  </div>
</template>

<script setup>
import HelperRequestsView from './views/HelperRequestsView.vue'
import SeekerTasksView from './views/SeekerTasksView.vue'
import SeekerFavoritesView from './views/SeekerFavoritesView.vue'

defineProps({
  showRequestsSheet: Boolean,
  isMobile: Boolean,
  sidebarWidth: Number,
  selectedFilter: String,
  filteredRequests: Array,
  mapRequests: Array,
  visibleRequests: Array,
  totalRequests: Number,
  seekerTasks: Array,
  seekerFavorites: Array,
  activeView: {
    type: String,
    default: 'helper-requests'
  }
})

defineEmits([
  'toggle-sheet',
  'start-resize',
  'filter-change',
  'radius-change',
  'city-change',
  'focus-request',
  'contact-helper',
  'decline-request',
  'view-change',
  'create-task',
  'view-task',
  'open-favorites',
  'open-history'
])
</script>

<style scoped>
/* Unified Side Panel (Helper + Seeker) */
.unified-side-panel {
  position: fixed;
  top: 80px;
  right: 0;
  bottom: 0;
  background: white;
  border-left: 1px solid rgba(0,0,0,0.1);
  box-shadow: -4px 0 16px rgba(0,0,0,0.1);
  transform: translateX(100%);
  transition: transform 0.3s ease;
  z-index: 20;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.unified-side-panel.expanded {
  transform: translateX(0);
}

.unified-side-panel.mobile {
  width: 100% !important;
  top: 80px;
}

/* Panel Header with View Switcher */
.panel-header {
  padding: 1rem;
  border-bottom: 1px solid rgba(0,0,0,0.1);
  background: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
}

.view-switcher {
  display: flex;
  gap: 0.5rem;
  flex: 1;
}

.view-tab {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border: 1px solid rgba(95, 111, 85, 0.2);
  border-radius: 8px;
  background: white;
  color: #5F6F55;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.875rem;
  font-weight: 500;
  flex: 1;
  justify-content: center;
  min-width: 0;
}

.view-tab:hover {
  background: rgba(95, 111, 85, 0.1);
  border-color: #5F6F55;
}

.view-tab.active {
  background: #5F6F55;
  color: white;
  border-color: #5F6F55;
}

.tab-icon {
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
}

.tab-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.request-count {
  background: rgba(255, 255, 255, 0.2);
  color: inherit;
  border-radius: 50%;
  width: 1.25rem;
  height: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 600;
  flex-shrink: 0;
}

.view-tab.active .request-count {
  background: rgba(255, 255, 255, 0.3);
}

.close-panel-btn {
  width: 2rem;
  height: 2rem;
  border: none;
  border-radius: 6px;
  background: rgba(0, 0, 0, 0.1);
  color: #6b7280;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  flex-shrink: 0;
  margin-left: 1rem;
}

.close-panel-btn:hover {
  background: rgba(0, 0, 0, 0.2);
  color: #374151;
}

.close-panel-btn svg {
  width: 1rem;
  height: 1rem;
}

/* Panel Content */
.panel-content {
  flex: 1;
  overflow-y: auto;
}

/* Resize Handle */
.resize-handle {
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  cursor: col-resize;
  background: transparent;
  transition: background 0.2s ease;
}

.resize-handle:hover {
  background: rgba(95, 111, 85, 0.3);
}

.resize-handle:active {
  background: rgba(95, 111, 85, 0.5);
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .panel-header {
    padding: 0.75rem;
  }
  
  .view-switcher {
    gap: 0.25rem;
  }
  
  .view-tab {
    padding: 0.375rem 0.5rem;
    font-size: 0.75rem;
  }
  
  .tab-text {
    display: none;
  }
  
  .tab-icon {
    width: 0.875rem;
    height: 0.875rem;
  }
  
  .request-count {
    width: 1rem;
    height: 1rem;
    font-size: 0.625rem;
  }
  
  .close-panel-btn {
    width: 1.75rem;
    height: 1.75rem;
    margin-left: 0.5rem;
  }
}

/* Scrollbar styling */
.panel-content::-webkit-scrollbar {
  width: 6px;
}

.panel-content::-webkit-scrollbar-track {
  background: rgba(0,0,0,0.1);
  border-radius: 3px;
}

.panel-content::-webkit-scrollbar-thumb {
  background: rgba(0,0,0,0.2);
  border-radius: 3px;
}

.panel-content::-webkit-scrollbar-thumb:hover {
  background: rgba(0,0,0,0.3);
}
</style>