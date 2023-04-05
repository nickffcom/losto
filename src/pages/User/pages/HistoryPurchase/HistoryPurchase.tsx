import { Link } from 'react-router-dom'
import path from 'src/constants/path'

export default function HistoryPurchase() {
  return (
    <>
      <div className='overflow-x-auto scrollbar-thin scrollbar-track-rounded-8 scrollbar-thumb-rounded-8'>
        <div className='min-w-[700px]'>
          <div className='sticky top-0 flex h-[73px] items-center gap-3 border-b border-t p-3 md:h-[81px] md:gap-4 md:py-4 md:px-6 mmd:border-t-0 mmd:border-l'>
            <Link
              to={`${path.home}`}
              className='fs-14 flex flex-1 items-center justify-center whitespace-nowrap rounded-8 border bg-white p-2 text-center font-semibold transition-colors md:fs-16 md:py-3 md:px-4'
            >
              Tất Cả
            </Link>
          </div>
          <div className='overflow-y-auto scrollbar-thin scrollbar-track-rounded-8 scrollbar-thumb-rounded-8'>
            <div className='max-h-[518px] '>
              <div className='p-3 md:p-4 mmd:border-l' />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
