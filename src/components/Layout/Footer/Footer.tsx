import { Link } from 'react-router-dom'
import logo from 'src/assets/logo.svg'

export default function Footer() {
  return (
    <footer className='mt-20 py-5 font-lotso-ecom'>
      <div className='max-w-screen-xl container mx-auto flex flex-col items-center justify-center px-4'>
        <div className='mb-2 lg:mb-0'>
          <Link to='/'>
            <img src={logo} alt='logo' width={166} height={51} />
          </Link>
        </div>
        <p className='text-primary-1A162E mt-4 text-center font-semibold dark:text-white lg:text-lg'>
          ©2023 - Trung. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
