<template>
  <div class="category-selection-container">
    <!-- Header Component -->
    <AppHeader 
      title="Kategorie wählen"
      current-role="unified"
      :request-count="0"
      @open-requests="() => navigateTo('/pwa')"
      @open-profile="() => navigateTo('/pwa/shared/profile')"
      @open-news="() => navigateTo('/pwa/shared/news')"
      @toggle-role="() => navigateTo('/pwa')"
    />
    
    <div class="mobile-container">
      
      <!-- Header Info -->
      <div class="header-card">
        <div class="icon-container">
          <div class="icon-circle">
            <svg class="header-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
            </svg>
          </div>
        </div>
        <h2 class="header-title">Womit brauchen Sie Hilfe?</h2>
        <p class="header-subtitle">Wählen Sie die passende Kategorie für Ihren Auftrag</p>
      </div>

      <!-- Category Grid -->
      <div class="category-grid">
        <button 
          v-for="category in categories" 
          :key="category.id"
          @click="selectCategory(category)"
          class="category-card"
          :class="{ 'category-selected': selectedCategory === category.id }"
        >
          <div class="category-icon-container">
            <!-- Shopping Icon -->
            <svg v-if="category.id === 'shopping'" class="category-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5L17 18"/>
              <circle cx="9" cy="20" r="1"/>
              <circle cx="20" cy="20" r="1"/>
            </svg>
            
            <!-- Gardening Icon -->
            <svg v-else-if="category.id === 'gardening'" class="category-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.5 9a2.5 2.5 0 005 0"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11.5v3"/>
            </svg>
            
            <!-- Cooking Icon -->
            <svg v-else-if="category.id === 'cooking'" class="category-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 2v1m6-1v1"/>
            </svg>
            
            <!-- Cleaning Icon -->
            <svg v-else-if="category.id === 'cleaning'" class="category-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
            </svg>
            
            <!-- Companionship Icon -->
            <svg v-else-if="category.id === 'companionship'" class="category-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4"/>
            </svg>
            
            <!-- Childcare Icon -->
            <svg v-else-if="category.id === 'childcare'" class="category-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 16s1.5-2 4-2 4 2 4 2"/>
            </svg>
            
            <!-- Transportation Icon -->
            <svg v-else-if="category.id === 'transportation'" class="category-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM21 17a2 2 0 11-4 0 2 2 0 014 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17h10M7 17H3m4 0v-5a1 1 0 011-1h9a1 1 0 011 1v5m0 0h4m-4 0H7m14 0v2a1 1 0 01-1 1h-1a1 1 0 01-1-1v-2M7 17v2a1 1 0 01-1 1H5a1 1 0 01-1-1v-2"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 6l6 6-6 6"/>
            </svg>
            
            <!-- Other/Default Icon -->
            <svg v-else class="category-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <span class="category-name">{{ category.name }}</span>
          <p class="category-description">{{ category.description }}</p>
        </button>
      </div>

      <!-- Sonstiges Custom Category Input -->
      <div v-if="selectedCategory === 'other'" class="custom-category-section">
        <div class="form-card">
          <h3 class="form-title">Ihre eigene Kategorie</h3>
          <input 
            v-model="customCategoryName"
            type="text"
            class="custom-category-input"
            placeholder="Beschreiben Sie, womit Sie Hilfe brauchen..."
            maxlength="50"
            @input="validateCustomCategory"
          />
          <div class="char-counter">{{ customCategoryName.length }}/50</div>
          <p class="form-help">Geben Sie eine kurze Beschreibung Ihrer Anfrage ein</p>
        </div>
      </div>

      <!-- Continue Button -->
      <div class="action-section">
        <button 
          @click="continueToDetails"
          :disabled="!canContinue"
          class="continue-btn"
          :class="{ 'continue-disabled': !canContinue }"
        >
          <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
          </svg>
          Weiter zu Details
        </button>
        
        <p class="continue-help">Im nächsten Schritt geben Sie weitere Details zu Ihrem Auftrag an</p>
      </div>

    </div>

    <!-- Footer Component -->
    <MinimalFooter 
      active-tab="seeker-create"
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

