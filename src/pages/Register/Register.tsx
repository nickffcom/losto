import { Link } from 'react-router-dom'

export default function Register() {
  return (
    <>
      <h1 className='text-center text-5xl font-bold text-primary-377DFF'>Sign Up</h1>
      <p className='mt-2 mb-7 text-center text-sm font-medium text-gray-500'>Create an account to continue shopping.</p>
      <div className='b-sd rounded-8 p-6 md:p-10'>
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
          <div className='relative mt-3'>
            <input
              className='h-12 w-full rounded-lg border px-10'
              name='confirm_password'
              placeholder='Confirm Password'
            />
          </div>
          <button
            type='submit'
            className='mt-5 h-12 w-full rounded-8 bg-primary-377DFF font-medium text-white duration-200 hover:bg-secondary-1D6AF9'
          >
            Sign In
          </button>
        </form>
        <Link to='/login' className='mt-5 flex items-center justify-center text-base font-medium'>
          <span className='text-gray'>Already have an account? </span>
          <span className='ml-2 text-primary-377DFF hover:text-secondary-1D6AF9'>Sign In</span>
        </Link>
      </div>
    </>
  )
}
