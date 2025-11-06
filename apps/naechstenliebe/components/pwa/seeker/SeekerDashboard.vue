<template>
  <div style="padding: 1rem; padding-bottom: 6rem;">
    <!-- Welcome Section -->
    <WelcomeSection />

    <!-- Primary Action -->
    <SeekerPrimaryActions 
      @create-task="$emit('create-task')"
      @become-helper="$emit('become-helper')"
    />

    <!-- Active Tasks -->
    <ActiveTasks 
      :active-tasks="activeTasks"
      @view-task="$emit('view-task', $event)"
    />

    <!-- Quick Access -->
    <QuickAccess 
      :favorite-helpers="favoriteHelpers"
      :completed-tasks="completedTasks"
      @open-favorites="$emit('open-favorites')"
      @open-history="$emit('open-history')"
    />
  </div>
</template>

<script setup>
import WelcomeSection from './WelcomeSection.vue'
import SeekerPrimaryActions from './SeekerPrimaryActions.vue'
import ActiveTasks from './ActiveTasks.vue'
import QuickAccess from './QuickAccess.vue'

defineProps({
  activeTasks: {
    type: Array,
    default: () => []
  },
  favoriteHelpers: {
    type: Array,
    default: () => []
  },
  completedTasks: {
    type: Number,
    default: 0
  }
})

defineEmits(['create-task', 'view-task', 'open-favorites', 'open-history', 'become-helper'])
</script>