<template>
  <div class="org-profile-container">
    <!-- Header -->
    <AppHeader 
      title="Organisation" 
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
        <p>Lade Organisationsprofil...</p>
      </div>

      <!-- Organization Profile -->
      <div v-else-if="organization" class="org-profile">
        
        <!-- Organization Header -->
        <div class="org-header-section">
          <div class="org-header">
            <div class="org-logo">
              <img v-if="organization.logo_url" :src="organization.logo_url" alt="Logo">
              <div v-else class="org-logo-placeholder">
                {{ organization.name.charAt(0) }}
              </div>
            </div>
            <div class="org-basic-info">
              <h1 class="org-name">{{ organization.name }}</h1>
              <div class="org-type">{{ getTypeLabel(organization.type) }}</div>
              <div class="org-verification">
                <span v-if="organization.is_verified" class="verified-badge">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  Verifiziert
                </span>
                <span v-else class="pending-badge">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  Verifizierung läuft
                </span>
              </div>
            </div>
          </div>

          <!-- Organization Stats -->
          <div class="org-stats">
            <div class="stat">
              <div class="stat-number">{{ organization.total_members }}</div>
              <div class="stat-label">Mitglieder</div>
            </div>
            <div class="stat">
              <div class="stat-number">{{ organization.total_jobs_posted }}</div>
              <div class="stat-label">Jobs gepostet</div>
            </div>
            <div class="stat">
              <div class="stat-number">{{ organization.active_jobs || 0 }}</div>
              <div class="stat-label">Aktive Jobs</div>
            </div>
          </div>
        </div>

        <!-- Organization Description -->
        <div v-if="organization.description" class="org-description-section">
          <h3 class="section-title">Über die Organisation</h3>
          <p class="org-description">{{ organization.description }}</p>
        </div>

        <!-- Contact Information -->
        <div class="org-contact-section">
          <h3 class="section-title">Kontakt</h3>
          <div class="contact-info">
            <div class="contact-item">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              <span>{{ organization.contact_email }}</span>
            </div>
            <div v-if="organization.contact_phone" class="contact-item">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
              <span>{{ organization.contact_phone }}</span>
            </div>
            <div v-if="organization.address" class="contact-item">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              <span>{{ organization.address }}</span>
            </div>
            <div v-if="organization.website" class="contact-item">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
              <a :href="organization.website" target="_blank" class="website-link">
                Website besuchen
              </a>
            </div>
          </div>
        </div>

        <!-- Recent Jobs -->
        <div class="org-jobs-section">
          <h3 class="section-title">
            Aktuelle Jobs
            <span v-if="recentJobs.length > 0" class="job-count">{{ recentJobs.length }}</span>
          </h3>
          
          <!-- No Jobs State -->
          <div v-if="recentJobs.length === 0" class="no-jobs">
            <div class="no-jobs-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6"/>
              </svg>
            </div>
            <p>Diese Organisation hat noch keine Jobs gepostet.</p>
          </div>

          <!-- Jobs List -->
          <div v-else class="jobs-list">
            <div 
              v-for="job in recentJobs" 
              :key="job.id"
              class="job-card"
              @click="navigateTo(`/pwa/jobs/detail/${job.id}`)"
            >
              <div class="job-header">
                <h4 class="job-title">{{ job.title }}</h4>
                <div class="job-payment">{{ job.payment }}€</div>
              </div>
              <p class="job-description">{{ job.description }}</p>
              <div class="job-meta">
                <div class="job-location">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  </svg>
                  {{ job.location }}
                </div>
                <div class="job-date">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                  {{ formatDate(job.date) }}
                </div>
              </div>
              <div class="job-status">
                <span class="status-badge" :class="job.status">
                  {{ getJobStatusLabel(job.status) }}
                </span>
              </div>
            </div>
          </div>

          <!-- View All Jobs Button -->
          <div v-if="recentJobs.length > 0" class="view-all-jobs">
            <button @click="navigateTo(`/pwa/org/jobs/${organization.id}`)" class="btn-view-all">
              Alle Jobs anzeigen ({{ organization.total_jobs_posted }})
            </button>
          </div>
        </div>

        <!-- Team Members (if current user is member) -->
        <div v-if="isCurrentUserMember" class="org-members-section">
          <h3 class="section-title">
            Team-Mitglieder
            <span class="member-count">{{ teamMembers.length }}</span>
          </h3>
          
          <div class="members-grid">
            <div 
              v-for="member in teamMembers" 
              :key="member.id"
              class="member-card"
            >
              <div class="member-avatar">
                <img v-if="member.avatar" :src="member.avatar" alt="Avatar">
                <div v-else class="avatar-placeholder">
                  {{ member.name.charAt(0) }}
                </div>
              </div>
              <div class="member-info">
                <h5 class="member-name">{{ member.name }}</h5>
                <div class="member-role">{{ getMemberRoleLabel(member.role) }}</div>
                <div class="member-rating">
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                  {{ member.rating }}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <!-- Not Found State -->
      <div v-else class="not-found">
        <div class="not-found-icon">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.291-1.007-5.824-2.709"/>
          </svg>
        </div>
        <h3>Organisation nicht gefunden</h3>
        <p>Die angeforderte Organisation konnte nicht gefunden werden.</p>
        <button @click="navigateTo('/pwa/shared/profile')" class="btn-back">
          Zurück zum Profil
        </button>
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

