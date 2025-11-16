<template>
  <div class="stats-grid">
    <div class="stat-card">
      <div class="stat-value">{{ thisMonthEarnings }}€</div>
      <div class="stat-label">Diesen Monat</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">{{ avgPerTask }}€</div>
      <div class="stat-label">Ø pro Auftrag</div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  thisMonthEarnings: {
    type: Number,
    default: 0
  },
  avgPerTask: {
    type: Number,
    default: 0
  }
})
</script>

<style scoped>
.stats-grid {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1.5rem;
  box-sizing: border-box;
}

.stat-card {
  width: 100%;
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  box-sizing: border-box;
}

.stat-value {
  font-size: 1.75rem;
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

/* Tablet and Desktop */
@media (min-width: 768px) {
  .stat-card {
    padding: 1.5rem;
  }
  
  .stat-value {
    font-size: 1.5rem;
  }
}

@media (min-width: 1024px) {
  .stats-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
  }
}
</style>