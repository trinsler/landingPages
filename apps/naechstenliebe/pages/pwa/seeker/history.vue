<template>
  <div style="min-height: 100vh; background: #f5f5f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;">
    <!-- Header Component -->
    <AppHeader 
      title="Auftragshistorie" 
      current-role="unified"
      :request-count="0"
      @open-requests="() => navigateTo('/pwa')"
      @open-profile="() => navigateTo('/pwa/shared/profile')"
      @open-news="() => navigateTo('/pwa/shared/news')"
      @toggle-role="() => navigateTo('/pwa')"
    />
    
    <div style="padding: 1rem; padding-bottom: 6rem;">
      
      <!-- Statistiken Header -->
      <StatisticsHeader :stats="statistics" />

      <!-- Filter -->
      <HistoryFilter 
        :active-filter="activeFilter"
        :filters="filterOptions"
        @filter-change="handleFilterChange"
      />

      <!-- Verlauf Liste -->
      <div style="display: flex; flex-direction: column; gap: 1rem; margin-bottom: 2rem;">
        <TaskHistoryGroup 
          v-for="group in taskGroups" 
          :key="group.id"
          :group="group"
          @view-details="handleViewDetails"
        />
      </div>

      <!-- Mehr laden Button -->
      <LoadMoreButton @load-more="handleLoadMore" />

      <!-- Switch to Helper Mode -->
      <SwitchToHelperMode @switch-to-helper="switchToHelperMode" />

    </div>

    <!-- Footer Component -->
    <UnifiedFooter 
      active-tab="seeker-history"
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
import UnifiedFooter from '~/components/pwa/unified/UnifiedFooter.vue'
import StatisticsHeader from '~/components/pwa/seeker/StatisticsHeader.vue'
import HistoryFilter from '~/components/pwa/seeker/HistoryFilter.vue'
import TaskHistoryGroup from '~/components/pwa/seeker/TaskHistoryGroup.vue'
import LoadMoreButton from '~/components/pwa/seeker/LoadMoreButton.vue'
import SwitchToHelperMode from '~/components/pwa/seeker/SwitchToHelperMode.vue'

definePageMeta({
  layout: false
})

const statistics = ref({
  totalTasks: 47,
  rating: 4.9,
  favorites: 8
})

const activeFilter = ref('all')

const filterOptions = ref([
  { id: 'all', label: 'Alle' },
  { id: 'week', label: 'Diese Woche' },
  { id: 'shopping', label: 'Einkaufen' },
  { id: 'cooking', label: 'Kochen' }
])

const taskGroups = ref([
  {
    id: 'today',
    title: 'Heute',
    tasks: [
      {
        id: 1,
        title: 'Einkaufen',
        type: 'shopping',
        icon: '/icons/einkaufenMadl.svg',
        helper: 'Maria H.',
        time: '15:23',
        status: 'Erledigt',
        price: 15,
        description: 'Milch, Brot und Äpfel vom Supermarkt',
        rating: '★★★★★',
        highlighted: true
      }
    ]
  },
  {
    id: 'yesterday',
    title: 'Gestern',
    tasks: [
      {
        id: 2,
        title: 'Kochen',
        type: 'cooking',
        icon: '/icons/kochen.svg',
        helper: 'Maria H.',
        time: '18:00',
        status: 'Erledigt',
        price: 25,
        description: 'Traditionelles Schnitzel mit Kartoffelsalat zubereiten',
        rating: '★★★★★',
        highlighted: false
      }
    ]
  },
  {
    id: 'thisWeek',
    title: 'Diese Woche',
    tasks: [
      {
        id: 3,
        title: 'Technik-Hilfe',
        type: 'tech',
        icon: '/icons/technikBanalcieren.svg',
        helper: 'Klaus B.',
        time: 'Montag',
        status: 'Erledigt',
        price: 30,
        description: 'Neuen Smart-TV einrichten und WLAN-Probleme lösen',
        rating: '★★★★★',
        highlighted: false
      }
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
      navigateTo('/pwa/helper/earnings')
      break
    case 'seeker-create':
      navigateTo('/pwa/seeker/task-create')
      break
    case 'seeker-history':
      // Already on history page
      break
    case 'seeker-favorites':
      navigateTo('/pwa/seeker/favorites')
      break
  }
}

const switchToHelperMode = () => {
  navigateTo('/pwa')
}

// Component event handlers
const handleFilterChange = (filterId) => {
  activeFilter.value = filterId
  // Filter logic could be implemented here
}

const handleViewDetails = (taskId) => {
  navigateTo(`/pwa/seeker/task-details/${taskId}`)
}

const handleLoadMore = () => {
  // Load more tasks logic
  console.log('Loading more tasks...')
}
</script>