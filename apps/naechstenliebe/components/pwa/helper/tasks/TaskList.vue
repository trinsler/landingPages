<template>
  <div style="padding: 1rem 1.5rem; padding-bottom: 2rem;">
    <div v-if="tasks.length === 0" style="text-align: center; padding: 3rem 1rem;">
      <h4 style="font-weight: 600; color: #474747; margin: 0 0 0.5rem 0;">Keine Aufträge gefunden</h4>
      <p style="color: #8F8B82; margin: 0;">Aktuell gibt es keine Aufträge für diesen Status</p>
    </div>

    <div v-else style="display: flex; flex-direction: column; gap: 1rem;">
      <TaskCard 
        v-for="task in tasks" 
        :key="task.id"
        :task="task"
        @task-click="$emit('task-click', $event)"
        @contact-client="$emit('contact-client', $event)"
        @show-details="$emit('show-details', $event)"
      />
    </div>
  </div>
</template>

<script setup>
import TaskCard from './TaskCard.vue'

defineProps({
  tasks: {
    type: Array,
    required: true
  }
})

defineEmits(['task-click', 'contact-client', 'show-details'])
</script>