<template>
  <div class="support-contact-container">
    <!-- Header -->
    <AppHeader 
      title="Support kontaktieren" 
      current-role="unified"
      :request-count="0"
      :show-back="true"
      @back="() => navigateTo('/pwa/support/faq')"
      @open-profile="() => navigateTo('/pwa/shared/profile')"
    />

    <div class="content-container">
      
      <!-- Success State -->
      <div v-if="ticketSubmitted" class="success-state">
        <div class="success-icon">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
          </svg>
        </div>
        <h2>Anfrage gesendet!</h2>
        <p>Danke für deine Nachricht. Wir haben deine Anfrage erhalten und melden uns innerhalb von 24 Stunden bei dir.</p>
        
        <div class="ticket-info">
          <h3>Ticket-Details</h3>
          <div class="ticket-details">
            <div class="ticket-item">
              <span class="ticket-label">Ticket-Nummer:</span>
              <span class="ticket-value">#{{ ticketNumber }}</span>
            </div>
            <div class="ticket-item">
              <span class="ticket-label">Betreff:</span>
              <span class="ticket-value">{{ submittedTicket.subject }}</span>
            </div>
            <div class="ticket-item">
              <span class="ticket-label">Status:</span>
              <span class="ticket-value status-open">Offen</span>
            </div>
          </div>
        </div>

        <div class="success-actions">
          <button @click="createNewTicket" class="btn-new-ticket">
            Neue Anfrage senden
          </button>
          <button @click="navigateTo('/pwa')" class="btn-dashboard">
            Zum Dashboard
          </button>
        </div>
      </div>

      <!-- Contact Form -->
      <div v-else class="contact-form-section">
        
        <!-- Introduction -->
        <div class="intro-section">
          <h2>Wir helfen dir gerne!</h2>
          <p>Beschreibe dein Problem oder deine Frage. Unser Support-Team meldet sich innerhalb von 24 Stunden bei dir.</p>
        </div>

        <!-- Quick Help -->
        <div class="quick-help-section">
          <h3>Häufige Probleme</h3>
          <div class="quick-help-grid">
            <button 
              v-for="quickTopic in quickHelpTopics" 
              :key="quickTopic.id"
              @click="selectQuickTopic(quickTopic)"
              class="quick-help-card"
            >
              <div class="quick-help-icon" :class="quickTopic.id">
                <component :is="quickTopic.icon" />
              </div>
              <div class="quick-help-content">
                <h4>{{ quickTopic.title }}</h4>
                <p>{{ quickTopic.description }}</p>
              </div>
            </button>
          </div>
        </div>

        <!-- Support Form -->
        <form @submit.prevent="submitTicket" class="support-form">
          
          <!-- Subject -->
          <div class="form-group">
            <label for="subject" class="form-label">Betreff *</label>
            <select 
              id="subject"
              v-model="formData.subject"
              class="form-select"
              required
            >
              <option value="">Wähle einen Betreff</option>
              <option value="Problem mit Job">Problem mit Job</option>
              <option value="Zahlung fehlgeschlagen">Zahlung fehlgeschlagen</option>
              <option value="Technisches Problem">Technisches Problem</option>
              <option value="Account-Frage">Account-Frage</option>
              <option value="Bewertung-Streit">Bewertung-Streit</option>
              <option value="Sicherheitsbedenken">Sicherheitsbedenken</option>
              <option value="Feature-Wunsch">Feature-Wunsch</option>
              <option value="Sonstiges">Sonstiges</option>
            </select>
          </div>

          <!-- Custom Subject (if "Sonstiges" selected) -->
          <div v-if="formData.subject === 'Sonstiges'" class="form-group">
            <label for="customSubject" class="form-label">Eigener Betreff *</label>
            <input 
              id="customSubject"
              v-model="formData.customSubject"
              type="text"
              class="form-input"
              placeholder="Beschreibe dein Anliegen kurz..."
              :required="formData.subject === 'Sonstiges'"
              maxlength="100"
            >
          </div>

          <!-- Priority -->
          <div class="form-group">
            <label class="form-label">Priorität</label>
            <div class="priority-options">
              <label class="priority-option">
                <input 
                  v-model="formData.priority"
                  type="radio"
                  value="low"
                  class="priority-radio"
                >
                <div class="priority-content">
                  <div class="priority-indicator low"></div>
                  <div class="priority-text">
                    <h4>Niedrig</h4>
                    <p>Allgemeine Fragen, Feedback</p>
                  </div>
                </div>
              </label>
              <label class="priority-option">
                <input 
                  v-model="formData.priority"
                  type="radio"
                  value="medium"
                  class="priority-radio"
                >
                <div class="priority-content">
                  <div class="priority-indicator medium"></div>
                  <div class="priority-text">
                    <h4>Mittel</h4>
                    <p>Job-Probleme, Account-Fragen</p>
                  </div>
                </div>
              </label>
              <label class="priority-option">
                <input 
                  v-model="formData.priority"
                  type="radio"
                  value="high"
                  class="priority-radio"
                >
                <div class="priority-content">
                  <div class="priority-indicator high"></div>
                  <div class="priority-text">
                    <h4>Hoch</h4>
                    <p>Zahlungsprobleme, Sicherheit</p>
                  </div>
                </div>
              </label>
            </div>
          </div>

          <!-- Description -->
          <div class="form-group">
            <label for="description" class="form-label">Beschreibung *</label>
            <textarea 
              id="description"
              v-model="formData.description"
              class="form-textarea"
              placeholder="Beschreibe dein Problem oder deine Frage so detailliert wie möglich..."
              required
              rows="6"
              maxlength="2000"
            ></textarea>
            <div class="character-count">{{ formData.description.length }}/2000 Zeichen</div>
          </div>

          <!-- Screenshots -->
          <div class="form-group">
            <label for="screenshots" class="form-label">Screenshots (optional)</label>
            <div class="file-upload-area">
              <input 
                id="screenshots"
                type="file"
                ref="fileInput"
                @change="handleFileUpload"
                accept="image/*"
                multiple
                class="file-input"
              >
              <div class="file-upload-content">
                <div class="upload-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                  </svg>
                </div>
                <p>Klicke hier oder ziehe Screenshots hierher</p>
                <span class="upload-hint">PNG, JPG bis 5MB pro Datei</span>
              </div>
            </div>
            
            <!-- Uploaded Files -->
            <div v-if="uploadedFiles.length > 0" class="uploaded-files">
              <h4>Hochgeladene Dateien:</h4>
              <div class="file-list">
                <div 
                  v-for="(file, index) in uploadedFiles" 
                  :key="index"
                  class="file-item"
                >
                  <div class="file-info">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                    <span>{{ file.name }}</span>
                  </div>
                  <button 
                    type="button"
                    @click="removeFile(index)"
                    class="remove-file"
                  >
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Contact Preference -->
          <div class="form-group">
            <label class="form-label">Antwort per</label>
            <div class="contact-options">
              <label class="contact-option">
                <input 
                  v-model="formData.contactMethod"
                  type="radio"
                  value="app"
                  class="contact-radio"
                >
                <div class="contact-content">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                  </svg>
                  <span>In der App</span>
                </div>
              </label>
              <label class="contact-option">
                <input 
                  v-model="formData.contactMethod"
                  type="radio"
                  value="email"
                  class="contact-radio"
                >
                <div class="contact-content">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                  <span>Per E-Mail</span>
                </div>
              </label>
            </div>
          </div>

          <!-- Form Actions -->
          <div class="form-actions">
            <button 
              type="button" 
              @click="navigateTo('/pwa/support/faq')"
              class="btn-cancel"
              :disabled="isSubmitting"
            >
              Zurück zur FAQ
            </button>
            <button 
              type="submit" 
              :disabled="!canSubmit || isSubmitting"
              class="btn-submit"
            >
              <span v-if="isSubmitting">Wird gesendet...</span>
              <span v-else>Anfrage senden</span>
            </button>
          </div>
        </form>

      </div>

    </div>

    <!-- Error Messages -->
    <div v-if="showError" class="error-message">
      <div class="error-content">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"/>
        </svg>
        <span>{{ errorMessage }}</span>
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
import { ref, computed } from 'vue'
import AppHeader from '~/components/AppHeader.vue'
import UnifiedFooter from '~/components/pwa/unified/UnifiedFooter.vue'

