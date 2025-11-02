<template>
  <div style="background: white; border-radius: 16px; padding: 1.5rem; margin-bottom: 1.5rem; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
    <h3 style="color: #474747; font-size: 1.25rem; font-weight: 600; margin: 0 0 1rem 0;">Filter</h3>
    
    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
      <button 
        v-for="filter in filters" 
        :key="filter.id"
        @click="$emit('filter-change', filter.id)"
        :style="getFilterButtonStyle(filter.id)"
      >
        {{ filter.label }}
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  activeFilter: {
    type: String,
    default: 'all'
  },
  filters: {
    type: Array,
    default: () => [
      { id: 'all', label: 'Alle' },
      { id: 'week', label: 'Diese Woche' },
      { id: 'shopping', label: 'Einkaufen' },
      { id: 'cooking', label: 'Kochen' }
    ]
  }
})

defineEmits(['filter-change'])

const getFilterButtonStyle = (filterId) => {
  const isActive = props.activeFilter === filterId
  
  if (isActive) {
    return "background: #5F6F55; color: white; padding: 0.75rem 1rem; border-radius: 12px; border: none; font-weight: 600; cursor: pointer; font-size: 0.875rem; transition: all 0.2s;"
  }
  
  return "background: white; color: #474747; padding: 0.75rem 1rem; border-radius: 12px; border: 2px solid #e5e7eb; cursor: pointer; font-size: 0.875rem; transition: all 0.2s;"
}
</script>

<style scoped>
button:hover {
  border-color: #BECDA3 !important;
}
</style>