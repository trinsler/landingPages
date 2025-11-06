<template>
  <div style="background: white; border-radius: 16px; padding: 1.5rem; margin-bottom: 1.5rem; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem;">
      <h3 style="font-size: 1.25rem; font-weight: 600; color: #474747; margin: 0;">Aktive Services</h3>
      <button 
        @click="$emit('manage-services')"
        style="background: white; color: #474747; padding: 0.5rem 1rem; border-radius: 8px; border: 2px solid #e5e7eb; cursor: pointer; font-size: 0.875rem; transition: all 0.2s;"
        onmouseover="this.style.borderColor='#BECDA3'"
        onmouseout="this.style.borderColor='#e5e7eb'"
      >
        Verwalten
      </button>
    </div>
    
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <div 
        v-for="service in organizationServices" 
        :key="service.id"
        style="display: flex; align-items: center; gap: 1rem; padding: 1rem; background: #f9fafb; border-radius: 12px; border: 1px solid #e5e7eb;"
      >
        <div style="width: 3rem; height: 3rem; background: #BECDA3; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
          <svg style="width: 1.5rem; height: 1.5rem; color: #474747;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
          </svg>
        </div>
        <div style="flex: 1; min-width: 0;">
          <h4 style="font-weight: 600; color: #474747; margin: 0 0 0.25rem 0;">{{ service.title }}</h4>
          <p style="font-size: 0.875rem; color: #8F8B82; margin: 0;">{{ service.activeProviders }} Anbieter • {{ service.requestsToday }} Anfragen heute</p>
        </div>
        <div style="text-align: right;">
          <span style="background: #5F6F55; color: white; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.75rem; font-weight: 600; display: inline-block;">
            Aktiv
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  organizationServices: {
    type: Array,
    default: () => []
  }
})

defineEmits(['manage-services'])
</script>