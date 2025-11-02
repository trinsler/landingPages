<template>
  <div style="min-height: 100vh; background: #f5f5f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;">
    <!-- Header Component -->
    <AppHeader 
      title="Nachbarschaftshilfe"
      current-role="seeker"
      :request-count="activeTasks.length"
      @open-requests="handleRequestsClick"
      @open-profile="handleProfileClick"
      @open-news="handleNewsClick"
      @toggle-role="handleRoleToggle"
    />
    
    <div style="padding: 1rem; padding-bottom: 6rem;">
      <!-- Welcome Section -->
      <div style="background: white; border-radius: 16px; padding: 2rem; margin-bottom: 1.5rem; box-shadow: 0 4px 12px rgba(0,0,0,0.1); text-align: center;">
        <div style="margin-bottom: 0.5rem;">
          <div style="width: 4rem; height: 4rem; background: #BECDA3; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem auto;">
            <img src="/icons/verschiedeneMenschen.svg" alt="Community" style="width: 2rem; height: 2rem;">
          </div>
        </div>
        <h2 style="color: #474747; font-size: 1.5rem; font-weight: 600; margin: 0 0 0.5rem 0;">Ihre Nachbarschaftshilfe</h2>
        <p style="color: #8F8B82; margin: 0; font-size: 1rem;">Vertrauensvolle Hilfe in Ihrer Nähe</p>
      </div>

      <!-- Primary Action -->
      <div style="margin-bottom: 1.5rem;">
        <button 
          @click="createNewTask"
          style="width: 100%; background: #5F6F55; color: white; padding: 2rem; border: none; cursor: pointer; border-radius: 16px; box-shadow: 0 4px 12px rgba(95, 111, 85, 0.3); transition: all 0.2s;"
          onmouseover="this.style.background='#4a5c44'; this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 20px rgba(95, 111, 85, 0.4)';"
          onmouseout="this.style.background='#5F6F55'; this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 12px rgba(95, 111, 85, 0.3)';"
        >
          <div style="display: flex; flex-direction: column; align-items: center; gap: 1rem;">
            <div style="width: 4rem; height: 4rem; background: rgba(255,255,255,0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
              <img src="/icons/einkaufenMadl.svg" alt="Neue Hilfe" style="width: 2rem; height: 2rem; filter: brightness(0) invert(1);">
            </div>
            <span style="font-size: 1.25rem; font-weight: 600;">Neue Hilfe anfragen</span>
            <span style="font-size: 0.875rem; opacity: 0.9;">Einfach beschreiben, was Sie benötigen</span>
          </div>
        </button>
        
        <!-- Switch to Helper Mode Button -->
        <button 
          @click="switchToHelperMode"
          style="width: 100%; background: white; color: #5F6F55; padding: 1rem; border: 2px solid #BECDA3; cursor: pointer; border-radius: 12px; margin-top: 0.75rem; transition: all 0.2s; font-weight: 600;"
          onmouseover="this.style.background='#BECDA3'; this.style.color='white';"
          onmouseout="this.style.background='white'; this.style.color='#5F6F55';"
        >
          <div style="display: flex; align-items: center; justify-content: center; gap: 0.5rem;">
            <img src="/icons/verschiedeneMenschen.svg" alt="Helfer werden" style="width: 1.25rem; height: 1.25rem;">
            <span>Als Helfer aktiv werden</span>
          </div>
        </button>
      </div>

      <!-- Active Tasks -->
      <div style="background: white; border-radius: 16px; padding: 1.5rem; margin-bottom: 1.5rem; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem;">
          <h3 style="font-size: 1.25rem; font-weight: 600; color: #474747; margin: 0;">Aktive Aufträge</h3>
          <span style="background: #5F6F55; color: white; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.875rem; font-weight: 600;">{{ activeTasks.length }}</span>
        </div>
        
        <div v-if="activeTasks.length > 0" style="display: flex; flex-direction: column; gap: 1rem;">
          <div 
            v-for="task in activeTasks" 
            :key="task.id"
            @click="viewTask(task.id)"
            style="display: flex; align-items: center; gap: 1rem; padding: 1rem; background: #f9fafb; border-radius: 12px; border: 1px solid #e5e7eb; cursor: pointer; transition: all 0.2s;"
            onmouseover="this.style.borderColor='#BECDA3'; this.style.transform='translateY(-1px)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.1)';"
            onmouseout="this.style.borderColor='#e5e7eb'; this.style.transform='translateY(0)'; this.style.boxShadow='none';"
          >
            <div style="width: 3rem; height: 3rem; background: #BECDA3; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
              <img :src="getTaskIcon(task.type)" :alt="task.type" style="width: 1.5rem; height: 1.5rem;">
            </div>
            <div style="flex: 1; min-width: 0;">
              <h4 style="font-weight: 600; color: #474747; margin: 0 0 0.25rem 0;">{{ task.title }}</h4>
              <p style="font-size: 0.875rem; color: #8F8B82; margin: 0;">{{ task.helper }} • {{ task.distance }}</p>
            </div>
            <div style="text-align: right;">
              <span style="background: #5F6F55; color: white; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.75rem; font-weight: 600; display: inline-block; margin-bottom: 0.25rem;">
                {{ task.status }}
              </span>
              <div style="font-size: 0.75rem; color: #8F8B82;">Details →</div>
            </div>
          </div>
        </div>
        
        <div v-else style="text-align: center; padding: 2rem;">
          <div style="width: 4rem; height: 4rem; background: #f3f4f6; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem auto;">
            <svg style="width: 2rem; height: 2rem; color: #8F8B82;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
            </svg>
          </div>
          <h4 style="font-weight: 600; color: #474747; margin: 0 0 0.5rem 0;">Keine aktiven Aufträge</h4>
          <p style="color: #8F8B82; margin: 0; font-size: 0.875rem;">Starten Sie Ihre erste Anfrage</p>
        </div>
      </div>

      <!-- Quick Access -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem;">
        <button 
          @click="openFavorites"
          style="background: white; padding: 1.5rem; border: none; cursor: pointer; border-radius: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); transition: all 0.2s;"
          onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 20px rgba(0,0,0,0.15)';"
          onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.1)';"
        >
          <div style="text-align: center;">
            <div style="width: 3rem; height: 3rem; background: #BECDA3; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem auto;">
              <svg style="width: 1.5rem; height: 1.5rem; color: #474747;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
            </div>
            <div>
              <h4 style="font-weight: 600; color: #474747; margin: 0 0 0.25rem 0;">Favoriten</h4>
              <p style="font-size: 0.875rem; color: #8F8B82; margin: 0;">{{ favoriteHelpers.length }} Helfer</p>
            </div>
          </div>
        </button>
        
        <button 
          @click="openHistory"
          style="background: white; padding: 1.5rem; border: none; cursor: pointer; border-radius: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); transition: all 0.2s;"
          onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 20px rgba(0,0,0,0.15)';"
          onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.1)';"
        >
          <div style="text-align: center;">
            <div style="width: 3rem; height: 3rem; background: #BECDA3; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem auto;">
              <svg style="width: 1.5rem; height: 1.5rem; color: #474747;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div>
              <h4 style="font-weight: 600; color: #474747; margin: 0 0 0.25rem 0;">Verlauf</h4>
              <p style="font-size: 0.875rem; color: #8F8B82; margin: 0;">{{ completedTasks }} erledigt</p>
            </div>
          </div>
        </button>
      </div>
    </div>

    <!-- Footer Component -->
    <AppFooter 
      active-tab="dashboard"
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

