<template>
  <div class="status-buttons-container">
    <div class="status-buttons">
      <!-- Standort Status Button -->
      <div class="location-status" :class="locationStatus">
        <div class="status-content">
          <div class="status-icon">
            <svg v-if="locationStatus === 'active'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            <svg v-else fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4l16 16m-7-7l-4-4m5-5l6 6M8 8l-1 1m5 5l1 1"/>
            </svg>
          </div>
          <div class="status-text-section">
            <span class="status-title">Standort</span>
            <span class="status-subtitle">
              {{ locationStatus === 'active' ? 'Aktiv' : 'Wird ermittelt...' }}
            </span>
          </div>
        </div>
        <div class="status-indicator" :class="locationStatus"></div>
      </div>
      
      <!-- Verfügbarkeit Button -->
      <button 
        class="availability-button"
        :class="{ 'available': isAvailable, 'unavailable': !isAvailable }"
        @click="$emit('toggle-availability')"
      >
        <div class="availability-content">
          <div class="availability-icon">
            <svg v-if="isAvailable" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
            <svg v-else fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </div>
          <div class="availability-text-section">
            <span class="availability-title">Verfügbarkeit</span>
            <span class="availability-subtitle">
              {{ isAvailable ? 'Verfügbar' : 'Nicht verfügbar' }}
            </span>
          </div>
        </div>
        <div class="availability-indicator" :class="{ 'active': isAvailable }"></div>
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
/* Status Buttons Container */
.status-buttons-container {
  position: absolute;
  top: 1rem;
  left: 1rem;
  right: 1rem;
  z-index: 10;
  max-width: 480px;
}

.status-buttons {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

/* Location Status */
.location-status {
  background: white;
  border: 1px solid rgba(95, 111, 85, 0.2);
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(95, 111, 85, 0.1);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.875rem 1rem;
  flex: 1;
  min-width: 180px;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
}

.location-status.active {
  border-color: #5F6F55;
  background: rgba(95, 111, 85, 0.02);
}

.location-status.loading {
  border-color: #BECDA3;
  background: rgba(190, 205, 163, 0.05);
}

.status-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: 1;
}

.status-icon {
  width: 2rem;
  height: 2rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.location-status.active .status-icon {
  background: rgba(95, 111, 85, 0.1);
  color: #5F6F55;
}

.location-status.loading .status-icon {
  background: rgba(190, 205, 163, 0.2);
  color: #8F8B82;
}

.status-icon svg {
  width: 1.125rem;
  height: 1.125rem;
}

.status-text-section {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
}

.status-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  line-height: 1.2;
}

.status-subtitle {
  font-size: 0.75rem;
  color: #6b7280;
  font-weight: 500;
}

.status-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
  position: relative;
}

.status-indicator.active {
  background: #5F6F55;
  box-shadow: 0 0 0 2px rgba(95, 111, 85, 0.2);
}

.status-indicator.loading {
  background: #BECDA3;
  box-shadow: 0 0 0 2px rgba(190, 205, 163, 0.3);
  animation: pulse 2s infinite;
}

.status-indicator.error {
  background: #ef4444;
  box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.2);
}

@keyframes pulse {
  0%, 100% { 
    opacity: 1;
    transform: scale(1);
  }
  50% { 
    opacity: 0.7;
    transform: scale(1.1);
  }
}

/* Availability Button */
.availability-button {
  background: white;
  border: 1px solid rgba(143, 139, 130, 0.2);
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(143, 139, 130, 0.1);
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.875rem 1rem;
  min-width: 200px;
  position: relative;
  overflow: hidden;
}

.availability-button.available {
  border-color: #5F6F55;
  background: rgba(95, 111, 85, 0.02);
}

.availability-button.unavailable {
  border-color: #8F8B82;
  background: rgba(143, 139, 130, 0.02);
}

.availability-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 16px rgba(0,0,0,0.15);
}

.availability-button:active {
  transform: translateY(0);
}

.availability-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: 1;
}

.availability-icon {
  width: 2rem;
  height: 2rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.availability-button.available .availability-icon {
  background: rgba(95, 111, 85, 0.1);
  color: #5F6F55;
}

.availability-button.unavailable .availability-icon {
  background: rgba(143, 139, 130, 0.1);
  color: #8F8B82;
}

.availability-icon svg {
  width: 1.125rem;
  height: 1.125rem;
}

.availability-text-section {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
}

.availability-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  line-height: 1.2;
}

.availability-subtitle {
  font-size: 0.75rem;
  font-weight: 500;
}

.availability-button.available .availability-subtitle {
  color: #5F6F55;
}

.availability-button.unavailable .availability-subtitle {
  color: #8F8B82;
}

.availability-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
  background: #d1d5db;
  transition: all 0.2s ease;
}

.availability-indicator.active {
  background: #5F6F55;
  box-shadow: 0 0 0 2px rgba(95, 111, 85, 0.2);
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
    flex-direction: column;
  }
  
  .location-status,
  .availability-button {
    padding: 0.75rem;
    min-width: 0;
    width: 100%;
  }
  
  .status-content,
  .availability-content {
    gap: 0.5rem;
  }
  
  .status-icon,
  .availability-icon {
    width: 1.75rem;
    height: 1.75rem;
  }
  
  .status-icon svg,
  .availability-icon svg {
    width: 1rem;
    height: 1rem;
  }
  
  .status-title,
  .availability-title {
    font-size: 0.8125rem;
  }
  
  .status-subtitle,
  .availability-subtitle {
    font-size: 0.6875rem;
  }
  
  .status-indicator,
  .availability-indicator {
    width: 6px;
    height: 6px;
  }
}

/* Tablet Responsiveness */
@media (min-width: 769px) and (max-width: 1024px) {
  .status-buttons-container {
    top: 0.75rem;
    left: 0.75rem;
    max-width: 420px;
  }
  
  .location-status,
  .availability-button {
    min-width: 160px;
  }
}

/* Large screens */
@media (min-width: 1200px) {
  .status-buttons-container {
    max-width: 520px;
  }
  
  .location-status,
  .availability-button {
    padding: 1rem 1.25rem;
  }
  
  .status-content,
  .availability-content {
    gap: 1rem;
  }
  
  .status-icon,
  .availability-icon {
    width: 2.25rem;
    height: 2.25rem;
  }
  
  .status-icon svg,
  .availability-icon svg {
    width: 1.25rem;
    height: 1.25rem;
  }
}
</style>