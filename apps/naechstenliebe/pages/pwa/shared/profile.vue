<template>
  <div style="min-height: 100vh; background: #f5f5f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;">
    <!-- Header Component -->
    <AppHeader 
      title="Mein Profil"
      current-role="unified"
      :request-count="0"
      @open-requests="() => navigateTo('/pwa')"
      @open-profile="() => {}"
      @open-news="() => navigateTo('/pwa/shared/news')"
      @toggle-role="() => navigateTo('/pwa')"
    />
    
    <div style="padding: 1rem; padding-bottom: 6rem;">
      
      <!-- Profile Header -->
      <div style="background: white; border-radius: 16px; padding: 2rem; margin-bottom: 1.5rem; box-shadow: 0 4px 12px rgba(0,0,0,0.1); text-align: center;">
        <div style="margin-bottom: 1rem;">
          <div style="width: 5rem; height: 5rem; background: #BECDA3; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem auto;">
            <img src="/icons/verschiedeneMenschen.svg" alt="Profil" style="width: 2.5rem; height: 2.5rem;">
          </div>
        </div>
        <h2 style="color: #474747; font-size: 1.5rem; font-weight: 600; margin: 0 0 0.5rem 0;">{{ userProfile.name }}</h2>
        <p style="color: #8F8B82; margin: 0 0 1rem 0; font-size: 1rem;">{{ userProfile.location }}</p>
        
        <!-- Rating -->
        <div style="display: flex; align-items: center; justify-content: center; gap: 0.5rem; margin-bottom: 1rem;">
          <span style="color: #BECDA3; font-size: 1.125rem;">★★★★★</span>
          <span style="color: #8F8B82; font-size: 0.875rem;">({{ userProfile.totalActions }} {{ currentRole === 'helper' ? 'Aufträge' : 'Anfragen' }})</span>
        </div>

        <!-- Member Since -->
        <div style="background: rgba(190, 205, 163, 0.2); border-radius: 20px; padding: 0.5rem 1rem; display: inline-block;">
          <span style="color: #474747; font-size: 0.875rem; font-weight: 600;">Mitglied seit {{ userProfile.memberSince }}</span>
        </div>
      </div>

      <!-- Quick Stats - Dynamic based on role -->
      <div style="background: white; border-radius: 16px; padding: 1.5rem; margin-bottom: 1.5rem; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
        <h3 style="color: #474747; font-size: 1.25rem; font-weight: 600; margin: 0 0 1rem 0;">Ihre Statistiken</h3>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem; text-align: center;">
          <!-- First Stat -->
          <div style="background: rgba(190, 205, 163, 0.2); border-radius: 12px; padding: 1rem;">
            <div style="font-size: 1.75rem; font-weight: 600; color: #474747; margin-bottom: 0.25rem;">{{ userProfile.totalActions }}</div>
            <div style="font-size: 0.875rem; color: #8F8B82;">{{ currentRole === 'helper' ? 'Aufträge' : 'Anfragen' }}</div>
          </div>
          
          <!-- Second Stat -->
          <div style="background: rgba(190, 205, 163, 0.2); border-radius: 12px; padding: 1rem;">
            <div style="font-size: 1.75rem; font-weight: 600; color: #474747; margin-bottom: 0.25rem;">{{ getSecondStat() }}</div>
            <div style="font-size: 0.875rem; color: #8F8B82;">{{ getSecondStatLabel() }}</div>
          </div>
          
          <!-- Third Stat -->
          <div style="background: rgba(190, 205, 163, 0.2); border-radius: 12px; padding: 1rem;">
            <div style="font-size: 1.75rem; font-weight: 600; color: #474747; margin-bottom: 0.25rem;">{{ getThirdStat() }}€</div>
            <div style="font-size: 0.875rem; color: #8F8B82;">{{ getThirdStatLabel() }}</div>
          </div>
        </div>
      </div>

      <!-- Settings -->
      <div style="background: white; border-radius: 16px; padding: 1.5rem; margin-bottom: 1.5rem; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
        <h3 style="color: #474747; font-size: 1.25rem; font-weight: 600; margin: 0 0 1rem 0;">Einstellungen</h3>
        
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <button style="display: flex; align-items: center; justify-content: space-between; padding: 1rem; background: #f9fafb; border-radius: 12px; border: none; cursor: pointer; transition: all 0.2s;"
                  onmouseover="this.style.background='#f3f4f6'"
                  onmouseout="this.style.background='#f9fafb'">
            <div style="display: flex; align-items: center; gap: 1rem;">
              <div style="width: 2.5rem; height: 2.5rem; background: #BECDA3; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                <svg style="width: 1.25rem; height: 1.25rem; color: #474747;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
              </div>
              <span style="color: #474747; font-weight: 600;">Persönliche Daten bearbeiten</span>
            </div>
            <svg style="width: 1.25rem; height: 1.25rem; color: #8F8B82;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </button>

          <button style="display: flex; align-items: center; justify-content: space-between; padding: 1rem; background: #f9fafb; border-radius: 12px; border: none; cursor: pointer; transition: all 0.2s;"
                  onmouseover="this.style.background='#f3f4f6'"
                  onmouseout="this.style.background='#f9fafb'">
            <div style="display: flex; align-items: center; gap: 1rem;">
              <div style="width: 2.5rem; height: 2.5rem; background: #BECDA3; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                <svg style="width: 1.25rem; height: 1.25rem; color: #474747;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM4.828 2.828a4 4 0 010 5.656L12 16h4v4L4.828 8.828z"/>
                </svg>
              </div>
              <span style="color: #474747; font-weight: 600;">Benachrichtigungen</span>
            </div>
            <svg style="width: 1.25rem; height: 1.25rem; color: #8F8B82;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </button>

          <button style="display: flex; align-items: center; justify-content: space-between; padding: 1rem; background: #f9fafb; border-radius: 12px; border: none; cursor: pointer; transition: all 0.2s;"
                  onmouseover="this.style.background='#f3f4f6'"
                  onmouseout="this.style.background='#f9fafb'">
            <div style="display: flex; align-items: center; gap: 1rem;">
              <div style="width: 2.5rem; height: 2.5rem; background: #BECDA3; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                <svg style="width: 1.25rem; height: 1.25rem; color: #474747;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
                </svg>
              </div>
              <span style="color: #474747; font-weight: 600;">Zahlungsmethoden</span>
            </div>
            <svg style="width: 1.25rem; height: 1.25rem; color: #8F8B82;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </button>

          <button @click="navigateTo('/pwa/shared/support')" 
                  style="display: flex; align-items: center; justify-content: space-between; padding: 1rem; background: #f9fafb; border-radius: 12px; border: none; cursor: pointer; transition: all 0.2s;"
                  onmouseover="this.style.background='#f3f4f6'"
                  onmouseout="this.style.background='#f9fafb'">
            <div style="display: flex; align-items: center; gap: 1rem;">
              <div style="width: 2.5rem; height: 2.5rem; background: #BECDA3; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                <svg style="width: 1.25rem; height: 1.25rem; color: #474747;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"/>
                </svg>
              </div>
              <span style="color: #474747; font-weight: 600;">Hilfe & Support</span>
            </div>
            <svg style="width: 1.25rem; height: 1.25rem; color: #8F8B82;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Role Switch Section -->
      <div style="background: white; border-radius: 16px; padding: 1.5rem; box-shadow: 0 4px 12px rgba(0,0,0,0.1); text-align: center; margin-bottom: 1.5rem;">
        <div style="margin-bottom: 1rem;">
          <div style="width: 3rem; height: 3rem; background: #BECDA3; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto;">
            <svg style="width: 1.5rem; height: 1.5rem; color: #474747;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/>
            </svg>
          </div>
        </div>
        <h3 style="color: #474747; font-size: 1.25rem; font-weight: 600; margin: 0 0 0.5rem 0;">
          {{ currentRole === 'helper' ? 'Als Hilfesuchender aktiv werden' : 'Als Helfer Geld verdienen' }}
        </h3>
        <p style="color: #8F8B82; margin: 0 0 1.5rem 0; font-size: 0.875rem;">
          {{ currentRole === 'helper' ? 'Nutzen Sie unseren Service für Ihre eigenen Bedürfnisse' : 'Nutzen Sie Ihre Fähigkeiten und helfen Sie anderen' }}
        </p>
        
        <button @click="switchRole" 
                style="background: white; color: #5F6F55; padding: 1rem 2rem; border: 2px solid #BECDA3; border-radius: 12px; font-weight: 600; cursor: pointer; font-size: 0.875rem; transition: all 0.2s;"
                onmouseover="this.style.background='#BECDA3'; this.style.color='white';"
                onmouseout="this.style.background='white'; this.style.color='#5F6F55';">
          {{ currentRole === 'helper' ? 'Als Hilfesuchender registrieren' : 'Als Helfer registrieren' }}
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
import { ref, computed } from 'vue'
import AppHeader from '~/components/AppHeader.vue'
import UnifiedFooter from '~/components/pwa/unified/UnifiedFooter.vue'
import { useRole } from '~/composables/useRole.js'

