<template>
  <div style="min-height: 100vh; background: #f5f5f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;">
    <!-- Header Component -->
    <AppHeader 
      title="Warten auf Bestätigung" 
      :request-count="0"
      @open-requests="() => navigateTo('/pwa/helper/task-incoming')"
      @open-profile="() => navigateTo('/pwa/helper/profile')"
    />

    <div style="display: flex; flex-direction: column; justify-content: center; min-height: calc(100vh - 160px); padding: 1rem;">
      
      <!-- Hauptbereich - Zentriert -->
      <div style="text-align: center; margin-bottom: 2rem;">
        
        <!-- Ladeanimation -->
        <div style="margin-bottom: 2rem;">
          <div style="width: 5rem; height: 5rem; border: 4px solid #BECDA3; border-top: 4px solid #5F6F55; border-radius: 50%; margin: 0 auto; animation: spin 2s linear infinite;"></div>
        </div>

        <!-- Hauptnachricht -->
        <h2 style="color: #474747; font-size: 1.75rem; font-weight: 600; margin: 0 0 1rem 0;">Senior prüft Ihr Profil...</h2>
        <p style="color: #8F8B82; margin: 0 0 2rem 0; font-size: 1rem;">Bitte haben Sie einen Moment Geduld</p>

        <!-- Status-Info Card -->
        <div style="background: white; border-radius: 16px; padding: 2rem; margin-bottom: 2rem; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
          <div style="margin-bottom: 1.5rem;">
            <img src="/icons/verschiedeneMenschen.svg" alt="Profil wird geprüft" style="width: 3rem; height: 3rem;">
          </div>
          <h3 style="color: #474747; font-size: 1.1rem; font-weight: 600; margin: 0 0 1rem 0;">Was passiert gerade?</h3>
          <p style="color: #8F8B82; margin: 0; font-size: 0.875rem; line-height: 1.5;">
            Martha K. schaut sich Ihr Profil an und entscheidet, ob sie Ihnen den Auftrag zuweisen möchte.
          </p>
        </div>

        <!-- Auftragsinformationen -->
        <div style="background: rgba(95, 111, 85, 0.05); border: 1px solid #5F6F55; border-radius: 12px; padding: 1.5rem; margin-bottom: 2rem;">
          <h4 style="color: #474747; font-size: 1rem; font-weight: 600; margin: 0 0 1rem 0;">Ihr angenommener Auftrag:</h4>
          <div style="display: flex; align-items: center; gap: 1rem;">
            <div style="width: 2.5rem; height: 2.5rem; background: #BECDA3; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
              <img src="/icons/einkaufenMadl.svg" alt="Einkaufen" style="width: 1.25rem; height: 1.25rem;">
            </div>
            <div style="flex: 1; min-width: 0; text-align: left;">
              <h5 style="color: #474747; font-size: 1rem; font-weight: 600; margin: 0;">Einkaufen</h5>
              <p style="color: #8F8B82; margin: 0; font-size: 0.875rem;">0.8km • 15€ • Martha K.</p>
            </div>
          </div>
        </div>

        <!-- Zeitschätzung -->
        <div style="background: #f9fafb; border-radius: 12px; padding: 1rem;">
          <p style="color: #474747; margin: 0; font-size: 0.875rem;">
            <strong>Durchschnittliche Wartezeit:</strong> 1-3 Minuten
          </p>
        </div>

      </div>

      <!-- Abbrechen Button -->
      <div style="text-align: center;">
        <button 
          @click="cancelRequest"
          style="background: white; color: #e74c3c; padding: 1rem 2rem; border-radius: 12px; border: 1px solid #e74c3c; font-weight: 600; font-size: 0.875rem; cursor: pointer; transition: all 0.2s;"
          onmouseover="this.style.background='#e74c3c'; this.style.color='white';"
          onmouseout="this.style.background='white'; this.style.color='#e74c3c';"
        >
          Anfrage zurückziehen
        </button>
      </div>

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
import { onMounted, onUnmounted } from 'vue'
import AppHeader from '~/components/AppHeader.vue'
import AppFooter from '~/components/AppFooter.vue'

definePageMeta({
  layout: false
})

let intervalId = null

onMounted(() => {
  // Simulate checking for senior confirmation every 5 seconds
  intervalId = setInterval(() => {
    console.log('Checking for senior confirmation...')
    // In real app, this would check with backend
    // If confirmed, navigate to task-active
  }, 5000)
})

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})

const cancelRequest = () => {
  console.log('Cancelling request')
  navigateTo('/pwa/helper/task-incoming')
}
</script>

<style scoped>
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>