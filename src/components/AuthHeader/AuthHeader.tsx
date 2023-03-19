import { Link } from 'react-router-dom'

export default function AuthHeader() {
  return (
    <header className='py-6'>
      <div className='container'>
        <nav className='flex items-end'>
          <Link to='/'>Logo</Link>
        </nav>
      </div>
    </header>
  )
}
