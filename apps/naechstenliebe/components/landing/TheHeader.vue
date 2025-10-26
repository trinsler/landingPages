<template>
  <header style="background: #474747; position: fixed; top: 0; left: 0; right: 0; height: 10vh; z-index: 1000; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
    <!-- Kreide-Spuren im Hintergrund wie in Hero -->
    <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-image: repeating-linear-gradient(to bottom, transparent, transparent 3rem, rgba(255,255,255,0.03) 3rem, rgba(255,255,255,0.03) 3.1rem); opacity: 0.6;"></div>
    
    <nav style="max-width: 100rem; margin: 0 auto; padding: 0 2rem; height: 100%; display: flex; justify-content: flex-start; align-items: center; position: relative; z-index: 2;">
      <!-- Logo Bereich -->
      <div style="display: flex; align-items: center; flex: 0 0 auto;">
        <img src="/icons/logo.svg" alt="Mein.Nachbar Logo" style="width: 10rem; height: auto; max-height: 9vh;">
      </div>
      
      <!-- Navigation -->
      <div style="display: flex; gap: 3rem; align-items: center; margin-left: auto;">
        <a href="#funktionen" style="color: white; text-decoration: none; font-weight: 500; font-size: 1rem; transition: color 0.3s ease; padding: 0.5rem 0; font-family: 'Comic Sans MS', cursive, sans-serif; text-shadow: 1px 1px 2px rgba(0,0,0,0.3);">
          Funktionen
        </a>
        <a href="#fuer-hilfesuchende" style="color: white; text-decoration: none; font-weight: 500; font-size: 1rem; transition: color 0.3s ease; padding: 0.5rem 0; font-family: 'Comic Sans MS', cursive, sans-serif; text-shadow: 1px 1px 2px rgba(0,0,0,0.3);">
          Unterstützung anfordern
        </a>
        <a href="#fuer-helfende" style="color: white; text-decoration: none; font-weight: 500; font-size: 1rem; transition: color 0.3s ease; padding: 0.5rem 0; font-family: 'Comic Sans MS', cursive, sans-serif; text-shadow: 1px 1px 2px rgba(0,0,0,0.3);">
          Helfen & verdienen
        </a>
        <button style="background: #BECDA3; color: #474747; padding: 1rem 2rem; border-radius: 0.5rem; border: none; font-weight: 700; font-size: 1.1rem; box-shadow: 3px 3px 0px rgba(0,0,0,0.1); transition: all 0.3s ease; cursor: pointer">
          App herunterladen
        </button>

      
      </div>
    </nav>
  </header>
</template>

<script setup>
// Header Navigation Component
</script>