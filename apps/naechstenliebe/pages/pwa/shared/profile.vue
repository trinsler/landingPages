<template>
  <div class="dashboard-container">
    <!-- Glass Morphism Background -->
    <div class="dashboard-background">
      <div class="background-gradient"></div>
      <div class="background-pattern"></div>
    </div>

    <!-- Header Component -->
    <AppHeader 
      title="Mein Profil"
      current-role="unified"
      :request-count="0"
      @open-requests="() => navigateTo('/pwa')"
      @open-profile="() => {}"
      @open-news="() => navigateTo('/pwa/shared/news')"
      @toggle-role="() => navigateTo('/pwa')"
    />
    
    <div class="mobile-container">
      
      <!-- Profile Header - Optimiert für US-2.1 -->
      <div class="section-card profile-header">
        <div class="profile-avatar-section">
          <!-- Profilbild oder Platzhalter -->
          <div class="profile-avatar">
            <img v-if="userProfile.profilePicture" :src="userProfile.profilePicture" alt="Profilbild" class="avatar-image">
            <svg v-else class="avatar-placeholder" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
          </div>
          
          <!-- Verifizierungs-Status - Enhanced for US-2.4 -->
          <div class="verification-badge" :class="{ 
            'verified': userProfile.verificationStatus === 'verified',
            'pending': userProfile.verificationStatus === 'pending',
            'rejected': userProfile.verificationStatus === 'rejected'
          }">
            <svg v-if="userProfile.verificationStatus === 'verified'" class="verification-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <svg v-else-if="userProfile.verificationStatus === 'pending'" class="verification-icon pending" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <svg v-else class="verification-icon rejected" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
            <span class="verification-text">
              {{ getVerificationText() }}
            </span>
          </div>
        </div>
        
        <!-- Name & Alter (für Vertrauensbildung) -->
        <h2 class="profile-name">{{ userProfile.name }}, {{ userProfile.age }}</h2>
        
        <!-- Stadt (NICHT volle Adresse für Datenschutz) -->
        <p class="profile-location">{{ userProfile.city }}</p>
        
        <!-- Bewertung mit Details -->
        <div class="rating-section">
          <div class="rating-stars">
            <span class="stars" :style="{ '--rating': userProfile.rating }">★★★★★</span>
            <span class="rating-value">{{ userProfile.rating.toFixed(1) }}</span>
          </div>
          <span class="rating-count">({{ userProfile.totalRatings }} Bewertungen)</span>
        </div>

        <!-- Badges (Gold-Helfer, Organisation, etc.) -->
        <div class="badges-section">
          <!-- Helfer-Level Badge -->
          <div v-if="userProfile.helperLevel" class="badge helper-level" :class="userProfile.helperLevel.toLowerCase()">
            <svg class="badge-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3l14 9-14 9V3z"/>
            </svg>
            {{ userProfile.helperLevel }}-Helfer
          </div>
          
          <!-- Organisations-Badge -->
          <div v-if="userProfile.organization" class="badge organization">
            <svg class="badge-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
            </svg>
            {{ userProfile.organization }}
          </div>
          
          <!-- Mitglied seit -->
          <div class="badge member-since">
            <svg class="badge-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
            Mitglied seit {{ userProfile.memberSince }}
          </div>
        </div>

        <!-- Bio (wenn vorhanden) -->
        <div v-if="userProfile.bio" class="bio-section">
          <h4 class="bio-title">Über mich</h4>
          <p class="bio-text">{{ userProfile.bio }}</p>
        </div>

        <!-- Verification Details Section - US-2.4 -->
        <div v-if="userProfile.verificationStatus !== 'verified'" class="verification-details">
          <div v-if="userProfile.verificationStatus === 'pending'" class="verification-pending">
            <div class="verification-header">
              <svg class="verification-detail-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <h4 class="verification-detail-title">Verifizierung läuft</h4>
            </div>
            <p class="verification-detail-text">
              Wir prüfen Ihre Angaben. Dies dauert normalerweise {{ userProfile.verificationDetails.estimatedWaitTime }}.
            </p>
            <div class="verification-progress">
              <div class="progress-bar">
                <div class="progress-fill"></div>
              </div>
              <span class="progress-text">Prüfung läuft...</span>
            </div>
          </div>

          <div v-else-if="userProfile.verificationStatus === 'rejected'" class="verification-rejected">
            <div class="verification-header">
              <svg class="verification-detail-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"/>
              </svg>
              <h4 class="verification-detail-title">Verifizierung abgelehnt</h4>
            </div>
            <p class="verification-detail-text">
              {{ userProfile.verificationDetails.rejectionReason || 'Ihre Verifizierung konnte nicht abgeschlossen werden.' }}
            </p>
            <button @click="retryVerification" class="retry-verification-btn">
              <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
              Erneut versuchen
            </button>
          </div>
        </div>

        <div v-else class="verification-success">
          <p class="verification-success-text">
            Verifiziert seit {{ userProfile.verificationDetails.verifiedDate }}
          </p>
        </div>

        <!-- Profil bearbeiten Button -->
        <button class="edit-profile-btn" @click="editProfile">
          <svg class="edit-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
          </svg>
          Profil bearbeiten
        </button>
      </div>

      <!-- Statistiken & Helfer-spezifische Infos -->
      <div class="section-card stats-section">
        <h3 class="stats-title">{{ currentRole === 'helper' ? 'Meine Helfer-Statistiken' : 'Meine Aktivitäten' }}</h3>
        
        <div class="stats-grid">
          <!-- Jobs abgeschlossen -->
          <div class="stat-card primary">
            <div class="stat-number">{{ userProfile.totalJobsCompleted }}</div>
            <div class="stat-label">{{ currentRole === 'helper' ? 'Aufträge erledigt' : 'Aufträge erstellt' }}</div>
          </div>
          
          <!-- Zweite Statistik -->
          <div class="stat-card">
            <div class="stat-number">{{ getSecondStat() }}</div>
            <div class="stat-label">{{ getSecondStatLabel() }}</div>
          </div>
          
          <!-- Dritte Statistik -->
          <div class="stat-card">
            <div class="stat-number">{{ getThirdStat() }}€</div>
            <div class="stat-label">{{ getThirdStatLabel() }}</div>
          </div>
        </div>

        <!-- Helfer-spezifische Kategorien & Umkreis -->
        <div v-if="currentRole === 'helper' && userProfile.helperCategories" class="helper-info">
          <h4 class="helper-info-title">Meine Kategorien</h4>
          <div class="categories-list">
            <span v-for="category in userProfile.helperCategories" :key="category" class="category-badge">
              {{ getCategoryName(category) }}
            </span>
          </div>
          
          <div class="helper-radius">
            <svg class="radius-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            <span class="radius-text">Arbeite im Umkreis von {{ userProfile.helperRadius || 5 }} km</span>
          </div>
        </div>
      </div>

      <!-- Settings -->
      <div class="section-card settings-section">
        <h3 class="section-title">Einstellungen</h3>
        
        <div class="settings-grid">
          <button class="setting-btn">
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

          <button class="setting-btn" @click="navigateTo('/pwa/notifications')">
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

          <button class="setting-btn" @click="navigateTo('/pwa/shared/payment-methods')">
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

          <button class="setting-btn" @click="navigateTo('/pwa/seeker/payments')">
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

          <button class="setting-btn" @click="navigateTo('/pwa/org/create')">
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

          <button class="setting-btn" @click="navigateTo('/pwa/org/join')">
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

          <button class="setting-btn" @click="navigateTo('/pwa/org/admin')">
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

          <button class="setting-btn" @click="navigateTo('/pwa/support')">
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

      <!-- Role Switch Section -->
      <div class="section-card role-switch-section">
        <div class="role-switch-content">
          <div class="role-icon-container">
            <svg class="role-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/>
            </svg>
          </div>
          <h3 class="role-switch-title">
            {{ currentRole === 'helper' ? 'Als Hilfesuchender aktiv werden' : 'Als Helfer Geld verdienen' }}
          </h3>
          <p class="role-switch-subtitle">
            {{ currentRole === 'helper' ? 'Nutzen Sie unseren Service für Ihre eigenen Bedürfnisse' : 'Nutzen Sie Ihre Fähigkeiten und helfen Sie anderen' }}
          </p>
          <button class="role-switch-btn" @click="switchRole">
            {{ currentRole === 'helper' ? 'Als Hilfesuchender registrieren' : 'Als Helfer registrieren' }}
          </button>
        </div>
      </div>

    </div>

    <!-- Footer Component -->
    <MinimalFooter 
      active-tab="profile"
      current-role="unified"
      @navigate="handleFooterNavigation"
    />

    <!-- Padding for bottom nav -->
    <div style="height: 5rem;"></div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import AppHeader from '~/components/AppHeader.vue'
