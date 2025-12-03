<template>
  <div class="admin-page">
    <!-- Admin Header -->
    <div class="admin-header">
      <div class="admin-header-content">
        <div class="header-main">
          <div class="header-text">
            <h1 class="admin-title">Admin Dashboard</h1>
            <p class="admin-subtitle">Szenarien verwalten</p>
          </div>
          <button @click="createNewScenario" class="primary-button">
            Neues Szenario
          </button>
        </div>
      </div>
    </div>

    <!-- Main Content Area -->
    <main class="admin-main">
      <div class="view-header">
        <h2 class="view-title">Scenarios</h2>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="loading-state">
        Lade Szenarien...
      </div>

      <!-- Error State -->
      <div v-if="loadError" class="error-state">
        {{ loadError }}
      </div>

      <!-- Scenarios Grid -->
      <div v-else class="scenarios-grid">
        <div
          v-for="scenario in scenarios"
          :key="scenario.id"
          class="scenario-card"
        >
          <div class="scenario-card-content" @click="editScenario(scenario)">
            <div class="scenario-card-header">
              <h3 class="scenario-name">{{ scenario.name }}</h3>
              <div class="scenario-code-badge">{{ scenario.code }}</div>
            </div>

            <div class="scenario-stats">
              <span class="scenario-stat">
                Level {{ scenario.level }}
              </span>
              <span class="scenario-stat">
                {{ scenario.questionsCount || 0 }} Fragen
              </span>
            </div>

            <div class="scenario-description">
              {{ scenario.description || 'Keine Beschreibung' }}
            </div>
          </div>

          <div class="scenario-card-actions">
            <button
              @click.stop="deleteScenario(scenario)"
              class="delete-scenario-button"
              :disabled="scenario.isDeleting"
            >
              <span v-if="scenario.isDeleting">Lösche...</span>
              <span v-else>Löschen</span>
            </button>
          </div>
        </div>

        <div v-if="scenarios.length === 0 && !isLoading" class="empty-state">
          <p class="empty-text">Noch keine Szenarien vorhanden</p>
          <p class="empty-subtext">Klicke auf "Neues Szenario" um zu beginnen</p>
        </div>
      </div>
    </main>

    <!-- Fullscreen Scenario Editor -->
    <div v-if="showScenarioEditor" class="fullscreen-editor with-header">
      <div class="editor-header">
        <div class="editor-title-section">
          <h1 class="editor-title">{{ selectedScenario?.name }}</h1>
          <p class="editor-subtitle">{{ selectedScenario?.code }}</p>
        </div>
        <button @click="closeEditor" class="editor-close">
          Schließen
        </button>
      </div>

      <!-- Tab Navigation -->
      <nav class="editor-nav">
        <button
          @click="activeEditorTab = 'info'"
          class="editor-tab"
          :class="{ active: activeEditorTab === 'info' }"
        >
          Kurs-Info
        </button>
        <button
          @click="activeEditorTab = 'questions'"
          class="editor-tab"
          :class="{ active: activeEditorTab === 'questions' }"
        >
          Fragen
        </button>
      </nav>

      <!-- Editor Content -->
      <div class="editor-content">
        <!-- Course Info Tab -->
        <div v-if="activeEditorTab === 'info'" class="editor-section">
          <div class="section-header">
            <h2 class="section-title">Kurs-Informationen</h2>
          </div>

          <div class="course-info-form">
            <div class="form-field">
              <label class="form-label">Kurs-Name</label>
              <input
                v-model="selectedScenario.name"
                type="text"
                class="form-input"
                placeholder="Gib den Kurs-Namen ein"
              >
            </div>

            <div class="form-field">
              <label class="form-label">Kurs-Code (Startcode für Studenten)</label>
              <input
                v-model="selectedScenario.code"
                type="text"
                class="form-input"
                placeholder="z.B. CS001 oder ABC123"
              >
            </div>

            <div class="form-field">
              <label class="form-label">Level (1-4)</label>
              <input
                v-model.number="selectedScenario.level"
                type="number"
                min="1"
                max="4"
                class="form-input"
              >
            </div>

            <div class="form-field">
              <label class="form-label">Beschreibung</label>
              <textarea
                v-model="selectedScenario.description"
                class="form-textarea"
                rows="4"
                placeholder="Beschreibe den Kurs..."
              ></textarea>
            </div>

            <div class="form-field">
              <label class="form-label">Kurs-Einleitung / Quelltext</label>
              <textarea
                v-model="selectedScenario.introduction"
                class="form-textarea large"
                rows="8"
                placeholder="Diese Einleitung wird den Studenten zu Beginn des Kurses gezeigt..."
              ></textarea>
            </div>

            <div class="form-grid">
              <div class="form-field">
                <label class="form-label">Gesamtzeit (Minuten)</label>
                <input
                  v-model.number="selectedScenario.totalTime"
                  type="number"
                  class="form-input"
                  placeholder="z.B. 10"
                >
              </div>

              <div class="form-field">
                <label class="form-label">Zeit pro Frage (Sekunden)</label>
                <input
                  v-model.number="selectedScenario.timePerQuestion"
                  type="number"
                  class="form-input"
                  placeholder="z.B. 60"
                >
              </div>
            </div>
          </div>
        </div>

        <!-- Questions Tab -->
        <div v-if="activeEditorTab === 'questions'" class="editor-section">
          <div class="section-header">
            <h2 class="section-title">Fragen ({{ manualQuestions.length }})</h2>
            <button @click="addNewQuestion" class="add-button">
              Neue Frage
            </button>
          </div>

          <div class="questions-list">
            <div
              v-for="(question, index) in manualQuestions"
              :key="question.tempId || question.id"
              class="question-item"
            >
              <div class="question-header">
                <div class="question-title-group">
                  <span class="question-number">Frage {{ index + 1 }}</span>
                </div>
                <div class="question-actions">
                  <button @click="duplicateQuestion(index)" class="action-button duplicate">
                    Duplizieren
                  </button>
                  <button @click="removeQuestion(index)" class="action-button remove">
                    Löschen
                  </button>
                </div>
              </div>

              <div class="question-form">
                <div class="form-field">
                  <label class="form-label">Frage</label>
                  <textarea
                    v-model="question.text"
                    placeholder="Gib hier die Frage ein..."
                    class="form-textarea"
                    rows="2"
                  ></textarea>
                </div>

                <div class="form-field">
                  <label class="form-label">Musterantwort</label>
                  <textarea
                    v-model="question.answer"
                    placeholder="Gib hier die erwartete Antwort ein..."
                    class="form-textarea"
                    rows="3"
                  ></textarea>
                </div>

                <div class="form-field">
                  <label class="form-label">Schwierigkeit</label>
                  <select v-model="question.difficulty" class="form-input">
                    <option value="EASY">Einfach</option>
                    <option value="MEDIUM">Mittel</option>
                    <option value="HARD">Schwierig</option>
                  </select>
                </div>

                <div class="form-field">
                  <div class="form-label-with-button">
                    <label class="form-label">Keywords (durch Komma getrennt)</label>
                    <button
                      @click="generateKeywordsForQuestion(question)"
                      class="ai-generate-button"
                      :disabled="!question.answer || question.answer.trim().length === 0 || question.isGeneratingKeywords"
                      type="button"
                    >
                      <span v-if="question.isGeneratingKeywords">
                        Generiere...
                      </span>
                      <span v-else>
                        KI Keywords generieren
                      </span>
                    </button>
                  </div>
                  <input
                    v-model="question.keywordsText"
                    type="text"
                    placeholder="z.B. algorithmus, computer, programmierung"
                    class="form-input"
                    @input="updateKeywordsFromText(question)"
                  >
                  <div class="keywords-preview">
                    <span v-for="(keyword, i) in question.keywords" :key="i" class="keyword-tag">
                      {{ keyword }}
                    </span>
                  </div>
                  <div v-if="question.keywordError" class="keyword-error">
                    {{ question.keywordError }}
                  </div>
                </div>
              </div>
            </div>

            <div v-if="manualQuestions.length === 0" class="empty-state">
              <p class="empty-text">Noch keine Fragen vorhanden</p>
              <p class="empty-subtext">Klicke auf "Neue Frage" um zu beginnen</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Save Button -->
      <div class="editor-footer">
        <div v-if="saveError" class="save-error">
          {{ saveError }}
        </div>
        <button @click="saveScenario" class="save-button" :class="{ saving: isSaving, saved: showSavedState }" :disabled="isSaving">
          <span v-if="isSaving">Speichere...</span>
          <span v-else-if="showSavedState">✓ Gespeichert</span>
          <span v-else>Änderungen speichern</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

