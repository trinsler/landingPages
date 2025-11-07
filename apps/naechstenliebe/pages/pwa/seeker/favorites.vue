<template>
  <div class="dashboard-container">
    <!-- Header Component -->
    <AppHeader 
      title="Favoriten" 
      current-role="unified"
      :request-count="0"
      @open-requests="() => navigateTo('/pwa')"
      @open-profile="() => navigateTo('/pwa/shared/profile')"
      @open-news="() => navigateTo('/pwa/shared/news')"
      @toggle-role="() => navigateTo('/pwa')"
    />

    <div class="mobile-container">
      
      <!-- Info Header -->
      <FavoritesInfoHeader />

      <!-- Favoriten Liste - Mobile First -->
      <div class="favorites-list">
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
    <MinimalFooter 
      active-tab="seeker-favorites"
      current-role="unified"
      @navigate="handleFooterNavigation"
    />

    <!-- Padding for bottom nav -->
    <div style="height: 5rem;"></div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AppHeader from '~/components/AppHeader.vue'
import MinimalFooter from '~/components/pwa/unified/MinimalFooter.vue'
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
    avatar: null, // Will use SVG in component
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
    avatar: null, // Will use SVG in component
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
    avatar: null, // Will use SVG in component
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
  navigateTo('/pwa')
}

const switchToHelperMode = () => {
  navigateTo('/pwa')
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

const handleFooterNavigation = (tab) => {
  switch(tab) {
    case 'dashboard':
      navigateTo('/pwa')
      break
    case 'helper-tasks':
      navigateTo('/pwa/helper/tasks')
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
      // Already on favorites page
      break
  }
}
</script>

<style scoped>
/* Mobile First Design */
.dashboard-container {
  min-height: 100vh;
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
  background: 
    radial-gradient(circle at 20% 80%, rgba(95, 111, 85, 0.03) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(190, 205, 163, 0.04) 0%, transparent 50%),
    radial-gradient(circle at 40% 40%, rgba(143, 139, 130, 0.02) 0%, transparent 50%);
  pointer-events: none;
  z-index: 0;
}

/* Mobile First Container */
.mobile-container {
  padding: 1rem;
  padding-bottom: 6rem;
  position: relative;
  z-index: 1;
}

/* Favorites List - Mobile First */
.favorites-list {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin-bottom: 2rem;
}

/* Tablet and Desktop */
@media (min-width: 768px) {
  .mobile-container {
    padding: 2rem;
    max-width: 768px;
    margin: 0 auto;
  }
  
  .favorites-list {
    gap: 1rem;
    margin-bottom: 1.5rem;
  }
}

@media (min-width: 1024px) {
  .mobile-container {
    max-width: 1024px;
  }
}
</style>