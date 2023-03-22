import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useFloating, FloatingPortal, shift, offset } from '@floating-ui/react'
import { motion, AnimatePresence } from 'framer-motion'

import logo from 'src/assets/logo.svg'
import SwitchThemeButton from '../../SwitchThemeButton'

export default function Header() {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { x, y, strategy, refs } = useFloating({
    middleware: [offset(6), shift()]
  })
  const showPopover = () => {
    setIsOpen(true)
  }
  const hidePopover = () => {
    setIsOpen(false)
  }

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
              <div
                ref={refs.setReference}
                onMouseEnter={showPopover}
                onMouseLeave={hidePopover}
                className='border-gray-2 flex h-10 flex-col justify-center rounded-4 border px-2'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-6 w-6'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802'
                  />
                </svg>
                <FloatingPortal>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        ref={refs.setFloating}
                        style={{
                          position: strategy,
                          top: y ?? 0,
                          left: x ?? 0,
                          width: 'max-content',
                          transformOrigin: 'center top'
                        }}
                        initial={{ opacity: 0, transform: 'scale(0)' }}
                        animate={{ opacity: 1, transform: 'scale(1)' }}
                        exit={{ opacity: 0, transform: 'scale(0)' }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className='rounded-4 border border-gray-200 bg-white shadow-md'>
                          <div className='flex flex-col items-start py-2 px-3'>
                            <button className='py-2 px-3 hover:bg-FAFAFD hover:text-secondary-1D6AF9'>
                              Vietnamese
                            </button>
                            <button className='py-2 px-3 hover:bg-FAFAFD hover:text-secondary-1D6AF9'>English</button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </FloatingPortal>
              </div>

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
          <div className='flex items-center gap-5'>
            <form>
              <div className='relative'>
                <input
                  type='text'
                  name='search'
                  placeholder='Search by products, categories'
                  className='h-8 rounded-4 border border-gray-900 pl-3 pr-9 text-black placeholder:text-xs focus:outline-none'
                />
                <button type='submit' className='absolute top-1/2 right-0 mr-2 -translate-y-1/2'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-6 w-6 duration-200 hover:text-secondary-1D6AF9 dark:text-black dark:hover:text-secondary-1D6AF9'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
                    />
                  </svg>
                </button>
              </div>
            </form>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-6 w-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
