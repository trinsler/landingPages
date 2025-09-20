import { ref, computed, watch, type Ref } from 'vue'

export function useLocalStorage<T>(
  key: string,
  defaultValue: T,
  serializer = JSON
): Ref<T> {
  const storedValue = ref<T>(defaultValue) as Ref<T>

  try {
    if (typeof window !== 'undefined') {
      const item = window.localStorage.getItem(key)
      if (item !== null) {
        storedValue.value = serializer.parse(item)
      }
    }
  } catch (error) {
    console.warn(`Error reading localStorage key "${key}":`, error)
  }

  watch(
    storedValue,
    (newValue) => {
      try {
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, serializer.stringify(newValue))
        }
      } catch (error) {
        console.warn(`Error setting localStorage key "${key}":`, error)
      }
    },
    { deep: true }
  )

  return storedValue
}

export function useSessionStorage<T>(
  key: string,
  defaultValue: T,
  serializer = JSON
): Ref<T> {
  const storedValue = ref<T>(defaultValue) as Ref<T>

  try {
    if (typeof window !== 'undefined') {
      const item = window.sessionStorage.getItem(key)
      if (item !== null) {
        storedValue.value = serializer.parse(item)
      }
    }
  } catch (error) {
    console.warn(`Error reading sessionStorage key "${key}":`, error)
  }

  watch(
    storedValue,
    (newValue) => {
      try {
        if (typeof window !== 'undefined') {
          window.sessionStorage.setItem(key, serializer.stringify(newValue))
        }
      } catch (error) {
        console.warn(`Error setting sessionStorage key "${key}":`, error)
      }
    },
    { deep: true }
  )

  return storedValue
}

// Note: useTheme has been moved to a dedicated file
// Import from './useTheme' instead of this file