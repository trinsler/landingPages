<template>
  <div style="min-height: 100vh; background: #f5f5f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;">
    <!-- Header Component -->
    <AppHeader 
      title="Favoriten" 
      current-role="seeker"
      :request-count="0"
      @open-requests="handleRequestsClick"
      @open-profile="handleProfileClick"
      @open-news="handleNewsClick"
      @toggle-role="handleRoleToggle"
    />

    <div style="padding: 1rem; padding-bottom: 6rem;">
      
      <!-- Info Header -->
      <div style="background: white; border-radius: 16px; padding: 2rem; margin-bottom: 1.5rem; box-shadow: 0 4px 12px rgba(0,0,0,0.1); text-align: center;">
        <div style="margin-bottom: 0.5rem;">
          <div style="width: 4rem; height: 4rem; background: #BECDA3; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem auto;">
            <img src="/icons/verschiedeneMenschen.svg" alt="Favoriten" style="width: 2rem; height: 2rem;">
          </div>
        </div>
        <h2 style="color: #474747; font-size: 1.5rem; font-weight: 600; margin: 0 0 0.5rem 0;">Ihre bewährten Helfer</h2>
        <p style="color: #8F8B82; margin: 0; font-size: 1rem;">Direkt beauftragen ohne neue Suche</p>
      </div>

      <!-- Favoriten Liste -->
      <div style="display: flex; flex-direction: column; gap: 1rem; margin-bottom: 1.5rem;">
        
        <!-- Favorit 1 - Maria -->
        <div style="background: white; border-radius: 16px; padding: 1.5rem; box-shadow: 0 4px 12px rgba(0,0,0,0.1); transition: all 0.2s;"
             onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 20px rgba(0,0,0,0.15)';"
             onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.1)';">
          <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
            <div style="width: 3.5rem; height: 3.5rem; background: #BECDA3; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
              <img src="/icons/verschiedeneMenschen.svg" alt="Maria" style="width: 1.75rem; height: 1.75rem;">
            </div>
            <div style="flex: 1; min-width: 0;">
              <h3 style="color: #474747; font-size: 1.125rem; font-weight: 600; margin: 0 0 0.25rem 0;">Maria H.</h3>
              <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
                <span style="color: #BECDA3; font-size: 0.875rem;">★★★★★</span>
                <span style="color: #8F8B82; font-size: 0.75rem;">(47)</span>
              </div>
              <p style="color: #8F8B82; margin: 0; font-size: 0.875rem;">0.3km • Einkaufen, Kochen</p>
            </div>
            <button style="background: none; border: none; color: #ef4444; font-size: 1.5rem; cursor: pointer; flex-shrink: 0; transition: all 0.2s;"
                    onmouseover="this.style.transform='scale(1.2)'"
                    onmouseout="this.style.transform='scale(1)'">♥</button>
          </div>

          <!-- Letzte Aufträge -->
          <div style="margin-bottom: 1rem;">
            <h4 style="color: #474747; font-size: 0.875rem; font-weight: 600; margin: 0 0 0.5rem 0;">Letzte Aufträge:</h4>
            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
              <span style="background: #f9fafb; color: #474747; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.75rem; border: 1px solid #e5e7eb;">Einkaufen (15€)</span>
              <span style="background: #f9fafb; color: #474747; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.75rem; border: 1px solid #e5e7eb;">Kochen (25€)</span>
              <span style="background: #f9fafb; color: #474747; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.75rem; border: 1px solid #e5e7eb;">Einkaufen (12€)</span>
            </div>
          </div>

          <!-- Aktions-Buttons -->
          <div style="display: flex; gap: 0.75rem;">
            <button style="flex: 1; background: #5F6F55; color: white; padding: 0.75rem; border-radius: 12px; border: none; font-weight: 600; cursor: pointer; font-size: 0.875rem; transition: all 0.2s;"
                    onmouseover="this.style.background='#4a5c44'"
                    onmouseout="this.style.background='#5F6F55'">
              Direkt beauftragen
            </button>
            <button style="background: white; color: #474747; padding: 0.75rem; border-radius: 12px; border: 1px solid #e5e7eb; cursor: pointer; font-size: 0.875rem; min-width: 3rem; display: flex; align-items: center; justify-content: center; transition: all 0.2s;"
                    onmouseover="this.style.borderColor='#BECDA3'"
                    onmouseout="this.style.borderColor='#e5e7eb'">
              <img src="/icons/JungeHaeltHandy.svg" alt="Chat" style="width: 1.2rem; height: 1.2rem;">
            </button>
          </div>
        </div>

        <!-- Favorit 2 - Klaus -->
        <div style="background: white; border-radius: 16px; padding: 1.5rem; box-shadow: 0 4px 12px rgba(0,0,0,0.1); transition: all 0.2s;"
             onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 20px rgba(0,0,0,0.15)';"
             onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.1)';">
          <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
            <div style="width: 3.5rem; height: 3.5rem; background: #BECDA3; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
              <img src="/icons/technikBanalcieren.svg" alt="Klaus" style="width: 1.75rem; height: 1.75rem;">
            </div>
            <div style="flex: 1; min-width: 0;">
              <h3 style="color: #474747; font-size: 1.125rem; font-weight: 600; margin: 0 0 0.25rem 0;">Klaus B.</h3>
              <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
                <span style="color: #BECDA3; font-size: 0.875rem;">★★★★★</span>
                <span style="color: #8F8B82; font-size: 0.75rem;">(32)</span>
              </div>
              <p style="color: #8F8B82; margin: 0; font-size: 0.875rem;">0.7km • Technik, Reparaturen</p>
            </div>
            <button style="background: none; border: none; color: #ef4444; font-size: 1.5rem; cursor: pointer; flex-shrink: 0; transition: all 0.2s;"
                    onmouseover="this.style.transform='scale(1.2)'"
                    onmouseout="this.style.transform='scale(1)'">♥</button>
          </div>

          <div style="margin-bottom: 1rem;">
            <h4 style="color: #474747; font-size: 0.875rem; font-weight: 600; margin: 0 0 0.5rem 0;">Letzte Aufträge:</h4>
            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
              <span style="background: #f9fafb; color: #474747; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.75rem; border: 1px solid #e5e7eb;">Technik-Setup (30€)</span>
              <span style="background: #f9fafb; color: #474747; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.75rem; border: 1px solid #e5e7eb;">WLAN-Hilfe (20€)</span>
            </div>
          </div>

          <div style="display: flex; gap: 0.75rem;">
            <button style="flex: 1; background: #5F6F55; color: white; padding: 0.75rem; border-radius: 12px; border: none; font-weight: 600; cursor: pointer; font-size: 0.875rem; transition: all 0.2s;"
                    onmouseover="this.style.background='#4a5c44'"
                    onmouseout="this.style.background='#5F6F55'">
              Direkt beauftragen
            </button>
            <button style="background: white; color: #474747; padding: 0.75rem; border-radius: 12px; border: 1px solid #e5e7eb; cursor: pointer; font-size: 0.875rem; min-width: 3rem; display: flex; align-items: center; justify-content: center; transition: all 0.2s;"
                    onmouseover="this.style.borderColor='#BECDA3'"
                    onmouseout="this.style.borderColor='#e5e7eb'">
              <img src="/icons/JungeHaeltHandy.svg" alt="Chat" style="width: 1.2rem; height: 1.2rem;">
            </button>
          </div>
        </div>

        <!-- Favorit 3 - Anna -->
        <div style="background: white; border-radius: 16px; padding: 1.5rem; box-shadow: 0 4px 12px rgba(0,0,0,0.1); transition: all 0.2s;"
             onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 20px rgba(0,0,0,0.15)';"
             onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.1)';">
          <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
            <div style="width: 3.5rem; height: 3.5rem; background: #BECDA3; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
              <img src="/icons/gießenBub.svg" alt="Anna" style="width: 1.75rem; height: 1.75rem;">
            </div>
            <div style="flex: 1; min-width: 0;">
              <h3 style="color: #474747; font-size: 1.125rem; font-weight: 600; margin: 0 0 0.25rem 0;">Anna K.</h3>
              <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
                <span style="color: #BECDA3; font-size: 0.875rem;">★★★★★</span>
                <span style="color: #8F8B82; font-size: 0.75rem;">(28)</span>
              </div>
              <p style="color: #8F8B82; margin: 0; font-size: 0.875rem;">0.5km • Gassigehen, Garten</p>
            </div>
            <button style="background: none; border: none; color: #ef4444; font-size: 1.5rem; cursor: pointer; flex-shrink: 0; transition: all 0.2s;"
                    onmouseover="this.style.transform='scale(1.2)'"
                    onmouseout="this.style.transform='scale(1)'">♥</button>
          </div>

          <div style="margin-bottom: 1rem;">
            <h4 style="color: #474747; font-size: 0.875rem; font-weight: 600; margin: 0 0 0.5rem 0;">Letzte Aufträge:</h4>
            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
              <span style="background: #f9fafb; color: #474747; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.75rem; border: 1px solid #e5e7eb;">Gassigehen (18€)</span>
              <span style="background: #f9fafb; color: #474747; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.75rem; border: 1px solid #e5e7eb;">Pflanzen gießen (10€)</span>
            </div>
          </div>

          <div style="display: flex; gap: 0.75rem;">
            <button style="flex: 1; background: #5F6F55; color: white; padding: 0.75rem; border-radius: 12px; border: none; font-weight: 600; cursor: pointer; font-size: 0.875rem; transition: all 0.2s;"
                    onmouseover="this.style.background='#4a5c44'"
                    onmouseout="this.style.background='#5F6F55'">
              Direkt beauftragen
            </button>
            <button style="background: white; color: #474747; padding: 0.75rem; border-radius: 12px; border: 1px solid #e5e7eb; cursor: pointer; font-size: 0.875rem; min-width: 3rem; display: flex; align-items: center; justify-content: center; transition: all 0.2s;"
                    onmouseover="this.style.borderColor='#BECDA3'"
                    onmouseout="this.style.borderColor='#e5e7eb'">
              <img src="/icons/JungeHaeltHandy.svg" alt="Chat" style="width: 1.2rem; height: 1.2rem;">
            </button>
          </div>
        </div>
      </div>

      <!-- Neue Favoriten finden -->
      <div style="background: white; border-radius: 16px; padding: 1.5rem; box-shadow: 0 4px 12px rgba(0,0,0,0.1); text-align: center; margin-bottom: 1.5rem;">
        <h3 style="color: #474747; font-size: 1.25rem; font-weight: 600; margin: 0 0 1rem 0;">Neue Helfer entdecken</h3>
        <p style="color: #8F8B82; margin: 0 0 1.5rem 0; font-size: 0.875rem;">Finden Sie weitere zuverlässige Helfer in Ihrer Nähe</p>
        
        <button @click="navigateTo('/pwa/seeker/task-create')" 
                style="background: #5F6F55; color: white; padding: 1rem 2rem; border-radius: 12px; border: none; font-weight: 600; cursor: pointer; font-size: 0.875rem; transition: all 0.2s;"
                onmouseover="this.style.background='#4a5c44'"
                onmouseout="this.style.background='#5F6F55'">
          Helfer suchen
        </button>
      </div>

      <!-- Switch to Helper Mode -->
      <div style="background: white; border-radius: 16px; padding: 1.5rem; box-shadow: 0 4px 12px rgba(0,0,0,0.1); text-align: center;">
        <div style="margin-bottom: 1rem;">
          <div style="width: 3rem; height: 3rem; background: #BECDA3; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto;">
            <img src="/icons/verschiedeneMenschen.svg" alt="Helfer werden" style="width: 1.5rem; height: 1.5rem;">
          </div>
        </div>
        <h3 style="color: #474747; font-size: 1.25rem; font-weight: 600; margin: 0 0 0.5rem 0;">Selbst als Helfer aktiv werden</h3>
        <p style="color: #8F8B82; margin: 0 0 1.5rem 0; font-size: 0.875rem;">Verdienen Sie Geld und helfen Sie Ihren Nachbarn</p>
        
        <button @click="switchToHelperMode" 
                style="background: white; color: #5F6F55; padding: 1rem 2rem; border: 2px solid #BECDA3; border-radius: 12px; font-weight: 600; cursor: pointer; font-size: 0.875rem; transition: all 0.2s;"
                onmouseover="this.style.background='#BECDA3'; this.style.color='white';"
                onmouseout="this.style.background='white'; this.style.color='#5F6F55';">
          Als Helfer registrieren
        </button>
      </div>

    </div>

    <!-- Footer Component -->
    <AppFooter 
      active-tab="favorites"
      current-role="seeker"
      @navigate="handleFooterNavigation"
    />

    <!-- Padding for bottom nav -->
    <div style="height: 5rem;"></div>
  </div>
</template>

<script setup>
import AppHeader from '~/components/AppHeader.vue'
import AppFooter from '~/components/AppFooter.vue'

definePageMeta({
  layout: false
})

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
      navigateTo('/pwa/seeker/dashboard')
      break
    case 'tasks':
      navigateTo('/pwa/seeker/history')
      break
    case 'favorites':
      // Already on favorites page
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

const switchToHelperMode = () => {
  navigateTo('/pwa/helper/dashboard')
}
</script>