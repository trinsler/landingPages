import { ref, computed, readonly } from 'vue'

// Global state for notifications
const notifications = ref([])
const notificationPreferences = ref({
  // Jobs (für Helfer)
  helper_new_jobs_nearby: true,
  helper_application_accepted: true,
  helper_application_rejected: true,
  helper_job_cancelled: true,
  
  // Jobs (für Hilfesuchende)
  seeker_new_application: true,
  seeker_job_completed: true,
  
  // Chat
  chat_new_messages: true,
  
  // Bewertungen
  reviews_new_review: true,
  
  // Zahlungen
  payments_completed: true
})
const isLoading = ref(false)
const error = ref(null)

export const useNotifications = () => {
  
  // Get all notifications for current user
  const getNotifications = async (userId) => {
    isLoading.value = true
    error.value = null
    
    try {
      const userNotifications = await fetchUserNotifications(userId)
      notifications.value = userNotifications
      return userNotifications
    } catch (err) {
      error.value = err.message
      console.error('Failed to get notifications:', err)
      return []
    } finally {
      isLoading.value = false
    }
  }
  
  // Mark notification as read
  const markAsRead = async (notificationId) => {
    try {
      await updateNotificationStatus(notificationId, true)
      
      // Update local state
      const notification = notifications.value.find(n => n.id === notificationId)
      if (notification) {
        notification.is_read = true
        notification.read_at = new Date().toISOString()
      }
      
      return { success: true }
    } catch (err) {
      console.error('Failed to mark notification as read:', err)
      return { success: false, error: err.message }
    }
  }
  
  // Mark all notifications as read
  const markAllAsRead = async (userId) => {
    try {
      await updateAllNotificationsAsRead(userId)
      
      // Update local state
      notifications.value.forEach(notification => {
        if (!notification.is_read) {
          notification.is_read = true
          notification.read_at = new Date().toISOString()
        }
      })
      
      return { success: true }
    } catch (err) {
      console.error('Failed to mark all notifications as read:', err)
      return { success: false, error: err.message }
    }
  }
  
  // Delete notification
  const deleteNotification = async (notificationId) => {
    try {
      await removeNotification(notificationId)
      
      // Remove from local state
      const index = notifications.value.findIndex(n => n.id === notificationId)
      if (index !== -1) {
        notifications.value.splice(index, 1)
      }
      
      return { success: true }
    } catch (err) {
      console.error('Failed to delete notification:', err)
      return { success: false, error: err.message }
    }
  }
  
  // Create new notification
  const createNotification = async (notificationData) => {
    try {
      // Check if user has this notification type enabled
      if (!shouldSendNotification(notificationData.type, notificationData.user_id)) {
        return { success: true, sent: false, reason: 'User disabled this notification type' }
      }
      
      const newNotification = {
        id: `notif_${Date.now()}`,
        user_id: notificationData.user_id,
        type: notificationData.type,
        title: notificationData.title,
        message: notificationData.message,
        data: notificationData.data || {},
        is_read: false,
        created_at: new Date().toISOString(),
        read_at: null
      }
      
      // Save notification
      await saveNotification(newNotification)
      
      // Add to local state if for current user
      if (notificationData.user_id === 'current_user_id') {
        notifications.value.unshift(newNotification)
      }
      
      // Send push notification if enabled
      if (notificationData.sendPush !== false) {
        await sendPushNotification(newNotification)
      }
      
      return { success: true, sent: true, notification: newNotification }
    } catch (err) {
      console.error('Failed to create notification:', err)
      return { success: false, error: err.message }
    }
  }
  
  // Update notification preferences
  const updateNotificationPreferences = async (userId, preferences) => {
    isLoading.value = true
    error.value = null
    
    try {
      await saveNotificationPreferences(userId, preferences)
      notificationPreferences.value = { ...preferences }
      
      return { success: true, message: 'Benachrichtigungseinstellungen gespeichert.' }
    } catch (err) {
      error.value = err.message
      console.error('Failed to update notification preferences:', err)
      return { success: false, error: err.message }
    } finally {
      isLoading.value = false
    }
  }
  
  // Load notification preferences
  const loadNotificationPreferences = async (userId) => {
    try {
      const preferences = await fetchNotificationPreferences(userId)
      notificationPreferences.value = { ...notificationPreferences.value, ...preferences }
      return preferences
    } catch (err) {
      console.error('Failed to load notification preferences:', err)
      return notificationPreferences.value
    }
  }
  
  // Check if notification should be sent based on user preferences
  const shouldSendNotification = (notificationType, userId) => {
    // In real app, this would check the user's preferences from database
    // For now, use the global preferences
    return notificationPreferences.value[notificationType] !== false
  }
  
  // Handle notification click (navigate to related content)
  const handleNotificationClick = async (notification) => {
    // Mark as read first
    if (!notification.is_read) {
      await markAsRead(notification.id)
    }
    
    // Navigate based on notification type and data
    const { type, data } = notification
    
    switch (type) {
      case 'helper_application_accepted':
      case 'helper_application_rejected':
      case 'helper_job_cancelled':
        if (data.jobId) {
          return navigateTo(`/pwa/jobs/detail/${data.jobId}`)
        }
        break
        
      case 'seeker_new_application':
      case 'seeker_job_completed':
        if (data.jobId) {
          return navigateTo(`/pwa/jobs/detail/${data.jobId}`)
        }
        break
        
      case 'chat_new_messages':
        if (data.chatId) {
          return navigateTo(`/pwa/chat/${data.chatId}`)
        }
        break
        
      case 'reviews_new_review':
        return navigateTo('/pwa/shared/profile')
        
      case 'payments_completed':
        if (data.transactionId) {
          return navigateTo('/pwa/shared/payment-methods')
        }
        break
        
      default:
        return navigateTo('/pwa')
    }
  }
  
  // Computed properties
  const unreadCount = computed(() => {
    return notifications.value.filter(n => !n.is_read).length
  })
  
  const recentNotifications = computed(() => {
    return notifications.value
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, 20)
  })
  
  const hasUnreadNotifications = computed(() => {
    return unreadCount.value > 0
  })
  
  return {
    // State
    notifications: readonly(notifications),
    notificationPreferences: readonly(notificationPreferences),
    isLoading: readonly(isLoading),
    error: readonly(error),
    
    // Computed
    unreadCount,
    recentNotifications,
    hasUnreadNotifications,
    
    // Methods
    getNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    createNotification,
    updateNotificationPreferences,
    loadNotificationPreferences,
    handleNotificationClick
  }
}

