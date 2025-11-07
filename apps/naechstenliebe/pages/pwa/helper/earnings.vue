<template>
  <div class="dashboard-container">
    <!-- Header Component -->
    <AppHeader 
      title="Verdienst" 
      current-role="unified"
      :request-count="0"
      @open-profile="() => navigateTo('/pwa/shared/profile')"
    />

    <div class="mobile-container">
      
      <!-- Current Earnings - Mobile First -->
      <div class="earnings-hero">
        <div class="earnings-icon-container">
          <div class="earnings-icon-circle">
            <svg class="earnings-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
            </svg>
          </div>
        </div>
        <div class="total-amount">{{ totalEarnings }}€</div>
        <h2 class="earnings-title">Gesamtverdienst</h2>
        <p class="earnings-subtitle">Aus {{ completedTasks }} erledigten Aufträgen</p>
      </div>

      <!-- Stats Grid - Mobile First -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-value">{{ thisMonthEarnings }}€</div>
          <div class="stat-label">Diesen Monat</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">{{ avgPerTask }}€</div>
          <div class="stat-label">Ø pro Auftrag</div>
        </div>
      </div>

      <!-- Recent Activity - Mobile First -->
      <div class="activity-section">
        <h3 class="section-title">Letzte Aktivität</h3>
        
        <div class="activity-list">
          <div class="activity-item">
            <div class="activity-icon job-created">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
              </svg>
            </div>
            <div class="activity-content">
              <p class="activity-text">Job "Einkaufen" erstellt</p>
              <span class="activity-time">vor 2 Stunden</span>
            </div>
          </div>
          
          <div class="activity-item">
            <div class="activity-icon helper-found">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
            </div>
            <div class="activity-content">
              <p class="activity-text">Helfer für Gartenarbeit gefunden</p>
              <span class="activity-time">vor 5 Stunden</span>
            </div>
          </div>
          
          <div class="activity-item">
            <div class="activity-icon job-completed">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
            </div>
            <div class="activity-content">
              <p class="activity-text">Job "Begleitung" abgeschlossen</p>
              <span class="activity-time">vor 1 Tag</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Payments - Mobile First -->
      <div class="payments-section">
        <h3 class="section-title">Letzte Zahlungen</h3>
        
        <div v-if="isLoading" class="payments-loading">
          <div class="loading-spinner"></div>
          <p>Lade Zahlungen...</p>
        </div>

        <div v-else-if="displayTransactions.length === 0" class="no-payments">
          <div class="no-payments-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
            </svg>
          </div>
          <p>Noch keine Zahlungen erhalten</p>
        </div>

        <div v-else class="payments-list">
          <div 
            v-for="transaction in displayTransactions" 
            :key="transaction.id"
            class="payment-item"
            @click="viewTransactionDetails(transaction)"
          >
            <div class="payment-info">
              <div class="payment-task">{{ transaction.job_title }}</div>
              <div class="payment-date">{{ formatTransactionDate(transaction.captured_at) }}</div>
              <div class="payment-details">
                <span class="gross-amount">{{ transaction.gross_amount }}€ brutto</span>
                <span class="separator">-</span>
                <span class="fee">{{ transaction.platform_fee_amount }}€ Provision</span>
              </div>
            </div>
            <div class="payment-amount-section">
              <div class="payment-amount">{{ transaction.net_amount }}€</div>
              <div class="payment-status">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                Ausgezahlt
              </div>
            </div>
          </div>
        </div>

        <!-- Show All Payments Button -->
        <div v-if="transactions.length > 4" class="show-all-section">
          <button @click="navigateTo('/pwa/helper/earnings/all')" class="show-all-btn">
            Alle Zahlungen anzeigen ({{ transactions.length }})
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>

    </div>

    <!-- Minimal Footer Component -->
    <MinimalFooter 
      active-tab="helper-earnings"
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
import MinimalFooter from '~/components/pwa/unified/MinimalFooter.vue'
import { usePayments } from '~/composables/usePayments.js'

definePageMeta({
  layout: false
})

// Use payments composable
const { getUserTransactions, calculateEarnings } = usePayments()

// Reactive data
const transactions = ref([])
const isLoading = ref(false)
const showDetailsModal = ref(false)
const selectedTransaction = ref(null)
const filterMonth = ref('all')

