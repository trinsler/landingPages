<template>
  <div class="conversation-container">
    <!-- Chat Header -->
    <div class="conversation-header">
      <button @click="$emit('back')" class="header-back-btn">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
      </button>
      
      <ChatAvatar :name="chat.name" :type="chat.avatar" class="header-avatar" />
      
      <div class="header-info">
        <h2 class="header-name">{{ chat.name }}</h2>
        <p class="header-status">Online</p>
      </div>
      
      <div class="header-actions">
        <button class="header-action-btn">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Messages Area -->
    <div class="messages-container" ref="messagesContainer">
      <div class="messages-list">
        <div 
          v-for="message in messages" 
          :key="message.id"
          class="message-wrapper"
          :class="{ 'sent': message.isSent, 'received': !message.isSent }"
        >
          <div class="message-bubble" :class="{ unread: !message.isRead && !message.isSent }">
            <p class="message-text">{{ message.text }}</p>
            <span class="message-time">{{ formatMessageTime(message.timestamp) }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Message Input -->
    <div class="message-input-container">
      <button class="input-action-btn">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
        </svg>
      </button>
      
      <div class="input-wrapper">
        <textarea
          v-model="messageText"
          @keydown.enter.prevent="sendMessage"
          class="message-input"
          placeholder="Nachricht eingeben..."
          rows="1"
        ></textarea>
        <button 
          @click="sendMessage"
          :disabled="!messageText.trim()"
          class="send-btn"
        >
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18zm-1 0l3.12-8.75"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import ChatAvatar from './ChatAvatar.vue'

const props = defineProps({
  chat: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['back'])

const router = useRouter()
const messageText = ref('')
const messagesContainer = ref(null)

// Mock messages for the conversation
const messages = ref([
  {
    id: 1,
    text: 'Hallo! Ich brauche Hilfe beim Einkaufen. Können Sie mir helfen?',
    isSent: false,
    timestamp: new Date(Date.now() - 30 * 60000),
    isRead: true
  },
  {
    id: 2,
    text: 'Hallo Maria! Ja, natürlich helfe ich dir gerne beim Einkaufen. Was genau brauchst du?',
    isSent: true,
    timestamp: new Date(Date.now() - 25 * 60000),
    isRead: true
  },
  {
    id: 3,
    text: 'Super! Ich brauche nur ein paar Dinge vom Supermarkt. Milch, Brot und etwas Gemüse. Nicht viel!',
    isSent: false,
    timestamp: new Date(Date.now() - 20 * 60000),
    isRead: true
  },
  {
    id: 4,
    text: 'Perfekt! Wann soll ich los?',
    isSent: true,
    timestamp: new Date(Date.now() - 15 * 60000),
    isRead: true
  },
  {
    id: 5,
    text: 'Vielen Dank für deine Hilfe! Das war wirklich super 🙏',
    isSent: false,
    timestamp: new Date(Date.now() - 5 * 60000),
    isRead: true
  }
])

const formatMessageTime = (timestamp) => {
  const now = new Date()
  const messageDate = new Date(timestamp)
  const diffMs = now - messageDate
  const diffMinutes = Math.floor(diffMs / 60000)
  
  if (diffMinutes < 1) return 'gerade'
  if (diffMinutes < 60) return `vor ${diffMinutes} Min.`
  
  return messageDate.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })
}

const sendMessage = () => {
  if (!messageText.value.trim()) return
  
  const newMessage = {
    id: messages.value.length + 1,
    text: messageText.value.trim(),
    isSent: true,
    timestamp: new Date(),
    isRead: false
  }
  
  messages.value.push(newMessage)
  messageText.value = ''
  
  // Scroll to bottom
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
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
  display: flex;
  flex-direction: column;
  height: calc(100vh - 160px);
  background: #e5ddd5;
  position: relative;
}

