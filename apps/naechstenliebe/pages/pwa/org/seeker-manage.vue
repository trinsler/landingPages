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
        <h1 style="color: white; font-size: 1.25rem; font-weight: 700; margin: 0; font-family: 'Comic Sans MS', cursive, sans-serif; text-shadow: 1px 1px 2px rgba(0,0,0,0.3);">Hilfesuchende verwalten</h1>
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
            <h2 style="font-size: 2rem; font-weight: 700; margin: 0 0 0.5rem 0; color: #474747; font-family: 'Comic Sans MS', cursive, sans-serif;">{{ seekers.length }} Hilfesuchende</h2>
            <p style="color: #8F8B82; margin: 0; font-family: 'Comic Sans MS', cursive, sans-serif;">Verwalten Sie alle Bewohner und erstellen Sie Aufträge</p>
          </div>
          <button 
            @click="addSeeker"
            style="background: #8FA66E; color: white; padding: 1rem 2rem; border: none; cursor: pointer; font-weight: 600; font-family: 'Comic Sans MS', cursive, sans-serif; box-shadow: 4px 4px 0px rgba(0,0,0,0.2); transition: transform 0.2s;"
            onmouseover="this.style.transform='translateY(-2px)'"
            onmouseout="this.style.transform='translateY(0)'"
          >
            + Bewohner hinzufügen
          </button>
        </div>
      </div>

      <!-- Quick Actions - Paper style -->
      <div style="background: rgba(255,255,255,0.9); padding: 1.5rem; transform: rotate(0.5deg); box-shadow: 4px 4px 0px rgba(0,0,0,0.1); border: 1px solid rgba(71,71,71,0.1); margin-bottom: 2rem;">
        <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
          <button 
            @click="createBulkTask"
            style="background: #5F6F55; color: white; padding: 0.75rem 1.5rem; border: none; cursor: pointer; font-weight: 500; font-family: 'Comic Sans MS', cursive, sans-serif; box-shadow: 2px 2px 0px rgba(0,0,0,0.15); transition: transform 0.2s;"
            onmouseover="this.style.transform='translateY(-1px)'"
            onmouseout="this.style.transform='translateY(0)'"
          >
            Sammelauftrag erstellen
          </button>
          <button 
            @click="exportSeekers"
            style="background: #BECDA3; color: #474747; padding: 0.75rem 1.5rem; border: none; cursor: pointer; font-weight: 500; font-family: 'Comic Sans MS', cursive, sans-serif; box-shadow: 2px 2px 0px rgba(0,0,0,0.15); transition: transform 0.2s;"
            onmouseover="this.style.transform='translateY(-1px)'"
            onmouseout="this.style.transform='translateY(0)'"
          >
            Export CSV
          </button>
          <div style="margin-left: auto; display: flex; align-items: center; gap: 0.5rem;">
            <span style="font-size: 0.9rem; color: #8F8B82; font-family: 'Comic Sans MS', cursive, sans-serif;">Zimmer:</span>
            <select v-model="roomFilter" style="padding: 0.5rem; border: 2px solid #BECDA3; background: white; font-family: 'Comic Sans MS', cursive, sans-serif; box-shadow: 2px 2px 0px rgba(0,0,0,0.1);">
              <option value="all">Alle</option>
              <option value="1">1. Stock</option>
              <option value="2">2. Stock</option>
              <option value="3">3. Stock</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Seekers List - Paper style -->
      <div style="background: rgba(255,255,255,0.9); padding: 2rem; transform: rotate(-0.5deg); box-shadow: 6px 6px 0px rgba(0,0,0,0.15); position: relative; backdrop-filter: blur(3px); border: 1px solid rgba(71,71,71,0.1);">
        <!-- Torn corner -->
        <div style="position: absolute; top: 0; right: 0; width: 20px; height: 20px; background: #f5f5f5; clip-path: polygon(100% 0, 0 100%, 100% 100%);"></div>
        
        <div v-if="filteredSeekers.length > 0" style="display: flex; flex-direction: column; gap: 1rem;">
          <div 
            v-for="seeker in filteredSeekers" 
            :key="seeker.id"
            style="border: 2px solid #BECDA3; padding: 1.5rem; background: rgba(255,255,255,0.7); box-shadow: 3px 3px 0px rgba(0,0,0,0.1); transition: transform 0.2s;"
            onmouseover="this.style.transform='translateY(-2px)'"
            onmouseout="this.style.transform='translateY(0)'"
          >
            <div style="display: flex; align-items: center; gap: 1.5rem;">
              <!-- Profile Image -->
              <div style="width: 4rem; height: 4rem; background: #BECDA3; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; box-shadow: 2px 2px 0px rgba(0,0,0,0.1);">
                <img src="/icons/verschiedeneMenschen.svg" alt="Profil" style="width: 2rem; height: 2rem;">
              </div>
              
              <!-- Seeker Info -->
              <div style="flex: 1; min-width: 0;">
                <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 0.5rem;">
                  <h4 style="font-weight: 600; color: #474747; margin: 0; font-family: 'Comic Sans MS', cursive, sans-serif; font-size: 1.1rem;">{{ seeker.name }}</h4>
                  <span style="padding: 0.25rem 0.75rem; font-size: 0.8rem; font-weight: 500; font-family: 'Comic Sans MS', cursive, sans-serif; box-shadow: 1px 1px 0px rgba(0,0,0,0.1); color: white; background: #8FA66E;">
                    Zimmer {{ seeker.room }}
                  </span>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem; margin-bottom: 0.5rem;">
                  <div>
                    <span style="font-size: 0.8rem; color: #8F8B82; font-family: 'Comic Sans MS', cursive, sans-serif;">Alter:</span>
                    <span style="font-size: 0.9rem; color: #474747; margin-left: 0.5rem; font-family: 'Comic Sans MS', cursive, sans-serif;">{{ seeker.age }}</span>
                  </div>
                  <div>
                    <span style="font-size: 0.8rem; color: #8F8B82; font-family: 'Comic Sans MS', cursive, sans-serif;">Benötigt Hilfe:</span>
                    <span style="font-size: 0.9rem; color: #474747; margin-left: 0.5rem; font-family: 'Comic Sans MS', cursive, sans-serif;">{{ seeker.needs.join(', ') }}</span>
                  </div>
                  <div>
                    <span style="font-size: 0.8rem; color: #8F8B82; font-family: 'Comic Sans MS', cursive, sans-serif;">Aktive Aufträge:</span>
                    <span style="font-size: 0.9rem; color: #474747; margin-left: 0.5rem; font-family: 'Comic Sans MS', cursive, sans-serif;">{{ seeker.activeTasks }}</span>
                  </div>
                </div>
                
                <div style="display: flex; gap: 2rem;">
                  <div>
                    <span style="font-size: 0.8rem; color: #8F8B82; font-family: 'Comic Sans MS', cursive, sans-serif;">Angehörige:</span>
                    <span style="font-size: 0.9rem; color: #474747; margin-left: 0.5rem; font-family: 'Comic Sans MS', cursive, sans-serif;">{{ seeker.contact }}</span>
                  </div>
                  <div>
                    <span style="font-size: 0.8rem; color: #8F8B82; font-family: 'Comic Sans MS', cursive, sans-serif;">Letzte Hilfe:</span>
                    <span style="font-size: 0.9rem; color: #474747; margin-left: 0.5rem; font-family: 'Comic Sans MS', cursive, sans-serif;">{{ seeker.lastHelp }}</span>
                  </div>
                </div>
              </div>
              
              <!-- Actions -->
              <div style="display: flex; flex-direction: column; gap: 0.5rem; flex-shrink: 0;">
                <button 
                  @click="createTaskFor(seeker.id)"
                  style="background: #5F6F55; color: white; padding: 0.5rem 1rem; border: none; cursor: pointer; font-size: 0.9rem; font-weight: 500; font-family: 'Comic Sans MS', cursive, sans-serif; box-shadow: 2px 2px 0px rgba(0,0,0,0.15); transition: transform 0.2s;"
                  onmouseover="this.style.transform='translateY(-1px)'"
                  onmouseout="this.style.transform='translateY(0)'"
                >
                  Auftrag erstellen
                </button>
                <button 
                  @click="viewHistory(seeker.id)"
                  style="background: #BECDA3; color: #474747; padding: 0.5rem 1rem; border: none; cursor: pointer; font-size: 0.9rem; font-weight: 500; font-family: 'Comic Sans MS', cursive, sans-serif; box-shadow: 2px 2px 0px rgba(0,0,0,0.15); transition: transform 0.2s;"
                  onmouseover="this.style.transform='translateY(-1px)'"
                  onmouseout="this.style.transform='translateY(0)'"
                >
                  Verlauf
                </button>
                <button 
                  @click="editSeeker(seeker.id)"
                  style="background: #474747; color: white; padding: 0.5rem 1rem; border: none; cursor: pointer; font-size: 0.9rem; font-weight: 500; font-family: 'Comic Sans MS', cursive, sans-serif; box-shadow: 2px 2px 0px rgba(0,0,0,0.15); transition: transform 0.2s;"
                  onmouseover="this.style.transform='translateY(-1px)'"
                  onmouseout="this.style.transform='translateY(0)'"
                >
                  Bearbeiten
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div v-else style="text-align: center; padding: 3rem;">
          <div style="width: 4rem; height: 4rem; background: #BECDA3; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem auto; box-shadow: 3px 3px 0px rgba(0,0,0,0.1);">
            <svg style="width: 2rem; height: 2rem; color: #474747;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
          </div>
          <p style="color: #8F8B82; font-family: 'Comic Sans MS', cursive, sans-serif; margin: 0;">Keine Hilfesuchenden gefunden</p>
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

