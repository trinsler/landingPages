<template>
  <div style="background: linear-gradient(135deg, #5F6F55, #4a5c44); border-radius: 16px; padding: 2rem; margin-bottom: 1.5rem; text-align: center; color: white; box-shadow: 0 4px 12px rgba(95, 111, 85, 0.3);">
    <!-- Tier Icon -->
    <div style="width: 5rem; height: 5rem; background: rgba(255,255,255,0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem auto;">
      <div v-if="userTier.level === 'PLATINUM'" style="width: 3rem; height: 3rem;">
        <svg style="width: 100%; height: 100%; color: white;" fill="currentColor" viewBox="0 0 24 24">
          <path d="M3 3h18v18H3V3zm16.5 6.5L12 16.5l-7.5-7zm0 2.12l6.38 6.38L6.12 10.26l6.38 6.38z"/>
        </svg>
      </div>
      <div v-else-if="userTier.level === 'GOLD'" style="width: 3rem; height: 3rem;">
        <svg style="width: 100%; height: 100%; color: white;" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 2.5L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      </div>
      <div v-else-if="userTier.level === 'SILVER'" style="width: 3rem; height: 3rem;">
        <svg style="width: 100%; height: 100%; color: white;" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm-1 14H5V6h14v12z"/>
        </svg>
      </div>
      <div v-else style="width: 3rem; height: 3rem;">
        <svg style="width: 100%; height: 100%; color: white;" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"/>
        </svg>
      </div>
    </div>
    <h2 style="margin: 0 0 0.5rem 0; font-size: 1.5rem; font-weight: 700;">{{ getTierDisplayName(userTier.level) }}</h2>
    <p style="margin: 0 0 1.5rem 0; font-size: 1rem; opacity: 0.9;">{{ userTier.description }}</p>
    
    <!-- Progress to Next Tier -->
    <div style="background: rgba(255,255,255,0.2); border-radius: 8px; height: 8px; margin-bottom: 0.5rem;">
      <div :style="{
          background: 'white',
          height: '100%',
          borderRadius: '8px',
          width: progressPercentage + '%',
          transition: 'width 0.5s ease'
        }"></div>
    </div>
    <p style="font-size: 0.875rem; opacity: 0.9;">Noch {{ pointsToNextTier }} Punkte bis {{ getTierDisplayName(nextTier.level) }}</p>
  </div>
</template>

<script setup>
defineProps({
  userTier: {
    type: Object,
    required: true
  },
  nextTier: {
    type: Object,
    required: true
  },
  progressPercentage: {
    type: Number,
    required: true
  },
  pointsToNextTier: {
    type: Number,
    required: true
  }
})

const getTierDisplayName = (level) => {
  const tierNames = {
    'BRONZE': 'Bronze',
    'SILVER': 'Silber', 
    'GOLD': 'Gold',
    'PLATINUM': 'Platin'
  }
  return tierNames[level] || level
}
</script>