// Types
interface Question {
  id?: string
  tempId?: string
  text: string
  answer: string
  difficulty: string
  keywords: string[]
  keywordsText?: string
  selected?: boolean
  order?: number
  isGeneratingKeywords?: boolean
  keywordError?: string
}

interface Scenario {
  id?: string
  courseId?: string
  examId?: string
  name: string
  code: string
  description: string
  introduction: string
  level: number
  totalTime: number
  timePerQuestion: number
  questionsCount?: number
  questions?: Question[]
  isDeleting?: boolean
}

// Main state
const showScenarioEditor = ref(false)
const activeEditorTab = ref('info')
const selectedScenario = ref<Scenario | null>(null)
const manualQuestions = ref<Question[]>([])
const isSaving = ref(false)
const showSavedState = ref(false)
const saveError = ref('')
const isLoading = ref(false)
const loadError = ref('')

// Scenario list
const scenarios = ref<Scenario[]>([])

// Load scenarios from backend
const loadScenarios = async () => {
  isLoading.value = true
  loadError.value = ''

  try {
    const response = await $fetch('/api/courses', {
      method: 'GET'
    })

    // Transform API response to match our scenario format
    scenarios.value = response.courses.map((course: any) => ({
      id: course.code, // Use code as temporary ID for display
      courseId: course.code,
      examId: course.examId,
      name: course.title,
      code: course.code,
      description: course.description,
      introduction: '',
      level: course.level,
      totalTime: course.totalTime,
      timePerQuestion: course.timePerQuestion,
      questionsCount: course.totalQuestions
    }))
  } catch (error: any) {
    console.error('Error loading scenarios:', error)
    loadError.value = 'Fehler beim Laden der Szenarien'
  } finally {
    isLoading.value = false
  }
}

