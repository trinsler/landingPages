<template>
  <div class="external-profile-container">
    <!-- Header Component -->
    <AppHeader 
      :title="userProfile.name"
      current-role="unified"
      :request-count="0"
      @open-requests="() => navigateTo('/pwa')"
      @open-profile="() => navigateTo('/pwa/shared/profile')"
      @open-news="() => navigateTo('/pwa/shared/news')"
      @toggle-role="() => navigateTo('/pwa')"
    />
    
    <div class="mobile-container">
      
      <!-- Profile Header - External View -->
      <div class="profile-header">
        <div class="profile-avatar-section">
          <!-- Profilbild oder Platzhalter -->
          <div class="profile-avatar">
            <img v-if="userProfile.profilePicture" :src="userProfile.profilePicture" alt="Profilbild" class="avatar-image">
            <img v-else src="/icons/verschiedeneMenschen.svg" alt="Profil" class="avatar-placeholder">
          </div>
          
          <!-- Verifizierungs-Status Badge -->
          <div class="verification-badge" :class="{ 
            'verified': userProfile.verificationStatus === 'verified',
            'pending': userProfile.verificationStatus === 'pending',
            'rejected': userProfile.verificationStatus === 'rejected'
          }">
            <svg v-if="userProfile.verificationStatus === 'verified'" class="verification-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <svg v-else-if="userProfile.verificationStatus === 'pending'" class="verification-icon pending" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <svg v-else class="verification-icon rejected" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
            <span class="verification-text">
              {{ getVerificationText() }}
            </span>
          </div>
        </div>
        
        <!-- Name & Alter -->
        <h2 class="profile-name">{{ userProfile.name }}, {{ userProfile.age }}</h2>
        
        <!-- Stadt (NICHT volle Adresse) -->
        <p class="profile-location">{{ userProfile.city }}</p>
        
        <!-- Bewertung mit Details -->
        <div class="rating-section">
          <div class="rating-stars">
            <span class="stars" :style="{ '--rating': userProfile.rating }">★★★★★</span>
            <span class="rating-value">{{ userProfile.rating.toFixed(1) }}</span>
          </div>
          <span class="rating-count">({{ userProfile.totalRatings }} Bewertungen)</span>
        </div>

        <!-- Badges (Gold-Helfer, Organisation, etc.) -->
        <div class="badges-section">
          <!-- Helfer-Level Badge -->
          <div v-if="userProfile.helperLevel" class="badge helper-level" :class="userProfile.helperLevel.toLowerCase()">
            <svg class="badge-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3l14 9-14 9V3z"/>
            </svg>
            {{ userProfile.helperLevel }}-Helfer
          </div>
          
          <!-- Organisations-Badge -->
          <div v-if="userProfile.organization" class="badge organization">
            <svg class="badge-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
            </svg>
            {{ userProfile.organization }}
          </div>
          
          <!-- Mitglied seit -->
          <div class="badge member-since">
            <svg class="badge-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
            Mitglied seit {{ userProfile.memberSince }}
          </div>
        </div>

        <!-- Bio -->
        <div v-if="userProfile.bio" class="bio-section">
          <h4 class="bio-title">Über mich</h4>
          <p class="bio-text">{{ userProfile.bio }}</p>
        </div>

        <!-- Helfer-spezifische Kategorien -->
        <div v-if="userProfile.helperCategories && userProfile.helperCategories.length > 0" class="helper-info">
          <h4 class="helper-info-title">Kategorien</h4>
          <div class="categories-list">
            <span v-for="category in userProfile.helperCategories" :key="category" class="category-badge">
              {{ getCategoryName(category) }}
            </span>
          </div>
        </div>

        <!-- Optional: Nachricht senden Button -->
        <div v-if="showMessageButton" class="action-buttons">
          <button @click="sendMessage" class="message-btn">
            <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.955 8.955 0 01-2.707-.408l-3.005.606C6.581 20.365 6 19.7 6 19c0-.28.115-.532.308-.742l.813-3.262A8.002 8.002 0 013 12a8 8 0 018-8 8 8 0 018 8z"/>
            </svg>
            Nachricht senden
          </button>
        </div>
      </div>

      <!-- Bewertungen Section -->
      <div class="reviews-section">
        <h3 class="reviews-title">Letzte Bewertungen</h3>
        
        <div v-if="userProfile.recentReviews && userProfile.recentReviews.length > 0" class="reviews-list">
          <div v-for="review in userProfile.recentReviews" :key="review.id" class="review-card">
            <div class="review-header">
              <div class="review-avatar">
                <img src="/icons/verschiedeneMenschen.svg" alt="Kunde" class="reviewer-avatar">
              </div>
              <div class="review-info">
                <span class="reviewer-name">{{ review.anonymizedName }}</span>
                <div class="review-rating">
                  <span class="review-stars" :style="{ '--rating': review.rating }">★★★★★</span>
                </div>
              </div>
              <span class="review-date">{{ review.date }}</span>
            </div>
            
            <p class="review-text">{{ review.comment }}</p>
            
            <div class="review-task">
              <span class="task-category">{{ review.taskCategory }}</span>
            </div>
          </div>
        </div>
        
        <div v-else class="no-reviews">
          <svg class="no-reviews-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.955 8.955 0 01-2.707-.408l-3.005.606C6.581 20.365 6 19.7 6 19c0-.28.115-.532.308-.742l.813-3.262A8.002 8.002 0 013 12a8 8 0 018-8 8 8 0 018 8z"/>
          </svg>
          <p class="no-reviews-text">Noch keine Bewertungen vorhanden</p>
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

