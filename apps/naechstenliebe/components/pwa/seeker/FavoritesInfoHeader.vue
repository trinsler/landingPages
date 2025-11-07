<template>
  <div class="info-header">
    <div class="icon-container">
      <div class="icon-circle">
        <svg class="header-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
        </svg>
      </div>
    </div>
    <h2 class="header-title">Ihre Stamm-Helfer</h2>
    <p class="header-subtitle">Bewährte Helfer, denen Sie vertrauen können</p>
    
    <!-- Vertrauens-Hinweise -->
    <div class="trust-info">
      <div class="trust-item">
        <svg class="trust-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
        </svg>
        <span>Bereits erfolgreich beauftragt</span>
      </div>
      <div class="trust-item">
        <svg class="trust-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <span>Schnelle Direktanfrage möglich</span>
      </div>
    </div>
  </div>
</template>

<script setup>
// No props or reactive data needed for this static component
</script>

<style scoped>
/* Mobile First Design */
.info-header {
  background: white;
  border-radius: 20px;
  padding: 2rem 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  text-align: center;
}

.icon-container {
  margin-bottom: 1.5rem;
}

.icon-circle {
  width: 5rem;
  height: 5rem;
  background: #BECDA3;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}

.header-icon {
  width: 2.5rem;
  height: 2.5rem;
  color: #5F6F55;
}

.header-title {
  color: #474747;
  font-size: 1.75rem;
  font-weight: 600;
  margin: 0 0 0.75rem 0;
  line-height: 1.3;
}

.header-subtitle {
  color: #8F8B82;
  margin: 0 0 1.5rem 0;
  font-size: 1.125rem;
  line-height: 1.5;
}

/* Trust Info - Margarete braucht Sicherheit */
.trust-info {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  align-items: center;
}

.trust-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(95, 111, 85, 0.1);
  border: 1px solid rgba(95, 111, 85, 0.2);
  border-radius: 20px;
  color: #5F6F55;
  font-size: 0.875rem;
  font-weight: 500;
  text-align: left;
}

.trust-icon {
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
}

/* Tablet and Desktop */
@media (min-width: 768px) {
  .info-header {
    padding: 2rem;
  }
  
  .icon-circle {
    width: 4rem;
    height: 4rem;
  }
  
  .header-icon {
    width: 2rem;
    height: 2rem;
  }
  
  .header-title {
    font-size: 1.5rem;
  }
  
  .header-subtitle {
    font-size: 1rem;
  }
}
</style>