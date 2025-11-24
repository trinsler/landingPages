import { ref, computed } from 'vue'

// Input sanitization utilities
export const sanitizeInput = (input: string): string => {
  if (typeof input !== 'string') return ''
  
  return input
    // Remove potential XSS vectors
    .replace(/<script[^>]*>.*?<\/script>/gi, '')
    .replace(/<iframe[^>]*>.*?<\/iframe>/gi, '')
    .replace(/<object[^>]*>.*?<\/object>/gi, '')
    .replace(/<embed[^>]*>/gi, '')
    .replace(/<link[^>]*>/gi, '')
    .replace(/<meta[^>]*>/gi, '')
    // Remove javascript: and data: URLs
    .replace(/javascript:/gi, '')
    .replace(/data:(?!image\/(png|jpg|jpeg|gif|webp))/gi, '')
    // Remove on* event handlers
    .replace(/\s*on\w+\s*=\s*["'][^"']*["']/gi, '')
    // Limit length
    .slice(0, 10000)
    // Trim whitespace
    .trim()
}

export const sanitizeHTML = (html: string): string => {
  if (typeof html !== 'string') return ''
  
  // Allowlist of safe HTML tags and attributes
  const allowedTags = new Set(['p', 'br', 'strong', 'em', 'b', 'i', 'u', 'ul', 'ol', 'li', 'blockquote'])
  const allowedAttributes = new Set(['class', 'id'])
  
  return html
    .replace(/<(\/?[a-zA-Z][a-zA-Z0-9]*)[^>]*>/g, (match, tagWithSlash) => {
      const tag = tagWithSlash.replace('/', '').toLowerCase()
      
      if (!allowedTags.has(tag)) {
        return '' // Remove disallowed tags
      }
      
      // For allowed tags, clean attributes
      return match.replace(/(\w+)=["']([^"']*)["']/g, (attrMatch, attrName, attrValue) => {
        if (allowedAttributes.has(attrName.toLowerCase())) {
          return `${attrName}="${sanitizeInput(attrValue)}"`
        }
        return '' // Remove disallowed attributes
      })
    })
    .slice(0, 50000)
}

// Validation rules
export interface ValidationRule {
  rule: (value: string) => boolean
  message: string
  severity: 'error' | 'warning'
}

export const validationRules = {
  required: (message: string = 'Dieses Feld ist erforderlich'): ValidationRule => ({
    rule: (value: string) => Boolean(value && value.trim().length > 0),
    message,
    severity: 'error'
  }),

  minLength: (min: number, message?: string): ValidationRule => ({
    rule: (value: string) => value.length >= min,
    message: message || `Mindestens ${min} Zeichen erforderlich`,
    severity: 'error'
  }),

  maxLength: (max: number, message?: string): ValidationRule => ({
    rule: (value: string) => value.length <= max,
    message: message || `Maximal ${max} Zeichen erlaubt`,
    severity: 'error'
  }),

  email: (message: string = 'Ungültige E-Mail-Adresse'): ValidationRule => ({
    rule: (value: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(value)
    },
    message,
    severity: 'error'
  }),

  alphanumeric: (message: string = 'Nur Buchstaben und Zahlen erlaubt'): ValidationRule => ({
    rule: (value: string) => /^[a-zA-Z0-9äöüÄÖÜß\s]*$/.test(value),
    message,
    severity: 'error'
  }),

  noSpecialChars: (message: string = 'Sonderzeichen nicht erlaubt'): ValidationRule => ({
    rule: (value: string) => /^[a-zA-Z0-9äöüÄÖÜß\s\-_.,!?]*$/.test(value),
    message,
    severity: 'error'
  }),

  scenarioCode: (message: string = 'Ungültiger Szenario-Code'): ValidationRule => ({
    rule: (value: string) => /^[A-Z0-9]{3,10}$/.test(value.toUpperCase()),
    message,
    severity: 'error'
  }),

  noScripts: (message: string = 'Sicherheitsverletzung erkannt'): ValidationRule => ({
    rule: (value: string) => !/<script|javascript:|data:(?!image)/i.test(value),
    message,
    severity: 'error'
  }),

  reasonableLength: (message: string = 'Text ist zu lang'): ValidationRule => ({
    rule: (value: string) => value.length <= 5000,
    message,
    severity: 'warning'
  }),

  customPattern: (pattern: RegExp, message: string): ValidationRule => ({
    rule: (value: string) => pattern.test(value),
    message,
    severity: 'error'
  })
}

export interface ValidationResult {
  isValid: boolean
  errors: string[]
  warnings: string[]
  sanitizedValue: string
}

