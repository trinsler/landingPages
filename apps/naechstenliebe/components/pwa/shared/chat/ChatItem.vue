<template>
  <div class="chat-item-container">
    <ClientOnly>
      <div 
        class="chat-item" 
        :class="{ 
          unread: chat.unreadCount > 0,
          'swiping': isSwipping
        }" 
        :style="{ transform: `translateX(${swipeOffset}px)` }"
        @click="handleClick"
        @touchstart="handleTouchStart"
        @touchmove="handleTouchMove"
        @touchend="handleTouchEnd"
        @mousedown="handleMouseDown"
        @mousemove="handleMouseMove"
        @mouseup="handleMouseUp"
        @mouseleave="handleMouseUp"
      >
        <ChatAvatar :name="chat.name" :type="chat.avatar" />
        
        <div class="chat-content">
          <div class="chat-header">
            <h3 class="chat-name">{{ chat.name }}</h3>
            <span class="chat-time">{{ formatTime(chat.lastMessageTime) }}</span>
          </div>
          <p class="chat-message">{{ truncateMessage(chat.lastMessage) }}</p>
        </div>
        
        <div v-if="chat.unreadCount > 0" class="unread-badge">
          {{ chat.unreadCount }}
        </div>
      </div>
      
      <!-- Swipe Actions -->
      <div class="swipe-actions" :class="{ visible: swipeOffset < -50 }">
        <button @click="handleReport" class="action-btn report-btn">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"/>
          </svg>
          <span>Melden</span>
        </button>
        <button @click="handleDelete" class="action-btn delete-btn">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
          </svg>
          <span>Löschen</span>
        </button>
      </div>
      
      <template #fallback>
        <!-- Fallback for SSR - simple non-interactive version -->
        <div 
          class="chat-item" 
          :class="{ unread: chat.unreadCount > 0 }"
          @click="handleClick"
        >
          <ChatAvatar :name="chat.name" :type="chat.avatar" />
          
          <div class="chat-content">
            <div class="chat-header">
              <h3 class="chat-name">{{ chat.name }}</h3>
              <span class="chat-time">{{ formatTime(chat.lastMessageTime) }}</span>
            </div>
            <p class="chat-message">{{ truncateMessage(chat.lastMessage) }}</p>
          </div>
          
          <div v-if="chat.unreadCount > 0" class="unread-badge">
            {{ chat.unreadCount }}
          </div>
        </div>
      </template>
    </ClientOnly>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ChatAvatar from './ChatAvatar.vue'

const props = defineProps({
  chat: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['click', 'delete', 'report'])

const swipeOffset = ref(0)
const isSwipping = ref(false)
const startX = ref(0)
const isDragging = ref(false)

const formatTime = (timestamp) => {
  const now = new Date()
  const messageDate = new Date(timestamp)
  const diffMs = now - messageDate
  const diffMinutes = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / (60 * 60000))
  const diffDays = Math.floor(diffMs / (24 * 60 * 60000))
  
  if (diffMinutes < 1) return 'gerade'
  if (diffMinutes < 60) return `vor ${diffMinutes} Min.`
  
  if (diffHours < 24 && messageDate.toDateString() === now.toDateString()) {
    return messageDate.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })
  }
  
  const yesterday = new Date(now)
  yesterday.setDate(yesterday.getDate() - 1)
  if (messageDate.toDateString() === yesterday.toDateString()) {
    return 'gestern'
  }
  
  if (diffDays < 7) {
    return messageDate.toLocaleDateString('de-DE', { weekday: 'short' })
  }
  
  if (messageDate.getFullYear() === now.getFullYear()) {
    return messageDate.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' })
  }
  
  return messageDate.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: '2-digit' })
}

const truncateMessage = (message) => {
  if (message.length <= 50) return message
  return message.substring(0, 47) + '...'
}

// Touch handlers
const handleTouchStart = (e) => {
  if (!process.client) return
  startX.value = e.touches[0].clientX
  isDragging.value = true
  isSwipping.value = false
}

const handleTouchMove = (e) => {
  if (!process.client || !isDragging.value) return
  
  const currentX = e.touches[0].clientX
  const diffX = currentX - startX.value
  
  // Only trigger swipe if moved more than 10px
  if (Math.abs(diffX) > 10) {
    isSwipping.value = true
    
    // Only allow left swipe (negative values)
    if (diffX <= 0) {
      swipeOffset.value = Math.max(diffX, -120)
      e.preventDefault()
    }
  }
}

