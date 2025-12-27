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
      <div v-if="scenarios.length > 0" class="scenarios-grid">
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
          <!-- Unsaved changes indicator -->
          <div v-if="hasUnsavedChanges" class="unsaved-indicator">
Ungespeicherte Änderungen
          </div>
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
              <div class="form-label-with-button">
                <label class="form-label">Kurs-Code (Startcode für Studenten)</label>
                <button
                  @click="generateNewCode"
                  type="button" 
                  class="ai-generate-button"
                  :disabled="isGeneratingCode"
                >
                  <span v-if="isGeneratingCode">Generiere...</span>
                  <span v-else>Neuen Code generieren</span>
                </button>
              </div>
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
        <button @click="saveScenario" class="save-button" :class="{ saving: isSaving, saved: showSavedState, unsaved: hasUnsavedChanges && !isSaving }" :disabled="isSaving">
          <span v-if="isSaving">Speichere...</span>
          <span v-else-if="showSavedState">Gespeichert</span>
          <span v-else-if="hasUnsavedChanges">Änderungen speichern *</span>
          <span v-else>Änderungen speichern</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'

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
  isNew?: boolean // Flag to distinguish between new and existing scenarios
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
const isGeneratingCode = ref(false)
// Change detection
const hasUnsavedChanges = ref(false)
const lastSavedSnapshot = ref<string | null>(null)

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
    if (response && response.courses && Array.isArray(response.courses)) {
      scenarios.value = response.courses.map((course: any) => ({
        id: course.id,        // Verwende echte DB ID
        courseId: course.id,  // Verwende echte DB ID für Updates
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
    } else {
      scenarios.value = []
    }
  } catch (error: any) {
    console.error('Error loading scenarios:', error)
    // Don't show error for empty database - just show empty state
    scenarios.value = []
    // Only show error if it's not a 404 or empty response
    if (error.statusCode && error.statusCode !== 404) {
      loadError.value = 'Fehler beim Laden der Szenarien'
    }
  } finally {
    isLoading.value = false
  }
}

// Create new scenario
const createNewScenario = async () => {
  // Check limit of 10 courses
  if (scenarios.value.length >= 10) {
    alert('Maximal 10 Szenarien erlaubt. Bitte lösche zuerst ein existierendes Szenario.')
    return
  }

  try {
    // Generate unique course code
    const codeResponse = await $fetch('/api/utils/generate-course-code', {
      method: 'GET'
    })

    // Create the course directly in database
    const newCourseData = {
      code: codeResponse.code,
      title: 'Neues Szenario',
      description: '',
      level: 1,
      totalTime: 600, // 10 minutes in seconds
      totalQuestions: 0,
      timePerQuestion: 60,
      maxAttempts: 3,
      isPublished: true
    }

    // Save course to database immediately
    const courseResponse = await $fetch('/api/courses', {
      method: 'POST',
      body: newCourseData
    })

    if (courseResponse.success) {
      // Create scenario object for frontend
      const scenario: Scenario = {
        id: courseResponse.course.id,
        courseId: courseResponse.course.id, // Set courseId for future updates
        name: courseResponse.course.title,
        code: courseResponse.course.code,
        description: courseResponse.course.description || '',
        introduction: '',
        level: courseResponse.course.level,
        totalTime: Math.round(courseResponse.course.totalTime / 60), // Convert to minutes
        timePerQuestion: courseResponse.course.timePerQuestion,
        questions: [],
        isNew: false // Already saved to database
      }

      // Add to scenarios list
      scenarios.value.push(scenario)
      
      // Open editor for the new scenario
      selectedScenario.value = scenario
      manualQuestions.value = []
      activeEditorTab.value = 'info'
      showScenarioEditor.value = true
      
      console.log('Created new course with code:', codeResponse.code)
      alert(`✅ Neues Szenario mit Code "${codeResponse.code}" erstellt!`)
    }
  } catch (error) {
    console.error('Error creating new scenario:', error)
    alert('Fehler beim Erstellen eines neuen Szenarios: ' + (error.data?.message || error.message))
  }
}

// Edit existing scenario
const editScenario = async (scenario: Scenario) => {
  isLoading.value = true

  try {
    // Load full exam details including questions
    if (scenario.code) {
      try {
        const examResponse = await $fetch(`/api/courses/${scenario.code}/exam`, {
          method: 'GET'
        })

        if (examResponse && examResponse.exam) {
          // Merge course data with exam data
          selectedScenario.value = {
            ...scenario,
            examId: examResponse.exam.id, // ← CRITICAL: Use correct examId from API
            introduction: examResponse.exam.sourceText || '',
            description: examResponse.exam.description || scenario.description || '',
            isNew: false // Mark as existing scenario for editing
          }

          // Load questions
          if (examResponse.questions && examResponse.questions.length > 0) {
            manualQuestions.value = examResponse.questions.map((q: any) => ({
              id: q.id,
              text: q.text,
              answer: q.answer || '',
              difficulty: q.difficulty,
              keywords: Array.isArray(q.keywords) ? q.keywords : JSON.parse(q.keywords || '[]'),
              keywordsText: Array.isArray(q.keywords) ? q.keywords.join(', ') : JSON.parse(q.keywords || '[]').join(', '),
              selected: q.selected !== false
            }))
          } else {
            manualQuestions.value = []
          }
        } else {
          // No exam found - course without exam
          selectedScenario.value = {
            ...scenario,
            introduction: '',
            description: scenario.description || '',
            isNew: false
          }
          manualQuestions.value = []
        }
      } catch (examError) {
        console.warn(`No exam found for course ${scenario.code}:`, examError)
        // Course exists but has no exam yet
        selectedScenario.value = {
          ...scenario,
          introduction: '',
          description: scenario.description || '',
          isNew: false
        }
        manualQuestions.value = []
      }
    } else {
      selectedScenario.value = { ...scenario }
      manualQuestions.value = []
    }

    activeEditorTab.value = 'info'
    showScenarioEditor.value = true
  } catch (error: any) {
    console.error('Error loading scenario details:', error)
    
    // Still open editor but show warning
    selectedScenario.value = {
      ...scenario,
      introduction: '',
      description: scenario.description || '',
      isNew: false
    }
    manualQuestions.value = []
    activeEditorTab.value = 'info'
    showScenarioEditor.value = true
    
    // Show informative message instead of blocking
    saveError.value = 'Kurs-Details konnten nicht vollständig geladen werden. Sie können trotzdem Änderungen vornehmen und speichern.'
    setTimeout(() => {
      saveError.value = ''
    }, 5000)
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

// Generate new unique course code with replacement logic
const generateNewCode = async () => {
  if (!selectedScenario.value) return
  
  const oldCode = selectedScenario.value.code
  
  // Wenn schon ein Code existiert, frage nach Bestätigung
  if (oldCode && oldCode.trim().length > 0) {
    const confirmReplace = confirm(
      `Sind Sie sicher, dass Sie einen neuen Code generieren möchten?\n\n` +
      `Aktueller Code: ${oldCode}\n` +
      `→ Wird durch neuen eindeutigen Code ersetzt\n\n` +
      `Alle Fragen bleiben erhalten.`
    )
    
    if (!confirmReplace) {
      return // User cancelled
    }
  }
  
  isGeneratingCode.value = true
  try {
    // Generiere neuen Code
    const codeResponse = await $fetch('/api/utils/generate-course-code', {
      method: 'GET'
    })
    
    const newCode = codeResponse.code
    
    // Wenn alter Code existierte, verwende Replace-API
    if (oldCode && oldCode.trim().length > 0) {
      try {
        const replaceResponse = await $fetch('/api/courses/replace-code', {
          method: 'POST',
          body: {
            oldCode: oldCode,
            newCode: newCode
          }
        })
        
        if (replaceResponse.success) {
          selectedScenario.value.code = newCode
          console.log(`✅ Code erfolgreich geändert: ${oldCode} → ${newCode}`)
          
          // Update auch die Scenarios-Liste
          const scenarioIndex = scenarios.value.findIndex(s => s.code === oldCode)
          if (scenarioIndex !== -1) {
            scenarios.value[scenarioIndex].code = newCode
            // courseId bleibt gleich - nur der Code ändert sich
          }
          
          // Reload scenarios um sicherzustellen, dass die Liste aktuell ist
          await loadScenarios()
        }
        
      } catch (replaceError) {
        console.error('Error replacing code:', replaceError)
        
        // Bei Fehler: Versuche erneut mit neuem Code
        console.warn(`Code "${newCode}" nicht verfügbar. Generiere neuen Code...`)
        
        // Generiere automatisch neuen Code
        const retryCodeResponse = await $fetch('/api/utils/generate-course-code', {
          method: 'GET'
        })
        
        // Versuche mit dem neuen Code
        const retryResponse = await $fetch('/api/courses/replace-code', {
          method: 'POST',
          body: {
            oldCode: oldCode,
            newCode: retryCodeResponse.code
          }
        })
        
        if (retryResponse.success) {
          selectedScenario.value.code = retryCodeResponse.code
          console.log(`✅ Code erfolgreich geändert: ${oldCode} → ${retryCodeResponse.code}`)
          
          // Update auch die Scenarios-Liste
          const scenarioIndex = scenarios.value.findIndex(s => s.code === oldCode)
          if (scenarioIndex !== -1) {
            scenarios.value[scenarioIndex].code = retryCodeResponse.code
            // courseId bleibt gleich - nur der Code ändert sich
          }
          
          // Reload scenarios um sicherzustellen, dass die Liste aktuell ist
          await loadScenarios()
        }
      }
    } else {
      // Kein alter Code, einfaches Update
      selectedScenario.value.code = newCode
      console.log('Generated new code:', newCode)
    }
    
  } catch (error) {
    console.error('Error generating code:', error)
    alert('Fehler beim Generieren eines neuen Codes')
  } finally {
    isGeneratingCode.value = false
  }
}

// Save scenario to backend
const saveScenario = async () => {
  if (!selectedScenario.value) return

  isSaving.value = true
  showSavedState.value = false
  saveError.value = ''

  try {
    // Check if this is a truly new scenario (marked as isNew)
    const isNewScenario = selectedScenario.value.isNew === true
    
    // Detailed validation with specific error messages
    if (!selectedScenario.value.name || selectedScenario.value.name.trim().length === 0) {
      saveError.value = 'Kurs-Name ist erforderlich. Bitte geben Sie einen aussagekräftigen Namen ein.'
      setTimeout(() => { saveError.value = '' }, 8000)
      return
    }
    
    if (!selectedScenario.value.code || selectedScenario.value.code.trim().length === 0) {
      saveError.value = 'Kurs-Code ist erforderlich. Nutzen Sie "Neuen Code generieren" oder geben Sie einen eigenen Code ein.'
      setTimeout(() => { saveError.value = '' }, 8000)
      return
    }
    
    if (selectedScenario.value.code.trim().length < 3) {
      saveError.value = 'Kurs-Code muss mindestens 3 Zeichen lang sein.'
      setTimeout(() => { saveError.value = '' }, 8000)
      return
    }
    
    if (!selectedScenario.value.totalTime || selectedScenario.value.totalTime < 1) {
      saveError.value = 'Gesamtzeit muss mindestens 1 Minute betragen.'
      setTimeout(() => { saveError.value = '' }, 8000)
      return
    }
    
    if (!selectedScenario.value.timePerQuestion || selectedScenario.value.timePerQuestion < 10) {
      saveError.value = 'Zeit pro Frage muss mindestens 10 Sekunden betragen.'
      setTimeout(() => { saveError.value = '' }, 8000)
      return
    }
    
    // Simplified change detection - allow saving if user has questions
    if (!isNewScenario && manualQuestions.value.length === 0) {
      saveError.value = 'Keine Fragen vorhanden. Bitte fügen Sie mindestens eine Frage hinzu.'
      setTimeout(() => { saveError.value = '' }, 6000)
      return
    }

    // Step 1: Create/Update Course
    let courseResponse
    if (isNewScenario) {
      // Calculate question count (minimum 2 questions for new courses)
      const questionCount = Math.max(manualQuestions.value.length, 2)
      
      // CREATE new course
      courseResponse = await $fetch('/api/courses', {
        method: 'POST',
        body: {
          code: selectedScenario.value.code.trim(),
          title: selectedScenario.value.name.trim(),
          description: selectedScenario.value.description || '',
          level: selectedScenario.value.level || 1,
          totalTime: selectedScenario.value.totalTime || 10,
          totalQuestions: questionCount,
          timePerQuestion: selectedScenario.value.timePerQuestion || 60,
          isPublished: true
        }
      })
    } else {
      // UPDATE existing course - use the stored courseId (not the new code!)
      if (!selectedScenario.value.courseId) {
        saveError.value = 'Fehler: Course ID fehlt für Update. Bitte neu laden.'
        setTimeout(() => { saveError.value = '' }, 8000)
        return
      }
      
      console.log('Updating course with ID:', selectedScenario.value.courseId)
      
      // Find course by courseId (which is now the real DB ID)
      const existingCourseResponse = await $fetch('/api/courses', {
        method: 'GET'
      })
      
      console.log('Looking for course with ID:', selectedScenario.value.courseId)
      const existingCourse = existingCourseResponse.courses.find((c: any) => c.id === selectedScenario.value.courseId)
      
      if (!existingCourse) {
        console.error('Course not found in database. Available courses:', existingCourseResponse.courses.map((c: any) => c.code))
        saveError.value = `Kurs mit Code "${selectedScenario.value.code}" nicht gefunden. Verfügbare Kurse: ${(existingCourseResponse as any)?.courses?.map((c: any) => c.code).join(', ') || 'Keine verfügbar'}`
        setTimeout(() => { saveError.value = '' }, 10000)
        return
      }
      
      console.log('Found existing course:', existingCourse)
      
      // Update the course using the correct ID
      try {
        courseResponse = await $fetch(`/api/courses`, {
          method: 'PUT',
          body: {
            id: existingCourse.id,
            code: selectedScenario.value.code.trim(),
            title: selectedScenario.value.name.trim(),
            description: selectedScenario.value.description || '',
            level: selectedScenario.value.level || 1,
            totalTime: selectedScenario.value.totalTime || 10,
            totalQuestions: manualQuestions.value.length,
            timePerQuestion: selectedScenario.value.timePerQuestion || 60,
            maxAttempts: selectedScenario.value.maxAttempts || 3,
            isPublished: true
          }
        })
        console.log('Course update successful:', courseResponse)
      } catch (updateError: any) {
        console.error('Course update failed:', updateError)
        saveError.value = `Fehler beim Aktualisieren des Kurses: ${updateError.statusMessage || updateError.message}`
        setTimeout(() => { saveError.value = '' }, 8000)
        return
      }
    }

    // Step 2: Create/Update Exam with Questions
    // Update keywords from text for all questions
    manualQuestions.value.forEach(question => {
      updateKeywordsFromText(question)
    })
    
    // Filter out empty questions and validate
    let questionsForExam = manualQuestions.value.filter(q => {
      const hasText = q.text && q.text.trim().length > 0
      const hasAnswer = q.answer && q.answer.trim().length > 0
      
      
      return hasText && hasAnswer
    })
    
    // Add default keywords if missing
    questionsForExam = questionsForExam.map(q => ({
      ...q,
      keywords: q.keywords?.length > 0 ? q.keywords : ['allgemein']
    }))

    const examData = {
      title: selectedScenario.value.name.trim(),
      description: selectedScenario.value.description || '',
      sourceText: selectedScenario.value.introduction || 'Willkommen zu diesem Kurs. Bitte lesen Sie die Anweisungen sorgfältig und beantworten Sie die Fragen durchdacht.',
      level: selectedScenario.value.level || 1,
      duration: selectedScenario.value.totalTime || 10,
      isPublished: true,
      courseId: isNewScenario ? courseResponse.id : undefined,
      questions: questionsForExam.map((q, index) => ({
        text: q.text || '',
        answer: q.answer || '',
        difficulty: q.difficulty || 'MEDIUM',
        keywords: q.keywords || [],
        selected: true,
        order: index
      }))
    }

    if (isNewScenario) {
      // CREATE new exam with questions for new course
      const examResponse = await $fetch('/api/exams', {
        method: 'POST',
        body: {
          ...examData,
          courseId: courseResponse.id // Link to the newly created course
        }
      })
      console.log('Created exam for new course:', examResponse.id)
    } else if (selectedScenario.value.examId) {
      await $fetch(`/api/exams`, {
        method: 'PUT',
        body: {
          id: selectedScenario.value.examId,
          ...examData
        }
      })
    }

    // Success messages based on action
    if (isNewScenario) {
      saveError.value = 'Neuer Kurs erfolgreich erstellt! Der Kurs ist jetzt verfügbar und kann im Willkommensfenster verwendet werden.'
    } else {
      saveError.value = 'Kurs erfolgreich aktualisiert! Alle Änderungen wurden gespeichert.'
    }
    
    // Show success message briefly
    showSavedState.value = true
    setTimeout(() => {
      showSavedState.value = false
      saveError.value = '' // Clear success message after showing
    }, 4000)

    // Update change detection snapshot
    updateSavedSnapshot()
    console.log('Save successful - snapshot updated, no unsaved changes')

    // Update localStorage with new code (important if code was changed)
    const newCode = selectedScenario.value.code
    localStorage.setItem('currentScenarioCode', newCode)
    console.log('Updated currentScenarioCode to:', newCode)
    
    // Reload current scenario with fresh data including questions
    if (selectedScenario.value) {
      await editScenario(selectedScenario.value)
    }
    await loadScenarios()

  } catch (error: any) {
    console.error('Save error:', error)
    console.error('Save error detail:', error.data)
    
    // Detailed error handling based on error type
    if (error.status === 409 || error.statusCode === 409) {
      saveError.value = 'Kurs-Code bereits vergeben. Bitte verwenden Sie "Neuen Code generieren" oder wählen Sie einen anderen Code.'
    } else if (error.status === 400 || error.statusCode === 400) {
      saveError.value = 'Ungültige Daten. Bitte überprüfen Sie alle Eingabefelder.'
    } else if (error.status === 404 || error.statusCode === 404) {
      saveError.value = 'Kurs nicht gefunden. Möglicherweise wurde er bereits gelöscht.'
    } else if (error.status === 500 || error.statusCode === 500) {
      saveError.value = 'Server-Fehler. Bitte versuchen Sie es später erneut oder kontaktieren Sie den Support.'
    } else if (error.message && error.message.includes('Course not found')) {
      saveError.value = 'Kurs konnte nicht gefunden werden. Bitte laden Sie die Seite neu.'
    } else if (error.data?.statusMessage) {
      saveError.value = `${error.data.statusMessage}`
    } else if (error.statusMessage) {
      saveError.value = `${error.statusMessage}`
    } else if (error.message) {
      saveError.value = `${error.message}`
    } else {
      saveError.value = 'Unbekannter Fehler beim Speichern. Bitte versuchen Sie es erneut.'
    }
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
  console.log(`Attempting to delete course with code: ${scenario.code}`)

  try {
    const deleteResponse = await $fetch('/api/courses/delete-by-code', {
      method: 'DELETE',
      query: {
        code: scenario.code
      }
    })

    console.log('Delete response:', deleteResponse)

    // Only remove from local list if backend deletion was successful
    if (deleteResponse && deleteResponse.success) {
      const index = scenarios.value.findIndex(s => s.code === scenario.code)
      if (index !== -1) {
        scenarios.value.splice(index, 1)
      }
      console.log(`Successfully deleted course ${scenario.code} from both database and frontend`)
      
      // Show success message
      saveError.value = `Szenario "${scenario.name}" wurde erfolgreich aus der Datenbank gelöscht.`
      setTimeout(() => { saveError.value = '' }, 4000)
    } else {
      throw new Error('Backend deletion did not return success')
    }
  } catch (error: any) {
    console.error('Error deleting scenario from database:', error)
    console.error('Error details:', error.data)
    
    // Reset deleting state since deletion failed
    scenario.isDeleting = false
    
    // Show detailed error message
    let errorMessage = 'Fehler beim Löschen des Szenarios aus der Datenbank.'
    if (error.statusCode === 404) {
      errorMessage = `Szenario "${scenario.code}" wurde nicht in der Datenbank gefunden.`
    } else if (error.statusCode === 500) {
      errorMessage = `Server-Fehler beim Löschen von "${scenario.name}". Bitte versuchen Sie es erneut.`
    } else if (error.statusMessage) {
      errorMessage = `${error.statusMessage}`
    }
    
    saveError.value = errorMessage
    setTimeout(() => { saveError.value = '' }, 8000)
  }
}

// Change detection watchers
const createSnapshot = () => {
  if (!selectedScenario.value) return null
  return JSON.stringify({
    name: selectedScenario.value.name,
    code: selectedScenario.value.code,
    description: selectedScenario.value.description,
    introduction: selectedScenario.value.introduction,
    level: selectedScenario.value.level,
    totalTime: selectedScenario.value.totalTime,
    timePerQuestion: selectedScenario.value.timePerQuestion,
    maxAttempts: selectedScenario.value.maxAttempts
  })
}

// Watch for changes in course info fields
watch(selectedScenario, (newVal) => {
  if (!newVal) {
    hasUnsavedChanges.value = false
    lastSavedSnapshot.value = null
    return
  }

  const currentSnapshot = createSnapshot()
  
  // If we don't have a saved snapshot yet, create one (initial load)
  if (lastSavedSnapshot.value === null) {
    lastSavedSnapshot.value = currentSnapshot
    hasUnsavedChanges.value = false
    return
  }
  
  // Compare with last saved state
  hasUnsavedChanges.value = currentSnapshot !== lastSavedSnapshot.value
  
  console.log('Change detected:', hasUnsavedChanges.value ? 'YES' : 'NO')
  if (hasUnsavedChanges.value) {
    console.log('Unsaved changes in course info detected')
  }
}, { deep: true })

// Watch manual questions for changes
watch(manualQuestions, () => {
  if (selectedScenario.value && lastSavedSnapshot.value !== null) {
    hasUnsavedChanges.value = true
    console.log('Unsaved changes in questions detected')
  }
}, { deep: true })

// Update snapshot after successful save
const updateSavedSnapshot = () => {
  lastSavedSnapshot.value = createSnapshot()
  hasUnsavedChanges.value = false
}

// Load scenarios on mount
onMounted(() => {
  loadScenarios()
})
</script>

<style scoped>
.admin-page {
  min-height: 100vh;
  background: #ffffff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  padding-top: 80px; /* Space for global header */
}

.admin-header {
  background: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  padding: 2rem 0;
  margin-top: 0; /* Remove extra margin since we have padding-top on .admin-page */
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
  color: #0097b2;
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

.unsaved-indicator {
  background: #fef3c7;
  color: #92400e;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: 600;
  margin-top: 0.5rem;
  border: 1px solid #f59e0b;
  animation: pulse-warning 3s ease-in-out infinite;
}

@keyframes pulse-warning {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
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
  border-color: #0097b2;
  color: #0097b2;
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
  color: #0097b2;
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
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  text-align: center;
  margin-bottom: 1rem;
  border: 2px solid;
  
  /* Success messages */
  background: #e0f2f7;
  color: #0097b2;
  border-color: #0097b2;
}

/* Error messages */
.save-error {
  background: #e0f2f7;
  color: #0097b2;
  border-color: #0097b2;
}

/* Warning messages */  

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

.save-button.unsaved {
  background: #0097b2;
  animation: pulse-unsaved 2s ease-in-out infinite;
}

.save-button.unsaved:hover {
  background: #007a8e;
}

@keyframes pulse-unsaved {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
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