export const useInputValidation = () => {
  const validate = (
    value: string, 
    rules: ValidationRule[] = [],
    sanitize: boolean = true
  ): ValidationResult => {
    // Sanitize input first
    const sanitizedValue = sanitize ? sanitizeInput(value) : value
    
    const errors: string[] = []
    const warnings: string[] = []

    // Always check for security issues
    const securityRules = [
      validationRules.noScripts(),
      validationRules.reasonableLength()
    ]

    const allRules = [...securityRules, ...rules]

    for (const rule of allRules) {
      if (!rule.rule(sanitizedValue)) {
        if (rule.severity === 'error') {
          errors.push(rule.message)
        } else {
          warnings.push(rule.message)
        }
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      sanitizedValue
    }
  }

  const validateField = (
    fieldName: string,
    value: string,
    rules: ValidationRule[] = []
  ) => {
    const result = validate(value, rules)
    
    // Log validation attempts for security monitoring
    if (!result.isValid) {
      console.warn(`Validation failed for field "${fieldName}":`, {
        errors: result.errors,
        originalValue: value.substring(0, 100), // Only log first 100 chars
        sanitizedValue: result.sanitizedValue.substring(0, 100),
        timestamp: new Date().toISOString()
      })
    }

    return result
  }

  // Commonly used validation sets
  const validateScenarioCode = (code: string) => validateField(
    'scenarioCode',
    code,
    [
      validationRules.required(),
      validationRules.minLength(3),
      validationRules.maxLength(10),
      validationRules.scenarioCode()
    ]
  )

  const validateAnswer = (answer: string) => validateField(
    'answer',
    answer,
    [
      validationRules.required('Bitte geben Sie eine Antwort ein'),
      validationRules.minLength(10, 'Antwort zu kurz (mindestens 10 Zeichen)'),
      validationRules.maxLength(2000, 'Antwort zu lang (maximal 2000 Zeichen)'),
      validationRules.noSpecialChars()
    ]
  )

  const validateEmail = (email: string) => validateField(
    'email',
    email,
    [
      validationRules.required(),
      validationRules.email(),
      validationRules.maxLength(254)
    ]
  )

  const validateUsername = (username: string) => validateField(
    'username',
    username,
    [
      validationRules.required(),
      validationRules.minLength(3),
      validationRules.maxLength(50),
      validationRules.alphanumeric()
    ]
  )

  const validateText = (text: string, maxLength: number = 1000) => validateField(
    'text',
    text,
    [
      validationRules.required(),
      validationRules.maxLength(maxLength),
      validationRules.noSpecialChars()
    ]
  )

  // Real-time validation for Vue components
  const createFieldValidator = (rules: ValidationRule[] = []) => {
    const value = ref('')
    const errors = ref<string[]>([])
    const warnings = ref<string[]>([])
    const isValid = computed(() => errors.value.length === 0)
    const sanitizedValue = ref('')

    const validateValue = () => {
      const result = validate(value.value, rules)
      errors.value = result.errors
      warnings.value = result.warnings
      sanitizedValue.value = result.sanitizedValue
      return result
    }

    const setValue = (newValue: string) => {
      value.value = newValue
      validateValue()
    }

    const clearValidation = () => {
      errors.value = []
      warnings.value = []
    }

    return {
      value,
      sanitizedValue: computed(() => sanitizedValue.value),
      errors: computed(() => errors.value),
      warnings: computed(() => warnings.value),
      isValid,
      setValue,
      validateValue,
      clearValidation
    }
  }

  return {
    sanitizeInput,
    sanitizeHTML,
    validate,
    validateField,
    validateScenarioCode,
    validateAnswer,
    validateEmail,
    validateUsername,
    validateText,
    createFieldValidator,
    validationRules
  }
}

// Security monitoring and logging
export const useSecurityMonitor = () => {
  const suspiciousPatterns = [
    /<script/i,
    /javascript:/i,
    /data:(?!image)/i,
    /vbscript:/i,
    /onload/i,
    /onerror/i,
    /onclick/i,
    /eval\(/i,
    /document\.write/i,
    /window\.location/i,
    /alert\(/i,
    /confirm\(/i,
    /prompt\(/i
  ]

  const logSecurityEvent = (
    eventType: 'XSS_ATTEMPT' | 'INJECTION_ATTEMPT' | 'SUSPICIOUS_INPUT',
    data: {
      input: string
      fieldName?: string
      userAgent?: string
      timestamp?: Date
    }
  ) => {
    const event = {
      type: eventType,
      input: data.input.substring(0, 500), // Truncate for logging
      fieldName: data.fieldName || 'unknown',
      userAgent: data.userAgent || (typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown'),
      timestamp: data.timestamp || new Date(),
      sessionId: getSessionId()
    }

    // Log to console for debugging
    console.warn('Security Event:', event)

    // In production, send to security monitoring service
    // sendToSecurityService(event)
  }

  const getSessionId = (): string => {
    if (typeof window === 'undefined') return 'server'
    
    let sessionId = sessionStorage.getItem('security-session-id')
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      sessionStorage.setItem('security-session-id', sessionId)
    }
    return sessionId
  }

  const checkForSuspiciousInput = (input: string, fieldName?: string) => {
    const foundPatterns = suspiciousPatterns.filter(pattern => pattern.test(input))
    
    if (foundPatterns.length > 0) {
      logSecurityEvent('SUSPICIOUS_INPUT', {
        input,
        fieldName
      })
      return true
    }
    
    return false
  }

  return {
    logSecurityEvent,
    checkForSuspiciousInput,
    getSessionId
  }
}