// Get userId from route params
const route = useRoute()
const userId = route.params.userId

// Check if message button should be shown (e.g., in job context)
const showMessageButton = ref(false)

// Mock user profile data - In real app, fetch based on userId
const userProfile = ref({
  id: userId,
  name: 'Maria Hoffmann',
  age: 34,
  city: 'Winnweiler',
  memberSince: 'März 2024',
  
  // Profilbild
  profilePicture: null,
  
  // Bio
  bio: 'Hallo! Ich bin Maria und helfe gerne beim Einkaufen, Kochen und bei kleineren Hausarbeiten. Bin sehr zuverlässig und freue mich über jeden Auftrag!',
  
  // Verifizierung
  verificationStatus: 'verified', // 'pending', 'verified', 'rejected'
  
  // Bewertungen
  rating: 4.8,
  totalRatings: 47,
  
  // Badges
  helperLevel: 'Gold',
  organization: 'Kirchengemeinde St. Martin',
  
  // Helfer-spezifisch
  helperCategories: ['shopping', 'cooking', 'cleaning'],
  
  // Letzte 5 Bewertungen (anonymisiert)
  recentReviews: [
    {
      id: 1,
      anonymizedName: 'Margarete S.',
      rating: 5,
      comment: 'Maria war super hilfsbereit und zuverlässig. Hat alles perfekt eingekauft und war sehr freundlich. Gerne wieder!',
      date: '2. Nov 2024',
      taskCategory: 'Einkaufen'
    },
    {
      id: 2,
      anonymizedName: 'Klaus B.',
      rating: 5,
      comment: 'Excellenter Service! Maria hat nicht nur eingekauft, sondern auch beim Verstauen geholfen. Sehr empfehlenswert.',
      date: '28. Okt 2024',
      taskCategory: 'Einkaufen'
    },
    {
      id: 3,
      anonymizedName: 'Anna K.',
      rating: 4,
      comment: 'Hat ein leckeres Mittagessen gekocht. War pünktlich und sehr nett. Nur eine kleine Portion, daher 4 Sterne.',
      date: '25. Okt 2024',
      taskCategory: 'Kochen'
    },
    {
      id: 4,
      anonymizedName: 'Helmut M.',
      rating: 5,
      comment: 'Maria hat meine Wohnung blitzblank geputzt. Sehr gründlich und sorgfältig. Bin sehr zufrieden!',
      date: '20. Okt 2024',
      taskCategory: 'Putzen'
    },
    {
      id: 5,
      anonymizedName: 'Elisabeth W.',
      rating: 5,
      comment: 'Super nette Person! Hat mir beim Einkaufen geholfen und war sehr geduldig. Danke Maria!',
      date: '15. Okt 2024',
      taskCategory: 'Einkaufen'
    }
  ]
})

