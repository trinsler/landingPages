<template>
  <div class="history-group">
    <h4 class="group-title">{{ group.title }}</h4>
    
    <div class="tasks-container">
      <div 
        v-for="task in group.tasks" 
        :key="task.id"
        class="task-card"
        :class="{ highlighted: task.highlighted }"
        @click="$emit('view-details', task.id)"
      >
        <div class="task-header">
          <div class="task-icon">
            <svg class="icon-img" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path v-if="task.icon === 'shopping'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5L17 18"/>
              <circle v-if="task.icon === 'shopping'" cx="9" cy="20" r="1"/>
              <circle v-if="task.icon === 'shopping'" cx="20" cy="20" r="1"/>
              <path v-if="task.icon === 'cooking'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
              <path v-if="task.icon === 'cooking'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 2v1m6-1v1"/>
              <path v-if="task.icon === 'tech'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM21 17a2 2 0 11-4 0 2 2 0 014 0z"/>
              <path v-if="task.icon === 'tech'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17h10M7 17H3m4 0v-5a1 1 0 011-1h9a1 1 0 011 1v5m0 0h4m-4 0H7m14 0v2a1 1 0 01-1 1h-1a1 1 0 01-1-1v-2M7 17v2a1 1 0 01-1 1H5a1 1 0 01-1-1v-2"/>
              <path v-if="task.icon === 'tech'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 6l6 6-6 6"/>
            </svg>
          </div>
          <div class="task-info">
            <h5 class="task-title">{{ task.title }}</h5>
            <p class="task-helper">von {{ task.helper }}</p>
          </div>
          <div class="task-status">
            <span class="status-badge" :class="getStatusClass(task.status)">
              {{ task.status }}
            </span>
          </div>
        </div>
        
        <div class="task-details">
          <p class="task-description">{{ task.description }}</p>
          <div class="task-meta">
            <span class="task-time">{{ task.time }}</span>
            <span class="task-price">{{ task.price }}€</span>
          </div>
          <div v-if="task.rating" class="task-rating">
            <span class="rating-stars">{{ task.rating }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  group: {
    type: Object,
    required: true
  }
})

defineEmits(['view-details'])

const getStatusClass = (status) => {
  switch(status.toLowerCase()) {
    case 'erledigt': return 'status-completed'
    case 'in bearbeitung': return 'status-in-progress'
    case 'ausstehend': return 'status-pending'
    default: return 'status-default'
  }
}
</script>

<style scoped>
/* Mobile First Design */
.history-group {
  margin-bottom: 1.5rem;
}

.group-title {
  color: #474747;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
  padding-left: 0.5rem;
  line-height: 1.3;
}

.tasks-container {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.task-card {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.task-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0,0,0,0.15);
  border-color: rgba(95, 111, 85, 0.2);
}

.task-card.highlighted {
  border-color: #5F6F55;
  background: rgba(95, 111, 85, 0.02);
}

.task-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.task-icon {
  width: 3rem;
  height: 3rem;
  background: #BECDA3;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.icon-img {
  width: 1.5rem;
  height: 1.5rem;
  color: #5F6F55;
}

.task-info {
  flex: 1;
  min-width: 0;
}

.task-title {
  color: #474747;
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 0.25rem 0;
  line-height: 1.3;
}

.task-helper {
  color: #8F8B82;
  margin: 0;
  font-size: 0.875rem;
  line-height: 1.4;
}

.task-status {
  flex-shrink: 0;
}

.status-badge {
  padding: 0.5rem 0.875rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.status-completed {
  background: rgba(34, 197, 94, 0.1);
  color: #22c55e;
  border: 1px solid rgba(34, 197, 94, 0.2);
}

.status-in-progress {
  background: rgba(249, 115, 22, 0.1);
  color: #f97316;
  border: 1px solid rgba(249, 115, 22, 0.2);
}

.status-pending {
  background: rgba(107, 114, 128, 0.1);
  color: #6b7280;
  border: 1px solid rgba(107, 114, 128, 0.2);
}

.task-details {
  margin-top: 1rem;
}

.task-description {
  color: #6b7280;
  margin: 0 0 1rem 0;
  font-size: 0.875rem;
  line-height: 1.5;
}

.task-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.task-time {
  color: #8F8B82;
  font-size: 0.75rem;
  font-weight: 500;
}

.task-price {
  color: #5F6F55;
  font-size: 1rem;
  font-weight: 600;
  background: rgba(95, 111, 85, 0.1);
  padding: 0.25rem 0.5rem;
  border-radius: 8px;
}

.task-rating {
  text-align: center;
}

.rating-stars {
  color: #fbbf24;
  font-size: 1rem;
}

/* Tablet and Desktop */
@media (min-width: 768px) {
  .group-title {
    font-size: 1rem;
  }
  
  .tasks-container {
    gap: 1rem;
  }
  
  .task-card {
    padding: 1.5rem;
  }
  
  .task-icon {
    width: 2.5rem;
    height: 2.5rem;
  }
  
  .icon-img {
    width: 1.25rem;
    height: 1.25rem;
  }
  
  .task-title {
    font-size: 1rem;
  }
  
  .task-helper {
    font-size: 0.75rem;
  }
  
  .task-description {
    font-size: 0.75rem;
  }
  
  .task-price {
    font-size: 0.875rem;
  }
}
</style>