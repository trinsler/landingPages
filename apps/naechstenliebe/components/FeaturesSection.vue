<template>
  <section id="funktionen" style="background: #474747; padding: 4rem 1.5rem 12rem 1.5rem; position: relative;">
    <!-- Kreide-Spuren im Hintergrund wie in Hero Section -->
    <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-image: repeating-linear-gradient(to bottom, transparent, transparent 3rem, rgba(255,255,255,0.03) 3rem, rgba(255,255,255,0.03) 3.1rem); opacity: 0.6;"></div>
    
    <div style="max-width: 80rem; margin: 0 auto; position: relative; z-index: 2;">
      <!-- Titel als Tafel-Notiz wie in Hero -->
      <div style="text-align: center; margin-bottom: 6rem;">
        <div style="background: rgba(255,255,255,0.05); border: 2px solid rgba(255,255,255,0.1); padding: 2.5rem 4rem; display: inline-block; transform: rotate(-1deg); box-shadow: 0 10px 30px rgba(0,0,0,0.15); position: relative; backdrop-filter: blur(10px);">
          <!-- Abgerissenes Eck -->
          <div style="position: absolute; top: 0; right: 0; width: 25px; height: 25px; background: #474747; clip-path: polygon(100% 0, 0 100%, 100% 100%);"></div>
          
          <h2 style="font-size: 3rem; font-weight: 700; margin: 0; line-height: 1.2; color: white; font-family: 'Comic Sans MS', cursive, sans-serif; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">
            So einfach funktioniert's
          </h2>
        </div>
        <div style="background: #BECDA3; color: #474747; padding: 1.5rem 3rem; display: inline-block; transform: rotate(1deg); margin-top: 2rem; box-shadow: 0 10px 30px rgba(0,0,0,0.1); position: relative;">
          <!-- Abgerissenes Eck -->
          <div style="position: absolute; top: 0; right: 0; width: 20px; height: 20px; background: #474747; clip-path: polygon(100% 0, 0 100%, 100% 100%);"></div>
          
          <div style="display: flex; align-items: center; gap: 1.5rem;">
            <img src="/icons/logo.svg" alt="Mein.Nachbar Logo" style="width: 80px; height: 80px;">
            <p style="font-size: 1.3rem; margin: 0; font-weight: 600; font-family: 'Comic Sans MS', cursive, sans-serif;">
              Drei einfache Schritte zur Nachbarschaftshilfe
            </p>
          </div>
        </div>
      </div>

      <!-- Features als handgemalte Notizzettel wie in Hero -->
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 5rem; margin-bottom: 8rem;">
        <!-- Feature 1 - KI-Spracheingabe -->
        <div style="position: relative;">
          <div style="background: rgba(255,255,255,0.9); padding: 2.5rem; transform: rotate(-2deg); box-shadow: 6px 6px 0px rgba(0,0,0,0.15); position: relative; backdrop-filter: blur(3px); border: 1px solid rgba(71,71,71,0.1);">
            <!-- Abgerissenes Eck -->
            <div style="position: absolute; top: 0; right: 0; width: 25px; height: 25px; background: #f5f5f5; clip-path: polygon(100% 0, 0 100%, 100% 100%);"></div>
            
            <!-- Schritt-Label wie Klebezettel -->
            <div style="position: absolute; top: -15px; left: 50%; transform: translateX(-50%) rotate(-2deg); background: #5F6F55; color: white; padding: 0.5rem 1.5rem; font-size: 0.9rem; font-weight: 600; font-family: 'Comic Sans MS', cursive, sans-serif; box-shadow: 2px 2px 0px rgba(0,0,0,0.2);">
              Schritt 1
            </div>
            
            <div style="text-align: center; margin-bottom: 2rem;">
              <div style="background: #5F6F55; width: 140px; height: 140px; margin: 0 auto; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 3px 3px 0px rgba(0,0,0,0.2);">
                <img src="/icons/JungeHaeltHandy.svg" alt="Spracheingabe" style="width: 90%; height: 90%; object-fit: contain; filter: brightness(2) contrast(2) invert(1);">
              </div>
            </div>
            
            <h3 style="font-size: 1.5rem; font-weight: 700; color: #474747; margin-bottom: 1.5rem; text-align: center; font-family: 'Comic Sans MS', cursive, sans-serif;">Sprich mit der App</h3>
            <p style="color: #8F8B82; line-height: 1.6; font-size: 1.1rem; text-align: center; font-family: 'Comic Sans MS', cursive, sans-serif;">
              Einfach sagen, was du brauchst. Unsere App versteht dich sofort.
            </p>
          </div>
        </div>

        <!-- Feature 2 - Lokales Matching -->
        <div style="position: relative;">
          <div style="background: rgba(255,255,255,0.9); padding: 2.5rem; transform: rotate(1deg); box-shadow: 6px 6px 0px rgba(0,0,0,0.15); position: relative; backdrop-filter: blur(3px); border: 1px solid rgba(71,71,71,0.1);">
            <!-- Abgerissenes Eck -->
            <div style="position: absolute; top: 0; right: 0; width: 25px; height: 25px; background: #f5f5f5; clip-path: polygon(100% 0, 0 100%, 100% 100%);"></div>
            
            <!-- Schritt-Label wie Klebezettel -->
            <div style="position: absolute; top: -15px; left: 50%; transform: translateX(-50%) rotate(2deg); background: #8FA66E; color: white; padding: 0.5rem 1.5rem; font-size: 0.9rem; font-weight: 600; font-family: 'Comic Sans MS', cursive, sans-serif; box-shadow: 2px 2px 0px rgba(0,0,0,0.2);">
              Schritt 2
            </div>
            
            <div style="text-align: center; margin-bottom: 2rem;">
              <div style="background: #8FA66E; width: 140px; height: 140px; margin: 0 auto; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 3px 3px 0px rgba(0,0,0,0.2);">
                <img src="/icons/einkaufenMadl.svg" alt="Lokales Matching" style="width: 90%; height: 90%; object-fit: contain; filter: brightness(2) contrast(2) invert(1);">
              </div>
            </div>
            
            <h3 style="font-size: 1.5rem; font-weight: 700; color: #474747; margin-bottom: 1.5rem; text-align: center; font-family: 'Comic Sans MS', cursive, sans-serif;">Hilfe kommt schnell</h3>
            <p style="color: #8F8B82; line-height: 1.6; font-size: 1.1rem; text-align: center; font-family: 'Comic Sans MS', cursive, sans-serif;">
              Jemand aus deiner Nachbarschaft meldet sich sofort bei dir.
            </p>
          </div>
        </div>

        <!-- Feature 3 - Sichere Bezahlung -->
        <div style="position: relative;">
          <div style="background: rgba(255,255,255,0.9); padding: 2.5rem; transform: rotate(-1deg); box-shadow: 6px 6px 0px rgba(0,0,0,0.15); position: relative; backdrop-filter: blur(3px); border: 1px solid rgba(71,71,71,0.1);">
            <!-- Abgerissenes Eck -->
            <div style="position: absolute; top: 0; right: 0; width: 25px; height: 25px; background: #f5f5f5; clip-path: polygon(100% 0, 0 100%, 100% 100%);"></div>
            
            <!-- Schritt-Label wie Klebezettel -->
            <div style="position: absolute; top: -15px; left: 50%; transform: translateX(-50%) rotate(-2deg); background: #474747; color: white; padding: 0.5rem 1.5rem; font-size: 0.9rem; font-weight: 600; font-family: 'Comic Sans MS', cursive, sans-serif; box-shadow: 2px 2px 0px rgba(0,0,0,0.2);">
              Schritt 3
            </div>
            
            <div style="text-align: center; margin-bottom: 2rem;">
              <div style="background: #474747; width: 140px; height: 140px; margin: 0 auto; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 3px 3px 0px rgba(0,0,0,0.2);">
                <img src="/icons/bezahlen.svg" alt="Bezahlen" style="width: 90%; height: 90%; object-fit: contain; filter: brightness(2) contrast(2) invert(1);">
              </div>
            </div>
            
            <h3 style="font-size: 1.5rem; font-weight: 700; color: #474747; margin-bottom: 1.5rem; text-align: center; font-family: 'Comic Sans MS', cursive, sans-serif;">Sicher bezahlen</h3>
            <p style="color: #8F8B82; line-height: 1.6; font-size: 1.1rem; text-align: center; font-family: 'Comic Sans MS', cursive, sans-serif;">
              Geld fließt erst, wenn alles erledigt ist. Fair für alle.
            </p>
          </div>
        </div>
      </div>
      
      <!-- Zusätzlicher Tafel-Notiz wie in Hero -->
      <div style="background: rgba(255,255,255,0.05); border: 2px solid rgba(255,255,255,0.1); padding: 2.5rem; max-width: 700px; margin: 0 auto; transform: rotate(1deg); box-shadow: 0 10px 30px rgba(0,0,0,0.15); position: relative; backdrop-filter: blur(10px);">
        <!-- Abgerissenes Eck -->
        <div style="position: absolute; top: 0; right: 0; width: 30px; height: 30px; background: #474747; clip-path: polygon(100% 0, 0 100%, 100% 100%);"></div>
        
        <h4 style="font-size: 1.5rem; font-weight: 700; color: white; margin-bottom: 1.5rem; text-align: center; font-family: 'Comic Sans MS', cursive, sans-serif; text-shadow: 1px 1px 2px rgba(0,0,0,0.3);">Wichtig zu wissen:</h4>
        <p style="color: rgba(255,255,255,0.9); margin: 0; line-height: 1.7; font-size: 1.2rem; text-align: center; font-family: 'Comic Sans MS', cursive, sans-serif;">
          Jeder Schritt wurde entwickelt, um es für Seniorinnen und Senioren so einfach wie möglich zu machen.<br>
          Keine komplizierte Technik - nur echte Hilfe von Mensch zu Mensch.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
// Features Section Component
</script>