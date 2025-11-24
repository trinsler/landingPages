<template>
  <div class="users-tab">
    <div class="users-section">
      <div class="section-header">
        <h3 class="section-title">{{ t('adminUsers', globalTranslations) }}</h3>
        <button @click="$emit('createUser')" class="create-button">
          {{ t('createUser', globalTranslations) }}
        </button>
      </div>
      
      <div class="users-table">
        <div class="table-header">
          <div class="header-cell">{{ t('username', globalTranslations) }}</div>
          <div class="header-cell">{{ t('role', globalTranslations) }}</div>
          <div class="header-cell">{{ t('created', globalTranslations) }}</div>
          <div class="header-cell">{{ t('actions', globalTranslations) }}</div>
        </div>
        
        <div 
          v-for="user in users" 
          :key="user.id"
          class="table-row"
        >
          <div class="table-cell">{{ user.username }}</div>
          <div class="table-cell">
            <span class="role-badge" :class="user.role">{{ user.role }}</span>
          </div>
          <div class="table-cell">{{ formatDate(user.created) }}</div>
          <div class="table-cell">
            <button @click="$emit('editUser', user)" class="action-button edit">
              {{ t('edit', globalTranslations) }}
            </button>
            <button @click="$emit('deleteUser', user.id)" class="action-button delete">
              {{ t('delete', globalTranslations) }}
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Create User Form -->
    <UserCreateForm 
      v-if="showCreateUserForm"
      :newUser="newUser"
      @close="$emit('closeCreateUserForm')"
      @submit="$emit('submitCreateUserForm', $event)"
    />
  </div>
</template>

<script setup lang="ts">
import { useLanguage, globalTranslations } from '~/composables/useLanguage'

const { t } = useLanguage()

defineEmits(['createUser', 'editUser', 'deleteUser', 'closeCreateUserForm', 'submitCreateUserForm'])

defineProps<{
  users: Array<any>
  showCreateUserForm: boolean
  newUser: any
}>()

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  }).format(date)
}
</script>

<style scoped>
.users-section {
  margin-bottom: 2rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e5e7eb;
}

.section-title {
  color: #1f2937;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
}

.create-button {
  padding: 0.5rem 1rem;
  background-color: #0097b2;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.create-button:hover {
  background-color: #007a8e;
}

.users-table {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
}

.table-header {
  display: grid;
  grid-template-columns: 1fr 120px 120px 140px;
  background-color: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
}

.header-cell {
  padding: 0.75rem 1rem;
  font-weight: 600;
  color: #374151;
  font-size: 0.875rem;
}

.table-row {
  display: grid;
  grid-template-columns: 1fr 120px 120px 140px;
  border-bottom: 1px solid #f3f4f6;
}

.table-row:last-child {
  border-bottom: none;
}

.table-row:hover {
  background-color: #f9fafb;
}

.table-cell {
  padding: 1rem;
  color: #374151;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.role-badge {
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
}

.role-badge.admin {
  background-color: #fee2e2;
  color: #991b1b;
}

.role-badge.moderator {
  background-color: #fef3c7;
  color: #92400e;
}

.role-badge.viewer {
  background-color: #e0f2fe;
  color: #0277bd;
}

.action-button {
  padding: 0.375rem 0.75rem;
  border: none;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  margin-right: 0.25rem;
}

.action-button.edit {
  background-color: #f59e0b;
  color: #ffffff;
}

.action-button.edit:hover {
  background-color: #d97706;
}

.action-button.delete {
  background-color: #ef4444;
  color: #ffffff;
}

.action-button.delete:hover {
  background-color: #dc2626;
}

@media (max-width: 1024px) {
  .table-header,
  .table-row {
    grid-template-columns: 1fr;
  }
  
  .table-cell {
    padding: 0.5rem 1rem;
  }
}
</style>