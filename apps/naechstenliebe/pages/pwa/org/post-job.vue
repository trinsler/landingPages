<template>
  <div class="post-job-container">
    <!-- Header -->
    <AppHeader 
      title="Job für Organisation posten" 
      current-role="unified"
      :request-count="0"
      :show-back="true"
      @back="handleBack"
      @open-profile="() => navigateTo('/pwa/shared/profile')"
    />

    <div class="content-container">
      
      <!-- Access Denied State -->
      <div v-if="!isOrganizationAdmin" class="access-denied">
        <div class="access-denied-icon">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 0h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
          </svg>
        </div>
        <h3>Zugriff verweigert</h3>
        <p>Du musst Administrator einer verifizierten Organisation sein, um Jobs zu posten.</p>
        <button @click="navigateTo('/pwa/org/create')" class="btn-create-org">
          Organisation erstellen
        </button>
      </div>

      <!-- Job Posting Form -->
      <div v-else class="job-form-section">
        
        <!-- Organization Info -->
        <div class="org-info-card">
          <div class="org-header">
            <div class="org-logo">
              <img v-if="currentUserOrganization.logo_url" :src="currentUserOrganization.logo_url" alt="Logo">
              <div v-else class="org-logo-placeholder">
                {{ currentUserOrganization.name.charAt(0) }}
              </div>
            </div>
            <div class="org-details">
              <h3 class="org-name">{{ currentUserOrganization.name }}</h3>
              <div class="org-type">{{ getTypeLabel(currentUserOrganization.type) }}</div>
            </div>
          </div>
          <div class="posting-as">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
            Job wird im Namen der Organisation gepostet
          </div>
        </div>

        <!-- Form -->
        <form @submit.prevent="submitJob" class="job-form">
          
          <!-- Job Title -->
          <div class="form-group">
            <label for="title" class="form-label">Job-Titel *</label>
            <input 
              id="title"
              v-model="formData.title"
              type="text"
              class="form-input"
              placeholder="z.B. Einkaufshilfe für Senioren"
              required
              maxlength="100"
            >
            <div class="field-help">Geben Sie einen kurzen, aussagekräftigen Titel an</div>
          </div>

          <!-- Job Description -->
          <div class="form-group">
            <label for="description" class="form-label">Beschreibung *</label>
            <textarea 
              id="description"
              v-model="formData.description"
              class="form-textarea"
              placeholder="Beschreiben Sie die Aufgabe im Detail..."
              required
              rows="4"
              maxlength="1000"
            ></textarea>
            <div class="field-help">{{ formData.description.length }}/1000 Zeichen</div>
          </div>

          <!-- Payment -->
          <div class="form-group">
            <label for="payment" class="form-label">Bezahlung *</label>
            <div class="payment-input-container">
              <input 
                id="payment"
                v-model.number="formData.payment"
                type="number"
                class="form-input payment-input"
                placeholder="25"
                required
                min="5"
                max="200"
                step="1"
              >
              <span class="payment-currency">€</span>
            </div>
            <div class="field-help">Empfohlener Bereich: 15-50€</div>
          </div>

          <!-- Date & Time -->
          <div class="form-row">
            <div class="form-group">
              <label for="date" class="form-label">Datum *</label>
              <input 
                id="date"
                v-model="formData.date"
                type="date"
                class="form-input"
                required
                :min="minDate"
              >
            </div>
            <div class="form-group">
              <label for="time" class="form-label">Uhrzeit *</label>
              <input 
                id="time"
                v-model="formData.time"
                type="time"
                class="form-input"
                required
              >
            </div>
          </div>

          <!-- Duration -->
          <div class="form-group">
            <label for="duration" class="form-label">Geschätzte Dauer</label>
            <select id="duration" v-model="formData.duration" class="form-select">
              <option value="">Dauer auswählen</option>
              <option value="30">30 Minuten</option>
              <option value="60">1 Stunde</option>
              <option value="90">1,5 Stunden</option>
              <option value="120">2 Stunden</option>
              <option value="180">3 Stunden</option>
              <option value="240">4 Stunden</option>
              <option value="480">Ganzer Tag</option>
            </select>
          </div>

          <!-- Location -->
          <div class="form-group">
            <label for="location" class="form-label">Ort *</label>
            <input 
              id="location"
              v-model="formData.location"
              type="text"
              class="form-input"
              placeholder="z.B. Kirchengemeinde St. Maria, Hauptstraße 123"
              required
              maxlength="200"
            >
            <div class="field-help">Geben Sie den genauen Treffpunkt oder Arbeitsort an</div>
          </div>

          <!-- Category -->
          <div class="form-group">
            <label for="category" class="form-label">Kategorie *</label>
            <select id="category" v-model="formData.category" class="form-select" required>
              <option value="">Kategorie auswählen</option>
              <option value="eldercare">Seniorenbetreuung</option>
              <option value="shopping">Einkaufshilfe</option>
              <option value="transport">Transport & Fahrdienst</option>
              <option value="household">Haushaltshilfe</option>
              <option value="gardening">Garten & Außenbereich</option>
              <option value="childcare">Kinderbetreuung</option>
              <option value="education">Bildung & Unterricht</option>
              <option value="administration">Verwaltung & Büro</option>
              <option value="events">Veranstaltungen</option>
              <option value="maintenance">Reparatur & Wartung</option>
              <option value="other">Sonstiges</option>
            </select>
          </div>

          <!-- Special Requirements -->
          <div class="form-group">
            <label for="requirements" class="form-label">Besondere Anforderungen</label>
            <textarea 
              id="requirements"
              v-model="formData.requirements"
              class="form-textarea"
              placeholder="z.B. Führerschein erforderlich, Erfahrung mit Senioren..."
              rows="2"
              maxlength="500"
            ></textarea>
            <div class="field-help">Optional: Besondere Fähigkeiten oder Anforderungen</div>
          </div>

          <!-- Recurring Job -->
          <div class="form-group">
            <label class="checkbox-label">
              <input 
                v-model="formData.isRecurring"
                type="checkbox"
                class="form-checkbox"
              >
              <span class="checkbox-text">Dies ist ein wiederkehrender Job</span>
            </label>
            <div v-if="formData.isRecurring" class="recurring-options">
              <select v-model="formData.recurringType" class="form-select">
                <option value="weekly">Wöchentlich</option>
                <option value="biweekly">Alle 2 Wochen</option>
                <option value="monthly">Monatlich</option>
              </select>
            </div>
          </div>

          <!-- Contact Preference -->
          <div class="form-group">
            <label class="form-label">Kontakt-Präferenz</label>
            <div class="radio-group">
              <label class="radio-label">
                <input 
                  v-model="formData.contactMethod"
                  type="radio"
                  value="app"
                  class="form-radio"
                >
                <span>Über die App</span>
              </label>
              <label class="radio-label">
                <input 
                  v-model="formData.contactMethod"
                  type="radio"
                  value="phone"
                  class="form-radio"
                >
                <span>Telefonisch</span>
              </label>
              <label class="radio-label">
                <input 
                  v-model="formData.contactMethod"
                  type="radio"
                  value="email"
                  class="form-radio"
                >
                <span>Per E-Mail</span>
              </label>
            </div>
          </div>

          <!-- Submit Section -->
          <div class="form-actions">
            <button type="button" @click="handleBack" class="btn-cancel">
              Abbrechen
            </button>
            <button type="submit" :disabled="isSubmitting" class="btn-submit">
              <span v-if="isSubmitting">Job wird erstellt...</span>
              <span v-else>Job posten ({{ formData.payment }}€)</span>
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
const { currentUserOrganization, isOrganizationAdmin, loadUserOrganization } = useOrganizations()

