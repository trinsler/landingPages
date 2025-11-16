<template>
  <div class="archive-search-bar">
    <div class="archive-search-input-wrapper">
      <svg class="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
      </svg>
      <input 
        :value="query"
        @input="$emit('update:query', $event.target.value)"
        type="text" 
        class="archive-search-field"
        placeholder="Archivierte Gespräche durchsuchen..."
        ref="searchInput"
      />
      <button @click="$emit('close')" class="archive-search-close">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

defineProps({
  query: String
})

defineEmits(['update:query', 'close'])

const searchInput = ref(null)

onMounted(() => {
  searchInput.value?.focus()
})
</script>

<style scoped>
.archive-search-bar {
  margin-bottom: 0.75rem;
  padding: 0 0.75rem;
}

.archive-search-input-wrapper {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(95, 111, 85, 0.2);
  border-radius: 12px;
  padding: 0.5rem 0.75rem;
  gap: 0.5rem;
  transition: all 0.3s ease;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.archive-search-input-wrapper:focus-within {
  border-color: #5F6F55;
  box-shadow: 0 0 0 2px rgba(95, 111, 85, 0.1);
}

.archive-search-field {
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
  font-size: 0.875rem;
  color: #1e293b;
}

.archive-search-field::placeholder {
  color: #94a3b8;
}

.archive-search-close {
  background: transparent;
  border: none;
  color: #64748b;
  padding: 0.125rem;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.archive-search-close:hover {
  background: rgba(0, 0, 0, 0.05);
  color: #475569;
}

.archive-search-close svg {
  width: 16px;
  height: 16px;
}

.search-icon {
  width: 16px;
  height: 16px;
  color: #64748b;
}
</style>