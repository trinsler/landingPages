<template>
  <div style="background: white; border-radius: 12px; padding: 1.25rem; margin-bottom: 1rem; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
      <h3 style="color: #474747; font-size: 1rem; font-weight: 600; margin: 0;">Verfügbarkeitszeiten</h3>
      <button 
        @click="$emit('edit-availability')"
        style="background: #5F6F55; color: white; padding: 0.375rem 0.75rem; border-radius: 6px; border: none; font-weight: 500; cursor: pointer; font-size: 0.75rem; transition: all 0.2s;"
        onmouseover="this.style.background='#4a5c44';"
        onmouseout="this.style.background='#5F6F55';"
      >
        Anpassen
      </button>
    </div>
    
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem;">
      <div 
        v-for="day in availabilitySchedule" 
        :key="day.day"
        style="display: flex; justify-content: space-between; align-items: center; padding: 0.5rem; background: #f8f9fa; border-radius: 6px; border: 1px solid #e5e7eb;"
      >
        <span style="color: #474747; font-weight: 500; font-size: 0.75rem;">{{ day.day }}</span>
        <span style="color: #8F8B82; font-size: 0.75rem;">{{ day.hours }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const availabilitySchedule = [
  { day: 'Mo', hours: '16-20' },
  { day: 'Di', hours: '14-18' },
  { day: 'Mi', hours: '16-20' },
  { day: 'Do', hours: '15-19' },
  { day: 'Fr', hours: '16-20' },
  { day: 'Sa', hours: '10-18' },
  { day: 'So', hours: '12-16' }
]

defineEmits(['edit-availability'])
</script>