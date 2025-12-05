<template>
  <div class="introduction-screen">
    <div class="introduction-content">
      <!-- Scenario Header -->
      <ScenarioHeader 
        :scenarioData="scenarioData" 
        :scenarioCode="scenarioCode" 
        :currentAttempt="currentAttempt"
      />
      
      <!-- Scenario Details -->
      <ScenarioDetails :scenarioData="scenarioData" />
      
      <!-- Scenario Information -->
      <ScenarioInfo :scenarioData="scenarioData" />
      
      <!-- Start Button -->
      <StartButton @startScenario="startScenario" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useExamStore } from '~/composables/useExamStore'
import ScenarioHeader from '~/components/introduction/ScenarioHeader.vue'
import ScenarioDetails from '~/components/introduction/ScenarioDetails.vue'
import ScenarioInfo from '~/components/introduction/ScenarioInfo.vue'
import StartButton from '~/components/introduction/StartButton.vue'

const router = useRouter()
const examStore = useExamStore()
const scenarioCode = ref('')
const currentAttempt = ref(1)
const scenarioData = ref({
  title: 'Course Loading...',
  totalTime: 0,
  totalQuestions: 0,
  timePerQuestion: 0,
  description: '',
  examId: '',
  difficulty: 'Intermediate',
  category: 'Communication',
  professorMessage: '',
  attempts: 3
})

onMounted(async () => {
  const savedCode = localStorage.getItem('currentScenarioCode')
  if (savedCode) {
    scenarioCode.value = savedCode
    await loadScenarioData(savedCode)
    loadAttemptData(savedCode)
  } else {
    router.push('/')
  }
})

const loadScenarioData = async (code: string) => {
  try {
    console.log(`Loading EXACT course data for code: ${code}`)
    
    // Load course from backend API
    const response = await $fetch('/api/courses', {
      method: 'GET'
    })
    
    // Find the course by code (exact match)
    const course = response.courses.find((c: any) => c.code === code)
    
    if (!course) {
      console.error('Course not found:', code)
      console.error('Available courses:', response.courses.map((c: any) => c.code))
      router.push('/')
      return
    }
    
    console.log('Found course:', course)
    
    // Now load the EXACT exam data that the admin created
    try {
      const examResponse = await $fetch(`/api/courses/${code}/exam`, {
        method: 'GET'
      })
      
      console.log('Loaded EXACT exam data:', examResponse)
      
      if (examResponse && examResponse.exam) {
        scenarioData.value = {
          title: course.title,
          totalTime: course.totalTime,
          totalQuestions: course.totalQuestions,
          timePerQuestion: course.timePerQuestion,
          description: course.description,
          examId: course.examId || examResponse.exam.id,
          difficulty: 'Level ' + course.level,
          category: 'Custom Course',
          // Use the EXACT introduction text that admin entered
          professorMessage: examResponse.exam.sourceText || examResponse.exam.description || 'Welcome to this scenario! Please read the instructions carefully and take your time to provide thoughtful answers. Good luck!',
          attempts: course.maxAttempts || 3
        }
        console.log('Final scenario data loaded:', scenarioData.value)
      } else {
        // Fallback if no exam found yet
        scenarioData.value = {
          title: course.title,
          totalTime: course.totalTime,
          totalQuestions: course.totalQuestions,
          timePerQuestion: course.timePerQuestion,
          description: course.description,
          examId: course.examId || 'default',
          difficulty: 'Level ' + course.level,
          category: 'Custom Course',
          professorMessage: course.description || 'Welcome to this scenario! Please read the instructions carefully and take your time to provide thoughtful answers. Good luck!',
          attempts: course.maxAttempts || 3
        }
      }
    } catch (examError) {
      console.warn('No specific exam found, using basic course data:', examError)
      // Use basic course data if exam not found
      scenarioData.value = {
        title: course.title,
        totalTime: course.totalTime,
        totalQuestions: course.totalQuestions,
        timePerQuestion: course.timePerQuestion,
        description: course.description,
        examId: course.examId || 'default',
        difficulty: 'Level ' + course.level,
        category: 'Custom Course',
        professorMessage: course.description || 'Welcome to this scenario! Please read the instructions carefully and take your time to provide thoughtful answers. Good luck!',
        attempts: course.maxAttempts || 3
      }
    }
  } catch (error) {
    console.error('Error loading course:', error)
    router.push('/')
  }
}

const loadAttemptData = (code: string) => {
  // Load current attempt from localStorage or start with 1
  const attemptKey = `attempt_${code}`
  const savedAttempt = localStorage.getItem(attemptKey)
  currentAttempt.value = savedAttempt ? parseInt(savedAttempt) : 1
}

const startScenario = () => {
  // Check if user has exceeded attempts
  if (currentAttempt.value > (scenarioData.value.attempts || 3)) {
    alert('Sie haben bereits alle verfügbaren Versuche aufgebraucht.')
    return
  }
  
  // Store minimal exam data for direct start
  localStorage.setItem('currentExamData', JSON.stringify({
    id: scenarioData.value.examId,
    title: scenarioData.value.title,
    timeLimit: scenarioData.value.totalTime * 60, // Convert minutes to seconds
    attempt: currentAttempt.value
  }))
  
  // Increment attempt for next time
  const attemptKey = `attempt_${scenarioCode.value}`
  localStorage.setItem(attemptKey, (currentAttempt.value + 1).toString())
  
  router.push('/exam-taking')
}
</script>

<style scoped>
.introduction-screen {
  min-height: calc(100vh - 64px);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  padding: 2rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.introduction-content {
  max-width: 800px;
  width: 100%;
  padding: 3rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .introduction-screen {
    min-height: calc(100vh - 56px);
    padding: 1rem;
  }
  
  .introduction-content {
    padding: 2rem;
  }
}
</style>