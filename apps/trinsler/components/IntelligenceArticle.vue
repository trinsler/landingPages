<template>
  <div class="group relative animate-slide-up-stagger" :style="`animation-delay: ${index * 0.2}s`">
    <!-- Intel File Terminal -->
    <Card class="border border-accent-neon/20 bg-card/95 backdrop-blur-sm hover:shadow-lg hover:shadow-accent-neon/20 transition-all duration-300">
      <!-- Terminal Header -->
      <div class="bg-surface-1 px-4 py-3 border-b border-accent-neon/30">
        <div class="flex items-center gap-2">
          <div class="w-2 h-2 rounded-full bg-accent-neon" />
          <div class="code-font text-accent-cyan text-xs">{{ article.filename }}</div>
          <div class="ml-auto text-xs" :class="article.classificationColor">
            {{ article.classification }}
          </div>
        </div>
      </div>

      <!-- Article Visual -->
      <div class="relative h-48 bg-gradient-to-br from-surface-2 to-surface-1 overflow-hidden">
        <!-- Matrix Background -->
        <div class="absolute inset-0 cyber-grid opacity-20" />

        <!-- Icon -->
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="text-center">
            <div
              class="w-16 h-16 rounded-xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform animate-neon-flicker bg-gradient-to-r from-accent-neon to-accent-cyan"
            >
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  v-if="article.icon === 'rocket'"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
                <path
                  v-else-if="article.icon === 'chart'"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
                <path
                  v-else
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
            <div class="code-font text-accent-cyan text-xs">{{ article.category }}</div>
          </div>
        </div>

        <!-- Code Fragment -->
        <div class="absolute top-4 left-4 code-font text-xs text-accent-neon opacity-60">
          {{ article.codeSnippet || 'system.analyze()' }}
        </div>

        <!-- Security Badge -->
        <div class="absolute top-4 right-4 neon-card px-2 py-1 text-xs code-font text-accent-neon">
          {{ article.securityLevel }}
        </div>
      </div>

      <!-- Intel Content -->
      <div class="p-6 code-pattern">
        <!-- Command Line -->
        <div class="code-font text-accent-neon text-sm mb-3">
          <span class="text-accent-cyan">intel@matrix:~$</span> cat {{ article.filename }}
        </div>

        <!-- Title -->
        <h3 class="text-xl font-bold text-white mb-3 code-font">
          <span class="text-accent-neon">></span> {{ article.title.toUpperCase() }}
        </h3>

        <!-- Preview -->
        <div class="mb-4">
          <div class="code-font text-accent-purple text-xs mb-2">/* INTEL_PREVIEW */</div>
          <p class="text-white/90 text-sm leading-relaxed">{{ article.preview }}</p>
        </div>

        <!-- Access Button -->
        <button
          class="w-full btn-secondary group code-font text-sm hover:scale-105 transition-all duration-300"
        >
          <span class="flex items-center justify-center">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            > DECRYPT_INTEL()
            <svg
              class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </span>
        </button>

        <!-- Access Level -->
        <div class="mt-4 pt-4 border-t border-accent-neon/20">
          <div class="flex items-center justify-between code-font text-xs">
            <span class="text-white/60">Access Level:</span>
            <span class="text-accent-neon">● {{ article.accessLevel }}</span>
          </div>
        </div>
      </div>
    </Card>
  </div>
</template>

<script setup>
import { Card, CardContent } from '~/components/ui' 

defineProps({
  article: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    default: 0,
  },
})
</script>
