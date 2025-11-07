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
      
      <!-- Info Card - Mobile First -->
      <div class="info-card">
        <div class="icon-container">
          <div class="icon-circle">
            <svg class="task-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m-6 3l6-3"/>
            </svg>
          </div>
        </div>
        <h2 class="info-title">Aufträge verwalten</h2>
        <p class="info-subtitle">Neue Aufträge finden Sie auf dem Dashboard mit intelligenter Geo-Zuordnung</p>
        
        <button @click="navigateTo('/pwa')" class="dashboard-btn">
          <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5v6l3-3 3 3V5"/>
          </svg>
          Zum Dashboard
        </button>
      </div>

      <!-- Quick Stats - Mobile First -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-value">{{ helperStats.completedTasks }}</div>
          <div class="stat-label">Erledigte Aufträge</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">{{ helperStats.avgRating.toFixed(1) }}★</div>
          <div class="stat-label">Durchschnittliche Bewertung</div>
        </div>
      </div>

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
import { ref, computed } from 'vue'
import AppHeader from '~/components/AppHeader.vue'
import MinimalFooter from '~/components/pwa/unified/MinimalFooter.vue'

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

// Filter State
const selectedFilter = ref('all')

// Mock verfügbare Jobs - Max's Perspektive
const availableJobs = ref([
  {
    id: 1,
    title: 'Einkaufen bei REWE',
    category: 'shopping',
    client: 'Margarete H.',
    distance: 1.2,
    timeDescription: 'Sofort',
    duration: 2,
    payment: 20,
    priority: 'medium',
    urgent: false
  },
  {
    id: 2,
    title: 'Rasen mähen',
    category: 'gardening',
    client: 'Klaus B.',
    distance: 0.8,
    timeDescription: 'Heute 15:00',
    duration: 3,
    payment: 35,
    priority: 'high',
    urgent: true
  },
  {
    id: 3,
    title: 'Gesellschaft leisten',
    category: 'companionship',
    client: 'Anna M.',
    distance: 2.1,
    timeDescription: 'Morgen 14:00',
    duration: 2,
    payment: 25,
    priority: 'low',
    urgent: false
  },
  {
    id: 4,
    title: 'Wohnung putzen',
    category: 'cleaning',
    client: 'Familie Weber',
    distance: 3.5,
    timeDescription: 'Samstag 10:00',
    duration: 4,
    payment: 45,
    priority: 'medium',
    urgent: false
  },
  {
    id: 5,
    title: 'Einkaufen + Apotheke',
    category: 'shopping',
    client: 'Heinrich L.',
    distance: 1.8,
    timeDescription: 'Sofort',
    duration: 1.5,
    payment: 18,
    priority: 'high',
    urgent: true
  }
])

// Computed Properties
const filteredJobs = computed(() => {
  if (selectedFilter.value === 'all') {
    return availableJobs.value.sort((a, b) => {
      // Sortierung: Urgent zuerst, dann nach Entfernung
      if (a.urgent && !b.urgent) return -1
      if (!a.urgent && b.urgent) return 1
      return a.distance - b.distance
    })
  }
  return availableJobs.value.filter(job => job.category === selectedFilter.value)
})

const shoppingJobsCount = computed(() => {
  return availableJobs.value.filter(job => job.category === 'shopping').length
})

// Helper Functions
const getCategoryEmoji = (category) => {
  const emojis = {
    'shopping': '🛒',
    'gardening': '🌿',
    'cleaning': '🧹',
    'companionship': '👥',
    'transportation': '🚗',
    'cooking': '🍳'
  }
  return emojis[category] || '📦'
}

const filterByCategory = (category) => {
  selectedFilter.value = category
  // Scroll zu Jobs-Section
  document.querySelector('.jobs-section')?.scrollIntoView({ behavior: 'smooth' })
}

const applyFilter = () => {
  console.log('Filter changed to:', selectedFilter.value)
}

const applyToJob = (job) => {
  console.log('Navigate to job details:', job.id)
  // In echter App: navigateTo(`/pwa/helper/job/${job.id}`)
}

