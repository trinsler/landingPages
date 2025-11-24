<template>
  <div class="exam-header-info">
    <h1 class="exams-title">{{ title }}</h1>
    <div class="scenario-info">
      <span class="scenario-label">Scenario Code:</span>
      <span class="scenario-code">{{ scenarioCode }}</span>
    </div>
    <div v-if="isStarting" class="starting-exam">
      <p>Preparing your exam questions...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  scenarioCode: string
  isStarting?: boolean
}>()
</script>

<style scoped>
.exam-header-info {
  text-align: center;
  margin-bottom: 3rem;
}

.exams-title {
  color: #1f2937;
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.scenario-info {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #f3f4f6;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}

.scenario-label {
  color: #6b7280;
  font-size: 0.875rem;
  font-weight: 500;
}

.scenario-code {
  color: #0097b2;
  font-size: 0.875rem;
  font-weight: 700;
  font-family: 'Courier New', monospace;
  background: #ffffff;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  border: 1px solid #d1d5db;
}

.starting-exam {
  background: #f0f9ff;
  border: 1px solid #0ea5e9;
  border-radius: 8px;
  padding: 1.5rem;
  margin-top: 1.5rem;
}

.starting-exam p {
  color: #0369a1;
  margin: 0;
  font-weight: 500;
}
</style>