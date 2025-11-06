<template>
  <div style="min-height: 100vh; background: #f5f5f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;">
    <!-- Header Component -->
    <AppHeader 
      title="Treueprogramm" 
      current-role="helper"
      :request-count="6"
      @open-requests="handleRequestsClick"
      @open-profile="handleProfileClick"
      @open-news="handleNewsClick"
      @toggle-role="handleRoleToggle"
    />

    <div style="padding: 1rem; padding-bottom: 6rem;">
      
      <!-- Current Status Card -->
      <TierStatus 
        :user-tier="userTier"
        :next-tier="nextTier"
        :progress-percentage="progressPercentage"
        :points-to-next-tier="pointsToNextTier"
      />

      <!-- Stats Overview -->
      <StatsOverview 
        :user-stats="userStats"
        @show-details="showProfileDetails"
      />

      <!-- Tier Benefits -->
      <TierBenefits :user-tier="userTier" />

      <!-- All Tiers -->
      <AllTiers 
        :user-tier="userTier"
        :all-tiers="allTiers"
      />

      <!-- Recent Achievements -->
      <RecentAchievements :recent-achievements="recentAchievements" />

      <!-- Challenges -->
      <ActiveChallenges :active-challenges="activeChallenges" />
    </div>

    <!-- Footer Component -->
    <UnifiedFooter 
      active-tab="loyalty"
      current-role="helper"
      @navigate="handleFooterNavigation"
    />

    <!-- Padding for bottom nav -->
    <div style="height: 5rem;"></div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import AppHeader from '~/components/AppHeader.vue'
import UnifiedFooter from '~/components/pwa/unified/UnifiedFooter.vue'

// Import loyalty components
import TierStatus from '~/components/pwa/helper/loyalty/TierStatus.vue'
import StatsOverview from '~/components/pwa/helper/loyalty/StatsOverview.vue'
import TierBenefits from '~/components/pwa/helper/loyalty/TierBenefits.vue'
import AllTiers from '~/components/pwa/helper/loyalty/AllTiers.vue'
import RecentAchievements from '~/components/pwa/helper/loyalty/RecentAchievements.vue'
import ActiveChallenges from '~/components/pwa/helper/loyalty/ActiveChallenges.vue'

// Import loyalty data
import { 
  userStats, 
  userTier, 
  allTiers, 
  recentAchievements, 
  activeChallenges 
} from '~/components/pwa/helper/loyalty/LoyaltyData.js'

definePageMeta({
  layout: false
})

// Next tier
const nextTier = computed(() => {
  const currentIndex = allTiers.findIndex(tier => tier.level === userTier.level)
  return allTiers[currentIndex + 1] || null
})

const pointsToNextTier = computed(() => {
  if (!nextTier.value) return 0
  return nextTier.value.minPoints - userStats.totalPoints
})

const progressPercentage = computed(() => {
  if (!nextTier.value) return 100
  const currentTierPoints = userTier.minPoints
  const nextTierPoints = nextTier.value.minPoints
  const userPoints = userStats.totalPoints
  
  const range = nextTierPoints - currentTierPoints
  const progress = userPoints - currentTierPoints
  
  return Math.min((progress / range) * 100, 100)
})

const showProfileDetails = (section) => {
  // Navigate to profile with specific section highlight
  navigateTo('/pwa/shared/profile#' + section)
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
      // Already on loyalty page
      break
    case 'earnings':
      navigateTo('/pwa/helper/earnings')
      break
    case 'profile':
      navigateTo('/pwa/shared/profile')
      break
  }
}
</script>

<style scoped>
/* Custom scrollbar */
div::-webkit-scrollbar {
  width: 6px;
}

div::-webkit-scrollbar-track {
  background: rgba(0,0,0,0.1);
  border-radius: 3px;
}

div::-webkit-scrollbar-thumb {
  background: rgba(0,0,0,0.2);
  border-radius: 3px;
}

div::-webkit-scrollbar-thumb:hover {
  background: rgba(0,0,0,0.3);
}
</style>