<template>
  <div class="payment-methods-container">
    <!-- Header -->
    <AppHeader 
      title="Zahlungsmethoden" 
      current-role="unified"
      :request-count="0"
      :show-back="true"
      @back="() => navigateTo('/pwa/shared/profile')"
      @open-profile="() => navigateTo('/pwa/shared/profile')"
    />

    <div class="content-container">
      
      <!-- Current Payment Methods -->
      <div class="payment-methods-section">
        <h2 class="section-title">Gespeicherte Zahlungsmethoden</h2>
        
        <div v-if="paymentMethods.length === 0" class="no-methods">
          <div class="no-methods-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
            </svg>
          </div>
          <h3 class="no-methods-title">Keine Zahlungsmethoden</h3>
          <p class="no-methods-text">Fügen Sie eine Zahlungsmethode hinzu, um Jobs bezahlen zu können.</p>
        </div>

        <div v-else class="methods-list">
          <div 
            v-for="method in paymentMethods" 
            :key="method.id"
            class="payment-method-card"
            :class="{ 'default': method.isDefault }"
          >
            <div class="method-info">
              <div class="method-icon">
                <svg v-if="method.type === 'stripe'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
                </svg>
                <svg v-else-if="method.type === 'paypal'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
                <svg v-else fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                </svg>
              </div>
              <div class="method-details">
                <div class="method-name">{{ method.displayName }}</div>
                <div class="method-type">{{ getMethodTypeLabel(method.type) }}</div>
              </div>
            </div>
            
            <div class="method-actions">
              <div v-if="method.isDefault" class="default-badge">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                Standard
              </div>
              <button @click="editMethod(method)" class="action-btn edit">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                </svg>
              </button>
              <button @click="deleteMethod(method)" class="action-btn delete">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Add New Payment Method -->
      <div class="add-method-section">
        <h3 class="section-subtitle">Neue Zahlungsmethode hinzufügen</h3>
        
        <div class="payment-options">
          <button @click="addStripeMethodModal" class="payment-option stripe">
            <div class="option-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
              </svg>
            </div>
            <div class="option-info">
              <div class="option-name">Kreditkarte / SEPA</div>
              <div class="option-desc">Visa, Mastercard, SEPA-Lastschrift</div>
            </div>
            <div class="option-arrow">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </div>
          </button>

          <button @click="addPayPalMethodModal" class="payment-option paypal">
            <div class="option-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
            </div>
            <div class="option-info">
              <div class="option-name">PayPal</div>
              <div class="option-desc">Mit PayPal-Konto verbinden</div>
            </div>
            <div class="option-arrow">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </div>
          </button>

          <button 
            v-if="isApplePaySupported" 
            @click="addApplePayMethodAction" 
            class="payment-option apple-pay"
          >
            <div class="option-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>
              </svg>
            </div>
            <div class="option-info">
              <div class="option-name">Apple Pay</div>
              <div class="option-desc">Schnell und sicher bezahlen</div>
            </div>
            <div class="option-arrow">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </div>
          </button>
        </div>
      </div>

    </div>

    <!-- Modals -->
    <!-- Stripe Card Form Modal -->
    <div v-if="showStripeModal" class="modal-overlay" @click.self="closeStripeModal">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">Kreditkarte hinzufügen</h3>
          <button @click="closeStripeModal" class="close-btn">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        
        <div class="stripe-form">
          <div class="form-group">
            <label class="form-label">Karteninhaber</label>
            <input 
              v-model="stripeForm.cardHolder" 
              type="text" 
              class="form-input"
              placeholder="Max Mustermann"
            >
          </div>
          
          <div class="form-group">
            <label class="form-label">Kartennummer</label>
            <input 
              v-model="stripeForm.cardNumber" 
              type="text" 
              class="form-input"
              placeholder="1234 5678 9012 3456"
              @input="formatCardNumber"
            >
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Ablaufdatum</label>
              <input 
                v-model="stripeForm.expiry" 
                type="text" 
                class="form-input"
                placeholder="MM/YY"
                @input="formatExpiry"
              >
            </div>
            <div class="form-group">
              <label class="form-label">CVV</label>
              <input 
                v-model="stripeForm.cvv" 
                type="text" 
                class="form-input"
                placeholder="123"
                maxlength="4"
              >
            </div>
          </div>
          
          <div class="form-checkbox">
            <input 
              id="setDefault" 
              v-model="stripeForm.setAsDefault" 
              type="checkbox"
              class="checkbox"
            >
            <label for="setDefault" class="checkbox-label">Als Standard-Zahlungsmethode festlegen</label>
          </div>
        </div>
        
        <div class="modal-footer">
          <button @click="closeStripeModal" class="btn-cancel">Abbrechen</button>
          <button @click="saveStripeMethod" class="btn-save" :disabled="!isStripeFormValid">
            <span v-if="isProcessing">Wird gespeichert...</span>
            <span v-else>Karte speichern</span>
          </button>
        </div>
      </div>
    </div>

    <!-- PayPal OAuth Modal -->
    <div v-if="showPayPalModal" class="modal-overlay" @click.self="closePayPalModal">
      <div class="modal-content paypal-modal">
        <div class="modal-header">
          <h3 class="modal-title">PayPal verbinden</h3>
          <button @click="closePayPalModal" class="close-btn">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        
        <div class="paypal-content">
          <div class="paypal-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"/>
            </svg>
          </div>
          <h4 class="paypal-title">Mit PayPal-Konto verbinden</h4>
          <p class="paypal-description">
            Sie werden zu PayPal weitergeleitet, um Ihr Konto zu verbinden. 
            Nach der Bestätigung können Sie PayPal für Zahlungen verwenden.
          </p>
          
          <button @click="connectPayPal" class="paypal-connect-btn">
            <span v-if="isProcessing">Verbinde mit PayPal...</span>
            <span v-else>Mit PayPal verbinden</span>
          </button>
        </div>
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
import { usePaymentMethods } from '~/composables/usePaymentMethods.js'

