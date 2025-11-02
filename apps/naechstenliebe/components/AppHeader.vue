<template>
  <header style="position: sticky; top: 0; z-index: 50; background: #474747; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
    <!-- Main Header -->
    <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem 1.5rem;">
      <div style="display: flex; align-items: center; gap: 1rem;">
        <div style="width: 3rem; height: 3rem; background: white; border-radius: 12px; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 8px rgba(0,0,0,0.2);">
          <img src="/icons/logo.svg" alt="Logo" style="width: 2.5rem; height: 2.5rem;">
        </div>
        <div>
          <h1 style="color: white; font-size: 1.5rem; font-weight: 700; margin: 0; text-shadow: 1px 1px 2px rgba(0,0,0,0.3);">{{ title }}</h1>
          <!-- Role Indicator -->
          <div v-if="showRoleIndicator" style="display: flex; align-items: center; gap: 0.5rem; margin-top: 0.25rem;">
            <div :style="`width: 0.5rem; height: 0.5rem; border-radius: 50%; background: ${currentRole === 'helper' ? '#BECDA3' : '#8F8B82'};`"></div>
            <span style="color: rgba(255,255,255,0.8); font-size: 0.75rem; font-weight: 500;">
              {{ currentRole === 'helper' ? 'Helfer-Modus' : 'Hilfe-Suchender' }}
            </span>
          </div>
        </div>
      </div>
      
      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <!-- Role Switch Button -->
        <button 
          @click="$emit('toggleRole')"
          :style="`background: ${currentRole === 'helper' ? '#8F8B82' : '#BECDA3'}; color: ${currentRole === 'helper' ? 'white' : '#474747'}; padding: 0.5rem; border-radius: 12px; border: none; cursor: pointer; box-shadow: 0 2px 8px rgba(0,0,0,0.2); transition: all 0.2s; display: flex; align-items: center; justify-content: center;`"
          onmouseover="this.style.transform='scale(1.05)'"
          onmouseout="this.style.transform='scale(1)'"
          :title="currentRole === 'helper' ? 'Zu Hilfe-Suchender wechseln' : 'Zu Helfer wechseln'"
        >
          <svg style="width: 1.25rem; height: 1.25rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/>
          </svg>
        </button>

        <!-- News Button -->
        <button 
          @click="$emit('openNews')"
          style="background: #8F8B82; color: white; padding: 0.75rem 1rem; border-radius: 25px; border: none; cursor: pointer; box-shadow: 0 2px 8px rgba(0,0,0,0.2); transition: transform 0.2s; position: relative; display: flex; align-items: center; gap: 0.5rem; font-weight: 600; font-size: 0.875rem;"
          onmouseover="this.style.transform='scale(1.05)'"
          onmouseout="this.style.transform='scale(1)'"
        >
          <svg style="width: 1rem; height: 1rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6M4 10h6"/>
          </svg>
          <span class="hidden-mobile">News</span>
        </button>

        <!-- Smart Requests Button -->
        <button 
          @click="$emit('openRequests')"
          style="background: #5F6F55; color: white; padding: 0.75rem 1rem; border-radius: 25px; border: none; cursor: pointer; box-shadow: 0 2px 8px rgba(0,0,0,0.2); transition: transform 0.2s; position: relative; display: flex; align-items: center; gap: 0.5rem; font-weight: 600; font-size: 0.875rem;"
          onmouseover="this.style.transform='scale(1.05)'"
          onmouseout="this.style.transform='scale(1)'"
        >
          <svg style="width: 1rem; height: 1rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path v-if="currentRole === 'helper'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
          </svg>
          <span class="hidden-mobile">{{ getRequestButtonText() }}</span>
          <span v-if="requestCount > 0" style="background: #e74c3c; color: white; min-width: 1.25rem; height: 1.25rem; border-radius: 12px; font-size: 0.7rem; font-weight: 600; display: flex; align-items: center; justify-content: center; padding: 0 0.3rem;">{{ requestCount }}</span>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: 'Dashboard'
  },
  requestCount: {
    type: Number,
    default: 0
  },
  currentRole: {
    type: String,
    default: 'seeker', // 'seeker' or 'helper'
    validator: (value) => ['seeker', 'helper'].includes(value)
  },
  showRoleIndicator: {
    type: Boolean,
    default: true
  }
})

defineEmits(['openRequests', 'openProfile', 'openNews', 'toggleRole'])

const getRequestButtonText = () => {
  if (props.currentRole === 'helper') {
    return 'Neue Aufträge'
  } else {
    return 'Hilfe anfragen'
  }
}
</script>

<style scoped>
@media (max-width: 768px) {
  .hidden-mobile {
    display: none;
  }
}
</style>