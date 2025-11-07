<template>
  <div class="reviews-container">
    <!-- Header Component -->
    <AppHeader 
      :title="user ? `${user.name}'s Bewertungen` : 'Bewertungen'"
      current-role="unified"
      :request-count="0"
      @open-requests="() => navigateTo('/pwa')"
      @open-profile="() => navigateTo('/pwa/shared/profile')"
      @open-news="() => navigateTo('/pwa/shared/news')"
      @toggle-role="() => navigateTo('/pwa')"
    />
    
    <div v-if="user" class="mobile-container">
      
      <!-- User Profile Header -->
      <div class="profile-header-card">
        <div class="profile-info">
          <div class="profile-avatar">
            <img :src="user.avatar || '/icons/verschiedeneMenschen.svg'" :alt="user.name" class="profile-avatar-img">
          </div>
          <div class="profile-details">
            <h2 class="profile-name">{{ user.name }}</h2>
            <div class="profile-type">{{ user.type === 'helper' ? 'Helfer' : 'Hilfesuchender' }}</div>
            <div class="profile-stats">
              <div class="stat-item">
                <span class="stat-number">{{ user.totalJobsCompleted }}</span>
                <span class="stat-label">Jobs</span>
              </div>
              <div v-if="user.averageRating" class="stat-item">
                <span class="stat-number">{{ user.averageRating.toFixed(1) }}</span>
                <span class="stat-label">⭐</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Rating Summary -->
      <div class="rating-summary-card">
        <div class="rating-display">
          <div class="rating-stars-large">
            <svg v-for="i in 5" :key="i" class="star-large" :class="{ 'star-filled': i <= Math.round(user.averageRating) }" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
          <div class="rating-info">
            <div class="rating-number">{{ user.averageRating.toFixed(1) }}</div>
            <div class="rating-count">{{ user.totalReviews }} Bewertungen</div>
          </div>
        </div>

        <!-- Rating Distribution -->
        <div class="rating-distribution">
          <div v-for="(count, rating) in ratingDistribution" :key="rating" class="rating-bar">
            <div class="rating-label">{{ rating }} ⭐</div>
            <div class="rating-progress">
              <div 
                class="rating-progress-fill" 
                :style="{ width: `${getPercentage(count)}%` }"
              ></div>
            </div>
            <div class="rating-count">{{ count }}</div>
          </div>
        </div>
      </div>

      <!-- Trust Indicators -->
      <div v-if="user.badges && user.badges.length > 0" class="badges-section">
        <div class="section-title">Auszeichnungen</div>
        <div class="badges-grid">
          <div 
            v-for="badge in user.badges" 
            :key="badge.id" 
            class="badge-item"
            :class="badge.type"
          >
            <div class="badge-icon">
              <component :is="getBadgeIcon(badge.type)" class="badge-svg" />
            </div>
            <div class="badge-text">{{ badge.name }}</div>
          </div>
        </div>
      </div>

      <!-- Reviews List -->
      <div class="reviews-section">
        <div class="section-header">
          <h3 class="section-title">Bewertungen ({{ displayedReviews.length }})</h3>
          <button 
            v-if="hasMoreReviews && displayedReviews.length < allReviews.length" 
            @click="showAllReviews = true" 
            class="show-all-btn"
          >
            Alle anzeigen
          </button>
        </div>

        <div v-if="displayedReviews.length === 0" class="empty-state">
          <div class="empty-icon-container">
            <svg class="empty-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
            </svg>
          </div>
          <h3 class="empty-title">Noch keine Bewertungen</h3>
          <p class="empty-subtitle">Wenn Jobs abgeschlossen werden, erscheinen hier die Bewertungen</p>
        </div>

        <div v-for="review in displayedReviews" :key="review.id" class="review-item">
          <div class="review-header">
            <div class="reviewer-info">
              <div class="reviewer-avatar">
                <img :src="review.reviewerAvatar || '/icons/verschiedeneMenschen.svg'" :alt="review.reviewerName" class="reviewer-avatar-img">
              </div>
              <div class="reviewer-details">
                <div class="reviewer-name">{{ getAnonymizedName(review.reviewerName) }}</div>
                <div class="review-date">{{ formatDate(review.reviewedAt) }}</div>
              </div>
            </div>
            <div class="review-rating">
              <div class="star-rating-small">
                <svg v-for="i in 5" :key="i" class="star-small" :class="{ 'star-filled': i <= review.rating }" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
            </div>
          </div>

          <div class="review-content">
            <div class="review-job">{{ review.jobTitle }}</div>
            <p v-if="review.comment" class="review-comment">{{ review.comment }}</p>
            
            <!-- Review Metadata -->
            <div class="review-metadata">
              <div v-if="review.showedUp !== undefined" class="metadata-item">
                <svg class="metadata-icon" :class="review.showedUp ? 'icon-green' : 'icon-red'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path v-if="review.showedUp" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
                <span :class="review.showedUp ? 'text-green' : 'text-red'">
                  {{ review.showedUp ? 'Ist erschienen' : 'Nicht erschienen' }}
                </span>
              </div>
              
              <div v-if="review.recommend !== undefined" class="metadata-item">
                <svg class="metadata-icon" :class="review.recommend ? 'icon-green' : 'icon-red'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path v-if="review.recommend" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                  <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                </svg>
                <span :class="review.recommend ? 'text-green' : 'text-red'">
                  {{ review.recommend ? 'Weiterempfohlen' : 'Nicht empfohlen' }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Load More Button -->
        <div v-if="hasMoreReviews && displayedReviews.length > 0 && showAllReviews" class="load-more-section">
          <button @click="loadMoreReviews" :disabled="isLoadingMore" class="load-more-btn">
            <svg v-if="!isLoadingMore" class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
            <span v-if="!isLoadingMore">Mehr laden</span>
            <span v-else>Wird geladen...</span>
          </button>
        </div>

      </div>

    </div>

    <!-- Loading state -->
    <div v-else class="loading-container">
      <div class="loading-spinner"></div>
      <p class="loading-text">Bewertungen werden geladen...</p>
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

// Get user ID from route
const route = useRoute()
const userId = route.params.userId

// State
const user = ref(null)
const showAllReviews = ref(false)
const isLoadingMore = ref(false)
const hasMoreReviews = ref(true)

// Mock user data
const mockUsers = {
  'helper1': {
    id: 'helper1',
    name: 'Anna',
    type: 'helper',
    avatar: '/icons/verschiedeneMenschen.svg',
    averageRating: 4.9,
    totalReviews: 45,
    totalJobsCompleted: 52,
    ratingDistribution: {
      5: 38,
      4: 5,
      3: 2,
      2: 0,
      1: 0
    },
    badges: [
      { id: 1, name: 'Gold-Helfer', type: 'gold' },
      { id: 2, name: 'Top-Bewertet', type: 'top-rated' },
      { id: 3, name: 'Pünktlich', type: 'punctual' }
    ]
  },
  'helper2': {
    id: 'helper2',
    name: 'Klaus',
    type: 'helper',
    avatar: '/icons/verschiedeneMenschen.svg',
    averageRating: 4.7,
    totalReviews: 32,
    totalJobsCompleted: 28,
    ratingDistribution: {
      5: 25,
      4: 5,
      3: 2,
      2: 0,
      1: 0
    },
    badges: [
      { id: 4, name: 'Silber-Helfer', type: 'silver' }
    ]
  },
  'helper3': {
    id: 'helper3',
    name: 'Maria',
    type: 'helper',
    avatar: '/icons/verschiedeneMenschen.svg',
    averageRating: 4.8,
    totalReviews: 28,
    totalJobsCompleted: 25,
    ratingDistribution: {
      5: 22,
      4: 4,
      3: 2,
      2: 0,
      1: 0
    },
    badges: [
      { id: 5, name: 'Silber-Helfer', type: 'silver' },
      { id: 6, name: 'Pünktlich', type: 'punctual' }
    ]
  }
}

// Mock reviews data
const allReviews = ref([
  {
    id: 1,
    reviewerName: 'Max Mueller',
    reviewerAvatar: '/icons/verschiedeneMenschen.svg',
    rating: 5,
    comment: 'Absolut fantastisch! Anna war sehr hilfsbereit, pünktlich und hat den Job perfekt erledigt.',
    jobTitle: 'Einkaufen bei REWE',
    showedUp: true,
    recommend: true,
    reviewedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 2,
    reviewerName: 'Lisa Schmidt',
    reviewerAvatar: '/icons/verschiedeneMenschen.svg',
    rating: 5,
    comment: 'Sehr zuverlässig und freundlich. Würde Anna jederzeit wieder buchen.',
    jobTitle: 'Begleitung zum Arzt',
    showedUp: true,
    recommend: true,
    reviewedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 3,
    reviewerName: 'Thomas Weber',
    reviewerAvatar: '/icons/verschiedeneMenschen.svg',
    rating: 5,
    comment: 'Anna hat meine Erwartungen übertroffen. Professionell und sehr engagiert!',
    jobTitle: 'Mittagessen kochen',
    showedUp: true,
    recommend: true,
    reviewedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 4,
    reviewerName: 'Sarah Bauer',
    reviewerAvatar: '/icons/verschiedeneMenschen.svg',
    rating: 4,
    comment: 'Alles gut gelaufen. Anna war pünktlich und hat alles wie besprochen gemacht.',
    jobTitle: 'Wohnung putzen',
    showedUp: true,
    recommend: true,
    reviewedAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 5,
    reviewerName: 'Michael Klein',
    reviewerAvatar: '/icons/verschiedeneMenschen.svg',
    rating: 5,
    comment: 'Exzellenter Service! Anna war sehr aufmerksam und hat sich gut um meine Pflanzen gekümmert.',
    jobTitle: 'Garten gießen',
    showedUp: true,
    recommend: true,
    reviewedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 6,
    reviewerName: 'Julia Richter',
    reviewerAvatar: '/icons/verschiedeneMenschen.svg',
    rating: 5,
    comment: 'Super nett und sehr zuverlässig. Anna war sehr hilfsbereit und freundlich.',
    jobTitle: 'Haustier sitzen',
    showedUp: true,
    recommend: true,
    reviewedAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 7,
    reviewerName: 'Peter Wolf',
    reviewerAvatar: '/icons/verschiedeneMenschen.svg',
    rating: 4,
    comment: 'Alles in Ordnung, Anna war pünktlich und hat den Job gut gemacht.',
    jobTitle: 'Fahrdienst',
    showedUp: true,
    recommend: true,
    reviewedAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 8,
    reviewerName: 'Susanne Meier',
    reviewerAvatar: '/icons/verschiedeneMenschen.svg',
    rating: 5,
    comment: 'Anna ist eine fantastische Helferin! Sehr zuverlässig und immer freundlich.',
    jobTitle: 'Einkauf in der Apotheke',
    showedUp: true,
    recommend: true,
    reviewedAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString()
  }
])

const reviews = ref([...allReviews.value])

// Rating distribution for chart
const ratingDistribution = computed(() => {
  if (!user.value) return []
  const distribution = []
  for (let i = 5; i >= 1; i--) {
    distribution.push(user.value.ratingDistribution[i] || 0)
  }
  return distribution
})

// Displayed reviews (first 10, or all if showAllReviews is true)
const displayedReviews = computed(() => {
  if (showAllReviews.value) {
    return reviews.value
  }
  return reviews.value.slice(0, 10)
})

// Methods
const getPercentage = (count) => {
  const total = user.value?.totalReviews || 0
  return total > 0 ? Math.round((count / total) * 100) : 0
}

const getAnonymizedName = (fullName) => {
  const parts = fullName.split(' ')
  if (parts.length >= 2) {
    return `${parts[0]} ${parts[1].charAt(0)}.`
  }
  return parts[0]
}

const getBadgeIcon = (badgeType) => {
  const icons = {
    'bronze': 'M19.818 9.14l-2.364-7.272a8.001 8.001 0 00-15.908 0l-2.364 7.272L12 22.36l7.818-16.22z',
    'silver': 'M19.818 9.14l-2.364-7.272a8.001 8.001 0 00-15.908 0l-2.364 7.272L12 22.36l7.818-16.22z',
    'gold': 'M9 4.516L7.539 0l-6.318 2.977L1.89 9.516l3.424 6.223-1.416 6.97 4.102 2.33L12 26l7.414-2.33 4.102-2.33-1.416-6.97 3.424-6.223-1.331-6.539L6.461 0 4.516 4.516z',
    'top-rated': 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    'punctual': 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
    'verified': 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
  }
  
  return {
    template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${icons[badgeType] || icons.gold}"/>
    </svg>`
  }
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now - date)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays === 1) return 'vor 1 Tag'
  if (diffDays < 7) return `vor ${diffDays} Tagen`
  if (diffDays < 30) return `vor ${Math.floor(diffDays / 7)} Wochen`
  if (diffDays < 365) return `vor ${Math.floor(diffDays / 30)} Monaten`
  return `vor ${Math.floor(diffDays / 365)} Jahren`
}

const loadMoreReviews = async () => {
  isLoadingMore.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // In real app, load more reviews from API
    // For demo, we'll just set hasMoreReviews to false
    hasMoreReviews.value = false
    
  } catch (error) {
    console.error('Error loading more reviews:', error)
  } finally {
    isLoadingMore.value = false
  }
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

onMounted(() => {
  // Load user data
  user.value = mockUsers[userId] || null
  
  if (!user.value) {
    alert('Benutzer nicht gefunden')
    navigateTo('/pwa')
  }
  
  // Load reviews for this user
  console.log(`Loading reviews for user ${userId}...`)
})
</script>

<style scoped>
/* Mobile First Design for Reviews */
.reviews-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  position: relative;
}

.reviews-container::before {
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

/* Loading State */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  padding: 2rem;
}

.loading-spinner {
  width: 3rem;
  height: 3rem;
  border: 3px solid rgba(95, 111, 85, 0.1);
  border-top: 3px solid #5F6F55;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.loading-text {
  color: #6b7280;
  font-size: 1rem;
  margin: 0;
}

/* Profile Header */
.profile-header-card {
  background: white;
  border-radius: 20px;
  padding: 2rem 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  text-align: center;
}

.profile-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.profile-avatar {
  width: 5rem;
  height: 5rem;
  background: #BECDA3;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.profile-avatar-img {
  width: 2.5rem;
  height: 2.5rem;
}

.profile-details {
  text-align: center;
}

.profile-name {
  color: #474747;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
}

.profile-type {
  color: #6b7280;
  font-size: 0.875rem;
  margin-bottom: 0.75rem;
}

.profile-stats {
  display: flex;
  justify-content: center;
  gap: 2rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.stat-number {
  color: #474747;
  font-size: 1.25rem;
  font-weight: 700;
}

.stat-label {
  color: #6b7280;
  font-size: 0.875rem;
  font-weight: 500;
}

/* Rating Summary */
.rating-summary-card {
  background: white;
  border-radius: 20px;
  padding: 2rem 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  text-align: center;
}

.rating-display {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.rating-stars-large {
  display: flex;
  gap: 0.25rem;
}

.star-large {
  width: 2.5rem;
  height: 2.5rem;
  color: #e5e7eb;
}

.star-filled {
  color: #fbbf24;
}

.rating-info {
  text-align: left;
}

.rating-number {
  font-size: 2.5rem;
  font-weight: 700;
  color: #474747;
  line-height: 1;
  margin-bottom: 0.25rem;
}

.rating-count {
  color: #6b7280;
  font-size: 1rem;
  font-weight: 500;
}

/* Rating Distribution */
.rating-distribution {
  max-width: 300px;
  margin: 0 auto;
}

.rating-bar {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.rating-label {
  color: #6b7280;
  font-size: 0.875rem;
  font-weight: 500;
  width: 2rem;
  text-align: right;
}

.rating-progress {
  flex: 1;
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
}

.rating-progress-fill {
  height: 100%;
  background: #fbbf24;
  border-radius: 4px;
  transition: width 0.3s ease;
}

.rating-count {
  color: #6b7280;
  font-size: 0.875rem;
  font-weight: 500;
  width: 2rem;
  text-align: left;
}

/* Badges Section */
.badges-section {
  background: white;
  border-radius: 20px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.section-title {
  color: #474747;
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
}

.badges-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
}

.badge-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.badge-item:hover {
  transform: translateY(-2px);
}

.badge-item.bronze {
  background: linear-gradient(135deg, #cd7f32, #b87032);
  color: white;
}

.badge-item.silver {
  background: linear-gradient(135deg, #c0c0c0, #a8a8a8);
  color: white;
}

.badge-item.gold {
  background: linear-gradient(135deg, #ffd700, #ffed4e);
  color: #8b6914;
  box-shadow: 0 4px 12px rgba(255, 215, 0, 0.3);
}

.badge-item.top-rated,
.badge-item.punctual,
.badge-item.verified {
  background: #5F6F55;
  color: white;
}

.badge-icon {
  width: 2rem;
  height: 2rem;
}

.badge-svg {
  width: 100%;
  height: 100%;
}

.badge-text {
  font-size: 0.75rem;
  font-weight: 600;
  text-align: center;
}

/* Reviews Section */
.reviews-section {
  background: white;
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.show-all-btn {
  background: #5F6F55;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.show-all-btn:hover {
  background: #4a5c44;
}

/* Empty State */
.empty-state {
  background: white;
  border-radius: 20px;
  padding: 3rem 2rem;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
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

/* Review Items */
.review-item {
  background: rgba(255, 255, 255, 0.5);
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  border: 1px solid rgba(229, 231, 235, 0.3);
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.reviewer-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.reviewer-avatar {
  width: 2.5rem;
  height: 2.5rem;
  background: #BECDA3;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.reviewer-avatar-img {
  width: 1.25rem;
  height: 1.25rem;
}

.reviewer-details {
  flex: 1;
}

.reviewer-name {
  color: #474747;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.review-date {
  color: #6b7280;
  font-size: 0.75rem;
}

.review-rating {
  text-align: right;
}

.star-rating-small {
  display: flex;
  gap: 0.125rem;
}

.star-small {
  width: 1rem;
  height: 1rem;
  color: #e5e7eb;
}

.review-content {
  margin-bottom: 1rem;
}

.review-job {
  color: #5F6F55;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.review-comment {
  color: #374151;
  font-size: 0.875rem;
  line-height: 1.5;
  margin: 0;
}

.review-metadata {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.metadata-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.metadata-icon {
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
}

.icon-green {
  color: #22c55e;
}

.icon-red {
  color: #ef4444;
}

.text-green {
  color: #22c55e;
  font-size: 0.75rem;
  font-weight: 500;
}

.text-red {
  color: #ef4444;
  font-size: 0.75rem;
  font-weight: 500;
}

/* Load More */
.load-more-section {
  text-align: center;
  margin-top: 1.5rem;
}

.load-more-btn {
  background: rgba(95, 111, 85, 0.1);
  color: #5F6F55;
  border: 1px solid rgba(95, 111, 85, 0.2);
  border-radius: 12px;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
}

.load-more-btn:hover:not(:disabled) {
  background: rgba(95, 111, 85, 0.2);
  transform: translateY(-1px);
}

.load-more-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-icon {
  width: 1rem;
  height: 1rem;
}

/* Tablet Optimizations */
@media (min-width: 768px) {
  .mobile-container {
    padding: 2rem;
    max-width: 768px;
    margin: 0 auto;
  }
  
  .profile-header-card,
  .rating-summary-card,
  .badges-section,
  .reviews-section {
    padding: 2.5rem;
  }
  
  .rating-stars-large {
    gap: 0.5rem;
  }
  
  .star-large {
    width: 3rem;
    height: 3rem;
  }
  
  .badges-grid {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }
}

/* Desktop Optimizations */
@media (min-width: 1024px) {
  .mobile-container {
    max-width: 1024px;
  }
}
</style>