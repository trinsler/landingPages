<template>
  <div 
    :style="getCardStyle()"
    @mouseover="handleMouseOver"
    @mouseout="handleMouseOut"
  >
    <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
      <div v-if="task.highlighted" style="width: 3rem; height: 3rem; background: #BECDA3; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
        <img :src="task.icon" :alt="task.type" style="width: 1.5rem; height: 1.5rem;">
      </div>
      <img v-else :src="task.icon" :alt="task.type" style="width: 3rem; height: 3rem; flex-shrink: 0;">
      
      <div style="flex: 1; min-width: 0;">
        <h5 :style="getTitleStyle()">{{ task.title }}</h5>
        <p :style="getSubtitleStyle()">{{ task.helper }} • {{ task.time }}</p>
      </div>
      <div style="text-align: right; flex-shrink: 0;">
        <div :style="getStatusBadgeStyle()">
          {{ task.status }}
        </div>
        <div :style="getPriceStyle()">{{ task.price }}€</div>
      </div>
    </div>
    
    <div :style="getDescriptionBoxStyle()">
      <p :style="getDescriptionTextStyle()">
        "{{ task.description }}"
      </p>
    </div>
    
    <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
      <div style="display: flex; align-items: center; gap: 0.3rem;">
        <span :style="getRatingStyle()">{{ task.rating }}</span>
        <span :style="getRatingLabelStyle()">Ihre Bewertung</span>
      </div>
      <button 
        @click="$emit('view-details', task.id)"
        :style="getDetailsButtonStyle()"
        @mouseover="handleDetailsMouseOver"
        @mouseout="handleDetailsMouseOut"
      >
        Details
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  task: {
    type: Object,
    required: true
  }
})

defineEmits(['view-details'])

const isHovered = ref(false)
const isDetailsHovered = ref(false)

const handleMouseOver = () => {
  isHovered.value = true
}

const handleMouseOut = () => {
  isHovered.value = false
}

const handleDetailsMouseOver = (event) => {
  isDetailsHovered.value = true
  if (props.task.highlighted) {
    event.target.style.borderColor = '#BECDA3'
  } else {
    event.target.style.borderColor = '#BECDA3'
  }
}

const handleDetailsMouseOut = (event) => {
  isDetailsHovered.value = false
  if (props.task.highlighted) {
    event.target.style.borderColor = '#e5e7eb'
  } else {
    event.target.style.borderColor = '#BECDA3'
  }
}

const getCardStyle = () => {
  let baseStyle = "background: white; border-radius: 16px; padding: 1.5rem; transition: all 0.2s;"
  
  if (props.task.highlighted) {
    baseStyle += " box-shadow: 0 4px 12px rgba(0,0,0,0.1); border-left: 4px solid #BECDA3;"
  } else {
    baseStyle += " box-shadow: 3px 3px 0px rgba(0,0,0,0.1); border-radius: 1rem;"
  }
  
  if (isHovered.value) {
    baseStyle += " transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0,0,0,0.15);"
  }
  
  return baseStyle
}

const getTitleStyle = () => {
  return props.task.highlighted 
    ? "color: #474747; font-size: 1.125rem; font-weight: 600; margin: 0 0 0.25rem 0;"
    : "color: #474747; font-size: clamp(1rem, 2.5vw, 1.1rem); font-weight: 600; margin: 0 0 0.3rem 0;"
}

const getSubtitleStyle = () => {
  return props.task.highlighted
    ? "color: #8F8B82; margin: 0; font-size: 0.875rem;"
    : "color: #666; margin: 0; font-size: clamp(0.8rem, 2.5vw, 0.9rem);"
}

const getStatusBadgeStyle = () => {
  return props.task.highlighted
    ? "background: #5F6F55; color: white; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.75rem; font-weight: 600; margin-bottom: 0.25rem;"
    : "background: rgba(190, 205, 163, 0.3); color: #474747; padding: 0.3rem 0.8rem; border-radius: 1rem; font-size: clamp(0.7rem, 2vw, 0.8rem); font-weight: 600; margin-bottom: 0.3rem;"
}

const getPriceStyle = () => {
  return props.task.highlighted
    ? "color: #474747; font-weight: 600; font-size: 0.875rem;"
    : "color: #474747; font-weight: 600; font-size: clamp(0.8rem, 2.5vw, 0.9rem);"
}

const getDescriptionBoxStyle = () => {
  return props.task.highlighted
    ? "background: #f9fafb; border-radius: 12px; padding: 1rem; margin-bottom: 1rem;"
    : "background: #f8f8f8; border-radius: 0.5rem; padding: 0.8rem; margin-bottom: 1rem;"
}

const getDescriptionTextStyle = () => {
  return props.task.highlighted
    ? "color: #8F8B82; margin: 0; font-size: 0.875rem; font-style: italic;"
    : "color: #666; margin: 0; font-size: clamp(0.75rem, 2vw, 0.85rem); font-style: italic;"
}

const getRatingStyle = () => {
  return props.task.highlighted
    ? "color: #BECDA3; font-size: 0.875rem;"
    : "color: #BECDA3; font-size: clamp(0.8rem, 2.5vw, 0.9rem);"
}

const getRatingLabelStyle = () => {
  return props.task.highlighted
    ? "color: #8F8B82; font-size: 0.75rem;"
    : "color: #666; font-size: clamp(0.7rem, 2vw, 0.8rem);"
}

const getDetailsButtonStyle = () => {
  return props.task.highlighted
    ? "background: white; color: #474747; padding: 0.5rem 1rem; border-radius: 12px; border: 2px solid #e5e7eb; cursor: pointer; font-size: 0.875rem; transition: all 0.2s;"
    : "background: rgba(190, 205, 163, 0.3); color: #474747; padding: 0.5rem 1rem; border-radius: 0.5rem; border: 1px solid #BECDA3; cursor: pointer; font-size: clamp(0.7rem, 2vw, 0.8rem);"
}
</script>