// Component state
const isSubmitting = ref(false)
const showMessage = ref(false)
const message = ref('')
const messageType = ref('success')

// Form data
const formData = ref({
  title: '',
  description: '',
  payment: 25,
  date: '',
  time: '',
  duration: '',
  location: '',
  category: '',
  requirements: '',
  isRecurring: false,
  recurringType: 'weekly',
  contactMethod: 'app'
})

// Computed properties
const minDate = computed(() => {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  return tomorrow.toISOString().split('T')[0]
})

// Load user's organization on mount
onMounted(async () => {
  await loadUserOrganization('current_user_id')
  
  // Pre-fill location with organization address if available
  if (currentUserOrganization.value?.address) {
    formData.value.location = currentUserOrganization.value.address
  }
  
  // Set default date to tomorrow
  formData.value.date = minDate.value
})

// Methods
const submitJob = async () => {
  if (!validateForm()) return
  
  isSubmitting.value = true
  
  try {
    // Create job object
    const jobData = {
      id: `job_${Date.now()}`,
      title: formData.value.title,
      description: formData.value.description,
      payment: formData.value.payment,
      date: `${formData.value.date}T${formData.value.time}:00.000Z`,
      duration: formData.value.duration ? parseInt(formData.value.duration) : null,
      location: formData.value.location,
      category: formData.value.category,
      requirements: formData.value.requirements || null,
      is_recurring: formData.value.isRecurring,
      recurring_type: formData.value.isRecurring ? formData.value.recurringType : null,
      contact_method: formData.value.contactMethod,
      organization_id: currentUserOrganization.value.id,
      organization_name: currentUserOrganization.value.name,
      posted_by: 'current_user_id', // In real app: get from auth
      status: 'open',
      applications_count: 0,
      created_at: new Date().toISOString()
    }
    
    // Submit job (mock API call)
    await createOrganizationJob(jobData)
    
    showSuccessMessage('Job wurde erfolgreich gepostet! Helfer können sich nun bewerben.')
    
    // Reset form
    resetForm()
    
    // Navigate back after delay
    setTimeout(() => {
      navigateTo('/pwa/org/admin')
    }, 2000)
    
  } catch (error) {
    console.error('Failed to create job:', error)
    showErrorMessage('Fehler beim Erstellen des Jobs. Bitte versuchen Sie es erneut.')
  } finally {
    isSubmitting.value = false
  }
}

