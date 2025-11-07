<template>
  <nav class="minimal-footer" role="navigation" aria-label="Hauptnavigation">
    <div class="footer-content">
      
      <!-- Dashboard -->
      <button 
        class="nav-btn"
        :class="{ active: activeTab === 'dashboard' }"
        @click="$emit('navigate', 'dashboard')"
        aria-label="Dashboard"
      >
        <svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"/>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5v6l3-3 3 3V5"/>
        </svg>
        <span class="nav-text">Home</span>
      </button>

      <!-- Tasks/Jobs -->
      <button 
        class="nav-btn"
        :class="{ active: activeTab === 'helper-tasks' || activeTab === 'seeker-history' }"
        @click="handleTasksClick"
        aria-label="Aufträge"
      >
        <svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
        </svg>
        <span class="nav-text">Jobs</span>
      </button>

      <!-- Create (Primary Action) -->
      <button 
        class="nav-btn create-btn"
        @click="$emit('navigate', 'seeker-create')"
        aria-label="Neue Hilfe erstellen"
      >
        <div class="create-icon">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
          </svg>
        </div>
        <span class="nav-text">Erstellen</span>
      </button>

      <!-- Earnings -->
      <button 
        class="nav-btn"
        :class="{ active: activeTab === 'helper-earnings' }"
        @click="$emit('navigate', 'helper-earnings')"
        aria-label="Verdienst"
      >
        <svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
        </svg>
        <span class="nav-text">Verdienst</span>
      </button>

      <!-- Profile -->
      <button 
        class="nav-btn"
        :class="{ active: activeTab === 'profile' }"
        @click="$emit('navigate', 'profile')"
        aria-label="Profil"
      >
        <svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
        </svg>
        <span class="nav-text">Profil</span>
      </button>

    </div>
  </nav>
</template>

<script setup>
const props = defineProps({
  activeTab: {
    type: String,
    default: 'dashboard'
  },
  currentRole: {
    type: String,
    default: 'unified'
  }
})

const emit = defineEmits(['navigate'])

const handleTasksClick = () => {
  // Smart navigation based on context
  if (props.currentRole === 'helper' || props.activeTab.includes('helper')) {
    emit('navigate', 'helper-tasks')
  } else {
    emit('navigate', 'seeker-history')
  }
}
</script>

<style scoped>
/* Modern Mobile-First Footer Navigation */
.minimal-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 50;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-top: 1px solid rgba(0, 0, 0, 0.06);
  padding-bottom: env(safe-area-inset-bottom);
}

.footer-content {
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0.5rem 1rem;
  max-width: 100vw;
  box-sizing: border-box;
}

/* Navigation Buttons */
.nav-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  padding: 0.5rem 0.25rem;
  min-width: 44px;
  min-height: 44px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #6b7280;
  position: relative;
}

.nav-btn:hover {
  background: rgba(0, 0, 0, 0.04);
}

.nav-btn:active {
  transform: scale(0.96);
}

.nav-btn.active {
  color: #5F6F55;
}

.nav-btn.active .nav-icon {
  transform: scale(1.1);
}

/* Icons */
.nav-icon {
  width: 22px;
  height: 22px;
  margin-bottom: 0.25rem;
  transition: all 0.2s ease;
}

/* Text Labels */
.nav-text {
  font-size: 0.625rem;
  font-weight: 500;
  line-height: 1;
  letter-spacing: 0.025em;
}

/* Create Button (Primary Action) */
.create-btn {
  color: white;
  background: linear-gradient(135deg, #5F6F55 0%, #4a5c44 100%);
  border-radius: 16px;
  padding: 0.75rem 0.5rem;
  box-shadow: 0 4px 12px rgba(95, 111, 85, 0.3);
}

.create-btn:hover {
  background: linear-gradient(135deg, #4a5c44 0%, #3d4d38 100%);
  box-shadow: 0 6px 16px rgba(95, 111, 85, 0.4);
}

.create-btn .nav-text {
  color: white;
  font-weight: 600;
}

.create-icon {
  width: 24px;
  height: 24px;
  margin-bottom: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.create-icon svg {
  width: 18px;
  height: 18px;
}

/* Active State Indicator */
.nav-btn.active::before {
  content: '';
  position: absolute;
  top: -1px;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 4px;
  background: #5F6F55;
  border-radius: 50%;
}

/* Responsive Adjustments */
@media (min-width: 768px) {
  .footer-content {
    max-width: 768px;
    margin: 0 auto;
    padding: 0.75rem 2rem;
  }
  
  .nav-btn {
    padding: 0.75rem 0.5rem;
  }
  
  .nav-icon {
    width: 24px;
    height: 24px;
  }
  
  .nav-text {
    font-size: 0.75rem;
  }
}

@media (max-width: 374px) {
  .footer-content {
    padding: 0.25rem 0.5rem;
  }
  
  .nav-btn {
    padding: 0.375rem 0.125rem;
    min-width: 40px;
    min-height: 40px;
  }
  
  .nav-icon {
    width: 20px;
    height: 20px;
  }
  
  .nav-text {
    font-size: 0.5rem;
  }
  
  .create-btn {
    padding: 0.625rem 0.375rem;
  }
}

/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
  .minimal-footer {
    background: rgba(17, 24, 39, 0.95);
    border-top-color: rgba(255, 255, 255, 0.1);
  }
  
  .nav-btn {
    color: #9ca3af;
  }
  
  .nav-btn:hover {
    background: rgba(255, 255, 255, 0.1);
  }
  
  .nav-btn.active {
    color: #BECDA3;
  }
}
</style>