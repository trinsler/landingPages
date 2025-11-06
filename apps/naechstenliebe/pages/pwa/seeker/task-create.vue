<template>
  <div style="min-height: 100vh; background: #f5f5f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;">
    <!-- Header Component -->
    <AppHeader 
      title="Hilfe anfragen" 
      current-role="unified"
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
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
          <h3 style="color: #474747; font-size: 1.25rem; font-weight: 600; margin: 0;">Was benötigen Sie?</h3>
          <span style="color: #6b7280; font-size: 0.75rem; background: rgba(107, 114, 128, 0.1); padding: 0.25rem 0.5rem; border-radius: 12px;">{{ taskDescription.length }}/500</span>
        </div>
        
        <textarea 
          v-model="taskDescription"
          maxlength="500"
          placeholder="Beschreiben Sie Ihre Anfrage detailliert... z.B. 'Ich benötige Hilfe beim wöchentlichen Einkauf für Lebensmittel. Bevorzugt donnerstags zwischen 14-17 Uhr.'"
          style="width: 100%; min-height: 140px; padding: 1rem; border: 2px solid #e5e7eb; border-radius: 12px; font-size: 1rem; resize: vertical; font-family: inherit; line-height: 1.6;"
          @focus="$event.target.style.borderColor='#5F6F55'"
          @blur="$event.target.style.borderColor='#e5e7eb'"
        ></textarea>
        
        <div style="margin-top: 0.75rem; display: flex; align-items: center; gap: 0.5rem;">
          <svg style="width: 1rem; height: 1rem; color: #6b7280;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <span style="color: #6b7280; font-size: 0.75rem;">Je detaillierter die Beschreibung, desto besser können Helfer Ihnen assistieren.</span>
        </div>
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
      <div style="background: white; border-radius: 16px; padding: 1.5rem; margin-bottom: 1.5rem; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
        <div style="margin-bottom: 1rem;">
          <h3 style="color: #474747; font-size: 1.25rem; font-weight: 600; margin: 0 0 0.5rem 0;">Anfrage senden</h3>
          <p style="color: #6b7280; font-size: 0.875rem; margin: 0;">Ihre Anfrage wird an verfügbare Helfer in der Nähe gesendet.</p>
        </div>
        
        <div style="display: flex; flex-direction: column; gap: 0.75rem;">
          <button 
            @click="submitTask"
            :disabled="!taskDescription.trim()"
            :style="`background: ${taskDescription.trim() ? '#5F6F55' : '#d1d5db'}; 
                     color: white; 
                     padding: 1.25rem 2rem; 
                     border-radius: 12px; 
                     border: none; 
                     font-weight: 600; 
                     cursor: ${taskDescription.trim() ? 'pointer' : 'not-allowed'}; 
                     font-size: 1rem; 
                     transition: all 0.2s;
                     display: flex;
                     align-items: center;
                     justify-content: center;
                     gap: 0.5rem;`"
            onmouseover="if(this.style.background === 'rgb(95, 111, 85)') { this.style.background='#4a5c44'; this.style.transform='translateY(-1px)'; }"
            onmouseout="if(this.style.background === 'rgb(74, 92, 68)') { this.style.background='#5F6F55'; this.style.transform='translateY(0)'; }"
          >
            <svg style="width: 1.25rem; height: 1.25rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
            </svg>
            Hilfe anfragen
          </button>
          
          <button 
            @click="saveDraft"
            style="background: rgba(95, 111, 85, 0.1); color: #5F6F55; padding: 0.875rem 2rem; border-radius: 12px; border: 1px solid rgba(95, 111, 85, 0.2); font-weight: 500; cursor: pointer; font-size: 0.875rem; transition: all 0.2s; display: flex; align-items: center; justify-content: center; gap: 0.5rem;"
            onmouseover="this.style.background='rgba(95, 111, 85, 0.2)'"
            onmouseout="this.style.background='rgba(95, 111, 85, 0.1)'"
          >
            <svg style="width: 1rem; height: 1rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2M7 4h10M7 4l-2 16h14l-2-16M9 9v6m6-6v6"/>
            </svg>
            Als Entwurf speichern
          </button>
        </div>
        
        <div style="margin-top: 1rem; padding: 0.75rem; background: rgba(34, 197, 94, 0.1); border-radius: 8px; display: flex; align-items: center; gap: 0.5rem;">
          <svg style="width: 1rem; height: 1rem; color: #22c55e;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <span style="color: #22c55e; font-size: 0.75rem; font-weight: 500;">Ihre Anfrage ist kostenfrei und unverbindlich</span>
        </div>
      </div>

    </div>

    <!-- Footer Component -->
    <UnifiedFooter 
      active-tab="seeker-create"
      current-role="unified"
      @navigate="handleFooterNavigation"
    />

    <!-- Padding for bottom nav -->
    <div style="height: 5rem;"></div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AppHeader from '~/components/AppHeader.vue'
import UnifiedFooter from '~/components/pwa/unified/UnifiedFooter.vue'

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
    return
  }
  
  console.log('Task submitted:', {
    description: taskDescription.value,
    category: selectedCategory.value
  })
  
  alert('Ihre Anfrage wurde erfolgreich übermittelt! Sie werden benachrichtigt, sobald ein Helfer verfügbar ist.')
  navigateTo('/pwa')
}

const saveDraft = () => {
  console.log('Saving draft:', {
    description: taskDescription.value,
    category: selectedCategory.value
  })
  // In a real app, this would save to local storage or backend
  alert('Entwurf gespeichert! Sie können ihn später aus Ihren Entwürfen laden.')
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
  navigateTo('/pwa')
}

// Footer navigation handler
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
      // Already on task-create page
      break
    case 'seeker-history':
      navigateTo('/pwa/seeker/history')
      break
    case 'seeker-favorites':
      navigateTo('/pwa/seeker/favorites')
      break
  }
}
</script>