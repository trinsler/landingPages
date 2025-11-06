<template>
  <div style="min-height: 100vh; background: #f5f5f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;">
    <!-- Header Component -->
    <AppHeader 
      title="Neue Anfrage" 
      :request-count="1"
      @open-requests="() => {}"
      @open-profile="() => navigateTo('/pwa/helper/profile')"
    />

    <div style="width: 100%; max-width: 100%; margin: 0; padding: 1rem; box-sizing: border-box;">
      
      <!-- Timer - Modern Design -->
      <div style="background: linear-gradient(135deg, #e74c3c, #c0392b); border-radius: 16px; padding: 1.5rem; margin-bottom: 1.5rem; text-align: center; color: white; box-shadow: 0 4px 12px rgba(231, 76, 60, 0.3);">
        <h2 style="margin: 0 0 1rem 0; font-size: 1.25rem; font-weight: 600;">Antworten Sie schnell!</h2>
      </div>

      <!-- Auftragsdetails -->
      <div style="background: white; border-radius: 16px; padding: 1.5rem; margin-bottom: 1.5rem; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
        <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem;">
          <div style="width: 4rem; height: 4rem; background: #BECDA3; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
            <img :src="getTaskIcon(request.type)" :alt="request.type" style="width: 2rem; height: 2rem;">
          </div>
          <div style="flex: 1; min-width: 0;">
            <h3 style="color: #474747; font-size: 1.25rem; font-weight: 600; margin: 0 0 0.25rem 0;">{{ request.title }}</h3>
            <p style="color: #8F8B82; margin: 0; font-size: 0.875rem;">{{ request.client }}</p>
          </div>
        </div>

        <!-- Wichtige Details -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem;">
          <div style="background: rgba(190, 205, 163, 0.1); border: 1px solid #BECDA3; border-radius: 12px; padding: 1rem; text-align: center;">
            <div style="font-size: 1.25rem; font-weight: 600; color: #474747; margin-bottom: 0.25rem;">{{ request.distance }}</div>
            <div style="font-size: 0.75rem; color: #8F8B82;">Entfernung</div>
          </div>
          <div style="background: rgba(190, 205, 163, 0.1); border: 1px solid #BECDA3; border-radius: 12px; padding: 1rem; text-align: center;">
            <div style="font-size: 1.25rem; font-weight: 600; color: #474747; margin-bottom: 0.25rem;">{{ request.payment }}€</div>
            <div style="font-size: 0.75rem; color: #8F8B82;">Vergütung</div>
          </div>
        </div>

        <!-- Senior Rating -->
        <div style="background: #f9fafb; border-radius: 12px; padding: 1rem; margin-bottom: 1.5rem;">
          <h4 style="color: #474747; font-size: 1rem; font-weight: 600; margin: 0 0 0.75rem 0;">Senior-Bewertung</h4>
          <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
            <span style="color: #BECDA3; font-size: 1rem;">★★★★★</span>
            <span style="color: #474747; font-weight: 600; font-size: 0.875rem;">(4.9)</span>
            <span style="color: #8F8B82; font-size: 0.75rem;">• 23 Bewertungen</span>
          </div>
          <p style="color: #8F8B82; margin: 0; font-size: 0.8rem; font-style: italic;">
            "Sehr freundlich und zuverlässig"
          </p>
        </div>

        <!-- Auftragsdetails -->
        <div style="background: rgba(95, 111, 85, 0.05); border: 1px solid #5F6F55; border-radius: 12px; padding: 1rem;">
          <h4 style="color: #474747; font-size: 1rem; font-weight: 600; margin: 0 0 0.75rem 0;">Was zu tun ist:</h4>
          <p style="color: #474747; margin: 0 0 1rem 0; font-size: 0.875rem; line-height: 1.4;">
            "{{ request.description }}"
          </p>
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <img src="/icons/logo.svg" alt="Adresse" style="width: 1rem; height: 1rem;">
            <span style="color: #8F8B82; font-size: 0.75rem;">{{ request.address }}</span>
          </div>
        </div>
      </div>

      <!-- Aktions-Buttons -->
      <div style="display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 1.5rem;">
        <!-- Annehmen Button -->
        <button 
          @click="acceptTask"
          style="width: 100%; background: #5F6F55; color: white; padding: 1rem; border-radius: 12px; border: none; font-weight: 600; font-size: 1rem; box-shadow: 0 2px 8px rgba(95, 111, 85, 0.3); cursor: pointer; transition: all 0.2s; box-sizing: border-box;"
          onmouseover="this.style.transform='translateY(-1px)'; this.style.boxShadow='0 4px 12px rgba(95, 111, 85, 0.4)';"
          onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 8px rgba(95, 111, 85, 0.3)';"
        >
          Auftrag annehmen
        </button>
        
        <!-- Ablehnen Button -->
        <button 
          @click="declineTask"
          style="width: 100%; background: white; color: #e74c3c; padding: 1rem; border-radius: 12px; border: 1px solid #e74c3c; font-weight: 600; font-size: 0.875rem; cursor: pointer; transition: all 0.2s; box-sizing: border-box;"
          onmouseover="this.style.background='#e74c3c'; this.style.color='white';"
          onmouseout="this.style.background='white'; this.style.color='#e74c3c';"
        >
          Ablehnen
        </button>
      </div>

      <!-- Info Hinweis -->
      <div style="background: rgba(95, 111, 85, 0.05); border-radius: 12px; padding: 1rem; text-align: center;">
        <p style="color: #8F8B82; margin: 0; font-size: 0.75rem;">
          Sie haben 2 Minuten Zeit zu antworten
        </p>
      </div>

    </div>

    <!-- Footer Component -->
    <UnifiedFooter 
      :active-tab="'tasks'"
      @navigate="(tab) => {
        if (tab === 'dashboard') navigateTo('/pwa')
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
import { ref } from 'vue'
import AppHeader from '~/components/AppHeader.vue'
import UnifiedFooter from '~/components/pwa/unified/UnifiedFooter.vue'

definePageMeta({
  layout: false
})

// Get request data from route query or use default
const route = useRoute()
const request = ref({
  id: route.query.id || 1,
  title: route.query.title || 'Einkaufen für Martha K.',
  type: route.query.type || 'shopping',
  client: route.query.client || 'Martha K., 78 Jahre',
  area: route.query.area || 'Maxvorstadt',
  payment: route.query.payment || 15,
  distance: route.query.distance || '0.8km',
  description: route.query.description || 'Bitte Milch, Vollkornbrot und 6 Äpfel vom Supermarkt in der Musterstraße. Wichtig: Bio-Milch bevorzugt.',
  address: route.query.address || 'Musterstraße 45, 12345 Stadt'
})

const acceptTask = () => {
  navigateTo('/pwa/helper/task-active')
}

const declineTask = () => {
  navigateTo('/pwa')
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