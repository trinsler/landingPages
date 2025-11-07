<template>
  <div class="switch-card">
    <div class="icon-container">
      <div class="icon-circle">
        <svg class="switch-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
        </svg>
      </div>
    </div>
    <h3 class="switch-title">Selbst als Helfer aktiv werden</h3>
    <p class="switch-subtitle">Verdienen Sie Geld und helfen Sie Ihren Nachbarn</p>
    
    <button @click="$emit('switch-to-helper')" class="switch-btn">
      Helfer werden
    </button>
  </div>
</template>

<script setup>
defineEmits(['switch-to-helper'])
</script>

<style scoped>
/* Mobile First Design */
.switch-card {
  background: white;
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  text-align: center;
  margin-bottom: 1.5rem;
}

.icon-container {
  margin-bottom: 1rem;
}

.icon-circle {
  width: 4rem;
  height: 4rem;
  background: #BECDA3;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}

.switch-icon {
  width: 2rem;
  height: 2rem;
  color: #5F6F55;
}

.switch-title {
  color: #474747;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 0.75rem 0;
  line-height: 1.3;
}

.switch-subtitle {
  color: #8F8B82;
  margin: 0 0 1.5rem 0;
  font-size: 1rem;
  line-height: 1.5;
}

.switch-btn {
  background: #5F6F55;
  color: white;
  padding: 1.25rem 2rem;
  border-radius: 16px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  font-size: 1.125rem;
  transition: all 0.3s ease;
  min-height: 3rem;
}

.switch-btn:hover {
  background: #4a5c44;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(95, 111, 85, 0.3);
}

/* Tablet and Desktop */
@media (min-width: 768px) {
  .icon-circle {
    width: 3rem;
    height: 3rem;
  }
  
  .switch-icon {
    width: 1.5rem;
    height: 1.5rem;
  }
  
  .switch-title {
    font-size: 1.25rem;
  }
  
  .switch-subtitle {
    font-size: 0.875rem;
  }
  
  .switch-btn {
    padding: 1rem 2rem;
    font-size: 0.875rem;
    min-height: auto;
  }
}
</style>