<template>
  <div style="background: white; border-radius: 16px; padding: 1.5rem; margin-bottom: 1.5rem; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
    <div style="text-align: center; margin-bottom: 1rem;">
      <div style="width: 4rem; height: 4rem; background: #BECDA3; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem auto;">
        <img src="/icons/ZeitungJunge.svg" alt="Statistiken" style="width: 2rem; height: 2rem;">
      </div>
      <h2 style="color: #474747; font-size: 1.5rem; font-weight: 600; margin: 0 0 0.5rem 0;">Ihre Statistiken</h2>
      <p style="color: #8F8B82; margin: 0; font-size: 1rem;">Überblick über Ihre Aufträge</p>
    </div>
    
    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem; text-align: center;">
      <div style="background: rgba(190, 205, 163, 0.2); border-radius: 12px; padding: 1rem;">
        <div style="font-size: 1.75rem; font-weight: 600; color: #474747; margin-bottom: 0.3rem;">{{ stats.totalTasks }}</div>
        <div style="font-size: 0.875rem; color: #8F8B82;">Aufträge</div>
      </div>
      <div style="background: rgba(190, 205, 163, 0.2); border-radius: 12px; padding: 1rem;">
        <div style="font-size: 1.75rem; font-weight: 600; color: #474747; margin-bottom: 0.3rem;">{{ stats.rating }}</div>
        <div style="font-size: 0.875rem; color: #8F8B82;">Bewertung</div>
      </div>
      <div style="background: rgba(190, 205, 163, 0.2); border-radius: 12px; padding: 1rem;">
        <div style="font-size: 1.75rem; font-weight: 600; color: #474747; margin-bottom: 0.3rem;">{{ stats.favorites }}</div>
        <div style="font-size: 0.875rem; color: #8F8B82;">Favoriten</div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  stats: {
    type: Object,
    default: () => ({
      totalTasks: 47,
      rating: 4.9,
      favorites: 8
    })
  }
})
</script>