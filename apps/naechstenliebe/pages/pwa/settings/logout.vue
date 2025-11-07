<template>
  <div class="logout-container">
    <!-- Header -->
    <AppHeader 
      title="Abmelden" 
      current-role="unified"
      :request-count="0"
      :show-back="true"
      @back="() => navigateTo('/pwa/settings')"
      @open-profile="() => navigateTo('/pwa/shared/profile')"
    />

    <div class="content-container">
      
      <!-- Logout Confirmation -->
      <div class="logout-confirmation">
        <div class="logout-icon">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
          </svg>
        </div>
        
        <h2>Möchtest du dich abmelden?</h2>
        <p>Du wirst von diesem Gerät abgemeldet und zur Anmeldeseite weitergeleitet.</p>

        <!-- User Info -->
        <div class="user-info">
          <div class="user-avatar">
            <img v-if="userProfile.profilePicture" :src="userProfile.profilePicture" alt="Profilbild">
            <svg v-else fill="none" stroke="currentColor" viewBox="0 0 24 24" style="color: #5F6F55; width: 100%; height: 100%;">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
          </div>
          <div class="user-details">
            <h3>{{ userProfile.name }}</h3>
            <p>{{ userProfile.email }}</p>
          </div>
        </div>

        <!-- Keep Logged In Option -->
        <div class="options-section">
          <h4>Anmelde-Optionen</h4>
          <div class="option-item">
            <label class="checkbox-label">
              <input 
                v-model="keepDataLocally"
                type="checkbox"
                class="form-checkbox"
              >
              <span class="checkbox-text">
                Daten lokal speichern (für schnellere Anmeldung)
              </span>
            </label>
            <p class="option-description">
              Wenn aktiviert, werden deine Anmeldedaten sicher auf diesem Gerät gespeichert.
            </p>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="action-buttons">
          <button 
            @click="navigateTo('/pwa/settings')"
            class="btn-cancel"
            :disabled="isLoggingOut"
          >
            Abbrechen
          </button>
          <button 
            @click="handleLogout"
            :disabled="isLoggingOut"
            class="btn-logout"
          >
            <span v-if="isLoggingOut">Melde ab...</span>
            <span v-else>Abmelden</span>
          </button>
        </div>
      </div>

    </div>

    <!-- Success Message -->
    <div v-if="showLogoutSuccess" class="logout-success-overlay">
      <div class="logout-success-modal">
        <div class="success-icon">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
          </svg>
        </div>
        <h3>Erfolgreich abgemeldet</h3>
        <p>Du wirst zur Anmeldeseite weitergeleitet.</p>
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
import { ref } from 'vue'
import AppHeader from '~/components/AppHeader.vue'
import UnifiedFooter from '~/components/pwa/unified/UnifiedFooter.vue'

definePageMeta({
  layout: false
})

// Component state
const isLoggingOut = ref(false)
const keepDataLocally = ref(true)
const showLogoutSuccess = ref(false)

// Mock user profile
const userProfile = ref({
  name: 'Anna Weber',
  email: 'anna.weber@email.com',
  profilePicture: null
})

// Methods
const handleLogout = async () => {
  isLoggingOut.value = true
  
  try {
    // Perform logout
    await performLogout(keepDataLocally.value)
    
    // Show success state
    showLogoutSuccess.value = true
    
    // Redirect to login after delay
    setTimeout(() => {
      navigateTo('/login')
    }, 2000)
    
  } catch (error) {
    console.error('Logout failed:', error)
    // Even if logout fails, redirect to login for security
    navigateTo('/login')
  } finally {
    isLoggingOut.value = false
  }
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

// Mock logout function
async function performLogout(keepLocal) {
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  // Mock logout process:
  // 1. Invalidate session token
  // 2. Clear or encrypt local data based on keepLocal
  // 3. Clear sensitive data from memory
  
  if (keepLocal) {
    // Keep encrypted user data for quick login
    console.log('Keeping encrypted data locally for quick login')
  } else {
    // Clear all local data
    console.log('Clearing all local data')
  }
  
  console.log('User logged out successfully')
}
</script>

<style scoped>
.logout-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}

.content-container {
  padding: 1rem;
  padding-bottom: 6rem;
  max-width: 500px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  min-height: calc(100vh - 8rem);
}

/* Logout Confirmation */
.logout-confirmation {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  width: 100%;
}

.logout-icon {
  width: 4rem;
  height: 4rem;
  color: #f59e0b;
  margin: 0 auto 1.5rem auto;
}

.logout-confirmation h2 {
  color: #374151;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 0.75rem 0;
}

.logout-confirmation > p {
  color: #6b7280;
  margin: 0 0 2rem 0;
  line-height: 1.5;
}

/* User Info */
.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 12px;
  margin-bottom: 2rem;
}

.user-avatar {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
}

.user-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-details {
  flex: 1;
  text-align: left;
}

.user-details h3 {
  color: #374151;
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.25rem 0;
}

.user-details p {
  color: #6b7280;
  font-size: 0.875rem;
  margin: 0;
}

/* Options Section */
.options-section {
  text-align: left;
  margin-bottom: 2rem;
}

.options-section h4 {
  color: #374151;
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
}

.option-item {
  margin-bottom: 1rem;
}

.checkbox-label {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  cursor: pointer;
  margin-bottom: 0.5rem;
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

.checkbox-text {
  color: #374151;
  font-size: 0.875rem;
  line-height: 1.5;
}

.option-description {
  color: #6b7280;
  font-size: 0.75rem;
  margin: 0;
  padding-left: 1.75rem;
  line-height: 1.4;
}

/* Action Buttons */
.action-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.btn-cancel,
.btn-logout {
  padding: 0.75rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  font-size: 0.875rem;
  min-width: 120px;
}

.btn-cancel {
  background: #f3f4f6;
  color: #6b7280;
}

.btn-cancel:hover:not(:disabled) {
  background: #e5e7eb;
}

.btn-logout {
  background: #f59e0b;
  color: white;
}

.btn-logout:hover:not(:disabled) {
  background: #d97706;
}

.btn-cancel:disabled,
.btn-logout:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Logout Success Modal */
.logout-success-overlay {
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

.logout-success-modal {
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

.logout-success-modal h3 {
  color: #374151;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
}

.logout-success-modal p {
  color: #6b7280;
  margin: 0;
  line-height: 1.5;
}

/* Responsive Design */
@media (min-width: 768px) {
  .content-container {
    padding: 2rem;
  }
  
  .logout-confirmation {
    padding: 3rem;
  }
}

@media (max-width: 640px) {
  .action-buttons {
    flex-direction: column;
  }
  
  .user-info {
    flex-direction: column;
    text-align: center;
  }
  
  .user-details {
    text-align: center;
  }
  
  .options-section {
    text-align: center;
  }
  
  .checkbox-label {
    justify-content: center;
  }
  
  .option-description {
    padding-left: 0;
    text-align: center;
  }
}
</style>