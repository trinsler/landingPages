import { EmailSubscriptionService } from '@monorepo/shared'
import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, tags } = body

  if (!email) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Email is required'
    })
  }

  try {
    const supabase = await serverSupabaseClient(event)
    const emailService = new EmailSubscriptionService(supabase)
    
    // Get client info for metadata
    const userAgent = getHeader(event, 'user-agent')
    const clientIP = getHeader(event, 'x-forwarded-for') || getHeader(event, 'x-real-ip') || 'unknown'
    
    const result = await emailService.subscribe({
      email,
      tags: tags || ['newsletter'],
      metadata: {
        user_agent: userAgent,
        ip_address: clientIP,
        source: 'coin-boilerplate-app'
      },
      source: 'website'
    })

    if (!result.success) {
      throw createError({
        statusCode: 400,
        statusMessage: result.error
      })
    }

    return {
      success: true,
      message: result.message,
      data: {
        id: result.data?.id,
        email: result.data?.email,
        status: result.data?.status
      }
    }
  } catch (error) {
    console.error('Email subscription error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to subscribe email'
    })
  }
})