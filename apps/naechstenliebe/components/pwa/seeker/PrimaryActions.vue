<template>
  <div style="margin-bottom: 1.5rem;">
    <button 
      @click="$emit('create-task')"
      style="width: 100%; background: #5F6F55; color: white; padding: 2rem; border: none; cursor: pointer; border-radius: 16px; box-shadow: 0 4px 12px rgba(95, 111, 85, 0.3); transition: all 0.2s;"
      onmouseover="this.style.background='#4a5c44'; this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 20px rgba(95, 111, 85, 0.4)';"
      onmouseout="this.style.background='#5F6F55'; this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 12px rgba(95, 111, 85, 0.3)';"
    >
      <div style="display: flex; flex-direction: column; align-items: center; gap: 1rem;">
        <div style="width: 4rem; height: 4rem; background: rgba(255,255,255,0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
          <img src="/icons/einkaufenMadl.svg" alt="Neue Hilfe" style="width: 2rem; height: 2rem; filter: brightness(0) invert(1);">
        </div>
        <span style="font-size: 1.25rem; font-weight: 600;">Neue Hilfe anfragen</span>
        <span style="font-size: 0.875rem; opacity: 0.9;">Einfach beschreiben, was Sie benötigen</span>
      </div>
    </button>
    
    <!-- Switch to Helper Mode Button -->
    <button 
      @click="$emit('switch-to-helper')"
      style="width: 100%; background: white; color: #5F6F55; padding: 1rem; border: 2px solid #BECDA3; cursor: pointer; border-radius: 12px; margin-top: 0.75rem; transition: all 0.2s; font-weight: 600;"
      onmouseover="this.style.background='#BECDA3'; this.style.color='white';"
      onmouseout="this.style.background='white'; this.style.color='#5F6F55';"
    >
      <div style="display: flex; align-items: center; justify-content: center; gap: 0.5rem;">
        <img src="/icons/verschiedeneMenschen.svg" alt="Helfer werden" style="width: 1.25rem; height: 1.25rem;">
        <span>Als Helfer aktiv werden</span>
      </div>
    </button>
  </div>
</template>

<script setup>
defineEmits(['create-task', 'switch-to-helper'])
</script>