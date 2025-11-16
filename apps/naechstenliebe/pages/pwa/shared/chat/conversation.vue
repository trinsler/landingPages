<template>
  <div class="conversation-container">
    <!-- Chat Header -->
    <div class="chat-header">
      <div class="header-content">
        <button @click="goBack" class="back-btn">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
        </button>
        
        <div class="chat-info">
          <div class="avatar-container">
            <div class="avatar">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
            </div>
            <div v-if="isOnline" class="online-indicator"></div>
          </div>
          <div class="user-info">
            <h2 class="user-name">{{ chatName }}</h2>
            <span class="user-status">{{ isOnline ? 'Online' : 'Zuletzt online vor 5 Min.' }}</span>
          </div>
        </div>
        
        <button @click="showOptions = !showOptions" class="options-btn">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Options Dropdown -->
    <div v-if="showOptions" class="options-dropdown">
      <button @click="reportUser" class="option-item danger">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"/>
        </svg>
        Nutzer melden
      </button>
      <button @click="blockUser" class="option-item danger">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364L18.364 5.636"/>
        </svg>
        Nutzer blockieren
      </button>
    </div>

    <!-- Messages Area -->
    <div class="messages-container" ref="messagesContainer">
      <div class="messages-list">
        <div 
          v-for="message in messages" 
          :key="message.id"
          class="message-wrapper"
          :class="{ 'own-message': message.isOwn }"
        >
          <div class="message-bubble" :class="{ 'own': message.isOwn }">
            <p class="message-text">{{ message.text }}</p>
            <span class="message-time">{{ formatTime(message.timestamp) }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Input Area -->
    <div class="input-container">
      <div class="input-wrapper">
        <button class="attachment-btn" @click="showAttachments = !showAttachments">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"/>
          </svg>
        </button>
        
        <input 
          v-model="newMessage"
          @keyup.enter="sendMessage"
          type="text" 
          placeholder="Nachricht schreiben..."
          class="message-input"
        />
        
        <button 
          @click="sendMessage"
          :disabled="!newMessage.trim()"
          class="send-btn"
          :class="{ active: newMessage.trim() }"
        >
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'

definePageMeta({
  layout: false
})

const route = useRoute()
const router = useRouter()

const chatId = route.query.id
const chatName = route.query.name || 'Unbekannt'
const chatAvatar = route.query.avatar

const newMessage = ref('')
const showOptions = ref(false)
const showAttachments = ref(false)
const isOnline = ref(Math.random() > 0.5) // Random online status for demo
const messagesContainer = ref(null)

// Demo messages for the conversation
const messages = ref([
  {
    id: 1,
    text: 'Hallo! Ich hätte Interesse an dem Einkaufsauftrag.',
    timestamp: new Date(Date.now() - 120 * 60000),
    isOwn: false
  },
  {
    id: 2,
    text: 'Hallo! Das ist super. Wann könnten Sie denn?',
    timestamp: new Date(Date.now() - 115 * 60000),
    isOwn: true
  },
  {
    id: 3,
    text: 'Ich könnte heute Nachmittag um 15:00 Uhr. Passt das?',
    timestamp: new Date(Date.now() - 110 * 60000),
    isOwn: false
  },
  {
    id: 4,
    text: 'Ja, das passt perfekt! Ich schicke Ihnen gleich die Einkaufsliste.',
    timestamp: new Date(Date.now() - 105 * 60000),
    isOwn: true
  },
  {
    id: 5,
    text: 'Vielen Dank für deine Hilfe! Das war wirklich super 🙏',
    timestamp: new Date(Date.now() - 5 * 60000),
    isOwn: false
  }
])

const goBack = () => {
  router.push('/pwa/shared/chat')
}

const sendMessage = () => {
  if (!newMessage.value.trim()) return
  
  const message = {
    id: Date.now(),
    text: newMessage.value,
    timestamp: new Date(),
    isOwn: true
  }
  
  messages.value.push(message)
  newMessage.value = ''
  
  // Scroll to bottom
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
}

const reportUser = () => {
  showOptions.value = false
  if (confirm(`Möchten Sie ${chatName} wegen unangemessenen Verhaltens melden?`)) {
    alert(`${chatName} wurde erfolgreich gemeldet. Unser Team wird den Fall prüfen.`)
    router.push('/pwa/shared/chat')
  }
}

const blockUser = () => {
  showOptions.value = false
  if (confirm(`Möchten Sie ${chatName} blockieren? Sie können dann keine Nachrichten mehr austauschen.`)) {
    alert(`${chatName} wurde blockiert.`)
    router.push('/pwa/shared/chat')
  }
}

const formatTime = (timestamp) => {
  const messageDate = new Date(timestamp)
  return messageDate.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })
}

onMounted(() => {
  // Scroll to bottom on mount
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
})
</script>

<style scoped>
.conversation-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  display: flex;
  flex-direction: column;
  position: relative;
}

.conversation-container::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 80%, rgba(95, 111, 85, 0.03) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(190, 205, 163, 0.04) 0%, transparent 50%),
    radial-gradient(circle at 40% 40%, rgba(143, 139, 130, 0.02) 0%, transparent 50%);
  pointer-events: none;
  z-index: 0;
}

