import Cookies from 'js-cookie'

export const login = async (email: string, password: string) => {
  try {
    const response = await fetch(
      'https://api-yeshtery.dev.meetusvr.com/v1/yeshtery/token',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password, isEmployee: true })
      }
    )

    if (!response.ok) throw new Error('Invalid credentials')

    const data = await response.json()

    // Store token in HTTP-only cookie
    Cookies.set('token', data.token, { expires: 7 })

    return data
  } catch (error) {
    console.error('Login failed:', error)
    throw error
  }
}

export const logout = () => {
  Cookies.remove('token') // Remove token from cookies
}