// Create new scenario
const createNewScenario = () => {
  const scenario: Scenario = {
    name: 'Neues Szenario',
    code: 'NEW' + Date.now().toString().slice(-3),
    description: '',
    introduction: '',
    level: 1,
    totalTime: 10,
    timePerQuestion: 60,
    questions: []
  }
  selectedScenario.value = scenario
  manualQuestions.value = []
  activeEditorTab.value = 'info'
  showScenarioEditor.value = true
}

// Edit existing scenario
const editScenario = async (scenario: Scenario) => {
  isLoading.value = true

  try {
    // Load full exam details including questions
    if (scenario.code) {
      const examResponse = await $fetch(`/api/courses/${scenario.code}/exam`, {
        method: 'GET'
      })

      // Merge course data with exam data
      selectedScenario.value = {
        ...scenario,
        introduction: examResponse.exam.sourceText,
        description: examResponse.exam.description
      }

      // Load questions
      manualQuestions.value = examResponse.questions.map((q: any) => ({
        id: q.id,
        text: q.text,
        answer: q.answer || '',
        difficulty: q.difficulty,
        keywords: q.keywords,
        keywordsText: q.keywords.join(', '),
        selected: q.selected
      }))
    } else {
      selectedScenario.value = { ...scenario }
      manualQuestions.value = []
    }

    activeEditorTab.value = 'info'
    showScenarioEditor.value = true
  } catch (error: any) {
    console.error('Error loading scenario details:', error)
    alert('Fehler beim Laden der Szenario-Details')
  } finally {
    isLoading.value = false
  }
}

