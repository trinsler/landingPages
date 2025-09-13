export function calculateDiscount(
  originalPrice: number,
  discountPercent: number
): { discountedPrice: number; savedAmount: number } {
  const discountAmount = (originalPrice * discountPercent) / 100
  const discountedPrice = originalPrice - discountAmount

  return {
    discountedPrice: Math.max(0, discountedPrice),
    savedAmount: discountAmount
  }
}

export function calculateTax(
  amount: number,
  taxRate: number
): { taxAmount: number; totalWithTax: number } {
  const taxAmount = (amount * taxRate) / 100
  const totalWithTax = amount + taxAmount

  return {
    taxAmount,
    totalWithTax
  }
}