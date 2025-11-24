<template>
  <div class="scenario-header">
    <div class="scenario-info">
      <h1 class="scenario-title">{{ scenarioData.title }}</h1>
      <div class="scenario-meta">
        <span class="scenario-code">Code: {{ scenarioCode }}</span>
        <span class="attempt-info">Attempt {{ currentAttempt }} of {{ scenarioData.attempts }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  scenarioData: {
    title: string;
    totalTime: number;
    totalQuestions: number;
    timePerQuestion: number;
    description: string;
    examId: string;
    difficulty: string;
    category: string;
    attempts?: number;
  };
  scenarioCode: string;
  currentAttempt?: number;
}>()
</script>

<style scoped>
.scenario-header {
  text-align: center;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 2px solid #f1f5f9;
}

.scenario-title {
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.scenario-meta {
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.scenario-code {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background-color: #0097b2;
  color: #ffffff;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
}

.attempt-info {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background-color: #f3f4f6;
  color: #374151;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
  border: 1px solid #d1d5db;
}

/* Responsive Design */
@media (max-width: 768px) {
  .scenario-title {
    font-size: 1.5rem;
  }
}
</style>