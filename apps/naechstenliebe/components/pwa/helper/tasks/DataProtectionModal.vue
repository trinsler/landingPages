<template>
  <div v-if="show" style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); z-index: 9999; display: flex; align-items: center; justify-content: center; padding: 1rem;">
    <div style="background: white; border-radius: 20px; max-width: 600px; width: 100%; max-height: 90vh; overflow-y: auto; position: relative;">
      
      <!-- Close Button -->
      <button 
        @click="$emit('close')" 
        style="position: absolute; top: 1rem; right: 1rem; background: none; border: none; color: #8F8B82; cursor: pointer; padding: 0.5rem; z-index: 1;"
      >
        <svg style="width: 1.5rem; height: 1.5rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>

      <!-- Header -->
      <div style="padding: 2rem 1.5rem 1rem 1.5rem; text-align: center; border-bottom: 1px solid #f3f4f6;">
        <div style="width: 4rem; height: 4rem; background: #dbeafe; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem auto;">
          <svg style="width: 2rem; height: 2rem; color: #2563eb;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
          </svg>
        </div>
        <h2 style="font-size: 1.5rem; font-weight: 700; color: #474747; margin: 0 0 0.5rem 0;">Datenschutz & Sicherheit</h2>
        <p style="color: #8F8B82; margin: 0;">Ihre Privatsphäre ist uns wichtig</p>
      </div>

      <!-- Content -->
      <div style="padding: 1.5rem;">
        
        <!-- Data Protection Principles -->
        <div style="margin-bottom: 2rem;">
          <h3 style="font-size: 1.125rem; font-weight: 600; color: #474747; margin: 0 0 1rem 0;">Unsere Datenschutzprinzipien</h3>
          <div style="display: grid; gap: 1rem;">
            <div style="display: flex; align-items: start; gap: 0.75rem;">
              <div style="width: 2rem; height: 2rem; background: #dbeafe; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                <svg style="width: 1.25rem; height: 1.25rem; color: #2563eb;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
              </div>
              <div>
                <h4 style="font-weight: 600; color: #474747; margin: 0 0 0.25rem 0;">Verschlüsselung</h4>
                <p style="font-size: 0.875rem; color: #8F8B82; margin: 0;">Alle Ihre Daten werden Ende-zu-Ende verschlüsselt.</p>
              </div>
            </div>
            
            <div style="display: flex; align-items: start; gap: 0.75rem;">
              <div style="width: 2rem; height: 2rem; background: #dbeafe; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                <svg style="width: 1.25rem; height: 1.25rem; color: #2563eb;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                </svg>
              </div>
              <div>
                <h4 style="font-weight: 600; color: #474747; margin: 0 0 0.25rem 0;">Zugriffskontrolle</h4>
                <p style="font-size: 0.875rem; color: #8F8B82; margin: 0;">Nur autorisierte Personen können auf Ihre Daten zugreifen.</p>
              </div>
            </div>
            
            <div style="display: flex; align-items: start; gap: 0.75rem;">
              <div style="width: 2rem; height: 2rem; background: #dbeafe; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                <svg style="width: 1.25rem; height: 1.25rem; color: #2563eb;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                </svg>
              </div>
              <div>
                <h4 style="font-weight: 600; color: #474747; margin: 0 0 0.25rem 0;">Datensparsamkeit</h4>
                <p style="font-size: 0.875rem; color: #8F8B82; margin: 0;">Wir erheben nur die Daten, die wirklich notwendig sind.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Your Rights -->
        <div style="margin-bottom: 2rem;">
          <h3 style="font-size: 1.125rem; font-weight: 600; color: #474747; margin: 0 0 1rem 0;">Ihre Rechte</h3>
          <div style="background: #f8fafb; padding: 1rem; border-radius: 8px; border: 1px solid #e5e7eb;">
            <ul style="margin: 0; padding-left: 1.25rem; color: #474747; font-size: 0.875rem; line-height: 1.5;">
              <li style="margin-bottom: 0.5rem;">Auskunft über Ihre gespeicherten Daten</li>
              <li style="margin-bottom: 0.5rem;">Berichtigung unrichtiger Daten</li>
              <li style="margin-bottom: 0.5rem;">Löschung Ihrer Daten (Recht auf Vergessenwerden)</li>
              <li style="margin-bottom: 0.5rem;">Widerruf Ihrer Einwilligung</li>
              <li style="margin-bottom: 0.5rem;">Datenübertragbarkeit</li>
              <li>Beschwerde bei Aufsichtsbehörden</li>
            </ul>
          </div>
        </div>

        <!-- Contact for Data Issues -->
        <div style="background: #fef3c7; border: 1px solid #f59e0b; border-radius: 12px; padding: 1.25rem; margin-bottom: 1.5rem;">
          <h3 style="font-size: 1rem; font-weight: 600; color: #92400e; margin: 0 0 0.5rem 0; display: flex; align-items: center; gap: 0.5rem;">
            <svg style="width: 1.25rem; height: 1.25rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            Datenschutzbeauftragter
          </h3>
          <p style="color: #92400e; margin: 0 0 0.75rem 0; font-size: 0.875rem;">Bei Fragen zum Datenschutz:</p>
          <div style="display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.875rem; color: #92400e;">
            <p style="margin: 0;"><strong>E-Mail:</strong> datenschutz@naechstenliebe.de</p>
            <p style="margin: 0;"><strong>Hotline:</strong> +49 123 456 789</p>
          </div>
        </div>

        <!-- Important Information -->
        <div style="margin-bottom: 1.5rem;">
          <h3 style="font-size: 1rem; font-weight: 600; color: #474747; margin: 0 0 0.75rem 0;">Wichtige Informationen</h3>
          <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 1rem;">
            <p style="margin: 0; color: #166534; font-size: 0.875rem; line-height: 1.4;">
              <strong style="display: block; margin-bottom: 0.5rem;">💡 Tipp:</strong>
              Ihre Sicherheit ist uns wichtig. Teilen Sie niemals Passwörter oder sensible Informationen mit anderen. Melden Sie verdächtige Aktivitäten sofort unserem Support-Team.
            </p>
          </div>
        </div>

        <!-- Action Buttons -->
        <div style="display: flex; gap: 1rem;">
          <button 
            @click="$emit('close')"
            style="flex: 1; background: #f3f4f6; color: #474747; padding: 1rem; border: none; cursor: pointer; font-weight: 600; font-size: 0.875rem; border-radius: 8px; transition: all 0.2s;"
            onmouseover="this.style.background='#e5e7eb';"
            onmouseout="this.style.background='#f3f4f6';"
          >
            Schließen
          </button>
          <button 
            @click="downloadPrivacyPolicy"
            style="flex: 2; background: #6366f1; color: white; padding: 1rem; border: none; cursor: pointer; font-weight: 600; font-size: 0.875rem; border-radius: 8px; transition: all 0.2s;"
            onmouseover="this.style.background='#4f46e5';"
            onmouseout="this.style.background='#6366f1';"
          >
            Datenschutzerklärung herunterladen
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  show: {
    type: Boolean,
    default: false
  }
})

defineEmits(['close'])

const downloadPrivacyPolicy = () => {
  // In a real app, this would download the actual privacy policy PDF
  alert('Die Datenschutzerklärung wird heruntergeladen...')
}
</script>