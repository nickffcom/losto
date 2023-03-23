import { Link } from 'react-router-dom'
import logo from 'src/assets/logo.svg'

export default function Footer() {
  return (
    <footer className='mt-20 py-5 font-lotso-ecom'>
      <div className='container'>
        <div className='mb-2 flex items-center justify-center lg:mb-4'>
          <Link to='/'>
            <img src={logo} alt='logo' width='166' height='51' />
          </Link>
        </div>
        <p className='text-primary-1A162E fs-14 text-center lg:fs-16 dark:text-white'>©2023 - Copyrights Trung</p>
      </div>
    </footer>
  )
}
