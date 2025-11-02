<template>
  <!-- Right Panel - Always Visible Articles -->
  <div style="width: 50%; display: flex; flex-direction: column; gap: 1rem; overflow-y: auto; padding-left: 0.5rem;">
    
    <!-- Featured Update -->
    <div style="background: white; border-radius: 16px; padding: 2rem; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
      <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem;">
        <div 
          :style="{
            padding: '0.5rem 1rem',
            borderRadius: '12px',
            fontSize: '0.875rem',
            fontWeight: '600',
            background: getCategoryColor(featuredUpdate.category),
            color: 'white'
          }"
        >
          {{ featuredUpdate.category }}
        </div>
        <div style="padding: 0.5rem 1rem; background: #ef4444; border-radius: 12px; font-size: 0.875rem; font-weight: 600; color: white;">
          NEU
        </div>
      </div>

      <h1 style="font-size: 1.5rem; font-weight: 700; color: #474747; margin: 0 0 1rem 0; line-height: 1.2;">{{ featuredUpdate.title }}</h1>
      <div style="font-size: 1rem; color: #474747; line-height: 1.6; margin-bottom: 1rem;">{{ featuredUpdate.summary }}</div>
      
      <div style="display: flex; gap: 1rem;">
        <button 
          style="flex: 1; background: #5F6F55; color: white; padding: 0.75rem 1rem; border: none; cursor: pointer; font-size: 0.875rem; font-weight: 600; border-radius: 8px; transition: all 0.2s;"
          onmouseover="this.style.transform='translateY(-1px)'; this.style.boxShadow='0 4px 12px rgba(95, 111, 85, 0.3)';"
          onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none';"
        >
          Als gelesen markieren
        </button>
        <button 
          @click="shareArticle(featuredUpdate)"
          style="flex: 1; background: white; color: #5F6F55; padding: 0.75rem 1rem; border: 2px solid #5F6F55; cursor: pointer; font-size: 0.875rem; font-weight: 600; border-radius: 8px; transition: all 0.2s; display: flex; align-items: center; justify-content: center; gap: 0.5rem;"
          onmouseover="this.style.background='#5F6F55'; this.style.color='white';"
          onmouseout="this.style.background='white'; this.style.color='#5F6F55';"
        >
          <svg style="width: 0.875rem; height: 0.875rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"/>
          </svg>
          Teilen
        </button>
      </div>
    </div>

    <!-- Next 3 Articles -->
    <div 
      v-for="update in filteredUpdates.slice(0, 3)" 
      :key="update.id"
      style="background: white; border-radius: 16px; padding: 1.5rem; box-shadow: 0 2px 8px rgba(0,0,0,0.1);"
    >
      <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem;">
        <div 
          :style="{
            padding: '0.25rem 0.75rem',
            borderRadius: '12px',
            fontSize: '0.75rem',
            fontWeight: '600',
            background: getCategoryColor(update.category),
            color: 'white'
          }"
        >
          {{ update.category }}
        </div>
        <div v-if="update.isNew" style="padding: 0.25rem 0.75rem; background: #ef4444; border-radius: 12px; font-size: 0.75rem; font-weight: 600; color: white;">
          NEU
        </div>
        <div v-if="update.priority === 'high'" style="padding: 0.25rem 0.75rem; background: #dc2626; border-radius: 12px; font-size: 0.75rem; font-weight: 600; color: white;">
          Wichtig
        </div>
      </div>
      
      <h3 style="font-size: 1.25rem; font-weight: 600; color: #474747; margin: 0 0 1rem 0; line-height: 1.3;">{{ update.title }}</h3>
      <div style="font-size: 0.875rem; color: #474747; line-height: 1.6; margin-bottom: 1rem;">{{ update.summary }}</div>
      
      <div style="font-size: 0.75rem; color: #8F8B82; margin-bottom: 1rem;">
        <span>{{ formatDate(update.date) }}</span>
        <span> • </span>
        <span>{{ update.readTime }} Min. Lesezeit</span>
      </div>
      
      <div style="display: flex; gap: 1rem;">
        <button 
          style="flex: 1; background: #5F6F55; color: white; padding: 0.75rem 1rem; border: none; cursor: pointer; font-size: 0.875rem; font-weight: 600; border-radius: 8px; transition: all 0.2s;"
          onmouseover="this.style.transform='translateY(-1px)'; this.style.boxShadow='0 4px 12px rgba(95, 111, 85, 0.3)';"
          onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none';"
        >
          Als gelesen markieren
        </button>
        <button 
          @click="shareArticle(update)"
          style="flex: 1; background: white; color: #5F6F55; padding: 0.75rem 1rem; border: 2px solid #5F6F55; cursor: pointer; font-size: 0.875rem; font-weight: 600; border-radius: 8px; transition: all 0.2s; display: flex; align-items: center; justify-content: center; gap: 0.5rem;"
          onmouseover="this.style.background='#5F6F55'; this.style.color='white';"
          onmouseout="this.style.background='white'; this.style.color='#5F6F55';"
        >
          <svg style="width: 0.875rem; height: 0.875rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"/>
          </svg>
          Teilen
        </button>
      </div>
    </div>

    <!-- Show More Button for remaining articles -->
    <div v-if="filteredUpdates.length > 4" style="background: white; border-radius: 16px; padding: 1.5rem; box-shadow: 0 2px 8px rgba(0,0,0,0.1); text-align: center;">
      <div style="font-size: 1rem; color: #474747; margin-bottom: 1rem;">Noch {{ filteredUpdates.length - 4 }} weitere Artikel</div>
      <button 
        @click="$emit('load-more')"
        style="background: #5F6F55; color: white; padding: 0.75rem 2rem; border: none; cursor: pointer; font-size: 1rem; font-weight: 600; border-radius: 8px; transition: all 0.2s;"
        onmouseover="this.style.transform='translateY(-1px)'; this.style.boxShadow='0 4px 12px rgba(95, 111, 85, 0.3)';"
        onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none';"
      >
        Alle Artikel laden
      </button>
    </div>
  </div>
</template>

<script setup>
import { getCategoryColor } from './NewsData.js'
import { formatDate, shareArticle } from './NewsUtils.js'

defineProps({
  featuredUpdate: {
    type: Object,
    required: true
  },
  filteredUpdates: {
    type: Array,
    required: true
  }
})

defineEmits(['load-more'])
</script>