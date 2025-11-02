<template>
  <div style="background: white; border-radius: 16px; padding: 1.5rem; margin-bottom: 1.5rem; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
    <h3 style="color: #474747; font-size: 1.1rem; font-weight: 600; margin: 0 0 1rem 0;">Auszahlung</h3>
    
    <div style="background: rgba(95, 111, 85, 0.05); border-radius: 12px; padding: 1rem; margin-bottom: 1.5rem; text-align: center;">
      <p style="color: #474747; margin: 0 0 0.5rem 0; font-size: 0.875rem; font-weight: 600;">Mindestbetrag: 20€</p>
      <p style="color: #8F8B82; margin: 0; font-size: 0.75rem;">Auszahlung erfolgt innerhalb von 2-3 Werktagen</p>
    </div>

    <button 
      @click="$emit('request-payout')"
      style="width: 100%; background: #5F6F55; color: white; padding: 1.5rem; border-radius: 12px; border: none; font-weight: 600; font-size: 1rem; cursor: pointer; box-sizing: border-box; transition: all 0.2s;"
      onmouseover="this.style.transform='translateY(-1px)'; this.style.boxShadow='0 4px 12px rgba(95, 111, 85, 0.4)';"
      onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none';"
    >
      Auszahlung anfordern ({{ balance }}€)
    </button>
  </div>
</template>

<script setup>
defineProps({
  balance: {
    type: String,
    default: '47,50'
  }
})

defineEmits(['request-payout'])
</script>