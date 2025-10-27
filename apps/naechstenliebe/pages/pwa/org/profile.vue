<template>
  <div style="min-height: 100vh; background: #f5f5f5; font-family: 'Comic Sans MS', cursive, sans-serif;">
    <!-- Header -->
    <header style="position: sticky; top: 0; z-index: 50; background: #474747; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
      <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem 1.5rem;">
        <button @click="goBack" style="width: 2.5rem; height: 2.5rem; display: flex; align-items: center; justify-content: center; border-radius: 50%; background: rgba(255,255,255,0.1); border: none; cursor: pointer; transition: background 0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.2)'" onmouseout="this.style.background='rgba(255,255,255,0.1)'">
          <svg style="width: 1.5rem; height: 1.5rem; color: white;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
        </button>
        <h1 style="color: white; font-size: 1.25rem; font-weight: 700; margin: 0; font-family: 'Comic Sans MS', cursive, sans-serif; text-shadow: 1px 1px 2px rgba(0,0,0,0.3);">Organisations-Profil</h1>
        <button @click="editProfile" style="width: 2.5rem; height: 2.5rem; display: flex; align-items: center; justify-content: center; border-radius: 50%; background: rgba(255,255,255,0.1); border: none; cursor: pointer; transition: background 0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.2)'" onmouseout="this.style.background='rgba(255,255,255,0.1)'">
          <svg style="width: 1.5rem; height: 1.5rem; color: white;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
          </svg>
        </button>
      </div>
    </header>

    <div style="max-width: 80rem; margin: 0 auto; padding: 1.5rem; position: relative;">
      <!-- Organization Header - Paper style -->
      <div style="background: rgba(255,255,255,0.9); padding: 2.5rem; transform: rotate(-1deg); box-shadow: 6px 6px 0px rgba(0,0,0,0.15); position: relative; backdrop-filter: blur(3px); border: 1px solid rgba(71,71,71,0.1); margin-bottom: 2rem;">
        <!-- Torn corner -->
        <div style="position: absolute; top: 0; right: 0; width: 25px; height: 25px; background: #f5f5f5; clip-path: polygon(100% 0, 0 100%, 100% 100%);"></div>
        
        <div style="display: flex; align-items: center; gap: 2rem;">
          <!-- Organization Logo -->
          <div style="width: 6rem; height: 6rem; background: #BECDA3; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; box-shadow: 4px 4px 0px rgba(0,0,0,0.15); position: relative;">
            <img v-if="orgData.logo" :src="orgData.logo" :alt="orgData.name" style="width: 4rem; height: 4rem; border-radius: 50%; object-fit: cover;">
            <svg v-else style="width: 3rem; height: 3rem; color: #474747;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
            </svg>
            <!-- Verification Badge -->
            <div v-if="orgData.verified" style="position: absolute; top: -4px; right: -4px; width: 1.5rem; height: 1.5rem; background: #5F6F55; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 2px solid white;">
              <svg style="width: 0.75rem; height: 0.75rem; color: white;" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
            </div>
          </div>
          
          <!-- Organization Info -->
          <div style="flex: 1;">
            <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 0.5rem;">
              <h2 style="font-size: 2.5rem; font-weight: 700; margin: 0; color: #474747; font-family: 'Comic Sans MS', cursive, sans-serif;">{{ orgData.name }}</h2>
              <span style="background: #8FA66E; color: white; padding: 0.25rem 0.75rem; font-size: 0.9rem; font-weight: 600; font-family: 'Comic Sans MS', cursive, sans-serif; box-shadow: 2px 2px 0px rgba(0,0,0,0.1); transform: rotate(-2deg);">
                {{ orgData.type }}
              </span>
            </div>
            
            <p style="font-size: 1.1rem; color: #8F8B82; margin: 0 0 1rem 0; line-height: 1.5; font-family: 'Comic Sans MS', cursive, sans-serif;">{{ orgData.description }}</p>
            
            <div style="display: flex; gap: 2rem; align-items: center;">
              <div>
                <span style="font-size: 0.9rem; color: #8F8B82; font-family: 'Comic Sans MS', cursive, sans-serif;">Seit:</span>
                <span style="font-size: 1rem; color: #474747; margin-left: 0.5rem; font-weight: 600; font-family: 'Comic Sans MS', cursive, sans-serif;">{{ orgData.memberSince }}</span>
              </div>
              <div>
                <span style="font-size: 0.9rem; color: #8F8B82; font-family: 'Comic Sans MS', cursive, sans-serif;">Status:</span>
                <span :style="'font-size: 1rem; margin-left: 0.5rem; font-weight: 600; font-family: Comic Sans MS, cursive, sans-serif; color: ' + (orgData.verified ? '#5F6F55' : '#8F8B82') + ';'">
                  {{ orgData.verified ? 'Verifiziert' : 'Nicht verifiziert' }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Contact Information - Paper style -->
      <div style="background: rgba(255,255,255,0.9); padding: 2rem; transform: rotate(0.5deg); box-shadow: 6px 6px 0px rgba(0,0,0,0.15); position: relative; backdrop-filter: blur(3px); border: 1px solid rgba(71,71,71,0.1); margin-bottom: 2rem;">
        <!-- Torn corner -->
        <div style="position: absolute; top: 0; right: 0; width: 20px; height: 20px; background: #f5f5f5; clip-path: polygon(100% 0, 0 100%, 100% 100%);"></div>
        
        <h3 style="font-size: 1.5rem; font-weight: 700; color: #474747; margin: 0 0 1.5rem 0; font-family: 'Comic Sans MS', cursive, sans-serif;">Kontaktdaten</h3>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
          <div style="display: flex; flex-direction: column; gap: 1rem;">
            <div style="display: flex; align-items: center; gap: 1rem; padding: 1rem; background: rgba(190,205,163,0.2); border: 1px solid #BECDA3; box-shadow: 2px 2px 0px rgba(0,0,0,0.1);">
              <svg style="width: 1.5rem; height: 1.5rem; color: #5F6F55;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              <div>
                <div style="font-size: 0.8rem; color: #8F8B82; font-family: 'Comic Sans MS', cursive, sans-serif;">Adresse</div>
                <div style="font-weight: 600; color: #474747; font-family: 'Comic Sans MS', cursive, sans-serif;">{{ orgData.address }}</div>
              </div>
            </div>
            
            <div style="display: flex; align-items: center; gap: 1rem; padding: 1rem; background: rgba(190,205,163,0.2); border: 1px solid #BECDA3; box-shadow: 2px 2px 0px rgba(0,0,0,0.1);">
              <svg style="width: 1.5rem; height: 1.5rem; color: #5F6F55;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
              <div>
                <div style="font-size: 0.8rem; color: #8F8B82; font-family: 'Comic Sans MS', cursive, sans-serif;">Telefon</div>
                <div style="font-weight: 600; color: #474747; font-family: 'Comic Sans MS', cursive, sans-serif;">{{ orgData.phone }}</div>
              </div>
            </div>
          </div>
          
          <div style="display: flex; flex-direction: column; gap: 1rem;">
            <div style="display: flex; align-items: center; gap: 1rem; padding: 1rem; background: rgba(190,205,163,0.2); border: 1px solid #BECDA3; box-shadow: 2px 2px 0px rgba(0,0,0,0.1);">
              <svg style="width: 1.5rem; height: 1.5rem; color: #5F6F55;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              <div>
                <div style="font-size: 0.8rem; color: #8F8B82; font-family: 'Comic Sans MS', cursive, sans-serif;">E-Mail</div>
                <div style="font-weight: 600; color: #474747; font-family: 'Comic Sans MS', cursive, sans-serif;">{{ orgData.email }}</div>
              </div>
            </div>
            
            <div style="display: flex; align-items: center; gap: 1rem; padding: 1rem; background: rgba(190,205,163,0.2); border: 1px solid #BECDA3; box-shadow: 2px 2px 0px rgba(0,0,0,0.1);">
              <svg style="width: 1.5rem; height: 1.5rem; color: #5F6F55;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9c-5 0-9-4-9-9s4-9 9-9"/>
              </svg>
              <div>
                <div style="font-size: 0.8rem; color: #8F8B82; font-family: 'Comic Sans MS', cursive, sans-serif;">Website</div>
                <div style="font-weight: 600; color: #474747; font-family: 'Comic Sans MS', cursive, sans-serif;">{{ orgData.website }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Statistics - Paper style -->
      <div style="background: rgba(255,255,255,0.9); padding: 2rem; transform: rotate(-0.5deg); box-shadow: 6px 6px 0px rgba(0,0,0,0.15); position: relative; backdrop-filter: blur(3px); border: 1px solid rgba(71,71,71,0.1); margin-bottom: 2rem;">
        <!-- Torn corner -->
        <div style="position: absolute; top: 0; right: 0; width: 25px; height: 25px; background: #f5f5f5; clip-path: polygon(100% 0, 0 100%, 100% 100%);"></div>
        
        <h3 style="font-size: 1.5rem; font-weight: 700; color: #474747; margin: 0 0 1.5rem 0; font-family: 'Comic Sans MS', cursive, sans-serif;">Organisations-Statistiken</h3>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 1.5rem;">
          <div style="text-align: center; padding: 1.5rem; background: rgba(95,111,85,0.1); border: 2px solid #5F6F55; box-shadow: 3px 3px 0px rgba(0,0,0,0.1);">
            <div style="font-size: 2rem; font-weight: 700; color: #5F6F55; margin-bottom: 0.5rem; font-family: 'Comic Sans MS', cursive, sans-serif;">{{ orgStats.totalHelpers }}</div>
            <div style="font-size: 0.9rem; color: #474747; font-weight: 600; font-family: 'Comic Sans MS', cursive, sans-serif;">Helfer registriert</div>
          </div>
          
          <div style="text-align: center; padding: 1.5rem; background: rgba(143,166,110,0.1); border: 2px solid #8FA66E; box-shadow: 3px 3px 0px rgba(0,0,0,0.1);">
            <div style="font-size: 2rem; font-weight: 700; color: #8FA66E; margin-bottom: 0.5rem; font-family: 'Comic Sans MS', cursive, sans-serif;">{{ orgStats.totalSeekers }}</div>
            <div style="font-size: 0.9rem; color: #474747; font-weight: 600; font-family: 'Comic Sans MS', cursive, sans-serif;">Hilfesuchende</div>
          </div>
          
          <div style="text-align: center; padding: 1.5rem; background: rgba(190,205,163,0.1); border: 2px solid #BECDA3; box-shadow: 3px 3px 0px rgba(0,0,0,0.1);">
            <div style="font-size: 2rem; font-weight: 700; color: #BECDA3; margin-bottom: 0.5rem; font-family: 'Comic Sans MS', cursive, sans-serif;">{{ orgStats.completedTasks }}</div>
            <div style="font-size: 0.9rem; color: #474747; font-weight: 600; font-family: 'Comic Sans MS', cursive, sans-serif;">Erledigte Aufträge</div>
          </div>
          
          <div style="text-align: center; padding: 1.5rem; background: rgba(71,71,71,0.1); border: 2px solid #474747; box-shadow: 3px 3px 0px rgba(0,0,0,0.1);">
            <div style="font-size: 2rem; font-weight: 700; color: #474747; margin-bottom: 0.5rem; font-family: 'Comic Sans MS', cursive, sans-serif;">{{ orgStats.rating }}</div>
            <div style="font-size: 0.9rem; color: #474747; font-weight: 600; font-family: 'Comic Sans MS', cursive, sans-serif;">Durchschnittsbewertung</div>
          </div>
        </div>
      </div>

      <!-- Verification Status - Paper style -->
      <div v-if="!orgData.verified" style="background: #8FA66E; color: white; padding: 2rem; transform: rotate(1deg); box-shadow: 6px 6px 0px rgba(0,0,0,0.2); position: relative; margin-bottom: 2rem;">
        <!-- Torn corner -->
        <div style="position: absolute; top: 0; right: 0; width: 25px; height: 25px; background: #f5f5f5; clip-path: polygon(100% 0, 0 100%, 100% 100%);"></div>
        
        <div style="display: flex; align-items: center; gap: 1.5rem;">
          <div style="width: 4rem; height: 4rem; background: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; box-shadow: 3px 3px 0px rgba(0,0,0,0.15);">
            <svg style="width: 2rem; height: 2rem; color: #8FA66E;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"/>
            </svg>
          </div>
          <div style="flex: 1;">
            <h4 style="font-weight: 700; font-size: 1.2rem; margin: 0 0 0.5rem 0; font-family: 'Comic Sans MS', cursive, sans-serif; text-shadow: 1px 1px 2px rgba(0,0,0,0.3);">Organisation noch nicht verifiziert</h4>
            <p style="opacity: 0.9; margin: 0 0 1rem 0; font-family: 'Comic Sans MS', cursive, sans-serif;">Lassen Sie Ihre Organisation verifizieren, um das Vertrauen der Nutzer zu stärken und alle Funktionen freizuschalten.</p>
            <button 
              @click="requestVerification"
              style="background: white; color: #8FA66E; padding: 0.75rem 1.5rem; border: none; cursor: pointer; font-weight: 600; font-family: 'Comic Sans MS', cursive, sans-serif; box-shadow: 3px 3px 0px rgba(0,0,0,0.15); transition: transform 0.2s;"
              onmouseover="this.style.transform='translateY(-2px)'"
              onmouseout="this.style.transform='translateY(0)'"
            >
              Verifizierung beantragen
            </button>
          </div>
        </div>
      </div>

      <!-- Settings Actions - Paper style -->
      <div style="background: rgba(255,255,255,0.9); padding: 2rem; transform: rotate(0.3deg); box-shadow: 6px 6px 0px rgba(0,0,0,0.15); position: relative; backdrop-filter: blur(3px); border: 1px solid rgba(71,71,71,0.1);">
        <!-- Torn corner -->
        <div style="position: absolute; top: 0; right: 0; width: 20px; height: 20px; background: #f5f5f5; clip-path: polygon(100% 0, 0 100%, 100% 100%);"></div>
        
        <h3 style="font-size: 1.5rem; font-weight: 700; color: #474747; margin: 0 0 1.5rem 0; font-family: 'Comic Sans MS', cursive, sans-serif;">Aktionen</h3>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem;">
          <button 
            @click="editProfile"
            style="background: #5F6F55; color: white; padding: 1rem; border: none; cursor: pointer; font-weight: 600; font-family: 'Comic Sans MS', cursive, sans-serif; box-shadow: 4px 4px 0px rgba(0,0,0,0.2); transition: transform 0.2s; display: flex; flex-direction: column; align-items: center; gap: 0.5rem;"
            onmouseover="this.style.transform='translateY(-2px)'"
            onmouseout="this.style.transform='translateY(0)'"
          >
            <svg style="width: 1.5rem; height: 1.5rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
            </svg>
            Profil bearbeiten
          </button>
          
          <button 
            @click="changePassword"
            style="background: #8FA66E; color: white; padding: 1rem; border: none; cursor: pointer; font-weight: 600; font-family: 'Comic Sans MS', cursive, sans-serif; box-shadow: 4px 4px 0px rgba(0,0,0,0.2); transition: transform 0.2s; display: flex; flex-direction: column; align-items: center; gap: 0.5rem;"
            onmouseover="this.style.transform='translateY(-2px)'"
            onmouseout="this.style.transform='translateY(0)'"
          >
            <svg style="width: 1.5rem; height: 1.5rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
            </svg>
            Passwort ändern
          </button>
          
          <button 
            @click="downloadData"
            style="background: #BECDA3; color: #474747; padding: 1rem; border: none; cursor: pointer; font-weight: 600; font-family: 'Comic Sans MS', cursive, sans-serif; box-shadow: 4px 4px 0px rgba(0,0,0,0.2); transition: transform 0.2s; display: flex; flex-direction: column; align-items: center; gap: 0.5rem;"
            onmouseover="this.style.transform='translateY(-2px)'"
            onmouseout="this.style.transform='translateY(0)'"
          >
            <svg style="width: 1.5rem; height: 1.5rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
            Daten exportieren
          </button>
        </div>
      </div>
    </div>

    <!-- Padding for content -->
    <div style="height: 2rem;"></div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: false
})

