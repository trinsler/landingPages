<template>
  <div class="job-created-container">
    <!-- Header Component -->
    <AppHeader 
      title="Job erstellt"
      current-role="unified"
      :request-count="1"
      @open-requests="() => navigateTo('/pwa')"
      @open-profile="() => navigateTo('/pwa/shared/profile')"
      @open-news="() => navigateTo('/pwa/shared/news')"
      @toggle-role="() => navigateTo('/pwa')"
    />
    
    <div class="mobile-container">
      
      <!-- Success Message -->
      <div class="success-card">
        <div class="success-icon-container">
          <svg class="success-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
        <h2 class="success-title">Job wurde erstellt!</h2>
        <p class="success-subtitle">{{ notifiedHelpersCount }} Helfer in deiner Nähe wurden benachrichtigt</p>
        <p class="success-notification">Du bekommst eine Nachricht, sobald sich jemand bewirbt</p>
      </div>

      <!-- What happens next -->
      <div class="next-steps-card">
        <h3 class="steps-title">Was passiert jetzt?</h3>
        <div class="steps-list">
          <div class="step-item">
            <div class="step-number">1</div>
            <div class="step-content">
              <h4 class="step-title">Helfer werden benachrichtigt</h4>
              <p class="step-description">Verfügbare Helfer in Ihrem Umkreis erhalten eine Benachrichtigung</p>
            </div>
          </div>
          
          <div class="step-item">
            <div class="step-number">2</div>
            <div class="step-content">
              <h4 class="step-title">Sie erhalten Bewerbungen</h4>
              <p class="step-description">Interessierte Helfer können sich auf Ihren Job bewerben</p>
            </div>
          </div>
          
          <div class="step-item">
            <div class="step-number">3</div>
            <div class="step-content">
              <h4 class="step-title">Helfer auswählen</h4>
              <p class="step-description">Sie wählen den passenden Helfer aus und bestätigen den Auftrag</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Estimated timing -->
      <div class="timing-card">
        <div class="timing-icon-container">
          <svg class="timing-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
        <h3 class="timing-title">Erste Bewerbungen</h3>
        <p class="timing-subtitle">Normalerweise innerhalb von <strong>15-30 Minuten</strong></p>
        <div class="timing-progress">
          <div class="progress-bar">
            <div class="progress-fill"></div>
          </div>
          <span class="progress-text">Suche läuft...</span>
        </div>
      </div>

      <!-- Action buttons -->
      <div class="actions-card">
        <button @click="goToMyJobs" class="primary-action-btn">
          <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
          </svg>
          Zu meinen Jobs
        </button>
        
        <button @click="createAnotherJob" class="secondary-action-btn">
          <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
          </svg>
          Weiteren Job erstellen
        </button>
      </div>

      <!-- Tips card -->
      <div class="tips-card">
        <h3 class="tips-title">Tipps für bessere Ergebnisse</h3>
        <div class="tips-list">
          <div class="tip-item">
            <svg class="tip-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span class="tip-text">Antworten Sie schnell auf Bewerbungen</span>
          </div>
          
          <div class="tip-item">
            <svg class="tip-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.955 8.955 0 01-2.707-.408l-3.005.606C6.581 20.365 6 19.7 6 19c0-.28.115-.532.308-.742l.813-3.262A8.002 8.002 0 013 12a8 8 0 018-8 8 8 0 018 8z"/>
            </svg>
            <span class="tip-text">Nutzen Sie den Chat für Details</span>
          </div>
          
          <div class="tip-item">
            <svg class="tip-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
            </svg>
            <span class="tip-text">Bewerten Sie nach dem Auftrag</span>
          </div>
        </div>
      </div>

    </div>

    <!-- Footer Component -->
    <UnifiedFooter 
      active-tab="seeker-history"
      current-role="unified"
      @navigate="handleFooterNavigation"
    />

    <!-- Padding for bottom nav -->
    <div style="height: 5rem;"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AppHeader from '~/components/AppHeader.vue'
import UnifiedFooter from '~/components/pwa/unified/UnifiedFooter.vue'

definePageMeta({
  layout: false
})

// State for notification count
const notifiedHelpersCount = ref(0)

// Methods
const goToMyJobs = () => {
  navigateTo('/pwa/jobs/my-jobs')
}

const createAnotherJob = () => {
  navigateTo('/pwa/jobs/create/category')
}

// Simulate helper notification count
const simulateHelperNotifications = () => {
  // Simulate geo-matching algorithm finding helpers
  const baseHelpers = 15
  const randomVariation = Math.floor(Math.random() * 10) - 5 // -5 to +5
  notifiedHelpersCount.value = Math.max(5, baseHelpers + randomVariation)
}

// Footer navigation
const handleFooterNavigation = (tab) => {
  switch(tab) {
    case 'dashboard':
      navigateTo('/pwa')
      break
    case 'helper-tasks':
      navigateTo('/pwa/helper/tasks')
      break
    case 'helper-earnings':
      navigateTo('/pwa/helper/earnings')
      break
    case 'seeker-create':
      navigateTo('/pwa/jobs/create/category')
      break
    case 'seeker-history':
      navigateTo('/pwa/jobs/my-jobs')
      break
    case 'seeker-favorites':
      navigateTo('/pwa/seeker/favorites')
      break
    case 'profile':
      navigateTo('/pwa/shared/profile')
      break
  }
}

// Initialize on mount
onMounted(() => {
  simulateHelperNotifications()
})
</script>

<style scoped>
/* Mobile First Design for Job Created */
.job-created-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  position: relative;
}

