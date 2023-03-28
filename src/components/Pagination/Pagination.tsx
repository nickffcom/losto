import classNames from 'classnames'
import { Link, createSearchParams } from 'react-router-dom'
import path from 'src/constants/path'
import { QueryConfig } from 'src/pages/ProductList/ProductList'

interface PaginationProps {
  queryConfig: QueryConfig
  pageSize: number
}

const RANGE = 2
export default function Pagination({ queryConfig, pageSize }: PaginationProps) {
  const page = Number(queryConfig.page)

  const renderPagination = () => {
    let dotAfter = false
    let dotBefore = false
    const renderDotBefore = (index: number) => {
      if (!dotBefore) {
        dotBefore = true
        return (
          <span
            key={index}
            className='b-sd flex h-7 w-7 items-center justify-center rounded-8 bg-transparent p-1 transition-colors lg:h-8 lg:w-8 lg:p-2'
          >
            ...
          </span>
        )
      }
    }
    const renderDotAfter = (index: number) => {
      if (!dotAfter) {
        dotAfter = true
        return (
          <span
            key={index}
            className='b-sd flex h-7 w-7 items-center justify-center rounded-8 bg-transparent p-1 transition-colors lg:h-8 lg:w-8 lg:p-2'
          >
            ...
          </span>
        )
      }
    }
    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1

        // Điều kiện để return về ...
        const lowerLimit = RANGE * 2 + 1
        const upperLimit = pageSize - RANGE * 2

        if (page <= lowerLimit && pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1) {
          return renderDotAfter(index)
        } else if (page > lowerLimit && page < upperLimit) {
          if (pageNumber < page - RANGE) {
            return renderDotBefore(index)
          } else if (pageNumber > page + RANGE) {
            return renderDotAfter(index)
          }
        } else if (page >= upperLimit && pageNumber > RANGE && pageNumber < page - RANGE) {
          return renderDotBefore(index)
        }

        return (
          <Link
            to={{
              pathname: path.productlist,
              search: createSearchParams({
                ...queryConfig,
                page: pageNumber.toString()
              }).toString()
            }}
            key={index}
            className={classNames(
              'b-sd flex h-7 w-7 items-center justify-center rounded-8 border bg-transparent p-1 transition-colors lg:h-8 lg:w-8 lg:p-2',
              {
                'border-primary-377DFF': pageNumber === page,
                '': pageNumber !== page
              }
            )}
          >
            {pageNumber}
          </Link>
        )
      })
  }
  return (
    <div>
      <div className='mt-5 flex flex-wrap justify-center gap-3 lg:mt-6'>
        {page === 1 ? (
          <span className='b-sd flex h-7 w-7 cursor-not-allowed items-center justify-center rounded-8 border p-1 lg:h-8 lg:w-8 lg:p-2'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              aria-hidden='true'
              className='h-4 w-4'
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
            className='b-sd flex h-7 w-7 cursor-pointer items-center justify-center rounded-8 border p-1 lg:h-8 lg:w-8 lg:p-2'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              aria-hidden='true'
              className='h-4 w-4'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
            </svg>
          </Link>
        )}

        {renderPagination()}
        {page === pageSize ? (
          <span className='b-sd flex h-7 w-7 cursor-not-allowed items-center justify-center rounded-8 border bg-transparent p-1 transition-colors lg:h-8 lg:w-8 lg:p-2'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              aria-hidden='true'
              className='h-4 w-4'
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
            className=' b-sd flex h-7 w-7 cursor-pointer items-center justify-center rounded-8 border bg-transparent p-1 transition-colors lg:h-8 lg:w-8 lg:p-2'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              aria-hidden='true'
              className='h-4 w-4'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
            </svg>
          </Link>
        )}
      </div>
    </div>
  )
}
