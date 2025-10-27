<template>
  <div class="min-h-screen" style="background: #f5f5f5; font-family: 'Comic Sans MS', cursive, sans-serif; padding: 0; margin: 0;">
  
    <div style="width: 100%; max-width: 100%; margin: 0; padding: 1rem; box-sizing: border-box;">
      
      <!-- Status Banner -->
      <div style="background: #BECDA3; border-radius: 1rem; padding: 1.5rem; margin-bottom: 2rem; text-align: center; transform: rotate(-1deg); box-shadow: 3px 3px 0px rgba(0,0,0,0.1);">
        <div style="margin-bottom: 0.5rem;">
          <img src="/icons/einkaufenMadl.svg" alt="Einkaufen" style="width: clamp(2rem, 6vw, 2.5rem); height: clamp(2rem, 6vw, 2.5rem);">
        </div>
        <h2 style="color: #474747; font-size: clamp(1.2rem, 3.5vw, 1.4rem); font-weight: 700; margin: 0 0 0.5rem 0;">Maria ist unterwegs!</h2>
        <p style="color: #474747; margin: 0; font-size: clamp(0.9rem, 2.5vw, 1rem); font-weight: 600;">Ihr Einkauf wird gerade erledigt</p>
      </div>

      <!-- Helfer Info -->
      <div style="background: white; border-radius: 1rem; padding: 1.5rem; margin-bottom: 2rem; box-shadow: 3px 3px 0px rgba(0,0,0,0.1);">
        <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem;">
          <div style="width: 4rem; height: 4rem; background: #BECDA3; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
            <img src="/icons/verschiedeneMenschen.svg" alt="Maria" style="width: 2rem; height: 2rem;">
          </div>
          <div style="flex: 1; min-width: 0;">
            <h3 style="color: #474747; font-size: clamp(1.1rem, 3vw, 1.3rem); font-weight: 700; margin: 0 0 0.3rem 0;">Maria H.</h3>
            <div style="display: flex; align-items: center; gap: 0.3rem;">
              <span style="color: #BECDA3; font-size: clamp(0.9rem, 2.5vw, 1rem);">★★★★★</span>
              <span style="color: #666; font-size: clamp(0.75rem, 2vw, 0.85rem);">(47)</span>
            </div>
          </div>
          <button style="background: #BECDA3; color: #474747; padding: 0.8rem 1.2rem; border-radius: 0.5rem; border: none; font-weight: 600; cursor: pointer; font-size: clamp(0.8rem, 2.5vw, 0.9rem); flex-shrink: 0;">
            Chat
          </button>
        </div>

        <!-- Live-Status -->
        <div style="background: rgba(190, 205, 163, 0.2); border-radius: 0.8rem; padding: 1rem;">
          <h4 style="color: #474747; font-size: clamp(1rem, 3vw, 1.1rem); font-weight: 600; margin: 0 0 0.8rem 0; display: flex; align-items: center; gap: 0.5rem;">
            Live-Status
          </h4>
          <div style="display: flex; flex-direction: column; gap: 0.8rem;">
            <div style="display: flex; align-items: center; gap: 0.8rem;">
              <div style="width: 0.8rem; height: 0.8rem; background: #BECDA3; border-radius: 50%; animation: pulse 2s infinite; flex-shrink: 0;"></div>
              <span style="color: #474747; font-size: clamp(0.85rem, 2.5vw, 0.95rem);">15:23 - Im Supermarkt angekommen</span>
            </div>
            <div style="display: flex; align-items: center; gap: 0.8rem;">
              <div style="width: 0.8rem; height: 0.8rem; background: #ccc; border-radius: 50%; flex-shrink: 0;"></div>
              <span style="color: #666; font-size: clamp(0.85rem, 2.5vw, 0.95rem);">15:30 - Einkauf beendet (geschätzt)</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Auftragsdetails -->
      <div style="background: white; border-radius: 1rem; padding: 1.5rem; margin-bottom: 2rem; box-shadow: 3px 3px 0px rgba(0,0,0,0.1);">
        <h3 style="color: #474747; font-size: clamp(1rem, 3vw, 1.2rem); font-weight: 600; margin: 0 0 1rem 0;">Ihr Auftrag</h3>
        
        <div style="background: #f8f8f8; border-radius: 0.8rem; padding: 1rem; margin-bottom: 1rem;">
          <h4 style="color: #474747; font-size: clamp(0.9rem, 2.5vw, 1rem); font-weight: 600; margin: 0 0 0.5rem 0;">Einkaufsliste:</h4>
          <ul style="color: #666; margin: 0; padding-left: 1.2rem; font-size: clamp(0.85rem, 2.5vw, 0.95rem); line-height: 1.4;">
            <li>Milch (1 Liter)</li>
            <li>Vollkornbrot</li>
            <li>Äpfel (6 Stück)</li>
          </ul>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
          <div>
            <p style="color: #666; margin: 0; font-size: clamp(0.8rem, 2.5vw, 0.9rem);">Supermarkt Musterstraße</p>
            <p style="color: #666; margin: 0; font-size: clamp(0.8rem, 2.5vw, 0.9rem);">Vereinbart: 15€</p>
          </div>
          <div style="background: rgba(190, 205, 163, 0.2); padding: 0.5rem 1rem; border-radius: 0.5rem;">
            <span style="color: #474747; font-weight: 600; font-size: clamp(0.8rem, 2.5vw, 0.9rem);">15:23</span>
          </div>
        </div>
      </div>

      <!-- Chat Nachrichten (letzten 2) -->
      <div style="background: white; border-radius: 1rem; padding: 1.5rem; margin-bottom: 2rem; box-shadow: 3px 3px 0px rgba(0,0,0,0.1);">
        <h3 style="color: #474747; font-size: clamp(1rem, 3vw, 1.2rem); font-weight: 600; margin: 0 0 1rem 0;">Letzte Nachrichten</h3>
        
        <!-- Maria's Nachricht -->
        <div style="margin-bottom: 1rem;">
          <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.3rem;">
            <div style="width: 2rem; height: 2rem; background: #BECDA3; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
              <img src="/icons/verschiedeneMenschen.svg" alt="Maria" style="width: 1rem; height: 1rem;">
            </div>
            <span style="color: #474747; font-weight: 600; font-size: clamp(0.8rem, 2.5vw, 0.9rem);">Maria</span>
            <span style="color: #999; font-size: clamp(0.7rem, 2vw, 0.8rem);">15:25</span>
          </div>
          <div style="background: rgba(190, 205, 163, 0.2); padding: 0.8rem; border-radius: 0.8rem; margin-left: 2.5rem;">
            <p style="color: #474747; margin: 0; font-size: clamp(0.8rem, 2.5vw, 0.9rem);">Bin im Supermarkt! Die Äpfel sehen heute besonders gut aus</p>
          </div>
        </div>

        <!-- Ihre Antwort -->
        <div style="margin-bottom: 1rem;">
          <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.3rem; justify-content: flex-end;">
            <span style="color: #999; font-size: clamp(0.7rem, 2vw, 0.8rem);">15:26</span>
            <span style="color: #474747; font-weight: 600; font-size: clamp(0.8rem, 2.5vw, 0.9rem);">Sie</span>
            <div style="width: 2rem; height: 2rem; background: #474747; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
              <img src="/icons/verschiedeneMenschen.svg" alt="Sie" style="width: 1rem; height: 1rem; filter: brightness(0) invert(1);">
            </div>
          </div>
          <div style="background: #474747; color: white; padding: 0.8rem; border-radius: 0.8rem; margin-right: 2.5rem;">
            <p style="margin: 0; font-size: clamp(0.8rem, 2.5vw, 0.9rem);">Perfekt! Vielen Dank für die Info!</p>
          </div>
        </div>

        <button style="width: 100%; background: rgba(190, 205, 163, 0.3); color: #474747; padding: 1rem; border-radius: 0.8rem; border: 1px solid #BECDA3; cursor: pointer; font-weight: 600; font-size: clamp(0.9rem, 2.5vw, 1rem); box-sizing: border-box;">
          Chat öffnen
        </button>
      </div>

      <!-- Aktions-Buttons -->
      <div style="display: flex; flex-direction: column; gap: 1rem; margin-bottom: 2rem;">
        <!-- Auftrag erledigt Button -->
        <button style="width: 100%; background: #BECDA3; color: #474747; padding: 1.5rem; border-radius: 1rem; border: none; font-weight: 700; font-size: clamp(1.1rem, 3.5vw, 1.3rem); box-shadow: 4px 4px 0px rgba(0,0,0,0.2); cursor: pointer; transform: rotate(1deg); box-sizing: border-box;">
          Auftrag erledigt?
        </button>
        
        <!-- Problem melden -->
        <button style="width: 100%; background: white; color: #d32f2f; padding: 1rem; border-radius: 0.8rem; border: 2px solid #d32f2f; font-weight: 600; font-size: clamp(0.9rem, 2.5vw, 1rem); cursor: pointer; box-sizing: border-box;">
          Problem melden
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

<style>
@keyframes pulse {
  0% { opacity: 1; }
  50% { opacity: 0.4; }
  100% { opacity: 1; }
}
</style>