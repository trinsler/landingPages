<template>
  <div style="min-height: 100vh; background: #f5f5f5; font-family: 'Comic Sans MS', cursive, sans-serif;">
    
    <div style="max-width: 80rem; margin: 0 auto; padding: 1.5rem; position: relative;">
      <!-- Welcome Section - Paper style like landing page -->
      <div style="background: rgba(255,255,255,0.9); padding: 2.5rem; transform: rotate(-1deg); box-shadow: 6px 6px 0px rgba(0,0,0,0.15); position: relative; backdrop-filter: blur(3px); border: 1px solid rgba(71,71,71,0.1); margin-bottom: 2rem;">
        <!-- Torn corner -->
        <div style="position: absolute; top: 0; right: 0; width: 25px; height: 25px; background: #f5f5f5; clip-path: polygon(100% 0, 0 100%, 100% 100%);"></div>
        
        <div style="text-align: center;">
          <h2 style="font-size: 2.5rem; font-weight: 700; margin: 0 0 1rem 0; color: #474747; font-family: 'Comic Sans MS', cursive, sans-serif; text-shadow: 1px 1px 2px rgba(0,0,0,0.1);">Willkommen zurück</h2>
          <p style="font-size: 1.2rem; color: #8F8B82; margin: 0; max-width: 30rem; margin-left: auto; margin-right: auto; line-height: 1.6; font-family: 'Comic Sans MS', cursive, sans-serif;">Ihre lokale Nachbarschaftshilfe ist nur einen Klick entfernt</p>
        </div>
      </div>

      <!-- Primary Action - Paper note style -->
      <button 
        @click="createNewTask"
        style="width: 100%; background: #5F6F55; color: white; padding: 3rem 2rem; border: none; cursor: pointer; transform: rotate(1deg); box-shadow: 6px 6px 0px rgba(0,0,0,0.2); position: relative; backdrop-filter: blur(3px); transition: transform 0.3s, box-shadow 0.3s;"
        onmouseover="this.style.transform='rotate(1deg) translateY(-4px)'; this.style.boxShadow='8px 8px 0px rgba(0,0,0,0.25)';"
        onmouseout="this.style.transform='rotate(1deg)'; this.style.boxShadow='6px 6px 0px rgba(0,0,0,0.2)';"
      >
        <!-- Torn corner -->
        <div style="position: absolute; top: 0; right: 0; width: 30px; height: 30px; background: #f5f5f5; clip-path: polygon(100% 0, 0 100%, 100% 100%);"></div>
        
        <div style="display: flex; flex-direction: column; align-items: center; gap: 1.5rem;">
          <div style="width: 4rem; height: 4rem; background: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 3px 3px 0px rgba(0,0,0,0.15);">
            <svg style="width: 2rem; height: 2rem; color: #474747;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
            </svg>
          </div>
          <span style="font-size: 2rem; font-weight: 700; font-family: 'Comic Sans MS', cursive, sans-serif; text-shadow: 1px 1px 2px rgba(0,0,0,0.2);">Neue Hilfe anfragen</span>
          <span style="font-size: 1rem; opacity: 0.9; font-family: 'Comic Sans MS', cursive, sans-serif;">Spracheingabe oder Text - wie es für Sie am einfachsten ist</span>
        </div>
      </button>

      <!-- Active Tasks - Paper style -->
      <div style="background: rgba(255,255,255,0.9); padding: 2rem; transform: rotate(-0.5deg); box-shadow: 6px 6px 0px rgba(0,0,0,0.15); position: relative; backdrop-filter: blur(3px); border: 1px solid rgba(71,71,71,0.1); margin-top: 2rem;">
        <!-- Torn corner -->
        <div style="position: absolute; top: 0; right: 0; width: 20px; height: 20px; background: #f5f5f5; clip-path: polygon(100% 0, 0 100%, 100% 100%);"></div>
        
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem;">
          <h3 style="font-size: 1.5rem; font-weight: 700; color: #474747; margin: 0; font-family: 'Comic Sans MS', cursive, sans-serif;">Aktive Aufträge</h3>
          <span style="background: #BECDA3; color: #474747; padding: 0.5rem 1rem; font-size: 0.9rem; font-weight: 600; font-family: 'Comic Sans MS', cursive, sans-serif; box-shadow: 2px 2px 0px rgba(0,0,0,0.1); transform: rotate(2deg);">{{ activeTasks.length }}</span>
        </div>
        
        <div v-if="activeTasks.length > 0" style="display: flex; flex-direction: column; gap: 1rem;">
          <div 
            v-for="task in activeTasks" 
            :key="task.id"
            style="border: 2px solid #BECDA3; padding: 1rem; background: rgba(255,255,255,0.7); box-shadow: 3px 3px 0px rgba(0,0,0,0.1); transition: transform 0.2s;"
            onmouseover="this.style.transform='translateY(-2px)'"
            onmouseout="this.style.transform='translateY(0)'"
          >
            <div style="display: flex; align-items: flex-start; gap: 1rem;">
              <div style="width: 3rem; height: 3rem; background: #BECDA3; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; box-shadow: 2px 2px 0px rgba(0,0,0,0.1);">
                <img :src="getTaskIcon(task.type)" :alt="task.type" style="width: 1.5rem; height: 1.5rem;">
              </div>
              <div style="flex: 1; min-width: 0;">
                <h4 style="font-weight: 600; color: #474747; margin: 0 0 0.5rem 0; font-family: 'Comic Sans MS', cursive, sans-serif;">{{ task.title }}</h4>
                <p style="font-size: 0.9rem; color: #8F8B82; margin: 0 0 0.5rem 0; font-family: 'Comic Sans MS', cursive, sans-serif;">{{ task.helper }} • {{ task.distance }}</p>
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                  <span style="background: #5F6F55; color: white; padding: 0.25rem 0.75rem; font-size: 0.8rem; font-weight: 500; font-family: 'Comic Sans MS', cursive, sans-serif; box-shadow: 1px 1px 0px rgba(0,0,0,0.1);">
                    {{ task.status }}
                  </span>
                </div>
              </div>
              <button 
                @click="viewTask(task.id)"
                style="background: #474747; color: white; padding: 0.75rem 1.5rem; border: none; cursor: pointer; font-size: 0.9rem; font-weight: 500; font-family: 'Comic Sans MS', cursive, sans-serif; box-shadow: 2px 2px 0px rgba(0,0,0,0.15); transition: transform 0.2s;"
                onmouseover="this.style.transform='translateY(-1px)'"
                onmouseout="this.style.transform='translateY(0)'"
              >
                Details
              </button>
            </div>
          </div>
        </div>
        
        <div v-else style="text-align: center; padding: 2rem;">
          <div style="width: 4rem; height: 4rem; background: #BECDA3; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem auto; box-shadow: 3px 3px 0px rgba(0,0,0,0.1);">
            <svg style="width: 2rem; height: 2rem; color: #474747;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
            </svg>
          </div>
          <p style="color: #8F8B82; font-family: 'Comic Sans MS', cursive, sans-serif; margin: 0 0 0.5rem 0;">Keine aktiven Aufträge</p>
          <p style="font-size: 0.9rem; color: #8F8B82; margin: 0; font-family: 'Comic Sans MS', cursive, sans-serif;">Starten Sie Ihre erste Anfrage</p>
        </div>
      </div>

      <!-- Quick Access - Paper style -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-top: 2rem;">
        <button 
          @click="openFavorites"
          style="background: rgba(255,255,255,0.9); padding: 2rem; border: none; cursor: pointer; transform: rotate(-1deg); box-shadow: 4px 4px 0px rgba(0,0,0,0.1); border: 1px solid rgba(71,71,71,0.1); transition: transform 0.2s;"
          onmouseover="this.style.transform='rotate(-1deg) translateY(-2px)'"
          onmouseout="this.style.transform='rotate(-1deg)'"
        >
          <div style="text-align: center;">
            <div style="width: 3rem; height: 3rem; background: #BECDA3; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem auto; box-shadow: 2px 2px 0px rgba(0,0,0,0.1);">
              <svg style="width: 1.5rem; height: 1.5rem; color: #474747;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
            </div>
            <div>
              <h4 style="font-weight: 600; color: #474747; margin: 0 0 0.5rem 0; font-family: 'Comic Sans MS', cursive, sans-serif;">Favoriten</h4>
              <p style="font-size: 0.9rem; color: #8F8B82; margin: 0; font-family: 'Comic Sans MS', cursive, sans-serif;">{{ favoriteHelpers.length }} Helfer</p>
            </div>
          </div>
        </button>
        
        <button 
          @click="openHistory"
          style="background: rgba(255,255,255,0.9); padding: 2rem; border: none; cursor: pointer; transform: rotate(1deg); box-shadow: 4px 4px 0px rgba(0,0,0,0.1); border: 1px solid rgba(71,71,71,0.1); transition: transform 0.2s;"
          onmouseover="this.style.transform='rotate(1deg) translateY(-2px)'"
          onmouseout="this.style.transform='rotate(1deg)'"
        >
          <div style="text-align: center;">
            <div style="width: 3rem; height: 3rem; background: #BECDA3; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem auto; box-shadow: 2px 2px 0px rgba(0,0,0,0.1);">
              <svg style="width: 1.5rem; height: 1.5rem; color: #474747;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div>
              <h4 style="font-weight: 600; color: #474747; margin: 0 0 0.5rem 0; font-family: 'Comic Sans MS', cursive, sans-serif;">Verlauf</h4>
              <p style="font-size: 0.9rem; color: #8F8B82; margin: 0; font-family: 'Comic Sans MS', cursive, sans-serif;">{{ completedTasks }} erledigt</p>
            </div>
          </div>
        </button>
      </div>
    </div>

    <!-- Bottom Navigation - Paper style -->
    <nav style="position: fixed; bottom: 0; left: 0; right: 0; background: white; border-top: 2px solid #BECDA3; box-shadow: 0 -4px 12px rgba(0,0,0,0.1);">
      <div style="display: flex;">
        <button 
          @click="setActiveTab('dashboard')"
          :style="'flex: 1; padding: 1rem 0.5rem; text-align: center; border: none; background: none; cursor: pointer; color: ' + (activeTab === 'dashboard' ? '#474747' : '#8F8B82') + '; border-top: ' + (activeTab === 'dashboard' ? '3px solid #474747' : 'none') + '; font-family: Comic Sans MS, cursive, sans-serif;'"
        >
          <svg style="width: 1.5rem; height: 1.5rem; margin: 0 auto 0.25rem auto; display: block;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"/>
          </svg>
          <span style="font-size: 0.8rem; font-weight: 500;">Home</span>
        </button>
        
        <button 
          @click="setActiveTab('tasks')"
          :style="'flex: 1; padding: 1rem 0.5rem; text-align: center; border: none; background: none; cursor: pointer; color: ' + (activeTab === 'tasks' ? '#474747' : '#8F8B82') + '; border-top: ' + (activeTab === 'tasks' ? '3px solid #474747' : 'none') + '; font-family: Comic Sans MS, cursive, sans-serif;'"
        >
          <svg style="width: 1.5rem; height: 1.5rem; margin: 0 auto 0.25rem auto; display: block;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
          </svg>
          <span style="font-size: 0.8rem; font-weight: 500;">Aufträge</span>
        </button>
        
        <button 
          @click="setActiveTab('favorites')"
          :style="'flex: 1; padding: 1rem 0.5rem; text-align: center; border: none; background: none; cursor: pointer; color: ' + (activeTab === 'favorites' ? '#474747' : '#8F8B82') + '; border-top: ' + (activeTab === 'favorites' ? '3px solid #474747' : 'none') + '; font-family: Comic Sans MS, cursive, sans-serif;'"
        >
          <svg style="width: 1.5rem; height: 1.5rem; margin: 0 auto 0.25rem auto; display: block;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
          </svg>
          <span style="font-size: 0.8rem; font-weight: 500;">Favoriten</span>
        </button>
        
        <button 
          @click="setActiveTab('profile')"
          :style="'flex: 1; padding: 1rem 0.5rem; text-align: center; border: none; background: none; cursor: pointer; color: ' + (activeTab === 'profile' ? '#474747' : '#8F8B82') + '; border-top: ' + (activeTab === 'profile' ? '3px solid #474747' : 'none') + '; font-family: Comic Sans MS, cursive, sans-serif;'"
        >
          <svg style="width: 1.5rem; height: 1.5rem; margin: 0 auto 0.25rem auto; display: block;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
          </svg>
          <span style="font-size: 0.8rem; font-weight: 500;">Profil</span>
        </button>
      </div>
    </nav>

    <!-- Padding for bottom nav -->
    <div style="height: 5rem;"></div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: false
})

const activeTab = ref('dashboard')
const activeTasks = ref([
  {
    id: 1,
    title: 'Einkaufen',
    type: 'shopping',
    helper: 'Maria H.',
    distance: '0.3km entfernt',
    status: 'In Bearbeitung'
  }
])

const favoriteHelpers = ref([
  { id: 1, name: 'Maria H.' },
  { id: 2, name: 'Klaus B.' }
])

const completedTasks = ref(47)

const createNewTask = () => {
  navigateTo('/pwa/seeker/task-create')
}

const openProfile = () => {
  // TODO: Open profile modal or navigate to profile page
  console.log('Opening profile...')
}

const viewTask = (taskId) => {
  navigateTo(`/pwa/seeker/task-active`)
}

const openFavorites = () => {
  navigateTo('/pwa/seeker/favorites')
}

const openHistory = () => {
  navigateTo('/pwa/seeker/history')
}

const setActiveTab = (tab) => {
  activeTab.value = tab
  switch(tab) {
    case 'tasks':
      navigateTo('/pwa/seeker/history')
      break
    case 'favorites':
      navigateTo('/pwa/seeker/favorites')
      break
    case 'profile':
      // TODO: Navigate to profile page
      console.log('Profile tab clicked')
      break
  }
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