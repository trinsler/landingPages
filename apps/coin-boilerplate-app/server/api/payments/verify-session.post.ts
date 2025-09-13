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

    // Check if this session has already been processed
    const { data: existingTransaction } = await supabase
      .from('transactions')
      .select('id')
      .eq('provider_payment_id', sessionId)
      .single()

    if (existingTransaction) {
      return {
        success: true,
        message: 'Payment already processed',
        coins: parseInt(session.metadata?.coins || '0')
      }
    }

    // Process the payment
    const coins = parseInt(session.metadata?.coins || '0')
    const amount = session.amount_total ? session.amount_total / 100 : 0

    // Start database transaction
    const { data: transaction, error: transactionError } = await supabase
      .from('transactions')
      .insert({
        user_id: user.id,
        type: 'purchase',
        amount: amount,
        coins: coins,
        status: 'completed',
        provider: 'stripe',
        provider_payment_id: sessionId,
        metadata: {
          stripe_session_id: sessionId,
          package_id: session.metadata?.package_id
        }
      })
      .select()
      .single()

    if (transactionError) {
      throw transactionError
    }

    // Update user coins
    const { error: updateError } = await supabase.rpc('increment_user_coins', {
      user_id_param: user.id,
      coins_to_add: coins
    })

    if (updateError) {
      // If coins update fails, mark transaction as failed
      await supabase
        .from('transactions')
        .update({ status: 'failed' })
        .eq('id', transaction.id)
      
      throw updateError
    }

    // Update payment session status
    if (session.metadata?.payment_session_id) {
      await supabase
        .from('payment_sessions')
        .update({ status: 'completed' })
        .eq('id', session.metadata.payment_session_id)
    }

    // Log audit trail
    await supabase
      .from('audit_logs')
      .insert({
        user_id: user.id,
        action: 'coin_purchase',
        resource_type: 'transaction',
        resource_id: transaction.id,
        new_values: {
          coins_added: coins,
          amount_paid: amount,
          provider: 'stripe'
        }
      })

    return {
      success: true,
      message: 'Payment processed successfully',
      coins: coins,
      transactionId: transaction.id
    }
  } catch (error) {
    console.error('Error verifying payment session:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to verify payment session'
    })
  }
})