<template>
  <div style="padding: 1rem 1.5rem; background: white; border-bottom: 1px solid #e5e7eb;">
    <div style="display: flex; gap: 0.75rem;">
      <!-- Data Protection Button -->
      <button 
        @click="$emit('open-data-protection')"
        style="flex: 1; background: #6366f1; color: white; padding: 0.75rem 1rem; border: none; cursor: pointer; font-size: 0.875rem; font-weight: 600; border-radius: 12px; transition: all 0.2s; display: flex; align-items: center; justify-content: center; gap: 0.5rem; box-shadow: 0 2px 8px rgba(99, 102, 241, 0.2);"
        onmouseover="this.style.transform='translateY(-1px)'; this.style.boxShadow='0 4px 12px rgba(99, 102, 241, 0.3)';"
        onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 8px rgba(99, 102, 241, 0.2)';"
      >
        <svg style="width: 1rem; height: 1rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
        </svg>
        Datenschutz
      </button>
      
      <!-- Conflict Resolution Button -->
      <button 
        @click="$emit('open-conflict-resolution')"
        style="flex: 1; background: #ef4444; color: white; padding: 0.75rem 1rem; border: none; cursor: pointer; font-size: 0.875rem; font-weight: 600; border-radius: 12px; transition: all 0.2s; display: flex; align-items: center; justify-content: center; gap: 0.5rem; box-shadow: 0 2px 8px rgba(239, 68, 68, 0.2);"
        onmouseover="this.style.transform='translateY(-1px)'; this.style.boxShadow='0 4px 12px rgba(239, 68, 68, 0.3)';"
        onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 8px rgba(239, 68, 68, 0.2)';"
      >
        <svg style="width: 1rem; height: 1rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
        </svg>
        Konfliktlösung
      </button>
    </div>
  </div>
</template>

<script setup>
defineEmits(['open-data-protection', 'open-conflict-resolution'])
</script>