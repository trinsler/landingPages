<template>
  <div class="job-edit-container">
    <!-- Header Component -->
    <AppHeader 
      title="Job bearbeiten"
      current-role="unified"
      :request-count="0"
      @open-requests="() => navigateTo('/pwa')"
      @open-profile="() => navigateTo('/pwa/shared/profile')"
      @open-news="() => navigateTo('/pwa/shared/news')"
      @toggle-role="() => navigateTo('/pwa')"
    />
    
    <div v-if="job && formData" class="mobile-container">
      
      <!-- Category Header -->
      <div class="category-header">
        <div class="category-icon-display">
          <img :src="job.categoryIcon" :alt="job.category" class="category-icon">
        </div>
        <h2 class="category-title">{{ getCategoryName(job.category) }}</h2>
        <p class="edit-notice">Sie können diesen Job bearbeiten, solange noch kein Helfer angenommen wurde.</p>
      </div>

      <!-- Job Title -->
      <div class="form-section">
        <h3 class="section-title">Titel des Auftrags *</h3>
        <input 
          v-model="formData.title"
          type="text"
          class="form-input"
          placeholder="z.B. 'Einkaufen bei REWE'"
          maxlength="100"
          required
          @input="validateForm"
        />
        <div class="char-counter">{{ formData.title.length }}/100</div>
        <p class="form-help">Geben Sie eine kurze, präzise Beschreibung Ihres Auftrags</p>
      </div>

      <!-- Job Description -->
      <div class="form-section">
        <h3 class="section-title">Beschreibung *</h3>
        <textarea 
          v-model="formData.description"
          class="form-textarea"
          placeholder="Beschreiben Sie genau, was Sie benötigen..."
          maxlength="1000"
          rows="6"
          required
          @input="validateForm"
        ></textarea>
        <div class="char-counter">{{ formData.description.length }}/1000</div>
        <p class="form-help">Je detaillierter die Beschreibung, desto passender die Helfer</p>
      </div>

      <!-- Timing Selection -->
      <div class="form-section">
        <h3 class="section-title">Zeitpunkt *</h3>
        <div class="timing-options">
          <label class="timing-option" :class="{ 'timing-selected': formData.isImmediate }">
            <input 
              type="radio" 
              name="timing" 
              :value="true" 
              v-model="formData.isImmediate"
              @change="validateForm"
              class="timing-radio"
            />
            <div class="timing-content">
              <svg class="timing-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
              <div>
                <span class="timing-title">Sofort</span>
                <p class="timing-description">Der Auftrag kann sofort begonnen werden</p>
              </div>
            </div>
          </label>
          
          <label class="timing-option" :class="{ 'timing-selected': !formData.isImmediate }">
            <input 
              type="radio" 
              name="timing" 
              :value="false" 
              v-model="formData.isImmediate"
              @change="validateForm"
              class="timing-radio"
            />
            <div class="timing-content">
              <svg class="timing-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
              <div>
                <span class="timing-title">Geplant</span>
                <p class="timing-description">Bestimmtes Datum und Uhrzeit</p>
              </div>
            </div>
          </label>
        </div>

        <!-- Scheduled Date/Time Picker -->
        <div v-if="!formData.isImmediate" class="scheduled-datetime">
          <div class="datetime-row">
            <div class="datetime-field">
              <label class="form-label">Datum *</label>
              <input 
                v-model="formData.scheduledDate"
                type="date"
                class="form-input"
                :min="minDate"
                required
                @change="validateForm"
              />
            </div>
            <div class="datetime-field">
              <label class="form-label">Uhrzeit *</label>
              <input 
                v-model="formData.scheduledTime"
                type="time"
                class="form-input"
                required
                @change="validateForm"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Duration Slider -->
      <div class="form-section">
        <h3 class="section-title">Geschätzte Dauer *</h3>
        <div class="slider-section">
          <div class="slider-display">
            <span class="slider-value">{{ formData.duration }} {{ formData.duration === 1 ? 'Stunde' : 'Stunden' }}</span>
            <span class="slider-label">Voraussichtliche Arbeitszeit</span>
          </div>
          <input 
            type="range"
            v-model="formData.duration"
            min="0.5"
            max="8"
            step="0.5"
            class="duration-slider"
            @input="calculatePrice"
          />
          <div class="slider-markers">
            <span class="marker">30 Min</span>
            <span class="marker">8 Std</span>
          </div>
        </div>
        <p class="form-help">Schätzen Sie realistisch - Helfer planen ihre Zeit danach</p>
      </div>

      <!-- Price Input -->
      <div class="form-section">
        <h3 class="section-title">Preis *</h3>
        <div class="price-section">
          <div class="price-input-container">
            <input 
              v-model="formData.price"
              type="number"
              class="price-input"
              placeholder="20"
              min="5"
              max="200"
              step="1"
              required
              @input="validateForm"
            />
            <span class="price-currency">€</span>
          </div>
          <div class="price-suggestion">
            <span class="suggestion-label">Vorschlag:</span>
            <span class="suggestion-value">{{ suggestedPrice }}€</span>
            <button @click="useSuggestedPrice" class="use-suggestion-btn">Übernehmen</button>
          </div>
        </div>
        <p class="form-help">Basierend auf {{ hourlyRate }}€/Stunde. Fairer Preis = bessere Helfer</p>
      </div>

      <!-- Radius Slider -->
      <div class="form-section">
        <h3 class="section-title">Suchradius</h3>
        <div class="slider-section">
          <div class="slider-display">
            <span class="slider-value">{{ formData.radius }} km</span>
            <span class="slider-label">Maximale Entfernung der Helfer</span>
          </div>
          <input 
            type="range"
            v-model="formData.radius"
            min="1"
            max="20"
            step="1"
            class="radius-slider"
          />
          <div class="slider-markers">
            <span class="marker">1 km</span>
            <span class="marker">20 km</span>
          </div>
        </div>
        <p class="form-help">Größerer Radius = mehr verfügbare Helfer</p>
      </div>

      <!-- Changes Notice -->
      <div v-if="hasApplications" class="changes-notice">
        <svg class="notice-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <div class="notice-content">
          <h4 class="notice-title">Hinweis zu Änderungen</h4>
          <p class="notice-text">Dieser Job hat bereits {{ applicationsCount }} Bewerbung{{ applicationsCount > 1 ? 'en' : '' }}. Alle Bewerber werden über Ihre Änderungen benachrichtigt.</p>
        </div>
      </div>

      <!-- Submit Section -->
      <div class="submit-section">
        <button 
          @click="saveChanges"
          :disabled="!isFormValid || !hasChanges"
          class="save-btn"
          :class="{ 'save-disabled': !isFormValid || !hasChanges }"
        >
          <svg v-if="isSaving" class="btn-icon spinning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
          </svg>
          <svg v-else class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
          </svg>
          {{ isSaving ? 'Speichere...' : 'Änderungen speichern' }}
        </button>
        
        <button @click="cancelEdit" class="cancel-btn">
          <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
          Abbrechen
        </button>
        
        <div v-if="!hasChanges" class="no-changes-notice">
          Keine Änderungen vorgenommen
        </div>
      </div>

    </div>

    <!-- Loading state -->
    <div v-else class="loading-container">
      <div class="loading-spinner"></div>
      <p class="loading-text">Job wird geladen...</p>
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
import { ref, computed, onMounted, watch } from 'vue'
import AppHeader from '~/components/AppHeader.vue'
import UnifiedFooter from '~/components/pwa/unified/UnifiedFooter.vue'

