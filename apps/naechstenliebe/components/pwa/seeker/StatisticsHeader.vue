<template>
  <div class="stats-container">
    <div class="stats-header">
      <div class="icon-container">
        <div class="icon-circle">
          <svg class="stats-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
          </svg>
        </div>
      </div>
      <h2 class="stats-title">Hallo Margarete!</h2>
      <p class="stats-subtitle">So haben Ihnen unsere Helfer geholfen:</p>
    </div>
    
    <div class="stats-grid">
      <div class="stat-item primary">
        <div class="stat-value">{{ stats.totalTasks }}</div>
        <div class="stat-label">Mal geholfen bekommen</div>
        <div class="stat-sublabel">Vielen Dank!</div>
      </div>
      <div class="stat-item">
        <div class="stat-value">{{ stats.rating }} Sterne</div>
        <div class="stat-label">Ihre Bewertung</div>
        <div class="stat-sublabel">Top bewertet!</div>
      </div>
      <div class="stat-item">
        <div class="stat-value">{{ stats.favorites }}</div>
        <div class="stat-label">Stamm-Helfer</div>
        <div class="stat-sublabel">Vertrauensvoll</div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  stats: {
    type: Object,
    default: () => ({
      totalTasks: 47,
      rating: 4.9,
      favorites: 8
    })
  }
})
</script>

<style scoped>
/* Mobile First Design */
.stats-container {
  background: white;
  border-radius: 20px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.stats-header {
  text-align: center;
  margin-bottom: 1.5rem;
}

.icon-container {
  margin-bottom: 1rem;
}

.icon-circle {
  width: 5rem;
  height: 5rem;
  background: #BECDA3;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}

.stats-icon {
  width: 2.5rem;
  height: 2.5rem;
  color: #5F6F55;
}

.stats-title {
  color: #474747;
  font-size: 1.75rem;
  font-weight: 600;
  margin: 0 0 0.75rem 0;
  line-height: 1.3;
}

.stats-subtitle {
  color: #8F8B82;
  margin: 0;
  font-size: 1.125rem;
  line-height: 1.5;
}

.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
  text-align: center;
}

.stat-item {
  background: rgba(190, 205, 163, 0.2);
  border-radius: 16px;
  padding: 1.25rem 1rem;
  transition: all 0.2s ease;
  border: 2px solid transparent;
}

.stat-item.primary {
  background: rgba(95, 111, 85, 0.1);
  border-color: rgba(95, 111, 85, 0.2);
}

.stat-item:hover {
  background: rgba(190, 205, 163, 0.3);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.stat-item.primary:hover {
  background: rgba(95, 111, 85, 0.15);
}

.stat-value {
  font-size: 2rem;
  font-weight: 600;
  color: #474747;
  margin-bottom: 0.5rem;
  line-height: 1.2;
}

.stat-label {
  font-size: 0.875rem;
  color: #8F8B82;
  font-weight: 500;
  line-height: 1.3;
  margin-bottom: 0.25rem;
}

.stat-sublabel {
  font-size: 0.75rem;
  color: #5F6F55;
  font-weight: 600;
  line-height: 1.2;
}

/* Tablet and Desktop */
@media (min-width: 768px) {
  .stats-container {
    padding: 1.5rem;
  }
  
  .icon-circle {
    width: 4rem;
    height: 4rem;
  }
  
  .stats-icon {
    width: 2rem;
    height: 2rem;
  }
  
  .stats-title {
    font-size: 1.5rem;
  }
  
  .stats-subtitle {
    font-size: 1rem;
  }
  
  .stat-item {
    padding: 1rem;
  }
  
  .stat-value {
    font-size: 1.75rem;
  }
}

@media (min-width: 1024px) {
  .stats-grid {
    gap: 1.5rem;
  }
}
</style>