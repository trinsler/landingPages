<template>
  <div class="badges-container">
    <!-- Header Component -->
    <AppHeader 
      title="Meine Auszeichnungen"
      current-role="unified"
      :request-count="0"
      @open-requests="() => navigateTo('/pwa')"
      @open-profile="() => navigateTo('/pwa/shared/profile')"
      @open-news="() => navigateTo('/pwa/shared/news')"
      @toggle-role="() => navigateTo('/pwa')"
    />
    
    <div class="mobile-container">
      
      <!-- User Stats Overview -->
      <div class="stats-overview-card">
        <div class="stats-header">
          <h2 class="stats-title">Deine Leistungen</h2>
          <div class="level-info">
            <div class="current-level">Level {{ userLevel }}</div>
            <div class="level-progress">
              <div 
                class="level-progress-fill" 
                :style="{ width: `${levelProgress}%` }"
              ></div>
            </div>
            <div class="level-text">{{ currentXP }} / {{ nextLevelXP }} XP</div>
          </div>
        </div>
        
        <div class="stats-grid">
          <div class="stat-item">
            <div class="stat-number">{{ userStats.totalJobsCompleted }}</div>
            <div class="stat-label">Jobs</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">{{ userStats.totalReviews }}</div>
            <div class="stat-label">Bewertungen</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">{{ userStats.averageRating.toFixed(1) }}</div>
            <div class="stat-label">⭐ Durchschnitt</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">{{ totalBadges }}</div>
            <div class="stat-label">Auszeichnungen</div>
          </div>
        </div>
      </div>

      <!-- Achievement Notifications -->
      <div v-if="unlockedAchievements.length > 0" class="achievement-notifications">
        <div 
          v-for="achievement in unlockedAchievements" 
          :key="achievement.id"
          class="achievement-notification"
          :class="achievement.rarity"
        >
          <div class="achievement-icon">
            <component :is="getBadgeIcon(achievement.type)" class="achievement-svg" />
          </div>
          <div class="achievement-content">
            <div class="achievement-title">{{ achievement.name }}</div>
            <div class="achievement-description">{{ achievement.description }}</div>
            <div class="achievement-reward">+{{ achievement.xpReward }} XP</div>
          </div>
          <button @click="dismissAchievement(achievement.id)" class="dismiss-btn">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Badges Categories -->
      <div class="badges-categories">
        <button 
          v-for="category in badgeCategories" 
          :key="category.id"
          @click="activeCategory = category.id"
          class="category-tab"
          :class="{ 'category-active': activeCategory === category.id }"
        >
          <div class="category-icon">{{ category.icon }}</div>
          <div class="category-name">{{ category.name }}</div>
          <div class="category-count">{{ getCategoryBadgeCount(category.id) }}</div>
        </button>
      </div>

      <!-- Badges Grid -->
      <div class="badges-section">
        <h3 class="section-title">{{ getActiveCategoryName() }}</h3>
        
        <div v-if="filteredBadges.length === 0" class="empty-state">
          <div class="empty-icon-container">
            <svg class="empty-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
            </svg>
          </div>
          <h3 class="empty-title">Keine Auszeichnungen in dieser Kategorie</h3>
          <p class="empty-subtitle">Schließe Jobs ab, um Auszeichnungen freizuschalten</p>
        </div>

        <div class="badges-grid">
          <div 
            v-for="badge in filteredBadges" 
            :key="badge.id"
            class="badge-card"
            :class="{ 
              'badge-unlocked': badge.unlocked,
              'badge-locked': !badge.unlocked,
              [badge.rarity]: badge.unlocked
            }"
          >
            <div class="badge-header">
              <div class="badge-icon-container">
                <component :is="getBadgeIcon(badge.type)" class="badge-svg" />
                <div v-if="!badge.unlocked" class="badge-lock">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                  </svg>
                </div>
              </div>
              <div class="badge-level">{{ badge.level }}</div>
            </div>
            
            <div class="badge-content">
              <div class="badge-name">{{ badge.name }}</div>
              <div class="badge-description">{{ badge.description }}</div>
              
              <div v-if="badge.unlocked" class="badge-unlock-info">
                <div class="unlock-date">Freigeschaltet: {{ formatDate(badge.unlockedAt) }}</div>
                <div class="xp-reward">+{{ badge.xpReward }} XP</div>
              </div>
              
              <div v-else class="badge-progress">
                <div class="progress-bar">
                  <div 
                    class="progress-fill" 
                    :style="{ width: `${getBadgeProgress(badge)}%` }"
                  ></div>
                </div>
                <div class="progress-text">{{ getBadgeProgressText(badge) }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- Footer Component -->
    <UnifiedFooter 
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
import UnifiedFooter from '~/components/pwa/unified/UnifiedFooter.vue'

definePageMeta({
  layout: false
})

// State
const activeCategory = ref('all')
const unlockedAchievements = ref([])

// User stats
const userStats = ref({
  totalJobsCompleted: 23,
  totalReviews: 18,
  averageRating: 4.8,
  totalXP: 1450,
  level: 5
})

// Badge categories
const badgeCategories = ref([
  { id: 'all', name: 'Alle', icon: '🏆' },
  { id: 'completion', name: 'Abschluss', icon: '✅' },
  { id: 'rating', name: 'Bewertung', icon: '⭐' },
  { id: 'reliability', name: 'Zuverlässigkeit', icon: '⏰' },
  { id: 'special', name: 'Speziell', icon: '💎' }
])

// Mock badges data
const allBadges = ref([
  // Completion Badges
  {
    id: 1,
    name: 'Erster Schritt',
    description: 'Schließe deinen ersten Job ab',
    type: 'completion',
    category: 'completion',
    level: 1,
    rarity: 'common',
    xpReward: 10,
    unlocked: true,
    unlockedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    requirement: { type: 'jobs_completed', value: 1 }
  },
  {
    id: 2,
    name: 'Aufsteigender Star',
    description: 'Schließe 10 Jobs ab',
    type: 'completion',
    category: 'completion',
    level: 2,
    rarity: 'common',
    xpReward: 50,
    unlocked: true,
    unlockedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    requirement: { type: 'jobs_completed', value: 10 }
  },
  {
    id: 3,
    name: 'Erfahrener Helfer',
    description: 'Schließe 25 Jobs ab',
    type: 'completion',
    category: 'completion',
    level: 3,
    rarity: 'rare',
    xpReward: 100,
    unlocked: true,
    unlockedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    requirement: { type: 'jobs_completed', value: 25 }
  },
  {
    id: 4,
    name: 'Meister-Helfer',
    description: 'Schließe 50 Jobs ab',
    type: 'completion',
    category: 'completion',
    level: 4,
    rarity: 'epic',
    xpReward: 250,
    unlocked: false,
    requirement: { type: 'jobs_completed', value: 50 }
  },
  {
    id: 5,
    name: 'Legendärer Helfer',
    description: 'Schließe 100 Jobs ab',
    type: 'completion',
    category: 'completion',
    level: 5,
    rarity: 'legendary',
    xpReward: 500,
    unlocked: false,
    requirement: { type: 'jobs_completed', value: 100 }
  },

  // Rating Badges
  {
    id: 6,
    name: 'Guter Eindruck',
    description: 'Erhalte eine 5-Sterne-Bewertung',
    type: 'rating',
    category: 'rating',
    level: 1,
    rarity: 'common',
    xpReward: 20,
    unlocked: true,
    unlockedAt: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString(),
    requirement: { type: 'five_star_ratings', value: 1 }
  },
  {
    id: 7,
    name: 'Top-Bewertet',
    description: 'Erhalte 10 5-Sterne-Bewertungen',
    type: 'rating',
    category: 'rating',
    level: 2,
    rarity: 'rare',
    xpReward: 75,
    unlocked: true,
    unlockedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    requirement: { type: 'five_star_ratings', value: 10 }
  },
  {
    id: 8,
    name: 'Perfekter Ruf',
    description: 'Erhalte 25 5-Sterne-Bewertungen',
    type: 'rating',
    category: 'rating',
    level: 3,
    rarity: 'epic',
    xpReward: 150,
    unlocked: false,
    requirement: { type: 'five_star_ratings', value: 25 }
  },
  {
    id: 9,
    name: '5-Sterne Helfer',
    description: 'Halte einen Durchschnitt von 4.8+ Sternen über 20 Bewertungen',
    type: 'rating',
    category: 'rating',
    level: 4,
    rarity: 'epic',
    xpReward: 200,
    unlocked: true,
    unlockedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    requirement: { type: 'high_average_rating', value: 20 }
  },

  // Reliability Badges
  {
    id: 10,
    name: 'Pünktlich wie die Uhr',
    description: 'Sei bei 10 aufeinanderfolgenden Jobs pünktlich',
    type: 'reliability',
    category: 'reliability',
    level: 2,
    rarity: 'rare',
    xpReward: 80,
    unlocked: true,
    unlockedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    requirement: { type: 'consecutive_punctual', value: 10 }
  },
  {
    id: 11,
    name: 'Verlässlichkeit',
    description: 'Habe eine No-Show-Rate von 0% über 20 Jobs',
    type: 'reliability',
    category: 'reliability',
    level: 3,
    rarity: 'rare',
    xpReward: 100,
    unlocked: true,
    unlockedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    requirement: { type: 'zero_no_show_rate', value: 20 }
  },
  {
    id: 12,
    name: 'Immer für dich da',
    description: 'Akzeptiere 95% deiner Job-Angebote',
    type: 'reliability',
    category: 'reliability',
    level: 2,
    rarity: 'common',
    xpReward: 60,
    unlocked: false,
    requirement: { type: 'high_acceptance_rate', value: 95 }
  },

  // Special Badges
  {
    id: 13,
    name: 'Wochenend Krieger',
    description: 'Schließe 5 Jobs an Wochenenden ab',
    type: 'special',
    category: 'special',
    level: 2,
    rarity: 'common',
    xpReward: 40,
    unlocked: true,
    unlockedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    requirement: { type: 'weekend_jobs', value: 5 }
  },
  {
    id: 14,
    name: 'Morgenmuffel',
    description: 'Schließe 3 Jobs vor 8 Uhr morgens ab',
    type: 'special',
    category: 'special',
    level: 2,
    rarity: 'common',
    xpReward: 30,
    unlocked: false,
    requirement: { type: 'early_morning_jobs', value: 3 }
  },
  {
    id: 15,
    name: 'Allrounder',
    description: 'Arbeite in 5 verschiedenen Kategorien',
    type: 'special',
    category: 'special',
    level: 3,
    rarity: 'rare',
    xpReward: 120,
    unlocked: true,
    unlockedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    requirement: { type: 'multiple_categories', value: 5 }
  }
])

// Computed properties
const userLevel = computed(() => userStats.value.level)
const currentXP = computed(() => userStats.value.totalXP)
const nextLevelXP = computed(() => userLevel.value * 300)
const levelProgress = computed(() => {
  const levelXP = userLevel.value * 300
  const previousLevelXP = (userLevel.value - 1) * 300
  const progress = ((currentXP.value - previousLevelXP) / (levelXP - previousLevelXP)) * 100
  return Math.min(progress, 100)
})

const totalBadges = computed(() => allBadges.value.filter(badge => badge.unlocked).length)

const filteredBadges = computed(() => {
  if (activeCategory.value === 'all') {
    return allBadges.value
  }
  return allBadges.value.filter(badge => badge.category === activeCategory.value)
})

// Methods
const getActiveCategoryName = () => {
  const category = badgeCategories.value.find(cat => cat.id === activeCategory.value)
  return category ? category.name : 'Alle'
}

const getCategoryBadgeCount = (categoryId) => {
  if (categoryId === 'all') {
    return allBadges.value.filter(badge => badge.unlocked).length
  }
  return allBadges.value.filter(badge => badge.category === categoryId && badge.unlocked).length
}

const getBadgeIcon = (badgeType) => {
  const icons = {
    'completion': 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    'rating': 'M9 4.516L7.539 0l-6.318 2.977L1.89 9.516l3.424 6.223-1.416 6.97 4.102 2.33L12 26l7.414-2.33 4.102-2.33-1.416-6.97 3.424-6.223-1.331-6.539L6.461 0 4.516 4.516z',
    'reliability': 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
    'special': 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z',
    'default': 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
  }
  
  return {
    template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${icons[badgeType] || icons.default}"/>
    </svg>`
  }
}

const getBadgeProgress = (badge) => {
  if (badge.unlocked) return 100
  
  const requirement = badge.requirement
  let current = 0
  
  switch (requirement.type) {
    case 'jobs_completed':
      current = userStats.value.totalJobsCompleted
      break
    case 'five_star_ratings':
      current = Math.floor(userStats.value.totalReviews * 0.8) // Estimate 80% are 5-star
      break
    case 'high_average_rating':
      current = userStats.value.averageRating >= 4.8 ? userStats.value.totalReviews : Math.floor(userStats.value.totalReviews * 0.7)
      break
    case 'consecutive_punctual':
      current = Math.min(userStats.value.totalJobsCompleted, 8) // Assume 8 consecutive
      break
    case 'zero_no_show_rate':
      current = userStats.value.totalJobsCompleted
      break
    case 'high_acceptance_rate':
      current = Math.floor(userStats.value.totalJobsCompleted * 0.9) // Assume 90% acceptance
      break
    case 'weekend_jobs':
      current = Math.floor(userStats.value.totalJobsCompleted * 0.3) // Assume 30% weekend
      break
    case 'early_morning_jobs':
      current = Math.floor(userStats.value.totalJobsCompleted * 0.1) // Assume 10% early morning
      break
    case 'multiple_categories':
      current = 4 // Assume 4 categories
      break
    default:
      current = 0
  }
  
  return Math.min((current / requirement.value) * 100, 100)
}

const getBadgeProgressText = (badge) => {
  if (badge.unlocked) return 'Abgeschlossen'
  
  const requirement = badge.requirement
  let current = 0
  
  switch (requirement.type) {
    case 'jobs_completed':
      current = userStats.value.totalJobsCompleted
      break
    case 'five_star_ratings':
      current = Math.floor(userStats.value.totalReviews * 0.8)
      break
    case 'high_average_rating':
      current = userStats.value.averageRating >= 4.8 ? userStats.value.totalReviews : Math.floor(userStats.value.totalReviews * 0.7)
      break
    case 'multiple_categories':
      current = 4
      break
    default:
      current = Math.floor(userStats.value.totalJobsCompleted * 0.7)
  }
  
  return `${current}/${requirement.value}`
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('de-DE', { 
    day: '2-digit', 
    month: '2-digit',
    year: 'numeric'
  })
}

const dismissAchievement = (achievementId) => {
  unlockedAchievements.value = unlockedAchievements.value.filter(a => a.id !== achievementId)
}

// Footer navigation
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
    case 'profile':
      navigateTo('/pwa/shared/profile')
      break
  }
}

// Simulate achievement unlocks
onMounted(() => {
  // Simulate some recent achievements
  setTimeout(() => {
    unlockedAchievements.value = [
      {
        id: 100,
        name: 'Erfahrener Helfer',
        description: 'Du hast 25 Jobs erfolgreich abgeschlossen!',
        type: 'completion',
        rarity: 'rare',
        xpReward: 100
      }
    ]
  }, 2000)
  
  console.log('Loading badges and achievements...')
})
</script>

<style scoped>
/* Mobile First Design for Badges */
.badges-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  position: relative;
}

.badges-container::before {
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

.mobile-container {
  padding: 1rem;
  padding-bottom: 6rem;
  position: relative;
  z-index: 1;
}

/* Stats Overview */
.stats-overview-card {
  background: white;
  border-radius: 20px;
  padding: 2rem 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.stats-header {
  text-align: center;
  margin-bottom: 1.5rem;
}

.stats-title {
  color: #474747;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
}

.level-info {
  max-width: 200px;
  margin: 0 auto;
}

.current-level {
  color: #5F6F55;
  font-size: 1.125rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 0.5rem;
}

.level-progress {
  width: 100%;
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 0.25rem;
}

.level-progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #5F6F55, #BECDA3);
  border-radius: 4px;
  transition: width 0.3s ease;
}

.level-text {
  color: #6b7280;
  font-size: 0.75rem;
  text-align: center;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.stat-item {
  text-align: center;
  padding: 1rem;
  background: rgba(95, 111, 85, 0.05);
  border-radius: 12px;
}

.stat-number {
  color: #5F6F55;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
}

.stat-label {
  color: #6b7280;
  font-size: 0.875rem;
  font-weight: 500;
}

/* Achievement Notifications */
.achievement-notifications {
  position: fixed;
  top: 80px;
  left: 1rem;
  right: 1rem;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.achievement-notification {
  background: white;
  border-radius: 16px;
  padding: 1rem;
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
  display: flex;
  align-items: center;
  gap: 1rem;
  border-left: 4px solid #5F6F55;
  animation: slideInRight 0.3s ease;
}

.achievement-notification.rare {
  border-left-color: #3b82f6;
}

.achievement-notification.epic {
  border-left-color: #8b5cf6;
}

.achievement-notification.legendary {
  border-left-color: #f59e0b;
}

.achievement-icon {
  width: 3rem;
  height: 3rem;
  background: linear-gradient(135deg, #5F6F55, #BECDA3);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.achievement-svg {
  width: 1.5rem;
  height: 1.5rem;
  color: white;
}

.achievement-content {
  flex: 1;
}

.achievement-title {
  color: #474747;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.achievement-description {
  color: #6b7280;
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
}

.achievement-reward {
  color: #5F6F55;
  font-size: 0.75rem;
  font-weight: 600;
}

.dismiss-btn {
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  color: #6b7280;
  transition: color 0.2s ease;
}

.dismiss-btn:hover {
  color: #374151;
}

.dismiss-btn svg {
  width: 1rem;
  height: 1rem;
}

@keyframes slideInRight {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

/* Badge Categories */
.badges-categories {
  display: flex;
  background: white;
  border-radius: 16px;
  padding: 0.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  overflow-x: auto;
  gap: 0.25rem;
}

.category-tab {
  flex: 1;
  min-width: 0;
  background: transparent;
  border: none;
  border-radius: 12px;
  padding: 0.75rem 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  color: #6b7280;
  font-size: 0.75rem;
  font-weight: 600;
}

.category-tab:hover {
  background: rgba(95, 111, 85, 0.1);
}

.category-tab.category-active {
  background: #5F6F55;
  color: white;
}

.category-icon {
  font-size: 1.25rem;
}

.category-name {
  font-size: 0.75rem;
}

.category-count {
  background: rgba(255, 255, 255, 0.2);
  color: inherit;
  border-radius: 10px;
  padding: 0.125rem 0.5rem;
  font-size: 0.625rem;
  font-weight: 600;
  min-width: 1.25rem;
  text-align: center;
}

/* Badges Section */
.badges-section {
  background: white;
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.section-title {
  color: #474747;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 1.5rem 0;
  text-align: center;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 3rem 2rem;
}

.empty-icon-container {
  width: 4rem;
  height: 4rem;
  background: rgba(107, 114, 128, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem auto;
}

.empty-icon {
  width: 2rem;
  height: 2rem;
  color: #6b7280;
}

.empty-title {
  color: #474747;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
}

.empty-subtitle {
  color: #6b7280;
  margin: 0;
  line-height: 1.5;
}

/* Badges Grid */
.badges-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.badge-card {
  background: rgba(255, 255, 255, 0.5);
  border-radius: 16px;
  padding: 1.5rem;
  border: 2px solid #e5e7eb;
  transition: all 0.3s ease;
  position: relative;
}

.badge-card.badge-unlocked {
  background: white;
  border-color: #5F6F55;
}

.badge-card.badge-locked {
  opacity: 0.7;
  background: #f9fafb;
}

.badge-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.1);
}

.badge-card.rare {
  border-color: #3b82f6;
}

.badge-card.epic {
  border-color: #8b5cf6;
}

.badge-card.legendary {
  border-color: #f59e0b;
  box-shadow: 0 4px 12px rgba(245, 158, 11, 0.2);
}

.badge-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.badge-icon-container {
  width: 3rem;
  height: 3rem;
  background: linear-gradient(135deg, #5F6F55, #BECDA3);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.badge-card.rare .badge-icon-container {
  background: linear-gradient(135deg, #3b82f6, #60a5fa);
}

.badge-card.epic .badge-icon-container {
  background: linear-gradient(135deg, #8b5cf6, #a78bfa);
}

.badge-card.legendary .badge-icon-container {
  background: linear-gradient(135deg, #f59e0b, #fbbf24);
}

.badge-card.badge-locked .badge-icon-container {
  background: #e5e7eb;
}

.badge-svg {
  width: 1.5rem;
  height: 1.5rem;
  color: white;
}

.badge-card.badge-locked .badge-svg {
  color: #9ca3af;
}

.badge-lock {
  position: absolute;
  bottom: -4px;
  right: -4px;
  width: 1.25rem;
  height: 1.25rem;
  background: #ef4444;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.badge-lock svg {
  width: 0.75rem;
  height: 0.75rem;
  color: white;
}

.badge-level {
  background: rgba(95, 111, 85, 0.1);
  color: #5F6F55;
  border-radius: 8px;
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 600;
}

.badge-card.badge-locked .badge-level {
  background: rgba(107, 114, 128, 0.1);
  color: #6b7280;
}

.badge-content {
  text-align: center;
}

.badge-name {
  color: #474747;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.badge-description {
  color: #6b7280;
  font-size: 0.875rem;
  line-height: 1.4;
  margin-bottom: 1rem;
}

.badge-unlock-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.unlock-date {
  color: #5F6F55;
  font-size: 0.75rem;
  font-weight: 500;
}

.xp-reward {
  color: #f59e0b;
  font-size: 0.75rem;
  font-weight: 600;
}

.badge-progress {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.progress-bar {
  width: 100%;
  height: 6px;
  background: #e5e7eb;
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #5F6F55, #BECDA3);
  border-radius: 3px;
  transition: width 0.3s ease;
}

.progress-text {
  color: #6b7280;
  font-size: 0.75rem;
  font-weight: 500;
}

/* Tablet Optimizations */
@media (min-width: 768px) {
  .mobile-container {
    padding: 2rem;
    max-width: 768px;
    margin: 0 auto;
  }
  
  .stats-overview-card,
  .badges-section {
    padding: 2.5rem;
  }
  
  .badges-grid {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
  
  .stats-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

/* Desktop Optimizations */
@media (min-width: 1024px) {
  .mobile-container {
    max-width: 1024px;
  }
  
  .badges-grid {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }
}
</style>