definePageMeta({
  layout: false
})

// Get job ID from route
const route = useRoute()
const jobId = route.params.jobId

// Job data and form state
const job = ref(null)
const formData = ref(null)
const originalData = ref(null)

// UI state
const isSaving = ref(false)
const isFormValid = ref(false)

// Constants
const hourlyRate = ref(12)
const minDate = ref('')

// Mock job data (from detail page)
const mockJobs = {
  '1': {
    id: 1,
    title: 'Einkaufen bei REWE',
    category: 'shopping',
    categoryIcon: '/icons/einkaufenMadl.svg',
    status: 'applications_received',
    price: 25,
    duration: 2,
    radius: 5,
    isImmediate: true,
    scheduledDate: '',
    scheduledTime: '',
    createdAt: new Date().toISOString(),
    description: 'Ich brauche jemanden, der für mich bei REWE einkauft. Die Einkaufsliste ist fertig (ca. 15 Artikel). Bezahlung erfolgt über die App. Einkauf soll heute Nachmittag stattfinden.',
    applicationsCount: 3
  }
}

// Computed properties
const suggestedPrice = computed(() => {
  return Math.round(formData.value?.duration * hourlyRate.value) || 0
})

const hasApplications = computed(() => {
  return job.value?.status === 'applications_received'
})

