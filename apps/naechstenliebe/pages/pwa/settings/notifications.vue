<template>
  <div class="notification-settings-container">
    <!-- Header -->
    <AppHeader 
      title="Benachrichtigungen" 
      current-role="unified"
      :request-count="0"
      :show-back="true"
      @back="() => navigateTo('/pwa/settings')"
      @open-profile="() => navigateTo('/pwa/shared/profile')"
    />

    <div class="content-container">
      
      <!-- Loading State -->
      <div v-if="isLoading" class="loading-container">
        <div class="loading-spinner"></div>
        <p>Lade Einstellungen...</p>
      </div>

      <!-- Notification Settings -->
      <div v-else class="settings-content">
        
        <!-- Description -->
        <div class="settings-description">
          <h2>Benachrichtigungs-Einstellungen</h2>
          <p>Wähle aus, für welche Ereignisse du Benachrichtigungen erhalten möchtest.</p>
        </div>

        <!-- Jobs (für Helfer) -->
        <div class="settings-section">
          <h3 class="section-title">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6"/>
            </svg>
            Jobs (als Helfer)
          </h3>
          <div class="settings-list">
            <div class="setting-item">
              <div class="setting-info">
                <h4>Neue Jobs in meiner Nähe</h4>
                <p>Benachrichtigung bei passenden Jobs</p>
              </div>
              <label class="toggle-switch">
                <input 
                  v-model="preferences.helper_new_jobs_nearby"
                  type="checkbox"
                  @change="updatePreferences"
                >
                <span class="toggle-slider"></span>
              </label>
            </div>
            <div class="setting-item">
              <div class="setting-info">
                <h4>Bewerbung angenommen</h4>
                <p>Du wurdest für einen Job ausgewählt</p>
              </div>
              <label class="toggle-switch">
                <input 
                  v-model="preferences.helper_application_accepted"
                  type="checkbox"
                  @change="updatePreferences"
                >
                <span class="toggle-slider"></span>
              </label>
            </div>
            <div class="setting-item">
              <div class="setting-info">
                <h4>Bewerbung abgelehnt</h4>
                <p>Du wurdest nicht für einen Job ausgewählt</p>
              </div>
              <label class="toggle-switch">
                <input 
                  v-model="preferences.helper_application_rejected"
                  type="checkbox"
                  @change="updatePreferences"
                >
                <span class="toggle-slider"></span>
              </label>
            </div>
            <div class="setting-item">
              <div class="setting-info">
                <h4>Job storniert</h4>
                <p>Ein Job wurde vom Auftraggeber abgesagt</p>
              </div>
              <label class="toggle-switch">
                <input 
                  v-model="preferences.helper_job_cancelled"
                  type="checkbox"
                  @change="updatePreferences"
                >
                <span class="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>

        <!-- Jobs (für Hilfesuchende) -->
        <div class="settings-section">
          <h3 class="section-title">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
            Jobs (als Hilfesuchender)
          </h3>
          <div class="settings-list">
            <div class="setting-item">
              <div class="setting-info">
                <h4>Neue Bewerbung erhalten</h4>
                <p>Jemand hat sich für deinen Job beworben</p>
              </div>
              <label class="toggle-switch">
                <input 
                  v-model="preferences.seeker_new_application"
                  type="checkbox"
                  @change="updatePreferences"
                >
                <span class="toggle-slider"></span>
              </label>
            </div>
            <div class="setting-item">
              <div class="setting-info">
                <h4>Job wurde abgeschlossen</h4>
                <p>Ein Job wurde erfolgreich beendet</p>
              </div>
              <label class="toggle-switch">
                <input 
                  v-model="preferences.seeker_job_completed"
                  type="checkbox"
                  @change="updatePreferences"
                >
                <span class="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>

        <!-- Chat -->
        <div class="settings-section">
          <h3 class="section-title">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
            </svg>
            Chat
          </h3>
          <div class="settings-list">
            <div class="setting-item">
              <div class="setting-info">
                <h4>Neue Nachrichten</h4>
                <p>Neue Chat-Nachrichten erhalten</p>
              </div>
              <label class="toggle-switch">
                <input 
                  v-model="preferences.chat_new_messages"
                  type="checkbox"
                  @change="updatePreferences"
                >
                <span class="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>

        <!-- Bewertungen -->
        <div class="settings-section">
          <h3 class="section-title">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
            </svg>
            Bewertungen
          </h3>
          <div class="settings-list">
            <div class="setting-item">
              <div class="setting-info">
                <h4>Neue Bewertung erhalten</h4>
                <p>Jemand hat dich bewertet</p>
              </div>
              <label class="toggle-switch">
                <input 
                  v-model="preferences.reviews_new_review"
                  type="checkbox"
                  @change="updatePreferences"
                >
                <span class="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>

        <!-- Zahlungen -->
        <div class="settings-section">
          <h3 class="section-title">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
            </svg>
            Zahlungen
          </h3>
          <div class="settings-list">
            <div class="setting-item">
              <div class="setting-info">
                <h4>Zahlung abgeschlossen</h4>
                <p>Eine Zahlung wurde erfolgreich verarbeitet</p>
              </div>
              <label class="toggle-switch">
                <input 
                  v-model="preferences.payments_completed"
                  type="checkbox"
                  @change="updatePreferences"
                >
                <span class="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>

        <!-- Save Status -->
        <div v-if="showSaveStatus" class="save-status" :class="saveStatusType">
          <div class="save-status-content">
            <svg v-if="saveStatusType === 'success'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
            <svg v-else fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"/>
            </svg>
            <span>{{ saveMessage }}</span>
          </div>
        </div>

      </div>

    </div>

    <!-- Footer -->
    <UnifiedFooter 
      active-tab="profile"
      current-role="unified"
      @navigate="handleFooterNavigation"
    />

    <!-- Padding for footer -->
    <div style="height: 6rem;"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AppHeader from '~/components/AppHeader.vue'
