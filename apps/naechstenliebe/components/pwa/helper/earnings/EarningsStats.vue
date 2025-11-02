<template>
  <div style="background: white; border-radius: 16px; padding: 1.5rem; margin-bottom: 1.5rem; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
    <h3 style="color: #474747; font-size: 1.1rem; font-weight: 600; margin: 0 0 1rem 0;">Ihre Statistiken</h3>
    
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; text-align: center;">
      <div v-for="stat in stats" :key="stat.label" 
        style="background: rgba(95, 111, 85, 0.05); border: 1px solid #5F6F55; border-radius: 12px; padding: 1rem;">
        <div style="font-size: 1.5rem; font-weight: 700; color: #474747; margin-bottom: 0.25rem;">{{ stat.value }}</div>
        <div style="font-size: 0.75rem; color: #8F8B82;">{{ stat.label }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  stats: {
    type: Array,
    default: () => [
      { label: 'Gesamt verdient', value: '342€' },
      { label: 'Durchschnitt', value: '4.9' }
    ]
  }
})
</script>