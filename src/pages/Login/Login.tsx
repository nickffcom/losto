import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'

import authApi from 'src/apis/auth.api'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import path from 'src/constants/path'
import { AppContext } from 'src/contexts/app.context'
import { ErrorResponse } from 'src/types/utils.type'
import { Schema, schema } from 'src/utils/rules'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { Helmet } from 'react-helmet-async'

type FormData = Pick<Schema, 'email' | 'password'>

const loginSchema = schema.pick(['email', 'password'])

export default function Login() {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema)
  })

  const loginMutation = useMutation({
    mutationFn: (body: FormData) => authApi.login(body)
  })

  const onSubmit = handleSubmit((data) => {
    loginMutation.mutate(data, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        setProfile(data.data.data.user)
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse<FormData>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof FormData, {
                message: formError[key as keyof FormData],
                type: 'Server'
              })
            })
          }
        }
      }
    })
  })

  return (
    <div className='b-sd rounded-8 dark:bg-dark-secondary'>
      <Helmet>
        <title>Login | Lotso Shop</title>
        <meta
          name='description'
          content='Login to Lotso Shop and access a world of online shopping at your fingertips. Our secure login process ensures your personal information is protected, while our easy-to-use platform makes shopping a breeze. Sign in now to browse our wide range of products and enjoy exclusive deals and discounts.'
        />
      </Helmet>
      <h1 className='mt-8 text-center text-5xl font-bold text-primary-377DFF dark:text-white'>Sign In</h1>
      <p className='mt-2 text-center text-sm font-medium text-gray-500'>Welcome back, you&apos;ve been missed!</p>
      <div className='p-6 md:p-10'>
        <div className='flex flex-col justify-between gap-5 md:flex-row'>
          <button className='flex h-12 items-center justify-center rounded-8 bg-gray-200 px-10 duration-200 hover:bg-gray-300'>
            <span className='text-gray text-base font-medium'>Log in with Google</span>
          </button>
          <button className='flex h-12 items-center justify-center rounded-8 bg-gray-200 px-10 duration-200 hover:bg-gray-300'>
            <span className='text-gray text-base font-medium'>Log in with Apple</span>
          </button>
        </div>
        <div className='my-3 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-gray-300 after:mt-0.5 after:flex-1 after:border-t after:border-gray-300'>
          <p className='mx-4 mb-0 text-center font-semibold'>Or</p>
        </div>
        <form onSubmit={onSubmit} noValidate>
          <Input
            className='relative'
            name='email'
            type='email'
            placeholder='Email'
            register={register}
            errorMessage={errors.email?.message}
          />
          <Input
            className='relative'
            name='password'
            type='password'
            placeholder='Password'
            register={register}
            errorMessage={errors.password?.message}
            autoComplete='on'
          />
          <div className='mt-3 flex flex-col items-center justify-between lg:flex-row'>
            <div className='flex cursor-pointer items-center gap-2'>
              <input type='checkbox' className='rounded-lg border ' />
              <p className='font-medium text-gray-500'>Remember me</p>
            </div>
            <p className='cursor-pointer font-medium text-gray-500'>Forgot Password?</p>
          </div>
          <Button
            type='submit'
            className='mt-5 h-12 w-full rounded-8 bg-primary-377DFF font-medium text-white duration-200 hover:bg-secondary-1D6AF9'
            isLoading={loginMutation.isLoading}
            disabled={loginMutation.isLoading}
          >
            Sign In
          </Button>
        </form>
        <Link to={path.register} className='mt-5 flex items-center justify-center text-base font-medium'>
          <span className='text-gray dark:text-gray-500'>You haven&apos;t any account?</span>
          <span className='ml-2 text-primary-377DFF hover:text-secondary-1D6AF9'>Sign Up</span>
        </Link>
      </div>
    </div>
  )
}
