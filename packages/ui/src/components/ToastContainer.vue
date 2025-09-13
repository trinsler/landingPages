<template>
  <teleport to="body">
    <div class="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      <TransitionGroup
        name="toast"
        enter-active-class="transition ease-out duration-300"
        enter-from-class="transform opacity-0 scale-95 translate-x-full"
        enter-to-class="transform opacity-100 scale-100 translate-x-0"
        leave-active-class="transition ease-in duration-200"
        leave-from-class="transform opacity-100 scale-100 translate-x-0"
        leave-to-class="transform opacity-0 scale-95 translate-x-full"
      >
        <div
          v-for="toast in toasts"
          :key="toast.id"
          class="bg-white rounded-lg shadow-lg border p-4 cursor-pointer"
          :class="[
            {
              'border-green-200 bg-green-50': toast.type === 'success',
              'border-red-200 bg-red-50': toast.type === 'error',
              'border-yellow-200 bg-yellow-50': toast.type === 'warning',
              'border-blue-200 bg-blue-50': toast.type === 'info'
            }
          ]"
          @click="handleDismiss(toast.id)"
        >
          <div class="flex items-start space-x-3">
            <!-- Icon -->
            <div class="flex-shrink-0">
              <svg
                v-if="toast.type === 'success'"
                class="w-5 h-5 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              
              <svg
                v-else-if="toast.type === 'error'"
                class="w-5 h-5 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              
              <svg
                v-else-if="toast.type === 'warning'"
                class="w-5 h-5 text-yellow-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
              
              <svg
                v-else
                class="w-5 h-5 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
              </svg>
            </div>

            <!-- Content -->
            <div class="flex-1 min-w-0">
              <h4
                v-if="toast.title"
                class="text-sm font-medium"
                :class="[
                  {
                    'text-green-800': toast.type === 'success',
                    'text-red-800': toast.type === 'error',
                    'text-yellow-800': toast.type === 'warning',
                    'text-blue-800': toast.type === 'info'
                  }
                ]"
              >
                {{ toast.title }}
              </h4>
              <p
                class="text-sm"
                :class="[
                  {
                    'text-green-700': toast.type === 'success',
                    'text-red-700': toast.type === 'error',
                    'text-yellow-700': toast.type === 'warning',
                    'text-blue-700': toast.type === 'info'
                  },
                  { 'mt-1': toast.title }
                ]"
              >
                {{ toast.message }}
              </p>
            </div>

            <!-- Close button -->
            <button
              @click.stop="handleDismiss(toast.id)"
              class="flex-shrink-0 text-gray-400 hover:text-gray-600"
            >
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Progress bar for non-persistent toasts -->
          <div
            v-if="!toast.persistent"
            class="mt-2 h-1 bg-gray-200 rounded-full overflow-hidden"
          >
            <div
              class="h-full transition-all ease-linear"
              :class="[
                {
                  'bg-green-500': toast.type === 'success',
                  'bg-red-500': toast.type === 'error',
                  'bg-yellow-500': toast.type === 'warning',
                  'bg-blue-500': toast.type === 'info'
                }
              ]"
              :style="{ 
                width: `${getProgressWidth(toast)}%`,
                transitionDuration: `${toast.duration}ms`
              }"
            ></div>
          </div>
        </div>
      </TransitionGroup>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import type { Toast } from '@monorepo/shared'

interface Props {
  toasts: Toast[]
}

const props = defineProps<Props>()

interface Emits {
  dismiss: [id: string]
}

const emit = defineEmits<Emits>()

const handleDismiss = (id: string) => {
  emit('dismiss', id)
}

const getProgressWidth = (toast: Toast) => {
  const elapsed = Date.now() - toast.timestamp
  const remaining = Math.max(0, toast.duration - elapsed)
  return (remaining / toast.duration) * 100
}
</script>