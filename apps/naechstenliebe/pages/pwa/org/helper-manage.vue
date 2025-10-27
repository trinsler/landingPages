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
        <h1 style="color: white; font-size: 1.25rem; font-weight: 700; margin: 0; font-family: 'Comic Sans MS', cursive, sans-serif; text-shadow: 1px 1px 2px rgba(0,0,0,0.3);">Helfer verwalten</h1>
        <div style="width: 2.5rem;"></div>
      </div>
    </header>

    <div style="max-width: 80rem; margin: 0 auto; padding: 1.5rem; position: relative;">
      <!-- Header Section - Paper style -->
      <div style="background: rgba(255,255,255,0.9); padding: 2rem; transform: rotate(-1deg); box-shadow: 6px 6px 0px rgba(0,0,0,0.15); position: relative; backdrop-filter: blur(3px); border: 1px solid rgba(71,71,71,0.1); margin-bottom: 2rem;">
        <!-- Torn corner -->
        <div style="position: absolute; top: 0; right: 0; width: 25px; height: 25px; background: #f5f5f5; clip-path: polygon(100% 0, 0 100%, 100% 100%);"></div>
        
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <h2 style="font-size: 2rem; font-weight: 700; margin: 0 0 0.5rem 0; color: #474747; font-family: 'Comic Sans MS', cursive, sans-serif;">{{ helpers.length }} Helfer registriert</h2>
            <p style="color: #8F8B82; margin: 0; font-family: 'Comic Sans MS', cursive, sans-serif;">Verwalten Sie alle Helfer Ihrer Organisation</p>
          </div>
          <button 
            @click="addHelper"
            style="background: #5F6F55; color: white; padding: 1rem 2rem; border: none; cursor: pointer; font-weight: 600; font-family: 'Comic Sans MS', cursive, sans-serif; box-shadow: 4px 4px 0px rgba(0,0,0,0.2); transition: transform 0.2s;"
            onmouseover="this.style.transform='translateY(-2px)'"
            onmouseout="this.style.transform='translateY(0)'"
          >
            + Helfer hinzufügen
          </button>
        </div>
      </div>

      <!-- Bulk Actions - Paper style -->
      <div style="background: rgba(255,255,255,0.9); padding: 1.5rem; transform: rotate(0.5deg); box-shadow: 4px 4px 0px rgba(0,0,0,0.1); border: 1px solid rgba(71,71,71,0.1); margin-bottom: 2rem;">
        <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
          <button 
            @click="bulkUpload"
            style="background: #8FA66E; color: white; padding: 0.75rem 1.5rem; border: none; cursor: pointer; font-weight: 500; font-family: 'Comic Sans MS', cursive, sans-serif; box-shadow: 2px 2px 0px rgba(0,0,0,0.15); transition: transform 0.2s;"
            onmouseover="this.style.transform='translateY(-1px)'"
            onmouseout="this.style.transform='translateY(0)'"
          >
            CSV Import
          </button>
          <button 
            @click="exportHelpers"
            style="background: #BECDA3; color: #474747; padding: 0.75rem 1.5rem; border: none; cursor: pointer; font-weight: 500; font-family: 'Comic Sans MS', cursive, sans-serif; box-shadow: 2px 2px 0px rgba(0,0,0,0.15); transition: transform 0.2s;"
            onmouseover="this.style.transform='translateY(-1px)'"
            onmouseout="this.style.transform='translateY(0)'"
          >
            Export CSV
          </button>
          <div style="margin-left: auto; display: flex; align-items: center; gap: 0.5rem;">
            <span style="font-size: 0.9rem; color: #8F8B82; font-family: 'Comic Sans MS', cursive, sans-serif;">Filter:</span>
            <select v-model="statusFilter" style="padding: 0.5rem; border: 2px solid #BECDA3; background: white; font-family: 'Comic Sans MS', cursive, sans-serif; box-shadow: 2px 2px 0px rgba(0,0,0,0.1);">
              <option value="all">Alle</option>
              <option value="active">Aktiv</option>
              <option value="offline">Offline</option>
              <option value="disabled">Deaktiviert</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Helpers List - Paper style -->
      <div style="background: rgba(255,255,255,0.9); padding: 2rem; transform: rotate(-0.5deg); box-shadow: 6px 6px 0px rgba(0,0,0,0.15); position: relative; backdrop-filter: blur(3px); border: 1px solid rgba(71,71,71,0.1);">
        <!-- Torn corner -->
        <div style="position: absolute; top: 0; right: 0; width: 20px; height: 20px; background: #f5f5f5; clip-path: polygon(100% 0, 0 100%, 100% 100%);"></div>
        
        <div v-if="filteredHelpers.length > 0" style="display: flex; flex-direction: column; gap: 1rem;">
          <div 
            v-for="helper in filteredHelpers" 
            :key="helper.id"
            style="border: 2px solid #BECDA3; padding: 1.5rem; background: rgba(255,255,255,0.7); box-shadow: 3px 3px 0px rgba(0,0,0,0.1); transition: transform 0.2s;"
            onmouseover="this.style.transform='translateY(-2px)'"
            onmouseout="this.style.transform='translateY(0)'"
          >
            <div style="display: flex; align-items: center; gap: 1.5rem;">
              <!-- Profile Image -->
              <div style="width: 4rem; height: 4rem; background: #BECDA3; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; box-shadow: 2px 2px 0px rgba(0,0,0,0.1);">
                <img src="/icons/verschiedeneMenschen.svg" alt="Profil" style="width: 2rem; height: 2rem;">
              </div>
              
              <!-- Helper Info -->
              <div style="flex: 1; min-width: 0;">
                <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 0.5rem;">
                  <h4 style="font-weight: 600; color: #474747; margin: 0; font-family: 'Comic Sans MS', cursive, sans-serif; font-size: 1.1rem;">{{ helper.name }}</h4>
                  <span :style="'padding: 0.25rem 0.75rem; font-size: 0.8rem; font-weight: 500; font-family: Comic Sans MS, cursive, sans-serif; box-shadow: 1px 1px 0px rgba(0,0,0,0.1); color: white; background: ' + getStatusColor(helper.status) + ';'">
                    {{ helper.status }}
                  </span>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem; margin-bottom: 0.5rem;">
                  <div>
                    <span style="font-size: 0.8rem; color: #8F8B82; font-family: 'Comic Sans MS', cursive, sans-serif;">Alter:</span>
                    <span style="font-size: 0.9rem; color: #474747; margin-left: 0.5rem; font-family: 'Comic Sans MS', cursive, sans-serif;">{{ helper.age }}</span>
                  </div>
                  <div>
                    <span style="font-size: 0.8rem; color: #8F8B82; font-family: 'Comic Sans MS', cursive, sans-serif;">Fähigkeiten:</span>
                    <span style="font-size: 0.9rem; color: #474747; margin-left: 0.5rem; font-family: 'Comic Sans MS', cursive, sans-serif;">{{ helper.skills.join(', ') }}</span>
                  </div>
                  <div>
                    <span style="font-size: 0.8rem; color: #8F8B82; font-family: 'Comic Sans MS', cursive, sans-serif;">Aufträge:</span>
                    <span style="font-size: 0.9rem; color: #474747; margin-left: 0.5rem; font-family: 'Comic Sans MS', cursive, sans-serif;">{{ helper.completedTasks }}</span>
                  </div>
                </div>
                
                <div>
                  <span style="font-size: 0.8rem; color: #8F8B82; font-family: 'Comic Sans MS', cursive, sans-serif;">Letzter Login:</span>
                  <span style="font-size: 0.9rem; color: #474747; margin-left: 0.5rem; font-family: 'Comic Sans MS', cursive, sans-serif;">{{ helper.lastLogin }}</span>
                </div>
              </div>
              
              <!-- Actions -->
              <div style="display: flex; flex-direction: column; gap: 0.5rem; flex-shrink: 0;">
                <button 
                  @click="toggleHelper(helper.id)"
                  :style="'padding: 0.5rem 1rem; border: none; cursor: pointer; font-size: 0.9rem; font-weight: 500; font-family: Comic Sans MS, cursive, sans-serif; box-shadow: 2px 2px 0px rgba(0,0,0,0.15); transition: transform 0.2s; background: ' + (helper.status === 'Aktiv' ? '#8F8B82' : '#5F6F55') + '; color: white;'"
                  onmouseover="this.style.transform='translateY(-1px)'"
                  onmouseout="this.style.transform='translateY(0)'"
                >
                  {{ helper.status === 'Aktiv' ? 'Deaktivieren' : 'Aktivieren' }}
                </button>
                <button 
                  @click="editHelper(helper.id)"
                  style="background: #BECDA3; color: #474747; padding: 0.5rem 1rem; border: none; cursor: pointer; font-size: 0.9rem; font-weight: 500; font-family: 'Comic Sans MS', cursive, sans-serif; box-shadow: 2px 2px 0px rgba(0,0,0,0.15); transition: transform 0.2s;"
                  onmouseover="this.style.transform='translateY(-1px)'"
                  onmouseout="this.style.transform='translateY(0)'"
                >
                  Bearbeiten
                </button>
                <button 
                  @click="viewStats(helper.id)"
                  style="background: #474747; color: white; padding: 0.5rem 1rem; border: none; cursor: pointer; font-size: 0.9rem; font-weight: 500; font-family: 'Comic Sans MS', cursive, sans-serif; box-shadow: 2px 2px 0px rgba(0,0,0,0.15); transition: transform 0.2s;"
                  onmouseover="this.style.transform='translateY(-1px)'"
                  onmouseout="this.style.transform='translateY(0)'"
                >
                  Statistiken
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div v-else style="text-align: center; padding: 3rem;">
          <div style="width: 4rem; height: 4rem; background: #BECDA3; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem auto; box-shadow: 3px 3px 0px rgba(0,0,0,0.1);">
            <svg style="width: 2rem; height: 2rem; color: #474747;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
            </svg>
          </div>
          <p style="color: #8F8B82; font-family: 'Comic Sans MS', cursive, sans-serif; margin: 0;">Keine Helfer gefunden</p>
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

