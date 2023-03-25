import { Link } from 'react-router-dom'
import { Product as ProductType } from 'src/types/product.type'
import { formatCurrency, formatNumberToSocialStyle } from 'src/utils/utils'
import ProductRating from '../ProductRating'

interface ProductProps {
  product: ProductType
}

export default function Product({ product }: ProductProps) {
  return (
    <div>
      <div className='card bg-gray-200 dark:border dark:border-gray-600 dark:bg-transparent'>
        <div className='relative overflow-hidden'>
          <Link to='' title={product.name}>
            <img src={product.image} width='294' height='294' alt={product.name} title={product.name} />
          </Link>
          <div className='card-content hidden bg-white opacity-90 dark:bg-gray-500 md:block'>
            <Link to='/' title={product.name}>
              <p className='card-button flex items-center justify-center gap-6'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-6 w-6 text-black hover:text-primary-377DFF dark:text-white'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
                  />
                </svg>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-6 w-6 text-black hover:text-primary-377DFF dark:text-white'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z'
                  />
                </svg>
              </p>
            </Link>
          </div>
          <div className='absolute bottom-0 block w-full bg-white py-2 opacity-80 dark:bg-gray-500 md:hidden'>
            <div className='flex items-center justify-around'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='h-6 w-6 text-black hover:text-primary-377DFF'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
                />
              </svg>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='h-6 w-6 text-black hover:text-primary-377DFF'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z'
                />
              </svg>
            </div>
          </div>
        </div>
        <Link to='' title='Samsung S23 Ultra 256GB'>
          <div className='bg-white p-4 dark:bg-transparent'>
            <h3 className='fs-16 font-semibold line-clamp-2 hover:text-secondary-1D6AF9'>{product.name}</h3>
            <div className='mt-2 flex items-center mlg:mt-3'>
              <p className='fs-14 max-w-[50%] truncate font-semibold text-red-700 line-through'>
                <span>₫</span>
                <span>{formatCurrency(product.price_before_discount)}</span>
              </p>
              <p className='text-primary-1A162E fs-14 ml-2 max-w-[50%] truncate font-semibold'>
                <span>₫</span>
                <span>{formatCurrency(product.price)}</span>
              </p>
            </div>
            <div className='mt-2 flex flex-wrap items-center justify-between mlg:mt-3 mlg:justify-end'>
              <ProductRating rating={product.rating} />
              <p className='text-primary-1A162E fs-14 font-semibold mlg:ml-2'>
                <span>{formatNumberToSocialStyle(product.sold)}</span>
                <span className='ml-1'>Sold</span>
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}
