<template>
  <div class="section-card stats-section">

    <!-- Verdienst Details Button für alle Nutzer -->
    <button @click="$emit('goToEarnings')" class="earnings-detail-btn">
      <div class="earnings-btn-content">
        <svg class="earnings-btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
        </svg>
        <span class="earnings-btn-text">Detaillierte Verdienst-Übersicht anzeigen</span>
      </div>
      <svg class="earnings-btn-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
      </svg>
    </button>

    <!-- Helfer-spezifische Kategorien & Umkreis -->
    <div v-if="currentRole === 'helper' && userProfile.helperCategories" class="helper-info">
      <h4 class="helper-info-title">Meine Kategorien</h4>
      <div class="categories-list">
        <span v-for="category in userProfile.helperCategories" :key="category" class="category-badge">
          {{ getCategoryName(category) }}
        </span>
      </div>
      
      <div class="helper-radius">
        <svg class="radius-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
        </svg>
        <span class="radius-text">Arbeite im Umkreis von {{ userProfile.helperRadius || 5 }} km</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  userProfile: {
    type: Object,
    required: true
  },
  currentRole: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['goToEarnings'])


const getCategoryName = (category) => {
  const categoryNames = {
    'shopping': '🛒 Einkaufen',
    'gardening': '🌿 Garten',
    'cooking': '🍳 Kochen',
    'cleaning': '🧹 Putzen',
    'companionship': '👥 Gesellschaft',
    'childcare': '👶 Kinderbetreuung',
    'transportation': '🚗 Transport',
    'other': '📦 Sonstiges'
  }
  return categoryNames[category] || category
}
</script>

<style scoped>
/* Section Cards */
.section-card {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 24px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.section-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}


/* Earnings Detail Button */
.earnings-detail-btn {
  background: linear-gradient(135deg, #5F6F55, #4a5c44);
  color: white;
  border: none;
  border-radius: 16px;
  padding: 1.25rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 12px rgba(95, 111, 85, 0.3);
}

.earnings-detail-btn:hover {
  background: linear-gradient(135deg, #4a5c44, #3d4d38);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(95, 111, 85, 0.4);
}

.earnings-btn-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.earnings-btn-icon {
  width: 1.5rem;
  height: 1.5rem;
  flex-shrink: 0;
}

.earnings-btn-text {
  font-size: 0.875rem;
  line-height: 1.4;
  text-align: left;
}

.earnings-btn-arrow {
  width: 1.25rem;
  height: 1.25rem;
  flex-shrink: 0;
  opacity: 0.8;
  transition: transform 0.3s ease;
}

.earnings-detail-btn:hover .earnings-btn-arrow {
  transform: translateX(2px);
}

/* Helfer-spezifische Infos */
.helper-info {
  margin-top: 1.5rem;
  padding: 1.25rem;
  background: rgba(95, 111, 85, 0.05);
  border-radius: 16px;
  border: 1px solid rgba(95, 111, 85, 0.15);
}

.helper-info-title {
  color: #374151;
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
  text-align: center;
}

.categories-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  margin-bottom: 1.25rem;
}

.category-badge {
  background: rgba(95, 111, 85, 0.1);
  color: #5F6F55;
  padding: 0.5rem 0.875rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  border: 1px solid rgba(95, 111, 85, 0.2);
  transition: all 0.2s ease;
}

.category-badge:hover {
  background: rgba(95, 111, 85, 0.15);
  transform: translateY(-1px);
}

.helper-radius {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: #64748b;
  font-size: 0.875rem;
  font-weight: 500;
}

.radius-icon {
  width: 1rem;
  height: 1rem;
  color: #5F6F55;
}

/* Responsive Design */
@media (max-width: 480px) {
  .earnings-btn-text {
    font-size: 0.8rem;
  }
  
  .categories-list {
    gap: 0.375rem;
  }
  
  .category-badge {
    font-size: 0.7rem;
    padding: 0.375rem 0.625rem;
  }
}

@media (min-width: 768px) {
  .stats-section {
    padding: 2rem;
  }
  
  .earnings-detail-btn {
    padding: 1.5rem 2rem;
  }
  
  .earnings-btn-text {
    font-size: 1rem;
  }
  
  .categories-list {
    gap: 0.75rem;
  }
  
  .category-badge {
    font-size: 0.875rem;
    padding: 0.625rem 1rem;
  }
}
</style>