// Get route parameter
const route = useRoute()
const orgId = route.params.orgId

// Use organizations composable
const { getOrganizationById, currentUserOrganization } = useOrganizations()

// Component state
const organization = ref(null)
const isLoading = ref(true)
const recentJobs = ref([])
const teamMembers = ref([])

// Computed properties
const isCurrentUserMember = computed(() => {
  return currentUserOrganization.value?.id === organization.value?.id
})

// Load organization data on mount
onMounted(async () => {
  await loadOrganization()
  await loadRecentJobs()
  if (isCurrentUserMember.value) {
    await loadTeamMembers()
  }
})

// Methods
const loadOrganization = async () => {
  isLoading.value = true
  
  try {
    const org = await getOrganizationById(orgId)
    organization.value = org
  } catch (error) {
    console.error('Failed to load organization:', error)
    organization.value = null
  } finally {
    isLoading.value = false
  }
}

const loadRecentJobs = async () => {
  if (!organization.value) return
  
  try {
    // Mock recent jobs - In real app, call API
    recentJobs.value = [
      {
        id: 'job_1',
        title: 'Einkaufshilfe für Senioren',
        description: 'Wir suchen jemanden, der unseren Senioren beim wöchentlichen Einkauf hilft.',
        payment: 25,
        location: 'Kirchengemeinde St. Maria',
        date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'open'
      },
      {
        id: 'job_2',
        title: 'Garten-Pflege',
        description: 'Hilfe bei der Pflege des Gemeindegartens benötigt.',
        payment: 40,
        location: 'Kirchengemeinde St. Maria',
        date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'open'
      },
      {
        id: 'job_3',
        title: 'Vorlesestunde für Kinder',
        description: 'Suchen jemanden für die wöchentliche Vorlesestunde.',
        payment: 20,
        location: 'Kirchengemeinde St. Maria',
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'assigned'
      }
    ]
  } catch (error) {
    console.error('Failed to load recent jobs:', error)
    recentJobs.value = []
  }
}

