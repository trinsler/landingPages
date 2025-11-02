<template>
  <div style="min-height: 100vh; background: #f5f5f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;">
    <!-- Header Component -->
    <AppHeader 
      title="Nachbarschaftshilfe"
      current-role="seeker"
      :request-count="activeTasks.length"
      @open-requests="handleRequestsClick"
      @open-profile="handleProfileClick"
      @open-news="handleNewsClick"
      @toggle-role="handleRoleToggle"
    />
    
    <div style="padding: 1rem; padding-bottom: 6rem;">
      <!-- Welcome Section -->
      <WelcomeSection />

      <!-- Primary Action -->
      <PrimaryActions 
        @create-task="createNewTask"
        @switch-to-helper="switchToHelperMode"
      />

      <!-- Active Tasks -->
      <ActiveTasks 
        :active-tasks="activeTasks"
        @view-task="viewTask"
      />

      <!-- Quick Access -->
      <QuickAccess 
        :favorite-helpers="favoriteHelpers"
        :completed-tasks="completedTasks"
        @open-favorites="openFavorites"
        @open-history="openHistory"
      />
    </div>

    <!-- Footer Component -->
    <AppFooter 
      active-tab="dashboard"
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
import WelcomeSection from '~/components/pwa/seeker/WelcomeSection.vue'
import PrimaryActions from '~/components/pwa/seeker/PrimaryActions.vue'
import ActiveTasks from '~/components/pwa/seeker/ActiveTasks.vue'
import QuickAccess from '~/components/pwa/seeker/QuickAccess.vue'

definePageMeta({
  layout: false
})

const activeTasks = ref([
  {
    id: 1,
    title: 'Einkaufen',
    type: 'shopping',
    helper: 'Maria H.',
    distance: '0.3km entfernt',
    status: 'In Bearbeitung'
  }
])

const favoriteHelpers = ref([
  { id: 1, name: 'Maria H.' },
  { id: 2, name: 'Klaus B.' }
])

const completedTasks = ref(47)

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
      // Already on dashboard
      break
    case 'tasks':
      navigateTo('/pwa/seeker/history')
      break
    case 'favorites':
      navigateTo('/pwa/seeker/favorites')
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

const createNewTask = () => {
  navigateTo('/pwa/seeker/task-create')
}

const switchToHelperMode = () => {
  navigateTo('/pwa/helper/dashboard')
}

const viewTask = (taskId) => {
  navigateTo(`/pwa/seeker/task-active`)
}

const openFavorites = () => {
  navigateTo('/pwa/seeker/favorites')
}

const openHistory = () => {
  navigateTo('/pwa/seeker/history')
}
</script>