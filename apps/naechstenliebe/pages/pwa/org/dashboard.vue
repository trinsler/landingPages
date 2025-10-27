<template>
  <div style="min-height: 100vh; background: #f5f5f5; font-family: 'Comic Sans MS', cursive, sans-serif;">
    <!-- Header -->
    <header style="position: sticky; top: 0; z-index: 50; background: #474747; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
      <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem 1.5rem;">
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <img src="/icons/logo.svg" alt="Logo" style="width: 2rem; height: 2rem;">
          <h1 style="color: white; font-size: 1.25rem; font-weight: 700; margin: 0; font-family: 'Comic Sans MS', cursive, sans-serif; text-shadow: 1px 1px 2px rgba(0,0,0,0.3);">{{ orgInfo.name }}</h1>
        </div>
        <button @click="openProfile" style="width: 3rem; height: 3rem; background: #BECDA3; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: none; cursor: pointer; box-shadow: 0 2px 8px rgba(0,0,0,0.2); transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
          <img src="/icons/verschiedeneMenschen.svg" alt="Profil" style="width: 1.5rem; height: 1.5rem;">
        </button>
      </div>
    </header>

    <div style="max-width: 80rem; margin: 0 auto; padding: 1.5rem; position: relative;">
      <!-- Welcome Section - Paper style -->
      <div style="background: rgba(255,255,255,0.9); padding: 2.5rem; transform: rotate(-1deg); box-shadow: 6px 6px 0px rgba(0,0,0,0.15); position: relative; backdrop-filter: blur(3px); border: 1px solid rgba(71,71,71,0.1); margin-bottom: 2rem;">
        <!-- Torn corner -->
        <div style="position: absolute; top: 0; right: 0; width: 25px; height: 25px; background: #f5f5f5; clip-path: polygon(100% 0, 0 100%, 100% 100%);"></div>
        
        <div style="text-align: center;">
          <h2 style="font-size: 2.5rem; font-weight: 700; margin: 0 0 1rem 0; color: #474747; font-family: 'Comic Sans MS', cursive, sans-serif; text-shadow: 1px 1px 2px rgba(0,0,0,0.1);">Organisations-Dashboard</h2>
          <p style="font-size: 1.2rem; color: #8F8B82; margin: 0; line-height: 1.6; font-family: 'Comic Sans MS', cursive, sans-serif;">Verwalten Sie Ihre Helfer und Hilfesuchenden zentral</p>
        </div>
      </div>

      <!-- Stats Overview - Paper style -->
      <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 1rem; margin-bottom: 2rem;">
        <div style="background: rgba(255,255,255,0.9); padding: 1.5rem; text-align: center; box-shadow: 4px 4px 0px rgba(0,0,0,0.1); border: 1px solid rgba(71,71,71,0.1); transform: rotate(-1deg);">
          <div style="font-size: 2rem; font-weight: 700; color: #5F6F55; margin-bottom: 0.25rem; font-family: 'Comic Sans MS', cursive, sans-serif;">{{ stats.helpers }}</div>
          <div style="font-size: 0.9rem; color: #8F8B82; font-family: 'Comic Sans MS', cursive, sans-serif;">Helfer</div>
        </div>
        <div style="background: rgba(255,255,255,0.9); padding: 1.5rem; text-align: center; box-shadow: 4px 4px 0px rgba(0,0,0,0.1); border: 1px solid rgba(71,71,71,0.1); transform: rotate(0.5deg);">
          <div style="font-size: 2rem; font-weight: 700; color: #8FA66E; margin-bottom: 0.25rem; font-family: 'Comic Sans MS', cursive, sans-serif;">{{ stats.seekers }}</div>
          <div style="font-size: 0.9rem; color: #8F8B82; font-family: 'Comic Sans MS', cursive, sans-serif;">Hilfesuchende</div>
        </div>
        <div style="background: rgba(255,255,255,0.9); padding: 1.5rem; text-align: center; box-shadow: 4px 4px 0px rgba(0,0,0,0.1); border: 1px solid rgba(71,71,71,0.1); transform: rotate(-0.5deg);">
          <div style="font-size: 2rem; font-weight: 700; color: #474747; margin-bottom: 0.25rem; font-family: 'Comic Sans MS', cursive, sans-serif;">{{ stats.activeTasks }}</div>
          <div style="font-size: 0.9rem; color: #8F8B82; font-family: 'Comic Sans MS', cursive, sans-serif;">Aktive Aufträge</div>
        </div>
        <div style="background: rgba(255,255,255,0.9); padding: 1.5rem; text-align: center; box-shadow: 4px 4px 0px rgba(0,0,0,0.1); border: 1px solid rgba(71,71,71,0.1); transform: rotate(1deg);">
          <div style="font-size: 2rem; font-weight: 700; color: #BECDA3; margin-bottom: 0.25rem; font-family: 'Comic Sans MS', cursive, sans-serif;">{{ stats.budget }}€</div>
          <div style="font-size: 0.9rem; color: #8F8B82; font-family: 'Comic Sans MS', cursive, sans-serif;">Verfügbares Budget</div>
        </div>
      </div>

      <!-- Quick Actions - Paper style -->
      <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1.5rem; margin-bottom: 2rem;">
        <button 
          @click="manageHelpers"
          style="background: #5F6F55; color: white; padding: 2rem; border: none; cursor: pointer; transform: rotate(-1deg); box-shadow: 6px 6px 0px rgba(0,0,0,0.2); transition: transform 0.3s; font-family: 'Comic Sans MS', cursive, sans-serif;"
          onmouseover="this.style.transform='rotate(-1deg) translateY(-4px)'; this.style.boxShadow='8px 8px 0px rgba(0,0,0,0.25)';"
          onmouseout="this.style.transform='rotate(-1deg)'; this.style.boxShadow='6px 6px 0px rgba(0,0,0,0.2)';"
        >
          <div style="display: flex; flex-direction: column; align-items: center; gap: 1rem;">
            <div style="width: 3rem; height: 3rem; background: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 2px 2px 0px rgba(0,0,0,0.15);">
              <svg style="width: 1.5rem; height: 1.5rem; color: #474747;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
            </div>
            <span style="font-size: 1.2rem; font-weight: 700; text-shadow: 1px 1px 2px rgba(0,0,0,0.2);">Helfer verwalten</span>
          </div>
        </button>
        
        <button 
          @click="manageSeekers"
          style="background: #8FA66E; color: white; padding: 2rem; border: none; cursor: pointer; transform: rotate(0.5deg); box-shadow: 6px 6px 0px rgba(0,0,0,0.2); transition: transform 0.3s; font-family: 'Comic Sans MS', cursive, sans-serif;"
          onmouseover="this.style.transform='rotate(0.5deg) translateY(-4px)'; this.style.boxShadow='8px 8px 0px rgba(0,0,0,0.25)';"
          onmouseout="this.style.transform='rotate(0.5deg)'; this.style.boxShadow='6px 6px 0px rgba(0,0,0,0.2)';"
        >
          <div style="display: flex; flex-direction: column; align-items: center; gap: 1rem;">
            <div style="width: 3rem; height: 3rem; background: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 2px 2px 0px rgba(0,0,0,0.15);">
              <svg style="width: 1.5rem; height: 1.5rem; color: #474747;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
            </div>
            <span style="font-size: 1.2rem; font-weight: 700; text-shadow: 1px 1px 2px rgba(0,0,0,0.2);">Hilfesuchende verwalten</span>
          </div>
        </button>
        
        <button 
          @click="createTask"
          style="background: #474747; color: white; padding: 2rem; border: none; cursor: pointer; transform: rotate(-0.5deg); box-shadow: 6px 6px 0px rgba(0,0,0,0.2); transition: transform 0.3s; font-family: 'Comic Sans MS', cursive, sans-serif;"
          onmouseover="this.style.transform='rotate(-0.5deg) translateY(-4px)'; this.style.boxShadow='8px 8px 0px rgba(0,0,0,0.25)';"
          onmouseout="this.style.transform='rotate(-0.5deg)'; this.style.boxShadow='6px 6px 0px rgba(0,0,0,0.2)';"
        >
          <div style="display: flex; flex-direction: column; align-items: center; gap: 1rem;">
            <div style="width: 3rem; height: 3rem; background: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 2px 2px 0px rgba(0,0,0,0.15);">
              <svg style="width: 1.5rem; height: 1.5rem; color: #474747;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
              </svg>
            </div>
            <span style="font-size: 1.2rem; font-weight: 700; text-shadow: 1px 1px 2px rgba(0,0,0,0.2);">Auftrag erstellen</span>
          </div>
        </button>
      </div>

      <!-- Active Tasks - Paper style -->
      <div style="background: rgba(255,255,255,0.9); padding: 2rem; transform: rotate(0.5deg); box-shadow: 6px 6px 0px rgba(0,0,0,0.15); position: relative; backdrop-filter: blur(3px); border: 1px solid rgba(71,71,71,0.1); margin-bottom: 2rem;">
        <!-- Torn corner -->
        <div style="position: absolute; top: 0; right: 0; width: 20px; height: 20px; background: #f5f5f5; clip-path: polygon(100% 0, 0 100%, 100% 100%);"></div>
        
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem;">
          <h3 style="font-size: 1.5rem; font-weight: 700; color: #474747; margin: 0; font-family: 'Comic Sans MS', cursive, sans-serif;">Aktuelle Aufträge</h3>
          <span style="background: #BECDA3; color: #474747; padding: 0.5rem 1rem; font-size: 0.9rem; font-weight: 600; font-family: 'Comic Sans MS', cursive, sans-serif; box-shadow: 2px 2px 0px rgba(0,0,0,0.1); transform: rotate(-2deg);">{{ activeTasks.length }}</span>
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
                <p style="font-size: 0.9rem; color: #8F8B82; margin: 0 0 0.5rem 0; font-family: 'Comic Sans MS', cursive, sans-serif;">{{ task.seeker }} • {{ task.helper }} • {{ task.budget }}€</p>
                <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
                  <span :style="'padding: 0.25rem 0.75rem; font-size: 0.8rem; font-weight: 500; font-family: Comic Sans MS, cursive, sans-serif; box-shadow: 1px 1px 0px rgba(0,0,0,0.1); background: ' + getStatusColor(task.status) + '; color: white;'">
                    {{ task.status }}
                  </span>
                  <span style="font-size: 0.8rem; color: #8F8B82; font-family: 'Comic Sans MS', cursive, sans-serif;">{{ task.timeAgo }}</span>
                </div>
              </div>
              <button 
                @click="viewTask(task.id)"
                style="background: #474747; color: white; padding: 0.5rem 1rem; border: none; cursor: pointer; font-size: 0.9rem; font-weight: 500; font-family: 'Comic Sans MS', cursive, sans-serif; box-shadow: 2px 2px 0px rgba(0,0,0,0.15); transition: transform 0.2s;"
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
          <p style="color: #8F8B82; font-family: 'Comic Sans MS', cursive, sans-serif; margin: 0;">Keine aktiven Aufträge</p>
        </div>
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
          <span style="font-size: 0.8rem; font-weight: 500;">Dashboard</span>
        </button>
        
        <button 
          @click="setActiveTab('manage')"
          :style="'flex: 1; padding: 1rem 0.5rem; text-align: center; border: none; background: none; cursor: pointer; color: ' + (activeTab === 'manage' ? '#474747' : '#8F8B82') + '; border-top: ' + (activeTab === 'manage' ? '3px solid #474747' : 'none') + '; font-family: Comic Sans MS, cursive, sans-serif;'"
        >
          <svg style="width: 1.5rem; height: 1.5rem; margin: 0 auto 0.25rem auto; display: block;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
          </svg>
          <span style="font-size: 0.8rem; font-weight: 500;">Verwalten</span>
        </button>
        
        <button 
          @click="setActiveTab('budget')"
          :style="'flex: 1; padding: 1rem 0.5rem; text-align: center; border: none; background: none; cursor: pointer; color: ' + (activeTab === 'budget' ? '#474747' : '#8F8B82') + '; border-top: ' + (activeTab === 'budget' ? '3px solid #474747' : 'none') + '; font-family: Comic Sans MS, cursive, sans-serif;'"
        >
          <svg style="width: 1.5rem; height: 1.5rem; margin: 0 auto 0.25rem auto; display: block;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
          </svg>
          <span style="font-size: 0.8rem; font-weight: 500;">Budget</span>
        </button>
        
        <button 
          @click="setActiveTab('stats')"
          :style="'flex: 1; padding: 1rem 0.5rem; text-align: center; border: none; background: none; cursor: pointer; color: ' + (activeTab === 'stats' ? '#474747' : '#8F8B82') + '; border-top: ' + (activeTab === 'stats' ? '3px solid #474747' : 'none') + '; font-family: Comic Sans MS, cursive, sans-serif;'"
        >
          <svg style="width: 1.5rem; height: 1.5rem; margin: 0 auto 0.25rem auto; display: block;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
          </svg>
          <span style="font-size: 0.8rem; font-weight: 500;">Statistiken</span>
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