.job-created-container::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 80%, rgba(95, 111, 85, 0.03) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(190, 205, 163, 0.04) 0%, transparent 50%),
    radial-gradient(circle at 40% 40%, rgba(143, 139, 130, 0.02) 0%, transparent 50%);
  pointer-events: none;
  z-index: 0;
}

.mobile-container {
  padding: 1rem;
  padding-bottom: 6rem;
  position: relative;
  z-index: 1;
}

/* Success Card */
.success-card {
  background: white;
  border-radius: 20px;
  padding: 2rem 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  text-align: center;
}

.success-icon-container {
  width: 5rem;
  height: 5rem;
  background: linear-gradient(135deg, #22c55e, #16a34a);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem auto;
  box-shadow: 0 8px 32px rgba(34, 197, 94, 0.3);
}

.success-icon {
  width: 2.5rem;
  height: 2.5rem;
  color: white;
}

.success-title {
  color: #474747;
  font-size: 1.75rem;
  font-weight: 600;
  margin: 0 0 0.75rem 0;
  line-height: 1.3;
}

.success-subtitle {
  color: #6b7280;
  margin: 0 0 0.5rem 0;
  font-size: 1.125rem;
  line-height: 1.5;
  font-weight: 600;
}

.success-notification {
  color: #5F6F55;
  margin: 0;
  font-size: 1rem;
  line-height: 1.5;
  font-weight: 500;
  background: rgba(95, 111, 85, 0.1);
  padding: 0.75rem 1rem;
  border-radius: 12px;
  border: 1px solid rgba(95, 111, 85, 0.2);
}

/* Next Steps Card */
.next-steps-card {
  background: white;
  border-radius: 20px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.steps-title {
  color: #474747;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 1.5rem 0;
  text-align: center;
}

.steps-list {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.step-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.step-number {
  width: 2rem;
  height: 2rem;
  background: #5F6F55;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  font-weight: 600;
  flex-shrink: 0;
}

.step-content {
  flex: 1;
}

.step-title {
  color: #474747;
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.25rem 0;
}

.step-description {
  color: #6b7280;
  font-size: 0.875rem;
  margin: 0;
  line-height: 1.5;
}

/* Timing Card */
.timing-card {
  background: white;
  border-radius: 20px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  text-align: center;
}

.timing-icon-container {
  width: 3rem;
  height: 3rem;
  background: rgba(249, 115, 22, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem auto;
}

.timing-icon {
  width: 1.5rem;
  height: 1.5rem;
  color: #f59e0b;
}

.timing-title {
  color: #474747;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
}

.timing-subtitle {
  color: #6b7280;
  font-size: 1rem;
  margin: 0 0 1rem 0;
}

.timing-progress {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: rgba(249, 115, 22, 0.2);
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  width: 40%;
  background: linear-gradient(90deg, #f59e0b, #f97316);
  border-radius: 4px;
  animation: progress-pulse 2s ease-in-out infinite;
}

@keyframes progress-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.progress-text {
  color: #f59e0b;
  font-size: 0.875rem;
  font-weight: 500;
}

/* Actions Card */
.actions-card {
  background: white;
  border-radius: 20px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.primary-action-btn {
  background: #5F6F55;
  color: white;
  border: none;
  border-radius: 16px;
  padding: 1.25rem 2rem;
  font-size: 1.125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  min-height: 3.5rem;
}

.primary-action-btn:hover {
  background: #4a5c44;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(95, 111, 85, 0.3);
}

.secondary-action-btn {
  background: rgba(95, 111, 85, 0.1);
  color: #5F6F55;
  border: 1px solid rgba(95, 111, 85, 0.2);
  border-radius: 16px;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  min-height: 3rem;
}

.secondary-action-btn:hover {
  background: rgba(95, 111, 85, 0.2);
  transform: translateY(-1px);
}

.btn-icon {
  width: 1.25rem;
  height: 1.25rem;
}

/* Tips Card */
.tips-card {
  background: white;
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.tips-title {
  color: #474747;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 1.5rem 0;
  text-align: center;
}

.tips-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.tip-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: rgba(95, 111, 85, 0.05);
  border-radius: 12px;
}

.tip-icon {
  width: 1.25rem;
  height: 1.25rem;
  color: #5F6F55;
  flex-shrink: 0;
}

.tip-text {
  color: #474747;
  font-size: 0.875rem;
  font-weight: 500;
}

/* Tablet Optimizations */
@media (min-width: 768px) {
  .mobile-container {
    padding: 2rem;
    max-width: 768px;
    margin: 0 auto;
  }
  
  .success-card {
    padding: 3rem 2rem;
  }
  
  .success-icon-container {
    width: 4rem;
    height: 4rem;
  }
  
  .success-icon {
    width: 2rem;
    height: 2rem;
  }
  
  .success-title {
    font-size: 1.5rem;
  }
  
  .success-subtitle {
    font-size: 1rem;
  }
  
  .actions-card {
    flex-direction: row;
  }
  
  .primary-action-btn,
  .secondary-action-btn {
    flex: 1;
  }
  
  .primary-action-btn {
    font-size: 1rem;
    min-height: auto;
    padding: 1rem 2rem;
  }
  
  .secondary-action-btn {
    font-size: 0.875rem;
    min-height: auto;
    padding: 1rem 1.5rem;
  }
}

/* Desktop Optimizations */
@media (min-width: 1024px) {
  .mobile-container {
    max-width: 1024px;
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .progress-fill {
    animation: none;
  }
  
  .primary-action-btn:hover,
  .secondary-action-btn:hover {
    transform: none;
  }
}
</style>