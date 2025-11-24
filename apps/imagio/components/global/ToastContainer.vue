<template>
  <Teleport to="body">
    <div class="toast-container">
      <TransitionGroup
        name="toast"
        tag="div"
        class="toast-list"
      >
        <div
          v-for="toast in toasts"
          :key="toast.id"
          class="toast"
          :class="[
            `toast--${toast.type}`,
            { 'toast--persistent': toast.persistent }
          ]"
        >
          <div class="toast-content">
            <div class="toast-icon">
              <component :is="getIcon(toast.type)" />
            </div>
            
            <div class="toast-message">
              {{ toast.message }}
            </div>
            
            <button
              @click="$emit('remove', toast.id)"
              class="toast-close"
              :aria-label="'Nachricht schließen'"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </button>
          </div>
          
          <!-- Progress bar for timed toasts -->
          <div
            v-if="!toast.persistent && toast.duration"
            class="toast-progress"
          >
            <div 
              class="toast-progress-bar"
              :style="{ 
                animationDuration: `${toast.duration}ms`,
                animationPlayState: 'running'
              }"
            ></div>
          </div>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppState, type ToastMessage } from '~/composables/useAppState'

// Icon components
const CheckIcon = {
  template: `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
    </svg>
  `
}

const ErrorIcon = {
  template: `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
    </svg>
  `
}

const WarningIcon = {
  template: `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
    </svg>
  `
}

const InfoIcon = {
  template: `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
    </svg>
  `
}

defineEmits<{
  remove: [id: string]
}>()

const { toasts } = useAppState()

const getIcon = (type: ToastMessage['type']) => {
  switch (type) {
    case 'success':
      return CheckIcon
    case 'error':
      return ErrorIcon
    case 'warning':
      return WarningIcon
    case 'info':
    default:
      return InfoIcon
  }
}
</script>

<style scoped>
.toast-container {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 10000;
  pointer-events: none;
}

.toast-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  align-items: flex-end;
}

.toast {
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border-left: 4px solid #0097b2;
  min-width: 320px;
  max-width: 500px;
  pointer-events: auto;
  position: relative;
  overflow: hidden;
}

.toast--success {
  border-left-color: #10b981;
}

.toast--error {
  border-left-color: #ef4444;
}

.toast--warning {
  border-left-color: #f59e0b;
}

.toast--info {
  border-left-color: #3b82f6;
}

.toast--persistent {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  border-width: 2px;
}

.toast-content {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1rem;
}

.toast-icon {
  flex-shrink: 0;
  margin-top: 0.125rem;
}

.toast--success .toast-icon {
  color: #10b981;
}

.toast--error .toast-icon {
  color: #ef4444;
}

.toast--warning .toast-icon {
  color: #f59e0b;
}

.toast--info .toast-icon {
  color: #3b82f6;
}

.toast-message {
  flex: 1;
  color: #374151;
  font-size: 0.875rem;
  line-height: 1.5;
  word-wrap: break-word;
}

.toast-close {
  flex-shrink: 0;
  background: none;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  transition: all 0.2s ease;
  margin-top: -0.25rem;
  margin-right: -0.25rem;
}

.toast-close:hover {
  background: #f3f4f6;
  color: #374151;
}

.toast-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: rgba(0, 0, 0, 0.1);
}

.toast-progress-bar {
  height: 100%;
  background: currentColor;
  width: 100%;
  animation: toast-progress linear;
  transform-origin: left;
}

@keyframes toast-progress {
  from {
    transform: scaleX(1);
  }
  to {
    transform: scaleX(0);
  }
}

/* Toast animations */
.toast-enter-active {
  transition: all 0.3s ease;
}

.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
  margin-bottom: -100px;
}

.toast-move {
  transition: transform 0.3s ease;
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .toast {
    background: #1f2937;
    color: #f9fafb;
  }

  .toast-message {
    color: #f9fafb;
  }

  .toast-close {
    color: #6b7280;
  }

  .toast-close:hover {
    background: #374151;
    color: #f9fafb;
  }

  .toast-progress {
    background: rgba(255, 255, 255, 0.1);
  }
}

/* Mobile optimizations */
@media (max-width: 640px) {
  .toast-container {
    top: 0.5rem;
    right: 0.5rem;
    left: 0.5rem;
  }

  .toast {
    min-width: auto;
    max-width: none;
    width: 100%;
  }

  .toast-content {
    padding: 0.875rem;
  }

  .toast-message {
    font-size: 0.8rem;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .toast-enter-active,
  .toast-leave-active,
  .toast-move {
    transition: none;
  }

  .toast-progress-bar {
    animation: none;
  }
}

/* High contrast mode */
@media (prefers-contrast: high) {
  .toast {
    border: 2px solid currentColor;
    box-shadow: none;
  }

  .toast-close {
    border: 1px solid currentColor;
  }
}
</style>