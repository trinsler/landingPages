<template>
  <div class="min-h-screen matrix-bg relative overflow-hidden pt-20">
    <!-- Background Effects -->
    <DataStreamBackground />

    <div class="relative container-custom py-20">
      <!-- Terminal Header -->
      <TerminalWindow title="Erfolgsgeschichten - Datenbank" class="mb-20">
        <div class="text-accent-neon text-sm mb-6">
          <span class="text-accent-cyan">Status:</span> Case Studies werden geladen
        </div>

        <h1 class="text-4xl sm:text-6xl font-black text-white mb-6 text-center">
          Verifizierte
          <br />
          <span class="gradient-text-neon">Erfolgsgeschichten</span>
        </h1>

        <div class="cyber-card rounded-xl p-6 max-w-3xl mx-auto">
          <div class="text-accent-purple text-sm mb-3">Validierungshinweis</div>
          <p class="text-lg text-white/90 leading-relaxed text-center">
            Echte Ergebnisse unserer ersten
            <span class="text-accent-neon">Pilot-Partnerschaften</span>
            mit messbaren KPIs und verifizierten Daten.
          </p>
        </div>
      </TerminalWindow>

      <!-- Case Studies Grid -->
      <CaseStudiesSection :case-studies="caseStudies" />

      <!-- CTA Section -->
      <div class="text-center mt-20">
        <CyberCard rounded="2xl" class="max-w-4xl mx-auto p-8">
          <div class="text-accent-neon text-sm mb-6">
            <span class="text-accent-cyan">Bereit für:</span> Ihre Erfolgsgeschichte
          </div>

          <h3 class="text-3xl font-bold text-white mb-6">
            <span class="text-accent-neon">Ihre</span>
            <span class="gradient-text-neon">Erfolgsgeschichte</span>
            <span class="text-accent-cyan"> wartet</span>
          </h3>

          <p class="text-white/80 mb-8 max-w-2xl mx-auto">
            Werden Sie unsere nächste Erfolgsgeschichte. Equity-basierte Partnerschaft mit messbaren
            Ergebnissen und transparenter Dokumentation.
          </p>

          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <NuxtLink to="/contact" class="btn-primary">
              <span>Partnerschaft starten</span>
            </NuxtLink>
          </div>
        </CyberCard>
      </div>
    </div>
  </div>
</template>

<script setup>
import { TerminalWindow, DataStreamBackground, CaseStudiesSection, CyberCard } from '@monorepo/ui'

useHead({
  title: 'Case Studies - Verified Success Stories | Trinsler',
  meta: [
    {
      name: 'description',
      content:
        'Real results from our equity-for-growth partnerships. Verified case studies with measurable KPIs and concrete outcomes.',
    },
  ],
})

const caseStudies = [
  {
    caseId: 'Fallstudie 001',
    titleColor: 'text-accent-cyan',
    status: 'Verifiziert',
    duration: '6 Monate',
    company: 'TechFlow SaaS',
    description: 'B2B Workflow-Automatisierung für KMUs. Pre-Series A Startup aus München.',
    tags: [
      { text: 'B2B SaaS', class: 'bg-accent-purple/20 text-accent-purple' },
      { text: 'Automation', class: 'bg-accent-cyan/20 text-accent-cyan' },
      { text: 'München', class: 'bg-accent-orange/20 text-accent-orange' },
    ],
    challenge:
      'Stagnation bei 15K MRR seit 8 Monaten. Hohe Customer Acquisition Costs (€450 per Kunde) und keine systematische Growth-Strategie.',
    primaryMetrics: [
      {
        value: '€38K',
        label: 'Monthly Recurring Revenue',
        change: '+153% Wachstum',
        valueClass: 'text-glow-green',
      },
      {
        value: '€180',
        label: 'Customer Acquisition Cost',
        change: '-60% Reduzierung',
        valueClass: 'text-glow-cyan',
      },
    ],
    secondaryMetrics: [
      { value: '47', label: 'Neue Kunden/Monat', change: 'vs. 12 vorher' },
      { value: '2.8%', label: 'Churn Rate', change: 'vs. 8.2% vorher' },
    ],
    solutions: [
      'Performance Marketing Optimierung (Google Ads, LinkedIn)',
      'Conversion Rate Optimierung der Landing Pages',
      'Email Marketing Automation & Lead Nurturing',
      'Product-Led Growth Features implementiert',
    ],
    summary: '8% Equity Anteil, €300 monatliche Grundgebühr, €25K gesparte Agentur-Kosten',
  },
  {
    caseId: 'Fallstudie 002',
    titleColor: 'text-accent-purple',
    status: 'Verifiziert',
    duration: '4 Monate',
    company: 'EcoTech Store',
    description: 'Nachhaltiger Online-Shop für Smart Home Produkte. Bootstrap-Startup aus Hamburg.',
    tags: [
      { text: 'E-Commerce', class: 'bg-accent-neon/20 text-accent-neon' },
      { text: 'Sustainability', class: 'bg-accent-cyan/20 text-accent-cyan' },
      { text: 'Hamburg', class: 'bg-accent-orange/20 text-accent-orange' },
    ],
    challenge:
      'Niedrige Conversion Rate (0.8%) und hohe Return Rate. Organischer Traffic vorhanden, aber schlechte User Experience.',
    primaryMetrics: [
      {
        value: '3.4%',
        label: 'Conversion Rate',
        change: '+325% Improvement',
        valueClass: 'text-glow-green',
      },
      {
        value: '€125K',
        label: 'Monatlicher Umsatz',
        change: 'vs. €28K vorher',
        valueClass: 'text-glow-cyan',
      },
    ],
    secondaryMetrics: [
      { value: '5.2%', label: 'Return Rate', change: 'vs. 18% vorher' },
      { value: '€85', label: 'Avg. Order Value', change: '+42% Increase' },
    ],
    solutions: [
      'UX/UI Redesign der Product Pages',
      'Social Proof & Review-System Integration',
      'A/B Testing für Checkout-Optimierung',
      'Instagram & TikTok Marketing Setup',
    ],
    summary: '12% Equity Anteil, €500 monatliche Grundgebühr, €18K gesparte Agentur-Kosten',
  },
]
</script>
