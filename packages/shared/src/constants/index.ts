// Shared constants across all apps

export const TOAST_DEFAULTS = {
  duration: 5000,
  position: 'top-right',
  maxVisible: 5
} as const

export const EMAIL_VALIDATION = {
  minLength: 5,
  maxLength: 254,
  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
} as const

export const APP_CONFIG = {
  defaultLocale: 'de',
  supportedLocales: ['de', 'en'],
  defaultTheme: 'light',
  supportedThemes: ['light', 'dark']
} as const

export const API_ENDPOINTS = {
  auth: {
    login: '/api/auth/login',
    logout: '/api/auth/logout',
    callback: '/api/auth/callback'
  },
  payments: {
    createCheckout: '/api/payments/create-checkout',
    verifySession: '/api/payments/verify-session'
  },
  email: {
    subscribe: '/api/email/subscribe',
    unsubscribe: '/api/email/unsubscribe'
  }
} as const

export const SOCIAL_LINKS = {
  github: 'https://github.com/Nielshen',
  twitter: 'https://twitter.com/nielshen',
  linkedin: 'https://linkedin.com/in/nielshen'
} as const

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Netzwerkfehler. Bitte überprüfen Sie Ihre Internetverbindung.',
  UNAUTHORIZED: 'Ihre Sitzung ist abgelaufen. Bitte melden Sie sich erneut an.',
  SERVER_ERROR: 'Serverfehler. Bitte versuchen Sie es später erneut.',
  VALIDATION_ERROR: 'Eingabefehler. Bitte überprüfen Sie Ihre Angaben.',
  PAYMENT_FAILED: 'Zahlung fehlgeschlagen. Bitte versuchen Sie es erneut.'
} as const