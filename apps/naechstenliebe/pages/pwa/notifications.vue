<template>
  <div class="notifications-container">
    <!-- Header -->
    <AppHeader 
      title="Benachrichtigungen" 
      current-role="unified"
      :request-count="0"
      :show-back="true"
      @back="() => navigateTo('/pwa')"
      @open-profile="() => navigateTo('/pwa/shared/profile')"
    />

    <div class="content-container">
      
      <!-- Loading State -->
      <div v-if="isLoading" class="loading-container">
        <div class="loading-spinner"></div>
        <p>Lade Benachrichtigungen...</p>
      </div>

      <!-- Notifications Content -->
      <div v-else class="notifications-content">
        
        <!-- Header Actions -->
        <div v-if="notifications.length > 0" class="notifications-header">
          <div class="header-info">
            <h2>Deine Benachrichtigungen</h2>
            <p v-if="unreadCount > 0">{{ unreadCount }} ungelesen</p>
            <p v-else>Alle gelesen</p>
          </div>
          <div class="header-actions">
            <button 
              v-if="unreadCount > 0"
              @click="markAllAsReadAction"
              :disabled="isMarkingAllRead"
              class="btn-mark-all"
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span v-if="isMarkingAllRead">Markiere...</span>
              <span v-else>Alle als gelesen</span>
            </button>
          </div>
        </div>

        <!-- No Notifications State -->
        <div v-if="notifications.length === 0" class="no-notifications">
          <div class="no-notifications-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5-5-5h5V7h5l-5-5-5 5h5v10z"/>
            </svg>
          </div>
          <h3>Keine Benachrichtigungen</h3>
          <p>Du hast noch keine Benachrichtigungen erhalten.</p>
        </div>

        <!-- Notifications List -->
        <div v-else class="notifications-list">
          <div 
            v-for="notification in recentNotifications" 
            :key="notification.id"
            class="notification-item"
            :class="{ 
              'unread': !notification.is_read,
              'deleting': deletingNotifications.includes(notification.id)
            }"
            @click="handleNotificationClick(notification)"
          >
            <!-- Swipe Delete (Mobile) -->
            <div class="swipe-actions">
              <button 
                @click.stop="deleteNotificationAction(notification.id)"
                class="swipe-delete"
              >
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
                Löschen
              </button>
            </div>

            <!-- Notification Content -->
            <div class="notification-content">
              <div class="notification-icon" :class="getNotificationTypeClass(notification.type)">
                <svg v-if="notification.type.startsWith('helper_')" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6"/>
                </svg>
                <svg v-else-if="notification.type.startsWith('seeker_')" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
                <svg v-else-if="notification.type.startsWith('chat_')" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                </svg>
                <svg v-else-if="notification.type.startsWith('reviews_')" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                </svg>
                <svg v-else-if="notification.type.startsWith('payments_')" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
                </svg>
                <svg v-else fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5-5-5h5V7h5l-5-5-5 5h5v10z"/>
                </svg>
              </div>
              
              <div class="notification-body">
                <div class="notification-header">
                  <h4 class="notification-title">{{ notification.title }}</h4>
                  <div class="notification-time">{{ formatTime(notification.created_at) }}</div>
                </div>
                <p class="notification-message">{{ notification.message }}</p>
                <div v-if="!notification.is_read" class="unread-indicator"></div>
              </div>
            </div>

            <!-- Desktop Delete Button -->
            <button 
              @click.stop="deleteNotificationAction(notification.id)"
              class="delete-btn desktop-only"
              :disabled="deletingNotifications.includes(notification.id)"
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
              </svg>
            </button>
          </div>
        </div>

      </div>

    </div>

    <!-- Success/Error Messages -->
    <div v-if="showMessage" class="message" :class="messageType">
      <div class="message-content">
        <svg v-if="messageType === 'success'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
        </svg>
        <svg v-else fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"/>
        </svg>
        <span>{{ message }}</span>
      </div>
    </div>

    <!-- Footer -->
    <UnifiedFooter 
      active-tab="dashboard"
      current-role="unified"
      @navigate="handleFooterNavigation"
    />

    <!-- Padding for footer -->
    <div style="height: 6rem;"></div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import AppHeader from '~/components/AppHeader.vue'
import UnifiedFooter from '~/components/pwa/unified/UnifiedFooter.vue'
import { useNotifications } from '~/composables/useNotifications.js'

