<template>
  <div style="min-height: 100vh; background: #f5f5f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;">
    <!-- Header Component -->
    <AppHeader 
      :title="getRoleBasedTitle('support')"
      :current-role="currentRole"
      :request-count="0"
      @open-requests="getRequestButtonAction()"
      @open-profile="() => navigateTo('/pwa/shared/profile')"
      @open-news="getNewsAction()"
      @toggle-role="toggleRole"
    />

    <div style="padding: 1rem; padding-bottom: 6rem;">
      
      <!-- Header Info -->
      <div style="background: white; border-radius: 16px; padding: 2rem; margin-bottom: 1.5rem; box-shadow: 0 4px 12px rgba(0,0,0,0.1); text-align: center;">
        <div style="margin-bottom: 0.5rem;">
          <div style="width: 4rem; height: 4rem; background: #BECDA3; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem auto;">
            <svg style="width: 2rem; height: 2rem; color: #474747;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"/>
            </svg>
          </div>
        </div>
        <h2 style="color: #474747; font-size: 1.5rem; font-weight: 600; margin: 0 0 0.5rem 0;">Support & Hilfe</h2>
        <p style="color: #8F8B82; margin: 0; font-size: 1rem;">Wir sind für Sie da - rund um die Uhr</p>
      </div>

      <!-- Emergency Alert -->
      <div style="background: linear-gradient(135deg, #e74c3c, #c0392b); color: white; border-radius: 16px; padding: 1.5rem; margin-bottom: 1.5rem; box-shadow: 0 4px 12px rgba(231, 76, 60, 0.3);">
        <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
          <div style="width: 3rem; height: 3rem; background: rgba(255,255,255,0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
            <svg style="width: 1.5rem; height: 1.5rem; color: white;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"/>
            </svg>
          </div>
          <div>
            <h3 style="color: white; font-size: 1.25rem; font-weight: 600; margin: 0 0 0.5rem 0;">Notfall-Hotline</h3>
            <p style="color: rgba(255,255,255,0.9); margin: 0; font-size: 0.875rem;">Bei akuten Problemen oder Sicherheitsbedenken</p>
          </div>
        </div>
        
        <button @click="callEmergency" 
                style="width: 100%; background: rgba(255,255,255,0.2); color: white; padding: 1rem; border: 2px solid rgba(255,255,255,0.3); border-radius: 12px; font-weight: 600; cursor: pointer; font-size: 1rem; transition: all 0.2s;"
                onmouseover="this.style.background='rgba(255,255,255,0.3)'"
                onmouseout="this.style.background='rgba(255,255,255,0.2)'">
          📞 Notfall-Hotline: 0800 - 123 456 789
        </button>
      </div>

      <!-- Quick Actions -->
      <div style="background: white; border-radius: 16px; padding: 1.5rem; margin-bottom: 1.5rem; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
        <h3 style="color: #474747; font-size: 1.25rem; font-weight: 600; margin: 0 0 1rem 0;">Schnelle Hilfe</h3>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
          <button style="display: flex; flex-direction: column; align-items: center; padding: 1.5rem; background: #f9fafb; border-radius: 12px; border: none; cursor: pointer; transition: all 0.2s;"
                  onmouseover="this.style.background='#f3f4f6'; this.style.transform='translateY(-2px)'"
                  onmouseout="this.style.background='#f9fafb'; this.style.transform='translateY(0)'">
            <div style="width: 3rem; height: 3rem; background: #5F6F55; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 1rem;">
              <svg style="width: 1.5rem; height: 1.5rem; color: white;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
              </svg>
            </div>
            <span style="color: #474747; font-weight: 600; font-size: 0.875rem; text-align: center;">Datenschutz & Sicherheit</span>
          </button>

          <button @click="openConflictResolution" 
                  style="display: flex; flex-direction: column; align-items: center; padding: 1.5rem; background: #f9fafb; border-radius: 12px; border: none; cursor: pointer; transition: all 0.2s;"
                  onmouseover="this.style.background='#f3f4f6'; this.style.transform='translateY(-2px)'"
                  onmouseout="this.style.background='#f9fafb'; this.style.transform='translateY(0)'">
            <div style="width: 3rem; height: 3rem; background: #8F8B82; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 1rem;">
              <svg style="width: 1.5rem; height: 1.5rem; color: white;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"/>
              </svg>
            </div>
            <span style="color: #474747; font-weight: 600; font-size: 0.875rem; text-align: center;">Konfliktlösung</span>
          </button>
        </div>
      </div>

      <!-- Common Issues -->
      <div style="background: white; border-radius: 16px; padding: 1.5rem; margin-bottom: 1.5rem; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
        <h3 style="color: #474747; font-size: 1.25rem; font-weight: 600; margin: 0 0 1rem 0;">Häufige Fragen</h3>
        
        <div style="display: flex; flex-direction: column; gap: 0.75rem;">
          <div 
            v-for="(issue, index) in commonIssues" 
            :key="index"
            style="border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; transition: all 0.2s;"
          >
            <button 
              @click="toggleIssue(index)"
              style="width: 100%; background: none; border: none; padding: 1rem; text-align: left; cursor: pointer; display: flex; justify-content: space-between; align-items: center; transition: all 0.2s;"
              onmouseover="this.style.background='#f9fafb'"
              onmouseout="this.style.background='none'"
            >
              <span style="color: #474747; font-weight: 600; font-size: 0.875rem;">{{ issue.question }}</span>
              <svg :style="`width: 1rem; height: 1rem; color: #8F8B82; transform: rotate(${expandedIssues.includes(index) ? '180deg' : '0deg'}); transition: transform 0.2s;`" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>
            
            <div v-if="expandedIssues.includes(index)" style="padding: 0 1rem 1rem 1rem; background: #f9fafb;">
              <p style="color: #8F8B82; margin: 0; font-size: 0.875rem; line-height: 1.5;">{{ issue.answer }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Contact Options -->
      <div style="background: white; border-radius: 16px; padding: 1.5rem; margin-bottom: 1.5rem; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
        <h3 style="color: #474747; font-size: 1.25rem; font-weight: 600; margin: 0 0 1rem 0;">Kontakt aufnehmen</h3>
        
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <button style="display: flex; align-items: center; justify-content: space-between; padding: 1rem; background: #f9fafb; border-radius: 12px; border: none; cursor: pointer; transition: all 0.2s;"
                  onmouseover="this.style.background='#f3f4f6'"
                  onmouseout="this.style.background='#f9fafb'">
            <div style="display: flex; align-items: center; gap: 1rem;">
              <div style="width: 2.5rem; height: 2.5rem; background: #BECDA3; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                <svg style="width: 1.25rem; height: 1.25rem; color: #474747;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </div>
              <div>
                <div style="color: #474747; font-weight: 600; font-size: 0.875rem;">E-Mail Support</div>
                <div style="color: #8F8B82; font-size: 0.75rem;">support@naechstenliebe.de</div>
              </div>
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
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
              </div>
              <div>
                <div style="color: #474747; font-weight: 600; font-size: 0.875rem;">Telefon-Support</div>
                <div style="color: #8F8B82; font-size: 0.75rem;">Mo-Fr 9:00-18:00 Uhr</div>
              </div>
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
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                </svg>
              </div>
              <div>
                <div style="color: #474747; font-weight: 600; font-size: 0.875rem;">Live-Chat</div>
                <div style="color: #8F8B82; font-size: 0.75rem;">Sofortige Hilfe verfügbar</div>
              </div>
            </div>
            <svg style="width: 1.25rem; height: 1.25rem; color: #8F8B82;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>

    </div>

    <!-- Footer Component -->
    <UnifiedFooter 
      :active-tab="'support'"
      :current-role="currentRole"
      @navigate="handleNavigation"
    />

    <!-- Padding for bottom nav -->
    <div style="height: 5rem;"></div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
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

const expandedIssues = ref([])

const commonIssues = ref([
  {
    question: 'Wie kann ich meine Anfrage stornieren?',
    answer: 'Sie können Ihre Anfrage bis zu 2 Stunden vor dem vereinbarten Termin kostenlos stornieren. Gehen Sie dazu zu Ihren aktiven Aufträgen und wählen Sie "Stornieren".'
  },
  {
    question: 'Wann erhalte ich meine Zahlung?',
    answer: 'Als Helfer erhalten Sie Ihre Zahlung automatisch 24 Stunden nach Abschluss des Auftrags auf Ihr hinterlegtes Konto.'
  },
  {
    question: 'Was passiert bei Schäden?',
    answer: 'Alle Aufträge sind über unsere Versicherung abgedeckt. Melden Sie Schäden sofort über die App oder unsere Hotline.'
  },
  {
    question: 'Wie ändere ich meine Zahlungsmethode?',
    answer: 'Gehen Sie zu Ihrem Profil > Einstellungen > Zahlungsmethoden. Dort können Sie neue Methoden hinzufügen oder vorhandene bearbeiten.'
  },
  {
    question: 'Was ist, wenn der Helfer nicht erscheint?',
    answer: 'Kontaktieren Sie uns sofort über die App oder Hotline. Wir finden schnell Ersatz und erstatten eventuelle Gebühren zurück.'
  }
])

const toggleIssue = (index) => {
  const issueIndex = expandedIssues.value.indexOf(index)
  if (issueIndex > -1) {
    expandedIssues.value.splice(issueIndex, 1)
  } else {
    expandedIssues.value.push(index)
  }
}

const callEmergency = () => {
  // In a real app, this would initiate a call
  alert('Notfall-Hotline wird kontaktiert. In einer echten App würde hier ein Anruf getätigt werden.')
}

const openConflictResolution = () => {
  // This would open a conflict resolution form
  console.log('Opening conflict resolution')
}

const handleNavigation = (tab) => {
  const path = getRoleBasedNavigation(tab)
  if (path) {
    navigateTo(path)
  }
}
</script>