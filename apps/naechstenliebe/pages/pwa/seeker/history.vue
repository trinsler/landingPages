<template>
  <div class="dashboard-container">
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
    
    <div class="mobile-container">
      
      <!-- Statistiken Header -->
      <StatisticsHeader :stats="statistics" />

      <!-- Filter -->
      <HistoryFilter 
        :active-filter="activeFilter"
        :filters="filterOptions"
        @filter-change="handleFilterChange"
      />

      <!-- Verlauf Liste - Mobile First -->
      <div class="history-list">
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
    <MinimalFooter 
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
import MinimalFooter from '~/components/pwa/unified/MinimalFooter.vue'
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
        icon: 'shopping',
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
        icon: 'cooking',
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
        icon: 'tech',
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
      navigateTo('/pwa/jobs/create/category')
      break
    case 'seeker-history':
      navigateTo('/pwa/jobs/my-jobs')
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

/* History List - Mobile First */
.history-list {
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
  
  .history-list {
    gap: 1rem;
    margin-bottom: 2rem;
  }
}

@media (min-width: 1024px) {
  .mobile-container {
    max-width: 1024px;
  }
}
</style>