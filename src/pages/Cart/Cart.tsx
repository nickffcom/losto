import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import purchaseApi from 'src/apis/purchase.api'
import QuantityController from 'src/components/QuantityController'
import { purchaseStatus } from 'src/constants/purchase'
import { Purchase } from 'src/types/purchase.type'
import { formatCurrency } from 'src/utils/utils'
import { produce } from 'immer'
import { keyBy } from 'lodash'

interface ExtendedPurchase extends Purchase {
  disabled: boolean
  checked: boolean
}

export default function Cart() {
  const [extendedPurchase, setExtendedPurchase] = useState<ExtendedPurchase[]>([])
  const { data: ProductCart, refetch } = useQuery({
    queryKey: ['purchases', { status: purchaseStatus.inCart }],
    queryFn: () => purchaseApi.getPurchases({ status: purchaseStatus.inCart })
  })
  const ProductDataCart = ProductCart?.data.data

  const updatePurchaseMutation = useMutation({
    mutationFn: purchaseApi.updatePurchase,
    onSuccess: () => {
      refetch()
    }
  })

  useEffect(() => {
    setExtendedPurchase((prev) => {
      const extendedPurchaseObject = keyBy(prev, '_id')
      return (
        ProductDataCart?.map((purchase) => ({
          ...purchase,
          disabled: false,
          checked: Boolean(extendedPurchaseObject[purchase._id]?.checked)
        })) || []
      )
    })
  }, [ProductDataCart])

  const handleChecked = (purchaseIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setExtendedPurchase(
      produce((draft) => {
        draft[purchaseIndex].checked = event.target.checked
      })
    )
  }

  const isAllChecked = extendedPurchase.every((purchase) => purchase.checked)

  const handledCheckAll = () => {
    setExtendedPurchase((prev) => prev.map((purchase) => ({ ...purchase, checked: !isAllChecked })))
  }

  const handleQuantity = (purchaseIndex: number, value: number, enabled: boolean) => {
    if (enabled) {
      const purchase = extendedPurchase[purchaseIndex]
      setExtendedPurchase(
        produce((draft) => {
          draft[purchaseIndex].disabled = true
        })
      )
      updatePurchaseMutation.mutate({
        product_id: purchase.product._id,
        buy_count: value
      })
    }
  }

  // const handleBlur = () => {}
  const handleTypeQuantity = (purchaseIndex: number) => (value: number) => {
    setExtendedPurchase(
      produce((draft) => {
        draft[purchaseIndex].buy_count = value
      })
    )
  }

  return (
    <>
      <div className='mt-10'>
        <h1 className='mb-10 text-center text-2xl font-bold text-primary-377DFF'>Cart Items</h1>
        <div className='xl:px-0 mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6'>
          <div className='rounded-lg md:w-2/3'>
            <div className='mb-4 pl-6'>
              <input type='checkbox' name='' id='select-all' checked={isAllChecked} onChange={handledCheckAll} />
              <label htmlFor='select-all' className='ml-2'>
                Select All ( {extendedPurchase.length} )
              </label>
              <button className='ml-6 duration-200 hover:text-red-600'>Remove All</button>
            </div>
            {extendedPurchase?.map((item, index) => (
              <div
                className='mb-6 justify-between rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start'
                key={item._id}
              >
                <input type='checkbox' name='' id='' checked={item.checked} onChange={handleChecked(index)} />
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  title={item.product.name}
                  className='w-full rounded-lg sm:w-40 lg:ml-2'
                />
                <div className='sm:ml-2 sm:flex sm:w-full sm:justify-between'>
                  <div className='mt-5 sm:mt-0'>
                    <h2 className='text-lg font-bold text-gray-900 line-clamp-3'>{item.product.name}</h2>
                    <p className='fs-12 mt-1 text-gray-700'>{item.product.category.name}</p>
                  </div>
                  <div className='mt-4 flex justify-between sm:mt-0 md:flex-col md:items-end'>
                    <QuantityController
                      max={item.product.quantity}
                      value={item.buy_count}
                      onIncrease={(value) => handleQuantity(index, value, value <= item.product.quantity)}
                      onDecrease={(value) => handleQuantity(index, value, value >= 1)}
                      disabled={item.disabled}
                      onFocusOut={(value) =>
                        handleQuantity(
                          index,
                          value,
                          value >= 1 &&
                            value <= item.product.quantity &&
                            value !== (ProductDataCart as Purchase[])[index].buy_count
                        )
                      }
                      onTyping={handleTypeQuantity(index)}
                    />
                    <p className='fs-14 mt-2 text-red-600 line-through'>
                      {formatCurrency(item.price_before_discount)} đ
                    </p>
                    <p className='fs-14 mt-2'>{formatCurrency(item.price * item.buy_count)} đ</p>
                    <button className='fs-14 mt-2 text-center duration-200 hover:text-red-600'>Remove</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Sub total */}
          <div className='mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3'>
            <div className='mb-2 flex justify-between'>
              <p className='text-gray-700'>Subtotal</p>
              <p className='text-gray-700'>$129.99</p>
            </div>
            <div className='flex justify-between'>
              <p className='text-gray-700'>Shipping</p>
              <p className='text-gray-700'>$4.99</p>
            </div>
            <hr className='my-4' />
            <div className='flex justify-between'>
              <p className='text-lg font-bold'>Total</p>
              <p className='mb-1 text-lg font-bold'>$134.98 USD</p>
            </div>
            <button className='button-primary mt-6 w-full rounded-md py-1.5 font-medium before:w-[350px]'>
              Check out
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
