<template>
  <CyberCard
    :hover="true"
    :glow="article.featured"
    class="group relative animate-slide-up-stagger"
    :style="`animation-delay: ${index * 0.2}s`"
  >
    <!-- Classification Header -->
    <div class="bg-surface-1 px-4 py-3 border-b border-accent-neon/30">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <div class="w-2 h-2 rounded-full bg-accent-neon"></div>
          <div class="code-font text-accent-cyan text-xs">{{ article.category }}</div>
        </div>
        <ClassificationBadge :level="article.classification" />
      </div>
    </div>

    <!-- Article Preview -->
    <div class="relative h-48 bg-linear-to-br from-surface-2 to-surface-1 overflow-hidden">
      <!-- Matrix Background -->
      <div class="absolute inset-0 cyber-grid opacity-20"></div>

      <!-- Article Icon/Visual -->
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="text-center">
          <ArticleIcon
            :category="article.category"
            :featured="article.featured"
            class="mb-4"
          />
          <div class="code-font text-accent-cyan text-xs">{{ article.category.toUpperCase() }}</div>
        </div>
      </div>

      <!-- Article Meta -->
      <div class="absolute top-4 left-4 code-font text-xs text-accent-neon opacity-60">
        {{ article.readTime }} • {{ formatDate(article.publishedAt) }}
      </div>

      <!-- Difficulty Badge -->
      <DifficultyBadge
        v-if="article.difficulty"
        :level="article.difficulty"
        class="absolute top-4 right-4"
      />
    </div>

    <!-- Article Content -->
    <div class="p-6 code-pattern">
      <!-- Terminal Command -->
      <div class="code-font text-accent-neon text-sm mb-3">
        <span class="text-accent-cyan">article@system:~$</span> cat {{ article.slug }}.md
      </div>

      <!-- Title -->
      <h3 class="text-xl font-bold text-white mb-3 code-font">
        <span class="text-accent-neon">></span> {{ article.title.toUpperCase() }}
      </h3>

      <!-- Preview -->
      <div class="mb-4">
        <div class="code-font text-accent-purple text-xs mb-2">/* PREVIEW */</div>
        <p class="text-white/90 text-sm leading-relaxed">{{ article.preview }}</p>
      </div>

      <!-- Tags -->
      <div class="mb-4">
        <div class="flex flex-wrap gap-2">
          <TagBadge
            v-for="tag in article.tags"
            :key="tag"
            :tag="tag"
          />
        </div>
      </div>

      <!-- Action Button -->
      <button class="w-full btn-secondary group code-font text-sm hover:scale-105 transition-all duration-300">
        <span class="flex items-center justify-center">
          <LockIcon class="mr-2" />
          > READ_ARTICLE()
          <ArrowRightIcon class="ml-2 group-hover:translate-x-1 transition-transform" />
        </span>
      </button>
    </div>
  </CyberCard>
</template>

<script setup lang="ts">
import type { Article } from '@monorepo/shared'
import { CyberCard } from './index'
import ClassificationBadge from './ClassificationBadge.vue'
import DifficultyBadge from './DifficultyBadge.vue'
import ArticleIcon from './ArticleIcon.vue'
import TagBadge from './TagBadge.vue'
import LockIcon from './icons/LockIcon.vue'
import ArrowRightIcon from './icons/ArrowRightIcon.vue'

interface Props {
  article: Article
  index?: number
}

withDefaults(defineProps<Props>(), {
  index: 0
})

const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('de-DE', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
</script>