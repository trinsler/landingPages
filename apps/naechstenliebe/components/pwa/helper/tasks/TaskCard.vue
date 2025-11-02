<template>
  <div 
    @click="$emit('task-click', task)"
    style="background: #f9fafb; border-radius: 12px; padding: 1.5rem; border: 1px solid #e5e7eb; transition: all 0.2s; cursor: pointer;"
    onmouseover="this.style.borderColor='#BECDA3'; this.style.background='white';"
    onmouseout="this.style.borderColor='#e5e7eb'; this.style.background='#f9fafb';"
  >
    <div style="flex: 1; min-width: 0;">
      <!-- Header with Status and Title -->
      <div style="display: flex; align-items: start; justify-content: space-between; margin-bottom: 1rem;">
        <div style="flex: 1;">
          <h4 style="font-weight: 600; color: #474747; margin: 0 0 0.5rem 0; font-size: 1.125rem;">{{ task.title }}</h4>
          <p style="font-size: 0.95rem; color: #8F8B82; margin: 0; font-weight: 500;">{{ task.client }}</p>
        </div>
        <div style="text-align: right;">
          <div :style="'padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.75rem; font-weight: 600; background: ' + getTaskStatusColor(task.status) + '; color: white; margin-bottom: 0.5rem;'">
            {{ getTaskStatusText(task.status) }}
          </div>
          <div style="font-size: 1.25rem; font-weight: 700; color: #5F6F55;">
            {{ task.payment }}€
          </div>
        </div>
      </div>

      <!-- Location and Distance -->
      <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem; color: #8F8B8B;">
        <svg style="width: 1rem; height: 1rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 111.414 1.414l4.243 4.243c.78.78 1.802.78 2.427 0s1.647-.78 2.427-1.78l1.815-1.814a7.002 7.002 0 00-.165-1.853M19.428 11.565a7 7 0 00-4.427-4.426l-1.815 1.814a6.002 6.002 0 01-1.427 0L9.514 10.5a8.004 8.004 0 018.427 0z"/>
        </svg>
        <span style="font-size: 0.95rem;">{{ task.area }} • {{ task.distance || '0.3km' }}</span>
      </div>

      <!-- Payment Breakdown -->
      <div style="background: #f0fdf4; border-radius: 8px; padding: 0.75rem 1rem; margin-bottom: 1rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
          <span style="font-size: 0.85rem; color: #5F6F55; font-weight: 600;">Auftragswert</span>
          <span style="font-size: 0.85rem; color: #474747;">€{{ task.baseRate }}</span>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span style="font-size: 0.85rem; color: #5F6F55; font-weight: 600;">Gebühr (12%)</span>
          <span style="font-size: 0.85rem; color: #474747;">€{{ task.platformFee || (task.payment * 0.12).toFixed(2) }}</span>
        </div>
        <div style="height: 1px; background: #BECDA3; margin: 0.5rem 0;"></div>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span style="font-size: 0.9rem; color: #5F6F55; font-weight: 700;">Gesamt</span>
          <span style="font-size: 0.9rem; color: #5F6F55; font-weight: 700;">€{{ task.payment }}</span>
        </div>
      </div>

      <!-- Rating and Reviews -->
      <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
        <div style="display: flex; align-items: center; gap: 0.25rem;">
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
          <span style="font-size: 0.95rem; font-weight: 600; color: #474747;">{{ task.clientRating || 4.9 }}</span>
          <span style="font-size: 0.85rem; color: #8F8B82;">({{ task.clientReviews || 28 }} Bewertungen)</span>
        </div>

        <!-- Duration and Response Time -->
        <div style="display: flex; align-items: center; gap: 1rem; font-size: 0.85rem; color: #8F8B82;">
          <div style="display: flex; align-items: center; gap: 0.25rem;">
            <svg style="width: 1rem; height: 1rem; color: #10b981;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span>{{ task.estimatedDuration || '1.5 Stunden' }}</span>
          </div>
          <div style="display: flex; align-items: center; gap: 0.25rem;">
            <svg style="width: 1rem; height: 1rem; color: #3b82f6;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.003 9.003 0 01-12.735-8.5M3 12c0-4.418 4.03-8 9-8s9 3.582 9 8"/>
            </svg>
            <span>Antwort: {{ task.responseTime || '5 Min' }}</span>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div style="display: flex; gap: 0.75rem;">
        <button 
          @click.stop="$emit('contact-client', task)"
          style="flex: 1; background: #5F6F55; color: white; padding: 0.75rem 1rem; border: none; cursor: pointer; font-size: 0.875rem; font-weight: 600; border-radius: 8px; transition: all 0.2s; display: flex; align-items: center; justify-content: center; gap: 0.5rem;"
          onmouseover="this.style.transform='translateY(-1px)'; this.style.boxShadow='0 4px 12px rgba(95, 111, 85, 0.3)';"
          onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none';"
        >
          <svg style="width: 0.875rem; height: 0.875rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 00.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 00.949.68H19a2 2 0 002-2V7a2 2 0 00-2-2h-1M7 7H5a2 2 0 00-2 2v5.586a2 2 0 001.414 1.414l4-4"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0z"/>
          </svg>
          Kontaktieren
        </button>
        <button 
          @click.stop="$emit('show-details', task)"
          style="flex: 1; background: white; color: #5F6F55; padding: 0.75rem 1rem; border: 2px solid #5F6F55; cursor: pointer; font-size: 0.875rem; font-weight: 600; border-radius: 8px; transition: all 0.2s; display: flex; align-items: center; justify-content: center; gap: 0.5rem;"
          onmouseover="this.style.background='#5F6F55'; this.style.color='white';"
          onmouseout="this.style.background='white'; this.style.color='#5F6F55';"
        >
          <svg style="width: 0.875rem; height: 0.875rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
          </svg>
          Details
        </button>
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

defineEmits(['task-click', 'contact-client', 'show-details'])

const getTaskStatusColor = (status) => {
  const colors = {
    'completed': '#16a34a',
    'active': '#3b82f6', 
    'waiting': '#f59e0b',
    'cancelled': '#ef4444',
    'pending': '#6b7280'
  }
  return colors[status] || '#6b7280'
}

const getTaskStatusText = (status) => {
  const texts = {
    'completed': 'Abgeschlossen',
    'active': 'Aktiv',
    'waiting': 'Wartend',
    'cancelled': 'Storniert',
    'pending': 'Ausstehend'
  }
  return texts[status] || status
}
</script>