<template>
  <section id="fuer-hilfesuchende" style="background: #474747; padding: 4rem 1.5rem 12rem 1.5rem; position: relative;">
    <!-- Kreide-Spuren im Hintergrund wie in Hero -->
    <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-image: repeating-linear-gradient(to bottom, transparent, transparent 3rem, rgba(255,255,255,0.03) 3rem, rgba(255,255,255,0.03) 3.1rem); opacity: 0.6;"></div>
    
    <div style="max-width: 80rem; margin: 0 auto; position: relative; z-index: 2;">
      <!-- Titel als Tafel-Notiz wie in Hero -->
      <div style="text-align: center; margin-bottom: 7rem;">
        <div style="background: rgba(255,255,255,0.05); border: 2px solid rgba(255,255,255,0.1); padding: 3rem 5rem; display: inline-block; transform: rotate(-1deg); box-shadow: 0 10px 30px rgba(0,0,0,0.15); position: relative; backdrop-filter: blur(10px);">
          <!-- Abgerissenes Eck -->
          <div style="position: absolute; top: 0; right: 0; width: 30px; height: 30px; background: #474747; clip-path: polygon(100% 0, 0 100%, 100% 100%);"></div>
          
          <h2 style="font-size: 3.5rem; font-weight: 700; margin: 0; line-height: 1.2; color: white; font-family: 'Comic Sans MS', cursive, sans-serif; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">
            Für Menschen, die Unterstützung im Alltag brauchen
          </h2>
        </div>
        
        <div style="background: #BECDA3; color: #474747; padding: 2rem 4rem; display: inline-block; transform: rotate(1deg); margin-top: 3rem; box-shadow: 0 10px 30px rgba(0,0,0,0.1); position: relative;">
          <!-- Abgerissenes Eck -->
          <div style="position: absolute; top: 0; right: 0; width: 25px; height: 25px; background: #474747; clip-path: polygon(100% 0, 0 100%, 100% 100%);"></div>
          
          <div style="display: flex; align-items: center; gap: 2rem;">
            <img src="/icons/logo.svg" alt="Mein.Nachbar Logo" style="width: 80px; height: 80px;">
            <p style="font-size: 1.5rem; margin: 0; font-weight: 600; font-family: 'Comic Sans MS', cursive, sans-serif;">
              Einfach gemacht für Seniorinnen und Senioren
            </p>
          </div>
        </div>
      </div>

      <!-- Schritte als Tafel-Notizen -->
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 5rem; margin-bottom: 8rem;">
        <!-- Schritt 1 - Tafel-Notiz -->
        <div style="position: relative;">
          <div style="background: rgba(255,255,255,0.05); border: 2px solid rgba(255,255,255,0.1); padding: 3rem; transform: rotate(-2deg); box-shadow: 0 10px 30px rgba(0,0,0,0.15); position: relative; backdrop-filter: blur(10px); height: 100%;">
            <!-- Abgerissenes Eck -->
            <div style="position: absolute; top: 0; right: 0; width: 30px; height: 30px; background: #474747; clip-path: polygon(100% 0, 0 100%, 100% 100%);"></div>
            
            <!-- Schritt-Label -->
            <div style="position: absolute; top: -15px; left: 50%; transform: translateX(-50%) rotate(-2deg); background: #5F6F55; color: white; padding: 0.5rem 1.5rem; font-size: 0.9rem; font-weight: 600; font-family: 'Comic Sans MS', cursive, sans-serif; box-shadow: 2px 2px 0px rgba(0,0,0,0.2);">
              Schritt 1
            </div>
            
            <div style="text-align: center; margin-bottom: 3rem;">
              <div style="background: #BECDA3; width: 100px; height: 100px; margin: 0 auto; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 3px 3px 0px rgba(0,0,0,0.2);">
                <div style="color: #474747; font-size: 2.5rem; font-weight: 700; font-family: 'Comic Sans MS', cursive, sans-serif;">1</div>
              </div>
            </div>
            
            <h3 style="color: white; font-weight: 700; margin-bottom: 2rem; text-align: center; font-size: 1.5rem; font-family: 'Comic Sans MS', cursive, sans-serif; text-shadow: 1px 1px 2px rgba(0,0,0,0.3);">Sprich mit der App</h3>
            <p style="color: rgba(255,255,255,0.8); line-height: 1.7; font-size: 1.2rem; font-family: 'Comic Sans MS', cursive, sans-serif;">
              Einfach sagen, was du brauchst. 
              Die App versteht dich sofort - keine komplizierte Bedienung!
            </p>
            
            <!-- Kleiner Tipp-Notizzettel -->
            <div style="background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); padding: 1.5rem; margin-top: 2.5rem; transform: rotate(2deg); box-shadow: 4px 4px 0px rgba(0,0,0,0.2); font-size: 1rem; color: white; font-family: 'Comic Sans MS', cursive, sans-serif;">
              Tipp: Du kannst auch einfach ins Telefon sprechen!
            </div>
          </div>
        </div>

        <!-- Schritt 2 - Tafel-Notiz -->
        <div style="position: relative;">
          <div style="background: rgba(255,255,255,0.05); border: 2px solid rgba(255,255,255,0.1); padding: 3rem; transform: rotate(1deg); box-shadow: 0 10px 30px rgba(0,0,0,0.15); position: relative; backdrop-filter: blur(10px); height: 100%;">
            <!-- Abgerissenes Eck -->
            <div style="position: absolute; top: 0; right: 0; width: 30px; height: 30px; background: #474747; clip-path: polygon(100% 0, 0 100%, 100% 100%);"></div>
            
            <!-- Schritt-Label -->
            <div style="position: absolute; top: -15px; left: 50%; transform: translateX(-50%) rotate(2deg); background: #8FA66E; color: white; padding: 0.5rem 1.5rem; font-size: 0.9rem; font-weight: 600; font-family: 'Comic Sans MS', cursive, sans-serif; box-shadow: 2px 2px 0px rgba(0,0,0,0.2);">
              Schritt 2
            </div>
            
            <div style="text-align: center; margin-bottom: 3rem;">
              <div style="background: #8FA66E; width: 100px; height: 100px; margin: 0 auto; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 3px 3px 0px rgba(0,0,0,0.2);">
                <div style="color: white; font-size: 2.5rem; font-weight: 700; font-family: 'Comic Sans MS', cursive, sans-serif;">2</div>
              </div>
            </div>
            
            <h3 style="color: white; font-weight: 700; margin-bottom: 2rem; text-align: center; font-size: 1.5rem; font-family: 'Comic Sans MS', cursive, sans-serif; text-shadow: 1px 1px 2px rgba(0,0,0,0.3);">Hilfe kommt zu dir</h3>
            <p style="color: rgba(255,255,255,0.8); line-height: 1.7; font-size: 1.2rem; font-family: 'Comic Sans MS', cursive, sans-serif;">
              Jemand aus deiner Nachbarschaft meldet sich. 
              Alle Helfenden sind von uns geprüft und vertrauenswürdig.
            </p>
            
            <!-- Kleiner Hinweis-Notizzettel -->
            <div style="background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); padding: 1.5rem; margin-top: 2.5rem; transform: rotate(-2deg); box-shadow: 4px 4px 0px rgba(0,0,0,0.2); font-size: 1rem; color: white; font-family: 'Comic Sans MS', cursive, sans-serif;">
              Die Hilfe kommt von jemandem aus deiner Gegend!
            </div>
          </div>
        </div>

        <!-- Schritt 3 - Tafel-Notiz -->
        <div style="position: relative;">
          <div style="background: rgba(255,255,255,0.05); border: 2px solid rgba(255,255,255,0.1); padding: 3rem; transform: rotate(-1deg); box-shadow: 0 10px 30px rgba(0,0,0,0.15); position: relative; backdrop-filter: blur(10px); height: 100%;">
            <!-- Abgerissenes Eck -->
            <div style="position: absolute; top: 0; right: 0; width: 30px; height: 30px; background: #474747; clip-path: polygon(100% 0, 0 100%, 100% 100%);"></div>
            
            <!-- Schritt-Label -->
            <div style="position: absolute; top: -15px; left: 50%; transform: translateX(-50%) rotate(-1deg); background: #474747; color: white; padding: 0.5rem 1.5rem; font-size: 0.9rem; font-weight: 600; font-family: 'Comic Sans MS', cursive, sans-serif; box-shadow: 2px 2px 0px rgba(0,0,0,0.2);">
              Schritt 3
            </div>
            
            <div style="text-align: center; margin-bottom: 3rem;">
              <div style="background: #474747; width: 100px; height: 100px; margin: 0 auto; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 3px 3px 0px rgba(0,0,0,0.2);">
                <div style="color: white; font-size: 2.5rem; font-weight: 700; font-family: 'Comic Sans MS', cursive, sans-serif;">3</div>
              </div>
            </div>
            
            <h3 style="color: white; font-weight: 700; margin-bottom: 2rem; text-align: center; font-size: 1.5rem; font-family: 'Comic Sans MS', cursive, sans-serif; text-shadow: 1px 1px 2px rgba(0,0,0,0.3);">Alles erledigt!</h3>
            <p style="color: rgba(255,255,255,0.8); line-height: 1.7; font-size: 1.2rem; font-family: 'Comic Sans MS', cursive, sans-serif;">
              Nachdem die Hilfe erledigt ist, 
              bestätigst du einfach in der App. Das Geld fließt erst dann.
            </p>
            
            <!-- Kleiner Sicherheits-Notizzettel -->
            <div style="background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); padding: 1.5rem; margin-top: 2.5rem; transform: rotate(1deg); box-shadow: 4px 4px 0px rgba(0,0,0,0.2); font-size: 1rem; color: white; font-family: 'Comic Sans MS', cursive, sans-serif;">
              Deine Sicherheit steht bei uns an erster Stelle!
            </div>
          </div>
        </div>
      </div>
      
      <!-- Zusätzliche Tafel-Notiz -->
      <div style="background: rgba(255,255,255,0.05); border: 2px solid rgba(255,255,255,0.1); padding: 3rem; max-width: 700px; margin: 4rem auto 0; transform: rotate(1deg); box-shadow: 0 10px 30px rgba(0,0,0,0.15); position: relative; backdrop-filter: blur(10px);">
        <!-- Abgerissenes Eck -->
        <div style="position: absolute; top: 0; right: 0; width: 40px; height: 40px; background: #474747; clip-path: polygon(100% 0, 0 100%, 100% 100%);"></div>
        
        <h4 style="font-size: 1.8rem; font-weight: 700; color: white; margin-bottom: 2rem; text-align: center; font-family: 'Comic Sans MS', cursive, sans-serif; text-shadow: 1px 1px 2px rgba(0,0,0,0.3);">Wichtig zu wissen:</h4>
        <p style="color: rgba(255,255,255,0.9); margin: 0; line-height: 1.8; text-align: center; font-size: 1.3rem; font-family: 'Comic Sans MS', cursive, sans-serif;">
          Du brauchst keine technischen Kenntnisse! <br>
          Die App ist wie ein freundlicher Nachbar - einfach und verständlich.
        </p>
      </div>
      
      <!-- Social Proof Testimonials -->
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 3rem; margin-top: 6rem;">
        <!-- Testimonial 1 -->
        <div style="background: rgba(255,255,255,0.05); border: 2px solid rgba(255,255,255,0.1); padding: 2.5rem; transform: rotate(-2deg); box-shadow: 0 10px 30px rgba(0,0,0,0.15); position: relative; backdrop-filter: blur(10px);">
          <div style="position: absolute; top: 0; right: 0; width: 25px; height: 25px; background: #474747; clip-path: polygon(100% 0, 0 100%, 100% 100%);"></div>
          
          <div style="text-align: center; margin-bottom: 1.5rem;">
            <img src="/icons/verschiedeneMenschen.svg" alt="Senior" style="width: 80px; height: 80px; margin-bottom: 1rem; filter: brightness(2) contrast(2) invert(1);">
            <div style="color: #BECDA3; font-size: 1.2rem; margin-bottom: 0.5rem; font-family: 'Comic Sans MS', cursive, sans-serif;">5 Sterne Bewertung</div>
          </div>
          
          <p style="color: rgba(255,255,255,0.9); margin: 0 0 1.5rem 0; line-height: 1.6; font-size: 1rem; font-family: 'Comic Sans MS', cursive, sans-serif; font-style: italic;">
            „Früher musste ich meine Tochter anrufen, wenn ich Hilfe brauchte. Jetzt kann ich einfach in die App sprechen – und eine halbe Stunde später steht Tim mit meinen Einkäufen vor der Tür!"
          </p>
          
          <p style="color: rgba(255,255,255,0.7); margin: 0; text-align: center; font-size: 0.9rem; font-family: 'Comic Sans MS', cursive, sans-serif;">
            <strong>Margarete S., 74 Jahre, Singen</strong>
          </p>
        </div>
        
        <!-- Testimonial 2 -->
        <div style="background: rgba(255,255,255,0.05); border: 2px solid rgba(255,255,255,0.1); padding: 2.5rem; transform: rotate(1deg); box-shadow: 0 10px 30px rgba(0,0,0,0.15); position: relative; backdrop-filter: blur(10px);">
          <div style="position: absolute; top: 0; right: 0; width: 25px; height: 25px; background: #474747; clip-path: polygon(100% 0, 0 100%, 100% 100%);"></div>
          
          <div style="text-align: center; margin-bottom: 1.5rem;">
            <img src="/icons/JungeHaeltHandy.svg" alt="Student" style="width: 80px; height: 80px; margin-bottom: 1rem; filter: brightness(2) contrast(2) invert(1);">
            <div style="color: #BECDA3; font-size: 1.2rem; margin-bottom: 0.5rem; font-family: 'Comic Sans MS', cursive, sans-serif;">5 Sterne Bewertung</div>
          </div>
          
          <p style="color: rgba(255,255,255,0.9); margin: 0 0 1.5rem 0; line-height: 1.6; font-size: 1rem; font-family: 'Comic Sans MS', cursive, sans-serif; font-style: italic;">
            „Als Studentin kann ich mir die Zeit frei einteilen und helfe meinen Nachbarn. Letzte Woche 60€ verdient, und dabei nette Menschen kennengelernt!"
          </p>
          
          <p style="color: rgba(255,255,255,0.7); margin: 0; text-align: center; font-size: 0.9rem; font-family: 'Comic Sans MS', cursive, sans-serif;">
            <strong>Lisa K., 22 Jahre, Konstanz</strong>
          </p>
        </div>
        
        <!-- Testimonial 3 -->
        <div style="background: rgba(255,255,255,0.05); border: 2px solid rgba(255,255,255,0.1); padding: 2.5rem; transform: rotate(-1deg); box-shadow: 0 10px 30px rgba(0,0,0,0.15); position: relative; backdrop-filter: blur(10px);">
          <div style="position: absolute; top: 0; right: 0; width: 25px; height: 25px; background: #474747; clip-path: polygon(100% 0, 0 100%, 100% 100%);"></div>
          
          <div style="text-align: center; margin-bottom: 1.5rem;">
            <img src="/icons/LeuteImKreis.svg" alt="Familie" style="width: 80px; height: 80px; margin-bottom: 1rem; filter: brightness(2) contrast(2) invert(1);">
            <div style="color: #BECDA3; font-size: 1.2rem; margin-bottom: 0.5rem; font-family: 'Comic Sans MS', cursive, sans-serif;">5 Sterne Bewertung</div>
          </div>
          
          <p style="color: rgba(255,255,255,0.9); margin: 0 0 1.5rem 0; line-height: 1.6; font-size: 1rem; font-family: 'Comic Sans MS', cursive, sans-serif; font-style: italic;">
            „Meine Mutter lebt alleine in Singen. Mit Nächstenliebe kann ich ihr von Stuttgart aus helfen, indem ich Aufträge für sie einstelle. Beruhigt mich ungemein!"
          </p>
          
          <p style="color: rgba(255,255,255,0.7); margin: 0; text-align: center; font-size: 0.9rem; font-family: 'Comic Sans MS', cursive, sans-serif;">
            <strong>Thomas M., 51 Jahre, Stuttgart (Sohn von Nutzerin)</strong>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Help Seekers Section Component
</script>