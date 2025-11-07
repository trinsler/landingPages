<template>
  <div class="badge-dashboard">
    <!-- Badge Summary Card -->
    <div class="badge-summary-card">
      <div class="summary-header">
        <h3 class="summary-title">Meine Auszeichnungen</h3>
        <button @click="$emit('view-all')" class="view-all-btn">
          Alle anzeigen
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
      
      <div class="summary-stats">
        <div class="stat-item">
          <div class="stat-number">{{ totalBadges }}</div>
          <div class="stat-label">Auszeichnungen</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">{{ userLevel }}</div>
          <div class="stat-label">Level</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">{{ currentXP }}</div>
          <div class="stat-label">XP</div>
        </div>
      </div>
      
      <div class="level-progress">
        <div class="progress-info">
          <span class="progress-text">Level {{ userLevel }}</span>
          <span class="progress-percent">{{ Math.round(levelProgress) }}%</span>
        </div>
        <div class="progress-bar">
          <div 
            class="progress-fill" 
            :style="{ width: `${levelProgress}%` }"
          ></div>
        </div>
        <div class="progress-label">{{ currentXP }} / {{ nextLevelXP }} XP</div>
      </div>
    </div>

    <!-- Recent Badges -->
    <div class="recent-badges-card">
      <h4 class="section-title">Kürzlich freigeschaltet</h4>
      
      <div v-if="recentBadges.length === 0" class="empty-recent">
        <div class="empty-icon">🏆</div>
        <p class="empty-text">Schließe Jobs ab, um Auszeichnungen freizuschalten</p>
      </div>
      
      <div v-else class="recent-badges-list">
        <div 
          v-for="badge in recentBadges" 
          :key="badge.id"
          class="recent-badge-item"
          :class="badge.rarity"
        >
          <div class="badge-icon">
            <component :is="getBadgeIcon(badge.type)" class="badge-svg" />
          </div>
          <div class="badge-info">
            <div class="badge-name">{{ badge.name }}</div>
            <div class="badge-date">{{ formatDate(badge.unlockedAt) }}</div>
          </div>
          <div class="badge-xp">+{{ badge.xpReward }} XP</div>
        </div>
      </div>
    </div>

    <!-- Next Badges Preview -->
    <div class="next-badges-card">
      <h4 class="section-title">Nächste Auszeichnungen</h4>
      
      <div class="next-badges-list">
        <div 
          v-for="badge in nextBadges" 
          :key="badge.id"
          class="next-badge-item"
        >
          <div class="badge-preview">
            <div class="badge-icon locked">
              <component :is="getBadgeIcon(badge.type)" class="badge-svg" />
              <div class="lock-overlay">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                </svg>
              </div>
            </div>
          </div>
          <div class="badge-info">
            <div class="badge-name">{{ badge.name }}</div>
            <div class="badge-progress">
              <div class="mini-progress-bar">
                <div 
                  class="mini-progress-fill" 
                  :style="{ width: `${getBadgeProgress(badge)}%` }"
                ></div>
              </div>
              <div class="progress-text">{{ getBadgeProgressText(badge) }}</div>
            </div>
          </div>
          <div class="badge-reward">{{ badge.xpReward }} XP</div>
        </div>
      </div>
    </div>

    <!-- Achievement Notification Preview -->
    <div v-if="showAchievementPreview" class="achievement-preview">
      <div class="achievement-animation">
        <div class="achievement-icon">
          🏆
        </div>
        <div class="achievement-text">
          <div class="achievement-title">Neue Auszeichnung!</div>
          <div class="achievement-subtitle">Tippe hier um alle zu sehen</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const emit = defineEmits(['view-all'])

// Props
const props = defineProps({
  compact: {
    type: Boolean,
    default: false
  }
})

// State
const showAchievementPreview = ref(false)

// User stats
const userStats = ref({
  totalBadges: 12,
  totalXP: 1450,
  level: 5
})

