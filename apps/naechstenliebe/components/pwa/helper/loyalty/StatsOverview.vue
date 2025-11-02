<template>
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem;">
    <button 
      @click="$emit('show-details', 'points')"
      style="background: white; padding: 1.5rem; border-radius: 12px; text-align: center; box-shadow: 0 2px 8px rgba(0,0,0,0.1); border: none; cursor: pointer; transition: all 0.2s; display: flex; flex-direction: column; align-items: center; gap: 0.5rem;"
      onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 16px rgba(0,0,0,0.15)';"
      onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.1)';"
    >
      <div style="font-size: 2rem; font-weight: 700; color: #5F6F55; margin-bottom: 0.25rem;">{{ userStats.totalPoints }}</div>
      <div style="font-size: 0.875rem; color: #8F8B82; font-weight: 600;">Gesamtpunkte</div>
      <div style="font-size: 0.75rem; color: #6b7280; display: flex; align-items: center; gap: 0.25rem;">
        <svg style="width: 0.875rem; height: 0.875rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
        Details
      </div>
    </button>
    
    <button 
      @click="$emit('show-details', 'tasks')"
      style="background: white; padding: 1.5rem; border-radius: 12px; text-align: center; box-shadow: 0 2px 8px rgba(0,0,0,0.1); border: none; cursor: pointer; transition: all 0.2s; display: flex; flex-direction: column; align-items: center; gap: 0.5rem;"
      onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 16px rgba(0,0,0,0.15)';"
      onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.1)';"
    >
      <div style="font-size: 2rem; font-weight: 700; color: #5F6F55; margin-bottom: 0.25rem;">{{ userStats.completedTasks }}</div>
      <div style="font-size: 0.875rem; color: #8F8B82; font-weight: 600;">Abgeschlossene Aufträge</div>
      <div style="font-size: 0.75rem; color: #6b7280; display: flex; align-items: center; gap: 0.25rem;">
        <svg style="width: 0.875rem; height: 0.875rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
        Details
      </div>
    </button>
    
    <button 
      @click="$emit('show-details', 'streak')"
      style="background: white; padding: 1.5rem; border-radius: 12px; text-align: center; box-shadow: 0 2px 8px rgba(0,0,0,0.1); border: none; cursor: pointer; transition: all 0.2s; display: flex; flex-direction: column; align-items: center; gap: 0.5rem;"
      onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 16px rgba(0,0,0,0.15)';"
      onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.1)';"
    >
      <div style="font-size: 2rem; font-weight: 700; color: #5F6F55; margin-bottom: 0.25rem;">{{ userStats.currentStreak }}</div>
      <div style="font-size: 0.875rem; color: #8F8B82; font-weight: 600;">Aktuelle Serie</div>
      <div style="font-size: 0.75rem; color: #6b7280; display: flex; align-items: center; gap: 0.25rem;">
        <svg style="width: 0.875rem; height: 0.875rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
        Details
      </div>
    </button>
    
    <button 
      @click="$emit('show-details', 'rating')"
      style="background: white; padding: 1.5rem; border-radius: 12px; text-align: center; box-shadow: 0 2px 8px rgba(0,0,0,0.1); border: none; cursor: pointer; transition: all 0.2s; display: flex; flex-direction: column; align-items: center; gap: 0.5rem;"
      onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 16px rgba(0,0,0,0.15)';"
      onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.1)';"
    >
      <div style="font-size: 2rem; font-weight: 700; color: #5F6F55; margin-bottom: 0.25rem;">{{ userStats.avgRating }}</div>
      <div style="font-size: 0.875rem; color: #8F8B82; font-weight: 600;">Ø Bewertung</div>
      <div style="font-size: 0.75rem; color: #6b7280; display: flex; align-items: center; gap: 0.25rem;">
        <svg style="width: 0.875rem; height: 0.875rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
        Details
      </div>
    </button>
  </div>
</template>

<script setup>
defineProps({
  userStats: {
    type: Object,
    required: true
  }
})

defineEmits(['show-details'])
</script>