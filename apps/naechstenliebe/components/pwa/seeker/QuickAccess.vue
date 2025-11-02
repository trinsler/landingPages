<template>
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem;">
    <button 
      @click="$emit('open-favorites')"
      style="background: white; padding: 1.5rem; border: none; cursor: pointer; border-radius: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); transition: all 0.2s;"
      onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 20px rgba(0,0,0,0.15)';"
      onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.1)';"
    >
      <div style="text-align: center;">
        <div style="width: 3rem; height: 3rem; background: #BECDA3; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem auto;">
          <svg style="width: 1.5rem; height: 1.5rem; color: #474747;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
          </svg>
        </div>
        <div>
          <h4 style="font-weight: 600; color: #474747; margin: 0 0 0.25rem 0;">Favoriten</h4>
          <p style="font-size: 0.875rem; color: #8F8B82; margin: 0;">{{ favoriteHelpers.length }} Helfer</p>
        </div>
      </div>
    </button>
    
    <button 
      @click="$emit('open-history')"
      style="background: white; padding: 1.5rem; border: none; cursor: pointer; border-radius: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); transition: all 0.2s;"
      onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 20px rgba(0,0,0,0.15)';"
      onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.1)';"
    >
      <div style="text-align: center;">
        <div style="width: 3rem; height: 3rem; background: #BECDA3; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem auto;">
          <svg style="width: 1.5rem; height: 1.5rem; color: #474747;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
        <div>
          <h4 style="font-weight: 600; color: #474747; margin: 0 0 0.25rem 0;">Verlauf</h4>
          <p style="font-size: 0.875rem; color: #8F8B82; margin: 0;">{{ completedTasks }} erledigt</p>
        </div>
      </div>
    </button>
  </div>
</template>

<script setup>
defineProps({
  favoriteHelpers: {
    type: Array,
    default: () => []
  },
  completedTasks: {
    type: Number,
    default: 0
  }
})

defineEmits(['open-favorites', 'open-history'])
</script>