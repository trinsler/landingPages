<template>
  <div>
    <!-- Filter Section -->
    <div style="margin-bottom: 1.5rem;">
      <h4 style="margin: 0 0 1rem 0; color: #474747; font-family: 'Comic Sans MS', cursive, sans-serif;">Filter</h4>
      
      <!-- Request Type Filter -->
      <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1rem;">
        <button 
          v-for="filter in filterOptions" 
          :key="filter.value"
          @click="$emit('filter-change', filter.value)"
          :style="'padding: 0.5rem 1rem; border: 2px solid ' + (selectedFilter === filter.value ? '#5F6F55' : '#ddd') + '; background: ' + (selectedFilter === filter.value ? '#5F6F55' : 'white') + '; color: ' + (selectedFilter === filter.value ? 'white' : '#474747') + '; border-radius: 20px; cursor: pointer; transition: all 0.2s; font-family: Comic Sans MS, cursive, sans-serif; font-size: 0.85rem;'"
        >
          {{ filter.label }}
        </button>
      </div>

      <!-- Search Radius -->
      <div style="margin-bottom: 1rem;">
        <label style="display: block; margin-bottom: 0.5rem; color: #474747; font-weight: 500; font-family: 'Comic Sans MS', cursive, sans-serif;">Umkreis: {{ searchRadius }}km</label>
        <input 
          type="range" 
          min="1" 
          max="50" 
          :value="searchRadius"
          @input="handleRadiusChange"
          style="width: 100%; accent-color: #5F6F55;"
        />
      </div>

      <!-- City Search -->
      <div style="margin-bottom: 1rem;">
        <label style="display: block; margin-bottom: 0.5rem; color: #474747; font-weight: 500; font-family: 'Comic Sans MS', cursive, sans-serif;">Stadt/Gebiet</label>
        <input 
          type="text" 
          :value="searchCity"
          @input="handleCityChange"
          placeholder="z.B. Winnweiler"
          style="width: 100%; padding: 0.75rem; border: 2px solid #ddd; border-radius: 8px; font-family: 'Comic Sans MS', cursive, sans-serif;"
        />
      </div>
    </div>

    <!-- Results Summary -->
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; padding: 1rem; background: #f8f9fa; border-radius: 8px;">
      <span style="font-weight: 500; color: #474747; font-family: 'Comic Sans MS', cursive, sans-serif;">
        {{ filteredRequests.length }} von {{ totalRequests }} Anfragen
      </span>
      <span style="color: #8F8B82; font-size: 0.9rem; font-family: 'Comic Sans MS', cursive, sans-serif;">
        {{ selectedFilterLabel }}
      </span>
    </div>

    <!-- Requests List -->
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <div 
        v-for="request in filteredRequests" 
        :key="request.id"
        style="border: 2px solid #BECDA3; border-radius: 12px; padding: 1rem; background: white; transition: all 0.2s; cursor: pointer;"
        @click="$emit('focus-request', request)"
        onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.1)'"
        onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'"
      >
        <!-- Request Header -->
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.75rem;">
          <div style="flex: 1;">
            <h5 style="margin: 0 0 0.25rem 0; color: #474747; font-family: 'Comic Sans MS', cursive, sans-serif;">{{ request.title }}</h5>
            <p style="margin: 0; color: #8F8B82; font-size: 0.85rem; font-family: 'Comic Sans MS', cursive, sans-serif;">{{ request.client }} • {{ request.area }}</p>
          </div>
          <div :style="'background: ' + getPriorityColor(request.priority) + '; color: white; padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.75rem; font-weight: 500; font-family: Comic Sans MS, cursive, sans-serif;'">
            {{ getPriorityText(request.priority) }}
          </div>
        </div>

        <!-- Request Details -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
          <span style="color: #5F6F55; font-weight: 600; font-family: 'Comic Sans MS', cursive, sans-serif;">{{ request.payment }}</span>
          <span style="color: #8F8B82; font-size: 0.85rem; font-family: 'Comic Sans MS', cursive, sans-serif;">{{ request.distance }}</span>
        </div>

        <!-- Assignment Status -->
        <div style="margin-bottom: 0.75rem;">
          <span v-if="request.assignedTo" style="color: #5F6F55; font-size: 0.85rem; font-family: 'Comic Sans MS', cursive, sans-serif;">
            Zugewiesen an: {{ request.assignedTo }}
          </span>
          <span v-else style="color: #8F8B82; font-size: 0.85rem; font-family: 'Comic Sans MS', cursive, sans-serif;">
            Noch nicht zugewiesen
          </span>
        </div>

        <!-- Action Buttons -->
        <div style="display: flex; gap: 0.5rem;">
          <button 
            @click.stop="$emit('manage-member', request)"
            style="flex: 1; background: #5F6F55; color: white; border: none; padding: 0.5rem; border-radius: 6px; cursor: pointer; font-size: 0.85rem; font-family: 'Comic Sans MS', cursive, sans-serif; transition: background 0.2s;"
            onmouseover="this.style.background='#4a5a45'"
            onmouseout="this.style.background='#5F6F55'"
          >
            {{ request.assignedTo ? 'Zuordnung ändern' : 'Zuweisen' }}
          </button>
          
          <button 
            @click.stop="$emit('decline-request', request)"
            style="background: #8F8B82; color: white; border: none; padding: 0.5rem 1rem; border-radius: 6px; cursor: pointer; font-size: 0.85rem; font-family: 'Comic Sans MS', cursive, sans-serif; transition: background 0.2s;"
            onmouseover="this.style.background='#7a7670'"
            onmouseout="this.style.background='#8F8B82'"
          >
            Ablehnen
          </button>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filteredRequests.length === 0" style="text-align: center; padding: 2rem; color: #8F8B82;">
        <svg style="width: 3rem; height: 3rem; margin-bottom: 1rem; opacity: 0.5;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
        </svg>
        <p style="margin: 0; font-family: 'Comic Sans MS', cursive, sans-serif;">Keine Anfragen gefunden</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  selectedFilter: String,
  filteredRequests: Array,
  orgRequests: Array,
  visibleRequests: Array,
  totalRequests: Number
})

const emit = defineEmits([
  'filter-change',
  'radius-change', 
  'city-change',
  'focus-request',
  'manage-member',
  'decline-request'
])

const searchRadius = ref(10)
const searchCity = ref('Winnweiler')

const filterOptions = [
  { value: 'all', label: 'Alle' },
  { value: 'shopping', label: 'Einkaufen' },
  { value: 'gardening', label: 'Garten' },
  { value: 'cleaning', label: 'Reinigung' },
  { value: 'cooking', label: 'Kochen' },
  { value: 'tech_help', label: 'Technik' }
]

const selectedFilterLabel = computed(() => {
  const filter = filterOptions.find(f => f.value === props.selectedFilter)
  return filter ? filter.label : 'Alle'
})

const handleRadiusChange = (event) => {
  searchRadius.value = parseInt(event.target.value)
  emit('radius-change', searchRadius.value)
}

const handleCityChange = (event) => {
  searchCity.value = event.target.value
  emit('city-change', searchCity.value)
}

const getPriorityColor = (priority) => {
  const colors = {
    high: '#8F8B82',
    medium: '#8FA66E', 
    low: '#BECDA3'
  }
  return colors[priority] || '#474747'
}

const getPriorityText = (priority) => {
  const texts = {
    high: 'Hoch',
    medium: 'Mittel',
    low: 'Niedrig'
  }
  return texts[priority] || 'Normal'
}
</script>