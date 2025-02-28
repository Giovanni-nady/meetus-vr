import { useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { MdEmail, MdLock } from 'react-icons/md'
import { useAuthStore } from '@/stores/authStore'
import { login } from '@/services/auth'

export default function LoginPage () {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const setUser = useAuthStore(state => state.setUser)

  const router = useRouter()

  const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const userData = await login(email, password)
      setUser(userData)
      router.push('/dashboard') // Redirect to dashboard
    } catch (error) {
      alert('Invalid credentials')
      setError(JSON.stringify(error))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen flex flex-col md:flex-row bg-[#E9ECF2]'>
      {/* Logo Section (Top on small screens, Left on large screens) */}
      <div className='order-1 md:order-2 flex-3/4 flex items-center justify-center p-4'>
        <div className='text-white flex flex-col items-center justify-center'>
          {/* Logo Image */}
          <img src='/logo.png' alt='Logo' className='w-3/4 h-3/4' />

          {/* Brand Name Image */}
          <img
            src='/brand-name.png' // Replace with your brand name image path
            alt='Brand Name'
            className='w-48 object-contain' // Adjust size as needed
          />
        </div>
      </div>

      {/* Form Section (Bottom on small screens, Right on large screens) */}
      <div className='order-2 md:order-1 flex-2/4 flex items-center justify-center p-4'>
        <form
          onSubmit={handleSubmit}
          className='p-8 rounded-lg w-full max-w-md'
        >
          <h1 className='text-5xl mb-2 font-medium text-center text-[#1A1A1E]'>
            Welcome back
          </h1>

          <p className='mb-6 text-center text-[#62626B]'>
            Step into our shopping metaverse for an unforgettable shopping
            experience
          </p>

          {error && <p className='text-red-500 mb-4 text-center'>{error}</p>}
          <div className='flex items-center mb-4 border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-blue-500'>
            <MdEmail className='text-gray-500 mx-3' /> {/* Email Icon */}
            <input
              type='email'
              placeholder='Email'
              value={email}
              onChange={e => setEmail(e.target.value)}
              className='w-full p-2 focus:outline-none text-black'
            />
          </div>

          <div className='flex items-center mb-6 border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-blue-500'>
            <MdLock className='text-gray-500 mx-3' />
            <input
              type='password'
              placeholder='Password'
              value={password}
              onChange={e => setPassword(e.target.value)}
              className='w-full p-2 focus:outline-none text-black'
            />
          </div>

          <button
            type='submit'
            disabled={!email || !password || !validateEmail(email) || loading}
            className='w-full bg-[#9414FF80] text-white p-2 rounded-md hover:bg-[#9414FF] disabled:bg-gray-400 disabled:cursor-not-allowed'
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
          <div className='mt-6 flex flex-row justify-center gap-1'>
            <p className='text-gray-600'>Don't have an account?</p>
            <p className='text-[#9414FF]'>Sign up</p>
          </div>
        </form>
      </div>
    </div>
  )
}
