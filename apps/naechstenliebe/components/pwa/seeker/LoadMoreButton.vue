<template>
  <button @click="$emit('load-more')" class="load-more-btn">
    {{ buttonText }}
  </button>
</template>

<script setup>
defineProps({
  buttonText: {
    type: String,
    default: 'Weitere Aufträge laden'
  }
})

defineEmits(['load-more'])
</script>

<style scoped>
/* Mobile First Design */
.load-more-btn {
  width: 100%;
  background: white;
  color: #474747;
  padding: 1.25rem;
  border-radius: 16px;
  border: 2px solid #e5e7eb;
  cursor: pointer;
  font-weight: 600;
  font-size: 1.125rem;
  margin-bottom: 1.5rem;
  transition: all 0.3s ease;
  min-height: 3.5rem;
}

.load-more-btn:hover {
  border-color: #BECDA3;
  background: rgba(190, 205, 163, 0.05);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

/* Tablet and Desktop */
@media (min-width: 768px) {
  .load-more-btn {
    padding: 1rem;
    font-size: 1rem;
    min-height: auto;
  }
}
</style>