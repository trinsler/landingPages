<template>
  <div class="min-h-screen" style="background: #f5f5f5; font-family: 'Comic Sans MS', cursive, sans-serif; padding: 0; margin: 0;">
    
    <div style="width: 100%; max-width: 100%; margin: 0; padding: 1rem; box-sizing: border-box;">
      
      <!-- Statistiken Header -->
      <div style="background: white; border-radius: 1rem; padding: 1.5rem; margin-bottom: 2rem; box-shadow: 3px 3px 0px rgba(0,0,0,0.1);">
        <h2 style="color: #474747; font-size: clamp(1.2rem, 3.5vw, 1.4rem); font-weight: 700; margin: 0 0 1rem 0; text-align: center;">Ihre Statistiken</h2>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem; text-align: center;">
          <div style="background: rgba(190, 205, 163, 0.2); border-radius: 0.8rem; padding: 1rem;">
            <div style="font-size: clamp(1.4rem, 5vw, 1.8rem); font-weight: 700; color: #474747; margin-bottom: 0.3rem;">47</div>
            <div style="font-size: clamp(0.7rem, 2vw, 0.8rem); color: #666;">Aufträge</div>
          </div>
          <div style="background: rgba(190, 205, 163, 0.2); border-radius: 0.8rem; padding: 1rem;">
            <div style="font-size: clamp(1.4rem, 5vw, 1.8rem); font-weight: 700; color: #474747; margin-bottom: 0.3rem;">4.9</div>
            <div style="font-size: clamp(0.7rem, 2vw, 0.8rem); color: #666;">Bewertung</div>
          </div>
          <div style="background: rgba(190, 205, 163, 0.2); border-radius: 0.8rem; padding: 1rem;">
            <div style="font-size: clamp(1.4rem, 5vw, 1.8rem); font-weight: 700; color: #474747; margin-bottom: 0.3rem;">8</div>
            <div style="font-size: clamp(0.7rem, 2vw, 0.8rem); color: #666;">Favoriten</div>
          </div>
        </div>
      </div>

      <!-- Filter -->
      <div style="background: white; border-radius: 1rem; padding: 1rem; margin-bottom: 2rem; box-shadow: 3px 3px 0px rgba(0,0,0,0.1);">
        <h3 style="color: #474747; font-size: clamp(1rem, 3vw, 1.1rem); font-weight: 600; margin: 0 0 1rem 0;">Filter</h3>
        
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <button style="background: #BECDA3; color: #474747; padding: 0.6rem 1rem; border-radius: 0.5rem; border: none; font-weight: 600; cursor: pointer; font-size: clamp(0.75rem, 2vw, 0.85rem);">
            Alle
          </button>
          <button style="background: rgba(190, 205, 163, 0.3); color: #474747; padding: 0.6rem 1rem; border-radius: 0.5rem; border: 1px solid #BECDA3; cursor: pointer; font-size: clamp(0.75rem, 2vw, 0.85rem);">
            Diese Woche
          </button>
          <button style="background: rgba(190, 205, 163, 0.3); color: #474747; padding: 0.6rem 1rem; border-radius: 0.5rem; border: 1px solid #BECDA3; cursor: pointer; font-size: clamp(0.75rem, 2vw, 0.85rem);">
            Einkaufen
          </button>
          <button style="background: rgba(190, 205, 163, 0.3); color: #474747; padding: 0.6rem 1rem; border-radius: 0.5rem; border: 1px solid #BECDA3; cursor: pointer; font-size: clamp(0.75rem, 2vw, 0.85rem);">
            Kochen
          </button>
        </div>
      </div>

      <!-- Verlauf Liste -->
      <div style="display: flex; flex-direction: column; gap: 1rem; margin-bottom: 2rem;">
        
        <!-- Heute -->
        <div style="margin-bottom: 1rem;">
          <h4 style="color: #474747; font-size: clamp(0.9rem, 2.5vw, 1rem); font-weight: 600; margin: 0 0 0.8rem 0; padding-left: 0.5rem;">Heute</h4>
          
          <!-- Auftrag 1 - Aktuell -->
          <div style="background: white; border-radius: 1rem; padding: 1.5rem; box-shadow: 3px 3px 0px rgba(0,0,0,0.1); border-left: 4px solid #BECDA3;">
            <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
              <img src="/icons/einkaufenMadl.svg" alt="Einkaufen" style="width: 3rem; height: 3rem; flex-shrink: 0;">
              <div style="flex: 1; min-width: 0;">
                <h5 style="color: #474747; font-size: clamp(1rem, 2.5vw, 1.1rem); font-weight: 600; margin: 0 0 0.3rem 0;">Einkaufen</h5>
                <p style="color: #666; margin: 0; font-size: clamp(0.8rem, 2.5vw, 0.9rem);">Maria H. • 15:23</p>
              </div>
              <div style="text-align: right; flex-shrink: 0;">
                <div style="background: #BECDA3; color: #474747; padding: 0.3rem 0.8rem; border-radius: 1rem; font-size: clamp(0.7rem, 2vw, 0.8rem); font-weight: 600; margin-bottom: 0.3rem;">
                  Erledigt
                </div>
                <div style="color: #474747; font-weight: 600; font-size: clamp(0.8rem, 2.5vw, 0.9rem);">15€</div>
              </div>
            </div>
            
            <div style="background: #f8f8f8; border-radius: 0.5rem; padding: 0.8rem; margin-bottom: 1rem;">
              <p style="color: #666; margin: 0; font-size: clamp(0.75rem, 2vw, 0.85rem); font-style: italic;">
                "Milch, Brot und Äpfel vom Supermarkt"
              </p>
            </div>
            
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
              <div style="display: flex; align-items: center; gap: 0.3rem;">
                <span style="color: #BECDA3; font-size: clamp(0.8rem, 2.5vw, 0.9rem);">★★★★★</span>
                <span style="color: #666; font-size: clamp(0.7rem, 2vw, 0.8rem);">Ihre Bewertung</span>
              </div>
              <button style="background: rgba(190, 205, 163, 0.3); color: #474747; padding: 0.5rem 1rem; border-radius: 0.5rem; border: 1px solid #BECDA3; cursor: pointer; font-size: clamp(0.7rem, 2vw, 0.8rem);">
                Details
              </button>
            </div>
          </div>
        </div>

        <!-- Gestern -->
        <div style="margin-bottom: 1rem;">
          <h4 style="color: #474747; font-size: clamp(0.9rem, 2.5vw, 1rem); font-weight: 600; margin: 0 0 0.8rem 0; padding-left: 0.5rem;">Gestern</h4>
          
          <!-- Auftrag 2 -->
          <div style="background: white; border-radius: 1rem; padding: 1.5rem; box-shadow: 3px 3px 0px rgba(0,0,0,0.1);">
            <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
              <img src="/icons/kochen.svg" alt="Kochen" style="width: 3rem; height: 3rem; flex-shrink: 0;">
              <div style="flex: 1; min-width: 0;">
                <h5 style="color: #474747; font-size: clamp(1rem, 2.5vw, 1.1rem); font-weight: 600; margin: 0 0 0.3rem 0;">Kochen</h5>
                <p style="color: #666; margin: 0; font-size: clamp(0.8rem, 2.5vw, 0.9rem);">Maria H. • 18:00</p>
              </div>
              <div style="text-align: right; flex-shrink: 0;">
                <div style="background: rgba(190, 205, 163, 0.3); color: #474747; padding: 0.3rem 0.8rem; border-radius: 1rem; font-size: clamp(0.7rem, 2vw, 0.8rem); font-weight: 600; margin-bottom: 0.3rem;">
                  Erledigt
                </div>
                <div style="color: #474747; font-weight: 600; font-size: clamp(0.8rem, 2.5vw, 0.9rem);">25€</div>
              </div>
            </div>
            
            <div style="background: #f8f8f8; border-radius: 0.5rem; padding: 0.8rem; margin-bottom: 1rem;">
              <p style="color: #666; margin: 0; font-size: clamp(0.75rem, 2vw, 0.85rem); font-style: italic;">
                "Traditionelles Schnitzel mit Kartoffelsalat zubereiten"
              </p>
            </div>
            
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
              <div style="display: flex; align-items: center; gap: 0.3rem;">
                <span style="color: #BECDA3; font-size: clamp(0.8rem, 2.5vw, 0.9rem);">★★★★★</span>
                <span style="color: #666; font-size: clamp(0.7rem, 2vw, 0.8rem);">Ihre Bewertung</span>
              </div>
              <button style="background: rgba(190, 205, 163, 0.3); color: #474747; padding: 0.5rem 1rem; border-radius: 0.5rem; border: 1px solid #BECDA3; cursor: pointer; font-size: clamp(0.7rem, 2vw, 0.8rem);">
                Details
              </button>
            </div>
          </div>
        </div>

        <!-- Diese Woche -->
        <div style="margin-bottom: 1rem;">
          <h4 style="color: #474747; font-size: clamp(0.9rem, 2.5vw, 1rem); font-weight: 600; margin: 0 0 0.8rem 0; padding-left: 0.5rem;">Diese Woche</h4>
          
          <!-- Auftrag 3 -->
          <div style="background: white; border-radius: 1rem; padding: 1.5rem; box-shadow: 3px 3px 0px rgba(0,0,0,0.1);">
            <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
              <img src="/icons/technikBanalcieren.svg" alt="Technik" style="width: 3rem; height: 3rem; flex-shrink: 0;">
              <div style="flex: 1; min-width: 0;">
                <h5 style="color: #474747; font-size: clamp(1rem, 2.5vw, 1.1rem); font-weight: 600; margin: 0 0 0.3rem 0;">Technik-Hilfe</h5>
                <p style="color: #666; margin: 0; font-size: clamp(0.8rem, 2.5vw, 0.9rem);">Klaus B. • Montag</p>
              </div>
              <div style="text-align: right; flex-shrink: 0;">
                <div style="background: rgba(190, 205, 163, 0.3); color: #474747; padding: 0.3rem 0.8rem; border-radius: 1rem; font-size: clamp(0.7rem, 2vw, 0.8rem); font-weight: 600; margin-bottom: 0.3rem;">
                  Erledigt
                </div>
                <div style="color: #474747; font-weight: 600; font-size: clamp(0.8rem, 2.5vw, 0.9rem);">30€</div>
              </div>
            </div>
            
            <div style="background: #f8f8f8; border-radius: 0.5rem; padding: 0.8rem; margin-bottom: 1rem;">
              <p style="color: #666; margin: 0; font-size: clamp(0.75rem, 2vw, 0.85rem); font-style: italic;">
                "Neuen Smart-TV einrichten und WLAN-Probleme lösen"
              </p>
            </div>
            
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
              <div style="display: flex; align-items: center; gap: 0.3rem;">
                <span style="color: #BECDA3; font-size: clamp(0.8rem, 2.5vw, 0.9rem);">★★★★★</span>
                <span style="color: #666; font-size: clamp(0.7rem, 2vw, 0.8rem);">Ihre Bewertung</span>
              </div>
              <button style="background: rgba(190, 205, 163, 0.3); color: #474747; padding: 0.5rem 1rem; border-radius: 0.5rem; border: 1px solid #BECDA3; cursor: pointer; font-size: clamp(0.7rem, 2vw, 0.8rem);">
                Details
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Mehr laden Button -->
      <button style="width: 100%; background: white; color: #474747; padding: 1.2rem; border-radius: 1rem; border: 2px solid #BECDA3; cursor: pointer; font-weight: 600; font-size: clamp(0.9rem, 2.5vw, 1rem); margin-bottom: 2rem; box-sizing: border-box;">
        Weitere Aufträge laden
      </button>

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