<template>
  <div class="search-bar">
    <div class="search-input-wrapper">
      <svg class="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
      </svg>
      <input 
        :value="query"
        @input="$emit('update:query', $event.target.value)"
        type="text" 
        class="search-field"
        placeholder="Gespräche durchsuchen..."
        ref="searchInput"
      />
      <button @click="$emit('close')" class="search-close">
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
.search-bar {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  padding: 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  position: sticky;
  top: 76px;
  z-index: 90;
}

.search-input-wrapper {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(95, 111, 85, 0.2);
  border-radius: 16px;
  padding: 0.75rem 1rem;
  gap: 0.75rem;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.search-input-wrapper:focus-within {
  border-color: #5F6F55;
  box-shadow: 0 0 0 3px rgba(95, 111, 85, 0.1);
}

.search-icon {
  width: 18px;
  height: 18px;
  color: #64748b;
}

.search-field {
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
  font-size: 1rem;
  color: #1e293b;
  font-weight: 500;
}

.search-field::placeholder {
  color: #94a3b8;
}

.search-close {
  background: rgba(0, 0, 0, 0.04);
  border: none;
  color: #64748b;
  padding: 0.25rem;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.search-close:hover {
  background: rgba(0, 0, 0, 0.08);
  color: #475569;
}

.search-close svg {
  width: 18px;
  height: 18px;
}
</style>