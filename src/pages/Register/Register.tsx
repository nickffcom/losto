import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import omit from 'lodash/omit'

import authApi from 'src/apis/auth.api'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import path from 'src/constants/path'
import { AppContext } from 'src/contexts/app.context'
import { ErrorResponse } from 'src/types/utils.type'
import { Schema, schema } from 'src/utils/rules'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'

type FormData = Pick<Schema, 'email' | 'password' | 'confirm_password'>

const registerSchema = schema.pick(['email', 'password', 'confirm_password'])

export default function Register() {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  /* Form register */
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(registerSchema)
  })

  /* Handle call api */
  const registerAccoutnMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => authApi.registerAccount(body)
  })

  /* Handle form register */
  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ['confirm_password'])
    registerAccoutnMutation.mutate(body, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        setProfile(data.data.data.user)
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse<Omit<FormData, 'confirm_password'>>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof Omit<FormData, 'confirm_password'>, {
                message: formError[key as keyof Omit<FormData, 'confirm_password'>],
                type: 'Server'
              })
            })
          }
          //cach handle error 2
          // if (formError?.email) {
          //   setError('email', {
          //     message: formError.email,
          //     type: 'Server'
          //   })
          // }
          // if (formError?.password) {
          //   setError('password', {
          //     message: formError.password,
          //     type: 'Server'
          //   })
          // }
        }
      }
    })
  })

  return (
    <div className='b-sd rounded-8 dark:bg-dark-secondary'>
      <h1 className='mt-8 text-center text-5xl font-bold text-primary-377DFF dark:text-white'>Getting Started</h1>
      <p className='mt-2 text-center text-sm font-medium text-gray-500'>Create an account to continue shopping.</p>
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
          <p className='mx-4 mb-0 text-center font-semibold dark:text-white'>Or</p>
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
          <Input
            className='relative'
            name='confirm_password'
            type='password'
            placeholder='Confirm Password'
            register={register}
            errorMessage={errors.confirm_password?.message}
            autoComplete='on'
          />
          <Button
            type='submit'
            className='h-12 w-full rounded-8 bg-primary-377DFF font-medium text-white duration-200 hover:bg-secondary-1D6AF9'
            isLoading={registerAccoutnMutation.isLoading}
            disabled={registerAccoutnMutation.isLoading}
          >
            Sign Up
          </Button>
        </form>
        <Link to={path.login} className='mt-5 flex items-center justify-center text-base font-medium'>
          <span className='text-gray dark:text-gray-500'>Already have an account? </span>
          <span className='ml-2 text-primary-377DFF hover:text-secondary-1D6AF9'>Sign Ip</span>
        </Link>
      </div>
    </div>
  )
}
