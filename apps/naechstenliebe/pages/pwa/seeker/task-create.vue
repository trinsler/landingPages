<template>
  <div style="min-height: 100vh; background: #f5f5f5; font-family: 'Comic Sans MS', cursive, sans-serif;">
    
    <div style="max-width: 80rem; margin: 0 auto; padding: 1.5rem; position: relative;">
      <!-- Voice Input Section - Paper style like landing page -->
      <div style="background: rgba(255,255,255,0.9); padding: 2.5rem; transform: rotate(-1deg); box-shadow: 6px 6px 0px rgba(0,0,0,0.15); position: relative; backdrop-filter: blur(3px); border: 1px solid rgba(71,71,71,0.1); margin-bottom: 2rem;">
        <!-- Torn corner -->
        <div style="position: absolute; top: 0; right: 0; width: 25px; height: 25px; background: #f5f5f5; clip-path: polygon(100% 0, 0 100%, 100% 100%);"></div>
        
        <div style="text-align: center;">
          <h2 style="font-size: 2rem; font-weight: 700; margin: 0 0 1rem 0; color: #474747; font-family: 'Comic Sans MS', cursive, sans-serif; text-shadow: 1px 1px 2px rgba(0,0,0,0.1);">Beschreiben Sie Ihr Anliegen</h2>
          <p style="color: #8F8B82; font-family: 'Comic Sans MS', cursive, sans-serif; margin: 0 0 2rem 0;">Sprechen Sie einfach oder tippen Sie - wie es für Sie am bequemsten ist</p>
          
          <!-- Voice Input Button - Paper style -->
          <div style="padding: 2rem 0;">
            <button 
              @click="toggleRecording"
              :style="'width: 8rem; height: 8rem; border-radius: 50%; border: none; cursor: pointer; box-shadow: 6px 6px 0px rgba(0,0,0,0.2); transition: transform 0.3s, box-shadow 0.3s; transform: ' + (isRecording ? 'scale(1.1)' : 'scale(1)') + '; background: ' + (isRecording ? '#ff4444' : '#5F6F55') + ';'"
              onmouseover="if (!this.dataset.recording) { this.style.transform='scale(1.05)'; this.style.boxShadow='8px 8px 0px rgba(0,0,0,0.25)'; }"
              onmouseout="if (!this.dataset.recording) { this.style.transform='scale(1)'; this.style.boxShadow='6px 6px 0px rgba(0,0,0,0.2)'; }"
              :data-recording="isRecording"
            >
              <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
                <svg 
                  style="width: 3rem; height: 3rem; color: white;" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path v-if="!isRecording" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"/>
                  <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-6.219-8.56"/>
                </svg>
                <span style="font-size: 0.9rem; font-weight: 600; color: white; font-family: 'Comic Sans MS', cursive, sans-serif; text-shadow: 1px 1px 2px rgba(0,0,0,0.3);">
                  {{ isRecording ? 'Aufnahme...' : 'Tippen & Sprechen' }}
                </span>
              </div>
            </button>
          </div>
          
          <div v-if="isRecording" style="text-align: center;">
            <div style="display: flex; justify-content: center; gap: 0.25rem; margin-bottom: 0.5rem;">
              <div style="width: 0.25rem; height: 2rem; background: #ff4444; border-radius: 0.125rem; animation: pulse 1s infinite;" :style="'animation-delay: 0s'"></div>
              <div style="width: 0.25rem; height: 1.5rem; background: #ff6666; border-radius: 0.125rem; animation: pulse 1s infinite;" :style="'animation-delay: 0.1s'"></div>
              <div style="width: 0.25rem; height: 2.5rem; background: #ff4444; border-radius: 0.125rem; animation: pulse 1s infinite;" :style="'animation-delay: 0.2s'"></div>
              <div style="width: 0.25rem; height: 1rem; background: #ff6666; border-radius: 0.125rem; animation: pulse 1s infinite;" :style="'animation-delay: 0.3s'"></div>
              <div style="width: 0.25rem; height: 1.75rem; background: #ff4444; border-radius: 0.125rem; animation: pulse 1s infinite;" :style="'animation-delay: 0.4s'"></div>
            </div>
            <p style="color: #ff4444; font-weight: 600; font-family: 'Comic Sans MS', cursive, sans-serif;">Ich höre zu...</p>
          </div>
        </div>
      </div>

      <!-- AI Transcription - Paper style -->
      <div v-if="transcription" style="background: rgba(255,255,255,0.9); padding: 2rem; transform: rotate(0.5deg); box-shadow: 4px 4px 0px rgba(0,0,0,0.1); position: relative; backdrop-filter: blur(3px); border: 2px solid #BECDA3; margin-bottom: 2rem;">
        <!-- Torn corner -->
        <div style="position: absolute; top: 0; right: 0; width: 20px; height: 20px; background: #f5f5f5; clip-path: polygon(100% 0, 0 100%, 100% 100%);"></div>
        
        <div style="display: flex; align-items: flex-start; gap: 1rem;">
          <div style="width: 2.5rem; height: 2.5rem; background: #5F6F55; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; box-shadow: 2px 2px 0px rgba(0,0,0,0.15);">
            <svg style="width: 1.5rem; height: 1.5rem; color: white;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
            </svg>
          </div>
          <div style="flex: 1;">
            <h3 style="font-weight: 600; color: #474747; margin: 0 0 0.5rem 0; font-family: 'Comic Sans MS', cursive, sans-serif;">KI hat verstanden:</h3>
            <p style="color: #474747; background: rgba(255,255,255,0.8); padding: 0.75rem; border: 1px solid #BECDA3; font-family: 'Comic Sans MS', cursive, sans-serif; line-height: 1.5;">
              "{{ transcription }}"
            </p>
          </div>
        </div>
      </div>

      <!-- Task Details Form - Paper style -->
      <div style="background: rgba(255,255,255,0.9); padding: 2rem; transform: rotate(-0.5deg); box-shadow: 6px 6px 0px rgba(0,0,0,0.15); position: relative; backdrop-filter: blur(3px); border: 1px solid rgba(71,71,71,0.1); margin-bottom: 2rem;">
        <!-- Torn corner -->
        <div style="position: absolute; top: 0; right: 0; width: 25px; height: 25px; background: #f5f5f5; clip-path: polygon(100% 0, 0 100%, 100% 100%);"></div>
        
        <h3 style="font-size: 1.5rem; font-weight: 700; color: #474747; margin: 0 0 1.5rem 0; font-family: 'Comic Sans MS', cursive, sans-serif;">Details anpassen</h3>
        
        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        
          <!-- Task Type -->
          <div>
            <label style="display: block; font-size: 0.9rem; font-weight: 600; color: #474747; margin-bottom: 0.75rem; font-family: 'Comic Sans MS', cursive, sans-serif;">Art der Hilfe:</label>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;">
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

          <!-- When -->
          <div>
            <label style="display: block; font-size: 0.9rem; font-weight: 600; color: #474747; margin-bottom: 0.75rem; font-family: 'Comic Sans MS', cursive, sans-serif;">Wann benötigt:</label>
            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
              <button 
                v-for="time in timeOptions" 
                :key="time"
                @click="selectedTime = time"
                :style="'padding: 0.5rem 1rem; border: 1px solid ' + (selectedTime === time ? '#474747' : '#BECDA3') + '; background: ' + (selectedTime === time ? '#474747' : 'rgba(255,255,255,0.8)') + '; color: ' + (selectedTime === time ? 'white' : '#474747') + '; cursor: pointer; transition: all 0.3s; font-family: Comic Sans MS, cursive, sans-serif; font-size: 0.9rem; box-shadow: 1px 1px 0px rgba(0,0,0,0.1);'"
                onmouseover="if (this.dataset.notSelected !== 'false') { this.style.borderColor='#5F6F55'; }"
                onmouseout="if (this.dataset.notSelected !== 'false') { this.style.borderColor='#BECDA3'; }"
                :data-not-selected="selectedTime !== time"
              >
                {{ time }}
              </button>
            </div>
          </div>

          <!-- Location -->
          <div>
            <label style="display: block; font-size: 0.9rem; font-weight: 600; color: #474747; margin-bottom: 0.75rem; font-family: 'Comic Sans MS', cursive, sans-serif;">Ort:</label>
            <div style="background: rgba(190,205,163,0.2); padding: 1rem; border: 1px solid #BECDA3; box-shadow: 2px 2px 0px rgba(0,0,0,0.1);">
              <div style="display: flex; align-items: center; gap: 0.75rem;">
                <svg style="width: 1.25rem; height: 1.25rem; color: #474747;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <span style="color: #474747; font-weight: 500; font-family: 'Comic Sans MS', cursive, sans-serif;">Musterstraße 123, 12345 Musterstadt</span>
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
        </div>
      </div>

      <!-- Search Helpers Button - Paper style -->
      <button 
        @click="searchHelpers"
        :disabled="!canSearch"
        :style="'width: 100%; padding: 2rem 1.5rem; border: none; cursor: ' + (canSearch ? 'pointer' : 'not-allowed') + '; font-weight: 700; font-size: 1.25rem; transition: all 0.3s; transform: rotate(-0.5deg); box-shadow: 6px 6px 0px rgba(0,0,0,0.2); background: ' + (canSearch ? '#5F6F55' : '#8F8B82') + '; color: white; font-family: Comic Sans MS, cursive, sans-serif; text-shadow: 1px 1px 2px rgba(0,0,0,0.3);'"
        onmouseover="if (this.dataset.canSearch === 'true') { this.style.transform='rotate(-0.5deg) translateY(-4px)'; this.style.boxShadow='8px 8px 0px rgba(0,0,0,0.25)'; }"
        onmouseout="if (this.dataset.canSearch === 'true') { this.style.transform='rotate(-0.5deg)'; this.style.boxShadow='6px 6px 0px rgba(0,0,0,0.2)'; }"
        :data-can-search="canSearch"
      >
        <div style="display: flex; align-items: center; justify-content: center; gap: 0.75rem;">
          <svg style="width: 2rem; height: 2rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          <span>Helfer in der Nähe suchen</span>
        </div>
      </button>
    </div>

    <!-- Padding for content -->
    <div style="height: 2rem;"></div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: false
})