const quickApply = (job) => {
  console.log('Quick apply to job:', job.id)
  // Max's Gedanke: "Schnell bewerben bevor es weg ist!"
  alert(`Bewerbung für "${job.title}" gesendet! 🚀`)
  
  // Job aus Liste entfernen (optimistic update)
  const index = availableJobs.value.findIndex(j => j.id === job.id)
  if (index > -1) {
    availableJobs.value.splice(index, 1)
  }
}

// Footer navigation handler
const handleFooterNavigation = (tab) => {
  switch(tab) {
    case 'dashboard':
      navigateTo('/pwa')
      break
    case 'helper-tasks':
      // Already on tasks page
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
      navigateTo('/pwa/seeker/favorites')
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

/* Info Card - Mobile Optimized */
.info-card {
  background: white;
  border-radius: 20px;
  padding: 2rem 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  text-align: center;
}

.icon-container {
  margin-bottom: 1.5rem;
}

.icon-circle {
  width: 5rem;
  height: 5rem;
  background: #5F6F55;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}

.task-icon {
  width: 2.5rem;
  height: 2.5rem;
  color: white;
}

.info-title {
  color: #474747;
  font-size: 1.75rem;
  font-weight: 600;
  margin: 0 0 0.75rem 0;
  line-height: 1.3;
}

.info-subtitle {
  color: #8F8B82;
  margin: 0 0 2rem 0;
  font-size: 1.125rem;
  line-height: 1.5;
}

.dashboard-btn {
  background: #5F6F55;
  color: white;
  padding: 1.25rem 2rem;
  border-radius: 16px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  font-size: 1.125rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin: 0 auto;
  min-height: 3.5rem;
}

.dashboard-btn:hover {
  background: #4a5c44;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(95, 111, 85, 0.3);
}

.btn-icon {
  width: 1.5rem;
  height: 1.5rem;
}

/* Quick Actions - Max will schnelle Erfolge! */
.quick-actions-card {
  background: white;
  border-radius: 20px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  border: 2px solid transparent;
  transition: all 0.3s ease;
}

.action-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.25rem;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.level-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
  color: white;
}

.level-badge.bronze {
  background: linear-gradient(135deg, #cd7f32, #a0522d);
}

.level-badge.silver {
  background: linear-gradient(135deg, #c0c0c0, #a8a8a8);
}

.level-badge.gold {
  background: linear-gradient(135deg, #ffd700, #ffa500);
}

.level-icon {
  width: 1rem;
  height: 1rem;
}

.progress-info {
  color: #6b7280;
  font-size: 0.75rem;
  font-weight: 500;
}

.jobs-to-next {
  background: rgba(95, 111, 85, 0.1);
  color: #5F6F55;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-weight: 600;
}

.quick-title {
  color: #474747;
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  line-height: 1.3;
}

.quick-subtitle {
  color: #8F8B82;
  margin: 0 0 1.5rem 0;
  font-size: 1.125rem;
  line-height: 1.5;
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.dashboard-btn {
  border: none;
  border-radius: 16px;
  font-weight: 600;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  min-height: 3rem;
  padding: 1rem 1.5rem;
}

.dashboard-btn.primary {
  background: #5F6F55;
  color: white;
}

.dashboard-btn.primary:hover {
  background: #4a5c44;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(95, 111, 85, 0.3);
}

.dashboard-btn.secondary {
  background: rgba(95, 111, 85, 0.1);
  color: #5F6F55;
  border: 1px solid rgba(95, 111, 85, 0.2);
}

.dashboard-btn.secondary:hover {
  background: rgba(95, 111, 85, 0.2);
  transform: translateY(-1px);
}

.btn-icon {
  width: 1.25rem;
  height: 1.25rem;
}

/* Jobs Section - Die Jobs die Max interessieren */
.jobs-section {
  margin-bottom: 2rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  gap: 1rem;
}

.section-title {
  color: #474747;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
}

.filter-select {
  background: white;
  border: 1px solid rgba(95, 111, 85, 0.2);
  border-radius: 12px;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  color: #474747;
  cursor: pointer;
  outline: none;
  transition: all 0.2s ease;
}

.filter-select:focus {
  border-color: #5F6F55;
  box-shadow: 0 0 0 3px rgba(95, 111, 85, 0.1);
}

/* Jobs List - Mobile optimiert für schnelles Durchscrollen */
.jobs-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.job-card {
  background: white;
  border-radius: 16px;
  padding: 1.25rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  display: flex;
  gap: 1rem;
}

.job-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0,0,0,0.15);
  border-color: rgba(95, 111, 85, 0.2);
}

.job-header {
  position: relative;
  flex-shrink: 0;
}

.job-icon {
  width: 3rem;
  height: 3rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(95, 111, 85, 0.1);
}

.job-icon.shopping {
  background: rgba(34, 197, 94, 0.1);
}

.job-icon.gardening {
  background: rgba(34, 197, 94, 0.1);
}

.job-icon.cleaning {
  background: rgba(59, 130, 246, 0.1);
}

.job-icon.companionship {
  background: rgba(168, 85, 247, 0.1);
}

.job-emoji {
  font-size: 1.5rem;
}

.job-priority {
  position: absolute;
  top: -4px;
  right: -4px;
}

.priority-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid white;
}

.job-priority.high .priority-dot {
  background: #ef4444;
  animation: pulse 2s infinite;
}

.job-priority.medium .priority-dot {
  background: #f59e0b;
}

.job-priority.low .priority-dot {
  background: #10b981;
}

.job-content {
  flex: 1;
  min-width: 0;
}

.job-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #374151;
  margin: 0 0 0.5rem 0;
  line-height: 1.3;
}

.job-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  gap: 0.5rem;
}

.job-client {
  color: #5F6F55;
  font-weight: 500;
  font-size: 0.875rem;
}

.job-distance {
  color: #6b7280;
  font-size: 0.75rem;
  background: rgba(107, 114, 128, 0.1);
  padding: 0.125rem 0.5rem;
  border-radius: 8px;
}

.job-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
}

