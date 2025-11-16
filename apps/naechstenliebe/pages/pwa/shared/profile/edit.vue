<template>
  <div class="edit-profile-container">
    <!-- Header Component -->
    <AppHeader 
      title="Profil bearbeiten" 
      current-role="unified"
      :request-count="0"
      @open-requests="() => navigateTo('/pwa')"
      @open-profile="() => navigateTo('/pwa/shared/profile')"
      @open-news="() => navigateTo('/pwa/shared/news')"
      @toggle-role="() => navigateTo('/pwa')"
    />
    
    <div class="mobile-container">
      
      <!-- Profilbild Section -->
      <div class="form-section">
        <h3 class="section-title">Profilbild</h3>
        <div class="avatar-edit-section">
          <div class="current-avatar">
            <img v-if="formData.profilePicture" :src="formData.profilePicture" alt="Profilbild" class="avatar-image">
            <div v-else class="avatar-placeholder">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
            </div>
          </div>
          <div class="avatar-actions">
            <button @click="uploadAvatar" class="avatar-btn primary">
              <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              Foto ändern
            </button>
            <button v-if="formData.profilePicture" @click="removeAvatar" class="avatar-btn secondary">
              <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
              </svg>
              Entfernen
            </button>
          </div>
        </div>
      </div>

      <!-- Persönliche Daten -->
      <div class="form-section">
        <h3 class="section-title">Persönliche Daten</h3>
        
        <div class="form-grid">
          <div class="form-group">
            <label class="form-label">Vorname *</label>
            <input 
              v-model="formData.firstName"
              type="text"
              class="form-input"
              placeholder="Ihr Vorname"
              required
              maxlength="50"
            />
          </div>
          
          <div class="form-group">
            <label class="form-label">Nachname *</label>
            <input 
              v-model="formData.lastName"
              type="text"
              class="form-input"
              placeholder="Ihr Nachname"
              required
              maxlength="50"
            />
          </div>
        </div>
        
        <div class="form-group">
          <label class="form-label">Telefonnummer *</label>
          <input 
            v-model="formData.phoneNumber"
            type="tel"
            class="form-input"
            placeholder="+49 123 456789"
            required
          />
          <p class="form-help">Für direkte Kontaktaufnahme mit Helfern</p>
        </div>
      </div>

      <!-- Bio Section -->
      <div class="form-section">
        <div class="section-header">
          <h3 class="section-title">Über mich</h3>
          <span class="char-counter">{{ formData.bio.length }}/500</span>
        </div>
        
        <textarea 
          v-model="formData.bio"
          maxlength="500"
          placeholder="Erzählen Sie etwas über sich... z.B. welche Hilfe Sie benötigen oder anbieten, Ihre Interessen oder besondere Wünsche."
          class="bio-textarea"
          rows="5"
        ></textarea>
        <p class="form-help">Eine freundliche Beschreibung hilft beim ersten Kontakt</p>
      </div>

      <!-- Adresse Section -->
      <div class="form-section">
        <h3 class="section-title">Adresse</h3>
        
        <div class="form-group">
          <label class="form-label">Straße und Hausnummer *</label>
          <input 
            v-model="formData.street"
            type="text"
            class="form-input"
            placeholder="Musterstraße 123"
            required
          />
        </div>
        
        <div class="form-grid">
          <div class="form-group">
            <label class="form-label">PLZ *</label>
            <input 
              v-model="formData.postalCode"
              type="text"
              class="form-input"
              placeholder="67722"
              pattern="[0-9]{5}"
              required
              maxlength="5"
            />
          </div>
          
          <div class="form-group">
            <label class="form-label">Stadt *</label>
            <input 
              v-model="formData.city"
              type="text"
              class="form-input"
              placeholder="Winnweiler"
              required
            />
          </div>
        </div>
        
        <div class="address-note">
          <svg class="note-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
          </svg>
          <span class="note-text">Ihre Adresse wird erst nach Auftragsannahme geteilt</span>
        </div>
      </div>

      <!-- Helfer-spezifische Einstellungen -->
      <div v-if="currentRole === 'helper'" class="form-section">
        <h3 class="section-title">Helfer-Einstellungen</h3>
        
        <!-- Kategorien -->
        <div class="form-group">
          <label class="form-label">Meine Kategorien</label>
          <div class="categories-grid">
            <label 
              v-for="category in availableCategories" 
              :key="category.id"
              class="category-checkbox"
              :class="{ active: formData.helperCategories.includes(category.id) }"
            >
              <input 
                type="checkbox" 
                :value="category.id"
                v-model="formData.helperCategories"
                class="checkbox-input"
              />
              <div class="category-content">
                <img :src="category.icon" :alt="category.name" class="category-icon">
                <span class="category-name">{{ category.name }}</span>
              </div>
            </label>
          </div>
          <p class="form-help">Wählen Sie die Bereiche, in denen Sie helfen möchten</p>
        </div>
        
        <!-- Umkreis -->
        <div class="form-group">
          <label class="form-label">Arbeitsumkreis</label>
          <div class="radius-section">
            <div class="radius-display">
              <span class="radius-value">{{ formData.helperRadius }} km</span>
              <span class="radius-label">Maximale Entfernung</span>
            </div>
            <input 
              type="range"
              v-model="formData.helperRadius"
              min="1"
              max="20"
              step="1"
              class="radius-slider"
            />
            <div class="radius-markers">
              <span class="marker">1 km</span>
              <span class="marker">20 km</span>
            </div>
          </div>
          <p class="form-help">Wie weit sind Sie bereit zu fahren?</p>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="action-section">
        <button @click="saveChanges" :disabled="!isFormValid" class="save-btn" :class="{ disabled: !isFormValid }">
          <svg v-if="isSaving" class="btn-icon spinning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
          </svg>
          <svg v-else class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
          </svg>
          {{ isSaving ? 'Speichere...' : 'Änderungen speichern' }}
        </button>
        
        <button @click="cancelChanges" class="cancel-btn">
          <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
          Abbrechen
        </button>
      </div>

      <!-- Success Message -->
      <div v-if="showSuccessMessage" class="success-message">
        <svg class="success-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <span class="success-text">Profil erfolgreich aktualisiert!</span>
      </div>

    </div>

    <!-- Footer Component -->
    <UnifiedFooter 
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
import UnifiedFooter from '~/components/pwa/unified/UnifiedFooter.vue'
import { useRole } from '~/composables/useRole.js'

