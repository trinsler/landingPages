<template>
  <div class="activity-section">
    <h3 class="section-title">Letzte Aktivität</h3>
    
    <div class="activity-list">
      <div class="activity-item">
        <div class="activity-icon job-created">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
          </svg>
        </div>
        <div class="activity-content">
          <p class="activity-text">Job "Einkaufen" erstellt</p>
          <span class="activity-time">vor 2 Stunden</span>
        </div>
      </div>
      
      <div class="activity-item">
        <div class="activity-icon helper-found">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
          </svg>
        </div>
        <div class="activity-content">
          <p class="activity-text">Helfer für Gartenarbeit gefunden</p>
          <span class="activity-time">vor 5 Stunden</span>
        </div>
      </div>
      
      <div class="activity-item">
        <div class="activity-icon job-completed">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
          </svg>
        </div>
        <div class="activity-content">
          <p class="activity-text">Job "Begleitung" abgeschlossen</p>
          <span class="activity-time">vor 1 Tag</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// No props needed for static activity data for now
// In future, this could accept activity data as props
</script>

<style scoped>
.activity-section {
  width: 100%;
  background: white;
  border-radius: 20px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  box-sizing: border-box;
}

.section-title {
  color: #474747;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 1.5rem 0;
  line-height: 1.3;
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.activity-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: rgba(248, 250, 252, 0.6);
  border-radius: 12px;
  transition: all 0.3s ease;
}

.activity-item:hover {
  background: rgba(95, 111, 85, 0.05);
  transform: translateY(-1px);
}

.activity-icon {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}

.activity-icon.job-created {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
}

.activity-icon.helper-found {
  background: linear-gradient(135deg, #22c55e, #16a34a);
}

.activity-icon.job-completed {
  background: linear-gradient(135deg, #5F6F55, #4a5c44);
}

.activity-icon svg {
  width: 1.25rem;
  height: 1.25rem;
}

.activity-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.activity-text {
  color: #374151;
  font-weight: 500;
  margin: 0;
  font-size: 1rem;
  line-height: 1.4;
}

.activity-time {
  color: #64748b;
  font-size: 0.75rem;
  font-weight: 400;
}

/* Tablet and Desktop */
@media (min-width: 768px) {
  .activity-section {
    padding: 2rem;
  }
  
  .section-title {
    font-size: 1.25rem;
  }
  
  .activity-item {
    padding: 1rem;
  }
  
  .activity-text {
    font-size: 1rem;
  }
  
  .activity-time {
    font-size: 0.75rem;
  }
}
</style>