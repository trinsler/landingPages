import Stripe from 'stripe'
import type { PaymentItem, PaymentConfig } from '../types'

export class StripePaymentService {
  private stripe: Stripe
  private config: PaymentConfig

  constructor(config: PaymentConfig) {
    if (!config.stripe?.secretKey) {
      throw new Error('Stripe secret key is required')
    }

    this.config = config
    this.stripe = new Stripe(config.stripe.secretKey, {
      apiVersion: '2024-06-20' as any
    })
  }

  // Flexible method for any payment item (coins, products, courses, etc.)
  async createCheckoutSession(
    userId: string,
    item: PaymentItem,
    options: {
      customerEmail?: string
      metadata?: Record<string, string>
      expiresInMinutes?: number
    } = {}
  ): Promise<{ url: string; sessionId: string }> {
    const { customerEmail, metadata = {}, expiresInMinutes = 30 } = options

    // Build line item based on type
    const lineItem: Stripe.Checkout.SessionCreateParams.LineItem = {
      price_data: {
        currency: item.currency.toLowerCase(),
        product_data: {
          name: item.name,
          description: item.description || '',
          metadata: {
            type: item.type,
            item_id: item.id,
            ...(item.coins && { coins: item.coins.toString() })
          }
        },
        unit_amount: Math.round(item.price * 100) // Convert to cents
      },
      quantity: item.quantity || 1
    }

    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [lineItem],
      mode: 'payment',
      success_url: `${this.config.successUrl}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: this.config.cancelUrl,
      customer_email: customerEmail,
      metadata: {
        user_id: userId,
        item_id: item.id,
        item_type: item.type,
        ...(item.coins && { coins: item.coins.toString() }),
        ...metadata
      },
      expires_at: Math.floor(Date.now() / 1000) + (expiresInMinutes * 60)
    })

    if (!session.url) {
      throw new Error('Failed to create Stripe session URL')
    }

    return {
      url: session.url,
      sessionId: session.id
    }
  }

  async retrieveSession(sessionId: string): Promise<Stripe.Checkout.Session> {
    return await this.stripe.checkout.sessions.retrieve(sessionId)
  }

  async verifyWebhook(
    payload: string,
    signature: string
  ): Promise<Stripe.Event> {
    if (!this.config.stripe?.webhookSecret) {
      throw new Error('Stripe webhook secret is required')
    }

    return this.stripe.webhooks.constructEvent(
      payload,
      signature,
      this.config.stripe.webhookSecret
    )
  }

  async createPaymentIntent(
    amount: number,
    currency: string = 'eur',
    metadata: Record<string, string> = {}
  ): Promise<Stripe.PaymentIntent> {
    return await this.stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: currency.toLowerCase(),
      metadata
    })
  }

  async refundPayment(
    paymentIntentId: string,
    amount?: number,
    reason?: 'duplicate' | 'fraudulent' | 'requested_by_customer'
  ): Promise<Stripe.Refund> {
    const params: Stripe.RefundCreateParams = {
      payment_intent: paymentIntentId
    }

    if (amount) {
      params.amount = Math.round(amount * 100)
    }

    if (reason) {
      params.reason = reason
    }

    return await this.stripe.refunds.create(params)
  }

  async listCustomerPayments(
    customerEmail: string,
    limit: number = 10
  ): Promise<Stripe.Checkout.Session[]> {
    const sessions = await this.stripe.checkout.sessions.list({
      customer_details: {
        email: customerEmail
      },
      limit
    })

    return sessions.data
  }
}