<template>
  <div class="dashboard-container">
    <!-- Header Component -->
    <AppHeader 
      title="Aufträge" 
      current-role="unified"
      :request-count="0"
      @open-profile="() => navigateTo('/pwa/shared/profile')"
    />

    <div class="mobile-container">
      
      <!-- Info Card -->
      <TasksInfoCard @go-to-dashboard="() => navigateTo('/pwa')" />

      <!-- Quick Stats -->
      <TasksStats :helper-stats="helperStats" />

    </div>

    <!-- Minimal Footer Component -->
    <MinimalFooter 
      active-tab="helper-tasks"
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
import TasksInfoCard from '~/components/pwa/helper/tasks/TasksInfoCard.vue'
import TasksStats from '~/components/pwa/helper/tasks/TasksStats.vue'

definePageMeta({
  layout: false
})

// Max's Helfer-Profil (realistisch für 16-Jährigen)
const helperStats = ref({
  completedTasks: 23,
  avgRating: 4.8,
  level: 'Bronze',
  levelClass: 'bronze',
  nextLevel: 'Silber',
  jobsToNext: 2, // Noch 2 Jobs bis Silber (25 Jobs)
  totalEarned: 465
})

// Footer navigation handler
const handleFooterNavigation = (tab) => {
  switch(tab) {
    case 'dashboard':
      navigateTo('/pwa')
      break
    case 'helper-tasks':
      // Already on tasks page
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
    case 'seeker-favorites':
      navigateTo('/pwa/seeker/favorites')
      break
    case 'profile':
      navigateTo('/pwa/shared/profile')
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

/* Tablet Optimizations */
@media (min-width: 768px) {
  .mobile-container {
    padding: 2rem;
    max-width: 768px;
    margin: 0 auto;
  }
}

@media (min-width: 1024px) {
  .mobile-container {
    max-width: 1024px;
  }
}
</style>