<template>
  <div class="payments-container">
    <!-- Header -->
    <AppHeader 
      title="Meine Zahlungen" 
      current-role="unified"
      :request-count="0"
      :show-back="true"
      @back="() => navigateTo('/pwa/shared/profile')"
      @open-profile="() => navigateTo('/pwa/shared/profile')"
    />

    <div class="content-container">
      
      <!-- Payment Summary -->
      <div class="summary-section">
        <div class="summary-hero">
          <div class="summary-icon-container">
            <div class="summary-icon-circle">
              <svg class="summary-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
              </svg>
            </div>
          </div>
          <div class="total-spent">{{ totalSpent }}€</div>
          <h2 class="summary-title">Gesamtausgaben</h2>
          <p class="summary-subtitle">Für {{ completedJobs }} abgeschlossene Jobs</p>
        </div>

        <!-- Stats Grid -->
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-value">{{ thisMonthSpent }}€</div>
            <div class="stat-label">Diesen Monat</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">{{ avgPerJob }}€</div>
            <div class="stat-label">Ø pro Job</div>
          </div>
        </div>
      </div>

      <!-- Filter Section -->
      <div class="filter-section">
        <h3 class="filter-title">Zahlungshistorie</h3>
        <div class="filter-buttons">
          <button 
            @click="filterPeriod = 'all'"
            class="filter-btn"
            :class="{ active: filterPeriod === 'all' }"
          >
            Alle
          </button>
          <button 
            @click="filterPeriod = 'current'"
            class="filter-btn"
            :class="{ active: filterPeriod === 'current' }"
          >
            Diesen Monat
          </button>
          <button 
            @click="filterPeriod = 'last'"
            class="filter-btn"
            :class="{ active: filterPeriod === 'last' }"
          >
            Letzten Monat
          </button>
        </div>
      </div>

      <!-- Payment History -->
      <div class="payments-section">
        
        <div v-if="isLoading" class="payments-loading">
          <div class="loading-spinner"></div>
          <p>Lade Zahlungen...</p>
        </div>

        <div v-else-if="filteredPayments.length === 0" class="no-payments">
          <div class="no-payments-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
            </svg>
          </div>
          <h4 class="no-payments-title">Keine Zahlungen</h4>
          <p class="no-payments-text">
            {{ filterPeriod === 'all' ? 'Sie haben noch keine Zahlungen getätigt.' : 'Keine Zahlungen in diesem Zeitraum.' }}
          </p>
        </div>

        <div v-else class="payments-list">
          <div 
            v-for="payment in filteredPayments" 
            :key="payment.id"
            class="payment-item"
          >
            <div class="payment-main">
              <div class="payment-info">
                <div class="payment-job">{{ payment.job_title }}</div>
                <div class="payment-helper">Helfer: {{ payment.helper_name }}</div>
                <div class="payment-date">{{ formatPaymentDate(payment.captured_at) }}</div>
              </div>
              
              <div class="payment-amount-section">
                <div class="payment-amount">{{ payment.gross_amount }}€</div>
                <div class="payment-status success">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                  Bezahlt
                </div>
              </div>
            </div>
            
            <!-- Payment Details -->
            <div class="payment-details">
              <div class="payment-method">
                <svg class="method-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
                </svg>
                {{ payment.payment_method_display }}
              </div>
              
              <div class="payment-actions">
                <button @click="viewInvoice(payment)" class="action-btn view-invoice">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                  Rechnung ansehen
                </button>
                
                <button @click="downloadInvoice(payment)" class="action-btn download-invoice">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- Invoice Detail Modal -->
    <div v-if="showInvoiceModal" class="modal-overlay" @click.self="closeInvoiceModal">
      <div class="modal-content invoice-modal">
        <div class="modal-header">
          <h3 class="modal-title">Rechnung #{{ selectedPayment?.invoice_number }}</h3>
          <button @click="closeInvoiceModal" class="close-btn">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        
        <div class="invoice-content">
          <!-- Invoice Header -->
          <div class="invoice-header">
            <div class="invoice-logo">
              <h4>Mein.Nachbar</h4>
            </div>
            <div class="invoice-meta">
              <div class="invoice-number">Rechnung #{{ selectedPayment?.invoice_number }}</div>
              <div class="invoice-date">{{ formatInvoiceDate(selectedPayment?.captured_at) }}</div>
            </div>
          </div>
          
          <!-- Billing Info -->
          <div class="billing-info">
            <div class="billing-from">
              <h5>Rechnungssteller:</h5>
              <p>Mein.Nachbar GmbH<br>
              Musterstraße 123<br>
              12345 Musterhausen</p>
            </div>
            <div class="billing-to">
              <h5>Rechnungsempfänger:</h5>
              <p>{{ selectedPayment?.seeker_name }}<br>
              {{ selectedPayment?.seeker_address }}</p>
            </div>
          </div>
          
          <!-- Service Details -->
          <div class="service-details">
            <h5>Leistungsbeschreibung:</h5>
            <div class="service-item">
              <div class="service-name">{{ selectedPayment?.job_title }}</div>
              <div class="service-date">Durchgeführt am: {{ formatServiceDate(selectedPayment?.job_completed_at) }}</div>
              <div class="service-helper">Helfer: {{ selectedPayment?.helper_name }}</div>
            </div>
          </div>
          
          <!-- Amount Breakdown -->
          <div class="amount-breakdown">
            <div class="breakdown-row">
              <span>Leistung netto:</span>
              <span>{{ (selectedPayment?.gross_amount / 1.19).toFixed(2) }}€</span>
            </div>
            <div class="breakdown-row">
              <span>MwSt. (19%):</span>
              <span>{{ (selectedPayment?.gross_amount - (selectedPayment?.gross_amount / 1.19)).toFixed(2) }}€</span>
            </div>
            <div class="breakdown-row total">
              <span>Gesamtbetrag:</span>
              <span>{{ selectedPayment?.gross_amount }}€</span>
            </div>
          </div>
          
          <!-- Payment Status -->
          <div class="payment-status-section">
            <div class="status-badge paid">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              Bezahlt am {{ formatPaymentDate(selectedPayment?.captured_at) }}
            </div>
            <div class="payment-method-used">
              Zahlungsmethode: {{ selectedPayment?.payment_method_display }}
            </div>
          </div>
        </div>
        
        <div class="modal-footer">
          <button @click="downloadInvoice(selectedPayment)" class="btn-download">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
            PDF herunterladen
          </button>
          <button @click="closeInvoiceModal" class="btn-close">Schließen</button>
        </div>
      </div>
    </div>

    <!-- Success Message -->
    <div v-if="showMessage" class="message success">
      <div class="message-content">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
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
import { usePayments } from '~/composables/usePayments.js'

