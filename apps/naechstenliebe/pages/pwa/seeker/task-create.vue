<template>
  <div style="min-height: 100vh; background: #f5f5f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;">
    <!-- Header Component -->
    <AppHeader 
      title="Hilfe anfragen" 
      current-role="seeker"
      :request-count="0"
      @open-requests="handleRequestsClick"
      @open-profile="handleProfileClick"
      @open-news="handleNewsClick"
      @toggle-role="handleRoleToggle"
    />
    
    <div style="padding: 1rem; padding-bottom: 6rem;">
      
      <!-- Header Info -->
      <div style="background: white; border-radius: 16px; padding: 2rem; margin-bottom: 1.5rem; box-shadow: 0 4px 12px rgba(0,0,0,0.1); text-align: center;">
        <div style="margin-bottom: 0.5rem;">
          <div style="width: 4rem; height: 4rem; background: #BECDA3; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem auto;">
            <img src="/icons/einkaufenMadl.svg" alt="Hilfe anfragen" style="width: 2rem; height: 2rem;">
          </div>
        </div>
        <h2 style="color: #474747; font-size: 1.5rem; font-weight: 600; margin: 0 0 0.5rem 0;">Neue Hilfe anfragen</h2>
        <p style="color: #8F8B82; margin: 0; font-size: 1rem;">Beschreiben Sie einfach, wobei Sie Unterstützung benötigen</p>
      </div>

      <!-- Task Description Form -->
      <div style="background: white; border-radius: 16px; padding: 1.5rem; margin-bottom: 1.5rem; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
        <h3 style="color: #474747; font-size: 1.25rem; font-weight: 600; margin: 0 0 1rem 0;">Was benötigen Sie?</h3>
        
        <textarea 
          v-model="taskDescription"
          placeholder="Beschreiben Sie Ihre Anfrage... z.B. 'Ich benötige Hilfe beim wöchentlichen Einkauf für Lebensmittel'"
          style="width: 100%; min-height: 120px; padding: 1rem; border: 2px solid #e5e7eb; border-radius: 12px; font-size: 1rem; resize: vertical; font-family: inherit;"
          @focus="$event.target.style.borderColor='#BECDA3'"
          @blur="$event.target.style.borderColor='#e5e7eb'"
        ></textarea>
      </div>

      <!-- Quick Category Selection -->
      <div style="background: white; border-radius: 16px; padding: 1.5rem; margin-bottom: 1.5rem; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
        <h3 style="color: #474747; font-size: 1.25rem; font-weight: 600; margin: 0 0 1rem 0;">Kategorie (optional)</h3>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;">
          <button 
            v-for="category in categories" 
            :key="category.id"
            @click="selectedCategory = category.id"
            :style="`background: ${selectedCategory === category.id ? '#5F6F55' : 'white'}; 
                     color: ${selectedCategory === category.id ? 'white' : '#474747'}; 
                     padding: 1rem; border: ${selectedCategory === category.id ? 'none' : '2px solid #e5e7eb'}; 
                     cursor: pointer; border-radius: 12px; transition: all 0.2s; text-align: center;`"
            onmouseover="if(this.style.background === 'white') { this.style.borderColor='#BECDA3'; }"
            onmouseout="if(this.style.background === 'white') { this.style.borderColor='#e5e7eb'; }"
          >
            <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
              <img :src="category.icon" :alt="category.name" style="width: 1.5rem; height: 1.5rem;">
              <span style="font-size: 0.875rem; font-weight: 600;">{{ category.name }}</span>
            </div>
          </button>
        </div>
      </div>

      <!-- Submit Buttons -->
      <div style="display: flex; flex-direction: column; gap: 0.75rem;">
        <button 
          @click="submitTask"
          style="background: #5F6F55; color: white; padding: 1rem 2rem; border-radius: 12px; border: none; font-weight: 600; cursor: pointer; font-size: 1rem; transition: all 0.2s;"
          onmouseover="this.style.background='#4a5c44'"
          onmouseout="this.style.background='#5F6F55'"
        >
          Hilfe anfragen
        </button>
        
        <button 
          @click="navigateTo('/pwa/seeker/dashboard')"
          style="background: white; color: #474747; padding: 1rem 2rem; border-radius: 12px; border: 2px solid #e5e7eb; cursor: pointer; font-size: 1rem; transition: all 0.2s;"
          onmouseover="this.style.borderColor='#BECDA3'"
          onmouseout="this.style.borderColor='#e5e7eb'"
        >
          Abbrechen
        </button>
      </div>

    </div>

    <!-- Footer Component -->
    <AppFooter 
      active-tab="create"
      current-role="seeker"
      @navigate="handleFooterNavigation"
    />

    <!-- Padding for bottom nav -->
    <div style="height: 5rem;"></div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AppHeader from '~/components/AppHeader.vue'
import AppFooter from '~/components/AppFooter.vue'

definePageMeta({
  layout: false
})

const taskDescription = ref('')
const selectedCategory = ref(null)

const categories = ref([
  { id: 'shopping', name: 'Einkaufen', icon: '/icons/einkaufenMadl.svg' },
  { id: 'cooking', name: 'Kochen', icon: '/icons/kochen.svg' },
  { id: 'cleaning', name: 'Putzen', icon: '/icons/staubsaugen.svg' },
  { id: 'gardening', name: 'Garten', icon: '/icons/gießenBub.svg' },
  { id: 'tech', name: 'Technik', icon: '/icons/technikBanalcieren.svg' },
  { id: 'other', name: 'Sonstiges', icon: '/icons/verschiedeneMenschen.svg' }
])

const submitTask = () => {
  if (!taskDescription.value.trim()) {
    alert('Bitte beschreiben Sie, wobei Sie Hilfe benötigen.')
    return
  }
  
  console.log('Task submitted:', {
    description: taskDescription.value,
    category: selectedCategory.value
  })
  
  alert('Ihre Anfrage wurde erfolgreich übermittelt! Sie werden benachrichtigt, sobald ein Helfer verfügbar ist.')
  navigateTo('/pwa/seeker/dashboard')
}

// Header event handlers
const handleRequestsClick = () => {
  navigateTo('/pwa/seeker/history')
}

const handleProfileClick = () => {
  navigateTo('/pwa/shared/profile')
}

const handleNewsClick = () => {
  navigateTo('/pwa/shared/news')
}

const handleRoleToggle = () => {
  navigateTo('/pwa/helper/dashboard')
}

// Footer navigation handler
const handleFooterNavigation = (tab) => {
  switch(tab) {
    case 'dashboard':
      navigateTo('/pwa/seeker/dashboard')
      break
    case 'tasks':
      navigateTo('/pwa/seeker/history')
      break
    case 'favorites':
      navigateTo('/pwa/seeker/favorites')
      break
    case 'create':
    case 'task-create':
      // Already on task-create page
      break
    case 'profile':
      navigateTo('/pwa/shared/profile')
      break
  }
}
</script>