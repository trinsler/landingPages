<template>
  <div style="min-height: 100vh; background: #f5f5f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;">
    <!-- Modern Header aligned with PWA style -->
    <header style="position: sticky; top: 0; z-index: 50; background: #474747; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
      <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem 1.5rem; max-width: 1200px; margin: 0 auto;">
        <div style="display: flex; align-items: center; gap: 1rem;">
          <div style="width: 3rem; height: 3rem; background: white; border-radius: 12px; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 8px rgba(0,0,0,0.2);">
            <img src="/icons/logo.svg" alt="Logo" style="width: 2.5rem; height: 2.5rem;">
          </div>
          <div>
            <h1 style="color: white; font-size: 1.8rem; font-weight: 700; margin: 0; text-shadow: 1px 1px 2px rgba(0,0,0,0.3);">Mei.Nochber</h1>
            <div style="color: rgba(255,255,255,0.8); font-size: 0.9rem; font-weight: 400; margin-top: 0.25rem;">
              Generationen verbinden
            </div>
          </div>
        </div>
        
        <div style="display: flex; align-items: center; gap: 1rem;">
          <button @click="navigateToApp" style="background: #BECDA3; color: #474747; padding: 0.75rem 1.5rem; border-radius: 25px; border: none; cursor: pointer; box-shadow: 0 2px 8px rgba(0,0,0,0.2); transition: transform 0.2s; font-weight: 600; font-size: 0.9rem;"
                  onmouseover="this.style.transform='scale(1.05)'"
                  onmouseout="this.style.transform='scale(1)'">
            App öffnen
          </button>
        </div>
      </div>
    </header>
    
    <!-- Hero Section with PWA-style design -->
    <section style="background: #f5f5f5; padding: 4rem 1.5rem;">
      <div style="max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center;">
        <!-- Left Content -->
        <div style="max-width: 500px;">
          <h1 style="font-size: 3.5rem; font-weight: 700; margin: 0 0 2rem 0; line-height: 1.1; color: #474747;">
            Mei.Nochber<br>
            <span style="color: #5F6F55;">Generationen verbinden</span>
          </h1>
          
          <p style="color: #666; font-size: 1.3rem; line-height: 1.6; margin-bottom: 3rem; font-weight: 300;">
            Einfach per Sprache oder Text Hilfe anfordern. Lokale Nachbarn aus deiner Umgebung finden sich.
            Sicher bezahlen - erst nach erbrachter Hilfe.
          </p>
          
          <!-- Testimonial Cards statt Feature Cards -->
          <div style="display: flex; flex-direction: column; gap: 1.5rem; margin-bottom: 3rem;">
            <div style="background: white; padding: 1.5rem; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
              <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
                <img src="/icons/verschiedeneMenschen.svg" alt="Margarete" style="width: 3rem; height: 3rem; border-radius: 50%; filter: hue-rotate(45deg);">
                <div>
                  <h3 style="color: #474747; font-size: 1rem; font-weight: 600; margin: 0;">Margarete S., 74 Jahre</h3>
                  <p style="color: #666; margin: 0; font-size: 0.9rem;">Singen</p>
                </div>
              </div>
              <p style="color: #666; margin: 0; font-style: italic; line-height: 1.5; font-size: 0.95rem;">
                "Früher musste ich meine Tochter anrufen. Jetzt spreche ich einfach in die App – und Tim steht mit meinen Einkäufen vor der Tür!"
              </p>
            </div>
            
            <div style="background: white; padding: 1.5rem; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
              <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
                <img src="/icons/JungeHaeltHandy.svg" alt="Lisa" style="width: 3rem; height: 3rem; border-radius: 50%; filter: hue-rotate(90deg);">
                <div>
                  <h3 style="color: #474747; font-size: 1rem; font-weight: 600; margin: 0;">Lisa K., 22 Jahre</h3>
                  <p style="color: #666; margin: 0; font-size: 0.9rem;">Konstanz</p>
                </div>
              </div>
              <p style="color: #666; margin: 0; font-style: italic; line-height: 1.5; font-size: 0.95rem;">
                "Als Studentin kann ich mir die Zeit frei einteilen. Letzte Woche 60€ verdient und nette Menschen kennengelernt!"
              </p>
            </div>
            
            <div style="background: white; padding: 1.5rem; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
              <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
                <img src="/icons/LeuteImKreis.svg" alt="Thomas" style="width: 3rem; height: 3rem; border-radius: 50%; filter: hue-rotate(180deg);">
                <div>
                  <h3 style="color: #474747; font-size: 1rem; font-weight: 600; margin: 0;">Thomas M., 51 Jahre</h3>
                  <p style="color: #666; margin: 0; font-size: 0.9rem;">Stuttgart</p>
                </div>
              </div>
              <p style="color: #666; margin: 0; font-style: italic; line-height: 1.5; font-size: 0.95rem;">
                "Meine Mutter lebt alleine. Mit Mei.Nochber kann ich ihr von Stuttgart aus helfen. Beruhigt mich ungemein!"
              </p>
            </div>
          </div>
          
          <!-- CTA Buttons -->
          <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
            <button @click="navigateToApp" style="background: #474747; color: white; padding: 1rem 2rem; border: none; border-radius: 25px; font-weight: 600; font-size: 1rem; cursor: pointer; box-shadow: 0 2px 8px rgba(0,0,0,0.2); transition: transform 0.2s;"
                    onmouseover="this.style.transform='scale(1.05)'"
                    onmouseout="this.style.transform='scale(1)'">
              App öffnen
            </button>
            <button @click="scrollToFeatures" style="background: transparent; color: #474747; padding: 1rem 2rem; border: 2px solid #474747; border-radius: 25px; font-weight: 600; font-size: 1rem; cursor: pointer; transition: all 0.2s;"
                    onmouseover="this.style.background='#474747'; this.style.color='white'"
                    onmouseout="this.style.background='transparent'; this.style.color='#474747'">
              Mehr erfahren
            </button>
          </div>
        </div>
        
        <!-- Right Visual -->
        <div style="display: flex; justify-content: center; align-items: center;">
          <div style="background: white; padding: 3rem; border-radius: 24px; box-shadow: 0 8px 32px rgba(0,0,0,0.1); max-width: 400px; text-align: center;">
            <img src="/icons/LeuteImKreis.svg" alt="Nachbarschaftshilfe" style="width: 100%; height: auto; margin-bottom: 2rem; filter: hue-rotate(15deg) saturate(1.2);">
            <h3 style="color: #474747; font-size: 1.5rem; font-weight: 600; margin: 0 0 1rem 0;">Nachbarschaftshilfe einfach gemacht</h3>
            <p style="color: #666; margin: 0; line-height: 1.5;">
              Alle Helfenden sind von uns geprüft und verifiziert. 
              Deine Sicherheit und Zufriedenheit stehen bei uns an erster Stelle!
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Section - Hilfe-Arten -->
    <section style="background: white; padding: 6rem 1.5rem;">
      <div style="max-width: 1200px; margin: 0 auto;">
        <!-- Titel -->
        <div style="text-align: center; margin-bottom: 4rem;">
          <h2 style="font-size: 2.5rem; font-weight: 700; margin: 0 0 1rem 0; color: #474747;">
            So können deine Mitmenschen dich unterstützen
          </h2>
          <p style="color: #666; font-size: 1.2rem; font-weight: 300; max-width: 600px; margin: 0 auto;">
            Verschiedene Arten von Hilfe für den Alltag
          </p>
        </div>

        <!-- Services Grid -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; margin-bottom: 4rem;">
          <!-- Einkaufen -->
          <div style="background: #f5f5f5; padding: 2rem; border-radius: 16px; text-align: center; position: relative;">
            <div style="position: absolute; top: 1rem; right: 1rem; background: #5F6F55; color: white; padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.8rem; font-weight: 600;">Beliebt!</div>
            <img src="/icons/einkaufenFrontalBub.svg" alt="Einkaufen" style="width: 80px; height: 80px; margin: 0 auto 1rem; filter: hue-rotate(45deg) saturate(1.3);">
            <h3 style="color: #474747; font-size: 1.2rem; font-weight: 600; margin-bottom: 0.5rem;">Einkaufen</h3>
            <p style="color: #666; margin: 0; font-size: 0.9rem;">Wocheneinkauf</p>
          </div>

          <!-- Gartenarbeit -->
          <div style="background: #f5f5f5; padding: 2rem; border-radius: 16px; text-align: center;">
            <img src="/icons/gießenBub.svg" alt="Gartenarbeit" style="width: 80px; height: 80px; margin: 0 auto 1rem; filter: hue-rotate(90deg) saturate(1.3);">
            <h3 style="color: #474747; font-size: 1.2rem; font-weight: 600; margin-bottom: 0.5rem;">Gartenarbeit</h3>
            <p style="color: #666; margin: 0; font-size: 0.9rem;">Gießen & Pflege</p>
          </div>

          <!-- Gassi gehen -->
          <div style="background: #f5f5f5; padding: 2rem; border-radius: 16px; text-align: center;">
            <img src="/icons/FrontalGassiJunge.svg" alt="Gassi gehen" style="width: 80px; height: 80px; margin: 0 auto 1rem; filter: hue-rotate(135deg) saturate(1.3);">
            <h3 style="color: #474747; font-size: 1.2rem; font-weight: 600; margin-bottom: 0.5rem;">Gassi gehen</h3>
            <p style="color: #666; margin: 0; font-size: 0.9rem;">Hunde spazieren</p>
          </div>

          <!-- Kochen -->
          <div style="background: #f5f5f5; padding: 2rem; border-radius: 16px; text-align: center;">
            <img src="/icons/kochen.svg" alt="Kochen" style="width: 80px; height: 80px; margin: 0 auto 1rem; filter: hue-rotate(180deg) saturate(1.3);">
            <h3 style="color: #474747; font-size: 1.2rem; font-weight: 600; margin-bottom: 0.5rem;">Kochen</h3>
            <p style="color: #666; margin: 0; font-size: 0.9rem;">Mahlzeiten</p>
          </div>

          <!-- Hausarbeit -->
          <div style="background: #f5f5f5; padding: 2rem; border-radius: 16px; text-align: center;">
            <img src="/icons/staubsaugen.svg" alt="Hausarbeit" style="width: 80px; height: 80px; margin: 0 auto 1rem; filter: hue-rotate(225deg) saturate(1.3);">
            <h3 style="color: #474747; font-size: 1.2rem; font-weight: 600; margin-bottom: 0.5rem;">Hausarbeit</h3>
            <p style="color: #666; margin: 0; font-size: 0.9rem;">Putzen & Ordnung</p>
          </div>

          <!-- Technik-Hilfe -->
          <div style="background: #f5f5f5; padding: 2rem; border-radius: 16px; text-align: center; position: relative;">
            <div style="position: absolute; top: 1rem; right: 1rem; background: #8FA66E; color: white; padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.8rem; font-weight: 600;">Neu!</div>
            <img src="/icons/technikBanalcieren.svg" alt="Technik" style="width: 80px; height: 80px; margin: 0 auto 1rem; filter: hue-rotate(270deg) saturate(1.3);">
            <h3 style="color: #474747; font-size: 1.2rem; font-weight: 600; margin-bottom: 0.5rem;">Technik-Hilfe</h3>
            <p style="color: #666; margin: 0; font-size: 0.9rem;">PC & Smartphone</p>
          </div>

          <!-- Besorgungen -->
          <div style="background: #f5f5f5; padding: 2rem; border-radius: 16px; text-align: center;">
            <img src="/icons/PaketTragen.svg" alt="Besorgungen" style="width: 80px; height: 80px; margin: 0 auto 1rem; filter: hue-rotate(315deg) saturate(1.3);">
            <h3 style="color: #474747; font-size: 1.2rem; font-weight: 600; margin-bottom: 0.5rem;">Besorgungen</h3>
            <p style="color: #666; margin: 0; font-size: 0.9rem;">Pakete & Apotheke</p>
          </div>

          <!-- Begleitung -->
          <div style="background: #f5f5f5; padding: 2rem; border-radius: 16px; text-align: center;">
            <img src="/icons/ZeitungJunge.svg" alt="Begleitung" style="width: 80px; height: 80px; margin: 0 auto 1rem; filter: hue-rotate(60deg) saturate(1.3);">
            <h3 style="color: #474747; font-size: 1.2rem; font-weight: 600; margin-bottom: 0.5rem;">Begleitung</h3>
            <p style="color: #666; margin: 0; font-size: 0.9rem;">Arzt & Behörde</p>
          </div>
        </div>

        <!-- Wichtiger Hinweis -->
        <div style="background: #474747; color: white; padding: 3rem; border-radius: 16px; text-align: center;">
          <div style="display: flex; align-items: center; justify-content: center; gap: 2rem; flex-wrap: wrap;">
            <img src="/icons/verschiedeneMenschen.svg" alt="Geprüfte Helfer" style="width: 120px; height: auto; filter: brightness(2) contrast(2) invert(1);">
            <div style="text-align: left; max-width: 500px;">
              <h4 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 1rem;">Wichtiger Hinweis:</h4>
              <p style="color: rgba(255,255,255,0.9); margin: 0; line-height: 1.6; font-size: 1.1rem;">
                Alle Helfenden sind von uns geprüft und verifiziert. 
                Deine Sicherheit und Zufriedenheit stehen bei uns an erster Stelle!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section - Häufige Fragen -->
    <section style="background: #f5f5f5; padding: 6rem 1.5rem;">
      <div style="max-width: 1200px; margin: 0 auto;">
        <!-- Titel -->
        <div style="text-align: center; margin-bottom: 4rem;">
          <h2 style="font-size: 2.5rem; font-weight: 700; margin: 0 0 1rem 0; color: #474747;">
            Häufige Fragen
          </h2>
          <p style="color: #666; font-size: 1.2rem; font-weight: 300; max-width: 600px; margin: 0 auto;">
            Alles Wichtige auf einen Blick
          </p>
        </div>

        <!-- FAQ Grid -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 2rem; margin-bottom: 4rem;">
          
          <!-- FAQ 1 -->
          <div style="background: white; padding: 2rem; border-radius: 16px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            <h4 style="color: #5F6F55; font-size: 1.2rem; font-weight: 600; margin-bottom: 1rem;">
              Muss ich die App bedienen können?
            </h4>
            <p style="color: #666; margin: 0; line-height: 1.6;">
              Nein! Die App ist extra für Menschen gemacht, die keine Technik-Experten sind. Du sprichst einfach rein – die App macht den Rest. Große Buttons, klare Texte, keine komplizierten Menüs.
            </p>
          </div>
          
          <!-- FAQ 2 -->
          <div style="background: white; padding: 2rem; border-radius: 16px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            <h4 style="color: #5F6F55; font-size: 1.2rem; font-weight: 600; margin-bottom: 1rem;">
              Was kostet das?
            </h4>
            <p style="color: #666; margin: 0; line-height: 1.6;">
              5-10€ pro Auftrag (je nach Art und Dauer) + 1€ Servicegebühr für die App<br><br>
              Keine versteckten Kosten. Keine Abos. Du zahlst nur, was du nutzt!
            </p>
          </div>
          
          <!-- FAQ 3 -->
          <div style="background: white; padding: 2rem; border-radius: 16px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            <h4 style="color: #5F6F55; font-size: 1.2rem; font-weight: 600; margin-bottom: 1rem;">
              Wie bezahle ich?
            </h4>
            <p style="color: #666; margin: 0; line-height: 1.6;">
              Du hinterlegst einmalig deine Zahlungsmethode. Die Bezahlung läuft dann automatisch – du musst nichts tun. Das Geld wird erst abgebucht, wenn du bestätigst, dass die Arbeit erledigt ist.
            </p>
          </div>
          
          <!-- FAQ 4 -->
          <div style="background: white; padding: 2rem; border-radius: 16px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            <h4 style="color: #5F6F55; font-size: 1.2rem; font-weight: 600; margin-bottom: 1rem;">
              Als Helfer: Muss ich Steuern zahlen?
            </h4>
            <p style="color: #666; margin: 0; line-height: 1.6;">
              Bis 520€ pro Jahr: Meist keine Steuererklärung nötig, keine Steuern<br><br>
              Die meisten Helfer bei uns liegen unter 520€/Jahr!
            </p>
          </div>
        </div>

        <!-- Rechtlicher Hinweis -->
        <div style="background: #BECDA3; color: #474747; padding: 2rem; border-radius: 16px; text-align: center; margin-bottom: 4rem;">
          <h4 style="font-size: 1.3rem; font-weight: 600; margin-bottom: 1rem;">Wichtiger rechtlicher Hinweis</h4>
          <p style="font-size: 1rem; margin: 0; line-height: 1.6;">
            Die Informationen dienen der allgemeinen Aufklärung und stellen keine Rechts- oder Steuerberatung dar. 
            Für individuelle Fragen wenden Sie sich bitte an einen Steuerberater oder Rechtsanwalt.
          </p>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section style="background: #474747; padding: 6rem 1.5rem; text-align: center;">
      <div style="max-width: 800px; margin: 0 auto;">
        <h2 style="font-size: 2.5rem; font-weight: 700; color: white; margin-bottom: 2rem;">
          Du brauchst keine technischen Kenntnisse!
        </h2>
        <p style="color: rgba(255,255,255,0.9); font-size: 1.2rem; margin-bottom: 3rem; line-height: 1.6;">
          Die App ist wie ein freundlicher Nachbar - einfach und verständlich.
          Jeder Schritt wurde entwickelt, um es für Seniorinnen und Senioren so einfach wie möglich zu machen.
        </p>
        <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
          <button @click="navigateToApp" style="background: #5F6F55; color: white; padding: 1.25rem 3rem; border: none; border-radius: 30px; font-weight: 600; font-size: 1.1rem; cursor: pointer; box-shadow: 0 4px 16px rgba(95,111,85,0.3); transition: transform 0.2s;"
                  onmouseover="this.style.transform='scale(1.05)'"
                  onmouseout="this.style.transform='scale(1)'">
            App öffnen
          </button>
          <button style="background: transparent; color: #BECDA3; padding: 1.25rem 3rem; border: 2px solid #BECDA3; border-radius: 30px; font-weight: 600; font-size: 1.1rem; cursor: pointer; transition: all 0.2s;"
                  onmouseover="this.style.background='#BECDA3'; this.style.color='#474747'"
                  onmouseout="this.style.background='transparent'; this.style.color='#BECDA3'">
            Support kontaktieren
          </button>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer style="background: #474747; color: white; padding: 3rem 1.5rem 2rem 1.5rem; border-top: 1px solid rgba(255,255,255,0.1);">
      <div style="max-width: 1200px; margin: 0 auto; text-align: center;">
        <div style="display: flex; align-items: center; justify-content: center; gap: 1rem; margin-bottom: 2rem;">
          <div style="width: 3rem; height: 3rem; background: white; border-radius: 12px; display: flex; align-items: center; justify-content: center;">
            <img src="/icons/logo.svg" alt="Logo" style="width: 2.5rem; height: 2.5rem;">
          </div>
          <h3 style="color: white; font-size: 1.5rem; font-weight: 700; margin: 0;">Mei.Nochber</h3>
        </div>
        <p style="color: rgba(255,255,255,0.7); margin-bottom: 2rem;">
          Generationen verbinden. Gemeinsam die Nachbarschaft stärken.
        </p>
        <div style="border-top: 1px solid rgba(255,255,255,0.2); padding-top: 2rem;">
          <p style="color: rgba(255,255,255,0.5); margin: 0; font-size: 0.9rem;">
            © 2024 Mei.Nochber. Nachbarschaftshilfe einfach gemacht.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
definePageMeta({
  layout: false
})

const navigateToApp = () => {
  navigateTo('/pwa/seeker/dashboard')
}

const scrollToFeatures = () => {
  const element = document.querySelector('section:nth-of-type(2)')
  element?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>
@media (max-width: 768px) {
  div[style*="grid-template-columns: 1fr 1fr"] {
    grid-template-columns: 1fr !important;
    gap: 2rem !important;
    text-align: center;
  }
  
  h1[style*="font-size: 3.5rem"] {
    font-size: 2.5rem !important;
  }
  
  div[style*="grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))"] {
    grid-template-columns: 1fr !important;
  }
}
</style>