import { Link } from 'react-router-dom'

export default function Login() {
  return (
    <div className='b-sd rounded-8 dark:bg-dark-secondary'>
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
        <form>
          <div className='relative'>
            <input name='email' className='h-12 w-full rounded-lg border px-10' placeholder='Email' />
          </div>
          <div className='min-h-[1rem]text-sm mt-3 text-red-600'> Email không hợp lệ</div>
          <div className='relative mt-3'>
            <input className='h-12 w-full rounded-lg border px-10' name='password' placeholder='Password' />
          </div>
          <div className='mt-3 flex flex-col items-center justify-between lg:flex-row'>
            <div className='flex cursor-pointer items-center gap-2'>
              <input type='checkbox' className='rounded-lg border ' />
              <p className='font-medium text-gray-500'>Remember me</p>
            </div>
            <p className='cursor-pointer font-medium text-gray-500'>Forgot Password?</p>
          </div>
          <button
            type='submit'
            className='mt-5 h-12 w-full rounded-8 bg-primary-377DFF font-medium text-white duration-200 hover:bg-secondary-1D6AF9'
          >
            Sign In
          </button>
        </form>
        <Link to='/register' className='mt-5 flex items-center justify-center text-base font-medium'>
          <span className='text-gray dark:text-gray-500'>You haven&apos;t any account?</span>
          <span className='ml-2 text-primary-377DFF hover:text-secondary-1D6AF9'>Sign Up</span>
        </Link>
      </div>
    </div>
  )
}
