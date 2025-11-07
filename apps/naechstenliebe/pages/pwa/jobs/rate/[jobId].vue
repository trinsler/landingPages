<template>
  <div class="rating-container">
    <!-- Header Component -->
    <AppHeader 
      :title="job ? `Bewerte ${job.partnerName}` : 'Bewertung'"
      current-role="unified"
      :request-count="0"
      @open-requests="() => navigateTo('/pwa')"
      @open-profile="() => navigateTo('/pwa/shared/profile')"
      @open-news="() => navigateTo('/pwa/shared/news')"
      @toggle-role="() => navigateTo('/pwa')"
    />
    
    <div v-if="job" class="mobile-container">
      
      <!-- Job Info Header -->
      <div class="rating-header-card">
        <div class="partner-info">
          <div class="partner-avatar">
            <img :src="job.partnerAvatar || '/icons/verschiedeneMenschen.svg'" :alt="job.partnerName" class="partner-avatar-img">
          </div>
          <div class="partner-details">
            <h2 class="partner-name">{{ job.partnerName }}</h2>
            <div class="job-context">{{ job.title }}</div>
            <div class="rating-subtitle">Wie war deine Erfahrung?</div>
          </div>
        </div>
      </div>

      <!-- Rating Form -->
      <div class="rating-form-card">
        <h3 class="section-title">Bewertung abgeben</h3>
        
        <!-- Star Rating -->
        <div class="star-rating-section">
          <label class="rating-label">Sterne-Bewertung *</label>
          <div class="star-rating">
            <button 
              v-for="star in 5" 
              :key="star"
              @click="setRating(star)"
              @mouseenter="hoveredRating = star"
              @mouseleave="hoveredRating = 0"
              class="star-button"
              :class="{ 
                'star-active': star <= rating, 
                'star-hovered': star <= hoveredRating && star > rating 
              }"
              type="button"
            >
              <svg class="star-icon" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </button>
          </div>
          <div class="rating-text">{{ getRatingText(rating) }}</div>
        </div>

        <!-- Important Questions -->
        <div class="questions-section">
          <div class="question-item">
            <label class="question-label">Ist {{ job.partnerName }} erschienen? *</label>
            <div class="toggle-buttons">
              <button 
                @click="showedUp = true" 
                :class="{ 'toggle-active': showedUp === true }"
                class="toggle-button toggle-yes"
                type="button"
              >
                <svg class="toggle-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                Ja
              </button>
              <button 
                @click="showedUp = false" 
                :class="{ 'toggle-active': showedUp === false }"
                class="toggle-button toggle-no"
                type="button"
              >
                <svg class="toggle-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
                Nein
              </button>
            </div>
          </div>

          <div class="question-item">
            <label class="question-label">Würdest du {{ job.partnerName }} weiterempfehlen? *</label>
            <div class="toggle-buttons">
              <button 
                @click="recommend = true" 
                :class="{ 'toggle-active': recommend === true }"
                class="toggle-button toggle-yes"
                type="button"
              >
                <svg class="toggle-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                Ja
              </button>
              <button 
                @click="recommend = false" 
                :class="{ 'toggle-active': recommend === false }"
                class="toggle-button toggle-no"
                type="button"
              >
                <svg class="toggle-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
                Nein
              </button>
            </div>
          </div>
        </div>

        <!-- Comment Section -->
        <div class="comment-section">
          <label class="comment-label" for="comment">Kommentar (optional)</label>
          <textarea 
            v-model="comment"
            id="comment"
            class="comment-textarea"
            placeholder="Erzähle mehr über deine Erfahrung..."
            rows="4"
            maxlength="500"
          ></textarea>
          <div class="char-counter">{{ comment.length }}/500</div>
        </div>

        <!-- Submit Button -->
        <div class="submit-section">
          <button 
            @click="submitRating" 
            :disabled="isSubmitting || !canSubmit"
            class="submit-rating-btn"
          >
            <svg v-if="isSubmitting" class="btn-icon spinning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
            </svg>
            <svg v-else class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
            </svg>
            {{ isSubmitting ? 'Wird gespeichert...' : 'Bewertung abgeben' }}
          </button>
        </div>
      </div>

    </div>

    <!-- Loading state -->
    <div v-else class="loading-container">
      <div class="loading-spinner"></div>
      <p class="loading-text">Bewertung wird geladen...</p>
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
import { ref, computed, onMounted } from 'vue'
import AppHeader from '~/components/AppHeader.vue'
import UnifiedFooter from '~/components/pwa/unified/UnifiedFooter.vue'

definePageMeta({
  layout: false
})

// Get job ID from route
const route = useRoute()
const jobId = route.params.jobId

// Job data
const job = ref(null)

// Form state
const rating = ref(0)
const hoveredRating = ref(0)
const showedUp = ref(null)
const recommend = ref(null)
const comment = ref('')
const isSubmitting = ref(false)
const hasNotificationPermission = ref(false)