const closeEditor = () => {
  showScenarioEditor.value = false
  selectedScenario.value = null
  manualQuestions.value = []
  saveError.value = ''
}

// Save scenario to backend
const saveScenario = async () => {
  if (!selectedScenario.value) return

  isSaving.value = true
  showSavedState.value = false
  saveError.value = ''

  try {
    const isNewScenario = !selectedScenario.value.courseId

    // Step 1: Create/Update Course
    let courseResponse
    if (isNewScenario) {
      courseResponse = await $fetch('/api/courses', {
        method: 'POST',
        body: {
          code: selectedScenario.value.code,
          title: selectedScenario.value.name,
          description: selectedScenario.value.description,
          level: selectedScenario.value.level,
          totalTime: selectedScenario.value.totalTime,
          totalQuestions: manualQuestions.value.length,
          timePerQuestion: selectedScenario.value.timePerQuestion,
          isPublished: true
        }
      })
    }

    // Step 2: Create/Update Exam with Questions
    const examData = {
      title: selectedScenario.value.name,
      description: selectedScenario.value.description,
      sourceText: selectedScenario.value.introduction,
      level: selectedScenario.value.level,
      duration: selectedScenario.value.totalTime,
      isPublished: true,
      courseId: isNewScenario ? courseResponse.id : undefined,
      questions: manualQuestions.value.map((q, index) => ({
        text: q.text,
        answer: q.answer,
        difficulty: q.difficulty,
        keywords: q.keywords,
        selected: true,
        order: index
      }))
    }

    if (isNewScenario) {
      await $fetch('/api/exams', {
        method: 'POST',
        body: examData
      })
    } else if (selectedScenario.value.examId) {
      await $fetch(`/api/exams/${selectedScenario.value.examId}`, {
        method: 'PUT',
        body: examData
      })
    }

    // Success!
    showSavedState.value = true
    setTimeout(() => {
      showSavedState.value = false
    }, 2000)

    // Reload scenarios list
    await loadScenarios()

  } catch (error: any) {
    console.error('Save error:', error)
    saveError.value = error.data?.statusMessage || 'Fehler beim Speichern'
  } finally {
    isSaving.value = false
  }
}

// Question management
const addNewQuestion = () => {
  const newQuestion: Question = {
    tempId: `q_${Date.now()}`,
    text: '',
    answer: '',
    difficulty: 'MEDIUM',
    keywords: [],
    keywordsText: ''
  }
  manualQuestions.value.push(newQuestion)
}

const removeQuestion = (index: number) => {
  if (confirm('Frage wirklich löschen?')) {
    manualQuestions.value.splice(index, 1)
  }
}

const duplicateQuestion = (index: number) => {
  const originalQuestion = manualQuestions.value[index]
  const duplicatedQuestion: Question = {
    ...JSON.parse(JSON.stringify(originalQuestion)),
    tempId: `q_${Date.now()}`,
    id: undefined
  }
  manualQuestions.value.splice(index + 1, 0, duplicatedQuestion)
}

const updateKeywordsFromText = (question: Question) => {
  if (question.keywordsText) {
    question.keywords = question.keywordsText
      .split(',')
      .map(k => k.trim())
      .filter(k => k.length > 0)
  } else {
    question.keywords = []
  }
}

// Generate keywords using AI
const generateKeywordsForQuestion = async (question: Question) => {
  if (!question.answer || question.answer.trim().length === 0) {
    question.keywordError = 'Bitte zuerst eine Musterantwort eingeben'
    return
  }

  question.isGeneratingKeywords = true
  question.keywordError = ''

  try {
    const response: any = await $fetch('/api/generate-keywords', {
      method: 'POST',
      body: {
        answerText: question.answer,
        questionText: question.text
      }
    })

    // Update keywords
    question.keywords = response.keywords
    question.keywordsText = response.keywords.join(', ')
  } catch (error: any) {
    console.error('Error generating keywords:', error)
    question.keywordError = 'Fehler beim Generieren der Keywords. Bitte versuche es erneut.'
  } finally {
    question.isGeneratingKeywords = false
  }
}

