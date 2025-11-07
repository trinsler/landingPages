<template>
  <div class="create-org-container">
    <!-- Header -->
    <AppHeader 
      title="Organisation erstellen" 
      current-role="unified"
      :request-count="0"
      :show-back="true"
      @back="() => navigateTo('/pwa/shared/profile')"
      @open-profile="() => navigateTo('/pwa/shared/profile')"
    />

    <div class="content-container">
      
      <!-- Progress Steps -->
      <div class="progress-steps">
        <div class="step" :class="{ active: currentStep === 1, completed: currentStep > 1 }">
          <div class="step-number">1</div>
          <div class="step-label">Details</div>
        </div>
        <div class="step-line" :class="{ active: currentStep > 1 }"></div>
        <div class="step" :class="{ active: currentStep === 2, completed: currentStep > 2 }">
          <div class="step-number">2</div>
          <div class="step-label">Verifizierung</div>
        </div>
        <div class="step-line" :class="{ active: currentStep > 2 }"></div>
        <div class="step" :class="{ active: currentStep === 3, completed: currentStep > 3 }">
          <div class="step-number">3</div>
          <div class="step-label">Fertig</div>
        </div>
      </div>

      <!-- Step 1: Organization Details -->
      <div v-if="currentStep === 1" class="form-section">
        <div class="section-header">
          <h2 class="section-title">Organisations-Details</h2>
          <p class="section-subtitle">Grundlegende Informationen über Ihre Organisation</p>
        </div>

        <div class="form-content">
          <!-- Name -->
          <div class="form-group">
            <label class="form-label required">Name der Organisation</label>
            <input 
              v-model="formData.name"
              type="text" 
              class="form-input"
              placeholder="z.B. Kirchengemeinde St. Maria"
              maxlength="100"
              :class="{ error: errors.name }"
            >
            <div class="char-counter">{{ formData.name.length }}/100</div>
            <div v-if="errors.name" class="error-message">{{ errors.name }}</div>
          </div>

          <!-- Type -->
          <div class="form-group">
            <label class="form-label required">Organisationstyp</label>
            <select 
              v-model="formData.type" 
              class="form-select"
              :class="{ error: errors.type }"
            >
              <option value="">Bitte wählen...</option>
              <option value="charity">Charity / Wohltätigkeitsorganisation</option>
              <option value="church">Kirche / Kirchengemeinde</option>
              <option value="senior_center">Seniorenzentrum</option>
              <option value="neighborhood">Nachbarschaftshilfe</option>
              <option value="other">Sonstiges</option>
            </select>
            <div v-if="errors.type" class="error-message">{{ errors.type }}</div>
          </div>

          <!-- Description -->
          <div class="form-group">
            <label class="form-label">Beschreibung</label>
            <textarea 
              v-model="formData.description"
              class="form-textarea"
              placeholder="Beschreiben Sie Ihre Organisation und Mission..."
              maxlength="500"
              rows="4"
            ></textarea>
            <div class="char-counter">{{ formData.description.length }}/500</div>
          </div>

          <!-- Logo Upload -->
          <div class="form-group">
            <label class="form-label">Logo (optional)</label>
            <div class="file-upload-area" @click="$refs.logoInput.click()">
              <input 
                ref="logoInput"
                type="file" 
                accept="image/*"
                @change="handleLogoUpload"
                style="display: none"
              >
              <div v-if="!logoPreview" class="upload-placeholder">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                </svg>
                <span>Logo hochladen</span>
                <small>PNG, JPG bis 2MB</small>
              </div>
              <div v-else class="logo-preview">
                <img :src="logoPreview" alt="Logo Preview">
                <button @click.stop="removeLogo" class="remove-logo">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>
            </div>
            <div v-if="errors.logo" class="error-message">{{ errors.logo }}</div>
          </div>

          <!-- Website -->
          <div class="form-group">
            <label class="form-label">Website (optional)</label>
            <input 
              v-model="formData.website"
              type="url" 
              class="form-input"
              placeholder="https://www.ihre-organisation.de"
              :class="{ error: errors.website }"
            >
            <div v-if="errors.website" class="error-message">{{ errors.website }}</div>
          </div>

          <!-- Contact Email -->
          <div class="form-group">
            <label class="form-label required">Kontakt-Email</label>
            <input 
              v-model="formData.email"
              type="email" 
              class="form-input"
              placeholder="kontakt@ihre-organisation.de"
              :class="{ error: errors.email }"
            >
            <div v-if="errors.email" class="error-message">{{ errors.email }}</div>
          </div>

          <!-- Contact Phone -->
          <div class="form-group">
            <label class="form-label">Kontakt-Telefon (optional)</label>
            <input 
              v-model="formData.phone"
              type="tel" 
              class="form-input"
              placeholder="+49 123 456789"
            >
          </div>

          <!-- Address -->
          <div class="form-group">
            <label class="form-label required">Adresse</label>
            <textarea 
              v-model="formData.address"
              class="form-textarea"
              placeholder="Straße, PLZ Ort"
              rows="2"
              :class="{ error: errors.address }"
            ></textarea>
            <div v-if="errors.address" class="error-message">{{ errors.address }}</div>
          </div>
        </div>

        <div class="form-actions">
          <button @click="validateAndProceed" :disabled="isCreating" class="btn-primary">
            <span v-if="isCreating">Erstelle Organisation...</span>
            <span v-else>Organisation erstellen</span>
          </button>
        </div>
      </div>

      <!-- Step 2: Verification Upload -->
      <div v-if="currentStep === 2" class="verification-section">
        <div class="section-header">
          <h2 class="section-title">Verifizierung</h2>
          <p class="section-subtitle">Laden Sie einen Nachweis hoch, um Ihre Organisation zu verifizieren</p>
        </div>

        <div class="verification-content">
          <div class="verification-info">
            <div class="info-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div class="info-content">
              <h3>Organisation erfolgreich erstellt!</h3>
              <p>{{ createdOrganization?.name }} wurde angelegt.</p>
            </div>
          </div>

          <div class="verification-requirements">
            <h4>Für die Verifizierung benötigen wir:</h4>
            <ul>
              <li>Vereinsregister-Auszug</li>
              <li>Nachweis der Gemeinnützigkeit</li>
              <li>Oder andere offizielle Dokumente</li>
            </ul>
          </div>

          <div class="verification-upload">
            <div class="file-upload-area" @click="$refs.verificationInput.click()">
              <input 
                ref="verificationInput"
                type="file" 
                accept=".pdf"
                @change="handleVerificationUpload"
                style="display: none"
              >
              <div v-if="!verificationFile" class="upload-placeholder">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
                <span>Dokument hochladen</span>
                <small>PDF, maximal 10MB</small>
              </div>
              <div v-else class="file-selected">
                <div class="file-info">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                  <div class="file-details">
                    <div class="file-name">{{ verificationFile.name }}</div>
                    <div class="file-size">{{ formatFileSize(verificationFile.size) }}</div>
                  </div>
                </div>
                <button @click.stop="removeVerificationFile" class="remove-file">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>
            </div>
            <div v-if="errors.verification" class="error-message">{{ errors.verification }}</div>
          </div>
        </div>

        <div class="form-actions">
          <button @click="currentStep = 1" class="btn-secondary">Zurück</button>
          <button @click="submitVerification" :disabled="!verificationFile || isUploading" class="btn-primary">
            <span v-if="isUploading">Lade hoch...</span>
            <span v-else>Dokument einreichen</span>
          </button>
        </div>
      </div>

      <!-- Step 3: Success -->
      <div v-if="currentStep === 3" class="success-section">
        <div class="success-content">
          <div class="success-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <h2>Verifizierung eingereicht!</h2>
          <p class="success-message">
            Ihr Verifizierungsdokument wurde erfolgreich hochgeladen. 
            Unser Team prüft Ihre Angaben und Sie erhalten innerhalb von 1-3 Werktagen eine Rückmeldung.
          </p>
          
          <div class="next-steps">
            <h4>Was passiert als nächstes?</h4>
            <ol>
              <li>Unser Team prüft Ihre Dokumente</li>
              <li>Sie erhalten eine Email mit dem Ergebnis</li>
              <li>Nach Freischaltung können Sie als Organisation Jobs posten</li>
            </ol>
          </div>

          <div class="organization-preview">
            <h4>Ihre Organisation</h4>
            <div class="org-card">
              <div class="org-logo">
                <img v-if="logoPreview" :src="logoPreview" alt="Logo">
                <div v-else class="org-logo-placeholder">
                  {{ createdOrganization?.name?.charAt(0) }}
                </div>
              </div>
              <div class="org-info">
                <h5>{{ createdOrganization?.name }}</h5>
                <div class="org-type">{{ getTypeLabel(createdOrganization?.type) }}</div>
                <div class="org-status">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  Verifizierung läuft
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="form-actions">
          <button @click="navigateTo('/pwa/shared/profile')" class="btn-primary">
            Zum Profil
          </button>
          <button @click="navigateTo('/pwa/org/dashboard')" class="btn-secondary">
            Zur Organisation
          </button>
        </div>
      </div>

    </div>

    <!-- Success Message -->
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
import { ref, reactive } from 'vue'
import AppHeader from '~/components/AppHeader.vue'
import UnifiedFooter from '~/components/pwa/unified/UnifiedFooter.vue'
import { useOrganizations } from '~/composables/useOrganizations.js'

