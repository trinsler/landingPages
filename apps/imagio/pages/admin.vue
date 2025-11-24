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

      <!-- Scenarios Grid -->
      <div class="scenarios-grid">
        <div 
          v-for="scenario in scenarios" 
          :key="scenario.id"
          class="scenario-card"
          @click="editScenario(scenario)"
        >
          <div class="scenario-card-header">
            <h3 class="scenario-name">{{ scenario.name }}</h3>
            <div class="scenario-code-badge">{{ scenario.code }}</div>
          </div>
          
          <div class="scenario-stats">
            <span class="scenario-stat">
              {{ scenario.questions.length }} Fragen
            </span>
            <span class="scenario-stat">
              {{ getScenarioUserCount(scenario.id) }} Benutzer
            </span>
          </div>
          
          <div class="scenario-description">
            {{ scenario.description || 'Keine Beschreibung' }}
          </div>
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
        <button 
          @click="activeEditorTab = 'users'"
          class="editor-tab"
          :class="{ active: activeEditorTab === 'users' }"
        >
          Benutzer
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
              <label class="form-label">Kurs-Code</label>
              <input 
                v-model="selectedScenario.code" 
                type="text" 
                class="form-input"
                placeholder="z.B. CS001"
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
              <label class="form-label">Kurs-Einleitung</label>
              <textarea 
                v-model="selectedScenario.introduction" 
                class="form-textarea large"
                rows="8"
                placeholder="Diese Einleitung wird den Studenten zu Beginn des Kurses gezeigt..."
              ></textarea>
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
              :key="question.id"
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
              </div>
            </div>
            
            <div v-if="manualQuestions.length === 0" class="empty-state">
              <p class="empty-text">Noch keine Fragen vorhanden</p>
              <p class="empty-subtext">Klicke auf "Neue Frage" um zu beginnen</p>
            </div>
          </div>
        </div>

        <!-- Users Tab -->
        <div v-if="activeEditorTab === 'users'" class="editor-section">
          <div class="section-header">
            <h2 class="section-title">Benutzer ({{ getScenarioUserCount(selectedScenario?.id) }})</h2>
            <button @click="showAddUserForm = true" class="add-button">
              Benutzer hinzufügen
            </button>
          </div>
          
          <!-- Add User Form -->
          <div v-if="showAddUserForm" class="add-user-form">
            <h3 class="form-title">Neuen Benutzer hinzufügen</h3>
            <div class="form-grid">
              <div class="form-field">
                <label class="form-label">Name</label>
                <input 
                  v-model="newUser.name" 
                  type="text" 
                  class="form-input" 
                  placeholder="Vollständiger Name"
                >
              </div>
              <div class="form-field">
                <label class="form-label">E-Mail</label>
                <input 
                  v-model="newUser.email" 
                  type="email" 
                  class="form-input" 
                  placeholder="benutzer@example.com"
                >
              </div>
            </div>
            <div class="form-actions">
              <button @click="showAddUserForm = false" class="secondary-button">
                Abbrechen
              </button>
              <button 
                @click="saveNewUser" 
                class="primary-button" 
                :disabled="!newUser.name || !newUser.email"
              >
                Hinzufügen
              </button>
            </div>
          </div>
          
          <!-- Users List -->
          <div class="users-list">
            <div 
              v-for="user in getScenarioUsers(selectedScenario?.id)" 
              :key="user.id"
              class="user-item"
            >
              <div class="user-info">
                <div class="user-name">{{ user.name }}</div>
                <div class="user-email">{{ user.email }}</div>
              </div>
              <button 
                @click="removeUserFromScenario(selectedScenario.id, user.id)" 
                class="remove-user-button"
              >
                Entfernen
              </button>
            </div>
            
            <div v-if="getScenarioUserCount(selectedScenario?.id) === 0" class="empty-state">
              <p class="empty-text">Noch keine Benutzer vorhanden</p>
              <p class="empty-subtext">Klicke auf "Benutzer hinzufügen" um zu beginnen</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Save Button -->
      <div class="editor-footer">
        <button @click="saveScenario" class="save-button" :class="{ saving: isSaving, saved: showSavedState }">
          <span v-if="isSaving">Speichere...</span>
          <span v-else-if="showSavedState">✓ Gespeichert</span>
          <span v-else>Änderungen speichern</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Main state
const showScenarioEditor = ref(false)
const activeEditorTab = ref('info')
const selectedScenario = ref(null)
const manualQuestions = ref<any[]>([])
const showAddUserForm = ref(false)
const newUser = ref({ name: '', email: '' })
const isSaving = ref(false)
const showSavedState = ref(false)

