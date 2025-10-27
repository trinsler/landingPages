<template>
  <header style="position: sticky; top: 0; z-index: 50; background: #474747; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
    <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem 1.5rem;">
      <div style="display: flex; align-items: center; gap: 0.75rem;">
        <img src="/icons/logo.svg" alt="Logo" style="width: 2rem; height: 2rem;">
        <h1 style="color: white; font-size: 1.25rem; font-weight: 600; margin: 0; text-shadow: 1px 1px 2px rgba(0,0,0,0.3);">{{ title }}</h1>
      </div>
      <div style="display: flex; align-items: center; gap: 0.75rem;">
        <!-- Auftrags Button -->
        <button 
          @click="$emit('openRequests')"
          style="background: #5F6F55; color: white; padding: 0.75rem 1.25rem; border-radius: 25px; border: none; cursor: pointer; box-shadow: 0 2px 8px rgba(0,0,0,0.2); transition: transform 0.2s; position: relative; display: flex; align-items: center; gap: 0.5rem; font-weight: 600; font-size: 0.875rem;"
          onmouseover="this.style.transform='scale(1.05)'"
          onmouseout="this.style.transform='scale(1)'"
        >
          <svg style="width: 1rem; height: 1rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
          </svg>
          Aufträge
          <span v-if="requestCount > 0" style="background: #e74c3c; color: white; min-width: 1.25rem; height: 1.25rem; border-radius: 12px; font-size: 0.7rem; font-weight: 600; display: flex; align-items: center; justify-content: center; padding: 0 0.3rem;">{{ requestCount }}</span>
        </button>
        <!-- Profile Button -->
        <button 
          @click="$emit('openProfile')"
          style="background: #BECDA3; color: #474747; padding: 0.75rem 1.25rem; border-radius: 25px; border: none; cursor: pointer; box-shadow: 0 2px 8px rgba(0,0,0,0.2); transition: transform 0.2s; display: flex; align-items: center; gap: 0.5rem; font-weight: 600; font-size: 0.875rem;"
          onmouseover="this.style.transform='scale(1.05)'"
          onmouseout="this.style.transform='scale(1)'"
        >
          <img src="/icons/verschiedeneMenschen.svg" alt="Profil" style="width: 1rem; height: 1rem;">
          Profil
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: 'Dashboard'
  },
  requestCount: {
    type: Number,
    default: 0
  }
})

defineEmits(['openRequests', 'openProfile'])
</script>