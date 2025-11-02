<template>
  <div style="background: linear-gradient(135deg, #5F6F55, #4a5c44); border-radius: 16px; padding: 2rem; margin-bottom: 1.5rem; text-align: center; box-shadow: 0 4px 12px rgba(95, 111, 85, 0.3);">
    <h2 style="color: white; font-size: 1.25rem; font-weight: 600; margin: 0 0 0.5rem 0;">Verfügbares Guthaben</h2>
    <div style="font-size: 3rem; font-weight: 700; color: white; margin: 0 0 0.5rem 0;">{{ balance }}€</div>
    <p style="color: rgba(255,255,255,0.9); margin: 0; font-size: 0.875rem;">Bereit zur Auszahlung</p>
  </div>
</template>

<script setup>
defineProps({
  balance: {
    type: String,
    default: '47,50'
  }
})
</script>