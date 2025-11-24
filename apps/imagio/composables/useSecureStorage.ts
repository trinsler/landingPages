import { ref, watch } from 'vue'
import { useInputValidation } from './useInputValidation'

export interface StorageOptions {
  encrypt?: boolean
  validateOnRead?: boolean
  maxAge?: number // in milliseconds
  compress?: boolean
}

export interface StorageItem<T = unknown> {
  value: T
  timestamp: number
  checksum?: string
  maxAge?: number
  version: string
}

// Simple encryption utilities (for basic obfuscation - NOT for sensitive data)
const simpleEncrypt = (text: string, key: string): string => {
  let result = ''
  for (let i = 0; i < text.length; i++) {
    const charCode = text.charCodeAt(i) ^ key.charCodeAt(i % key.length)
    result += String.fromCharCode(charCode)
  }
  return btoa(result)
}

const simpleDecrypt = (encryptedText: string, key: string): string => {
  try {
    const decoded = atob(encryptedText)
    let result = ''
    for (let i = 0; i < decoded.length; i++) {
      const charCode = decoded.charCodeAt(i) ^ key.charCodeAt(i % key.length)
      result += String.fromCharCode(charCode)
    }
    return result
  } catch {
    throw new Error('Failed to decrypt data')
  }
}

// Generate a simple checksum for data integrity
const generateChecksum = (data: string): string => {
  let hash = 0
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32-bit integer
  }
  return hash.toString(36)
}