const loadTeamMembers = async () => {
  if (!organization.value) return
  
  try {
    // Mock team members - In real app, call API
    teamMembers.value = [
      {
        id: 'member_1',
        name: 'Pfarrer Michael Schmidt',
        role: 'admin',
        avatar: null,
        rating: 4.9,
        member_since: '2020-01-15'
      },
      {
        id: 'member_2',
        name: 'Maria Müller',
        role: 'coordinator',
        avatar: null,
        rating: 4.8,
        member_since: '2021-03-20'
      },
      {
        id: 'member_3',
        name: 'Hans Weber',
        role: 'member',
        avatar: null,
        rating: 4.7,
        member_since: '2022-06-10'
      },
      {
        id: 'member_4',
        name: 'Anna Fischer',
        role: 'member',
        avatar: null,
        rating: 4.9,
        member_since: '2023-01-05'
      }
    ]
  } catch (error) {
    console.error('Failed to load team members:', error)
    teamMembers.value = []
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

const getJobStatusLabel = (status) => {
  const labels = {
    open: 'Offen',
    assigned: 'Vergeben',
    in_progress: 'In Bearbeitung',
    completed: 'Abgeschlossen',
    cancelled: 'Abgebrochen'
  }
  return labels[status] || status
}

const getMemberRoleLabel = (role) => {
  const labels = {
    admin: 'Administrator',
    coordinator: 'Koordinator',
    member: 'Mitglied'
  }
  return labels[role] || role
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
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
.org-profile-container {
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

/* Organization Header */
.org-header-section {
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
  margin-bottom: 1.5rem;
}

.org-logo {
  width: 5rem;
  height: 5rem;
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
  font-size: 2rem;
}

.org-basic-info {
  flex: 1;
}

.org-name {
  color: #374151;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  line-height: 1.2;
}

.org-type {
  color: #6b7280;
  font-size: 1rem;
  margin-bottom: 0.75rem;
}

.verified-badge,
.pending-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.875rem;
  font-weight: 500;
}

.verified-badge {
  background: rgba(34, 197, 94, 0.1);
  color: #22c55e;
}

.pending-badge {
  background: rgba(245, 158, 11, 0.1);
  color: #f59e0b;
}

.verified-badge svg,
.pending-badge svg {
  width: 1rem;
  height: 1rem;
}

.org-stats {
  display: flex;
  gap: 2rem;
  justify-content: center;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 12px;
}

.stat {
  text-align: center;
}

.stat-number {
  color: #5F6F55;
  font-size: 2rem;
  font-weight: 700;
  line-height: 1;
  margin-bottom: 0.25rem;
}

.stat-label {
  color: #6b7280;
  font-size: 0.875rem;
  font-weight: 500;
}

/* Content Sections */
.org-description-section,
.org-contact-section,
.org-jobs-section,
.org-members-section {
  background: white;
  border-radius: 20px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.section-title {
  color: #374151;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.job-count,
.member-count {
  background: #5F6F55;
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

.org-description {
  color: #6b7280;
  line-height: 1.6;
  margin: 0;
}

/* Contact Information */
.contact-info {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #6b7280;
}

.contact-item svg {
  width: 1.25rem;
  height: 1.25rem;
  color: #8F8B82;
  flex-shrink: 0;
}

.website-link {
  color: #5F6F55;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
}

.website-link:hover {
  color: #4a5c44;
}

/* Jobs Section */
.no-jobs {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
  text-align: center;
  color: #6b7280;
}

.no-jobs-icon {
  width: 3rem;
  height: 3rem;
  color: #d1d5db;
}

.jobs-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.job-card {
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  padding: 1rem;
  background: #f9fafb;
  cursor: pointer;
  transition: all 0.2s ease;
}

.job-card:hover {
  border-color: #BECDA3;
  background: #fefffe;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.job-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.job-title {
  color: #374151;
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
}

.job-payment {
  color: #5F6F55;
  font-size: 1rem;
  font-weight: 700;
}

.job-description {
  color: #6b7280;
  font-size: 0.875rem;
  line-height: 1.5;
  margin: 0 0 0.75rem 0;
}

.job-meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 0.75rem;
}

.job-location,
.job-date {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: #6b7280;
  font-size: 0.75rem;
}

.job-location svg,
.job-date svg {
  width: 0.875rem;
  height: 0.875rem;
}

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
}

.status-badge.open {
  background: rgba(34, 197, 94, 0.1);
  color: #22c55e;
}

.status-badge.assigned {
  background: rgba(245, 158, 11, 0.1);
  color: #f59e0b;
}

.status-badge.in_progress {
  background: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
}

.status-badge.completed {
  background: rgba(107, 114, 128, 0.1);
  color: #6b7280;
}

.view-all-jobs {
  margin-top: 1rem;
  text-align: center;
}

.btn-view-all {
  background: #5F6F55;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease;
}

.btn-view-all:hover {
  background: #4a5c44;
}

/* Team Members */
.members-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}

.member-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 12px;
  text-align: center;
}

.member-avatar {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 0.75rem;
}

.member-avatar img {
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
  font-size: 1.25rem;
}

.member-name {
  color: #374151;
  font-size: 0.875rem;
  font-weight: 600;
  margin: 0 0 0.25rem 0;
}

.member-role {
  color: #6b7280;
  font-size: 0.75rem;
  margin-bottom: 0.5rem;
}

.member-rating {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: #f59e0b;
  font-size: 0.75rem;
  font-weight: 500;
}

.member-rating svg {
  width: 0.875rem;
  height: 0.875rem;
}

/* Not Found State */
.not-found {
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

.not-found-icon {
  width: 4rem;
  height: 4rem;
  color: #d1d5db;
}

.not-found h3 {
  color: #374151;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
}

.not-found p {
  color: #6b7280;
  margin: 0;
}

.btn-back {
  background: #5F6F55;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease;
}

.btn-back:hover {
  background: #4a5c44;
}

/* Responsive Design */
@media (min-width: 768px) {
  .content-container {
    padding: 2rem;
  }
  
  .org-stats {
    gap: 3rem;
  }
  
  .contact-info {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
  
  .members-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
}

@media (max-width: 480px) {
  .org-header {
    flex-direction: column;
    text-align: center;
  }
  
  .org-stats {
    gap: 1rem;
  }
  
  .stat-number {
    font-size: 1.5rem;
  }
  
  .job-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .job-meta {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>