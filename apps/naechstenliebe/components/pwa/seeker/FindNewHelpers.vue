<template>
  <div class="find-helpers-card">
    <h3 class="card-title">Neue Helfer entdecken</h3>
    <p class="card-subtitle">Finden Sie weitere zuverlässige Helfer in Ihrer Nähe</p>
    
    <button @click="$emit('search-helpers')" class="search-btn">
      <svg class="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
      </svg>
      Helfer suchen
    </button>
  </div>
</template>

<script setup>
defineEmits(['search-helpers'])
</script>

<style scoped>
/* Mobile First Design */
.find-helpers-card {
  background: white;
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  text-align: center;
  margin-bottom: 1.5rem;
}

.card-title {
  color: #474747;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 0.75rem 0;
  line-height: 1.3;
}

.card-subtitle {
  color: #8F8B82;
  margin: 0 0 1.5rem 0;
  font-size: 1rem;
  line-height: 1.5;
}

.search-btn {
  background: #5F6F55;
  color: white;
  padding: 1.25rem 2rem;
  border-radius: 16px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  font-size: 1.125rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin: 0 auto;
  min-height: 3rem;
}

.search-btn:hover {
  background: #4a5c44;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(95, 111, 85, 0.3);
}

.search-icon {
  width: 1.5rem;
  height: 1.5rem;
}

/* Tablet and Desktop */
@media (min-width: 768px) {
  .card-title {
    font-size: 1.25rem;
  }
  
  .card-subtitle {
    font-size: 0.875rem;
  }
  
  .search-btn {
    padding: 1rem 2rem;
    font-size: 0.875rem;
    min-height: auto;
  }
  
  .search-icon {
    width: 1.25rem;
    height: 1.25rem;
  }
}
</style>