definePageMeta({
  layout: false
})

// Use notifications composable
const { 
  notifications,
  recentNotifications,
  unreadCount,
  isLoading,
  getNotifications,
  markAllAsRead,
  deleteNotification,
  handleNotificationClick: handleClick
} = useNotifications()

// Component state
const isMarkingAllRead = ref(false)
const deletingNotifications = ref([])
const showMessage = ref(false)
const message = ref('')
const messageType = ref('success')

// Load notifications on mount
onMounted(async () => {
  await getNotifications('current_user_id')
})

// Methods
const markAllAsReadAction = async () => {
  isMarkingAllRead.value = true
  
  try {
    const result = await markAllAsRead('current_user_id')
    
    if (result.success) {
      showSuccessMessage('Alle Benachrichtigungen als gelesen markiert.')
    } else {
      showErrorMessage(result.error)
    }
  } catch (error) {
    showErrorMessage('Fehler beim Markieren der Benachrichtigungen.')
  } finally {
    isMarkingAllRead.value = false
  }
}

const deleteNotificationAction = async (notificationId) => {
  deletingNotifications.value.push(notificationId)
  
  try {
    const result = await deleteNotification(notificationId)
    
    if (result.success) {
      showSuccessMessage('Benachrichtigung gelöscht.')
    } else {
      showErrorMessage(result.error)
    }
  } catch (error) {
    showErrorMessage('Fehler beim Löschen der Benachrichtigung.')
  } finally {
    const index = deletingNotifications.value.indexOf(notificationId)
    if (index > -1) {
      deletingNotifications.value.splice(index, 1)
    }
  }
}

const handleNotificationClick = async (notification) => {
  if (deletingNotifications.value.includes(notification.id)) return
  
  await handleClick(notification)
}

const getNotificationTypeClass = (type) => {
  if (type.startsWith('helper_')) return 'helper'
  if (type.startsWith('seeker_')) return 'seeker'
  if (type.startsWith('chat_')) return 'chat'
  if (type.startsWith('reviews_')) return 'reviews'
  if (type.startsWith('payments_')) return 'payments'
  return 'default'
}

const formatTime = (dateString) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffInMinutes = Math.floor((now - date) / (1000 * 60))
  
  if (diffInMinutes < 1) return 'gerade eben'
  if (diffInMinutes < 60) return `vor ${diffInMinutes} Min`
  
  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) return `vor ${diffInHours} Std`
  
  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 7) return `vor ${diffInDays} Tag${diffInDays > 1 ? 'en' : ''}`
  
  return date.toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

const showSuccessMessage = (msg) => {
  message.value = msg
  messageType.value = 'success'
  showMessage.value = true
  setTimeout(() => {
    showMessage.value = false
  }, 3000)
}

const showErrorMessage = (msg) => {
  message.value = msg
  messageType.value = 'error'
  showMessage.value = true
  setTimeout(() => {
    showMessage.value = false
  }, 4000)
}

const handleFooterNavigation = (tab) => {
  switch(tab) {
    case 'dashboard':
      navigateTo('/pwa')
      break
    case 'profile':
      navigateTo('/pwa/shared/profile')
      break
  }
}
</script>

<style scoped>
.notifications-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}

.content-container {
  padding: 1rem;
  padding-bottom: 6rem;
  max-width: 700px;
  margin: 0 auto;
}

/* Loading State */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 3rem;
  color: #6b7280;
}

