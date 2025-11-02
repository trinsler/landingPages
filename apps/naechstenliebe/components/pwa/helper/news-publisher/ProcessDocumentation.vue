<template>
  <!-- Process Documentation -->
  <div style="background: white; border-radius: 16px; padding: 2rem; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
    <h2 style="margin: 0 0 1.5rem 0; font-size: 1.5rem; font-weight: 600; color: #474747;">Veröffentlichungsprozess</h2>
    
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <!-- Step 1 -->
      <div style="display: flex; gap: 1rem;">
        <div style="width: 2rem; height: 2rem; background: #5F6F55; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; flex-shrink: 0;">1</div>
        <div style="flex: 1;">
          <h3 style="margin: 0 0 0.5rem 0; font-size: 1.125rem; font-weight: 600; color: #474747;">Artikel erstellen</h3>
          <p style="margin: 0; color: #8F8B82; font-size: 0.875rem; line-height: 1.5;">Füllen Sie das Formular mit allen notwendigen Informationen aus. Achten Sie auf klare Struktur und verständliche Sprache.</p>
        </div>
      </div>

      <!-- Step 2 -->
      <div style="display: flex; gap: 1rem;">
        <div style="width: 2rem; height: 2rem; background: #5F6F55; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; flex-shrink: 0;">2</div>
        <div style="flex: 1;">
          <h3 style="margin: 0 0 0.5rem 0; font-size: 1.125rem; font-weight: 600; color: #474747;">Interne Prüfung</h3>
          <p style="margin: 0; color: #8F8B82; font-size: 0.875rem; line-height: 1.5;">Der Artikel wird vom Administrations-Team auf Inhalt, Qualität und Korrektheit geprüft.</p>
        </div>
      </div>

      <!-- Step 3 -->
      <div style="display: flex; gap: 1rem;">
        <div style="width: 2rem; height: 2rem; background: #5F6F55; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; flex-shrink: 0;">3</div>
        <div style="flex: 1;">
          <h3 style="margin: 0 0 0.5rem 0; font-size: 1.125rem; font-weight: 600; color: #474747;">Freigabe</h3>
          <p style="margin: 0; color: #8F8B82; font-size: 0.875rem; line-height: 1.5;">Nach erfolgreicher Prüfung wird der Artikel freigegeben und auf der News-Seite veröffentlicht.</p>
        </div>
      </div>

      <!-- Security Requirements -->
      <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 1rem; margin-top: 1rem;">
        <h4 style="margin: 0 0 0.75rem 0; font-size: 1rem; font-weight: 600; color: #5F6F55; display: flex; align-items: center; gap: 0.5rem;">
          <svg style="width: 1.25rem; height: 1.25rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
          </svg>
          Sicherheitsanforderungen
        </h4>
        <ul style="margin: 0; padding-left: 1.5rem; color: #5F6F55; font-size: 0.875rem; line-height: 1.5;">
          <li>Nur zertifizierte Administratoren können veröffentlichen</li>
          <li>Zwei-Faktor-Authentifizierung erforderlich</li>
          <li>Alle Änderungen werden protokolliert</li>
          <li>Regelmäßige Sicherheits-Audits</li>
        </ul>
      </div>
    </div>
  </div>
</template>