// Delete scenario
const deleteScenario = async (scenario: Scenario) => {
  // Confirmation dialog
  const confirmMessage = `Möchtest du das Szenario "${scenario.name}" (${scenario.code}) wirklich löschen?\n\nDies löscht:\n- Den Kurs\n- Alle Fragen\n- Das zugehörige Exam\n\nDiese Aktion kann nicht rückgängig gemacht werden!`

  if (!confirm(confirmMessage)) {
    return
  }

  scenario.isDeleting = true

  try {
    await $fetch(`/api/courses/${scenario.code}`, {
      method: 'DELETE'
    })

    // Remove from local list
    const index = scenarios.value.findIndex(s => s.code === scenario.code)
    if (index !== -1) {
      scenarios.value.splice(index, 1)
    }

    // Show success message (optional)
    alert(`Szenario "${scenario.name}" wurde erfolgreich gelöscht.`)
  } catch (error: any) {
    console.error('Error deleting scenario:', error)
    alert('Fehler beim Löschen des Szenarios. Bitte versuche es erneut.')
    scenario.isDeleting = false
  }
}

// Load scenarios on mount
onMounted(() => {
  loadScenarios()
})
</script>

<style scoped>
.admin-page {
  min-height: calc(100vh - 64px);
  background: #ffffff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.admin-header {
  background: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  padding: 2rem 0;
}

.admin-header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.header-main {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
}

.admin-title {
  color: #1f2937;
  font-size: 2rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
}

.admin-subtitle {
  color: #6b7280;
  font-size: 1.125rem;
  margin: 0;
}

.admin-main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.view-title {
  color: #1f2937;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 2rem 0;
}

.loading-state,
.error-state {
  text-align: center;
  padding: 3rem 2rem;
  color: #6b7280;
}

.error-state {
  color: #ef4444;
}

.scenarios-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.scenario-card {
  background: #ffffff;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  padding: 1.5rem;
  transition: all 0.2s;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.scenario-card:hover {
  border-color: #0097b2;
  box-shadow: 0 0 0 3px rgba(0, 151, 178, 0.1);
}

.scenario-card-content {
  cursor: pointer;
  flex: 1;
}

.scenario-card-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 0.75rem;
  border-top: 1px solid #f3f4f6;
}

.delete-scenario-button {
  background: #ffffff;
  color: #0097b2;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  flex: 1;
  text-align: center;
}

.delete-scenario-button:hover:not(:disabled) {
  background: #0097b2;
  border-color: #0097b2;
  color: #ffffff;
  transform: translateY(-1px);
}

.delete-scenario-button:disabled {
  background: #f9fafb;
  border-color: #e5e7eb;
  color: #9ca3af;
  cursor: not-allowed;
  transform: none;
}

.scenario-card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.scenario-name {
  color: #1f2937;
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0;
  flex: 1;
}

.scenario-code-badge {
  background: #0097b2;
  color: #ffffff;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
}

.scenario-stats {
  margin-bottom: 1rem;
  display: flex;
  gap: 1.5rem;
}

.scenario-stat {
  color: #6b7280;
  font-size: 0.875rem;
}

.scenario-description {
  color: #6b7280;
  font-size: 0.875rem;
  line-height: 1.5;
}

