// Common types used across all apps

export interface User {
  id: string
  email: string
  full_name: string
  avatar_url: string
  coins: number
  newsletter_subscribed: boolean
  created_at: string
  last_sign_in: string
}

export interface Transaction {
  id: string
  user_id: string
  type: 'purchase' | 'spend'
  amount: number
  coins: number
  status: 'pending' | 'completed' | 'failed'
  provider: 'stripe' | 'paypal'
  provider_payment_id: string
  created_at: string
}

export interface CoinPackage {
  id: string
  name: string
  coins: number
  price: number
  currency: string
  popular?: boolean
  description: string
}

// Flexible payment types (coins, products, subscriptions, courses)
export interface PaymentItem {
  id: string
  name: string
  description?: string
  type: 'coins' | 'product' | 'subscription' | 'course'
  price: number
  currency: string
  quantity?: number
  coins?: number // for coin packages
  metadata?: Record<string, any>
}

export interface PaymentConfig {
  stripe: {
    publicKey: string
    secretKey: string
    webhookSecret: string
  }
  currency: string
  successUrl: string
  cancelUrl: string
}

export interface PaymentSession {
  id: string
  package_id: string
  user_id: string
  status: 'created' | 'processing' | 'completed' | 'failed'
  provider: 'stripe' | 'paypal'
  provider_session_id: string
  created_at: string
}


// Toast types
export interface ToastOptions {
  title?: string
  message: string
  type?: 'success' | 'error' | 'warning' | 'info'
  duration?: number
  persistent?: boolean
}

export interface Toast {
  id: string
  title?: string
  message: string
  type: 'success' | 'error' | 'warning' | 'info'
  duration: number
  persistent: boolean
  timestamp: number
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}