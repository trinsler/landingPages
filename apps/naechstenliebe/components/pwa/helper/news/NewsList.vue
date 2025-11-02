<template>
  <!-- Left Panel - Always Visible News List -->
  <div style="width: 50%; display: flex; flex-direction: column; gap: 1rem; overflow-y: auto; padding-right: 0.5rem;">
    
    <!-- Featured Update -->
    <div style="background: linear-gradient(135deg, #5F6F55, #4a5c44); border-radius: 16px; padding: 2rem; color: white; box-shadow: 0 4px 12px rgba(95, 111, 85, 0.3);">
      <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem;">
        <div style="padding: 0.25rem 0.75rem; background: rgba(255,255,255,0.2); border-radius: 12px; font-size: 0.75rem; font-weight: 600; backdrop-filter: blur(10px);">
          {{ featuredUpdate.category }}
        </div>
        <div style="padding: 0.25rem 0.75rem; background: #ef4444; border-radius: 12px; font-size: 0.75rem; font-weight: 600;">
          NEU
        </div>
      </div>
      <h2 style="margin: 0 0 1rem 0; font-size: 1.5rem; font-weight: 700;">{{ featuredUpdate.title }}</h2>
      <p style="margin: 0 0 1.5rem 0; opacity: 0.9; line-height: 1.5;">{{ featuredUpdate.summary }}</p>
      <div style="padding: 0.5rem 1rem; background: rgba(255,255,255,0.3); border-radius: 8px; font-size: 0.875rem; text-align: center;">
        📰 Details rechts sichtbar
      </div>
    </div>

    <!-- Category Filter -->
    <div style="background: white; border-radius: 16px; padding: 1.5rem; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
      <h3 style="font-size: 1.125rem; font-weight: 600; color: #474747; margin: 0 0 1rem 0;">Kategorien</h3>
      <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
        <button 
          v-for="category in categories"
          :key="category.id"
          @click="$emit('category-change', category.id)"
          :style="{
              background: selectedCategory === category.id ? '#5F6F55' : '#f3f4f6',
              color: selectedCategory === category.id ? 'white' : '#474747',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '20px',
              fontSize: '0.875rem',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }"
        >
          {{ category.name }} ({{ category.count }})
        </button>
      </div>
    </div>

    <!-- News List -->
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <div 
        v-for="(update, index) in filteredUpdates" 
        :key="update.id"
        :style="{
          background: index < 3 ? '#f0fdf4' : 'white',
          border: index < 3 ? '3px solid #5F6F55' : 'none',
          borderRadius: '16px',
          padding: '1.5rem',
          boxShadow: index < 3 ? '0 4px 12px rgba(95, 111, 85, 0.2)' : '0 2px 8px rgba(0,0,0,0.1)',
          transition: 'all 0.2s'
        }"
      >
        <div style="display: flex; gap: 1rem;">
          <div style="width: 4rem; height: 4rem; background: #BECDA3; border-radius: 12px; flex-shrink: 0; display: flex; align-items: center; justify-content: center;">
            <svg style="width: 2rem; height: 2rem; color: white;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          
          <div style="flex: 1; min-width: 0;">
            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
              <div :style="{
                  padding: '0.25rem 0.75rem',
                  background: getCategoryColor(update.category),
                  color: 'white',
                  borderRadius: '12px',
                  fontSize: '0.625rem',
                  fontWeight: '600',
                  textTransform: 'uppercase'
                }">
                {{ update.category }}
              </div>
              <div v-if="update.isNew" style="padding: 0.25rem 0.75rem; background: #ef4444; color: white; border-radius: 12px; font-size: 0.625rem; font-weight: 600;">
                NEU
              </div>
              <div style="font-size: 0.75rem; color: #8F8B82;">{{ formatDate(update.date) }}</div>
            </div>
            
            <h3 style="font-weight: 600; color: #474747; margin: 0 0 0.5rem 0;">{{ update.title }}</h3>
            <p style="font-size: 0.875rem; color: #8F8B82; margin: 0 0 0.75rem 0; line-height: 1.4;">{{ update.summary }}</p>
            
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <div style="display: flex; align-items: center; gap: 1rem;">
                <div style="font-size: 0.75rem; color: #6b7280; display: flex; align-items: center; gap: 0.25rem;">
                  <svg style="width: 0.75rem; height: 0.75rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                  {{ update.readTime }} Min. Lesezeit
                </div>
                <div v-if="update.priority === 'high'" style="display: flex; align-items: center; gap: 0.25rem; color: #ef4444; font-size: 0.75rem; font-weight: 600;">
                  <svg style="width: 0.75rem; height: 0.75rem;" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
                  </svg>
                  Wichtig
                </div>
              </div>
              <div style="display: flex; align-items: center; gap: 0.5rem; color: #5F6F55; font-weight: 500; font-size: 0.75rem;">
                <span>{{ index < 3 ? 'Sichtbar rechts' : 'In Übersicht' }}</span>
                <svg style="width: 0.75rem; height: 0.75rem;" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                  <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zm14 0c1.274-4.057-1.736-7-6.214-7S-6.732 5.943-8.006 10c1.274 4.057 5.064 7 9.542 7 1.274 0 2.548-.265 3.672-.743" clip-rule="evenodd"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Load More -->
    <div v-if="hasMore" style="text-align: center;">
      <button 
        @click="$emit('load-more')"
        style="background: white; color: #5F6F55; padding: 1rem 2rem; border: 2px solid #5F6F55; cursor: pointer; font-size: 1rem; font-weight: 600; border-radius: 12px; transition: all 0.2s;"
        onmouseover="this.style.background='#5F6F55'; this.style.color='white';"
        onmouseout="this.style.background='white'; this.style.color='#5F6F55';"
      >
        Mehr laden
      </button>
    </div>
  </div>
</template>

<script setup>
import { getCategoryColor } from './NewsData.js'
import { formatDate } from './NewsUtils.js'

defineProps({
  featuredUpdate: {
    type: Object,
    required: true
  },
  categories: {
    type: Array,
    required: true
  },
  selectedCategory: {
    type: String,
    required: true
  },
  filteredUpdates: {
    type: Array,
    required: true
  },
  hasMore: {
    type: Boolean,
    default: false
  }
})

defineEmits(['category-change', 'load-more'])
</script>