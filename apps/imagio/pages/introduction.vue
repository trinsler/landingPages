<template>
  <div class="introduction-screen">
    <div class="introduction-content">
      <div class="scenario-header">
        <div class="scenario-info">
          <h1 class="scenario-title">{{ scenarioData.title }}</h1>
          <div class="scenario-meta">
            <span class="scenario-code">Code: {{ scenarioCode }}</span>
          </div>
        </div>
      </div>

      <div class="scenario-details">
        <div class="detail-card">
          <div class="detail-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 6v6l4 2"/>
            </svg>
          </div>
          <div class="detail-content">
            <h3>Total Duration</h3>
            <p>{{ scenarioData.totalTime }} minutes</p>
          </div>
        </div>

        <div class="detail-card">
          <div class="detail-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 11H3v2h6v-2zm0-4H3v2h6V7zm0 8H3v2h6v-2zm12-8h-6v2h6V7zm0 4h-6v2h6v-2zm0 4h-6v2h6v-2z"/>
            </svg>
          </div>
          <div class="detail-content">
            <h3>Questions</h3>
            <p>{{ scenarioData.totalQuestions }} questions</p>
          </div>
        </div>

        <div class="detail-card">
          <div class="detail-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
            </svg>
          </div>
          <div class="detail-content">
            <h3>Time per Question</h3>
            <p>{{ scenarioData.timePerQuestion }} seconds</p>
          </div>
        </div>
      </div>

      <div class="scenario-description">
        <h2>About This Scenario</h2>
        <p>{{ scenarioData.description }}</p>
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

      <div class="action-area">
        <button @click="startScenario" class="start-button">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="5 3 19 12 5 21 5 3"/>
          </svg>
          Start Scenario
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const scenarioCode = ref('')
const scenarioData = ref({
  title: 'Business Communication Skills',
  totalTime: 15,
  totalQuestions: 10,
  timePerQuestion: 45,
  description: 'This scenario assesses your ability to analyze visual information and communicate effectively in a business context. You will be presented with various business-related images and asked to provide detailed verbal responses.',
  difficulty: 'Intermediate',
  category: 'Communication'
})

onMounted(() => {
  const savedCode = localStorage.getItem('currentScenarioCode')
  if (savedCode) {
    scenarioCode.value = savedCode
    loadScenarioData(savedCode)
  } else {
    router.push('/')
  }
})

const loadScenarioData = (code: string) => {
  // In a real application, this would load data from an API
  // For now, we'll use mock data based on the code
  const scenarios = {
    'BC001': {
      title: 'Business Communication Skills',
      totalTime: 15,
      totalQuestions: 10,
      timePerQuestion: 45,
      description: 'This scenario assesses your ability to analyze visual information and communicate effectively in a business context.'
    },
    'TL002': {
      title: 'Team Leadership Assessment',
      totalTime: 12,
      totalQuestions: 8,
      timePerQuestion: 60,
      description: 'Evaluate your leadership potential through scenario-based questions about team management and decision-making.'
    },
    'CS003': {
      title: 'Customer Service Excellence',
      totalTime: 10,
      totalQuestions: 6,
      timePerQuestion: 50,
      description: 'Test your customer service skills with realistic scenarios and communication challenges.'
    }
  }
  
  if (scenarios[code as keyof typeof scenarios]) {
    scenarioData.value = { ...scenarioData.value, ...scenarios[code as keyof typeof scenarios] }
  }
}

const startScenario = () => {
  router.push('/game')
}
</script>

<style scoped>
.introduction-screen {
  min-height: calc(100vh - 64px);
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.introduction-content {
  max-width: 800px;
  width: 100%;
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  padding: 3rem;
  border: 1px solid #e5e7eb;
}

.scenario-header {
  text-align: center;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 2px solid #f1f5f9;
}

.scenario-title {
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.scenario-code {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background-color: #0097b2;
  color: #ffffff;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
}

.scenario-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.detail-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background-color: #f8fafc;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  border-left: 4px solid #0097b2;
  transition: all 0.2s;
}

.detail-card:hover {
  border-color: #0097b2;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 151, 178, 0.15);
}

.detail-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background-color: #0097b2;
  color: #ffffff;
  border-radius: 50%;
  flex-shrink: 0;
}

.detail-content h3 {
  font-size: 0.875rem;
  font-weight: 600;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.25rem;
}

.detail-content p {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
}

.scenario-description,
.scenario-instructions {
  margin-bottom: 2rem;
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

.action-area {
  text-align: center;
  padding-top: 2rem;
  border-top: 2px solid #f1f5f9;
}

.start-button {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 3rem;
  background-color: #0097b2;
  color: #ffffff;
  border: none;
  border-radius: 12px;
  font-size: 1.125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.start-button:hover {
  background-color: #007a8e;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 151, 178, 0.3);
}

.start-button:active {
  transform: translateY(0);
}

/* Responsive Design */
@media (max-width: 768px) {
  .introduction-screen {
    padding: 1rem;
  }
  
  .introduction-content {
    padding: 2rem;
  }
  
  .scenario-title {
    font-size: 1.5rem;
  }
  
  .scenario-details {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .detail-card {
    padding: 1rem;
  }
  
  .start-button {
    padding: 0.875rem 2rem;
    font-size: 1rem;
  }
}
</style>