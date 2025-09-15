<template>
  <div :class="['flex', 'items-center', className]">
    <svg
      viewBox="0 0 40 40"
      class="h-full w-auto transition-transform duration-300 hover:rotate-3"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <!-- Geometric T Symbol -->
      <circle
        cx="20"
        cy="15"
        r="8"
        fill="#00d4aa"
        class="opacity-20"
      />
      <path
        d="M8 8 L32 8 L32 16 L24 16 L24 32 L16 32 L16 16 L8 16 Z"
        fill="#1a202c"
      />
      <polygon
        points="16,16 24,16 20,24"
        fill="#00d4aa"
      />
    </svg>
    <span class="ml-3 text-xl font-bold text-gray-900 tracking-tight">
      Trinsler
    </span>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from 'vue'

interface Props {
  className?: string
}

const props = withDefaults(defineProps<Props>(), {
  className: "h-8 w-auto"
})

const { className } = toRefs(props)
</script>