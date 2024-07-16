import { Outlet } from 'react-router-dom'

import UserSideNav from 'src/components/UserSideNav'

export default function UserLayout() {
  return (
    <>
      <div className='py-4 lg:py-6'>
        <div className='container'>
          <div className='grid grid-cols-1 rounded-16 bg-FAFAFD mmd:grid-cols-12'>
            <div className='mmd:col-span-3'>
              <UserSideNav />
            </div>
            <div className='mmd:col-span-9'>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