definePageMeta({
  layout: false
})

// Use payment methods composable
const {
  paymentMethods,
  isLoading,
  error: paymentError,
  loadPaymentMethods,
  addStripeMethod,
  addPayPalMethod,
  addApplePayMethod,
  removePaymentMethod,
  setDefaultMethod
} = usePaymentMethods()

// Modal states
const showStripeModal = ref(false)
const showPayPalModal = ref(false)
const isProcessing = ref(false)

// Stripe form data
const stripeForm = ref({
  cardHolder: '',
  cardNumber: '',
  expiry: '',
  cvv: '',
  setAsDefault: false
})

// Messages
const showMessage = ref(false)
const message = ref('')
const messageType = ref('success')

// Apple Pay support detection
const isApplePaySupported = ref(false)

onMounted(() => {
  // Load payment methods
  loadPaymentMethods('current_user_id')
  
  // Check if Apple Pay is supported
  if (window.ApplePaySession) {
    isApplePaySupported.value = ApplePaySession.canMakePayments()
  }
})

// Methods
const getMethodTypeLabel = (type) => {
  const labels = {
    stripe: 'Kreditkarte',
    paypal: 'PayPal',
    apple_pay: 'Apple Pay'
  }
  return labels[type] || type
}

const addStripeMethodModal = () => {
  showStripeModal.value = true
  // Reset form
  stripeForm.value = {
    cardHolder: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    setAsDefault: false
  }
}

const addPayPalMethodModal = () => {
  showPayPalModal.value = true
}

const addApplePayMethodAction = async () => {
  isProcessing.value = true
  
  try {
    const result = await addApplePayMethod('current_user_id')
    
    if (result.success) {
      showSuccessMessage(result.message)
    } else {
      showErrorMessage(result.error)
    }
  } catch (error) {
    showErrorMessage('Apple Pay konnte nicht aktiviert werden.')
  } finally {
    isProcessing.value = false
  }
}

