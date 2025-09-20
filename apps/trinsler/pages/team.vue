<template>
  <div class="min-h-screen matrix-bg relative overflow-hidden pt-20">
    <!-- Cyber Grid Background -->
    <div class="absolute inset-0 cyber-grid opacity-30"></div>
    
    <!-- Data Stream Effects -->
    <div class="absolute inset-0">
      <div class="animate-data-stream absolute left-1/4 w-1 h-32 bg-linear-to-b from-transparent via-accent-cyan to-transparent" style="animation-delay: 0s;"></div>
      <div class="animate-data-stream absolute right-1/3 w-1 h-28 bg-linear-to-b from-transparent via-accent-purple to-transparent" style="animation-delay: 1.5s;"></div>
    </div>

    <div class="relative container-custom py-20">
      <!-- Terminal Header -->
      <div class="cyber-card rounded-3xl overflow-hidden max-w-5xl mx-auto mb-20 animate-glow-pulse">
        <div class="bg-surface-1 px-6 py-4 border-b border-accent-neon/30">
          <div class="flex items-center gap-3">
            <div class="w-4 h-4 rounded-full bg-red-500"></div>
            <div class="w-4 h-4 rounded-full bg-yellow-500"></div>
            <div class="w-4 h-4 rounded-full bg-accent-neon"></div>
            <div class="ml-4 text-accent-cyan text-lg">Team</div>
          </div>
        </div>

        <div class="p-8 lg:p-12 code-pattern">
          
          <h1 class="text-4xl sm:text-6xl font-black text-white mb-6 text-center">
            Lernen Sie unser
            <br />
            <span class="gradient-text-neon">Team kennen</span>
          </h1>
          
          <div class="cyber-card rounded-xl p-6 max-w-3xl mx-auto">
            <p class="text-lg text-white/90 leading-relaxed text-center">
              Erfahrene Web-Development-Experten mit <span class="text-accent-primary">5+ Jahren</span> 
              in Vue.js, Nuxt.js und modernen Web-Technologien.
            </p>
          </div>
        </div>
      </div>

      <!-- Team Members Grid -->
      <div class="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        <!-- Founder 1: Miréio Trinley -->
        <div class="group animate-slide-up-stagger">
          <div class="cyber-card rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02]">
            <!-- Profile Header -->
            <div class="bg-surface-1 px-4 py-3 border-b border-accent-primary/30">
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 rounded-full bg-accent-primary"></div>
                <div class="text-accent-cyan text-sm">Co-Founder & Frontend Lead</div>
                <div class="ml-auto px-2 py-1 rounded bg-green-500/20 text-green-400 text-xs">Verifiziert</div>
              </div>
            </div>
            
            <div class="p-8">
              <!-- Profile Image -->
              <div class="relative mb-6">
                <div class="w-32 h-32 rounded-2xl mx-auto neon-card overflow-hidden">
                  <img 
                    src="/assets/pictures/MireioTrinley.jpeg" 
                    alt="Miréio Trinley"
                    class="w-full h-full object-cover"
                    onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'"
                  />
                  <div class="w-full h-full bg-linear-to-br from-accent-primary/20 to-accent-cyan/20 flex items-center justify-center" style="display:none">
                    <div class="w-16 h-16 text-white text-4xl flex items-center justify-center"></div>
                  </div>
                </div>
                <div class="absolute -top-2 -right-2 neon-card rounded-full p-2">
                  <div class="w-3 h-3 bg-accent-primary rounded-full"></div>
                </div>
              </div>

              <!-- Name & Role -->
              <div class="text-center mb-6">
                <h3 class="text-2xl font-bold text-white mb-2">Miréio Trinley</h3>
                <div class="text-accent-cyan text-sm mb-1">Co-Founder & Frontend Lead</div>
                <div class="text-white/60 text-xs mb-3">UI/UX Design • Frontend • Project Management</div>
                
                <!-- Social Links -->
                <div class="flex justify-center gap-4">
                  <a href="https://linkedin.com/in/mireio-trinley" target="_blank" 
                     class="w-10 h-10 rounded-xl neon-card flex items-center justify-center hover:scale-110 transition-transform">
                    <div class="w-5 h-5 bg-blue-500 rounded flex items-center justify-center">
                      <span class="text-white text-xs font-bold">in</span>
                    </div>
                  </a>
                </div>
              </div>

              <!-- Background -->
              <div class="neon-card rounded-xl p-4 mb-4">
                <div class="text-accent-purple text-sm mb-2">Background</div>
                <p class="text-white/90 text-sm leading-relaxed">
                  Spezialisiert auf Frontend-Entwicklung, UI/UX Design und Projektmanagement. 
                  Erfahrung in Vue.js, Nuxt.js, responsivem Design und 
                  der Umsetzung von Landing Pages und Web-Applikationen.
                </p>
              </div>

              <!-- Expertise -->
              <div class="glass-card rounded-xl p-4">
                <div class="text-accent-orange text-sm mb-3">Expertise</div>
                <div class="flex flex-wrap gap-2">
                  <span class="px-3 py-1 rounded-full bg-accent-primary/20 text-accent-primary text-xs">Vue.js & Nuxt.js</span>
                  <span class="px-3 py-1 rounded-full bg-accent-cyan/20 text-accent-cyan text-xs">UI/UX Design</span>
                  <span class="px-3 py-1 rounded-full bg-accent-purple/20 text-accent-purple text-xs">Responsive Design</span>
                  <span class="px-3 py-1 rounded-full bg-accent-orange/20 text-accent-orange text-xs">Project Management</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Founder 2: Niels Hensler -->
        <div class="group animate-slide-up-stagger" style="animation-delay: 0.2s;">
          <div class="cyber-card rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02]">
            <div class="bg-surface-1 px-4 py-3 border-b border-accent-purple/30">
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 rounded-full bg-accent-purple"></div>
                <div class="text-accent-purple text-sm">Co-Founder & Backend Lead</div>
                <div class="ml-auto px-2 py-1 rounded bg-green-500/20 text-green-400 text-xs">Verifiziert</div>
              </div>
            </div>
            
            <div class="p-8">
              <div class="relative mb-6">
                <div class="w-32 h-32 rounded-2xl mx-auto cyber-card overflow-hidden">
                  <img 
                    src="/assets/pictures/nielsHensler.jpeg" 
                    alt="Niels Hensler"
                    class="w-full h-full object-cover"
                    onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'"
                  />
                  <div class="w-full h-full bg-linear-to-br from-accent-purple/20 to-accent-orange/20 flex items-center justify-center" style="display:none">
                    <div class="w-16 h-16 text-white text-4xl flex items-center justify-center"></div>
                  </div>
                </div>
                <div class="absolute -top-2 -right-2 cyber-card rounded-full p-2">
                  <div class="w-3 h-3 bg-accent-purple rounded-full"></div>
                </div>
              </div>

              <div class="text-center mb-6">
                <h3 class="text-2xl font-bold text-white mb-2">Niels Hensler</h3>
                <div class="text-accent-purple text-sm mb-1">Co-Founder & Backend Lead</div>
                <div class="text-white/60 text-xs mb-3">Backend Development • APIs • Datenbanken</div>
                
                <div class="flex justify-center gap-4">
                  <a href="https://linkedin.com/in/niels-hensler" target="_blank" 
                     class="w-10 h-10 rounded-xl neon-card flex items-center justify-center hover:scale-110 transition-transform">
                    <div class="w-5 h-5 bg-blue-500 rounded flex items-center justify-center">
                      <span class="text-white text-xs font-bold">in</span>
                    </div>
                  </a>
                  <a href="https://webwai.de" target="_blank"
                     class="w-10 h-10 rounded-xl glass-card flex items-center justify-center hover:scale-110 transition-transform">
                    <div class="w-5 h-5 bg-accent-purple rounded flex items-center justify-center">
                      <span class="text-white text-xs font-bold">🌐</span>
                    </div>
                  </a>
                </div>
              </div>

              <div class="cyber-card rounded-xl p-4 mb-4">
                <div class="text-accent-cyan text-sm mb-2">Background</div>
                <p class="text-white/90 text-sm leading-relaxed">
                  Spezialist für Backend-Entwicklung und skalierbare Web-Architekturen. 
                  Expertise in Node.js, API-Development, Datenbank-Design und 
                  der technischen Umsetzung von Web-Applikationen.
                </p>
              </div>

              <div class="glass-card rounded-xl p-4">
                <div class="text-accent-orange text-sm mb-3">Expertise</div>
                <div class="flex flex-wrap gap-2">
                  <span class="px-3 py-1 rounded-full bg-accent-purple/20 text-accent-purple text-xs">Node.js & APIs</span>
                  <span class="px-3 py-1 rounded-full bg-accent-cyan/20 text-accent-cyan text-xs">Datenbank Design</span>
                  <span class="px-3 py-1 rounded-full bg-accent-orange/20 text-accent-orange text-xs">Web-Architektur</span>
                  <span class="px-3 py-1 rounded-full bg-accent-primary/20 text-accent-primary text-xs">Performance</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Contact CTA -->
      <div class="text-center mt-20">
        <div class="cyber-card rounded-2xl max-w-4xl mx-auto p-8">
          
          <h3 class="text-3xl font-bold text-white mb-6">
            <span class="gradient-text-neon">Bereit für Ihr</span> 
            <span class="text-accent-cyan">Web-Projekt?</span>
          </h3>
          
          <p class="text-white/80 mb-8 max-w-2xl mx-auto">
            Sprechen Sie direkt mit den Gründern über Ihr Web-Projekt 
            und wie wir Ihre digitale Vision umsetzen können.
          </p>
          
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <NuxtLink to="/contact" class="btn-primary">
              <span>Team kontaktieren</span>
            </NuxtLink>
            <a href="https://calendly.com/trinsler/web-project-call" target="_blank" 
               class="btn-secondary">
              Projekt-Gespräch buchen
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// No icons or emojis needed

useHead({
  title: 'Team - Trinsler Web-Development',
  meta: [
    { name: 'description', content: 'Lernen Sie das Trinsler Web-Development Team kennen. Expertise in Vue.js, Nuxt.js und modernen Web-Technologien.' }
  ]
})
</script>