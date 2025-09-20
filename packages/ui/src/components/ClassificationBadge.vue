<template>
  <div
    :class="[
      'px-2 py-1 rounded text-xs code-font font-bold',
      badgeClass
    ]"
  >
    {{ label }}
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  level?: 'public' | 'confidential' | 'secret' | 'top-secret'
}

const props = withDefaults(defineProps<Props>(), {
  level: 'public'
})

const badgeClass = computed(() => {
  const styles = {
    'public': 'bg-green-500/20 text-green-400 border border-green-400/30',
    'confidential': 'bg-yellow-500/20 text-yellow-400 border border-yellow-400/30',
    'secret': 'bg-orange-500/20 text-orange-400 border border-orange-400/30',
    'top-secret': 'bg-red-500/20 text-red-400 border border-red-400/30'
  }
  return styles[props.level]
})

const label = computed(() => {
  const labels = {
    'public': 'PUBLIC',
    'confidential': 'CONFIDENTIAL',
    'secret': 'SECRET',
    'top-secret': 'TOP SECRET'
  }
  return labels[props.level]
})
</script>