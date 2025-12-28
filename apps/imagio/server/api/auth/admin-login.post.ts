interface AdminLoginRequest {
  username: string
  password: string
}

interface AdminLoginResponse {
  success: boolean
  user?: {
    username: string
    role: string
  }
}

export default defineEventHandler(async (event): Promise<AdminLoginResponse> => {
  const body = await readBody<AdminLoginRequest>(event)

  if (!body.username || !body.password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Username and password are required'
    })
  }

  // Simple hardcoded admin credentials (matches existing system)
  if (body.username === 'admin' && body.password === 'imagio123') {
    return {
      success: true,
      user: {
        username: 'admin',
        role: 'admin'
      }
    }
  } else {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid credentials'
    })
  }
})