// Computed values based on real transaction data
const earnings = computed(() => {
  return calculateEarnings(transactions.value)
})

const totalEarnings = computed(() => earnings.value.total)
const completedTasks = computed(() => earnings.value.count)
const thisMonthEarnings = computed(() => earnings.value.thisMonth)

const avgPerTask = computed(() => {
  return completedTasks.value > 0 ? Math.round(totalEarnings.value / completedTasks.value) : 0
})

// Filtered transactions for display
const displayTransactions = computed(() => {
  if (filterMonth.value === 'all') {
    return transactions.value.slice(0, 4) // Show only recent 4
  }
  
  const now = new Date()
  const targetMonth = filterMonth.value === 'current' ? now.getMonth() : parseInt(filterMonth.value)
  
  return transactions.value.filter(tx => {
    const txDate = new Date(tx.captured_at)
    return txDate.getMonth() === targetMonth && txDate.getFullYear() === now.getFullYear()
  })
})

// Load earnings data on mount
onMounted(async () => {
  isLoading.value = true
  try {
    const userTransactions = await getUserTransactions('current_user_id', 'helper')
    transactions.value = userTransactions
  } catch (error) {
    console.error('Failed to load earnings:', error)
  } finally {
    isLoading.value = false
  }
})

const formatTransactionDate = (dateString) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = now - date
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays === 0) return 'Heute'
  if (diffDays === 1) return 'Gestern'
  if (diffDays < 7) return `Vor ${diffDays} Tagen`
  
  return date.toLocaleDateString('de-DE', { 
    day: '2-digit', 
    month: '2-digit' 
  })
}

const viewTransactionDetails = (transaction) => {
  selectedTransaction.value = transaction
  showDetailsModal.value = true
}

const downloadInvoice = (transaction) => {
  // Simulate invoice download
  console.log('Downloading invoice for transaction:', transaction.id)
  // In real app: create PDF and trigger download
}

