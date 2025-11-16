<template>
  <div class="chat-list">
    <!-- Search Results -->
    <div v-if="showSearch && searchResults.length > 0" class="search-results">
      <ChatItem
        v-for="result in searchResults"
        :key="result.id"
        :chat="result"
        @click="openConversation"
        @delete="deleteChat"
        @report="reportChat"
      />
    </div>

    <!-- Regular Chats -->
    <div v-else>
      <ChatItem
        v-for="chat in filteredChats"
        :key="chat.id"
        :chat="chat"
        @click="openConversation"
        @delete="deleteChat"
        @report="reportChat"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import ChatItem from './ChatItem.vue'

const props = defineProps({
  allChats: Array,
  showSearch: Boolean,
  searchQuery: String
})

const emit = defineEmits(['open-conversation', 'delete-chat', 'report-chat'])

const searchResults = computed(() => {
  if (!props.searchQuery?.trim()) return []
  
  const query = props.searchQuery.toLowerCase()
  
  return props.allChats.filter(chat => 
    chat.name.toLowerCase().includes(query) ||
    chat.lastMessage.toLowerCase().includes(query)
  )
})

const filteredChats = computed(() => {
  if (!props.showSearch || !props.searchQuery?.trim()) {
    return props.allChats
  }
  return searchResults.value
})

const openConversation = (chat) => {
  console.log('ChatList openConversation called with:', chat)
  emit('open-conversation', chat)
}
const deleteChat = (chatId) => emit('delete-chat', chatId)
const reportChat = (chat) => emit('report-chat', chat)
</script>

<style scoped>
.chat-list {
  padding: 1rem;
  height: calc(100vh - 180px);
  overflow-y: auto;
  position: relative;
  z-index: 1;
}

.search-results {
  margin-top: 0.5rem;
}
</style>