import { useEffect, useState } from 'react'
import { useAuthStore } from '../stores/authStore'
import { useRouter } from 'next/router'

export default function Dashboard () {
  const { user, loadUser, logout } = useAuthStore()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      loadUser().finally(() => setIsLoading(false))
    } else {
      setIsLoading(false)
    }
  }, []) // Runs only on component mount

  if (isLoading) return <p>Loading...</p>

  if (!user) {
    router.push('/')
    return null
  }

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='bg-white p-8 rounded-lg shadow-lg max-w-md w-full'>
        <h1 className='text-2xl font-bold text-center mb-6 text-neutral-800'>
          Welcome, {user?.name}
        </h1>
        <button
          onClick={() => {
            logout()
            router.push('/')
          }}
          className='w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors'
        >
          Logout
        </button>
      </div>
    </div>
  )
}
