<template>
  <div class="settings-container">
    <!-- Header -->
    <AppHeader 
      title="Einstellungen" 
      current-role="unified"
      :request-count="0"
      :show-back="true"
      @back="() => navigateTo('/pwa')"
      @open-profile="() => navigateTo('/pwa/shared/profile')"
    />

    <div class="content-container">
      
      <!-- Profile Summary -->
      <div class="profile-summary">
        <div class="profile-info">
          <div class="profile-avatar">
            <img v-if="userProfile.profilePicture" :src="userProfile.profilePicture" alt="Profilbild">
            <svg v-else fill="none" stroke="currentColor" viewBox="0 0 24 24" style="color: #5F6F55;">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
          </div>
          <div class="profile-details">
            <h2 class="profile-name">{{ userProfile.name }}</h2>
            <p class="profile-email">{{ userProfile.email }}</p>
            <div class="profile-badges">
              <span v-if="userProfile.isHelper" class="badge helper">Helfer</span>
              <span v-if="userProfile.organization" class="badge organization">{{ userProfile.organization }}</span>
              <span v-if="userProfile.verificationStatus === 'verified'" class="badge verified">Verifiziert</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Settings Sections -->
      <div class="settings-sections">
        
        <!-- Profil -->
        <div class="settings-section">
          <h3 class="section-title">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
            Profil
          </h3>
          <div class="settings-list">
            <button @click="navigateTo('/pwa/shared/profile')" class="settings-item">
              <div class="item-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
                </svg>
              </div>
              <div class="item-content">
                <h4>Profil bearbeiten</h4>
                <p>Name, Foto, Bio und Verifizierung</p>
              </div>
              <div class="item-arrow">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </div>
            </button>
            <button @click="navigateTo('/pwa/shared/payment-methods')" class="settings-item">
              <div class="item-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
                </svg>
              </div>
              <div class="item-content">
                <h4>Zahlungsmethoden</h4>
                <p>Kreditkarten und Bankkonten verwalten</p>
              </div>
              <div class="item-arrow">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </div>
            </button>
          </div>
        </div>

        <!-- Helfer-Einstellungen (nur wenn is_helper) -->
        <div v-if="userProfile.isHelper" class="settings-section">
          <h3 class="section-title">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
            </svg>
            Helfer-Einstellungen
          </h3>
          <div class="settings-list">
            <button @click="navigateTo('/pwa/settings/categories')" class="settings-item">
              <div class="item-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
                </svg>
              </div>
              <div class="item-content">
                <h4>Kategorien-Präferenzen</h4>
                <p>Bevorzugte Job-Kategorien festlegen</p>
              </div>
              <div class="item-arrow">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </div>
            </button>
            <button @click="navigateTo('/pwa/settings/radius')" class="settings-item">
              <div class="item-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                </svg>
              </div>
              <div class="item-content">
                <h4>Umkreis ändern</h4>
                <p>Arbeitsradius: {{ userProfile.workRadius || 10 }}km</p>
              </div>
              <div class="item-arrow">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </div>
            </button>
          </div>
        </div>

        <!-- Benachrichtigungen -->
        <div class="settings-section">
          <h3 class="section-title">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5-5-5h5V7h5l-5-5-5 5h5v10z"/>
            </svg>
            Benachrichtigungen
          </h3>
          <div class="settings-list">
            <button @click="navigateTo('/pwa/settings/notifications')" class="settings-item">
              <div class="item-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5-5-5h5V7h5l-5-5-5 5h5v10z"/>
                </svg>
              </div>
              <div class="item-content">
                <h4>Notification-Einstellungen</h4>
                <p>Push-Benachrichtigungen verwalten</p>
              </div>
              <div class="item-arrow">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </div>
            </button>
          </div>
        </div>

        <!-- Sicherheit -->
        <div class="settings-section">
          <h3 class="section-title">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 0h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
            </svg>
            Sicherheit
          </h3>
          <div class="settings-list">
            <button @click="navigateTo('/pwa/settings/password')" class="settings-item">
              <div class="item-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"/>
                </svg>
              </div>
              <div class="item-content">
                <h4>Passwort ändern</h4>
                <p>Dein Passwort aktualisieren</p>
              </div>
              <div class="item-arrow">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </div>
            </button>
            <div class="settings-item toggle-item">
              <div class="item-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                </svg>
              </div>
              <div class="item-content">
                <h4>Zwei-Faktor-Authentifizierung</h4>
                <p>Zusätzliche Sicherheit für dein Konto</p>
              </div>
              <label class="toggle-switch">
                <input 
                  v-model="twoFactorEnabled"
                  type="checkbox"
                  @change="toggleTwoFactor"
                >
                <span class="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>

        <!-- Organisation (nur wenn organization_id) -->
        <div v-if="userProfile.organization" class="settings-section">
          <h3 class="section-title">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
            </svg>
            Organisation
          </h3>
          <div class="settings-list">
            <button @click="navigateTo('/pwa/org/admin')" class="settings-item">
              <div class="item-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div class="item-content">
                <h4>Meine Organisation</h4>
                <p>{{ userProfile.organization }} verwalten</p>
              </div>
              <div class="item-arrow">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </div>
            </button>
          </div>
        </div>

        <!-- Rechtliches -->
        <div class="settings-section">
          <h3 class="section-title">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
            Rechtliches
          </h3>
          <div class="settings-list">
            <button @click="navigateTo('/pwa/legal/privacy')" class="settings-item">
              <div class="item-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                </svg>
              </div>
              <div class="item-content">
                <h4>Datenschutz</h4>
                <p>Datenschutzrichtlinien ansehen</p>
              </div>
              <div class="item-arrow">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </div>
            </button>
            <button @click="navigateTo('/pwa/legal/terms')" class="settings-item">
              <div class="item-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
              </div>
              <div class="item-content">
                <h4>AGB</h4>
                <p>Allgemeine Geschäftsbedingungen</p>
              </div>
              <div class="item-arrow">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </div>
            </button>
            <button @click="navigateTo('/pwa/legal/imprint')" class="settings-item">
              <div class="item-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div class="item-content">
                <h4>Impressum</h4>
                <p>Rechtliche Informationen</p>
              </div>
              <div class="item-arrow">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </div>
            </button>
          </div>
        </div>

        <!-- Support -->
        <div class="settings-section">
          <h3 class="section-title">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"/>
            </svg>
            Support
          </h3>
          <div class="settings-list">
            <button @click="navigateTo('/pwa/support/faq')" class="settings-item">
              <div class="item-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div class="item-content">
                <h4>Hilfe & FAQ</h4>
                <p>Häufig gestellte Fragen</p>
              </div>
              <div class="item-arrow">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </div>
            </button>
            <button @click="navigateTo('/pwa/support/contact')" class="settings-item">
              <div class="item-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </div>
              <div class="item-content">
                <h4>Support kontaktieren</h4>
                <p>Direkter Kontakt zu unserem Team</p>
              </div>
              <div class="item-arrow">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </div>
            </button>
          </div>
        </div>

        <!-- Account -->
        <div class="settings-section danger-section">
          <h3 class="section-title">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
            Account
          </h3>
          <div class="settings-list">
            <button @click="handleLogout" class="settings-item logout-item">
              <div class="item-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                </svg>
              </div>
              <div class="item-content">
                <h4>Abmelden</h4>
                <p>Von diesem Gerät abmelden</p>
              </div>
            </button>
            <button @click="navigateTo('/pwa/settings/delete-account')" class="settings-item delete-item">
              <div class="item-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
              </div>
              <div class="item-content">
                <h4>Account löschen</h4>
                <p>Konto permanent löschen</p>
              </div>
              <div class="item-arrow">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </div>
            </button>
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
import { ref } from 'vue'
import AppHeader from '~/components/AppHeader.vue'
import UnifiedFooter from '~/components/pwa/unified/UnifiedFooter.vue'

