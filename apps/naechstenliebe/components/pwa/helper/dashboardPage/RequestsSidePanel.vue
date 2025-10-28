<template>
  <div v-if="showRequestsSheet" :style="'position: fixed; top: 5rem; ' + (isMobile ? 'bottom: 0; left: 0; right: 0;' : 'bottom: 0; right: 0; width: ' + sidebarWidth + 'px;') + '; z-index: 40; background: white; ' + (isMobile ? 'border-radius: 20px 20px 0 0;' : 'box-shadow: -4px 0 20px rgba(0,0,0,0.15);') + '; overflow: hidden; display: flex; flex-direction: column;'">
    
    <!-- Resize Handle (Desktop only) -->
    <div 
      v-if="!isMobile"
      @mousedown="$emit('start-resize')"
      style="position: absolute; left: -2px; top: 0; bottom: 0; width: 8px; background: transparent; cursor: col-resize; z-index: 41;"
      @mouseover="$event.target.style.background='rgba(190, 205, 163, 0.3)'"
      @mouseout="$event.target.style.background='transparent'"
    ></div>
    
    <!-- Handle Bar (Mobile only) -->
    <div v-if="isMobile" @click="$emit('toggle-sheet')" style="display: flex; justify-content: center; padding: 1rem 1rem 0.5rem 1rem; cursor: pointer;">
      <div style="width: 40px; height: 4px; background: #d1d5db; border-radius: 2px;"></div>
    </div>
    
    <!-- Sheet Header -->
    <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.5rem 1.5rem 1rem 1.5rem; border-bottom: 1px solid #f3f4f6; flex-shrink: 0;">
      <h3 style="font-size: 1.125rem; font-weight: 600; color: #474747; margin: 0;">Verfügbare Aufträge</h3>
      <button @click="$emit('toggle-sheet')" style="background: none; border: none; color: #8F8B82; cursor: pointer; padding: 0.25rem;">
        <svg style="width: 1.5rem; height: 1.5rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>

    <!-- Filter Options -->
    <div style="padding: 1rem 1.5rem; border-bottom: 1px solid #f3f4f6;">
      <div style="display: flex; gap: 0.5rem; overflow-x: auto; padding-bottom: 0.5rem;">
        <div style="display: flex; gap: 0.5rem; min-width: max-content;">
          <button 
            v-for="filter in filters"
            :key="filter.value"
            @click="$emit('filter-change', filter.value)"
            :style="'background: ' + (selectedFilter === filter.value ? '#5F6F55' : '#f3f4f6') + '; color: ' + (selectedFilter === filter.value ? 'white' : '#474747') + '; border: none; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.875rem; font-weight: 500; cursor: pointer; white-space: nowrap; transition: all 0.2s; min-width: 80px;'"
          >
            {{ filter.label }} ({{ filter.count }})
          </button>
        </div>
      </div>
    </div>

    <!-- Requests List -->
    <div style="padding: 1rem 1.5rem; max-height: 60vh; overflow-y: auto;">
      <div v-if="filteredRequests.length === 0" style="text-align: center; padding: 3rem 1rem;">
        <div style="width: 4rem; height: 4rem; background: #f3f4f6; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem auto;">
          <svg style="width: 2rem; height: 2rem; color: #8F8B82;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
          </svg>
        </div>
        <h4 style="font-weight: 600; color: #474747; margin: 0 0 0.5rem 0;">Keine Aufträge verfügbar</h4>
        <p style="color: #8F8B82; margin: 0;">Aktuell gibt es keine Aufträge für diese Filter</p>
      </div>

      <div v-else style="display: flex; flex-direction: column; gap: 1rem;">
        <div 
          v-for="request in filteredRequests" 
          :key="request.id"
          style="background: #f9fafb; border-radius: 12px; padding: 1rem; border: 1px solid #e5e7eb; transition: all 0.2s;"
          onmouseover="this.style.borderColor='#BECDA3'; this.style.background='white';"
          onmouseout="this.style.borderColor='#e5e7eb'; this.style.background='#f9fafb';"
        >
          <div style="display: flex; align-items: start; gap: 1rem;">
            <div style="width: 3rem; height: 3rem; background: #BECDA3; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
              <img :src="getTaskIcon(request.type)" :alt="request.type" style="width: 1.5rem; height: 1.5rem;">
            </div>
            <div style="flex: 1; min-width: 0;">
              <div style="display: flex; align-items: start; justify-content: space-between; margin-bottom: 0.75rem;">
                <div>
                  <h4 style="font-weight: 600; color: #474747; margin: 0 0 0.25rem 0; font-size: 1rem;">{{ request.title }}</h4>
                  <p style="font-size: 0.875rem; color: #8F8B82; margin: 0;">{{ request.area }} • {{ request.payment }}€ • {{ request.distance }}</p>
                </div>
                <button 
                  @click="$emit('focus-request', request)"
                  style="background: none; border: 1px solid #BECDA3; color: #5F6F55; padding: 0.5rem; border-radius: 8px; cursor: pointer; font-size: 0.75rem; font-weight: 500; transition: all 0.2s;"
                  onmouseover="this.style.background='#5F6F55'; this.style.color='white';"
                  onmouseout="this.style.background='none'; this.style.color='#5F6F55';"
                >
                  Auf Karte
                </button>
              </div>
              <div style="display: flex; gap: 0.75rem;">
                <button 
                  @click="$emit('contact-helper', request)"
                  style="flex: 1; background: #5F6F55; color: white; padding: 0.75rem; border: none; cursor: pointer; font-size: 0.875rem; font-weight: 600; border-radius: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.1); transition: all 0.2s;"
                  onmouseover="this.style.transform='translateY(-1px)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.15)';"
                  onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 6px rgba(0,0,0,0.1)';"
                >
                  Kontaktieren
                </button>
                <button 
                  @click="$emit('decline-request', request)"
                  style="flex: 1; background: #f3f4f6; color: #474747; padding: 0.75rem; border: 1px solid #e5e7eb; cursor: pointer; font-size: 0.875rem; font-weight: 600; border-radius: 8px; transition: all 0.2s;"
                  onmouseover="this.style.background='#e74c3c'; this.style.color='white'; this.style.borderColor='#e74c3c';"
                  onmouseout="this.style.background='#f3f4f6'; this.style.color='#474747'; this.style.borderColor='#e5e7eb';"
                >
                  Überspringen
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  showRequestsSheet: Boolean,
  isMobile: Boolean,
  sidebarWidth: Number,
  selectedFilter: String,
  filteredRequests: Array,
  mapRequests: Array
})

defineEmits(['toggle-sheet', 'start-resize', 'filter-change', 'focus-request', 'contact-helper', 'decline-request'])

const filters = computed(() => [
  { value: 'all', label: 'Alle', count: props.mapRequests.length },
  { value: 'shopping', label: 'Einkaufen', count: props.mapRequests.filter(r => r.type === 'shopping').length },
  { value: 'cooking', label: 'Kochen', count: props.mapRequests.filter(r => r.type === 'cooking').length },
  { value: 'gardening', label: 'Gartenarbeit', count: props.mapRequests.filter(r => r.type === 'gardening').length },
  { value: 'tech_help', label: 'Technik', count: props.mapRequests.filter(r => r.type === 'tech_help').length }
])

const getTaskIcon = (type) => {
  const icons = {
    shopping: '/icons/einkaufenMadl.svg',
    cooking: '/icons/kochen.svg',
    cleaning: '/icons/staubsaugen.svg',
    gardening: '/icons/gießenBub.svg',
    tech_help: '/icons/technikBanalcieren.svg'
  }
  return icons[type] || '/icons/verschiedeneMenschen.svg'
}
</script>