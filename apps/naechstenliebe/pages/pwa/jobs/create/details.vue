<template>
  <div class="job-details-container">
    <!-- Header Component -->
    <AppHeader 
      title="Job erstellen"
      current-role="unified"
      :request-count="0"
      @open-requests="() => navigateTo('/pwa')"
      @open-profile="() => navigateTo('/pwa/shared/profile')"
      @open-news="() => navigateTo('/pwa/shared/news')"
      @toggle-role="() => navigateTo('/pwa')"
    />
    
    <div class="mobile-container">
      
      <!-- Category Header -->
      <div class="category-header">
        <div class="category-icon-display">
          <svg class="category-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path v-if="selectedCategoryIcon === 'shopping'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5L17 18"/>
            <circle v-if="selectedCategoryIcon === 'shopping'" cx="9" cy="20" r="1"/>
            <circle v-if="selectedCategoryIcon === 'shopping'" cx="20" cy="20" r="1"/>
            <path v-if="selectedCategoryIcon === 'gardening'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            <path v-if="selectedCategoryIcon === 'gardening'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.5 9a2.5 2.5 0 005 0"/>
            <path v-if="selectedCategoryIcon === 'gardening'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11.5v3"/>
            <path v-if="selectedCategoryIcon === 'cooking'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
            <path v-if="selectedCategoryIcon === 'cooking'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 2v1m6-1v1"/>
            <path v-if="selectedCategoryIcon === 'cleaning'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
            <path v-if="selectedCategoryIcon === 'companionship' || selectedCategoryIcon === 'childcare'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            <path v-if="selectedCategoryIcon === 'companionship' || selectedCategoryIcon === 'childcare'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16s1.5-2 4-2 4 2 4 2"/>
            <path v-if="selectedCategoryIcon === 'transportation'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM21 17a2 2 0 11-4 0 2 2 0 014 0z"/>
            <path v-if="selectedCategoryIcon === 'transportation'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17h10M7 17H3m4 0v-5a1 1 0 011-1h9a1 1 0 011 1v5m0 0h4m-4 0H7m14 0v2a1 1 0 01-1 1h-1a1 1 0 01-1-1v-2M7 17v2a1 1 0 01-1 1H5a1 1 0 01-1-1v-2"/>
            <path v-if="selectedCategoryIcon === 'transportation'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 6l6 6-6 6"/>
            <path v-if="selectedCategoryIcon === 'other'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
          </svg>
        </div>
        <h2 class="category-title">{{ selectedCategoryName }}</h2>
        <button @click="goBackToCategory" class="change-category-btn">
          <svg class="btn-icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 17l-5-5m0 0l5-5m-5 5h12"/>
          </svg>
          Kategorie ändern
        </button>
      </div>

      <!-- Job Title -->
      <div class="form-section">
        <h3 class="section-title">Titel des Auftrags *</h3>
        <input 
          v-model="jobData.title"
          type="text"
          class="form-input"
          placeholder="z.B. 'Einkaufen bei REWE'"
          maxlength="100"
          required
          @input="validateForm"
        />
        <div class="char-counter">{{ jobData.title.length }}/100</div>
        <p class="form-help">Geben Sie eine kurze, präzise Beschreibung Ihres Auftrags</p>
      </div>

      <!-- Job Description -->
      <div class="form-section">
        <h3 class="section-title">Beschreibung *</h3>
        <textarea 
          v-model="jobData.description"
          class="form-textarea"
          placeholder="Beschreiben Sie genau, was Sie benötigen. Je detaillierter, desto besser können Helfer Ihnen assistieren.

Beispiel: 'Ich brauche jemanden, der für mich bei REWE einkauft. Die Einkaufsliste ist fertig (ca. 15 Artikel). Bezahlung erfolgt über die App. Einkauf soll heute Nachmittag oder morgen Vormittag stattfinden.'"
          maxlength="1000"
          rows="6"
          required
          @input="validateForm"
        ></textarea>
        <div class="char-counter">{{ jobData.description.length }}/1000</div>
        <p class="form-help">Je detaillierter die Beschreibung, desto passender die Helfer</p>
      </div>

      <!-- Timing Selection -->
      <div class="form-section">
        <h3 class="section-title">Zeitpunkt *</h3>
        <div class="timing-options">
          <label class="timing-option" :class="{ 'timing-selected': jobData.isImmediate }">
            <input 
              type="radio" 
              name="timing" 
              :value="true" 
              v-model="jobData.isImmediate"
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
          
          <label class="timing-option" :class="{ 'timing-selected': !jobData.isImmediate }">
            <input 
              type="radio" 
              name="timing" 
              :value="false" 
              v-model="jobData.isImmediate"
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
        <div v-if="!jobData.isImmediate" class="scheduled-datetime">
          <div class="datetime-row">
            <div class="datetime-field">
              <label class="form-label">Datum *</label>
              <input 
                v-model="jobData.scheduledDate"
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
                v-model="jobData.scheduledTime"
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
            <span class="slider-value">{{ jobData.duration }} {{ jobData.duration === 1 ? 'Stunde' : 'Stunden' }}</span>
            <span class="slider-label">Voraussichtliche Arbeitszeit</span>
          </div>
          <input 
            type="range"
            v-model="jobData.duration"
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
              v-model="jobData.price"
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
            <span class="slider-value">{{ jobData.radius }} km</span>
            <span class="slider-label">Maximale Entfernung der Helfer</span>
          </div>
          <input 
            type="range"
            v-model="jobData.radius"
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

      <!-- Submit Section -->
      <div class="submit-section">
        <button 
          @click="createJob"
          :disabled="!isFormValid"
          class="create-job-btn"
          :class="{ 'create-disabled': !isFormValid }"
        >
          <svg v-if="isCreating" class="btn-icon spinning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
          </svg>
          <svg v-else class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
          </svg>
          {{ isCreating ? 'Wird geladen...' : 'Zur Vorschau' }}
        </button>
        
        <div class="submit-info">
          <svg class="info-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <span class="info-text">Überprüfen Sie Ihren Job vor der Veröffentlichung</span>
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

