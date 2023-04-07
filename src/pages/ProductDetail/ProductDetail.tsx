import { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
// import QuantityController from 'src/components/QuantityController'
import DOMPurify from 'dompurify'

import productApi from 'src/apis/product.api'
import purchaseApi from 'src/apis/purchase.api'
import Product from 'src/components/Product'
import ProductRating from 'src/components/ProductRating'
import QuantityController from 'src/components/QuantityController'
import path from 'src/constants/path'
import { purchaseStatus } from 'src/constants/purchase'
import { Product as ProductType } from 'src/types/product.type'
import { calculateRateSale, formatCurrency, formatNumberToSocialStyle, getIdFromNameId } from 'src/utils/utils'

export default function ProductDetail() {
  const queryClient = useQueryClient()
  const [buyCount, setBuyCount] = useState(1)
  const { nameId } = useParams()
  const id = getIdFromNameId(nameId as string)
  const [currentIndexImages, setCurrentIndexImages] = useState([0, 5])
  const [activeImage, setActiveImage] = useState('')
  const imageRef = useRef<HTMLImageElement>(null)
  const navigate = useNavigate()

  const { data: ProductDetailData } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productApi.getProductDetail(id as string)
  })

  //set product detail data when call api
  const productDetail = ProductDetailData?.data.data

  //handle current image
  const currentImages = useMemo(
    () => (productDetail ? productDetail.images.slice(...currentIndexImages) : []),
    [currentIndexImages, productDetail]
  )

  const queryConfig = { limit: '20', page: '1', category: productDetail?.category._id }
  const { data: productsData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getProducts(queryConfig)
    },
    enabled: Boolean(productDetail),
    staleTime: 3 * 60 * 1000
  })

  /* Call Api add to cart */
  const addToCartMutation = useMutation(purchaseApi.addToCart)
  /* End call Api add to cart */

  //handle active image
  useEffect(() => {
    if (productDetail && productDetail.images.length > 0) {
      setActiveImage(productDetail.images[0])
    }
  }, [productDetail])

  const next = () => {
    if (currentIndexImages[1] < (productDetail as ProductType)?.images.length) {
      setCurrentIndexImages((prev) => [prev[0] + 1, prev[1] + 1])
    }
  }

  const prev = () => {
    if (currentIndexImages[0] > 0) {
      setCurrentIndexImages((prev) => [prev[0] - 1, prev[1] - 1])
    }
  }

  const chooseActive = (img: string) => {
    setActiveImage(img)
  }

  const handleZoom = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const img = imageRef.current as HTMLImageElement
    const { naturalHeight, naturalWidth } = img
    //cach 1
    const { offsetY, offsetX } = event.nativeEvent
    //cach 2:
    // const offsetX = event.pageX - (rect.x + window.screenX)
    // const offsetY = event.pageY - (rect.y + window.screenY)

    const top = offsetY * (1 - naturalHeight / rect.height)
    const left = offsetX * (1 - naturalWidth / rect.width)

    img.style.width = naturalWidth + 'px'
    img.style.height = naturalHeight + 'px'
    img.style.maxWidth = 'unset'
    img.style.top = top + 'px'
    img.style.left = left + 'px'
  }
  const handleRemoveZoom = () => {
    imageRef.current?.removeAttribute('style')
  }

  /* Quantity handle */
  const handleBuyCount = (value: number) => {
    setBuyCount(value)
  }
  /* End quantity handle */

  const addToCart = () => {
    addToCartMutation.mutate(
      { buy_count: buyCount, product_id: productDetail?._id as string },
      {
        onSuccess: (data) => {
          toast.success(data.data.message, {
            autoClose: 1000
          })
          queryClient.invalidateQueries({ queryKey: ['purchases', { status: purchaseStatus.inCart }] })
        }
      }
    )
  }

  const buyNow = async () => {
    const res = await addToCartMutation.mutateAsync({ buy_count: buyCount, product_id: productDetail?._id as string })
    const purchase = res.data.data
    navigate(path.cart, {
      state: {
        purchaseId: purchase._id
      }
    })
  }

  if (!productDetail) return null
  return (
    <Fragment>
      <div className='py-4 lg:py-6'>
        <div className='container'>
          <div className='grid grid-cols-1 gap-6 rounded-16 border bg-FAFAFD p-4 md:grid-cols-12 md:gap-8 lg:p-6'>
            <div className='md:col-span-5'>
              <div
                className='b-sd-1 relative w-full cursor-zoom-in overflow-hidden rounded-10 pt-[100%]'
                onMouseMove={handleZoom}
                onMouseLeave={handleRemoveZoom}
              >
                <img
                  src={activeImage}
                  alt={productDetail.name}
                  title={productDetail.name}
                  className='pointer-events-none absolute top-0 left-0 h-full w-full bg-white object-cover'
                  ref={imageRef}
                />
              </div>
              <div className='relative mt-4 grid grid-cols-5 gap-2 md:gap-3 lg:mt-6'>
                <button className='absolute -left-4 top-1/2 h-6 w-6 -translate-y-1/2 bg-transparent md:-left-6'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-6 w-6'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' onClick={prev} />
                  </svg>
                </button>
                {currentImages.map((img, index) => {
                  const isActive = img === activeImage
                  return (
                    <div
                      className='z-1 relative w-full overflow-hidden rounded-8 pt-[100%]'
                      key={index}
                      onMouseEnter={() => chooseActive(img)}
                    >
                      <img
                        src={img}
                        alt={productDetail.name}
                        title=''
                        className='absolute top-0 left-0 h-full w-full bg-white object-cover'
                      />
                      {isActive && <div className='absolute inset-0 rounded-8 border border-primary-377DFF'></div>}
                    </div>
                  )
                })}

                <button
                  className='absolute -right-4 top-1/2 h-6 w-6 -translate-y-1/2 bg-transparent md:-right-6'
                  onClick={next}
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
                </button>
              </div>
            </div>
            <div className='md:col-span-7'>
              <h1 className='fs-18 font-semibold uppercase lg:fs-20'>{productDetail.name}</h1>
              <div className='mt-2 flex items-center gap-2 lg:mt-4 lg:gap-4'>
                <div className='flex items-center gap-1'>
                  <span className='fs-14 mr-1 border-b border-b-primary-377DFF font-semibold text-primary-377DFF'>
                    {productDetail.rating}
                  </span>
                  <ProductRating rating={productDetail.rating} />
                </div>
                <div className='h-4 border-r-[1px] border-r-primary-377DFF'></div>
                <p className='fs-14 font-semibold text-primary-377DFF'>
                  <span>{formatNumberToSocialStyle(productDetail.sold)}</span>
                  <span className='ml-1'>sold</span>
                </p>
              </div>
              <div className='mt-3 flex max-w-max items-center rounded-10 border bg-white p-2 lg:mt-6'>
                <p className='fs-14 max-w-[50%] truncate text-red-600 line-through xsm:fs-16'>
                  <span>₫</span>
                  <span>{formatCurrency(productDetail.price_before_discount)}</span>
                </p>
                <p className='fs-14 ml-2 max-w-[50%] truncate xsm:fs-16'>
                  <span>₫</span>
                  <span>{formatCurrency(productDetail.price)}</span>
                </p>
                <p className='fs-12 ml-4 rounded-8 p-2 font-semibold xsm:fs-14'>
                  -{calculateRateSale(productDetail.price_before_discount, productDetail.price)}
                </p>
              </div>
              <div className='xsx:flex-nowrap xsx:gap-5 mt-4 flex flex-wrap items-center gap-4 lg:mt-8'>
                <p className='fs-14 whitespace-nowrap capitalize md:fs-16'>Quantity</p>
                <QuantityController
                  onDecrease={handleBuyCount}
                  onIncrease={handleBuyCount}
                  onTyping={handleBuyCount}
                  value={buyCount}
                  max={productDetail.quantity}
                />
                <p className='fs-14 whitespace-nowrap'>{productDetail.quantity} In Stock</p>
              </div>
              <div className='xsx:flex-nowrap xsx:justify-end mt-4 flex flex-wrap items-end justify-start gap-4 lg:mt-8 lg:gap-5'>
                <button
                  className='xsx:max-w-max button-primary h-10 whitespace-nowrap  rounded-8 px-4'
                  onClick={addToCart}
                >
                  Add to cart
                </button>
                <button
                  className='xsx:max-w-max button-secondary h-10 whitespace-nowrap rounded-8 px-4'
                  onClick={buyNow}
                >
                  Purchase Now
                </button>
              </div>
            </div>
          </div>
          <div className='mt-3 rounded-16 border bg-FAFAFD p-4 lg:mt-6 lg:p-6'>
            <h2 className='fs-18 mb-2 font-semibold uppercase lg:fs-20 lg:mb-4'>Product description</h2>
            <div className='dcs-product fs-14 lg:fs-16'>
              <div className=' col-span-1 overflow-hidden '>
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(productDetail.description)
                  }}
                />
              </div>
            </div>
          </div>
          <div className='mt-3 rounded-16 border bg-white p-4 lg:mt-6 lg:p-6'>
            <p className='fs-18 font-semibold uppercase lg:fs-20'></p>
            {productsData && (
              <div className='mt-5 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:mt-6 lg:gap-6'>
                {productsData.data.data.products.map((product) => (
                  <Fragment key={product._id}>
                    <Product product={product} />
                  </Fragment>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  )
}
