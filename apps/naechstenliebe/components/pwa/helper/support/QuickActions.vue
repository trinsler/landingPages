<template>
  <!-- Quick Actions -->
  <div style="background: white; border-radius: 16px; padding: 1.5rem; margin-bottom: 1.5rem; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
    <h3 style="font-size: 1.25rem; font-weight: 600; color: #474747; margin: 0 0 1rem 0;">Schnellhilfe</h3>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
      <button 
        @click="$emit('open-chat')"
        style="background: #f0fdf4; padding: 1rem; border: 2px solid #bbf7d0; border-radius: 12px; cursor: pointer; transition: all 0.2s; text-align: center;"
        onmouseover="this.style.background='#dcfce7';"
        onmouseout="this.style.background='#f0fdf4';"
      >
        <svg style="width: 2rem; height: 2rem; color: #16a34a; margin: 0 auto 0.5rem auto;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
        </svg>
        <div style="font-weight: 600; color: #16a34a; margin-bottom: 0.25rem;">Live Chat</div>
        <div style="font-size: 0.75rem; color: #6b7280;">Verfügbar: 8-20 Uhr</div>
      </button>
      
      <button 
        @click="$emit('send-email')"
        style="background: #fef3c7; padding: 1rem; border: 2px solid #fcd34d; border-radius: 12px; cursor: pointer; transition: all 0.2s; text-align: center;"
        onmouseover="this.style.background='#fde68a';"
        onmouseout="this.style.background='#fef3c7';"
      >
        <svg style="width: 2rem; height: 2rem; color: #d97706; margin: 0 auto 0.5rem auto;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
        </svg>
        <div style="font-weight: 600; color: #d97706; margin-bottom: 0.25rem;">E-Mail Support</div>
        <div style="font-size: 0.75rem; color: #6b7280;">Antwort: < 2 Stunden</div>
      </button>
    </div>
  </div>
</template>

<script setup>
defineEmits(['open-chat', 'send-email'])
</script>