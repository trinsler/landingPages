<template>
  <div style="background: white; border-radius: 16px; padding: 1.5rem; margin-bottom: 1.5rem; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
    <h3 style="color: #474747; font-size: 1.1rem; font-weight: 600; margin: 0 0 1rem 0;">Ausstehende Zahlungen</h3>
    
    <div v-for="payment in payments" :key="payment.id" 
      :style="'border: ' + (payment.status === 'confirmed' ? '2px solid #BECDA3' : '1px solid #e5e7eb') + '; border-radius: 12px; padding: 1rem; margin-bottom: 1rem; background: ' + (payment.status === 'confirmed' ? 'rgba(190, 205, 163, 0.1)' : '#f9fafb') + ';'">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
        <span style="color: #474747; font-weight: 600; font-size: 0.875rem;">{{ payment.customer }}</span>
        <span style="color: #474747; font-weight: 700; font-size: 0.875rem;">{{ payment.amount }}€</span>
      </div>
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <span style="color: #8F8B82; font-size: 0.75rem;">{{ payment.time }}</span>
        <span :style="'background: ' + (payment.status === 'confirmed' ? '#27ae60' : '#f39c12') + '; color: white; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.7rem; font-weight: 600;'">
          {{ payment.status === 'confirmed' ? 'Bestätigt' : 'Wartet' }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  payments: {
    type: Array,
    default: () => [
      {
        id: 1,
        customer: 'Einkaufen für Martha K.',
        amount: '15',
        time: 'Heute, 15:30',
        status: 'confirmed'
      },
      {
        id: 2,
        customer: 'Kochen für Klaus B.',
        amount: '25',
        time: 'Gestern, 18:00',
        status: 'waiting'
      }
    ]
  }
})
</script>