// Footer navigation handler
const handleFooterNavigation = (tab) => {
  switch(tab) {
    case 'dashboard':
      navigateTo('/pwa')
      break
    case 'helper-tasks':
      navigateTo('/pwa/helper/tasks')
      break
    case 'helper-earnings':
      // Already on earnings page
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
</script>

<style scoped>
/* Mobile First Design */
.dashboard-container {
  min-height: 100vh;
  width: 100vw;
  max-width: 100%;
  overflow-x: hidden;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  position: relative;
}

.dashboard-container::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  background: 
    radial-gradient(circle at 20% 80%, rgba(95, 111, 85, 0.03) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(190, 205, 163, 0.04) 0%, transparent 50%),
    radial-gradient(circle at 40% 40%, rgba(143, 139, 130, 0.02) 0%, transparent 50%);
  pointer-events: none;
  z-index: 0;
}

/* Mobile First Container */
.mobile-container {
  width: 100%;
  max-width: 100vw;
  padding: 1rem;
  padding-bottom: 6rem;
  position: relative;
  z-index: 1;
  box-sizing: border-box;
}

/* Earnings Hero Section - Mobile Optimized */
.earnings-hero {
  width: 100%;
  background: white;
  border-radius: 20px;
  padding: 2rem 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  text-align: center;
  box-sizing: border-box;
}

.earnings-icon-container {
  margin-bottom: 1.5rem;
}

.earnings-icon-circle {
  width: 5rem;
  height: 5rem;
  background: #5F6F55;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}

.earnings-icon {
  width: 2.5rem;
  height: 2.5rem;
  color: white;
}

.total-amount {
  font-size: 3.5rem;
  font-weight: 700;
  color: #5F6F55;
  margin-bottom: 0.75rem;
  line-height: 1;
}

.earnings-title {
  color: #474747;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 0.75rem 0;
  line-height: 1.3;
}

.earnings-subtitle {
  color: #8F8B82;
  margin: 0;
  font-size: 1.125rem;
  line-height: 1.5;
}

/* Stats Grid - Mobile First */
.stats-grid {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1.5rem;
  box-sizing: border-box;
}

.stat-card {
  width: 100%;
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  box-sizing: border-box;
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

/* Payments Section - Mobile First */
.payments-section {
  width: 100%;
  background: white;
  border-radius: 20px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  box-sizing: border-box;
}

.section-title {
  color: #474747;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 1.5rem 0;
  line-height: 1.3;
}

.payments-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.payment-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem;
  background: #f9fafb;
  border-radius: 12px;
  transition: all 0.2s ease;
}

.payment-item:hover {
  background: rgba(95, 111, 85, 0.05);
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.payment-info {
  flex: 1;
}

.payment-task {
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
  font-size: 1.125rem;
  line-height: 1.3;
}

.payment-date {
  font-size: 1rem;
  color: #6b7280;
  line-height: 1.4;
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

/* Enhanced payment items */
.payment-item {
  cursor: pointer;
}

.payment-details {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.25rem;
  font-size: 0.75rem;
  color: #8F8B82;
}

.gross-amount {
  color: #6b7280;
}

.separator {
  color: #d1d5db;
}

.fee {
  color: #ef4444;
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
  color: #22c55e;
  font-weight: 500;
}

.payment-status svg {
  width: 0.875rem;
  height: 0.875rem;
}

/* Activity Section - Mobile First */
.activity-section {
  width: 100%;
  background: white;
  border-radius: 20px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  box-sizing: border-box;
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.activity-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: rgba(248, 250, 252, 0.6);
  border-radius: 12px;
  transition: all 0.3s ease;
}

.activity-item:hover {
  background: rgba(95, 111, 85, 0.05);
  transform: translateY(-1px);
}

.activity-icon {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}

.activity-icon.job-created {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
}

.activity-icon.helper-found {
  background: linear-gradient(135deg, #22c55e, #16a34a);
}

.activity-icon.job-completed {
  background: linear-gradient(135deg, #5F6F55, #4a5c44);
}

.activity-icon svg {
  width: 1.25rem;
  height: 1.25rem;
}

.activity-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.activity-text {
  color: #374151;
  font-weight: 500;
  margin: 0;
  font-size: 1rem;
  line-height: 1.4;
}

.activity-time {
  color: #64748b;
  font-size: 0.75rem;
  font-weight: 400;
}

/* Show all button */
.show-all-section {
  margin-top: 1rem;
  border-top: 1px solid #e5e7eb;
  padding-top: 1rem;
}

.show-all-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.875rem;
  background: #f9fafb;
  border: none;
  border-radius: 12px;
  color: #5F6F55;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.show-all-btn:hover {
  background: #f3f4f6;
  transform: translateY(-1px);
}

.show-all-btn svg {
  width: 1rem;
  height: 1rem;
}

/* Tablet and Desktop */
@media (min-width: 768px) {
  .mobile-container {
    width: 100%;
    padding: 2rem;
    max-width: 768px;
    margin: 0 auto;
    box-sizing: border-box;
  }
  
  .earnings-hero {
    padding: 3rem 2rem;
  }
  
  .earnings-icon-circle {
    width: 4rem;
    height: 4rem;
  }
  
  .earnings-icon {
    width: 2rem;
    height: 2rem;
  }
  
  .total-amount {
    font-size: 3rem;
  }
  
  .earnings-title {
    font-size: 1.25rem;
  }
  
  .earnings-subtitle {
    font-size: 1rem;
  }
  
  .stat-card {
    padding: 1.5rem;
  }
  
  .stat-value {
    font-size: 1.5rem;
  }
  
  .activity-section {
    padding: 2rem;
  }
  
  .activity-item {
    padding: 1rem;
  }
  
  .activity-text {
    font-size: 1rem;
  }
  
  .activity-time {
    font-size: 0.75rem;
  }
  
  .payments-section {
    padding: 2rem;
  }
  
  .section-title {
    font-size: 1.25rem;
  }
  
  .payment-item {
    padding: 1rem;
  }
  
  .payment-task {
    font-size: 1rem;
  }
  
  .payment-date {
    font-size: 0.875rem;
  }
  
  .payment-amount {
    font-size: 1.125rem;
  }
}

@media (min-width: 1024px) {
  .mobile-container {
    width: 100%;
    max-width: 1024px;
    box-sizing: border-box;
  }
  
  .stats-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
  }
}
</style>