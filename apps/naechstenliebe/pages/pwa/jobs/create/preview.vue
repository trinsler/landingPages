<template>
  <div class="job-preview-container">
    <!-- Header Component -->
    <AppHeader 
      title="Job-Vorschau"
      current-role="unified"
      :request-count="0"
      @open-requests="() => navigateTo('/pwa')"
      @open-profile="() => navigateTo('/pwa/shared/profile')"
      @open-news="() => navigateTo('/pwa/shared/news')"
      @toggle-role="() => navigateTo('/pwa')"
    />
    
    <div class="mobile-container">
      
      <!-- Preview Header -->
      <div class="preview-header">
        <h2 class="preview-title">Job-Vorschau</h2>
        <p class="preview-subtitle">Überprüfen Sie Ihr Jobangebot bevor es veröffentlicht wird</p>
      </div>

      <!-- Job Preview Card -->
      <div class="job-card">
        <!-- Category Section -->
        <div class="category-section">
          <div class="category-icon-display">
            <svg class="category-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path v-if="jobData.categoryIcon === 'shopping'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5L17 18"/>
              <circle v-if="jobData.categoryIcon === 'shopping'" cx="9" cy="20" r="1"/>
              <circle v-if="jobData.categoryIcon === 'shopping'" cx="20" cy="20" r="1"/>
              <path v-if="jobData.categoryIcon === 'gardening'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              <path v-if="jobData.categoryIcon === 'cooking'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
              <path v-if="jobData.categoryIcon === 'cleaning'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
              <path v-if="jobData.categoryIcon === 'companionship' || jobData.categoryIcon === 'childcare'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              <path v-if="jobData.categoryIcon === 'transportation'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM21 17a2 2 0 11-4 0 2 2 0 014 0z"/>
              <path v-if="jobData.categoryIcon === 'other'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
          </div>
          <span class="category-name">{{ jobData.categoryName }}</span>
        </div>

        <!-- Job Title -->
        <h3 class="job-title">{{ jobData.title }}</h3>

        <!-- Job Description -->
        <div class="description-section">
          <h4 class="section-label">Beschreibung</h4>
          <p class="job-description">{{ jobData.description }}</p>
        </div>

        <!-- Job Details Grid -->
        <div class="details-grid">
          <!-- Timing -->
          <div class="detail-item">
            <div class="detail-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path v-if="jobData.isImmediate" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
            </div>
            <div class="detail-content">
              <span class="detail-label">Zeitpunkt</span>
              <span class="detail-value">
                {{ jobData.isImmediate ? 'Sofort' : `${formattedDate} um ${jobData.scheduledTime}` }}
              </span>
            </div>
          </div>

          <!-- Duration -->
          <div class="detail-item">
            <div class="detail-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div class="detail-content">
              <span class="detail-label">Geschätzte Dauer</span>
              <span class="detail-value">{{ jobData.duration }} {{ jobData.duration === 1 ? 'Stunde' : 'Stunden' }}</span>
            </div>
          </div>

          <!-- Price -->
          <div class="detail-item price-highlight">
            <div class="detail-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
              </svg>
            </div>
            <div class="detail-content">
              <span class="detail-label">Vergütung</span>
              <span class="detail-value price-value">{{ jobData.price }}€</span>
            </div>
          </div>

          <!-- Radius -->
          <div class="detail-item">
            <div class="detail-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
            </div>
            <div class="detail-content">
              <span class="detail-label">Suchradius</span>
              <span class="detail-value">{{ jobData.radius }} km</span>
            </div>
          </div>
        </div>

        <!-- Estimated Helper Count -->
        <div class="helper-estimate">
          <div class="estimate-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
            </svg>
          </div>
          <div class="estimate-content">
            <span class="estimate-count">~{{ estimatedHelpers }} Helfer</span>
            <span class="estimate-description">in Ihrer Nähe werden benachrichtigt</span>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="action-buttons">
        <button @click="goBack" class="back-btn">
          <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 17l-5-5m0 0l5-5m-5 5h12"/>
          </svg>
          Bearbeiten
        </button>
        
        <button @click="confirmAndCreateJob" :disabled="isCreating" class="create-btn" :class="{ 'creating': isCreating }">
          <svg v-if="isCreating" class="btn-icon spinning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
          </svg>
          <svg v-else class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
          </svg>
          {{ isCreating ? 'Job wird erstellt...' : 'Job jetzt erstellen' }}
        </button>
      </div>

      <!-- Info Notice -->
      <div class="info-notice">
        <svg class="info-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <div class="info-content">
          <span class="info-title">Nach der Veröffentlichung</span>
          <span class="info-description">Ihr Job wird an verfügbare Helfer gesendet. Sie erhalten Benachrichtigungen sobald sich jemand bewirbt.</span>
        </div>
      </div>

    </div>

    <!-- Footer Component -->
    <UnifiedFooter 
      active-tab="seeker-create"
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
import UnifiedFooter from '~/components/pwa/unified/MinimalFooter.vue'

