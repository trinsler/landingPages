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
      
      <!-- Current Earnings Hero -->
      <EarningsHero 
        :total-earnings="totalEarnings"
        :completed-tasks="completedTasks"
      />

      <!-- Stats Grid -->
      <EarningsStats 
        :this-month-earnings="thisMonthEarnings"
        :avg-per-task="avgPerTask"
      />

      <!-- Recent Activity -->
      <RecentActivity />

      <!-- Recent Payments -->
      <PaymentsList 
        :transactions="transactions"
        :is-loading="isLoading"
        :filter-month="filterMonth"
        @view-transaction="viewTransactionDetails"
        @show-all-payments="() => navigateTo('/pwa/helper/earnings/all')"
      />

    </div>

    <!-- Minimal Footer Component -->
    <MinimalFooter 
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
import MinimalFooter from '~/components/pwa/unified/MinimalFooter.vue'
import EarningsHero from '~/components/pwa/helper/earnings/EarningsHero.vue'
import EarningsStats from '~/components/pwa/helper/earnings/EarningsStats.vue'
import RecentActivity from '~/components/pwa/helper/earnings/RecentActivity.vue'
import PaymentsList from '~/components/pwa/helper/earnings/PaymentsList.vue'
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
    case 'chat':
      navigateTo('/pwa/shared/chat')
      break
    case 'seeker-create':
      navigateTo('/pwa/jobs/create/category')
      break
    case 'seeker-history':
      navigateTo('/pwa/jobs/my-jobs')
      break
    case 'profile':
      navigateTo('/pwa/shared/profile')
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

/* Tablet and Desktop */
@media (min-width: 768px) {
  .mobile-container {
    width: 100%;
    padding: 2rem;
    max-width: 768px;
    margin: 0 auto;
    box-sizing: border-box;
  }
}

@media (min-width: 1024px) {
  .mobile-container {
    width: 100%;
    max-width: 1024px;
    box-sizing: border-box;
  }
}
</style>