const closeStripeModal = () => {
  showStripeModal.value = false
}

const closePayPalModal = () => {
  showPayPalModal.value = false
}

const formatCardNumber = (event) => {
  let value = event.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
  let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value
  stripeForm.value.cardNumber = formattedValue
}

const formatExpiry = (event) => {
  let value = event.target.value.replace(/\D+/g, '')
  let formattedValue = value.replace(/^(\d{2})(\d{0,2})/, '$1/$2')
  stripeForm.value.expiry = formattedValue
}

const isStripeFormValid = computed(() => {
  return stripeForm.value.cardHolder.trim() !== '' &&
         stripeForm.value.cardNumber.replace(/\s/g, '').length >= 13 &&
         stripeForm.value.expiry.length === 5 &&
         stripeForm.value.cvv.length >= 3
})

const saveStripeMethod = async () => {
  if (!isStripeFormValid.value) return
  
  isProcessing.value = true
  
  try {
    const result = await addStripeMethod('current_user_id', stripeForm.value)
    
    if (result.success) {
      closeStripeModal()
      showSuccessMessage(result.message)
    } else {
      showErrorMessage(result.error)
    }
  } catch (error) {
    showErrorMessage('Fehler beim Speichern der Kreditkarte.')
  } finally {
    isProcessing.value = false
  }
}

const connectPayPal = async () => {
  isProcessing.value = true
  
  try {
    const result = await addPayPalMethod('current_user_id')
    
    if (result.success) {
      closePayPalModal()
      showSuccessMessage(result.message)
    } else {
      showErrorMessage(result.error)
    }
  } catch (error) {
    showErrorMessage('Fehler beim Verbinden mit PayPal.')
  } finally {
    isProcessing.value = false
  }
}

const editMethod = (method) => {
  // Implementation for editing payment method
  console.log('Edit method:', method)
  // Could open edit modal or navigate to edit page
}

const deleteMethod = async (method) => {
  if (confirm(`Möchten Sie ${method.displayName} wirklich entfernen?`)) {
    try {
      const result = await removePaymentMethod(method.id)
      
      if (result.success) {
        showSuccessMessage(result.message)
      } else {
        showErrorMessage(result.error)
      }
    } catch (error) {
      showErrorMessage('Fehler beim Entfernen der Zahlungsmethode.')
    }
  }
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
  }, 3000)
}

const handleFooterNavigation = (tab) => {
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
    case 'profile':
      navigateTo('/pwa/shared/profile')
      break
  }
}
</script>

<style scoped>
.payment-methods-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}

.content-container {
  padding: 1rem;
  padding-bottom: 6rem;
}

/* Payment Methods Section */
.payment-methods-section {
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
  margin: 0 0 1.5rem 0;
}

.section-subtitle {
  color: #474747;
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
}

/* No Methods State */
.no-methods {
  text-align: center;
  padding: 2rem;
  color: #8F8B82;
}

.no-methods-icon {
  width: 4rem;
  height: 4rem;
  margin: 0 auto 1rem;
  background: #f3f4f6;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.no-methods-icon svg {
  width: 2rem;
  height: 2rem;
}

.no-methods-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  color: #6b7280;
}

.no-methods-text {
  font-size: 1rem;
  margin: 0;
}

/* Payment Methods List */
.methods-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.payment-method-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem;
  background: #f9fafb;
  border-radius: 12px;
  border: 2px solid transparent;
  transition: all 0.2s ease;
}

.payment-method-card.default {
  background: rgba(95, 111, 85, 0.05);
  border-color: rgba(95, 111, 85, 0.2);
}

.method-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
}

.method-icon {
  width: 2.5rem;
  height: 2.5rem;
  background: #BECDA3;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.method-icon svg {
  width: 1.25rem;
  height: 1.25rem;
  color: #5F6F55;
}

.method-details {
  flex: 1;
}

.method-name {
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.25rem;
}

.method-type {
  font-size: 0.875rem;
  color: #6b7280;
}