.loading-spinner {
  width: 2rem;
  height: 2rem;
  border: 3px solid #f3f4f6;
  border-top: 3px solid #5F6F55;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Notifications Content */
.notifications-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* Header */
.notifications-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: white;
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.header-info h2 {
  color: #374151;
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0 0 0.25rem 0;
}

.header-info p {
  color: #6b7280;
  font-size: 0.875rem;
  margin: 0;
}

.btn-mark-all {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: #5F6F55;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-mark-all:hover:not(:disabled) {
  background: #4a5c44;
}

.btn-mark-all:disabled {
  background: #d1d5db;
  color: #9ca3af;
  cursor: not-allowed;
}

.btn-mark-all svg {
  width: 1rem;
  height: 1rem;
}

/* No Notifications State */
.no-notifications {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  padding: 3rem;
  text-align: center;
  background: white;
  border-radius: 20px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.no-notifications-icon {
  width: 4rem;
  height: 4rem;
  color: #d1d5db;
}

.no-notifications h3 {
  color: #374151;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
}

.no-notifications p {
  color: #6b7280;
  margin: 0;
}

/* Notifications List */
.notifications-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.notification-item {
  position: relative;
  display: flex;
  align-items: center;
  background: white;
  border-radius: 12px;
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease;
  overflow: hidden;
}

.notification-item:hover {
  border-color: #e5e7eb;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.notification-item.unread {
  border-color: #BECDA3;
  background: #fefffe;
}

.notification-item.deleting {
  opacity: 0.5;
  pointer-events: none;
}

/* Swipe Actions (Mobile) */
.swipe-actions {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  background: #ef4444;
  width: 0;
  overflow: hidden;
  transition: width 0.3s ease;
  display: flex;
  align-items: center;
  z-index: 1;
}

.notification-item:hover .swipe-actions {
  width: 80px;
}

.swipe-delete {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: none;
  border: none;
  color: white;
  font-size: 0.75rem;
  cursor: pointer;
  padding: 0.5rem;
}

.swipe-delete svg {
  width: 1.25rem;
  height: 1.25rem;
  margin-bottom: 0.25rem;
}

/* Notification Content */
.notification-content {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  flex: 1;
  min-width: 0;
  position: relative;
}

.notification-icon {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.notification-icon.helper {
  background: rgba(34, 197, 94, 0.1);
  color: #22c55e;
}

.notification-icon.seeker {
  background: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
}

.notification-icon.chat {
  background: rgba(245, 158, 11, 0.1);
  color: #f59e0b;
}

.notification-icon.reviews {
  background: rgba(168, 85, 247, 0.1);
  color: #a855f7;
}

.notification-icon.payments {
  background: rgba(34, 197, 94, 0.1);
  color: #22c55e;
}

.notification-icon.default {
  background: rgba(107, 114, 128, 0.1);
  color: #6b7280;
}

.notification-icon svg {
  width: 1.25rem;
  height: 1.25rem;
}

.notification-body {
  flex: 1;
  min-width: 0;
}

.notification-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.notification-title {
  color: #374151;
  font-size: 0.875rem;
  font-weight: 600;
  margin: 0;
  line-height: 1.3;
}

.notification-item.unread .notification-title {
  font-weight: 700;
}

.notification-time {
  color: #6b7280;
  font-size: 0.75rem;
  white-space: nowrap;
  flex-shrink: 0;
}

.notification-message {
  color: #6b7280;
  font-size: 0.75rem;
  line-height: 1.4;
  margin: 0;
  word-break: break-word;
}

.notification-item.unread .notification-message {
  color: #374151;
}

.unread-indicator {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  width: 0.5rem;
  height: 0.5rem;
  background: #5F6F55;
  border-radius: 50%;
}

/* Desktop Delete Button */
.delete-btn {
  padding: 0.5rem;
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.2s ease;
  margin-right: 0.5rem;
}

.delete-btn:hover:not(:disabled) {
  background: #fef2f2;
  color: #ef4444;
}

.delete-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.delete-btn svg {
  width: 1.125rem;
  height: 1.125rem;
}

.desktop-only {
  display: none;
}

/* Messages */
.message {
  position: fixed;
  top: 1rem;
  left: 1rem;
  right: 1rem;
  z-index: 2000;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  animation: slideIn 0.3s ease;
}

.message.success {
  background: #22c55e;
  color: white;
}

.message.error {
  background: #ef4444;
  color: white;
}

.message-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.message-content svg {
  width: 1.25rem;
  height: 1.25rem;
  flex-shrink: 0;
}

@keyframes slideIn {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Responsive Design */
@media (min-width: 768px) {
  .content-container {
    padding: 2rem;
  }
  
  .desktop-only {
    display: flex;
  }
  
  .swipe-actions {
    display: none;
  }
  
  .notification-content {
    padding: 1.25rem;
  }
  
  .notifications-header {
    padding: 2rem;
  }
}

@media (max-width: 480px) {
  .notifications-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .btn-mark-all {
    align-self: stretch;
    justify-content: center;
  }
  
  .notification-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }
  
  .notification-time {
    font-size: 0.6875rem;
  }
}
</style>