definePageMeta({
  layout: false
})

// Role management
const { currentRole } = useRole()

// Form state
const isSaving = ref(false)
const showSuccessMessage = ref(false)

// Form data - Initialisiert mit aktuellen Profildaten
const formData = ref({
  // Persönliche Daten
  firstName: currentRole.value === 'helper' ? 'Max' : 'Margarete',
  lastName: currentRole.value === 'helper' ? 'Mustermann' : 'Schmidt',
  phoneNumber: '+49 6302 123456',
  bio: currentRole.value === 'helper' 
    ? 'Hallo! Ich bin Max und helfe gerne beim Einkaufen und im Garten. Bin zuverlässig und von der Kirchengemeinde bestätigt.'
    : 'Hallo! Ich bin Margarete und freue mich über Hilfe im Alltag. Besonders beim Einkaufen und bei kleineren Hausarbeiten.',
  
  // Profilbild
  profilePicture: null,
  
  // Adresse
  street: 'Musterstraße 123',
  postalCode: '67722',
  city: 'Winnweiler',
  
  // Helfer-spezifisch
  helperCategories: currentRole.value === 'helper' ? ['shopping', 'gardening', 'companionship'] : [],
  helperRadius: 8
})

// Verfügbare Kategorien für Helfer
const availableCategories = ref([
  { id: 'shopping', name: 'Einkaufen', icon: '/icons/einkaufenMadl.svg' },
  { id: 'gardening', name: 'Garten', icon: '/icons/gießenBub.svg' },
  { id: 'cleaning', name: 'Putzen', icon: '/icons/staubsaugen.svg' },
  { id: 'cooking', name: 'Kochen', icon: '/icons/kochen.svg' },
  { id: 'companionship', name: 'Gesellschaft', icon: '/icons/verschiedeneMenschen.svg' },
  { id: 'transportation', name: 'Transport', icon: '/icons/verschiedeneMenschen.svg' },
  { id: 'tech', name: 'Technik', icon: '/icons/technikBanalcieren.svg' },
  { id: 'childcare', name: 'Kinderbetreuung', icon: '/icons/verschiedeneMenschen.svg' }
])

