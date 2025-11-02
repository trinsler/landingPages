<template>
  <div v-if="showModal" style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 1rem;">
    <div style="background: white; border-radius: 12px; padding: 1.5rem; max-width: 380px; width: 100%; max-height: 90vh; overflow-y: auto; box-shadow: 0 4px 16px rgba(0,0,0,0.2);">
      <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem;">
        <div style="width: 2.5rem; height: 2.5rem; background: #fee2e2; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
          <svg style="width: 1.25rem; height: 1.25rem; color: #dc2626;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z"/>
          </svg>
        </div>
        <div>
          <h3 style="margin: 0; color: #474747; font-size: 1.125rem; font-weight: 600;">Account endgültig löschen</h3>
          <p style="margin: 0.125rem 0 0 0; color: #8F8B82; font-size: 0.75rem;">Diese Aktion kann nicht rückgängig gemacht werden</p>
        </div>
      </div>

      <div style="background: #fef3c7; border: 1px solid #f59e0b; border-radius: 6px; padding: 0.75rem; margin-bottom: 1.25rem;">
        <p style="margin: 0; color: #92400e; font-size: 0.75rem; line-height: 1.3;">
          <strong style="color: #b45309;">Wichtiger Hinweis:</strong> Wenn Sie Ihren Account löschen, werden <strong>alle Ihre Daten aus unserer Datenbank vollständig und endgültig entfernt</strong>.
        </p>
      </div>

      <form @submit.prevent="confirmDelete">
        <!-- Username Field -->
        <div style="margin-bottom: 0.75rem;">
          <label style="display: block; color: #474747; font-weight: 500; margin-bottom: 0.375rem; font-size: 0.75rem;">Benutzername</label>
          <input 
            v-model="form.username"
            type="text" 
            placeholder="Ihr Benutzername"
            required
            style="width: 100%; padding: 0.625rem; border: 1px solid #e5e7eb; border-radius: 6px; font-size: 0.75rem; transition: border-color 0.2s;"
            @focus="$event.target.style.borderColor='#e74c3c'"
            @blur="$event.target.style.borderColor='#e5e7eb'"
          />
        </div>

        <!-- Password Field -->
        <div style="margin-bottom: 0.75rem;">
          <label style="display: block; color: #474747; font-weight: 500; margin-bottom: 0.375rem; font-size: 0.75rem;">Passwort</label>
          <input 
            v-model="form.password"
            type="password" 
            placeholder="Ihr Passwort"
            required
            style="width: 100%; padding: 0.625rem; border: 1px solid #e5e7eb; border-radius: 6px; font-size: 0.75rem; transition: border-color 0.2s;"
            @focus="$event.target.style.borderColor='#e74c3c'"
            @blur="$event.target.style.borderColor='#e5e7eb'"
          />
        </div>

        <!-- Reason Field -->
        <div style="margin-bottom: 1.25rem;">
          <label style="display: block; color: #474747; font-weight: 500; margin-bottom: 0.375rem; font-size: 0.75rem;">Grund für die Löschung *</label>
          <textarea 
            v-model="form.reason"
            placeholder="Bitte teilen Sie uns mit, warum Sie die App löschen möchten."
            rows="2"
            required
            style="width: 100%; padding: 0.625rem; border: 1px solid #e5e7eb; border-radius: 6px; font-size: 0.75rem; font-family: inherit; resize: vertical; transition: border-color 0.2s;"
            @focus="$event.target.style.borderColor='#e74c3c'"
            @blur="$event.target.style.borderColor='#e5e7eb'"
          ></textarea>
        </div>

        <!-- Confirmation Checkbox -->
        <div style="margin-bottom: 1.25rem;">
          <label style="display: flex; align-items: start; gap: 0.5rem; cursor: pointer;">
            <input 
              v-model="form.understand"
              type="checkbox" 
              required
              style="margin-top: 0.125rem; width: 0.875rem; height: 0.875rem;"
            />
            <span style="color: #8F8B82; font-size: 0.625rem; line-height: 1.3;">
              Ja, ich verstehe, dass mein Account und alle dazugehörigen Daten <strong>unwiderruflich aus der Datenbank gelöscht</strong> werden.
            </span>
          </label>
        </div>

        <!-- Action Buttons -->
        <div style="display: flex; gap: 0.75rem;">
          <button 
            type="button"
            @click="cancel"
            style="flex: 1; background: #f3f4f6; color: #474747; padding: 0.75rem; border: none; cursor: pointer; font-weight: 500; font-size: 0.75rem; border-radius: 6px; transition: all 0.2s;"
            onmouseover="this.style.background='#e5e7eb';"
            onmouseout="this.style.background='#f3f4f6';"
          >
            Abbrechen
          </button>
          <button 
            type="submit"
            style="flex: 2; background: #e74c3c; color: white; padding: 0.75rem; border: none; cursor: pointer; font-weight: 500; font-size: 0.75rem; border-radius: 6px; transition: all 0.2s;"
            onmouseover="this.style.background='#dc2626';"
            onmouseout="this.style.background='#e74c3c';"
          >
            Account endgültig löschen
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  showModal: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['cancel', 'confirm-delete'])

const form = ref({
  username: '',
  password: '',
  reason: '',
  understand: false
})

const cancel = () => {
  form.value = {
    username: '',
    password: '',
    reason: '',
    understand: false
  }
  emit('cancel')
}

const confirmDelete = () => {
  if (!form.value.understand) {
    alert('Bitte bestätigen Sie, dass Sie die Konsequenzen verstehen.')
    return
  }
  
  emit('confirm-delete', { ...form.value })
  cancel()
}
</script>