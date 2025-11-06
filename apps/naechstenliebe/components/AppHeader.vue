<template>
  <header class="unified-header">
    <div class="header-content">
      <!-- Logo and Title Section -->
      <div class="header-left">
        <div class="logo-container">
          <img src="/icons/logo.svg" alt="Logo" class="logo-img">
        </div>
        <div class="title-section">
          <h1 class="header-title">{{ title }}</h1>
          <!-- Unified Role Indicator -->
          <div v-if="showRoleIndicator && currentRole !== 'unified'" class="role-indicator">
            <div class="role-dot" :class="currentRole"></div>
            <span class="role-text">
              {{ currentRole === 'helper' ? 'Helfer-Modus' : 'Hilfe-Suchender' }}
            </span>
          </div>
          <div v-else-if="currentRole === 'unified'" class="role-indicator">
            <div class="role-dot unified"></div>
            <span class="role-text">Universell</span>
          </div>
        </div>
      </div>
      
      <!-- Action Buttons Section -->
      <div class="header-actions">
        <!-- Availability Toggle (nur für Helfer) -->
        <button 
          v-if="currentRole === 'unified' || currentRole === 'helper'"
          class="action-btn availability-btn"
          :class="{ 'available': isAvailable, 'unavailable': !isAvailable }"
          @click="$emit('toggleAvailability')"
          :title="isAvailable ? 'Als verfügbar markiert - Klicken zum Deaktivieren' : 'Als nicht verfügbar markiert - Klicken zum Aktivieren'"
          :aria-label="isAvailable ? 'Verfügbarkeitsstatus: Aktiv. Klicken um offline zu gehen.' : 'Verfügbarkeitsstatus: Offline. Klicken um verfügbar zu werden.'"
        >
          <div class="availability-indicator" :class="{ 'active': isAvailable }" aria-hidden="true"></div>
          <svg class="action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path v-if="isAvailable" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
          <span class="action-text">{{ isAvailable ? 'Verfügbar' : 'Offline' }}</span>
        </button>
        
        <!-- Location Status (nur für Helfer) -->
        <div 
          v-if="currentRole === 'unified' || currentRole === 'helper'"
          class="location-status-indicator"
          :class="locationStatus"
          :title="locationStatus === 'active' ? 'Standort aktiv - Sie werden für Aufträge in der Nähe gefunden' : 'Standort wird ermittelt - Bitte warten'"
          :aria-label="locationStatus === 'active' ? 'Standortstatus: Aktiv' : 'Standortstatus: Wird ermittelt'"
          role="status"
        >
          <svg class="location-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path v-if="locationStatus === 'active'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
            <path v-if="locationStatus === 'active'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4l16 16m-7-7l-4-4m5-5l6 6M8 8l-1 1m5 5l1 1"/>
          </svg>
          <div class="location-dot" :class="locationStatus" aria-hidden="true"></div>
        </div>
        
        <!-- Profile Button -->
        <button 
          class="action-btn profile-btn"
          @click="$emit('openProfile')"
          title="Profil und Einstellungen anzeigen"
          aria-label="Mein Profil öffnen"
        >
          <svg class="action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
          </svg>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: 'Dashboard'
  },
  requestCount: {
    type: Number,
    default: 0
  },
  currentRole: {
    type: String,
    default: 'unified', // 'seeker', 'helper', or 'unified'
    validator: (value) => ['seeker', 'helper', 'unified'].includes(value)
  },
  showRoleIndicator: {
    type: Boolean,
    default: true
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  locationStatus: {
    type: String,
    default: 'loading' // 'active', 'loading', 'error'
  }
})

defineEmits(['openRequests', 'openProfile', 'openNews', 'toggleRole', 'toggleAvailability'])

const getRequestButtonText = () => {
  if (props.currentRole === 'helper') {
    return 'Neue Aufträge'
  } else if (props.currentRole === 'unified') {
    return 'Anfragen'
  } else {
    return 'Hilfe anfragen'
  }
}
</script>

<style scoped>
/* Unified Header Design */
.unified-header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: white;
  border-bottom: 1px solid rgba(0,0,0,0.1);
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  backdrop-filter: blur(10px);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.875rem 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
}

/* Logo and Title Section */
.header-left {
  display: flex;
  align-items: center;
  gap: 0.875rem;
}

.logo-container {
  width: 2.5rem;
  height: 2.5rem;
  background: #5F6F55;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(95, 111, 85, 0.2);
}

.logo-img {
  width: 1.75rem;
  height: 1.75rem;
  filter: brightness(0) invert(1);
}

.title-section {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
}

.header-title {
  color: #374151;
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0;
  line-height: 1.2;
}

.role-indicator {
  display: flex;
  align-items: center;
  gap: 0.375rem;
}

.role-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
}

.role-dot.helper {
  background: #5F6F55;
  box-shadow: 0 0 0 2px rgba(95, 111, 85, 0.2);
}

.role-dot.seeker {
  background: #BECDA3;
  box-shadow: 0 0 0 2px rgba(190, 205, 163, 0.3);
}

