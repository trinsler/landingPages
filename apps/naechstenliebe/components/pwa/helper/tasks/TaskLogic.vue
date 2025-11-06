<script setup>
import { ref } from 'vue'

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

// Task detail functions
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

// Profile functions
const openProfile = () => {
  navigateTo('/pwa/helper/profile')
}

// Navigation functions
const setActiveTab = (tab) => {
  activeTab.value = tab
  switch(tab) {
    case 'dashboard':
      navigateTo('/pwa')
      break
    case 'tasks':
      // Stay on current page
      break
    case 'loyalty':
      navigateTo('/pwa/helper/loyalty')
      break
    case 'earnings':
      navigateTo('/pwa/helper/earnings')
      break
    case 'profile':
      navigateTo('/pwa/helper/profile')
      break
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

// Modal visibility functions
const openDataProtectionModal = () => {
  showDataProtectionModal.value = true
}

const closeDataProtectionModal = () => {
  showDataProtectionModal.value = false
}

const openSupportModal = () => {
  showSupportModal.value = true
}

const closeSupportModal = () => {
  showSupportModal.value = false
  selectedIssue.value = null
  supportDescription.value = ''
}

export const useTaskLogic = () => {
  return {
    // Reactive state
    showTaskDetail,
    selectedTask,
    showSupportModal,
    showDataProtectionModal,
    selectedStatusFilter,
    activeTab,
    selectedIssue,
    supportDescription,
    
    // Functions
    openTaskDetail,
    closeTaskDetail,
    contactClient,
    openProfile,
    setActiveTab,
    handleSelectIssue,
    handleEmergencySupport,
    handleSubmitSupport,
    openDataProtectionModal,
    closeDataProtectionModal,
    openSupportModal,
    closeSupportModal
  }
}
</script>