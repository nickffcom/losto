import { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from 'src/assets/logo.svg'
import NavToggle from './NavToggle'

export default function HeaderMobile() {
  return (
    <div className='flex items-center justify-between py-4 md:hidden'>
      <Link to='/'>
        <img src={logo} alt='logo' />
      </Link>
      <NavToggle />
    </div>
  )
}
