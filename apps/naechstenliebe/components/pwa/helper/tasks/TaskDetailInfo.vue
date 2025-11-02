<template>
  <div>
    <!-- Task Description -->
    <div style="margin-bottom: 1.5rem;">
      <h3 style="font-size: 1rem; font-weight: 600; color: #474747; margin: 0 0 0.75rem 0; display: flex; align-items: center; gap: 0.5rem;">
        <svg style="width: 1rem; height: 1rem; color: #5F6F55;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
        </svg>
        Aufgabenbeschreibung
      </h3>
      <div style="background: #f9fafb; padding: 1rem; border-radius: 12px; border: 1px solid #e5e7eb;">
        <p style="color: #474747; margin: 0; line-height: 1.6; font-size: 0.95rem;">{{ task.description }}</p>
      </div>
    </div>

    <!-- Special Instructions -->
    <div v-if="task.specialInstructions" style="margin-bottom: 1.5rem;">
      <h3 style="font-size: 1rem; font-weight: 600; color: #474747; margin: 0 0 0.75rem 0; display: flex; align-items: center; gap: 0.5rem;">
        <svg style="width: 1rem; height: 1rem; color: #5F6F55;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        Besondere Hinweise
      </h3>
      <div style="background: #fef3c7; padding: 1rem; border-radius: 12px; border: 1px solid #f59e0b;">
        <p style="color: #92400e; margin: 0; line-height: 1.6; font-size: 0.95rem;">{{ task.specialInstructions }}</p>
      </div>
    </div>

    <!-- Date & Time Info -->
    <div style="margin-bottom: 1.5rem;">
      <h3 style="font-size: 1rem; font-weight: 600; color: #474747; margin: 0 0 0.75rem 0; display: flex; align-items: center; gap: 0.5rem;">
        <svg style="width: 1rem; height: 1rem; color: #5F6F55;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
        </svg>
        Termin & Dauer
      </h3>
      <div style="background: #f9fafb; padding: 1rem; border-radius: 12px; border: 1px solid #e5e7eb;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <p style="font-weight: 600; color: #474747; margin: 0 0 0.25rem 0; font-size: 0.95rem;">{{ formatDate(task.date) }}</p>
            <p style="color: #8F8B82; margin: 0; font-size: 0.875rem;">{{ task.time }} • Geschätzte Dauer: {{ task.estimatedDuration || task.duration }}</p>
          </div>
          <div v-if="task.urgency === 'high'" style="padding: 0.25rem 0.5rem; background: #fef2f2; color: #ef4444; border-radius: 8px; font-size: 0.75rem; font-weight: 600; display: flex; align-items: center; gap: 0.25rem;">
            <svg style="width: 0.75rem; height: 0.75rem;" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
            </svg>
            Dringend
          </div>
        </div>
      </div>
    </div>

    <!-- Address & Contact Info -->
    <div style="margin-bottom: 1.5rem;">
      <h3 style="font-size: 1rem; font-weight: 600; color: #474747; margin: 0 0 0.75rem 0; display: flex; align-items: center; gap: 0.5rem;">
        <svg style="width: 1rem; height: 1rem; color: #5F6F55;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 111.414 1.414l4.243 4.243c.78.78 1.802.78 2.427 0s1.647-.78 2.427-1.78l1.815-1.814a7.002 7.002 0 00-.165-1.853M19.428 11.565a7 7 0 00-4.427-4.426l-1.815 1.814a6.002 6.002 0 01-1.427 0L9.514 10.5a8.004 8.004 0 018.427 0z"/>
        </svg>
        Adresse & Kontakt
      </h3>
      <div style="background: #f9fafb; padding: 1rem; border-radius: 12px; border: 1px solid #e5e7eb;">
        <p style="color: #474747; margin: 0 0 1rem 0; font-size: 0.95rem; font-weight: 500;">{{ task.address }}</p>
        <div style="display: flex; gap: 0.75rem;">
          <button 
            @click="$emit('contact-client', task)"
            style="flex: 1; background: #5F6F55; color: white; padding: 0.75rem; border: none; cursor: pointer; font-size: 0.875rem; font-weight: 600; border-radius: 8px; transition: all 0.2s; display: flex; align-items: center; justify-content: center; gap: 0.5rem;"
            onmouseover="this.style.transform='translateY(-1px)'; this.style.boxShadow='0 4px 12px rgba(95, 111, 85, 0.3)';"
            onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none';"
          >
            <svg style="width: 0.875rem; height: 0.875rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
            </svg>
            Anrufen
          </button>
          <button 
            style="flex: 1; background: white; color: #5F6F55; padding: 0.75rem; border: 1px solid #5F6F55; cursor: pointer; font-size: 0.875rem; font-weight: 600; border-radius: 8px; transition: all 0.2s; display: flex; align-items: center; justify-content: center; gap: 0.5rem;"
            onmouseover="this.style.background='#5F6F55'; this.style.color='white';"
            onmouseout="this.style.background='white'; this.style.color='#5F6F55';"
          >
            <svg style="width: 0.875rem; height: 0.875rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            Nachricht
          </button>
        </div>
      </div>
    </div>

    <!-- Status History -->
    <div style="margin-bottom: 1.5rem;">
      <h3 style="font-size: 1rem; font-weight: 600; color: #474747; margin: 0 0 0.75rem 0; display: flex; align-items: center; gap: 0.5rem;">
        <svg style="width: 1rem; height: 1rem; color: #5F6F55;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        Status-Verlauf
      </h3>
      <div style="background: #f9fafb; padding: 1rem; border-radius: 12px; border: 1px solid #e5e7eb;">
        <div style="display: flex; flex-direction: column; gap: 0.75rem;">
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <div style="width: 0.5rem; height: 0.5rem; background: #5F6F55; border-radius: 50%; flex-shrink: 0;"></div>
            <div style="flex: 1;">
              <p style="font-weight: 600; color: #474747; margin: 0; font-size: 0.875rem;">Auftrag angenommen</p>
              <p style="color: #8F8B82; margin: 0; font-size: 0.75rem;">{{ formatDateTime(task.acceptedAt) }}</p>
            </div>
          </div>
          <div v-if="task.completedAt" style="display: flex; align-items: center; gap: 0.75rem;">
            <div style="width: 0.5rem; height: 0.5rem; background: #10b981; border-radius: 50%; flex-shrink: 0;"></div>
            <div style="flex: 1;">
              <p style="font-weight: 600; color: #474747; margin: 0; font-size: 0.875rem;">Auftrag abgeschlossen</p>
              <p style="color: #8F8B82; margin: 0; font-size: 0.75rem;">{{ formatDateTime(task.completedAt) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  task: {
    type: Object,
    required: true
  }
})

defineEmits(['contact-client'])

const formatDate = (dateString) => {
  const date = new Date(dateString)
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  
  if (date.toDateString() === today.toDateString()) {
    return 'Heute'
  } else if (date.toDateString() === tomorrow.toDateString()) {
    return 'Morgen'
  } else {
    return date.toLocaleDateString('de-DE', { day: 'numeric', month: 'long' })
  }
}

const formatDateTime = (dateTimeString) => {
  if (!dateTimeString) return ''
  const date = new Date(dateTimeString)
  return date.toLocaleString('de-DE', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>