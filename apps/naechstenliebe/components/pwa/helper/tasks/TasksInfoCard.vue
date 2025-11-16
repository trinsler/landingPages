<template>
  <div class="info-card">
    <div class="icon-container">
      <div class="icon-circle">
        <svg class="task-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m-6 3l6-3"/>
        </svg>
      </div>
    </div>
    <h2 class="info-title">Aufträge verwalten</h2>
    <p class="info-subtitle">Neue Aufträge finden Sie auf dem Dashboard mit intelligenter Geo-Zuordnung</p>
    
    <button @click="$emit('goToDashboard')" class="dashboard-btn">
      <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"/>
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5v6l3-3 3 3V5"/>
      </svg>
      Zum Dashboard
    </button>
  </div>
</template>

<script setup>
const emit = defineEmits(['goToDashboard'])
</script>

<style scoped>
.info-card {
  background: white;
  border-radius: 20px;
  padding: 2rem 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  text-align: center;
}

.icon-container {
  margin-bottom: 1.5rem;
}

.icon-circle {
  width: 5rem;
  height: 5rem;
  background: #5F6F55;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}

.task-icon {
  width: 2.5rem;
  height: 2.5rem;
  color: white;
}

.info-title {
  color: #474747;
  font-size: 1.75rem;
  font-weight: 600;
  margin: 0 0 0.75rem 0;
  line-height: 1.3;
}

.info-subtitle {
  color: #8F8B82;
  margin: 0 0 2rem 0;
  font-size: 1.125rem;
  line-height: 1.5;
}

.dashboard-btn {
  background: #5F6F55;
  color: white;
  padding: 1.25rem 2rem;
  border-radius: 16px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  font-size: 1.125rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin: 0 auto;
  min-height: 3.5rem;
}

.dashboard-btn:hover {
  background: #4a5c44;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(95, 111, 85, 0.3);
}

.btn-icon {
  width: 1.5rem;
  height: 1.5rem;
}
</style>