const validateForm = () => {
  if (!formData.value.title.trim()) {
    showErrorMessage('Bitte geben Sie einen Job-Titel ein.')
    return false
  }
  
  if (!formData.value.description.trim()) {
    showErrorMessage('Bitte geben Sie eine Beschreibung ein.')
    return false
  }
  
  if (formData.value.payment < 5 || formData.value.payment > 200) {
    showErrorMessage('Die Bezahlung muss zwischen 5€ und 200€ liegen.')
    return false
  }
  
  if (!formData.value.date) {
    showErrorMessage('Bitte wählen Sie ein Datum aus.')
    return false
  }
  
  if (!formData.value.time) {
    showErrorMessage('Bitte wählen Sie eine Uhrzeit aus.')
    return false
  }
  
  if (!formData.value.location.trim()) {
    showErrorMessage('Bitte geben Sie einen Ort an.')
    return false
  }
  
  if (!formData.value.category) {
    showErrorMessage('Bitte wählen Sie eine Kategorie aus.')
    return false
  }
  
  return true
}

const resetForm = () => {
  formData.value = {
    title: '',
    description: '',
    payment: 25,
    date: minDate.value,
    time: '',
    duration: '',
    location: currentUserOrganization.value?.address || '',
    category: '',
    requirements: '',
    isRecurring: false,
    recurringType: 'weekly',
    contactMethod: 'app'
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

const handleBack = () => {
  navigateTo('/pwa/org/admin')
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

// Mock API function
async function createOrganizationJob(jobData) {
  await new Promise(resolve => setTimeout(resolve, 1500))
  console.log('Organization job created:', jobData)
  
  // In real app, this would create the job in the database
  return {
    success: true,
    job: jobData
  }
}
</script>

<style scoped>
.post-job-container {
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

/* Access Denied State */
.access-denied {
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

.access-denied-icon {
  width: 4rem;
  height: 4rem;
  color: #ef4444;
}

.access-denied h3 {
  color: #374151;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
}

.access-denied p {
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

/* Organization Info Card */
.org-info-card {
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
  margin-bottom: 1rem;
}

.org-logo {
  width: 3rem;
  height: 3rem;
  border-radius: 8px;
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
  font-size: 1.25rem;
}

.org-details {
  flex: 1;
}

.org-name {
  color: #374151;
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.25rem 0;
}

.org-type {
  color: #6b7280;
  font-size: 0.875rem;
}

.posting-as {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6b7280;
  font-size: 0.875rem;
  padding: 0.75rem;
  background: #f9fafb;
  border-radius: 8px;
  border-left: 3px solid #BECDA3;
}

.posting-as svg {
  width: 1rem;
  height: 1rem;
}

/* Job Form */
.job-form-section {
  background: white;
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.job-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  color: #374151;
  font-size: 0.875rem;
  font-weight: 600;
}

.form-input,
.form-textarea,
.form-select {
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s ease;
}

.form-input:focus,
.form-textarea:focus,
.form-select:focus {
  outline: none;
  border-color: #5F6F55;
}

.form-textarea {
  resize: vertical;
  min-height: 100px;
}

.payment-input-container {
  position: relative;
  display: flex;
  align-items: center;
}

.payment-input {
  padding-right: 2.5rem;
}

.payment-currency {
  position: absolute;
  right: 0.75rem;
  color: #6b7280;
  font-weight: 600;
}

.field-help {
  color: #6b7280;
  font-size: 0.75rem;
}

/* Checkboxes and Radios */
.checkbox-label,
.radio-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.form-checkbox,
.form-radio {
  width: 1rem;
  height: 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 4px;
  cursor: pointer;
}

.form-radio {
  border-radius: 50%;
}

.checkbox-text {
  color: #374151;
  font-size: 0.875rem;
}

.radio-group {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.recurring-options {
  margin-top: 0.5rem;
}

/* Form Actions */
.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  justify-content: flex-end;
}

.btn-cancel,
.btn-submit {
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

.btn-cancel:hover {
  background: #e5e7eb;
}

.btn-submit {
  background: #5F6F55;
  color: white;
}

.btn-submit:hover:not(:disabled) {
  background: #4a5c44;
}

.btn-submit:disabled {
  background: #d1d5db;
  color: #9ca3af;
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
@media (max-width: 640px) {
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .radio-group {
    flex-direction: column;
  }
  
  .form-actions {
    flex-direction: column;
  }
}

@media (min-width: 768px) {
  .content-container {
    padding: 2rem;
  }
}
</style>