// Sample scenario data
const scenarios = ref([
  {
    id: 1,
    name: 'Basic Computer Science - Level 1',
    code: 'CS001',
    description: 'Einführung in die Grundlagen der Informatik',
    introduction: 'Willkommen zum ersten Level in Computer Science!',
    questions: [
      { id: 1, text: 'Was ist ein Computerprogramm?', answer: 'Ein Computerprogramm ist eine Ansammlung von Anweisungen...' },
      { id: 2, text: 'Erkläre was ein Algorithmus ist.', answer: 'Ein Algorithmus ist eine schrittweise Vorgehensweise...' }
    ]
  },
  {
    id: 2,
    name: 'Basic Computer Science - Level 2',
    code: 'CS002',
    description: 'Programmierung und Algorithmen',
    introduction: 'Vertiefen Sie Ihr Verständnis von Programmierung.',
    questions: [
      { id: 3, text: 'Was ist eine Variable?', answer: 'Eine Variable ist ein Container für Daten...' },
      { id: 4, text: 'Was macht eine Schleife?', answer: 'Eine Schleife wiederholt Code...' }
    ]
  }
])

// User data per scenario
const scenarioUsers = ref({
  1: [
    { id: 1, name: 'Max Mustermann', email: 'max@example.com' },
    { id: 2, name: 'Anna Schmidt', email: 'anna@example.com' }
  ],
  2: [
    { id: 3, name: 'Tom Weber', email: 'tom@example.com' }
  ]
})

// Helper functions
const getScenarioUserCount = (scenarioId: number) => {
  return scenarioUsers.value[scenarioId]?.length || 0
}

const getScenarioUsers = (scenarioId: number) => {
  return scenarioUsers.value[scenarioId] || []
}

// Scenario methods
const createNewScenario = () => {
  const scenario = {
    id: Date.now(),
    name: 'Neues Szenario',
    code: 'NEW' + Date.now().toString().slice(-3),
    description: '',
    introduction: '',
    questions: []
  }
  scenarios.value.push(scenario)
  scenarioUsers.value[scenario.id] = []
  editScenario(scenario)
}

const editScenario = (scenario: any) => {
  selectedScenario.value = scenario
  manualQuestions.value = [...scenario.questions]
  activeEditorTab.value = 'info'
  showScenarioEditor.value = true
  showAddUserForm.value = false
}

const closeEditor = () => {
  showScenarioEditor.value = false
  selectedScenario.value = null
  manualQuestions.value = []
  showAddUserForm.value = false
}

const saveScenario = async () => {
  if (!selectedScenario.value) return
  
  isSaving.value = true
  showSavedState.value = false
  
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    selectedScenario.value.questions = [...manualQuestions.value]
    showSavedState.value = true
    setTimeout(() => {
      showSavedState.value = false
    }, 2000)
  } catch (error) {
    console.error('Save error:', error)
  } finally {
    isSaving.value = false
  }
}

// Question methods
const addNewQuestion = () => {
  const newQuestion = {
    id: `q_${Date.now()}`,
    text: '',
    answer: ''
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
  const duplicatedQuestion = {
    ...JSON.parse(JSON.stringify(originalQuestion)),
    id: `q_${Date.now()}`,
  }
  manualQuestions.value.splice(index + 1, 0, duplicatedQuestion)
}

// User methods
const saveNewUser = () => {
  if (selectedScenario.value && newUser.value.name && newUser.value.email) {
    const scenarioId = selectedScenario.value.id
    if (!scenarioUsers.value[scenarioId]) {
      scenarioUsers.value[scenarioId] = []
    }
    
    const user = {
      id: Date.now(),
      name: newUser.value.name,
      email: newUser.value.email
    }
    
    scenarioUsers.value[scenarioId].push(user)
    newUser.value = { name: '', email: '' }
    showAddUserForm.value = false
  }
}

const removeUserFromScenario = (scenarioId: number, userId: number) => {
  if (confirm('Benutzer wirklich entfernen?')) {
    const users = scenarioUsers.value[scenarioId]
    if (users) {
      const index = users.findIndex(u => u.id === userId)
      if (index !== -1) {
        users.splice(index, 1)
      }
    }
  }
}
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
  cursor: pointer;
}

.scenario-card:hover {
  border-color: #0097b2;
  box-shadow: 0 0 0 3px rgba(0, 151, 178, 0.1);
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

.add-user-form {
  background: #ffffff;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.form-title {
  color: #1f2937;
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
}

.form-actions {
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
}

.secondary-button {
  background: #ffffff;
  color: #374151;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.secondary-button:hover {
  background: #f9fafb;
  border-color: #9ca3af;
}

.users-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.user-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #ffffff;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  transition: all 0.2s;
}

.user-item:hover {
  border-color: #0097b2;
  box-shadow: 0 0 0 3px rgba(0, 151, 178, 0.1);
}

.user-name {
  color: #1f2937;
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 0.25rem;
}

.user-email {
  color: #6b7280;
  font-size: 0.875rem;
}

.remove-user-button {
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

.remove-user-button:hover {
  border-color: #ef4444;
  color: #ef4444;
}

.editor-footer {
  background: #ffffff;
  border-top: 1px solid #e5e7eb;
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: center;
  flex-shrink: 0;
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

.save-button:hover:not(.saving):not(.saved) {
  background: #007a8e;
  transform: translateY(-1px);
}

.save-button.saving {
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