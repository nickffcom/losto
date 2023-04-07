import { createSearchParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames'

import purchaseApi from 'src/apis/purchase.api'
import path from 'src/constants/path'
import { purchaseStatus } from 'src/constants/purchase'
import useQueryParams from 'src/hooks/useQueryParams'
import { PurchaseListStatus } from 'src/types/purchase.type'
import { formatCurrency, generateNameId } from 'src/utils/utils'

const purchaseTabs = [
  {
    status: purchaseStatus.all,
    name: 'All'
  },
  {
    status: purchaseStatus.waitForConfirmation,
    name: 'Waiting for comfirm'
  },
  {
    status: purchaseStatus.waitForGetting,
    name: 'Waiting For Getting'
  },
  {
    status: purchaseStatus.inProgress,
    name: 'In Progress'
  },
  {
    status: purchaseStatus.delivered,
    name: 'Delivered'
  },
  {
    status: purchaseStatus.cancelled,
    name: 'Cancelled'
  }
]

export default function HistoryPurchase() {
  const queryParams: { status?: string } = useQueryParams()
  const status: number = Number(queryParams.status) || purchaseStatus.all

  const { data: purchaseData } = useQuery({
    queryKey: ['purchases', { status }],
    queryFn: () => purchaseApi.getPurchases({ status: status as PurchaseListStatus })
  })
  const PurchaseData = purchaseData?.data.data

  const purchaseTabsLink = purchaseTabs.map((tab) => (
    <Link
      key={tab.status}
      to={{
        pathname: path.historyPurchase,
        search: createSearchParams({
          status: String(tab.status)
        }).toString()
      }}
      className={classNames(
        'fs-14 flex flex-1 items-center justify-center whitespace-nowrap rounded-8 border bg-white p-2 text-center transition-colors md:fs-16 md:px-4 md:py-3',
        {
          'font-semibold text-secondary-26B374': status === tab.status
        }
      )}
    >
      {tab.name}
    </Link>
  ))

  return (
    <>
      <div className='overflow-x-auto'>
        <div className='min-w-[700px]'>
          <div className='sticky top-0 flex h-[73px] items-center gap-3 border-b border-t p-3 md:h-[81px] md:gap-4 md:px-6 md:py-4 mmd:border-l mmd:border-t-0'>
            {purchaseTabsLink}
          </div>
          <div className='scroll-bar-purchase overflow-y-auto'>
            <div className='max-h-[518px] '>
              <div className='p-3 md:p-4 mmd:border-l'>
                {PurchaseData?.map((purchase) => (
                  <div
                    key={purchase._id}
                    className='mt-3 rounded-16 border bg-white p-4 text-gray-800 transition-colors first:mt-0 hover:shadow-sm md:mt-4 md:p-6'
                  >
                    <Link
                      to={`${path.home}${generateNameId({
                        name: purchase.product.name,
                        id: purchase.product._id
                      })}`}
                      className='flex'
                    >
                      <div className='flex-shrink-0'>
                        <img
                          className='h-16 w-16 object-cover md:h-20 md:w-20'
                          src={purchase.product.image}
                          alt={purchase.product.name}
                          title={purchase.product.name}
                        />
                      </div>
                      <div className='ml-3 flex-grow overflow-hidden'>
                        <h2 className='fs-14 truncate font-semibold capitalize mlg:fs-16'>{purchase.product.name}</h2>
                        <span className='fs-14'>(x{purchase.buy_count})</span>
                      </div>
                      <div className='ml-3 mt-auto flex-shrink-0'>
                        <p className='text-end'>
                          <span className='fs-14 truncate text-red-600 line-through'>
                            ₫{formatCurrency(purchase.product.price_before_discount)}
                          </span>
                          <span className='fs-14 ml-2 truncate'>₫{formatCurrency(purchase.product.price)}</span>
                        </p>
                        <div className='flex items-center justify-end'>
                          <span className='fs-14 lg:fs-16'>Total:</span>
                          <span className='fs-18 ml-2 font-semibold lg:fs-20'>
                            ₫{formatCurrency(purchase.product.price * purchase.buy_count)}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