// Mock API functions - In real app, these would call actual backend APIs
async function fetchUserNotifications(userId) {
  await new Promise(resolve => setTimeout(resolve, 500))
  
  // Mock notifications
  return [
    {
      id: 'notif_1',
      user_id: userId,
      type: 'seeker_new_application',
      title: 'Neue Bewerbung!',
      message: 'Anna Weber hat sich für deinen Job "Einkaufshilfe" beworben.',
      data: { jobId: 'job_123', applicantId: 'user_456', applicantName: 'Anna Weber' },
      is_read: false,
      created_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      read_at: null
    },
    {
      id: 'notif_2',
      user_id: userId,
      type: 'payments_completed',
      title: 'Zahlung abgeschlossen',
      message: 'Du hast 25€ für den Job "Gartenpflege" erhalten.',
      data: { transactionId: 'tx_789', amount: 25, jobTitle: 'Gartenpflege' },
      is_read: false,
      created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      read_at: null
    },
    {
      id: 'notif_3',
      user_id: userId,
      type: 'reviews_new_review',
      title: 'Neue Bewertung erhalten!',
      message: 'Max Fischer hat dich mit 5 Sternen bewertet.',
      data: { reviewId: 'review_321', reviewerId: 'user_999', rating: 5 },
      is_read: true,
      created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      read_at: new Date(Date.now() - 23 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 'notif_4',
      user_id: userId,
      type: 'helper_application_accepted',
      title: 'Bewerbung angenommen!',
      message: 'Deine Bewerbung für "Seniorenbetreuung" wurde angenommen.',
      data: { jobId: 'job_654', seekerId: 'user_111', jobTitle: 'Seniorenbetreuung' },
      is_read: true,
      created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      read_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
    }
  ]
}

async function updateNotificationStatus(notificationId, isRead) {
  await new Promise(resolve => setTimeout(resolve, 300))
  console.log('Notification marked as read:', notificationId, isRead)
}

async function updateAllNotificationsAsRead(userId) {
  await new Promise(resolve => setTimeout(resolve, 500))
  console.log('All notifications marked as read for user:', userId)
}

async function removeNotification(notificationId) {
  await new Promise(resolve => setTimeout(resolve, 300))
  console.log('Notification deleted:', notificationId)
}

async function saveNotification(notification) {
  await new Promise(resolve => setTimeout(resolve, 300))
  console.log('Notification saved:', notification)
}

async function sendPushNotification(notification) {
  await new Promise(resolve => setTimeout(resolve, 200))
  console.log('Push notification sent:', notification.title)
}

async function fetchNotificationPreferences(userId) {
  await new Promise(resolve => setTimeout(resolve, 300))
  
  // Mock user preferences - in real app, fetch from database
  return {
    helper_new_jobs_nearby: true,
    helper_application_accepted: true,
    helper_application_rejected: false, // User disabled this
    helper_job_cancelled: true,
    seeker_new_application: true,
    seeker_job_completed: true,
    chat_new_messages: true,
    reviews_new_review: true,
    payments_completed: true
  }
}

async function saveNotificationPreferences(userId, preferences) {
  await new Promise(resolve => setTimeout(resolve, 500))
  console.log('Notification preferences saved:', userId, preferences)
}