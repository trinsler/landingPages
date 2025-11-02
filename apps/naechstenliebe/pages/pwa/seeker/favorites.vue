<template>
  <div style="min-height: 100vh; background: #f5f5f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;">
    <!-- Header Component -->
    <AppHeader 
      title="Favoriten" 
      current-role="seeker"
      :request-count="0"
      @open-requests="handleRequestsClick"
      @open-profile="handleProfileClick"
      @open-news="handleNewsClick"
      @toggle-role="handleRoleToggle"
    />

    <div style="padding: 1rem; padding-bottom: 6rem;">
      
      <!-- Info Header -->
      <FavoritesInfoHeader />

      <!-- Favoriten Liste -->
      <div style="display: flex; flex-direction: column; gap: 1rem; margin-bottom: 1.5rem;">
        <FavoriteHelperCard 
          v-for="helper in favoriteHelpers" 
          :key="helper.id"
          :helper="helper"
          @toggle-favorite="handleToggleFavorite"
          @hire-directly="handleHireDirectly"
          @open-chat="handleOpenChat"
        />
      </div>

      <!-- Neue Favoriten finden -->
      <FindNewHelpers @search-helpers="handleSearchHelpers" />

      <!-- Switch to Helper Mode -->
      <SwitchToHelperMode @switch-to-helper="switchToHelperMode" />

    </div>

    <!-- Footer Component -->
    <AppFooter 
      active-tab="favorites"
      current-role="seeker"
      @navigate="handleFooterNavigation"
    />

    <!-- Padding for bottom nav -->
    <div style="height: 5rem;"></div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AppHeader from '~/components/AppHeader.vue'
import AppFooter from '~/components/AppFooter.vue'
import FavoritesInfoHeader from '~/components/pwa/seeker/FavoritesInfoHeader.vue'
import FavoriteHelperCard from '~/components/pwa/seeker/FavoriteHelperCard.vue'
import FindNewHelpers from '~/components/pwa/seeker/FindNewHelpers.vue'
import SwitchToHelperMode from '~/components/pwa/seeker/SwitchToHelperMode.vue'

definePageMeta({
  layout: false
})

const favoriteHelpers = ref([
  {
    id: 1,
    name: 'Maria H.',
    avatar: '/icons/verschiedeneMenschen.svg',
    rating: '★★★★★',
    reviewCount: 47,
    distance: '0.3km',
    specialties: 'Einkaufen, Kochen',
    recentTasks: [
      { id: 1, description: 'Einkaufen', price: 15 },
      { id: 2, description: 'Kochen', price: 25 },
      { id: 3, description: 'Einkaufen', price: 12 }
    ]
  },
  {
    id: 2,
    name: 'Klaus B.',
    avatar: '/icons/technikBanalcieren.svg',
    rating: '★★★★★',
    reviewCount: 32,
    distance: '0.7km',
    specialties: 'Technik, Reparaturen',
    recentTasks: [
      { id: 1, description: 'Technik-Setup', price: 30 },
      { id: 2, description: 'WLAN-Hilfe', price: 20 }
    ]
  },
  {
    id: 3,
    name: 'Anna K.',
    avatar: '/icons/gießenBub.svg',
    rating: '★★★★★',
    reviewCount: 28,
    distance: '0.5km',
    specialties: 'Gassigehen, Garten',
    recentTasks: [
      { id: 1, description: 'Gassigehen', price: 18 },
      { id: 2, description: 'Pflanzen gießen', price: 10 }
    ]
  }
])

// Header event handlers
const handleRequestsClick = () => {
  navigateTo('/pwa/seeker/task-create')
}

const handleProfileClick = () => {
  navigateTo('/pwa/shared/profile')
}

const handleNewsClick = () => {
  navigateTo('/pwa/shared/news')
}

const handleRoleToggle = () => {
  navigateTo('/pwa/helper/dashboard')
}

// Footer navigation handler
const handleFooterNavigation = (tab) => {
  switch(tab) {
    case 'dashboard':
      navigateTo('/pwa/seeker/dashboard')
      break
    case 'tasks':
      navigateTo('/pwa/seeker/history')
      break
    case 'favorites':
      // Already on favorites page
      break
    case 'create':
    case 'task-create':
      navigateTo('/pwa/seeker/task-create')
      break
    case 'profile':
      navigateTo('/pwa/shared/profile')
      break
  }
}

const switchToHelperMode = () => {
  navigateTo('/pwa/helper/dashboard')
}

// Component event handlers
const handleToggleFavorite = (helperId) => {
  // Remove helper from favorites
  const index = favoriteHelpers.value.findIndex(h => h.id === helperId)
  if (index > -1) {
    favoriteHelpers.value.splice(index, 1)
  }
}

const handleHireDirectly = (helperId) => {
  // Navigate to task creation with pre-selected helper
  navigateTo(`/pwa/seeker/task-create?helper=${helperId}`)
}

const handleOpenChat = (helperId) => {
  // Navigate to chat with helper
  navigateTo(`/pwa/shared/chat?helper=${helperId}`)
}

const handleSearchHelpers = () => {
  navigateTo('/pwa/seeker/task-create')
}
</script>