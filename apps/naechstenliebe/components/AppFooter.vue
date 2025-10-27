<template>
  <nav style="position: fixed; bottom: 0; left: 0; right: 0; background: white; border-top: 2px solid #BECDA3; box-shadow: 0 -4px 12px rgba(0,0,0,0.1); z-index: 50;">
    <div style="display: flex;">
      <button 
        v-for="(tab, index) in tabs" 
        :key="index"
        @click="$emit('navigate', tab.name)"
        :style="'flex: 1; padding: 1rem 0.5rem; text-align: center; border: none; background: none; cursor: pointer; color: ' + (activeTab === tab.name ? '#474747' : '#8F8B82') + '; border-top: ' + (activeTab === tab.name ? '3px solid #474747' : 'none') + ';'"
      >
        <div v-html="tab.icon" style="width: 1.5rem; height: 1.5rem; margin: 0 auto 0.25rem auto; display: block;"></div>
        <span style="font-size: 0.8rem; font-weight: 500;">{{ tab.label }}</span>
      </button>
    </div>
  </nav>
</template>

<script setup>
defineProps({
  activeTab: {
    type: String,
    required: true
  }
})

defineEmits(['navigate'])

const tabs = [
  {
    name: 'dashboard',
    label: 'Karte',
    icon: `<svg style="width: 1.5rem; height: 1.5rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/>
    </svg>`
  },
  {
    name: 'tasks',
    label: 'Aufträge',
    icon: `<svg style="width: 1.5rem; height: 1.5rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
    </svg>`
  },
  {
    name: 'earnings',
    label: 'Verdienste',
    icon: `<svg style="width: 1.5rem; height: 1.5rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
    </svg>`
  },
  {
    name: 'profile',
    label: 'Profil',
    icon: `<svg style="width: 1.5rem; height: 1.5rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
    </svg>`
  }
]
</script>

<style scoped>
svg {
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}
</style>