const orgInfo = ref({
  name: 'Altenheim Sonnenblick',
  type: 'Altenheim',
  verified: true
})

const stats = ref({
  helpers: 23,
  seekers: 45,
  activeTasks: 8,
  budget: 2450
})

const activeTasks = ref([
  {
    id: 1,
    title: 'Einkaufen für Frau Weber',
    type: 'shopping',
    seeker: 'Elisabeth Weber',
    helper: 'Anna M.',
    budget: 15,
    status: 'In Bearbeitung',
    timeAgo: 'vor 2h'
  },
  {
    id: 2,
    title: 'Garten pflegen',
    type: 'gardening',
    seeker: 'Klaus Müller',
    helper: 'Peter H.',
    budget: 25,
    status: 'Warten auf Helfer',
    timeAgo: 'vor 4h'
  }
])

const manageHelpers = () => {
  navigateTo('/pwa/org/helper-manage')
}

const manageSeekers = () => {
  navigateTo('/pwa/org/seeker-manage')
}

const createTask = () => {
  navigateTo('/pwa/org/task-create')
}

const openProfile = () => {
  navigateTo('/pwa/org/profile')
}

const viewTask = (taskId) => {
  // TODO: Navigate to task details
  console.log('Viewing task:', taskId)
}

const setActiveTab = (tab) => {
  activeTab.value = tab
  switch(tab) {
    case 'manage':
      navigateTo('/pwa/org/helper-manage')
      break
    case 'budget':
      navigateTo('/pwa/org/budget')
      break
    case 'stats':
      navigateTo('/pwa/org/stats')
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

const getStatusColor = (status) => {
  const colors = {
    'In Bearbeitung': '#5F6F55',
    'Warten auf Helfer': '#8FA66E',
    'Abgeschlossen': '#474747',
    'Abgebrochen': '#8F8B82'
  }
  return colors[status] || '#8F8B82'
}
</script>