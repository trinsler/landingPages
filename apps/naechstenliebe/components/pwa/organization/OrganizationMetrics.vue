<template>
  <div style="background: white; border-radius: 16px; padding: 1.5rem; margin-bottom: 1.5rem; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem;">
      <h3 style="font-size: 1.25rem; font-weight: 600; color: #474747; margin: 0;">Monatsübersicht</h3>
      <button 
        @click="$emit('view-analytics')"
        style="background: #5F6F55; color: white; padding: 0.5rem 1rem; border-radius: 8px; border: none; font-weight: 600; cursor: pointer; font-size: 0.875rem; transition: all 0.2s;"
        onmouseover="this.style.background='#4a5c44'"
        onmouseout="this.style.background='#5F6F55'"
      >
        Detailansicht
      </button>
    </div>
    
    <!-- Impact Metrics -->
    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
      <div style="text-align: center; padding: 1rem; background: rgba(95, 111, 85, 0.1); border-radius: 12px;">
        <div style="font-size: 1.5rem; font-weight: 600; color: #474747; margin-bottom: 0.25rem;">{{ analyticsData.monthlyImpact?.helpedPeople || 0 }}</div>
        <div style="font-size: 0.75rem; color: #8F8B82;">Geholfen</div>
      </div>
      <div style="text-align: center; padding: 1rem; background: rgba(95, 111, 85, 0.1); border-radius: 12px;">
        <div style="font-size: 1.5rem; font-weight: 600; color: #474747; margin-bottom: 0.25rem;">{{ analyticsData.monthlyImpact?.completedTasks || 0 }}</div>
        <div style="font-size: 0.75rem; color: #8F8B82;">Aufträge</div>
      </div>
      <div style="text-align: center; padding: 1rem; background: rgba(95, 111, 85, 0.1); border-radius: 12px;">
        <div style="font-size: 1.5rem; font-weight: 600; color: #474747; margin-bottom: 0.25rem;">{{ analyticsData.monthlyImpact?.volunteerHours || 0 }}</div>
        <div style="font-size: 0.75rem; color: #8F8B82;">Stunden</div>
      </div>
    </div>

    <!-- User Satisfaction -->
    <div style="background: rgba(190, 205, 163, 0.2); border-radius: 12px; padding: 1rem; text-align: center;">
      <div style="margin-bottom: 0.5rem;">
        <span style="color: #BECDA3; font-size: 1.5rem;">★★★★★</span>
      </div>
      <div style="font-size: 1.25rem; font-weight: 600; color: #474747; margin-bottom: 0.25rem;">{{ analyticsData.userSatisfaction }}/5.0</div>
      <div style="font-size: 0.875rem; color: #8F8B82;">Kundenzufriedenheit</div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  analyticsData: {
    type: Object,
    required: true
  }
})

defineEmits(['view-analytics'])
</script>