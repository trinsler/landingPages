<template>
  <div style="background: white; border-radius: 16px; padding: 1.5rem; box-shadow: 0 4px 12px rgba(0,0,0,0.1); text-align: center; margin-bottom: 1.5rem;">
    <h3 style="color: #474747; font-size: 1.25rem; font-weight: 600; margin: 0 0 1rem 0;">Neue Helfer entdecken</h3>
    <p style="color: #8F8B82; margin: 0 0 1.5rem 0; font-size: 0.875rem;">Finden Sie weitere zuverlässige Helfer in Ihrer Nähe</p>
    
    <button 
      @click="$emit('search-helpers')" 
      style="background: #5F6F55; color: white; padding: 1rem 2rem; border-radius: 12px; border: none; font-weight: 600; cursor: pointer; font-size: 0.875rem; transition: all 0.2s;"
      onmouseover="this.style.background='#4a5c44'"
      onmouseout="this.style.background='#5F6F55'"
    >
      Helfer suchen
    </button>
  </div>
</template>

<script setup>
defineEmits(['search-helpers'])
</script>