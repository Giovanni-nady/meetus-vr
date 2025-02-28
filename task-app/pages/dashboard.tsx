import { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as yup from 'yup'
import { MdEmail, MdLock } from 'react-icons/md'
import { useRouter } from 'next/router'
import { useAuthStore } from '@/stores/authStore'
import { login } from '@/services/auth'

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required')
})

export default function LoginPage () {
  const setUser = useAuthStore(state => state.setUser)
  const router = useRouter()
  const [error, setError] = useState<string>('')

  return (
    <div className='min-h-screen flex flex-col md:flex-row bg-[#E9ECF2]'>
      {/* Logo Section */}
      <div className='order-1 md:order-2 flex-3/4 flex items-center justify-center p-4'>
        <div className='text-white flex flex-col items-center justify-center'>
          <img src='/logo.png' alt='Logo' className='w-3/4 h-3/4' />
          <img
            src='/brand-name.png'
            alt='Brand Name'
            className='w-48 object-contain'
          />
        </div>
      </div>

      {/* Form Section */}
      <div className='order-2 md:order-1 flex-2/4 flex items-center justify-center p-4'>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            setError('')
            try {
              const userData = await login(values.email, values.password)
              setUser(userData)
              router.push('/dashboard')
            } catch (error) {
              setError('Invalid credentials')
            } finally {
              setSubmitting(false)
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className='p-8 rounded-lg w-full max-w-md'>
              <h1 className='text-5xl mb-2 font-medium text-center text-[#1A1A1E]'>
                Welcome back
              </h1>
              <p className='mb-6 text-center text-[#62626B]'>
                Step into our shopping metaverse for an unforgettable shopping
                experience
              </p>

              {error && (
                <p className='text-red-500 mb-4 text-center'>{error}</p>
              )}

              <div className='mb-4'>
                <div className='flex items-center border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-blue-500'>
                  <MdEmail className='text-gray-500 mx-3' />
                  <Field
                    type='email'
                    name='email'
                    placeholder='Email'
                    className='w-full p-2 focus:outline-none text-black'
                  />
                </div>
                <ErrorMessage
                  name='email'
                  component='p'
                  className='text-red-500 text-sm mt-1'
                />
              </div>

              <div className='mb-6'>
                <div className='flex items-center border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-blue-500'>
                  <MdLock className='text-gray-500 mx-3' />
                  <Field
                    type='password'
                    name='password'
                    placeholder='Password'
                    className='w-full p-2 focus:outline-none text-black'
                  />
                </div>
                <ErrorMessage
                  name='password'
                  component='p'
                  className='text-red-500 text-sm mt-1'
                />
              </div>

              <button
                type='submit'
                disabled={isSubmitting}
                className='w-full bg-[#9414FF80] text-white p-2 rounded-md hover:bg-[#9414FF] disabled:bg-gray-400 disabled:cursor-not-allowed'
              >
                {isSubmitting ? 'Logging in...' : 'Login'}
              </button>

              <div className='mt-6 flex flex-row justify-center gap-1'>
                <p className='text-gray-600'>Don't have an account?</p>
                <p className='text-[#9414FF]'>Sign up</p>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}
