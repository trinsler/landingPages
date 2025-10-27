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
        <h1 style="color: white; font-size: 1.25rem; font-weight: 700; margin: 0; font-family: 'Comic Sans MS', cursive, sans-serif; text-shadow: 1px 1px 2px rgba(0,0,0,0.3);">Auftrag erstellen</h1>
        <div style="width: 2.5rem;"></div>
      </div>
    </header>

    <div style="max-width: 80rem; margin: 0 auto; padding: 1.5rem; position: relative;">
      <!-- Selected Resident Badge - Paper style -->
      <div v-if="selectedResident" style="background: #8FA66E; color: white; padding: 1rem 2rem; transform: rotate(-1deg); box-shadow: 4px 4px 0px rgba(0,0,0,0.2); position: relative; margin-bottom: 2rem; text-align: center;">
        <!-- Torn corner -->
        <div style="position: absolute; top: 0; right: 0; width: 20px; height: 20px; background: #f5f5f5; clip-path: polygon(100% 0, 0 100%, 100% 100%);"></div>
        
        <div style="display: flex; align-items: center; justify-content: center; gap: 1rem;">
          <svg style="width: 1.5rem; height: 1.5rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
          </svg>
          <span style="font-size: 1.2rem; font-weight: 700; font-family: 'Comic Sans MS', cursive, sans-serif; text-shadow: 1px 1px 2px rgba(0,0,0,0.3);">
            Im Namen von {{ selectedResident.name }} (Zimmer {{ selectedResident.room }})
          </span>
        </div>
      </div>

      <!-- Resident Selection - Paper style -->
      <div v-if="!selectedResident" style="background: rgba(255,255,255,0.9); padding: 2rem; transform: rotate(-1deg); box-shadow: 6px 6px 0px rgba(0,0,0,0.15); position: relative; backdrop-filter: blur(3px); border: 1px solid rgba(71,71,71,0.1); margin-bottom: 2rem;">
        <!-- Torn corner -->
        <div style="position: absolute; top: 0; right: 0; width: 25px; height: 25px; background: #f5f5f5; clip-path: polygon(100% 0, 0 100%, 100% 100%);"></div>
        
        <h2 style="font-size: 2rem; font-weight: 700; margin: 0 0 1rem 0; color: #474747; font-family: 'Comic Sans MS', cursive, sans-serif; text-shadow: 1px 1px 2px rgba(0,0,0,0.1); text-align: center;">Bewohner auswählen</h2>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem;">
          <button 
            v-for="resident in residents" 
            :key="resident.id"
            @click="selectResident(resident)"
            style="background: rgba(255,255,255,0.8); padding: 1.5rem; border: 2px solid #BECDA3; cursor: pointer; transition: all 0.3s; box-shadow: 2px 2px 0px rgba(0,0,0,0.1);"
            onmouseover="this.style.borderColor='#5F6F55'; this.style.background='rgba(190,205,163,0.2)'; this.style.transform='translateY(-2px)';"
            onmouseout="this.style.borderColor='#BECDA3'; this.style.background='rgba(255,255,255,0.8)'; this.style.transform='translateY(0)';"
          >
            <div style="display: flex; align-items: center; gap: 1rem;">
              <div style="width: 3rem; height: 3rem; background: #BECDA3; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 2px 2px 0px rgba(0,0,0,0.1);">
                <img src="/icons/verschiedeneMenschen.svg" alt="Profil" style="width: 1.5rem; height: 1.5rem;">
              </div>
              <div style="text-align: left;">
                <h4 style="font-weight: 600; color: #474747; margin: 0 0 0.25rem 0; font-family: 'Comic Sans MS', cursive, sans-serif;">{{ resident.name }}</h4>
                <p style="font-size: 0.9rem; color: #8F8B82; margin: 0; font-family: 'Comic Sans MS', cursive, sans-serif;">Zimmer {{ resident.room }} • {{ resident.age }} Jahre</p>
              </div>
            </div>
          </button>
        </div>
      </div>

      <!-- Task Creation Form - Paper style -->
      <div v-if="selectedResident" style="background: rgba(255,255,255,0.9); padding: 2rem; transform: rotate(0.5deg); box-shadow: 6px 6px 0px rgba(0,0,0,0.15); position: relative; backdrop-filter: blur(3px); border: 1px solid rgba(71,71,71,0.1); margin-bottom: 2rem;">
        <!-- Torn corner -->
        <div style="position: absolute; top: 0; right: 0; width: 25px; height: 25px; background: #f5f5f5; clip-path: polygon(100% 0, 0 100%, 100% 100%);"></div>
        
        <h3 style="font-size: 1.5rem; font-weight: 700; color: #474747; margin: 0 0 1.5rem 0; font-family: 'Comic Sans MS', cursive, sans-serif;">Auftragsdetails</h3>
        
        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
          <!-- Task Type -->
          <div>
            <label style="display: block; font-size: 0.9rem; font-weight: 600; color: #474747; margin-bottom: 0.75rem; font-family: 'Comic Sans MS', cursive, sans-serif;">Art der Hilfe:</label>
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0.75rem;">
              <button 
                v-for="type in taskTypes" 
                :key="type.id"
                @click="selectedTaskType = type.id"
                :style="'padding: 1rem; border: 2px solid ' + (selectedTaskType === type.id ? '#474747' : '#BECDA3') + '; background: ' + (selectedTaskType === type.id ? '#BECDA3' : 'rgba(255,255,255,0.8)') + '; color: #474747; text-align: center; cursor: pointer; transition: all 0.3s; box-shadow: 2px 2px 0px rgba(0,0,0,0.1);'"
                onmouseover="if (this.dataset.notSelected !== 'false') { this.style.borderColor='#5F6F55'; this.style.background='rgba(190,205,163,0.2)'; }"
                onmouseout="if (this.dataset.notSelected !== 'false') { this.style.borderColor='#BECDA3'; this.style.background='rgba(255,255,255,0.8)'; }"
                :data-not-selected="selectedTaskType !== type.id"
              >
                <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
                  <img :src="type.icon" :alt="type.name" style="width: 2rem; height: 2rem;">
                  <span style="font-weight: 500; font-size: 0.9rem; font-family: 'Comic Sans MS', cursive, sans-serif;">{{ type.name }}</span>
                </div>
              </button>
            </div>
          </div>

          <!-- Description -->
          <div>
            <label style="display: block; font-size: 0.9rem; font-weight: 600; color: #474747; margin-bottom: 0.75rem; font-family: 'Comic Sans MS', cursive, sans-serif;">Beschreibung:</label>
            <textarea 
              v-model="taskDescription"
              style="width: 100%; padding: 1rem; border: 2px solid #BECDA3; background: rgba(255,255,255,0.8); font-family: 'Comic Sans MS', cursive, sans-serif; box-shadow: 2px 2px 0px rgba(0,0,0,0.1); resize: vertical; min-height: 120px;"
              placeholder="Beschreiben Sie genau, was erledigt werden soll..."
            ></textarea>
          </div>

          <!-- Priority and When -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
            <!-- Priority -->
            <div>
              <label style="display: block; font-size: 0.9rem; font-weight: 600; color: #474747; margin-bottom: 0.75rem; font-family: 'Comic Sans MS', cursive, sans-serif;">Priorität:</label>
              <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                <button 
                  v-for="priority in priorities" 
                  :key="priority.value"
                  @click="selectedPriority = priority.value"
                  :style="'padding: 0.75rem 1rem; border: 1px solid ' + (selectedPriority === priority.value ? '#474747' : '#BECDA3') + '; background: ' + (selectedPriority === priority.value ? priority.color : 'rgba(255,255,255,0.8)') + '; color: ' + (selectedPriority === priority.value ? 'white' : '#474747') + '; cursor: pointer; transition: all 0.3s; font-family: Comic Sans MS, cursive, sans-serif; font-size: 0.9rem; box-shadow: 1px 1px 0px rgba(0,0,0,0.1);'"
                  onmouseover="if (this.dataset.notSelected !== 'false') { this.style.borderColor='#5F6F55'; }"
                  onmouseout="if (this.dataset.notSelected !== 'false') { this.style.borderColor='#BECDA3'; }"
                  :data-not-selected="selectedPriority !== priority.value"
                >
                  {{ priority.label }}
                </button>
              </div>
            </div>

            <!-- When -->
            <div>
              <label style="display: block; font-size: 0.9rem; font-weight: 600; color: #474747; margin-bottom: 0.75rem; font-family: 'Comic Sans MS', cursive, sans-serif;">Wann benötigt:</label>
              <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                <button 
                  v-for="time in timeOptions" 
                  :key="time"
                  @click="selectedTime = time"
                  :style="'padding: 0.75rem 1rem; border: 1px solid ' + (selectedTime === time ? '#474747' : '#BECDA3') + '; background: ' + (selectedTime === time ? '#474747' : 'rgba(255,255,255,0.8)') + '; color: ' + (selectedTime === time ? 'white' : '#474747') + '; cursor: pointer; transition: all 0.3s; font-family: Comic Sans MS, cursive, sans-serif; font-size: 0.9rem; box-shadow: 1px 1px 0px rgba(0,0,0,0.1);'"
                  onmouseover="if (this.dataset.notSelected !== 'false') { this.style.borderColor='#5F6F55'; }"
                  onmouseout="if (this.dataset.notSelected !== 'false') { this.style.borderColor='#BECDA3'; }"
                  :data-not-selected="selectedTime !== time"
                >
                  {{ time }}
                </button>
              </div>
            </div>
          </div>

          <!-- Budget -->
          <div>
            <label style="display: block; font-size: 0.9rem; font-weight: 600; color: #474747; margin-bottom: 0.75rem; font-family: 'Comic Sans MS', cursive, sans-serif;">Budget:</label>
            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
              <button 
                v-for="budget in budgetOptions" 
                :key="budget"
                @click="selectedBudget = budget"
                :style="'padding: 0.5rem 1rem; border: 1px solid ' + (selectedBudget === budget ? '#474747' : '#BECDA3') + '; background: ' + (selectedBudget === budget ? '#474747' : 'rgba(255,255,255,0.8)') + '; color: ' + (selectedBudget === budget ? 'white' : '#474747') + '; cursor: pointer; transition: all 0.3s; font-family: Comic Sans MS, cursive, sans-serif; font-size: 0.9rem; box-shadow: 1px 1px 0px rgba(0,0,0,0.1);'"
                onmouseover="if (this.dataset.notSelected !== 'false') { this.style.borderColor='#5F6F55'; }"
                onmouseout="if (this.dataset.notSelected !== 'false') { this.style.borderColor='#BECDA3'; }"
                :data-not-selected="selectedBudget !== budget"
              >
                {{ budget }}€
              </button>
              <button 
                @click="showCustomBudget = true"
                style="padding: 0.5rem 1rem; border: 1px solid #BECDA3; background: rgba(255,255,255,0.8); color: #474747; cursor: pointer; transition: all 0.3s; font-family: 'Comic Sans MS', cursive, sans-serif; font-size: 0.9rem; box-shadow: 1px 1px 0px rgba(0,0,0,0.1);"
                onmouseover="this.style.borderColor='#5F6F55'"
                onmouseout="this.style.borderColor='#BECDA3'"
              >
                Anderes
              </button>
            </div>
          </div>

          <!-- Special Notes -->
          <div>
            <label style="display: block; font-size: 0.9rem; font-weight: 600; color: #474747; margin-bottom: 0.75rem; font-family: 'Comic Sans MS', cursive, sans-serif;">Besondere Hinweise:</label>
            <textarea 
              v-model="specialNotes"
              style="width: 100%; padding: 1rem; border: 2px solid #BECDA3; background: rgba(255,255,255,0.8); font-family: 'Comic Sans MS', cursive, sans-serif; box-shadow: 2px 2px 0px rgba(0,0,0,0.1); resize: vertical; min-height: 80px;"
              placeholder="Besondere Wünsche oder Hinweise für den Helfer..."
            ></textarea>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div v-if="selectedResident" style="display: flex; gap: 1rem; justify-content: center;">
        <button 
          @click="resetSelection"
          style="background: #8F8B82; color: white; padding: 1rem 2rem; border: none; cursor: pointer; font-weight: 600; font-family: 'Comic Sans MS', cursive, sans-serif; box-shadow: 4px 4px 0px rgba(0,0,0,0.2); transition: transform 0.2s;"
          onmouseover="this.style.transform='translateY(-2px)'"
          onmouseout="this.style.transform='translateY(0)'"
        >
          Zurück zur Auswahl
        </button>
        
        <button 
          @click="createTask"
          :disabled="!canCreateTask"
          :style="'padding: 1rem 2rem; border: none; cursor: ' + (canCreateTask ? 'pointer' : 'not-allowed') + '; font-weight: 600; font-family: Comic Sans MS, cursive, sans-serif; box-shadow: 4px 4px 0px rgba(0,0,0,0.2); transition: transform 0.2s; background: ' + (canCreateTask ? '#5F6F55' : '#BECDA3') + '; color: white;'"
          onmouseover="if (this.dataset.canCreate === 'true') { this.style.transform='translateY(-2px)'; }"
          onmouseout="if (this.dataset.canCreate === 'true') { this.style.transform='translateY(0)'; }"
          :data-can-create="canCreateTask"
        >
          Auftrag erstellen
        </button>
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

