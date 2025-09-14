import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

interface UnsubscribeRequest {
  email?: string
  token?: string
  reason?: string
}

const supabaseUrl = Deno.env.get('SUPABASE_URL')!
const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!

serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseAnonKey)

    // Handle GET request (unsubscribe via link)
    if (req.method === 'GET') {
      const url = new URL(req.url)
      const token = url.searchParams.get('token')
      const email = url.searchParams.get('email')

      if (!token && !email) {
        return new Response(
          JSON.stringify({
            success: false,
            error: 'E-Mail-Adresse oder Token ist erforderlich'
          }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      let query = supabase.from('email_subscriptions').select('*')

      if (token) {
        // Unsubscribe via token (more secure)
        query = query.eq('confirmation_token', token)
      } else if (email) {
        // Unsubscribe via email
        query = query.eq('email', email.toLowerCase())
      }

      const { data: subscription, error: findError } = await query.single()

      if (findError || !subscription) {
        return new Response(
          JSON.stringify({
            success: false,
            error: 'Abonnement nicht gefunden'
          }),
          { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      // Check if already unsubscribed
      if (subscription.status === 'unsubscribed') {
        return new Response(
          JSON.stringify({
            success: true,
            message: 'Sie sind bereits vom Newsletter abgemeldet.',
            alreadyUnsubscribed: true
          }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      // Unsubscribe
      const { error: updateError } = await supabase
        .from('email_subscriptions')
        .update({
          status: 'unsubscribed',
          unsubscribed_at: new Date().toISOString(),
          metadata: {
            ...subscription.metadata,
            unsubscribe_reason: 'Link clicked',
            unsubscribe_method: token ? 'token' : 'email'
          }
        })
        .eq('id', subscription.id)

      if (updateError) throw updateError

      return new Response(
        JSON.stringify({
          success: true,
          message: 'Sie wurden erfolgreich vom Newsletter abgemeldet.'
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Handle POST request (unsubscribe via form)
    if (req.method === 'POST') {
      const { email, token, reason = 'User requested' }: UnsubscribeRequest = await req.json()

      if (!email && !token) {
        return new Response(
          JSON.stringify({
            success: false,
            error: 'E-Mail-Adresse oder Token ist erforderlich'
          }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      let query = supabase.from('email_subscriptions').select('*')

      if (token) {
        query = query.eq('confirmation_token', token)
      } else if (email) {
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
          return new Response(
            JSON.stringify({ success: false, error: 'Ungültiges E-Mail-Format' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
        }
        query = query.eq('email', email.toLowerCase())
      }

      const { data: subscription, error: findError } = await query.single()

      if (findError || !subscription) {
        // Don't reveal if email exists or not for privacy
        return new Response(
          JSON.stringify({
            success: true,
            message: 'Falls diese E-Mail-Adresse in unserem System vorhanden war, wurde sie erfolgreich abgemeldet.'
          }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      // Check if already unsubscribed
      if (subscription.status === 'unsubscribed') {
        return new Response(
          JSON.stringify({
            success: true,
            message: 'Sie sind bereits vom Newsletter abgemeldet.'
          }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      // Unsubscribe
      const { error: updateError } = await supabase
        .from('email_subscriptions')
        .update({
          status: 'unsubscribed',
          unsubscribed_at: new Date().toISOString(),
          metadata: {
            ...subscription.metadata,
            unsubscribe_reason: reason,
            unsubscribe_method: 'form'
          }
        })
        .eq('id', subscription.id)

      if (updateError) throw updateError

      return new Response(
        JSON.stringify({
          success: true,
          message: 'Sie wurden erfolgreich vom Newsletter abgemeldet.'
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    return new Response(
      JSON.stringify({ success: false, error: 'Method not allowed' }),
      { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Unsubscribe error:', error)

    return new Response(
      JSON.stringify({
        success: false,
        error: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.'
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})