definePageMeta({
  layout: false
})

// Mock user profile data
const userProfile = ref({
  name: 'Anna Weber',
  email: 'anna.weber@email.com',
  profilePicture: null,
  isHelper: true,
  organization: 'Kirchengemeinde St. Maria',
  verificationStatus: 'verified',
  workRadius: 15
})

const twoFactorEnabled = ref(false)

// Methods
const toggleTwoFactor = () => {
  // Mock toggle - in real app, this would update the backend
  console.log('Two-factor authentication:', twoFactorEnabled.value ? 'enabled' : 'disabled')
}

const handleLogout = () => {
  // Navigate to logout confirmation - will be implemented in US-10.5
  navigateTo('/pwa/settings/logout')
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
.settings-container {
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

/* Profile Summary */
.profile-summary {
  background: white;
  border-radius: 20px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.profile-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.profile-avatar {
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
}

.profile-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-details {
  flex: 1;
}

.profile-name {
  color: #374151;
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0 0 0.25rem 0;
}

.profile-email {
  color: #6b7280;
  font-size: 0.875rem;
  margin: 0 0 0.75rem 0;
}

.profile-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.badge {
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
}

.badge.helper {
  background: rgba(34, 197, 94, 0.1);
  color: #22c55e;
}

.badge.organization {
  background: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
}

.badge.verified {
  background: rgba(168, 85, 247, 0.1);
  color: #a855f7;
}

/* Settings Sections */
.settings-sections {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.settings-section {
  background: white;
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.settings-section.danger-section {
  border: 2px solid rgba(239, 68, 68, 0.1);
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

.danger-section .section-title svg {
  color: #ef4444;
}

.settings-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

/* Settings Items */
.settings-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f9fafb;
  border: 2px solid transparent;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
  width: 100%;
}

.settings-item:hover {
  background: #f3f4f6;
  border-color: #e5e7eb;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.settings-item.logout-item:hover {
  background: rgba(239, 68, 68, 0.05);
  border-color: rgba(239, 68, 68, 0.2);
}

.settings-item.delete-item:hover {
  background: rgba(239, 68, 68, 0.05);
  border-color: rgba(239, 68, 68, 0.2);
}

.item-icon {
  width: 2.5rem;
  height: 2.5rem;
  background: rgba(95, 111, 85, 0.1);
  color: #5F6F55;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.logout-item .item-icon,
.delete-item .item-icon {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}

.item-icon svg {
  width: 1.25rem;
  height: 1.25rem;
}

.item-content {
  flex: 1;
}

.item-content h4 {
  color: #374151;
  font-size: 0.875rem;
  font-weight: 600;
  margin: 0 0 0.25rem 0;
}

.logout-item .item-content h4,
.delete-item .item-content h4 {
  color: #ef4444;
}

.item-content p {
  color: #6b7280;
  font-size: 0.75rem;
  margin: 0;
  line-height: 1.4;
}

.item-arrow {
  color: #8F8B82;
  flex-shrink: 0;
}

.item-arrow svg {
  width: 1.25rem;
  height: 1.25rem;
}

/* Toggle Switch for 2FA */
.toggle-item {
  cursor: default;
}

.toggle-item:hover {
  transform: none;
  box-shadow: none;
}

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

/* Responsive Design */
@media (min-width: 768px) {
  .content-container {
    padding: 2rem;
  }
  
  .settings-section {
    padding: 2rem;
  }
  
  .settings-item {
    padding: 1.25rem;
  }
  
  .profile-summary {
    padding: 2rem;
  }
}

@media (max-width: 480px) {
  .profile-info {
    flex-direction: column;
    text-align: center;
  }
  
  .profile-badges {
    justify-content: center;
  }
  
  .settings-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }
  
  .item-arrow {
    align-self: flex-end;
  }
}
</style>