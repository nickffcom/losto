import { createSearchParams, useNavigate } from 'react-router-dom'

import path from 'src/constants/path'
import { QueryConfig } from 'src/hooks/useQueryConfig'

/**
 * index 0: Có 5 cái màu vàng tương ứng từ indexStar 0 - 4 đều màu vang
 * index 1: Có 4 cái màu vàng tương ứng từ indexStar 0 - 3 đều màu vang
 * index 2: Có 3 cái màu vàng tương ứng từ indexStar 0 - 2 đều màu vang
 * index 3: Có 2 cái màu vàng tương ứng từ indexStar 0 - 1 đều màu vang
 * index 4: Có 1 cái màu vàng tương ứng indexStar 0 đều màu vang
 *
 * Chúng ta nhận ra là indexStar < 5 - index => màu vàng
 */

interface Props {
  queryConfig: QueryConfig
}

export default function RatingStars({ queryConfig }: Props) {
  const navigate = useNavigate()

  const handleFilterStar = (ratingFilter: number) => {
    navigate({
      pathname: path.productlist,
      search: createSearchParams({
        ...queryConfig,
        rating_filter: String(ratingFilter)
      }).toString()
    })
  }

  return (
    <ul className='my-3'>
      {[...Array(5)].map((_, index) => (
        <li className='py-1 pl-2' key={index}>
          <div
            className='flex items-center text-sm'
            role='button'
            aria-label='star'
            tabIndex={0}
            onClick={() => handleFilterStar(5 - index)}
            onKeyUp={(event) => {
              if (event.key === 'Enter' || index === 13) {
                handleFilterStar(5 - index)
              }
            }}
          >
            {[...Array(5)].map((_, index2) => (
              <svg
                key={index2}
                enableBackground='new 0 0 24 24'
                viewBox='0 0 24 24'
                x={0}
                y={0}
                className={`mr-1 h-4 w-4 cursor-pointer fill-slate-300 ${
                  index2 >= 5 - index ? 'selected' : 'unselected'
                }`}
              >
                <path
                  id='Stroke 1'
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M13.1043 4.17701L14.9317 7.82776C15.1108 8.18616 15.4565 8.43467 15.8573 8.49218L19.9453 9.08062C20.9554 9.22644 21.3573 10.4505 20.6263 11.1519L17.6702 13.9924C17.3797 14.2718 17.2474 14.6733 17.3162 15.0676L18.0138 19.0778C18.1856 20.0698 17.1298 20.8267 16.227 20.3574L12.5732 18.4627C12.215 18.2768 11.786 18.2768 11.4268 18.4627L7.773 20.3574C6.87023 20.8267 5.81439 20.0698 5.98724 19.0778L6.68385 15.0676C6.75257 14.6733 6.62033 14.2718 6.32982 13.9924L3.37368 11.1519C2.64272 10.4505 3.04464 9.22644 4.05466 9.08062L8.14265 8.49218C8.54354 8.43467 8.89028 8.18616 9.06937 7.82776L10.8957 4.17701C11.3477 3.27433 12.6523 3.27433 13.1043 4.17701Z'
                />
              </svg>
            ))}

            <span>({5 - index})</span>
          </div>
        </li>
      ))}
    </ul>
  )
}
