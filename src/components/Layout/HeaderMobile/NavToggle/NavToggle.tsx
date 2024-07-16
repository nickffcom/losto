import { Link } from 'react-router-dom'

import Accordion from 'src/components/Accordion'
import path from 'src/constants/path'
import { User } from 'src/types/user.type'

interface NavToggleProps {
  handleLogout: () => void
  isAuthenticated: boolean
  profile: User | null
}

export default function NavToggle({ handleLogout, isAuthenticated, profile }: NavToggleProps) {
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
            <Accordion
              title={profile?.email ? (profile?.email as string) : 'Menu'}
              content={
                !isAuthenticated ? (
                  <>
                    <li className='my-3 text-xl'>
                      <Link to={path.login} className='nav-link-hover-effect duration-200'>
                        Login
                      </Link>
                    </li>
                    <li className='my-3 text-xl'>
                      <Link to={path.register} className='nav-link-hover-effect duration-200'>
                        Register
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li className='my-3 text-xl'>
                      <Link to={path.profile} className='nav-link-hover-effect duration-200'>
                        Profile
                      </Link>
                    </li>
                    <li className='my-3 text-xl'>
                      <Link to={path.historyPurchase} className='nav-link-hover-effect duration-200'>
                        Purchase
                      </Link>
                    </li>
                    <li className='my-3 text-xl'>
                      <button className='nav-link-hover-effect duration-200' onClick={handleLogout}>
                        Logout
                      </button>
                    </li>
                  </>
                )
              }
            />
            <li className='my-3 text-xl'>
              <Link to={path.home} className='nav-link-hover-effect duration-200'>
                Home
              </Link>
            </li>
            <li className='my-3 text-xl'>
              <Link
                to={`${path.productlist}?category=641a5fc38383ec002c66151f`}
                className='nav-link-hover-effect duration-200'
              >
                Shop
              </Link>
            </li>
            <li className='my-3 text-xl'>
              <Link to='/' className='nav-link-hover-effect duration-200'>
                About
              </Link>
            </li>
            <li className='my-3 text-xl'>
              <Link to='/' className='nav-link-hover-effect duration-200'>
                Contact
              </Link>
            </li>
            <li className='my-3 text-xl'>
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
