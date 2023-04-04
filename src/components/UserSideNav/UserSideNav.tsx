import { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import path from 'src/constants/path'
import { AppContext } from 'src/contexts/app.context'
import userImage from 'src/assets/images/user.svg'
import { getAvatarUrl } from 'src/utils/utils'
import classNames from 'classnames'
export default function UserSideNav() {
  const { profile } = useContext(AppContext)
  return (
    <>
      <div className='border-b-secondary-EDEDF6 flex items-center border-b p-3 md:p-4'>
        <Link
          className='border-secondary-D2D1D6 flex h-12 w-12 flex-shrink-0 items-center justify-center overflow-hidden rounded-8 border'
          to={path.profile}
        >
          <img src={getAvatarUrl(profile?.avatar)} alt='avatar' className='p-2' />
        </Link>
        <div className='ml-4 flex-grow'>
          <p className='text-primary-1A162E mb-1 truncate font-semibold'>{profile?.name}</p>
          <Link className='flex items-center capitalize duration-200 hover:text-primary-377DFF' to={path.profile}>
            <span className='fs-14'>Edit Your Profile</span>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              aria-hidden='true'
              className='ml-2 h-4 w-4'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10'
              />
            </svg>
          </Link>
        </div>
      </div>
      <div className='p-3 md:p-4'>
        <NavLink
          className={({ isActive }) =>
            classNames(
              'fs-14 flex items-center capitalize transition-colors duration-200 md:fs-16 hover:text-primary-377DFF',
              {
                'font-semibold text-primary-377DFF': isActive,
                'text-gray-600': !isActive
              }
            )
          }
          to={path.profile}
          aria-current='page'
        >
          <div className='mr-3 h-5 w-5 md:h-6 md:w-6'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              aria-hidden='true'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z'
              />
            </svg>
          </div>
          My Account
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            classNames(
              'fs-14 mt-4 flex items-center capitalize transition-colors duration-200 md:fs-16 hover:text-primary-377DFF',
              {
                'font-semibold text-primary-377DFF': isActive,
                'text-gray-600': !isActive
              }
            )
          }
          to={path.changePassword}
        >
          <div className='mr-3 h-5 w-5 md:h-6 md:w-6'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              aria-hidden='true'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75'
              />
            </svg>
          </div>
          Change Password
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            classNames(
              'fs-14 mt-4 flex items-center capitalize transition-colors duration-200 md:fs-16 hover:text-primary-377DFF',
              {
                'font-semibold text-primary-377DFF': isActive,
                'text-gray-600': !isActive
              }
            )
          }
          to={path.historyPurchase}
        >
          <div className='mr-3 h-5 w-5 md:h-6 md:w-6'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              aria-hidden='true'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75'
              />
            </svg>
          </div>
          Purchases History
        </NavLink>
      </div>
    </>
  )
}