import MinimalFooter from '~/components/pwa/unified/MinimalFooter.vue'
import { useRole } from '~/composables/useRole.js'

definePageMeta({
  layout: false
})

// Use role management
const { 
  currentRole, 
  toggleRole, 
  getRoleBasedTitle, 
  getRoleBasedNavigation, 
  getRequestButtonAction, 
  getNewsAction,
  detectRoleFromPath
} = useRole()

// Detect role from current URL on page load
onMounted(() => {
  detectRoleFromPath(window.location.pathname)
  
  // Demo mode for testing different verification states
  const route = useRoute()
  if (route.query.demo) {
    switch(route.query.demo) {
      case 'pending':
        userProfile.value.verificationStatus = 'pending'
        userProfile.value.verificationDetails.estimatedWaitTime = '2-6 Stunden'
        break
      case 'rejected':
        userProfile.value.verificationStatus = 'rejected'
        userProfile.value.verificationDetails.rejectionReason = 'Das übermittelte Dokument war nicht deutlich lesbar. Bitte laden Sie ein schärferes Foto hoch.'
        break
      case 'verified':
        userProfile.value.verificationStatus = 'verified'
        break
    }
  }
})

// Erweiterte User-Profil Daten für US-2.1
// Realistische User-Profil Daten je nach aktuellem currentRole
const userProfile = ref({
  // Basis-Informationen
  name: currentRole.value === 'helper' ? 'Max Mustermann' : 'Margarete Schmidt',
  age: currentRole.value === 'helper' ? 16 : 72,
  city: 'Winnweiler',
  memberSince: currentRole.value === 'helper' ? 'September 2024' : 'Januar 2024',
  
  // Profilbild
  profilePicture: null,
  
  // Bio (rollenspezifisch)
  bio: currentRole.value === 'helper' 
    ? 'Hallo! Ich bin Max und helfe gerne beim Einkaufen und im Garten. Bin zuverlässig und von der Kirchengemeinde bestätigt.'
    : 'Hallo! Ich bin Margarete und freue mich über Hilfe im Alltag. Besonders beim Einkaufen und bei kleineren Hausarbeiten.',
  
  // Verifizierung - Enhanced for US-2.4
  isVerified: true,
  verificationStatus: 'verified', // 'pending', 'verified', 'rejected'
  verificationDetails: {
    estimatedWaitTime: '2-6 Stunden', // for pending status
    rejectionReason: null, // for rejected status
    verifiedDate: '15. September 2024' // for verified status
  },
  
  // Bewertungen (rollenspezifisch)
  rating: currentRole.value === 'helper' ? 4.8 : 4.9,
  totalRatings: currentRole.value === 'helper' ? 23 : 31,
  totalJobsCompleted: currentRole.value === 'helper' ? 23 : 47,
  
  // Badges
  helperLevel: currentRole.value === 'helper' ? 'Bronze' : null,
  organization: 'Kirchengemeinde St. Martin',
  
  // Helfer-spezifisch
  helperCategories: currentRole.value === 'helper' ? ['shopping', 'gardening', 'companionship'] : null,
  helperRadius: currentRole.value === 'helper' ? 8 : null,
  
  // Statistiken nach Rolle
  helperData: {
    totalEarned: 465,
    favoriteClients: 7,
    averageRating: 4.8
  },
  seekerData: {
    totalSpent: 1180,
    favoriteHelpers: 8,
    averageRating: 4.9
  }
})

