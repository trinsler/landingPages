<template>
  <div class="my-reviews-container">
    <!-- Header Component -->
    <AppHeader 
      title="Meine Bewertungen"
      current-role="unified"
      :request-count="0"
      @open-requests="() => navigateTo('/pwa')"
      @open-profile="() => navigateTo('/pwa/shared/profile')"
      @open-news="() => navigateTo('/pwa/shared/news')"
      @toggle-role="() => navigateTo('/pwa')"
    />
    
    <div class="mobile-container">
      
      <!-- Rating Summary Header -->
      <div class="rating-summary-card">
        <div class="rating-display">
          <div class="rating-stars-large">
            <svg v-for="i in 5" :key="i" class="star-large" :class="{ 'star-filled': i <= Math.round(userStats.averageRating) }" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
          <div class="rating-info">
            <div class="rating-number">{{ userStats.averageRating.toFixed(1) }}</div>
            <div class="rating-count">{{ userStats.totalRatings }} Bewertungen</div>
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

      <!-- Filter Tabs -->
      <div class="filter-tabs">
        <button 
          v-for="tab in filterTabs" 
          :key="tab.id"
          @click="activeFilter = tab.id"
          class="filter-tab"
          :class="{ 'filter-tab-active': activeFilter === tab.id }"
        >
          {{ tab.label }}
          <span v-if="tab.count > 0" class="tab-count">{{ tab.count }}</span>
        </button>
      </div>

      <!-- Reviews List -->
      <div class="reviews-list">
        <div v-if="filteredReviews.length === 0" class="empty-state">
          <div class="empty-icon-container">
            <svg class="empty-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
            </svg>
          </div>
          <h3 class="empty-title">Keine Bewertungen</h3>
          <p class="empty-subtitle">Hier erscheinen deine erhaltenen Bewertungen</p>
        </div>

        <div v-for="review in filteredReviews" :key="review.id" class="review-item">
          <div class="review-header">
            <div class="reviewer-info">
              <div class="reviewer-avatar">
                <img :src="review.reviewerAvatar || '/icons/verschiedeneMenschen.svg'" :alt="review.reviewerName" class="reviewer-avatar-img">
              </div>
              <div class="reviewer-details">
                <div class="reviewer-name">{{ review.reviewerName }}</div>
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
      </div>

      <!-- Load More Button -->
      <div v-if="hasMoreReviews && filteredReviews.length > 0" class="load-more-section">
        <button @click="loadMoreReviews" :disabled="isLoadingMore" class="load-more-btn">
          <svg v-if="!isLoadingMore" class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
          </svg>
          <span v-if="!isLoadingMore">Mehr laden</span>
          <span v-else>Wird geladen...</span>
        </button>
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
const activeFilter = ref('all')
const isLoadingMore = ref(false)
const hasMoreReviews = ref(true)

// Mock user stats
const userStats = ref({
  averageRating: 4.8,
  totalRatings: 23,
  ratingDistribution: {
    5: 18,
    4: 3,
    3: 1,
    2: 1,
    1: 0
  }
})

