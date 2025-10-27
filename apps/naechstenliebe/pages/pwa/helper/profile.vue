<template>
  <div style="min-height: 100vh; background: #f5f5f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;">
    <!-- Header Component -->
    <AppHeader 
      title="Mein Profil" 
      :request-count="0"
      @open-requests="() => navigateTo('/pwa/helper/task-incoming')"
      @open-profile="() => {}"
    />

    <div style="padding: 1rem; padding-bottom: 6rem;">
      
      <!-- Profil Header -->
      <div style="background: white; border-radius: 16px; padding: 2rem; margin-bottom: 1.5rem; box-shadow: 0 4px 12px rgba(0,0,0,0.1); text-align: center;">
        <div style="margin-bottom: 1.5rem;">
          <div style="width: 5rem; height: 5rem; background: #BECDA3; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto; position: relative;">
            <img src="/icons/verschiedeneMenschen.svg" alt="Profil" style="width: 2.5rem; height: 2.5rem;">
            <button 
              @click="editProfile"
              style="position: absolute; bottom: 0; right: 0; background: #5F6F55; color: white; border: none; border-radius: 50%; width: 2rem; height: 2rem; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 6px rgba(0,0,0,0.2); transition: all 0.2s;"
              onmouseover="this.style.transform='scale(1.1)';"
              onmouseout="this.style.transform='scale(1)';"
            >
              <img src="/icons/technikBanalcieren.svg" alt="Bearbeiten" style="width: 0.8rem; height: 0.8rem; filter: brightness(0) invert(1);">
            </button>
          </div>
        </div>
        <h2 style="color: #474747; font-size: 1.5rem; font-weight: 600; margin: 0 0 0.5rem 0;">Max Mustermann</h2>
        <div style="display: flex; align-items: center; justify-content: center; gap: 0.5rem; margin-bottom: 0.5rem;">
          <span style="color: #BECDA3; font-size: 1.1rem;">★★★★★</span>
          <span style="color: #474747; font-weight: 600; font-size: 1rem;">(4.9)</span>
        </div>
        <p style="color: #8F8B82; margin: 0; font-size: 0.875rem;">Schüler • 89 Aufträge erledigt</p>
      </div>

      <!-- Verifizierungs-Status -->
      <div style="background: rgba(95, 111, 85, 0.05); border: 1px solid #5F6F55; border-radius: 12px; padding: 1.5rem; margin-bottom: 1.5rem;">
        <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
          <div style="width: 2.5rem; height: 2.5rem; background: #27ae60; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
            <span style="color: white; font-size: 1.2rem; font-weight: 600;">✓</span>
          </div>
          <div style="flex: 1; min-width: 0;">
            <h3 style="color: #474747; font-size: 1.1rem; font-weight: 600; margin: 0;">Profil verifiziert</h3>
            <p style="color: #8F8B82; margin: 0; font-size: 0.875rem;">Alle Dokumente bestätigt</p>
          </div>
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;">
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span style="color: #27ae60; font-size: 1rem;">✓</span>
            <span style="color: #474747; font-size: 0.875rem;">Ausweis</span>
          </div>
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span style="color: #27ae60; font-size: 1rem;">✓</span>
            <span style="color: #474747; font-size: 0.875rem;">Führungszeugnis</span>
          </div>
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span style="color: #27ae60; font-size: 1rem;">✓</span>
            <span style="color: #474747; font-size: 0.875rem;">Telefon</span>
          </div>
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span style="color: #27ae60; font-size: 1rem;">✓</span>
            <span style="color: #474747; font-size: 0.875rem;">E-Mail</span>
          </div>
        </div>
      </div>

      <!-- Fähigkeiten verwalten -->
      <div style="background: white; border-radius: 16px; padding: 1.5rem; margin-bottom: 1.5rem; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
          <h3 style="color: #474747; font-size: 1.1rem; font-weight: 600; margin: 0;">Meine Fähigkeiten</h3>
          <button 
            @click="editSkills"
            style="background: #5F6F55; color: white; padding: 0.5rem 1rem; border-radius: 8px; border: none; font-weight: 600; cursor: pointer; font-size: 0.875rem; transition: all 0.2s;"
            onmouseover="this.style.background='#4a5c44';"
            onmouseout="this.style.background='#5F6F55';"
          >
            Bearbeiten
          </button>
        </div>
        
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
          <span style="background: #BECDA3; color: #474747; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.875rem; font-weight: 600;">
            Einkaufen
          </span>
          <span style="background: #BECDA3; color: #474747; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.875rem; font-weight: 600;">
            Kochen
          </span>
          <span style="background: #BECDA3; color: #474747; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.875rem; font-weight: 600;">
            Technik-Hilfe
          </span>
          <button 
            @click="addSkill"
            style="background: rgba(95, 111, 85, 0.1); color: #5F6F55; padding: 0.5rem 1rem; border-radius: 20px; border: 1px solid #5F6F55; font-size: 0.875rem; font-weight: 600; cursor: pointer; transition: all 0.2s;"
            onmouseover="this.style.background='#5F6F55'; this.style.color='white';"
            onmouseout="this.style.background='rgba(95, 111, 85, 0.1)'; this.style.color='#5F6F55';"
          >
            + Hinzufügen
          </button>
        </div>
      </div>

      <!-- Verfügbarkeitszeiten -->
      <div style="background: white; border-radius: 16px; padding: 1.5rem; margin-bottom: 1.5rem; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
          <h3 style="color: #474747; font-size: 1.1rem; font-weight: 600; margin: 0;">Verfügbarkeitszeiten</h3>
          <button 
            @click="editAvailability"
            style="background: #5F6F55; color: white; padding: 0.5rem 1rem; border-radius: 8px; border: none; font-weight: 600; cursor: pointer; font-size: 0.875rem; transition: all 0.2s;"
            onmouseover="this.style.background='#4a5c44';"
            onmouseout="this.style.background='#5F6F55';"
          >
            Ändern
          </button>
        </div>
        
        <div style="display: flex; flex-direction: column; gap: 0.75rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; background: #f9fafb; border-radius: 8px;">
            <span style="color: #474747; font-weight: 600; font-size: 0.875rem;">Montag - Freitag</span>
            <span style="color: #8F8B82; font-size: 0.875rem;">16:00 - 20:00</span>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; background: #f9fafb; border-radius: 8px;">
            <span style="color: #474747; font-weight: 600; font-size: 0.875rem;">Samstag - Sonntag</span>
            <span style="color: #8F8B82; font-size: 0.875rem;">10:00 - 18:00</span>
          </div>
        </div>
      </div>

      <!-- Persönliche Daten -->
      <div style="background: white; border-radius: 16px; padding: 1.5rem; margin-bottom: 1.5rem; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
          <h3 style="color: #474747; font-size: 1.1rem; font-weight: 600; margin: 0;">Persönliche Daten</h3>
          <button 
            @click="editPersonalData"
            style="background: #5F6F55; color: white; padding: 0.5rem 1rem; border-radius: 8px; border: none; font-weight: 600; cursor: pointer; font-size: 0.875rem; transition: all 0.2s;"
            onmouseover="this.style.background='#4a5c44';"
            onmouseout="this.style.background='#5F6F55';"
          >
            Bearbeiten
          </button>
        </div>
        
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <div>
            <label style="color: #8F8B82; font-size: 0.75rem; display: block; margin-bottom: 0.25rem;">E-Mail</label>
            <p style="color: #474747; margin: 0; font-size: 0.875rem;">max.mustermann@email.de</p>
          </div>
          <div>
            <label style="color: #8F8B82; font-size: 0.75rem; display: block; margin-bottom: 0.25rem;">Telefon</label>
            <p style="color: #474747; margin: 0; font-size: 0.875rem;">+49 123 456 789</p>
          </div>
          <div>
            <label style="color: #8F8B82; font-size: 0.75rem; display: block; margin-bottom: 0.25rem;">Postleitzahl</label>
            <p style="color: #474747; margin: 0; font-size: 0.875rem;">12345 Musterstadt</p>
          </div>
          <div>
            <label style="color: #8F8B82; font-size: 0.75rem; display: block; margin-bottom: 0.25rem;">Über mich</label>
            <p style="color: #474747; margin: 0; font-size: 0.875rem; line-height: 1.4;">
              Freundlicher Schüler, der gerne älteren Menschen hilft. Besonders gut in Technik-Fragen und beim Einkaufen.
            </p>
          </div>
        </div>
      </div>

      <!-- Account-Aktionen -->
      <div style="display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 1.5rem;">
        <button 
          @click="openSupport"
          style="width: 100%; background: rgba(95, 111, 85, 0.1); color: #5F6F55; padding: 1rem; border-radius: 12px; border: 1px solid #5F6F55; cursor: pointer; font-weight: 600; font-size: 0.875rem; transition: all 0.2s;"
          onmouseover="this.style.background='#5F6F55'; this.style.color='white';"
          onmouseout="this.style.background='rgba(95, 111, 85, 0.1)'; this.style.color='#5F6F55';"
        >
          Hilfe & Support
        </button>
        <button 
          @click="deactivateAccount"
          style="width: 100%; background: white; color: #e74c3c; padding: 1rem; border-radius: 12px; border: 1px solid #e74c3c; cursor: pointer; font-weight: 600; font-size: 0.875rem; transition: all 0.2s;"
          onmouseover="this.style.background='#e74c3c'; this.style.color='white';"
          onmouseout="this.style.background='white'; this.style.color='#e74c3c';"
        >
          Account deaktivieren
        </button>
      </div>

    </div>

    <!-- Footer Component -->
    <AppFooter 
      :active-tab="'profile'"
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

const editProfile = () => {
  console.log('Edit profile')
}

const editSkills = () => {
  console.log('Edit skills')
}

const addSkill = () => {
  console.log('Add skill')
}

const editAvailability = () => {
  console.log('Edit availability')
}

const editPersonalData = () => {
  console.log('Edit personal data')
}

const openSupport = () => {
  console.log('Open support')
}

const deactivateAccount = () => {
  console.log('Deactivate account')
}
</script>