// Recent badges (mock data)
const recentBadges = ref([
  {
    id: 1,
    name: 'Erfahrener Helfer',
    type: 'completion',
    rarity: 'rare',
    xpReward: 100,
    unlockedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 2,
    name: 'Top-Bewertet',
    type: 'rating',
    rarity: 'rare',
    xpReward: 75,
    unlockedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 3,
    name: 'Pünktlich wie die Uhr',
    type: 'reliability',
    rarity: 'common',
    xpReward: 50,
    unlockedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
  }
])

// Next badges to unlock (mock data)
const nextBadges = ref([
  {
    id: 4,
    name: 'Meister-Helfer',
    type: 'completion',
    requirement: { type: 'jobs_completed', value: 50, current: 42 },
    xpReward: 250
  },
  {
    id: 5,
    name: 'Perfekter Ruf',
    type: 'rating',
    requirement: { type: 'five_star_ratings', value: 25, current: 18 },
    xpReward: 150
  },
  {
    id: 6,
    name: 'Allrounder',
    type: 'special',
    requirement: { type: 'multiple_categories', value: 5, current: 4 },
    xpReward: 120
  }
])

// Computed properties
const totalBadges = computed(() => userStats.value.totalBadges)
const userLevel = computed(() => userStats.value.level)
const currentXP = computed(() => userStats.value.totalXP)
const nextLevelXP = computed(() => userLevel.value * 300)
const levelProgress = computed(() => {
  const levelXP = userLevel.value * 300
  const previousLevelXP = (userLevel.value - 1) * 300
  const progress = ((currentXP.value - previousLevelXP) / (levelXP - previousLevelXP)) * 100
  return Math.min(progress, 100)
})

// Methods
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
  if (!badge.requirement) return 0
  const { current, value } = badge.requirement
  return Math.min((current / value) * 100, 100)
}

const getBadgeProgressText = (badge) => {
  if (!badge.requirement) return '0%'
  const { current, value } = badge.requirement
  return `${current}/${value}`
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now - date)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays === 1) return 'vor 1 Tag'
  if (diffDays < 7) return `vor ${diffDays} Tagen`
  if (diffDays < 30) return `vor ${Math.floor(diffDays / 7)} Wochen`
  return `vor ${Math.floor(diffDays / 30)} Monaten`
}

// Simulate achievement notification
onMounted(() => {
  // Show preview notification after 3 seconds
  setTimeout(() => {
    showAchievementPreview.value = true
    
    // Hide after 5 seconds
    setTimeout(() => {
      showAchievementPreview.value = false
    }, 5000)
  }, 3000)
})
</script>

