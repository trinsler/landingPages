<template>
  <div class="seeker-favorites-view">
    <!-- Header Actions -->
    <div class="header-actions">
      <button 
        class="view-history-btn"
        @click="$emit('open-history')"
      >
        <svg class="action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <span>Verlauf anzeigen</span>
      </button>
    </div>

    <!-- Favorites Section -->
    <div class="favorites-section">
      <div class="section-header">
        <h3 class="section-title">Lieblings-Helfer</h3>
        <span class="favorites-count">{{ seekerFavorites.length }}</span>
      </div>

      <!-- Favorites List -->
      <div v-if="seekerFavorites.length > 0" class="favorites-list">
        <div 
          v-for="helper in seekerFavorites"
          :key="helper.id"
          class="helper-item"
          @click="viewHelperProfile(helper)"
        >
          <div class="helper-avatar">
            <div class="avatar-placeholder">
              {{ helper.name.charAt(0) }}
            </div>
            <div class="helper-status online">
              <div class="status-dot"></div>
            </div>
          </div>

          <div class="helper-content">
            <h4 class="helper-name">{{ helper.name }}</h4>
            <div class="helper-details">
              <span class="helper-rating">
                <svg class="star-icon" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
                {{ helper.rating || '4.8' }}
              </span>
              <span class="helper-tasks">{{ helper.completedTasks || '23' }} Aufträge</span>
            </div>
            <div class="helper-specialties">
              <span 
                v-for="specialty in (helper.specialties || ['Einkaufen', 'Transport'])"
                :key="specialty"
                class="specialty-tag"
              >
                {{ specialty }}
              </span>
            </div>
          </div>

          <div class="helper-actions">
            <button 
              class="contact-helper-btn"
              @click.stop="contactHelper(helper)"
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
              </svg>
            </button>
            <button 
              class="remove-favorite-btn"
              @click.stop="removeFavorite(helper)"
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="empty-state">
        <div class="empty-icon">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
          </svg>
        </div>
        <h4 class="empty-title">Keine Favoriten</h4>
        <p class="empty-text">Markiere Helfer als Favoriten, um sie hier schnell zu finden.</p>
        <button 
          class="empty-action-btn"
          @click="findHelpers"
        >
          Helfer finden
        </button>
      </div>
    </div>

    <!-- Quick Stats -->
    <div class="quick-stats">
      <div class="stat-card">
        <div class="stat-icon">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
        <div class="stat-content">
          <span class="stat-value">{{ completedWithFavorites }}</span>
          <span class="stat-label">Mit Favoriten erledigt</span>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
          </svg>
        </div>
        <div class="stat-content">
          <span class="stat-value">4.9</span>
          <span class="stat-label">Ø Bewertung</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  seekerFavorites: {
    type: Array,
    default: () => []
  },
  completedWithFavorites: {
    type: Number,
    default: 12
  }
})

defineEmits(['open-favorites', 'open-history'])

const viewHelperProfile = (helper) => {
  navigateTo(`/pwa/helper/profile?id=${helper.id}`)
}

const contactHelper = (helper) => {
  navigateTo(`/pwa/seeker/task-create?helperId=${helper.id}`)
}

const removeFavorite = (helper) => {
  // TODO: Implement remove from favorites
  console.log('Remove favorite:', helper)
}

const findHelpers = () => {
  // Switch to helper requests view to find new helpers
  navigateTo('/pwa')
}
</script>

<style scoped>
/* Seeker Favorites View */
.seeker-favorites-view {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* Header Actions */
.header-actions {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.view-history-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: rgba(95, 111, 85, 0.1);
  color: #5F6F55;
  border: 1px solid rgba(95, 111, 85, 0.2);
  border-radius: 12px;
  cursor: pointer;
  font-weight: 500;
  font-size: 0.875rem;
  transition: all 0.2s ease;
}

.view-history-btn:hover {
  background: rgba(95, 111, 85, 0.2);
  border-color: #5F6F55;
  transform: translateY(-1px);
}

.action-icon {
  width: 1.25rem;
  height: 1.25rem;
  flex-shrink: 0;
}

/* Favorites Section */
.favorites-section {
  background: white;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid rgba(0,0,0,0.1);
}

.section-title {
  font-size: 1rem;
  font-weight: 600;
  color: #374151;
  margin: 0;
}

.favorites-count {
  background: #5F6F55;
  color: white;
  border-radius: 50%;
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 600;
}

/* Favorites List */
.favorites-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.helper-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1rem;
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  background: white;
}

