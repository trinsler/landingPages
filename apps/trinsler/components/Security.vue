<template>
  <section class="relative py-20 lg:py-32 overflow-hidden matrix-bg">
    <!-- Cyber Grid -->
    <div class="absolute inset-0 cyber-grid opacity-15" />

    <!-- Security Data Streams -->
    <div class="absolute inset-0">
      <div
        class="animate-data-stream absolute left-10 w-1 h-40 bg-gradient-to-b from-transparent via-red-500 to-transparent"
        style="animation-delay: 0s"
      />
      <div
        class="animate-data-stream absolute right-16 w-1 h-36 bg-gradient-to-b from-transparent via-accent-neon to-transparent"
        style="animation-delay: 2s"
      />
    </div>

    <div class="relative container-custom">
      <!-- Security Header -->
      <div class="text-center max-w-4xl mx-auto mb-20">
        <div
          class="inline-flex items-center neon-card rounded-full px-6 py-3 text-sm font-semibold mb-6 animate-neon-flicker"
        >
          <span class="text-blue-600">SICHERHEIT</span>
          <span class="text-white ml-2">Oberste Priorität</span>
        </div>

        <h2 class="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6">
          <span class="text-blue-600">SICHERHEIT</span>
          <br />
          <span class="gradient-text-neon animate-glitch">ALS OBERSTE</span>
          <br />
          <span class="text-blue-400">PRIORITÄT</span>
        </h2>

        <div class="cyber-card rounded-xl p-6 max-w-3xl mx-auto">
          <div class="text-red-400 text-sm mb-3">Unser Security-Versprechen</div>
          <p class="text-lg text-white/90 leading-relaxed">
            <span class="text-accent-neon">Maximaler Schutz:</span> Ihre digitalen Assets sind bei uns durch
            <span class="font-bold text-glow-blue">Enterprise-Security, DSGVO-Compliance und 24/7 Monitoring</span>
            geschützt. Wir denken Sicherheit von Anfang an mit – nicht als Nachgedanke.
          </p>
        </div>
      </div>

      <!-- Security Features Grid -->
      <div class="grid lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-20">
        <div
          v-for="(feature, index) in securityFeatures"
          :key="feature.title"
          class="group relative animate-slide-up-stagger"
          :style="`animation-delay: ${index * 0.2}s`"
        >
          <!-- Security Terminal Window -->
          <div
            class="cyber-card rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02] animate-glow-pulse border border-red-500/30"
          >
            <!-- Terminal Header -->
            <div class="bg-surface-1 px-4 py-3 border-b border-red-500/30">
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 rounded-full bg-red-500" />
                <div class="w-3 h-3 rounded-full bg-yellow-500" />
                <div class="w-3 h-3 rounded-full bg-accent-neon" />
                <div class="ml-4 text-red-400 text-sm">Security/{{ feature.title }}</div>
              </div>
            </div>

            <!-- Terminal Content -->
            <div class="p-6 code-pattern">
              <!-- Security Status -->
              <div class="text-red-400 text-sm mb-4">
                <span class="text-accent-cyan">Status:</span> {{ feature.status }}
              </div>

              <!-- Security Level -->
              <div class="mb-6">
                <div class="text-blue-600 font-semibold text-sm">
                  {{ feature.level }}
                </div>
              </div>

              <!-- Feature Title -->
              <div class="mb-4">
                <div class="text-red-400 text-sm mb-1">Security Feature:</div>
                <h3 class="text-2xl font-bold text-white mb-2">
                  {{ feature.title }}
                </h3>
              </div>

              <!-- Description -->
              <div class="mb-6">
                <div class="text-accent-purple text-sm mb-2">Schutzmaßnahme</div>
                <p class="text-white/90 leading-relaxed">
                  {{ feature.description }}
                </p>
              </div>

              <!-- Security Benefits -->
              <div class="mb-6">
                <div class="text-accent-cyan text-sm mb-3">Vorteile</div>
                <ul class="space-y-2 ml-4">
                  <li
                    v-for="(benefit, idx) in feature.benefits"
                    :key="benefit"
                    class="flex items-center text-white/90 text-sm"
                  >
                    <span class="text-red-400 mr-3">{{ idx + 1 }}.</span>
                    <span>{{ benefit }}</span>
                  </li>
                </ul>
              </div>

              <!-- Security Level -->
              <div class="neon-card rounded-xl p-4 border border-red-500/20">
                <div class="text-red-400 text-sm mb-2">Security Level</div>
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <div class="text-xs text-accent-cyan mb-1">Schutz:</div>
                    <div class="font-bold text-glow-green text-lg">{{ feature.protection }}</div>
                  </div>
                  <div>
                    <div class="text-xs text-accent-purple mb-1">Compliance:</div>
                    <div class="font-bold text-glow-cyan text-lg">{{ feature.compliance }}</div>
                  </div>
                </div>
              </div>

              <!-- Security Status -->
              <div class="mt-4 flex items-center justify-between text-xs">
                <span class="text-white/60">Security Status:</span>
                <span class="text-blue-400">Aktiv Geschützt</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Security CTA Section -->
      <div class="text-center">
        <div class="cyber-card rounded-2xl overflow-hidden max-w-5xl mx-auto animate-glow-pulse border border-red-500/30">
          <!-- Terminal Header -->
          <div class="bg-surface-1 px-6 py-4 border-b border-red-500/30">
            <div class="flex items-center gap-3">
              <div class="w-3 h-3 rounded-full bg-red-500" />
              <div class="w-3 h-3 rounded-full bg-yellow-500" />
              <div class="w-3 h-3 rounded-full bg-accent-neon" />
              <div class="ml-4 text-red-400">Security-Assessment anfordern</div>
            </div>
          </div>

          <!-- Terminal Content -->
          <div class="p-8 lg:p-12 code-pattern">
            <!-- Call to Action -->
            <div class="text-red-400 text-sm mb-6">
              <span class="text-accent-cyan">Bereit für:</span> Maximale IT-Sicherheit
            </div>

            <!-- ASCII Security Banner -->
            <div class="code-font text-red-400 text-xs mb-8 overflow-hidden">
              <pre class="text-center animate-slide-up-stagger">
  ╔═══════════════════════════════════════╗
  ║         SECURITY FIRST               ║
  ║           ALWAYS ON                   ║
  ╚═══════════════════════════════════════╝
              </pre>
            </div>

            <!-- Main Message -->
            <div class="mb-8">
              <h3 class="text-3xl lg:text-4xl font-bold text-white mb-6 animate-glitch">
                Sichern Sie Ihr
                <span class="gradient-text-neon">Unternehmen</span>
              </h3>

              <!-- Security Block Description -->
              <div class="cyber-card rounded-xl p-6 max-w-3xl mx-auto mb-8 border border-red-500/20">
                <div class="text-red-400 text-sm mb-3">Security-Versprechen</div>
                <p class="text-lg text-white/90 leading-relaxed mb-4">
                  <span class="text-accent-cyan">Garantie:</span> 24/7 Schutz + DSGVO-Compliance + Penetration-Tests
                  = Absolute Datensicherheit für Ihr Unternehmen
                </p>
                <div class="text-accent-orange text-sm">
                  Lassen Sie uns Ihre IT-Sicherheit auf Enterprise-Level bringen!
                </div>
              </div>
            </div>

            <!-- Security Command Buttons -->
            <div class="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
              <NuxtLink to="/contact" class="btn-primary group animate-glow-pulse">
                <span>Kostenloses Security-Assessment</span>
              </NuxtLink>
              <NuxtLink to="/portfolio" class="btn-secondary"> Security-Referenzen </NuxtLink>
            </div>

            <!-- Security Status -->
            <div class="border-t border-red-500/20 pt-6">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                <div class="text-center">
                  <div class="text-red-400 mb-1">Monitoring:</div>
                  <div class="text-accent-neon">● 24/7 Aktiv</div>
                </div>
                <div class="text-center">
                  <div class="text-accent-purple mb-1">DSGVO-Status:</div>
                  <div class="text-white font-bold">100% Konform</div>
                </div>
                <div class="text-center">
                  <div class="text-accent-orange mb-1">Pen-Tests:</div>
                  <div class="text-glow-green font-bold">Regelmäßig</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const securityFeatures = [
  {
    title: 'DSGVO-Compliance',
    description:
      'Vollständige DSGVO-konforme Umsetzung aller digitalen Lösungen. Datenschutz by Design und by Default für rechtssichere Geschäftsprozesse.',
    iconBg: 'bg-gradient-to-r from-blue-600 to-indigo-600',
    status: 'AKTIV',
    level: 'EU-KONFORM',
    protection: 'Rechtsicher',
    compliance: 'DSGVO',
    benefits: [
      'Datenschutz by Design & Default',
      'Rechtssichere Datenverarbeitung',
      'Dokumentierte Compliance-Prozesse',
      'Regelmäßige Datenschutz-Audits',
      'Anonymisierung & Pseudonymisierung',
    ],
  },
  {
    title: 'Cyber-Security',
    description:
      'Proaktive Cyber-Security mit modernsten Sicherheitstechnologien. Schutz vor Angriffen, Malware und Datenlecks durch mehrschichtige Sicherheitsarchitektur.',
    iconBg: 'bg-gradient-to-r from-red-600 to-pink-600',
    status: 'GESCHÜTZT',
    level: 'ENTERPRISE',
    protection: 'Multi-Layer',
    compliance: 'ISO 27001',
    benefits: [
      'Firewall & Intrusion Detection',
      'Malware-Schutz & Anti-Virus',
      'DDoS-Protection',
      'Vulnerability Scanning',
      'Incident Response Plan',
    ],
  },
  {
    title: '24/7 Monitoring',
    description:
      'Kontinuierliche Überwachung Ihrer IT-Systeme rund um die Uhr. Proaktive Erkennung von Bedrohungen und automatische Reaktion auf Sicherheitsvorfälle.',
    iconBg: 'bg-gradient-to-r from-green-500 to-emerald-500',
    status: 'ONLINE',
    level: 'REALTIME',
    protection: '24/7',
    compliance: 'SLA 99.9%',
    benefits: [
      'Echtzeit-Überwachung aller Systeme',
      'Automatische Threat Detection',
      'Sofortige Benachrichtigungen',
      'Performance & Security Metrics',
      'Präventive Wartung',
    ],
  },
  {
    title: 'Verschlüsselung',
    description:
      'End-to-End Verschlüsselung aller Datenübertragungen und Speicher. AES-256 Verschlüsselung und sichere Schlüsselverwaltung für maximalen Datenschutz.',
    iconBg: 'bg-gradient-to-r from-purple-600 to-blue-600',
    status: 'VERSCHLÜSSELT',
    level: 'AES-256',
    protection: 'End-to-End',
    compliance: 'Military-Grade',
    benefits: [
      'AES-256 Verschlüsselung',
      'TLS 1.3 für Übertragungen',
      'Sichere Schlüsselverwaltung',
      'Zero-Knowledge Architecture',
      'Perfect Forward Secrecy',
    ],
  },
  {
    title: 'Penetration-Tests',
    description:
      'Regelmäßige ethische Hacking-Tests zur Identifikation von Sicherheitslücken. Professionelle Security-Audits durch zertifizierte Penetration-Tester.',
    iconBg: 'bg-gradient-to-r from-orange-500 to-red-500',
    status: 'GETESTET',
    level: 'CERTIFIED',
    protection: 'Proaktiv',
    compliance: 'OWASP',
    benefits: [
      'Ethische Hacking-Tests',
      'OWASP Top 10 Compliance',
      'Vulnerability Assessment',
      'Security Code Review',
      'Detaillierte Security-Reports',
    ],
  },
  {
    title: 'Backup & Recovery',
    description:
      'Automatisierte Backup-Strategien und Disaster Recovery Pläne. Georedundante Datensicherung mit garantierten Recovery-Zeiten für Business Continuity.',
    iconBg: 'bg-gradient-to-r from-teal-500 to-cyan-500',
    status: 'GESICHERT',
    level: 'GEOREDUNDANT',
    protection: 'Automatisch',
    compliance: 'RTO < 4h',
    benefits: [
      'Automatische tägliche Backups',
      'Georedundante Speicherung',
      'Point-in-Time Recovery',
      'Disaster Recovery Plan',
      'Business Continuity Management',
    ],
  },
]
</script>