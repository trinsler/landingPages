<template>
  <div class="scenario-info">
    <div class="scenario-description">
      <h2>About This Scenario</h2>
      <p>{{ scenarioData.description }}</p>
    </div>

    <div v-if="scenarioData.professorMessage" class="professor-message">
      <h2>Message from Your Professor</h2>
      <p>{{ scenarioData.professorMessage }}</p>
    </div>

    <div class="scenario-instructions">
      <h2>Instructions</h2>
      <ul>
        <li>Each question shows an image or video for analysis</li>
        <li>You have {{ scenarioData.timePerQuestion }} seconds per question</li>
        <li>Press "Start Answer" to begin recording your response</li>
        <li>Speak clearly into your microphone</li>
        <li>Your responses will be recorded and analyzed</li>
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