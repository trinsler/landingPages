<template>
  <header class="modern-header">
    <div class="header-content">
      <!-- Back Button (when applicable) -->
      <button v-if="showBack" @click="$emit('back')" class="header-btn back-btn">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
      </button>

      <!-- Title Section -->
      <div class="title-section">
        <h1 class="page-title">{{ title }}</h1>
        <div v-if="subtitle" class="page-subtitle">{{ subtitle }}</div>
      </div>
      
      <!-- Header Actions -->
      <div class="header-actions">
        <!-- Notification Bell -->
        <button v-if="showNotifications" @click="$emit('notifications')" class="header-btn notification-btn">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5-5V9a5 5 0 00-10 0v3l-5 5h5m0 0v1a3 3 0 006 0v-1"/>
          </svg>
          <div v-if="notificationCount > 0" class="notification-badge">{{ notificationCount }}</div>
        </button>

        <!-- Profile Button -->
        <button @click="$emit('open-profile')" class="header-btn profile-btn">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
          </svg>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: 'Dashboard'
  },
  subtitle: {
    type: String,
    default: null
  },
  showBack: {
    type: Boolean,
    default: false
  },
  showNotifications: {
    type: Boolean,
    default: true
  },
  notificationCount: {
    type: Number,
    default: 0
  }
})

defineEmits(['back', 'notifications', 'open-profile'])
</script>

<style scoped>
/* Modern Mobile-First Header */
.modern-header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.25rem;
  min-height: 56px;
  width: 100%;
  max-width: 100vw;
  box-sizing: border-box;
}

/* Title Section */
.title-section {
  flex: 1;
  text-align: center;
}

.page-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
  line-height: 1.4;
}

.page-subtitle {
  font-size: 0.75rem;
  color: #6b7280;
  margin-top: 0.125rem;
}

/* Header Buttons */
.header-btn {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  border-radius: 12px;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

.header-btn:hover {
  background: rgba(0, 0, 0, 0.05);
  color: #1f2937;
}

.header-btn:active {
  transform: scale(0.96);
}

.header-btn svg {
  width: 20px;
  height: 20px;
}

/* Back Button */
.back-btn {
  margin-right: 0.5rem;
}

/* Header Actions */
.header-actions {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

/* Notification Badge */
.notification-badge {
  position: absolute;
  top: 8px;
  right: 8px;
  background: #ef4444;
  color: white;
  font-size: 0.625rem;
  font-weight: 600;
  padding: 0.125rem 0.25rem;
  border-radius: 10px;
  min-width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
}

/* Responsive Adjustments */
@media (min-width: 768px) {
  .header-content {
    padding: 1rem 2rem;
  }
  
  .page-title {
    font-size: 1.25rem;
  }
}

@media (max-width: 374px) {
  .header-content {
    padding: 0.875rem 1rem;
  }
  
  .page-title {
    font-size: 1rem;
  }
  
  .header-btn {
    width: 40px;
    height: 40px;
  }
}
</style>