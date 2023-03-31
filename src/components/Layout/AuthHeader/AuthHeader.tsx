import { Link } from 'react-router-dom'
import logo from 'src/assets/logo.svg'
import SwitchThemeButton from '../../SwitchThemeButton'
export default function AuthHeader() {
  return (
    <header className=' py-6'>
      <div className='container'>
        <div className='flex items-center justify-between'>
          <Link to='/'>
            <img src={logo} alt='logo' width='166' height='51' />
          </Link>
          <SwitchThemeButton />
        </div>
      </div>
    </header>
  )
}