definePageMeta({
  layout: false
})

// Use organizations composable
const { createOrganization, uploadVerificationDocument } = useOrganizations()

// Form state
const currentStep = ref(1)
const isCreating = ref(false)
const isUploading = ref(false)
const createdOrganization = ref(null)

// Form data
const formData = reactive({
  name: '',
  type: '',
  description: '',
  website: '',
  email: '',
  phone: '',
  address: ''
})

// File handling
const logoFile = ref(null)
const logoPreview = ref(null)
const verificationFile = ref(null)

// Validation
const errors = reactive({})

// Messages
const showMessage = ref(false)
const message = ref('')
const messageType = ref('success')

// Methods
const validateForm = () => {
  // Clear previous errors
  Object.keys(errors).forEach(key => {
    delete errors[key]
  })

  let isValid = true

  // Required fields
  if (!formData.name.trim()) {
    errors.name = 'Name ist erforderlich'
    isValid = false
  } else if (formData.name.length > 100) {
    errors.name = 'Name ist zu lang (max. 100 Zeichen)'
    isValid = false
  }

  if (!formData.type) {
    errors.type = 'Organisationstyp ist erforderlich'
    isValid = false
  }

  if (!formData.email.trim()) {
    errors.email = 'Email ist erforderlich'
    isValid = false
  } else if (!isValidEmail(formData.email)) {
    errors.email = 'Ungültige Email-Adresse'
    isValid = false
  }

  if (!formData.address.trim()) {
    errors.address = 'Adresse ist erforderlich'
    isValid = false
  }

  // Optional website validation
  if (formData.website && !isValidUrl(formData.website)) {
    errors.website = 'Ungültige URL'
    isValid = false
  }

  return isValid
}

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const isValidUrl = (url) => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