// Get category from route query
const route = useRoute()
const selectedCategoryId = ref(route.query.category || 'shopping')
const customCategoryName = ref(route.query.customName || '')

// Selected category display data
const selectedCategoryName = ref('')
const selectedCategoryIcon = ref('')

// Form state
const isCreating = ref(false)
const isFormValid = ref(false)

// Job data
const jobData = ref({
  title: '',
  description: '',
  isImmediate: true,
  scheduledDate: '',
  scheduledTime: '',
  duration: 2, // hours
  price: 20, // EUR
  radius: 5 // km
})

// Constants
const hourlyRate = ref(12) // EUR per hour
const minDate = ref('')

// Computed properties
const suggestedPrice = computed(() => {
  return Math.round(jobData.value.duration * hourlyRate.value)
})

// Category mapping
const categoryMapping = {
  'shopping': { name: 'Einkaufen', icon: 'shopping' },
  'gardening': { name: 'Gartenarbeit', icon: 'gardening' },
  'cooking': { name: 'Kochen', icon: 'cooking' },
  'cleaning': { name: 'Putzen', icon: 'cleaning' },
  'companionship': { name: 'Gesellschaft', icon: 'companionship' },
  'childcare': { name: 'Kinderbetreuung', icon: 'childcare' },
  'transportation': { name: 'Fahrdienst', icon: 'transportation' },
  'other': { name: 'Sonstiges', icon: 'other' }
}

// Methods
const initializeCategory = () => {
  if (selectedCategoryId.value === 'other' && customCategoryName.value) {
    selectedCategoryName.value = customCategoryName.value
    selectedCategoryIcon.value = 'other'
  } else {
    const category = categoryMapping[selectedCategoryId.value] || categoryMapping['shopping']
    selectedCategoryName.value = category.name
    selectedCategoryIcon.value = category.icon
  }
}

const calculatePrice = () => {
  // Auto-suggest price based on duration
  jobData.value.price = suggestedPrice.value
  validateForm()
}

const useSuggestedPrice = () => {
  jobData.value.price = suggestedPrice.value
  validateForm()
}

const validateForm = () => {
  const isValid = 
    jobData.value.title.trim().length >= 5 && 
    jobData.value.description.trim().length >= 20 &&
    jobData.value.price >= 5 &&
    jobData.value.price <= 200 &&
    (jobData.value.isImmediate || (jobData.value.scheduledDate && jobData.value.scheduledTime))
  
  isFormValid.value = isValid
}

const goBackToCategory = () => {
  navigateTo('/pwa/jobs/create/category')
}

const createJob = async () => {
  if (!isFormValid.value) return
  
  // Navigate to preview page with all job data
  navigateTo({
    path: '/pwa/jobs/create/preview',
    query: {
      category: selectedCategoryId.value,
      categoryName: selectedCategoryName.value,
      categoryIcon: selectedCategoryIcon.value,
      title: jobData.value.title.trim(),
      description: jobData.value.description.trim(),
      isImmediate: jobData.value.isImmediate,
      scheduledDate: jobData.value.scheduledDate,
      scheduledTime: jobData.value.scheduledTime,
      duration: jobData.value.duration,
      price: jobData.value.price,
      radius: jobData.value.radius
    }
  })
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

// Initialize component
onMounted(() => {
  // Set minimum date to today
  const today = new Date()
  minDate.value = today.toISOString().split('T')[0]
  
  // Initialize category
  initializeCategory()
  
  // Set suggested price initially
  calculatePrice()
  
  // Initial validation
  validateForm()
})
</script>

<style scoped>
/* Mobile First Design for Job Details */
.job-details-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  position: relative;
}

.job-details-container::before {
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
  color: #5F6F55;
}

.category-title {
  color: #474747;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
}

.change-category-btn {
  background: rgba(95, 111, 85, 0.1);
  color: #5F6F55;
  border: 1px solid rgba(95, 111, 85, 0.2);
  border-radius: 12px;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin: 0 auto;
}

.change-category-btn:hover {
  background: rgba(95, 111, 85, 0.2);
}

.btn-icon-sm {
  width: 1rem;
  height: 1rem;
}

/* Form Sections */
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

/* Submit Section */
.submit-section {
  background: white;
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  text-align: center;
}

.create-job-btn {
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
  margin: 0 auto 1rem auto;
  min-height: 3.5rem;
  width: 100%;
}

.create-job-btn:hover:not(.create-disabled) {
  background: #4a5c44;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(95, 111, 85, 0.3);
}

.create-job-btn.create-disabled {
  background: #d1d5db;
  cursor: not-allowed;
  opacity: 0.6;
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

.submit-info {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  color: #6b7280;
  font-size: 0.875rem;
}

.info-icon {
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
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
  
  .create-job-btn {
    width: auto;
    min-width: 200px;
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
  
  .create-job-btn:hover:not(.create-disabled) {
    transform: none;
  }
}
</style>