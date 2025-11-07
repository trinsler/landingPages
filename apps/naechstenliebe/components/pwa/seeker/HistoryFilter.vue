<template>
  <div class="filter-container">
    <h3 class="filter-title">Filter</h3>
    
    <div class="filter-buttons">
      <button 
        v-for="filter in filters" 
        :key="filter.id"
        @click="$emit('filter-change', filter.id)"
        class="filter-btn"
        :class="{ active: activeFilter === filter.id }"
      >
        {{ filter.label }}
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  activeFilter: {
    type: String,
    default: 'all'
  },
  filters: {
    type: Array,
    default: () => []
  }
})

defineEmits(['filter-change'])
</script>

<style scoped>
/* Mobile First Design */
.filter-container {
  background: white;
  border-radius: 20px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.filter-title {
  color: #474747;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 1.25rem 0;
  line-height: 1.3;
}

.filter-buttons {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.filter-btn {
  background: rgba(190, 205, 163, 0.1);
  color: #5F6F55;
  border: 1px solid rgba(190, 205, 163, 0.3);
  padding: 0.75rem 1.25rem;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 500;
  font-size: 1rem;
  transition: all 0.3s ease;
  min-height: 2.75rem;
}

.filter-btn:hover {
  background: rgba(190, 205, 163, 0.2);
  transform: translateY(-1px);
}

.filter-btn.active {
  background: #5F6F55;
  color: white;
  border-color: #5F6F55;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(95, 111, 85, 0.3);
}

/* Tablet and Desktop */
@media (min-width: 768px) {
  .filter-title {
    font-size: 1.25rem;
  }
  
  .filter-buttons {
    gap: 0.5rem;
  }
  
  .filter-btn {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
    min-height: auto;
  }
}
</style>