<template>
  </template>

<script setup>
defineProps({
  locationStatus: {
    type: String,
    default: 'loading'
  },
  isAvailable: {
    type: Boolean,
    default: true
  }
})

defineEmits(['toggleAvailability'])
</script>