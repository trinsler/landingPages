<template>
  <div style="background: rgba(255,255,255,0.05); border: 2px solid rgba(255,255,255,0.1); padding: 1.5rem; border-radius: 1rem; box-shadow: 0 10px 30px rgba(0,0,0,0.15); text-align: center; transition: box-shadow 0.2s; backdrop-filter: blur(10px);">
    <div style="width: 8rem; height: 8rem; margin: 0 auto 1rem;">
      <img :src="icon" :alt="title" style="width: 100%; height: 100%; object-fit: contain;">
    </div>
    <h3 style="font-size: 1.25rem; font-weight: 600; color: white; font-family: 'Comic Sans MS', cursive, sans-serif; text-shadow: 1px 1px 2px rgba(0,0,0,0.3);">{{ title }}</h3>
  </div>
</template>

<script setup>
defineProps({
  icon: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  }
})
</script>
