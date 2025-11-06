<template>
  <div style="padding: 1rem; padding-bottom: 6rem;">
    <!-- Organization Overview -->
    <OrganizationOverview 
      :organization-data="organizationData"
      @view-analytics="$emit('view-analytics')"
    />

    <!-- Key Metrics -->
    <OrganizationMetrics 
      :analytics-data="analyticsData"
      @view-analytics="$emit('view-analytics')"
    />

    <!-- Quick Actions Grid -->
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem;">
      <!-- Team Management -->
      <button 
        @click="$emit('manage-team')"
        style="background: white; padding: 1.5rem; border: none; cursor: pointer; border-radius: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); transition: all 0.2s;"
        onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 20px rgba(0,0,0,0.15)';"
        onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.1)';"
      >
        <div style="text-align: center;">
          <div style="width: 3rem; height: 3rem; background: #BECDA3; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem auto;">
            <svg style="width: 1.5rem; height: 1.5rem; color: #474747;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
            </svg>
          </div>
          <div>
            <h4 style="font-weight: 600; color: #474747; margin: 0 0 0.25rem 0;">Team</h4>
            <p style="font-size: 0.875rem; color: #8F8B82; margin: 0;">{{ teamMembers.length }} Mitglieder</p>
          </div>
        </div>
      </button>

      <!-- Services Management -->
      <button 
        @click="$emit('manage-services')"
        style="background: white; padding: 1.5rem; border: none; cursor: pointer; border-radius: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); transition: all 0.2s;"
        onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 20px rgba(0,0,0,0.15)';"
        onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.1)';"
      >
        <div style="text-align: center;">
          <div style="width: 3rem; height: 3rem; background: #BECDA3; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem auto;">
            <svg style="width: 1.5rem; height: 1.5rem; color: #474747;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
            </svg>
          </div>
          <div>
            <h4 style="font-weight: 600; color: #474747; margin: 0 0 0.25rem 0;">Services</h4>
            <p style="font-size: 0.875rem; color: #8F8B82; margin: 0;">{{ organizationServices.length }} aktiv</p>
          </div>
        </div>
      </button>
    </div>

    <!-- Active Services List -->
    <OrganizationServices 
      :organization-services="organizationServices"
      @manage-services="$emit('manage-services')"
    />

    <!-- Bulk Operations -->
    <div style="background: white; border-radius: 16px; padding: 1.5rem; box-shadow: 0 4px 12px rgba(0,0,0,0.1); text-align: center; margin-bottom: 1.5rem;">
      <h3 style="color: #474747; font-size: 1.25rem; font-weight: 600; margin: 0 0 1rem 0;">Bulk-Operationen</h3>
      <p style="color: #8F8B82; margin: 0 0 1.5rem 0; font-size: 0.875rem;">Mehrere Aufträge und Services gleichzeitig verwalten</p>
      
      <button 
        @click="$emit('bulk-operations')" 
        style="background: #5F6F55; color: white; padding: 1rem 2rem; border-radius: 12px; border: none; font-weight: 600; cursor: pointer; font-size: 0.875rem; transition: all 0.2s;"
        onmouseover="this.style.background='#4a5c44'"
        onmouseout="this.style.background='#5F6F55'"
      >
        Bulk-Verwaltung öffnen
      </button>
    </div>

    <!-- Team Members Preview -->
    <OrganizationTeamPreview 
      :team-members="teamMembers"
      @manage-team="$emit('manage-team')"
    />
  </div>
</template>

<script setup>
import OrganizationOverview from './OrganizationOverview.vue'
import OrganizationMetrics from './OrganizationMetrics.vue'
import OrganizationServices from './OrganizationServices.vue'
import OrganizationTeamPreview from './OrganizationTeamPreview.vue'

defineProps({
  organizationData: {
    type: Object,
    required: true
  },
  teamMembers: {
    type: Array,
    default: () => []
  },
  organizationServices: {
    type: Array,
    default: () => []
  },
  analyticsData: {
    type: Object,
    required: true
  }
})

defineEmits(['manage-team', 'manage-services', 'view-analytics', 'bulk-operations'])
</script>