// Selected category state
const selectedCategory = ref(null)
const customCategoryName = ref('')

// Available categories with descriptions (using SVG icons)
const categories = ref([
  { 
    id: 'shopping', 
    name: 'Einkaufen', 
    description: 'Lebensmittel, Apotheke, Drogerie'
  },
  { 
    id: 'gardening', 
    name: 'Gartenarbeit', 
    description: 'Gießen, Unkraut jäten, Rasenmähen'
  },
  { 
    id: 'cooking', 
    name: 'Kochen', 
    description: 'Mahlzeiten zubereiten, Backen'
  },
  { 
    id: 'cleaning', 
    name: 'Putzen', 
    description: 'Hausputz, Wäsche, Aufräumen'
  },
  { 
    id: 'companionship', 
    name: 'Gesellschaft', 
    description: 'Gespräche, Spaziergang, Vorlesen'
  },
  { 
    id: 'childcare', 
    name: 'Kinderbetreuung', 
    description: 'Babysitten, Spielen, Abholen'
  },
  { 
    id: 'transportation', 
    name: 'Fahrdienst', 
    description: 'Arzttermine, Einkauf, Ausflüge'
  },
  { 
    id: 'other', 
    name: 'Sonstiges', 
    description: 'Andere Hilfe benötigt'
  }
])


// Computed properties
const canContinue = computed(() => {
  if (selectedCategory.value === 'other') {
    return customCategoryName.value.trim().length >= 3
  }
  return selectedCategory.value !== null
})

// Methods
const selectCategory = (category) => {
  selectedCategory.value = category.id
  if (category.id !== 'other') {
    customCategoryName.value = ''
  }
}

const validateCustomCategory = () => {
  // Real-time validation for custom category
  if (customCategoryName.value.length > 50) {
    customCategoryName.value = customCategoryName.value.substring(0, 50)
  }
}

const continueToDetails = () => {
  if (!canContinue.value) return
  
  // Prepare navigation with selected category
  const categoryData = {
    categoryId: selectedCategory.value,
    categoryName: selectedCategory.value === 'other' 
      ? customCategoryName.value.trim()
      : categories.value.find(c => c.id === selectedCategory.value)?.name || ''
  }
  
  console.log('Selected category:', categoryData)
  
  // Navigate to job details with category data
  navigateTo({
    path: '/pwa/jobs/create/details',
    query: {
      category: selectedCategory.value,
      customName: selectedCategory.value === 'other' ? customCategoryName.value.trim() : undefined
    }
  })
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
      // Already on create flow
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
</script>

<style scoped>
/* Mobile First Design for Category Selection */
.category-selection-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  position: relative;
}

