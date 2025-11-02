<template>
  <div style="background: white; border-radius: 12px; padding: 1.25rem; margin-bottom: 1rem; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
    <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem;">
      <div style="width: 2rem; height: 2rem; background: #5F6F55; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
        <svg style="width: 1rem; height: 1rem; color: white;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
      </div>
      <div style="flex: 1; min-width: 0;">
        <h3 style="color: #474747; font-size: 1rem; font-weight: 600; margin: 0;">Profil verifiziert</h3>
        <p style="color: #8F8B82; margin: 0; font-size: 0.75rem;">Alle Dokumente bestätigt</p>
      </div>
    </div>
    
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; margin-bottom: 1rem;">
      <div v-for="item in verificationItems" :key="item.name" style="display: flex; align-items: center; gap: 0.5rem;">
        <svg style="width: 0.75rem; height: 0.75rem; color: #5F6F55;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
        </svg>
        <span style="color: #474747; font-size: 0.75rem;">{{ item.name }}</span>
      </div>
    </div>

    <!-- ID Guide -->
    <div style="background: #f8f9fa; border-radius: 8px; padding: 0.75rem; border: 1px solid #e5e7eb;">
      <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
        <svg style="width: 0.875rem; height: 0.875rem; color: #5F6F55;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <h4 style="color: #474747; font-size: 0.75rem; font-weight: 600; margin: 0;">Ausweis-Anleitung</h4>
      </div>
      
      <div style="font-size: 0.625rem; color: #8F8B82; line-height: 1.3;">
        <div v-for="instruction in idInstructions" :key="instruction.label" style="margin: 0 0 0.25rem 0;">
          <strong style="color: #474747;">{{ instruction.label }}:</strong> {{ instruction.text }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const verificationItems = [
  { name: 'Ausweis' },
  { name: 'Telefon' },
  { name: 'E-Mail' }
]

const idInstructions = [
  { label: 'Benötigt', text: 'Vorder- und Rückseite' },
  { label: 'Sichtbar', text: 'Name, Foto, Unterschrift' },
  { label: 'Geschwärzt', text: 'Ausweisnummer, Behördenkennzahl' }
]
</script>