import UnifiedFooter from '~/components/pwa/unified/UnifiedFooter.vue'
import { useNotifications } from '~/composables/useNotifications.js'

definePageMeta({
  layout: false
})

// Use notifications composable
const { 
  notificationPreferences, 
  isLoading, 
  updateNotificationPreferences, 
  loadNotificationPreferences 
} = useNotifications()

// Component state
const preferences = ref({
  helper_new_jobs_nearby: true,
  helper_application_accepted: true,
  helper_application_rejected: true,
  helper_job_cancelled: true,
  seeker_new_application: true,
  seeker_job_completed: true,
  chat_new_messages: true,
  reviews_new_review: true,
  payments_completed: true
})

const showSaveStatus = ref(false)
const saveMessage = ref('')
const saveStatusType = ref('success')
const saveTimeout = ref(null)

// Load preferences on mount
onMounted(async () => {
  const userPreferences = await loadNotificationPreferences('current_user_id')
  preferences.value = { ...preferences.value, ...userPreferences }
})

// Methods
const updatePreferences = async () => {
  // Clear existing timeout
  if (saveTimeout.value) {
    clearTimeout(saveTimeout.value)
  }
  
  // Debounce the save operation
  saveTimeout.value = setTimeout(async () => {
    try {
      const result = await updateNotificationPreferences('current_user_id', preferences.value)
      
      if (result.success) {
        showSaveMessage(result.message, 'success')
      } else {
        showSaveMessage(result.error, 'error')
      }
    } catch (error) {
      showSaveMessage('Fehler beim Speichern der Einstellungen.', 'error')
    }
  }, 500)
}

const showSaveMessage = (message, type) => {
  saveMessage.value = message
  saveStatusType.value = type
  showSaveStatus.value = true
  
  setTimeout(() => {
    showSaveStatus.value = false
  }, 3000)
}

const handleFooterNavigation = (tab) => {
  switch(tab) {
    case 'dashboard':
      navigateTo('/pwa')
      break
    case 'profile':
      navigateTo('/pwa/shared/profile')
      break
  }
}
</script>

<style scoped>
.notification-settings-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}

.content-container {
  padding: 1rem;
  padding-bottom: 6rem;
  max-width: 600px;
  margin: 0 auto;
}

/* Loading State */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 3rem;
  color: #6b7280;
}

.loading-spinner {
  width: 2rem;
  height: 2rem;
  border: 3px solid #f3f4f6;
  border-top: 3px solid #5F6F55;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Settings Content */
.settings-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.settings-description {
  background: white;
  border-radius: 20px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.settings-description h2 {
  color: #374151;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
}

.settings-description p {
  color: #6b7280;
  margin: 0;
  line-height: 1.5;
}

/* Settings Sections */
.settings-section {
  background: white;
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.section-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #374151;
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
}

.section-title svg {
  width: 1.25rem;
  height: 1.25rem;
  color: #5F6F55;
}

.settings-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

/* Setting Items */
.setting-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 12px;
  border: 2px solid transparent;
  transition: all 0.2s ease;
}

.setting-item:hover {
  background: #f3f4f6;
  border-color: #e5e7eb;
}

.setting-info {
  flex: 1;
}

.setting-info h4 {
  color: #374151;
  font-size: 0.875rem;
  font-weight: 600;
  margin: 0 0 0.25rem 0;
}

.setting-info p {
  color: #6b7280;
  font-size: 0.75rem;
  margin: 0;
  line-height: 1.4;
}

/* Toggle Switch */
.toggle-switch {
  position: relative;
  display: inline-block;
  width: 3rem;
  height: 1.75rem;
  cursor: pointer;
}

.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle-slider {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #d1d5db;
  border-radius: 1.75rem;
  transition: all 0.3s ease;
}

.toggle-slider:before {
  position: absolute;
  content: "";
  height: 1.25rem;
  width: 1.25rem;
  left: 0.25rem;
  bottom: 0.25rem;
  background: white;
  border-radius: 50%;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.toggle-switch input:checked + .toggle-slider {
  background: #5F6F55;
}

.toggle-switch input:checked + .toggle-slider:before {
  transform: translateX(1.25rem);
}

.toggle-switch:hover .toggle-slider {
  box-shadow: 0 0 0 3px rgba(95, 111, 85, 0.1);
}

/* Save Status */
.save-status {
  position: fixed;
  bottom: 7rem;
  left: 1rem;
  right: 1rem;
  z-index: 1000;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  animation: slideUp 0.3s ease;
}

.save-status.success {
  background: #22c55e;
  color: white;
}

.save-status.error {
  background: #ef4444;
  color: white;
}

.save-status-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.save-status-content svg {
  width: 1.25rem;
  height: 1.25rem;
  flex-shrink: 0;
}

@keyframes slideUp {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Responsive Design */
@media (min-width: 768px) {
  .content-container {
    padding: 2rem;
  }
  
  .settings-section {
    padding: 2rem;
  }
  
  .setting-item {
    padding: 1.25rem;
  }
  
  .save-status {
    max-width: 400px;
    left: 50%;
    transform: translateX(-50%);
  }
}

@media (max-width: 480px) {
  .setting-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }
  
  .toggle-switch {
    align-self: flex-end;
  }
}
</style>