const getSecondStat = () => {
  return currentRole.value === 'helper' ? userProfile.value.helperData.favoriteClients : userProfile.value.seekerData.favoriteHelpers
}

const getSecondStatLabel = () => {
  return currentRole.value === 'helper' ? 'Stammkunden' : 'Favoriten'
}

const getThirdStat = () => {
  return currentRole.value === 'helper' ? userProfile.value.helperData.totalEarned : userProfile.value.seekerData.totalSpent
}

const getThirdStatLabel = () => {
  return currentRole.value === 'helper' ? 'Verdient' : 'Ausgegeben'
}

// Neue Funktionen für US-2.1
const editProfile = () => {
  // Navigation zur Profil-Bearbeitung
  console.log('Navigiere zu Profil bearbeiten')
  navigateTo('/pwa/shared/profile/edit')
}

// US-2.4: Verification Status Methods
const getVerificationText = () => {
  switch(userProfile.value.verificationStatus) {
    case 'verified':
      return 'Verifiziert'
    case 'pending':
      return 'Verifizierung läuft'
    case 'rejected':
      return 'Nicht verifiziert'
    default:
      return 'Unbekannt'
  }
}

const retryVerification = () => {
  // In real app: Navigate to verification upload page
  console.log('Retry verification clicked')
  alert('Sie werden zur Verifizierung weitergeleitet...')
  navigateTo('/pwa/shared/verification')
}

