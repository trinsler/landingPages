<template>
  <div style="min-height: 100vh; background: #f5f5f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;">
    <!-- Header Component -->
    <AppHeader 
      title="Meine Verdienste" 
      current-role="unified"
      :request-count="8"
      @open-requests="handleRequestsClick"
      @open-profile="handleProfileClick"
      @open-news="handleNewsClick"
      @toggle-role="handleRoleToggle"
    />

    <div style="padding: 1rem; padding-bottom: 6rem;">
      
      <!-- Verfügbares Guthaben -->
      <BalanceDisplay :balance="'47,50'" />

      <!-- Auszahlung anfordern -->
      <PayoutRequest :balance="'47,50'" @request-payout="requestPayout" />

      <!-- Ausstehende Zahlungen -->
      <PendingPayments />

      <!-- Transaktionsverlauf -->
      <TransactionHistory @generate-pdf="generatePDFDocument" />

      <!-- Statistik -->
      <EarningsStats />
    </div>

    <!-- Footer Component -->
    <UnifiedFooter 
      active-tab="helper-earnings"
      current-role="unified"
      @navigate="handleFooterNavigation"
    />

    <!-- Padding for bottom nav -->
    <div style="height: 5rem;"></div>
  </div>
</template>

<script setup>
import AppHeader from '~/components/AppHeader.vue'
import UnifiedFooter from '~/components/pwa/unified/UnifiedFooter.vue'

// Import earnings components
import BalanceDisplay from '~/components/pwa/helper/earnings/BalanceDisplay.vue'
import PayoutRequest from '~/components/pwa/helper/earnings/PayoutRequest.vue'
import PendingPayments from '~/components/pwa/helper/earnings/PendingPayments.vue'
import TransactionHistory from '~/components/pwa/helper/earnings/TransactionHistory.vue'
import EarningsStats from '~/components/pwa/helper/earnings/EarningsStats.vue'

// Import earnings data and functions
import { generatePDFDocument } from '~/components/pwa/helper/earnings/EarningsData.js'

definePageMeta({
  layout: false
})

const requestPayout = () => {
  console.log('Requesting payout of 47.50€')
  // Add payout logic
}

// Header event handlers
const handleRequestsClick = () => {
  navigateTo('/pwa')
}

const handleProfileClick = () => {
  navigateTo('/pwa/shared/profile')
}

const handleNewsClick = () => {
  navigateTo('/pwa/shared/news')
}

const handleRoleToggle = () => {
  navigateTo('/pwa/seeker/dashboard')
}

// Footer navigation handler
const handleFooterNavigation = (tab) => {
  switch(tab) {
    case 'dashboard':
      navigateTo('/pwa')
      break
    case 'tasks':
      navigateTo('/pwa/helper/tasks')
      break
    case 'loyalty':
      navigateTo('/pwa/helper/loyalty')
      break
    case 'earnings':
      // Already on earnings page
      break
    case 'profile':
      navigateTo('/pwa/shared/profile')
      break
  }
}
</script>