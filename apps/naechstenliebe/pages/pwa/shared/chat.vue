<template>
  <div class="chat-container">
    <!-- Chat Header with Search -->
    <div class="chat-header">
      <div class="header-content">
        <button @click="goBack" class="back-btn">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
        </button>
        <h1 class="header-title">Nachrichten</h1>
        <button @click="toggleSearch" class="search-btn">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Search Bar -->
    <SearchBar 
      v-if="showSearch"
      :query="searchQuery"
      @update:query="searchQuery = $event"
      @close="showSearch = false"
    />

    <!-- Chat List -->
    <ChatList
      :all-chats="allChats"
      :show-search="showSearch"
      :search-query="searchQuery"
      @open-conversation="openConversation"
      @delete-chat="deleteChat"
      @report-chat="reportChat"
    />

    <!-- Global Minimal Footer -->
    <MinimalFooter 
      active-tab="chat"
      current-role="unified"
      @navigate="handleFooterNavigation"
    />

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import AppHeader from '~/components/AppHeader.vue'
import MinimalFooter from '~/components/pwa/unified/MinimalFooter.vue'
import ChatList from '~/components/pwa/shared/chat/ChatList.vue'
import SearchBar from '~/components/pwa/shared/chat/SearchBar.vue'
import { allChatsData } from '~/components/pwa/shared/chat/chatData.js'

definePageMeta({
  layout: false
})

const router = useRouter()
const showSearch = ref(false)
const searchQuery = ref('')

const allChats = ref(allChatsData)

const goBack = () => router.push('/pwa')
const toggleSearch = () => {
  showSearch.value = !showSearch.value
  if (!showSearch.value) {
    searchQuery.value = ''
  }
}

const openConversation = (chat) => {
  console.log('Main chat openConversation called with:', chat)
  
  if (chat.unreadCount > 0) {
    chat.unreadCount = 0
  }
  
  console.log('Navigating to conversation with query:', {
    id: chat.id,
    name: chat.name,
    avatar: chat.avatar
  })
  
  router.push({
    path: '/pwa/shared/chat/conversation',
    query: {
      id: chat.id,
      name: chat.name,
      avatar: chat.avatar
    }
  })
}

const deleteChat = (chatId) => {
  if (confirm('Möchten Sie diese Unterhaltung wirklich löschen?')) {
    const index = allChats.value.findIndex(chat => chat.id === chatId)
    if (index > -1) {
      allChats.value.splice(index, 1)
    }
  }
}

const reportChat = (chat) => {
  if (confirm(`Möchten Sie ${chat.name} wegen unangemessenen Verhaltens melden?`)) {
    // Here you would typically send a report to your backend
    alert(`${chat.name} wurde erfolgreich gemeldet. Unser Team wird den Fall prüfen.`)
    // Optionally remove the chat after reporting
    deleteChat(chat.id)
  }
}


const handleFooterNavigation = (tab) => {
  const routes = {
    dashboard: '/pwa',
    'helper-tasks': '/pwa',
    'seeker-history': '/pwa/jobs/my-jobs',
    'seeker-create': '/pwa/jobs/create/category',
    chat: '/pwa/shared/chat',
    'seeker-favorites': '/pwa/seeker/favorites',
    'profile-reviews': '/pwa/profile/my-reviews',
    'profile-badges': '/pwa/profile/badges',
    'settings-payments': '/pwa/shared/payment-methods',
    profile: '/pwa/shared/profile'
  }
  
  if (routes[tab]) router.push(routes[tab])
}

onMounted(() => console.log('Chat page mounted'))
</script>

<style scoped>
.chat-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  position: relative;
  overflow-x: hidden;
}

/* Chat Header */
.chat-header {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 50;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  max-width: 100%;
}

.back-btn, .search-btn {
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

.back-btn:hover, .search-btn:hover {
  background: rgba(0, 0, 0, 0.05);
}

.back-btn svg, .search-btn svg {
  width: 24px;
  height: 24px;
  color: #374151;
}

.header-title {
  color: #1e293b;
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0;
  flex: 1;
  text-align: center;
}

.chat-container::before {
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

.new-chat-btn {
  position: fixed;
  bottom: 6.5rem;
  right: 1.5rem;
  width: 3.75rem;
  height: 3.75rem;
  background: linear-gradient(135deg, #5F6F55, #4a5c44);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  color: white;
  cursor: pointer;
  box-shadow: 0 8px 24px rgba(95, 111, 85, 0.3);
  transition: all 0.3s ease;
  z-index: 50;
  backdrop-filter: blur(20px);
}

.new-chat-btn:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 12px 32px rgba(95, 111, 85, 0.4);
}

.new-chat-btn svg {
  width: 20px;
  height: 20px;
}

@media (max-width: 768px) {
  .new-chat-btn {
    bottom: 6rem;
    right: 1rem;
    width: 3.5rem;
    height: 3.5rem;
  }
}

@media (max-width: 479px) {
  .new-chat-btn {
    bottom: 5.75rem;
    right: 0.75rem;
    width: 3.25rem;
    height: 3.25rem;
  }
}

@media (max-width: 374px) {
  .new-chat-btn {
    bottom: 5.5rem;
    width: 3rem;
    height: 3rem;
  }
}
</style>