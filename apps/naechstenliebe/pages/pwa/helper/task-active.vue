<template>
  <div style="min-height: 100vh; background: #f5f5f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; padding: 0; margin: 0; padding-bottom: 4rem;">
    <!-- App Header -->
    <AppHeader title="Aktiver Auftrag" :request-count="0" @open-requests="handleOpenRequests" @open-profile="handleOpenProfile" />

    <div style="width: 100%; max-width: 100%; margin: 0; padding: 1rem; box-sizing: border-box;">
      
      <!-- Status Banner -->
      <div style="background: #BECDA3; border-radius: 16px; padding: 1.5rem; margin-bottom: 2rem; text-align: center; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
        <div style="margin-bottom: 0.5rem;">
          <img src="/icons/einkaufenMadl.svg" alt="Aktiver Auftrag" style="width: clamp(2rem, 6vw, 2.5rem); height: clamp(2rem, 6vw, 2.5rem);">
        </div>
        <h2 style="color: #474747; font-size: clamp(1.2rem, 3.5vw, 1.4rem); font-weight: 700; margin: 0 0 0.5rem 0;">Auftrag zugewiesen!</h2>
        <p style="color: #474747; margin: 0; font-size: clamp(0.9rem, 2.5vw, 1rem); font-weight: 600;">Sie helfen Martha K.</p>
      </div>

      <!-- Senior Information -->
      <div style="background: white; border-radius: 16px; padding: 1.5rem; margin-bottom: 2rem; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
        <h3 style="color: #474747; font-size: clamp(1.1rem, 3.5vw, 1.3rem); font-weight: 600; margin: 0 0 1rem 0;">Senior-Information</h3>
        
        <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem;">
          <div style="width: 4rem; height: 4rem; background: #BECDA3; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
            <img src="/icons/verschiedeneMenschen.svg" alt="Martha" style="width: 2rem; height: 2rem;">
          </div>
          <div style="flex: 1; min-width: 0;">
            <h4 style="color: #474747; font-size: clamp(1.1rem, 3vw, 1.3rem); font-weight: 700; margin: 0 0 0.3rem 0;">Martha K.</h4>
            <div style="display: flex; align-items: center; gap: 0.3rem; margin-bottom: 0.3rem;">
              <span style="color: #BECDA3; font-size: clamp(0.9rem, 2.5vw, 1rem);">★★★★★</span>
              <span style="color: #666; font-size: clamp(0.75rem, 2vw, 0.85rem);">(4.9)</span>
            </div>
            <p style="color: #666; margin: 0; font-size: clamp(0.8rem, 2.5vw, 0.9rem);">78 Jahre • 0.8km entfernt</p>
          </div>
        </div>

        <!-- Kontakt-Informationen -->
        <div style="background: #f8f8f8; border-radius: 0.8rem; padding: 1rem; margin-bottom: 1.5rem;">
          <h5 style="color: #474747; font-size: clamp(0.9rem, 2.5vw, 1rem); font-weight: 600; margin: 0 0 0.8rem 0;">Kontaktdaten:</h5>
          
          <!-- Adresse -->
          <div style="display: flex; align-items: center; gap: 0.8rem; margin-bottom: 0.8rem;">
            <img src="/icons/logo.svg" alt="Adresse" style="width: 1rem; height: 1rem; filter: brightness(0) saturate(100%) invert(28%) sepia(8%) saturate(674%) hue-rotate(202deg) brightness(95%) contrast(87%);">
            <span style="color: #474747; font-size: clamp(0.85rem, 2.5vw, 0.95rem);">Musterstraße 45, 12345 Stadt</span>
          </div>
          
          <!-- Telefon -->
          <div style="display: flex; align-items: center; gap: 0.8rem;">
            <img src="/icons/JungeHaeltHandy.svg" alt="Telefon" style="width: 1rem; height: 1rem;">
            <span style="color: #474747; font-size: clamp(0.85rem, 2.5vw, 0.95rem);">+49 123 456 789</span>
          </div>
        </div>

        <!-- Navigation Button - GROSS -->
        <button 
          @click="handleNavigation"
          style="width: 100%; background: #474747; color: white; padding: 1.5rem; border-radius: 16px; border: none; font-weight: 700; font-size: clamp(1.1rem, 3.5vw, 1.3rem); box-shadow: 0 4px 12px rgba(0,0,0,0.1); cursor: pointer; margin-bottom: 1rem; box-sizing: border-box; transition: all 0.2s ease;"
          onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 16px rgba(0,0,0,0.15)'"
          onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.1)'"
        >
          Navigation starten
        </button>
        
        <!-- Chat Button -->
        <button 
          @click="handleChat"
          style="width: 100%; background: #BECDA3; color: #474747; padding: 1.2rem; border-radius: 16px; border: none; font-weight: 600; font-size: clamp(0.9rem, 2.5vw, 1rem); cursor: pointer; box-sizing: border-box; transition: all 0.2s ease;"
          onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 16px rgba(0,0,0,0.1)'"
          onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'"
        >
          Chat mit Martha
        </button>
      </div>

      <!-- Auftragsdetails -->
      <div style="background: white; border-radius: 16px; padding: 1.5rem; margin-bottom: 2rem; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
        <h3 style="color: #474747; font-size: clamp(1.1rem, 3.5vw, 1.3rem); font-weight: 600; margin: 0 0 1rem 0;">Auftragsdetails</h3>
        
        <div style="background: rgba(190, 205, 163, 0.2); border-radius: 0.8rem; padding: 1rem; margin-bottom: 1rem;">
          <h4 style="color: #474747; font-size: clamp(0.9rem, 2.5vw, 1rem); font-weight: 600; margin: 0 0 0.5rem 0;">Einkaufsliste:</h4>
          <ul style="color: #666; margin: 0; padding-left: 1.2rem; font-size: clamp(0.85rem, 2.5vw, 0.95rem); line-height: 1.4;">
            <li>Milch (1 Liter, Bio bevorzugt)</li>
            <li>Vollkornbrot</li>
            <li>Äpfel (6 Stück)</li>
          </ul>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; text-align: center;">
          <div style="background: #f8f8f8; border-radius: 0.8rem; padding: 1rem;">
            <div style="font-size: clamp(1.2rem, 4vw, 1.5rem); font-weight: 700; color: #474747; margin-bottom: 0.3rem;">15€</div>
            <div style="font-size: clamp(0.8rem, 2vw, 0.9rem); color: #666;">Vergütung</div>
          </div>
          <div style="background: #f8f8f8; border-radius: 0.8rem; padding: 1rem;">
            <div style="font-size: clamp(1.2rem, 4vw, 1.5rem); font-weight: 700; color: #474747; margin-bottom: 0.3rem;">45 Min</div>
            <div style="font-size: clamp(0.8rem, 2vw, 0.9rem); color: #666;">Geschätzt</div>
          </div>
        </div>
      </div>

      <!-- Chat Nachrichten -->
      <div style="background: white; border-radius: 16px; padding: 1.5rem; margin-bottom: 2rem; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
        <h3 style="color: #474747; font-size: clamp(1rem, 3vw, 1.2rem); font-weight: 600; margin: 0 0 1rem 0;">Letzte Nachricht</h3>
        
        <!-- Martha's Nachricht -->
        <div style="margin-bottom: 1rem;">
          <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.3rem;">
            <div style="width: 2rem; height: 2rem; background: #BECDA3; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
              <img src="/icons/verschiedeneMenschen.svg" alt="Martha" style="width: 1rem; height: 1rem;">
            </div>
            <span style="color: #474747; font-weight: 600; font-size: clamp(0.8rem, 2.5vw, 0.9rem);">Martha</span>
            <span style="color: #999; font-size: clamp(0.7rem, 2vw, 0.8rem);">vor 2 Min</span>
          </div>
          <div style="background: rgba(190, 205, 163, 0.2); padding: 0.8rem; border-radius: 0.8rem; margin-left: 2.5rem;">
            <p style="color: #474747; margin: 0; font-size: clamp(0.8rem, 2.5vw, 0.9rem);">Hallo! Falls Bio-Milch nicht verfügbar ist, nehmen Sie gerne normale Milch.</p>
          </div>
        </div>

        <button 
          @click="handleReply"
          style="width: 100%; background: rgba(190, 205, 163, 0.3); color: #474747; padding: 1rem; border-radius: 16px; border: 1px solid #BECDA3; cursor: pointer; font-weight: 600; font-size: clamp(0.9rem, 2.5vw, 1rem); box-sizing: border-box; transition: all 0.2s ease;"
          onmouseover="this.style.background='rgba(190, 205, 163, 0.5)'"
          onmouseout="this.style.background='rgba(190, 205, 163, 0.3)'"
        >
          Antworten
        </button>
      </div>

      <!-- Erledigt Button - PROMINENT -->
      <button 
        @click="handleComplete"
        style="width: 100%; background: #BECDA3; color: #474747; padding: 2rem; border-radius: 16px; border: none; font-weight: 700; font-size: clamp(1.2rem, 4vw, 1.5rem); box-shadow: 0 4px 12px rgba(0,0,0,0.1); cursor: pointer; margin-bottom: 2rem; box-sizing: border-box; transition: all 0.2s ease;"
        onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 16px rgba(0,0,0,0.15)'"
        onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.1)'"
      >
        Auftrag erledigt
      </button>

    </div>

    <!-- Footer Component -->
    <AppFooter 
      :active-tab="'tasks'"
      @navigate="(tab) => {
        if (tab === 'dashboard') navigateTo('/pwa/helper/dashboard')
        if (tab === 'tasks') navigateTo('/pwa/helper/task-incoming')
        if (tab === 'earnings') navigateTo('/pwa/helper/earnings')
        if (tab === 'profile') navigateTo('/pwa/helper/profile')
      }"
    />

    <!-- Padding for bottom nav -->
    <div style="height: 5rem;"></div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: false
})

// Component imports
import AppHeader from '~/components/AppHeader.vue'
import AppFooter from '~/components/AppFooter.vue'

// Event handlers
const handleOpenRequests = () => {
  navigateTo('/pwa/helper/task-incoming')
}

const handleOpenProfile = () => {
  navigateTo('/pwa/helper/profile')
}

const handleNavigation = () => {
  console.log('Starting navigation')
  // Add navigation logic
}

const handleChat = () => {
  console.log('Opening chat with Martha')
  // Add chat logic
}

const handleReply = () => {
  console.log('Opening reply interface')
  // Add reply logic
}

const handleComplete = () => {
  console.log('Marking task as complete')
  // Add completion logic
}

const handleFooterNavigation = (tab) => {
  console.log('Navigating to:', tab)
  // Add navigation logic
}
</script>