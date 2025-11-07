<template>
  <div class="delete-account-container">
    <!-- Header -->
    <AppHeader 
      title="Account löschen" 
      current-role="unified"
      :request-count="0"
      :show-back="true"
      @back="() => navigateTo('/pwa/settings')"
      @open-profile="() => navigateTo('/pwa/shared/profile')"
    />

    <div class="content-container">
      
      <!-- Warning Section -->
      <div class="warning-section">
        <div class="warning-icon">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"/>
          </svg>
        </div>
        <h2>Account endgültig löschen</h2>
        <p>Diese Aktion kann nicht rückgängig gemacht werden. Bitte lies alle Informationen sorgfältig durch.</p>
      </div>

      <!-- Validation Check -->
      <div v-if="hasActiveJobs" class="validation-error">
        <div class="error-icon">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
        <h3>Account kann nicht gelöscht werden</h3>
        <p>Du hast noch {{ activeJobsCount }} laufende{{ activeJobsCount > 1 ? '' : 'n' }} Job{{ activeJobsCount > 1 ? 's' : '' }}. Bitte schließe alle Jobs ab, bevor du deinen Account löschst.</p>
        
        <!-- Active Jobs List -->
        <div class="active-jobs-list">
          <h4>Laufende Jobs:</h4>
          <div 
            v-for="job in activeJobs" 
            :key="job.id"
            class="job-item"
            @click="navigateTo(`/pwa/jobs/detail/${job.id}`)"
          >
            <div class="job-info">
              <h5>{{ job.title }}</h5>
              <p>{{ job.status === 'accepted' ? 'Angenommen' : 'In Bearbeitung' }}</p>
            </div>
            <div class="job-arrow">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </div>
          </div>
        </div>
        
        <button @click="navigateTo('/pwa')" class="btn-complete-jobs">
          Jobs abschließen
        </button>
      </div>

      <!-- Deletion Form -->
      <div v-else class="deletion-form">
        
        <!-- Information Section -->
        <div class="info-section">
          <h3>Was passiert beim Löschen?</h3>
          <div class="info-list">
            <div class="info-item">
              <div class="info-icon deleted">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
              </div>
              <div class="info-text">
                <h4>Gelöscht wird:</h4>
                <ul>
                  <li>Dein Profil und persönliche Daten</li>
                  <li>Chat-Nachrichten</li>
                  <li>Zahlungsmethoden</li>
                  <li>Benachrichtigungseinstellungen</li>
                </ul>
              </div>
            </div>
            <div class="info-item">
              <div class="info-icon preserved">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div class="info-text">
                <h4>Erhalten bleibt (anonymisiert):</h4>
                <ul>
                  <li>Bewertungen (für Vertrauen der Community)</li>
                  <li>Job-Statistiken (für Plattform-Analysen)</li>
                  <li>Abgeschlossene Transaktionen</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- Confirmation Form -->
        <form @submit.prevent="handleDeleteAccount" class="confirmation-form">
          <h3>Bestätigung</h3>
          <p>Zur Sicherheit benötigen wir dein aktuelles Passwort:</p>
          
          <div class="form-group">
            <label for="password" class="form-label">Passwort eingeben *</label>
            <div class="password-input-container">
              <input 
                id="password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                class="form-input"
                placeholder="Dein aktuelles Passwort"
                required
                :disabled="isDeleting"
              >
              <button 
                type="button"
                @click="showPassword = !showPassword"
                class="password-toggle"
                :disabled="isDeleting"
              >
                <svg v-if="showPassword" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L8.464 8.464M14.12 14.12l1.415 1.415M14.12 14.12L9.878 9.878"/>
                </svg>
                <svg v-else fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                </svg>
              </button>
            </div>
          </div>

          <div class="form-group">
            <label class="checkbox-label">
              <input 
                v-model="confirmUnderstanding"
                type="checkbox"
                class="form-checkbox"
                required
                :disabled="isDeleting"
              >
              <span class="checkbox-text">
                Ich verstehe, dass diese Aktion nicht rückgängig gemacht werden kann und alle meine Daten endgültig gelöscht werden.
              </span>
            </label>
          </div>

          <div class="form-group">
            <label class="checkbox-label">
              <input 
                v-model="confirmNoActiveJobs"
                type="checkbox"
                class="form-checkbox"
                required
                :disabled="isDeleting"
              >
              <span class="checkbox-text">
                Ich bestätige, dass ich keine laufenden Jobs habe.
              </span>
            </label>
          </div>

          <!-- Form Actions -->
          <div class="form-actions">
            <button 
              type="button" 
              @click="navigateTo('/pwa/settings')"
              class="btn-cancel"
              :disabled="isDeleting"
            >
              Abbrechen
            </button>
            <button 
              type="submit" 
              :disabled="!canDelete || isDeleting"
              class="btn-delete"
            >
              <span v-if="isDeleting">Account wird gelöscht...</span>
              <span v-else>Account endgültig löschen</span>
            </button>
          </div>
        </form>

      </div>

    </div>

    <!-- Success/Error Messages -->
    <div v-if="showMessage" class="message" :class="messageType">
      <div class="message-content">
        <svg v-if="messageType === 'success'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
        </svg>
        <svg v-else fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"/>
        </svg>
        <span>{{ message }}</span>
      </div>
    </div>

    <!-- Account Deleted Success Modal -->
    <div v-if="accountDeleted" class="success-modal-overlay">
      <div class="success-modal">
        <div class="success-icon">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
          </svg>
        </div>
        <h3>Account erfolgreich gelöscht</h3>
        <p>Dein Account wurde gelöscht. Schade, dass du gehst!</p>
        <p>Du wirst in wenigen Sekunden zum Login weitergeleitet.</p>
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
import { ref, computed, onMounted } from 'vue'
import AppHeader from '~/components/AppHeader.vue'
import UnifiedFooter from '~/components/pwa/unified/UnifiedFooter.vue'

