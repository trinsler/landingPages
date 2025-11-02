<template>
  <div style="background: white; border-radius: 16px; padding: 1.5rem; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
    <h3 style="font-size: 1.25rem; font-weight: 600; color: #474747; margin: 0 0 1rem 0;">Aktuelle Herausforderungen</h3>
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <div v-for="challenge in activeChallenges" :key="challenge.id" style="padding: 1rem; background: #f9fafb; border-radius: 12px; border: 1px solid #e5e7eb;">
        <div style="display: flex; align-items: start; gap: 1rem;">
          <div style="width: 2rem; height: 2rem; background: #f3f4f6; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
            <div v-html="challenge.icon" style="width: 1.25rem; height: 1.25rem; color: #6b7280;"></div>
          </div>
          <div style="flex: 1;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem;">
              <h4 style="font-weight: 600; color: #474747; margin: 0;">{{ challenge.title }}</h4>
              <div style="font-size: 0.875rem; font-weight: 600; color: #5F6F55;">+{{ challenge.points }} Punkte</div>
            </div>
            <p style="font-size: 0.875rem; color: #8F8B82; margin: 0 0 0.75rem 0;">{{ challenge.description }}</p>
            
            <!-- Progress -->
            <div style="margin-bottom: 0.5rem;">
              <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: #6b7280; margin-bottom: 0.25rem;">
                <span>Fortschritt</span>
                <span>{{ challenge.current }}/{{ challenge.target }}</span>
              </div>
              <div style="background: #e5e7eb; border-radius: 4px; height: 6px;">
                <div :style="{
                        background: '#5F6F55',
                        height: '100%',
                        borderRadius: '4px',
                        width: (challenge.current / challenge.target * 100) + '%',
                        transition: 'width 0.3s ease'
                      }"></div>
              </div>
            </div>
            
            <div style="font-size: 0.75rem; color: #8F8B82;">
              Noch {{ challenge.target - challenge.current }} bis zur Belohnung
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  activeChallenges: {
    type: Array,
    required: true
  }
})
</script>