const activeTasks = ref([
  {
    id: 1,
    title: 'Einkaufen',
    type: 'shopping',
    helper: 'Maria H.',
    distance: '0.3km entfernt',
    status: 'In Bearbeitung'
  }
])

const favoriteHelpers = ref([
  { id: 1, name: 'Maria H.' },
  { id: 2, name: 'Klaus B.' }
])

const completedTasks = ref(47)

// Header event handlers
const handleRequestsClick = () => {
  navigateTo('/pwa/seeker/task-create')
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
      // Already on dashboard
      break
    case 'tasks':
      navigateTo('/pwa/seeker/history')
      break
    case 'favorites':
      navigateTo('/pwa/seeker/favorites')
      break
    case 'create':
    case 'task-create':
      navigateTo('/pwa/seeker/task-create')
      break
    case 'profile':
      navigateTo('/pwa/shared/profile')
      break
  }
}

const createNewTask = () => {
  navigateTo('/pwa/seeker/task-create')
}

const switchToHelperMode = () => {
  navigateTo('/pwa/helper/dashboard')
}

const viewTask = (taskId) => {
  navigateTo(`/pwa/seeker/task-active`)
}

const openFavorites = () => {
  navigateTo('/pwa/seeker/favorites')
}

const openHistory = () => {
  navigateTo('/pwa/seeker/history')
}

const getTaskIcon = (type) => {
  const icons = {
    shopping: '/icons/einkaufenMadl.svg',
    cooking: '/icons/kochen.svg',
    cleaning: '/icons/staubsaugen.svg',
    gardening: '/icons/gießenBub.svg',
    tech_help: '/icons/technikBanalcieren.svg'
  }
  return icons[type] || '/icons/verschiedeneMenschen.svg'
}
</script>