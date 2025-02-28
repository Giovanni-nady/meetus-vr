import axios from 'axios'
import Cookies from 'js-cookie'

const API_URL = 'https://api-yeshtery.dev.meetusvr.com/v1/yeshtery/token'

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      API_URL,
      {
        email,
        password,
        isEmployee: true
      },
      {
        headers: { 'Content-Type': 'application/json' }
      }
    )

    console.log('Login response:', response)

    // Store token in HTTP-only cookie
    Cookies.set('token', response.data.token, { expires: 7 })

    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response?.data || error.message)
    } else {
      console.error('Unexpected error:', error)
    }
    throw error
  }
}

export const logout = () => {
  Cookies.remove('token') // Remove token from cookies
  console.log('User logged out')
}
