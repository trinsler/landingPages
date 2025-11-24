<template>
  <div class="action-area">
    <button @click="$emit('startScenario')" class="start-button">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polygon points="5 3 19 12 5 21 5 3"/>
      </svg>
      Start Scenario
    </button>
  </div>
</template>

<script setup lang="ts">
defineEmits<{
  startScenario: []
}>()
</script>

<style scoped>
.action-area {
  text-align: center;
  padding-top: 2rem;
  border-top: 2px solid #f1f5f9;
}

.start-button {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 3rem;
  background-color: #0097b2;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 1.125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.start-button:hover {
  background-color: #007a8e;
  transform: translateY(-1px);
}

.start-button:active {
  transform: translateY(0);
}

/* Responsive Design */
@media (max-width: 768px) {
  .start-button {
    padding: 0.875rem 2rem;
    font-size: 1rem;
  }
}
</style>