<template>
  <div class="unified-footer">
    <div class="footer-content">
      <!-- Helper Navigation -->
      <div class="nav-section helper-section">
        <span class="section-label">Helfen</span>
        <div class="nav-items">
          <button 
            class="nav-item"
            :class="{ active: activeTab === 'dashboard' }"
            @click="$emit('navigate', 'dashboard')"
          >
            <svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m-6 3l6-3"/>
            </svg>
            <span class="nav-text">Karte</span>
          </button>
          
          <button 
            class="nav-item"
            @click="$emit('navigate', 'helper-tasks')"
          >
            <svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
            </svg>
            <span class="nav-text">Aufträge</span>
          </button>
          
          <button 
            class="nav-item"
            @click="$emit('navigate', 'helper-earnings')"
          >
            <svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
            </svg>
            <span class="nav-text">Verdienst</span>
          </button>
        </div>
      </div>

      <!-- Divider -->
      <div class="nav-divider"></div>

      <!-- Seeker Navigation -->
      <div class="nav-section seeker-section">
        <span class="section-label">Hilfe suchen</span>
        <div class="nav-items">
          <button 
            class="nav-item"
            @click="$emit('navigate', 'seeker-create')"
          >
            <svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
            </svg>
            <span class="nav-text">Erstellen</span>
          </button>
          
          <button 
            class="nav-item"
            @click="$emit('navigate', 'seeker-history')"
          >
            <svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4h3a1 1 0 011 1v9a1 1 0 01-1 1H5a1 1 0 01-1-1V8a1 1 0 011-1h3z"/>
            </svg>
            <span class="nav-text">Anfragen</span>
          </button>
          
          <button 
            class="nav-item"
            @click="$emit('navigate', 'seeker-favorites')"
          >
            <svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
            </svg>
            <span class="nav-text">Favoriten</span>
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
defineProps({
  activeTab: {
    type: String,
    default: 'dashboard'
  },
  currentRole: {
    type: String,
    default: 'unified'
  }
})

defineEmits(['navigate'])
</script>

<style scoped>
/* Unified Footer Navigation */
.unified-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  border-top: 1px solid rgba(0,0,0,0.1);
  box-shadow: 0 -4px 16px rgba(0,0,0,0.1);
  z-index: 30;
  backdrop-filter: blur(10px);
}

.footer-content {
  display: flex;
  align-items: stretch;
  padding: 0.75rem 1rem;
  max-width: 1200px;
  margin: 0 auto;
  gap: 1rem;
}

/* Navigation Sections */
.nav-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
}

.section-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0 0.5rem;
}

.nav-items {
  display: flex;
  gap: 0.5rem;
  flex: 1;
}

/* Navigation Items */
.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem;
  border: none;
  background: transparent;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: 8px;
  flex: 1;
  min-width: 0;
}

.nav-item:hover {
  background: rgba(95, 111, 85, 0.1);
  color: #5F6F55;
}

.nav-item.active {
  background: #5F6F55;
  color: white;
}

.nav-icon {
  width: 1.25rem;
  height: 1.25rem;
  flex-shrink: 0;
}

.nav-text {
  font-size: 0.75rem;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}

/* Section-specific styling */
.helper-section .nav-item:hover {
  background: rgba(95, 111, 85, 0.1);
  color: #5F6F55;
}

.seeker-section .nav-item:hover {
  background: rgba(190, 205, 163, 0.2);
  color: #5F6F55;
}


/* Dividers */
.nav-divider {
  width: 1px;
  background: rgba(0,0,0,0.1);
  margin: 0.25rem 0;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .footer-content {
    padding: 0.5rem;
    gap: 0.5rem;
  }
  
  .section-label {
    font-size: 0.625rem;
    display: none; /* Hide labels on mobile to save space */
  }
  
  .nav-items {
    gap: 0.25rem;
  }
  
  .nav-item {
    padding: 0.375rem 0.25rem;
    gap: 0.125rem;
  }
  
  .nav-icon {
    width: 1rem;
    height: 1rem;
  }
  
  .nav-text {
    font-size: 0.625rem;
  }
  
  /* Stack sections vertically on very small screens */
  @media (max-width: 480px) {
    .footer-content {
      flex-direction: column;
      padding: 0.5rem;
      gap: 0.75rem;
    }
    
    .nav-divider {
      height: 1px;
      width: 100%;
      margin: 0;
    }
    
    .section-label {
      display: block;
      text-align: center;
    }
  }
}

/* Large screens */
@media (min-width: 1024px) {
  .footer-content {
    padding: 1rem 2rem;
  }
  
  .nav-item {
    padding: 0.75rem 1rem;
    gap: 0.5rem;
  }
  
  .nav-icon {
    width: 1.5rem;
    height: 1.5rem;
  }
  
  .nav-text {
    font-size: 0.875rem;
  }
}
</style>