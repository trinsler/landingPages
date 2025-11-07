<!-- Demo page showing pending verification status -->
<template>
  <div>
    <h1>Demo: Pending Verification Status</h1>
    <p>Navigate to: <code>/pwa/shared/profile-demo/pending</code></p>
    <p>This demonstrates the verification status with "pending" state.</p>
    
    <!-- Use the normal profile but with pending status -->
    <iframe 
      src="/pwa/shared/profile?demo=pending" 
      style="width: 100%; height: 800px; border: 1px solid #ccc;"
    ></iframe>
  </div>
</template>

<script setup>
definePageMeta({
  layout: false
})
</script>