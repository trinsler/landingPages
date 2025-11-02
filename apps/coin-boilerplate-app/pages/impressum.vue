<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6">Impressum</h1>

    <div class="space-y-6">
      <section class="bg-white rounded-lg shadow-sm p-6">
        <h2 class="text-2xl font-semibold mb-4">Angaben gemäß § 5 TMG</h2>
        <div class="space-y-1 text-gray-700">
          <p>Niels Hensler</p>
          <p>Starenweg 13</p>
          <p>78224 Singen</p>
        </div>
      </section>

      <section class="bg-white rounded-lg shadow-sm p-6">
        <p class="mb-4">Einzelunternehmer</p>

        <h3 class="text-xl font-semibold mb-2">Kontakt:</h3>
        <p class="mb-4">E-Mail: info.trinsler@gmail.com</p>
      </section>

      <section class="bg-white rounded-lg shadow-sm p-6">
        <h2 class="text-2xl font-semibold mb-4">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
        <div class="space-y-1 text-gray-700">
          <p>Niels Hensler</p>
          <p>Starenweg 13</p>
          <p>78224 Singen</p>
        </div>
      </section>

      <section class="bg-white rounded-lg shadow-sm p-6">
        <h3 class="text-xl font-semibold mb-4">Haftungsausschluss:</h3>
        <div class="space-y-3 text-sm text-gray-600">
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
</template>

<script setup>
useHead({
  title: 'Impressum - Coin App',
  meta: [{ name: 'description', content: 'Impressum der Coin App' }],
})
</script>