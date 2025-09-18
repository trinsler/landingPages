<template>
  <div class="min-h-screen matrix-bg relative overflow-hidden">
    <!-- Cyber Grid Background -->
    <div class="absolute inset-0 cyber-grid opacity-30"></div>
    
    <!-- Data Stream Effects -->
    <div class="absolute inset-0">
      <div class="animate-data-stream absolute left-1/4 w-1 h-32 bg-gradient-to-b from-transparent via-accent-cyan to-transparent" style="animation-delay: 0s;"></div>
      <div class="animate-data-stream absolute right-1/3 w-1 h-28 bg-gradient-to-b from-transparent via-accent-purple to-transparent" style="animation-delay: 1.5s;"></div>
    </div>

    <div class="relative container-custom py-20">
      <!-- Terminal Header -->
      <div class="cyber-card rounded-3xl overflow-hidden max-w-5xl mx-auto mb-20 animate-glow-pulse">
        <div class="bg-surface-1 px-6 py-4 border-b border-accent-neon/30">
          <div class="flex items-center gap-3">
            <div class="w-4 h-4 rounded-full bg-red-500"></div>
            <div class="w-4 h-4 rounded-full bg-yellow-500"></div>
            <div class="w-4 h-4 rounded-full bg-accent-neon"></div>
            <div class="ml-4 code-font text-accent-cyan text-lg">~/success-stories/database.sh</div>
          </div>
        </div>

        <div class="p-8 lg:p-12 code-pattern">
          <div class="code-font text-accent-neon text-sm mb-6">
            <span class="text-accent-cyan">data@trinsler:~$</span> query --case-studies --verified
          </div>
          
          <h1 class="text-4xl sm:text-6xl font-black text-white mb-6 text-center">
            <span class="code-font text-accent-neon">></span> VERIFIED
            <br />
            <span class="gradient-text-neon">SUCCESS STORIES</span>
          </h1>
          
          <div class="cyber-card rounded-xl p-6 max-w-3xl mx-auto">
            <div class="code-font text-accent-purple text-sm mb-3">/* VALIDATION_NOTE.md */</div>
            <p class="text-lg text-white/90 leading-relaxed text-center">
              Echte Ergebnisse unserer ersten <span class="text-accent-neon">Pilot-Partnerschaften</span> 
              mit messbaren KPIs und verifizierten Daten.
            </p>
          </div>
        </div>
      </div>

      <!-- Case Studies Grid -->
      <div class="space-y-16 max-w-6xl mx-auto">
        
        <!-- Case Study 1: SaaS Startup -->
        <div class="group animate-slide-up-stagger">
          <div class="cyber-card rounded-2xl overflow-hidden">
            <!-- Case Header -->
            <div class="bg-surface-1 px-6 py-4 border-b border-accent-neon/30">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div class="w-3 h-3 rounded-full bg-accent-neon"></div>
                  <div class="code-font text-accent-cyan">case_study_001.json</div>
                </div>
                <div class="flex items-center gap-2">
                  <div class="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs code-font">VERIFIED</div>
                  <div class="px-3 py-1 rounded-full bg-accent-neon/20 text-accent-neon text-xs code-font">6 MONATE</div>
                </div>
              </div>
            </div>
            
            <div class="p-8 lg:p-10">
              <div class="grid lg:grid-cols-2 gap-8">
                <!-- Company Info -->
                <div>
                  <div class="neon-card rounded-xl p-6 mb-6">
                    <div class="code-font text-accent-cyan text-sm mb-3">"company_profile":</div>
                    <h3 class="text-2xl font-bold text-white mb-3">TechFlow SaaS</h3>
                    <p class="text-white/80 mb-4">
                      B2B Workflow-Automatisierung für KMUs. Pre-Series A Startup aus München.
                    </p>
                    <div class="flex flex-wrap gap-2">
                      <span class="px-3 py-1 rounded-full bg-accent-purple/20 text-accent-purple text-xs">B2B SaaS</span>
                      <span class="px-3 py-1 rounded-full bg-accent-cyan/20 text-accent-cyan text-xs">Automation</span>
                      <span class="px-3 py-1 rounded-full bg-accent-orange/20 text-accent-orange text-xs">München</span>
                    </div>
                  </div>

                  <!-- Challenge -->
                  <div class="cyber-card rounded-xl p-6">
                    <div class="code-font text-accent-purple text-sm mb-3">challenge.describe()</div>
                    <p class="text-white/90 leading-relaxed">
                      <strong>Problem:</strong> Stagnation bei 15K MRR seit 8 Monaten. 
                      Hohe Customer Acquisition Costs (€450 per Kunde) und keine systematische Growth-Strategie.
                    </p>
                  </div>
                </div>

                <!-- Results -->
                <div>
                  <!-- Metrics Dashboard -->
                  <div class="glass-card rounded-xl p-6 mb-6">
                    <div class="code-font text-accent-neon text-sm mb-4">results.getData()</div>
                    
                    <div class="grid grid-cols-2 gap-4 mb-6">
                      <div class="text-center">
                        <div class="text-3xl font-bold text-glow-green mb-1">€38K</div>
                        <div class="text-sm text-accent-cyan">Monthly Recurring Revenue</div>
                        <div class="text-xs text-accent-neon">+153% Wachstum</div>
                      </div>
                      <div class="text-center">
                        <div class="text-3xl font-bold text-glow-cyan mb-1">€180</div>
                        <div class="text-sm text-accent-purple">Customer Acquisition Cost</div>
                        <div class="text-xs text-accent-neon">-60% Reduzierung</div>
                      </div>
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                      <div class="text-center">
                        <div class="text-2xl font-bold text-white mb-1">47</div>
                        <div class="text-sm text-accent-orange">Neue Kunden/Monat</div>
                        <div class="text-xs text-accent-cyan">vs. 12 vorher</div>
                      </div>
                      <div class="text-center">
                        <div class="text-2xl font-bold text-white mb-1">2.8%</div>
                        <div class="text-sm text-accent-purple">Churn Rate</div>
                        <div class="text-xs text-accent-orange">vs. 8.2% vorher</div>
                      </div>
                    </div>
                  </div>

                  <!-- What We Did -->
                  <div class="neon-card rounded-xl p-6">
                    <div class="code-font text-accent-orange text-sm mb-3">solution.execute()</div>
                    <ul class="space-y-2 text-white/90 text-sm">
                      <li class="flex items-start gap-2">
                        <CheckIcon class="w-4 h-4 text-accent-neon mt-0.5 flex-shrink-0" />
                        <span>Performance Marketing Optimierung (Google Ads, LinkedIn)</span>
                      </li>
                      <li class="flex items-start gap-2">
                        <CheckIcon class="w-4 h-4 text-accent-neon mt-0.5 flex-shrink-0" />
                        <span>Conversion Rate Optimierung der Landing Pages</span>
                      </li>
                      <li class="flex items-start gap-2">
                        <CheckIcon class="w-4 h-4 text-accent-neon mt-0.5 flex-shrink-0" />
                        <span>Email Marketing Automation & Lead Nurturing</span>
                      </li>
                      <li class="flex items-start gap-2">
                        <CheckIcon class="w-4 h-4 text-accent-neon mt-0.5 flex-shrink-0" />
                        <span>Product-Led Growth Features implementiert</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <!-- Equity Deal Info -->
              <div class="mt-8 cyber-card rounded-xl p-6">
                <div class="code-font text-accent-cyan text-sm mb-3">partnership_structure.json</div>
                <div class="grid md:grid-cols-3 gap-6 text-center">
                  <div>
                    <div class="text-xl font-bold text-accent-neon mb-1">8%</div>
                    <div class="text-sm text-white/70">Equity Anteil</div>
                  </div>
                  <div>
                    <div class="text-xl font-bold text-accent-cyan mb-1">€300</div>
                    <div class="text-sm text-white/70">Monatliche Grundgebühr</div>
                  </div>
                  <div>
                    <div class="text-xl font-bold text-accent-purple mb-1">€25K</div>
                    <div class="text-sm text-white/70">Gesparte Agentur-Kosten</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Case Study 2: E-Commerce -->
        <div class="group animate-slide-up-stagger" style="animation-delay: 0.2s;">
          <div class="cyber-card rounded-2xl overflow-hidden">
            <div class="bg-surface-1 px-6 py-4 border-b border-accent-purple/30">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div class="w-3 h-3 rounded-full bg-accent-purple"></div>
                  <div class="code-font text-accent-purple">case_study_002.json</div>
                </div>
                <div class="flex items-center gap-2">
                  <div class="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs code-font">VERIFIED</div>
                  <div class="px-3 py-1 rounded-full bg-accent-purple/20 text-accent-purple text-xs code-font">4 MONATE</div>
                </div>
              </div>
            </div>
            
            <div class="p-8 lg:p-10">
              <div class="grid lg:grid-cols-2 gap-8">
                <div>
                  <div class="cyber-card rounded-xl p-6 mb-6">
                    <div class="code-font text-accent-purple text-sm mb-3">"company_profile":</div>
                    <h3 class="text-2xl font-bold text-white mb-3">EcoTech Store</h3>
                    <p class="text-white/80 mb-4">
                      Nachhaltiger Online-Shop für Smart Home Produkte. Bootstrap-Startup aus Hamburg.
                    </p>
                    <div class="flex flex-wrap gap-2">
                      <span class="px-3 py-1 rounded-full bg-accent-neon/20 text-accent-neon text-xs">E-Commerce</span>
                      <span class="px-3 py-1 rounded-full bg-accent-cyan/20 text-accent-cyan text-xs">Sustainability</span>
                      <span class="px-3 py-1 rounded-full bg-accent-orange/20 text-accent-orange text-xs">Hamburg</span>
                    </div>
                  </div>

                  <div class="glass-card rounded-xl p-6">
                    <div class="code-font text-accent-cyan text-sm mb-3">challenge.analyze()</div>
                    <p class="text-white/90 leading-relaxed">
                      <strong>Problem:</strong> Niedrige Conversion Rate (0.8%) und hohe Return Rate. 
                      Organischer Traffic vorhanden, aber schlechte User Experience.
                    </p>
                  </div>
                </div>

                <div>
                  <div class="neon-card rounded-xl p-6 mb-6">
                    <div class="code-font text-accent-purple text-sm mb-4">performance.metrics()</div>
                    
                    <div class="grid grid-cols-2 gap-4 mb-6">
                      <div class="text-center">
                        <div class="text-3xl font-bold text-glow-green mb-1">3.4%</div>
                        <div class="text-sm text-accent-cyan">Conversion Rate</div>
                        <div class="text-xs text-accent-neon">+325% Improvement</div>
                      </div>
                      <div class="text-center">
                        <div class="text-3xl font-bold text-glow-cyan mb-1">€125K</div>
                        <div class="text-sm text-accent-purple">Monatlicher Umsatz</div>
                        <div class="text-xs text-accent-neon">vs. €28K vorher</div>
                      </div>
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                      <div class="text-center">
                        <div class="text-2xl font-bold text-white mb-1">5.2%</div>
                        <div class="text-sm text-accent-orange">Return Rate</div>
                        <div class="text-xs text-accent-cyan">vs. 18% vorher</div>
                      </div>
                      <div class="text-center">
                        <div class="text-2xl font-bold text-white mb-1">€85</div>
                        <div class="text-sm text-accent-purple">Avg. Order Value</div>
                        <div class="text-xs text-accent-orange">+42% Increase</div>
                      </div>
                    </div>
                  </div>

                  <div class="cyber-card rounded-xl p-6">
                    <div class="code-font text-accent-orange text-sm mb-3">optimization.stack()</div>
                    <ul class="space-y-2 text-white/90 text-sm">
                      <li class="flex items-start gap-2">
                        <CheckIcon class="w-4 h-4 text-accent-neon mt-0.5 flex-shrink-0" />
                        <span>UX/UI Redesign der Product Pages</span>
                      </li>
                      <li class="flex items-start gap-2">
                        <CheckIcon class="w-4 h-4 text-accent-neon mt-0.5 flex-shrink-0" />
                        <span>Social Proof & Review-System Integration</span>
                      </li>
                      <li class="flex items-start gap-2">
                        <CheckIcon class="w-4 h-4 text-accent-neon mt-0.5 flex-shrink-0" />
                        <span>A/B Testing für Checkout-Optimierung</span>
                      </li>
                      <li class="flex items-start gap-2">
                        <CheckIcon class="w-4 h-4 text-accent-neon mt-0.5 flex-shrink-0" />
                        <span>Instagram & TikTok Marketing Setup</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div class="mt-8 glass-card rounded-xl p-6">
                <div class="code-font text-accent-purple text-sm mb-3">deal_structure.summary()</div>
                <div class="grid md:grid-cols-3 gap-6 text-center">
                  <div>
                    <div class="text-xl font-bold text-accent-purple mb-1">12%</div>
                    <div class="text-sm text-white/70">Equity Anteil</div>
                  </div>
                  <div>
                    <div class="text-xl font-bold text-accent-cyan mb-1">€500</div>
                    <div class="text-sm text-white/70">Monatliche Grundgebühr</div>
                  </div>
                  <div>
                    <div class="text-xl font-bold text-accent-neon mb-1">€18K</div>
                    <div class="text-sm text-white/70">Gesparte Agentur-Kosten</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Coming Soon -->
        <div class="group animate-slide-up-stagger" style="animation-delay: 0.4s;">
          <div class="neon-card rounded-2xl p-8 text-center">
            <div class="code-font text-accent-neon text-sm mb-4">
              <span class="text-accent-cyan">pipeline@trinsler:~$</span> loading --new-cases
            </div>
            
            <h3 class="text-2xl font-bold text-white mb-4">
              <span class="gradient-text-neon">WEITERE CASES</span> 
              <span class="text-accent-cyan">IN ARBEIT</span>
            </h3>
            
            <p class="text-white/80 mb-6 max-w-2xl mx-auto">
              3 weitere Partnerschaften laufen gerade an. Results kommen in Q2 2025.
            </p>

            <div class="flex justify-center gap-6">
              <div class="text-center">
                <div class="text-xl font-bold text-accent-cyan mb-1">3</div>
                <div class="text-sm text-white/70">Neue Partnerschaften</div>
              </div>
              <div class="text-center">
                <div class="text-xl font-bold text-accent-purple mb-1">Q2 2025</div>
                <div class="text-sm text-white/70">Erste Ergebnisse</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA Section -->
      <div class="text-center mt-20">
        <div class="cyber-card rounded-2xl max-w-4xl mx-auto p-8">
          <div class="code-font text-accent-neon text-sm mb-6">
            <span class="text-accent-cyan">growth@trinsler:~$</span> start --your-success-story
          </div>
          
          <h3 class="text-3xl font-bold text-white mb-6">
            <span class="text-accent-neon">IHR</span> 
            <span class="gradient-text-neon">SUCCESS STORY</span>
            <span class="text-accent-cyan"> WARTET</span>
          </h3>
          
          <p class="text-white/80 mb-8 max-w-2xl mx-auto">
            Werden Sie unsere nächste Erfolgsgeschichte. Equity-basierte Partnerschaft 
            mit messbaren Ergebnissen und transparenter Dokumentation.
          </p>
          
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <NuxtLink to="/contact" class="btn-primary code-font">
              <span>> START_PARTNERSHIP()</span>
              <ArrowRightIcon class="ml-2 h-5 w-5" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { CheckIcon, ArrowRightIcon } from '@heroicons/vue/24/outline'

useHead({
  title: 'Case Studies - Verified Success Stories | Trinsler',
  meta: [
    { name: 'description', content: 'Real results from our equity-for-growth partnerships. Verified case studies with measurable KPIs and concrete outcomes.' }
  ]
})
</script>