/// <reference types="https://deno.land/types/deploy/stable/index.d.ts" />
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

const supabase = createClient(supabaseUrl, supabaseServiceKey)

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

interface CreateCheckoutRequest {
  packageId: string
  provider?: string
}

serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  if (req.method !== 'POST') {
    return new Response('Method not allowed', {
      status: 405,
      headers: corsHeaders
    })
  }

  try {
    // Get authorization header
    const authHeader = req.headers.get('authorization')
    if (!authHeader) {
      return new Response('Authorization required', {
        status: 401,
        headers: corsHeaders
      })
    }

    // Verify user with Supabase
    const token = authHeader.replace('Bearer ', '')
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)

    if (authError || !user) {
      return new Response('Invalid token', {
        status: 401,
        headers: corsHeaders
      })
    }

    const body: CreateCheckoutRequest = await req.json()
    const { packageId, provider = 'stripe' } = body

    if (!packageId) {
      return new Response('Package ID is required', {
        status: 400,
        headers: corsHeaders
      })
    }

    if (provider !== 'stripe') {
      return new Response('Only Stripe provider is currently supported', {
        status: 400,
        headers: corsHeaders
      })
    }

    // Define coin packages - Server-side validation
    const packages = {
      'coin_pack_100': { coins: 100, price: 99, name: '100 Coins' },
      'coin_pack_1000': { coins: 1000, price: 499, name: '1000 Coins' },
      'coin_pack_5000': { coins: 5000, price: 1999, name: '5000 Coins' },
      'coin_pack_10000': { coins: 10000, price: 3499, name: '10000 Coins' }
    } as const

    const selectedPackage = packages[packageId as keyof typeof packages]
    if (!selectedPackage) {
      return new Response('Invalid package ID', {
        status: 400,
        headers: corsHeaders
      })
    }

    // Create payment session record for tracking
    const { data: paymentSession, error: sessionError } = await supabase
      .from('payment_sessions')
      .insert({
        user_id: user.id,
        package_id: packageId,
        provider: provider,
        amount: selectedPackage.price,
        coins: selectedPackage.coins,
        status: 'created'
      })
      .select()
      .single()

    if (sessionError) {
      console.error('Error creating payment session:', sessionError)
      return new Response('Failed to create payment session', {
        status: 500,
        headers: corsHeaders
      })
    }

    try {
      // Create Stripe checkout session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'eur',
              product_data: {
                name: selectedPackage.name,
                description: `Get ${selectedPackage.coins} coins for your account`,
                images: ['https://via.placeholder.com/300x200.png?text=Coins']
              },
              unit_amount: selectedPackage.price
            },
            quantity: 1
          }
        ],
        mode: 'payment',
        success_url: `${req.headers.get('origin') || 'http://localhost:3000'}${req.headers.get('origin')?.includes('github.io') ? '/landingPages' : ''}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.get('origin') || 'http://localhost:3000'}${req.headers.get('origin')?.includes('github.io') ? '/landingPages' : ''}/payment/cancelled`,
        customer_email: user.email || undefined,
        metadata: {
          user_id: user.id,
          package_id: packageId,
          coins: selectedPackage.coins.toString(),
          payment_session_id: paymentSession.id
        }
      })

      // Update payment session with Stripe session ID
      await supabase
        .from('payment_sessions')
        .update({
          provider_session_id: session.id,
          checkout_url: session.url
        })
        .eq('id', paymentSession.id)

      // Create audit log
      await supabase
        .from('audit_logs')
        .insert({
          user_id: user.id,
          action: 'checkout_session_created',
          resource_type: 'payment_session',
          resource_id: paymentSession.id,
          new_values: {
            package_id: packageId,
            amount: selectedPackage.price,
            coins: selectedPackage.coins,
            provider: provider,
            stripe_session_id: session.id
          }
        })

      return new Response(JSON.stringify({
        sessionId: session.id,
        checkoutUrl: session.url,
        paymentSessionId: paymentSession.id
      }), {
        status: 200,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      })

    } catch (stripeError) {
      console.error('Stripe error:', stripeError)

      // Mark payment session as failed
      await supabase
        .from('payment_sessions')
        .update({ status: 'failed' })
        .eq('id', paymentSession.id)

      return new Response('Failed to create checkout session', {
        status: 500,
        headers: corsHeaders
      })
    }

  } catch (error) {
    console.error('Error in create-checkout:', error)
    return new Response('Internal server error', {
      status: 500,
      headers: corsHeaders
    })
  }
})