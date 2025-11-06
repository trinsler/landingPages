<template>
  <div style="min-height: 100vh; background: #f5f5f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;">
    <!-- Header Component -->
    <AppHeader 
      title="Auftrag abschließen" 
      :request-count="0"
      @open-requests="() => navigateTo('/pwa/helper/task-incoming')"
      @open-profile="() => navigateTo('/pwa/helper/profile')"
    />

    <div style="padding: 1rem; padding-bottom: 6rem;">
      
      <!-- Erfolgs Header -->
      <div style="text-align: center; margin-bottom: 2rem;">
        <div style="margin-bottom: 1.5rem;">
          <div style="width: 4rem; height: 4rem; background: #27ae60; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto;">
            <span style="color: white; font-size: 2rem; font-weight: 600;">✓</span>
          </div>
        </div>
        <h2 style="color: #474747; font-size: 1.75rem; font-weight: 600; margin: 0 0 0.5rem 0;">Gut gemacht!</h2>
        <p style="color: #8F8B82; margin: 0; font-size: 1rem;">Sie haben Martha geholfen</p>
      </div>

      <!-- Auftrag als erledigt markieren -->
      <div style="background: white; border-radius: 16px; padding: 2rem; margin-bottom: 1.5rem; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
        <h3 style="color: #474747; font-size: 1.25rem; font-weight: 600; margin: 0 0 1.5rem 0; text-align: center;">Auftrag als erledigt markieren</h3>
        
        <!-- Auftragsdetails -->
        <div style="background: rgba(95, 111, 85, 0.05); border: 1px solid #5F6F55; border-radius: 12px; padding: 1.5rem; margin-bottom: 2rem;">
          <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
            <div style="width: 3rem; height: 3rem; background: #BECDA3; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
              <img src="/icons/einkaufenMadl.svg" alt="Einkaufen" style="width: 1.5rem; height: 1.5rem;">
            </div>
            <div style="flex: 1; min-width: 0;">
              <h4 style="color: #474747; font-size: 1.1rem; font-weight: 600; margin: 0;">Einkaufen für Martha K.</h4>
              <p style="color: #8F8B82; margin: 0; font-size: 0.875rem;">15€ • 45 Min Dauer</p>
            </div>
          </div>
          
          <div style="background: white; border-radius: 8px; padding: 1rem;">
            <h5 style="color: #474747; font-size: 1rem; font-weight: 600; margin: 0 0 0.5rem 0;">Eingekauft:</h5>
            <ul style="color: #474747; margin: 0; padding-left: 1rem; font-size: 0.875rem; line-height: 1.4;">
              <li>Bio-Milch (1 Liter)</li>
              <li>Vollkornbrot</li>
              <li>Äpfel (6 Stück)</li>
            </ul>
          </div>
        </div>

        <!-- Bestätigung Button -->
        <button 
          @click="markAsCompleted"
          style="width: 100%; background: #5F6F55; color: white; padding: 1.5rem; border-radius: 12px; border: none; font-weight: 600; font-size: 1rem; cursor: pointer; margin-bottom: 1rem; box-sizing: border-box; transition: all 0.2s;"
          onmouseover="this.style.transform='translateY(-1px)'; this.style.boxShadow='0 4px 12px rgba(95, 111, 85, 0.4)';"
          onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none';"
        >
          Als erledigt markieren
        </button>
        
        <p style="color: #8F8B82; margin: 0; text-align: center; font-size: 0.75rem;">
          Martha wird benachrichtigt und kann den Auftrag bestätigen
        </p>
      </div>

      <!-- Warten auf Senior-Bestätigung -->
      <div style="background: white; border-radius: 16px; padding: 1.5rem; margin-bottom: 1.5rem; box-shadow: 0 4px 12px rgba(0,0,0,0.1); text-align: center;">
        <div style="margin-bottom: 1rem;">
          <div style="width: 2.5rem; height: 2.5rem; border: 3px solid #BECDA3; border-top: 3px solid #5F6F55; border-radius: 50%; margin: 0 auto; animation: spin 2s linear infinite;"></div>
        </div>
        <h4 style="color: #474747; font-size: 1.1rem; font-weight: 600; margin: 0 0 0.5rem 0;">Warten auf Bestätigung...</h4>
        <p style="color: #8F8B82; margin: 0; font-size: 0.875rem;">Martha prüft die Erledigung</p>
      </div>

      <!-- Senior bewerten -->
      <div style="background: white; border-radius: 16px; padding: 2rem; margin-bottom: 1.5rem; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
        <h3 style="color: #474747; font-size: 1.1rem; font-weight: 600; margin: 0 0 1.5rem 0; text-align: center;">Martha bewerten</h3>
        
        <!-- Sterne Bewertung -->
        <div style="text-align: center; margin-bottom: 1.5rem;">
          <div style="display: flex; justify-content: center; gap: 0.5rem; font-size: 2rem; margin-bottom: 1rem;">
            <button 
              v-for="star in 5" 
              :key="star"
              @click="setRating(star)"
              :style="'background: none; border: none; cursor: pointer; transition: all 0.2s; color: ' + (rating >= star ? '#BECDA3' : '#e5e7eb') + ';'"
            >★</button>
          </div>
          <p style="color: #474747; margin: 0; font-weight: 600; font-size: 1rem;">{{ ratingText }}</p>
        </div>

        <!-- Kommentar -->
        <div style="margin-bottom: 1.5rem;">
          <label style="color: #474747; font-weight: 600; margin-bottom: 0.5rem; display: block; font-size: 0.875rem;">Kommentar (optional):</label>
          <textarea 
            v-model="comment"
            style="width: 100%; min-height: 4rem; padding: 1rem; border: 1px solid #e5e7eb; border-radius: 8px; resize: vertical; background: #f9fafb; box-sizing: border-box; font-family: inherit; font-size: 0.875rem;" 
            placeholder="Wie war die Zusammenarbeit mit Martha?"
          ></textarea>
        </div>

        <!-- Senior-Info -->
        <div style="background: rgba(95, 111, 85, 0.05); border-radius: 12px; padding: 1rem; display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem;">
          <div style="width: 3rem; height: 3rem; background: #BECDA3; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
            <img src="/icons/verschiedeneMenschen.svg" alt="Martha" style="width: 1.5rem; height: 1.5rem;">
          </div>
          <div style="flex: 1; min-width: 0;">
            <h5 style="color: #474747; font-size: 1rem; font-weight: 600; margin: 0;">Martha K.</h5>
            <p style="color: #8F8B82; margin: 0; font-size: 0.875rem;">78 Jahre • Sehr freundlich</p>
          </div>
        </div>

        <button 
          @click="submitRating"
          style="width: 100%; background: #474747; color: white; padding: 1rem; border-radius: 12px; border: none; font-weight: 600; font-size: 0.875rem; cursor: pointer; transition: all 0.2s;"
          onmouseover="this.style.background='#5a5a5a';"
          onmouseout="this.style.background='#474747';"
        >
          Bewertung abgeben
        </button>
      </div>

      <!-- Zurück zum Dashboard -->
      <button 
        @click="goToDashboard"
        style="width: 100%; background: rgba(95, 111, 85, 0.1); color: #5F6F55; padding: 1rem; border-radius: 12px; border: 1px solid #5F6F55; cursor: pointer; font-weight: 600; font-size: 0.875rem; margin-bottom: 1.5rem; box-sizing: border-box; transition: all 0.2s;"
        onmouseover="this.style.background='#5F6F55'; this.style.color='white';"
        onmouseout="this.style.background='rgba(95, 111, 85, 0.1)'; this.style.color='#5F6F55';"
      >
        Zurück zum Dashboard
      </button>

    </div>

    <!-- Footer Component -->
    <UnifiedFooter 
      :active-tab="'dashboard'"
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
import { ref, computed } from 'vue'
import AppHeader from '~/components/AppHeader.vue'
import UnifiedFooter from '~/components/pwa/unified/UnifiedFooter.vue'

definePageMeta({
  layout: false
})

const rating = ref(0)
const comment = ref('')

const ratingText = computed(() => {
  const texts = {
    0: 'Bewerten Sie Martha',
    1: 'Schlecht',
    2: 'In Ordnung', 
    3: 'Gut',
    4: 'Sehr gut',
    5: 'Ausgezeichnet!'
  }
  return texts[rating.value] || 'Bewerten Sie Martha'
})

const setRating = (value) => {
  rating.value = value
}

const markAsCompleted = () => {
  console.log('Marking task as completed')
  // Add completion logic
}

const submitRating = () => {
  console.log('Submitting rating:', { rating: rating.value, comment: comment.value })
  // Add rating submission logic
}

const goToDashboard = () => {
  navigateTo('/pwa')
}
</script>

<style scoped>
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>