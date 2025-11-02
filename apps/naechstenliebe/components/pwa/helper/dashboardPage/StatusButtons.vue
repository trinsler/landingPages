<template>
  <div class="status-buttons-container">
    <div class="status-buttons">
      <!-- Standort Status Button -->
      <div class="location-status">
        <div class="status-indicator" :class="locationStatus"></div>
        <span class="status-text">
          {{ locationStatus === 'active' ? 'Standort aktiv' : 'Ermittelt...' }}
        </span>
      </div>
      
      <!-- Verfügbarkeit Button -->
      <button 
        class="availability-button"
        :class="{ 'available': isAvailable, 'unavailable': !isAvailable }"
        @click="$emit('toggle-availability')"
      >
        <span class="button-text">{{ isAvailable ? '✓ Verfügbar' : '✗ Nicht verfügbar' }}</span>
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  isAvailable: Boolean,
  locationStatus: String
})

defineEmits(['toggle-availability'])
</script>

<style scoped>
.status-buttons-container {
  position: absolute;
  top: 1rem;
  left: 1rem;
  right: 1rem;
  z-index: 10;
  max-width: 400px;
}

.status-buttons {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.location-status {
  background: rgba(255,255,255,0.98);
  padding: 0.75rem 1rem;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
  min-width: 140px;
}

.status-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.status-indicator.active {
  background: #10b981;
  box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2);
}

.status-indicator.loading,
.status-indicator.error {
  background: #f59e0b;
  box-shadow: 0 0 0 2px rgba(245, 158, 11, 0.2);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.status-text {
  font-size: 0.875rem;
  color: #474747;
  font-weight: 600;
  white-space: nowrap;
}

.availability-button {
  padding: 0.75rem 1rem;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.875rem;
  transition: all 0.2s ease;
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 120px;
  white-space: nowrap;
}

.availability-button.available {
  background: #5F6F55;
  color: white;
}

.availability-button.unavailable {
  background: #8F8B82;
  color: white;
}

.availability-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 16px rgba(0,0,0,0.15);
}

.availability-button:active {
  transform: translateY(0);
}

.button-text {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* Mobile Responsiveness */
@media (max-width: 768px) {
  .status-buttons-container {
    top: 0.5rem;
    left: 0.5rem;
    right: 0.5rem;
    max-width: none;
  }
  
  .status-buttons {
    gap: 0.5rem;
  }
  
  .location-status,
  .availability-button {
    padding: 0.5rem 0.75rem;
    font-size: 0.75rem;
    min-width: 100px;
  }
  
  .status-indicator {
    width: 6px;
    height: 6px;
  }
}

/* Tablet Responsiveness */
@media (min-width: 769px) and (max-width: 1024px) {
  .status-buttons-container {
    top: 0.75rem;
    left: 0.75rem;
  }
}
</style>