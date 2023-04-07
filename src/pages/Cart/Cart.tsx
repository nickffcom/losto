import { Fragment, useContext, useEffect, useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useMutation, useQuery } from '@tanstack/react-query'
import { produce } from 'immer'
import keyBy from 'lodash/keyBy'

import purchaseApi from 'src/apis/purchase.api'
import QuantityController from 'src/components/QuantityController'
import path from 'src/constants/path'
import { purchaseStatus } from 'src/constants/purchase'
import { AppContext } from 'src/contexts/app.context'
import { Purchase } from 'src/types/purchase.type'
import { formatCurrency } from 'src/utils/utils'

export default function Cart() {
  const { extendedPurchase, setExtendedPurchase } = useContext(AppContext)
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

  const buyProductsMutation = useMutation({
    mutationFn: purchaseApi.buyProducts,
    onSuccess: (data) => {
      toast.success(data.data.message, {
        autoClose: 1000
      })
      refetch()
    }
  })

  const deletePurchaseMutation = useMutation({
    mutationFn: purchaseApi.deletePurchase,
    onSuccess: () => {
      refetch()
    }
  })
  const location = useLocation()
  const choosenPurchaseIdFromLocation = (location.state as { purchaseId: string } | null)?.purchaseId
  const isAllChecked = useMemo(() => extendedPurchase.every((purchase) => purchase.checked), [extendedPurchase])
  const checkedPurchases = useMemo(() => extendedPurchase.filter((purchase) => purchase.checked), [extendedPurchase])
  const checkedPurchasesCount = checkedPurchases.length
  const checkedPurchasesCountQuantity = useMemo(
    () =>
      checkedPurchases.reduce((result, current) => {
        return result + current.buy_count
      }, 0),
    [checkedPurchases]
  )
  const totalCheckedPurchasePrice = useMemo(
    () =>
      checkedPurchases.reduce((result, current) => {
        return result + current.product.price * current.buy_count
      }, 0),
    [checkedPurchases]
  )
  const totalCheckedPurchaseSave = useMemo(
    () =>
      checkedPurchases.reduce((result, current) => {
        return result + (current.product.price_before_discount - current.product.price) * current.buy_count
      }, 0),
    [checkedPurchases]
  )
  const totalCheckedPurchaseNotSave = useMemo(
    () =>
      checkedPurchases.reduce((result, current) => {
        return result + current.product.price_before_discount * current.buy_count
      }, 0),
    [checkedPurchases]
  )
  const handleChecked = (purchaseIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setExtendedPurchase(
      produce((draft) => {
        draft[purchaseIndex].checked = event.target.checked
      })
    )
  }

  useEffect(() => {
    setExtendedPurchase((prev) => {
      const extendedPurchaseObject = keyBy(prev, '_id')
      return (
        ProductDataCart?.map((purchase) => {
          const isChoosenPurchaseIdFromLocation = choosenPurchaseIdFromLocation === purchase._id
          return {
            ...purchase,
            disabled: false,
            checked: isChoosenPurchaseIdFromLocation || Boolean(extendedPurchaseObject[purchase._id]?.checked)
          }
        }) || []
      )
    })
  }, [ProductDataCart, choosenPurchaseIdFromLocation, setExtendedPurchase])

  useEffect(() => {
    return () => {
      history.replaceState(null, '')
    }
  }, [])

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

  const handleDelete = (purchaseIndex: number) => () => {
    const purchaseId = extendedPurchase[purchaseIndex]._id
    deletePurchaseMutation.mutate([purchaseId])
  }

  const handleDeleteManyPurchases = () => {
    const purchasesIds = checkedPurchases.map((purchase) => purchase._id)
    deletePurchaseMutation.mutate(purchasesIds)
  }

  const handleBuyPurchase = () => {
    if (checkedPurchases.length > 0) {
      const body = checkedPurchases.map((purchase) => ({
        product_id: purchase.product._id,
        buy_count: purchase.buy_count
      }))
      buyProductsMutation.mutate(body)
    }
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
              <button className='ml-6 duration-200 hover:text-red-600' onClick={handleDeleteManyPurchases}>
                Remove All
              </button>
            </div>

            {extendedPurchase.length ? (
              <Fragment>
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
                        <div className='mt-2 flex gap-2 md:flex-col'>
                          <p className='fs-14 text-red-600 line-through'>
                            {formatCurrency(item.price_before_discount)} đ
                          </p>
                          <p className='fs-14'>{formatCurrency(item.price)} đ</p>
                        </div>
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
                        <button
                          className='button-secondary fs-14 mt-2 text-center duration-200'
                          onClick={handleDelete(index)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </Fragment>
            ) : (
              <div className='mt-6 text-center font-bold'>
                <p>Cart empty</p>
                <Link to={path.productlist} title='Shop Now'>
                  <div className='button-secondary mt-5 inline-block'>Shop Now</div>
                </Link>
              </div>
            )}
          </div>
          {/* Sub total */}
          <div className='mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3'>
            <div className='mb-2 flex justify-between'>
              <p className='text-gray-700'>Total products:</p>
              <p className='text-gray-700'>{checkedPurchasesCount}</p>
            </div>
            <div className='mb-2 flex justify-between'>
              <p className='text-gray-700'>Total quantity:</p>
              <p className='text-gray-700'>{checkedPurchasesCountQuantity}</p>
            </div>
            <div className='mb-2 flex justify-between'>
              <p className='text-gray-700'>Total price not save:</p>
              <p className='text-gray-700'>{formatCurrency(totalCheckedPurchaseNotSave)}</p>
            </div>
            <div className='flex justify-between'>
              <p className='text-gray-700'>Save:</p>
              <p className='text-gray-700'>{formatCurrency(totalCheckedPurchaseSave)}</p>
            </div>
            <hr className='my-4' />
            <div className='flex justify-between'>
              <p className='text-lg font-bold'>Total:</p>
              <p className='mb-1 text-lg font-bold'>{formatCurrency(totalCheckedPurchasePrice)}</p>
            </div>
            <button
              className='button-primary mt-6 w-full rounded-md py-1.5 font-medium before:w-[350px]'
              onClick={handleBuyPurchase}
              disabled={buyProductsMutation.isLoading}
            >
              Check out
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
