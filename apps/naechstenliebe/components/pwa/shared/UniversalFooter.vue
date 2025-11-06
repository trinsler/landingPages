<template>
  <footer style="position: fixed; bottom: 0; left: 0; right: 0; background: white; box-shadow: 0 -4px 12px rgba(0,0,0,0.15); z-index: 40;">
    <div style="display: flex; justify-content: space-around; align-items: center; padding: 0.75rem 1rem; max-width: 100%; margin: 0 auto;">
      
      <!-- Dashboard -->
      <button 
        @click="$emit('navigate', 'dashboard')"
        :style="getButtonStyle('dashboard')"
        onmouseover="this.style.transform='scale(1.1)'"
        onmouseout="this.style.transform='scale(1)'"
      >
        <svg style="width: 1.5rem; height: 1.5rem; margin-bottom: 0.25rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
        </svg>
        <span style="font-size: 0.7rem; font-weight: 600;">Home</span>
      </button>

      <!-- Role-specific Middle Buttons -->
      <template v-if="currentRole === 'seeker'">
        <!-- Tasks/History -->
        <button 
          @click="$emit('navigate', 'tasks')"
          :style="getButtonStyle('tasks')"
          onmouseover="this.style.transform='scale(1.1)'"
          onmouseout="this.style.transform='scale(1)'"
        >
          <svg style="width: 1.5rem; height: 1.5rem; margin-bottom: 0.25rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <span style="font-size: 0.7rem; font-weight: 600;">Verlauf</span>
        </button>

        <!-- Create Task -->
        <button 
          @click="$emit('navigate', 'create')"
          style="background: #5F6F55; color: white; border: none; border-radius: 50%; width: 3.5rem; height: 3.5rem; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 4px 12px rgba(95, 111, 85, 0.3); transition: all 0.2s;"
          onmouseover="this.style.transform='scale(1.1)'; this.style.boxShadow='0 6px 20px rgba(95, 111, 85, 0.4)'"
          onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 4px 12px rgba(95, 111, 85, 0.3)'"
        >
          <svg style="width: 1.75rem; height: 1.75rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
          </svg>
        </button>

        <!-- Favorites -->
        <button 
          @click="$emit('navigate', 'favorites')"
          :style="getButtonStyle('favorites')"
          onmouseover="this.style.transform='scale(1.1)'"
          onmouseout="this.style.transform='scale(1)'"
        >
          <svg style="width: 1.5rem; height: 1.5rem; margin-bottom: 0.25rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
          </svg>
          <span style="font-size: 0.7rem; font-weight: 600;">Favoriten</span>
        </button>
      </template>

      <template v-else-if="currentRole === 'helper'">
        <!-- Tasks -->
        <button 
          @click="$emit('navigate', 'tasks')"
          :style="getButtonStyle('tasks')"
          onmouseover="this.style.transform='scale(1.1)'"
          onmouseout="this.style.transform='scale(1)'"
        >
          <svg style="width: 1.5rem; height: 1.5rem; margin-bottom: 0.25rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
          </svg>
          <span style="font-size: 0.7rem; font-weight: 600;">Aufträge</span>
        </button>

        <!-- Earnings -->
        <button 
          @click="$emit('navigate', 'earnings')"
          :style="getButtonStyle('earnings')"
          onmouseover="this.style.transform='scale(1.1)'"
          onmouseout="this.style.transform='scale(1)'"
        >
          <svg style="width: 1.5rem; height: 1.5rem; margin-bottom: 0.25rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
          </svg>
          <span style="font-size: 0.7rem; font-weight: 600;">Einnahmen</span>
        </button>

        <!-- Loyalty -->
        <button 
          @click="$emit('navigate', 'loyalty')"
          :style="getButtonStyle('loyalty')"
          onmouseover="this.style.transform='scale(1.1)'"
          onmouseout="this.style.transform='scale(1)'"
        >
          <svg style="width: 1.5rem; height: 1.5rem; margin-bottom: 0.25rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
          </svg>
          <span style="font-size: 0.7rem; font-weight: 600;">Bewertung</span>
        </button>
      </template>

      <template v-else-if="currentRole === 'organization'">
        <!-- Analytics -->
        <button 
          @click="$emit('navigate', 'analytics')"
          :style="getButtonStyle('analytics')"
          onmouseover="this.style.transform='scale(1.1)'"
          onmouseout="this.style.transform='scale(1)'"
        >
          <svg style="width: 1.5rem; height: 1.5rem; margin-bottom: 0.25rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
          </svg>
          <span style="font-size: 0.7rem; font-weight: 600;">Analytics</span>
        </button>

        <!-- Services -->
        <button 
          @click="$emit('navigate', 'services')"
          :style="getButtonStyle('services')"
          onmouseover="this.style.transform='scale(1.1)'"
          onmouseout="this.style.transform='scale(1)'"
        >
          <svg style="width: 1.5rem; height: 1.5rem; margin-bottom: 0.25rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
          </svg>
          <span style="font-size: 0.7rem; font-weight: 600;">Services</span>
        </button>

        <!-- Team -->
        <button 
          @click="$emit('navigate', 'team')"
          :style="getButtonStyle('team')"
          onmouseover="this.style.transform='scale(1.1)'"
          onmouseout="this.style.transform='scale(1)'"
        >
          <svg style="width: 1.5rem; height: 1.5rem; margin-bottom: 0.25rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
          </svg>
          <span style="font-size: 0.7rem; font-weight: 600;">Team</span>
        </button>
      </template>

      <!-- Profile (Always present) -->
      <button 
        @click="$emit('navigate', 'profile')"
        :style="getButtonStyle('profile')"
        onmouseover="this.style.transform='scale(1.1)'"
        onmouseout="this.style.transform='scale(1)'"
      >
        <svg style="width: 1.5rem; height: 1.5rem; margin-bottom: 0.25rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
        </svg>
        <span style="font-size: 0.7rem; font-weight: 600;">Profil</span>
      </button>
    </div>
  </footer>
</template>

<script setup>
const props = defineProps({
  activeTab: {
    type: String,
    default: 'dashboard'
  },
  currentRole: {
    type: String,
    default: 'seeker',
    validator: (value) => ['seeker', 'helper', 'organization'].includes(value)
  },
  availableRoles: {
    type: Array,
    default: () => ['seeker']
  }
})

defineEmits(['navigate'])

const getButtonStyle = (tab) => {
  const isActive = props.activeTab === tab
  
  if (isActive) {
    return "background: none; border: none; cursor: pointer; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 0.5rem; border-radius: 12px; transition: all 0.2s; color: #5F6F55; min-width: 4rem;"
  }
  
  return "background: none; border: none; cursor: pointer; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 0.5rem; border-radius: 12px; transition: all 0.2s; color: #8F8B82; min-width: 4rem;"
}
</script>