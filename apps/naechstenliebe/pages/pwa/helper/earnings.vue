<template>
  <div style="min-height: 100vh; background: #f5f5f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;">
    <!-- Header Component -->
    <AppHeader 
      title="Meine Verdienste" 
      :request-count="0"
      @open-requests="() => navigateTo('/pwa/helper/task-incoming')"
      @open-profile="() => navigateTo('/pwa/helper/profile')"
    />

    <div style="padding: 1rem; padding-bottom: 6rem;">
      
      <!-- Verfügbares Guthaben - PROMINENT -->
      <div style="background: linear-gradient(135deg, #5F6F55, #4a5c44); border-radius: 16px; padding: 2rem; margin-bottom: 1.5rem; text-align: center; box-shadow: 0 4px 12px rgba(95, 111, 85, 0.3);">
        <h2 style="color: white; font-size: 1.25rem; font-weight: 600; margin: 0 0 0.5rem 0;">Verfügbares Guthaben</h2>
        <div style="font-size: 3rem; font-weight: 700; color: white; margin: 0 0 0.5rem 0;">47,50€</div>
        <p style="color: rgba(255,255,255,0.9); margin: 0; font-size: 0.875rem;">Bereit zur Auszahlung</p>
      </div>

      <!-- Auszahlung anfordern -->
      <div style="background: white; border-radius: 16px; padding: 1.5rem; margin-bottom: 1.5rem; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
        <h3 style="color: #474747; font-size: 1.1rem; font-weight: 600; margin: 0 0 1rem 0;">Auszahlung</h3>
        
        <div style="background: rgba(95, 111, 85, 0.05); border-radius: 12px; padding: 1rem; margin-bottom: 1.5rem; text-align: center;">
          <p style="color: #474747; margin: 0 0 0.5rem 0; font-size: 0.875rem; font-weight: 600;">Mindestbetrag: 20€</p>
          <p style="color: #8F8B82; margin: 0; font-size: 0.75rem;">Auszahlung erfolgt innerhalb von 2-3 Werktagen</p>
        </div>

        <button 
          @click="requestPayout"
          style="width: 100%; background: #5F6F55; color: white; padding: 1.5rem; border-radius: 12px; border: none; font-weight: 600; font-size: 1rem; cursor: pointer; box-sizing: border-box; transition: all 0.2s;"
          onmouseover="this.style.transform='translateY(-1px)'; this.style.boxShadow='0 4px 12px rgba(95, 111, 85, 0.4)';"
          onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none';"
        >
          Auszahlung anfordern (47,50€)
        </button>
      </div>

      <!-- Ausstehende Zahlungen -->
      <div style="background: white; border-radius: 16px; padding: 1.5rem; margin-bottom: 1.5rem; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
        <h3 style="color: #474747; font-size: 1.1rem; font-weight: 600; margin: 0 0 1rem 0;">Ausstehende Zahlungen</h3>
        
        <!-- Ausstehende Zahlung -->
        <div style="border: 2px solid #BECDA3; border-radius: 12px; padding: 1rem; margin-bottom: 1rem; background: rgba(190, 205, 163, 0.1);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
            <span style="color: #474747; font-weight: 600; font-size: 0.875rem;">Einkaufen für Martha K.</span>
            <span style="color: #474747; font-weight: 700; font-size: 0.875rem;">15€</span>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="color: #8F8B82; font-size: 0.75rem;">Heute, 15:30</span>
            <span style="background: #27ae60; color: white; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.7rem; font-weight: 600;">
              Bestätigt
            </span>
          </div>
        </div>

        <!-- Weitere ausstehende -->
        <div style="border: 1px solid #e5e7eb; border-radius: 12px; padding: 1rem; background: #f9fafb;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
            <span style="color: #474747; font-weight: 600; font-size: 0.875rem;">Kochen für Klaus B.</span>
            <span style="color: #474747; font-weight: 700; font-size: 0.875rem;">25€</span>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="color: #8F8B82; font-size: 0.75rem;">Gestern, 18:00</span>
            <span style="background: #f39c12; color: white; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.7rem; font-weight: 600;">
              Wartet
            </span>
          </div>
        </div>
      </div>

      <!-- Transaktionsverlauf -->
      <div style="background: white; border-radius: 16px; padding: 1.5rem; margin-bottom: 1.5rem; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
        <h3 style="color: #474747; font-size: 1.1rem; font-weight: 600; margin: 0 0 1rem 0;">Transaktionsverlauf</h3>
        
        <!-- Heute -->
        <div style="margin-bottom: 1.5rem;">
          <h4 style="color: #474747; font-size: 1rem; font-weight: 600; margin: 0 0 0.8rem 0; padding-left: 0.5rem;">Heute</h4>
          
          <div style="border-left: 3px solid #BECDA3; padding-left: 1rem; margin-bottom: 1rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.3rem;">
              <span style="color: #474747; font-weight: 600; font-size: 0.875rem;">Einkaufen • Martha K.</span>
              <span style="color: #27ae60; font-weight: 700; font-size: 0.875rem;">+15€</span>
            </div>
            <span style="color: #8F8B82; font-size: 0.75rem;">15:30 • Auftrag erledigt</span>
          </div>
        </div>

        <!-- Diese Woche -->
        <div style="margin-bottom: 1.5rem;">
          <h4 style="color: #474747; font-size: 1rem; font-weight: 600; margin: 0 0 0.8rem 0; padding-left: 0.5rem;">Diese Woche</h4>
          
          <div style="border-left: 3px solid #d1d5db; padding-left: 1rem; margin-bottom: 1rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.3rem;">
              <span style="color: #474747; font-weight: 600; font-size: 0.875rem;">Auszahlung</span>
              <span style="color: #e74c3c; font-weight: 700; font-size: 0.875rem;">-32,50€</span>
            </div>
            <span style="color: #8F8B82; font-size: 0.75rem;">Montag • Auf Bankkonto</span>
          </div>

          <div style="border-left: 3px solid #BECDA3; padding-left: 1rem; margin-bottom: 1rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.3rem;">
              <span style="color: #474747; font-weight: 600; font-size: 0.875rem;">Technik-Hilfe • Anna S.</span>
              <span style="color: #27ae60; font-weight: 700; font-size: 0.875rem;">+30€</span>
            </div>
            <span style="color: #8F8B82; font-size: 0.75rem;">Montag • Auftrag erledigt</span>
          </div>
        </div>

        <button 
          @click="viewFullHistory"
          style="width: 100%; background: rgba(95, 111, 85, 0.1); color: #5F6F55; padding: 1rem; border-radius: 12px; border: 1px solid #5F6F55; cursor: pointer; font-weight: 600; font-size: 0.875rem; box-sizing: border-box; transition: all 0.2s;"
          onmouseover="this.style.background='#5F6F55'; this.style.color='white';"
          onmouseout="this.style.background='rgba(95, 111, 85, 0.1)'; this.style.color='#5F6F55';"
        >
          Vollständigen Verlauf anzeigen
        </button>
      </div>

      <!-- Statistik -->
      <div style="background: white; border-radius: 16px; padding: 1.5rem; margin-bottom: 1.5rem; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
        <h3 style="color: #474747; font-size: 1.1rem; font-weight: 600; margin: 0 0 1rem 0;">Ihre Statistiken</h3>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; text-align: center;">
          <div style="background: rgba(95, 111, 85, 0.05); border: 1px solid #5F6F55; border-radius: 12px; padding: 1rem;">
            <div style="font-size: 1.5rem; font-weight: 700; color: #474747; margin-bottom: 0.25rem;">342€</div>
            <div style="font-size: 0.75rem; color: #8F8B82;">Gesamt verdient</div>
          </div>
          <div style="background: rgba(95, 111, 85, 0.05); border: 1px solid #5F6F55; border-radius: 12px; padding: 1rem;">
            <div style="font-size: 1.5rem; font-weight: 700; color: #474747; margin-bottom: 0.25rem;">4.9</div>
            <div style="font-size: 0.75rem; color: #8F8B82;">Durchschnitt</div>
          </div>
        </div>
      </div>

    </div>

    <!-- Footer Component -->
    <AppFooter 
      :active-tab="'earnings'"
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
import AppHeader from '~/components/AppHeader.vue'
import AppFooter from '~/components/AppFooter.vue'

definePageMeta({
  layout: false
})

const requestPayout = () => {
  console.log('Requesting payout of 47.50€')
  // Add payout logic
}

const viewFullHistory = () => {
  console.log('Viewing full transaction history')
  // Add history logic
}
</script>