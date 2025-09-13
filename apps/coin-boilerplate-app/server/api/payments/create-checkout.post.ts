import Stripe from 'stripe'
import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { packageId, provider = 'stripe' } = body

  if (!packageId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Package ID is required'
    })
  }

  const user = await serverSupabaseUser(event)
  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Authentication required'
    })
  }

  const config = useRuntimeConfig()
  
  if (provider !== 'stripe') {
    throw createError({
      statusCode: 400,
      statusMessage: 'Only Stripe provider is currently supported'
    })
  }

  const stripe = new Stripe(config.stripeSecretKey, {
    apiVersion: '2024-06-20' as any
  })

  // Define coin packages - Server-side validation
  const packages = {
    'coin_pack_100': { coins: 100, price: 99, name: '100 Coins' },
    'coin_pack_1000': { coins: 1000, price: 499, name: '1000 Coins' },
    'coin_pack_5000': { coins: 5000, price: 1999, name: '5000 Coins' },
    'coin_pack_10000': { coins: 10000, price: 3499, name: '10000 Coins' }
  } as const

  // Validate package ID against server-side whitelist
  const allowedPackageIds = Object.keys(packages)
  if (!allowedPackageIds.includes(packageId)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid package ID'
    })
  }

  const selectedPackage = packages[packageId as keyof typeof packages]

  // Double-check package data integrity
  if (!selectedPackage || typeof selectedPackage.coins !== 'number' || typeof selectedPackage.price !== 'number') {
    throw createError({
      statusCode: 500,
      statusMessage: 'Package data corruption detected'
    })
  }

  try {
    const supabase = await serverSupabaseClient(event)

    // Rate limiting: Check recent payment sessions for this user
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString()
    const { data: recentSessions, error: rateLimitError } = await supabase
      .from('payment_sessions')
      .select('id')
      .eq('user_id', user.id)
      .gte('created_at', fiveMinutesAgo)

    if (rateLimitError) {
      console.error('Rate limit check failed:', rateLimitError)
    } else if (recentSessions && recentSessions.length >= 3) {
      throw createError({
        statusCode: 429,
        statusMessage: 'Too many payment attempts. Please wait 5 minutes.'
      })
    }

    // Generate temporary unique ID for payment session
    const tempSessionId = `temp_${Date.now()}_${Math.random().toString(36).substring(2)}`

    // Create payment session record
    const { data: paymentSession, error: sessionError } = await supabase
      .from('payment_sessions')
      .insert({
        user_id: user.id,
        package_id: packageId,
        provider: 'stripe',
        provider_session_id: tempSessionId, // Temporary unique ID
        amount: selectedPackage.price / 100, // Convert cents to euros
        coins: selectedPackage.coins,
        status: 'created'
      })
      .select()
      .single()

    if (sessionError) {
      throw sessionError
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: selectedPackage.name,
              description: `${selectedPackage.coins} digital coins`,
              images: [], // Add coin image URL if available
            },
            unit_amount: selectedPackage.price,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${config.public.siteUrl}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${config.public.siteUrl}/shop`,
      customer_email: user.email,
      metadata: {
        user_id: user.id,
        package_id: packageId,
        coins: selectedPackage.coins.toString(),
        payment_session_id: paymentSession.id
      },
      expires_at: Math.floor(Date.now() / 1000) + (30 * 60), // 30 minutes
    })

    // Update payment session with Stripe session ID
    const { error: updateError } = await supabase
      .from('payment_sessions')
      .update({
        provider_session_id: session.id,
        status: 'created'
      })
      .eq('id', paymentSession.id)

    if (updateError) {
      console.error('Error updating payment session:', updateError)
    }

    return {
      url: session.url,
      sessionId: session.id,
      paymentSessionId: paymentSession.id
    }
  } catch (error) {
    console.error('Error creating checkout session:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create checkout session'
    })
  }
})