<template>
  <div class="scenario-details">
    <div class="detail-item">
      <strong>Total Duration:</strong> {{ scenarioData.totalTime }} minutes
    </div>
    <div class="detail-item">
      <strong>Questions:</strong> {{ scenarioData.totalQuestions }} questions
    </div>
    <div class="detail-item">
      <strong>Time per Question:</strong> {{ scenarioData.timePerQuestion }} seconds
    </div>
    <div class="detail-item">
      <strong>Attempts:</strong> {{ scenarioData.attempts || 3 }} attempts allowed
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
}>()
</script>

<style scoped>
.scenario-details {
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.detail-item {
  padding: 0.75rem 0;
  border-bottom: 1px solid #e2e8f0;
  color: #374151;
  font-size: 1rem;
}

.detail-item:last-child {
  border-bottom: none;
  margin-bottom: 0;
}

.detail-item strong {
  color: #1f2937;
  font-weight: 600;
}
</style>