// Form validation
const isFormValid = computed(() => {
  return formData.value.firstName.trim() && 
         formData.value.lastName.trim() && 
         formData.value.phoneNumber.trim() && 
         formData.value.street.trim() && 
         formData.value.postalCode.trim() && 
         formData.value.city.trim() &&
         formData.value.postalCode.length === 5
})

// Methods
const uploadAvatar = () => {
  // In echter App: File picker öffnen
  console.log('Upload avatar clicked')
  alert('Foto-Upload würde hier geöffnet werden')
}

const removeAvatar = () => {
  formData.value.profilePicture = null
}

const saveChanges = async () => {
  if (!isFormValid.value) return
  
  isSaving.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // In echter App: API call to update profile
    console.log('Saving profile data:', formData.value)
    
    // Show success message
    showSuccessMessage.value = true
    setTimeout(() => {
      showSuccessMessage.value = false
      // Navigate back to profile
      navigateTo('/pwa/shared/profile')
    }, 2000)
    
  } catch (error) {
    console.error('Error saving profile:', error)
    alert('Fehler beim Speichern. Bitte versuchen Sie es erneut.')
  } finally {
    isSaving.value = false
  }
}

const cancelChanges = () => {
  // Warn if there are unsaved changes
  const hasChanges = true // In echter App: Compare with original data
  
  if (hasChanges) {
    if (confirm('Möchten Sie wirklich abbrechen? Ungespeicherte Änderungen gehen verloren.')) {
      navigateTo('/pwa/shared/profile')
    }
  } else {
    navigateTo('/pwa/shared/profile')
  }
}

// Footer navigation
const handleFooterNavigation = (tab) => {
  if (tab === 'profile') {
    cancelChanges()
    return
  }
  
  // For other tabs, warn about unsaved changes
  if (confirm('Ungespeicherte Änderungen gehen verloren. Trotzdem fortfahren?')) {
    switch(tab) {
      case 'dashboard':
        navigateTo('/pwa')
        break
      case 'helper-tasks':
        navigateTo('/pwa')
        break
      case 'helper-earnings':
        navigateTo('/pwa/helper/earnings')
        break
      case 'seeker-create':
        navigateTo('/pwa/seeker/task-create')
        break
      case 'seeker-history':
        navigateTo('/pwa/seeker/history')
        break
      case 'seeker-favorites':
        navigateTo('/pwa/seeker/favorites')
        break
    }
  }
}

// Initialize form with existing data on mount
onMounted(() => {
  // In echter App: Load actual user data from API/store
  console.log('Profile edit loaded for role:', currentRole.value)
})
</script>

<style scoped>
/* Mobile First Design für Profile Edit */
.edit-profile-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  position: relative;
}