definePageMeta({
  layout: false
})

// Component state
const password = ref('')
const showPassword = ref(false)
const confirmUnderstanding = ref(false)
const confirmNoActiveJobs = ref(false)
const isDeleting = ref(false)
const showMessage = ref(false)
const message = ref('')
const messageType = ref('error')
const accountDeleted = ref(false)

// Active jobs validation
const hasActiveJobs = ref(false)
const activeJobs = ref([])
const activeJobsCount = computed(() => activeJobs.value.length)

// Form validation
const canDelete = computed(() => {
  return password.value.length > 0 && 
         confirmUnderstanding.value && 
         confirmNoActiveJobs.value && 
         !hasActiveJobs.value
})

// Load active jobs on mount
onMounted(async () => {
  await checkActiveJobs()
})

// Methods
const checkActiveJobs = async () => {
  try {
    // Mock API call to check for active jobs
    const userActiveJobs = await fetchActiveJobs('current_user_id')
    activeJobs.value = userActiveJobs
    hasActiveJobs.value = userActiveJobs.length > 0
  } catch (error) {
    console.error('Failed to check active jobs:', error)
    // Assume no active jobs if check fails
    hasActiveJobs.value = false
    activeJobs.value = []
  }
}

const handleDeleteAccount = async () => {
  if (!canDelete.value) return
  
  isDeleting.value = true
  
  try {
    // Validate password
    const passwordValid = await validatePassword(password.value)
    if (!passwordValid) {
      showErrorMessage('Falsches Passwort. Bitte versuche es erneut.')
      return
    }
    
    // Double-check active jobs
    await checkActiveJobs()
    if (hasActiveJobs.value) {
      showErrorMessage('Du hast noch laufende Jobs. Bitte schließe sie erst ab.')
      return
    }
    
    // Delete account
    const result = await deleteUserAccount('current_user_id', password.value)
    
    if (result.success) {
      // Show success state
      accountDeleted.value = true
      
      // Redirect to login after delay
      setTimeout(() => {
        navigateTo('/login')
      }, 4000)
    } else {
      showErrorMessage(result.error || 'Fehler beim Löschen des Accounts.')
    }
  } catch (error) {
    console.error('Failed to delete account:', error)
    showErrorMessage('Ein unerwarteter Fehler ist aufgetreten.')
  } finally {
    isDeleting.value = false
  }
}

