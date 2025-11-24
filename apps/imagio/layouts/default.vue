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
  min-height: calc(100vh - 70px);
  padding-top: 70px;
}

@media (max-width: 768px) {
  .main-content {
    min-height: calc(100vh - 60px);
    padding-top: 60px;
  }
}
</style>