.method-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.default-badge {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background: #22c55e;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
}

.default-badge svg {
  width: 0.875rem;
  height: 0.875rem;
}

.action-btn {
  width: 2.5rem;
  height: 2.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.action-btn.edit {
  background: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
}

.action-btn.edit:hover {
  background: rgba(59, 130, 246, 0.2);
}

.action-btn.delete {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}

.action-btn.delete:hover {
  background: rgba(239, 68, 68, 0.2);
}

.action-btn svg {
  width: 1rem;
  height: 1rem;
}

/* Add Method Section */
.add-method-section {
  background: white;
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.payment-options {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.payment-option {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem;
  background: #f9fafb;
  border: 2px solid transparent;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
  width: 100%;
}

.payment-option:hover {
  background: #f3f4f6;
  border-color: #BECDA3;
}

.payment-option.stripe:hover {
  border-color: #6366f1;
}

.payment-option.paypal:hover {
  border-color: #0070ba;
}

.payment-option.apple-pay:hover {
  border-color: #000;
}

.option-icon {
  width: 3rem;
  height: 3rem;
  background: #BECDA3;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.option-icon svg {
  width: 1.5rem;
  height: 1.5rem;
  color: #5F6F55;
}

.option-info {
  flex: 1;
}

.option-name {
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.25rem;
}

.option-desc {
  font-size: 0.875rem;
  color: #6b7280;
}

.option-arrow {
  flex-shrink: 0;
}

.option-arrow svg {
  width: 1.25rem;
  height: 1.25rem;
  color: #8F8B82;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 20px;
  padding: 1.5rem;
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.modal-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #374151;
  margin: 0;
}

.close-btn {
  width: 2rem;
  height: 2rem;
  border: none;
  background: #f3f4f6;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease;
}

.close-btn:hover {
  background: #e5e7eb;
}

.close-btn svg {
  width: 1rem;
  height: 1rem;
  color: #6b7280;
}

/* Stripe Form */
.stripe-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  flex: 1;
}

.form-row {
  display: flex;
  gap: 1rem;
}

.form-label {
  display: block;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
}

.form-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s ease;
}

.form-input:focus {
  outline: none;
  border-color: #5F6F55;
}

.form-checkbox {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.checkbox {
  width: 1.25rem;
  height: 1.25rem;
  accent-color: #5F6F55;
}

.checkbox-label {
  font-size: 0.875rem;
  color: #6b7280;
}

.modal-footer {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
}

.btn-cancel, .btn-save {
  flex: 1;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.875rem;
}

.btn-cancel {
  background: #f3f4f6;
  color: #6b7280;
  border: none;
}

.btn-cancel:hover {
  background: #e5e7eb;
}

.btn-save {
  background: #5F6F55;
  color: white;
  border: none;
}

.btn-save:hover:not(:disabled) {
  background: #4a5c44;
}

.btn-save:disabled {
  background: #d1d5db;
  color: #9ca3af;
  cursor: not-allowed;
}

/* PayPal Modal */
.paypal-modal .modal-content {
  text-align: center;
}

.paypal-content {
  padding: 1rem;
}

.paypal-icon {
  width: 4rem;
  height: 4rem;
  background: rgba(0, 112, 186, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
}

.paypal-icon svg {
  width: 2rem;
  height: 2rem;
  color: #0070ba;
}

.paypal-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #374151;
  margin: 0 0 1rem 0;
}

.paypal-description {
  color: #6b7280;
  margin: 0 0 1.5rem 0;
  line-height: 1.5;
}

.paypal-connect-btn {
  background: #0070ba;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.875rem 2rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease;
}

.paypal-connect-btn:hover {
  background: #005ea6;
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
    max-width: 600px;
    margin: 0 auto;
    padding: 2rem;
  }
  
  .form-row {
    align-items: end;
  }
  
  .modal-footer {
    justify-content: flex-end;
  }
  
  .btn-cancel, .btn-save {
    flex: 0 0 auto;
    min-width: 120px;
  }
}
</style>