definePageMeta({
  layout: false
})

// Use payments composable
const { getUserTransactions, calculateEarnings } = usePayments()

// Reactive data
const payments = ref([])
const isLoading = ref(false)
const filterPeriod = ref('all')
const showInvoiceModal = ref(false)
const selectedPayment = ref(null)
const showMessage = ref(false)
const message = ref('')

// Computed values
const totalSpent = computed(() => {
  return payments.value.reduce((sum, p) => sum + p.gross_amount, 0)
})

const completedJobs = computed(() => payments.value.length)

const thisMonthSpent = computed(() => {
  const now = new Date()
  return payments.value
    .filter(p => {
      const pDate = new Date(p.captured_at)
      return pDate.getMonth() === now.getMonth() && pDate.getFullYear() === now.getFullYear()
    })
    .reduce((sum, p) => sum + p.gross_amount, 0)
})

const avgPerJob = computed(() => {
  return completedJobs.value > 0 ? Math.round(totalSpent.value / completedJobs.value) : 0
})

const filteredPayments = computed(() => {
  if (filterPeriod.value === 'all') {
    return payments.value
  }
  
  const now = new Date()
  const targetMonth = filterPeriod.value === 'current' ? now.getMonth() : now.getMonth() - 1
  const targetYear = filterPeriod.value === 'current' ? now.getFullYear() : 
                     (now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear())
  
  return payments.value.filter(p => {
    const pDate = new Date(p.captured_at)
    return pDate.getMonth() === targetMonth && pDate.getFullYear() === targetYear
  })
})

// Load payments data on mount
onMounted(async () => {
  isLoading.value = true
  try {
    const userPayments = await getSeekerPayments('current_user_id')
    payments.value = userPayments
  } catch (error) {
    console.error('Failed to load payments:', error)
  } finally {
    isLoading.value = false
  }
})

// Methods
const formatPaymentDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('de-DE', { 
    day: '2-digit', 
    month: '2-digit', 
    year: 'numeric' 
  })
}

const formatInvoiceDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('de-DE', { 
    day: '2-digit', 
    month: 'long', 
    year: 'numeric' 
  })
}

const formatServiceDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('de-DE', { 
    weekday: 'long',
    day: '2-digit', 
    month: 'long', 
    year: 'numeric' 
  })
}

const viewInvoice = (payment) => {
  selectedPayment.value = payment
  showInvoiceModal.value = true
}

