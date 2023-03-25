import { useMutation } from '@tanstack/react-query'
import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { logout } from 'src/apis/auth.api'

import logo from 'src/assets/logo.svg'
import Popover from 'src/components/Popover'
import path from 'src/constants/path'
import { AppContext } from 'src/contexts/app.context'
import SwitchThemeButton from '../../SwitchThemeButton'

export default function Header() {
  const { setIsAuthenticated, isAuthenticated, setProfile, profile } = useContext(AppContext)
  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      setIsAuthenticated(false)
    }
  })

  const handleLogout = () => {
    logoutMutation.mutate()
    setProfile(null)
  }

  const text = profile?.name
  const nameAvatar = text?.split(' ').map((word) => word.charAt(0))

  return (
    <div className='hidden shadow-md md:block'>
      <header className='py-6'>
        <div className='container'>
          <div className='flex items-center justify-between'>
            <Link to='/'>
              <img src={logo} alt='logo' width='166' height='51' />
            </Link>
            <div className='flex items-center gap-5'>
              <SwitchThemeButton />
              <Popover
                className='flex h-10 cursor-pointer flex-col justify-center rounded-8 border border-gray-400 px-2 duration-200 hover:border-primary-377DFF'
                renderPopover={
                  <div className='rounded-4 border border-gray-200 bg-white shadow-md'>
                    <div className='fs-14 flex flex-col items-start py-2 px-3'>
                      <button className='py-2 px-3 hover:bg-FAFAFD hover:text-secondary-1D6AF9'>Vietnamese</button>
                      <button className='py-2 px-3 hover:bg-FAFAFD hover:text-secondary-1D6AF9'>English</button>
                    </div>
                  </div>
                }
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
              </Popover>
              {isAuthenticated && (
                <Popover
                  className='flex cursor-pointer items-center justify-center gap-2 duration-200 hover:text-secondary-1D6AF9'
                  renderPopover={
                    <div className='rounded-4 border border-gray-200 bg-white shadow-md'>
                      <div className='fs-14 flex flex-col items-start'>
                        <Link
                          to={path.profile}
                          className='w-full py-3 px-5 text-left hover:bg-FAFAFD hover:text-secondary-1D6AF9'
                        >
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={1.5}
                            stroke='currentColor'
                            className='mr-2 inline-block h-5 w-5'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z'
                            />
                          </svg>
                          Profile
                        </Link>
                        <button className='w-full py-3 px-5 text-left hover:bg-FAFAFD hover:text-secondary-1D6AF9'>
                          <svg
                            className='mr-2 inline-block h-5 w-5'
                            viewBox='0 0 1024 1024'
                            version='1.1'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              d='M838.622966 942.430216H185.377034c-35.697013 0-65.319681-26.76355-68.922742-62.274322L65.649186 381.233748c-1.99647-19.464307 4.39817-38.953174 17.509792-53.476959 13.111622-14.515598 31.856545-22.839171 51.41295-22.839171h754.837724c19.573801 0 38.318724 8.331759 51.430346 22.847357 13.111622 14.523785 19.506263 34.013675 17.509793 53.468773l-50.804083 498.922146c-3.586688 35.493375-33.225729 62.274322-68.922742 62.274322zM134.572952 374.212844l50.804082 498.939543h0.017397v0.033769l653.229558-0.051166 50.804083-498.922146H134.572952z'
                              fill='#444444'
                            />
                            <path
                              d='M678.30977 452.043467c-19.133779 0-34.648125-15.513322-34.648125-34.647102V185.512111c0-19.108197-15.547091-34.648125-34.648124-34.648125h-194.029088c-19.10001 0-34.647101 15.538905-34.647102 34.648125v231.883231c0 19.133779-15.513322 34.647101-34.648124 34.647101-19.133779 0-34.647101-15.513322-34.647102-34.647101V185.512111c0-57.317427 46.6249-103.94335 103.943351-103.943351h194.029088c57.317427 0 103.94335 46.6249 103.943351 103.943351v231.883231c0 19.133779-15.513322 34.648125-34.648125 34.648125z'
                              fill='#444444'
                            />
                            <path
                              d='M719.891817 717.227128H304.120462v51.971675c0 19.135826 15.512299 34.647101 34.648125 34.647101h346.476129c19.135826 0 34.648125-15.512299 34.648125-34.647101v-51.971675z'
                              fill='#00D8A0'
                            />
                          </svg>
                          Purchase
                        </button>
                        <button
                          className='w-full py-3 px-5 text-left hover:bg-FAFAFD hover:text-secondary-1D6AF9'
                          onClick={handleLogout}
                        >
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={1.5}
                            stroke='currentColor'
                            className='mr-2 inline-block h-5 w-5'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75'
                            />
                          </svg>
                          Logout
                        </button>
                      </div>
                    </div>
                  }
                >
                  <Link to={path.profile} className='fs-14 font-semibold'>
                    <span>{profile?.email}</span>
                  </Link>
                  <div className='relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gray-200 dark:bg-gray-600'>
                    <span className='fs-14 font-medium text-gray-600 dark:text-gray-300'>{nameAvatar}</span>
                  </div>
                </Popover>
              )}
              {!isAuthenticated && (
                <>
                  <Link to={path.login} className='button-primary'>
                    <span>Login</span>
                  </Link>
                  <Link to={path.register} className='button-primary'>
                    <span>Register</span>
                  </Link>
                </>
              )}
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
                  className='h-10 rounded-8 border border-gray-900 pl-3 pr-9 text-black placeholder:text-xs focus:outline-none'
                />
                <button type='submit' className='absolute top-1/2 right-0 mr-2 -translate-y-1/2' aria-label='search'>
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
            <Popover
              className='class=" flex h-10 cursor-pointer flex-col justify-center rounded-8 border border-gray-400 px-2 duration-200 hover:border-primary-377DFF'
              renderPopover={
                <div className='rounded-4 border border-gray-200 bg-white shadow-md'>
                  <div className='fs-14 flex  w-72 flex-col items-start md:w-[400px] '>
                    <div className='flex w-full items-center justify-between border-b border-gray-200 py-2 px-4'>
                      <p className='font-semibold'>New Products Added</p>{' '}
                      <Link to='' className='font-semibold text-primary-377DFF hover:text-secondary-1D6AF9'>
                        <span>View cart</span>
                      </Link>
                    </div>
                    <Link to='' className='flex w-full items-center justify-between py-2 px-4'>
                      <div className='flex items-center gap-2'>
                        <div className='relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gray-200 dark:bg-gray-600'>
                          <span className='fs-14 font-medium text-gray-600 dark:text-gray-700'>IP</span>
                        </div>
                        <span className='line-clamp-1'>Iphone 14 Pro Max 256GB</span>
                      </div>
                      <span className='text-red-500'>19.999.000 VNĐ</span>
                    </Link>
                  </div>
                </div>
              }
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='text-primary-1A162E h-5 w-5 lg:h-6 lg:w-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
                />
              </svg>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  )
}
