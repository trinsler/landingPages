<template>
  <div style="background: white; border-radius: 12px; padding: 1.25rem; margin-bottom: 1rem; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
      <h3 style="color: #474747; font-size: 1rem; font-weight: 600; margin: 0;">Meine Fähigkeiten</h3>
      <button 
        @click="$emit('edit-skills')"
        style="background: #5F6F55; color: white; padding: 0.375rem 0.75rem; border-radius: 6px; border: none; font-weight: 500; cursor: pointer; font-size: 0.75rem; transition: all 0.2s;"
        onmouseover="this.style.background='#4a5c44';"
        onmouseout="this.style.background='#5F6F55';"
      >
        Bearbeiten
      </button>
    </div>
    
    <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
      <span 
        v-for="skill in skills" 
        :key="skill"
        style="background: #5F6F55; color: white; padding: 0.375rem 0.75rem; border-radius: 16px; font-size: 0.75rem; font-weight: 500;"
      >
        {{ skill }}
      </span>
      <button 
        @click="$emit('add-skill')"
        style="background: rgba(95, 111, 85, 0.1); color: #5F6F55; padding: 0.375rem 0.75rem; border-radius: 16px; border: 1px solid #5F6F55; font-size: 0.75rem; font-weight: 500; cursor: pointer; transition: all 0.2s;"
        onmouseover="this.style.background='#5F6F55'; this.style.color='white';"
        onmouseout="this.style.background='rgba(95, 111, 85, 0.1)'; this.style.color='#5F6F55';"
      >
        + Hinzufügen
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  skills: {
    type: Array,
    default: () => ['Einkaufen', 'Kochen', 'Technik-Hilfe']
  }
})

defineEmits(['edit-skills', 'add-skill'])
</script>