.edit-profile-container::before {
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

/* Form Sections */
.form-section {
  background: white;
  border-radius: 20px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.section-title {
  color: #474747;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
  line-height: 1.3;
}

.char-counter {
  color: #6b7280;
  font-size: 0.875rem;
  background: rgba(107, 114, 128, 0.1);
  padding: 0.5rem 0.75rem;
  border-radius: 16px;
  font-weight: 500;
}

/* Avatar Edit */
.avatar-edit-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.current-avatar {
  width: 6rem;
  height: 6rem;
  background: #BECDA3;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 4px solid rgba(95, 111, 85, 0.1);
  overflow: hidden;
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-placeholder {
  width: 3rem;
  height: 3rem;
  background: linear-gradient(135deg, #BECDA3, #5F6F55);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-placeholder svg {
  width: 1.5rem;
  height: 1.5rem;
  color: white;
}

.avatar-actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  justify-content: center;
}

.avatar-btn {
  border: none;
  border-radius: 12px;
  padding: 0.75rem 1rem;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-height: 2.75rem;
}

.avatar-btn.primary {
  background: #5F6F55;
  color: white;
}

.avatar-btn.primary:hover {
  background: #4a5c44;
  transform: translateY(-1px);
}

.avatar-btn.secondary {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  border: 1px solid rgba(239, 68, 68, 0.2);
}

.avatar-btn.secondary:hover {
  background: rgba(239, 68, 68, 0.2);
}

/* Form Elements */
.form-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

.form-group {
  margin-bottom: 1.25rem;
}

.form-label {
  display: block;
  color: #474747;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  line-height: 1.3;
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

.form-input:invalid {
  border-color: #ef4444;
}

.bio-textarea {
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

.bio-textarea:focus {
  outline: none;
  border-color: #5F6F55;
  box-shadow: 0 0 0 3px rgba(95, 111, 85, 0.1);
}

.form-help {
  color: #6b7280;
  font-size: 0.875rem;
  margin-top: 0.5rem;
  line-height: 1.4;
  margin-bottom: 0;
}

/* Address Note */
.address-note {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 12px;
  margin-top: 1rem;
}

.note-icon {
  width: 1.25rem;
  height: 1.25rem;
  color: #3b82f6;
  flex-shrink: 0;
}

.note-text {
  color: #1e40af;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.4;
}

/* Categories */
.categories-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.category-checkbox {
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  background: white;
  position: relative;
}

.category-checkbox:hover {
  border-color: #5F6F55;
  transform: translateY(-1px);
}

.category-checkbox.active {
  border-color: #5F6F55;
  background: rgba(95, 111, 85, 0.05);
}

.checkbox-input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.category-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  text-align: center;
}

.category-icon {
  width: 1.5rem;
  height: 1.5rem;
}

.category-name {
  font-size: 0.875rem;
  font-weight: 500;
  color: #474747;
  line-height: 1.2;
}

/* Radius Slider */
.radius-section {
  background: rgba(248, 250, 252, 0.8);
  border-radius: 12px;
  padding: 1rem;
}

.radius-display {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.radius-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #5F6F55;
}

.radius-label {
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 500;
}

.radius-slider {
  width: 100%;
  height: 8px;
  background: rgba(95, 111, 85, 0.1);
  border-radius: 4px;
  outline: none;
  -webkit-appearance: none;
  margin-bottom: 0.5rem;
}

.radius-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 20px;
  height: 20px;
  background: #5F6F55;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0,0,0,0.2);
}

.radius-markers {
  display: flex;
  justify-content: space-between;
}

.marker {
  font-size: 0.75rem;
  color: #9ca3af;
}

/* Action Buttons */
.action-section {
  background: white;
  border-radius: 20px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
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

.save-btn:hover:not(.disabled) {
  background: #4a5c44;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(95, 111, 85, 0.3);
}

.save-btn.disabled {
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

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Success Message */
.success-message {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(34, 197, 94, 0.95);
  color: white;
  padding: 1.5rem 2rem;
  border-radius: 16px;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 600;
  font-size: 1.125rem;
  z-index: 1000;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(34, 197, 94, 0.3);
  animation: slideInSuccess 0.3s ease;
}

@keyframes slideInSuccess {
  from {
    opacity: 0;
    transform: translate(-50%, -60%);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
}

.success-icon {
  width: 1.5rem;
  height: 1.5rem;
}

/* Tablet Optimizations */
@media (min-width: 768px) {
  .mobile-container {
    padding: 2rem;
    max-width: 768px;
    margin: 0 auto;
  }
  
  .form-grid {
    grid-template-columns: 1fr 1fr;
  }
  
  .categories-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  
  .action-section {
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
  
  .section-title {
    font-size: 1.25rem;
  }
  
  .avatar-edit-section {
    flex-direction: row;
    justify-content: center;
  }
}

/* Desktop Optimizations */
@media (min-width: 1024px) {
  .mobile-container {
    max-width: 1024px;
  }
  
  .categories-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>