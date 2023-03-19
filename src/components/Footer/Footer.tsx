import { Link } from 'react-router-dom'
import logo from 'src/assets/logo.svg'

export default function Footer() {
  return (
    <footer className='mt-20 py-5 font-lotso-ecom'>
      <div className='container'>
        <div className='mb-2 flex items-center justify-center lg:mb-4'>
          <Link to='/'>
            <img src={logo} alt='logo' />
          </Link>
        </div>
        <p className='fs-14 text-center text-primary-1A162E lg:fs-16 dark:text-white'>©2023 - Copyrights Trung</p>
      </div>
    </footer>
  )
}
