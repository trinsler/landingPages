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
          <!-- Enhanced Role Indicator with Switcher -->
          <div v-if="showRoleIndicator" style="display: flex; align-items: center; gap: 0.5rem; margin-top: 0.25rem;">
            <div :style="`width: 0.5rem; height: 0.5rem; border-radius: 50%; background: ${getRoleColor()};`"></div>
            <span style="color: rgba(255,255,255,0.8); font-size: 0.75rem; font-weight: 500;">
              {{ getRoleDisplayText() }}
            </span>
            <!-- Role Switcher Dropdown (if multiple roles) -->
            <div v-if="availableRoles.length > 1" style="position: relative; margin-left: 0.5rem;">
              <button 
                @click="toggleRoleDropdown"
                style="background: rgba(255,255,255,0.1); color: white; border: 1px solid rgba(255,255,255,0.2); padding: 0.25rem 0.5rem; border-radius: 8px; font-size: 0.7rem; cursor: pointer; transition: all 0.2s;"
                onmouseover="this.style.background='rgba(255,255,255,0.2)'"
                onmouseout="this.style.background='rgba(255,255,255,0.1)'"
              >
                Wechseln ↓
              </button>
              
              <!-- Dropdown Menu -->
              <div v-if="showRoleDropdown" style="position: absolute; top: 100%; left: 0; background: white; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.2); z-index: 100; min-width: 160px; margin-top: 0.5rem;">
                <button 
                  v-for="role in availableRoles" 
                  :key="role"
                  @click="switchRole(role)"
                  :style="`width: 100%; text-align: left; padding: 0.75rem 1rem; border: none; background: ${currentRole === role ? '#f0f0f0' : 'white'}; color: #474747; cursor: pointer; transition: background 0.2s; font-size: 0.875rem; border-radius: ${getButtonRadius(role)};`"
                  onmouseover="this.style.background='#f0f0f0'"
                  onmouseout="this.style.background=this.dataset.isActive === 'true' ? '#f0f0f0' : 'white'"
                  :data-is-active="currentRole === role"
                >
                  <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <div :style="`width: 0.5rem; height: 0.5rem; border-radius: 50%; background: ${getRoleColorForRole(role)};`"></div>
                    <span>{{ getRoleDisplayName(role) }}</span>
                    <span v-if="currentRole === role" style="margin-left: auto; color: #5F6F55; font-weight: 600;">✓</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div style="display: flex; align-items: center; gap: 0.5rem;">
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
            <path v-else-if="currentRole === 'organization'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
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
import { ref } from 'vue'

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
    default: 'seeker',
    validator: (value) => ['seeker', 'helper', 'organization'].includes(value)
  },
  availableRoles: {
    type: Array,
    default: () => ['seeker'],
    validator: (value) => value.every(role => ['seeker', 'helper', 'organization'].includes(role))
  },
  showRoleIndicator: {
    type: Boolean,
    default: true
  }
})

defineEmits(['openRequests', 'openProfile', 'openNews', 'roleChange'])

const showRoleDropdown = ref(false)

// Role management
const getRoleColor = () => {
  switch (props.currentRole) {
    case 'helper': return '#BECDA3'
    case 'organization': return '#8F8B82'
    case 'seeker': 
    default: return '#5F6F55'
  }
}

const getRoleColorForRole = (role) => {
  switch (role) {
    case 'helper': return '#BECDA3'
    case 'organization': return '#8F8B82'
    case 'seeker': 
    default: return '#5F6F55'
  }
}

const getRoleDisplayText = () => {
  switch (props.currentRole) {
    case 'helper': return 'Helfer-Modus'
    case 'organization': return 'Organisation'
    case 'seeker': 
    default: return 'Hilfe-Suchender'
  }
}

const getRoleDisplayName = (role) => {
  switch (role) {
    case 'helper': return 'Als Helfer'
    case 'organization': return 'Als Organisation'
    case 'seeker': 
    default: return 'Als Hilfe-Suchender'
  }
}

const getRequestButtonText = () => {
  switch (props.currentRole) {
    case 'helper': return 'Neue Aufträge'
    case 'organization': return 'Verwaltung'
    case 'seeker': 
    default: return 'Hilfe anfragen'
  }
}

const getButtonRadius = (role) => {
  const index = props.availableRoles.indexOf(role)
  const length = props.availableRoles.length
  
  if (length === 1) return '8px'
  if (index === 0) return '8px 8px 0 0'
  if (index === length - 1) return '0 0 8px 8px'
  return '0'
}

// Dropdown management
const toggleRoleDropdown = () => {
  showRoleDropdown.value = !showRoleDropdown.value
}

const switchRole = (role) => {
  if (role !== props.currentRole) {
    emit('roleChange', role)
  }
  showRoleDropdown.value = false
}

// Close dropdown when clicking outside
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

const handleClickOutside = (event) => {
  const dropdown = event.target.closest('[data-role-dropdown]')
  if (!dropdown) {
    showRoleDropdown.value = false
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