const selectedResident = ref(null)
const selectedTaskType = ref('shopping')
const taskDescription = ref('')
const selectedPriority = ref('normal')
const selectedTime = ref('Heute')
const selectedBudget = ref(15)
const specialNotes = ref('')
const showCustomBudget = ref(false)

const residents = ref([
  { id: 1, name: 'Elisabeth Weber', age: 82, room: '101' },
  { id: 2, name: 'Klaus Müller', age: 78, room: '205' },
  { id: 3, name: 'Anna Schmidt', age: 85, room: '112' },
  { id: 4, name: 'Heinrich Klein', age: 80, room: '301' }
])

const taskTypes = ref([
  { id: 'shopping', name: 'Einkaufen', icon: '/icons/einkaufenMadl.svg' },
  { id: 'cooking', name: 'Kochen', icon: '/icons/kochen.svg' },
  { id: 'cleaning', name: 'Reinigen', icon: '/icons/staubsaugen.svg' },
  { id: 'gardening', name: 'Garten', icon: '/icons/gießenBub.svg' },
  { id: 'tech_help', name: 'Technik', icon: '/icons/technikBanalcieren.svg' },
  { id: 'dog_walking', name: 'Gassi gehen', icon: '/icons/FrontalGassiJunge.svg' }
])

const priorities = ref([
  { value: 'low', label: 'Niedrig', color: '#BECDA3' },
  { value: 'normal', label: 'Normal', color: '#8FA66E' },
  { value: 'high', label: 'Hoch', color: '#5F6F55' },
  { value: 'urgent', label: 'Dringend', color: '#474747' }
])

