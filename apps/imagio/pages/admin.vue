<template>
  <div class="admin-screen">
    <div class="admin-content">
      <h1 class="admin-title">{{ t('adminDashboard', globalTranslations) }}</h1>
      
      <!-- Tab Navigation -->
      <div class="tab-navigation">
        <button 
          @click="activeTab = 'scenarios'"
          class="tab-button"
          :class="{ active: activeTab === 'scenarios' }"
        >
          {{ t('scenarioManagement', globalTranslations) }}
        </button>
        <button 
          @click="activeTab = 'users'"
          class="tab-button"
          :class="{ active: activeTab === 'users' }"
        >
          {{ t('userManagement', globalTranslations) }}
        </button>
      </div>
      
      <!-- Tab Content -->
      <div class="tab-content">
        <!-- Scenario Management Tab -->
        <div v-if="activeTab === 'scenarios'" class="scenario-tab">
          <div class="split-pane">
            <!-- Left Pane: Scenarios (40%) -->
            <div class="scenarios-pane">
              <div class="pane-header">
                <h3 class="pane-title">{{ t('scenarios', globalTranslations) }}</h3>
                <button @click="createScenario" class="create-button">
                  {{ t('createScenario', globalTranslations) }}
                </button>
              </div>
              
              <div class="scenarios-list">
                <div 
                  v-for="scenario in scenarios" 
                  :key="scenario.id"
                  @click="selectScenario(scenario)"
                  class="scenario-item"
                  :class="{ active: selectedScenario?.id === scenario.id }"
                >
                  <div class="scenario-info">
                    <h4 class="scenario-name">{{ scenario.name }}</h4>
                    <p class="scenario-code">{{ t('code', globalTranslations) }}: {{ scenario.code }}</p>
                    <p class="scenario-questions">{{ scenario.questions.length }} {{ t('questions', globalTranslations) }}</p>
                  </div>
                  <div class="scenario-actions">
                    <button @click.stop="editScenario(scenario)" class="action-button edit">
                      {{ t('edit', globalTranslations) }}
                    </button>
                    <button @click.stop="deleteScenario(scenario.id)" class="action-button delete">
                      {{ t('delete', globalTranslations) }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Right Pane: Questions (60%) -->
            <div class="questions-pane">
              <div class="pane-header">
                <h3 class="pane-title">
                  {{ selectedScenario ? `${t('questionsFor', globalTranslations)} "${selectedScenario.name}"` : t('selectScenario', globalTranslations) }}
                </h3>
                <button 
                  v-if="selectedScenario"
                  @click="createQuestion" 
                  class="create-button"
                >
                  {{ t('addQuestion', globalTranslations) }}
                </button>
              </div>
              
              <div v-if="selectedScenario" class="questions-list">
                <div class="drag-area">
                  <div 
                    v-for="(question, index) in selectedScenario.questions"
                    :key="question.id"
                    class="question-item"
                    draggable="true"
                    @dragstart="dragStart(index)"
                    @dragover.prevent
                    @drop="dragDrop(index)"
                  >
                    <div class="drag-handle">⋮⋮</div>
                    <div class="question-info">
                      <div class="question-number">{{ index + 1 }}</div>
                      <div class="question-content">
                        <h4 class="question-text">{{ question.text }}</h4>
                        <p class="question-meta">
                          {{ t('duration', globalTranslations) }}: {{ question.duration }}s | 
                          {{ t('type', globalTranslations) }}: {{ question.type }}
                        </p>
                      </div>
                    </div>
                    <div class="question-actions">
                      <button @click="editQuestion(question)" class="action-button edit">
                        {{ t('edit', globalTranslations) }}
                      </button>
                      <button @click="deleteQuestion(question.id)" class="action-button delete">
                        {{ t('delete', globalTranslations) }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div v-else class="no-scenario-selected">
                <p>{{ t('selectScenarioToManage', globalTranslations) }}</p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- User Management Tab -->
        <div v-if="activeTab === 'users'" class="users-tab">
          <div class="users-section">
            <div class="section-header">
              <h3 class="section-title">{{ t('adminUsers', globalTranslations) }}</h3>
              <button @click="showCreateUserForm = true" class="create-button">
                {{ t('createUser', globalTranslations) }}
              </button>
            </div>
            
            <div class="users-table">
              <div class="table-header">
                <div class="header-cell">{{ t('username', globalTranslations) }}</div>
                <div class="header-cell">{{ t('role', globalTranslations) }}</div>
                <div class="header-cell">{{ t('created', globalTranslations) }}</div>
                <div class="header-cell">{{ t('actions', globalTranslations) }}</div>
              </div>
              
              <div 
                v-for="user in users" 
                :key="user.id"
                class="table-row"
              >
                <div class="table-cell">{{ user.username }}</div>
                <div class="table-cell">
                  <span class="role-badge" :class="user.role">{{ user.role }}</span>
                </div>
                <div class="table-cell">{{ formatDate(user.created) }}</div>
                <div class="table-cell">
                  <button @click="editUser(user)" class="action-button edit">
                    {{ t('edit', globalTranslations) }}
                  </button>
                  <button @click="deleteUser(user.id)" class="action-button delete">
                    {{ t('delete', globalTranslations) }}
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Create User Form -->
          <div v-if="showCreateUserForm" class="modal-overlay" @click="showCreateUserForm = false">
            <div class="modal-content" @click.stop>
              <div class="modal-header">
                <h3 class="modal-title">{{ t('createNewUser', globalTranslations) }}</h3>
                <button @click="showCreateUserForm = false" class="modal-close">×</button>
              </div>
              <form @submit.prevent="createUser" class="user-form">
                <div class="form-group">
                  <label>{{ t('username', globalTranslations) }}</label>
                  <input v-model="newUser.username" type="text" class="form-input" required>
                </div>
                <div class="form-group">
                  <label>{{ t('password', globalTranslations) }}</label>
                  <input v-model="newUser.password" type="password" class="form-input" required>
                </div>
                <div class="form-group">
                  <label>{{ t('role', globalTranslations) }}</label>
                  <select v-model="newUser.role" class="form-input">
                    <option value="admin">Admin</option>
                    <option value="moderator">Moderator</option>
                    <option value="viewer">Viewer</option>
                  </select>
                </div>
                <div class="form-actions">
                  <button type="submit" class="submit-button">
                    {{ t('createUser', globalTranslations) }}
                  </button>
                  <button type="button" @click="showCreateUserForm = false" class="cancel-button">
                    {{ t('cancel', globalTranslations) }}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useLanguage, globalTranslations } from '~/composables/useLanguage'

const { t } = useLanguage()

// Tab management
const activeTab = ref('scenarios')

// Scenario management
const scenarios = ref([
  {
    id: 1,
    name: 'Communication Skills Assessment',
    code: '123',
    questions: [
      { id: 1, text: 'Introduce yourself and explain your background', duration: 45, type: 'voice' },
      { id: 2, text: 'How do you handle difficult conversations?', duration: 45, type: 'voice' },
      { id: 3, text: 'Describe a time when you had to explain a complex concept', duration: 60, type: 'voice' }
    ]
  },
  {
    id: 2,
    name: 'Customer Service Training',
    code: 'CS001',
    questions: [
      { id: 4, text: 'How would you handle an angry customer?', duration: 45, type: 'voice' },
      { id: 5, text: 'Describe your problem-solving approach', duration: 60, type: 'voice' },
      { id: 6, text: 'What makes good customer service?', duration: 45, type: 'voice' }
    ]
  },
  {
    id: 3,
    name: 'Leadership Assessment',
    code: 'LD002',
    questions: [
      { id: 7, text: 'Describe your leadership style', duration: 60, type: 'voice' },
      { id: 8, text: 'How do you motivate a team?', duration: 45, type: 'voice' }
    ]
  }
])

const selectedScenario = ref(null)

// User management
const users = ref([
  { id: 1, username: 'admin', role: 'admin', created: new Date('2024-01-01') },
  { id: 2, username: 'moderator1', role: 'moderator', created: new Date('2024-02-15') },
  { id: 3, username: 'viewer1', role: 'viewer', created: new Date('2024-03-10') }
])

const showCreateUserForm = ref(false)
const newUser = ref({ username: '', password: '', role: 'viewer' })

// Drag and drop
const draggedIndex = ref(-1)

// Methods
const selectScenario = (scenario: any) => {
  selectedScenario.value = scenario
}

const createScenario = () => {
  const name = prompt('Enter scenario name:')
  const code = prompt('Enter scenario code:')
  if (name && code) {
    const newScenario = {
      id: Date.now(),
      name,
      code: code.toUpperCase(),
      questions: []
    }
    scenarios.value.push(newScenario)
  }
}

const editScenario = (scenario: any) => {
  const newName = prompt('Edit scenario name:', scenario.name)
  if (newName) {
    scenario.name = newName
  }
}

const deleteScenario = (id: number) => {
  if (confirm('Are you sure you want to delete this scenario?')) {
    scenarios.value = scenarios.value.filter(s => s.id !== id)
    if (selectedScenario.value?.id === id) {
      selectedScenario.value = null
    }
  }
}

const createQuestion = () => {
  if (!selectedScenario.value) return
  
  const text = prompt('Enter question text:')
  const duration = parseInt(prompt('Enter duration (seconds):', '45') || '45')
  
  if (text) {
    const newQuestion = {
      id: Date.now(),
      text,
      duration,
      type: 'voice'
    }
    selectedScenario.value.questions.push(newQuestion)
  }
}

const editQuestion = (question: any) => {
  const newText = prompt('Edit question text:', question.text)
  if (newText) {
    question.text = newText
  }
}

const deleteQuestion = (id: number) => {
  if (!selectedScenario.value) return
  if (confirm('Are you sure you want to delete this question?')) {
    selectedScenario.value.questions = selectedScenario.value.questions.filter(q => q.id !== id)
  }
}

const dragStart = (index: number) => {
  draggedIndex.value = index
}

const dragDrop = (dropIndex: number) => {
  if (draggedIndex.value === -1 || !selectedScenario.value) return
  
  const questions = selectedScenario.value.questions
  const draggedItem = questions[draggedIndex.value]
  
  // Remove the dragged item
  questions.splice(draggedIndex.value, 1)
  
  // Insert at new position
  const newIndex = draggedIndex.value < dropIndex ? dropIndex - 1 : dropIndex
  questions.splice(newIndex, 0, draggedItem)
  
  draggedIndex.value = -1
}

const createUser = () => {
  const user = {
    id: Date.now(),
    ...newUser.value,
    created: new Date()
  }
  users.value.push(user)
  newUser.value = { username: '', password: '', role: 'viewer' }
  showCreateUserForm.value = false
}

const editUser = (user: any) => {
  const newUsername = prompt('Edit username:', user.username)
  if (newUsername) {
    user.username = newUsername
  }
}

const deleteUser = (id: number) => {
  if (confirm('Are you sure you want to delete this user?')) {
    users.value = users.value.filter(u => u.id !== id)
  }
}

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  }).format(date)
}
</script>

