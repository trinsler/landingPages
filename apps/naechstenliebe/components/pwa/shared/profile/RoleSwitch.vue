<template>
  <div class="section-card role-switch-section">
    <div class="role-switch-content">
      <div class="role-icon-container">
        <svg class="role-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/>
        </svg>
      </div>
      <h3 class="role-switch-title">
        {{ currentRole === 'helper' ? 'Als Hilfesuchender aktiv werden' : 'Als Helfer Geld verdienen' }}
      </h3>
      <p class="role-switch-subtitle">
        {{ currentRole === 'helper' ? 'Nutzen Sie unseren Service für Ihre eigenen Bedürfnisse' : 'Nutzen Sie Ihre Fähigkeiten und helfen Sie anderen' }}
      </p>
      <button class="role-switch-btn" @click="$emit('switchRole')">
        {{ currentRole === 'helper' ? 'Als Hilfesuchender registrieren' : 'Als Helfer registrieren' }}
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  currentRole: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['switchRole'])
</script>

<style scoped>
/* Dashboard Style Section Cards */
.section-card {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 24px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  margin-bottom: 2rem;
}

.section-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

/* Role Switch Section */
.role-switch-section {
  background: linear-gradient(135deg, rgba(95, 111, 85, 0.05), rgba(190, 205, 163, 0.08));
  border: 1px solid rgba(95, 111, 85, 0.2);
}

.role-switch-content {
  text-align: center;
}

.role-icon-container {
  width: 4rem;
  height: 4rem;
  background: linear-gradient(135deg, #5F6F55, #4a5c44);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem auto;
  box-shadow: 0 8px 32px rgba(95, 111, 85, 0.3);
  transition: all 0.3s ease;
}

.role-switch-section:hover .role-icon-container {
  transform: scale(1.05);
  box-shadow: 0 12px 40px rgba(95, 111, 85, 0.4);
}

.role-icon {
  width: 2rem;
  height: 2rem;
  color: white;
}

.role-switch-title {
  color: #1e293b;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
  background: linear-gradient(135deg, #1e293b, #475569);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.3;
}

.role-switch-subtitle {
  color: #64748b;
  font-size: 1rem;
  font-weight: 500;
  margin: 0 0 2rem 0;
  line-height: 1.6;
}

.role-switch-btn {
  background: linear-gradient(135deg, #5F6F55, #4a5c44);
  color: white;
  border: none;
  border-radius: 16px;
  padding: 1.25rem 2.5rem;
  font-size: 1.125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px rgba(95, 111, 85, 0.3);
  min-width: 240px;
}

.role-switch-btn:hover {
  background: linear-gradient(135deg, #4a5c44, #3d4d38);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(95, 111, 85, 0.4);
}

.role-switch-btn:active {
  transform: translateY(0);
  box-shadow: 0 4px 16px rgba(95, 111, 85, 0.3);
}

/* Responsive Design */
@media (max-width: 479px) {
  .section-card {
    padding: 1.5rem;
    border-radius: 20px;
  }
  
  .role-icon-container {
    width: 3rem;
    height: 3rem;
  }
  
  .role-icon {
    width: 1.5rem;
    height: 1.5rem;
  }
  
  .role-switch-title {
    font-size: 1.25rem;
  }
  
  .role-switch-subtitle {
    font-size: 0.875rem;
  }
  
  .role-switch-btn {
    padding: 1rem 2rem;
    font-size: 1rem;
    min-width: 200px;
  }
}

@media (max-width: 767px) and (min-width: 480px) {
  .section-card {
    padding: 1.75rem;
  }
}

@media (min-width: 768px) {
  .section-card {
    padding: 2.5rem;
  }
  
  .role-icon-container {
    width: 5rem;
    height: 5rem;
  }
  
  .role-icon {
    width: 2.5rem;
    height: 2.5rem;
  }
  
  .role-switch-title {
    font-size: 1.75rem;
  }
  
  .role-switch-subtitle {
    font-size: 1.125rem;
    margin-bottom: 2.5rem;
  }
  
  .role-switch-btn {
    padding: 1.5rem 3rem;
    font-size: 1.25rem;
    min-width: 280px;
  }
}

@media (min-width: 1024px) {
  .section-card {
    padding: 3rem;
  }
  
  .role-switch-title {
    font-size: 2rem;
  }
  
  .role-switch-subtitle {
    font-size: 1.25rem;
  }
}

@media (min-width: 1400px) {
  .section-card {
    padding: 3.5rem;
  }
}

/* Focus states for accessibility */
.role-switch-btn:focus {
  outline: 2px solid #5F6F55;
  outline-offset: 2px;
}

.role-switch-btn:focus:not(:focus-visible) {
  outline: none;
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .role-icon-container,
  .role-switch-btn {
    transform: none;
    transition: none;
  }
  
  .role-switch-section:hover .role-icon-container {
    transform: none;
  }
  
  .role-switch-btn:hover {
    transform: none;
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .section-card {
    background: rgba(17, 24, 39, 0.8);
    border-color: rgba(55, 65, 81, 0.3);
  }
  
  .role-switch-section {
    background: linear-gradient(135deg, rgba(190, 205, 163, 0.1), rgba(95, 111, 85, 0.05));
    border-color: rgba(190, 205, 163, 0.3);
  }
  
  .role-switch-title {
    background: linear-gradient(135deg, #f1f5f9, #e2e8f0);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  .role-switch-subtitle {
    color: #cbd5e1;
  }
  
  .role-icon-container {
    background: linear-gradient(135deg, #BECDA3, #5F6F55);
  }
}
</style>