// Mock job data
const mockJobData = {
  '1': {
    id: 1,
    title: 'Einkaufen bei REWE',
    partnerName: 'Maria',
    partnerAvatar: '/icons/verschiedeneMenschen.svg',
    category: 'shopping',
    status: 'completed',
    completedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    partnerId: 'helper1',
    partnerType: 'helper'
  },
  '2': {
    id: 2,
    title: 'Begleitung zum Arzt',
    partnerName: 'Klaus',
    partnerAvatar: '/icons/verschiedeneMenschen.svg',
    category: 'companionship',
    status: 'completed',
    completedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    partnerId: 'helper2',
    partnerType: 'helper'
  },
  '3': {
    id: 3,
    title: 'Mittagessen kochen',
    partnerName: 'Anna',
    partnerAvatar: '/icons/verschiedeneMenschen.svg',
    category: 'cooking',
    status: 'completed',
    completedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    partnerId: 'helper3',
    partnerType: 'helper'
  }
}

// Computed properties
const canSubmit = computed(() => {
  return rating.value > 0 && showedUp.value !== null && recommend.value !== null
})

// Methods
const setRating = (stars) => {
  rating.value = stars
}

const getRatingText = (stars) => {
  const texts = ['', 'Sehr schlecht', 'Schlecht', 'Okay', 'Gut', 'Ausgezeichnet']
  return texts[stars] || ''
}

const requestNotificationPermission = async () => {
  if ('Notification' in window) {
    const permission = await Notification.requestPermission()
    hasNotificationPermission.value = permission === 'granted'
    return hasNotificationPermission.value
  }
  return false
}

const showPushNotification = (title, body, onClick) => {
  if ('Notification' in window && hasNotificationPermission.value) {
    const notification = new Notification(title, {
      body: body,
      icon: '/icons/app-icon.png',
      badge: '/icons/notification-badge.png',
      tag: `rating-${jobId}`
    })
    
    notification.onclick = () => {
      if (onClick) onClick()
      notification.close()
    }
    
    // Auto-close after 5 seconds
    setTimeout(() => notification.close(), 5000)
  }
}

const submitRating = async () => {
  if (!canSubmit.value) return
  
  isSubmitting.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const reviewData = {
      jobId: jobId,
      partnerId: job.value.partnerId,
      rating: rating.value,
      showed_up: showedUp.value,
      recommend: recommend.value,
      comment: comment.value,
      jobTitle: job.value.title,
      reviewed_at: new Date().toISOString()
    }
    
    console.log('Submitting rating:', reviewData)
    
    // Send notification to partner (simulated)
    showPushNotification(
      `${job.value.partnerName}, du wurdest bewertet!`,
      `${getCurrentUserName()} hat dir ${rating.value} Sterne gegeben.`,
      () => {
        // In real app: navigate to partner's profile
        window.focus()
      }
    )
    
    // Show success message
    alert('Vielen Dank für deine Bewertung!')
    
    // US-7.6: Check for badge unlocks after rating submission
    setTimeout(() => {
      checkForBadgeUnlocks('rating_submitted', {
        rating: rating.value,
        jobTitle: job.value.title,
        showedUp: showedUp.value
      })
    }, 1000)
    
    // Navigate back to jobs
    navigateTo('/pwa/jobs/my-jobs')
    
  } catch (error) {
    console.error('Error submitting rating:', error)
    alert('Fehler beim Speichern der Bewertung. Bitte versuchen Sie es erneut.')
  } finally {
    isSubmitting.value = false
  }
}

const getCurrentUserName = () => {
  // In real app, get from auth state
  return 'Max'
}

