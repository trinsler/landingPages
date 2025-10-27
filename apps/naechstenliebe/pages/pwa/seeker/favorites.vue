<template>
  <div class="min-h-screen" style="background: #f5f5f5; font-family: 'Comic Sans MS', cursive, sans-serif; padding: 0; margin: 0;">
    
    <div style="width: 100%; max-width: 100%; margin: 0; padding: 1rem; box-sizing: border-box;">
      
      <!-- Info Header -->
      <div style="background: rgba(190, 205, 163, 0.2); border: 2px solid #BECDA3; border-radius: 1rem; padding: 1.5rem; margin-bottom: 2rem; text-align: center;">
        <div style="margin-bottom: 0.5rem;">
          <img src="/icons/verschiedeneMenschen.svg" alt="Favoriten" style="width: clamp(2rem, 6vw, 2.5rem); height: clamp(2rem, 6vw, 2.5rem);">
        </div>
        <h2 style="color: #474747; font-size: clamp(1.2rem, 3.5vw, 1.4rem); font-weight: 700; margin: 0 0 0.5rem 0;">Ihre bewährten Helfer</h2>
        <p style="color: #666; margin: 0; font-size: clamp(0.85rem, 2.5vw, 0.95rem);">Direkt beauftragen ohne neue Suche</p>
      </div>

      <!-- Favoriten Liste -->
      <div style="display: flex; flex-direction: column; gap: 1.5rem; margin-bottom: 2rem;">
        
        <!-- Favorit 1 - Maria -->
        <div style="background: white; border-radius: 1rem; padding: 1.5rem; box-shadow: 3px 3px 0px rgba(0,0,0,0.1); transform: rotate(-0.5deg);">
          <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
            <div style="width: 4rem; height: 4rem; background: #BECDA3; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
              <img src="/icons/verschiedeneMenschen.svg" alt="Maria" style="width: 2rem; height: 2rem;">
            </div>
            <div style="flex: 1; min-width: 0;">
              <h3 style="color: #474747; font-size: clamp(1.1rem, 3vw, 1.3rem); font-weight: 700; margin: 0 0 0.3rem 0;">Maria H.</h3>
              <div style="display: flex; align-items: center; gap: 0.3rem; margin-bottom: 0.3rem;">
                <span style="color: #BECDA3; font-size: clamp(0.9rem, 2.5vw, 1rem);">★★★★★</span>
                <span style="color: #666; font-size: clamp(0.75rem, 2vw, 0.85rem);">(47)</span>
              </div>
              <p style="color: #666; margin: 0; font-size: clamp(0.8rem, 2.5vw, 0.9rem);">0.3km • Einkaufen, Kochen</p>
            </div>
            <button style="background: none; border: none; color: #999; font-size: clamp(1rem, 3vw, 1.2rem); cursor: pointer; flex-shrink: 0;">♥</button>
          </div>

          <!-- Letzte Aufträge -->
          <div style="margin-bottom: 1rem;">
            <h4 style="color: #474747; font-size: clamp(0.9rem, 2.5vw, 1rem); font-weight: 600; margin: 0 0 0.5rem 0;">Letzte Aufträge:</h4>
            <div style="display: flex; flex-wrap: wrap; gap: 0.3rem;">
              <span style="background: rgba(190, 205, 163, 0.3); color: #474747; padding: 0.3rem 0.6rem; border-radius: 0.5rem; font-size: clamp(0.7rem, 2vw, 0.8rem);">Einkaufen (15€)</span>
              <span style="background: rgba(190, 205, 163, 0.3); color: #474747; padding: 0.3rem 0.6rem; border-radius: 0.5rem; font-size: clamp(0.7rem, 2vw, 0.8rem);">Kochen (25€)</span>
              <span style="background: rgba(190, 205, 163, 0.3); color: #474747; padding: 0.3rem 0.6rem; border-radius: 0.5rem; font-size: clamp(0.7rem, 2vw, 0.8rem);">Einkaufen (12€)</span>
            </div>
          </div>

          <!-- Aktions-Buttons -->
          <div style="display: flex; gap: 0.8rem;">
            <button style="flex: 1; background: #BECDA3; color: #474747; padding: 1rem; border-radius: 0.8rem; border: none; font-weight: 600; cursor: pointer; font-size: clamp(0.85rem, 2.5vw, 0.95rem); box-sizing: border-box;">
              Direkt beauftragen
            </button>
            <button style="background: rgba(190, 205, 163, 0.3); color: #474747; padding: 1rem; border-radius: 0.8rem; border: 1px solid #BECDA3; cursor: pointer; font-size: clamp(0.8rem, 2.5vw, 0.9rem); min-width: 3rem; display: flex; align-items: center; justify-content: center;">
              <img src="/icons/JungeHaeltHandy.svg" alt="Chat" style="width: 1.2rem; height: 1.2rem;">
            </button>
          </div>
        </div>

        <!-- Favorit 2 - Klaus -->
        <div style="background: white; border-radius: 1rem; padding: 1.5rem; box-shadow: 3px 3px 0px rgba(0,0,0,0.1); transform: rotate(0.5deg);">
          <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
            <div style="width: 4rem; height: 4rem; background: #BECDA3; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
              <img src="/icons/technikBanalcieren.svg" alt="Klaus" style="width: 2rem; height: 2rem;">
            </div>
            <div style="flex: 1; min-width: 0;">
              <h3 style="color: #474747; font-size: clamp(1.1rem, 3vw, 1.3rem); font-weight: 700; margin: 0 0 0.3rem 0;">Klaus B.</h3>
              <div style="display: flex; align-items: center; gap: 0.3rem; margin-bottom: 0.3rem;">
                <span style="color: #BECDA3; font-size: clamp(0.9rem, 2.5vw, 1rem);">★★★★★</span>
                <span style="color: #666; font-size: clamp(0.75rem, 2vw, 0.85rem);">(32)</span>
              </div>
              <p style="color: #666; margin: 0; font-size: clamp(0.8rem, 2.5vw, 0.9rem);">0.7km • Technik, Reparaturen</p>
            </div>
            <button style="background: none; border: none; color: #999; font-size: clamp(1rem, 3vw, 1.2rem); cursor: pointer; flex-shrink: 0;">♥</button>
          </div>

          <div style="margin-bottom: 1rem;">
            <h4 style="color: #474747; font-size: clamp(0.9rem, 2.5vw, 1rem); font-weight: 600; margin: 0 0 0.5rem 0;">Letzte Aufträge:</h4>
            <div style="display: flex; flex-wrap: wrap; gap: 0.3rem;">
              <span style="background: rgba(190, 205, 163, 0.3); color: #474747; padding: 0.3rem 0.6rem; border-radius: 0.5rem; font-size: clamp(0.7rem, 2vw, 0.8rem);">Technik-Setup (30€)</span>
              <span style="background: rgba(190, 205, 163, 0.3); color: #474747; padding: 0.3rem 0.6rem; border-radius: 0.5rem; font-size: clamp(0.7rem, 2vw, 0.8rem);">WLAN-Hilfe (20€)</span>
            </div>
          </div>

          <div style="display: flex; gap: 0.8rem;">
            <button style="flex: 1; background: #BECDA3; color: #474747; padding: 1rem; border-radius: 0.8rem; border: none; font-weight: 600; cursor: pointer; font-size: clamp(0.85rem, 2.5vw, 0.95rem); box-sizing: border-box;">
              Direkt beauftragen
            </button>
            <button style="background: rgba(190, 205, 163, 0.3); color: #474747; padding: 1rem; border-radius: 0.8rem; border: 1px solid #BECDA3; cursor: pointer; font-size: clamp(0.8rem, 2.5vw, 0.9rem); min-width: 3rem; display: flex; align-items: center; justify-content: center;">
              <img src="/icons/JungeHaeltHandy.svg" alt="Chat" style="width: 1.2rem; height: 1.2rem;">
            </button>
          </div>
        </div>

        <!-- Favorit 3 - Anna -->
        <div style="background: white; border-radius: 1rem; padding: 1.5rem; box-shadow: 3px 3px 0px rgba(0,0,0,0.1); transform: rotate(-0.3deg);">
          <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
            <div style="width: 4rem; height: 4rem; background: #BECDA3; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
              <img src="/icons/gießenBub.svg" alt="Anna" style="width: 2rem; height: 2rem;">
            </div>
            <div style="flex: 1; min-width: 0;">
              <h3 style="color: #474747; font-size: clamp(1.1rem, 3vw, 1.3rem); font-weight: 700; margin: 0 0 0.3rem 0;">Anna K.</h3>
              <div style="display: flex; align-items: center; gap: 0.3rem; margin-bottom: 0.3rem;">
                <span style="color: #BECDA3; font-size: clamp(0.9rem, 2.5vw, 1rem);">★★★★★</span>
                <span style="color: #666; font-size: clamp(0.75rem, 2vw, 0.85rem);">(28)</span>
              </div>
              <p style="color: #666; margin: 0; font-size: clamp(0.8rem, 2.5vw, 0.9rem);">0.5km • Gassigehen, Garten</p>
            </div>
            <button style="background: none; border: none; color: #999; font-size: clamp(1rem, 3vw, 1.2rem); cursor: pointer; flex-shrink: 0;">♥</button>
          </div>

          <div style="margin-bottom: 1rem;">
            <h4 style="color: #474747; font-size: clamp(0.9rem, 2.5vw, 1rem); font-weight: 600; margin: 0 0 0.5rem 0;">Letzte Aufträge:</h4>
            <div style="display: flex; flex-wrap: wrap; gap: 0.3rem;">
              <span style="background: rgba(190, 205, 163, 0.3); color: #474747; padding: 0.3rem 0.6rem; border-radius: 0.5rem; font-size: clamp(0.7rem, 2vw, 0.8rem);">Gassigehen (18€)</span>
              <span style="background: rgba(190, 205, 163, 0.3); color: #474747; padding: 0.3rem 0.6rem; border-radius: 0.5rem; font-size: clamp(0.7rem, 2vw, 0.8rem);">Pflanzen gießen (10€)</span>
            </div>
          </div>

          <div style="display: flex; gap: 0.8rem;">
            <button style="flex: 1; background: #BECDA3; color: #474747; padding: 1rem; border-radius: 0.8rem; border: none; font-weight: 600; cursor: pointer; font-size: clamp(0.85rem, 2.5vw, 0.95rem); box-sizing: border-box;">
              Direkt beauftragen
            </button>
            <button style="background: rgba(190, 205, 163, 0.3); color: #474747; padding: 1rem; border-radius: 0.8rem; border: 1px solid #BECDA3; cursor: pointer; font-size: clamp(0.8rem, 2.5vw, 0.9rem); min-width: 3rem; display: flex; align-items: center; justify-content: center;">
              <img src="/icons/JungeHaeltHandy.svg" alt="Chat" style="width: 1.2rem; height: 1.2rem;">
            </button>
          </div>
        </div>
      </div>

      <!-- Neue Favoriten finden -->
      <div style="background: white; border-radius: 1rem; padding: 1.5rem; box-shadow: 3px 3px 0px rgba(0,0,0,0.1); text-align: center;">
        <h3 style="color: #474747; font-size: clamp(1rem, 3vw, 1.2rem); font-weight: 600; margin: 0 0 1rem 0;">Neue Helfer entdecken</h3>
        <p style="color: #666; margin: 0 0 1.5rem 0; font-size: clamp(0.85rem, 2.5vw, 0.95rem);">Finden Sie weitere zuverlässige Helfer in Ihrer Nähe</p>
        
        <button style="background: #474747; color: white; padding: 1.2rem 2rem; border-radius: 0.8rem; border: none; font-weight: 600; cursor: pointer; font-size: clamp(0.9rem, 2.5vw, 1rem); transform: rotate(1deg);">
          Helfer suchen
        </button>
      </div>

    </div>

    <!-- Bottom Navigation -->
    <nav style="position: fixed; bottom: 0; left: 0; right: 0; background: #474747; padding: 1rem 0; box-shadow: 0 -4px 6px rgba(0,0,0,0.1); width: 100%; box-sizing: border-box;">
      <div style="width: 100%; display: flex; justify-content: space-around; padding: 0 1rem; box-sizing: border-box;">
        <button style="background: none; border: none; color: rgba(255,255,255,0.6); display: flex; flex-direction: column; align-items: center; gap: 0.3rem; cursor: pointer; min-width: 0; flex: 1;">
          <img src="/icons/logo.svg" alt="Home" style="width: 1.5rem; height: 1.5rem; filter: brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%) opacity(60%);">
          <span style="font-size: clamp(0.7rem, 2vw, 0.8rem);">Home</span>
        </button>
        <button style="background: none; border: none; color: rgba(255,255,255,0.6); display: flex; flex-direction: column; align-items: center; gap: 0.3rem; cursor: pointer; min-width: 0; flex: 1;">
          <img src="/icons/ZeitungJunge.svg" alt="Aufträge" style="width: 1.5rem; height: 1.5rem; filter: brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%) opacity(60%);">
          <span style="font-size: clamp(0.7rem, 2vw, 0.8rem);">Aufträge</span>
        </button>
        <button style="background: none; border: none; color: #BECDA3; display: flex; flex-direction: column; align-items: center; gap: 0.3rem; cursor: pointer; min-width: 0; flex: 1;">
          <img src="/icons/verschiedeneMenschen.svg" alt="Favoriten" style="width: 1.5rem; height: 1.5rem; filter: brightness(0) saturate(100%) invert(82%) sepia(14%) saturate(508%) hue-rotate(58deg) brightness(91%) contrast(88%);">
          <span style="font-size: clamp(0.7rem, 2vw, 0.8rem); font-weight: 600;">Favoriten</span>
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