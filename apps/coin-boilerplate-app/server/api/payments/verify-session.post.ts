import Stripe from 'stripe'
import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { sessionId } = body

  if (!sessionId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Session ID is required'
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
  const stripe = new Stripe(config.stripeSecretKey, {
    apiVersion: '2024-06-20' as any
  })

  try {
    const supabase = await serverSupabaseClient(event)
    
    // Retrieve Stripe session
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    
    if (session.payment_status !== 'paid') {
      throw createError({
        statusCode: 400,
        statusMessage: 'Payment not completed'
      })
    }

    // Verify the session belongs to the authenticated user
    if (session.metadata?.user_id !== user.id) {
      throw createError({
        statusCode: 403,
        statusMessage: 'Unauthorized access to session'
      })
    }

    // Only check if webhook has processed the payment - don't process here
    const { data: existingTransaction } = await supabase
      .from('transactions')
      .select('*')
      .eq('provider_payment_id', sessionId)
      .single()

    if (existingTransaction) {
      // Webhook already processed - return success
      return {
        success: true,
        message: 'Payment processed successfully',
        coins: existingTransaction.coins,
        transactionId: existingTransaction.id
      }
    }

    // Webhook hasn't processed yet - return pending status
    return {
      success: false,
      message: 'Payment verification in progress. Webhook will process this payment.',
      pending: true,
      coins: parseInt(session.metadata?.coins || '0')
    }
  } catch (error) {
    console.error('Error verifying payment session:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to verify payment session'
    })
  }
})