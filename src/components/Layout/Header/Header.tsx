import { Link } from 'react-router-dom'
import logo from 'src/assets/logo.svg'
import SwitchThemeButton from '../../SwitchThemeButton'

export default function Header() {
  return (
    <div className='hidden shadow-md md:block'>
      <header className='py-6'>
        <div className='container'>
          <div className='flex items-center justify-between'>
            <Link to='/'>
              <img src={logo} alt='logo' />
            </Link>
            <div className='flex items-center gap-5'>
              <SwitchThemeButton />
              <Link
                to='/login'
                className='hover:bg- fs-14 flex h-10 items-center justify-center rounded-4 bg-primary-377DFF px-5 text-white duration-200 hover:bg-secondary-1D6AF9'
              >
                <span>Login</span>
              </Link>
              <Link
                to='/register'
                className='hover:bg- fs-14 flex h-10 items-center justify-center rounded-4 bg-primary-377DFF px-5 text-white duration-200 hover:bg-secondary-1D6AF9'
              >
                <span>Register</span>
              </Link>
            </div>
          </div>
        </div>
      </header>
      <div className='border-t-2 dark:border-t-neutral-800'>
        <div className='container mx-auto flex h-16 items-center justify-between'>
          <div className='fs-16 font-semibold dark:text-white'>
            <Link className='nav-link-hover-effect mr-12 hover:text-primary-377DFF' to='/' aria-current='page'>
              Home
            </Link>
            <Link className='nav-link-hover-effect mr-12 hover:text-primary-377DFF' to='/productlist'>
              Shop
            </Link>
            <Link className='nav-link-hover-effect mr-12 hover:text-primary-377DFF' to='/about'>
              About
            </Link>
            <Link className='nav-link-hover-effect mr-12 hover:text-primary-377DFF' to='/contact'>
              Contact
            </Link>
            <Link className='nav-link-hover-effect mr-12 hover:text-primary-377DFF' to='/faq'>
              FAQs
            </Link>
          </div>
          <form>
            <div className='relative'>
              <input
                type='text'
                name='search'
                className='h-8 rounded-4 border border-gray-900 pl-3 text-black focus:outline-none'
              />
              <div className='absolute top-1/2 right-0 mr-2 -translate-y-1/2'>
                <svg
                  aria-hidden='true'
                  className='h-5 w-5 text-gray-500 dark:text-gray-800'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'></path>
                </svg>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
