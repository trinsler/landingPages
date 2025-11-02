<template>
  <div>
    <!-- Payment Breakdown (Prominent) -->
    <div style="background: #f0fdf4; border-radius: 12px; padding: 1rem; margin-bottom: 1.5rem; border: 1px solid #bbf7d0;">
      <h3 style="font-size: 0.875rem; font-weight: 600; color: #5F6F55; margin: 0 0 0.75rem 0;">Zahlungsdetails</h3>
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
        <span style="font-size: 0.875rem; color: #5F6F55; font-weight: 600;">Auftragswert</span>
        <span style="font-size: 0.875rem; color: #474747; font-weight: 500;">€{{ task.baseRate || (task.payment * 0.88).toFixed(2) }}</span>
      </div>
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
        <span style="font-size: 0.875rem; color: #5F6F55; font-weight: 600;">Gebühr (12%)</span>
        <span style="font-size: 0.875rem; color: #474747; font-weight: 500;">€{{ task.platformFee || (task.payment * 0.12).toFixed(2) }}</span>
      </div>
      <div style="height: 1px; background: #BECDA3; margin: 0.75rem 0;"></div>
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <span style="font-size: 1rem; color: #5F6F55; font-weight: 700;">Gesamt</span>
        <span style="font-size: 1rem; color: #5F6F55; font-weight: 700;">€{{ task.payment }}</span>
      </div>
    </div>

    <!-- Primary Action Buttons (Always Visible) -->
    <div v-if="task.status === 'active'" style="display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 1.5rem;">
      <button 
        @click="$emit('mark-completed', task.id)"
        style="width: 100%; background: #5F6F55; color: white; padding: 1rem; border: none; cursor: pointer; font-size: 1rem; font-weight: 600; border-radius: 12px; transition: all 0.2s; display: flex; align-items: center; justify-content: center; gap: 0.75rem;"
        onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 20px rgba(95, 111, 85, 0.4)';"
        onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none';"
      >
        <svg style="width: 1.25rem; height: 1.25rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
        </svg>
        Auftrag abschließen
      </button>
      <button 
        @click="$emit('contact-client', task)"
        style="width: 100%; background: white; color: #5F6F55; padding: 1rem; border: 2px solid #5F6F55; cursor: pointer; font-size: 1rem; font-weight: 600; border-radius: 12px; transition: all 0.2s; display: flex; align-items: center; justify-content: center; gap: 0.75rem;"
        onmouseover="this.style.background='#5F6F55'; this.style.color='white';"
        onmouseout="this.style.background='white'; this.style.color='#5F6F55';"
      >
        <svg style="width: 1.25rem; height: 1.25rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
        </svg>
        Kontaktieren
      </button>
    </div>

    <!-- Secondary Actions -->
    <div v-if="task.status === 'active'" style="display: flex; gap: 0.75rem;">
      <button 
        @click="$emit('show-cancel-confirm')"
        style="flex: 1; background: #fef2f2; color: #ef4444; padding: 0.75rem; border: 1px solid #fca5a5; cursor: pointer; font-size: 0.875rem; font-weight: 600; border-radius: 12px; transition: all 0.2s;"
        onmouseover="this.style.background='#fecaca';"
        onmouseout="this.style.background='#fef2f2';"
      >
        Auftrag absagen
      </button>
      <button 
        style="flex: 1; background: #f3f4f6; color: #474747; padding: 0.75rem; border: 1px solid #e5e7eb; cursor: pointer; font-size: 0.875rem; font-weight: 600; border-radius: 12px; transition: all 0.2s;"
        onmouseover="this.style.background='#e5e7eb';"
        onmouseout="this.style.background='#f3f4f6';"
      >
        Support kontaktieren
      </button>
    </div>

    <!-- Cancel Confirmation -->
    <div v-if="showCancelConfirm" style="margin-top: 1rem; padding: 1rem; background: #fef2f2; border-radius: 12px; border: 1px solid #fecaca;">
      <p style="color: #991b1b; margin: 0 0 1rem 0; font-weight: 600; font-size: 0.95rem;">Möchten Sie diesen Auftrag wirklich absagen?</p>
      <div style="display: flex; gap: 0.5rem;">
        <button 
          @click="$emit('confirm-cancel')"
          style="flex: 1; background: #ef4444; color: white; padding: 0.5rem; border: none; cursor: pointer; font-size: 0.875rem; font-weight: 600; border-radius: 8px;"
        >
          Ja, absagen
        </button>
        <button 
          @click="$emit('hide-cancel-confirm')"
          style="flex: 1; background: #f3f4f6; color: #474747; padding: 0.5rem; border: 1px solid #e5e7eb; cursor: pointer; font-size: 0.875rem; font-weight: 600; border-radius: 8px;"
        >
          Zurück
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
  },
  showCancelConfirm: {
    type: Boolean,
    default: false
  }
})

defineEmits(['mark-completed', 'contact-client', 'show-cancel-confirm', 'hide-cancel-confirm', 'confirm-cancel'])
</script>