<style scoped>
/* Badge Dashboard Styles */
.badge-dashboard {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Badge Summary Card */
.badge-summary-card {
  background: white;
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.summary-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.summary-title {
  color: #474747;
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0;
}

.view-all-btn {
  background: #5F6F55;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.view-all-btn:hover {
  background: #4a5c44;
}

.view-all-btn svg {
  width: 1rem;
  height: 1rem;
}

.summary-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.stat-item {
  text-align: center;
}

.stat-number {
  color: #5F6F55;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
}

.stat-label {
  color: #6b7280;
  font-size: 0.75rem;
  font-weight: 500;
}

.level-progress {
  background: rgba(95, 111, 85, 0.05);
  border-radius: 12px;
  padding: 1rem;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.progress-text {
  color: #5F6F55;
  font-size: 0.875rem;
  font-weight: 600;
}

.progress-percent {
  color: #5F6F55;
  font-size: 0.875rem;
  font-weight: 600;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #5F6F55, #BECDA3);
  border-radius: 4px;
  transition: width 0.3s ease;
}

.progress-label {
  color: #6b7280;
  font-size: 0.75rem;
  text-align: center;
}

/* Recent Badges Card */
.recent-badges-card {
  background: white;
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.section-title {
  color: #474747;
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
}

.empty-recent {
  text-align: center;
  padding: 2rem 1rem;
}

.empty-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.empty-text {
  color: #6b7280;
  font-size: 0.875rem;
  margin: 0;
}

.recent-badges-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.recent-badge-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  background: rgba(95, 111, 85, 0.05);
  border-radius: 12px;
  border-left: 3px solid #5F6F55;
}

.recent-badge-item.rare {
  border-left-color: #3b82f6;
}

.recent-badge-item.epic {
  border-left-color: #8b5cf6;
}

.recent-badge-item.legendary {
  border-left-color: #f59e0b;
}

.badge-icon {
  width: 2.5rem;
  height: 2.5rem;
  background: linear-gradient(135deg, #5F6F55, #BECDA3);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.recent-badge-item.rare .badge-icon {
  background: linear-gradient(135deg, #3b82f6, #60a5fa);
}

.recent-badge-item.epic .badge-icon {
  background: linear-gradient(135deg, #8b5cf6, #a78bfa);
}

.recent-badge-item.legendary .badge-icon {
  background: linear-gradient(135deg, #f59e0b, #fbbf24);
}

.badge-svg {
  width: 1.25rem;
  height: 1.25rem;
  color: white;
}

.badge-info {
  flex: 1;
}

.badge-name {
  color: #474747;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.badge-date {
  color: #6b7280;
  font-size: 0.75rem;
}

.badge-xp {
  color: #f59e0b;
  font-size: 0.75rem;
  font-weight: 600;
}

/* Next Badges Card */
.next-badges-card {
  background: white;
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.next-badges-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.next-badge-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  background: #f9fafb;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
}

.badge-preview {
  position: relative;
}

.badge-icon.locked {
  width: 2.5rem;
  height: 2.5rem;
  background: #e5e7eb;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.badge-svg {
  width: 1.25rem;
  height: 1.25rem;
  color: #9ca3af;
}

.lock-overlay {
  position: absolute;
  bottom: -2px;
  right: -2px;
  width: 1rem;
  height: 1rem;
  background: #ef4444;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lock-overlay svg {
  width: 0.625rem;
  height: 0.625rem;
  color: white;
}

.badge-progress {
  flex: 1;
}

.mini-progress-bar {
  width: 100%;
  height: 4px;
  background: #e5e7eb;
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 0.25rem;
}

.mini-progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #5F6F55, #BECDA3);
  border-radius: 2px;
  transition: width 0.3s ease;
}

.progress-text {
  color: #6b7280;
  font-size: 0.625rem;
}

.badge-reward {
  color: #6b7280;
  font-size: 0.75rem;
  font-weight: 600;
}

/* Achievement Preview */
.achievement-preview {
  position: relative;
  overflow: hidden;
  border-radius: 16px;
  background: linear-gradient(135deg, #5F6F55, #BECDA3);
  padding: 1rem;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.achievement-preview:hover {
  transform: translateY(-2px);
}

.achievement-animation {
  display: flex;
  align-items: center;
  gap: 1rem;
  color: white;
}

.achievement-icon {
  font-size: 2rem;
  animation: bounce 2s infinite;
}

.achievement-text {
  flex: 1;
}

.achievement-title {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.achievement-subtitle {
  font-size: 0.875rem;
  opacity: 0.9;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-5px);
  }
  60% {
    transform: translateY(-3px);
  }
}

/* Compact Mode */
.badge-dashboard[compact] .summary-stats {
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
}

.badge-dashboard[compact] .stat-number {
  font-size: 1.25rem;
}

.badge-dashboard[compact] .stat-label {
  font-size: 0.625rem;
}

.badge-dashboard[compact] .recent-badges-list,
.badge-dashboard[compact] .next-badges-list {
  gap: 0.5rem;
}

.badge-dashboard[compact] .recent-badge-item,
.badge-dashboard[compact] .next-badge-item {
  padding: 0.5rem;
}

.badge-dashboard[compact] .badge-icon {
  width: 2rem;
  height: 2rem;
}

.badge-dashboard[compact] .badge-svg {
  width: 1rem;
  height: 1rem;
}

/* Responsive Design */
@media (max-width: 480px) {
  .summary-stats {
    gap: 0.75rem;
  }
  
  .stat-number {
    font-size: 1.25rem;
  }
  
  .stat-label {
    font-size: 0.625rem;
  }
}
</style>