const closeInvoiceModal = () => {
  showInvoiceModal.value = false
  selectedPayment.value = null
}

const downloadInvoice = async (payment) => {
  try {
    // Simulate PDF generation and download
    showMessage.value = true
    message.value = 'Rechnung wird heruntergeladen...'
    
    // In real app: generate PDF and trigger download
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    message.value = 'Rechnung erfolgreich heruntergeladen!'
    setTimeout(() => {
      showMessage.value = false
    }, 2000)
    
    console.log('Downloading invoice for payment:', payment.id)
  } catch (error) {
    message.value = 'Fehler beim Herunterladen der Rechnung'
    setTimeout(() => {
      showMessage.value = false
    }, 3000)
  }
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

// Mock API function for seeker payments
async function getSeekerPayments(userId) {
  await new Promise(resolve => setTimeout(resolve, 800))
  
  return [
    {
      id: 'txn_1',
      job_id: 'job_1',
      job_title: 'Einkaufen bei REWE',
      helper_name: 'Max Mustermann',
      gross_amount: 20.00,
      status: 'captured',
      captured_at: new Date().toISOString(),
      payment_method_display: 'Visa •••• 4242',
      invoice_number: 'INV-2024-001',
      seeker_name: 'Margarete Schmidt',
      seeker_address: 'Musterstraße 123\n12345 Winnweiler',
      job_completed_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 'txn_2',
      job_id: 'job_2',
      job_title: 'Rasen mähen',
      helper_name: 'Anna Weber',
      gross_amount: 40.00,
      status: 'captured',
      captured_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      payment_method_display: 'PayPal',
      invoice_number: 'INV-2024-002',
      seeker_name: 'Margarete Schmidt',
      seeker_address: 'Musterstraße 123\n12345 Winnweiler',
      job_completed_at: new Date(Date.now() - 25 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 'txn_3',
      job_id: 'job_3',
      job_title: 'Fenster putzen',
      helper_name: 'Tom Fischer',
      gross_amount: 35.00,
      status: 'captured',
      captured_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      payment_method_display: 'Visa •••• 4242',
      invoice_number: 'INV-2024-003',
      seeker_name: 'Margarete Schmidt',
      seeker_address: 'Musterstraße 123\n12345 Winnweiler',
      job_completed_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000 - 2 * 60 * 60 * 1000).toISOString()
    }
  ]
}
</script>

<style scoped>
.payments-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}

.content-container {
  padding: 1rem;
  padding-bottom: 6rem;
}

