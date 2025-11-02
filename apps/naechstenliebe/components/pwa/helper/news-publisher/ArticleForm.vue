<template>
  <!-- Publisher Form -->
  <div style="background: white; border-radius: 16px; padding: 2rem; box-shadow: 0 2px 8px rgba(0,0,0,0.1); margin-bottom: 1.5rem;">
    <h2 style="margin: 0 0 1.5rem 0; font-size: 1.5rem; font-weight: 600; color: #474747;">Neuen Artikel erstellen</h2>
    
    <!-- Title Input -->
    <div style="margin-bottom: 1.5rem;">
      <label style="display: block; font-weight: 600; color: #474747; margin-bottom: 0.5rem;">Titel</label>
      <input 
        v-model="article.title"
        type="text" 
        placeholder="Klarer, prägnanter Titel"
        style="width: 100%; padding: 0.75rem; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 1rem; transition: border-color 0.2s;"
        @focus="$event.target.style.borderColor='#5F6F55'"
        @blur="$event.target.style.borderColor='#e5e7eb'"
      />
    </div>

    <!-- Category Selection -->
    <div style="margin-bottom: 1.5rem;">
      <label style="display: block; font-weight: 600; color: #474747; margin-bottom: 0.5rem;">Kategorie</label>
      <select 
        v-model="article.category"
        style="width: 100%; padding: 0.75rem; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 1rem; transition: border-color 0.2s;"
        @focus="$event.target.style.borderColor='#5F6F55'"
        @blur="$event.target.style.borderColor='#e5e7eb'"
      >
        <option value="">Kategorie auswählen</option>
        <option value="Sicherheit">Sicherheit</option>
        <option value="Aktionen">Aktionen</option>
        <option value="Programm">Programm</option>
        <option value="Technik">Technik</option>
        <option value="Community">Community</option>
      </select>
    </div>

    <!-- Priority Selection -->
    <div style="margin-bottom: 1.5rem;">
      <label style="display: block; font-weight: 600; color: #474747; margin-bottom: 0.5rem;">Priorität</label>
      <div style="display: flex; gap: 1rem;">
        <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
          <input 
            v-model="article.priority" 
            type="radio" 
            value="high"
            style="width: 1rem; height: 1rem;"
          />
          <span style="font-size: 0.875rem; color: #474747;">Hoch</span>
        </label>
        <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
          <input 
            v-model="article.priority" 
            type="radio" 
            value="medium"
            style="width: 1rem; height: 1rem;"
          />
          <span style="font-size: 0.875rem; color: #474747;">Mittel</span>
        </label>
        <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
          <input 
            v-model="article.priority" 
            type="radio" 
            value="low"
            style="width: 1rem; height: 1rem;"
          />
          <span style="font-size: 0.875rem; color: #474747;">Niedrig</span>
        </label>
      </div>
    </div>

    <!-- Read Time -->
    <div style="margin-bottom: 1.5rem;">
      <label style="display: block; font-weight: 600; color: #474747; margin-bottom: 0.5rem;">Lesedauer (Minuten)</label>
      <input 
        v-model.number="article.readTime"
        type="number" 
        min="1" 
        max="20"
        placeholder="z.B. 3"
        style="width: 100%; padding: 0.75rem; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 1rem; transition: border-color 0.2s;"
        @focus="$event.target.style.borderColor='#5F6F55'"
        @blur="$event.target.style.borderColor='#e5e7eb'"
      />
    </div>

    <!-- Summary -->
    <div style="margin-bottom: 1.5rem;">
      <label style="display: block; font-weight: 600; color: #474747; margin-bottom: 0.5rem;">Zusammenfassung</label>
      <textarea 
        v-model="article.summary"
        placeholder="Kurze Zusammenfassung (2-3 Sätze)"
        rows="3"
        style="width: 100%; padding: 0.75rem; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 1rem; font-family: inherit; resize: vertical; transition: border-color 0.2s;"
        @focus="$event.target.style.borderColor='#5F6F55'"
        @blur="$event.target.style.borderColor='#e5e7eb'"
      ></textarea>
    </div>

    <!-- Full Content -->
    <div style="margin-bottom: 1.5rem;">
      <label style="display: block; font-weight: 600; color: #474747; margin-bottom: 0.5rem;">Vollständiger Inhalt</label>
      <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 1rem; margin-bottom: 0.5rem;">
        <p style="margin: 0; font-size: 0.875rem; color: #6b7280; margin-bottom: 0.5rem;">Struktur-Tipps:</p>
        <ul style="margin: 0; padding-left: 1.5rem; font-size: 0.875rem; color: #6b7280;">
          <li>Klare Abschnitte mit Überschriften</li>
          <li>Aufzählungszeichen für Listen</li>
          <li>Fett-Text für wichtige Informationen</li>
          <li>Keine Emojis verwenden</li>
        </ul>
      </div>
      <textarea 
        v-model="article.content"
        placeholder="Detaillierter Inhalt des Artikels"
        rows="12"
        style="width: 100%; padding: 0.75rem; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 1rem; font-family: inherit; resize: vertical; transition: border-color 0.2s;"
        @focus="$event.target.style.borderColor='#5F6F55'"
        @blur="$event.target.style.borderColor='#e5e7eb'"
      ></textarea>
    </div>

    <!-- Action Buttons -->
    <div style="display: flex; gap: 1rem;">
      <button 
        @click="saveDraft"
        :disabled="!isFormValid"
        style="flex: 1; background: #f3f4f6; color: #474747; padding: 1rem; border: 2px solid #e5e7eb; cursor: pointer; font-size: 1rem; font-weight: 600; border-radius: 8px; transition: all 0.2s; display: flex; align-items: center; justify-content: center; gap: 0.5rem;"
        :style="isFormValid ? 'opacity: 1;' : 'opacity: 0.5; cursor: not-allowed;'"
        onmouseover="this.style.background='#e5e7eb';"
        onmouseout="this.style.background='#f3f4f6';"
      >
        <svg style="width: 1.25rem; height: 1.25rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V2"/>
        </svg>
        Entwurf speichern
      </button>
      <button 
        @click="submitForReview"
        :disabled="!isFormValid"
        style="flex: 2; background: #5F6F55; color: white; padding: 1rem; border: none; cursor: pointer; font-size: 1rem; font-weight: 600; border-radius: 8px; transition: all 0.2s; display: flex; align-items: center; justify-content: center; gap: 0.5rem;"
        :style="isFormValid ? '' : 'opacity: 0.5; cursor: not-allowed;'"
        onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 12px rgba(95, 111, 85, 0.3)';"
        onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none';"
      >
        <svg style="width: 1.25rem; height: 1.25rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
        </svg>
        Zur Freigabe einreichen
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  article: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['save-draft', 'submit-for-review'])

// Form validation
const isFormValid = computed(() => {
  return props.article.title.trim() && 
         props.article.category && 
         props.article.summary.trim() && 
         props.article.content.trim() &&
         props.article.readTime > 0
})

const saveDraft = () => {
  if (!isFormValid.value) return
  emit('save-draft', props.article)
}

const submitForReview = () => {
  if (!isFormValid.value) return
  emit('submit-for-review', props.article)
}
</script>