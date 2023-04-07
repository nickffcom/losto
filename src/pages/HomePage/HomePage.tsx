import { useRef } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import productApi from 'src/apis/product.api'
import Product from 'src/components/Product'
import Slider from 'src/components/Slider'
import useQueryConfig from 'src/hooks/useQueryConfig'
import { ProductListConfig } from 'src/types/product.type'

import 'swiper/swiper-bundle.min.css'

export default function HomePage() {
  const queryConfig = useQueryConfig()
  const navigationPrevRef = useRef(null)
  const navigationNextRef = useRef(null)

  const { data: productsData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getProducts(queryConfig as ProductListConfig)
    },
    keepPreviousData: true
  })
  // const { data: categoriesData } = useQuery({
  //   queryKey: ['categories'],
  //   queryFn: () => {
  //     return categoryApi.getCategories()
  //   },
  //   staleTime: 3 * 60 * 1000
  // })
  // console.log(productsData)

  return (
    <>
      <Slider />
      <div className='container mt-10'>
        <h2 className='fs-18 mt-5 font-bold text-primary-377DFF lg:fs-30 lg:mt-10'>New Products</h2>
        <div className='relative'>
          <Swiper
            slidesPerView={1}
            spaceBetween={0}
            navigation={{
              prevEl: navigationPrevRef.current,
              nextEl: navigationNextRef.current
            }}
            modules={[Navigation, Pagination]}
            className='new-product-slider'
            loop
            breakpoints={{
              768: {
                slidesPerView: 3
              }
            }}
          >
            {productsData?.data.data.products.splice(0, 12).map((item) => (
              <SwiperSlide key={item._id}>
                <div className='p-6'>
                  <Product product={item} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div
            ref={navigationPrevRef}
            className='b-sd-1 absolute top-1/2 left-0 z-10 hidden cursor-pointer rounded-full border border-secondary-26B374 bg-white fill-secondary-26B374 p-3 duration-200 hover:bg-secondary-26B374 hover:fill-white md:block'
          >
            <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
              <path d='M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z'></path>
            </svg>
          </div>
          <div
            ref={navigationNextRef}
            className='b-sd-1 absolute top-1/2 right-0 z-10 hidden cursor-pointer rounded-full border border-secondary-26B374 bg-white fill-secondary-26B374 p-3 duration-200 hover:bg-secondary-26B374 hover:fill-white md:block'
          >
            <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
              <path d='M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z'></path>
            </svg>
          </div>
        </div>
      </div>
    </>
  )
}
