<template>
  <div class="scenario-info">
    <div class="scenario-description">
      <h2>About This Scenario</h2>
      <p>{{ scenarioData.description }}</p>
    </div>

    <div class="professor-message">
      <h2>Kurs-Einleitung</h2>
      <p v-if="scenarioData.professorMessage && scenarioData.professorMessage.length > 0">
        {{ scenarioData.professorMessage }}
      </p>
      <p v-else>
        Willkommen zu diesem Kurs. Bitte lesen Sie die Anweisungen sorgfältig durch und beantworten Sie die Fragen durchdacht. 
        Ihre Antworten werden automatisch anhand spezifischer Kriterien bewertet. Viel Erfolg!
      </p>
    </div>

    <div class="scenario-instructions">
      <h2>Anweisungen</h2>
      <ul>
        <li>Sie haben insgesamt {{ scenarioData.totalTime }} Minuten für die gesamte Prüfung</li>
        <li>Jede Frage hat ein Zeitlimit von {{ scenarioData.timePerQuestion }} Sekunden</li>
        <li>Antworten Sie in vollständigen Sätzen und schriftlicher Form</li>
        <li>Ihre Antworten werden automatisch nach definierten Kriterien bewertet</li>
        <li>Sie können jederzeit zur vorherigen Frage zurückkehren</li>
        <li>Denken Sie an die Schlüsselwörter in Ihren Antworten</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  scenarioData: {
    title: string;
    totalTime: number;
    totalQuestions: number;
    timePerQuestion: number;
    description: string;
    examId: string;
    difficulty: string;
    category: string;
    professorMessage?: string;
  };
}>()
</script>

<style scoped>
.scenario-description,
.professor-message,
.scenario-instructions {
  margin-bottom: 2rem;
}

.professor-message h2 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1rem;
}

.professor-message p {
  font-size: 1rem;
  line-height: 1.6;
  color: #4b5563;
  margin: 0;
}

.scenario-description h2,
.scenario-instructions h2 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1rem;
}

.scenario-description p {
  font-size: 1rem;
  line-height: 1.6;
  color: #4b5563;
  margin: 0;
}

.scenario-instructions ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.scenario-instructions li {
  position: relative;
  padding-left: 1.5rem;
  margin-bottom: 0.75rem;
  font-size: 1rem;
  line-height: 1.6;
  color: #4b5563;
}

.scenario-instructions li:before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.5rem;
  width: 8px;
  height: 8px;
  background-color: #0097b2;
  border-radius: 50%;
}
</style>