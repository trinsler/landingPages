import type { SupabaseClient } from '@supabase/supabase-js'
import type { EmailSubscription, ApiResponse } from '../types'
import { validateEmail } from '../utils'

export interface SubscribeOptions {
  email: string
  tags?: string[]
  metadata?: Record<string, any>
  source?: string
}

export interface UnsubscribeOptions {
  email: string
  reason?: string
}

export interface GetSubscriptionsOptions {
  page?: number
  limit?: number
  tags?: string[]
  status?: 'active' | 'unsubscribed' | 'pending'
}

export class EmailSubscriptionService {
  private supabase: SupabaseClient
  private tableName: string

  constructor(supabase: SupabaseClient, tableName: string = 'email_subscriptions') {
    this.supabase = supabase
    this.tableName = tableName
  }

  /**
   * Subscribe an email address to the newsletter
   */
  async subscribe(options: SubscribeOptions): Promise<ApiResponse<EmailSubscription>> {
    try {
      // Validate email
      if (!validateEmail(options.email)) {
        return {
          success: false,
          error: 'Invalid email address'
        }
      }

      // Check if email already exists
      const { data: existing } = await this.supabase
        .from(this.tableName)
        .select('*')
        .eq('email', options.email.toLowerCase())
        .single()

      if (existing) {
        if (existing.status === 'active') {
          return {
            success: false,
            error: 'Email is already subscribed'
          }
        }
        
        // Reactivate subscription if it was unsubscribed
        if (existing.status === 'unsubscribed') {
          const { data, error } = await this.supabase
            .from(this.tableName)
            .update({
              status: 'active',
              tags: options.tags || existing.tags,
              metadata: { ...existing.metadata, ...options.metadata },
              subscribed_at: new Date().toISOString(),
              unsubscribed_at: null
            })
            .eq('id', existing.id)
            .select()
            .single()

          if (error) throw error

          return {
            success: true,
            data,
            message: 'Successfully resubscribed to newsletter'
          }
        }
      }

      // Create new subscription
      const { data, error } = await this.supabase
        .from(this.tableName)
        .insert({
          email: options.email.toLowerCase(),
          status: 'active',
          tags: options.tags,
          metadata: {
            ...options.metadata,
            source: options.source || 'website',
            ip_address: null, // Would be set by API route
            user_agent: null  // Would be set by API route
          },
          subscribed_at: new Date().toISOString()
        })
        .select()
        .single()

      if (error) throw error

      return {
        success: true,
        data,
        message: 'Successfully subscribed to newsletter'
      }
    } catch (error) {
      console.error('Email subscription error:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Subscription failed'
      }
    }
  }

  /**
   * Unsubscribe an email address
   */
  async unsubscribe(options: UnsubscribeOptions): Promise<ApiResponse<EmailSubscription>> {
    try {
      const { data, error } = await this.supabase
        .from(this.tableName)
        .update({
          status: 'unsubscribed',
          unsubscribed_at: new Date().toISOString(),
          metadata: {
            unsubscribe_reason: options.reason || 'User requested'
          }
        })
        .eq('email', options.email.toLowerCase())
        .select()
        .single()

      if (error) throw error

      if (!data) {
        return {
          success: false,
          error: 'Email not found in subscription list'
        }
      }

      return {
        success: true,
        data,
        message: 'Successfully unsubscribed from newsletter'
      }
    } catch (error) {
      console.error('Email unsubscription error:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unsubscription failed'
      }
    }
  }

  /**
   * Get subscription by email
   */
  async getByEmail(email: string): Promise<ApiResponse<EmailSubscription>> {
    try {
      const { data, error } = await this.supabase
        .from(this.tableName)
        .select('*')
        .eq('email', email.toLowerCase())
        .single()

      if (error && error.code !== 'PGRST116') throw error // PGRST116 = not found

      return {
        success: true,
        data: data || null
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get subscription'
      }
    }
  }

  /**
   * Get all subscriptions (admin function)
   */
  async getSubscriptions(options: GetSubscriptionsOptions = {}) {
    try {
      const {
        page = 1,
        limit = 50,
        tags,
        status
      } = options

      let query = this.supabase
        .from(this.tableName)
        .select('*', { count: 'exact' })

      if (status) {
        query = query.eq('status', status)
      }

      if (tags && tags.length > 0) {
        query = query.overlaps('tags', tags)
      }

      query = query
        .order('subscribed_at', { ascending: false })
        .range((page - 1) * limit, page * limit - 1)

      const { data, error, count } = await query

      if (error) throw error

      return {
        success: true,
        data: data || [],
        pagination: {
          page,
          limit,
          total: count || 0,
          totalPages: Math.ceil((count || 0) / limit)
        }
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get subscriptions'
      }
    }
  }

  /**
   * Get subscription statistics
   */
  async getStats() {
    try {
      const [activeResult, totalResult, recentResult] = await Promise.all([
        this.supabase
          .from(this.tableName)
          .select('id', { count: 'exact', head: true })
          .eq('status', 'active'),
        
        this.supabase
          .from(this.tableName)
          .select('id', { count: 'exact', head: true }),
        
        this.supabase
          .from(this.tableName)
          .select('id', { count: 'exact', head: true })
          .eq('status', 'active')
          .gte('subscribed_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())
      ])

      return {
        success: true,
        data: {
          active: activeResult.count || 0,
          total: totalResult.count || 0,
          recentWeek: recentResult.count || 0,
          unsubscribed: (totalResult.count || 0) - (activeResult.count || 0)
        }
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get stats'
      }
    }
  }
}