<template>
  <section class="py-24 lg:py-32 bg-gradient-to-b from-custom-white to-custom-secondary/5 relative">
    <!-- Creative Background -->
    <div class="absolute inset-0">
      <div class="absolute top-20 left-10 w-64 h-64 bg-custom-primary/5 rounded-full blur-3xl"></div>
      <div class="absolute bottom-20 right-10 w-96 h-96 bg-custom-secondary/10 rounded-full blur-3xl"></div>
    </div>
    
    <div class="container mx-auto px-6 lg:px-8 relative">
      <div class="text-center mb-20">
        <div class="inline-flex items-center space-x-3 bg-gradient-to-r from-custom-primary/10 to-custom-secondary/10 rounded-full px-6 py-3 mb-8 border border-custom-secondary/20">
          <svg class="w-5 h-5 text-custom-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <span class="text-custom-primary font-semibold">Häufige Fragen</span>
        </div>
        
        <h2 class="text-4xl lg:text-6xl font-bold text-custom-primary mb-6 leading-tight">
          Fragen &
          <br>
          <span class="text-3xl lg:text-5xl font-light bg-gradient-to-r from-custom-primary to-custom-secondary bg-clip-text text-transparent">Antworten</span>
        </h2>
        
        <p class="text-lg lg:text-xl text-custom-primary/70 max-w-3xl mx-auto leading-relaxed font-light">
          Antworten auf die wichtigsten Fragen rund um BetterClassroom und die Demo.
        </p>
      </div>

      <div class="max-w-4xl mx-auto">
        <div class="space-y-6">
          <!-- FAQ Item 1 -->
          <div class="bg-custom-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-custom-secondary/20 group">
            <h3 class="text-xl font-bold mb-4 text-custom-primary group-hover:text-custom-secondary transition-colors duration-300">Wie lange dauert die Implementierung?</h3>
            <p class="text-custom-primary/70 leading-relaxed font-light">
              Die Implementierung von BetterClassroom dauert in der Regel 4-8 Wochen, abhängig von der Größe Ihrer Einrichtung und den gewünschten Anpassungen. An der HTWG Konstanz war das System nach 6 Wochen vollständig einsatzbereit.
            </p>
          </div>

          <!-- FAQ Item 2 -->
          <div class="bg-custom-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-custom-secondary/20 group">
            <h3 class="text-xl font-bold mb-4 text-custom-primary group-hover:text-custom-secondary transition-colors duration-300">Welche technischen Voraussetzungen gibt es?</h3>
            <p class="text-custom-primary/70 leading-relaxed font-light">
              BetterClassroom ist eine webbasierte Lösung, die in jedem modernen Browser funktioniert. Sie benötigen lediglich eine stabile Internetverbindung und können optional unsere Cloud-Infrastruktur nutzen oder eine On-Premise-Installation wählen.
            </p>
          </div>

          <!-- FAQ Item 3 -->
          <div class="bg-custom-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-custom-secondary/20 group">
            <h3 class="text-xl font-bold mb-4 text-custom-primary group-hover:text-custom-secondary transition-colors duration-300">Wie wird die Datensicherheit gewährleistet?</h3>
            <p class="text-custom-primary/70 leading-relaxed font-light">
              BetterClassroom ist vollständig DSGVO-konform und nutzt End-to-End-Verschlüsselung. Alle Daten werden in deutschen Rechenzentren gespeichert und unterliegen strengsten Sicherheitsstandards. Regelmäßige Security-Audits garantieren höchste Datensicherheit.
            </p>
          </div>

          <!-- FAQ Item 4 -->
          <div class="bg-custom-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-custom-secondary/20 group">
            <h3 class="text-xl font-bold mb-4 text-custom-primary group-hover:text-custom-secondary transition-colors duration-300">Können wir BetterClassroom vor dem Kauf testen?</h3>
            <p class="text-custom-primary/70 leading-relaxed font-light">
              Ja! Nach der Demo bieten wir einen 30-tägigen Testzugang mit vollem Funktionsumfang an. So können Sie BetterClassroom in Ihrem realen Unterrichtsumfeld ausgiebig testen, bevor Sie sich entscheiden.
            </p>
          </div>

          <!-- FAQ Item 5 -->
          <div class="bg-custom-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-custom-secondary/20 group">
            <h3 class="text-xl font-bold mb-4 text-custom-primary group-hover:text-custom-secondary transition-colors duration-300">Welche Unterstützung erhalten wir nach der Implementierung?</h3>
            <p class="text-custom-primary/70 leading-relaxed font-light">
              Wir bieten umfassenden 24/7 Support, regelmäßige Schulungen für neue Mitarbeiter, kontinuierliche Updates und eine dedizierte Ansprechperson für Ihre Einrichtung. Zusätzlich erhalten Sie Zugang zu unserer Online-Wissensdatenbank und Community.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>