<template>
  <div class="min-h-screen" style="background: #f5f5f5; font-family: 'Comic Sans MS', cursive, sans-serif; padding: 0; margin: 0;">
    
    <div style="width: 100%; max-width: 100%; margin: 0; padding: 1rem; box-sizing: border-box;">
      
      <!-- Erfolgs Header -->
      <div style="text-align: center; margin-bottom: 2rem;">
        <div style="margin-bottom: 1rem;">
          <img src="/icons/LeuteImKreis.svg" alt="Erfolg" style="width: clamp(3rem, 10vw, 4rem); height: clamp(3rem, 10vw, 4rem);">
        </div>
        <h2 style="color: #474747; font-size: clamp(1.4rem, 4vw, 1.8rem); font-weight: 700; margin: 0 0 0.5rem 0;">Auftrag abgeschlossen!</h2>
        <p style="color: #666; margin: 0; font-size: clamp(0.95rem, 3vw, 1.1rem);">Wie war Ihre Erfahrung mit Maria?</p>
      </div>

      <!-- Hauptfrage -->
      <div style="background: white; border-radius: 1rem; padding: 2rem; margin-bottom: 2rem; box-shadow: 3px 3px 0px rgba(0,0,0,0.1); text-align: center;">
        <h3 style="color: #474747; font-size: clamp(1.2rem, 3.5vw, 1.4rem); font-weight: 700; margin: 0 0 1.5rem 0;">Wurde alles erledigt?</h3>
        
        <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
          <!-- Ja Button -->
          <button style="background: #BECDA3; color: #474747; padding: 1.5rem 2.5rem; border-radius: 1rem; border: none; font-weight: 700; font-size: clamp(1rem, 3vw, 1.2rem); box-shadow: 3px 3px 0px rgba(0,0,0,0.2); cursor: pointer; transform: rotate(-1deg); transition: all 0.3s ease; min-width: 0; flex: 1; max-width: 12rem;">
            Ja, perfekt!
          </button>
          
          <!-- Nein Button -->
          <button style="background: white; color: #d32f2f; padding: 1.5rem 2rem; border-radius: 1rem; border: 2px solid #d32f2f; font-weight: 600; font-size: clamp(1rem, 3vw, 1.1rem); cursor: pointer; transform: rotate(1deg); min-width: 0; flex: 1; max-width: 12rem;">
            Nein, Problem
          </button>
        </div>
      </div>

      <!-- Bewertung abgeben -->
      <div style="background: white; border-radius: 1rem; padding: 2rem; margin-bottom: 2rem; box-shadow: 3px 3px 0px rgba(0,0,0,0.1);">
        <h3 style="color: #474747; font-size: clamp(1.1rem, 3.5vw, 1.3rem); font-weight: 600; margin: 0 0 1.5rem 0; text-align: center;">Maria bewerten</h3>
        
        <!-- Sterne Bewertung -->
        <div style="text-align: center; margin-bottom: 1.5rem;">
          <div style="display: flex; justify-content: center; gap: 0.5rem; font-size: clamp(2rem, 6vw, 2.5rem); margin-bottom: 1rem;">
            <button style="background: none; border: none; color: #BECDA3; cursor: pointer; transition: all 0.2s;">★</button>
            <button style="background: none; border: none; color: #BECDA3; cursor: pointer; transition: all 0.2s;">★</button>
            <button style="background: none; border: none; color: #BECDA3; cursor: pointer; transition: all 0.2s;">★</button>
            <button style="background: none; border: none; color: #BECDA3; cursor: pointer; transition: all 0.2s;">★</button>
            <button style="background: none; border: none; color: #BECDA3; cursor: pointer; transition: all 0.2s;">★</button>
          </div>
          <p style="color: #474747; margin: 0; font-weight: 600; font-size: clamp(1rem, 3vw, 1.1rem);">Ausgezeichnet!</p>
        </div>

        <!-- Kommentar (optional) -->
        <div style="margin-bottom: 1.5rem;">
          <label style="color: #474747; font-weight: 600; margin-bottom: 0.8rem; display: block; font-size: clamp(0.9rem, 2.5vw, 1rem);">Kommentar (optional):</label>
          <textarea style="width: 100%; min-height: 4rem; padding: 1rem; border: 2px solid #BECDA3; border-radius: 0.8rem; font-family: 'Comic Sans MS', cursive, sans-serif; resize: vertical; background: rgba(190, 205, 163, 0.1); box-sizing: border-box; font-size: clamp(0.85rem, 2.5vw, 0.9rem);" placeholder="Was war besonders gut? Tipps für andere..."></textarea>
        </div>

        <!-- Helfer-Info -->
        <div style="background: rgba(190, 205, 163, 0.2); border-radius: 0.8rem; padding: 1rem; display: flex; align-items: center; gap: 1rem;">
          <div style="width: 3rem; height: 3rem; background: #BECDA3; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
            <img src="/icons/verschiedeneMenschen.svg" alt="Maria" style="width: 1.5rem; height: 1.5rem;">
          </div>
          <div style="flex: 1; min-width: 0;">
            <h4 style="color: #474747; font-size: clamp(1rem, 3vw, 1.1rem); font-weight: 600; margin: 0;">Maria H.</h4>
            <p style="color: #666; margin: 0; font-size: clamp(0.8rem, 2.5vw, 0.9rem);">Einkaufen • 15€ • 45 Min</p>
          </div>
        </div>
      </div>

      <!-- Als Favorit speichern -->
      <div style="background: rgba(190, 205, 163, 0.2); border: 2px solid #BECDA3; border-radius: 1rem; padding: 1.5rem; margin-bottom: 2rem; text-align: center;">
        <h3 style="color: #474747; font-size: clamp(1rem, 3vw, 1.2rem); font-weight: 600; margin: 0 0 1rem 0; display: flex; align-items: center; justify-content: center; gap: 0.5rem;">
          Als Favorit speichern?
        </h3>
        <p style="color: #666; margin: 0 0 1.5rem 0; font-size: clamp(0.85rem, 2.5vw, 0.95rem);">Für zukünftige Aufträge direkt Maria beauftragen</p>
        
        <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
          <button style="background: #BECDA3; color: #474747; padding: 1rem 2rem; border-radius: 0.8rem; border: none; font-weight: 600; cursor: pointer; font-size: clamp(0.9rem, 2.5vw, 1rem); min-width: 0; flex: 1; max-width: 10rem;">
            Ja, hinzufügen
          </button>
          <button style="background: white; color: #666; padding: 1rem 2rem; border-radius: 0.8rem; border: 1px solid #ddd; cursor: pointer; font-size: clamp(0.9rem, 2.5vw, 1rem); min-width: 0; flex: 1; max-width: 10rem;">
            Nein, danke
          </button>
        </div>
      </div>

      <!-- Abschluss Button -->
      <button style="width: 100%; background: #474747; color: white; padding: 1.8rem; border-radius: 1rem; border: none; font-weight: 700; font-size: clamp(1.2rem, 3.5vw, 1.4rem); box-shadow: 4px 4px 0px rgba(0,0,0,0.2); cursor: pointer; margin-bottom: 2rem; transform: rotate(-0.5deg); box-sizing: border-box;">
        Zurück zur Startseite
      </button>

      <!-- Zusammenfassung -->
      <div style="background: white; border-radius: 1rem; padding: 1.5rem; box-shadow: 3px 3px 0px rgba(0,0,0,0.1);">
        <h3 style="color: #474747; font-size: clamp(1rem, 3vw, 1.1rem); font-weight: 600; margin: 0 0 1rem 0;">Auftragszusammenfassung</h3>
        
        <div style="display: flex; flex-direction: column; gap: 0.8rem; font-size: clamp(0.8rem, 2.5vw, 0.9rem);">
          <div style="display: flex; justify-content: space-between;">
            <span style="color: #666;">Helfer:</span>
            <span style="color: #474747; font-weight: 600;">Maria H.</span>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span style="color: #666;">Service:</span>
            <span style="color: #474747; font-weight: 600;">Einkaufen</span>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span style="color: #666;">Dauer:</span>
            <span style="color: #474747; font-weight: 600;">45 Minuten</span>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span style="color: #666;">Preis:</span>
            <span style="color: #474747; font-weight: 600;">15€</span>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span style="color: #666;">Status:</span>
            <span style="color: #BECDA3; font-weight: 600;">Bezahlt</span>
          </div>
        </div>
      </div>

    </div>

    <!-- Bottom Navigation -->
    <nav style="position: fixed; bottom: 0; left: 0; right: 0; background: #474747; padding: 1rem 0; box-shadow: 0 -4px 6px rgba(0,0,0,0.1); width: 100%; box-sizing: border-box;">
      <div style="width: 100%; display: flex; justify-content: space-around; padding: 0 1rem; box-sizing: border-box;">
        <button style="background: none; border: none; color: #BECDA3; display: flex; flex-direction: column; align-items: center; gap: 0.3rem; cursor: pointer; min-width: 0; flex: 1;">
          <img src="/icons/logo.svg" alt="Home" style="width: 1.5rem; height: 1.5rem; filter: brightness(0) saturate(100%) invert(82%) sepia(14%) saturate(508%) hue-rotate(58deg) brightness(91%) contrast(88%);">
          <span style="font-size: clamp(0.7rem, 2vw, 0.8rem); font-weight: 600;">Home</span>
        </button>
        <button style="background: none; border: none; color: rgba(255,255,255,0.6); display: flex; flex-direction: column; align-items: center; gap: 0.3rem; cursor: pointer; min-width: 0; flex: 1;">
          <img src="/icons/ZeitungJunge.svg" alt="Aufträge" style="width: 1.5rem; height: 1.5rem; filter: brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%) opacity(60%);">
          <span style="font-size: clamp(0.7rem, 2vw, 0.8rem);">Aufträge</span>
        </button>
        <button style="background: none; border: none; color: rgba(255,255,255,0.6); display: flex; flex-direction: column; align-items: center; gap: 0.3rem; cursor: pointer; min-width: 0; flex: 1;">
          <img src="/icons/verschiedeneMenschen.svg" alt="Favoriten" style="width: 1.5rem; height: 1.5rem; filter: brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%) opacity(60%);">
          <span style="font-size: clamp(0.7rem, 2vw, 0.8rem);">Favoriten</span>
        </button>
        <button style="background: none; border: none; color: rgba(255,255,255,0.6); display: flex; flex-direction: column; align-items: center; gap: 0.3rem; cursor: pointer; min-width: 0; flex: 1;">
          <img src="/icons/verschiedeneMenschen.svg" alt="Profil" style="width: 1.5rem; height: 1.5rem; filter: brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%) opacity(60%);">
          <span style="font-size: clamp(0.7rem, 2vw, 0.8rem);">Profil</span>
        </button>
      </div>
    </nav>

    <!-- Padding für Bottom Navigation -->
    <div style="height: 6rem;"></div>
  </div>
</template>

<script setup>
</script>