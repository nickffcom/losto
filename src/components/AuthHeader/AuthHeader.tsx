import { Link } from 'react-router-dom'
import logo from 'src/assets/logo.svg'
import SwitchThemeButton from '../SwitchThemeButton'
export default function AuthHeader() {
  return (
    <header className='bg-white py-6 dark:bg-dark-primary'>
      <div className='container'>
        <div className='flex items-center justify-between'>
          <Link to='/'>
            <img src={logo} alt='logo' />
          </Link>
          <SwitchThemeButton />
        </div>
      </div>
    </header>
  )
}
