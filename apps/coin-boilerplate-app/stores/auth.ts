import { defineStore } from 'pinia'

import type { User } from '~/types'

interface AuthState {
  user: User | null
  loading: boolean
  initialized: boolean
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    loading: false,
    initialized: false,
  }),

  getters: {
    isAuthenticated: state => !!state.user,
    hasCoins: state => (state.user ? state.user.coins > 0 : false),
    coinBalance: state => state.user?.coins || 0,
  },

  actions: {
    async initialize() {
      if (this.initialized) return

      this.loading = true
      try {
        const supabase = useSupabaseClient()
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (session?.user) {
          await this.fetchUserProfile(session.user.id)
        }

        this.initialized = true
      } catch (error) {
        console.error('Error initializing auth store:', error)
      } finally {
        this.loading = false
      }
    },

    async fetchUserProfile(userId: string) {
      try {
        const supabase = useSupabaseClient()
        const { data, error } = await supabase.from('users').select('*').eq('id', userId).single()

        if (error) throw error

        this.user = data
      } catch (error) {
        console.error('Error fetching user profile:', error)
        this.user = null
      }
    },

    async signInWithGoogle() {
      this.loading = true
      try {
        const supabase = useSupabaseClient()
        const { error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: `${useRuntimeConfig().public.siteUrl}/auth/callback`,
          },
        })

        if (error) throw error
      } catch (error) {
        console.error('Error signing in with Google:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    async updateCoins(newBalance: number) {
      if (this.user) {
        this.user.coins = newBalance
      }
    },

    async updateNewsletterSubscription(subscribed: boolean) {
      if (!this.user) throw new Error('User not authenticated')

      try {
        const supabase = useSupabaseClient<any>()
        const { error } = await supabase
          .from('users')
          .update({ newsletter_subscribed: subscribed })
          .eq('id', this.user.id)

        if (error) throw error

        // Update local state
        this.user.newsletter_subscribed = subscribed
      } catch (error) {
        console.error('Error updating newsletter subscription:', error)
        throw error
      }
    },

    async refreshUser() {
      if (this.user) {
        await this.fetchUserProfile(this.user.id)
      }
    },

    async getAuthToken(): Promise<string | null> {
      try {
        const supabase = useSupabaseClient()
        const { data: { session }, error } = await supabase.auth.getSession()

        if (error) throw error
        return session?.access_token || null
      } catch (error) {
        console.error('Error getting auth token:', error)
        return null
      }
    },

    // Email Authentication Methods
    async signInWithEmail(email: string, password: string) {
      this.loading = true
      try {
        const supabase = useSupabaseClient()
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        })

        if (error) throw error

        if (data.user) {
          await this.fetchUserProfile(data.user.id)
        }

        return data
      } catch (error) {
        console.error('Error signing in with email:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    async signUpWithEmail(email: string, password: string, fullName?: string) {
      this.loading = true
      try {
        const supabase = useSupabaseClient()
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName || ''
            }
          }
        })

        if (error) throw error

        // Don't fetch user profile yet - email verification needed
        return data
      } catch (error) {
        console.error('Error signing up with email:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    async resetPassword(email: string) {
      try {
        const supabase = useSupabaseClient()
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${useRuntimeConfig().public.siteUrl}/reset-password`
        })

        if (error) throw error
      } catch (error) {
        console.error('Error resetting password:', error)
        throw error
      }
    },

    async updatePassword(newPassword: string) {
      if (!this.user) throw new Error('User not authenticated')

      try {
        const supabase = useSupabaseClient()
        const { error } = await supabase.auth.updateUser({
          password: newPassword
        })

        if (error) throw error
      } catch (error) {
        console.error('Error updating password:', error)
        throw error
      }
    },

    async signOut() {
      this.loading = true
      try {
        const supabase = useSupabaseClient()
        const { error } = await supabase.auth.signOut()

        if (error) throw error

        this.user = null
        await navigateTo('/')
      } catch (error) {
        console.error('Error signing out:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    setUser(user: User | null) {
      this.user = user
    },

    setLoading(loading: boolean) {
      this.loading = loading
    },
  },
})