/* Summary Section */
.summary-section {
  background: white;
  border-radius: 20px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.summary-hero {
  text-align: center;
  margin-bottom: 1.5rem;
}

.summary-icon-container {
  margin-bottom: 1.5rem;
}

.summary-icon-circle {
  width: 5rem;
  height: 5rem;
  background: #5F6F55;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}

.summary-icon {
  width: 2.5rem;
  height: 2.5rem;
  color: white;
}

.total-spent {
  font-size: 3.5rem;
  font-weight: 700;
  color: #5F6F55;
  margin-bottom: 0.75rem;
  line-height: 1;
}

.summary-title {
  color: #474747;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 0.75rem 0;
  line-height: 1.3;
}

.summary-subtitle {
  color: #8F8B82;
  margin: 0;
  font-size: 1.125rem;
  line-height: 1.5;
}

.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.stat-card {
  background: rgba(95, 111, 85, 0.1);
  border-radius: 16px;
  padding: 1.25rem;
  text-align: center;
}

.stat-value {
  font-size: 1.75rem;
  font-weight: 700;
  color: #5F6F55;
  margin-bottom: 0.5rem;
  line-height: 1.2;
}

.stat-label {
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 500;
  line-height: 1.4;
}

/* Filter Section */
.filter-section {
  background: white;
  border-radius: 20px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.filter-title {
  color: #474747;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
}

.filter-buttons {
  display: flex;
  gap: 0.5rem;
}

.filter-btn {
  flex: 1;
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  background: white;
  color: #6b7280;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-btn:hover {
  border-color: #BECDA3;
}

.filter-btn.active {
  background: #5F6F55;
  color: white;
  border-color: #5F6F55;
}

/* Payments Section */
.payments-section {
  background: white;
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

/* Loading state */
.payments-loading {
  text-align: center;
  padding: 2rem;
  color: #8F8B82;
}

.loading-spinner {
  width: 2rem;
  height: 2rem;
  border: 3px solid #f3f4f6;
  border-top: 3px solid #5F6F55;
  border-radius: 50%;
  margin: 0 auto 1rem;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* No payments state */
.no-payments {
  text-align: center;
  padding: 2rem;
  color: #8F8B82;
}

.no-payments-icon {
  width: 3rem;
  height: 3rem;
  margin: 0 auto 1rem;
  background: #f3f4f6;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.no-payments-icon svg {
  width: 1.5rem;
  height: 1.5rem;
}

.no-payments-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  color: #6b7280;
}

.no-payments-text {
  font-size: 1rem;
  margin: 0;
}

/* Payment items */
.payments-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.payment-item {
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  background: #f9fafb;
  transition: all 0.2s ease;
}

.payment-item:hover {
  border-color: #BECDA3;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.payment-main {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem;
}

.payment-info {
  flex: 1;
}

.payment-job {
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.25rem;
  font-size: 1.125rem;
}

.payment-helper {
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 0.25rem;
}

.payment-date {
  font-size: 0.875rem;
  color: #8F8B82;
}

.payment-amount-section {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.25rem;
}

.payment-amount {
  font-weight: 700;
  color: #5F6F55;
  font-size: 1.25rem;
  line-height: 1.2;
}

.payment-status {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  font-weight: 500;
}

.payment-status.success {
  color: #22c55e;
}

.payment-status svg {
  width: 0.875rem;
  height: 0.875rem;
}

.payment-details {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.25rem;
  border-top: 1px solid #e5e7eb;
  background: white;
  border-radius: 0 0 16px 16px;
}

.payment-method {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #6b7280;
}

.method-icon {
  width: 1rem;
  height: 1rem;
}

.payment-actions {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem 0.75rem;
  border: none;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-btn svg {
  width: 0.875rem;
  height: 0.875rem;
}

.view-invoice {
  background: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
}

.view-invoice:hover {
  background: rgba(59, 130, 246, 0.2);
}

.download-invoice {
  background: rgba(95, 111, 85, 0.1);
  color: #5F6F55;
}

.download-invoice:hover {
  background: rgba(95, 111, 85, 0.2);
}

/* Invoice Modal */
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
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
}

.invoice-modal {
  padding: 0;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
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

.invoice-content {
  padding: 1.5rem;
}

.invoice-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
}

.invoice-logo h4 {
  color: #5F6F55;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
}

.invoice-meta {
  text-align: right;
}

.invoice-number {
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.25rem;
}

.invoice-date {
  font-size: 0.875rem;
  color: #6b7280;
}

.billing-info {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
}

.billing-info h5 {
  font-weight: 600;
  color: #374151;
  margin: 0 0 0.5rem 0;
}

.billing-info p {
  color: #6b7280;
  line-height: 1.5;
  margin: 0;
}

.service-details {
  margin-bottom: 2rem;
  padding: 1.25rem;
  background: #f9fafb;
  border-radius: 12px;
}

.service-details h5 {
  font-weight: 600;
  color: #374151;
  margin: 0 0 1rem 0;
}

.service-item {
  background: white;
  padding: 1rem;
  border-radius: 8px;
}

.service-name {
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
}

.service-date, .service-helper {
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 0.25rem;
}

.amount-breakdown {
  background: #f9fafb;
  padding: 1.25rem;
  border-radius: 12px;
  margin-bottom: 2rem;
}

.breakdown-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  color: #6b7280;
}

.breakdown-row.total {
  font-weight: 700;
  color: #374151;
  font-size: 1.125rem;
  border-top: 1px solid #e5e7eb;
  padding-top: 0.5rem;
  margin-top: 0.5rem;
  margin-bottom: 0;
}

.payment-status-section {
  text-align: center;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 20px;
  font-weight: 600;
  margin-bottom: 0.75rem;
}

.status-badge.paid {
  background: rgba(34, 197, 94, 0.1);
  color: #22c55e;
}

.status-badge svg {
  width: 1rem;
  height: 1rem;
}

.payment-method-used {
  font-size: 0.875rem;
  color: #6b7280;
}

.modal-footer {
  display: flex;
  gap: 1rem;
  padding: 1.5rem;
  border-top: 1px solid #e5e7eb;
  justify-content: flex-end;
}

.btn-download {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #5F6F55;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease;
}

.btn-download:hover {
  background: #4a5c44;
}

.btn-download svg {
  width: 1rem;
  height: 1rem;
}

.btn-close {
  background: #f3f4f6;
  color: #6b7280;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease;
}

.btn-close:hover {
  background: #e5e7eb;
}

/* Success Message */
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
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
  }
  
  .stats-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  
  .filter-buttons {
    max-width: 400px;
  }
  
  .billing-info {
    gap: 3rem;
  }
}
</style>