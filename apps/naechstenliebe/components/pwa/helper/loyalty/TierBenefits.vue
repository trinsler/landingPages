<template>
  <div style="background: white; border-radius: 16px; padding: 1.5rem; margin-bottom: 1.5rem; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
    <h3 style="font-size: 1.25rem; font-weight: 600; color: #474747; margin: 0 0 1rem 0;">Ihre Vorteile als {{ userTier.name }}</h3>
    <div style="display: flex; flex-direction: column; gap: 0.75rem;">
      <div v-for="benefit in userTier.benefits" :key="benefit.id" style="display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem; background: #f8f9fa; border-radius: 8px; border: 1px solid #e9ecef;">
        <div style="width: 2rem; height: 2rem; background: #5F6F55; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
          <svg style="width: 1rem; height: 1rem; color: white;" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
          </svg>
        </div>
        <div>
          <div style="font-weight: 600; color: #474747; margin-bottom: 0.25rem;">{{ benefit.title }}</div>
          <div style="font-size: 0.875rem; color: #8F8B82;">{{ benefit.description }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  userTier: {
    type: Object,
    required: true
  }
})
</script>