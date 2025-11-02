<template>
  <div style="margin-bottom: 1rem;">
    <h4 style="color: #474747; font-size: clamp(0.9rem, 2.5vw, 1rem); font-weight: 600; margin: 0 0 0.8rem 0; padding-left: 0.5rem;">
      {{ group.title }}
    </h4>
    
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <TaskHistoryCard 
        v-for="task in group.tasks" 
        :key="task.id"
        :task="task"
        @view-details="$emit('view-details', $event)"
      />
    </div>
  </div>
</template>

<script setup>
import TaskHistoryCard from './TaskHistoryCard.vue'

defineProps({
  group: {
    type: Object,
    required: true
  }
})

defineEmits(['view-details'])
</script>