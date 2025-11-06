<template>
  <div style="position: absolute; top: 2rem; right: 2rem; z-index: 20; display: flex; flex-direction: column; gap: 1rem;">
    
    <!-- Management Status Toggle -->
    <button 
      @click="$emit('toggle-management')"
      :style="'background: ' + (isManaging ? '#5F6F55' : '#8F8B82') + '; color: white; border: none; padding: 1rem; border-radius: 12px; cursor: pointer; box-shadow: 0 4px 12px rgba(0,0,0,0.2); transition: all 0.2s; font-family: Comic Sans MS, cursive, sans-serif; min-width: 180px;'"
      onmouseover="this.style.transform='translateY(-2px)'"
      onmouseout="this.style.transform='translateY(0)'"
    >
      <div style="display: flex; align-items: center; gap: 0.75rem;">
        <div style="width: 2rem; height: 2rem; background: rgba(255,255,255,0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
          <svg style="width: 1.2rem; height: 1.2rem;" fill="currentColor" viewBox="0 0 20 20">
            <path v-if="isManaging" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
            <path v-else d="M10 2L3 7v11h14V7l-7-5zM8 16H6v-4h2v4zm4 0h-2v-4h2v4zm4 0h-2v-4h2v4z"/>
          </svg>
        </div>
        <div style="text-align: left;">
          <div style="font-weight: 600; font-size: 0.9rem;">{{ isManaging ? 'Verwalten' : 'Übersicht' }}</div>
          <div style="font-size: 0.75rem; opacity: 0.8;">{{ managementStatusText }}</div>
        </div>
      </div>
    </button>

    <!-- Organization Status Indicator -->
    <div :style="'background: ' + statusColor + '; color: white; padding: 1rem; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.2); font-family: Comic Sans MS, cursive, sans-serif; min-width: 180px;'">
      <div style="display: flex; align-items: center; gap: 0.75rem;">
        <div style="width: 2rem; height: 2rem; background: rgba(255,255,255,0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
          <svg style="width: 1.2rem; height: 1.2rem;" fill="currentColor" viewBox="0 0 20 20">
            <circle cx="10" cy="10" r="8"/>
          </svg>
        </div>
        <div style="text-align: left;">
          <div style="font-weight: 600; font-size: 0.9rem;">Status</div>
          <div style="font-size: 0.75rem; opacity: 0.8;">{{ organizationStatusText }}</div>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div style="background: rgba(255,255,255,0.95); padding: 1rem; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); min-width: 180px;">
      <div style="font-weight: 600; font-size: 0.9rem; color: #474747; margin-bottom: 0.75rem; font-family: 'Comic Sans MS', cursive, sans-serif;">Schnellaktionen</div>
      
      <div style="display: flex; flex-direction: column; gap: 0.5rem;">
        <button 
          @click="handleQuickAction('members')"
          style="background: #5F6F55; color: white; border: none; padding: 0.5rem 0.75rem; border-radius: 8px; cursor: pointer; font-size: 0.8rem; transition: all 0.2s; font-family: 'Comic Sans MS', cursive, sans-serif;"
          onmouseover="this.style.background='#4a5a45'"
          onmouseout="this.style.background='#5F6F55'"
        >
          Mitglieder verwalten
        </button>
        
        <button 
          @click="handleQuickAction('tasks')"
          style="background: #8FA66E; color: white; border: none; padding: 0.5rem 0.75rem; border-radius: 8px; cursor: pointer; font-size: 0.8rem; transition: all 0.2s; font-family: 'Comic Sans MS', cursive, sans-serif;"
          onmouseover="this.style.background='#7a9159'"
          onmouseout="this.style.background='#8FA66E'"
        >
          Aufträge zuweisen
        </button>
        
        <button 
          @click="handleQuickAction('stats')"
          style="background: #474747; color: white; border: none; padding: 0.5rem 0.75rem; border-radius: 8px; cursor: pointer; font-size: 0.8rem; transition: all 0.2s; font-family: 'Comic Sans MS', cursive, sans-serif;"
          onmouseover="this.style.background='#3a3a3a'"
          onmouseout="this.style.background='#474747'"
        >
          Statistiken
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  isManaging: {
    type: Boolean,
    default: false
  },
  organizationStatus: {
    type: String,
    default: 'active'
  }
})

const emit = defineEmits(['toggle-management'])

const managementStatusText = computed(() => {
  return props.isManaging ? 'Aktiv verwaltend' : 'Nur anzeigen'
})

const organizationStatusText = computed(() => {
  switch(props.organizationStatus) {
    case 'active': return 'Aktiv'
    case 'busy': return 'Beschäftigt'
    case 'maintenance': return 'Wartung'
    default: return 'Unbekannt'
  }
})

const statusColor = computed(() => {
  switch(props.organizationStatus) {
    case 'active': return '#5F6F55'
    case 'busy': return '#BECDA3'
    case 'maintenance': return '#8F8B82'
    default: return '#474747'
  }
})

const handleQuickAction = (action) => {
  console.log('Quick action clicked:', action)
  
  switch(action) {
    case 'members':
      navigateTo('/pwa/org/team')
      break
    case 'tasks':
      navigateTo('/pwa/org/tasks')
      break
    case 'stats':
      navigateTo('/pwa/org/stats')
      break
  }
}
</script>