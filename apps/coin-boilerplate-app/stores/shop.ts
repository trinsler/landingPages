import { defineStore } from 'pinia'
import type { CoinPackage, Transaction } from '~/types'

interface ShopState {
  packages: CoinPackage[]
  transactions: Transaction[]
  loading: boolean
  processingPayment: boolean
}

export const useShopStore = defineStore('shop', {
  state: (): ShopState => ({
    packages: [
      {
        id: 'coin_pack_100',
        name: '100 Coins',
        coins: 100,
        price: 0.99,
        currency: 'EUR',
        description: 'Perfect starter pack'
      },
      {
        id: 'coin_pack_1000',
        name: '1000 Coins',
        coins: 1000,
        price: 4.99,
        currency: 'EUR',
        popular: true,
        description: 'Most popular choice'
      },
      {
        id: 'coin_pack_5000',
        name: '5000 Coins',
        coins: 5000,
        price: 19.99,
        currency: 'EUR',
        description: 'Best value pack'
      },
      {
        id: 'coin_pack_10000',
        name: '10000 Coins',
        coins: 10000,
        price: 34.99,
        currency: 'EUR',
        description: 'Ultimate coin pack'
      }
    ],
    transactions: [],
    loading: false,
    processingPayment: false
  }),

  getters: {
    getPackageById: (state) => (id: string) => 
      state.packages.find((pkg: CoinPackage) => pkg.id === id),
    
    popularPackage: (state) => 
      state.packages.find((pkg: CoinPackage) => pkg.popular),
    
    recentTransactions: (state) => 
      state.transactions
        .filter((t: Transaction) => t.type === 'purchase')
        .sort((a: Transaction, b: Transaction) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 5)
  },

  actions: {
    async fetchTransactions() {
      const authStore = useAuthStore()
      if (!authStore.user) return

      this.loading = true
      try {
        const supabase = useSupabaseClient()
        const { data, error } = await supabase
          .from('transactions')
          .select('*')
          .eq('user_id', authStore.user.id)
          .order('created_at', { ascending: false })

        if (error) throw error
        
        this.transactions = data || []
      } catch (error) {
        console.error('Error fetching transactions:', error)
      } finally {
        this.loading = false
      }
    },

    async createPaymentSession(packageId: string, provider: 'stripe' | 'paypal' = 'stripe') {
      const authStore = useAuthStore()
      if (!authStore.user) {
        throw new Error('User must be authenticated')
      }

      const coinPackage = this.getPackageById(packageId)
      if (!coinPackage) {
        throw new Error('Invalid package ID')
      }

      this.processingPayment = true
      try {
        const supabase = useSupabaseClient()
        const { data: { session } } = await supabase.auth.getSession()

        if (!session) {
          throw new Error('No active session')
        }

        // Call Supabase Edge Function
        const { data, error } = await supabase.functions.invoke('create-checkout', {
          body: {
            packageId,
            provider
          },
          headers: {
            'Authorization': `Bearer ${session.access_token}`
          }
        })

        if (error) {
          console.error('Supabase function error:', error)
          throw new Error(error.message || 'Failed to create checkout session')
        }

        if (provider === 'stripe' && data?.checkoutUrl) {
          await navigateTo(data.checkoutUrl, { external: true })
        }

        return data
      } catch (error) {
        console.error('Error creating payment session:', error)
        throw error
      } finally {
        this.processingPayment = false
      }
    },

    async handlePaymentSuccess(sessionId: string) {
      try {
        const authStore = useAuthStore()
        await authStore.refreshUser()
        await this.fetchTransactions()

        return { success: true, sessionId }
      } catch (error) {
        console.error('Error handling payment success:', error)
        throw error
      }
    },

    setLoading(loading: boolean) {
      this.loading = loading
    },

    setProcessingPayment(processing: boolean) {
      this.processingPayment = processing
    }
  }
})