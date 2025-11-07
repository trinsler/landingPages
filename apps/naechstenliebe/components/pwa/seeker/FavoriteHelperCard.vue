<template>
  <div class="helper-card">
    <div class="helper-header">
      <div class="helper-avatar">
        <svg class="avatar-img" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
        </svg>
      </div>
      <div class="helper-info">
        <h3 class="helper-name">{{ helper.name }}</h3>
        <div class="rating-info">
          <span class="rating">{{ helper.rating }}</span>
          <span class="review-count">({{ helper.reviewCount }})</span>
        </div>
        <p class="helper-details">{{ helper.distance }} • {{ helper.specialties }}</p>
      </div>
      <button 
        @click="$emit('toggle-favorite', helper.id)"
        class="favorite-btn"
      >♥</button>
    </div>

    <!-- Letzte Aufträge -->
    <div class="recent-tasks">
      <h4 class="tasks-title">Letzte Aufträge:</h4>
      <div class="tasks-list">
        <span 
          v-for="task in helper.recentTasks" 
          :key="task.id"
          class="task-tag"
        >
          {{ task.description }} ({{ task.price }}€)
        </span>
      </div>
    </div>

    <!-- Aktions-Buttons -->
    <div class="action-buttons">
      <button 
        @click="$emit('hire-directly', helper.id)"
        class="hire-btn"
      >
        Direkt beauftragen
      </button>
      <button 
        @click="$emit('open-chat', helper.id)"
        class="chat-btn"
      >
        <svg class="chat-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  helper: {
    type: Object,
    required: true
  }
})

defineEmits(['toggle-favorite', 'hire-directly', 'open-chat'])
</script>

<style scoped>
/* Mobile First Design */
.helper-card {
  background: white;
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
}

.helper-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0,0,0,0.15);
}

.helper-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.helper-avatar {
  width: 4rem;
  height: 4rem;
  background: #BECDA3;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.avatar-img {
  width: 2rem;
  height: 2rem;
  color: #5F6F55;
}

.helper-info {
  flex: 1;
  min-width: 0;
}

.helper-name {
  color: #474747;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  line-height: 1.3;
}

.rating-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.rating {
  color: #BECDA3;
  font-size: 1rem;
  font-weight: 500;
}

.review-count {
  color: #8F8B82;
  font-size: 0.875rem;
}

.helper-details {
  color: #8F8B82;
  margin: 0;
  font-size: 1rem;
  line-height: 1.4;
}

.favorite-btn {
  background: none;
  border: none;
  color: #ef4444;
  font-size: 2rem;
  cursor: pointer;
  flex-shrink: 0;
  transition: all 0.3s ease;
  padding: 0.5rem;
  border-radius: 50%;
  min-width: 3rem;
  min-height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.favorite-btn:hover {
  transform: scale(1.2);
  background: rgba(239, 68, 68, 0.1);
}

/* Recent Tasks */
.recent-tasks {
  margin-bottom: 1.5rem;
}

.tasks-title {
  color: #474747;
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.75rem 0;
  line-height: 1.4;
}

.tasks-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.task-tag {
  background: #f9fafb;
  color: #474747;
  padding: 0.5rem 0.875rem;
  border-radius: 20px;
  font-size: 0.875rem;
  border: 1px solid #e5e7eb;
  font-weight: 500;
  line-height: 1.3;
}

/* Action Buttons */
.action-buttons {
  display: flex;
  gap: 1rem;
}

.hire-btn {
  flex: 1;
  background: #5F6F55;
  color: white;
  padding: 1rem;
  border-radius: 16px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
  min-height: 3rem;
}

.hire-btn:hover {
  background: #4a5c44;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(95, 111, 85, 0.3);
}

.chat-btn {
  background: white;
  color: #474747;
  padding: 1rem;
  border-radius: 16px;
  border: 1px solid #e5e7eb;
  cursor: pointer;
  min-width: 3rem;
  min-height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.chat-btn:hover {
  border-color: #BECDA3;
  background: rgba(190, 205, 163, 0.1);
  transform: translateY(-1px);
}

.chat-icon {
  width: 1.5rem;
  height: 1.5rem;
}

/* Tablet and Desktop */
@media (min-width: 768px) {
  .helper-card {
    padding: 1.5rem;
  }
  
  .helper-avatar {
    width: 3.5rem;
    height: 3.5rem;
  }
  
  .avatar-img {
    width: 1.75rem;
    height: 1.75rem;
  }
  
  .helper-name {
    font-size: 1.125rem;
  }
  
  .rating {
    font-size: 0.875rem;
  }
  
  .review-count {
    font-size: 0.75rem;
  }
  
  .helper-details {
    font-size: 0.875rem;
  }
  
  .favorite-btn {
    font-size: 1.5rem;
    min-width: 2.5rem;
    min-height: 2.5rem;
  }
  
  .tasks-title {
    font-size: 0.875rem;
  }
  
  .task-tag {
    padding: 0.25rem 0.75rem;
    font-size: 0.75rem;
  }
  
  .hire-btn {
    padding: 0.75rem;
    font-size: 0.875rem;
    min-height: auto;
  }
  
  .chat-btn {
    padding: 0.75rem;
    min-width: 2.5rem;
    min-height: auto;
  }
  
  .chat-icon {
    width: 1.2rem;
    height: 1.2rem;
  }
}
</style>