const applicationsCount = computed(() => {
  return job.value?.applicationsCount || 0
})

const hasChanges = computed(() => {
  if (!formData.value || !originalData.value) return false
  
  return JSON.stringify(formData.value) !== JSON.stringify(originalData.value)
})

// Methods
const getCategoryName = (category) => {
  const categoryNames = {
    'shopping': 'Einkaufen',
    'gardening': 'Gartenarbeit',
    'cooking': 'Kochen',
    'cleaning': 'Putzen',
    'companionship': 'Gesellschaft',
    'childcare': 'Kinderbetreuung',
    'transportation': 'Fahrdienst',
    'other': 'Sonstiges'
  }
  return categoryNames[category] || category
}

const calculatePrice = () => {
  // Auto-suggest price based on duration
  if (formData.value) {
    formData.value.price = suggestedPrice.value
    validateForm()
  }
}

const useSuggestedPrice = () => {
  if (formData.value) {
    formData.value.price = suggestedPrice.value
    validateForm()
  }
}

const validateForm = () => {
  if (!formData.value) return
  
  const isValid = 
    formData.value.title.trim().length >= 5 && 
    formData.value.description.trim().length >= 20 &&
    formData.value.price >= 5 &&
    formData.value.price <= 200 &&
    (formData.value.isImmediate || (formData.value.scheduledDate && formData.value.scheduledTime))
  
  isFormValid.value = isValid
}

const saveChanges = async () => {
  if (!isFormValid.value || !hasChanges.value) return
  
  isSaving.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    console.log('Saving job changes:', formData.value)
    
    // Show success message based on applications
    const message = hasApplications.value 
      ? `Job aktualisiert! ${applicationsCount.value} Bewerber wurden über die Änderungen benachrichtigt.`
      : 'Job erfolgreich aktualisiert!'
    
    alert(message)
    
    // Navigate back to job detail
    navigateTo(`/pwa/jobs/detail/${jobId}`)
    
  } catch (error) {
    console.error('Error saving job:', error)
    alert('Fehler beim Speichern. Bitte versuchen Sie es erneut.')
  } finally {
    isSaving.value = false
  }
}

const cancelEdit = () => {
  if (hasChanges.value) {
    if (confirm('Möchten Sie wirklich abbrechen? Ungespeicherte Änderungen gehen verloren.')) {
      navigateTo(`/pwa/jobs/detail/${jobId}`)
    }
  } else {
    navigateTo(`/pwa/jobs/detail/${jobId}`)
  }
}

