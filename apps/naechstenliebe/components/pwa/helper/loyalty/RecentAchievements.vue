<template>
  <div style="background: white; border-radius: 16px; padding: 1.5rem; margin-bottom: 1.5rem; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
    <h3 style="font-size: 1.25rem; font-weight: 600; color: #474747; margin: 0 0 1rem 0;">Kürzliche Erfolge</h3>
    <div style="display: flex; flex-direction: column; gap: 0.75rem;">
      <div v-for="achievement in recentAchievements" :key="achievement.id" style="display: flex; align-items: center; gap: 0.75rem; padding: 1rem; background: #f8f9fa; border-radius: 12px; border: 1px solid #e9ecef;">
        <div style="width: 2.5rem; height: 2.5rem; background: #5F6F55; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
          <div v-html="achievement.icon" style="width: 1.25rem; height: 1.25rem; color: white;"></div>
        </div>
        <div style="flex: 1;">
          <h4 style="font-weight: 600; color: #474747; margin: 0 0 0.25rem 0;">{{ achievement.title }}</h4>
          <p style="font-size: 0.875rem; color: #8F8B82; margin: 0;">{{ achievement.description }}</p>
          <p style="font-size: 0.75rem; color: #6b7280; margin: 0.25rem 0 0 0;">{{ formatDate(achievement.date) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  recentAchievements: {
    type: Array,
    required: true
  }
})

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('de-DE', { 
    day: 'numeric', 
    month: 'long' 
  })
}
</script>