<template>
  <!-- Emergency Alert -->
  <div style="background: linear-gradient(135deg, #dc2626, #b91c1c); border-radius: 16px; padding: 2rem; margin-bottom: 1.5rem; text-align: center; color: white; box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);">
    <div style="width: 4rem; height: 4rem; background: rgba(255,255,255,0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem auto;">
      <svg style="width: 2rem; height: 2rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"/>
      </svg>
    </div>
    <h2 style="margin: 0 0 1rem 0; font-size: 1.5rem; font-weight: 700;">Soforthilfe benötigt?</h2>
    <p style="margin: 0 0 1.5rem 0; font-size: 1rem; opacity: 0.9;">Bei Gefahr oder Notfällen sofort handeln</p>
    <button 
      @click="$emit('emergency-call')"
      style="background: white; color: #dc2626; padding: 1rem 2rem; border: none; cursor: pointer; font-size: 1.125rem; font-weight: 700; border-radius: 12px; display: inline-flex; align-items: center; gap: 0.75rem; transition: all 0.2s; box-shadow: 0 4px 12px rgba(0,0,0,0.15);"
      onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 20px rgba(0,0,0,0.25)';"
      onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.15)';"
    >
      <svg style="width: 1.25rem; height: 1.25rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
      </svg>
      Notfall-Hotline: +49 123 456789
    </button>
  </div>
</template>

<script setup>
defineEmits(['emergency-call'])
</script>