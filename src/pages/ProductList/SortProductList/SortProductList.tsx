import { sortBy, order as orderConstant } from 'src/constants/product'
import Button from 'src/components/Button'
import { QueryConfig } from '../ProductList'
import classNames from 'classnames'
import { ProductListConfig } from 'src/types/product.type'
import { createSearchParams, Link, useNavigate } from 'react-router-dom'
import path from 'src/constants/path'
import { omit } from 'lodash'
interface PaginationProps {
  queryConfig: QueryConfig
  pageSize: number
}

export default function SortProductList({ queryConfig, pageSize }: PaginationProps) {
  const page = Number(queryConfig.page)
  const { sort_by = sortBy.createdAt, order } = queryConfig
  const navigate = useNavigate()

  const isActiveSortBy = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    return sort_by === sortByValue
  }

  const handleSort = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    navigate({
      pathname: path.productlist,
      search: createSearchParams(
        omit(
          {
            ...queryConfig,
            sort_by: sortByValue
          },
          ['order']
        )
      ).toString()
    })
  }

  const handlePriceOrder = (orderValue: Exclude<ProductListConfig['order'], undefined>) => {
    navigate({
      pathname: path.productlist,
      search: createSearchParams({
        ...queryConfig,
        sort_by: sortBy.price,
        order: orderValue
      }).toString()
    })
  }

  return (
    <div className='rounded-8 px-3 py-2 dark:bg-white lg:p-4'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-4'>
          <p className='fs-18 font-semibold text-black'>SORT BY:</p>
          <div className='hidden items-center gap-4 md:flex '>
            <Button
              className={classNames(
                'fs-14 flex h-10 items-center justify-center rounded-8 border border-gray-700 px-5 font-semibold duration-200',
                {
                  'border-secondary-26B374 bg-secondary-26B374 text-white': isActiveSortBy(sortBy.view),
                  'hover:border-secondary-26B374 hover:bg-secondary-26B374 hover:text-white': !isActiveSortBy(
                    sortBy.view
                  )
                }
              )}
              onClick={() => handleSort(sortBy.view)}
            >
              Popular
            </Button>
            <Button
              className={classNames(
                'fs-14 flex h-10 items-center justify-center rounded-8 border border-gray-700 px-5 font-semibold duration-200',
                {
                  'border-secondary-26B374 bg-secondary-26B374 text-white': isActiveSortBy(sortBy.createdAt),
                  'hover:border-secondary-26B374 hover:bg-secondary-26B374 hover:text-white': !isActiveSortBy(
                    sortBy.createdAt
                  )
                }
              )}
              onClick={() => handleSort(sortBy.createdAt)}
            >
              Latest
            </Button>
            <Button
              className={classNames(
                'fs-14 flex h-10 items-center justify-center rounded-8 border border-gray-700 px-5 font-semibold duration-200',
                {
                  'border-secondary-26B374 bg-secondary-26B374 text-white': isActiveSortBy(sortBy.sold),
                  'hover:border-secondary-26B374 hover:bg-secondary-26B374 hover:text-white': !isActiveSortBy(
                    sortBy.sold
                  )
                }
              )}
              onClick={() => handleSort(sortBy.sold)}
            >
              Top Sales
            </Button>
            <div className='relative'>
              <select
                value={order || ''}
                onChange={(e) => handlePriceOrder(e.target.value as Exclude<ProductListConfig['order'], undefined>)}
                className={classNames(
                  'fs-14 flex h-10 appearance-none rounded-8 border border-gray-700 pl-4 pr-10 font-semibold duration-200',
                  {
                    'border-secondary-26B374': isActiveSortBy(sortBy.price),
                    'hover:border-secondary-26B374': !isActiveSortBy(sortBy.price)
                  }
                )}
              >
                <option value='' disabled>
                  Price
                </option>
                <option value={orderConstant.asc}>Price Low to High</option>
                <option value={orderConstant.desc}>Price High to Low</option>
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
          <p className='mr-2'>
            {page}/{pageSize}
          </p>
          {page === 1 ? (
            <span className='fs-14 flex h-10 cursor-not-allowed items-center justify-center rounded-8 border border-gray-700 px-2 font-semibold duration-200 hover:border-secondary-26B374 hover:bg-secondary-26B374 hover:text-white'>
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
            </span>
          ) : (
            <Link
              to={{
                pathname: path.productlist,
                search: createSearchParams({
                  ...queryConfig,
                  page: (page - 1).toString()
                }).toString()
              }}
              aria-label='prev'
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
            </Link>
          )}
          {page === pageSize ? (
            <span className='fs-14 flex h-10 items-center justify-center rounded-8 border border-gray-700 px-2 font-semibold duration-200 hover:border-secondary-26B374 hover:bg-secondary-26B374 hover:text-white'>
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
            </span>
          ) : (
            <Link
              to={{
                pathname: path.productlist,
                search: createSearchParams({
                  ...queryConfig,
                  page: (page + 1).toString()
                }).toString()
              }}
              aria-label='next'
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
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
