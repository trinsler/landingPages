<template>
  <footer style="background: #474747; color: white; padding: 0; position: relative;">
    <!-- Kreide-Spuren im Hintergrund wie in Hero -->
    <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-image: repeating-linear-gradient(to bottom, transparent, transparent 3rem, rgba(255,255,255,0.03) 3rem, rgba(255,255,255,0.03) 3.1rem); opacity: 0.6;"></div>
    
    <div style="max-width: 80rem; margin: 0 auto; position: relative; z-index: 2; padding: 6rem 1.5rem 4rem;">
      <!-- Main Footer Content -->
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 4rem; margin-bottom: 4rem; text-align: left;">
        <!-- Company Info -->
        <div>
          <div style="display: flex; align-items: center; margin-bottom: 2rem;">
            <img src="/icons/logo.svg" alt="Mein.Nachbar Logo" style="width: 3rem; height: 3rem; margin-right: 1.5rem; border-radius: 0.5rem;">
            <span style="font-size: 2rem; font-weight: 800; font-family: 'Comic Sans MS', cursive, sans-serif; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">Mein.Nachbar</span>
          </div>
          <div style="background: rgba(255,255,255,0.05); border: 2px solid rgba(255,255,255,0.1); padding: 2rem; transform: rotate(-1deg); box-shadow: 0 10px 30px rgba(0,0,0,0.15); position: relative; backdrop-filter: blur(10px); margin-bottom: 2rem;">
            <!-- Abgerissenes Eck -->
            <div style="position: absolute; top: 0; right: 0; width: 25px; height: 25px; background: #474747; clip-path: polygon(100% 0, 0 100%, 100% 100%);"></div>
            
            <p style="color: rgba(255,255,255,0.9); line-height: 1.7; margin: 0; font-family: 'Comic Sans MS', cursive, sans-serif; font-size: 1.1rem;">
              Die lokale Community-App, die Generationen verbindet und Nachbarschaftshilfe einfach macht.
            </p>
          </div>
          <div style="display: flex; gap: 1.5rem;">
            <div style="width: 2.5rem; height: 2.5rem; background: #8F8B82; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; font-family: 'Comic Sans MS', cursive, sans-serif; font-size: 1rem;">f</div>
            <div style="width: 2.5rem; height: 2.5rem; background: #8F8B82; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; font-family: 'Comic Sans MS', cursive, sans-serif; font-size: 1rem;">t</div>
            <div style="width: 2.5rem; height: 2.5rem; background: #8F8B82; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; font-family: 'Comic Sans MS', cursive, sans-serif; font-size: 1rem;">i</div>
          </div>
        </div>

        <!-- Product -->
        <div>
          <div style="background: rgba(255,255,255,0.05); border: 2px solid rgba(255,255,255,0.1); padding: 2rem; transform: rotate(1deg); box-shadow: 0 10px 30px rgba(0,0,0,0.15); position: relative; backdrop-filter: blur(10px); margin-bottom: 2rem;">
            <!-- Abgerissenes Eck -->
            <div style="position: absolute; top: 0; right: 0; width: 25px; height: 25px; background: #474747; clip-path: polygon(100% 0, 0 100%, 100% 100%);"></div>
            
            <h3 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 1.5rem; font-family: 'Comic Sans MS', cursive, sans-serif; color: white; text-shadow: 1px 1px 2px rgba(0,0,0,0.3);">Produkt</h3>
            <ul style="list-style: none; padding: 0; margin: 0;">
              <li style="margin-bottom: 1.2rem;"><a href="#funktionen" style="color: rgba(255,255,255,0.8); text-decoration: none; font-family: 'Comic Sans MS', cursive, sans-serif; font-size: 1.1rem;">Funktionen</a></li>
              <li style="margin-bottom: 1.2rem;"><a href="#fuer-hilfesuchende" style="color: rgba(255,255,255,0.8); text-decoration: none; font-family: 'Comic Sans MS', cursive, sans-serif; font-size: 1.1rem;">Für Hilfesuchende</a></li>
              <li style="margin-bottom: 1.2rem;"><a href="#fuer-helfende" style="color: rgba(255,255,255,0.8); text-decoration: none; font-family: 'Comic Sans MS', cursive, sans-serif; font-size: 1.1rem;">Für Helfende</a></li>
              <li style="margin-bottom: 1.2rem;"><a href="https://trinsler.com" style="color: rgba(255,255,255,0.8); text-decoration: none; font-family: 'Comic Sans MS', cursive, sans-serif; font-size: 1.1rem;">Preise</a></li>
              <li><a href="https://trinsler.com" style="color: rgba(255,255,255,0.8); text-decoration: none; font-family: 'Comic Sans MS', cursive, sans-serif; font-size: 1.1rem;">App Download</a></li>
            </ul>
          </div>
        </div>

        <!-- Company -->
        <div>
          <div style="background: rgba(255,255,255,0.05); border: 2px solid rgba(255,255,255,0.1); padding: 2rem; transform: rotate(-2deg); box-shadow: 0 10px 30px rgba(0,0,0,0.15); position: relative; backdrop-filter: blur(10px); margin-bottom: 2rem;">
            <!-- Abgerissenes Eck -->
            <div style="position: absolute; top: 0; right: 0; width: 25px; height: 25px; background: #474747; clip-path: polygon(100% 0, 0 100%, 100% 100%);"></div>
            
            <h3 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 1.5rem; font-family: 'Comic Sans MS', cursive, sans-serif; color: white; text-shadow: 1px 1px 2px rgba(0,0,0,0.3);">Unternehmen</h3>
            <ul style="list-style: none; padding: 0; margin: 0;">
              <li style="margin-bottom: 1.2rem;"><a href="https://trinsler.com" style="color: rgba(255,255,255,0.8); text-decoration: none; font-family: 'Comic Sans MS', cursive, sans-serif; font-size: 1.1rem;">Über uns</a></li>
              <li style="margin-bottom: 1.2rem;"><a href="https://trinsler.com" style="color: rgba(255,255,255,0.8); text-decoration: none; font-family: 'Comic Sans MS', cursive, sans-serif; font-size: 1.1rem;">Karriere</a></li>
              <li style="margin-bottom: 1.2rem;"><a href="https://trinsler.com" style="color: rgba(255,255,255,0.8); text-decoration: none; font-family: 'Comic Sans MS', cursive, sans-serif; font-size: 1.1rem;">Presse</a></li>
              <li><a href="https://trinsler.com" style="color: rgba(255,255,255,0.8); text-decoration: none; font-family: 'Comic Sans MS', cursive, sans-serif; font-size: 1.1rem;">Blog</a></li>
            </ul>
          </div>
        </div>

        <!-- Legal -->
        <div>
          <div style="background: rgba(255,255,255,0.05); border: 2px solid rgba(255,255,255,0.1); padding: 2rem; transform: rotate(1deg); box-shadow: 0 10px 30px rgba(0,0,0,0.15); position: relative; backdrop-filter: blur(10px); margin-bottom: 2rem;">
            <!-- Abgerissenes Eck -->
            <div style="position: absolute; top: 0; right: 0; width: 25px; height: 25px; background: #474747; clip-path: polygon(100% 0, 0 100%, 100% 100%);"></div>
            
            <h3 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 1.5rem; font-family: 'Comic Sans MS', cursive, sans-serif; color: white; text-shadow: 1px 1px 2px rgba(0,0,0,0.3);">Rechtliches</h3>
            <ul style="list-style: none; padding: 0; margin: 0;">
              <li style="margin-bottom: 1.2rem;"><a href="https://trinsler.com" style="color: rgba(255,255,255,0.8); text-decoration: none; font-family: 'Comic Sans MS', cursive, sans-serif; font-size: 1.1rem;">Datenschutz</a></li>
              <li style="margin-bottom: 1.2rem;"><a href="https://trinsler.com" style="color: rgba(255,255,255,0.8); text-decoration: none; font-family: 'Comic Sans MS', cursive, sans-serif; font-size: 1.1rem;">AGB</a></li>
              <li style="margin-bottom: 1.2rem;"><a href="https://trinsler.com" style="color: rgba(255,255,255,0.8); text-decoration: none; font-family: 'Comic Sans MS', cursive, sans-serif; font-size: 1.1rem;">Impressum</a></li>
              <li><a href="https://trinsler.com" style="color: rgba(255,255,255,0.8); text-decoration: none; font-family: 'Comic Sans MS', cursive, sans-serif; font-size: 1.1rem;">Kontakt</a></li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div style="background: rgba(255,255,255,0.05); border: 2px solid rgba(255,255,255,0.1); padding: 2rem 3rem; transform: rotate(1deg); box-shadow: 0 10px 30px rgba(0,0,0,0.15); position: relative; backdrop-filter: blur(10px); text-align: center;">
        <!-- Abgerissenes Eck -->
        <div style="position: absolute; top: 0; right: 0; width: 30px; height: 30px; background: #474747; clip-path: polygon(100% 0, 0 100%, 100% 100%);"></div>
        
        <div style="display: flex; align-items: center; justify-content: center; gap: 3rem; margin-bottom: 1.5rem;">
          <img src="/icons/logo.svg" alt="Mein.Nachbar Logo" style="width: 120px; height: 120px;">
          <div>
            <p style="color: rgba(255,255,255,0.9); margin-bottom: 0.5rem; font-family: 'Comic Sans MS', cursive, sans-serif; font-size: 1.4rem; font-weight: 700; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">
              © 2025 Mein.Nachbar. Alle Rechte vorbehalten.
            </p>
            <div style="display: flex; justify-content: center; gap: 2rem; font-size: 1rem; font-family: 'Comic Sans MS', cursive, sans-serif;">
              <span style="color: rgba(255,255,255,0.7);">Deutschland</span>
              <span style="color: rgba(255,255,255,0.5);">•</span>
              <span style="color: rgba(255,255,255,0.7);">Est. 2025</span>
              <span style="color: rgba(255,255,255,0.5);">•</span>
              <span style="color: rgba(255,255,255,0.7);">Made with Love in Germany</span>
            </div>
          </div>
          <img src="/icons/logo.svg" alt="Mein.Nachbar Logo" style="width: 120px; height: 120px;">
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
// Footer Component
</script>