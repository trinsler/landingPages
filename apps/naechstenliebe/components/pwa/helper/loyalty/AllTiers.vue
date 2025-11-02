<template>
  <div style="background: white; border-radius: 16px; padding: 1.5rem; margin-bottom: 1.5rem; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
    <h3 style="font-size: 1.25rem; font-weight: 600; color: #474747; margin: 0 0 1rem 0;">Alle Treuestufen</h3>
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <div v-for="tier in allTiers" :key="tier.level" :style="{
          padding: '1rem',
          borderRadius: '12px',
          border: '2px solid ' + (tier.level === userTier.level ? '#5F6F55' : '#e5e7eb'),
          background: tier.level === userTier.level ? '#f8f9fa' : '#ffffff'
        }">
        <div style="display: flex; align-items: center; gap: 1rem;">
          <div :style="{
                width: '3rem',
                height: '3rem',
                background: tier.level === userTier.level ? '#5F6F55' : '#e9ecef',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: tier.level === userTier.level ? 'white' : '#8F8B82',
                fontWeight: '700',
                fontSize: '1.25rem'
              }">
            <!-- Tier Icons -->
            <div v-if="tier.level === 'PLATINUM'" style="width: 2rem; height: 2rem;">
              <svg style="width: 100%; height: 100%;" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3c0-1.66 4-3 9-3s9 1.34 9 3zm0-14c0 1.11-.89 2-2 2h4c1.11 0 2-.89 2-2V2l1 1 1-1v2c0 1.11-.89 2-2 2z"/>
              </svg>
            </div>
            <div v-else-if="tier.level === 'GOLD'" style="width: 2rem; height: 2rem;">
              <svg style="width: 100%; height: 100%;" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 2.5L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <div v-else-if="tier.level === 'SILVER'" style="width: 2rem; height: 2rem;">
              <svg style="width: 100%; height: 100%;" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm-1 14H5V6h14v12z"/>
              </svg>
            </div>
            <div v-else style="width: 2rem; height: 2rem;">
              <svg style="width: 100%; height: 100%;" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"/>
              </svg>
            </div>
          </div>
          <div style="flex: 1;">
            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
              <h4 style="font-weight: 600; color: #474747; margin: 0;">{{ getTierDisplayName(tier.level) }}</h4>
              <div v-if="tier.level === userTier.level" style="padding: 0.25rem 0.5rem; background: #5F6F55; color: white; border-radius: 12px; font-size: 0.625rem; font-weight: 600;">AKTUELL</div>
            </div>
            <p style="font-size: 0.875rem; color: #8F8B82; margin: 0 0 0.5rem 0;">{{ tier.description }}</p>
            <div style="font-size: 0.75rem; color: #6b7280; font-weight: 600;">{{ tier.minPoints }}+ Punkte</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  userTier: {
    type: Object,
    required: true
  },
  allTiers: {
    type: Array,
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