import { Link } from 'react-router-dom'
import Input from 'src/components/Input'
import path from 'src/constants/path'

export default function AsideFilter() {
  return (
    <div className='rounded-8 px-3 py-2 opacity-80 dark:bg-white lg:p-4'>
      <Link
        to={path.home}
        title='All Categories'
        className='fs-18 flex items-center gap-2 border-b border-black pb-2 font-semibold uppercase text-black'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='h-6 w-6'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'
          />
        </svg>
        <span>All Categories</span>
      </Link>
      <ul className='mt-3 pl-4'>
        <li className='fs-14 py-1 font-medium duration-200 md:fs-16 hover:text-primary-377DFF md:py-2'>
          <Link to='/' title='Smart Phone'>
            Smart Phone
          </Link>
        </li>
        <li className='fs-14 py-1 font-medium duration-200 md:fs-16 hover:text-primary-377DFF md:py-2'>
          <Link to='/' title='Smart Phone'>
            Smart Phone
          </Link>
        </li>
        <li className='fs-14 py-1 font-medium duration-200 md:fs-16 hover:text-primary-377DFF md:py-2'>
          <Link to='/' title='Smart Phone'>
            Smart Phone
          </Link>
        </li>
      </ul>
      <div className='fs-18 mt-3 flex items-center gap-2 border-b border-black pb-2 font-semibold uppercase text-black'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='h-6 w-6'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z'
          />
        </svg>

        <span>Filters</span>
      </div>
      <p className='fs-14 mt-3 font-medium text-black'>Price Range</p>
      <form className='mt-2'>
        <div className='flex items-start'>
          <Input
            className='grow'
            classNameInput='w-full rounded-8 border bg-white py-2 px-3 outline-none transition-colors placeholder:fs-14 placeholder:capitalize'
            placeholder='From'
            name='price_min'
          />
          <div className='mx-2 mt-2 shrink-0'>-</div>
          <Input
            className='grow'
            classNameInput='w-full rounded-8 border bg-white py-2 px-3 outline-none transition-colors placeholder:fs-14 placeholder:capitalize'
            placeholder='To'
            name='price_max'
          />
        </div>
        <button className='fs-16 flex w-full items-center justify-center rounded-8 bg-primary-377DFF py-2 px-5 uppercase text-white transition-colors hover:bg-secondary-1D6AF9 mmd:p-2'>
          <span>Apply</span>
        </button>
      </form>
      <p className='fs-14 mt-3 font-medium text-black'>Feedback</p>
    </div>
  )
}