.primary-button {
  background: #0097b2;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  padding: 1rem 2rem;
  font-size: 1.125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.primary-button:hover:not(:disabled) {
  background: #007a8e;
  transform: translateY(-1px);
}

.primary-button:disabled {
  background: #d1d5db;
  cursor: not-allowed;
  transform: none;
}

/* Editor Styles */
.fullscreen-editor {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #ffffff;
  z-index: 999;
  display: flex;
  flex-direction: column;
}

.fullscreen-editor.with-header {
  top: 64px;
  z-index: 998;
}

.editor-header {
  background: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
}

.editor-title {
  color: #1f2937;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 0.25rem 0;
}

.editor-subtitle {
  color: #6b7280;
  font-size: 0.875rem;
  margin: 0;
}

.editor-close {
  background: #ffffff;
  color: #6b7280;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.editor-close:hover {
  border-color: #0097b2;
  color: #0097b2;
}

.editor-nav {
  background: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  padding: 0 2rem;
  flex-shrink: 0;
}

.editor-tab {
  padding: 1rem 2rem;
  background: none;
  border: none;
  color: #6b7280;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border-bottom: 2px solid transparent;
}

.editor-tab:hover {
  color: #374151;
}

.editor-tab.active {
  color: #0097b2;
  border-bottom-color: #0097b2;
}

.editor-content {
  flex: 1;
  overflow-y: auto;
  padding: 2rem;
}

.editor-section {
  max-width: 800px;
  margin: 0 auto;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #f3f4f6;
}

.section-title {
  color: #1f2937;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
}

.add-button {
  background: #0097b2;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.add-button:hover {
  background: #007a8e;
}

.course-info-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  color: #374151;
  font-weight: 500;
  font-size: 0.875rem;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: #0097b2;
  box-shadow: 0 0 0 3px rgba(0, 151, 178, 0.1);
}

.form-textarea {
  resize: vertical;
  min-height: 100px;
}

.form-textarea.large {
  min-height: 200px;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.questions-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.question-item {
  background: #ffffff;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  padding: 1.5rem;
  transition: all 0.2s;
}

.question-item:hover {
  border-color: #0097b2;
  box-shadow: 0 0 0 3px rgba(0, 151, 178, 0.1);
}

.question-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.question-number {
  color: #0097b2;
  font-size: 1rem;
  font-weight: 600;
}

.question-actions {
  display: flex;
  gap: 0.5rem;
}

.action-button {
  background: #ffffff;
  color: #6b7280;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.action-button.duplicate:hover {
  border-color: #0097b2;
  color: #0097b2;
}

.action-button.remove:hover {
  border-color: #ef4444;
  color: #ef4444;
}

.question-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-label-with-button {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.ai-generate-button {
  background: #0097b2;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.ai-generate-button:hover:not(:disabled) {
  background: #007a8e;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 151, 178, 0.3);
}

.ai-generate-button:disabled {
  background: #d1d5db;
  cursor: not-allowed;
  transform: none;
}

.keywords-preview {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.keyword-tag {
  background: #e0f2f7;
  color: #0097b2;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
}

.keyword-error {
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: 0.5rem;
}

.empty-state {
  text-align: center;
  padding: 3rem 2rem;
  color: #6b7280;
}

.empty-text {
  color: #374151;
  font-size: 1.125rem;
  font-weight: 500;
  margin: 0 0 0.5rem 0;
}

.empty-subtext {
  color: #6b7280;
  font-size: 0.875rem;
  margin: 0;
}

.editor-footer {
  background: #ffffff;
  border-top: 1px solid #e5e7eb;
  padding: 1.5rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  flex-shrink: 0;
}

.save-error {
  color: #ef4444;
  font-size: 0.875rem;
}

.save-button {
  background: #0097b2;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  padding: 1rem 3rem;
  font-size: 1.125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  min-width: 200px;
}

.save-button:hover:not(.saving):not(.saved):not(:disabled) {
  background: #007a8e;
  transform: translateY(-1px);
}

.save-button.saving,
.save-button:disabled {
  background: #6b7280;
  cursor: not-allowed;
}

.save-button.saved {
  background: #059669;
}

@media (max-width: 768px) {
  .header-main {
    flex-direction: column;
    gap: 1.5rem;
  }

  .scenarios-grid {
    grid-template-columns: 1fr;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }

  .fullscreen-editor.with-header {
    top: 56px;
  }
}
</style>
