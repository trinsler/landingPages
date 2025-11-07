<template>
  <div class="org-admin-container">
    <!-- Header -->
    <AppHeader 
      title="Organisation verwalten" 
      current-role="unified"
      :request-count="0"
      :show-back="true"
      @back="() => navigateTo('/pwa/shared/profile')"
      @open-profile="() => navigateTo('/pwa/shared/profile')"
    />

    <div class="content-container">
      
      <!-- Loading State -->
      <div v-if="isLoading" class="loading-container">
        <div class="loading-spinner"></div>
        <p>Lade Anfragen...</p>
      </div>

      <!-- Quick Actions -->
      <div v-else-if="currentUserOrganization" class="quick-actions-section">
        <h3 class="section-title">Schnellaktionen</h3>
        <div class="actions-grid">
          <button @click="navigateTo('/pwa/org/post-job')" class="action-card post-job">
            <div class="action-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
              </svg>
            </div>
            <div class="action-content">
              <h4>Job posten</h4>
              <p>Neuen Job für Organisation erstellen</p>
            </div>
          </button>
          <button @click="navigateTo(`/pwa/org/profile/${currentUserOrganization.id}`)" class="action-card view-profile">
            <div class="action-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
              </svg>
            </div>
            <div class="action-content">
              <h4>Profil anzeigen</h4>
              <p>Öffentliches Organisationsprofil</p>
            </div>
          </button>
        </div>
      </div>

      <!-- Organization Info -->
      <div v-if="currentUserOrganization" class="org-info-section">
        <div class="org-header">
          <div class="org-logo">
            <img v-if="currentUserOrganization.logo_url" :src="currentUserOrganization.logo_url" alt="Logo">
            <div v-else class="org-logo-placeholder">
              {{ currentUserOrganization.name.charAt(0) }}
            </div>
          </div>
          <div class="org-details">
            <h2 class="org-name">{{ currentUserOrganization.name }}</h2>
            <div class="org-type">{{ getTypeLabel(currentUserOrganization.type) }}</div>
            <div class="org-stats">
              <span class="stat">{{ currentUserOrganization.total_members }} Mitglieder</span>
              <span class="stat">{{ currentUserOrganization.total_jobs_posted }} Jobs</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Membership Requests Section -->
      <div v-if="currentUserOrganization" class="requests-section">
        <div class="section-header">
          <h3 class="section-title">
            Beitritts-Anfragen
            <span v-if="pendingRequests.length > 0" class="request-count">{{ pendingRequests.length }}</span>
          </h3>
          <p class="section-subtitle">Verwalte Anfragen von neuen Mitgliedern</p>
        </div>

        <!-- No Requests State -->
        <div v-if="membershipRequests.length === 0" class="no-requests">
          <div class="no-requests-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
            </svg>
          </div>
          <h4>Keine Anfragen vorhanden</h4>
          <p>Es gibt derzeit keine Beitritts-Anfragen für deine Organisation.</p>
        </div>

        <!-- Requests List -->
        <div v-else class="requests-list">
          <div 
            v-for="request in membershipRequests" 
            :key="request.id"
            class="request-card"
            :class="{ 'pending': request.status === 'pending' }"
          >
            <div class="request-header">
              <div class="user-info">
                <div class="user-avatar">
                  <img v-if="request.user_avatar" :src="request.user_avatar" alt="Avatar">
                  <div v-else class="avatar-placeholder">
                    {{ request.user_name.charAt(0) }}
                  </div>
                </div>
                <div class="user-details">
                  <h4 class="user-name">{{ request.user_name }}</h4>
                  <div class="user-meta">
                    <span class="user-age">{{ request.user_age }} Jahre</span>
                    <div class="user-rating">
                      <svg fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                      {{ request.user_rating }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="request-status">
                <span class="status-badge" :class="request.status">
                  {{ getStatusLabel(request.status) }}
                </span>
              </div>
            </div>

            <div class="request-time">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              Anfrage vom {{ formatDate(request.requested_at) }}
            </div>

            <!-- Actions (only for pending requests) -->
            <div v-if="request.status === 'pending'" class="request-actions">
              <button 
                @click="rejectRequest(request.id)"
                :disabled="processingRequest === request.id"
                class="btn-reject"
              >
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
                Ablehnen
              </button>
              <button 
                @click="acceptRequest(request.id)"
                :disabled="processingRequest === request.id"
                class="btn-accept"
              >
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                <span v-if="processingRequest === request.id">Verarbeite...</span>
                <span v-else>Annehmen</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- No Organization State -->
      <div v-else class="no-organization">
        <div class="no-org-icon">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
          </svg>
        </div>
        <h3>Keine Organisation</h3>
        <p>Du bist nicht Administrator einer Organisation.</p>
        <button @click="navigateTo('/pwa/org/create')" class="btn-create-org">
          Organisation erstellen
        </button>
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
import { useOrganizations } from '~/composables/useOrganizations.js'

definePageMeta({
  layout: false
})

// Use organizations composable
const { 
  currentUserOrganization, 
  isLoading, 
  getMembershipRequests, 
  acceptMembershipRequest, 
  rejectMembershipRequest,
  loadUserOrganization,
  isOrganizationAdmin 
} = useOrganizations()

// Component state
const membershipRequests = ref([])
const processingRequest = ref(null)
const showMessage = ref(false)
const message = ref('')
const messageType = ref('success')

// Computed properties
const pendingRequests = computed(() => 
  membershipRequests.value.filter(request => request.status === 'pending')
)

// Load data on mount
onMounted(async () => {
  // Load user's organization first
  await loadUserOrganization('current_user_id')
  
  // If user has organization and is admin, load requests
  if (currentUserOrganization.value && isOrganizationAdmin.value) {
    await loadMembershipRequests()
  }
})

// Methods
const loadMembershipRequests = async () => {
  if (!currentUserOrganization.value) return
  
  try {
    const requests = await getMembershipRequests(currentUserOrganization.value.id)
    membershipRequests.value = requests
  } catch (error) {
    console.error('Failed to load membership requests:', error)
    showErrorMessage('Fehler beim Laden der Anfragen.')
  }
}

const acceptRequest = async (requestId) => {
  processingRequest.value = requestId
  
  try {
    const result = await acceptMembershipRequest(requestId)
    
    if (result.success) {
      // Update request status in local list
      const request = membershipRequests.value.find(r => r.id === requestId)
      if (request) {
        request.status = 'accepted'
      }
      
      showSuccessMessage(result.message)
    } else {
      showErrorMessage(result.error)
    }
  } catch (error) {
    showErrorMessage('Fehler beim Annehmen der Anfrage.')
  } finally {
    processingRequest.value = null
  }
}

const rejectRequest = async (requestId) => {
  processingRequest.value = requestId
  
  try {
    const result = await rejectMembershipRequest(requestId)
    
    if (result.success) {
      // Update request status in local list
      const request = membershipRequests.value.find(r => r.id === requestId)
      if (request) {
        request.status = 'rejected'
      }
      
      showSuccessMessage(result.message)
    } else {
      showErrorMessage(result.error)
    }
  } catch (error) {
    showErrorMessage('Fehler beim Ablehnen der Anfrage.')
  } finally {
    processingRequest.value = null
  }
}

const getTypeLabel = (type) => {
  const types = {
    charity: 'Wohltätigkeitsorganisation',
    church: 'Kirchengemeinde',
    senior_center: 'Seniorenzentrum',
    neighborhood: 'Nachbarschaftshilfe',
    other: 'Sonstiges'
  }
  return types[type] || type
}

const getStatusLabel = (status) => {
  const labels = {
    pending: 'Ausstehend',
    accepted: 'Angenommen',
    rejected: 'Abgelehnt'
  }
  return labels[status] || status
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const showSuccessMessage = (msg) => {
  message.value = msg
  messageType.value = 'success'
  showMessage.value = true
  setTimeout(() => {
    showMessage.value = false
  }, 3000)
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
</script>

<style scoped>
.org-admin-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}

.content-container {
  padding: 1rem;
  padding-bottom: 6rem;
  max-width: 800px;
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

/* Quick Actions Section */
.quick-actions-section {
  background: white;
  border-radius: 20px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.action-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f9fafb;
  border: 2px solid transparent;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-card:hover {
  background: #f3f4f6;
  border-color: #BECDA3;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.action-card.post-job:hover {
  border-color: #22c55e;
}

.action-card.view-profile:hover {
  border-color: #3b82f6;
}

.action-icon {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.post-job .action-icon {
  background: rgba(34, 197, 94, 0.1);
  color: #22c55e;
}

.view-profile .action-icon {
  background: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
}

.action-icon svg {
  width: 1.25rem;
  height: 1.25rem;
}

.action-content {
  flex: 1;
  text-align: left;
}

.action-content h4 {
  color: #374151;
  font-size: 0.875rem;
  font-weight: 600;
  margin: 0 0 0.25rem 0;
}

.action-content p {
  color: #6b7280;
  font-size: 0.75rem;
  margin: 0;
}

/* Organization Info Section */
.org-info-section {
  background: white;
  border-radius: 20px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.org-header {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.org-logo {
  width: 4rem;
  height: 4rem;
  border-radius: 12px;
  overflow: hidden;
  flex-shrink: 0;
}

.org-logo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.org-logo-placeholder {
  width: 100%;
  height: 100%;
  background: #BECDA3;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #5F6F55;
  font-weight: 700;
  font-size: 1.5rem;
}

.org-details {
  flex: 1;
}

.org-name {
  color: #374151;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 0.25rem 0;
}

.org-type {
  color: #6b7280;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
}

.org-stats {
  display: flex;
  gap: 1rem;
}

.stat {
  color: #6b7280;
  font-size: 0.875rem;
}

/* Requests Section */
.requests-section {
  background: white;
  border-radius: 20px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.section-header {
  margin-bottom: 1.5rem;
}

.section-title {
  color: #374151;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.request-count {
  background: #ef4444;
  color: white;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  min-width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.section-subtitle {
  color: #6b7280;
  font-size: 0.875rem;
  margin: 0;
}

/* No Requests State */
.no-requests {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 3rem;
  text-align: center;
  color: #6b7280;
}

.no-requests-icon {
  width: 4rem;
  height: 4rem;
  color: #d1d5db;
}

.no-requests h4 {
  color: #374151;
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0;
}

.no-requests p {
  margin: 0;
}

/* Request Cards */
.requests-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.request-card {
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  padding: 1rem;
  background: #f9fafb;
  transition: all 0.2s ease;
}

.request-card.pending {
  border-color: #BECDA3;
  background: #fefffe;
}

.request-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.user-avatar {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
}

.user-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-placeholder {
  width: 100%;
  height: 100%;
  background: #BECDA3;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #5F6F55;
  font-weight: 700;
  font-size: 1rem;
}

.user-details {
  flex: 1;
}

.user-name {
  color: #374151;
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.25rem 0;
}

.user-meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.875rem;
}

.user-age {
  color: #6b7280;
}

.user-rating {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: #f59e0b;
  font-weight: 500;
}

.user-rating svg {
  width: 1rem;
  height: 1rem;
}

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
}

.status-badge.pending {
  background: rgba(245, 158, 11, 0.1);
  color: #f59e0b;
}

.status-badge.accepted {
  background: rgba(34, 197, 94, 0.1);
  color: #22c55e;
}

.status-badge.rejected {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}

.request-time {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6b7280;
  font-size: 0.875rem;
  margin-bottom: 1rem;
}

.request-time svg {
  width: 1rem;
  height: 1rem;
}

/* Request Actions */
.request-actions {
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
}

.btn-reject,
.btn-accept {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
}

.btn-reject {
  background: #f3f4f6;
  color: #6b7280;
}

.btn-reject:hover:not(:disabled) {
  background: #e5e7eb;
  color: #ef4444;
}

.btn-accept {
  background: #5F6F55;
  color: white;
}

.btn-accept:hover:not(:disabled) {
  background: #4a5c44;
}

.btn-reject:disabled,
.btn-accept:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-reject svg,
.btn-accept svg {
  width: 1rem;
  height: 1rem;
}

/* No Organization State */
.no-organization {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  padding: 3rem;
  text-align: center;
  background: white;
  border-radius: 20px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.no-org-icon {
  width: 4rem;
  height: 4rem;
  color: #d1d5db;
}

.no-organization h3 {
  color: #374151;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
}

.no-organization p {
  color: #6b7280;
  margin: 0;
}

.btn-create-org {
  background: #5F6F55;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease;
}

.btn-create-org:hover {
  background: #4a5c44;
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
  
  .request-actions {
    justify-content: flex-end;
  }
  
  .org-stats {
    gap: 2rem;
  }
}
</style>