<template>
  <div class="earnings-hero">
    <div class="earnings-icon-container">
      <div class="earnings-icon-circle">
        <svg class="earnings-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
        </svg>
      </div>
    </div>
    <div class="total-amount">{{ totalEarnings }}€</div>
    <h2 class="earnings-title">Gesamtverdienst</h2>
    <p class="earnings-subtitle">Aus {{ completedTasks }} erledigten Aufträgen</p>
  </div>
</template>

<script setup>
defineProps({
  totalEarnings: {
    type: Number,
    default: 0
  },
  completedTasks: {
    type: Number,
    default: 0
  }
})
</script>

<style scoped>
.earnings-hero {
  width: 100%;
  background: white;
  border-radius: 20px;
  padding: 2rem 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  text-align: center;
  box-sizing: border-box;
}

.earnings-icon-container {
  margin-bottom: 1.5rem;
}

.earnings-icon-circle {
  width: 5rem;
  height: 5rem;
  background: #5F6F55;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}

.earnings-icon {
  width: 2.5rem;
  height: 2.5rem;
  color: white;
}

.total-amount {
  font-size: 3.5rem;
  font-weight: 700;
  color: #5F6F55;
  margin-bottom: 0.75rem;
  line-height: 1;
}

.earnings-title {
  color: #474747;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 0.75rem 0;
  line-height: 1.3;
}

.earnings-subtitle {
  color: #8F8B82;
  margin: 0;
  font-size: 1.125rem;
  line-height: 1.5;
}

/* Tablet and Desktop */
@media (min-width: 768px) {
  .earnings-hero {
    padding: 3rem 2rem;
  }
  
  .earnings-icon-circle {
    width: 4rem;
    height: 4rem;
  }
  
  .earnings-icon {
    width: 2rem;
    height: 2rem;
  }
  
  .total-amount {
    font-size: 3rem;
  }
  
  .earnings-title {
    font-size: 1.25rem;
  }
  
  .earnings-subtitle {
    font-size: 1rem;
  }
}
</style>