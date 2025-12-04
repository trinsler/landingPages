<template>
  <div>
    <main class="main-content">
      <slot />
    </main>
    
    <!-- Global UI Components -->
    <LoadingOverlay />
    <ToastContainer @remove="removeToast" />
  </div>
</template>

<script setup lang="ts">
import LoadingOverlay from '~/components/global/LoadingOverlay.vue'
import ToastContainer from '~/components/global/ToastContainer.vue'
import { useAppState } from '~/composables/useAppState'

const { removeToast } = useAppState()
</script>

<style scoped>
.main-content {
  /* Header spacing is handled globally in app.vue */
}
</style>
