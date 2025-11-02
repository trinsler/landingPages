<template>
  <div v-if="show" style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); z-index: 9999; display: flex; align-items: center; justify-content: center; padding: 1rem;">
    <div style="background: white; border-radius: 20px; max-width: 500px; width: 100%; max-height: 90vh; overflow-y: auto; position: relative;">
      
      <!-- Close Button -->
      <button 
        @click="$emit('close')" 
        style="position: absolute; top: 1rem; right: 1rem; background: none; border: none; color: #8F8B82; cursor: pointer; padding: 0.5rem; z-index: 1;"
      >
        <svg style="width: 1.5rem; height: 1.5rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>

      <!-- Header -->
      <div style="padding: 2rem 1.5rem 1rem 1.5rem; text-align: center; border-bottom: 1px solid #f3f4f6;">
        <div style="width: 4rem; height: 4rem; background: #fef3c7; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem auto;">
          <svg style="width: 2rem; height: 2rem; color: #d97706;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"/>
          </svg>
        </div>
        <h2 style="font-size: 1.5rem; font-weight: 700; color: #474747; margin: 0 0 0.5rem 0;">Konfliktlösung & Support</h2>
        <p style="color: #8F8B82; margin: 0;">Wir helfen Ihnen bei Problemen mit Kunden oder Aufträgen</p>
      </div>

      <!-- Support Options -->
      <div style="padding: 1.5rem;">
        
        <!-- Emergency Contact -->
        <div style="background: #fef2f2; padding: 1.5rem; border-radius: 12px; border: 1px solid #fecaca; margin-bottom: 1.5rem;">
          <h3 style="font-size: 1.125rem; font-weight: 600; color: #991b1b; margin: 0 0 0.75rem 0; display: flex; align-items: center; gap: 0.5rem;">
            <svg style="width: 1.25rem; height: 1.25rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"/>
            </svg>
            Dringende Hilfe
          </h3>
          <p style="color: #991b1b; margin: 0 0 1rem 0; font-weight: 600;">Bei Gefahr oder Notfällen:</p>
          <button 
            @click="$emit('emergency-call')"
            style="width: 100%; background: #ef4444; color: white; padding: 1rem; border: none; cursor: pointer; font-size: 1rem; font-weight: 600; border-radius: 12px; display: flex; align-items: center; justify-content: center; gap: 0.75rem; transition: all 0.2s;"
            onmouseover="this.style.transform='translateY(-1px)'; this.style.boxShadow='0 4px 12px rgba(239, 68, 68, 0.3)';"
            onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none';"
          >
            <svg style="width: 1.25rem; height: 1.25rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
            </svg>
            Notfall-Team anrufen
          </button>
        </div>

        <!-- Conflict Types -->
        <div style="margin-bottom: 1.5rem;">
          <h3 style="font-size: 1rem; font-weight: 600; color: #474747; margin: 0 0 1rem 0;">Was ist das Problem?</h3>
          <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            <button 
              v-for="issue in supportIssues"
              :key="issue.id"
              @click="$emit('select-issue', issue)"
              :style="'background: ' + (selectedIssue?.id === issue.id ? '#f0fdf4' : '#f9fafb') + '; border: ' + (selectedIssue?.id === issue.id ? '2px solid #16a34a' : '1px solid #e5e7eb') + '; padding: 1rem; border-radius: 12px; cursor: pointer; transition: all 0.2s; text-align: left;'"
              onmouseover="this.style.background='#f3f4f6';"
              onmouseout="this.style.background='#f9fafb';"
            >
              <div style="display: flex; align-items: start; gap: 0.75rem;">
                <div style="width: 2rem; height: 2rem; background: #f3f4f6; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                  <div v-html="issue.icon" style="width: 1.25rem; height: 1.25rem; color: #6b7280;"></div>
                </div>
                <div style="flex: 1;">
                  <h4 style="font-weight: 600; color: #474747; margin: 0 0 0.25rem 0;">{{ issue.title }}</h4>
                  <p style="font-size: 0.875rem; color: #8F8B82; margin: 0;">{{ issue.description }}</p>
                </div>
              </div>
            </button>
          </div>
        </div>

        <!-- Description Field -->
        <div v-if="selectedIssue" style="margin-bottom: 1.5rem;">
          <label style="display: block; font-size: 0.875rem; font-weight: 600; color: #474747; margin-bottom: 0.5rem;">Beschreiben Sie das Problem:</label>
          <textarea 
            v-model="description"
            placeholder="Bitte beschreiben Sie das Problem so detailliert wie möglich..."
            rows="4"
            style="width: 100%; padding: 0.75rem; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 0.875rem; font-family: inherit; resize: vertical; transition: border-color 0.2s;"
            @focus="$event.target.style.borderColor='#ef4444'"
            @blur="$event.target.style.borderColor='#e5e7eb'"
          ></textarea>
        </div>

        <!-- Action Buttons -->
        <div style="display: flex; gap: 1rem;">
          <button 
            @click="$emit('close')"
            style="flex: 1; background: #f3f4f6; color: #474747; padding: 1rem; border: none; cursor: pointer; font-weight: 600; font-size: 0.875rem; border-radius: 8px; transition: all 0.2s;"
            onmouseover="this.style.background='#e5e7eb';"
            onmouseout="this.style.background='#f3f4f6';"
          >
            Abbrechen
          </button>
          <button 
            @click="submitSupport"
            :disabled="!selectedIssue || !description.trim()"
            style="flex: 2; background: #ef4444; color: white; padding: 1rem; border: none; cursor: pointer; font-weight: 600; font-size: 0.875rem; border-radius: 8px; transition: all 0.2s;"
            :style="selectedIssue && description.trim() ? '' : 'opacity: 0.5; cursor: not-allowed;'"
            onmouseover="selectedIssue && description.trim() ? 'this.style.background=\"#dc2626\"' : ''"
            onmouseout="selectedIssue && description.trim() ? 'this.style.background=\"#ef4444\"' : ''"
          >
            Hilfe anfordern
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  supportIssues: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['close', 'select-issue', 'emergency-call', 'submit-support'])

const selectedIssue = ref(null)
const description = ref('')

const selectIssue = (issue) => {
  selectedIssue.value = issue
  emit('select-issue', issue)
}

const submitSupport = () => {
  if (selectedIssue.value && description.value.trim()) {
    emit('submit-support', {
      issue: selectedIssue.value,
      description: description.value
    })
    description.value = ''
    selectedIssue.value = null
  }
}

const callEmergencySupport = () => {
  emit('emergency-call')
  // In a real app, this would make an actual phone call
  alert('Notfall-Team wird angerufen...')
}
</script>