.role-dot.unified {
  background: linear-gradient(45deg, #5F6F55 50%, #BECDA3 50%);
  box-shadow: 0 0 0 2px rgba(95, 111, 85, 0.2);
}

.role-text {
  color: #6b7280;
  font-size: 0.75rem;
  font-weight: 500;
}

/* Action Buttons Section */
.header-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.5rem 0.75rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;
  font-size: 0.875rem;
  position: relative;
}

.action-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.action-btn:active {
  transform: translateY(0);
}

.action-icon {
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
}

.action-text {
  white-space: nowrap;
}

/* Availability Button */
.availability-btn {
  background: rgba(255, 255, 255, 0.9);
  color: #6b7280;
  border: 1px solid rgba(0,0,0,0.1);
}

.availability-btn.available {
  background: rgba(95, 111, 85, 0.1);
  color: #5F6F55;
  border-color: rgba(95, 111, 85, 0.2);
}

.availability-btn.unavailable {
  background: rgba(143, 139, 130, 0.1);
  color: #8F8B82;
  border-color: rgba(143, 139, 130, 0.2);
}

.availability-btn:hover {
  background: #5F6F55;
  color: white;
  border-color: #5F6F55;
}

.availability-indicator {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #d1d5db;
  position: absolute;
  top: 0.25rem;
  right: 0.25rem;
}

.availability-indicator.active {
  background: #5F6F55;
  box-shadow: 0 0 0 1px rgba(95, 111, 85, 0.3);
}

/* Location Status Indicator */
.location-status-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: 8px;
  position: relative;
  cursor: help;
  transition: all 0.2s ease;
}

.location-status-indicator:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.location-status-indicator.active {
  background: rgba(95, 111, 85, 0.1);
  border-color: rgba(95, 111, 85, 0.2);
  color: #5F6F55;
}

.location-status-indicator.loading {
  background: rgba(190, 205, 163, 0.1);
  border-color: rgba(190, 205, 163, 0.2);
  color: #BECDA3;
}

.location-icon {
  width: 1rem;
  height: 1rem;
}

.location-dot {
  position: absolute;
  top: 0.25rem;
  right: 0.25rem;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #d1d5db;
}

.location-dot.active {
  background: #5F6F55;
  box-shadow: 0 0 0 1px rgba(95, 111, 85, 0.3);
}

.location-dot.loading {
  background: #BECDA3;
  animation: pulse 2s infinite;
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

/* Profile Button */
.profile-btn {
  background: rgba(255, 255, 255, 0.9);
  color: #6b7280;
  border: 1px solid rgba(0,0,0,0.1);
  padding: 0.5rem;
  width: 2.5rem;
  height: 2.5rem;
  justify-content: center;
}

.profile-btn:hover {
  background: #5F6F55;
  color: white;
  border-color: #5F6F55;
}

/* Button Variants */
.news-btn {
  background: rgba(143, 139, 130, 0.1);
  color: #8F8B82;
  border: 1px solid rgba(143, 139, 130, 0.2);
}

.news-btn:hover {
  background: #8F8B82;
  color: white;
  border-color: #8F8B82;
}

.requests-btn {
  background: #5F6F55;
  color: white;
  border: 1px solid #5F6F55;
}

.requests-btn:hover {
  background: #4a5544;
  border-color: #4a5544;
}

.profile-btn {
  background: rgba(95, 111, 85, 0.1);
  color: #5F6F55;
  border: 1px solid rgba(95, 111, 85, 0.2);
}

.profile-btn:hover {
  background: #5F6F55;
  color: white;
  border-color: #5F6F55;
}

.request-badge {
  background: #ef4444;
  color: white;
  min-width: 1rem;
  height: 1rem;
  border-radius: 50%;
  font-size: 0.625rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0.25rem;
  position: absolute;
  top: -0.25rem;
  right: -0.25rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.2);
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .header-content {
    padding: 0.75rem 1rem;
  }
  
  .header-left {
    gap: 0.75rem;
  }
  
  .logo-container {
    width: 2rem;
    height: 2rem;
  }
  
  .logo-img {
    width: 1.5rem;
    height: 1.5rem;
  }
  
  .header-title {
    font-size: 1.125rem;
  }
  
  .role-text {
    font-size: 0.6875rem;
  }
  
  .header-actions {
    gap: 0.375rem;
  }
  
  .action-btn {
    padding: 0.375rem 0.5rem;
    font-size: 0.75rem;
  }
  
  .action-text {
    display: none;
  }
  
  .action-icon {
    width: 0.875rem;
    height: 0.875rem;
  }
  
  .request-badge {
    min-width: 0.875rem;
    height: 0.875rem;
    font-size: 0.5rem;
    top: -0.125rem;
    right: -0.125rem;
  }
}

/* Tablet Responsive */
@media (min-width: 769px) and (max-width: 1024px) {
  .header-content {
    padding: 0.75rem 1.25rem;
  }
  
  .action-btn {
    padding: 0.5rem 0.625rem;
    font-size: 0.8125rem;
  }
}

/* Large screens */
@media (min-width: 1024px) {
  .header-content {
    padding: 1rem 2rem;
  }
  
  .action-btn {
    padding: 0.625rem 1rem;
    gap: 0.5rem;
  }
  
  .action-icon {
    width: 1.125rem;
    height: 1.125rem;
  }
}
</style>