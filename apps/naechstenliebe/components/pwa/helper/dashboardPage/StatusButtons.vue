<template>
  <div style="position: absolute; top: 3.8rem; left: 4rem; right: 1rem; z-index: 10; max-width: calc(100% - 5rem);">
    <div style="display: flex; gap: 0.5rem;">
      <!-- Standort Status Button (kleiner) -->
      <div style="background: rgba(255,255,255,0.98); padding: 0.5rem 0.75rem; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.12); backdrop-filter: blur(10px); max-width: 140px;">
        <div style="display: flex; align-items: center; gap: 0.4rem;">
          <div :style="'width: 0.4rem; height: 0.4rem; border-radius: 50%; background: ' + (locationStatus === 'active' ? '#10b981' : '#f59e0b') + ';'"></div>
          <span style="font-size: 0.7rem; color: #474747; font-weight: 500; white-space: nowrap;">
            {{ locationStatus === 'active' ? 'Standort aktiv' : 'Ermittelt...' }}
          </span>
        </div>
      </div>
      
      <!-- Verfügbarkeit Button (kleiner) -->
      <button 
        @click="$emit('toggle-availability')"
        :style="'background: ' + (isAvailable ? '#5F6F55' : '#8F8B82') + '; color: white; padding: 0.5rem 0.75rem; border-radius: 10px; border: none; cursor: pointer; font-weight: 600; font-size: 0.7rem; transition: all 0.2s; box-shadow: 0 2px 8px rgba(0,0,0,0.12); white-space: nowrap;'"
        onmouseover="this.style.transform='translateY(-1px)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.15)';"
        onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.12)';"
      >
        {{ isAvailable ? '✓ Verfügbar' : '✗ Nicht verfügbar' }}
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  isAvailable: Boolean,
  locationStatus: String
})

defineEmits(['toggle-availability'])
</script>