// Footer navigation
const handleFooterNavigation = (tab) => {
  if (hasChanges.value) {
    if (!confirm('Ungespeicherte Änderungen gehen verloren. Trotzdem fortfahren?')) {
      return
    }
  }
  
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

// Initialize component
onMounted(() => {
  // Set minimum date to today
  const today = new Date()
  minDate.value = today.toISOString().split('T')[0]
  
  // Load job data
  job.value = mockJobs[jobId] || null
  
  if (!job.value) {
    alert('Job nicht gefunden')
    navigateTo('/pwa/jobs/my-jobs')
    return
  }
  
  // Check if job can be edited
  if (job.value.status !== 'open' && job.value.status !== 'applications_received') {
    alert('Dieser Job kann nicht mehr bearbeitet werden.')
    navigateTo(`/pwa/jobs/detail/${jobId}`)
    return
  }
  
  // Initialize form data
  formData.value = {
    title: job.value.title,
    description: job.value.description,
    isImmediate: job.value.isImmediate,
    scheduledDate: job.value.scheduledDate,
    scheduledTime: job.value.scheduledTime,
    duration: job.value.duration,
    price: job.value.price,
    radius: job.value.radius
  }
  
  // Store original data for comparison
  originalData.value = JSON.parse(JSON.stringify(formData.value))
  
  // Initial validation
  validateForm()
})

// Watch for form changes to trigger validation
watch(formData, () => {
  validateForm()
}, { deep: true })
</script>

<style scoped>
/* Mobile First Design - Reuse styles from job creation */
.job-edit-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  position: relative;
}

.job-edit-container::before {
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

/* Loading State */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  padding: 2rem;
}

.loading-spinner {
  width: 3rem;
  height: 3rem;
  border: 3px solid rgba(95, 111, 85, 0.1);
  border-top: 3px solid #5F6F55;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.loading-text {
  color: #6b7280;
  font-size: 1rem;
  margin: 0;
}

/* Category Header */
.category-header {
  background: white;
  border-radius: 20px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  text-align: center;
}

.category-icon-display {
  width: 3rem;
  height: 3rem;
  background: #BECDA3;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem auto;
}

.category-icon {
  width: 1.5rem;
  height: 1.5rem;
}

.category-title {
  color: #474747;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
}

.edit-notice {
  color: #6b7280;
  font-size: 0.875rem;
  margin: 0;
  line-height: 1.5;
}

