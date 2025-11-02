<template>
  <div style="min-height: 100vh; background: #f5f5f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;">
    <!-- Header Component -->
    <AppHeader 
      title="Meine Aufträge" 
      current-role="helper"
      :request-count="availableJobsCount"
      @open-requests="handleRequestsClick"
      @open-profile="handleProfileClick"
      @open-news="handleNewsClick"
      @toggle-role="handleRoleToggle"
    />

    <!-- Quick Actions Section -->
    <QuickActions 
      @open-data-protection="showDataProtectionModal = true"
      @open-conflict-resolution="showSupportModal = true"
    />

    <!-- Filter Section -->
    <TaskFilters 
      :selected-filter="selectedStatusFilter"
      :status-filters="statusFilters"
      @filter-change="selectedStatusFilter = $event"
    />

    <!-- Tasks List -->
    <TaskList 
      :tasks="filteredTasks"
      @task-click="openTaskDetail"
      @contact-client="contactClient"
      @show-details="openTaskDetail"
    />

    <!-- Footer Component -->
    <AppFooter 
      active-tab="tasks"
      current-role="helper"
      @navigate="handleFooterNavigation"
    />

    <!-- Padding for bottom nav -->
    <div style="height: 5rem;"></div>

    <!-- Task Detail Modal -->
    <TaskDetailModal 
      v-if="showTaskDetail"
      :task="selectedTask"
      @close="closeTaskDetail"
      @mark-completed="markTaskCompleted"
      @contact-client="contactClient"
    />

    <!-- Support/Conflict Resolution Modal -->
    <SupportModal 
      :show="showSupportModal"
      :support-issues="supportIssues"
      @close="showSupportModal = false"
      @select-issue="handleSelectIssue"
      @emergency-call="handleEmergencySupport"
      @submit-support="handleSubmitSupport"
    />

    <!-- Data Protection Modal -->
    <DataProtectionModal 
      :show="showDataProtectionModal"
      @close="showDataProtectionModal = false"
    />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import AppHeader from '~/components/AppHeader.vue'
import AppFooter from '~/components/AppFooter.vue'
import TaskDetailModal from '~/components/pwa/helper/TaskDetailModal.vue'

// Import new components
import QuickActions from '~/components/pwa/helper/tasks/QuickActions.vue'
import TaskFilters from '~/components/pwa/helper/tasks/TaskFilters.vue'
import TaskList from '~/components/pwa/helper/tasks/TaskList.vue'
import SupportModal from '~/components/pwa/helper/tasks/SupportModal.vue'
import DataProtectionModal from '~/components/pwa/helper/tasks/DataProtectionModal.vue'

// Import data
import { mockTasks, supportIssues as supportData } from '~/components/pwa/helper/tasks/TasksData.js'

definePageMeta({
  layout: false
})

// Reactive state
const showTaskDetail = ref(false)
const selectedTask = ref(null)
const showSupportModal = ref(false)
const showDataProtectionModal = ref(false)
const selectedStatusFilter = ref('all')
const activeTab = ref('tasks')

// Support modal state
const selectedIssue = ref(null)
const supportDescription = ref('')

// Mock tasks data from imported file
const acceptedTasks = ref([...mockTasks])

// Support issues data from imported file
const supportIssues = [...supportData]

// Computed properties
const availableJobsCount = computed(() => 
  acceptedTasks.value.filter(task => task.status === 'active').length
)

const statusFilters = computed(() => [
  { 
    label: 'Alle', 
    value: 'all', 
    count: acceptedTasks.value.length 
  },
  { 
    label: 'Aktiv', 
    value: 'active', 
    count: acceptedTasks.value.filter(task => task.status === 'active').length 
  },
  { 
    label: 'Abgeschlossen', 
    value: 'completed', 
    count: acceptedTasks.value.filter(task => task.status === 'completed').length 
  },
  { 
    label: 'Wartend', 
    value: 'waiting', 
    count: acceptedTasks.value.filter(task => task.status === 'waiting').length 
  },
  { 
    label: 'Storniert', 
    value: 'cancelled', 
    count: acceptedTasks.value.filter(task => task.status === 'cancelled').length 
  }
])

const filteredTasks = computed(() => {
  if (selectedStatusFilter.value === 'all') {
    return acceptedTasks.value
  }
  return acceptedTasks.value.filter(task => task.status === selectedStatusFilter.value)
})

// Functions

const openTaskDetail = (task) => {
  selectedTask.value = task
  showTaskDetail.value = true
}

const closeTaskDetail = () => {
  showTaskDetail.value = false
  selectedTask.value = null
}

const contactClient = (task) => {
  console.log('Contacting client for task:', task)
  navigateTo({
    path: '/pwa/helper/task-active',
    query: {
      id: task.id,
      title: task.title,
      client: task.client,
      payment: task.payment,
      area: task.area
    }
  })
}

const markTaskCompleted = (task) => {
  console.log('Marking task as completed:', task)
  const taskIndex = acceptedTasks.value.findIndex(t => t.id === task.id)
  if (taskIndex !== -1) {
    acceptedTasks.value[taskIndex].status = 'completed'
  }
}

// Support modal functions
const handleSelectIssue = (issue) => {
  selectedIssue.value = issue
}

const handleEmergencySupport = () => {
  // In a real app, this would connect to emergency services
  alert('Notfall-Team wird kontaktiert. In einer echten App würde hier ein Anruf getätigt werden.')
  console.log('Emergency support requested')
}

const handleSubmitSupport = (data) => {
  console.log('Support request submitted:', data)
  showSupportModal.value = false
  selectedIssue.value = null
  // In a real app, this would submit to backend
}

// Header event handlers
const handleRequestsClick = () => {
  navigateTo('/pwa/helper/dashboard')
}

const handleProfileClick = () => {
  navigateTo('/pwa/shared/profile')
}

const handleNewsClick = () => {
  navigateTo('/pwa/shared/news')
}

const handleRoleToggle = () => {
  navigateTo('/pwa/seeker/dashboard')
}

// Footer navigation handler
const handleFooterNavigation = (tab) => {
  switch(tab) {
    case 'dashboard':
      navigateTo('/pwa/helper/dashboard')
      break
    case 'tasks':
      // Already on tasks page
      break
    case 'loyalty':
      navigateTo('/pwa/helper/loyalty')
      break
    case 'earnings':
      navigateTo('/pwa/helper/earnings')
      break
    case 'profile':
      navigateTo('/pwa/shared/profile')
      break
  }
}
</script>

<style scoped>
/* Custom scrollbar */
div::-webkit-scrollbar {
  width: 6px;
}

div::-webkit-scrollbar-track {
  background: rgba(0,0,0,0.1);
  border-radius: 3px;
}

div::-webkit-scrollbar-thumb {
  background: rgba(0,0,0,0.2);
  border-radius: 3px;
}

div::-webkit-scrollbar-thumb:hover {
  background: rgba(0,0,0,0.3);
}
</style>