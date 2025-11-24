<template>
  <div class="modal-overlay" @click="$emit('close')">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h3 class="modal-title">{{ t('createNewUser', globalTranslations) }}</h3>
        <button @click="$emit('close')" class="modal-close">×</button>
      </div>
      <form @submit.prevent="submitForm" class="user-form">
        <div class="form-group">
          <label>{{ t('username', globalTranslations) }}</label>
          <input v-model="formData.username" type="text" class="form-input" required>
        </div>
        <div class="form-group">
          <label>{{ t('password', globalTranslations) }}</label>
          <input v-model="formData.password" type="password" class="form-input" required>
        </div>
        <div class="form-group">
          <label>{{ t('role', globalTranslations) }}</label>
          <select v-model="formData.role" class="form-input">
            <option value="admin">Admin</option>
            <option value="moderator">Moderator</option>
            <option value="viewer">Viewer</option>
          </select>
        </div>
        <div class="form-actions">
          <button type="submit" class="submit-button">
            {{ t('createUser', globalTranslations) }}
          </button>
          <button type="button" @click="$emit('close')" class="cancel-button">
            {{ t('cancel', globalTranslations) }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useLanguage, globalTranslations } from '~/composables/useLanguage'

const { t } = useLanguage()

defineEmits(['close', 'submit'])

const formData = reactive({
  username: '',
  password: '',
  role: 'viewer'
})

const submitForm = () => {
  // Emit the form data to parent
  const newUser = {
    id: Date.now(),
    ...formData,
    created: new Date()
  }
  
  // Reset form
  formData.username = ''
  formData.password = ''
  formData.role = 'viewer'
  
  // Emit to parent
  // Parent will handle the actual user creation
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;
  padding: 1rem;
}

.modal-content {
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  padding: 1.5rem 1.5rem 0 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
}

.modal-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.modal-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #6b7280;
  cursor: pointer;
  padding: 0.25rem;
  line-height: 1;
}

.modal-close:hover {
  color: #374151;
}

.user-form {
  padding: 0 1.5rem 1.5rem 1.5rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
}

.form-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.875rem;
  transition: border-color 0.15s ease;
}

.form-input:focus {
  outline: none;
  border-color: #0097b2;
  box-shadow: 0 0 0 2px rgba(0, 151, 178, 0.1);
}

.form-actions {
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
  margin-top: 1.5rem;
}

.submit-button {
  padding: 0.75rem 1.5rem;
  background-color: #0097b2;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.15s ease;
}

.submit-button:hover {
  background-color: #007a8e;
}

.cancel-button {
  padding: 0.75rem 1.5rem;
  background-color: #ffffff;
  color: #374151;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s ease;
}

.cancel-button:hover {
  background-color: #f9fafb;
  border-color: #9ca3af;
}
</style>