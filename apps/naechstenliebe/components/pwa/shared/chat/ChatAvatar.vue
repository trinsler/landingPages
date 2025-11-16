<template>
  <div class="chat-avatar">
    <div class="avatar-icon" :style="{ background: avatarColor }">
      <svg fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
      </svg>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  name: String,
  type: {
    type: String,
    default: 'user'
  }
})

const avatarColor = computed(() => {
  // Use app colors only - hash name for consistent color
  const hash = props.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  const colors = [
    '#5F6F55', // Main green
    '#BECDA3', // Light green
    '#8F9B82', // Medium green
    '#4a5c44', // Dark green
    '#6b7d60', // Sage green
  ]
  return colors[hash % colors.length]
})
</script>

<style scoped>
.chat-avatar {
  position: relative;
  width: 48px;
  height: 48px;
  margin-right: 1rem;
  flex-shrink: 0;
}

.avatar-icon {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid rgba(255, 255, 255, 0.8);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  color: white;
}

.avatar-icon svg {
  width: 24px;
  height: 24px;
}
</style>