.job-time {
  color: #6b7280;
  font-size: 0.875rem;
}

.job-duration {
  color: #8b5cf6;
  font-size: 0.75rem;
  background: rgba(139, 92, 246, 0.1);
  padding: 0.125rem 0.5rem;
  border-radius: 6px;
  font-weight: 500;
}

.job-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;
}

.job-payment {
  font-size: 1.25rem;
  font-weight: 700;
  color: #22c55e;
  background: rgba(34, 197, 94, 0.1);
  padding: 0.5rem 0.75rem;
  border-radius: 12px;
  text-align: center;
  min-width: 4rem;
}

.apply-btn {
  width: 2.5rem;
  height: 2.5rem;
  border: none;
  background: #5F6F55;
  color: white;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.apply-btn:hover {
  background: #4a5c44;
  transform: translateY(-1px) scale(1.1);
  box-shadow: 0 4px 12px rgba(95, 111, 85, 0.4);
}

.apply-btn svg {
  width: 1.25rem;
  height: 1.25rem;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 3rem 1rem;
  background: white;
  border-radius: 16px;
  margin-top: 1rem;
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.empty-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #474747;
  margin: 0 0 0.5rem 0;
}

.empty-text {
  color: #8F8B82;
  margin: 0;
  font-size: 1rem;
}

/* Stats Grid - Vereinfacht */
.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.stat-card {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  transition: all 0.2s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0,0,0,0.15);
}

.stat-value {
  font-size: 2.25rem;
  font-weight: 700;
  color: #5F6F55;
  margin-bottom: 0.5rem;
  line-height: 1.2;
}

.stat-label {
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 500;
  line-height: 1.4;
}

/* Tablet Optimierungen */
@media (min-width: 768px) {
  .mobile-container {
    padding: 2rem;
    max-width: 768px;
    margin: 0 auto;
  }
  
  .action-buttons {
    flex-direction: row;
  }
  
  .quick-title {
    font-size: 1.5rem;
  }
  
  .quick-subtitle {
    font-size: 1rem;
  }
  
  .dashboard-btn {
    min-height: auto;
    font-size: 0.875rem;
  }
  
  .btn-icon {
    width: 1rem;
    height: 1rem;
  }
  
  .jobs-list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.25rem;
  }
  
  .job-card {
    flex-direction: column;
    text-align: center;
  }
  
  .job-actions {
    flex-direction: row;
    justify-content: space-between;
  }
  
  .stat-value {
    font-size: 2rem;
  }
}

@media (min-width: 1024px) {
  .mobile-container {
    max-width: 1024px;
  }
  
  .stats-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
  }
}
</style>