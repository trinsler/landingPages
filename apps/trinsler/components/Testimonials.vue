<template>
  <section class="relative py-20 lg:py-32 overflow-hidden matrix-bg">
    <!-- Cyber Grid -->
    <div class="absolute inset-0 cyber-grid opacity-20"></div>
    
    <!-- Data Stream Effects -->
    <div class="absolute inset-0">
      <div class="animate-data-stream absolute left-1/4 w-1 h-32 bg-gradient-to-b from-transparent via-accent-cyan to-transparent" style="animation-delay: 0s;"></div>
      <div class="animate-data-stream absolute right-1/3 w-1 h-28 bg-gradient-to-b from-transparent via-accent-purple to-transparent" style="animation-delay: 1.5s;"></div>
    </div>

    <div class="relative container-custom">
      <!-- Section Header -->
      <div class="text-center max-w-4xl mx-auto mb-20">
        <div class="inline-flex items-center neon-card rounded-full px-6 py-3 text-sm font-semibold mb-6">
          <div class="w-2 h-2 bg-accent-primary rounded-full mr-3"></div>
          <span class="text-accent-cyan">Kundenstimmen</span>
          <span class="text-white ml-2">Verifiziert</span>
        </div>
        
        <h2 class="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6">
          Was unsere <span class="gradient-text-neon">Partner sagen</span>
        </h2>
        
        <div class="cyber-card rounded-xl p-6 max-w-3xl mx-auto">
          <p class="text-lg text-white/90 leading-relaxed">
            Authentische Rückmeldungen unserer <span class="text-accent-primary">Equity-Partner</span> 
            über gemeinsame Erfolge und Herausforderungen.
          </p>
        </div>
      </div>

      <!-- Testimonials Grid -->
      <div class="grid lg:grid-cols-2 gap-8 mb-20">
        
        <!-- Testimonial 1 -->
        <div class="group animate-slide-up-stagger">
          <div class="cyber-card rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02]">
            <!-- Header -->
            <div class="bg-surface-1 px-4 py-3 border-b border-accent-primary/30">
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 rounded-full bg-accent-primary"></div>
                <div class="text-accent-cyan text-sm">TechFlow SaaS</div>
                <div class="ml-auto px-2 py-1 rounded bg-green-500/20 text-green-400 text-xs">Verifiziert</div>
              </div>
            </div>
            
            <div class="p-8">
              <!-- Quote -->
              <div class="neon-card rounded-xl p-6 mb-6">
                <blockquote class="text-lg text-white/90 leading-relaxed mb-4">
                  "Trinsler hat unser SaaS von 15K auf 38K MRR in 6 Monaten gebracht. 
                  Das Equity-Modell war perfekt für uns - <span class="text-accent-primary font-semibold">keine hohen Vorabkosten</span>, 
                  sondern echte Partnerschaft mit geteiltem Risiko."
                </blockquote>
              </div>

              <!-- Client Info -->
              <div class="flex items-center gap-4">
                <div class="w-16 h-16 rounded-xl neon-card flex items-center justify-center bg-gradient-to-br from-accent-primary/20 to-accent-cyan/20">
                  <UserIcon class="w-8 h-8 text-white" />
                </div>
                <div>
                  <div class="font-bold text-white mb-1">Marcus Weber</div>
                  <div class="text-sm text-accent-cyan">CEO, TechFlow SaaS</div>
                  <div class="text-xs text-white/60">München • B2B Automation</div>
                </div>
              </div>

              <!-- Results Summary -->
              <div class="mt-6 grid grid-cols-3 gap-4">
                <div class="text-center">
                  <div class="text-xl font-bold text-glow-blue mb-1">+153%</div>
                  <div class="text-xs text-white/70">MRR Wachstum</div>
                </div>
                <div class="text-center">
                  <div class="text-xl font-bold text-glow-cyan mb-1">-60%</div>
                  <div class="text-xs text-white/70">CAC Reduktion</div>
                </div>
                <div class="text-center">
                  <div class="text-xl font-bold text-accent-purple mb-1">8%</div>
                  <div class="text-xs text-white/70">Equity Deal</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Testimonial 2 -->
        <div class="group animate-slide-up-stagger" style="animation-delay: 0.2s;">
          <div class="glass-card rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02]">
            <div class="bg-surface-1 px-4 py-3 border-b border-accent-cyan/30">
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 rounded-full bg-accent-cyan"></div>
                <div class="text-accent-cyan text-sm">EcoTech Store</div>
                <div class="ml-auto px-2 py-1 rounded bg-green-500/20 text-green-400 text-xs">Verifiziert</div>
              </div>
            </div>
            
            <div class="p-8">
              <div class="cyber-card rounded-xl p-6 mb-6">
                <blockquote class="text-lg text-white/90 leading-relaxed mb-4">
                  "Von 0.8% auf 3.4% Conversion Rate - das hätte keine klassische Agentur geschafft. 
                  Trinsler denkt wie ein <span class="text-accent-cyan font-semibold">echter Co-Founder</span>, 
                  nicht wie ein externer Dienstleister."
                </blockquote>
              </div>

              <div class="flex items-center gap-4">
                <div class="w-16 h-16 rounded-xl cyber-card flex items-center justify-center bg-gradient-to-br from-accent-cyan/20 to-accent-purple/20">
                  <UserIcon class="w-8 h-8 text-white" />
                </div>
                <div>
                  <div class="font-bold text-white mb-1">Sarah Chen</div>
                  <div class="text-sm text-accent-purple">Founder, EcoTech Store</div>
                  <div class="text-xs text-white/60">Hamburg • E-Commerce</div>
                </div>
              </div>

              <div class="mt-6 grid grid-cols-3 gap-4">
                <div class="text-center">
                  <div class="text-xl font-bold text-glow-cyan mb-1">+325%</div>
                  <div class="text-xs text-white/70">Conversion Rate</div>
                </div>
                <div class="text-center">
                  <div class="text-xl font-bold text-glow-blue mb-1">€125K</div>
                  <div class="text-xs text-white/70">Monatsumsatz</div>
                </div>
                <div class="text-center">
                  <div class="text-xl font-bold text-accent-orange mb-1">12%</div>
                  <div class="text-xs text-white/70">Equity Deal</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Testimonial 3 -->
        <div class="group animate-slide-up-stagger" style="animation-delay: 0.4s;">
          <div class="neon-card rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02]">
            <div class="bg-surface-1 px-4 py-3 border-b border-accent-purple/30">
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 rounded-full bg-accent-purple"></div>
                <div class="text-accent-purple text-sm">FinTech Berlin</div>
                <div class="ml-auto px-2 py-1 rounded bg-yellow-500/20 text-yellow-400 text-xs">Laufend</div>
              </div>
            </div>
            
            <div class="p-8">
              <div class="glass-card rounded-xl p-6 mb-6">
                <blockquote class="text-lg text-white/90 leading-relaxed mb-4">
                  "Endlich ein Growth-Partner der versteht: <span class="text-accent-purple font-semibold">Startup-Budget ist knapp</span>. 
                  Statt €5K+ monatlich zahlen wir €400 und geben Equity. Win-Win für beide Seiten."
                </blockquote>
              </div>

              <div class="flex items-center gap-4">
                <div class="w-16 h-16 rounded-xl glass-card flex items-center justify-center bg-gradient-to-br from-accent-purple/20 to-accent-orange/20">
                  <UserIcon class="w-8 h-8 text-white" />
                </div>
                <div>
                  <div class="font-bold text-white mb-1">Alex Müller</div>
                  <div class="text-sm text-accent-orange">CTO, FinTech Berlin</div>
                  <div class="text-xs text-white/60">Berlin • B2B Fintech</div>
                </div>
              </div>

              <div class="mt-6 grid grid-cols-3 gap-4">
                <div class="text-center">
                  <div class="text-xl font-bold text-accent-purple mb-1">4 Mo.</div>
                  <div class="text-xs text-white/70">Partnerschaft</div>
                </div>
                <div class="text-center">
                  <div class="text-xl font-bold text-white mb-1">€400</div>
                  <div class="text-xs text-white/70">Monatlich</div>
                </div>
                <div class="text-center">
                  <div class="text-xl font-bold text-accent-orange mb-1">6%</div>
                  <div class="text-xs text-white/70">Equity Deal</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Coming Soon Placeholder -->
        <div class="group animate-slide-up-stagger" style="animation-delay: 0.6s;">
          <div class="cyber-card rounded-2xl overflow-hidden border-dashed">
            <div class="bg-surface-1 px-4 py-3 border-b border-accent-neutral/30">
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 rounded-full bg-accent-neutral"></div>
                <div class="text-accent-neutral text-sm">Ihr Unternehmen?</div>
                <div class="ml-auto px-2 py-1 rounded bg-accent-neutral/20 text-accent-neutral text-xs">Verfügbar</div>
              </div>
            </div>
            
            <div class="p-8 text-center">
              <div class="mb-6">
                <div class="w-16 h-16 rounded-xl cyber-card flex items-center justify-center bg-gradient-to-br from-accent-neutral/20 to-accent-cyan/20 mx-auto mb-4">
                  <PlusIcon class="w-8 h-8 text-accent-neutral" />
                </div>
                <h4 class="text-xl font-bold text-white mb-2">Ihr Testimonial?</h4>
                <p class="text-white/70 text-sm">
                  Werden Sie unser nächster Success Case und teilen Sie Ihre Erfahrungen.
                </p>
              </div>

              <NuxtLink to="/init-growth" class="btn-secondary inline-flex items-center">
                <span>Partnerschaft starten</span>
                <ArrowRightIcon class="ml-2 h-4 w-4" />
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <!-- Trust Indicators -->
      <div class="text-center">
        <div class="cyber-card rounded-2xl max-w-4xl mx-auto p-8">
          <h3 class="text-3xl font-bold text-white mb-6">
            <span class="text-accent-primary">Verifizierte</span> 
            <span class="gradient-text-neon">Kundenstimmen</span>
          </h3>
          
          <div class="grid md:grid-cols-4 gap-6 mb-8">
            <div class="text-center">
              <div class="text-2xl font-bold text-glow-blue mb-1">100%</div>
              <div class="text-sm text-white/70">Authentische Reviews</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-glow-cyan mb-1">3+</div>
              <div class="text-sm text-white/70">Aktive Partnerschaften</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-accent-purple mb-1">24h</div>
              <div class="text-sm text-white/70">Response Zeit</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-accent-orange mb-1">2025</div>
              <div class="text-sm text-white/70">Gegründet</div>
            </div>
          </div>
          
          <p class="text-white/80 text-sm max-w-2xl mx-auto">
            Alle Testimonials sind verifiziert und stammen von echten Partnerschaften. 
            Referenzen können auf Anfrage zur Verfügung gestellt werden.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { UserIcon, PlusIcon, ArrowRightIcon } from '@heroicons/vue/24/outline'
</script>