const roomFilter = ref('all')

const seekers = ref([
  {
    id: 1,
    name: 'Elisabeth Weber',
    age: 82,
    room: '101',
    floor: '1',
    needs: ['Einkaufen', 'Medikamente'],
    activeTasks: 2,
    contact: 'Tochter Maria',
    lastHelp: 'vor 2 Tagen'
  },
  {
    id: 2,
    name: 'Klaus Müller',
    age: 78,
    room: '205',
    floor: '2',
    needs: ['Garten', 'Technik'],
    activeTasks: 1,
    contact: 'Sohn Peter',
    lastHelp: 'vor 5 Tagen'
  },
  {
    id: 3,
    name: 'Anna Schmidt',
    age: 85,
    room: '112',
    floor: '1',
    needs: ['Kochen', 'Reinigung'],
    activeTasks: 0,
    contact: 'Enkelin Lisa',
    lastHelp: 'vor 1 Woche'
  },
  {
    id: 4,
    name: 'Heinrich Klein',
    age: 80,
    room: '301',
    floor: '3',
    needs: ['Gassi gehen', 'Einkaufen'],
    activeTasks: 3,
    contact: 'Schwiegertochter Eva',
    lastHelp: 'gestern'
  }
])

const filteredSeekers = computed(() => {
  if (roomFilter.value === 'all') {
    return seekers.value
  }
  return seekers.value.filter(seeker => seeker.floor === roomFilter.value)
})

const goBack = () => {
  navigateTo('/pwa/org/dashboard')
}

const addSeeker = () => {
  // TODO: Open add seeker modal or form
  console.log('Adding new seeker...')
}

const createBulkTask = () => {
  // TODO: Open bulk task creation modal
  console.log('Creating bulk task...')
}

const exportSeekers = () => {
  // TODO: Export seekers to CSV
  console.log('Exporting seekers to CSV...')
}

const createTaskFor = (seekerId) => {
  navigateTo(`/pwa/org/task-create?seeker=${seekerId}`)
}

const viewHistory = (seekerId) => {
  // TODO: Navigate to seeker task history
  console.log('Viewing history for seeker:', seekerId)
}

const editSeeker = (seekerId) => {
  // TODO: Open edit seeker modal
  console.log('Editing seeker:', seekerId)
}
</script>