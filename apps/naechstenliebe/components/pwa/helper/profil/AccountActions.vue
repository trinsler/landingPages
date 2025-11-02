<template>
  <div style="display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1rem;">
    <button 
      v-for="action in accountActions"
      :key="action.id"
      @click="action.handler"
      :style="{
        width: '100%',
        background: action.color === 'red' ? 'white' : 'white',
        color: action.color === 'red' ? '#e74c3c' : '#474747',
        padding: '0.75rem',
        borderRadius: '8px',
        border: action.color === 'red' ? '1px solid #e74c3c' : '1px solid #e5e7eb',
        cursor: 'pointer',
        fontWeight: '500',
        fontSize: '0.75rem',
        transition: 'all 0.2s',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem'
      }"
      :onmouseover="`this.style.background='${action.color === 'red' ? '#fee2e2' : '#f8f9fa'}'`"
      :onmouseout="`this.style.background='white'`"
    >
      <div v-html="action.icon" style="width: 0.875rem; height: 0.875rem;"></div>
      {{ action.label }}
    </button>
  </div>
</template>

<script setup>
defineEmits(['open-tasks', 'open-support', 'delete-account'])

const accountActions = [
  {
    id: 'tasks',
    label: 'Meine Aufträge',
    color: 'default',
    icon: `<svg style="width: 100%; height: 100%;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
            </svg>`,
    handler: () => emit('open-tasks')
  },
  {
    id: 'support',
    label: 'Hilfe & Support',
    color: 'default',
    icon: `<svg style="width: 100%; height: 100%;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>`,
    handler: () => emit('open-support')
  },
  {
    id: 'delete',
    label: 'Account löschen',
    color: 'red',
    icon: `<svg style="width: 100%; height: 100%;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
            </svg>`,
    handler: () => emit('delete-account')
  }
]

const emit = defineEmits(['open-tasks', 'open-support', 'delete-account'])
</script>