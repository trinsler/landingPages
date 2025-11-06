<template>
  <div class="seeker-tasks-view">
    <!-- Quick Actions Header -->
    <div class="quick-actions-header">
      <button 
        class="create-task-btn"
        @click="$emit('create-task')"
      >
        <svg class="action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
        </svg>
        <span>Neue Anfrage erstellen</span>
      </button>
    </div>

    <!-- Active Tasks Section -->
    <div class="tasks-section">
      <div class="section-header">
        <h3 class="section-title">Aktive Anfragen</h3>
        <span class="task-count">{{ seekerTasks.length }}</span>
      </div>

      <!-- Task List -->
      <div v-if="seekerTasks.length > 0" class="tasks-list">
        <div 
          v-for="task in seekerTasks"
          :key="task.id"
          class="task-item"
          @click="$emit('view-task', task.id)"
        >
          <div class="task-header">
            <div class="task-icon" :class="task.type">
              <svg v-if="task.type === 'shopping'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6 0a2 2 0 100-4 2 2 0 000 4zm-8-2a2 2 0 100-4 2 2 0 000 4z"/>
              </svg>
              <svg v-else fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
              </svg>
            </div>
            <div class="task-status-dot" :class="getStatusClass(task.status)"></div>
          </div>

          <div class="task-content">
            <h4 class="task-title">{{ task.title }}</h4>
            <div class="task-details">
              <span class="helper-name">{{ task.helper }}</span>
              <span class="task-distance">{{ task.distance }}</span>
            </div>
            <div class="task-status" :class="getStatusClass(task.status)">
              {{ task.status }}
            </div>
          </div>

          <div class="task-actions">
            <svg class="chevron-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="empty-state">
        <div class="empty-icon">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
          </svg>
        </div>
        <h4 class="empty-title">Keine aktiven Anfragen</h4>
        <p class="empty-text">Erstelle deine erste Anfrage um Hilfe zu erhalten.</p>
        <button 
          class="empty-action-btn"
          @click="$emit('create-task')"
        >
          Anfrage erstellen
        </button>
      </div>
    </div>

    <!-- Quick Stats -->
    <div class="quick-stats">
      <div class="stat-item">
        <div class="stat-icon">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
        <div class="stat-content">
          <span class="stat-label">Verlauf</span>
          <span class="stat-value">{{ completedTasksCount }}</span>
        </div>
      </div>

      <div class="stat-item">
        <div class="stat-icon">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
          </svg>
        </div>
        <div class="stat-content">
          <span class="stat-label">Favoriten</span>
          <span class="stat-value">{{ favoritesCount }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  seekerTasks: {
    type: Array,
    default: () => []
  },
  completedTasksCount: {
    type: Number,
    default: 47
  },
  favoritesCount: {
    type: Number,
    default: 2
  }
})

defineEmits(['create-task', 'view-task'])

const getStatusClass = (status) => {
  switch (status) {
    case 'In Bearbeitung': return 'in-progress'
    case 'Abgeschlossen': return 'completed'
    case 'Offen': return 'open'
    default: return 'open'
  }
}
</script>

<style scoped>
/* Seeker Tasks View */
.seeker-tasks-view {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* Quick Actions */
.quick-actions-header {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.create-task-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: #5F6F55;
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 500;
  font-size: 0.875rem;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(95, 111, 85, 0.2);
}

.create-task-btn:hover {
  background: #4a5544;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(95, 111, 85, 0.3);
}

.action-icon {
  width: 1.25rem;
  height: 1.25rem;
  flex-shrink: 0;
}

/* Tasks Section */
.tasks-section {
  background: white;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid rgba(0,0,0,0.1);
}

.section-title {
  font-size: 1rem;
  font-weight: 600;
  color: #374151;
  margin: 0;
}

.task-count {
  background: #5F6F55;
  color: white;
  border-radius: 50%;
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 600;
}

/* Task List */
.tasks-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.task-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.75rem;
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  background: white;
}

.task-item:hover {
  border-color: #5F6F55;
  box-shadow: 0 2px 8px rgba(95, 111, 85, 0.1);
  transform: translateY(-1px);
}

.task-header {
  position: relative;
  flex-shrink: 0;
}

.task-icon {
  width: 2rem;
  height: 2rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.task-icon.shopping {
  background: rgba(34, 197, 94, 0.1);
  color: #22c55e;
}

.task-icon svg {
  width: 1rem;
  height: 1rem;
}

.task-status-dot {
  position: absolute;
  top: -2px;
  right: -2px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: 2px solid white;
}

.task-status-dot.in-progress {
  background: #f59e0b;
}

.task-status-dot.completed {
  background: #10b981;
}

.task-status-dot.open {
  background: #6b7280;
}

.task-content {
  flex: 1;
  min-width: 0;
}

.task-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  margin: 0 0 0.25rem 0;
  line-height: 1.2;
}

.task-details {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
  margin-bottom: 0.5rem;
}

.helper-name {
  color: #5F6F55;
  font-weight: 500;
  font-size: 0.75rem;
}

.task-distance {
  color: #6b7280;
  font-size: 0.75rem;
}

.task-status {
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0.125rem 0.375rem;
  border-radius: 4px;
  display: inline-block;
}

.task-status.in-progress {
  background: rgba(245, 158, 11, 0.1);
  color: #f59e0b;
}

.task-status.completed {
  background: rgba(16, 185, 129, 0.1);
  color: #10b981;
}

.task-status.open {
  background: rgba(107, 114, 128, 0.1);
  color: #6b7280;
}

.task-actions {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.chevron-icon {
  width: 1rem;
  height: 1rem;
  color: #9ca3af;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 2rem 1rem;
}

.empty-icon {
  width: 3rem;
  height: 3rem;
  margin: 0 auto 1rem;
  color: #9ca3af;
}

.empty-icon svg {
  width: 100%;
  height: 100%;
}

.empty-title {
  font-size: 1rem;
  font-weight: 600;
  color: #374151;
  margin: 0 0 0.5rem 0;
}

.empty-text {
  color: #6b7280;
  font-size: 0.875rem;
  margin: 0 0 1.5rem 0;
  line-height: 1.5;
}

.empty-action-btn {
  background: #5F6F55;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.empty-action-btn:hover {
  background: #4a5544;
  transform: translateY(-1px);
}

/* Quick Stats */
.quick-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}

.stat-item {
  background: white;
  border-radius: 8px;
  padding: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  box-shadow: 0 1px 4px rgba(0,0,0,0.1);
}

.stat-icon {
  width: 2rem;
  height: 2rem;
  border-radius: 6px;
  background: rgba(95, 111, 85, 0.1);
  color: #5F6F55;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stat-icon svg {
  width: 1rem;
  height: 1rem;
}

.stat-content {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.stat-label {
  font-size: 0.75rem;
  color: #6b7280;
  font-weight: 500;
}

.stat-value {
  font-size: 1rem;
  font-weight: 600;
  color: #374151;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .seeker-tasks-view {
    padding: 0.75rem;
    gap: 1rem;
  }
  
  .create-task-btn {
    padding: 0.75rem;
    font-size: 0.8rem;
  }
  
  .tasks-section {
    padding: 0.75rem;
  }
  
  .task-item {
    padding: 0.5rem;
  }
  
  .task-details {
    gap: 0.25rem;
  }
  
  .quick-stats {
    gap: 0.5rem;
  }
  
  .stat-item {
    padding: 0.5rem;
  }
}
</style>