const orgData = ref({
  name: 'Altenheim Sonnenblick',
  type: 'Altenheim',
  description: 'Ein modernes Altenheim mit 120 Bewohnern, das seit 2018 innovative Betreuungskonzepte umsetzt und großen Wert auf die Integration in die lokale Gemeinschaft legt.',
  verified: true,
  memberSince: 'März 2023',
  logo: null, // Could be a URL to uploaded logo
  address: 'Sonnenstraße 42\n12345 Musterstadt',
  phone: '+49 (0) 123 456-789',
  email: 'info@altenheim-sonnenblick.de',
  website: 'www.altenheim-sonnenblick.de'
})

const orgStats = ref({
  totalHelpers: 23,
  totalSeekers: 45,
  completedTasks: 234,
  rating: '4.8⭐'
})

const goBack = () => {
  navigateTo('/pwa/org/dashboard')
}

const editProfile = () => {
  // TODO: Open profile edit modal
  console.log('Opening profile edit...')
}

const requestVerification = () => {
  // TODO: Open verification request form
  console.log('Requesting verification...')
}

const changePassword = () => {
  // TODO: Open password change modal
  console.log('Opening password change...')
}

const downloadData = () => {
  // TODO: Generate and download organization data export
  console.log('Downloading organization data...')
}
</script>