<style scoped>
.admin-screen {
  min-height: calc(100vh - 64px);
  padding: 2rem;
  background-color: #f8fafc;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.admin-content {
  max-width: 1400px;
  margin: 0 auto;
}

.admin-title {
  color: #1f2937;
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 2rem;
  text-align: center;
}

/* Tab Navigation */
.tab-navigation {
  display: flex;
  gap: 0.25rem;
  margin-bottom: 2rem;
  border-bottom: 2px solid #e5e7eb;
}

.tab-button {
  padding: 0.75rem 1.5rem;
  background: none;
  border: none;
  color: #6b7280;
  font-weight: 500;
  cursor: pointer;
  border-bottom: 3px solid transparent;
  transition: all 0.2s;
}

.tab-button:hover {
  color: #374151;
  background-color: #f9fafb;
}

.tab-button.active {
  color: #0097b2;
  border-bottom-color: #0097b2;
  background-color: #ffffff;
}

/* Tab Content */
.tab-content {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 2rem;
}

/* Split Pane Layout */
.split-pane {
  display: flex;
  gap: 2rem;
  min-height: 600px;
}

.scenarios-pane {
  flex: 0 0 40%;
  border-right: 2px solid #e5e7eb;
  padding-right: 2rem;
}

.questions-pane {
  flex: 1;
}