// Mock reviews data
const allReviews = ref([
  {
    id: 1,
    reviewerName: 'Max',
    reviewerAvatar: '/icons/verschiedeneMenschen.svg',
    rating: 5,
    comment: 'Super nett und sehr zuverlässig! Hat alles perfekt erledigt.',
    jobTitle: 'Einkaufen bei REWE',
    showedUp: true,
    recommend: true,
    reviewedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 2,
    reviewerName: 'Lisa',
    reviewerAvatar: '/icons/verschiedeneMenschen.svg',
    rating: 4,
    comment: 'Pünktlich und freundlich. Alles gut gelaufen.',
    jobTitle: 'Begleitung zum Arzt',
    showedUp: true,
    recommend: true,
    reviewedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 3,
    reviewerName: 'Thomas',
    reviewerAvatar: '/icons/verschiedeneMenschen.svg',
    rating: 5,
    comment: 'Absolut empfehlenswert! War sehr hilfsbereit und professionell.',
    jobTitle: 'Mittagessen kochen',
    showedUp: true,
    recommend: true,
    reviewedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 4,
    reviewerName: 'Anna',
    reviewerAvatar: '/icons/verschiedeneMenschen.svg',
    rating: 4,
    comment: 'Gut gemacht, alles wie besprochen.',
    jobTitle: 'Wohnung putzen',
    showedUp: true,
    recommend: true,
    reviewedAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 5,
    reviewerName: 'Klaus',
    reviewerAvatar: '/icons/verschiedeneMenschen.svg',
    rating: 5,
    comment: 'Exzellente Arbeit! Würde jederzeit wieder buchen.',
    jobTitle: 'Garten gießen',
    showedUp: true,
    recommend: true,
    reviewedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 6,
    reviewerName: 'Maria',
    reviewerAvatar: '/icons/verschiedeneMenschen.svg',
    rating: 3,
    comment: 'War in Ordnung, etwas verspätet.',
    jobTitle: 'Haustier sitzen',
    showedUp: true,
    recommend: false,
    reviewedAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 7,
    reviewerName: 'Michael',
    reviewerAvatar: '/icons/verschiedeneMenschen.svg',
    rating: 2,
    comment: 'Konnte den Termin leider nicht einhalten.',
    jobTitle: 'Fahrdienst',
    showedUp: false,
    recommend: false,
    reviewedAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString()
  }
])

const reviews = ref([...allReviews.value])

// Filter tabs
const filterTabs = computed(() => {
  const counts = {
    all: reviews.value.length,
    5: reviews.value.filter(r => r.rating === 5).length,
    4: reviews.value.filter(r => r.rating === 4).length,
    3: reviews.value.filter(r => r.rating === 3).length,
    2: reviews.value.filter(r => r.rating === 2).length,
    1: reviews.value.filter(r => r.rating === 1).length
  }
  
  return [
    { id: 'all', label: 'Alle', count: counts.all },
    { id: '5', label: '5 ⭐', count: counts[5] },
    { id: '4', label: '4 ⭐', count: counts[4] },
    { id: '3', label: '3 ⭐', count: counts[3] },
    { id: '2', label: '2 ⭐', count: counts[2] },
    { id: '1', label: '1 ⭐', count: counts[1] }
  ]
})

// Rating distribution for chart
const ratingDistribution = computed(() => {
  const distribution = []
  for (let i = 5; i >= 1; i--) {
    distribution.push(userStats.value.ratingDistribution[i] || 0)
  }
  return distribution
})

// Filtered reviews
const filteredReviews = computed(() => {
  if (activeFilter.value === 'all') {
    return reviews.value
  }
  return reviews.value.filter(review => review.rating === parseInt(activeFilter.value))
})

// Methods
const getPercentage = (count) => {
  const total = userStats.value.totalRatings
  return total > 0 ? Math.round((count / total) * 100) : 0
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
      navigateTo('/pwa')
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
  // In real app, load user stats and reviews from API
  console.log('Loading user reviews...')
})
</script>

<style scoped>
/* Mobile First Design for My Reviews */
.my-reviews-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  position: relative;
}

.my-reviews-container::before {
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

/* Filter Tabs */
.filter-tabs {
  display: flex;
  background: white;
  border-radius: 16px;
  padding: 0.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  overflow-x: auto;
  gap: 0.25rem;
}

.filter-tab {
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
  font-size: 0.875rem;
  font-weight: 600;
}

.filter-tab:hover {
  background: rgba(95, 111, 85, 0.1);
}

.filter-tab.filter-tab-active {
  background: #5F6F55;
  color: white;
}

.tab-count {
  background: rgba(255, 255, 255, 0.2);
  color: inherit;
  border-radius: 10px;
  padding: 0.125rem 0.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  min-width: 1.25rem;
  text-align: center;
}

/* Reviews List */
.reviews-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
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
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
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
  
  .rating-summary-card {
    padding: 2.5rem;
  }
  
  .rating-stars-large {
    gap: 0.5rem;
  }
  
  .star-large {
    width: 3rem;
    height: 3rem;
  }
}

/* Desktop Optimizations */
@media (min-width: 1024px) {
  .mobile-container {
    max-width: 1024px;
  }
}
</style>