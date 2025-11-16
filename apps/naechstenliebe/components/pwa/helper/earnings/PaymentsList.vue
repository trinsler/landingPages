<template>
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
        @click="$emit('viewTransaction', transaction)"
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
      <button @click="$emit('showAllPayments')" class="show-all-btn">
        Alle Zahlungen anzeigen ({{ transactions.length }})
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  transactions: {
    type: Array,
    default: () => []
  },
  isLoading: {
    type: Boolean,
    default: false
  },
  filterMonth: {
    type: String,
    default: 'all'
  }
})

const emit = defineEmits(['viewTransaction', 'showAllPayments'])

// Filtered transactions for display
const displayTransactions = computed(() => {
  if (props.filterMonth === 'all') {
    return props.transactions.slice(0, 4) // Show only recent 4
  }
  
  const now = new Date()
  const targetMonth = props.filterMonth === 'current' ? now.getMonth() : parseInt(props.filterMonth)
  
  return props.transactions.filter(tx => {
    const txDate = new Date(tx.captured_at)
    return txDate.getMonth() === targetMonth && txDate.getFullYear() === now.getFullYear()
  })
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
</script>

<style scoped>
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
  cursor: pointer;
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
</style>