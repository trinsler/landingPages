/// <reference types="https://deno.land/types/deploy/stable/index.d.ts" />
/// <reference types="https://esm.sh/@supabase/supabase-js@2" />

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
const supabaseUrl = Deno.env.get('SUPABASE_URL')!
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

interface SendEmailRequest {
  name: string
  email: string
  subject: string
  message: string
  userId?: string
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
    const body: SendEmailRequest = await req.json()
    const { name, email, subject, message, userId } = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return new Response('Missing required fields: name, email, subject, message', {
        status: 400,
        headers: corsHeaders
      })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return new Response('Invalid email format', {
        status: 400,
        headers: corsHeaders
      })
    }

    // Store contact form submission in database
    const { data: contactSubmission, error: dbError } = await supabase
      .from('contact_forms')
      .insert({
        user_id: userId || null,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        subject: subject.trim(),
        message: message.trim(),
        status: 'pending',
        metadata: {
          user_agent: req.headers.get('user-agent'),
          origin: req.headers.get('origin'),
          timestamp: new Date().toISOString()
        }
      })
      .select()
      .single()

    if (dbError) {
      console.error('Error storing contact form:', dbError)
      // Continue with email sending even if DB storage fails
    }

    // Send email using Resend API
    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Neue Kontaktanfrage</h2>

        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Name:</strong> ${name.trim()}</p>
          <p><strong>E-Mail:</strong> ${email.trim()}</p>
          <p><strong>Betreff:</strong> ${subject.trim()}</p>
          ${userId ? `<p><strong>Benutzer ID:</strong> ${userId}</p>` : ''}
        </div>

        <div style="background-color: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
          <h3 style="margin-top: 0;">Nachricht:</h3>
          <p style="white-space: pre-wrap; line-height: 1.6;">${message.trim()}</p>
        </div>

        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666;">
          <p>Diese Nachricht wurde über das Kontaktformular der Coin App gesendet.</p>
          <p>Zeitstempel: ${new Date().toLocaleString('de-DE')}</p>
          ${contactSubmission ? `<p>Eintrags-ID: ${contactSubmission.id}</p>` : ''}
        </div>
      </div>
    `

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'onboarding@resend.dev',
        to: 'niels.hensler@gmail.com',
        subject: `Kontaktanfrage: ${subject.trim()}`,
        html: emailContent,
        replyTo: email.trim()
      }),
    })

    if (!res.ok) {
      const errorData = await res.text()
      console.error('Resend API error:', errorData)

      // Update database record with error status
      if (contactSubmission) {
        await supabase
          .from('contact_forms')
          .update({
            status: 'failed',
            metadata: {
              ...contactSubmission.metadata,
              error: errorData,
              failed_at: new Date().toISOString()
            }
          })
          .eq('id', contactSubmission.id)
      }

      return new Response('Failed to send email', {
        status: 500,
        headers: corsHeaders
      })
    }

    const data = await res.json()

    // Update database record with success status
    if (contactSubmission) {
      await supabase
        .from('contact_forms')
        .update({
          status: 'replied',
          metadata: {
            ...contactSubmission.metadata,
            email_id: data.id,
            sent_at: new Date().toISOString()
          }
        })
        .eq('id', contactSubmission.id)
    }

    // Create audit log if user is authenticated
    if (userId) {
      await supabase
        .from('audit_logs')
        .insert({
          user_id: userId,
          action: 'contact_form_submitted',
          resource_type: 'contact_form',
          resource_id: contactSubmission?.id,
          new_values: {
            name: name.trim(),
            email: email.trim(),
            subject: subject.trim(),
            email_id: data.id
          }
        })
    }

    return new Response(JSON.stringify({
      success: true,
      messageId: data.id,
      submissionId: contactSubmission?.id
    }), {
      status: 200,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      }
    })

  } catch (error) {
    console.error('Error in send-email function:', error)
    return new Response('Internal server error', {
      status: 500,
      headers: corsHeaders
    })
  }
})