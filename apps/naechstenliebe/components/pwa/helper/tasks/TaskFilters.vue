<template>
  <div style="padding: 1rem 1.5rem; background: white; border-bottom: 1px solid #e5e7eb;">
    <div style="display: flex; gap: 0.5rem; overflow-x: auto; padding-bottom: 0.5rem;">
      <button 
        v-for="filter in statusFilters"
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
        {{ filter.label }} ({{ filter.count }})
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  selectedFilter: {
    type: String,
    required: true
  },
  statusFilters: {
    type: Array,
    required: true
  }
})

defineEmits(['filter-change'])
</script>