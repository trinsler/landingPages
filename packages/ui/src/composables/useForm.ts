import { ref, computed, watch, type Ref } from 'vue'

export interface ValidationRule<T = string | number | boolean> {
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  custom?: (value: T) => string | null
  message?: string
}

export interface FieldConfig<T = string | number | boolean> {
  value: T
  rules?: ValidationRule<T>[]
  touched?: boolean
  dirty?: boolean
}

export interface FormField<T = string | number | boolean> {
  value: Ref<T>
  error: Ref<string | null>
  touched: Ref<boolean>
  dirty: Ref<boolean>
  isValid: Ref<boolean>
  validate: () => boolean
  touch: () => void
  reset: () => void
}

export interface FormState {
  isValid: Ref<boolean>
  isSubmitting: Ref<boolean>
  hasErrors: Ref<boolean>
  isDirty: Ref<boolean>
  errors: Ref<Record<string, string | null>>
  validate: () => boolean
  reset: () => void
  submit: <T>(handler: () => Promise<T>) => Promise<T | null>
}

export function useField<T>(config: FieldConfig<T>): FormField<T> {
  const value = ref<T>(config.value) as Ref<T>
  const error = ref<string | null>(null)
  const touched = ref(config.touched || false)
  const dirty = ref(config.dirty || false)
  const initialValue = config.value

  const isValid = computed(() => error.value === null)

  const validate = (): boolean => {
    if (!config.rules) {
      error.value = null
      return true
    }

    for (const rule of config.rules) {
      // Required validation
      if (
        rule.required &&
        (!value.value || (typeof value.value === 'string' && value.value.trim() === ''))
      ) {
        error.value = rule.message || 'This field is required'
        return false
      }

      // Skip other validations if value is empty and not required
      if (!value.value && !rule.required) continue

      // String validations
      if (typeof value.value === 'string') {
        if (rule.minLength && value.value.length < rule.minLength) {
          error.value = rule.message || `Minimum ${rule.minLength} characters required`
          return false
        }

        if (rule.maxLength && value.value.length > rule.maxLength) {
          error.value = rule.message || `Maximum ${rule.maxLength} characters allowed`
          return false
        }

        if (rule.pattern && !rule.pattern.test(value.value)) {
          error.value = rule.message || 'Invalid format'
          return false
        }
      }

      // Custom validation
      if (rule.custom) {
        const customError = rule.custom(value.value)
        if (customError) {
          error.value = customError
          return false
        }
      }
    }

    error.value = null
    return true
  }

  const touch = () => {
    touched.value = true
    validate()
  }

  const reset = () => {
    value.value = initialValue
    error.value = null
    touched.value = false
    dirty.value = false
  }

  // Watch for changes to mark field as dirty
  watch(value, () => {
    dirty.value = true
    if (touched.value) {
      validate()
    }
  })

  return {
    value,
    error,
    touched,
    dirty,
    isValid,
    validate,
    touch,
    reset,
  }
}

export function useForm(fields: Record<string, FormField>): FormState {
  const isSubmitting = ref(false)

  const isValid = computed(() => {
    return Object.values(fields).every(field => field.isValid.value)
  })

  const hasErrors = computed(() => {
    return Object.values(fields).some(field => field.error.value !== null)
  })

  const isDirty = computed(() => {
    return Object.values(fields).some(field => field.dirty.value)
  })

  const errors = computed(() => {
    const result: Record<string, string | null> = {}
    Object.entries(fields).forEach(([key, field]) => {
      result[key] = field.error.value
    })
    return result
  })

  const validate = (): boolean => {
    let formIsValid = true
    Object.values(fields).forEach(field => {
      field.touch()
      if (!field.validate()) {
        formIsValid = false
      }
    })
    return formIsValid
  }

  const reset = () => {
    Object.values(fields).forEach(field => field.reset())
  }

  const submit = async <T>(handler: () => Promise<T>): Promise<T | null> => {
    if (!validate()) {
      return null
    }

    isSubmitting.value = true
    try {
      const result = await handler()
      reset()
      return result
    } catch (error) {
      console.error('Form submission error:', error)
      throw error
    } finally {
      isSubmitting.value = false
    }
  }

  return {
    isValid,
    isSubmitting,
    hasErrors,
    isDirty,
    errors,
    validate,
    reset,
    submit,
  }
}

// Common validation rules
export const validators = {
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Please enter a valid email address',
  },

  phone: {
    pattern: /^[+]?[\d\s\-()]+$/,
    message: 'Please enter a valid phone number',
  },

  url: {
    pattern: /^https?:\/\/.+/,
    message: 'Please enter a valid URL',
  },

  strongPassword: {
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    message:
      'Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character',
  },
}
