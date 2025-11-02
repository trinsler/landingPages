<template>
  <div v-if="showRequestsSheet" :style="{
      position: 'fixed',
      top: '5rem',
      bottom: isMobile ? '0' : 'auto',
      left: isMobile ? '0' : 'auto',
      right: '0',
      width: isMobile ? 'auto' : sidebarWidth + 'px',
      zIndex: 40,
      background: 'white',
      borderRadius: isMobile ? '20px 20px 0 0' : 'none',
      boxShadow: isMobile ? 'none' : '-4px 0 20px rgba(0,0,0,0.15)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }">
    
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

    <!-- Search Section -->
    <div style="padding: 1rem 1.5rem; background: #f8fafc; border-bottom: 1px solid #e5e7eb;">
      <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem;">
        <svg style="width: 1rem; height: 1rem; color: #5F6F55;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
        <span style="font-size: 0.875rem; font-weight: 600; color: #474747;">Standort & Suchradius</span>
      </div>
      
      <!-- City Search -->
      <div style="margin-bottom: 0.75rem;">
        <input 
          type="text"
          v-model="searchCity"
          placeholder="Stadt oder Ort eingeben..."
          style="width: 100%; padding: 0.5rem 0.75rem; border: 1px solid #d1d5db; border-radius: 8px; font-size: 0.875rem; outline: none; transition: border-color 0.2s;"
          @focus="$event.target.style.borderColor='#5F6F55'"
          @blur="$event.target.style.borderColor='#d1d5db'"
        />
      </div>
      
      <!-- Radius Slider -->
      <div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
          <span style="font-size: 0.75rem; color: #6b7280;">Suchradius</span>
          <span style="font-size: 0.875rem; font-weight: 600; color: #5F6F55;">{{ searchRadius }} km</span>
        </div>
        <input 
          type="range"
          v-model="searchRadius"
          min="1"
          max="50"
          step="1"
          @input="$emit('radius-change', Number(searchRadius))"
          style="width: 100%; height: 6px; background: #e5e7eb; border-radius: 3px; outline: none; -webkit-appearance: none;"
        />
        <div style="display: flex; justify-content: space-between; margin-top: 0.25rem;">
          <span style="font-size: 0.625rem; color: #9ca3af;">1 km</span>
          <span style="font-size: 0.625rem; color: #9ca3af;">50 km</span>
        </div>
      </div>
    </div>

  
    <!-- Filter Options -->
    <div style="padding: 1rem 1.5rem; border-bottom: 1px solid #f3f4f6;">
      <div style="display: flex; gap: 0.5rem; overflow-x: auto; padding-bottom: 0.5rem;">
        <div style="display: flex; gap: 0.5rem; min-width: max-content;">
          <button 
            v-for="filter in filters"
            :key="filter.value"
            @click="$emit('filter-change', filter.value)"
            :style="{
              background: selectedFilter === filter.value ? '#5F6F55' : '#f9fafb',
              color: selectedFilter === filter.value ? 'white' : '#474747',
              border: selectedFilter === filter.value ? '1px solid #5F6F55' : '1px solid #e5e7eb',
              padding: '0.5rem 1rem',
              borderRadius: '20px',
              fontSize: '0.875rem',
              fontWeight: '500',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s',
              minWidth: '80px'
            }"
          >
            {{ filter.label }} ({{ getFilterCount(filter.value) }})
          </button>
        </div>
      </div>
    </div>

    <!-- Requests List -->
    <div style="padding: 1rem 1.5rem; max-height: 50vh; overflow-y: auto; padding-bottom: 2rem;">
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
          <div style="flex: 1; min-width: 0;">
              <!-- Titel und Preis -->
              <div style="display: flex; align-items: start; justify-content: space-between; margin-bottom: 0.75rem;">
                <div>
                  <h4 style="font-weight: 600; color: #474747; margin: 0 0 0.25rem 0; font-size: 1rem;">{{ request.title }}</h4>
                  <p style="font-size: 0.875rem; color: #8F8B82; margin: 0;">{{ request.area }} • {{ request.distance }}</p>
                </div>
                <div style="text-align: right;">
                  <div style="font-size: 1.125rem; font-weight: 700; color: #5F6F55;">{{ request.payment }}€</div>
                  <div style="font-size: 0.625rem; color: #6b7280;">(€{{ request.baseRate }} + €{{ request.platformFee }} Gebühr)</div>
                </div>
              </div>

              <!-- Kunden-Info -->
              <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem; padding: 0.5rem; background: #f9fafb; border-radius: 8px;">
                <div style="display: flex; align-items: center; gap: 0.25rem;">
                  <svg style="width: 0.875rem; height: 0.875rem; color: #8F8B82;" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                  <span style="font-size: 0.875rem; font-weight: 600; color: #474747;">{{ request.clientRating }}</span>
                  <span style="font-size: 0.75rem; color: #8F8B82;">({{ request.clientReviews }} Bewertungen)</span>
                </div>
              </div>

              <!-- Zusatzinfos -->
              <div style="display: flex; gap: 1rem; margin-bottom: 0.75rem; font-size: 0.75rem; color: #6b7280;">
                <div style="display: flex; align-items: center; gap: 0.25rem;">
                  <svg style="width: 0.75rem; height: 0.75rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  {{ request.estimatedDuration }}
                </div>
                <div style="display: flex; align-items: center; gap: 0.25rem;">
                  <svg style="width: 0.75rem; height: 0.75rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  Antwort: {{ request.responseTime }}
                </div>
                </div>

              <!-- Action Buttons -->
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
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  showRequestsSheet: Boolean,
  isMobile: Boolean,
  sidebarWidth: Number,
  selectedFilter: String,
  filteredRequests: Array,
  mapRequests: Array,
  visibleRequests: Array,
  totalRequests: Number
})

defineEmits(['toggle-sheet', 'start-resize', 'filter-change', 'radius-change', 'city-change', 'focus-request', 'contact-helper', 'decline-request'])

const searchCity = ref('Winnweiler')
const searchRadius = ref(10)

const filters = computed(() => [
  { value: 'all', label: 'Alle', count: props.visibleRequests.length },
  { value: 'shopping', label: 'Einkaufen', count: props.visibleRequests.filter(r => r.type === 'shopping').length },
  { value: 'cooking', label: 'Kochen', count: props.visibleRequests.filter(r => r.type === 'cooking').length },
  { value: 'gardening', label: 'Gartenarbeit', count: props.visibleRequests.filter(r => r.type === 'gardening').length },
  { value: 'tech_help', label: 'Technik', count: props.visibleRequests.filter(r => r.type === 'tech_help').length },
  { value: 'cleaning', label: 'Reinigen', count: props.visibleRequests.filter(r => r.type === 'cleaning').length },
  { value: 'dog_walking', label: 'Gassi gehen', count: props.visibleRequests.filter(r => r.type === 'dog_walking').length }
])

const getFilterCount = (filterValue) => {
  if (filterValue === 'all') return props.visibleRequests.length
  return props.visibleRequests.filter(r => r.type === filterValue).length
}

const getTaskIcon = (type) => {
  const icons = {
    shopping: '/icons/einkaufenMadl.svg',
    cooking: '/icons/kochen.svg',
    cleaning: '/icons/staubsaugen.svg',
    gardening: '/icons/gießenBub.svg',
    tech_help: '/icons/technikBanalcieren.svg',
    dog_walking: '/icons/FrontalGassiJunge.svg'
  }
  return icons[type] || '/icons/verschiedeneMenschen.svg'
}
</script>