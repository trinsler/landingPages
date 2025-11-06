<template>
  <div style="background: white; border-radius: 16px; padding: 2rem; margin-bottom: 1.5rem; box-shadow: 0 4px 12px rgba(0,0,0,0.1); text-align: center;">
    <div style="margin-bottom: 0.5rem;">
      <div style="width: 4rem; height: 4rem; background: #BECDA3; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem auto;">
        <svg style="width: 2rem; height: 2rem; color: #474747;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
        </svg>
      </div>
    </div>
    <h2 style="color: #474747; font-size: 1.5rem; font-weight: 600; margin: 0 0 0.5rem 0;">{{ organizationData.name }}</h2>
    <p style="color: #8F8B82; margin: 0 0 1rem 0; font-size: 1rem;">{{ organizationData.type }}</p>
    
    <!-- Key Stats -->
    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem; text-align: center;">
      <div style="background: rgba(190, 205, 163, 0.2); border-radius: 12px; padding: 1rem;">
        <div style="font-size: 1.75rem; font-weight: 600; color: #474747; margin-bottom: 0.3rem;">{{ organizationData.memberCount }}</div>
        <div style="font-size: 0.875rem; color: #8F8B82;">Mitglieder</div>
      </div>
      <div style="background: rgba(190, 205, 163, 0.2); border-radius: 12px; padding: 1rem;">
        <div style="font-size: 1.75rem; font-weight: 600; color: #474747; margin-bottom: 0.3rem;">{{ organizationData.activeServices }}</div>
        <div style="font-size: 0.875rem; color: #8F8B82;">Services</div>
      </div>
      <div style="background: rgba(190, 205, 163, 0.2); border-radius: 12px; padding: 1rem;">
        <div style="font-size: 1.75rem; font-weight: 600; color: #474747; margin-bottom: 0.3rem;">{{ organizationData.pendingRequests }}</div>
        <div style="font-size: 0.875rem; color: #8F8B82;">Anfragen</div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  organizationData: {
    type: Object,
    required: true
  }
})
</script>