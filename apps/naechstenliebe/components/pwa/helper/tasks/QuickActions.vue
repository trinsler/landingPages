<template>
  <div class="quick-actions-container">
    <div class="actions-header">
      <h3 class="actions-title">Schnellaktionen</h3>
      <p class="actions-subtitle">Hilfe und wichtige Funktionen</p>
    </div>
    
    <div class="actions-grid">
      <!-- Data Protection Button -->
      <button 
        class="action-card protection-card"
        @click="$emit('open-data-protection')"
      >
        <div class="card-icon protection-icon">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
          </svg>
        </div>
        <div class="card-content">
          <span class="card-title">Datenschutz</span>
          <span class="card-description">Ihre Daten sicher</span>
        </div>
      </button>
      
      <!-- Conflict Resolution Button -->
      <button 
        class="action-card support-card"
        @click="$emit('open-conflict-resolution')"
      >
        <div class="card-icon support-icon">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"/>
          </svg>
        </div>
        <div class="card-content">
          <span class="card-title">Support</span>
          <span class="card-description">Hilfe benötigt?</span>
        </div>
      </button>

      <!-- Quick Navigation -->
      <button 
        class="action-card dashboard-card"
        @click="$emit('open-dashboard')"
      >
        <div class="card-icon dashboard-icon">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m-6 3l6-3"/>
          </svg>
        </div>
        <div class="card-content">
          <span class="card-title">Zur Karte</span>
          <span class="card-description">Neue Aufträge</span>
        </div>
      </button>
    </div>
  </div>
</template>

<script setup>
defineEmits(['open-data-protection', 'open-conflict-resolution', 'open-dashboard'])
</script>

<style scoped>
/* Quick Actions Container */
.quick-actions-container {
  background: white;
  padding: 1.5rem;
  border-bottom: 1px solid rgba(0,0,0,0.05);
}

.actions-header {
  margin-bottom: 1.25rem;
}

.actions-title {
  color: #374151;
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 0.25rem 0;
  line-height: 1.3;
}

.actions-subtitle {
  color: #6b7280;
  font-size: 0.875rem;
  margin: 0;
  font-weight: 500;
}

/* Actions Grid */
.actions-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
}

/* Action Cards */
.action-card {
  background: white;
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: 12px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.75rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.action-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0,0,0,0.12);
  border-color: #5F6F55;
}

.action-card:active {
  transform: translateY(0);
}

/* Card Icons */
.card-icon {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.card-icon svg {
  width: 1.25rem;
  height: 1.25rem;
}

.protection-icon {
  background: rgba(95, 111, 85, 0.1);
  color: #5F6F55;
}

.support-icon {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}

.dashboard-icon {
  background: rgba(190, 205, 163, 0.2);
  color: #5F6F55;
}

/* Card Content */
.card-content {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 0;
}

.card-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  line-height: 1.2;
}

.card-description {
  font-size: 0.75rem;
  color: #6b7280;
  font-weight: 500;
  line-height: 1.3;
}

/* Hover Effects */
.protection-card:hover .protection-icon {
  background: #5F6F55;
  color: white;
}

.support-card:hover .support-icon {
  background: #ef4444;
  color: white;
}

.dashboard-card:hover .dashboard-icon {
  background: #5F6F55;
  color: white;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .quick-actions-container {
    padding: 1rem;
  }
  
  .actions-grid {
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
  }
  
  .action-card {
    padding: 0.875rem 0.75rem;
    gap: 0.5rem;
  }
  
  .card-icon {
    width: 2rem;
    height: 2rem;
  }
  
  .card-icon svg {
    width: 1rem;
    height: 1rem;
  }
  
  .card-title {
    font-size: 0.8125rem;
  }
  
  .card-description {
    font-size: 0.6875rem;
  }
  
  .actions-title {
    font-size: 1rem;
  }
  
  .actions-subtitle {
    font-size: 0.8125rem;
  }
}

/* Very small screens */
@media (max-width: 480px) {
  .actions-grid {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
  
  .action-card {
    flex-direction: row;
    text-align: left;
    gap: 1rem;
  }
  
  .card-content {
    align-items: flex-start;
  }
}

/* Large screens */
@media (min-width: 1024px) {
  .quick-actions-container {
    padding: 2rem;
  }
  
  .actions-grid {
    gap: 1.25rem;
  }
  
  .action-card {
    padding: 1.25rem;
    gap: 1rem;
  }
  
  .card-icon {
    width: 3rem;
    height: 3rem;
  }
  
  .card-icon svg {
    width: 1.5rem;
    height: 1.5rem;
  }
}
</style>