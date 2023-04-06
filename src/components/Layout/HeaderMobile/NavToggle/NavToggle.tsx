import { Link } from 'react-router-dom'
import path from 'src/constants/path'

export default function NavToggle() {
  return (
    <div className='nav-toggle'>
      <input type='checkbox' id='navi-toggle' className='nav-toggle-checkbox' />
      <label htmlFor='navi-toggle' className='nav-toggle-button'>
        <span className='horizontal-icon'>&nbsp;</span>
      </label>
      <div className='background'>&nbsp;</div>
      <nav className='nav-list-mobile'>
        <div className='mx-4'>
          <ul className='mt-20 w-full list-none text-right text-white'>
            <li className='my-3 text-2xl'>
              <Link to={path.home} className='nav-link-hover-effect duration-200'>
                Home
              </Link>
            </li>
            <li className='my-3 text-2xl'>
              <Link
                to={`${path.productlist}?category=641a5fc38383ec002c66151f`}
                className='nav-link-hover-effect duration-200'
              >
                Shop
              </Link>
            </li>
            <li className='my-3 text-2xl'>
              <Link to='/' className='nav-link-hover-effect duration-200'>
                About
              </Link>
            </li>
            <li className='my-3 text-2xl'>
              <Link to='/' className='nav-link-hover-effect duration-200'>
                Contact
              </Link>
            </li>
            <li className='my-3 text-2xl'>
              <Link to='/' className='nav-link-hover-effect duration-200'>
                FAQs
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  )
}
