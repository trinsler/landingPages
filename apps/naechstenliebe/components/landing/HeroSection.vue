<template>
  <section style="background: #f5f5f5; padding: 0 0 0 0; position: relative;">
    <!-- Blackboard/Tafel-Ästhetik -->
    <div style="background: #474747; margin: 0 auto; max-width: 1400px; position: relative; overflow: hidden;">
      <!-- Tafel-Rahmen -->
      <div style="position: relative; min-height: 90vh; display: grid; grid-template-columns: 1fr 1fr; align-items: center;">
        
        <!-- Linke Seite - Tafel mit Notizen -->
        <div style="background: #474747; padding: 6rem 4rem; position: relative;">
          <!-- Kreide-Spuren im Hintergrund -->
          <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-image: repeating-linear-gradient(to bottom, transparent, transparent 3rem, rgba(255,255,255,0.03) 3rem, rgba(255,255,255,0.03) 3.1rem); opacity: 0.6;"></div>
          
          <div style="position: relative; z-index: 2; max-width: 500px;">
            <!-- Haupttitel wie handgeschrieben auf Notizzettel -->
            <div style="margin-bottom: 4rem; position: relative;">
           
              <h1 style="font-size: 3.5rem; font-weight: 700; margin: 0; line-height: 1.1; letter-spacing: 2px; text-shadow: 2px 2px 4px rgba(0,0,0,0.4); font-family: 'Comic Sans MS', cursive, sans-serif; color: white; text-align: left; position: relative; z-index: 2;">
              Mei.Nochber
              </h1>
           
            </div>
            
            <!-- Untertitel -->
            <div style="color: #BECDA3; margin-bottom: 3rem; font-size: 1.3rem; font-weight: 300; line-height: 1.6; font-family: 'Comic Sans MS', cursive, sans-serif;">
              Generationen verbinden.<br>Gemeinsam die Nachbarschaft stärken.
            </div>
            
            <!-- Tafel-Notiz 1 -->
            <div style="background: rgba(255,255,255,0.05); border: 2px solid rgba(255,255,255,0.1); padding: 2rem; margin-bottom: 2rem; border-radius: 0.5rem; backdrop-filter: blur(10px);">
              <h3 style="color: white; font-size: 1.2rem; margin-bottom: 1rem; font-weight: 500; font-family: 'Comic Sans MS', cursive, sans-serif;">So einfach funktioniert's:</h3>
              <ul style="color: rgba(255,255,255,0.9); list-style: none; padding: 0; margin: 0; font-family: 'Comic Sans MS', cursive, sans-serif;">
                <li style="margin-bottom: 1rem; padding-left: 1.5rem; position: relative;">
                  <span style="position: absolute; left: 0; color: #BECDA3;">▸</span>
                  Einfach per Sprache oder Text Hilfe anfordern
                </li>
                <li style="margin-bottom: 1rem; padding-left: 1.5rem; position: relative;">
                  <span style="position: absolute; left: 0; color: #BECDA3;">▸</span>
                  Lokale Nachbarn aus deiner Umgebung finden sich
                </li>
                <li style="margin-bottom: 0; padding-left: 1.5rem; position: relative;">
                  <span style="position: absolute; left: 0; color: #BECDA3;">▸</span>
                  Sicher bezahlen - erst nach erbrachter Hilfe
                </li>
              </ul>
            </div>
            
            
          </div>
        </div>
        
        <!-- Rechte Seite - Visual wie handgemalte Zeichnungen -->
        <div style="background: #5F6F55; padding: 6rem 8rem; position: relative; display: flex; flex-direction: column; align-items: center; justify-content: center;">
          <!-- Zentrierter Container für alle Elemente -->
          <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; max-width: 500px; width: 100%;">
            
            <!-- Hauptbild wie Skizzenbuchseite -->
            <div style="position: relative; width: 100%; max-width: 400px; margin-bottom: 4rem; transform: rotate(-2deg); align-self: center;">
              <!-- Notizbuchpapier-Effekt -->
              <div style="background: rgba(255,255,255,0.95); padding: 2.5rem; border-radius: 1rem; box-shadow: 4px 4px 0px rgba(0,0,0,0.3); position: relative;">
                <!-- Abgerissene Ecken -->
                <div style="position: absolute; top: -8px; left: -8px; width: 20px; height: 20px; background: #5F6F55; clip-path: polygon(0 100%, 100% 0, 100% 100%);"></div>
                <div style="position: absolute; top: -8px; right: -8px; width: 15px; height: 15px; background: #5F6F55; clip-path: polygon(0 0, 100% 0, 0 100%);"></div>
                
                <!-- Bild wie handgemalt -->
                <div style="transform: rotate(1deg); position: relative; margin-bottom: 2.5rem;">
                  <img src="/icons/LeuteImKreis.svg" alt="Gemeinschaft" style="width: 100%; height: auto; filter: brightness(1.2) hue-rotate(45deg) saturate(1.8); opacity: 1;">
                  <!-- Bleistiftstrich-Effekt -->
                  <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(0,0,0,0.05) 2px, rgba(0,0,0,0.05) 4px); pointer-events: none;"></div>
                </div>
                
                <!-- Handgeschriebene Notiz -->
                <div style="margin-bottom: 3rem; text-align: center;">
                  <p style="color: #474747; font-family: 'Comic Sans MS', cursive, sans-serif; font-size: 1.2rem; transform: rotate(-1deg); margin: 0; line-height: 1.4; font-weight: 600;">
                    Nachbarschafthilfe einfach gemacht
                  </p>
                </div>
               
                <!-- CTA Buttons als handgemalte Zettel -->
                <div style="display: flex; gap: 2rem; justify-content: center; align-items: center;">
                  <button style="background: #474747; color: white; padding: 1.3rem 2.5rem; border: none; font-weight: 700; cursor: pointer; border-radius: 0.5rem; font-size: 1.1rem; box-shadow: 3px 3px 0px rgba(0,0,0,0.2); transform: rotate(-1deg);">
                    App laden
                  </button>
                 
                </div>
            
              </div>
            </div>
            
            
            
            
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Hero Section Component
</script>