// Methods
const getVerificationText = () => {
  switch(userProfile.value.verificationStatus) {
    case 'verified':
      return 'Verifiziert'
    case 'pending':
      return 'Verifizierung läuft'
    case 'rejected':
      return 'Nicht verifiziert'
    default:
      return 'Unbekannt'
  }
}

const getCategoryName = (category) => {
  const categoryNames = {
    'shopping': 'Einkaufen',
    'gardening': 'Garten',
    'cooking': 'Kochen',
    'cleaning': 'Putzen',
    'companionship': 'Gesellschaft',
    'childcare': 'Kinderbetreuung',
    'transportation': 'Transport',
    'tech': 'Technik',
    'other': 'Sonstiges'
  }
  return categoryNames[category] || category
}

const sendMessage = () => {
  // Navigate to chat with this user
  navigateTo(`/pwa/shared/chat?user=${userId}`)
}

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
      navigateTo('/pwa/seeker/task-create')
      break
    case 'seeker-history':
      navigateTo('/pwa/seeker/history')
      break
    case 'seeker-favorites':
      navigateTo('/pwa/seeker/favorites')
      break
    case 'profile':
      navigateTo('/pwa/shared/profile')
      break
  }
}

// Check if message button should be shown based on context
onMounted(() => {
  // Show message button if user came from job context
  const fromJob = route.query.fromJob
  showMessageButton.value = !!fromJob
})
</script>

<style scoped>
/* Mobile-First Design für External Profile View */
.external-profile-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  position: relative;
}