definePageMeta({
  layout: false
})

// Component state
const ticketSubmitted = ref(false)
const ticketNumber = ref('')
const submittedTicket = ref({})
const isSubmitting = ref(false)
const showError = ref(false)
const errorMessage = ref('')
const fileInput = ref(null)
const uploadedFiles = ref([])

// Form data
const formData = ref({
  subject: '',
  customSubject: '',
  priority: 'medium',
  description: '',
  contactMethod: 'app'
})

// Quick help topics
const quickHelpTopics = ref([
  {
    id: 'payment',
    title: 'Zahlungsproblem',
    description: 'Probleme mit Zahlungen oder Auszahlungen',
    icon: 'CreditCardIcon'
  },
  {
    id: 'job',
    title: 'Job-Problem',
    description: 'Schwierigkeiten mit einem Job',
    icon: 'BriefcaseIcon'
  },
  {
    id: 'account',
    title: 'Account-Problem',
    description: 'Login oder Profil-Probleme',
    icon: 'UserIcon'
  },
  {
    id: 'technical',
    title: 'Technisches Problem',
    description: 'App funktioniert nicht richtig',
    icon: 'CogIcon'
  }
])

// Computed properties
const canSubmit = computed(() => {
  const hasSubject = formData.value.subject && 
    (formData.value.subject !== 'Sonstiges' || formData.value.customSubject.trim())
  const hasDescription = formData.value.description.trim().length >= 10
  return hasSubject && hasDescription
})