.pane-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e5e7eb;
}

.pane-title {
  color: #1f2937;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
}

.create-button {
  padding: 0.5rem 1rem;
  background-color: #0097b2;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.create-button:hover {
  background-color: #007a8e;
}

/* Scenarios List */
.scenarios-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.scenario-item {
  padding: 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.scenario-item:hover {
  border-color: #0097b2;
  transform: translateY(-1px);
}

.scenario-item.active {
  border-color: #0097b2;
  background-color: #f0f9ff;
}

.scenario-info h4 {
  color: #1f2937;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
}

.scenario-code {
  color: #6b7280;
  font-size: 0.875rem;
  margin: 0.25rem 0;
}

.scenario-questions {
  color: #374151;
  font-size: 0.875rem;
  margin: 0.25rem 0 1rem 0;
}

.scenario-actions {
  display: flex;
  gap: 0.5rem;
}

.action-button {
  padding: 0.375rem 0.75rem;
  border: none;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.action-button.edit {
  background-color: #f59e0b;
  color: #ffffff;
}

.action-button.edit:hover {
  background-color: #d97706;
}

.action-button.delete {
  background-color: #ef4444;
  color: #ffffff;
}

.action-button.delete:hover {
  background-color: #dc2626;
}

/* Questions List */
.questions-list {
  max-height: 500px;
  overflow-y: auto;
}

.drag-area {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.question-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  transition: all 0.2s;
}

.question-item:hover {
  background-color: #f3f4f6;
  border-color: #d1d5db;
}

.drag-handle {
  color: #9ca3af;
  font-weight: bold;
  cursor: grab;
  user-select: none;
}

.drag-handle:active {
  cursor: grabbing;
}

.question-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
}

.question-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  background-color: #0097b2;
  color: #ffffff;
  border-radius: 50%;
  font-weight: 600;
  font-size: 0.875rem;
}