definePageMeta({
  layout: false
})

// Get job data from route query
const route = useRoute()
const isCreating = ref(false)

// Parse job data from query parameters
const jobData = ref({
  category: route.query.category || 'shopping',
  categoryName: route.query.categoryName || 'Einkaufen',
  categoryIcon: route.query.categoryIcon || 'shopping',
  title: route.query.title || '',
  description: route.query.description || '',
  isImmediate: route.query.isImmediate === 'true',
  scheduledDate: route.query.scheduledDate || '',
  scheduledTime: route.query.scheduledTime || '',
  duration: parseFloat(route.query.duration) || 2,
  price: parseInt(route.query.price) || 20,
  radius: parseInt(route.query.radius) || 5
})

// Computed properties
const formattedDate = computed(() => {
  if (!jobData.value.scheduledDate) return ''
  const date = new Date(jobData.value.scheduledDate)
  return date.toLocaleDateString('de-DE', {
    weekday: 'long',
    year: 'numeric',
    month: 'long', 
    day: 'numeric'
  })
})

const estimatedHelpers = computed(() => {
  // Simulate helper estimation based on radius and category
  const baseHelpers = 12
  const radiusMultiplier = Math.round(jobData.value.radius / 5)
  const categoryMultiplier = jobData.value.category === 'shopping' ? 1.3 : 1.0
  return Math.round(baseHelpers * radiusMultiplier * categoryMultiplier)
})

// Methods
const goBack = () => {
  navigateTo({
    path: '/pwa/jobs/create/details',
    query: {
      category: jobData.value.category,
      customName: jobData.value.categoryName
    }
  })
}

const confirmAndCreateJob = async () => {
  isCreating.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const jobPayload = {
      category: jobData.value.category,
      categoryName: jobData.value.categoryName,
      title: jobData.value.title,
      description: jobData.value.description,
      isImmediate: jobData.value.isImmediate,
      scheduledDate: jobData.value.scheduledDate,
      scheduledTime: jobData.value.scheduledTime,
      duration: jobData.value.duration,
      price: jobData.value.price,
      radius: jobData.value.radius,
      status: 'open',
      createdAt: new Date().toISOString()
    }
    
    console.log('Job created:', jobPayload)
    
    // Navigate to success page
    navigateTo('/pwa/jobs/created')
    
  } catch (error) {
    console.error('Error creating job:', error)
    alert('Fehler beim Erstellen des Jobs. Bitte versuchen Sie es erneut.')
  } finally {
    isCreating.value = false
  }
}

// Footer navigation
const handleFooterNavigation = (tab) => {
  if (isCreating.value) return // Prevent navigation while creating
  
  switch(tab) {
    case 'dashboard':
      navigateTo('/pwa')
      break
    case 'helper-tasks':
      navigateTo('/pwa/helper/tasks')
      break
    case 'chat':
      navigateTo('/pwa/shared/chat')
      break
    case 'seeker-create':
      // Already on create flow
      break
    case 'seeker-history':
      navigateTo('/pwa/seeker/history')
      break
    case 'seeker-favorites':
      navigateTo('/pwa/seeker/favorites')
      break
    case 'profile':
      navigateTo('/pwa/shared/profile')
      break
  }
}

// Redirect if no job data provided
onMounted(() => {
  if (!route.query.title || !route.query.description) {
    navigateTo('/pwa/jobs/create/category')
  }
})
</script>

<style scoped>
/* Mobile First Design for Job Preview */
.job-preview-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  position: relative;
}

