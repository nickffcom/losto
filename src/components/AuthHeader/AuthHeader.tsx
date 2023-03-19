import { Link } from 'react-router-dom'
import logo from 'src/assets/logo.svg'
export default function AuthHeader() {
  return (
    <header className='py-6'>
      <div className='container'>
        <nav className='flex items-end'>
          <Link to='/'>
            <img src={logo} alt='logo' />
          </Link>
        </nav>
      </div>
    </header>
  )
}