.helper-item:hover {
  border-color: #5F6F55;
  box-shadow: 0 4px 12px rgba(95, 111, 85, 0.1);
  transform: translateY(-2px);
}

.helper-avatar {
  position: relative;
  flex-shrink: 0;
}

.avatar-placeholder {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: linear-gradient(135deg, #5F6F55, #BECDA3);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1.125rem;
}

.helper-status {
  position: absolute;
  bottom: 0;
  right: 0;
  background: white;
  border-radius: 50%;
  padding: 2px;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.helper-status.online .status-dot {
  background: #10b981;
}

.helper-content {
  flex: 1;
  min-width: 0;
}

.helper-name {
  font-size: 1rem;
  font-weight: 600;
  color: #374151;
  margin: 0 0 0.25rem 0;
}

.helper-details {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.helper-rating {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: #f59e0b;
  font-size: 0.875rem;
  font-weight: 500;
}

.star-icon {
  width: 1rem;
  height: 1rem;
}

.helper-tasks {
  color: #6b7280;
  font-size: 0.875rem;
}

.helper-specialties {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.specialty-tag {
  padding: 0.25rem 0.5rem;
  background: rgba(95, 111, 85, 0.1);
  color: #5F6F55;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 500;
}

.helper-actions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex-shrink: 0;
}

.contact-helper-btn,
.remove-favorite-btn {
  width: 2.5rem;
  height: 2.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.contact-helper-btn {
  background: #5F6F55;
  color: white;
}

.contact-helper-btn:hover {
  background: #4a5544;
  transform: translateY(-1px);
}

.remove-favorite-btn {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}

.remove-favorite-btn:hover {
  background: #ef4444;
  color: white;
  transform: translateY(-1px);
}

.contact-helper-btn svg,
.remove-favorite-btn svg {
  width: 1.25rem;
  height: 1.25rem;
}

.remove-favorite-btn:hover svg {
  fill: currentColor;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 2rem 1rem;
}

.empty-icon {
  width: 3rem;
  height: 3rem;
  margin: 0 auto 1rem;
  color: #9ca3af;
}

.empty-icon svg {
  width: 100%;
  height: 100%;
}

.empty-title {
  font-size: 1rem;
  font-weight: 600;
  color: #374151;
  margin: 0 0 0.5rem 0;
}

.empty-text {
  color: #6b7280;
  font-size: 0.875rem;
  margin: 0 0 1.5rem 0;
  line-height: 1.5;
}

.empty-action-btn {
  background: #5F6F55;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.empty-action-btn:hover {
  background: #4a5544;
  transform: translateY(-1px);
}

/* Quick Stats */
.quick-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}

.stat-card {
  background: white;
  border-radius: 12px;
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.stat-icon {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 8px;
  background: rgba(95, 111, 85, 0.1);
  color: #5F6F55;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stat-icon svg {
  width: 1.25rem;
  height: 1.25rem;
}

.stat-content {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.stat-value {
  font-size: 1.25rem;
  font-weight: 600;
  color: #374151;
  line-height: 1;
}

.stat-label {
  font-size: 0.75rem;
  color: #6b7280;
  font-weight: 500;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .seeker-favorites-view {
    padding: 0.75rem;
    gap: 1rem;
  }
  
  .view-history-btn {
    padding: 0.75rem;
    font-size: 0.8rem;
  }
  
  .favorites-section {
    padding: 0.75rem;
  }
  
  .helper-item {
    padding: 0.75rem;
  }
  
  .helper-details {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }
  
  .helper-specialties {
    margin-top: 0.25rem;
  }
  
  .helper-actions {
    flex-direction: row;
  }
  
  .contact-helper-btn,
  .remove-favorite-btn {
    width: 2rem;
    height: 2rem;
  }
  
  .quick-stats {
    gap: 0.5rem;
  }
  
  .stat-card {
    padding: 0.75rem;
  }
}
</style>