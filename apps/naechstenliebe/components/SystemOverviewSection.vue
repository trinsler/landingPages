<template>
  <section id="system-uebersicht" style="background: #474747; padding: 4rem 1.5rem 12rem 1.5rem; position: relative;">
    <!-- Kreide-Spuren im Hintergrund -->
    <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-image: repeating-linear-gradient(to bottom, transparent, transparent 3rem, rgba(255,255,255,0.03) 3rem, rgba(255,255,255,0.03) 3.1rem); opacity: 0.6;"></div>
    
    <div style="max-width: 100rem; margin: 0 auto; position: relative; z-index: 2;">
      <!-- Titel als Tafel-Notiz -->
      <div style="text-align: center; margin-bottom: 6rem;">
        <div style="background: rgba(255,255,255,0.05); border: 2px solid rgba(255,255,255,0.1); padding: 3rem 4rem; display: inline-block; transform: rotate(-1deg); box-shadow: 0 10px 30px rgba(0,0,0,0.15); position: relative; backdrop-filter: blur(10px);">
          <!-- Abgerissenes Eck -->
          <div style="position: absolute; top: 0; right: 0; width: 25px; height: 25px; background: #474747; clip-path: polygon(100% 0, 0 100%, 100% 100%);"></div>
          
          <h2 style="font-size: 3rem; font-weight: 700; margin: 0; line-height: 1.2; color: white; font-family: 'Comic Sans MS', cursive, sans-serif; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">
            Wie die Nächstenliebe App funktioniert
          </h2>
        </div>
        
        <div style="background: #BECDA3; color: #474747; padding: 2rem 3rem; display: inline-block; transform: rotate(1deg); margin-top: 2rem; box-shadow: 0 10px 30px rgba(0,0,0,0.1); position: relative;">
          <!-- Abgerissenes Eck -->
          <div style="position: absolute; top: 0; right: 0; width: 20px; height: 20px; background: #474747; clip-path: polygon(100% 0, 0 100%, 100% 100%);"></div>
          
          <div style="display: flex; align-items: center; gap: 1.5rem;">
            <img src="/icons/logo.svg" alt="Nächstenliebe Logo" style="width: 60px; height: 60px;">
            <p style="font-size: 1.3rem; margin: 0; font-weight: 600; font-family: 'Comic Sans MS', cursive, sans-serif;">
              Das komplette System im Überblick
            </p>
          </div>
        </div>
      </div>

      <!-- System-Diagramm als große Tafel -->
      <div style="background: rgba(255,255,255,0.05); border: 2px solid rgba(255,255,255,0.1); padding: 3rem; transform: rotate(1deg); box-shadow: 0 10px 30px rgba(0,0,0,0.15); position: relative; backdrop-filter: blur(10px); margin-bottom: 4rem;">
        <!-- Abgerissenes Eck -->
        <div style="position: absolute; top: 0; right: 0; width: 35px; height: 35px; background: #474747; clip-path: polygon(100% 0, 0 100%, 100% 100%);"></div>
        
        <div style="background: #f8f9fa; padding: 3rem; border-radius: 0.5rem; transform: rotate(-1deg);">
          <h3 style="font-size: 2rem; font-weight: 700; margin-bottom: 2rem; text-align: center; font-family: 'Comic Sans MS', cursive, sans-serif; color: #474747;">Wie die Nächstenliebe App funktioniert</h3>
          
          <!-- Nutzer-Rollen -->
          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem; margin-bottom: 3rem;">
            <div style="text-align: center;">
              <img src="/icons/verschiedeneMenschen.svg" alt="Senior" style="width: 60px; height: 60px; margin-bottom: 1rem; filter: brightness(0.8) saturate(1.5);">
              <h4 style="font-size: 1.1rem; font-weight: 600; margin-bottom: 0.5rem; font-family: 'Comic Sans MS', cursive, sans-serif; color: #474747;">Hilfesuchender</h4>
              <p style="font-size: 0.9rem; margin: 0; font-family: 'Comic Sans MS', cursive, sans-serif; color: #666;">Senior/Bedürftiger</p>
            </div>
            
            <div style="text-align: center;">
              <img src="/icons/JungeHaeltHandy.svg" alt="Helfer" style="width: 60px; height: 60px; margin-bottom: 1rem; filter: brightness(0.8) saturate(1.5);">
              <h4 style="font-size: 1.1rem; font-weight: 600; margin-bottom: 0.5rem; font-family: 'Comic Sans MS', cursive, sans-serif; color: #474747;">Helfender</h4>
              <p style="font-size: 0.9rem; margin: 0; font-family: 'Comic Sans MS', cursive, sans-serif; color: #666;">Schüler/Student</p>
            </div>
            
            <div style="text-align: center;">
              <img src="/icons/LeuteImKreis.svg" alt="Angehöriger" style="width: 60px; height: 60px; margin-bottom: 1rem; filter: brightness(0.8) saturate(1.5);">
              <h4 style="font-size: 1.1rem; font-weight: 600; margin-bottom: 0.5rem; font-family: 'Comic Sans MS', cursive, sans-serif; color: #474747;">Angehöriger</h4>
              <p style="font-size: 0.9rem; margin: 0; font-family: 'Comic Sans MS', cursive, sans-serif; color: #666;">Für Familie bestellen</p>
            </div>
            
            <div style="text-align: center;">
              <div style="width: 60px; height: 60px; margin: 0 auto 1rem; background: #474747; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                <span style="font-size: 1.5rem; font-weight: bold; color: white;">A</span>
              </div>
              <h4 style="font-size: 1.1rem; font-weight: 600; margin-bottom: 0.5rem; font-family: 'Comic Sans MS', cursive, sans-serif; color: #474747;">Administrator</h4>
              <p style="font-size: 0.9rem; margin: 0; font-family: 'Comic Sans MS', cursive, sans-serif; color: #666;">Support & Management</p>
            </div>
          </div>
          
          <!-- Prozess-Flow mit Bildern -->
          <div style="display: grid; grid-template-columns: repeat(8, 1fr); gap: 1rem; margin-bottom: 3rem; align-items: center;">
            <!-- Schritt 1 -->
            <div style="text-align: center;">
              <img src="/icons/JungeHaeltHandy.svg" alt="Spracheingabe" style="width: 50px; height: 50px; margin-bottom: 0.5rem; filter: brightness(0.8) saturate(1.5);">
              <p style="font-size: 0.9rem; margin: 0; font-family: 'Comic Sans MS', cursive, sans-serif; color: #474747; font-weight: 600;">Spracheingabe</p>
            </div>
            
            <!-- Pfeil -->
            <div style="text-align: center; font-size: 2rem; color: #474747; font-weight: bold;">→</div>
            
            <!-- Schritt 2 -->
            <div style="text-align: center;">
              <img src="/icons/LeuteImKreis.svg" alt="Helfer finden" style="width: 50px; height: 50px; margin-bottom: 0.5rem; filter: brightness(0.8) saturate(1.5);">
              <p style="font-size: 0.9rem; margin: 0; font-family: 'Comic Sans MS', cursive, sans-serif; color: #474747; font-weight: 600;">Helfer finden</p>
            </div>
            
            <!-- Pfeil -->
            <div style="text-align: center; font-size: 2rem; color: #474747; font-weight: bold;">→</div>
            
            <!-- Schritt 3 -->
            <div style="text-align: center;">
              <img src="/icons/einkaufenFrontalBub.svg" alt="Hilfe leisten" style="width: 50px; height: 50px; margin-bottom: 0.5rem; filter: brightness(0.8) saturate(1.5);">
              <p style="font-size: 0.9rem; margin: 0; font-family: 'Comic Sans MS', cursive, sans-serif; color: #474747; font-weight: 600;">Hilfe leisten</p>
            </div>
            
            <!-- Pfeil -->
            <div style="text-align: center; font-size: 2rem; color: #474747; font-weight: bold;">→</div>
            
            <!-- Schritt 4 -->
            <div style="text-align: center;">
              <img src="/icons/bezahlen.svg" alt="Bezahlen" style="width: 50px; height: 50px; margin-bottom: 0.5rem; filter: brightness(0.8) saturate(1.5);">
              <p style="font-size: 0.9rem; margin: 0; font-family: 'Comic Sans MS', cursive, sans-serif; color: #474747; font-weight: 600;">Bezahlen</p>
            </div>
          </div>
          
          <!-- Kernfunktionen -->
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem;">
            <div style="background: rgba(71,71,71,0.1); padding: 1.5rem; border-radius: 0.5rem; text-align: center;">
              <img src="/icons/LeuteImKreis.svg" alt="Matching" style="width: 60px; height: 60px; margin-bottom: 1rem; filter: brightness(0.8) saturate(1.5);">
              <h4 style="font-size: 1.2rem; font-weight: 600; margin-bottom: 0.5rem; font-family: 'Comic Sans MS', cursive, sans-serif; color: #474747;">Intelligentes Matching</h4>
              <p style="font-size: 0.9rem; margin: 0; font-family: 'Comic Sans MS', cursive, sans-serif; color: #666;">Automatische Helfersuche in deiner Nähe</p>
            </div>
            
            <div style="background: rgba(71,71,71,0.1); padding: 1.5rem; border-radius: 0.5rem; text-align: center;">
              <div style="width: 60px; height: 60px; margin: 0 auto 1rem; background: #5F6F55; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                <span style="font-size: 1.8rem; font-weight: bold; color: white;">💬</span>
              </div>
              <h4 style="font-size: 1.2rem; font-weight: 600; margin-bottom: 0.5rem; font-family: 'Comic Sans MS', cursive, sans-serif; color: #474747;">Kommunikation</h4>
              <p style="font-size: 0.9rem; margin: 0; font-family: 'Comic Sans MS', cursive, sans-serif; color: #666;">Chat & Push-Benachrichtigungen</p>
            </div>
            
            <div style="background: rgba(71,71,71,0.1); padding: 1.5rem; border-radius: 0.5rem; text-align: center;">
              <img src="/icons/bezahlen.svg" alt="Sicherheit" style="width: 60px; height: 60px; margin-bottom: 1rem; filter: brightness(0.8) saturate(1.5);">
              <h4 style="font-size: 1.2rem; font-weight: 600; margin-bottom: 0.5rem; font-family: 'Comic Sans MS', cursive, sans-serif; color: #474747;">Sichere Bezahlung</h4>
              <p style="font-size: 0.9rem; margin: 0; font-family: 'Comic Sans MS', cursive, sans-serif; color: #666;">Geld erst nach Erledigung freigegeben</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Angehörigen-Feature -->
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 4rem; margin-bottom: 4rem;">
        <!-- Für Angehörige -->
        <div style="background: rgba(255,255,255,0.05); border: 2px solid rgba(255,255,255,0.1); padding: 3rem; transform: rotate(-2deg); box-shadow: 0 10px 30px rgba(0,0,0,0.15); position: relative; backdrop-filter: blur(10px);">
          <!-- Abgerissenes Eck -->
          <div style="position: absolute; top: 0; right: 0; width: 30px; height: 30px; background: #474747; clip-path: polygon(100% 0, 0 100%, 100% 100%);"></div>
          
          <h3 style="color: white; font-size: 2rem; font-weight: 700; margin-bottom: 2rem; text-align: center; font-family: 'Comic Sans MS', cursive, sans-serif; text-shadow: 1px 1px 2px rgba(0,0,0,0.3);">Für deine Angehörigen</h3>
          
          <img src="/icons/verschiedeneMenschen.svg" alt="Familie" style="width: 220px; height: auto; filter: brightness(2) contrast(2) invert(1); margin: 0 auto 2rem; display: block;">
          
          <div style="color: rgba(255,255,255,0.9); font-size: 1.1rem; line-height: 1.7; font-family: 'Comic Sans MS', cursive, sans-serif;">
            <p style="margin-bottom: 1.5rem;"><strong>Auch für deine Angehörigen bestellen:</strong> Bestelle Hilfe ganz einfach für deine Oma, deinen Opa oder andere Familienmitglieder, die Unterstützung benötigen.</p>
            
            <p style="margin-bottom: 1.5rem;"><strong>Du entlastest dich selbst:</strong> Sei beruhigt, dass deine Liebsten gut versorgt sind, auch wenn du nicht vor Ort sein kannst.</p>
            
            <p style="margin-bottom: 1.5rem;"><strong>Für deine eigene Entlastung:</strong> Die App informiert dich, wenn Aufträge erledigt wurden. So hast du alles im Blick und kannst entspannt sein.</p>
            
            <div style="background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); padding: 1.5rem; margin-top: 2rem; transform: rotate(2deg); box-shadow: 4px 4px 0px rgba(0,0,0,0.2);">
              <p style="margin: 0; text-align: center; font-weight: 600;"><strong>Tipp:</strong> Richte wiederkehrende Aufträge ein und deine Angehörigen bekommen automatisch Hilfe beim wöchentlichen Einkauf!</p>
            </div>
          </div>
        </div>

        <!-- Sicherheit & Vertrauen -->
        <div style="background: rgba(255,255,255,0.05); border: 2px solid rgba(255,255,255,0.1); padding: 3rem; transform: rotate(1deg); box-shadow: 0 10px 30px rgba(0,0,0,0.15); position: relative; backdrop-filter: blur(10px);">
          <!-- Abgerissenes Eck -->
          <div style="position: absolute; top: 0; right: 0; width: 30px; height: 30px; background: #474747; clip-path: polygon(100% 0, 0 100%, 100% 100%);"></div>
          
          <h3 style="color: white; font-size: 2rem; font-weight: 700; margin-bottom: 2rem; text-align: center; font-family: 'Comic Sans MS', cursive, sans-serif; text-shadow: 1px 1px 2px rgba(0,0,0,0.3);">Sicherheit & Vertrauen</h3>
          
          <div style="color: rgba(255,255,255,0.9); font-size: 1.1rem; line-height: 1.7; font-family: 'Comic Sans MS', cursive, sans-serif;">
            <p style="margin-bottom: 1.5rem;"><strong>Alle Helfer geprüft:</strong> Jeder Helfer wird von uns persönlich überprüft und verifiziert.</p>
            
            <p style="margin-bottom: 1.5rem;"><strong>Bewertungssystem:</strong> Sieh sofort, wie gut ein Helfer von anderen bewertet wurde.</p>
            
            <p style="margin-bottom: 1.5rem;"><strong>Sichere Bezahlung:</strong> Das Geld wird erst freigegeben, wenn die Hilfe wirklich erledigt wurde.</p>
            
            <p style="margin-bottom: 1.5rem;"><strong>Support-Team:</strong> Bei Problemen sind wir jederzeit für dich da.</p>
            
            <p style="margin-bottom: 1.5rem;"><strong>Nur aus deiner Region:</strong> Die Hilfe kommt wirklich von Nachbarn aus deiner Umgebung.</p>
            
            <div style="background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); padding: 1.5rem; margin-top: 2rem; transform: rotate(-2deg); box-shadow: 4px 4px 0px rgba(0,0,0,0.2);">
              <p style="margin: 0; text-align: center; font-weight: 600;"><strong>Versicherungsschutz:</strong> Alle Helfer sind über unsere Plattform versichert!</p>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA für Angehörige -->
      <div style="text-align: center;">
        <div style="background: rgba(255,255,255,0.05); border: 2px solid rgba(255,255,255,0.1); padding: 2.5rem; display: inline-block; transform: rotate(-1deg); box-shadow: 0 10px 30px rgba(0,0,0,0.15); position: relative; backdrop-filter: blur(10px);">
          <!-- Abgerissenes Eck -->
          <div style="position: absolute; top: 0; right: 0; width: 25px; height: 25px; background: #474747; clip-path: polygon(100% 0, 0 100%, 100% 100%);"></div>
          
          <h4 style="font-size: 1.8rem; font-weight: 700; color: white; margin-bottom: 1.5rem; font-family: 'Comic Sans MS', cursive, sans-serif; text-shadow: 1px 1px 2px rgba(0,0,0,0.3);">Sorge jetzt für deine Liebsten!</h4>
          <p style="color: rgba(255,255,255,0.9); margin: 0 0 2rem 0; font-size: 1.2rem; font-family: 'Comic Sans MS', cursive, sans-serif;">
            Auch wenn du weit weg bist - mit der Nächstenliebe App kannst du deine Familie unterstützen
          </p>
          <div style="display: flex; gap: 2rem; justify-content: center; flex-wrap: wrap;">
            <button style="background: #5F6F55; color: white; padding: 1.5rem 3rem; border-radius: 0.5rem; font-size: 1.2rem; font-weight: 600; border: none; cursor: pointer; box-shadow: 3px 3px 0px rgba(0,0,0,0.2); font-family: 'Comic Sans MS', cursive, sans-serif;">
              Für Angehörige registrieren
            </button>
            <button style="background: transparent; color: #BECDA3; padding: 1.5rem 3rem; border-radius: 0.5rem; font-size: 1.2rem; font-weight: 600; border: 2px solid #BECDA3; cursor: pointer; font-family: 'Comic Sans MS', cursive, sans-serif;">
              Mehr erfahren
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// System Overview Section Component
</script>