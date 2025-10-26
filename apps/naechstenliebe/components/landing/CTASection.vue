<template>
  <section style="background: #474747; padding: 4rem 1.5rem 12rem 1.5rem; position: relative;">
    <!-- Kreide-Spuren im Hintergrund wie in Hero -->
    <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-image: repeating-linear-gradient(to bottom, transparent, transparent 3rem, rgba(255,255,255,0.03) 3rem, rgba(255,255,255,0.03) 3.1rem); opacity: 0.6;"></div>
    
    <div style="max-width: 72rem; margin: 0 auto; position: relative; z-index: 2; text-align: center;">
      <!-- Haupttitel als große Tafel-Notiz -->
      <div style="background: rgba(255,255,255,0.05); border: 2px solid rgba(255,255,255,0.1); padding: 4rem 5rem; display: inline-block; transform: rotate(-1deg); box-shadow: 0 10px 30px rgba(0,0,0,0.15); position: relative; margin-bottom: 4rem; backdrop-filter: blur(10px);">
        <!-- Abgerissenes Eck -->
        <div style="position: absolute; top: 0; right: 0; width: 40px; height: 40px; background: #474747; clip-path: polygon(100% 0, 0 100%, 100% 100%);"></div>
        
        <h2 style="font-size: 3.5rem; font-weight: 800; margin: 0; line-height: 1.1; color: white; font-family: 'Comic Sans MS', cursive, sans-serif; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">
          Gemeinsam mehr erreichen
        </h2>
      </div>
      
      
      

      <!-- CTA als große Tafel-Notiz -->
      <div style="background: rgba(255,255,255,0.05); border: 2px solid rgba(255,255,255,0.1); padding: 4rem; display: inline-block; transform: rotate(1deg); box-shadow: 0 10px 30px rgba(0,0,0,0.15); position: relative; margin-bottom: 3rem; backdrop-filter: blur(10px);">
        <!-- Abgerissenes Eck -->
        <div style="position: absolute; top: 0; right: 0; width: 35px; height: 35px; background: #474747; clip-path: polygon(100% 0, 0 100%, 100% 100%);"></div>
        
        <div style="display: flex; align-items: center; justify-content: center; gap: 2rem; margin-bottom: 2.5rem;">
          <img src="/icons/logo.svg" alt="Mein.Nachbar Logo" style="width: 100px; height: 100px;">
          <p style="font-size: 1.6rem; font-weight: 600; color: white; font-family: 'Comic Sans MS', cursive, sans-serif; text-shadow: 1px 1px 2px rgba(0,0,0,0.3);">Starte jetzt deine Reise!</p>
        
        </div>

        <!-- Subtitel als Tafel-Notiz -->
      <div style="background: #BECDA3; color: #474747; padding: 2.5rem 4rem; display: inline-block; transform: rotate(1deg); box-shadow: 0 10px 30px rgba(0,0,0,0.1); position: relative; margin-bottom: 5rem; max-width: 650px;">
        <div style="position: absolute; top: 0; right: 0; width: 30px; height: 30px; background: #474747; clip-path: polygon(100% 0, 0 100%, 100% 100%);"></div>
        
        <p style="font-size: 1.5rem; margin: 0; line-height: 1.6; font-weight: 500; font-family: 'Comic Sans MS', cursive, sans-serif;">
          Werde Teil der Mein.Nachbar Community und erlebe,
          wie einfach generationsübergreifende Nachbarschaftshilfe sein kann!
        </p>
      </div>
      
      
        <div style="display: flex; gap: 2rem; justify-content: center; flex-wrap: wrap;">
          <button style="background: #5F6F55; color: white; padding: 1.8rem 3.5rem; border-radius: 0.75rem; font-size: 1.3rem; font-weight: 600; border: none; cursor: pointer; box-shadow: 4px 4px 0px rgba(0,0,0,0.2); font-family: 'Comic Sans MS', cursive, sans-serif;">
            Jetzt kostenlos starten
          </button>
          <button style="background: transparent; color: #BECDA3; padding: 1.8rem 3.5rem; border-radius: 0.75rem; font-size: 1.3rem; font-weight: 600; border: 2px solid #BECDA3; cursor: pointer; font-family: 'Comic Sans MS', cursive, sans-serif;">
            Mehr erfahren
          </button>
        </div>
      </div>
      
      <!-- Preis-Info als große Tafel-Notiz -->
      <div style="background: #BECDA3; color: #474747; padding: 3rem 4rem; display: inline-block; transform: rotate(1deg); box-shadow: 0 10px 30px rgba(0,0,0,0.1); position: relative; margin-top: 3rem; max-width: 700px;">
        <div style="position: absolute; top: 0; right: 0; width: 30px; height: 30px; background: #474747; clip-path: polygon(100% 0, 0 100%, 100% 100%);"></div>
        
        <div style="text-align: center;">
          <h3 style="font-size: 2rem; font-weight: 700; margin-bottom: 1.5rem; font-family: 'Comic Sans MS', cursive, sans-serif;">Kein Abonnement!</h3>
          <p style="font-size: 1.3rem; margin: 0; line-height: 1.6; font-family: 'Comic Sans MS', cursive, sans-serif;">
            Du zahlst nur, was du auch wirklich nutzt. <br>
            <strong>1€ Servicegebühr pro Auftrag</strong> - keine versteckten Kosten!<br>
            <span style="font-size: 1.1rem; opacity: 0.8;">Kein Abo • Keine Verpflichtung • Jederzeit kündbar</span>
          </p>
        </div>
      </div>
      
      <!-- Kleine Tafel-Notiz mit Zusatzinfo -->
      <div style="background: rgba(255,255,255,0.05); border: 2px solid rgba(255,255,255,0.1); padding: 1.5rem 2.5rem; display: inline-block; transform: rotate(-1deg); box-shadow: 0 10px 30px rgba(0,0,0,0.15); position: relative; backdrop-filter: blur(10px); margin-top: 3rem;">
        <div style="position: absolute; top: 0; right: 0; width: 20px; height: 20px; background: #474747; clip-path: polygon(100% 0, 0 100%, 100% 100%);"></div>
        <div style="display: flex; align-items: center; gap: 1.5rem;">
          <img src="/icons/logo.svg" alt="Nächstenliebe Logo" style="width: 50px; height: 50px;">
          <p style="color: rgba(255,255,255,0.9); margin: 0; font-size: 1rem; font-weight: 500; font-family: 'Comic Sans MS', cursive, sans-serif;">
            Verfügbar für iOS & Android • Kostenloser Download • Jederzeit kündbar
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// CTA Section Component
</script>