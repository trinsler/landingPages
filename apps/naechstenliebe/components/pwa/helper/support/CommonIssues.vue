<template>
  <!-- Common Issues -->
  <div style="background: white; border-radius: 16px; padding: 1.5rem; margin-bottom: 1.5rem; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
    <h3 style="font-size: 1.25rem; font-weight: 600; color: #474747; margin: 0 0 1rem 0;">Häufige Probleme</h3>
    <div style="display: flex; flex-direction: column; gap: 0.75rem;">
      <div 
        v-for="issue in issues"
        :key="issue.id"
        @click="toggleIssue(issue)"
        style="background: #f9fafb; padding: 1rem; border-radius: 12px; border: 1px solid #e5e7eb; cursor: pointer; transition: all 0.2s;"
        onmouseover="this.style.background='#f3f4f6';"
        onmouseout="this.style.background='#f9fafb';"
      >
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <div style="width: 2rem; height: 2rem; background: #f3f4f6; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
              <div v-html="issue.icon" style="width: 1.25rem; height: 1.25rem; color: #6b7280;"></div>
            </div>
            <div>
              <h4 style="font-weight: 600; color: #474747; margin: 0 0 0.25rem 0;">{{ issue.title }}</h4>
              <p style="font-size: 0.875rem; color: #8F8B82; margin: 0;">{{ issue.shortDescription }}</p>
            </div>
          </div>
          <svg style="width: 1.25rem; height: 1.25rem; color: #6b7280; transition: transform 0.2s;" :style="{ transform: 'rotate(' + (issue.expanded ? '180deg' : '0deg') + ')' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
          </svg>
        </div>
        <div v-if="issue.expanded" style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid #e5e7eb;">
          <p style="color: #474747; margin: 0 0 1rem 0; line-height: 1.5;">{{ issue.fullDescription }}</p>
          <div style="display: flex; gap: 0.5rem;">
            <button 
              @click.stop="$emit('contact-support', issue)"
              style="flex: 1; background: #5F6F55; color: white; padding: 0.75rem; border: none; cursor: pointer; font-size: 0.875rem; font-weight: 600; border-radius: 8px; transition: all 0.2s;"
              onmouseover="this.style.transform='translateY(-1px)'; this.style.boxShadow='0 2px 6px rgba(0,0,0,0.1)';"
              onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none';"
            >
              Support kontaktieren
            </button>
            <button 
              @click.stop="$emit('show-detail', issue)"
              style="flex: 1; background: #f3f4f6; color: #474747; padding: 0.75rem; border: 1px solid #e5e7eb; cursor: pointer; font-size: 0.875rem; font-weight: 600; border-radius: 8px; transition: all 0.2s;"
              onmouseover="this.style.background='#e5e7eb';"
              onmouseout="this.style.background='#f3f4f6';"
            >
              Mehr erfahren
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  issues: {
    type: Array,
    required: true
  }
})

defineEmits(['contact-support', 'show-detail'])

const toggleIssue = (issue) => {
  issue.expanded = !issue.expanded
}
</script>