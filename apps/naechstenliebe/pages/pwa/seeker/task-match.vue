<template>
  <div class="min-h-screen" style="background: #f5f5f5; font-family: 'Comic Sans MS', cursive, sans-serif; padding: 0; margin: 0;">
  
    <div style="width: 100%; max-width: 100%; margin: 0; padding: 1rem; box-sizing: border-box;">
      
      <!-- Erfolgs-Meldung -->
      <div style="background: rgba(190, 205, 163, 0.2); border: 2px solid #BECDA3; border-radius: 1rem; padding: 1.5rem; margin-bottom: 2rem; text-align: center;">
        <div style="margin-bottom: 0.5rem;">
          <img src="/icons/LeuteImKreis.svg" alt="Erfolg" style="width: 4rem; height: 4rem;">
        </div>
        <h2 style="color: #474747; font-size: clamp(1.2rem, 3.5vw, 1.4rem); font-weight: 700; margin: 0 0 0.5rem 0;">Perfekt!</h2>
        <p style="color: #666; margin: 0; font-size: clamp(0.9rem, 2.5vw, 1rem);">Wir haben einen passenden Helfer in Ihrer Nähe gefunden.</p>
      </div>

      <!-- Helfer Profil - Zentral & Prominent -->
      <div style="background: white; border-radius: 1rem; padding: 2rem; margin-bottom: 2rem; box-shadow: 4px 4px 0px rgba(0,0,0,0.1); transform: rotate(-1deg);">
        <!-- Profilbild & Info -->
        <div style="text-align: center; margin-bottom: 2rem;">
          <div style="width: 6rem; height: 6rem; background: #BECDA3; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem auto;">
            <img src="/icons/verschiedeneMenschen.svg" alt="Maria" style="width: 3rem; height: 3rem;">
          </div>
          <h3 style="color: #474747; font-size: clamp(1.3rem, 4vw, 1.5rem); font-weight: 700; margin: 0 0 0.5rem 0;">Maria H.</h3>
          <div style="display: flex; align-items: center; justify-content: center; gap: 0.5rem; margin-bottom: 1rem;">
            <span style="color: #BECDA3; font-size: clamp(1rem, 3vw, 1.2rem);">★★★★★</span>
            <span style="color: #666; font-size: clamp(0.8rem, 2.5vw, 0.9rem);">(47 Bewertungen)</span>
          </div>
          <p style="color: #666; margin: 0; font-size: clamp(0.85rem, 2.5vw, 0.95rem); display: flex; align-items: center; justify-content: center; gap: 0.3rem;">
            <strong>0.3 km entfernt</strong>
          </p>
        </div>

        <!-- Spezialisierungen -->
        <div style="margin-bottom: 1.5rem;">
          <h4 style="color: #474747; font-size: clamp(1rem, 3vw, 1.1rem); font-weight: 600; margin: 0 0 0.8rem 0;">Spezialisiert auf:</h4>
          <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
            <span style="background: #BECDA3; color: #474747; padding: 0.4rem 0.8rem; border-radius: 1rem; font-size: clamp(0.75rem, 2vw, 0.85rem); font-weight: 600;">Einkaufen</span>
            <span style="background: rgba(190, 205, 163, 0.3); color: #474747; padding: 0.4rem 0.8rem; border-radius: 1rem; font-size: clamp(0.75rem, 2vw, 0.85rem);">Kochen</span>
            <span style="background: rgba(190, 205, 163, 0.3); color: #474747; padding: 0.4rem 0.8rem; border-radius: 1rem; font-size: clamp(0.75rem, 2vw, 0.85rem);">Haushalt</span>
          </div>
        </div>

        <!-- Bewertungstext -->
        <div style="background: #f8f8f8; border-radius: 0.8rem; padding: 1rem; margin-bottom: 1.5rem;">
          <p style="color: #474747; margin: 0; font-style: italic; font-size: clamp(0.8rem, 2.5vw, 0.9rem); line-height: 1.4;">
            "Maria ist sehr zuverlässig und freundlich. Hat bereits mehrmals perfekt eingekauft!" - Anna K.
          </p>
        </div>

        <!-- Verfügbarkeit -->
        <div style="margin-bottom: 1.5rem;">
          <h4 style="color: #474747; font-size: clamp(1rem, 3vw, 1.1rem); font-weight: 600; margin: 0 0 0.8rem 0;">Verfügbarkeit:</h4>
          <p style="color: #666; margin: 0; font-size: clamp(0.85rem, 2.5vw, 0.95rem);">
            <strong>Heute verfügbar</strong> bis 18:00 Uhr
          </p>
        </div>

        <!-- Preis -->
        <div style="background: rgba(190, 205, 163, 0.2); border-radius: 0.8rem; padding: 1rem; text-align: center;">
          <h4 style="color: #474747; font-size: clamp(1rem, 3vw, 1.1rem); font-weight: 600; margin: 0 0 0.3rem 0;">Ihr Angebot:</h4>
          <p style="color: #474747; font-size: clamp(1.1rem, 3.5vw, 1.3rem); font-weight: 700; margin: 0;">15€ für Einkaufen</p>
        </div>
      </div>

      <!-- Aktions-Buttons - GROSS -->
      <div style="display: flex; flex-direction: column; gap: 1rem; margin-bottom: 2rem;">
        <!-- Akzeptieren Button -->
        <button style="width: 100%; background: #BECDA3; color: #474747; padding: 1.8rem; border-radius: 1rem; border: none; font-weight: 700; font-size: clamp(1.2rem, 3.5vw, 1.4rem); box-shadow: 4px 4px 0px rgba(0,0,0,0.2); cursor: pointer; transform: rotate(1deg); transition: all 0.3s ease; box-sizing: border-box;">
          Maria beauftragen
        </button>
        
        <!-- Ablehnen Button -->
        <button style="width: 100%; background: white; color: #474747; padding: 1.5rem; border-radius: 1rem; border: 2px solid #ddd; font-weight: 600; font-size: clamp(1rem, 3vw, 1.2rem); cursor: pointer; transform: rotate(-0.5deg); box-sizing: border-box;">
          Anderen Helfer suchen
        </button>
      </div>

      <!-- Zusätzliche Infos -->
      <div style="background: white; border-radius: 1rem; padding: 1.5rem; box-shadow: 3px 3px 0px rgba(0,0,0,0.1);">
        <h4 style="color: #474747; font-size: clamp(1rem, 3vw, 1.1rem); font-weight: 600; margin: 0 0 1rem 0;">Ablauf:</h4>
        <div style="display: flex; flex-direction: column; gap: 0.8rem;">
          <div style="display: flex; align-items: center; gap: 0.8rem;">
            <div style="width: 2rem; height: 2rem; background: #BECDA3; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.8rem; font-weight: 700; color: #474747; flex-shrink: 0;">1</div>
            <span style="color: #474747; font-size: clamp(0.8rem, 2.5vw, 0.9rem);">Maria erhält Ihre Anfrage</span>
          </div>
          <div style="display: flex; align-items: center; gap: 0.8rem;">
            <div style="width: 2rem; height: 2rem; background: #BECDA3; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.8rem; font-weight: 700; color: #474747; flex-shrink: 0;">2</div>
            <span style="color: #474747; font-size: clamp(0.8rem, 2.5vw, 0.9rem);">Sie können per Chat kommunizieren</span>
          </div>
          <div style="display: flex; align-items: center; gap: 0.8rem;">
            <div style="width: 2rem; height: 2rem; background: #BECDA3; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.8rem; font-weight: 700; color: #474747; flex-shrink: 0;">3</div>
            <span style="color: #474747; font-size: clamp(0.8rem, 2.5vw, 0.9rem);">Bezahlung erst nach Auftragsabschluss</span>
          </div>
        </div>
      </div>

    </div>

    <!-- Bottom Navigation -->
    <nav style="position: fixed; bottom: 0; left: 0; right: 0; background: #474747; padding: 1rem 0; box-shadow: 0 -4px 6px rgba(0,0,0,0.1); width: 100%; box-sizing: border-box;">
      <div style="width: 100%; display: flex; justify-content: space-around; padding: 0 1rem; box-sizing: border-box;">
        <button style="background: none; border: none; color: rgba(255,255,255,0.6); display: flex; flex-direction: column; align-items: center; gap: 0.3rem; cursor: pointer; min-width: 0; flex: 1;">
          <img src="/icons/logo.svg" alt="Home" style="width: 1.5rem; height: 1.5rem; filter: brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%) opacity(60%);">
          <span style="font-size: clamp(0.7rem, 2vw, 0.8rem);">Home</span>
        </button>
        <button style="background: none; border: none; color: #BECDA3; display: flex; flex-direction: column; align-items: center; gap: 0.3rem; cursor: pointer; min-width: 0; flex: 1;">
          <img src="/icons/ZeitungJunge.svg" alt="Aufträge" style="width: 1.5rem; height: 1.5rem; filter: brightness(0) saturate(100%) invert(82%) sepia(14%) saturate(508%) hue-rotate(58deg) brightness(91%) contrast(88%);">
          <span style="font-size: clamp(0.7rem, 2vw, 0.8rem); font-weight: 600;">Aufträge</span>
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