const getCategoryName = (category) => {
  const categoryNames = {
    'shopping': '🛒 Einkaufen',
    'gardening': '🌿 Garten',
    'cooking': '🍳 Kochen',
    'cleaning': '🧹 Putzen',
    'companionship': '👥 Gesellschaft',
    'childcare': '👶 Kinderbetreuung',
    'transportation': '🚗 Transport',
    'other': '📦 Sonstiges'
  }
  return categoryNames[category] || category
}

const switchRole = () => {
  toggleRole()
}

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
      navigateTo('/pwa/seeker/task-create')
      break
    case 'seeker-tasks':
      navigateTo('/pwa') // Opens with seeker tasks sidebar
      break
    case 'seeker-favorites':
      navigateTo('/pwa') // Opens with favorites sidebar
      break
    case 'profile':
      // Already on profile page
      break
  }
}
</script>

<style scoped>
/* Modern Dashboard Design for Profile Page */
.dashboard-container {
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  position: relative;
  overflow: hidden;
}

/* Glass Morphism Background */
.dashboard-background {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
}

.background-gradient {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, 
    #f8fafc 0%, 
    #f1f5f9 25%, 
    #e2e8f0 50%, 
    #cbd5e1 75%, 
    #94a3b8 100%);
}

.background-pattern {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 80%, rgba(95, 111, 85, 0.05) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(190, 205, 163, 0.08) 0%, transparent 50%),
    radial-gradient(circle at 40% 40%, rgba(143, 139, 130, 0.04) 0%, transparent 50%);
  pointer-events: none;
}

.mobile-container {
  padding: 1rem;
  padding-bottom: 6rem;
  position: relative;
  z-index: 1;
}

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

/* Profile Header - Seniorenfreundlich & Vertrauenswürdig */
.profile-header {
  background: rgba(255, 255, 255, 0.9);
  text-align: center;
}

.profile-avatar-section {
  position: relative;
  display: inline-block;
  margin-bottom: 1.5rem;
}

.profile-avatar {
  width: 6rem;
  height: 6rem;
  background: #BECDA3;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  border: 4px solid rgba(95, 111, 85, 0.1);
  position: relative;
}

