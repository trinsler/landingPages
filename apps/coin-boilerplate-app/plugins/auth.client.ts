export default defineNuxtPlugin(async () => {
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  const authStore = useAuthStore()

  // Initialize auth store
  await authStore.initialize()

  // Listen for auth state changes
  supabase.auth.onAuthStateChange(async (event, session) => {
    if (event === 'SIGNED_IN' && session?.user) {
      await authStore.fetchUserProfile(session.user.id)
    } else if (event === 'SIGNED_OUT') {
      authStore.setUser(null)
    }
  })

  // Set up realtime subscription for user coin updates
  if (user.value) {
    const channel = supabase
      .channel('user-coins-updates')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'users',
          filter: `id=eq.${user.value.id}`
        },
        (payload) => {
          if (payload.new && authStore.user) {
            authStore.updateCoins(payload.new.coins)
          }
        }
      )
      .subscribe()

    // Clean up subscription on unmount
    onBeforeUnmount(() => {
      supabase.removeChannel(channel)
    })
  }
})