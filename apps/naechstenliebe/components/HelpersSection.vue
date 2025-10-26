<template>
  <section id="fuer-helfende" style="background: #474747; padding: 4rem 1.5rem 12rem 1.5rem; position: relative;">
    <!-- Kreide-Spuren im Hintergrund wie in Hero -->
    <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-image: repeating-linear-gradient(to bottom, transparent, transparent 3rem, rgba(255,255,255,0.03) 3rem, rgba(255,255,255,0.03) 3.1rem); opacity: 0.6;"></div>
    
    <div style="max-width: 80rem; margin: 0 auto; position: relative; z-index: 2;">
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8rem; align-items: center;">
        <!-- Linke Seite - Tafel-Notizen mit Vorteilen -->
        <div>
          <!-- Haupttitel als Tafel-Notiz -->
          <div style="background: rgba(255,255,255,0.05); border: 2px solid rgba(255,255,255,0.1); padding: 3rem; transform: rotate(-1deg); box-shadow: 0 10px 30px rgba(0,0,0,0.15); position: relative; backdrop-filter: blur(10px); margin-bottom: 4rem;">
            <!-- Abgerissenes Eck -->
            <div style="position: absolute; top: 0; right: 0; width: 30px; height: 30px; background: #474747; clip-path: polygon(100% 0, 0 100%, 100% 100%);"></div>
            
            <h2 style="font-size: 2.5rem; font-weight: 700; margin: 0; line-height: 1.2; color: white; font-family: 'Comic Sans MS', cursive, sans-serif; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">
              Für Schüler & Studierende
            </h2>
          </div>
          
          <!-- Subtitel als kleinere Tafel-Notiz -->
          <div style="background: #BECDA3; color: #474747; padding: 2rem; transform: rotate(1deg); box-shadow: 0 10px 30px rgba(0,0,0,0.1); position: relative; margin-bottom: 4rem;">
            <div style="position: absolute; top: 0; right: 0; width: 25px; height: 25px; background: #474747; clip-path: polygon(100% 0, 0 100%, 100% 100%);"></div>
            
            <div style="display: flex; align-items: center; gap: 1.5rem;">
              <img src="/icons/logo.svg" alt="Mein.Nachbar Logo" style="width: 60px; height: 60px;">
              <p style="font-size: 1.3rem; margin: 0; line-height: 1.6; font-weight: 500; font-family: 'Comic Sans MS', cursive, sans-serif;">
                Verdien flexibel Geld und tu gleichzeitig Gutes!
              </p>
            </div>
          </div>

          <!-- Vorteile als Tafel-Notizen -->
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem; margin-bottom: 4rem;">
            <div style="background: rgba(255,255,255,0.05); border: 2px solid rgba(255,255,255,0.1); padding: 2rem; transform: rotate(-2deg); box-shadow: 0 10px 30px rgba(0,0,0,0.15); position: relative; backdrop-filter: blur(10px);">
              <div style="position: absolute; top: -15px; left: 50%; transform: translateX(-50%) rotate(-2deg); background: #5F6F55; color: white; padding: 0.5rem 1.5rem; font-size: 0.9rem; font-weight: 600; font-family: 'Comic Sans MS', cursive, sans-serif; box-shadow: 2px 2px 0px rgba(0,0,0,0.2);">
                Top!
              </div>
              <div style="text-align: center;">
                <div style="font-size: 2rem; font-weight: 700; color: #BECDA3; margin-bottom: 0.5rem; font-family: 'Comic Sans MS', cursive, sans-serif; text-shadow: 1px 1px 2px rgba(0,0,0,0.3);">5-10€</div>
                <p style="color: rgba(255,255,255,0.8); font-weight: 600; margin: 0; font-size: 0.9rem; font-family: 'Comic Sans MS', cursive, sans-serif;">+ 1€ Gebühr</p>
              </div>
            </div>
            
            <div style="background: rgba(255,255,255,0.05); border: 2px solid rgba(255,255,255,0.1); padding: 2rem; transform: rotate(1deg); box-shadow: 0 10px 30px rgba(0,0,0,0.15); position: relative; backdrop-filter: blur(10px);">
              <div style="text-align: center;">
                <div style="font-size: 2rem; font-weight: 700; color: #BECDA3; margin-bottom: 0.5rem; font-family: 'Comic Sans MS', cursive, sans-serif; text-shadow: 1px 1px 2px rgba(0,0,0,0.3);">100%</div>
                <p style="color: rgba(255,255,255,0.8); font-weight: 600; margin: 0; font-size: 0.9rem; font-family: 'Comic Sans MS', cursive, sans-serif;">Flexibilität</p>
              </div>
            </div>
            
            <div style="background: rgba(255,255,255,0.05); border: 2px solid rgba(255,255,255,0.1); padding: 2rem; transform: rotate(2deg); box-shadow: 0 10px 30px rgba(0,0,0,0.15); position: relative; backdrop-filter: blur(10px);">
              <div style="text-align: center;">
                <div style="font-size: 2rem; font-weight: 700; color: #BECDA3; margin-bottom: 0.5rem; font-family: 'Comic Sans MS', cursive, sans-serif; text-shadow: 1px 1px 2px rgba(0,0,0,0.3);">< 5min</div>
                <p style="color: rgba(255,255,255,0.8); font-weight: 600; margin: 0; font-size: 0.9rem; font-family: 'Comic Sans MS', cursive, sans-serif;">Entfernung</p>
              </div>
            </div>
            
            <div style="background: rgba(255,255,255,0.05); border: 2px solid rgba(255,255,255,0.1); padding: 2rem; transform: rotate(-1deg); box-shadow: 0 10px 30px rgba(0,0,0,0.15); position: relative; backdrop-filter: blur(10px);">
              <div style="position: absolute; top: -15px; right: 10px; background: #8FA66E; color: white; padding: 0.5rem 1.5rem; font-size: 0.9rem; font-weight: 600; font-family: 'Comic Sans MS', cursive, sans-serif; box-shadow: 2px 2px 0px rgba(0,0,0,0.2); transform: rotate(5deg);">
                Neu!
              </div>
              <div style="text-align: center;">
                <div style="font-size: 2rem; font-weight: 700; color: #BECDA3; margin-bottom: 0.5rem; font-family: 'Comic Sans MS', cursive, sans-serif; text-shadow: 1px 1px 2px rgba(0,0,0,0.3);">4.8★</div>
                <p style="color: rgba(255,255,255,0.8); font-weight: 600; margin: 0; font-size: 0.9rem; font-family: 'Comic Sans MS', cursive, sans-serif;">Bewertung</p>
              </div>
            </div>
          </div>

          <!-- CTA als Tafel-Notiz -->
          <div style="background: rgba(255,255,255,0.05); border: 2px solid rgba(255,255,255,0.1); padding: 2.5rem; transform: rotate(1deg); box-shadow: 0 10px 30px rgba(0,0,0,0.15); text-align: center; position: relative; backdrop-filter: blur(10px);">
            <!-- Abgerissenes Eck -->
            <div style="position: absolute; top: 0; right: 0; width: 25px; height: 25px; background: #474747; clip-path: polygon(100% 0, 0 100%, 100% 100%);"></div>
            
            <p style="font-size: 1.4rem; font-weight: 600; color: white; margin-bottom: 1.5rem; font-family: 'Comic Sans MS', cursive, sans-serif; text-shadow: 1px 1px 2px rgba(0,0,0,0.3);">Starte jetzt!</p>
            <button style="background: #5F6F55; color: white; padding: 1.2rem 2.5rem; border-radius: 0.5rem; font-size: 1.1rem; font-weight: 600; border: none; cursor: pointer; box-shadow: 3px 3px 0px rgba(0,0,0,0.2); font-family: 'Comic Sans MS', cursive, sans-serif;">
              Als Helfer registrieren
            </button>
            <p style="color: rgba(255,255,255,0.7); font-size: 0.85rem; margin-top: 1rem; font-family: 'Comic Sans MS', cursive, sans-serif;">Schüler & Studenten: Bis 520€/Jahr steuerfrei!</p>
            <p style="color: rgba(255,255,255,0.7); font-size: 0.85rem; margin-top: 0.5rem; font-family: 'Comic Sans MS', cursive, sans-serif;">Kein Abonnement • Jederzeit kündbar</p>
          </div>
        </div>

        <!-- Rechte Seite - Einkommens-Rechner als Tafel-Notiz -->
        <div style="position: relative;">
          <!-- Hauptcontainer als Tafel-Notiz -->
          <div style="background: rgba(255,255,255,0.05); border: 2px solid rgba(255,255,255,0.1); padding: 3rem; transform: rotate(2deg); box-shadow: 0 10px 30px rgba(0,0,0,0.15); position: relative; backdrop-filter: blur(10px);">
            <!-- Abgerissenes Eck -->
            <div style="position: absolute; top: 0; right: 0; width: 35px; height: 35px; background: #474747; clip-path: polygon(100% 0, 0 100%, 100% 100%);"></div>
            
            <!-- Bild wie handgemalte Zeichnung -->
            <div style="background: #BECDA3; padding: 2.5rem; transform: rotate(-3deg); margin-bottom: 3rem; box-shadow: 0 10px 30px rgba(0,0,0,0.1); position: relative;">
              <div style="position: absolute; top: -15px; left: 50%; transform: translateX(-50%); background: #8FA66E; color: white; padding: 0.5rem 1.5rem; font-size: 0.9rem; font-weight: 600; font-family: 'Comic Sans MS', cursive, sans-serif; box-shadow: 2px 2px 0px rgba(0,0,0,0.2);">
                Dein Job!
              </div>
              <img src="/icons/einkaufenFrontalBub.svg" alt="Helfen" style="width: 100%; height: 250px; object-fit: contain; filter: brightness(1.3) hue-rotate(120deg) saturate(1.5);">
            </div>
            
            <!-- Einkommens-Übersicht -->
            <div style="color: white;">
              <h3 style="font-size: 1.6rem; font-weight: 600; margin-bottom: 2rem; text-align: center; font-family: 'Comic Sans MS', cursive, sans-serif; text-shadow: 1px 1px 2px rgba(0,0,0,0.3);">Dein potenzielles Einkommen:</h3>
              <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem;">
                <div style="background: rgba(255,255,255,0.05); border: 2px solid rgba(255,255,255,0.1); padding: 2rem; transform: rotate(-1deg); box-shadow: 0 10px 30px rgba(0,0,0,0.15); text-align: center; backdrop-filter: blur(10px);">
                  <p style="color: rgba(255,255,255,0.8); font-size: 0.9rem; margin-bottom: 0.5rem; font-family: 'Comic Sans MS', cursive, sans-serif;">2x pro Woche</p>
                  <div style="display: flex; align-items: center; justify-content: center; gap: 0.5rem;">
                    <img src="/icons/bezahlen.svg" alt="Bezahlen" style="width: 24px; height: 24px; filter: brightness(1.5) hue-rotate(45deg) saturate(2);">
                    <p style="font-size: 1.5rem; font-weight: 700; color: #BECDA3; margin: 0; font-family: 'Comic Sans MS', cursive, sans-serif; text-shadow: 1px 1px 2px rgba(0,0,0,0.3);">~60€/Monat</p>
                    <p style="color: rgba(255,255,255,0.6); font-size: 0.8rem; margin-top: 0.5rem; font-family: 'Comic Sans MS', cursive, sans-serif;">(netto)</p>
                  </div>
                </div>
                <div style="background: rgba(255,255,255,0.05); border: 2px solid rgba(255,255,255,0.1); padding: 2rem; transform: rotate(1deg); box-shadow: 0 10px 30px rgba(0,0,0,0.15); text-align: center; backdrop-filter: blur(10px);">
                  <p style="color: rgba(255,255,255,0.8); font-size: 0.9rem; margin-bottom: 0.5rem; font-family: 'Comic Sans MS', cursive, sans-serif;">Täglich helfen</p>
                  <div style="display: flex; align-items: center; justify-content: center; gap: 0.5rem;">
                    <img src="/icons/bezahlen.svg" alt="Bezahlen" style="width: 24px; height: 24px; filter: brightness(1.5) hue-rotate(90deg) saturate(2);">
                    <p style="font-size: 1.5rem; font-weight: 700; color: #BECDA3; margin: 0; font-family: 'Comic Sans MS', cursive, sans-serif; text-shadow: 1px 1px 2px rgba(0,0,0,0.3);">~200€/Monat</p>
                    <p style="color: rgba(255,255,255,0.6); font-size: 0.8rem; margin-top: 0.5rem; font-family: 'Comic Sans MS', cursive, sans-serif;">(netto)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Zusätzlicher kleiner Tafel-Notiz -->
          <div style="background: rgba(255,255,255,0.05); border: 2px solid rgba(255,255,255,0.1); padding: 1.5rem; transform: rotate(-3deg); box-shadow: 0 10px 30px rgba(0,0,0,0.15); position: absolute; bottom: -25px; left: -35px; max-width: 220px; backdrop-filter: blur(10px);">
            <p style="color: rgba(255,255,255,0.9); margin: 0; font-size: 0.9rem; text-align: center; font-family: 'Comic Sans MS', cursive, sans-serif;">
              Perfekt für Zwischenverdienste!
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Helpers Section Component
</script>