const timeOptions = ref(['Heute', 'Morgen', 'Diese Woche', 'Nächste Woche'])
const budgetOptions = ref([10, 15, 20, 25, 30])

const canCreateTask = computed(() => {
  return selectedResident.value && selectedTaskType.value && taskDescription.value.trim() && selectedPriority.value && selectedTime.value && selectedBudget.value
})

// Check for pre-selected resident from URL params
onMounted(() => {
  const route = useRoute()
  const seekerId = route.query.seeker
  if (seekerId) {
    const resident = residents.value.find(r => r.id === parseInt(seekerId))
    if (resident) {
      selectedResident.value = resident
    }
  }
})

const goBack = () => {
  navigateTo('/pwa/org/seeker-manage')
}

const selectResident = (resident) => {
  selectedResident.value = resident
}

const resetSelection = () => {
  selectedResident.value = null
  // Reset form
  selectedTaskType.value = 'shopping'
  taskDescription.value = ''
  selectedPriority.value = 'normal'
  selectedTime.value = 'Heute'
  selectedBudget.value = 15
  specialNotes.value = ''
}

const createTask = () => {
  if (canCreateTask.value) {
    const task = {
      resident: selectedResident.value,
      type: selectedTaskType.value,
      description: taskDescription.value,
      priority: selectedPriority.value,
      time: selectedTime.value,
      budget: selectedBudget.value,
      notes: specialNotes.value
    }
    
    console.log('Creating task:', task)
    // TODO: Submit task to backend
    
    // Navigate back to dashboard with success message
    navigateTo('/pwa/org/dashboard')
  }
}
</script>