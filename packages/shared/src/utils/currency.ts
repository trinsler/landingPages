export function formatCurrency(
  amount: number,
  currency: string = 'EUR',
  locale: string = 'de-DE'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency.toUpperCase(),
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount)
}

export function convertToCents(amount: number): number {
  return Math.round(amount * 100)
}

export function convertFromCents(amountInCents: number): number {
  return amountInCents / 100
}