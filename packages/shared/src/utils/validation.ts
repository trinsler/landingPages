export function validatePaymentProvider(provider: string): boolean {
  const validProviders = ['stripe', 'paypal']
  return validProviders.includes(provider)
}

export function validateAmount(amount: number, currency: string = 'EUR'): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  if (amount <= 0) {
    errors.push('Amount must be greater than 0')
  }

  // Minimum amounts by currency
  const minimumAmounts: Record<string, number> = {
    USD: 0.50,
    EUR: 0.50,
    GBP: 0.30
  }

  const minimumAmount = minimumAmounts[currency.toUpperCase()] || 0.50
  if (amount < minimumAmount) {
    errors.push(`Amount must be at least ${minimumAmount} ${currency.toUpperCase()}`)
  }

  return {
    valid: errors.length === 0,
    errors
  }
}