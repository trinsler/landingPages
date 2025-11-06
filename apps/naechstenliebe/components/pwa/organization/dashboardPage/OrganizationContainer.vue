<template>
  <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: #f0f0f0;">
    <!-- Organization Overview Map-like View -->
    <div style="position: relative; height: 100%; background: linear-gradient(45deg, #f5f5f5 25%, transparent 25%), linear-gradient(-45deg, #f5f5f5 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f5f5f5 75%), linear-gradient(-45deg, transparent 75%, #f5f5f5 75%); background-size: 20px 20px; background-position: 0 0, 0 10px, 10px -10px, -10px 0px;">
      
      <!-- Organization Stats Overlay -->
      <div style="position: absolute; top: 2rem; left: 2rem; background: rgba(255,255,255,0.95); padding: 1.5rem; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); min-width: 300px;">
        <h3 style="margin: 0 0 1rem 0; color: #474747; font-family: 'Comic Sans MS', cursive, sans-serif;">{{ organizationName }}</h3>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
          <div style="text-align: center; padding: 1rem; background: #5F6F55; color: white; border-radius: 8px;">
            <div style="font-size: 1.5rem; font-weight: bold; font-family: 'Comic Sans MS', cursive, sans-serif;">{{ stats.helpers }}</div>
            <div style="font-size: 0.8rem; font-family: 'Comic Sans MS', cursive, sans-serif;">Helfer</div>
          </div>
          <div style="text-align: center; padding: 1rem; background: #8FA66E; color: white; border-radius: 8px;">
            <div style="font-size: 1.5rem; font-weight: bold; font-family: 'Comic Sans MS', cursive, sans-serif;">{{ stats.seekers }}</div>
            <div style="font-size: 0.8rem; font-family: 'Comic Sans MS', cursive, sans-serif;">Hilfesuchende</div>
          </div>
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
          <div style="text-align: center; padding: 1rem; background: #474747; color: white; border-radius: 8px;">
            <div style="font-size: 1.5rem; font-weight: bold; font-family: 'Comic Sans MS', cursive, sans-serif;">{{ stats.activeTasks }}</div>
            <div style="font-size: 0.8rem; font-family: 'Comic Sans MS', cursive, sans-serif;">Aktive Aufträge</div>
          </div>
          <div style="text-align: center; padding: 1rem; background: #BECDA3; color: white; border-radius: 8px;">
            <div style="font-size: 1.5rem; font-weight: bold; font-family: 'Comic Sans MS', cursive, sans-serif;">{{ stats.completedTasks }}</div>
            <div style="font-size: 0.8rem; font-family: 'Comic Sans MS', cursive, sans-serif;">Abgeschlossen</div>
          </div>
        </div>
      </div>

      <!-- Organization Activity Markers -->
      <div 
        v-for="marker in activityMarkers" 
        :key="marker.id"
        :style="'position: absolute; left: ' + marker.x + 'px; top: ' + marker.y + 'px; transform: translate(-50%, -50%);'"
      >
        <div 
          style="width: 40px; height: 40px; background: #5F6F55; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; box-shadow: 0 2px 8px rgba(0,0,0,0.2); cursor: pointer; transition: transform 0.2s;"
          @click="handleMarkerClick(marker)"
          onmouseover="this.style.transform='scale(1.1)'"
          onmouseout="this.style.transform='scale(1)'"
        >
          <svg style="width: 20px; height: 20px;" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2L3 7v11h14V7l-7-5zM8 16H6v-4h2v4zm4 0h-2v-4h2v4zm4 0h-2v-4h2v4z"/>
          </svg>
        </div>
      </div>

      <!-- Center Action Button -->
      <div style="position: absolute; bottom: 2rem; left: 50%; transform: translateX(-50%);">
        <button 
          @click="$emit('toggle-management')"
          style="background: #5F6F55; color: white; border: none; padding: 1rem 2rem; border-radius: 50px; font-size: 1.1rem; font-weight: 600; cursor: pointer; box-shadow: 0 4px 12px rgba(95, 111, 85, 0.3); transition: all 0.2s; font-family: 'Comic Sans MS', cursive, sans-serif;"
          onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 20px rgba(95, 111, 85, 0.4)'"
          onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 12px rgba(95, 111, 85, 0.3)'"
        >
          {{ isManaging ? 'Management beenden' : 'Management starten' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  showRequestsSheet: Boolean,
  isMobile: Boolean,
  sidebarWidth: Number,
  isManaging: Boolean
})

const emit = defineEmits(['member-status-updated', 'organization-updated'])

const organizationName = ref('Nachbarschaftshilfe Winnweiler e.V.')

const stats = ref({
  helpers: 23,
  seekers: 45,
  activeTasks: 8,
  completedTasks: 156
})

// Dummy activity markers positioned around the screen
const activityMarkers = ref([
  { id: 1, x: 200, y: 150, type: 'helper', name: 'Anna M.' },
  { id: 2, x: 400, y: 250, type: 'seeker', name: 'Familie Weber' },
  { id: 3, x: 600, y: 180, type: 'task', name: 'Einkaufshilfe' },
  { id: 4, x: 300, y: 350, type: 'helper', name: 'Peter H.' },
  { id: 5, x: 750, y: 300, type: 'seeker', name: 'Klaus M.' }
])

const handleMarkerClick = (marker) => {
  console.log('Organization marker clicked:', marker)
  // Could open details or navigate to member/task details
}

// Methods that are called from parent component
const initializeOrganizationView = () => {
  console.log('Initializing organization dashboard view')
  // Initialize any dashboard-specific functionality
}

const updateManagementStatus = (status) => {
  console.log('Organization management status updated:', status)
  emit('member-status-updated', status ? 'managing' : 'viewing')
}

const updateRequestsList = (requests) => {
  console.log('Organization requests list updated:', requests.length)
  // Update the organization view with new requests
}

const focusOnRequest = (request) => {
  console.log('Focusing on organization request:', request)
  // Focus organization view on specific request
}

// Expose methods to parent component
defineExpose({
  initializeOrganizationView,
  updateManagementStatus,
  updateRequestsList,
  focusOnRequest
})
</script>