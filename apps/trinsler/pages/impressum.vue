<template>
  <div class="container-custom py-16 lg:py-24">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-4xl lg:text-5xl font-bold mb-8" style="font-family: 'Inter', system-ui, -apple-system, sans-serif; color: #243463">
        Impressum
      </h1>

      <div class="space-y-8">
        <section class="bg-gray-50 rounded-2xl p-8">
          <h2 class="text-2xl font-semibold mb-4" style="color: #243463;">Angaben gemäß § 5 TMG</h2>
          <div class="space-y-2 text-gray-700" style="font-family: 'Inter', system-ui, -apple-system, sans-serif;">
            <p>Niels Hensler</p>
            <p>Starenweg 13</p>
            <p>78224 Singen</p>
          </div>
        </section>

        <section class="bg-gray-50 rounded-2xl p-8">
          <h3 class="text-xl font-semibold mb-4" style="color: #243463;">Kontakt:</h3>
          <div class="text-gray-700" style="font-family: 'Inter', system-ui, -apple-system, sans-serif;">
            <p>E-Mail: info.trinsler@gmail.com</p>
          </div>
        </section>

        <section class="bg-gray-50 rounded-2xl p-8">
          <h2 class="text-2xl font-semibold mb-4" style="color: #243463;">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
          <div class="space-y-2 text-gray-700" style="font-family: 'Inter', system-ui, -apple-system, sans-serif;">
            <p>Niels Hensler</p>
            <p>Starenweg 13</p>
            <p>78224 Singen</p>
          </div>
        </section>

        <section class="bg-gray-50 rounded-2xl p-8">
          <h3 class="text-xl font-semibold mb-4" style="color: #243463;">Haftungsausschluss:</h3>
          <div class="space-y-4 text-gray-700 text-sm" style="font-family: 'Inter', system-ui, -apple-system, sans-serif;">
            <p>
              <strong>Haftung für Inhalte:</strong><br>
              Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich.
              Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen
              oder nach Umständen zu forschen, die auf rechtswidrige Tätigkeiten hinweisen.
            </p>
            <p>
              <strong>Haftung für Links:</strong><br>
              Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben.
              Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.
            </p>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'Impressum - Trinsler | Equity-for-Growth Revolution',
  meta: [
    { name: 'description', content: 'Impressum von Trinsler - Gesetzliche Angaben und Verantwortlicher für den Inhalt.' },
    { name: 'robots', content: 'index, follow' }
  ]
})
</script>