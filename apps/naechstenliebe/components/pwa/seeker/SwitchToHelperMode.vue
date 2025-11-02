<template>
  <div style="background: white; border-radius: 16px; padding: 1.5rem; box-shadow: 0 4px 12px rgba(0,0,0,0.1); text-align: center;">
    <div style="margin-bottom: 1rem;">
      <div style="width: 3rem; height: 3rem; background: #BECDA3; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto;">
        <img src="/icons/verschiedeneMenschen.svg" alt="Helfer werden" style="width: 1.5rem; height: 1.5rem;">
      </div>
    </div>
    <h3 style="color: #474747; font-size: 1.25rem; font-weight: 600; margin: 0 0 0.5rem 0;">Selbst als Helfer aktiv werden</h3>
    <p style="color: #8F8B82; margin: 0 0 1.5rem 0; font-size: 0.875rem;">Verdienen Sie Geld und helfen Sie Ihren Nachbarn</p>
    
    <button 
      @click="$emit('switch-to-helper')" 
      style="background: white; color: #5F6F55; padding: 1rem 2rem; border: 2px solid #BECDA3; border-radius: 12px; font-weight: 600; cursor: pointer; font-size: 0.875rem; transition: all 0.2s;"
      onmouseover="this.style.background='#BECDA3'; this.style.color='white';"
      onmouseout="this.style.background='white'; this.style.color='#5F6F55';"
    >
      Als Helfer registrieren
    </button>
  </div>
</template>

<script setup>
defineEmits(['switch-to-helper'])
</script>