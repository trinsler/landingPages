export default defineNuxtRouteMiddleware((to, from) => {
  // For now, just allow all routes
  // In production, you would check authentication here
  console.log('Auth middleware:', to.path)
})