// Methods
const selectQuickTopic = (topic) => {
  switch(topic.id) {
    case 'payment':
      formData.value.subject = 'Zahlung fehlgeschlagen'
      formData.value.priority = 'high'
      break
    case 'job':
      formData.value.subject = 'Problem mit Job'
      formData.value.priority = 'medium'
      break
    case 'account':
      formData.value.subject = 'Account-Frage'
      formData.value.priority = 'medium'
      break
    case 'technical':
      formData.value.subject = 'Technisches Problem'
      formData.value.priority = 'medium'
      break
  }
}

const handleFileUpload = (event) => {
  const files = Array.from(event.target.files)
  
  files.forEach(file => {
    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      showErrorMessage(`Datei "${file.name}" ist zu groß. Maximum 5MB.`)
      return
    }
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      showErrorMessage(`Datei "${file.name}" ist kein Bild.`)
      return
    }
    
    uploadedFiles.value.push(file)
  })
  
  // Clear input
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

const removeFile = (index) => {
  uploadedFiles.value.splice(index, 1)
}

const submitTicket = async () => {
  if (!canSubmit.value) return
  
  isSubmitting.value = true
  
  try {
    const ticketData = {
      subject: formData.value.subject === 'Sonstiges' ? formData.value.customSubject : formData.value.subject,
      priority: formData.value.priority,
      description: formData.value.description,
      contactMethod: formData.value.contactMethod,
      attachments: uploadedFiles.value.map(file => file.name),
      userEmail: 'anna.weber@email.com', // Mock user email
      userName: 'Anna Weber' // Mock user name
    }
    
    const result = await createSupportTicket(ticketData)
    
    if (result.success) {
      ticketNumber.value = result.ticketNumber
      submittedTicket.value = ticketData
      ticketSubmitted.value = true
      
      // Send email notification (simulated)
      await sendTicketConfirmationEmail(result.ticketNumber, ticketData.userEmail)
    } else {
      showErrorMessage(result.error || 'Fehler beim Senden der Anfrage.')
    }
  } catch (error) {
    console.error('Failed to submit ticket:', error)
    showErrorMessage('Ein unerwarteter Fehler ist aufgetreten.')
  } finally {
    isSubmitting.value = false
  }
}

const createNewTicket = () => {
  // Reset form
  ticketSubmitted.value = false
  ticketNumber.value = ''
  submittedTicket.value = {}
  formData.value = {
    subject: '',
    customSubject: '',
    priority: 'medium',
    description: '',
    contactMethod: 'app'
  }
  uploadedFiles.value = []
}