const showErrorMessage = (msg) => {
  message.value = msg
  messageType.value = 'error'
  showMessage.value = true
  setTimeout(() => {
    showMessage.value = false
  }, 4000)
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

// Mock API functions
async function fetchActiveJobs(userId) {
  await new Promise(resolve => setTimeout(resolve, 500))
  
  // Mock: Return empty array (no active jobs)
  // In a real scenario with active jobs, this would return:
  /*
  return [
    {
      id: 'job_123',
      title: 'Einkaufshilfe für Senioren',
      status: 'accepted'
    },
    {
      id: 'job_456',
      title: 'Gartenpflege',
      status: 'in_progress'
    }
  ]
  */
  
  return [] // No active jobs for demo
}

async function validatePassword(password) {
  await new Promise(resolve => setTimeout(resolve, 500))
  
  // Mock password validation
  // In real app, this would validate against the stored password hash
  return password.length >= 6 // Simple validation for demo
}

async function deleteUserAccount(userId, password) {
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  try {
    // Mock account deletion process:
    // 1. Soft delete user (is_active = false)
    // 2. Anonymize profile data
    // 3. Keep anonymized reviews and job stats
    // 4. Clear personal data
    
    console.log('Account deletion completed for user:', userId)
    
    return {
      success: true,
      message: 'Account wurde erfolgreich gelöscht.'
    }
  } catch (error) {
    return {
      success: false,
      error: 'Fehler beim Löschen des Accounts.'
    }
  }
}
</script>

<style scoped>
.delete-account-container {
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

/* Warning Section */
.warning-section {
  background: white;
  border: 2px solid rgba(239, 68, 68, 0.2);
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.warning-icon {
  width: 4rem;
  height: 4rem;
  color: #ef4444;
  margin: 0 auto 1rem auto;
}

.warning-section h2 {
  color: #ef4444;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 0.75rem 0;
}

.warning-section p {
  color: #6b7280;
  margin: 0;
  line-height: 1.5;
}

/* Validation Error */
.validation-error {
  background: white;
  border: 2px solid rgba(239, 68, 68, 0.3);
  border-radius: 20px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.error-icon {
  width: 3rem;
  height: 3rem;
  color: #ef4444;
  margin: 0 0 1rem 0;
}

.validation-error h3 {
  color: #ef4444;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
}

.validation-error p {
  color: #6b7280;
  margin: 0 0 1.5rem 0;
  line-height: 1.5;
}

.active-jobs-list h4 {
  color: #374151;
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
}

.job-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background: #fef2f2;
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: 8px;
  margin-bottom: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.job-item:hover {
  background: #fecaca;
  border-color: rgba(239, 68, 68, 0.3);
}

.job-info h5 {
  color: #374151;
  font-size: 0.875rem;
  font-weight: 600;
  margin: 0 0 0.25rem 0;
}

.job-info p {
  color: #6b7280;
  font-size: 0.75rem;
  margin: 0;
}

.job-arrow {
  color: #ef4444;
}

.job-arrow svg {
  width: 1.25rem;
  height: 1.25rem;
}

.btn-complete-jobs {
  width: 100%;
  padding: 0.75rem;
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease;
  margin-top: 1rem;
}

.btn-complete-jobs:hover {
  background: #dc2626;
}

/* Deletion Form */
.deletion-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.info-section {
  background: white;
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.info-section h3 {
  color: #374151;
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
}

.info-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.info-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.info-icon {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.info-icon.deleted {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}

.info-icon.preserved {
  background: rgba(34, 197, 94, 0.1);
  color: #22c55e;
}

.info-icon svg {
  width: 1.25rem;
  height: 1.25rem;
}

.info-text h4 {
  color: #374151;
  font-size: 0.875rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
}

.info-text ul {
  margin: 0;
  padding-left: 1rem;
  color: #6b7280;
  font-size: 0.75rem;
  line-height: 1.5;
}

.info-text li {
  margin-bottom: 0.25rem;
}

/* Confirmation Form */
.confirmation-form {
  background: white;
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.confirmation-form h3 {
  color: #374151;
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
}

.confirmation-form > p {
  color: #6b7280;
  margin: 0 0 1.5rem 0;
}

.form-group {
  margin-bottom: 1rem;
}

.form-label {
  display: block;
  color: #374151;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.password-input-container {
  position: relative;
  display: flex;
  align-items: center;
}

.form-input {
  width: 100%;
  padding: 0.75rem;
  padding-right: 3rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s ease;
}

.form-input:focus {
  outline: none;
  border-color: #5F6F55;
}

.form-input:disabled {
  background: #f3f4f6;
  color: #9ca3af;
  cursor: not-allowed;
}

.password-toggle {
  position: absolute;
  right: 0.75rem;
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  transition: color 0.2s ease;
}

.password-toggle:hover:not(:disabled) {
  color: #374151;
}

.password-toggle:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.password-toggle svg {
  width: 1.25rem;
  height: 1.25rem;
}

.checkbox-label {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  cursor: pointer;
}

.form-checkbox {
  width: 1rem;
  height: 1rem;
  margin-top: 0.125rem;
  border: 2px solid #e5e7eb;
  border-radius: 4px;
  cursor: pointer;
  flex-shrink: 0;
}

.form-checkbox:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.checkbox-text {
  color: #374151;
  font-size: 0.875rem;
  line-height: 1.5;
}

/* Form Actions */
.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
  justify-content: flex-end;
}

.btn-cancel,
.btn-delete {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  font-size: 0.875rem;
}

.btn-cancel {
  background: #f3f4f6;
  color: #6b7280;
}

.btn-cancel:hover:not(:disabled) {
  background: #e5e7eb;
}

.btn-delete {
  background: #ef4444;
  color: white;
}

.btn-delete:hover:not(:disabled) {
  background: #dc2626;
}

.btn-cancel:disabled,
.btn-delete:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Messages */
.message {
  position: fixed;
  top: 1rem;
  left: 1rem;
  right: 1rem;
  z-index: 2000;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  animation: slideIn 0.3s ease;
}

.message.success {
  background: #22c55e;
  color: white;
}

.message.error {
  background: #ef4444;
  color: white;
}

.message-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.message-content svg {
  width: 1.25rem;
  height: 1.25rem;
  flex-shrink: 0;
}

/* Success Modal */
.success-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  z-index: 3000;
}

.success-modal {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  max-width: 400px;
  width: 100%;
}

.success-icon {
  width: 4rem;
  height: 4rem;
  color: #22c55e;
  margin: 0 auto 1rem auto;
}

.success-modal h3 {
  color: #374151;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
}

.success-modal p {
  color: #6b7280;
  margin: 0 0 0.75rem 0;
  line-height: 1.5;
}

.success-modal p:last-child {
  margin-bottom: 0;
  font-size: 0.875rem;
}

@keyframes slideIn {
  from {
    transform: translateY(-100%);
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
  
  .confirmation-form {
    padding: 2rem;
  }
  
  .info-section {
    padding: 2rem;
  }
}

@media (max-width: 640px) {
  .form-actions {
    flex-direction: column;
  }
  
  .info-item {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>