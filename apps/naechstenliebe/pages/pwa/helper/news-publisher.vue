<template>
  <div style="min-height: 100vh; background: #f5f5f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;">
    <!-- Header Component -->
    <AppHeader 
      title="News Publisher" 
      :request-count="3"
      @open-requests="() => navigateTo('/pwa/helper/dashboard')"
      @open-profile="() => navigateTo('/pwa/helper/profile')"
      @open-news="() => navigateTo('/pwa/helper/news')"
    />

    <div style="padding: 1rem; padding-bottom: 6rem; max-width: 800px; margin: 0 auto;">
      
      <!-- Security Notice -->
      <div style="background: #fef3c7; border: 1px solid #f59e0b; border-radius: 12px; padding: 1.5rem; margin-bottom: 1.5rem;">
        <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem;">
          <div style="width: 2rem; height: 2rem; background: #f59e0b; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
            <svg style="width: 1.25rem; height: 1.25rem; color: white;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
            </svg>
          </div>
          <h3 style="margin: 0; font-size: 1.125rem; font-weight: 600; color: #92400e;">Sicherer Artikel-Veröffentlichungsprozess</h3>
        </div>
        <p style="margin: 0; color: #92400e; font-size: 0.875rem; line-height: 1.5;">
          Nur autorisierte Administratoren können Artikel veröffentlichen. Alle Beiträge werden vor der Veröffentlichung geprüft und freigegeben.
        </p>
      </div>

      <!-- Article Form Component -->
      <ArticleForm 
        :article="article"
        @save-draft="saveDraft"
        @submit-for-review="submitForReview"
      />

      <!-- Process Documentation Component -->
      <ProcessDocumentation />
    </div>

    <!-- Footer Component -->
    <AppFooter 
      :active-tab="'publisher'"
      @navigate="(tab) => {
        if (tab === 'dashboard') navigateTo('/pwa/helper/dashboard')
        if (tab === 'tasks') navigateTo('/pwa/helper/tasks')
        if (tab === 'news') navigateTo('/pwa/helper/news')
        if (tab === 'earnings') navigateTo('/pwa/helper/earnings')
        if (tab === 'profile') navigateTo('/pwa/helper/profile')
      }"
    />

    <!-- Padding for bottom nav -->
    <div style="height: 5rem;"></div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AppHeader from '~/components/AppHeader.vue'
import AppFooter from '~/components/AppFooter.vue'
import ArticleForm from '~/components/pwa/helper/news-publisher/ArticleForm.vue'
import ProcessDocumentation from '~/components/pwa/helper/news-publisher/ProcessDocumentation.vue'

definePageMeta({
  layout: false
})

// Article form data
const article = ref({
  title: '',
  category: '',
  priority: 'medium',
  readTime: 3,
  summary: '',
  content: ''
})

const saveDraft = (articleData) => {
  // In a real app, this would save to backend
  console.log('Saving draft:', articleData)
  
  // Show success message
  alert('Entwurf erfolgreich gespeichert!')
}

const submitForReview = (articleData) => {
  // In a real app, this would submit to backend for review
  console.log('Submitting for review:', articleData)
  
  // Show success message
  alert('Artikel wurde zur Prüfung eingereicht!')
  
  // Reset form
  article.value = {
    title: '',
    category: '',
    priority: 'medium',
    readTime: 3,
    summary: '',
    content: ''
  }
}
</script>

<style scoped>
/* Custom scrollbar */
div::-webkit-scrollbar {
  width: 6px;
}

div::-webkit-scrollbar-track {
  background: rgba(0,0,0,0.1);
  border-radius: 3px;
}

div::-webkit-scrollbar-thumb {
  background: rgba(0,0,0,0.2);
  border-radius: 3px;
}

div::-webkit-scrollbar-thumb:hover {
  background: rgba(0,0,0,0.3);
}
</style>