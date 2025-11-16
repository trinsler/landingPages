<template>
  <div class="stats-grid">
    <div class="stat-card">
      <div class="stat-value">{{ helperStats.completedTasks }}</div>
      <div class="stat-label">Erledigte Aufträge</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">{{ helperStats.avgRating.toFixed(1) }}★</div>
      <div class="stat-label">Durchschnittliche Bewertung</div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  helperStats: {
    type: Object,
    default: () => ({
      completedTasks: 0,
      avgRating: 0,
      level: 'Bronze',
      levelClass: 'bronze',
      nextLevel: 'Silber',
      jobsToNext: 2,
      totalEarned: 0
    })
  }
})
</script>

<style scoped>
.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.stat-card {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  transition: all 0.2s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0,0,0,0.15);
}

.stat-value {
  font-size: 2.25rem;
  font-weight: 700;
  color: #5F6F55;
  margin-bottom: 0.5rem;
  line-height: 1.2;
}

.stat-label {
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 500;
  line-height: 1.4;
}

/* Tablet Optimizations */
@media (min-width: 768px) {
  .stat-value {
    font-size: 2rem;
  }
}

@media (min-width: 1024px) {
  .stats-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
  }
}
</style>