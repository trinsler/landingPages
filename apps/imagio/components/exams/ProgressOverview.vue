<template>
  <div class="progress-overview">
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-value">{{ statistics.currentLevel }}</div>
        <div class="stat-label">Current Level</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">{{ statistics.completedExams }}</div>
        <div class="stat-label">{{ t('completedExams', globalTranslations) }}</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">{{ Math.round(statistics.successRate) }}%</div>
        <div class="stat-label">Success Rate</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">{{ statistics.totalAttempts }}</div>
        <div class="stat-label">Total Attempts</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLanguage, globalTranslations } from '~/composables/useLanguage'

const { t } = useLanguage()

defineProps<{
  statistics: {
    currentLevel: number
    completedExams: number
    successRate: number
    totalAttempts: number
  }
}>()
</script>

<style scoped>
.progress-overview {
  background: #ffffff;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 3rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.stat-card {
  text-align: center;
  padding: 1.5rem;
  background: #f8fafc;
  border-radius: 8px;
  border: 2px solid #e5e7eb;
}

.stat-value {
  font-size: 2rem;
  font-weight: 700;
  color: #0097b2;
  margin-bottom: 0.5rem;
}

.stat-label {
  color: #6b7280;
  font-weight: 500;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>