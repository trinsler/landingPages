<template>
  <div style="background: white; border-radius: 12px; padding: 1.25rem; margin-bottom: 1rem; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
      <h3 style="color: #474747; font-size: 1rem; font-weight: 600; margin: 0;">Persönliche Daten</h3>
      <button 
        @click="$emit('edit-personal-data')"
        style="background: #5F6F55; color: white; padding: 0.375rem 0.75rem; border-radius: 6px; border: none; font-weight: 500; cursor: pointer; font-size: 0.75rem; transition: all 0.2s;"
        onmouseover="this.style.background='#4a5c44';"
        onmouseout="this.style.background='#5F6F55';"
      >
        Bearbeiten
      </button>
    </div>
    
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
      <div v-for="field in personalFields" :key="field.label">
        <label style="color: #8F8B82; font-size: 0.625rem; display: block; margin-bottom: 0.25rem;">{{ field.label }}</label>
        <p style="color: #474747; margin: 0; font-size: 0.75rem;">{{ field.value }}</p>
      </div>
    </div>
    
    <div style="margin-top: 1rem;">
      <label style="color: #8F8B82; font-size: 0.625rem; display: block; margin-bottom: 0.25rem;">Über mich</label>
      <p style="color: #474747; margin: 0; font-size: 0.75rem; line-height: 1.3;">
        {{ aboutText }}
      </p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  personalFields: {
    type: Array,
    default: () => [
      { label: 'E-Mail', value: 'max.mustermann@email.de' },
      { label: 'Telefon', value: '+49 123 456 789' },
      { label: 'Postleitzahl', value: '12345 Musterstadt' },
      { label: 'Mitglied seit', value: 'Januar 2024' }
    ]
  },
  aboutText: {
    type: String,
    default: 'Freundlicher Schüler, der gerne älteren Menschen hilft. Besonders gut in Technik-Fragen und beim Einkaufen.'
  }
})

defineEmits(['edit-personal-data'])
</script>