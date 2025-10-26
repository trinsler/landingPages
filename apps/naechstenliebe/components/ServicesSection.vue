<template>
  <section style="background: #474747; padding: 4rem 1.5rem 12rem 1.5rem; position: relative;">
    <!-- Kreide-Spuren im Hintergrund wie in Hero -->
    <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-image: repeating-linear-gradient(to bottom, transparent, transparent 3rem, rgba(255,255,255,0.03) 3rem, rgba(255,255,255,0.03) 3.1rem); opacity: 0.6;"></div>
    
    <!-- Titel Bereich -->
    <div style="max-width: 80rem; margin: 0 auto; position: relative; z-index: 2;">
      <div style="text-align: center; margin-bottom: 6rem;">
        <div style="background: rgba(255,255,255,0.05); border: 2px solid rgba(255,255,255,0.1); padding: 2.5rem 4rem; display: inline-block; transform: rotate(-1deg); box-shadow: 0 10px 30px rgba(0,0,0,0.15); position: relative; backdrop-filter: blur(10px);">
          <!-- Abgerissenes Eck -->
          <div style="position: absolute; top: 0; right: 0; width: 25px; height: 25px; background: #474747; clip-path: polygon(100% 0, 0 100%, 100% 100%);"></div>

          <h2 style="font-size: 3rem; font-weight: 700; margin: 0; line-height: 1.2; color: white; font-family: 'Comic Sans MS', cursive, sans-serif; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">
            So können deine Mitmenschen dich unterstützen
          </h2>
        </div>

        <div style="background: #BECDA3; color: #474747; padding: 1.5rem 3rem; display: inline-block; transform: rotate(1deg); margin-top: 2rem; box-shadow: 0 10px 30px rgba(0,0,0,0.1); position: relative;">
          <!-- Abgerissenes Eck -->
          <div style="position: absolute; top: 0; right: 0; width: 20px; height: 20px; background: #474747; clip-path: polygon(100% 0, 0 100%, 100% 100%);"></div>

          <div style="display: flex; align-items: center; gap: 1.5rem;">
            <img src="/icons/logo.svg" alt="Mein.Nachbar Logo" style="width: 60px; height: 60px;">
            <p style="font-size: 1.3rem; margin: 0; font-weight: 600; font-family: 'Comic Sans MS', cursive, sans-serif;">
              Verschiedene Arten von Hilfe für den Alltag
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Services Karussell (volle Breite) -->
    <div style="width: 100%; overflow: hidden; margin-bottom: 8rem; position: relative; z-index: 2; padding: 3rem 0;">
      <div class="carousel-track" style="display: flex; gap: 3rem; will-change: transform;">
          <!-- Original cards -->
          <div style="background: rgba(255,255,255,0.05); border: 2px solid rgba(255,255,255,0.1); padding: 2rem; transform: rotate(-2deg); box-shadow: 0 10px 30px rgba(0,0,0,0.15); position: relative; text-align: center; backdrop-filter: blur(10px); min-width: 300px; flex-shrink: 0;">
            <div style="position: absolute; top: 0; right: 0; width: 25px; height: 25px; background: #474747; clip-path: polygon(100% 0, 0 100%, 100% 100%);"></div>
            <div style="position: absolute; top: -15px; left: 50%; transform: translateX(-50%) rotate(-2deg); background: #5F6F55; color: white; padding: 0.5rem 1.5rem; font-size: 0.9rem; font-weight: 600; font-family: 'Comic Sans MS', cursive, sans-serif; box-shadow: 2px 2px 0px rgba(0,0,0,0.2);">Beliebt!</div>
            <img src="/icons/einkaufenFrontalBub.svg" alt="Einkaufen" style="width: 180px; height: 180px; margin: 0 auto 1.5rem; object-fit: contain; filter: brightness(0) invert(1);">
            <h3 style="color: white; font-weight: 700; margin-bottom: 1rem; font-size: 1.2rem; font-family: 'Comic Sans MS', cursive, sans-serif; text-align: center; text-shadow: 1px 1px 2px rgba(0,0,0,0.3);">Einkaufen</h3>
            <p style="color: rgba(255,255,255,0.8); font-size: 1rem; margin: 0; font-family: 'Comic Sans MS', cursive, sans-serif;">Wocheneinkauf</p>
          </div>

          <div style="background: rgba(255,255,255,0.05); border: 2px solid rgba(255,255,255,0.1); padding: 2rem; transform: rotate(1deg); box-shadow: 0 10px 30px rgba(0,0,0,0.15); position: relative; text-align: center; backdrop-filter: blur(10px); min-width: 300px; flex-shrink: 0;">
            <div style="position: absolute; top: 0; right: 0; width: 25px; height: 25px; background: #474747; clip-path: polygon(100% 0, 0 100%, 100% 100%);"></div>
            <img src="/icons/gießenBub.svg" alt="Gartenarbeit" style="width: 180px; height: 180px; margin: 0 auto 1.5rem; object-fit: contain; filter: brightness(0) invert(1);">
            <h3 style="color: white; font-weight: 700; margin-bottom: 1rem; font-size: 1.2rem; font-family: 'Comic Sans MS', cursive, sans-serif; text-align: center; text-shadow: 1px 1px 2px rgba(0,0,0,0.3);">Gartenarbeit</h3>
            <p style="color: rgba(255,255,255,0.8); font-size: 1rem; margin: 0; font-family: 'Comic Sans MS', cursive, sans-serif;">Gießen & Pflege</p>
          </div>

          <div style="background: rgba(255,255,255,0.05); border: 2px solid rgba(255,255,255,0.1); padding: 2rem; transform: rotate(-1deg); box-shadow: 0 10px 30px rgba(0,0,0,0.15); position: relative; text-align: center; backdrop-filter: blur(10px); min-width: 300px; flex-shrink: 0;">
            <div style="position: absolute; top: 0; right: 0; width: 25px; height: 25px; background: #474747; clip-path: polygon(100% 0, 0 100%, 100% 100%);"></div>
            <img src="/icons/FrontalGassiJunge.svg" alt="Gassi gehen" style="width: 180px; height: 180px; margin: 0 auto 1.5rem; object-fit: contain; filter: brightness(0) invert(1);">
            <h3 style="color: white; font-weight: 700; margin-bottom: 1rem; font-size: 1.2rem; font-family: 'Comic Sans MS', cursive, sans-serif; text-align: center; text-shadow: 1px 1px 2px rgba(0,0,0,0.3);">Gassi gehen</h3>
            <p style="color: rgba(255,255,255,0.8); font-size: 1rem; margin: 0; font-family: 'Comic Sans MS', cursive, sans-serif;">Hunde spazieren</p>
          </div>

          <div style="background: rgba(255,255,255,0.05); border: 2px solid rgba(255,255,255,0.1); padding: 2rem; transform: rotate(2deg); box-shadow: 0 10px 30px rgba(0,0,0,0.15); position: relative; text-align: center; backdrop-filter: blur(10px); min-width: 300px; flex-shrink: 0;">
            <div style="position: absolute; top: 0; right: 0; width: 25px; height: 25px; background: #474747; clip-path: polygon(100% 0, 0 100%, 100% 100%);"></div>
            <img src="/icons/kochen.svg" alt="Kochen" style="width: 180px; height: 180px; margin: 0 auto 1.5rem; object-fit: contain; filter: brightness(0) invert(1);">
            <h3 style="color: white; font-weight: 700; margin-bottom: 1rem; font-size: 1.2rem; font-family: 'Comic Sans MS', cursive, sans-serif; text-align: center; text-shadow: 1px 1px 2px rgba(0,0,0,0.3);">Kochen</h3>
            <p style="color: rgba(255,255,255,0.8); font-size: 1rem; margin: 0; font-family: 'Comic Sans MS', cursive, sans-serif;">Mahlzeiten</p>
          </div>

          <div style="background: rgba(255,255,255,0.05); border: 2px solid rgba(255,255,255,0.1); padding: 2rem; transform: rotate(1deg); box-shadow: 0 10px 30px rgba(0,0,0,0.15); position: relative; text-align: center; backdrop-filter: blur(10px); min-width: 300px; flex-shrink: 0;">
            <div style="position: absolute; top: 0; right: 0; width: 25px; height: 25px; background: #474747; clip-path: polygon(100% 0, 0 100%, 100% 100%);"></div>
            <img src="/icons/staubsaugen.svg" alt="Hausarbeit" style="width: 180px; height: 180px; margin: 0 auto 1.5rem; object-fit: contain; filter: brightness(0) invert(1);">
            <h3 style="color: white; font-weight: 700; margin-bottom: 1rem; font-size: 1.2rem; font-family: 'Comic Sans MS', cursive, sans-serif; text-align: center; text-shadow: 1px 1px 2px rgba(0,0,0,0.3);">Hausarbeit</h3>
            <p style="color: rgba(255,255,255,0.8); font-size: 1rem; margin: 0; font-family: 'Comic Sans MS', cursive, sans-serif;">Putzen & Ordnung</p>
          </div>

          <div style="background: rgba(255,255,255,0.05); border: 2px solid rgba(255,255,255,0.1); padding: 2rem; transform: rotate(-2deg); box-shadow: 0 10px 30px rgba(0,0,0,0.15); position: relative; text-align: center; backdrop-filter: blur(10px); min-width: 300px; flex-shrink: 0;">
            <div style="position: absolute; top: 0; right: 0; width: 25px; height: 25px; background: #474747; clip-path: polygon(100% 0, 0 100%, 100% 100%);"></div>
            <div style="position: absolute; top: -15px; right: 10px; background: #8FA66E; color: white; padding: 0.5rem 1.5rem; font-size: 0.9rem; font-weight: 600; font-family: 'Comic Sans MS', cursive, sans-serif; box-shadow: 2px 2px 0px rgba(0,0,0,0.2); transform: rotate(5deg);">Neu!</div>
            <img src="/icons/technikBanalcieren.svg" alt="Technik" style="width: 180px; height: 180px; margin: 0 auto 1.5rem; object-fit: contain; filter: brightness(0) invert(1);">
            <h3 style="color: white; font-weight: 700; margin-bottom: 1rem; font-size: 1.2rem; font-family: 'Comic Sans MS', cursive, sans-serif; text-align: center; text-shadow: 1px 1px 2px rgba(0,0,0,0.3);">Technik-Hilfe</h3>
            <p style="color: rgba(255,255,255,0.8); font-size: 1rem; margin: 0; font-family: 'Comic Sans MS', cursive, sans-serif;">PC & Smartphone</p>
          </div>

          <div style="background: rgba(255,255,255,0.05); border: 2px solid rgba(255,255,255,0.1); padding: 2rem; transform: rotate(1deg); box-shadow: 0 10px 30px rgba(0,0,0,0.15); position: relative; text-align: center; backdrop-filter: blur(10px); min-width: 300px; flex-shrink: 0;">
            <div style="position: absolute; top: 0; right: 0; width: 25px; height: 25px; background: #474747; clip-path: polygon(100% 0, 0 100%, 100% 100%);"></div>
            <img src="/icons/PaketTragen.svg" alt="Besorgungen" style="width: 180px; height: 180px; margin: 0 auto 1.5rem; object-fit: contain; filter: brightness(0) invert(1);">
            <h3 style="color: white; font-weight: 700; margin-bottom: 1rem; font-size: 1.2rem; font-family: 'Comic Sans MS', cursive, sans-serif; text-align: center; text-shadow: 1px 1px 2px rgba(0,0,0,0.3);">Besorgungen</h3>
            <p style="color: rgba(255,255,255,0.8); font-size: 1rem; margin: 0; font-family: 'Comic Sans MS', cursive, sans-serif;">Pakete & Apotheke</p>
          </div>

          <div style="background: rgba(255,255,255,0.05); border: 2px solid rgba(255,255,255,0.1); padding: 2rem; transform: rotate(-1deg); box-shadow: 0 10px 30px rgba(0,0,0,0.15); position: relative; text-align: center; backdrop-filter: blur(10px); min-width: 300px; flex-shrink: 0;">
            <div style="position: absolute; top: 0; right: 0; width: 25px; height: 25px; background: #474747; clip-path: polygon(100% 0, 0 100%, 100% 100%);"></div>
            <img src="/icons/ZeitungJunge.svg" alt="Begleitung" style="width: 180px; height: 180px; margin: 0 auto 1.5rem; object-fit: contain; filter: brightness(0) invert(1);">
            <h3 style="color: white; font-weight: 700; margin-bottom: 1rem; font-size: 1.2rem; font-family: 'Comic Sans MS', cursive, sans-serif; text-align: center; text-shadow: 1px 1px 2px rgba(0,0,0,0.3);">Begleitung</h3>
            <p style="color: rgba(255,255,255,0.8); font-size: 1rem; margin: 0; font-family: 'Comic Sans MS', cursive, sans-serif;">Arzt & Behörde</p>
          </div>

          <div style="background: rgba(255,255,255,0.05); border: 2px solid rgba(255,255,255,0.1); padding: 2rem; transform: rotate(-2deg); box-shadow: 0 10px 30px rgba(0,0,0,0.15); position: relative; text-align: center; backdrop-filter: blur(10px); min-width: 300px; flex-shrink: 0;">
            <div style="position: absolute; top: 0; right: 0; width: 25px; height: 25px; background: #474747; clip-path: polygon(100% 0, 0 100%, 100% 100%);"></div>
            <img src="/icons/GassiGehenMadl.svg" alt="Gassi Gehen" style="width: 180px; height: 180px; margin: 0 auto 1.5rem; object-fit: contain; filter: brightness(0) invert(1);">
            <h3 style="color: white; font-weight: 700; margin-bottom: 1rem; font-size: 1.2rem; font-family: 'Comic Sans MS', cursive, sans-serif; text-align: center; text-shadow: 1px 1px 2px rgba(0,0,0,0.3);">Hunde betreuen</h3>
            <p style="color: rgba(255,255,255,0.8); font-size: 1rem; margin: 0; font-family: 'Comic Sans MS', cursive, sans-serif;">Gassi & Spiel</p>
          </div>

          <div style="background: rgba(255,255,255,0.05); border: 2px solid rgba(255,255,255,0.1); padding: 2rem; transform: rotate(1deg); box-shadow: 0 10px 30px rgba(0,0,0,0.15); position: relative; text-align: center; backdrop-filter: blur(10px); min-width: 300px; flex-shrink: 0;">
            <div style="position: absolute; top: 0; right: 0; width: 25px; height: 25px; background: #474747; clip-path: polygon(100% 0, 0 100%, 100% 100%);"></div>
            <img src="/icons/einpflanzenBub.svg" alt="Garten" style="width: 180px; height: 180px; margin: 0 auto 1.5rem; object-fit: contain; filter: brightness(0) invert(1);">
            <h3 style="color: white; font-weight: 700; margin-bottom: 1rem; font-size: 1.2rem; font-family: 'Comic Sans MS', cursive, sans-serif; text-align: center; text-shadow: 1px 1px 2px rgba(0,0,0,0.3);">Gartenpflege</h3>
            <p style="color: rgba(255,255,255,0.8); font-size: 1rem; margin: 0; font-family: 'Comic Sans MS', cursive, sans-serif;">Pflanzen & Garten</p>
          </div>

          <div style="background: rgba(255,255,255,0.05); border: 2px solid rgba(255,255,255,0.1); padding: 2rem; transform: rotate(-1deg); box-shadow: 0 10px 30px rgba(0,0,0,0.15); position: relative; text-align: center; backdrop-filter: blur(10px); min-width: 300px; flex-shrink: 0;">
            <div style="position: absolute; top: 0; right: 0; width: 25px; height: 25px; background: #474747; clip-path: polygon(100% 0, 0 100%, 100% 100%);"></div>
            <img src="/icons/fensterPutzen.svg" alt="Fenster" style="width: 180px; height: 180px; margin: 0 auto 1.5rem; object-fit: contain; filter: brightness(0) invert(1);">
            <h3 style="color: white; font-weight: 700; margin-bottom: 1rem; font-size: 1.2rem; font-family: 'Comic Sans MS', cursive, sans-serif; text-align: center; text-shadow: 1px 1px 2px rgba(0,0,0,0.3);">Fensterputzen</h3>
            <p style="color: rgba(255,255,255,0.8); font-size: 1rem; margin: 0; font-family: 'Comic Sans MS', cursive, sans-serif;">Scheiben reinigen</p>
          </div>

          <div style="background: rgba(255,255,255,0.05); border: 2px solid rgba(255,255,255,0.1); padding: 2rem; transform: rotate(2deg); box-shadow: 0 10px 30px rgba(0,0,0,0.15); position: relative; text-align: center; backdrop-filter: blur(10px); min-width: 300px; flex-shrink: 0;">
            <div style="position: absolute; top: 0; right: 0; width: 25px; height: 25px; background: #474747; clip-path: polygon(100% 0, 0 100%, 100% 100%);"></div>
            <img src="/icons/bodenSchrubben.svg" alt="Boden" style="width: 180px; height: 180px; margin: 0 auto 1.5rem; object-fit: contain; filter: brightness(0) invert(1);">
            <h3 style="color: white; font-weight: 700; margin-bottom: 1rem; font-size: 1.2rem; font-family: 'Comic Sans MS', cursive, sans-serif; text-align: center; text-shadow: 1px 1px 2px rgba(0,0,0,0.3);">Bodenpflege</h3>
            <p style="color: rgba(255,255,255,0.8); font-size: 1rem; margin: 0; font-family: 'Comic Sans MS', cursive, sans-serif;">Schrubben & Wachsen</p>
          </div>

          <!-- Duplicate cards for seamless loop -->
          <div style="background: rgba(255,255,255,0.05); border: 2px solid rgba(255,255,255,0.1); padding: 2rem; transform: rotate(-2deg); box-shadow: 0 10px 30px rgba(0,0,0,0.15); position: relative; text-align: center; backdrop-filter: blur(10px); min-width: 300px; flex-shrink: 0;">
            <div style="position: absolute; top: 0; right: 0; width: 25px; height: 25px; background: #474747; clip-path: polygon(100% 0, 0 100%, 100% 100%);"></div>
            <div style="position: absolute; top: -15px; left: 50%; transform: translateX(-50%) rotate(-2deg); background: #5F6F55; color: white; padding: 0.5rem 1.5rem; font-size: 0.9rem; font-weight: 600; font-family: 'Comic Sans MS', cursive, sans-serif; box-shadow: 2px 2px 0px rgba(0,0,0,0.2);">Beliebt!</div>
            <img src="/icons/einkaufenFrontalBub.svg" alt="Einkaufen" style="width: 180px; height: 180px; margin: 0 auto 1.5rem; object-fit: contain; filter: brightness(0) invert(1);">
            <h3 style="color: white; font-weight: 700; margin-bottom: 1rem; font-size: 1.2rem; font-family: 'Comic Sans MS', cursive, sans-serif; text-align: center; text-shadow: 1px 1px 2px rgba(0,0,0,0.3);">Einkaufen</h3>
            <p style="color: rgba(255,255,255,0.8); font-size: 1rem; margin: 0; font-family: 'Comic Sans MS', cursive, sans-serif;">Wocheneinkauf</p>
          </div>

          <div style="background: rgba(255,255,255,0.05); border: 2px solid rgba(255,255,255,0.1); padding: 2rem; transform: rotate(1deg); box-shadow: 0 10px 30px rgba(0,0,0,0.15); position: relative; text-align: center; backdrop-filter: blur(10px); min-width: 300px; flex-shrink: 0;">
            <div style="position: absolute; top: 0; right: 0; width: 25px; height: 25px; background: #474747; clip-path: polygon(100% 0, 0 100%, 100% 100%);"></div>
            <img src="/icons/gießenBub.svg" alt="Gartenarbeit" style="width: 180px; height: 180px; margin: 0 auto 1.5rem; object-fit: contain; filter: brightness(0) invert(1);">
            <h3 style="color: white; font-weight: 700; margin-bottom: 1rem; font-size: 1.2rem; font-family: 'Comic Sans MS', cursive, sans-serif; text-align: center; text-shadow: 1px 1px 2px rgba(0,0,0,0.3);">Gartenarbeit</h3>
            <p style="color: rgba(255,255,255,0.8); font-size: 1rem; margin: 0; font-family: 'Comic Sans MS', cursive, sans-serif;">Gießen & Pflege</p>
          </div>

          <div style="background: rgba(255,255,255,0.05); border: 2px solid rgba(255,255,255,0.1); padding: 2rem; transform: rotate(-1deg); box-shadow: 0 10px 30px rgba(0,0,0,0.15); position: relative; text-align: center; backdrop-filter: blur(10px); min-width: 300px; flex-shrink: 0;">
            <div style="position: absolute; top: 0; right: 0; width: 25px; height: 25px; background: #474747; clip-path: polygon(100% 0, 0 100%, 100% 100%);"></div>
            <img src="/icons/FrontalGassiJunge.svg" alt="Gassi gehen" style="width: 180px; height: 180px; margin: 0 auto 1.5rem; object-fit: contain; filter: brightness(0) invert(1);">
            <h3 style="color: white; font-weight: 700; margin-bottom: 1rem; font-size: 1.2rem; font-family: 'Comic Sans MS', cursive, sans-serif; text-align: center; text-shadow: 1px 1px 2px rgba(0,0,0,0.3);">Gassi gehen</h3>
            <p style="color: rgba(255,255,255,0.8); font-size: 1rem; margin: 0; font-family: 'Comic Sans MS', cursive, sans-serif;">Hunde spazieren</p>
          </div>

          <div style="background: rgba(255,255,255,0.05); border: 2px solid rgba(255,255,255,0.1); padding: 2rem; transform: rotate(2deg); box-shadow: 0 10px 30px rgba(0,0,0,0.15); position: relative; text-align: center; backdrop-filter: blur(10px); min-width: 300px; flex-shrink: 0;">
            <div style="position: absolute; top: 0; right: 0; width: 25px; height: 25px; background: #474747; clip-path: polygon(100% 0, 0 100%, 100% 100%);"></div>
            <img src="/icons/kochen.svg" alt="Kochen" style="width: 180px; height: 180px; margin: 0 auto 1.5rem; object-fit: contain; filter: brightness(0) invert(1);">
            <h3 style="color: white; font-weight: 700; margin-bottom: 1rem; font-size: 1.2rem; font-family: 'Comic Sans MS', cursive, sans-serif; text-align: center; text-shadow: 1px 1px 2px rgba(0,0,0,0.3);">Kochen</h3>
            <p style="color: rgba(255,255,255,0.8); font-size: 1rem; margin: 0; font-family: 'Comic Sans MS', cursive, sans-serif;">Mahlzeiten</p>
          </div>

          <div style="background: rgba(255,255,255,0.05); border: 2px solid rgba(255,255,255,0.1); padding: 2rem; transform: rotate(1deg); box-shadow: 0 10px 30px rgba(0,0,0,0.15); position: relative; text-align: center; backdrop-filter: blur(10px); min-width: 300px; flex-shrink: 0;">
            <div style="position: absolute; top: 0; right: 0; width: 25px; height: 25px; background: #474747; clip-path: polygon(100% 0, 0 100%, 100% 100%);"></div>
            <img src="/icons/staubsaugen.svg" alt="Hausarbeit" style="width: 180px; height: 180px; margin: 0 auto 1.5rem; object-fit: contain; filter: brightness(0) invert(1);">
            <h3 style="color: white; font-weight: 700; margin-bottom: 1rem; font-size: 1.2rem; font-family: 'Comic Sans MS', cursive, sans-serif; text-align: center; text-shadow: 1px 1px 2px rgba(0,0,0,0.3);">Hausarbeit</h3>
            <p style="color: rgba(255,255,255,0.8); font-size: 1rem; margin: 0; font-family: 'Comic Sans MS', cursive, sans-serif;">Putzen & Ordnung</p>
          </div>

          <div style="background: rgba(255,255,255,0.05); border: 2px solid rgba(255,255,255,0.1); padding: 2rem; transform: rotate(-2deg); box-shadow: 0 10px 30px rgba(0,0,0,0.15); position: relative; text-align: center; backdrop-filter: blur(10px); min-width: 300px; flex-shrink: 0;">
            <div style="position: absolute; top: 0; right: 0; width: 25px; height: 25px; background: #474747; clip-path: polygon(100% 0, 0 100%, 100% 100%);"></div>
            <div style="position: absolute; top: -15px; right: 10px; background: #8FA66E; color: white; padding: 0.5rem 1.5rem; font-size: 0.9rem; font-weight: 600; font-family: 'Comic Sans MS', cursive, sans-serif; box-shadow: 2px 2px 0px rgba(0,0,0,0.2); transform: rotate(5deg);">Neu!</div>
            <img src="/icons/technikBanalcieren.svg" alt="Technik" style="width: 180px; height: 180px; margin: 0 auto 1.5rem; object-fit: contain; filter: brightness(0) invert(1);">
            <h3 style="color: white; font-weight: 700; margin-bottom: 1rem; font-size: 1.2rem; font-family: 'Comic Sans MS', cursive, sans-serif; text-align: center; text-shadow: 1px 1px 2px rgba(0,0,0,0.3);">Technik-Hilfe</h3>
            <p style="color: rgba(255,255,255,0.8); font-size: 1rem; margin: 0; font-family: 'Comic Sans MS', cursive, sans-serif;">PC & Smartphone</p>
          </div>

          <div style="background: rgba(255,255,255,0.05); border: 2px solid rgba(255,255,255,0.1); padding: 2rem; transform: rotate(1deg); box-shadow: 0 10px 30px rgba(0,0,0,0.15); position: relative; text-align: center; backdrop-filter: blur(10px); min-width: 300px; flex-shrink: 0;">
            <div style="position: absolute; top: 0; right: 0; width: 25px; height: 25px; background: #474747; clip-path: polygon(100% 0, 0 100%, 100% 100%);"></div>
            <img src="/icons/PaketTragen.svg" alt="Besorgungen" style="width: 180px; height: 180px; margin: 0 auto 1.5rem; object-fit: contain; filter: brightness(0) invert(1);">
            <h3 style="color: white; font-weight: 700; margin-bottom: 1rem; font-size: 1.2rem; font-family: 'Comic Sans MS', cursive, sans-serif; text-align: center; text-shadow: 1px 1px 2px rgba(0,0,0,0.3);">Besorgungen</h3>
            <p style="color: rgba(255,255,255,0.8); font-size: 1rem; margin: 0; font-family: 'Comic Sans MS', cursive, sans-serif;">Pakete & Apotheke</p>
          </div>

          <div style="background: rgba(255,255,255,0.05); border: 2px solid rgba(255,255,255,0.1); padding: 2rem; transform: rotate(-1deg); box-shadow: 0 10px 30px rgba(0,0,0,0.15); position: relative; text-align: center; backdrop-filter: blur(10px); min-width: 300px; flex-shrink: 0;">
            <div style="position: absolute; top: 0; right: 0; width: 25px; height: 25px; background: #474747; clip-path: polygon(100% 0, 0 100%, 100% 100%);"></div>
            <img src="/icons/ZeitungJunge.svg" alt="Begleitung" style="width: 180px; height: 180px; margin: 0 auto 1.5rem; object-fit: contain; filter: brightness(0) invert(1);">
            <h3 style="color: white; font-weight: 700; margin-bottom: 1rem; font-size: 1.2rem; font-family: 'Comic Sans MS', cursive, sans-serif; text-align: center; text-shadow: 1px 1px 2px rgba(0,0,0,0.3);">Begleitung</h3>
            <p style="color: rgba(255,255,255,0.8); font-size: 1rem; margin: 0; font-family: 'Comic Sans MS', cursive, sans-serif;">Arzt & Behörde</p>
          </div>

          <div style="background: rgba(255,255,255,0.05); border: 2px solid rgba(255,255,255,0.1); padding: 2rem; transform: rotate(-2deg); box-shadow: 0 10px 30px rgba(0,0,0,0.15); position: relative; text-align: center; backdrop-filter: blur(10px); min-width: 300px; flex-shrink: 0;">
            <div style="position: absolute; top: 0; right: 0; width: 25px; height: 25px; background: #474747; clip-path: polygon(100% 0, 0 100%, 100% 100%);"></div>
            <img src="/icons/GassiGehenMadl.svg" alt="Gassi Gehen" style="width: 180px; height: 180px; margin: 0 auto 1.5rem; object-fit: contain; filter: brightness(0) invert(1);">
            <h3 style="color: white; font-weight: 700; margin-bottom: 1rem; font-size: 1.2rem; font-family: 'Comic Sans MS', cursive, sans-serif; text-align: center; text-shadow: 1px 1px 2px rgba(0,0,0,0.3);">Hunde betreuen</h3>
            <p style="color: rgba(255,255,255,0.8); font-size: 1rem; margin: 0; font-family: 'Comic Sans MS', cursive, sans-serif;">Gassi & Spiel</p>
          </div>

          <div style="background: rgba(255,255,255,0.05); border: 2px solid rgba(255,255,255,0.1); padding: 2rem; transform: rotate(1deg); box-shadow: 0 10px 30px rgba(0,0,0,0.15); position: relative; text-align: center; backdrop-filter: blur(10px); min-width: 300px; flex-shrink: 0;">
            <div style="position: absolute; top: 0; right: 0; width: 25px; height: 25px; background: #474747; clip-path: polygon(100% 0, 0 100%, 100% 100%);"></div>
            <img src="/icons/einpflanzenBub.svg" alt="Garten" style="width: 180px; height: 180px; margin: 0 auto 1.5rem; object-fit: contain; filter: brightness(0) invert(1);">
            <h3 style="color: white; font-weight: 700; margin-bottom: 1rem; font-size: 1.2rem; font-family: 'Comic Sans MS', cursive, sans-serif; text-align: center; text-shadow: 1px 1px 2px rgba(0,0,0,0.3);">Gartenpflege</h3>
            <p style="color: rgba(255,255,255,0.8); font-size: 1rem; margin: 0; font-family: 'Comic Sans MS', cursive, sans-serif;">Pflanzen & Garten</p>
          </div>

          <div style="background: rgba(255,255,255,0.05); border: 2px solid rgba(255,255,255,0.1); padding: 2rem; transform: rotate(-1deg); box-shadow: 0 10px 30px rgba(0,0,0,0.15); position: relative; text-align: center; backdrop-filter: blur(10px); min-width: 300px; flex-shrink: 0;">
            <div style="position: absolute; top: 0; right: 0; width: 25px; height: 25px; background: #474747; clip-path: polygon(100% 0, 0 100%, 100% 100%);"></div>
            <img src="/icons/fensterPutzen.svg" alt="Fenster" style="width: 180px; height: 180px; margin: 0 auto 1.5rem; object-fit: contain; filter: brightness(0) invert(1);">
            <h3 style="color: white; font-weight: 700; margin-bottom: 1rem; font-size: 1.2rem; font-family: 'Comic Sans MS', cursive, sans-serif; text-align: center; text-shadow: 1px 1px 2px rgba(0,0,0,0.3);">Fensterputzen</h3>
            <p style="color: rgba(255,255,255,0.8); font-size: 1rem; margin: 0; font-family: 'Comic Sans MS', cursive, sans-serif;">Scheiben reinigen</p>
          </div>

          <div style="background: rgba(255,255,255,0.05); border: 2px solid rgba(255,255,255,0.1); padding: 2rem; transform: rotate(2deg); box-shadow: 0 10px 30px rgba(0,0,0,0.15); position: relative; text-align: center; backdrop-filter: blur(10px); min-width: 300px; flex-shrink: 0;">
            <div style="position: absolute; top: 0; right: 0; width: 25px; height: 25px; background: #474747; clip-path: polygon(100% 0, 0 100%, 100% 100%);"></div>
            <img src="/icons/bodenSchrubben.svg" alt="Boden" style="width: 180px; height: 180px; margin: 0 auto 1.5rem; object-fit: contain; filter: brightness(0) invert(1);">
            <h3 style="color: white; font-weight: 700; margin-bottom: 1rem; font-size: 1.2rem; font-family: 'Comic Sans MS', cursive, sans-serif; text-align: center; text-shadow: 1px 1px 2px rgba(0,0,0,0.3);">Bodenpflege</h3>
            <p style="color: rgba(255,255,255,0.8); font-size: 1rem; margin: 0; font-family: 'Comic Sans MS', cursive, sans-serif;">Schrubben & Wachsen</p>
          </div>
        </div>
      </div>

    <!-- Große Tafel-Notiz mit Zusatzinformation -->
    <div style="max-width: 80rem; margin: 0 auto; position: relative; z-index: 2;">
      <div style="background: rgba(255,255,255,0.05); border: 2px solid rgba(255,255,255,0.1); padding: 3rem; max-width: 800px; margin: 6rem auto 0; transform: rotate(1deg); box-shadow: 0 10px 30px rgba(0,0,0,0.15); position: relative; backdrop-filter: blur(10px);">
        <!-- Abgerissenes Eck -->
        <div style="position: absolute; top: 0; right: 0; width: 35px; height: 35px; background: #474747; clip-path: polygon(100% 0, 0 100%, 100% 100%);"></div>

        <div style="display: flex; align-items: center; gap: 3rem;">
          <div style="flex-shrink: 0;">
            <img src="/icons/verschiedeneMenschen.svg" alt="Verschiedene Menschen" style="width: 220px; height: auto; filter: brightness(2) contrast(2) invert(1);">
          </div>
          <div>
            <h4 style="font-size: 1.6rem; font-weight: 700; color: white; margin-bottom: 1.5rem; font-family: 'Comic Sans MS', cursive, sans-serif; text-shadow: 1px 1px 2px rgba(0,0,0,0.3);">Wichtiger Hinweis:</h4>
            <p style="color: rgba(255,255,255,0.9); margin: 0; line-height: 1.7; font-size: 1.1rem; font-family: 'Comic Sans MS', cursive, sans-serif;">
              Alle Helfenden sind von uns geprüft und verifiziert. <br>
              Deine Sicherheit und Zufriedenheit stehen bei uns an erster Stelle!
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  const track = document.querySelector('.carousel-track');
  if (track) {
    // Berechne die Breite der ersten Hälfte (12 Karten)
    const cards = track.children;
    const totalCards = cards.length;
    const halfCards = totalCards / 2;

    let scrollPosition = 0;
    let cardWidth = 0;

    // Berechne die Gesamtbreite der ersten Hälfte
    for (let i = 0; i < halfCards; i++) {
      cardWidth += cards[i].offsetWidth + 48; // 3rem gap = 48px
    }

    function animate() {
      scrollPosition += 0.5; // Geschwindigkeit

      if (scrollPosition >= cardWidth) {
        scrollPosition = 0;
      }

      track.style.transform = `translateX(-${scrollPosition}px)`;
      requestAnimationFrame(animate);
    }

    animate();
  }
});
</script>

<style scoped>
.carousel-track {
  transition: transform 0.1s linear;
}
</style>