definePageMeta({
  layout: false
})

// Use role management
const { 
  currentRole, 
  toggleRole, 
  getRoleBasedTitle, 
  getRoleBasedNavigation, 
  getRequestButtonAction, 
  getNewsAction,
  detectRoleFromPath
} = useRole()

// Detect role from current URL on page load
onMounted(() => {
  detectRoleFromPath(window.location.pathname)
})

const userProfile = ref({
  name: 'Max Mustermann',
  location: 'Winnweiler, Deutschland',
  memberSince: 'Januar 2024',
  totalActions: 47,
  helperData: {
    totalEarned: 1250,
    favoriteClients: 12
  },
  seekerData: {
    totalSpent: 780,
    favoriteHelpers: 8
  },
  rating: 4.9
})

const getSecondStat = () => {
  return currentRole.value === 'helper' ? userProfile.value.helperData.favoriteClients : userProfile.value.seekerData.favoriteHelpers
}

const getSecondStatLabel = () => {
  return currentRole.value === 'helper' ? 'Stammkunden' : 'Favoriten'
}

const getThirdStat = () => {
  return currentRole.value === 'helper' ? userProfile.value.helperData.totalEarned : userProfile.value.seekerData.totalSpent
}

const getThirdStatLabel = () => {
  return currentRole.value === 'helper' ? 'Verdient' : 'Ausgegeben'
}

const switchRole = () => {
  toggleRole()
}

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
      navigateTo('/pwa/seeker/task-create')
      break
    case 'seeker-tasks':
      navigateTo('/pwa') // Opens with seeker tasks sidebar
      break
    case 'seeker-favorites':
      navigateTo('/pwa') // Opens with favorites sidebar
      break
    case 'profile':
      // Already on profile page
      break
  }
}
</script>