.external-profile-container::before {
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

/* Profile Header - External View */
.profile-header {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  text-align: center;
}

.profile-avatar-section {
  position: relative;
  display: inline-block;
  margin-bottom: 1.5rem;
}

.profile-avatar {
  width: 6rem;
  height: 6rem;
  background: #BECDA3;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  border: 4px solid rgba(95, 111, 85, 0.1);
  position: relative;
}

.avatar-image {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.avatar-placeholder {
  width: 3rem;
  height: 3rem;
  opacity: 0.8;
}

/* Verifizierungs-Badge */
.verification-badge {
  position: absolute;
  bottom: -0.5rem;
  right: -0.5rem;
  background: #ef4444;
  color: white;
  border-radius: 20px;
  padding: 0.25rem 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  font-weight: 600;
  border: 3px solid white;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
}

.verification-badge.verified {
  background: #22c55e;
}

.verification-badge.pending {
  background: #f59e0b;
}

.verification-badge.rejected {
  background: #ef4444;
}

.verification-icon {
  width: 1rem;
  height: 1rem;
}

.verification-icon.pending {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* Name & Grunddaten */
.profile-name {
  color: #474747;
  font-size: 1.75rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  line-height: 1.3;
}

.profile-location {
  color: #8F8B82;
  margin: 0 0 1.5rem 0;
  font-size: 1.125rem;
  font-weight: 500;
}

/* Rating Section */
.rating-section {
  margin-bottom: 1.5rem;
}

.rating-stars {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.stars {
  font-size: 1.5rem;
  color: #ddd;
  position: relative;
}

.stars::before {
  content: '★★★★★';
  position: absolute;
  top: 0;
  left: 0;
  color: #fbbf24;
  width: calc(var(--rating) / 5 * 100%);
  overflow: hidden;
}

.rating-value {
  font-size: 1.25rem;
  font-weight: 700;
  color: #474747;
  background: rgba(251, 191, 36, 0.1);
  padding: 0.25rem 0.5rem;
  border-radius: 8px;
}

.rating-count {
  color: #8F8B82;
  font-size: 1rem;
  font-weight: 500;
}

/* Badges */
.badges-section {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  align-items: center;
}

.badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
  border: 2px solid transparent;
}

.badge-icon {
  width: 1rem;
  height: 1rem;
}

.badge.helper-level {
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: white;
}

.badge.helper-level.gold {
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
}

.badge.helper-level.platin {
  background: linear-gradient(135deg, #e5e7eb, #9ca3af);
}

.badge.organization {
  background: rgba(95, 111, 85, 0.1);
  color: #5F6F55;
  border-color: rgba(95, 111, 85, 0.2);
}

.badge.member-since {
  background: rgba(190, 205, 163, 0.2);
  color: #474747;
}

/* Bio Section */
.bio-section {
  text-align: left;
  background: rgba(248, 250, 252, 0.8);
  border-radius: 12px;
  padding: 1.25rem;
  margin-bottom: 1.5rem;
}

.bio-title {
  color: #474747;
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.75rem 0;
}

.bio-text {
  color: #6b7280;
  font-size: 1rem;
  line-height: 1.6;
  margin: 0;
}

/* Helfer-spezifische Informationen */
.helper-info {
  border-top: 1px solid rgba(95, 111, 85, 0.1);
  padding-top: 1.5rem;
  margin-bottom: 1.5rem;
}

.helper-info-title {
  color: #474747;
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
  text-align: center;
}

.categories-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
}

.category-badge {
  background: rgba(95, 111, 85, 0.1);
  color: #5F6F55;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
  border: 1px solid rgba(95, 111, 85, 0.2);
}

/* Action Buttons */
.action-buttons {
  margin-top: 1.5rem;
}

.message-btn {
  background: #5F6F55;
  color: white;
  border: none;
  border-radius: 12px;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin: 0 auto;
  min-height: 3rem;
}

.message-btn:hover {
  background: #4a5c44;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(95, 111, 85, 0.3);
}

.btn-icon {
  width: 1.25rem;
  height: 1.25rem;
}

/* Reviews Section */
.reviews-section {
  background: white;
  border-radius: 20px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.reviews-title {
  color: #474747;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 1.25rem 0;
  text-align: center;
}

.reviews-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.review-card {
  background: rgba(248, 250, 252, 0.8);
  border-radius: 12px;
  padding: 1rem;
  border: 1px solid rgba(229, 231, 235, 0.5);
}

.review-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.review-avatar {
  width: 2.5rem;
  height: 2.5rem;
  background: #BECDA3;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.reviewer-avatar {
  width: 1.25rem;
  height: 1.25rem;
  opacity: 0.8;
}

.review-info {
  flex: 1;
}

.reviewer-name {
  color: #474747;
  font-size: 0.875rem;
  font-weight: 600;
  display: block;
  margin-bottom: 0.25rem;
}

.review-rating {
  display: flex;
  align-items: center;
}

.review-stars {
  font-size: 0.875rem;
  color: #ddd;
  position: relative;
}

.review-stars::before {
  content: '★★★★★';
  position: absolute;
  top: 0;
  left: 0;
  color: #fbbf24;
  width: calc(var(--rating) / 5 * 100%);
  overflow: hidden;
}

.review-date {
  color: #8F8B82;
  font-size: 0.75rem;
  font-weight: 500;
}

.review-text {
  color: #6b7280;
  font-size: 0.875rem;
  line-height: 1.5;
  margin: 0 0 0.75rem 0;
}

.review-task {
  display: flex;
  justify-content: flex-end;
}

.task-category {
  background: rgba(95, 111, 85, 0.1);
  color: #5F6F55;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
}

/* No Reviews State */
.no-reviews {
  text-align: center;
  padding: 2rem;
  color: #8F8B82;
}

.no-reviews-icon {
  width: 3rem;
  height: 3rem;
  margin: 0 auto 1rem auto;
  opacity: 0.5;
}

.no-reviews-text {
  font-size: 1rem;
  margin: 0;
}

/* Tablet Optimizations */
@media (min-width: 768px) {
  .mobile-container {
    padding: 2rem;
    max-width: 768px;
    margin: 0 auto;
  }
  
  .badges-section {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .profile-name {
    font-size: 1.5rem;
  }
  
  .review-card {
    padding: 1.25rem;
  }
}

/* Desktop Optimizations */
@media (min-width: 1024px) {
  .mobile-container {
    max-width: 1024px;
  }
  
  .profile-header {
    max-width: 600px;
    margin: 0 auto 1.5rem auto;
  }
  
  .reviews-section {
    max-width: 800px;
    margin: 0 auto 1.5rem auto;
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .verification-icon.pending {
    animation: none;
  }
  
  .message-btn:hover {
    transform: none;
  }
}
</style>