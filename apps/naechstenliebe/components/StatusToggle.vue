<template>
  <button 
    @click="toggle"
    :style="'width: 2.5rem; height: 1.25rem; border-radius: 1rem; border: none; cursor: pointer; transition: all 0.3s; background: ' + (active ? '#5F6F55' : '#8F8B82') + '; color: white; font-weight: 500; box-shadow: 0 2px 6px rgba(0,0,0,0.1); position: relative;'"
    onmouseover="this.style.transform='scale(1.05)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.15)';"
    onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 2px 6px rgba(0,0,0,0.1)';"
  >
    <div :style="'position: absolute; top: 0.125rem; left: ' + (active ? '1.25rem' : '0.125rem') + '; width: 1rem; height: 1rem; border-radius: 50%; background: white; transition: all 0.3s; box-shadow: 0 1px 3px rgba(0,0,0,0.2);'"></div>
    <span style="font-size: 0.625rem; font-weight: 600;">
      {{ label }}
    </span>
  </button>
</template>

<script setup>
defineProps({
  active: {
    type: Boolean,
    required: true
  },
  label: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['toggle'])

const toggle = () => {
  emit('toggle')
}
</script>