const isRecording = ref(false)
const transcription = ref('')
const selectedTaskType = ref('shopping')
const selectedTime = ref('Heute')
const selectedBudget = ref(15)
const showCustomBudget = ref(false)

const taskTypes = ref([
  { id: 'shopping', name: 'Einkaufen', icon: '/icons/einkaufenMadl.svg' },
  { id: 'cooking', name: 'Kochen', icon: '/icons/kochen.svg' },
  { id: 'cleaning', name: 'Reinigen', icon: '/icons/staubsaugen.svg' },
  { id: 'gardening', name: 'Garten', icon: '/icons/gießenBub.svg' },
  { id: 'tech_help', name: 'Technik', icon: '/icons/technikBanalcieren.svg' },
  { id: 'dog_walking', name: 'Gassi gehen', icon: '/icons/FrontalGassiJunge.svg' }
])

const timeOptions = ref(['Heute', 'Morgen', 'Diese Woche', 'Nächste Woche'])
const budgetOptions = ref([10, 15, 20, 25, 30])

const canSearch = computed(() => {
  return selectedTaskType.value && selectedTime.value && selectedBudget.value
})

const toggleRecording = async () => {
  isRecording.value = !isRecording.value
  
  if (isRecording.value) {
    // Start recording logic
    console.log('Starting voice recording...')
    
    // Simulate transcription after 3 seconds
    setTimeout(() => {
      if (isRecording.value) {
        transcription.value = "Ich brauche Hilfe beim Einkaufen. Bitte Milch, Brot und Äpfel vom Supermarkt. Heute Nachmittag wäre gut."
        isRecording.value = false
      }
    }, 3000)
  } else {
    // Stop recording logic
    console.log('Stopping voice recording...')
  }
}

const goBack = () => {
  navigateTo('/pwa/seeker/dashboard')
}

const searchHelpers = () => {
  if (canSearch.value) {
    // Create task object
    const task = {
      type: selectedTaskType.value,
      description: transcription.value || 'Neue Aufgabe',
      time: selectedTime.value,
      budget: selectedBudget.value
    }
    
    console.log('Searching helpers for task:', task)
    navigateTo('/pwa/seeker/task-match')
  }
}
</script>