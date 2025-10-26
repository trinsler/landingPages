<template>
  <section id="faq" style="background: #474747; padding: 4rem 1.5rem 12rem 1.5rem; position: relative;">
    <!-- Kreide-Spuren im Hintergrund -->
    <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-image: repeating-linear-gradient(to bottom, transparent, transparent 3rem, rgba(255,255,255,0.03) 3rem, rgba(255,255,255,0.03) 3.1rem); opacity: 0.6;"></div>
    
    <div style="max-width: 80rem; margin: 0 auto; position: relative; z-index: 2;">
      <!-- Titel als Tafel-Notiz -->
      <div style="text-align: center; margin-bottom: 6rem;">
        <div style="background: rgba(255,255,255,0.05); border: 2px solid rgba(255,255,255,0.1); padding: 3rem 4rem; display: inline-block; transform: rotate(-1deg); box-shadow: 0 10px 30px rgba(0,0,0,0.15); position: relative; backdrop-filter: blur(10px);">
          <!-- Abgerissenes Eck -->
          <div style="position: absolute; top: 0; right: 0; width: 25px; height: 25px; background: #474747; clip-path: polygon(100% 0, 0 100%, 100% 100%);"></div>
          
          <h2 style="font-size: 3rem; font-weight: 700; margin: 0; line-height: 1.2; color: white; font-family: 'Comic Sans MS', cursive, sans-serif; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">
            Häufige Fragen
          </h2>
        </div>
        
        <div style="background: #BECDA3; color: #474747; padding: 2rem 3rem; display: inline-block; transform: rotate(1deg); margin-top: 2rem; box-shadow: 0 10px 30px rgba(0,0,0,0.1); position: relative;">
          <!-- Abgerissenes Eck -->
          <div style="position: absolute; top: 0; right: 0; width: 20px; height: 20px; background: #474747; clip-path: polygon(100% 0, 0 100%, 100% 100%);"></div>
          
          <div style="display: flex; align-items: center; gap: 1.5rem;">
            <img src="/icons/logo.svg" alt="Nächstenliebe Logo" style="width: 60px; height: 60px;">
            <p style="font-size: 1.3rem; margin: 0; font-weight: 600; font-family: 'Comic Sans MS', cursive, sans-serif;">
              Alles Wichtige auf einen Blick
            </p>
          </div>
        </div>
      </div>

      <!-- FAQ Grid -->
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 3rem; margin-bottom: 6rem;">
        
        <!-- Linke Spalte - Für Hilfesuchende -->
        <div>
          <h3 style="color: white; font-size: 2rem; font-weight: 700; margin-bottom: 2rem; text-align: center; font-family: 'Comic Sans MS', cursive, sans-serif; text-shadow: 1px 1px 2px rgba(0,0,0,0.3);">
            Für Hilfesuchende
          </h3>
          
          <!-- FAQ 1 -->
          <div style="background: rgba(255,255,255,0.05); border: 2px solid rgba(255,255,255,0.1); padding: 2rem; margin-bottom: 2rem; transform: rotate(-1deg); box-shadow: 0 10px 30px rgba(0,0,0,0.15); position: relative; backdrop-filter: blur(10px);">
            <div style="position: absolute; top: 0; right: 0; width: 25px; height: 25px; background: #474747; clip-path: polygon(100% 0, 0 100%, 100% 100%);"></div>
            
            <h4 style="color: #BECDA3; font-size: 1.3rem; font-weight: 700; margin-bottom: 1rem; font-family: 'Comic Sans MS', cursive, sans-serif;">
              Muss ich die App bedienen können?
            </h4>
            <p style="color: rgba(255,255,255,0.9); margin: 0; line-height: 1.6; font-family: 'Comic Sans MS', cursive, sans-serif;">
              Nein! Die App ist extra für Menschen gemacht, die keine Technik-Experten sind. Du sprichst einfach rein – die App macht den Rest. Große Buttons, klare Texte, keine komplizierten Menüs. Und wenn du Hilfe brauchst: Unser Support-Team hilft dir gerne weiter!
            </p>
          </div>
          
          <!-- FAQ 2 -->
          <div style="background: rgba(255,255,255,0.05); border: 2px solid rgba(255,255,255,0.1); padding: 2rem; margin-bottom: 2rem; transform: rotate(1deg); box-shadow: 0 10px 30px rgba(0,0,0,0.15); position: relative; backdrop-filter: blur(10px);">
            <div style="position: absolute; top: 0; right: 0; width: 25px; height: 25px; background: #474747; clip-path: polygon(100% 0, 0 100%, 100% 100%);"></div>
            
            <h4 style="color: #BECDA3; font-size: 1.3rem; font-weight: 700; margin-bottom: 1rem; font-family: 'Comic Sans MS', cursive, sans-serif;">
              Was kostet das?
            </h4>
            <p style="color: rgba(255,255,255,0.9); margin: 0; line-height: 1.6; font-family: 'Comic Sans MS', cursive, sans-serif;">
              5-10€ pro Auftrag (je nach Art und Dauer)<br>
              + 1€ Servicegebühr für die App<br><br>
              Keine versteckten Kosten. Keine Abos. Du zahlst nur, was du nutzt!
            </p>
          </div>
          
          <!-- FAQ 3 -->
          <div style="background: rgba(255,255,255,0.05); border: 2px solid rgba(255,255,255,0.1); padding: 2rem; margin-bottom: 2rem; transform: rotate(-2deg); box-shadow: 0 10px 30px rgba(0,0,0,0.15); position: relative; backdrop-filter: blur(10px);">
            <div style="position: absolute; top: 0; right: 0; width: 25px; height: 25px; background: #474747; clip-path: polygon(100% 0, 0 100%, 100% 100%);"></div>
            
            <h4 style="color: #BECDA3; font-size: 1.3rem; font-weight: 700; margin-bottom: 1rem; font-family: 'Comic Sans MS', cursive, sans-serif;">
              Wie bezahle ich?
            </h4>
            <p style="color: rgba(255,255,255,0.9); margin: 0; line-height: 1.6; font-family: 'Comic Sans MS', cursive, sans-serif;">
              Du hinterlegst einmalig deine Zahlungsmethode (Kreditkarte oder Lastschrift). Die Bezahlung läuft dann automatisch – du musst nichts tun. Das Geld wird erst abgebucht, wenn du bestätigst, dass die Arbeit erledigt ist.
            </p>
          </div>
          
          <!-- FAQ 4 -->
          <div style="background: rgba(255,255,255,0.05); border: 2px solid rgba(255,255,255,0.1); padding: 2rem; transform: rotate(2deg); box-shadow: 0 10px 30px rgba(0,0,0,0.15); position: relative; backdrop-filter: blur(10px);">
            <div style="position: absolute; top: 0; right: 0; width: 25px; height: 25px; background: #474747; clip-path: polygon(100% 0, 0 100%, 100% 100%);"></div>
            
            <h4 style="color: #BECDA3; font-size: 1.3rem; font-weight: 700; margin-bottom: 1rem; font-family: 'Comic Sans MS', cursive, sans-serif;">
              Kann ich denselben Helfer wiederholen?
            </h4>
            <p style="color: rgba(255,255,255,0.9); margin: 0; line-height: 1.6; font-family: 'Comic Sans MS', cursive, sans-serif;">
              Ja! Wenn dir jemand besonders gut geholfen hat, kannst du ihn als "Favorit" speichern. Bei deinem nächsten Auftrag wird dieser Helfer bevorzugt benachrichtigt.
            </p>
          </div>
        </div>
        
        <!-- Rechte Spalte - Für Helfende -->
        <div>
          <h3 style="color: white; font-size: 2rem; font-weight: 700; margin-bottom: 2rem; text-align: center; font-family: 'Comic Sans MS', cursive, sans-serif; text-shadow: 1px 1px 2px rgba(0,0,0,0.3);">
            Für Helfende
          </h3>
          
          <!-- FAQ 5 -->
          <div style="background: rgba(255,255,255,0.05); border: 2px solid rgba(255,255,255,0.1); padding: 2rem; margin-bottom: 2rem; transform: rotate(1deg); box-shadow: 0 10px 30px rgba(0,0,0,0.15); position: relative; backdrop-filter: blur(10px);">
            <div style="position: absolute; top: 0; right: 0; width: 25px; height: 25px; background: #474747; clip-path: polygon(100% 0, 0 100%, 100% 100%);"></div>
            
            <h4 style="color: #BECDA3; font-size: 1.3rem; font-weight: 700; margin-bottom: 1rem; font-family: 'Comic Sans MS', cursive, sans-serif;">
              Bin ich selbstständig?
            </h4>
            <p style="color: rgba(255,255,255,0.9); margin: 0; line-height: 1.6; font-family: 'Comic Sans MS', cursive, sans-serif;">
              Ja! Du bist kein Angestellter von uns, sondern selbstständig tätig. Das bedeutet:<br>
              Du entscheidest selbst, wann du arbeitest<br>
              Du kannst Aufträge ablehnen<br>
              Du bist dein eigener Boss<br><br>
              Das ist rechtlich so gewollt – du hast maximale Flexibilität!
            </p>
          </div>
          
          <!-- FAQ 6 -->
          <div style="background: rgba(255,255,255,0.05); border: 2px solid rgba(255,255,255,0.1); padding: 2rem; margin-bottom: 2rem; transform: rotate(-1deg); box-shadow: 0 10px 30px rgba(0,0,0,0.15); position: relative; backdrop-filter: blur(10px);">
            <div style="position: absolute; top: 0; right: 0; width: 25px; height: 25px; background: #474747; clip-path: polygon(100% 0, 0 100%, 100% 100%);"></div>
            
            <h4 style="color: #BECDA3; font-size: 1.3rem; font-weight: 700; margin-bottom: 1rem; font-family: 'Comic Sans MS', cursive, sans-serif;">
              Muss ich Steuern zahlen?
            </h4>
            <p style="color: rgba(255,255,255,0.9); margin: 0; line-height: 1.6; font-family: 'Comic Sans MS', cursive, sans-serif;">
              Bis 520€ pro Jahr:<br>
              Meist keine Steuererklärung nötig<br>
              Keine Steuern<br><br>
              
              520€ - 11.604€ pro Jahr:<br>
              Steuererklärung ja<br>
              Aber meist KEINE Steuern (Grundfreibetrag)<br><br>
              
              Die meisten Helfer bei uns liegen unter 520€/Jahr!
            </p>
          </div>
          
          <!-- FAQ 7 -->
          <div style="background: rgba(255,255,255,0.05); border: 2px solid rgba(255,255,255,0.1); padding: 2rem; margin-bottom: 2rem; transform: rotate(2deg); box-shadow: 0 10px 30px rgba(0,0,0,0.15); position: relative; backdrop-filter: blur(10px);">
            <div style="position: absolute; top: 0; right: 0; width: 25px; height: 25px; background: #474747; clip-path: polygon(100% 0, 0 100%, 100% 100%);"></div>
            
            <h4 style="color: #BECDA3; font-size: 1.3rem; font-weight: 700; margin-bottom: 1rem; font-family: 'Comic Sans MS', cursive, sans-serif;">
              Brauche ich einen Gewerbeschein?
            </h4>
            <p style="color: rgba(255,255,255,0.9); margin: 0; line-height: 1.6; font-family: 'Comic Sans MS', cursive, sans-serif;">
              Umstritten! Zur Sicherheit empfehlen wir:<br><br>
              
              Option 1: Gewerbeschein holen (~20€ bei deiner Stadt)<br>
              Option 2: Als Freiberufler anmelden (bei bestimmten Tätigkeiten wie Nachhilfe, Vorlesen)<br><br>
              
              Wir können dir leider keine Rechtsberatung geben – sprich mit einem Steuerberater, wenn du unsicher bist.
            </p>
          </div>
          
          <!-- FAQ 8 -->
          <div style="background: rgba(255,255,255,0.05); border: 2px solid rgba(255,255,255,0.1); padding: 2rem; transform: rotate(-2deg); box-shadow: 0 10px 30px rgba(0,0,0,0.15); position: relative; backdrop-filter: blur(10px);">
            <div style="position: absolute; top: 0; right: 0; width: 25px; height: 25px; background: #474747; clip-path: polygon(100% 0, 0 100%, 100% 100%);"></div>
            
            <h4 style="color: #BECDA3; font-size: 1.3rem; font-weight: 700; margin-bottom: 1rem; font-family: 'Comic Sans MS', cursive, sans-serif;">
              Was ist mit Sozialversicherung?
            </h4>
            <p style="color: rgba(255,255,255,0.9); margin: 0; line-height: 1.6; font-family: 'Comic Sans MS', cursive, sans-serif;">
              Als Selbstständiger bist du normalerweise NICHT sozialversicherungspflichtig.<br><br>
              
              Keine Rentenbeiträge<br>
              Keine Arbeitslosenversicherung<br>
              Keine Unfallversicherung<br><br>
              
              ABER:<br>
              Krankenversicherung läuft meist über Eltern (bis 25 Jahre) oder Studenten-Versicherung<br><br>
              
              Bei Fragen: Sprich mit deiner Krankenkasse!
            </p>
          </div>
        </div>
      </div>

      <!-- Wichtiger Hinweis -->
      <div style="background: #BECDA3; color: #474747; padding: 3rem; display: inline-block; transform: rotate(-1deg); box-shadow: 0 10px 30px rgba(0,0,0,0.1); position: relative; margin: 0 auto; max-width: 800px; text-align: center;">
        <div style="position: absolute; top: 0; right: 0; width: 30px; height: 30px; background: #474747; clip-path: polygon(100% 0, 0 100%, 100% 100%);"></div>
        
        <h4 style="font-size: 1.8rem; font-weight: 700; margin-bottom: 1.5rem; font-family: 'Comic Sans MS', cursive, sans-serif;">Wichtiger rechtlicher Hinweis</h4>
        <p style="font-size: 1.2rem; margin: 0; line-height: 1.6; font-family: 'Comic Sans MS', cursive, sans-serif;">
          Die Informationen auf dieser Seite dienen der allgemeinen Aufklärung und stellen keine Rechts- oder Steuerberatung dar. <br>
          Für individuelle Fragen wenden Sie sich bitte an einen Steuerberater oder Rechtsanwalt.
        </p>
      </div>
      
      <!-- CTA -->
      <div style="text-align: center; margin-top: 4rem;">
        <div style="background: rgba(255,255,255,0.05); border: 2px solid rgba(255,255,255,0.1); padding: 2.5rem; display: inline-block; transform: rotate(1deg); box-shadow: 0 10px 30px rgba(0,0,0,0.15); position: relative; backdrop-filter: blur(10px);">
          <div style="position: absolute; top: 0; right: 0; width: 25px; height: 25px; background: #474747; clip-path: polygon(100% 0, 0 100%, 100% 100%);"></div>
          
          <h4 style="font-size: 1.6rem; font-weight: 700; color: white; margin-bottom: 1.5rem; font-family: 'Comic Sans MS', cursive, sans-serif; text-shadow: 1px 1px 2px rgba(0,0,0,0.3);">Noch Fragen?</h4>
          <div style="display: flex; gap: 2rem; justify-content: center; flex-wrap: wrap;">
            <button style="background: #5F6F55; color: white; padding: 1.2rem 2.5rem; border-radius: 0.5rem; font-size: 1.1rem; font-weight: 600; border: none; cursor: pointer; box-shadow: 3px 3px 0px rgba(0,0,0,0.2); font-family: 'Comic Sans MS', cursive, sans-serif;">
              Support kontaktieren
            </button>
            <button style="background: transparent; color: #BECDA3; padding: 1.2rem 2.5rem; border-radius: 0.5rem; font-size: 1.1rem; font-weight: 600; border: 2px solid #BECDA3; cursor: pointer; font-family: 'Comic Sans MS', cursive, sans-serif;">
              App herunterladen
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// FAQ Section Component
</script>