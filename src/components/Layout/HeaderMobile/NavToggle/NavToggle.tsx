import { Link } from 'react-router-dom'

export default function NavToggle() {
  return (
    <div className='nav-toggle'>
      <input type='checkbox' id='navi-toggle' className='nav-toggle-checkbox' />
      <label htmlFor='navi-toggle' className='nav-toggle-button'>
        <span className='horizontal-icon'>&nbsp;</span>
      </label>
      <div className='background'>&nbsp;</div>
      <nav className='nav-list-mobile'>
        <ul className='mt-12 w-full list-none text-white'>
          <li className='mx-4 my-3 text-2xl'>
            <Link to='/' className='nav-link-hover-effect duration-200'>
              Home
            </Link>
          </li>
          <li className='mx-4 my-3 text-2xl'>
            <Link to='/' className='nav-link-hover-effect duration-200'>
              About
            </Link>
          </li>
          <li className='mx-4 my-3 text-2xl'>
            <Link to='/' className='nav-link-hover-effect duration-200'>
              Contact
            </Link>
          </li>
          <li className='mx-4 my-3 text-2xl'>
            <Link to='/' className='nav-link-hover-effect duration-200'>
              FAQs
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}
