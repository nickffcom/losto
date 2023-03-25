import Button from 'src/components/Button'

export default function SortProductList() {
  return (
    <div className='rounded-8 px-3 py-2 dark:bg-white lg:p-4'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-4'>
          <p className='fs-18 font-semibold text-black'>SORT BY:</p>
          <div className='hidden items-center gap-4 md:flex '>
            <Button className='fs-14 flex h-10 items-center justify-center rounded-8 border border-gray-700 px-5 font-semibold duration-200 hover:border-secondary-26B374 hover:bg-secondary-26B374 hover:text-white'>
              Popular
            </Button>
            <Button className='fs-14 flex h-10 items-center justify-center rounded-8 border border-gray-700 px-5 font-semibold duration-200 hover:border-secondary-26B374 hover:bg-secondary-26B374 hover:text-white'>
              Latest
            </Button>
            <Button className='fs-14 flex h-10 items-center justify-center rounded-8 border border-gray-700 px-5 font-semibold duration-200 hover:border-secondary-26B374 hover:bg-secondary-26B374 hover:text-white'>
              Top Sales
            </Button>
            <div className='relative'>
              <select
                name=''
                value='Price'
                onChange={(e) => e.target.value}
                className='fs-14 flex h-10 appearance-none rounded-8 border border-gray-700 px-5 font-semibold hover:border-secondary-26B374'
              >
                <option value='Price' disabled>
                  Price
                </option>
                <option value='Price Low to High'>Price Low to High</option>
                <option value='Price High to Low'>Price High to Low</option>
              </select>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='absolute top-1/2 right-0 h-6 w-6 -translate-x-1/2 -translate-y-1/2'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
              </svg>
            </div>
          </div>
        </div>

        <div className='flex items-center gap-1'>
          <Button
            aria-label='prev-page'
            className='fs-14 flex h-10 items-center justify-center rounded-8 border border-gray-700 px-2 font-semibold duration-200 hover:border-secondary-26B374 hover:bg-secondary-26B374 hover:text-white'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-6 w-6'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
            </svg>
          </Button>
          <Button
            aria-label='next-page'
            className='fs-14 flex h-10 items-center justify-center rounded-8 border border-gray-700 px-2 font-semibold duration-200 hover:border-secondary-26B374 hover:bg-secondary-26B374 hover:text-white'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-6 w-6'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  )
}
