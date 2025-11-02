<template>
  <button 
    @click="$emit('load-more')"
    style="width: 100%; background: white; color: #474747; padding: 1rem; border-radius: 16px; border: 2px solid #e5e7eb; cursor: pointer; font-weight: 600; font-size: 1rem; margin-bottom: 1.5rem; transition: all 0.2s;"
    onmouseover="this.style.borderColor='#BECDA3'"
    onmouseout="this.style.borderColor='#e5e7eb'"
  >
    {{ buttonText }}
  </button>
</template>

<script setup>
defineProps({
  buttonText: {
    type: String,
    default: 'Weitere Aufträge laden'
  }
})

defineEmits(['load-more'])
</script>