/* Form Sections - Reuse from job creation */
.form-section {
  background: white;
  border-radius: 20px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.section-title {
  color: #474747;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
}

.form-input {
  width: 100%;
  padding: 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 1rem;
  font-family: inherit;
  transition: border-color 0.2s ease;
  background: white;
}

.form-input:focus {
  outline: none;
  border-color: #5F6F55;
  box-shadow: 0 0 0 3px rgba(95, 111, 85, 0.1);
}

.form-textarea {
  width: 100%;
  padding: 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 1rem;
  font-family: inherit;
  resize: vertical;
  min-height: 120px;
  line-height: 1.6;
  transition: border-color 0.2s ease;
}

.form-textarea:focus {
  outline: none;
  border-color: #5F6F55;
  box-shadow: 0 0 0 3px rgba(95, 111, 85, 0.1);
}

.char-counter {
  color: #6b7280;
  font-size: 0.875rem;
  text-align: right;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

.form-help {
  color: #6b7280;
  font-size: 0.875rem;
  margin: 0.5rem 0 0 0;
  line-height: 1.4;
}

/* Timing Options */
.timing-options {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;
}

.timing-option {
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.timing-option:hover {
  border-color: #BECDA3;
}

.timing-option.timing-selected {
  border-color: #5F6F55;
  background: rgba(95, 111, 85, 0.05);
}

.timing-radio {
  display: none;
}

.timing-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.timing-icon {
  width: 1.5rem;
  height: 1.5rem;
  color: #5F6F55;
  flex-shrink: 0;
}

.timing-title {
  font-size: 1rem;
  font-weight: 600;
  color: #474747;
  display: block;
  margin-bottom: 0.25rem;
}

.timing-description {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
}

/* Scheduled DateTime */
.scheduled-datetime {
  margin-top: 1rem;
}

.datetime-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.datetime-field {
  display: flex;
  flex-direction: column;
}

.form-label {
  color: #474747;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

/* Slider Sections */
.slider-section {
  background: rgba(248, 250, 252, 0.8);
  border-radius: 12px;
  padding: 1rem;
  margin-bottom: 1rem;
}

.slider-display {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.slider-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #5F6F55;
}

.slider-label {
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 500;
}

.duration-slider,
.radius-slider {
  width: 100%;
  height: 8px;
  background: rgba(95, 111, 85, 0.1);
  border-radius: 4px;
  outline: none;
  -webkit-appearance: none;
  margin-bottom: 0.5rem;
}

.duration-slider::-webkit-slider-thumb,
.radius-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 20px;
  height: 20px;
  background: #5F6F55;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0,0,0,0.2);
}

.slider-markers {
  display: flex;
  justify-content: space-between;
}

.marker {
  font-size: 0.75rem;
  color: #9ca3af;
}

/* Price Section */
.price-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.price-input-container {
  position: relative;
  display: flex;
  align-items: center;
}

.price-input {
  width: 100%;
  padding: 1rem 3rem 1rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 1.25rem;
  font-weight: 600;
  font-family: inherit;
  transition: border-color 0.2s ease;
  background: white;
}

.price-input:focus {
  outline: none;
  border-color: #5F6F55;
  box-shadow: 0 0 0 3px rgba(95, 111, 85, 0.1);
}

.price-currency {
  position: absolute;
  right: 1rem;
  font-size: 1.25rem;
  font-weight: 600;
  color: #6b7280;
}

.price-suggestion {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: rgba(95, 111, 85, 0.1);
  border-radius: 12px;
}

.suggestion-label {
  font-size: 0.875rem;
  color: #6b7280;
}

.suggestion-value {
  font-size: 1rem;
  font-weight: 600;
  color: #5F6F55;
}

.use-suggestion-btn {
  background: #5F6F55;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.use-suggestion-btn:hover {
  background: #4a5c44;
}

/* Changes Notice */
.changes-notice {
  background: white;
  border-radius: 20px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  display: flex;
  gap: 1rem;
  border: 1px solid rgba(249, 115, 22, 0.2);
  background: rgba(249, 115, 22, 0.05);
}

.notice-icon {
  width: 1.5rem;
  height: 1.5rem;
  color: #f97316;
  flex-shrink: 0;
  margin-top: 0.25rem;
}

.notice-content {
  flex: 1;
}

.notice-title {
  color: #474747;
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
}

.notice-text {
  color: #6b7280;
  font-size: 0.875rem;
  margin: 0;
  line-height: 1.5;
}

/* Submit Section */
.submit-section {
  background: white;
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.save-btn {
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

.save-btn:hover:not(.save-disabled) {
  background: #4a5c44;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(95, 111, 85, 0.3);
}

.save-btn.save-disabled {
  background: #d1d5db;
  cursor: not-allowed;
  opacity: 0.6;
}

.cancel-btn {
  background: rgba(107, 114, 128, 0.1);
  color: #6b7280;
  border: 1px solid rgba(107, 114, 128, 0.2);
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

.cancel-btn:hover {
  background: rgba(107, 114, 128, 0.2);
  transform: translateY(-1px);
}

.btn-icon {
  width: 1.25rem;
  height: 1.25rem;
}

.spinning {
  animation: spin 1s linear infinite;
}

.no-changes-notice {
  text-align: center;
  color: #6b7280;
  font-size: 0.875rem;
  font-style: italic;
  padding: 0.75rem;
  background: rgba(107, 114, 128, 0.05);
  border-radius: 12px;
}

/* Tablet Optimizations */
@media (min-width: 768px) {
  .mobile-container {
    padding: 2rem;
    max-width: 768px;
    margin: 0 auto;
  }
  
  .timing-options {
    flex-direction: row;
  }
  
  .price-section {
    flex-direction: row;
    align-items: center;
  }
  
  .price-input-container {
    flex: 1;
  }
  
  .submit-section {
    flex-direction: row;
  }
  
  .save-btn {
    flex: 2;
    font-size: 1rem;
    min-height: auto;
    padding: 1rem 2rem;
  }
  
  .cancel-btn {
    flex: 1;
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
  .spinning {
    animation: none;
  }
  
  .save-btn:hover:not(.save-disabled),
  .cancel-btn:hover {
    transform: none;
  }
}
</style>