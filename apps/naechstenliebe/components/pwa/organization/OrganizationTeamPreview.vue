<template>
  <div style="background: white; border-radius: 16px; padding: 1.5rem; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem;">
      <h3 style="font-size: 1.25rem; font-weight: 600; color: #474747; margin: 0;">Team Übersicht</h3>
      <button 
        @click="$emit('manage-team')"
        style="background: white; color: #474747; padding: 0.5rem 1rem; border-radius: 8px; border: 2px solid #e5e7eb; cursor: pointer; font-size: 0.875rem; transition: all 0.2s;"
        onmouseover="this.style.borderColor='#BECDA3'"
        onmouseout="this.style.borderColor='#e5e7eb'"
      >
        Team verwalten
      </button>
    </div>
    
    <div style="display: flex; flex-direction: column; gap: 0.75rem;">
      <div 
        v-for="member in displayedMembers" 
        :key="member.id"
        style="display: flex; align-items: center; gap: 1rem; padding: 0.75rem; background: #f9fafb; border-radius: 8px;"
      >
        <div style="width: 2.5rem; height: 2.5rem; background: #BECDA3; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
          <svg style="width: 1.25rem; height: 1.25rem; color: #474747;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
          </svg>
        </div>
        <div style="flex: 1; min-width: 0;">
          <h4 style="font-weight: 600; color: #474747; margin: 0 0 0.125rem 0; font-size: 0.875rem;">{{ member.name }}</h4>
          <p style="font-size: 0.75rem; color: #8F8B82; margin: 0;">{{ member.role }}</p>
        </div>
        <div style="text-align: right;">
          <span 
            :style="`background: ${member.status === 'active' ? '#5F6F55' : '#8F8B82'}; color: white; padding: 0.125rem 0.5rem; border-radius: 12px; font-size: 0.625rem; font-weight: 600;`"
          >
            {{ member.status === 'active' ? 'Aktiv' : 'Inaktiv' }}
          </span>
        </div>
      </div>
      
      <div v-if="teamMembers.length > 3" style="text-align: center; padding: 0.5rem;">
        <span style="color: #8F8B82; font-size: 0.875rem;">
          +{{ teamMembers.length - 3 }} weitere Mitglieder
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  teamMembers: {
    type: Array,
    default: () => []
  }
})

defineEmits(['manage-team'])

const displayedMembers = computed(() => {
  return props.teamMembers.slice(0, 3)
})
</script>