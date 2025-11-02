<template>
  <div style="background: white; border-radius: 12px; padding: 1.5rem; margin-bottom: 1rem; box-shadow: 0 2px 8px rgba(0,0,0,0.1); text-align: center;">
    <div style="margin-bottom: 1.25rem;">
      <div style="width: 4rem; height: 4rem; background: #5F6F55; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto; position: relative;">
        <svg style="width: 2rem; height: 2rem; color: white;" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </svg>
        <button 
          @click="$emit('edit-profile')"
          style="position: absolute; bottom: 0; right: 0; background: #BECDA3; color: white; border: none; border-radius: 50%; width: 1.5rem; height: 1.5rem; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 4px rgba(0,0,0,0.15); transition: all 0.2s;"
          onmouseover="this.style.transform='scale(1.1)'; this.style.background='#5F6F55';"
          onmouseout="this.style.transform='scale(1)'; this.style.background='#BECDA3';"
        >
          <svg style="width: 0.75rem; height: 0.75rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
          </svg>
        </button>
      </div>
    </div>
    <h2 style="color: #474747; font-size: 1.25rem; font-weight: 600; margin: 0 0 0.5rem 0;">{{ userName }}</h2>
    <div style="display: flex; align-items: center; justify-content: center; gap: 0.5rem; margin-bottom: 0.25rem;">
      <span style="color: #f59e0b; font-size: 1rem;">{{ starRating }}</span>
      <span style="color: #474747; font-weight: 500; font-size: 0.875rem;">({{ rating }})</span>
    </div>
    <p style="color: #8F8B82; margin: 0; font-size: 0.75rem;">{{ userInfo }}</p>
  </div>
</template>

<script setup>
defineProps({
  userName: {
    type: String,
    default: 'Max Mustermann'
  },
  rating: {
    type: String,
    default: '4.9'
  },
  userInfo: {
    type: String,
    default: 'Schüler • 89 Aufträge erledigt'
  }
})

defineEmits(['edit-profile'])

const starRating = '★★★★★'
</script>