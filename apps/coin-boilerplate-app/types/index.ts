// Re-export types from shared package
export type {
  User,
  Transaction,
  CoinPackage,
  PaymentSession,
  Toast,
  ToastOptions,
  ApiResponse,
  PaginatedResponse
} from '@monorepo/shared'

// App-specific types (if any)
export interface AppConfig {
  name: string
  version: string
  features: {
    emailSubscription: boolean
    coinSystem: boolean
    payments: boolean
  }
}