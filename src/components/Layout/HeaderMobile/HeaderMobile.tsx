import { Link } from 'react-router-dom'
import logo from 'src/assets/logo.svg'
import Input from 'src/components/Input'
import SwitchThemeButton from 'src/components/SwitchThemeButton'
import NavToggle from './NavToggle'

export default function HeaderMobile() {
  return (
    <>
      <div className='flex items-center justify-between py-4 px-4'>
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
      <div className='mt-4 px-4'>
        <Input type='text' placeholder='Search' classNameError='hidden' />
      </div>
    </>
  )
}
