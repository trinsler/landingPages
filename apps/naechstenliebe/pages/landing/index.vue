<template>
  <div style="min-height: 100vh; background: #f5f5f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;">
    <!-- Modern Header aligned with PWA style -->
    <header style="position: sticky; top: 0; z-index: 50; background: #474747; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
      <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem 1.5rem; max-width: 1200px; margin: 0 auto;">
        <div style="display: flex; align-items: center; gap: 1rem;">
          <div style="width: 3rem; height: 3rem; background: white; border-radius: 12px; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 8px rgba(0,0,0,0.2);">
            <img src="/icons/logo.svg" alt="Logo" style="width: 2.5rem; height: 2.5rem;">
          </div>
          <div>
            <h1 style="color: white; font-size: 1.8rem; font-weight: 700; margin: 0; text-shadow: 1px 1px 2px rgba(0,0,0,0.3);">Mei.Nochber</h1>
            <div style="color: rgba(255,255,255,0.8); font-size: 0.9rem; font-weight: 400; margin-top: 0.25rem;">
              Die Nachbarschafts-App
            </div>
          </div>
        </div>
        
        <div style="display: flex; align-items: center; gap: 1rem;">
          <button style="background: #BECDA3; color: #474747; padding: 0.75rem 1.5rem; border-radius: 25px; border: none; cursor: pointer; box-shadow: 0 2px 8px rgba(0,0,0,0.2); transition: transform 0.2s; font-weight: 600; font-size: 0.9rem;"
                  onmouseover="this.style.transform='scale(1.05)'"
                  onmouseout="this.style.transform='scale(1)'">
            App herunterladen
          </button>
        </div>
      </div>
    </header>
    
    <!-- Hero Section with PWA-style design -->
    <section style="background: #f5f5f5; padding: 4rem 1.5rem;">
      <div style="max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center;">
        <!-- Left Content -->
        <div style="max-width: 500px;">
          <h1 style="font-size: 3.5rem; font-weight: 700; margin: 0 0 2rem 0; line-height: 1.1; color: #474747;">
            Nachbarschaftshilfe<br>
            <span style="color: #5F6F55;">einfach gemacht</span>
          </h1>
          
          <p style="color: #666; font-size: 1.3rem; line-height: 1.6; margin-bottom: 3rem; font-weight: 300;">
            Verbinde dich mit deinen Nachbarn. Erhalte oder biete Hilfe in deiner Umgebung. 
            Schnell, sicher und unkompliziert.
          </p>
          
          <!-- Feature Cards -->
          <div style="display: flex; flex-direction: column; gap: 1.5rem; margin-bottom: 3rem;">
            <div style="background: white; padding: 1.5rem; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); display: flex; align-items: center; gap: 1rem;">
              <div style="width: 3rem; height: 3rem; background: #5F6F55; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                <svg style="width: 1.5rem; height: 1.5rem; color: white;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"/>
                </svg>
              </div>
              <div>
                <h3 style="color: #474747; font-size: 1.1rem; font-weight: 600; margin: 0 0 0.5rem 0;">Einfach anfragen</h3>
                <p style="color: #666; margin: 0; font-size: 0.9rem;">Per Sprache oder Text deine Hilfe beschreiben</p>
              </div>
            </div>
            
            <div style="background: white; padding: 1.5rem; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); display: flex; align-items: center; gap: 1rem;">
              <div style="width: 3rem; height: 3rem; background: #BECDA3; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                <svg style="width: 1.5rem; height: 1.5rem; color: #474747;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              </div>
              <div>
                <h3 style="color: #474747; font-size: 1.1rem; font-weight: 600; margin: 0 0 0.5rem 0;">Lokale Nachbarn</h3>
                <p style="color: #666; margin: 0; font-size: 0.9rem;">Hilfe aus deiner direkten Umgebung</p>
              </div>
            </div>
            
            <div style="background: white; padding: 1.5rem; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); display: flex; align-items: center; gap: 1rem;">
              <div style="width: 3rem; height: 3rem; background: #8F8B82; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                <svg style="width: 1.5rem; height: 1.5rem; color: white;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                </svg>
              </div>
              <div>
                <h3 style="color: #474747; font-size: 1.1rem; font-weight: 600; margin: 0 0 0.5rem 0;">Sicher bezahlen</h3>
                <p style="color: #666; margin: 0; font-size: 0.9rem;">Erst nach erbrachter Hilfe wird bezahlt</p>
              </div>
            </div>
          </div>
          
          <!-- CTA Buttons -->
          <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
            <button style="background: #474747; color: white; padding: 1rem 2rem; border: none; border-radius: 25px; font-weight: 600; font-size: 1rem; cursor: pointer; box-shadow: 0 2px 8px rgba(0,0,0,0.2); transition: transform 0.2s;"
                    onmouseover="this.style.transform='scale(1.05)'"
                    onmouseout="this.style.transform='scale(1)'">
              App herunterladen
            </button>
            <button style="background: transparent; color: #474747; padding: 1rem 2rem; border: 2px solid #474747; border-radius: 25px; font-weight: 600; font-size: 1rem; cursor: pointer; transition: all 0.2s;"
                    onmouseover="this.style.background='#474747'; this.style.color='white'"
                    onmouseout="this.style.background='transparent'; this.style.color='#474747'">
              Mehr erfahren
            </button>
          </div>
        </div>
        
        <!-- Right Visual -->
        <div style="display: flex; justify-content: center; align-items: center;">
          <div style="background: white; padding: 3rem; border-radius: 24px; box-shadow: 0 8px 32px rgba(0,0,0,0.1); max-width: 400px; text-align: center;">
            <img src="/icons/LeuteImKreis.svg" alt="Gemeinschaft" style="width: 100%; height: auto; margin-bottom: 2rem; filter: hue-rotate(15deg) saturate(1.2);">
            <h3 style="color: #474747; font-size: 1.5rem; font-weight: 600; margin: 0 0 1rem 0;">Starke Gemeinschaft</h3>
            <p style="color: #666; margin: 0; line-height: 1.5;">Gemeinsam schaffen wir eine hilfsbereite Nachbarschaft für alle Generationen.</p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Features Section -->
    <FeaturesSection />
    
    <!-- Services Section -->
    <ServicesSection />
    
    <!-- Help Seekers Section -->
    <HelpSeekersSection />
    
    <!-- Helpers Section -->
    <HelpersSection />
    
    <!-- System Overview Section -->
    <SystemOverviewSection />
    
    <!-- FAQ Section -->
    <FAQSection />
    
    <!-- CTA Section -->
    <CTASection />
    
    <!-- Footer -->
    <TheFooter />
  </div>
</template>

<script setup>
import FeaturesSection from '../components/landing/FeaturesSection.vue'
import ServicesSection from '../components/landing/ServicesSection.vue'
import HelpSeekersSection from '../components/landing/HelpSeekersSection.vue'
import HelpersSection from '../components/landing/HelpersSection.vue'
import SystemOverviewSection from '../components/landing/SystemOverviewSection.vue'
import FAQSection from '../components/landing/FAQSection.vue'
import CTASection from '../components/landing/CTASection.vue'
import TheFooter from '../components/landing/TheFooter.vue'

definePageMeta({
  layout: false
})
</script>