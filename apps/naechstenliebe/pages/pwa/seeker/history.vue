<template>
  <div style="min-height: 100vh; background: #f5f5f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;">
    <!-- Header Component -->
    <AppHeader 
      title="Auftragshistorie" 
      current-role="seeker"
      :request-count="0"
      @open-requests="handleRequestsClick"
      @open-profile="handleProfileClick"
      @open-news="handleNewsClick"
      @toggle-role="handleRoleToggle"
    />
    
    <div style="padding: 1rem; padding-bottom: 6rem;">
      
      <!-- Statistiken Header -->
      <div style="background: white; border-radius: 16px; padding: 1.5rem; margin-bottom: 1.5rem; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
        <div style="text-align: center; margin-bottom: 1rem;">
          <div style="width: 4rem; height: 4rem; background: #BECDA3; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem auto;">
            <img src="/icons/ZeitungJunge.svg" alt="Statistiken" style="width: 2rem; height: 2rem;">
          </div>
          <h2 style="color: #474747; font-size: 1.5rem; font-weight: 600; margin: 0 0 0.5rem 0;">Ihre Statistiken</h2>
          <p style="color: #8F8B82; margin: 0; font-size: 1rem;">Überblick über Ihre Aufträge</p>
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem; text-align: center;">
          <div style="background: rgba(190, 205, 163, 0.2); border-radius: 12px; padding: 1rem;">
            <div style="font-size: 1.75rem; font-weight: 600; color: #474747; margin-bottom: 0.3rem;">47</div>
            <div style="font-size: 0.875rem; color: #8F8B82;">Aufträge</div>
          </div>
          <div style="background: rgba(190, 205, 163, 0.2); border-radius: 12px; padding: 1rem;">
            <div style="font-size: 1.75rem; font-weight: 600; color: #474747; margin-bottom: 0.3rem;">4.9</div>
            <div style="font-size: 0.875rem; color: #8F8B82;">Bewertung</div>
          </div>
          <div style="background: rgba(190, 205, 163, 0.2); border-radius: 12px; padding: 1rem;">
            <div style="font-size: 1.75rem; font-weight: 600; color: #474747; margin-bottom: 0.3rem;">8</div>
            <div style="font-size: 0.875rem; color: #8F8B82;">Favoriten</div>
          </div>
        </div>
      </div>

      <!-- Filter -->
      <div style="background: white; border-radius: 16px; padding: 1.5rem; margin-bottom: 1.5rem; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
        <h3 style="color: #474747; font-size: 1.25rem; font-weight: 600; margin: 0 0 1rem 0;">Filter</h3>
        
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <button style="background: #5F6F55; color: white; padding: 0.75rem 1rem; border-radius: 12px; border: none; font-weight: 600; cursor: pointer; font-size: 0.875rem; transition: all 0.2s;">
            Alle
          </button>
          <button style="background: white; color: #474747; padding: 0.75rem 1rem; border-radius: 12px; border: 2px solid #e5e7eb; cursor: pointer; font-size: 0.875rem; transition: all 0.2s;"
                  onmouseover="this.style.borderColor='#BECDA3'"
                  onmouseout="this.style.borderColor='#e5e7eb'">
            Diese Woche
          </button>
          <button style="background: white; color: #474747; padding: 0.75rem 1rem; border-radius: 12px; border: 2px solid #e5e7eb; cursor: pointer; font-size: 0.875rem; transition: all 0.2s;"
                  onmouseover="this.style.borderColor='#BECDA3'"
                  onmouseout="this.style.borderColor='#e5e7eb'">
            Einkaufen
          </button>
          <button style="background: white; color: #474747; padding: 0.75rem 1rem; border-radius: 12px; border: 2px solid #e5e7eb; cursor: pointer; font-size: 0.875rem; transition: all 0.2s;"
                  onmouseover="this.style.borderColor='#BECDA3'"
                  onmouseout="this.style.borderColor='#e5e7eb'">
            Kochen
          </button>
        </div>
      </div>

      <!-- Verlauf Liste -->
      <div style="display: flex; flex-direction: column; gap: 1rem; margin-bottom: 2rem;">
        
        <!-- Heute -->
        <div style="margin-bottom: 1rem;">
          <h4 style="color: #474747; font-size: 1rem; font-weight: 600; margin: 0 0 1rem 0; padding-left: 0.5rem;">Heute</h4>
          
          <!-- Auftrag 1 - Aktuell -->
          <div style="background: white; border-radius: 16px; padding: 1.5rem; box-shadow: 0 4px 12px rgba(0,0,0,0.1); border-left: 4px solid #BECDA3; transition: all 0.2s;"
               onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 20px rgba(0,0,0,0.15)';"
               onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.1)';">
            <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
              <div style="width: 3rem; height: 3rem; background: #BECDA3; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                <img src="/icons/einkaufenMadl.svg" alt="Einkaufen" style="width: 1.5rem; height: 1.5rem;">
              </div>
              <div style="flex: 1; min-width: 0;">
                <h5 style="color: #474747; font-size: 1.125rem; font-weight: 600; margin: 0 0 0.25rem 0;">Einkaufen</h5>
                <p style="color: #8F8B82; margin: 0; font-size: 0.875rem;">Maria H. • 15:23</p>
              </div>
              <div style="text-align: right; flex-shrink: 0;">
                <div style="background: #5F6F55; color: white; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.75rem; font-weight: 600; margin-bottom: 0.25rem;">
                  Erledigt
                </div>
                <div style="color: #474747; font-weight: 600; font-size: 0.875rem;">15€</div>
              </div>
            </div>
            
            <div style="background: #f9fafb; border-radius: 12px; padding: 1rem; margin-bottom: 1rem;">
              <p style="color: #8F8B82; margin: 0; font-size: 0.875rem; font-style: italic;">
                "Milch, Brot und Äpfel vom Supermarkt"
              </p>
            </div>
            
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
              <div style="display: flex; align-items: center; gap: 0.5rem;">
                <span style="color: #BECDA3; font-size: 0.875rem;">★★★★★</span>
                <span style="color: #8F8B82; font-size: 0.75rem;">Ihre Bewertung</span>
              </div>
              <button style="background: white; color: #474747; padding: 0.5rem 1rem; border-radius: 12px; border: 2px solid #e5e7eb; cursor: pointer; font-size: 0.875rem; transition: all 0.2s;"
                      onmouseover="this.style.borderColor='#BECDA3'"
                      onmouseout="this.style.borderColor='#e5e7eb'">
                Details
              </button>
            </div>
          </div>
        </div>

        <!-- Gestern -->
        <div style="margin-bottom: 1rem;">
          <h4 style="color: #474747; font-size: clamp(0.9rem, 2.5vw, 1rem); font-weight: 600; margin: 0 0 0.8rem 0; padding-left: 0.5rem;">Gestern</h4>
          
          <!-- Auftrag 2 -->
          <div style="background: white; border-radius: 1rem; padding: 1.5rem; box-shadow: 3px 3px 0px rgba(0,0,0,0.1);">
            <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
              <img src="/icons/kochen.svg" alt="Kochen" style="width: 3rem; height: 3rem; flex-shrink: 0;">
              <div style="flex: 1; min-width: 0;">
                <h5 style="color: #474747; font-size: clamp(1rem, 2.5vw, 1.1rem); font-weight: 600; margin: 0 0 0.3rem 0;">Kochen</h5>
                <p style="color: #666; margin: 0; font-size: clamp(0.8rem, 2.5vw, 0.9rem);">Maria H. • 18:00</p>
              </div>
              <div style="text-align: right; flex-shrink: 0;">
                <div style="background: rgba(190, 205, 163, 0.3); color: #474747; padding: 0.3rem 0.8rem; border-radius: 1rem; font-size: clamp(0.7rem, 2vw, 0.8rem); font-weight: 600; margin-bottom: 0.3rem;">
                  Erledigt
                </div>
                <div style="color: #474747; font-weight: 600; font-size: clamp(0.8rem, 2.5vw, 0.9rem);">25€</div>
              </div>
            </div>
            
            <div style="background: #f8f8f8; border-radius: 0.5rem; padding: 0.8rem; margin-bottom: 1rem;">
              <p style="color: #666; margin: 0; font-size: clamp(0.75rem, 2vw, 0.85rem); font-style: italic;">
                "Traditionelles Schnitzel mit Kartoffelsalat zubereiten"
              </p>
            </div>
            
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
              <div style="display: flex; align-items: center; gap: 0.3rem;">
                <span style="color: #BECDA3; font-size: clamp(0.8rem, 2.5vw, 0.9rem);">★★★★★</span>
                <span style="color: #666; font-size: clamp(0.7rem, 2vw, 0.8rem);">Ihre Bewertung</span>
              </div>
              <button style="background: rgba(190, 205, 163, 0.3); color: #474747; padding: 0.5rem 1rem; border-radius: 0.5rem; border: 1px solid #BECDA3; cursor: pointer; font-size: clamp(0.7rem, 2vw, 0.8rem);">
                Details
              </button>
            </div>
          </div>
        </div>

        <!-- Diese Woche -->
        <div style="margin-bottom: 1rem;">
          <h4 style="color: #474747; font-size: clamp(0.9rem, 2.5vw, 1rem); font-weight: 600; margin: 0 0 0.8rem 0; padding-left: 0.5rem;">Diese Woche</h4>
          
          <!-- Auftrag 3 -->
          <div style="background: white; border-radius: 1rem; padding: 1.5rem; box-shadow: 3px 3px 0px rgba(0,0,0,0.1);">
            <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
              <img src="/icons/technikBanalcieren.svg" alt="Technik" style="width: 3rem; height: 3rem; flex-shrink: 0;">
              <div style="flex: 1; min-width: 0;">
                <h5 style="color: #474747; font-size: clamp(1rem, 2.5vw, 1.1rem); font-weight: 600; margin: 0 0 0.3rem 0;">Technik-Hilfe</h5>
                <p style="color: #666; margin: 0; font-size: clamp(0.8rem, 2.5vw, 0.9rem);">Klaus B. • Montag</p>
              </div>
              <div style="text-align: right; flex-shrink: 0;">
                <div style="background: rgba(190, 205, 163, 0.3); color: #474747; padding: 0.3rem 0.8rem; border-radius: 1rem; font-size: clamp(0.7rem, 2vw, 0.8rem); font-weight: 600; margin-bottom: 0.3rem;">
                  Erledigt
                </div>
                <div style="color: #474747; font-weight: 600; font-size: clamp(0.8rem, 2.5vw, 0.9rem);">30€</div>
              </div>
            </div>
            
            <div style="background: #f8f8f8; border-radius: 0.5rem; padding: 0.8rem; margin-bottom: 1rem;">
              <p style="color: #666; margin: 0; font-size: clamp(0.75rem, 2vw, 0.85rem); font-style: italic;">
                "Neuen Smart-TV einrichten und WLAN-Probleme lösen"
              </p>
            </div>
            
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
              <div style="display: flex; align-items: center; gap: 0.3rem;">
                <span style="color: #BECDA3; font-size: clamp(0.8rem, 2.5vw, 0.9rem);">★★★★★</span>
                <span style="color: #666; font-size: clamp(0.7rem, 2vw, 0.8rem);">Ihre Bewertung</span>
              </div>
              <button style="background: rgba(190, 205, 163, 0.3); color: #474747; padding: 0.5rem 1rem; border-radius: 0.5rem; border: 1px solid #BECDA3; cursor: pointer; font-size: clamp(0.7rem, 2vw, 0.8rem);">
                Details
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Mehr laden Button -->
      <button style="width: 100%; background: white; color: #474747; padding: 1rem; border-radius: 16px; border: 2px solid #e5e7eb; cursor: pointer; font-weight: 600; font-size: 1rem; margin-bottom: 1.5rem; transition: all 0.2s;"
              onmouseover="this.style.borderColor='#BECDA3'"
              onmouseout="this.style.borderColor='#e5e7eb'">
        Weitere Aufträge laden
      </button>

      <!-- Switch to Helper Mode -->
      <div style="background: white; border-radius: 16px; padding: 1.5rem; box-shadow: 0 4px 12px rgba(0,0,0,0.1); text-align: center; margin-bottom: 1.5rem;">
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
      active-tab="tasks"
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
      // Already on tasks/history page
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

const switchToHelperMode = () => {
  navigateTo('/pwa/helper/dashboard')
}
</script>