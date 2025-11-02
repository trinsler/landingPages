<template>
  <div style="background: white; border-radius: 16px; padding: 1.5rem; box-shadow: 0 4px 12px rgba(0,0,0,0.1); transition: all 0.2s;"
       onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 20px rgba(0,0,0,0.15)';"
       onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.1)';">
    <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
      <div style="width: 3.5rem; height: 3.5rem; background: #BECDA3; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
        <img :src="helper.avatar" :alt="helper.name" style="width: 1.75rem; height: 1.75rem;">
      </div>
      <div style="flex: 1; min-width: 0;">
        <h3 style="color: #474747; font-size: 1.125rem; font-weight: 600; margin: 0 0 0.25rem 0;">{{ helper.name }}</h3>
        <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
          <span style="color: #BECDA3; font-size: 0.875rem;">{{ helper.rating }}</span>
          <span style="color: #8F8B82; font-size: 0.75rem;">({{ helper.reviewCount }})</span>
        </div>
        <p style="color: #8F8B82; margin: 0; font-size: 0.875rem;">{{ helper.distance }} • {{ helper.specialties }}</p>
      </div>
      <button 
        @click="$emit('toggle-favorite', helper.id)"
        style="background: none; border: none; color: #ef4444; font-size: 1.5rem; cursor: pointer; flex-shrink: 0; transition: all 0.2s;"
        onmouseover="this.style.transform='scale(1.2)'"
        onmouseout="this.style.transform='scale(1)'"
      >♥</button>
    </div>

    <!-- Letzte Aufträge -->
    <div style="margin-bottom: 1rem;">
      <h4 style="color: #474747; font-size: 0.875rem; font-weight: 600; margin: 0 0 0.5rem 0;">Letzte Aufträge:</h4>
      <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
        <span 
          v-for="task in helper.recentTasks" 
          :key="task.id"
          style="background: #f9fafb; color: #474747; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.75rem; border: 1px solid #e5e7eb;"
        >
          {{ task.description }} ({{ task.price }}€)
        </span>
      </div>
    </div>

    <!-- Aktions-Buttons -->
    <div style="display: flex; gap: 0.75rem;">
      <button 
        @click="$emit('hire-directly', helper.id)"
        style="flex: 1; background: #5F6F55; color: white; padding: 0.75rem; border-radius: 12px; border: none; font-weight: 600; cursor: pointer; font-size: 0.875rem; transition: all 0.2s;"
        onmouseover="this.style.background='#4a5c44'"
        onmouseout="this.style.background='#5F6F55'"
      >
        Direkt beauftragen
      </button>
      <button 
        @click="$emit('open-chat', helper.id)"
        style="background: white; color: #474747; padding: 0.75rem; border-radius: 12px; border: 1px solid #e5e7eb; cursor: pointer; font-size: 0.875rem; min-width: 3rem; display: flex; align-items: center; justify-content: center; transition: all 0.2s;"
        onmouseover="this.style.borderColor='#BECDA3'"
        onmouseout="this.style.borderColor='#e5e7eb'"
      >
        <img src="/icons/JungeHaeltHandy.svg" alt="Chat" style="width: 1.2rem; height: 1.2rem;">
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  helper: {
    type: Object,
    required: true
  }
})

defineEmits(['toggle-favorite', 'hire-directly', 'open-chat'])
</script>