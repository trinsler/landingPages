<template>
  <div style="background: white; border-radius: 16px; padding: 1.5rem; margin-bottom: 1.5rem; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem;">
      <h3 style="font-size: 1.25rem; font-weight: 600; color: #474747; margin: 0;">Aktive Aufträge</h3>
      <span style="background: #5F6F55; color: white; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.875rem; font-weight: 600;">{{ activeTasks.length }}</span>
    </div>
    
    <div v-if="activeTasks.length > 0" style="display: flex; flex-direction: column; gap: 1rem;">
      <div 
        v-for="task in activeTasks" 
        :key="task.id"
        @click="$emit('view-task', task.id)"
        style="display: flex; align-items: center; gap: 1rem; padding: 1rem; background: #f9fafb; border-radius: 12px; border: 1px solid #e5e7eb; cursor: pointer; transition: all 0.2s;"
        onmouseover="this.style.borderColor='#BECDA3'; this.style.transform='translateY(-1px)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.1)';"
        onmouseout="this.style.borderColor='#e5e7eb'; this.style.transform='translateY(0)'; this.style.boxShadow='none';"
      >
        <div style="width: 3rem; height: 3rem; background: #BECDA3; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
          <img :src="getTaskIcon(task.type)" :alt="task.type" style="width: 1.5rem; height: 1.5rem;">
        </div>
        <div style="flex: 1; min-width: 0;">
          <h4 style="font-weight: 600; color: #474747; margin: 0 0 0.25rem 0;">{{ task.title }}</h4>
          <p style="font-size: 0.875rem; color: #8F8B82; margin: 0;">{{ task.helper }} • {{ task.distance }}</p>
        </div>
        <div style="text-align: right;">
          <span style="background: #5F6F55; color: white; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.75rem; font-weight: 600; display: inline-block; margin-bottom: 0.25rem;">
            {{ task.status }}
          </span>
          <div style="font-size: 0.75rem; color: #8F8B82;">Details →</div>
        </div>
      </div>
    </div>
    
    <div v-else style="text-align: center; padding: 2rem;">
      <div style="width: 4rem; height: 4rem; background: #f3f4f6; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem auto;">
        <svg style="width: 2rem; height: 2rem; color: #8F8B82;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
        </svg>
      </div>
      <h4 style="font-weight: 600; color: #474747; margin: 0 0 0.5rem 0;">Keine aktiven Aufträge</h4>
      <p style="color: #8F8B82; margin: 0; font-size: 0.875rem;">Starten Sie Ihre erste Anfrage</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  activeTasks: {
    type: Array,
    default: () => []
  }
})

defineEmits(['view-task'])

const getTaskIcon = (type) => {
  const icons = {
    shopping: '/icons/einkaufenMadl.svg',
    cooking: '/icons/kochen.svg',
    cleaning: '/icons/staubsaugen.svg',
    gardening: '/icons/gießenBub.svg',
    tech_help: '/icons/technikBanalcieren.svg'
  }
  return icons[type] || '/icons/verschiedeneMenschen.svg'
}
</script>