const handleTouchEnd = () => {
  isDragging.value = false
  isSwipping.value = false
  
  // Snap to position
  if (swipeOffset.value < -50) {
    swipeOffset.value = -120
  } else {
    swipeOffset.value = 0
  }
}

// Mouse handlers for desktop support
const handleMouseDown = (e) => {
  if (!process.client) return
  startX.value = e.clientX
  isDragging.value = true
  isSwipping.value = false
}

const handleMouseMove = (e) => {
  if (!process.client || !isDragging.value) return
  
  const currentX = e.clientX
  const diffX = currentX - startX.value
  
  // Only trigger swipe if moved more than 10px
  if (Math.abs(diffX) > 10) {
    isSwipping.value = true
    
    // Only allow left swipe (negative values)
    if (diffX <= 0) {
      swipeOffset.value = Math.max(diffX, -120)
    }
  }
}

const handleMouseUp = () => {
  isDragging.value = false
  isSwipping.value = false
  
  // Snap to position
  if (swipeOffset.value < -50) {
    swipeOffset.value = -120
  } else {
    swipeOffset.value = 0
  }
}

const handleClick = () => {
  console.log('ChatItem clicked:', props.chat.name, 'swipeOffset:', swipeOffset.value, 'isSwipping:', isSwipping.value)
  
  // Only check swipe state in client-side
  if (process.client && swipeOffset.value !== 0) {
    // Reset swipe if actions are visible
    swipeOffset.value = 0
    return
  }
  
  // Always emit click, regardless of swipe state
  emit('click', props.chat)
}

const handleDelete = () => {
  swipeOffset.value = 0
  emit('delete', props.chat.id)
}

const handleReport = () => {
  swipeOffset.value = 0
  emit('report', props.chat)
}
</script>

<style scoped>
.chat-item-container {
  position: relative;
  margin-bottom: 0.5rem;
  overflow: hidden;
  border-radius: 16px;
}

.chat-item {
  display: flex;
  align-items: center;
  padding: 1rem;
  cursor: pointer;
  transition: transform 0.3s ease, background-color 0.3s ease;
  position: relative;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  user-select: none;
}

.chat-item.swiping {
  transition: none;
}

.chat-item:hover {
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.chat-item.unread {
  background: rgba(95, 111, 85, 0.08);
  border-color: rgba(95, 111, 85, 0.2);
}

.chat-content {
  flex: 1;
  min-width: 0;
  margin-left: 0.75rem;
}

.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.chat-name {
  color: #1e293b;
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.chat-item.unread .chat-name {
  font-weight: 700;
  color: #5F6F55;
}

.chat-time {
  color: #64748b;
  font-size: 0.75rem;
  font-weight: 500;
  flex-shrink: 0;
  margin-left: 0.75rem;
}

.chat-item.unread .chat-time {
  color: #5F6F55;
  font-weight: 600;
}

.chat-message {
  color: #64748b;
  font-size: 0.875rem;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 500;
}

.chat-item.unread .chat-message {
  color: #475569;
  font-weight: 600;
}

.unread-badge {
  background: linear-gradient(135deg, #5F6F55, #4a5c44);
  color: white;
  font-size: 0.75rem;
  font-weight: 700;
  min-width: 20px;
  height: 20px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 0.75rem;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(95, 111, 85, 0.3);
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

/* Swipe Actions */
.swipe-actions {
  position: absolute;
  top: 0;
  right: -120px;
  bottom: 0;
  width: 120px;
  display: flex;
  background: transparent;
  transition: all 0.3s ease;
}

.swipe-actions.visible {
  right: 0;
}

.action-btn {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.5rem;
}

.action-btn svg {
  width: 20px;
  height: 20px;
}

.report-btn {
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: white;
}

.report-btn:hover {
  background: linear-gradient(135deg, #d97706, #b45309);
  transform: scale(1.05);
}

.delete-btn {
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: white;
}

.delete-btn:hover {
  background: linear-gradient(135deg, #dc2626, #b91c1c);
  transform: scale(1.05);
}

.action-btn:active {
  transform: scale(0.95);
}

/* Responsive adjustments */
@media (max-width: 480px) {
  .chat-item {
    padding: 0.875rem;
  }
  
  .action-btn {
    font-size: 0.7rem;
    padding: 0.375rem;
  }
  
  .action-btn svg {
    width: 18px;
    height: 18px;
  }
}
</style>