export const useSecureStorage = () => {
  const { sanitizeInput, validateField, validationRules } = useInputValidation()
  
  // Default encryption key (in production, this should be environment-specific)
  const defaultKey = 'imagio_secure_key_v1_' + (typeof window !== 'undefined' ? window.location.hostname : 'server')
  
  // Storage key prefix for namespacing
  const keyPrefix = 'imagio_secure_'
  const currentVersion = '1.0'

  // Security configuration
  const securityConfig = {
    maxKeyLength: 100,
    maxValueSize: 1024 * 1024, // 1MB max
    allowedKeyPattern: /^[a-zA-Z0-9_\-\.]+$/,
    defaultMaxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  }

  const validateStorageKey = (key: string): boolean => {
    if (!key || typeof key !== 'string') return false
    if (key.length > securityConfig.maxKeyLength) return false
    if (!securityConfig.allowedKeyPattern.test(key)) return false
    return true
  }

  const validateStorageValue = (value: unknown): boolean => {
    try {
      const serialized = JSON.stringify(value)
      if (serialized.length > securityConfig.maxValueSize) return false
      return true
    } catch {
      return false
    }
  }

  const isStorageAvailable = (): boolean => {
    try {
      if (typeof window === 'undefined') return false
      const test = '__storage_test__'
      localStorage.setItem(test, 'test')
      localStorage.removeItem(test)
      return true
    } catch {
      return false
    }
  }

  const secureSet = <T>(
    key: string, 
    value: T, 
    options: StorageOptions = {}
  ): boolean => {
    try {
      // Validate inputs
      if (!validateStorageKey(key)) {
        console.warn('Invalid storage key:', key)
        return false
      }

      if (!validateStorageValue(value)) {
        console.warn('Invalid storage value for key:', key)
        return false
      }

      if (!isStorageAvailable()) {
        console.warn('Storage not available')
        return false
      }

      const {
        encrypt = false,
        maxAge = securityConfig.defaultMaxAge,
        compress = false
      } = options

      // Serialize the value
      let serialized = JSON.stringify(value)

      // Sanitize if it's a string
      if (typeof value === 'string') {
        const sanitized = sanitizeInput(value)
        serialized = JSON.stringify(sanitized)
      }

      // Compress if requested (simple implementation)
      if (compress && serialized.length > 1000) {
        // Basic compression simulation - in production use actual compression
        serialized = serialized.replace(/\s+/g, ' ')
      }

      // Create storage item
      const storageItem: StorageItem<T> = {
        value: JSON.parse(serialized) as T,
        timestamp: Date.now(),
        maxAge,
        version: currentVersion,
        checksum: generateChecksum(serialized)
      }

      let finalValue = JSON.stringify(storageItem)

      // Encrypt if requested
      if (encrypt) {
        finalValue = simpleEncrypt(finalValue, defaultKey)
      }

      // Store with prefixed key
      const prefixedKey = keyPrefix + key
      localStorage.setItem(prefixedKey, finalValue)

      return true
    } catch (error) {
      console.error('Failed to set secure storage:', error)
      return false
    }
  }

  const secureGet = <T>(
    key: string, 
    defaultValue: T | null = null,
    options: StorageOptions = {}
  ): T | null => {
    try {
      if (!validateStorageKey(key) || !isStorageAvailable()) {
        return defaultValue
      }

      const {
        encrypt = false,
        validateOnRead = true
      } = options

      const prefixedKey = keyPrefix + key
      let storedValue = localStorage.getItem(prefixedKey)

      if (!storedValue) {
        return defaultValue
      }

      // Decrypt if needed
      if (encrypt) {
        storedValue = simpleDecrypt(storedValue, defaultKey)
      }

      // Parse storage item
      const storageItem: StorageItem<T> = JSON.parse(storedValue)

      // Version check
      if (storageItem.version !== currentVersion) {
        console.warn('Storage version mismatch for key:', key)
        secureRemove(key)
        return defaultValue
      }

      // Check expiration
      if (storageItem.maxAge) {
        const age = Date.now() - storageItem.timestamp
        if (age > storageItem.maxAge) {
          secureRemove(key)
          return defaultValue
        }
      }

      // Verify data integrity
      if (storageItem.checksum) {
        const expectedChecksum = generateChecksum(JSON.stringify(storageItem.value))
        if (storageItem.checksum !== expectedChecksum) {
          console.warn('Storage checksum mismatch for key:', key)
          secureRemove(key)
          return defaultValue
        }
      }

      // Additional validation for string values
      if (validateOnRead && typeof storageItem.value === 'string') {
        const validation = validateField('storage_value', storageItem.value as string, [
          validationRules.noScripts(),
          validationRules.reasonableLength()
        ])

        if (!validation.isValid) {
          console.warn('Storage value validation failed for key:', key)
          secureRemove(key)
          return defaultValue
        }
      }

      return storageItem.value
    } catch (error) {
      console.error('Failed to get secure storage:', error)
      return defaultValue
    }
  }

  const secureRemove = (key: string): boolean => {
    try {
      if (!validateStorageKey(key) || !isStorageAvailable()) {
        return false
      }

      const prefixedKey = keyPrefix + key
      localStorage.removeItem(prefixedKey)
      return true
    } catch (error) {
      console.error('Failed to remove secure storage:', error)
      return false
    }
  }

  const secureClear = (): boolean => {
    try {
      if (!isStorageAvailable()) {
        return false
      }

      // Only remove our namespaced keys
      const keysToRemove: string[] = []
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key && key.startsWith(keyPrefix)) {
          keysToRemove.push(key)
        }
      }

      keysToRemove.forEach(key => localStorage.removeItem(key))
      return true
    } catch (error) {
      console.error('Failed to clear secure storage:', error)
      return false
    }
  }

  const secureKeys = (): string[] => {
    try {
      if (!isStorageAvailable()) {
        return []
      }

      const keys: string[] = []
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key && key.startsWith(keyPrefix)) {
          keys.push(key.replace(keyPrefix, ''))
        }
      }

      return keys
    } catch (error) {
      console.error('Failed to get secure storage keys:', error)
      return []
    }
  }

  const getStorageStats = () => {
    const keys = secureKeys()
    let totalSize = 0
    let validItems = 0
    let expiredItems = 0

    keys.forEach(key => {
      try {
        const prefixedKey = keyPrefix + key
        const value = localStorage.getItem(prefixedKey)
        if (value) {
          totalSize += value.length
          
          const storageItem: StorageItem = JSON.parse(value)
          if (storageItem.maxAge) {
            const age = Date.now() - storageItem.timestamp
            if (age > storageItem.maxAge) {
              expiredItems++
            } else {
              validItems++
            }
          } else {
            validItems++
          }
        }
      } catch {
        // Ignore invalid items
      }
    })

    return {
      totalKeys: keys.length,
      validItems,
      expiredItems,
      totalSize,
      totalSizeFormatted: `${(totalSize / 1024).toFixed(2)} KB`
    }
  }

  const cleanupExpiredItems = (): number => {
    const keys = secureKeys()
    let cleanedCount = 0

    keys.forEach(key => {
      try {
        const item = secureGet(key, null, { validateOnRead: false })
        if (item === null) {
          // Item was removed during get (expired or invalid)
          cleanedCount++
        }
      } catch {
        // Remove invalid items
        secureRemove(key)
        cleanedCount++
      }
    })

    return cleanedCount
  }

  // Reactive storage for Vue components
  const createReactiveStorage = <T>(
    key: string,
    defaultValue: T,
    options: StorageOptions = {}
  ) => {
    const value = ref<T>(secureGet(key, defaultValue, options) as T)

    // Watch for changes and persist
    watch(
      value,
      (newValue) => {
        secureSet(key, newValue, options)
      },
      { deep: true }
    )

    const setValue = (newValue: T) => {
      value.value = newValue
    }

    const reset = () => {
      value.value = defaultValue
      secureRemove(key)
    }

    return {
      value,
      setValue,
      reset
    }
  }

  return {
    // Core methods
    set: secureSet,
    get: secureGet,
    remove: secureRemove,
    clear: secureClear,
    keys: secureKeys,

    // Utility methods
    getStorageStats,
    cleanupExpiredItems,
    isStorageAvailable,

    // Reactive storage
    createReactiveStorage,

    // Configuration
    securityConfig
  }
}

// Commonly used secure storage instances
export const useUserPreferences = () => {
  const storage = useSecureStorage()
  
  return storage.createReactiveStorage('user_preferences', {
    language: 'en',
    theme: 'light',
    notifications: true,
    autoSave: true
  }, {
    encrypt: false,
    maxAge: 90 * 24 * 60 * 60 * 1000, // 90 days
    validateOnRead: true
  })
}

export const useSessionData = () => {
  const storage = useSecureStorage()
  
  return storage.createReactiveStorage('session_data', {
    currentScenario: '',
    lastActivity: Date.now(),
    examProgress: {}
  }, {
    encrypt: true,
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    validateOnRead: true
  })
}