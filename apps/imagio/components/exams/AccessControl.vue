<template>
  <div class="access-denied">
    <div class="access-denied-content">
      <h1>Access Denied</h1>
      <p>You need a valid scenario code to access the exam portal.</p>
      <button @click="$emit('returnHome')" class="back-home-btn">
        Return to Home
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineEmits(['returnHome'])
</script>

<style scoped>
.access-denied {
  min-height: calc(100vh - 64px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.access-denied-content {
  text-align: center;
  max-width: 500px;
  background: #ffffff;
  padding: 3rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.access-denied-content h1 {
  color: #dc2626;
  font-size: 2rem;
  margin-bottom: 1rem;
}

.access-denied-content p {
  color: #6b7280;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.back-home-btn {
  padding: 0.75rem 2rem;
  background: #0097b2;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.back-home-btn:hover {
  background: #007a8e;
}
</style>