const statusFilter = ref('all')

const helpers = ref([
  {
    id: 1,
    name: 'Anna Müller',
    age: 19,
    status: 'Aktiv',
    skills: ['Einkaufen', 'Kochen'],
    completedTasks: 12,
    lastLogin: 'vor 2h',
    email: 'anna.mueller@schule.de'
  },
  {
    id: 2,
    name: 'Tim Schmidt',
    age: 18,
    status: 'Offline',
    skills: ['Technik', 'Garten'],
    completedTasks: 8,
    lastLogin: 'vor 1 Tag',
    email: 'tim.schmidt@schule.de'
  },
  {
    id: 3,
    name: 'Lisa Weber',
    age: 20,
    status: 'Aktiv',
    skills: ['Reinigung', 'Einkaufen'],
    completedTasks: 15,
    lastLogin: 'vor 30min',
    email: 'lisa.weber@schule.de'
  },
  {
    id: 4,
    name: 'Max Klein',
    age: 19,
    status: 'Deaktiviert',
    skills: ['Gassi gehen', 'Garten'],
    completedTasks: 3,
    lastLogin: 'vor 2 Wochen',
    email: 'max.klein@schule.de'
  }
])

const filteredHelpers = computed(() => {
  if (statusFilter.value === 'all') {
    return helpers.value
  }
  const statusMap = {
    'active': 'Aktiv',
    'offline': 'Offline', 
    'disabled': 'Deaktiviert'
  }
  return helpers.value.filter(helper => helper.status === statusMap[statusFilter.value])
})

const goBack = () => {
  navigateTo('/pwa/org/dashboard')
}

const addHelper = () => {
  // TODO: Open add helper modal or form
  console.log('Adding new helper...')
}

const bulkUpload = () => {
  // TODO: Open CSV upload modal
  console.log('Bulk upload CSV...')
}

const exportHelpers = () => {
  // TODO: Export helpers to CSV
  console.log('Exporting helpers to CSV...')
}

const toggleHelper = (helperId) => {
  const helper = helpers.value.find(h => h.id === helperId)
  if (helper) {
    helper.status = helper.status === 'Aktiv' ? 'Deaktiviert' : 'Aktiv'
  }
}

const editHelper = (helperId) => {
  // TODO: Open edit helper modal
  console.log('Editing helper:', helperId)
}

const viewStats = (helperId) => {
  // TODO: Navigate to helper stats
  console.log('Viewing stats for helper:', helperId)
}

const getStatusColor = (status) => {
  const colors = {
    'Aktiv': '#5F6F55',
    'Offline': '#8FA66E',
    'Deaktiviert': '#8F8B82'
  }
  return colors[status] || '#8F8B82'
}
</script>