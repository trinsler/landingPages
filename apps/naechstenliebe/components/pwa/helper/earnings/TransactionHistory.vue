<template>
  <div style="background: white; border-radius: 16px; padding: 1.5rem; margin-bottom: 1.5rem; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
    <h3 style="color: #474747; font-size: 1.1rem; font-weight: 600; margin: 0 0 1rem 0;">Transaktionsverlauf</h3>
    
    <div v-for="period in transactionPeriods" :key="period.title" style="margin-bottom: 1.5rem;">
      <h4 style="color: #474747; font-size: 1rem; font-weight: 600; margin: 0 0 0.8rem 0; padding-left: 0.5rem;">{{ period.title }}</h4>
      
      <div v-for="transaction in period.transactions" :key="transaction.id" 
        :style="'border-left: 3px solid ' + transaction.borderColor + '; padding-left: 1rem; margin-bottom: 1rem;'">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.3rem;">
          <span style="color: #474747; font-weight: 600; font-size: 0.875rem;">{{ transaction.description }}</span>
          <span :style="'color: ' + transaction.color + '; font-weight: 700; font-size: 0.875rem;'">{{ transaction.amount }}</span>
        </div>
        <span style="color: #8F8B82; font-size: 0.75rem;">{{ transaction.time }} • {{ transaction.status }}</span>
      </div>
    </div>

    <button 
      @click="$emit('generate-pdf')"
      style="width: 100%; background: #5F6F55; color: white; padding: 1rem; border-radius: 12px; border: none; cursor: pointer; font-weight: 600; font-size: 0.875rem; box-sizing: border-box; transition: all 0.2s; display: flex; align-items: center; justify-content: center; gap: 0.5rem;"
      onmouseover="this.style.transform='translateY(-1px)'; this.style.boxShadow='0 4px 12px rgba(95, 111, 85, 0.3)';"
      onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none';"
    >
      <svg style="width: 1rem; height: 1rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
      </svg>
      Komplette Abrechnung als PDF herunterladen
    </button>
  </div>
</template>

<script setup>
defineProps({
  transactionPeriods: {
    type: Array,
    default: () => [
      {
        title: 'Heute',
        transactions: [
          {
            id: 1,
            description: 'Einkaufen • Martha K.',
            amount: '+15€',
            time: '15:30',
            status: 'Auftrag erledigt',
            color: '#27ae60',
            borderColor: '#BECDA3'
          }
        ]
      },
      {
        title: 'Diese Woche',
        transactions: [
          {
            id: 2,
            description: 'Auszahlung',
            amount: '-32,50€',
            time: 'Montag',
            status: 'Auf Bankkonto',
            color: '#e74c3c',
            borderColor: '#d1d5db'
          },
          {
            id: 3,
            description: 'Technik-Hilfe • Anna S.',
            amount: '+30€',
            time: 'Montag',
            status: 'Auftrag erledigt',
            color: '#27ae60',
            borderColor: '#BECDA3'
          }
        ]
      }
    ]
  }
})

defineEmits(['generate-pdf'])
</script>