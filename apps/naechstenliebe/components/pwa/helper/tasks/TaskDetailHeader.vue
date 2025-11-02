<template>
  <div style="padding: 1.5rem; border-bottom: 1px solid #e5e7eb; background: #fafafa; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; position: sticky; top: 0; z-index: 2;">
    <!-- Close Button -->
    <button 
      @click="$emit('close')" 
      style="position: absolute; top: 1rem; right: 1rem; background: #f9fafb; border: none; color: #8F8B82; cursor: pointer; padding: 0.5rem; border-radius: 8px; transition: all 0.2s; display: flex; align-items: center; justify-content: center; width: 2.5rem; height: 2.5rem;"
      onmouseover="this.style.background='#f3f4f6'; this.style.color='#5F6F55';"
      onmouseout="this.style.background='#f9fafb'; this.style.color='#8F8B82';"
    >
      <svg style="width: 1.25rem; height: 1.25rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
      </svg>
    </button>

    <!-- Mobile-First Header Layout -->
    <div style="padding-right: 3rem;">
      <!-- Task Title and Status -->
      <div style="display: flex; align-items: start; justify-content: space-between; margin-bottom: 1rem; gap: 1rem;">
        <div style="flex: 1; min-width: 0;">
          <h2 style="font-size: 1.125rem; font-weight: 600; color: #474747; margin: 0 0 0.5rem 0; line-height: 1.3;">{{ task.title }}</h2>
          <p style="font-size: 0.95rem; color: #8F8B82; margin: 0; font-weight: 500;">{{ task.client }}</p>
        </div>
        <div style="text-align: right; flex-shrink: 0;">
          <div :style="'padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.75rem; font-weight: 600; background: ' + getTaskStatusColor(task.status) + '; color: white; margin-bottom: 0.5rem; display: inline-block;'">
            {{ getTaskStatusText(task.status) }}
          </div>
          <div style="font-size: 1.25rem; font-weight: 700; color: #5F6F55;">
            {{ task.payment }}€
          </div>
        </div>
      </div>

      <!-- Location and Distance -->
      <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem; color: #8F8B8B;">
        <svg style="width: 1rem; height: 1rem; flex-shrink: 0;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 111.414 1.414l4.243 4.243c.78.78 1.802.78 2.427 0s1.647-.78 2.427-1.78l1.815-1.814a7.002 7.002 0 00-.165-1.853M19.428 11.565a7 7 0 00-4.427-4.426l-1.815 1.814a6.002 6.002 0 01-1.427 0L9.514 10.5a8.004 8.004 0 018.427 0z"/>
        </svg>
        <span style="font-size: 0.95rem;">{{ task.area }} • {{ task.distance || 'Entfernung unbekannt' }}</span>
      </div>

      <!-- Quick Stats (Rating, Duration, Response Time) -->
      <div style="display: flex; flex-wrap: wrap; gap: 1rem; font-size: 0.85rem; color: #8F8B82;">
        <div style="display: flex; align-items: center; gap: 0.25rem; flex-wrap: wrap;">
          <div style="display: flex; align-items: center;">
            <svg style="width: 1rem; height: 1rem; color: #f59e0b;" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-1.175 0l-2.8-2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.951-.69z"/>
            </svg>
            <svg style="width: 1rem; height: 1rem; color: #f59e0b;" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-1.175 0l-2.8-2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.951-.69z"/>
            </svg>
            <svg style="width: 1rem; height: 1rem; color: #f59e0b;" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-1.175 0l-2.8-2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.951-.69z"/>
            </svg>
            <svg style="width: 1rem; height: 1rem; color: #f59e0b;" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-1.175 0l-2.8-2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.951-.69z"/>
            </svg>
            <svg style="width: 1rem; height: 1rem; color: #f59e0b;" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-1.175 0l-2.8-2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.951-.69z"/>
            </svg>
            <svg style="width: 1rem; height: 1rem; color: #d1d5db;" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-1.175 0l-2.8-2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.951-.69z"/>
            </svg>
          </div>
          <span style="font-weight: 600; color: #474747;">{{ task.clientRating || 4.9 }}</span>
          <span>({{ task.clientReviews || 28 }})</span>
        </div>

        <div style="display: flex; align-items: center; gap: 0.25rem;">
          <svg style="width: 0.875rem; height: 0.875rem; flex-shrink: 0;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <span>{{ task.estimatedDuration || task.duration || 'Dauer unbekannt' }}</span>
        </div>

        <div style="display: flex; align-items: center; gap: 0.25rem;">
          <svg style="width: 0.875rem; height: 0.875rem; flex-shrink: 0;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <span>Antwort: {{ task.responseTime || '5 Min' }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  task: {
    type: Object,
    required: true
  }
})

defineEmits(['close'])

const getTaskStatusColor = (status) => {
  const colors = {
    active: '#5F6F55',
    completed: '#10b981',
    cancelled: '#ef4444'
  }
  return colors[status] || '#6b7280'
}

const getTaskStatusText = (status) => {
  const texts = {
    active: 'Aktiv',
    completed: 'Abgeschlossen',
    cancelled: 'Abgesagt'
  }
  return texts[status] || 'Unbekannt'
}
</script>