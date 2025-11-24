<template>
  <div class="login-section">
    <div class="input-container">
      <input
        :value="scenarioCode"
        @input="$emit('updateCode', ($event.target as HTMLInputElement).value)"
        type="text"
        :placeholder="t('enterCode')"
        class="scenario-input"
        @keyup.enter="$emit('handleLogin')"
      />
      <div v-if="validationError" class="error-message">
        {{ validationError }}
      </div>
    </div>
    
    <button 
      @click="$emit('handleLogin')" 
      class="login-button"
    >
      {{ t('start') }}
    </button>
  </div>
</template>

<script setup lang="ts">
defineEmits(['updateCode', 'handleLogin'])

defineProps<{
  scenarioCode: string
  validationError: string
  t: (key: string) => string
}>()
</script>

<style scoped>
.login-section {
  margin-bottom: 2rem;
}

.input-container {
  margin-bottom: 1.5rem;
  position: relative;
}

.scenario-input {
  width: 100%;
  padding: 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s;
  background-color: #ffffff;
  color: #000000;
}

.scenario-input:focus {
  outline: none;
  border-color: #0097b2;
  box-shadow: 0 0 0 3px rgba(0, 151, 178, 0.1);
}

.scenario-input::placeholder {
  color: #9ca3af;
}

.error-message {
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: 0.5rem;
  text-align: left;
}

.login-button {
  width: 100%;
  padding: 1rem 2rem;
  background-color: #0097b2;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 1.125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.login-button:hover:not(:disabled) {
  background-color: #007a8e;
  transform: translateY(-1px);
}

.login-button:disabled {
  background-color: #d1d5db;
  cursor: not-allowed;
  transform: none;
}
</style>