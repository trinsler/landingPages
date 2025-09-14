import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

const supabaseUrl = Deno.env.get('SUPABASE_URL')!
const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!

serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    if (req.method !== 'GET') {
      return new Response(
        JSON.stringify({ success: false, error: 'Method not allowed' }),
        { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const url = new URL(req.url)
    const token = url.searchParams.get('token')

    if (!token) {
      return new Response(
        JSON.stringify({ success: false, error: 'Token ist erforderlich' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey)

    // Find subscription by confirmation token
    const { data: subscription, error: findError } = await supabase
      .from('email_subscriptions')
      .select('*')
      .eq('confirmation_token', token)
      .single()

    if (findError || !subscription) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Ungültiger oder abgelaufener Bestätigungslink'
        }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Check if already confirmed
    if (subscription.status === 'active') {
      return new Response(
        JSON.stringify({
          success: true,
          message: 'Ihre E-Mail-Adresse wurde bereits bestätigt.'
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Confirm the subscription
    const { error: updateError } = await supabase
      .from('email_subscriptions')
      .update({
        status: 'active',
        confirmed_at: new Date().toISOString(),
        confirmation_token: null // Clear the token after use
      })
      .eq('id', subscription.id)

    if (updateError) throw updateError

    // Return success response
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Vielen Dank! Ihre E-Mail-Adresse wurde erfolgreich bestätigt.'
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Email confirmation error:', error)

    return new Response(
      JSON.stringify({
        success: false,
        error: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.'
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})