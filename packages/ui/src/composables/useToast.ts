import { ref } from 'vue'
import type { ToastOptions, Toast } from '@monorepo/shared'
import { generateId } from '@monorepo/shared'

const toasts = ref<Toast[]>([])

export const useToast = () => {
  const show = (options: ToastOptions) => {
    const toast: Toast = {
      id: generateId(),
      title: options.title,
      message: options.message,
      type: options.type || 'info',
      duration: options.duration || 5000,
      persistent: options.persistent || false,
      timestamp: Date.now(),
    }

    toasts.value.push(toast)

    if (!toast.persistent) {
      setTimeout(() => {
        dismiss(toast.id)
      }, toast.duration)
    }

    return toast.id
  }

  const dismiss = (id: string) => {
    const index = toasts.value.findIndex((toast: Toast) => toast.id === id)
    if (index > -1) {
      toasts.value.splice(index, 1)
    }
  }

  const dismissAll = () => {
    toasts.value = []
  }

  const success = (message: string, title?: string, options?: Partial<ToastOptions>) => {
    return show({
      ...options,
      title,
      message,
      type: 'success',
    })
  }

  const error = (message: string, title?: string, options?: Partial<ToastOptions>) => {
    return show({
      ...options,
      title,
      message,
      type: 'error',
      duration: options?.duration || 7000, // Longer duration for errors
    })
  }

  const warning = (message: string, title?: string, options?: Partial<ToastOptions>) => {
    return show({
      ...options,
      title,
      message,
      type: 'warning',
    })
  }

  const info = (message: string, title?: string, options?: Partial<ToastOptions>) => {
    return show({
      ...options,
      title,
      message,
      type: 'info',
    })
  }

  return {
    toasts,
    show,
    dismiss,
    dismissAll,
    success,
    error,
    warning,
    info,
  }
}