const validateAndProceed = async () => {
  if (!validateForm()) {
    showErrorMessage('Bitte korrigieren Sie die markierten Felder.')
    return
  }

  isCreating.value = true

  try {
    const result = await createOrganization({
      ...formData,
      logoUrl: logoPreview.value // In real app: upload logo first
    })

    if (result.success) {
      createdOrganization.value = result.organization
      currentStep.value = 2
      showSuccessMessage(result.message)
    } else {
      showErrorMessage(result.error)
    }
  } catch (error) {
    showErrorMessage('Fehler beim Erstellen der Organisation.')
  } finally {
    isCreating.value = false
  }
}

const handleLogoUpload = (event) => {
  const file = event.target.files[0]
  if (!file) return

  // Validate file
  if (file.size > 2 * 1024 * 1024) { // 2MB
    showErrorMessage('Logo ist zu groß. Maximum 2MB.')
    return
  }

  if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
    showErrorMessage('Ungültiger Dateityp. Nur JPG, PNG und GIF erlaubt.')
    return
  }

  logoFile.value = file

  // Create preview
  const reader = new FileReader()
  reader.onload = (e) => {
    logoPreview.value = e.target.result
  }
  reader.readAsDataURL(file)
}

const removeLogo = () => {
  logoFile.value = null
  logoPreview.value = null
}

