import { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from 'src/assets/logo.svg'

export default function HeaderMobile() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className='flex items-center justify-between py-4 md:hidden'>
      <Link to='/'>
        <img src={logo} alt='logo' />
      </Link>
      <button className='group flex h-12 w-12 flex-col items-center justify-center' onClick={() => setIsOpen(!isOpen)}>
        <div
          className={`ease my-1 h-1 w-8 transform rounded-full bg-black transition duration-300 dark:bg-white ${
            isOpen ? 'translate-y-3 rotate-45 opacity-50 group-hover:opacity-100' : 'opacity-50 group-hover:opacity-100'
          }`}
        />
        <div
          className={`ease my-1 h-1 w-8 transform rounded-full bg-black transition duration-300 dark:bg-white ${
            isOpen ? 'opacity-0' : 'opacity-50 group-hover:opacity-100'
          }`}
        />
        <div
          className={`ease my-1 h-1 w-8 transform rounded-full bg-black transition duration-300 dark:bg-white ${
            isOpen
              ? '-translate-y-3 -rotate-45 opacity-50 group-hover:opacity-100'
              : 'opacity-50 group-hover:opacity-100'
          }`}
        />
      </button>
      {isOpen && (
        <div
          className='absolute top-0  h-full 
             w-full bg-white duration-300 ease-in-out'
        >
          <button
            className='group my-4 ml-auto flex h-12 w-12 flex-col items-center justify-center'
            onClick={() => setIsOpen(!isOpen)}
          >
            <div
              className={`ease my-1 h-1 w-8 transform rounded-full bg-black transition duration-300  ${
                isOpen
                  ? 'translate-y-3 rotate-45 opacity-50 group-hover:opacity-100'
                  : 'opacity-50 group-hover:opacity-100'
              }`}
            />
            <div
              className={`ease my-1 h-1 w-8 transform rounded-full bg-black transition duration-300 ${
                isOpen ? 'opacity-0' : 'opacity-50 group-hover:opacity-100'
              }`}
            />
            <div
              className={`ease my-1 h-1 w-8 transform rounded-full bg-black transition duration-300 ${
                isOpen
                  ? '-translate-y-3 -rotate-45 opacity-50 group-hover:opacity-100'
                  : 'opacity-50 group-hover:opacity-100'
              }`}
            />
          </button>
          <ul className='flex flex-col items-center justify-start dark:text-black'>
            <li className='my-4'>
              <Link to='/'>Home</Link>
            </li>
            <li className='my-4'>
              <Link to='/about'>About</Link>
            </li>
            <li className='my-4'>
              <Link to='/contact'>Contact</Link>
            </li>
            <li className='my-4'>
              <Link to='/faqs'>FAQs</Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}
