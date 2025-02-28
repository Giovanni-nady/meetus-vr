import Cookies from 'js-cookie'

export const getUserInfo = async () => {
  const token = Cookies.get('token')
  if (!token) return null

  try {
    const response = await fetch(
      'https://api-yeshtery.dev.meetusvr.com/v1/user/info',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    )
    console.log('🚀 ~ getUserInfo ~ response:', response)

    if (!response.ok) return null

    return await response.json() // { id: ..., name: ..., ... }
  } catch (error) {
    console.error('Failed to fetch user info:', error)
    return null
  }
}
