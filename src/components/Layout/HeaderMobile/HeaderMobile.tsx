import { Link } from 'react-router-dom'
import logo from 'src/assets/logo.svg'
import SwitchThemeButton from 'src/components/SwitchThemeButton'
import NavToggle from './NavToggle'

export default function HeaderMobile() {
  return (
    <div className='flex items-center justify-between py-4 px-4 md:hidden'>
      <Link to='/'>
        <img src={logo} alt='logo' width='166' height='51' />
      </Link>
      <div className='flex'>
        <div className='mr-12'>
          <SwitchThemeButton />
        </div>
        <NavToggle />
      </div>
    </div>
  )
}