.job-preview-container::before {
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

/* Preview Header */
.preview-header {
  background: white;
  border-radius: 20px;
  padding: 2rem 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  text-align: center;
}

.preview-title {
  color: #474747;
  font-size: 1.75rem;
  font-weight: 600;
  margin: 0 0 0.75rem 0;
}

.preview-subtitle {
  color: #6b7280;
  font-size: 1rem;
  margin: 0;
  line-height: 1.5;
}

/* Job Card */
.job-card {
  background: white;
  border-radius: 20px;
  padding: 2rem 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

/* Category Section */
.category-section {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #f3f4f6;
}

.category-icon-display {
  width: 3rem;
  height: 3rem;
  background: #BECDA3;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.category-icon {
  width: 1.5rem;
  height: 1.5rem;
  color: #5F6F55;
}

.category-name {
  color: #5F6F55;
  font-size: 1.125rem;
  font-weight: 600;
}

/* Job Title */
.job-title {
  color: #474747;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 1.5rem 0;
  line-height: 1.4;
}

/* Description Section */
.description-section {
  margin-bottom: 2rem;
}

.section-label {
  color: #474747;
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.75rem 0;
}

.job-description {
  color: #6b7280;
  font-size: 1rem;
  line-height: 1.6;
  margin: 0;
  background: rgba(248, 250, 252, 0.8);
  padding: 1rem;
  border-radius: 12px;
  border-left: 4px solid #BECDA3;
}

/* Details Grid */
.details-grid {
  display: grid;
  gap: 1.25rem;
  margin-bottom: 2rem;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: rgba(248, 250, 252, 0.6);
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.detail-item.price-highlight {
  background: rgba(95, 111, 85, 0.1);
  border-color: rgba(95, 111, 85, 0.2);
}

.detail-icon {
  width: 2.5rem;
  height: 2.5rem;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.detail-icon svg {
  width: 1.25rem;
  height: 1.25rem;
  color: #5F6F55;
}

.detail-content {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex: 1;
}

.detail-label {
  color: #6b7280;
  font-size: 0.875rem;
  font-weight: 500;
}

.detail-value {
  color: #474747;
  font-size: 1rem;
  font-weight: 600;
}

.price-value {
  color: #5F6F55;
  font-size: 1.25rem;
}

/* Helper Estimate */
.helper-estimate {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem;
  background: linear-gradient(135deg, rgba(95, 111, 85, 0.1), rgba(190, 205, 163, 0.1));
  border-radius: 16px;
  border: 1px solid rgba(95, 111, 85, 0.2);
  margin-bottom: 1rem;
}

.estimate-icon {
  width: 2.5rem;
  height: 2.5rem;
  background: #5F6F55;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.estimate-icon svg {
  width: 1.25rem;
  height: 1.25rem;
  color: white;
}

.estimate-content {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex: 1;
}

.estimate-count {
  color: #5F6F55;
  font-size: 1.25rem;
  font-weight: 700;
}

.estimate-description {
  color: #6b7280;
  font-size: 0.875rem;
  font-weight: 500;
}

/* Action Buttons */
.action-buttons {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.back-btn, .create-btn {
  flex: 1;
  border: none;
  border-radius: 16px;
  padding: 1.25rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  min-height: 3.5rem;
}

.back-btn {
  background: rgba(95, 111, 85, 0.1);
  color: #5F6F55;
  border: 1px solid rgba(95, 111, 85, 0.2);
}

.back-btn:hover {
  background: rgba(95, 111, 85, 0.2);
  transform: translateY(-1px);
}

.create-btn {
  background: #5F6F55;
  color: white;
}

.create-btn:hover:not(.creating) {
  background: #4a5c44;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(95, 111, 85, 0.3);
}

.create-btn.creating {
  opacity: 0.8;
  cursor: not-allowed;
}

.btn-icon {
  width: 1.25rem;
  height: 1.25rem;
}

.spinning {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Info Notice */
.info-notice {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.25rem;
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 16px;
}

.info-icon {
  width: 1.5rem;
  height: 1.5rem;
  color: #3b82f6;
  flex-shrink: 0;
  margin-top: 0.125rem;
}

.info-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
}

.info-title {
  color: #3b82f6;
  font-size: 1rem;
  font-weight: 600;
}

.info-description {
  color: #6b7280;
  font-size: 0.875rem;
  line-height: 1.5;
}

/* Tablet Optimizations */
@media (min-width: 768px) {
  .mobile-container {
    padding: 2rem;
    max-width: 768px;
    margin: 0 auto;
  }
  
  .preview-header {
    padding: 3rem 2rem;
  }
  
  .job-card {
    padding: 3rem 2rem;
  }
  
  .details-grid {
    grid-template-columns: 1fr 1fr;
  }
  
  .action-buttons {
    justify-content: center;
    max-width: 400px;
    margin: 0 auto 1.5rem auto;
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
  .spinning {
    animation: none;
  }
  
  .back-btn:hover,
  .create-btn:hover:not(.creating) {
    transform: none;
  }
}
</style>