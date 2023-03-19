import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { rules } from 'src/components/utils/rules'

interface FormData {
  email: string
  password: string
  confirm_password: string
}

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>()
  const onSubmit = handleSubmit((data) => {
    console.log(data)
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
          <div className='relative'>
            <input
              className='h-12 w-full rounded-lg border px-10'
              placeholder='Email'
              type='email'
              {...register('email', rules.email)}
            />
          </div>
          <div className='mt-1 min-h-[1.5rem] text-sm text-red-600 '>{errors.email?.message}</div>
          <div className='relative'>
            <input
              className='h-12 w-full rounded-lg border px-10'
              placeholder='Password'
              type='password'
              {...register('password', rules.password)}
            />
          </div>
          <div className='mt-1 min-h-[1.5rem] text-sm text-red-600 '>{errors.password?.message}</div>
          <div className='relative'>
            <input
              className='h-12 w-full rounded-lg border px-10'
              type='password'
              placeholder='Confirm Password'
              {...register('confirm_password', rules.confirm_password)}
            />
          </div>
          <div className='mt-1 min-h-[1.5rem] text-sm text-red-600 '>{errors.confirm_password?.message}</div>
          <button
            type='submit'
            className='h-12 w-full rounded-8 bg-primary-377DFF font-medium text-white duration-200 hover:bg-secondary-1D6AF9'
          >
            Sign In
          </button>
        </form>
        <Link to='/login' className='mt-5 flex items-center justify-center text-base font-medium'>
          <span className='text-gray dark:text-gray-500'>Already have an account? </span>
          <span className='ml-2 text-primary-377DFF hover:text-secondary-1D6AF9'>Sign In</span>
        </Link>
      </div>
    </div>
  )
}