const handleVerificationUpload = (event) => {
  const file = event.target.files[0]
  if (!file) return

  // Validate file
  if (file.size > 10 * 1024 * 1024) { // 10MB
    showErrorMessage('Datei ist zu groß. Maximum 10MB.')
    return
  }

  if (file.type !== 'application/pdf') {
    showErrorMessage('Nur PDF-Dateien sind erlaubt.')
    return
  }

  verificationFile.value = file
}

const removeVerificationFile = () => {
  verificationFile.value = null
}

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const submitVerification = async () => {
  if (!verificationFile.value) {
    showErrorMessage('Bitte wählen Sie ein Dokument aus.')
    return
  }

  isUploading.value = true

  try {
    const result = await uploadVerificationDocument(
      createdOrganization.value.id,
      verificationFile.value
    )

    if (result.success) {
      currentStep.value = 3
      showSuccessMessage(result.message)
    } else {
      showErrorMessage(result.error)
    }
  } catch (error) {
    showErrorMessage('Fehler beim Hochladen des Dokuments.')
  } finally {
    isUploading.value = false
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
.create-org-container {
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

/* Progress Steps */
.progress-steps {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  padding: 1rem;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.step-number {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: #e5e7eb;
  color: #6b7280;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  transition: all 0.3s ease;
}

.step.active .step-number,
.step.completed .step-number {
  background: #5F6F55;
  color: white;
}

.step-label {
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 500;
}

.step.active .step-label,
.step.completed .step-label {
  color: #5F6F55;
  font-weight: 600;
}

.step-line {
  width: 4rem;
  height: 2px;
  background: #e5e7eb;
  transition: all 0.3s ease;
}

.step-line.active {
  background: #5F6F55;
}

/* Form Sections */
.form-section,
.verification-section,
.success-section {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.section-header {
  text-align: center;
  margin-bottom: 2rem;
}

.section-title {
  color: #374151;
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
}

.section-subtitle {
  color: #6b7280;
  font-size: 1rem;
  margin: 0;
}

/* Form Elements */
.form-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  font-weight: 600;
  color: #374151;
  font-size: 0.875rem;
}

.form-label.required::after {
  content: ' *';
  color: #ef4444;
}

.form-input,
.form-select,
.form-textarea {
  padding: 0.75rem 1rem;
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

.form-input.error,
.form-select.error,
.form-textarea.error {
  border-color: #ef4444;
}

.char-counter {
  font-size: 0.75rem;
  color: #8F8B82;
  text-align: right;
}

.error-message {
  font-size: 0.75rem;
  color: #ef4444;
  margin-top: -0.25rem;
}

/* File Upload */
.file-upload-area {
  border: 2px dashed #d1d5db;
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.file-upload-area:hover {
  border-color: #5F6F55;
  background: rgba(95, 111, 85, 0.05);
}

.upload-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  color: #6b7280;
}

.upload-placeholder svg {
  width: 3rem;
  height: 3rem;
}

.upload-placeholder span {
  font-weight: 600;
  font-size: 1rem;
}

.upload-placeholder small {
  font-size: 0.875rem;
}

.logo-preview {
  position: relative;
  display: inline-block;
}

.logo-preview img {
  max-width: 120px;
  max-height: 120px;
  border-radius: 8px;
}

.remove-logo,
.remove-file {
  position: absolute;
  top: -0.5rem;
  right: -0.5rem;
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.remove-logo svg,
.remove-file svg {
  width: 1rem;
  height: 1rem;
}

.file-selected {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 8px;
  position: relative;
}

.file-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.file-info svg {
  width: 2rem;
  height: 2rem;
  color: #5F6F55;
}

.file-details {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.file-name {
  font-weight: 600;
  color: #374151;
}

.file-size {
  font-size: 0.875rem;
  color: #6b7280;
}

/* Verification Section */
.verification-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem;
  background: rgba(34, 197, 94, 0.1);
  border-radius: 12px;
  margin-bottom: 2rem;
}

.info-icon {
  width: 3rem;
  height: 3rem;
  background: #22c55e;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.info-icon svg {
  width: 1.5rem;
  height: 1.5rem;
  color: white;
}

.info-content h3 {
  color: #374151;
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 0.25rem 0;
}

.info-content p {
  color: #6b7280;
  margin: 0;
}

.verification-requirements {
  background: #f9fafb;
  padding: 1.5rem;
  border-radius: 12px;
  margin-bottom: 1.5rem;
}

.verification-requirements h4 {
  color: #374151;
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
}

.verification-requirements ul {
  margin: 0;
  padding-left: 1.25rem;
  color: #6b7280;
}

.verification-requirements li {
  margin-bottom: 0.5rem;
}

/* Success Section */
.success-content {
  text-align: center;
}

.success-icon {
  width: 5rem;
  height: 5rem;
  background: #22c55e;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
}

.success-icon svg {
  width: 2.5rem;
  height: 2.5rem;
  color: white;
}

.success-content h2 {
  color: #374151;
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
}

.success-message {
  color: #6b7280;
  font-size: 1rem;
  line-height: 1.6;
  margin: 0 0 2rem 0;
}

.next-steps {
  background: #f9fafb;
  padding: 1.5rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  text-align: left;
}

.next-steps h4 {
  color: #374151;
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
}

.next-steps ol {
  margin: 0;
  padding-left: 1.25rem;
  color: #6b7280;
}

.next-steps li {
  margin-bottom: 0.5rem;
}

.organization-preview {
  margin-bottom: 2rem;
}

.organization-preview h4 {
  color: #374151;
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
}

.org-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem;
  background: #f9fafb;
  border-radius: 12px;
  text-align: left;
}

.org-logo {
  width: 4rem;
  height: 4rem;
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
  font-size: 1.5rem;
}

.org-info {
  flex: 1;
}

.org-info h5 {
  color: #374151;
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 0.25rem 0;
}

.org-type {
  color: #6b7280;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
}

.org-status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #f59e0b;
  font-size: 0.875rem;
  font-weight: 500;
}

.org-status svg {
  width: 1rem;
  height: 1rem;
}

/* Form Actions */
.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  justify-content: center;
}

.btn-primary,
.btn-secondary {
  padding: 0.875rem 2rem;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  min-width: 150px;
}

.btn-primary {
  background: #5F6F55;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: #4a5c44;
  transform: translateY(-1px);
}

.btn-primary:disabled {
  background: #d1d5db;
  color: #9ca3af;
  cursor: not-allowed;
}

.btn-secondary {
  background: white;
  color: #6b7280;
  border: 2px solid #e5e7eb;
}

.btn-secondary:hover {
  border-color: #BECDA3;
  color: #5F6F55;
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
  
  .form-actions {
    justify-content: flex-end;
  }
  
  .btn-primary,
  .btn-secondary {
    min-width: auto;
    padding: 0.875rem 2rem;
  }
  
  .step-line {
    width: 6rem;
  }
}
</style>