/* Conversation Header */
.conversation-header {
  background: linear-gradient(135deg, #5F6F55 0%, #4a5c44 100%);
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-height: 60px;
  position: sticky;
  top: 0;
  z-index: 10;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.header-back-btn {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  border: none;
  padding: 0.5rem;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  backdrop-filter: blur(10px);
}

.header-back-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.header-back-btn svg {
  width: 20px;
  height: 20px;
}

.header-avatar {
  width: 40px;
  height: 40px;
  flex-shrink: 0;
}

.header-info {
  flex: 1;
  min-width: 0;
}

.header-name {
  color: white;
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0;
  line-height: 1.2;
}

.header-status {
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.75rem;
  margin: 0;
}

.header-actions {
  display: flex;
  gap: 0.5rem;
}

.header-action-btn {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  border: none;
  padding: 0.5rem;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  backdrop-filter: blur(10px);
}

.header-action-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.header-action-btn svg {
  width: 20px;
  height: 20px;
}

/* Messages Container */
.messages-container {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  scroll-behavior: smooth;
}

.messages-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-height: 100%;
}

/* Message Bubbles */
.message-wrapper {
  display: flex;
  width: 100%;
}

.message-wrapper.sent {
  justify-content: flex-end;
}

.message-wrapper.received {
  justify-content: flex-start;
}

.message-bubble {
  max-width: 70%;
  padding: 0.75rem 1rem;
  border-radius: 18px;
  position: relative;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.message-wrapper.sent .message-bubble {
  background: #dcf8c6;
  color: #303030;
  border-top-right-radius: 4px;
}

.message-wrapper.received .message-bubble {
  background: white;
  color: #303030;
  border-top-left-radius: 4px;
}

.message-bubble.unread {
  background: #fff;
  border-left: 3px solid #5F6F55;
}

.message-text {
  margin: 0 0 0.25rem 0;
  font-size: 0.9375rem;
  line-height: 1.4;
  word-wrap: break-word;
}

.message-time {
  font-size: 0.75rem;
  color: #667781;
  opacity: 0.8;
  display: block;
  text-align: right;
  margin-top: 0.25rem;
}

/* Message Input */
.message-input-container {
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(20px);
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding: 0.75rem 1rem;
  display: flex;
  align-items: flex-end;
  gap: 0.5rem;
  min-height: 60px;
}

.input-action-btn {
  background: transparent;
  border: none;
  color: #5F6F55;
  padding: 0.5rem;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.input-action-btn:hover {
  background: rgba(95, 111, 85, 0.1);
}

.input-action-btn svg {
  width: 20px;
  height: 20px;
}

.input-wrapper {
  flex: 1;
  display: flex;
  align-items: flex-end;
  background: #f0f2f5;
  border-radius: 25px;
  padding: 0.5rem 0.75rem;
  gap: 0.5rem;
  min-height: 40px;
}

.message-input {
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
  resize: none;
  font-size: 1rem;
  color: #303030;
  font-family: inherit;
  line-height: 1.4;
  max-height: 100px;
}

.message-input::placeholder {
  color: #8996a0;
}

.send-btn {
  background: #5F6F55;
  border: none;
  color: white;
  border-radius: 50%;
  padding: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  min-width: 40px;
  height: 40px;
}

.send-btn:hover:not(:disabled) {
  background: #4a5c44;
  transform: scale(1.05);
}

.send-btn:disabled {
  background: #cbd5e1;
  cursor: not-allowed;
  transform: scale(1);
}

.send-btn svg {
  width: 18px;
  height: 18px;
}

/* Responsive */
@media (max-width: 768px) {
  .conversation-container {
    height: calc(100vh - 140px);
  }
  
  .conversation-header {
    padding: 0.5rem 0.75rem;
    min-height: 56px;
  }
  
  .header-name {
    font-size: 1rem;
  }
  
  .message-bubble {
    max-width: 80%;
  }
  
  .message-text {
    font-size: 0.875rem;
  }
  
  .message-input-container {
    padding: 0.5rem 0.75rem;
    min-height: 56px;
  }
  
  .send-btn {
    min-width: 36px;
    height: 36px;
  }
}

@media (max-width: 374px) {
  .message-bubble {
    max-width: 85%;
  }
  
  .message-text {
    font-size: 0.8125rem;
  }
  
  .header-back-btn,
  .header-action-btn {
    padding: 0.375rem;
  }
  
  .header-back-btn svg,
  .header-action-btn svg {
    width: 18px;
    height: 18px;
  }
}
</style>