.category-selection-container::before {
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

/* Header Card */
.header-card {
  background: white;
  border-radius: 20px;
  padding: 2rem 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  text-align: center;
}

.icon-container {
  margin-bottom: 1rem;
}

.icon-circle {
  width: 5rem;
  height: 5rem;
  background: #BECDA3;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}

.header-icon {
  width: 2.5rem;
  height: 2.5rem;
  color: #474747;
}

.header-title {
  color: #474747;
  font-size: 1.75rem;
  font-weight: 600;
  margin: 0 0 0.75rem 0;
  line-height: 1.3;
}

.header-subtitle {
  color: #8F8B82;
  margin: 0;
  font-size: 1.125rem;
  line-height: 1.5;
}

/* Category Grid */
.category-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.category-card {
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 20px;
  padding: 1.5rem 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  min-height: 140px;
}

.category-card:hover {
  border-color: #BECDA3;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0,0,0,0.1);
}

.category-card.category-selected {
  background: #5F6F55;
  border-color: #5F6F55;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(95, 111, 85, 0.3);
}

.category-icon-container {
  width: 3rem;
  height: 3rem;
  background: rgba(190, 205, 163, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
}

.category-selected .category-icon-container {
  background: rgba(255, 255, 255, 0.2);
}

.category-selected .category-icon {
  color: white;
}

.category-icon {
  width: 1.75rem;
  height: 1.75rem;
  color: #5F6F55;
  transition: all 0.3s ease;
}

.category-name {
  font-size: 1rem;
  font-weight: 600;
  color: #474747;
  line-height: 1.2;
}

.category-selected .category-name {
  color: white;
}

.category-description {
  font-size: 0.875rem;
  color: #8F8B82;
  line-height: 1.4;
  margin: 0;
  text-align: center;
}

.category-selected .category-description {
  color: rgba(255, 255, 255, 0.9);
}

/* Custom Category Section */
.custom-category-section {
  margin-bottom: 1.5rem;
}

.form-card {
  background: white;
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.form-title {
  color: #474747;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
  text-align: center;
}

.custom-category-input {
  width: 100%;
  padding: 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 1rem;
  font-family: inherit;
  transition: border-color 0.2s ease;
  background: white;
  margin-bottom: 0.5rem;
}

.custom-category-input:focus {
  outline: none;
  border-color: #5F6F55;
  box-shadow: 0 0 0 3px rgba(95, 111, 85, 0.1);
}

.char-counter {
  color: #6b7280;
  font-size: 0.875rem;
  text-align: right;
  margin-bottom: 0.5rem;
}

.form-help {
  color: #6b7280;
  font-size: 0.875rem;
  margin: 0;
  text-align: center;
  line-height: 1.4;
}

/* Action Section */
.action-section {
  background: white;
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  text-align: center;
}

.continue-btn {
  background: #5F6F55;
  color: white;
  border: none;
  border-radius: 16px;
  padding: 1.25rem 2rem;
  font-size: 1.125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin: 0 auto 1rem auto;
  min-height: 3.5rem;
  width: 100%;
}

.continue-btn:hover:not(.continue-disabled) {
  background: #4a5c44;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(95, 111, 85, 0.3);
}

.continue-btn.continue-disabled {
  background: #d1d5db;
  cursor: not-allowed;
  opacity: 0.6;
}

.btn-icon {
  width: 1.25rem;
  height: 1.25rem;
}

.continue-help {
  color: #6b7280;
  font-size: 0.875rem;
  margin: 0;
  line-height: 1.4;
}

/* Tablet Optimizations */
@media (min-width: 768px) {
  .mobile-container {
    padding: 2rem;
    max-width: 768px;
    margin: 0 auto;
  }
  
  .header-card {
    padding: 3rem 2rem;
  }
  
  .icon-circle {
    width: 4rem;
    height: 4rem;
  }
  
  .header-icon {
    width: 2rem;
    height: 2rem;
  }
  
  .header-title {
    font-size: 1.5rem;
  }
  
  .header-subtitle {
    font-size: 1rem;
  }
  
  .category-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.25rem;
  }
  
  .category-card {
    padding: 1.25rem;
    min-height: 120px;
  }
  
  .category-icon-container {
    width: 2.5rem;
    height: 2.5rem;
  }
  
  .category-icon {
    width: 1.5rem;
    height: 1.5rem;
  }
  
  .category-name {
    font-size: 0.875rem;
  }
  
  .category-description {
    font-size: 0.75rem;
  }
  
  .continue-btn {
    width: auto;
    min-width: 200px;
    padding: 1rem 2rem;
    font-size: 1rem;
    min-height: auto;
  }
}

/* Desktop Optimizations */
@media (min-width: 1024px) {
  .mobile-container {
    max-width: 1024px;
  }
  
  .category-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .category-card:hover,
  .category-card.category-selected,
  .continue-btn:hover:not(.continue-disabled) {
    transform: none;
  }
}
</style>