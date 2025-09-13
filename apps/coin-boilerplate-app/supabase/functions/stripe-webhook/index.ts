/// <reference lib="deno.ns" />
/// <reference types="https://esm.sh/@supabase/supabase-js@2" />
/// <reference types="https://esm.sh/stripe@14.21.0" />

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Stripe from 'https://esm.sh/stripe@14.21.0'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') ?? '', {
  apiVersion: '2024-06-20',
})

const supabaseUrl = Deno.env.get('SUPABASE_URL')!
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET')!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

interface WebhookEvent {
  type: string
  data: {
    object: Stripe.Checkout.Session
  }
}

serve(async (req: Request) => {
  const signature = req.headers.get('stripe-signature')
  
  if (!signature) {
    return new Response('No signature', { status: 400 })
  }

  try {
    const body = await req.text()
    const event = await stripe.webhooks.constructEventAsync(body, signature, webhookSecret) as WebhookEvent

    console.log(`Received event: ${event.type}`)

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object

      console.log(`Processing checkout session: ${session.id}`)

      // Verify payment status
      if (session.payment_status !== 'paid') {
        console.log(`Payment not completed for session: ${session.id}`)
        return new Response('Payment not completed', { status: 400 })
      }

      const userId = session.metadata?.user_id
      const packageId = session.metadata?.package_id
      const coins = parseInt(session.metadata?.coins || '0')
      const paymentSessionId = session.metadata?.payment_session_id

      if (!userId || !packageId || !coins) {
        console.error('Missing required metadata:', { userId, packageId, coins })
        return new Response('Missing metadata', { status: 400 })
      }

      // Check if transaction already exists (idempotency)
      const { data: existingTransaction } = await supabase
        .from('transactions')
        .select('id')
        .eq('provider_payment_id', session.id)
        .single()

      if (existingTransaction) {
        console.log(`Transaction already processed for session: ${session.id}`)
        return new Response('Already processed', { status: 200 })
      }

      // Start processing the transaction
      try {
        const amount = session.amount_total ? session.amount_total / 100 : 0

        // Create transaction record
        const { data: transaction, error: transactionError } = await supabase
          .from('transactions')
          .insert({
            user_id: userId,
            type: 'purchase',
            amount: amount,
            coins: coins,
            status: 'completed',
            provider: 'stripe',
            provider_payment_id: session.id,
            metadata: {
              stripe_session_id: session.id,
              package_id: packageId,
              customer_email: session.customer_email
            }
          })
          .select()
          .single()

        if (transactionError) {
          console.error('Error creating transaction:', transactionError)
          throw transactionError
        }

        // Update user coins using the RPC function
        const { error: coinsError } = await supabase.rpc('increment_user_coins', {
          user_id_param: userId,
          coins_to_add: coins
        })

        if (coinsError) {
          console.error('Error updating user coins:', coinsError)
          
          // Mark transaction as failed
          await supabase
            .from('transactions')
            .update({ status: 'failed' })
            .eq('id', transaction.id)
          
          throw coinsError
        }

        // Update payment session status if provided
        if (paymentSessionId) {
          const { error: sessionError } = await supabase
            .from('payment_sessions')
            .update({ status: 'completed' })
            .eq('id', paymentSessionId)

          if (sessionError) {
            console.error('Error updating payment session:', sessionError)
          }
        }

        // Create audit log
        const { error: auditError } = await supabase
          .from('audit_logs')
          .insert({
            user_id: userId,
            action: 'webhook_coin_purchase',
            resource_type: 'transaction',
            resource_id: transaction.id,
            new_values: {
              coins_added: coins,
              amount_paid: amount,
              provider: 'stripe',
              webhook_event_type: event.type,
              stripe_session_id: session.id
            }
          })

        if (auditError) {
          console.error('Error creating audit log:', auditError)
        }

        console.log(`Successfully processed payment for user ${userId}: +${coins} coins`)
        
        return new Response(JSON.stringify({ 
          success: true, 
          transaction_id: transaction.id,
          coins_added: coins
        }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        })

      } catch (error) {
        console.error('Error processing webhook:', error)
        
        // Log failed webhook attempt
        await supabase
          .from('audit_logs')
          .insert({
            user_id: userId,
            action: 'webhook_processing_failed',
            resource_type: 'stripe_webhook',
            new_values: {
              error_message: error instanceof Error ? error.message : 'Unknown error',
              session_id: session.id,
              event_type: event.type
            }
          })

        return new Response(JSON.stringify({ 
          error: 'Processing failed', 
          message: error instanceof Error ? error.message : 'Unknown error'
        }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        })
      }
    }

    // Handle other event types
    if (event.type === 'checkout.session.expired') {
      const session = event.data.object
      const paymentSessionId = session.metadata?.payment_session_id

      if (paymentSessionId) {
        await supabase
          .from('payment_sessions')
          .update({ status: 'failed' })
          .eq('id', paymentSessionId)
      }

      console.log(`Session expired: ${session.id}`)
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })

  } catch (error) {
    console.error('Webhook error:', error)
    return new Response(JSON.stringify({ 
      error: 'Webhook processing failed',
      message: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    })
  }
})