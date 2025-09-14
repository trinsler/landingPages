import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

interface SubscribeRequest {
  email: string
  tags?: string[]
  source?: string
  metadata?: Record<string, any>
}

const supabaseUrl = Deno.env.get('SUPABASE_URL')!
const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!

serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ success: false, error: 'Method not allowed' }),
        { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const { email, tags = [], source = 'website', metadata = {} }: SubscribeRequest = await req.json()

    // Basic validation
    if (!email || typeof email !== 'string') {
      return new Response(
        JSON.stringify({ success: false, error: 'Valid email is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid email format' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey)

    // Get client info
    const clientIP = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown'
    const userAgent = req.headers.get('user-agent') || 'unknown'

    // Check if email already exists
    const { data: existing, error: checkError } = await supabase
      .from('email_subscriptions')
      .select('*')
      .eq('email', email.toLowerCase())
      .single()

    if (checkError && checkError.code !== 'PGRST116') {
      console.error('Database check error:', checkError)
      throw checkError
    }

    if (existing) {
      if (existing.status === 'active') {
        return new Response(
          JSON.stringify({
            success: false,
            error: 'Diese E-Mail-Adresse ist bereits für den Newsletter angemeldet.'
          }),
          { status: 409, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      // Reactivate if unsubscribed
      if (existing.status === 'unsubscribed') {
        const { data, error } = await supabase
          .from('email_subscriptions')
          .update({
            status: 'pending',
            tags: tags.length > 0 ? tags : existing.tags,
            metadata: {
              ...existing.metadata,
              ...metadata,
              source,
              ip_address: clientIP,
              user_agent: userAgent,
              resubscribed_at: new Date().toISOString()
            },
            subscribed_at: new Date().toISOString(),
            unsubscribed_at: null,
            confirmation_token: crypto.randomUUID()
          })
          .eq('id', existing.id)
          .select()
          .single()

        if (error) throw error

        // TODO: Send confirmation email
        console.log('Resubscription confirmation needed for:', email)

        return new Response(
          JSON.stringify({
            success: true,
            message: 'Bitte bestätigen Sie Ihre E-Mail-Adresse über den Link, den wir Ihnen gesendet haben.',
            requiresConfirmation: true
          }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      // If pending, resend confirmation
      if (existing.status === 'pending') {
        // TODO: Resend confirmation email
        console.log('Resending confirmation for:', email)

        return new Response(
          JSON.stringify({
            success: true,
            message: 'Bitte bestätigen Sie Ihre E-Mail-Adresse über den Link, den wir Ihnen gesendet haben.',
            requiresConfirmation: true
          }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }
    }

    // Create new subscription
    const { data, error } = await supabase
      .from('email_subscriptions')
      .insert({
        email: email.toLowerCase(),
        status: 'pending', // Requires email confirmation
        tags,
        metadata: {
          ...metadata,
          source,
          ip_address: clientIP,
          user_agent: userAgent
        },
        subscribed_at: new Date().toISOString(),
        confirmation_token: crypto.randomUUID()
      })
      .select()
      .single()

    if (error) throw error

    // TODO: Send confirmation email
    console.log('Confirmation email needed for new subscription:', email)

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Vielen Dank für Ihre Anmeldung! Bitte bestätigen Sie Ihre E-Mail-Adresse über den Link, den wir Ihnen gesendet haben.',
        requiresConfirmation: true
      }),
      { status: 201, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Newsletter subscription error:', error)

    return new Response(
      JSON.stringify({
        success: false,
        error: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.'
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})