.question-content {
  flex: 1;
}

.question-text {
  color: #1f2937;
  font-weight: 500;
  margin: 0 0 0.25rem 0;
  font-size: 1rem;
}

.question-meta {
  color: #6b7280;
  font-size: 0.75rem;
  margin: 0;
}

.question-actions {
  display: flex;
  gap: 0.5rem;
}

.no-scenario-selected {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  color: #6b7280;
  font-style: italic;
}

/* User Management */
.users-section {
  margin-bottom: 2rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e5e7eb;
}

.section-title {
  color: #1f2937;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
}

/* Users Table */
.users-table {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
}

.table-header {
  display: grid;
  grid-template-columns: 1fr 120px 120px 140px;
  background-color: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
}

.header-cell {
  padding: 0.75rem 1rem;
  font-weight: 600;
  color: #374151;
  font-size: 0.875rem;
}

.table-row {
  display: grid;
  grid-template-columns: 1fr 120px 120px 140px;
  border-bottom: 1px solid #f3f4f6;
}

.table-row:last-child {
  border-bottom: none;
}

.table-row:hover {
  background-color: #f9fafb;
}

.table-cell {
  padding: 1rem;
  color: #374151;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.role-badge {
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
}

.role-badge.admin {
  background-color: #fee2e2;
  color: #991b1b;
}

.role-badge.moderator {
  background-color: #fef3c7;
  color: #92400e;
}

.role-badge.viewer {
  background-color: #e0f2fe;
  color: #0277bd;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;
  padding: 1rem;
}

.modal-content {
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  padding: 1.5rem 1.5rem 0 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
}

.modal-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.modal-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #6b7280;
  cursor: pointer;
  padding: 0.25rem;
  line-height: 1;
}

.modal-close:hover {
  color: #374151;
}

/* Form Styles */
.user-form {
  padding: 0 1.5rem 1.5rem 1.5rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
}

.form-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.875rem;
  transition: border-color 0.15s ease;
}

.form-input:focus {
  outline: none;
  border-color: #0097b2;
  box-shadow: 0 0 0 2px rgba(0, 151, 178, 0.1);
}

.form-actions {
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
  margin-top: 1.5rem;
}

.submit-button {
  padding: 0.75rem 1.5rem;
  background-color: #0097b2;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.15s ease;
}

.submit-button:hover {
  background-color: #007a8e;
}

.cancel-button {
  padding: 0.75rem 1.5rem;
  background-color: #ffffff;
  color: #374151;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s ease;
}

.cancel-button:hover {
  background-color: #f9fafb;
  border-color: #9ca3af;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .split-pane {
    flex-direction: column;
  }
  
  .scenarios-pane {
    flex: none;
    border-right: none;
    border-bottom: 2px solid #e5e7eb;
    padding-right: 0;
    padding-bottom: 2rem;
  }
  
  .table-header,
  .table-row {
    grid-template-columns: 1fr;
  }
  
  .table-cell {
    padding: 0.5rem 1rem;
  }
}

@media (max-width: 768px) {
  .admin-screen {
    padding: 1rem;
  }
  
  .admin-title {
    font-size: 1.5rem;
  }
  
  .tab-content {
    padding: 1rem;
  }
  
  .pane-header {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
  
  .question-info {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}
</style>