// US-7.6: Badge Unlock System for Rating Page
const checkForBadgeUnlocks = async (trigger, data) => {
  try {
    // Simulate API call to check for new badge unlocks
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Mock badge unlock logic based on trigger
    const unlockedBadges = []
    
    if (trigger === 'rating_submitted') {
      // Check for rating-related badges
      if (data.rating === 5) {
        unlockedBadges.push({
          id: Date.now(),
          name: 'Perfekte Bewertung',
          description: 'Du hast eine 5-Sterne-Bewertung erhalten!',
          type: 'rating',
          rarity: 'common',
          xpReward: 20,
          icon: '⭐'
        })
      }
      
      // Check for consistency badges
      if (Math.random() > 0.85) {
        unlockedBadges.push({
          id: Date.now() + 1,
          name: 'Kommunikations-Profi',
          description: 'Du hast eine detaillierte Bewertung abgegeben!',
          type: 'rating',
          rarity: 'rare',
          xpReward: 40,
          icon: '💬'
        })
      }
    }
    
    // Show unlock notifications for each badge
    unlockedBadges.forEach(badge => {
      showPushNotification(
        `🏆 Auszeichnung freigeschaltet: ${badge.name}!`,
        `${badge.description} +${badge.xpReward} XP`,
        () => {
          // Navigate to badges page
          navigateTo('/pwa/profile/badges')
        }
      )
      
      // Also create in-app notification
      setTimeout(() => {
        alert(`🎉 Glückwunsch! Du hast die Auszeichnung "${badge.name}" freigeschaltet!\n\n${badge.description}\n\n+${badge.xpReward} XP`)
      }, 2000)
    })
    
    if (unlockedBadges.length > 0) {
      console.log('Badges unlocked:', unlockedBadges)
      
      // Simulate updating user stats
      const totalXPGained = unlockedBadges.reduce((sum, badge) => sum + badge.xpReward, 0)
      console.log(`Total XP gained: ${totalXPGained}`)
    }
    
  } catch (error) {
    console.error('Error checking badge unlocks:', error)
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

// Initialize on mount
onMounted(async () => {
  // Request notification permission
  await requestNotificationPermission()
  
  // Load job data
  job.value = mockJobData[jobId] || null
  
  if (!job.value) {
    alert('Bewertung nicht gefunden')
    navigateTo('/pwa/jobs/my-jobs')
  }
})
</script>

<style scoped>
/* Mobile First Design for Rating */
.rating-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  position: relative;
}

.rating-container::before {
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

/* Rating Header */
.rating-header-card {
  background: white;
  border-radius: 20px;
  padding: 2rem 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  text-align: center;
}

.partner-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.partner-avatar {
  width: 5rem;
  height: 5rem;
  background: #BECDA3;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.partner-avatar-img {
  width: 2.5rem;
  height: 2.5rem;
}

.partner-details {
  text-align: center;
}

.partner-name {
  color: #474747;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
}

.job-context {
  color: #6b7280;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
}

.rating-subtitle {
  color: #5F6F55;
  font-size: 1.125rem;
  font-weight: 500;
  margin: 0;
}

/* Rating Form */
.rating-form-card {
  background: white;
  border-radius: 20px;
  padding: 2rem 1.5rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.section-title {
  color: #474747;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 2rem 0;
  text-align: center;
}

/* Star Rating */
.star-rating-section {
  margin-bottom: 2rem;
  text-align: center;
}

.rating-label {
  display: block;
  color: #474747;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.star-rating {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.star-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  transition: all 0.2s ease;
}

.star-icon {
  width: 3rem;
  height: 3rem;
  color: #e5e7eb;
  transition: all 0.2s ease;
}

.star-button:hover .star-icon {
  transform: scale(1.1);
}

.star-active .star-icon {
  color: #fbbf24;
}

.star-hovered .star-icon {
  color: #fde68a;
}

.rating-text {
  color: #6b7280;
  font-size: 1rem;
  font-weight: 500;
}

/* Questions Section */
.questions-section {
  margin-bottom: 2rem;
}

.question-item {
  margin-bottom: 1.5rem;
}

.question-label {
  display: block;
  color: #474747;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
}

.toggle-buttons {
  display: flex;
  gap: 1rem;
}

.toggle-button {
  flex: 1;
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
}

.toggle-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.toggle-active.toggle-yes {
  background: #22c55e;
  border-color: #22c55e;
  color: white;
}

.toggle-active.toggle-no {
  background: #ef4444;
  border-color: #ef4444;
  color: white;
}

.toggle-icon {
  width: 1.25rem;
  height: 1.25rem;
}

/* Comment Section */
.comment-section {
  margin-bottom: 2rem;
}

.comment-label {
  display: block;
  color: #474747;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
}

.comment-textarea {
  width: 100%;
  padding: 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 1rem;
  font-family: inherit;
  resize: vertical;
  min-height: 100px;
  line-height: 1.5;
  transition: border-color 0.2s ease;
  background: white;
}

.comment-textarea:focus {
  outline: none;
  border-color: #5F6F55;
  box-shadow: 0 0 0 3px rgba(95, 111, 85, 0.1);
}

.comment-textarea::placeholder {
  color: #9ca3af;
}

.char-counter {
  color: #6b7280;
  font-size: 0.875rem;
  text-align: right;
  margin-top: 0.25rem;
}

/* Submit Section */
.submit-section {
  text-align: center;
}

.submit-rating-btn {
  background: #5F6F55;
  color: white;
  border: none;
  border-radius: 16px;
  padding: 1rem 3rem;
  font-size: 1.125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  min-width: 250px;
}

.submit-rating-btn:hover:not(:disabled) {
  background: #4a5c44;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(95, 111, 85, 0.3);
}

.submit-rating-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.btn-icon {
  width: 1.25rem;
  height: 1.25rem;
}

.spinning {
  animation: spin 1s linear infinite;
}

/* Tablet Optimizations */
@media (min-width: 768px) {
  .mobile-container {
    padding: 2rem;
    max-width: 768px;
    margin: 0 auto;
  }
  
  .rating-header-card,
  .rating-form-card {
    padding: 2.5rem;
  }
  
  .star-icon {
    width: 3.5rem;
    height: 3.5rem;
  }
  
  .toggle-button {
    padding: 1.25rem;
    font-size: 1.125rem;
  }
}

/* Desktop Optimizations */
@media (min-width: 1024px) {
  .mobile-container {
    max-width: 800px;
  }
}
</style>