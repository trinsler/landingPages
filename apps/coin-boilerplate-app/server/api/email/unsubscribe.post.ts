import { EmailSubscriptionService } from '@monorepo/shared'
import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, reason } = body

  if (!email) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Email is required'
    })
  }

  try {
    const supabase = await serverSupabaseClient(event)
    const emailService = new EmailSubscriptionService(supabase)
    
    const result = await emailService.unsubscribe({
      email,
      reason: reason || 'User requested'
    })

    if (!result.success) {
      throw createError({
        statusCode: 400,
        statusMessage: result.error
      })
    }

    return {
      success: true,
      message: result.message
    }
  } catch (error) {
    console.error('Email unsubscription error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to unsubscribe email'
    })
  }
})