.avatar-image {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.avatar-placeholder {
  width: 3rem;
  height: 3rem;
  opacity: 0.8;
  color: #5F6F55;
}

/* Verifizierungs-Badge - WICHTIG für Vertrauen */
.verification-badge {
  position: absolute;
  bottom: -0.5rem;
  right: -0.5rem;
  background: #ef4444;
  color: white;
  border-radius: 20px;
  padding: 0.25rem 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  font-weight: 600;
  border: 3px solid white;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
}

.verification-badge.verified {
  background: #22c55e;
}

.verification-badge.pending {
  background: #f59e0b;
}

.verification-badge.rejected {
  background: #ef4444;
}

.verification-icon {
  width: 1rem;
  height: 1rem;
}

.verification-icon.pending {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* Name & Grunddaten - Größere Schrift für Senioren */
.profile-name {
  color: #474747;
  font-size: 1.75rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  line-height: 1.3;
}

.profile-location {
  color: #8F8B82;
  margin: 0 0 1.5rem 0;
  font-size: 1.125rem;
  font-weight: 500;
}

/* Rating Section - Prominent für Vertrauen */
.rating-section {
  margin-bottom: 1.5rem;
}

.rating-stars {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.stars {
  font-size: 1.5rem;
  color: #ddd;
  position: relative;
}

.stars::before {
  content: '★★★★★';
  position: absolute;
  top: 0;
  left: 0;
  color: #fbbf24;
  width: calc(var(--rating) / 5 * 100%);
  overflow: hidden;
}

.rating-value {
  font-size: 1.25rem;
  font-weight: 700;
  color: #474747;
  background: rgba(251, 191, 36, 0.1);
  padding: 0.25rem 0.5rem;
  border-radius: 8px;
}

.rating-count {
  color: #8F8B82;
  font-size: 1rem;
  font-weight: 500;
}

/* Badges - Social Proof ist entscheidend */
.badges-section {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  align-items: center;
}

.badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
  border: 2px solid transparent;
}

.badge-icon {
  width: 1rem;
  height: 1rem;
}

.badge.helper-level {
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: white;
}

.badge.helper-level.gold {
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
}

.badge.helper-level.platin {
  background: linear-gradient(135deg, #e5e7eb, #9ca3af);
}

.badge.organization {
  background: rgba(95, 111, 85, 0.1);
  color: #5F6F55;
  border-color: rgba(95, 111, 85, 0.2);
}

.badge.member-since {
  background: rgba(190, 205, 163, 0.2);
  color: #474747;
}

/* Bio Section */
.bio-section {
  text-align: left;
  background: rgba(248, 250, 252, 0.8);
  border-radius: 12px;
  padding: 1.25rem;
  margin-bottom: 1.5rem;
}

.bio-title {
  color: #474747;
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.75rem 0;
}

.bio-text {
  color: #6b7280;
  font-size: 1rem;
  line-height: 1.6;
  margin: 0;
}

/* Profil bearbeiten Button - Prominent */
.edit-profile-btn {
  background: linear-gradient(135deg, #5F6F55, #4a5c44);
  color: white;
  border: none;
  border-radius: 16px;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin: 0 auto;
  min-height: 3rem; /* Touch-friendly */
  box-shadow: 0 4px 12px rgba(95, 111, 85, 0.3);
}

.edit-profile-btn:hover {
  background: linear-gradient(135deg, #4a5c44, #3d4d38);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(95, 111, 85, 0.4);
}

.edit-icon {
  width: 1.25rem;
  height: 1.25rem;
}

/* Statistiken Section */
.stats-section {
  background: rgba(255, 255, 255, 0.9);
}

.stats-title {
  color: #1e293b;
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0 0 1.25rem 0;
  text-align: center;
  background: linear-gradient(135deg, #1e293b, #475569);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stats-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.stat-card {
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 16px;
  padding: 1.25rem;
  text-align: center;
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.stat-card.primary {
  background: linear-gradient(135deg, rgba(95, 111, 85, 0.15), rgba(190, 205, 163, 0.15));
  border-color: rgba(95, 111, 85, 0.3);
}

.stat-number {
  font-size: 2rem;
  font-weight: 700;
  color: #474747;
  margin-bottom: 0.5rem;
  line-height: 1;
}

.stat-label {
  font-size: 1rem;
  color: #8F8B82;
  font-weight: 500;
}

/* Helfer-spezifische Informationen */
.helper-info {
  border-top: 1px solid rgba(95, 111, 85, 0.1);
  padding-top: 1.5rem;
}

.helper-info-title {
  color: #474747;
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
  text-align: center;
}

.categories-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
  margin-bottom: 1.25rem;
}

.category-badge {
  background: rgba(95, 111, 85, 0.1);
  color: #5F6F55;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
  border: 1px solid rgba(95, 111, 85, 0.2);
}

.helper-radius {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: rgba(59, 130, 246, 0.1);
  border-radius: 12px;
  padding: 0.75rem;
}

.radius-icon {
  width: 1.25rem;
  height: 1.25rem;
  color: #3b82f6;
}

.radius-text {
  color: #1e40af;
  font-weight: 500;
  font-size: 0.875rem;
}

/* Tablet Optimierungen */
@media (min-width: 768px) {
  .stats-grid {
    grid-template-columns: 1fr 1fr 1fr;
  }
  
  .badges-section {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .profile-name {
    font-size: 1.5rem;
  }
  
  .stat-number {
    font-size: 1.75rem;
  }
}

/* Desktop Optimierungen */
@media (min-width: 1024px) {
  .profile-header {
    max-width: 600px;
    margin: 0 auto 1.5rem auto;
  }
  
  .stats-section {
    max-width: 800px;
    margin: 0 auto 1.5rem auto;
  }
}

/* Verification Details - US-2.4 */
.verification-details {
  background: rgba(248, 250, 252, 0.8);
  border-radius: 12px;
  padding: 1.25rem;
  margin-bottom: 1.5rem;
  border: 1px solid rgba(229, 231, 235, 0.5);
}

.verification-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.verification-detail-icon {
  width: 1.5rem;
  height: 1.5rem;
  flex-shrink: 0;
}

.verification-pending .verification-detail-icon {
  color: #f59e0b;
}

.verification-rejected .verification-detail-icon {
  color: #ef4444;
}

.verification-detail-title {
  color: #474747;
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0;
}

.verification-detail-text {
  color: #6b7280;
  font-size: 1rem;
  line-height: 1.6;
  margin: 0 0 1rem 0;
}

/* Progress Bar for Pending Status */
.verification-progress {
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
  width: 60%;
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
  text-align: center;
}

/* Retry Verification Button */
.retry-verification-btn {
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 12px;
  padding: 0.75rem 1.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.retry-verification-btn:hover {
  background: #dc2626;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
}

.retry-verification-btn .btn-icon {
  width: 1rem;
  height: 1rem;
}

/* Verification Success */
.verification-success {
  text-align: center;
  margin-bottom: 1.5rem;
}

.verification-success-text {
  color: #22c55e;
  font-size: 0.875rem;
  font-weight: 500;
  margin: 0;
  background: rgba(34, 197, 94, 0.1);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  border: 1px solid rgba(34, 197, 94, 0.2);
  display: inline-block;
}

/* Settings Grid & Buttons */
.settings-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.setting-btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.setting-btn:hover {
  background: rgba(255, 255, 255, 0.8);
  transform: translateY(-1px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.setting-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.setting-icon-container {
  width: 2.5rem;
  height: 2.5rem;
  background: linear-gradient(135deg, #BECDA3, #a8bb8f);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(95, 111, 85, 0.2);
}

.setting-icon {
  width: 1.25rem;
  height: 1.25rem;
  color: #5F6F55;
}

.setting-text {
  color: #1e293b;
  font-weight: 600;
  font-size: 1rem;
}

.setting-arrow {
  width: 1.25rem;
  height: 1.25rem;
  color: #64748b;
}

/* Role Switch Section */
.role-switch-section {
  text-align: center;
}

.role-switch-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.role-icon-container {
  width: 3rem;
  height: 3rem;
  background: linear-gradient(135deg, #BECDA3, #a8bb8f);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(95, 111, 85, 0.3);
}

.role-icon {
  width: 1.5rem;
  height: 1.5rem;
  color: #5F6F55;
}

.role-switch-title {
  color: #1e293b;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
}

.role-switch-subtitle {
  color: #64748b;
  margin: 0;
  font-size: 0.875rem;
  line-height: 1.5;
}

.role-switch-btn {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  color: #5F6F55;
  padding: 1rem 2rem;
  border: 2px solid rgba(190, 205, 163, 0.6);
  border-radius: 16px;
  font-weight: 600;
  cursor: pointer;
  font-size: 0.875rem;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(95, 111, 85, 0.1);
}

.role-switch-btn:hover {
  background: linear-gradient(135deg, #BECDA3, #a8bb8f);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(95, 111, 85, 0.3);
  border-color: transparent;
}

/* Accessibility & Senior-friendly */
@media (prefers-reduced-motion: reduce) {
  .verification-icon.pending {
    animation: none;
  }
  
  .progress-fill {
    animation: none;
  }
  
  .edit-profile-btn:hover {
    transform: none;
  }
  
  .retry-verification-btn:hover {
    transform: none;
  }
  
  .setting-btn:hover {
    transform: none;
  }
  
  .role-switch-btn:hover {
    transform: none;
  }
}

/* High contrast mode */
@media (prefers-contrast: high) {
  .profile-header {
    border: 2px solid #000;
  }
  
  .verification-badge {
    border-color: #000;
  }
}
</style>