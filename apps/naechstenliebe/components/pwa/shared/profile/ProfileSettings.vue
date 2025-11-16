<template>
  <div class="section-card settings-section">
    <h3 class="section-title">Einstellungen</h3>
    
    <div class="settings-grid">
      <button class="setting-btn" @click="$emit('editPersonalData')">
        <div class="setting-content">
          <div class="setting-icon-container">
            <svg class="setting-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
          </div>
          <span class="setting-text">Persönliche Daten bearbeiten</span>
        </div>
        <svg class="setting-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
      </button>

      <button class="setting-btn" @click="$emit('goToNotifications')">
        <div class="setting-content">
          <div class="setting-icon-container">
            <svg class="setting-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM4.828 2.828a4 4 0 010 5.656L12 16h4v4L4.828 8.828z"/>
            </svg>
          </div>
          <span class="setting-text">Benachrichtigungen</span>
        </div>
        <svg class="setting-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
      </button>

      <button class="setting-btn" @click="$emit('goToPaymentMethods')">
        <div class="setting-content">
          <div class="setting-icon-container">
            <svg class="setting-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
            </svg>
          </div>
          <span class="setting-text">Zahlungsmethoden</span>
        </div>
        <svg class="setting-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
      </button>

      <button class="setting-btn" @click="$emit('goToMyPayments')">
        <div class="setting-content">
          <div class="setting-icon-container">
            <svg class="setting-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
            </svg>
          </div>
          <span class="setting-text">Meine Zahlungen</span>
        </div>
        <svg class="setting-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
      </button>

      <button class="setting-btn" @click="$emit('createOrganization')">
        <div class="setting-content">
          <div class="setting-icon-container">
            <svg class="setting-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
            </svg>
          </div>
          <span class="setting-text">Organisation erstellen</span>
        </div>
        <svg class="setting-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
      </button>

      <button class="setting-btn" @click="$emit('joinOrganization')">
        <div class="setting-content">
          <div class="setting-icon-container">
            <svg class="setting-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
            </svg>
          </div>
          <span class="setting-text">Organisation beitreten</span>
        </div>
        <svg class="setting-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
      </button>

      <button class="setting-btn" @click="$emit('manageOrganization')">
        <div class="setting-content">
          <div class="setting-icon-container">
            <svg class="setting-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <span class="setting-text">Organisation verwalten</span>
        </div>
        <svg class="setting-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
      </button>

      <button class="setting-btn" @click="$emit('goToSupport')">
        <div class="setting-content">
          <div class="setting-icon-container">
            <svg class="setting-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"/>
            </svg>
          </div>
          <span class="setting-text">Hilfe & Support</span>
        </div>
        <svg class="setting-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits([
  'editPersonalData',
  'goToNotifications', 
  'goToPaymentMethods',
  'goToMyPayments',
  'createOrganization',
  'joinOrganization', 
  'manageOrganization',
  'goToSupport'
])
</script>

<style scoped>
/* Section Cards */
.section-card {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 24px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.section-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

.section-title {
  color: #1e293b;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
  background: linear-gradient(135deg, #1e293b, #475569);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-align: center;
}

/* Settings Grid */
.settings-grid {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.setting-btn {
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(226, 232, 240, 0.8);
  border-radius: 16px;
  padding: 1.25rem 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: space-between;
  backdrop-filter: blur(10px);
  text-align: left;
}

.setting-btn:hover {
  background: rgba(255, 255, 255, 0.9);
  border-color: #5F6F55;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(95, 111, 85, 0.15);
}

.setting-content {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
}

.setting-icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  background: rgba(95, 111, 85, 0.1);
  border-radius: 12px;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.setting-btn:hover .setting-icon-container {
  background: rgba(95, 111, 85, 0.2);
  transform: scale(1.05);
}

.setting-icon {
  width: 1.25rem;
  height: 1.25rem;
  color: #5F6F55;
  transition: all 0.3s ease;
}

.setting-btn:hover .setting-icon {
  color: #4a5c44;
}

.setting-text {
  color: #1e293b;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.4;
  transition: all 0.3s ease;
}

.setting-btn:hover .setting-text {
  color: #0f172a;
}

.setting-arrow {
  width: 1.25rem;
  height: 1.25rem;
  color: #64748b;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.setting-btn:hover .setting-arrow {
  color: #5F6F55;
  transform: translateX(2px);
}

/* Responsive Design */
@media (max-width: 480px) {
  .setting-btn {
    padding: 1rem 1.25rem;
  }
  
  .setting-icon-container {
    width: 2.25rem;
    height: 2.25rem;
  }
  
  .setting-icon {
    width: 1.125rem;
    height: 1.125rem;
  }
  
  .setting-text {
    font-size: 0.875rem;
  }
  
  .setting-arrow {
    width: 1.125rem;
    height: 1.125rem;
  }
}

@media (min-width: 768px) {
  .settings-section {
    padding: 2rem;
  }
  
  .settings-grid {
    gap: 1rem;
  }
  
  .setting-btn {
    padding: 1.5rem 2rem;
  }
  
  .setting-icon-container {
    width: 3rem;
    height: 3rem;
  }
  
  .setting-icon {
    width: 1.5rem;
    height: 1.5rem;
  }
  
  .setting-text {
    font-size: 1.125rem;
  }
  
  .setting-arrow {
    width: 1.5rem;
    height: 1.5rem;
  }
}

@media (min-width: 1024px) {
  .settings-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.25rem;
  }
  
  .section-title {
    font-size: 1.75rem;
    margin-bottom: 2rem;
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .setting-btn:hover,
  .setting-icon-container,
  .setting-icon,
  .setting-text,
  .setting-arrow {
    transform: none;
    transition: none;
  }
}

/* Focus states for accessibility */
.setting-btn:focus {
  outline: 2px solid #5F6F55;
  outline-offset: 2px;
}

.setting-btn:focus:not(:focus-visible) {
  outline: none;
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .section-card {
    background: rgba(17, 24, 39, 0.8);
    border-color: rgba(55, 65, 81, 0.3);
  }
  
  .setting-btn {
    background: rgba(31, 41, 55, 0.7);
    border-color: rgba(75, 85, 99, 0.8);
  }
  
  .setting-btn:hover {
    background: rgba(31, 41, 55, 0.9);
    border-color: #BECDA3;
  }
  
  .setting-text {
    color: #f1f5f9;
  }
  
  .setting-btn:hover .setting-text {
    color: #ffffff;
  }
  
  .setting-arrow {
    color: #9ca3af;
  }
  
  .setting-btn:hover .setting-arrow {
    color: #BECDA3;
  }
}
</style>