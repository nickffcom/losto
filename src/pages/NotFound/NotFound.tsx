import Lottie from 'react-lottie'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

import PageNotFound from 'src/assets/images/404-error-page.json'
export default function NotFound() {
  return (
    <div className='container'>
      <Helmet>
        <title>Not Found | Lotso Shop</title>
        <meta name='description' content='Not found' />
      </Helmet>
      <Lottie
        options={{
          loop: true,
          autoplay: true,
          animationData: PageNotFound,
          rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
          }
        }}
        speed={0.5}
      />
      <div className='text-center'>
        <Link to='/' className='fs-20 font-semibold hover:text-primary-377DFF'>
          Go Home
        </Link>
      </div>
    </div>
  )
}
