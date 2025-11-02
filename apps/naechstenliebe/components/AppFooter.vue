<template>
  <nav style="position: fixed; bottom: 0; left: 0; right: 0; background: white; border-top: 2px solid #BECDA3; box-shadow: 0 -4px 12px rgba(0,0,0,0.1); z-index: 50;">
    <div style="display: flex;">
      <button 
        v-for="(tab, index) in currentTabs" 
        :key="index"
        @click="handleTabClick(tab)"
        :style="{
          flex: '1',
          padding: '1rem 0.5rem',
          textAlign: 'center',
          border: 'none',
          background: 'none',
          cursor: 'pointer',
          color: activeTab === tab.name ? '#474747' : '#8F8B82',
          borderTop: activeTab === tab.name ? '3px solid #474747' : 'none',
          transition: 'all 0.2s'
        }"
      >
        <div v-html="tab.icon" style="width: 1.5rem; height: 1.5rem; margin: 0 auto 0.25rem auto; display: block;"></div>
        <span style="font-size: 0.75rem; font-weight: 500;">{{ tab.label }}</span>
      </button>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  activeTab: {
    type: String,
    required: true
  },
  currentRole: {
    type: String,
    default: 'seeker', // 'seeker' or 'helper'
    validator: (value) => ['seeker', 'helper'].includes(value)
  }
})

const emit = defineEmits(['navigate', 'toggleRole'])

// Helper tabs (original)
const helperTabs = [
  {
    name: 'dashboard',
    label: 'Karte',
    icon: `<svg style="width: 1.5rem; height: 1.5rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/>
    </svg>`
  },
  {
    name: 'tasks',
    label: 'Aufträge',
    icon: `<svg style="width: 1.5rem; height: 1.5rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
    </svg>`
  },
  {
    name: 'loyalty',
    label: 'Treue',
    icon: `<svg style="width: 1.5rem; height: 1.5rem;" fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
    </svg>`
  },
  {
    name: 'earnings',
    label: 'Verdienst',
    icon: `<svg style="width: 1.5rem; height: 1.5rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
    </svg>`
  },
  {
    name: 'profile',
    label: 'Profil',
    icon: `<svg style="width: 1.5rem; height: 1.5rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
    </svg>`
  }
]

// Seeker tabs
const seekerTabs = [
  {
    name: 'dashboard',
    label: 'Home',
    icon: `<svg style="width: 1.5rem; height: 1.5rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
    </svg>`
  },
  {
    name: 'tasks',
    label: 'Verlauf',
    icon: `<svg style="width: 1.5rem; height: 1.5rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
    </svg>`
  },
  {
    name: 'favorites',
    label: 'Favoriten',
    icon: `<svg style="width: 1.5rem; height: 1.5rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
    </svg>`
  },
  {
    name: 'create',
    label: 'Anfragen',
    icon: `<svg style="width: 1.5rem; height: 1.5rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
    </svg>`
  },
  {
    name: 'profile',
    label: 'Profil',
    icon: `<svg style="width: 1.5rem; height: 1.5rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
    </svg>`
  }
]

// Dynamic tabs based on role
const currentTabs = computed(() => {
  return props.currentRole === 'helper' ? helperTabs : seekerTabs
})

const handleTabClick = (tab) => {
  // Handle special cases
  if (props.currentRole === 'seeker' && tab.name === 'create') {
    emit('navigate', 'task-create')
  } else {
    emit('navigate', tab.name)
  }
}
</script>

<style scoped>
svg {
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}
</style>