/* Chat Header */
.chat-header {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 10;
}

.header-content {
  display: flex;
  align-items: center;
  padding: 1rem 1.5rem;
  gap: 1rem;
}

.back-btn, .options-btn {
  background: transparent;
  border: none;
  padding: 0.5rem;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  touch-action: manipulation;
}

.back-btn:hover, .options-btn:hover {
  background: rgba(0, 0, 0, 0.05);
}

.back-btn svg, .options-btn svg {
  width: 24px;
  height: 24px;
  color: #374151;
}

.chat-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: 1;
}

.avatar-container {
  position: relative;
}

.avatar {
  width: 3rem;
  height: 3rem;
  background: #BECDA3;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid rgba(95, 111, 85, 0.1);
}

.avatar svg {
  width: 1.5rem;
  height: 1.5rem;
  color: #5F6F55;
}

.online-indicator {
  position: absolute;
  bottom: 0.125rem;
  right: 0.125rem;
  width: 0.875rem;
  height: 0.875rem;
  background: #22c55e;
  border: 2px solid white;
  border-radius: 50%;
}

.user-info {
  flex: 1;
  min-width: 0;
}

.user-name {
  color: #1e293b;
  font-size: 1.125rem;
  font-weight: 700;
  margin: 0 0 0.125rem 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-status {
  color: #64748b;
  font-size: 0.875rem;
  font-weight: 500;
}

/* Options Dropdown */
.options-dropdown {
  position: absolute;
  top: 100%;
  right: 1rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(0, 0, 0, 0.1);
  overflow: hidden;
  z-index: 20;
}

.option-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1rem;
  width: 100%;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
  font-size: 0.875rem;
  font-weight: 500;
  white-space: nowrap;
}

.option-item:hover {
  background: rgba(0, 0, 0, 0.05);
}

.option-item.danger {
  color: #ef4444;
}

.option-item.danger:hover {
  background: rgba(239, 68, 68, 0.05);
}

.option-item svg {
  width: 18px;
  height: 18px;
}

/* Messages Area */
.messages-container {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  position: relative;
  z-index: 1;
}

.messages-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-width: 100%;
}

.message-wrapper {
  display: flex;
  max-width: 80%;
}

.message-wrapper.own-message {
  align-self: flex-end;
  justify-content: flex-end;
}

.message-bubble {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 18px 18px 18px 4px;
  padding: 0.875rem 1rem;
  max-width: 100%;
  word-wrap: break-word;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.message-bubble.own {
  background: linear-gradient(135deg, #5F6F55, #4a5c44);
  color: white;
  border-radius: 18px 18px 4px 18px;
  border-color: rgba(95, 111, 85, 0.3);
}

.message-text {
  margin: 0 0 0.25rem 0;
  font-size: 0.95rem;
  line-height: 1.4;
  word-break: break-word;
}

.message-time {
  font-size: 0.75rem;
  opacity: 0.7;
  font-weight: 500;
}

.message-bubble.own .message-time {
  color: rgba(255, 255, 255, 0.8);
}

/* Input Area */
.input-container {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding: 1rem 1.5rem;
  position: sticky;
  bottom: 0;
  z-index: 10;
}

.input-wrapper {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: rgba(248, 250, 252, 0.8);
  border-radius: 24px;
  padding: 0.5rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.attachment-btn {
  background: transparent;
  border: none;
  padding: 0.5rem;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  touch-action: manipulation;
}

.attachment-btn:hover {
  background: rgba(0, 0, 0, 0.05);
}

.attachment-btn svg {
  width: 20px;
  height: 20px;
  color: #64748b;
}

.message-input {
  flex: 1;
  background: transparent;
  border: none;
  padding: 0.75rem 0.5rem;
  font-size: 1rem;
  outline: none;
  color: #1e293b;
}

.message-input::placeholder {
  color: #94a3b8;
}

.send-btn {
  background: #e2e8f0;
  border: none;
  padding: 0.75rem;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  touch-action: manipulation;
}

.send-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.send-btn.active {
  background: linear-gradient(135deg, #5F6F55, #4a5c44);
  color: white;
}

.send-btn:not(:disabled):hover {
  transform: scale(1.05);
}

.send-btn svg {
  width: 20px;
  height: 20px;
  color: #64748b;
}

.send-btn.active svg {
  color: white;
}

/* Responsive Design */
@media (max-width: 480px) {
  .header-content {
    padding: 0.875rem 1rem;
    gap: 0.75rem;
  }
  
  .user-name {
    font-size: 1rem;
  }
  
  .avatar {
    width: 2.5rem;
    height: 2.5rem;
  }
  
  .avatar svg {
    width: 1.25rem;
    height: 1.25rem;
  }
  
  .messages-container {
    padding: 0.75rem;
  }
  
  .message-wrapper {
    max-width: 85%;
  }
  
  .input-container {
    padding: 0.875rem 1rem;
  }
}
</style>