export default defineNuxtRouteMiddleware((to) => {
  const user = useSupabaseUser()
  
  if (!user.value) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized - Login required'
    })
  }
})