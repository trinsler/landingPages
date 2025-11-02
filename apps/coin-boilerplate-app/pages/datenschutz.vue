<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6">Datenschutzerklärung</h1>

    <div class="space-y-6">
      <section class="bg-white rounded-lg shadow-sm p-6">
        <h2 class="text-2xl font-semibold mb-4">1. Datenschutz auf einen Blick</h2>

        <h3 class="text-xl font-semibold mb-3">Allgemeine Hinweise</h3>
        <p class="text-gray-700 mb-4">
          Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert,
          wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
        </p>
      </section>

      <section class="bg-white rounded-lg shadow-sm p-6">
        <h3 class="text-xl font-semibold mb-3">Datenerfassung auf dieser Website</h3>

        <h4 class="text-lg font-semibold mb-2">Wer ist verantwortlich für die Datenerfassung?</h4>
        <p class="text-gray-700 mb-4">
          Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem
          Impressum dieser Website entnehmen.
        </p>

        <h4 class="text-lg font-semibold mb-2">Wie erfassen wir Ihre Daten?</h4>
        <p class="text-gray-700 mb-4">
          Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Andere Daten werden automatisch
          durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z.B. Internetbrowser, Betriebssystem).
        </p>

        <h4 class="text-lg font-semibold mb-2">Wofür nutzen wir Ihre Daten?</h4>
        <p class="text-gray-700 mb-4">
          Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten.
          Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.
        </p>
      </section>

      <section class="bg-white rounded-lg shadow-sm p-6">
        <h2 class="text-2xl font-semibold mb-4">2. Kontaktformular</h2>
        <p class="text-gray-700 mb-4">
          Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular
          bei uns gespeichert und zum Zwecke der Bearbeitung der Anfrage bei uns aufbewahrt.
        </p>
      </section>

      <section class="bg-white rounded-lg shadow-sm p-6">
        <h2 class="text-2xl font-semibold mb-4">3. Ihre Rechte</h2>

        <h3 class="text-xl font-semibold mb-3">Auskunft, Löschung, Berichtigung</h3>
        <p class="text-gray-700 mb-4">
          Sie haben jederzeit das Recht, Auskunft über Ihre bei uns gespeicherten personenbezogenen Daten zu verlangen,
          deren Richtigkeit zu beanstanden und die Löschung oder Berichtigung zu fordern.
        </p>
      </section>

      <section class="bg-white rounded-lg shadow-sm p-6">
        <h2 class="text-2xl font-semibold mb-4">4. Aktualität und Änderung</h2>
        <p class="text-gray-700">
          Diese Datenschutzerklärung ist aktuell gültig und hat den Stand 01.01.2025.
          Durch die Weiterentwicklung unserer Website kann es notwendig werden, diese Datenschutzerklärung zu ändern.
        </p>
      </section>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'Datenschutz - Coin App',
  meta: [{ name: 'description', content: 'Datenschutzerklärung der Coin App' }],
})
</script>