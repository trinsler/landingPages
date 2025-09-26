import { ref } from 'vue'

export interface Toast {
  id: string
  message: string
  type: 'success' | 'error' | 'info' | 'warning'
  duration?: number
}

const toasts = ref<Toast[]>([])

export const useToast = () => {
  const addToast = (message: string, type: Toast['type'] = 'info', duration = 5000) => {
    const id = Math.random().toString(36).substr(2, 9)
    const toast: Toast = { id, message, type, duration }

    toasts.value.push(toast)

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id)
      }, duration)
    }

    return id
  }

  const removeToast = (id: string) => {
    const index = toasts.value.findIndex(toast => toast.id === id)
    if (index > -1) {
      toasts.value.splice(index, 1)
    }
  }

  const success = (message: string, title?: string) => {
    const fullMessage = title ? `${title}: ${message}` : message
    return addToast(fullMessage, 'success')
  }

  const error = (message: string, title?: string) => {
    const fullMessage = title ? `${title}: ${message}` : message
    return addToast(fullMessage, 'error')
  }

  const info = (message: string, title?: string) => {
    const fullMessage = title ? `${title}: ${message}` : message
    return addToast(fullMessage, 'info')
  }

  const warning = (message: string, title?: string) => {
    const fullMessage = title ? `${title}: ${message}` : message
    return addToast(fullMessage, 'warning')
  }

  return {
    toasts: readonly(toasts),
    addToast,
    removeToast,
    success,
    error,
    info,
    warning
  }
}