const showErrorMessage = (message) => {
  errorMessage.value = message
  showError.value = true
  setTimeout(() => {
    showError.value = false
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
async function createSupportTicket(ticketData) {
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  try {
    const ticketNumber = generateTicketNumber()
    
    // Mock ticket creation
    console.log('Support ticket created:', {
      number: ticketNumber,
      ...ticketData
    })
    
    return {
      success: true,
      ticketNumber,
      message: 'Ticket wurde erfolgreich erstellt.'
    }
  } catch (error) {
    return {
      success: false,
      error: 'Fehler beim Erstellen des Tickets.'
    }
  }
}

async function sendTicketConfirmationEmail(ticketNumber, email) {
  await new Promise(resolve => setTimeout(resolve, 500))
  console.log(`Confirmation email sent to ${email} for ticket #${ticketNumber}`)
}

function generateTicketNumber() {
  return Math.floor(10000 + Math.random() * 90000).toString()
}
</script>

<style scoped>
.support-contact-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}

.content-container {
  padding: 1rem;
  padding-bottom: 6rem;
  max-width: 700px;
  margin: 0 auto;
}

/* Success State */
.success-state {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.success-icon {
  width: 4rem;
  height: 4rem;
  color: #22c55e;
  margin: 0 auto 1rem auto;
}

.success-state h2 {
  color: #374151;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
}

.success-state > p {
  color: #6b7280;
  margin: 0 0 2rem 0;
  line-height: 1.5;
}

.ticket-info {
  background: #f9fafb;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  text-align: left;
}

.ticket-info h3 {
  color: #374151;
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
}

.ticket-details {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.ticket-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.ticket-label {
  color: #6b7280;
  font-size: 0.875rem;
}

.ticket-value {
  color: #374151;
  font-size: 0.875rem;
  font-weight: 500;
}

.status-open {
  background: rgba(245, 158, 11, 0.1);
  color: #f59e0b;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
}

.success-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.btn-new-ticket,
.btn-dashboard {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  font-size: 0.875rem;
}

.btn-new-ticket {
  background: #5F6F55;
  color: white;
}

.btn-new-ticket:hover {
  background: #4a5c44;
}

.btn-dashboard {
  background: #f3f4f6;
  color: #6b7280;
}

.btn-dashboard:hover {
  background: #e5e7eb;
}

/* Form Sections */
.contact-form-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.intro-section,
.quick-help-section,
.support-form {
  background: white;
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.intro-section {
  text-align: center;
}

.intro-section h2 {
  color: #374151;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 0.75rem 0;
}

.intro-section p {
  color: #6b7280;
  margin: 0;
  line-height: 1.5;
}

/* Quick Help */
.quick-help-section h3 {
  color: #374151;
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
}

.quick-help-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.quick-help-card {
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
}

.quick-help-card:hover {
  background: #f3f4f6;
  border-color: #BECDA3;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.quick-help-icon {
  width: 2rem;
  height: 2rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.quick-help-icon.payment {
  background: rgba(245, 158, 11, 0.1);
  color: #f59e0b;
}

.quick-help-icon.job {
  background: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
}

.quick-help-icon.account {
  background: rgba(168, 85, 247, 0.1);
  color: #a855f7;
}

.quick-help-icon.technical {
  background: rgba(107, 114, 128, 0.1);
  color: #6b7280;
}

.quick-help-content h4 {
  color: #374151;
  font-size: 0.875rem;
  font-weight: 600;
  margin: 0 0 0.25rem 0;
}

.quick-help-content p {
  color: #6b7280;
  font-size: 0.75rem;
  margin: 0;
  line-height: 1.4;
}

/* Form Elements */
.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  color: #374151;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.form-input,
.form-select,
.form-textarea {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s ease;
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  outline: none;
  border-color: #5F6F55;
}

.form-textarea {
  resize: vertical;
  min-height: 120px;
}

.character-count {
  text-align: right;
  color: #6b7280;
  font-size: 0.75rem;
  margin-top: 0.25rem;
}

/* Priority Options */
.priority-options {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.priority-option {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.priority-radio {
  display: none;
}

.priority-content {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  transition: all 0.2s ease;
  width: 100%;
}

.priority-option:hover .priority-content,
.priority-radio:checked + .priority-content {
  border-color: #BECDA3;
  background: #fefffe;
}

.priority-indicator {
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  flex-shrink: 0;
}

.priority-indicator.low {
  background: #22c55e;
}

.priority-indicator.medium {
  background: #f59e0b;
}

.priority-indicator.high {
  background: #ef4444;
}

.priority-text h4 {
  color: #374151;
  font-size: 0.875rem;
  font-weight: 600;
  margin: 0 0 0.25rem 0;
}

.priority-text p {
  color: #6b7280;
  font-size: 0.75rem;
  margin: 0;
}

/* File Upload */
.file-upload-area {
  border: 2px dashed #d1d5db;
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

.file-upload-area:hover {
  border-color: #BECDA3;
  background: #fefffe;
}

.file-input {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  cursor: pointer;
}

.upload-icon {
  width: 2rem;
  height: 2rem;
  color: #8F8B82;
  margin: 0 auto 0.75rem auto;
}

.file-upload-content p {
  color: #374151;
  font-size: 0.875rem;
  font-weight: 500;
  margin: 0 0 0.25rem 0;
}

.upload-hint {
  color: #6b7280;
  font-size: 0.75rem;
}

.uploaded-files {
  margin-top: 1rem;
}

.uploaded-files h4 {
  color: #374151;
  font-size: 0.875rem;
  font-weight: 600;
  margin: 0 0 0.75rem 0;
}

.file-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.file-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem;
  background: #f9fafb;
  border-radius: 8px;
}

.file-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #374151;
  font-size: 0.875rem;
}

.file-info svg {
  width: 1rem;
  height: 1rem;
  color: #6b7280;
}

.remove-file {
  background: none;
  border: none;
  color: #ef4444;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  transition: background 0.2s ease;
}

.remove-file:hover {
  background: rgba(239, 68, 68, 0.1);
}

.remove-file svg {
  width: 1rem;
  height: 1rem;
}

/* Contact Options */
.contact-options {
  display: flex;
  gap: 1rem;
}

.contact-option {
  display: flex;
  align-items: center;
  cursor: pointer;
  flex: 1;
}

.contact-radio {
  display: none;
}

.contact-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  transition: all 0.2s ease;
  width: 100%;
  justify-content: center;
}

.contact-option:hover .contact-content,
.contact-radio:checked + .contact-content {
  border-color: #BECDA3;
  background: #fefffe;
}

.contact-content svg {
  width: 1.25rem;
  height: 1.25rem;
  color: #5F6F55;
}

.contact-content span {
  color: #374151;
  font-size: 0.875rem;
  font-weight: 500;
}

/* Form Actions */
.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
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

.btn-cancel:hover:not(:disabled) {
  background: #e5e7eb;
}

.btn-submit {
  background: #5F6F55;
  color: white;
}

.btn-submit:hover:not(:disabled) {
  background: #4a5c44;
}

.btn-cancel:disabled,
.btn-submit:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Error Message */
.error-message {
  position: fixed;
  top: 1rem;
  left: 1rem;
  right: 1rem;
  z-index: 2000;
  padding: 1rem;
  background: #ef4444;
  color: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  animation: slideIn 0.3s ease;
}

.error-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.error-content svg {
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
  
  .intro-section,
  .quick-help-section,
  .support-form {
    padding: 2rem;
  }
  
  .quick-help-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .priority-options {
    flex-direction: row;
  }
  
  .success-actions {
    flex-direction: row;
  }
}

@media (max-width: 640px) {
  .quick-help-grid {
    grid-template-columns: 1fr;
  }
  
  .quick-help-card {
    flex-direction: column;
    text-align: center;
    gap: 0.75rem;
  }
  
  .contact-options {
    flex-direction: column;
  }
  
  .form-actions {
    flex-direction: column;
  }
  
  .success-actions {
    flex-direction: column;
  }
  
  .ticket-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }
}
</style>